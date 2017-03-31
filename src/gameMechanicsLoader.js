import * as R from 'rodin/core';
import {ScalableObject} from './random/ScalableObject.js';
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
    if (queuedElements.length === 0) {
        gameMechanicsLoader.emit(R.CONST.READY, new R.RodinEvent(null));
    }
};

/**
 * Load room model and assign to gameMechanics.globals
 */
const loadRoomModel = (gameMechanics) => {
    const room = new R.Sculpt('/public/resource/models/room/Deck.obj');
    queuedElements.push(room);
    room.on(R.CONST.READY, function () {
        removeFromQueue(this);
    });

    gameMechanics.globals.room = room;
};

/**
 * load presentation slides
 */
const loadPresentationSlides = (gameMechanics) => {
    const presentationSlides = [
        '/public/resource/images/slides/7580037833793f7eb6dee40c1a41d3ed.jpg',
        '/public/resource/images/slides/16fb70b76be78e675e3acaeff6a65953.jpg',
        '/public/resource/images/slides/7dcbc0d5263ece7fa15cfd16f6cb4735.jpg',
        '/public/resource/images/slides/41359fed28d845f781afa2d6c101cf98.jpg'
    ].map(R.Loader.loadTexture);

    gameMechanics.globals.presentationSlides = presentationSlides;
};

/**
 * load ball model
 */
const loadBallModel = (gameMechanics) => {
    const ball = new ScalableObject(new R.Sphere(new THREE.MeshBasicMaterial({color: 0x996633, wireframe: true})));
    queuedElements.push(ball);
    ball.on(R.CONST.READY, function () {
        removeFromQueue(this);
    });

    gameMechanics.globals.ball = ball;

    ball.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
        evt.target.btnDown(evt);
    });
    ball.on(R.CONST.GAMEPAD_BUTTON_UP, (evt) => {
        evt.target.btnUp(evt);
    });
    ball.on(R.CONST.UPDATE, (evt) => {
        evt.target.updateFunc(evt);
    });

};

/**
 * Class for loading all models, images and ee before start
 */
class GameMechanicsLoader extends R.EventEmitter {
    constructor(gameMechanics) {
        super();
        this.gameMechanics = gameMechanics;
    }

    /**
     * TARON
     */

    taron() {
        loadRoomModel(this.gameMechanics);
        loadPresentationSlides(this.gameMechanics);
        loadBallModel(this.gameMechanics);
    }

    /**
     * CARDBOARD
     */

    cardboard() {
        loadRoomModel(this.gameMechanics);
        loadPresentationSlides(this.gameMechanics);
        loadBallModel(this.gameMechanics);
    }

    /**
     * LAPTOP
     */

    laptop() {
        loadRoomModel(this.gameMechanics);
        loadPresentationSlides(this.gameMechanics);
        loadBallModel(this.gameMechanics);
    }

    /**
     * Start loading all elements before gameMechanic starts
     */
    load() {
        if (!this.gameMechanics) {
            throw new Error('gameMechanics is not specified');
        }

        this[this.gameMechanics._currentDevice]();
    }
}

export const gameMechanicsLoader = new GameMechanicsLoader();



