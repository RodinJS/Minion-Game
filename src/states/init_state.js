import State from '../GameMechanics/State.js';
import {makeScalable} from '../random/ScalableObject.js';
import * as R from 'rodin/core';

/**
 * Init room
 * Set rotation position and EE
 */
const initRoom = (evt) => {
	R.Scene.add(evt.globals.room);
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
const setMinionsPosition = (sculpt, minion, x, z) => {
	let newMinion = minion.clone();
	newMinion.rotation.y = 135;
	newMinion.position.x = x;
	newMinion.position.z = z;
	sculpt.add(newMinion)
};
const initLowMinions = evt => {
	let minionSculpt = evt.globals.minionsSculpt;
	let minions = evt.globals.lowMinion;
	setMinionsPosition(minionSculpt, minions[0], -0.04, -2.57);
	setMinionsPosition(minionSculpt, minions[0], -2.5, 0.86);
	setMinionsPosition(minionSculpt, minions[0], -0.83, 2.68);
	setMinionsPosition(minionSculpt, minions[0], 3, 0.5);
	setMinionsPosition(minionSculpt, minions[0], 2.54, -1.03);
	setMinionsPosition(minionSculpt, minions[1], -2.35, 1.75);
	setMinionsPosition(minionSculpt, minions[1], -1.27, -2.68);
	setMinionsPosition(minionSculpt, minions[1], -0.73, -3.45);
	setMinionsPosition(minionSculpt, minions[1], 0.66, -2.9);
	setMinionsPosition(minionSculpt, minions[1], 2.29, 2.24);
	setMinionsPosition(minionSculpt, minions[2], -2.35, -2.62);
	setMinionsPosition(minionSculpt, minions[2], -2.74, -1.7);
	setMinionsPosition(minionSculpt, minions[2], -3.08, 0.07);
	setMinionsPosition(minionSculpt, minions[2], -2, 2.82);
	setMinionsPosition(minionSculpt, minions[2], 1.5, 3);
	setMinionsPosition(minionSculpt, minions[2], 3.07, 1.48);
};

const initHighMinions = (evt) => {
	const minionSculpt = evt.globals.minionsSculpt;
	let minions = evt.globals.minions;
	setMinionsPosition(minionSculpt, minions[0], 0.83, -1.76);
	setMinionsPosition(minionSculpt, minions[0], -.8, -1.28);
	setMinionsPosition(minionSculpt, minions[0], 0.67, 1.74);
	setMinionsPosition(minionSculpt, minions[1], -2, -0.75);
	setMinionsPosition(minionSculpt, minions[1], 1.7, 0.95);
	setMinionsPosition(minionSculpt, minions[2], -1.28, 1.84);
	setMinionsPosition(minionSculpt, minions[2], 1.94, -0.19);
	setMinionsPosition(minionSculpt, minions[2], 1.84, -1.75);
	setMinionsPosition(minionSculpt, minions[2], -0.5, 0.8);
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