import State from '../GameMechanics/State.js';
import * as R from 'rodin/core';

/**
 * Init room
 */
const initRoom = (evt) => {
    const room = new R.Sculpt('/public/resource/models/room/Deck.obj');
    room.on(R.CONST.READY, function () {
        this.rotation.y = Math.PI;
        R.Scene.add(this);
    });

    evt.globals.room = room;
};

/**
 * initializes the main screen
 * @param evt
 */
const initMainScreen = (evt) => {
    const screen = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(1.61, 1), new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide
    })));
    screen.position.set(0, 1.6, -2);
    R.Scene.add(screen);

    // loading screens

    const presentationSlides = [
        '/public/resource/images/slides/7580037833793f7eb6dee40c1a41d3ed.jpg',
        '/public/resource/images/slides/16fb70b76be78e675e3acaeff6a65953.jpg',
        '/public/resource/images/slides/7dcbc0d5263ece7fa15cfd16f6cb4735.jpg'
    ].map(R.Loader.loadTexture);


    evt.globals.presentationSlides = presentationSlides;
    evt.globals.screen = screen;
};

/**
 * Initializes presenters controls
 * @param evt
 */
const initPresentationControls = (evt) => {
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
        evt.gameMechanics.prev();
    });

    const nextButton =  new R.Text({
        text: 'Next',
        color: 0xffffff
    });
    nextButton.position.set(0.30, -0.25, -1);
    presentationControls.add(nextButton);
    presentationControls.nextButton = nextButton;

    nextButton.on('gamepadbuttondown', () => {
        evt.gameMechanics.next();
    });

    // this is awful
    //R.Scene.activeCamera.add(presentationControls);
    R.Scene.add(presentationControls);
    R.Scene.postRender(() => {
        presentationControls.matrix = R.Scene.activeCamera.matrix.clone();
    });

    evt.globals.presentationControls = presentationControls;
};

export const state_init = {
    taron: new State('state_init'),
    cardboard: new State('state_init'),
    laptop: new State('state_init'),
};

/**
 * TARON
 */

state_init.taron.on('start', (evt) => {
    initRoom(evt);
    initMainScreen(evt);
    initPresentationControls(evt);
});

state_init.taron.on('finish', (evt) => {

});

state_init.taron.on('fastForward', (evt) => {
    initRoom(evt);
    initMainScreen(evt);
    initPresentationControls(evt);
});

/**
 * CARDBOARD
 */

state_init.cardboard.on('start', (evt) => {
    initRoom(evt);
    initMainScreen(evt);
});

state_init.cardboard.on('finish', (evt) => {

});

state_init.cardboard.on('fastForward', (evt) => {
    initRoom(evt);
    initMainScreen(evt);
});

/**
 * LAPTOP
 */

state_init.laptop.on('start', (evt) => {
    initRoom(evt);
    initMainScreen(evt);
});

state_init.laptop.on('finish', (evt) => {

});

state_init.laptop.on('fastForward', (evt) => {
    initRoom(evt);
    initMainScreen(evt);
});