import * as R from 'rodin/core';

const queuedElements = [];

const removeFromQueue = (elem) => {
    const index = queuedElements.indexOf(elem);
    if (index === -1)
        return false;
    queuedElements.splice(index, 1);
    emitReadyIfGameMechanicsReady();
    return true;
};

const emitReadyIfGameMechanicsReady = () => {
      if(queuedElements.length === 0) {
          gameMechanicsLoader.emit(R.CONST.READY, new R.RodinEvent(null));
      }
};

/**
 * Init room
 */
const initRoom = (gameMechanics) => {
    const room = new R.Sculpt('/public/resource/models/room/Deck.obj');
    queuedElements.push(room);

    room.on(R.CONST.READY, function () {
        //this.rotation.y = Math.PI;
        //R.Scene.add(this);
        removeFromQueue(this);
    });

    gameMechanics.globals.room = room;
};

/**
 * initializes the main screen
 * @param gameMechanics
 */
const initMainScreen = (gameMechanics) => {
    const screen = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(1.61, 1), new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide
    })));
    queuedElements.push(screen);
    screen.position.set(0, 1.6, -2);
    //R.Scene.add(screen);

    screen.on(R.CONST.READY, function () {
        removeFromQueue(this);
    });

    // loading screens

    const presentationSlides = [
        '/public/resource/images/slides/7580037833793f7eb6dee40c1a41d3ed.jpg',
        '/public/resource/images/slides/16fb70b76be78e675e3acaeff6a65953.jpg',
        '/public/resource/images/slides/7dcbc0d5263ece7fa15cfd16f6cb4735.jpg'
    ].map(R.Loader.loadTexture);


    gameMechanics.globals.presentationSlides = presentationSlides;
    gameMechanics.globals.screen = screen;
};

/**
 * Initializes presenters controls
 * @param gameMechanics
 */
const initPresentationControls = (gameMechanics) => {
    const presentationControls = new R.Sculpt();

    const screen = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(1.61 / 5, 1 / 5), new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide
    })));
    screen.position.set(0, -0.25, -1);
    presentationControls.add(screen);
    presentationControls.screen = screen;

    const prevButton = new R.Text({
        text: 'Prev',
        color: 0xffffff
    });
    prevButton.position.set(-0.30, -0.25, -1);
    presentationControls.add(prevButton);
    presentationControls.prevButton = prevButton;

    prevButton.on(R.CONST.GAMEPAD_BUTTON_DOWN, () => {
        gameMechanics.prev();
    });

    const nextButton = new R.Text({
        text: 'Next',
        color: 0xffffff
    });
    nextButton.position.set(0.30, -0.25, -1);
    presentationControls.add(nextButton);
    presentationControls.nextButton = nextButton;

    nextButton.on('gamepadbuttondown', () => {
        gameMechanics.next();
    });

    // this is awful
    //R.Scene.activeCamera.add(presentationControls);
    R.Scene.add(presentationControls);
    R.Scene.postRender(() => {
        presentationControls.matrix = R.Scene.activeCamera.matrix.clone();
    });

    gameMechanics.globals.presentationControls = presentationControls;
};

class GameMechanicsLoader extends R.EventEmitter {
    constructor(gameMechanics) {
        super();
        this.gameMechanics = gameMechanics;
    }

    /**
     * TARON
     */

    taron() {
        initRoom(this.gameMechanics);
        initMainScreen(this.gameMechanics);
        initPresentationControls(this.gameMechanics);
    }

    /**
     * CARDBOARD
     */

    cardboard() {
        initRoom(this.gameMechanics);
        initMainScreen(this.gameMechanics);
    }

    /**
     * LAPTOP
     */

    laptop() {
        initRoom(this.gameMechanics);
        initMainScreen(this.gameMechanics);
    }

    load() {
        if(!this.gameMechanics) {
            throw new Error('gameMechanics is not specified');
        }

        this[this.gameMechanics._currentDevice]();
    }
}

export const gameMechanicsLoader = new GameMechanicsLoader();



