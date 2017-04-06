import State from '../GameMechanics/State.js';
import {makeScalable} from '../random/ScalableObject.js';
import {GunShot} from '../particleSystem/GunShot.js';
import * as R from 'rodin/core';

/**
 * Init room
 * Set rotation position and EE
 */
const initRoom = (evt) => {
    R.Scene.add(evt.globals.room);

    const gs = new GunShot(new THREE.Vector3(-1, 1.6, 0), null, new THREE.Vector3(0, 5, 5));
    setTimeout(() => {
        R.Scene.add(gs);
    }, 5000);
};

const makeBallScalable = (evt) => {
    makeScalable(evt.globals.ball);
};

/**
 * Create presentation Screen
 */
const initPresentationScreen = (evt) => {
    const presentationScreen = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(1.61, 1), new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide
    })));
    presentationScreen.position.set(0, 1.65, -2);
    // presentationScreen.rotation.y = Math.PI / 2;
    R.Scene.add(presentationScreen);

    gameMechanics.globals.presentationScreen = presentationScreen;
};

const animateMinion = (minion) => {
    minion.currentAnimationStartTime = 0;

    minion.on(R.CONST.UPDATE, () => {
        let curTime = 0;
        if (minion.animations[minion.currentAnimation]) {
            curTime = minion.animations[minion.currentAnimation].time;
        }

        if (R.Time.now - minion.currentAnimationStartTime > curTime * 1000) {
            minion.animations[minion.currentAnimation] &&
            minion.animations[minion.currentAnimation].stop();
            minion.currentAnimation = Math.floor(Math.random() * minion.animations.length);
            const anim = minion.animations[minion.currentAnimation];
            minion.currentAnimationStartTime = R.Time.now;
            anim.play();
        }
    });
};

/**
 *
 * @param sculpt
 * minions sculpt object
 * @param minion
 * selected minion object
 * @param x
 * position x
 * @param z
 * position z
 */

const initLowMinions = evt => {
    let minionSculpt = evt.globals.minionsSculpt;
    const positions = [
        [-0.04, -2.57],
        [-2.5, 0.86],
        [-0.83, 2.68],
        [3, 0.5],
        [2.54, -1.03],
        [-2.35, 1.75],
        [-1.27, -2.68],
        [-0.73, -3.45],
        [0.66, -2.9],
        [2.29, 2.24],
        [-2.35, -2.62],
        [-2.74, -1.7],
        [-3.08, 0.07],
        [-2, 2.82],
        [1.5, 3],
        [3.07, 1.48]
    ];

    for (let i = 0; i < evt.globals.lowMinions.length; i++) {
        const minion = evt.globals.lowMinions[i];
        const position = positions[i % positions.length];
        minion.position.set(position[0], 0, position[1]);
        minion.rotation.y = Math.PI;
        minionSculpt.add(minion);
        animateMinion(minion);
    }
};

const initHighMinions = (evt) => {
    const minionSculpt = evt.globals.minionsSculpt;

    const positions = [
        [0.83, -1.76],
        [-.8, -1.28],
        [0.67, 1.74],
        [-2, -0.75],
        [1.7, 0.95],
        [-1.28, 1.84],
        [1.94, -0.19],
        [1.84, -1.75],
        [-0.5, 0.8],
    ];

    for (let i = 0; i < evt.globals.highMinions.length; i++) {
        const minion = evt.globals.highMinions[i];
        const position = positions[i % positions.length];
        minion.position.set(position[0], 0, position[1]);
        minion.rotation.y = Math.PI;
        minionSculpt.add(minion);
        animateMinion(minion);
    }
};

/**
 *
 * Init all types of minions
 * Set minions sculpt position
 */

const initMinions = (evt) => {
    const minionsSculpt = new R.Sculpt();
    R.Scene.add(minionsSculpt);
    minionsSculpt.position.z = 8.6;
    evt.globals.minionsSculpt = minionsSculpt;

    initLowMinions(evt);
    initHighMinions(evt);
};
/**
 * Create presentation controls (only for taron)
 */
const initPresentationControls = (evt) => {
    const presentationControls = new R.Sculpt();

    /**
     * Presentation controls mini screen
     * @type {*}
     */
    const screen = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(1.61 / 5, 1 / 5), new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide
    })));
    screen.position.set(0, -0.25, -1);
    presentationControls.add(screen);
    presentationControls.screen = screen;

    /**
     * Prev button
     * @type {Text}
     */
    const prevButton = new R.Text({
        text: 'Prev',
        color: 0xffffff
    });

    prevButton.position.set(-0.30, -0.25, -1);
    presentationControls.add(prevButton);
    presentationControls.prevButton = prevButton;

    prevButton.on(R.CONST.GAMEPAD_BUTTON_DOWN, () => {
        if (evt.gameMechanics.stateName !== 'state_slide_0')
            evt.gameMechanics.prev();
    });

    /**
     * Next button
     * @type {Text}
     */
    const nextButton = new R.Text({
        text: 'Next',
        color: 0xffffff
    });

    nextButton.position.set(0.30, -0.25, -1);
    presentationControls.add(nextButton);
    presentationControls.nextButton = nextButton;

    nextButton.on(R.CONST.GAMEPAD_BUTTON_DOWN, () => {
        evt.gameMechanics.next();
    });

    R.Scene.add(presentationControls);
    R.Scene.postRender(() => {
        presentationControls.matrix = R.Scene.activeCamera.matrix.clone();
    });

    evt.globals.presentationControls = presentationControls;
};

const cardboardCameraPosition = evt => {
    const cameraSculpt = new R.Sculpt();
    R.Scene.add(cameraSculpt);
    cameraSculpt._threeObject.add(R.Scene.activeCamera);
    cameraSculpt.position.z = 8;
};

const laptopCameraPosition = evt => {
    const cameraSculpt = new R.Sculpt();
    R.Scene.add(cameraSculpt);
    cameraSculpt._threeObject.add(R.Scene.activeCamera);
    cameraSculpt.position.z = 13;
    cameraSculpt.position.y = 1;
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
    initPresentationScreen(evt);
    initPresentationControls(evt);
    makeBallScalable(evt);
    initMinions(evt);
});

state_init.taron.on('finish', (evt) => {

});

state_init.taron.on('fastForward', (evt) => {
    initRoom(evt);
    initPresentationScreen(evt);
    initPresentationControls(evt);
    initMinions(evt);
    makeBallScalable(evt);
});

/**
 * CARDBOARD
 */

state_init.cardboard.on('start', (evt) => {
    cardboardCameraPosition(evt);
    initRoom(evt);
    initPresentationScreen(evt);
    initMinions(evt);
});

state_init.cardboard.on('finish', (evt) => {

});

state_init.cardboard.on('fastForward', (evt) => {
    cardboardCameraPosition(evt);
    initRoom(evt);
    initMinions(evt);
    initPresentationScreen(evt);
});

/**
 * LAPTOP
 */

state_init.laptop.on('start', (evt) => {
    laptopCameraPosition(evt);
    initRoom(evt);
    initPresentationScreen(evt);
    initMinions(evt);
});

state_init.laptop.on('finish', (evt) => {

});

state_init.laptop.on('fastForward', (evt) => {
    laptopCameraPosition(evt);
    initRoom(evt);
    initMinions(evt);
    initPresentationScreen(evt);
});