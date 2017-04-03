import State from '../GameMechanics/State.js';
import {makeScalable} from '../random/ScalableObject.js';
import * as R from 'rodin/core';

/**
 * Init room
 * Set rotation position and EE
 */
const initRoom = (evt) => {
	evt.globals.room.rotation.y = -Math.PI / 2;
	evt.globals.room.position.z = -22;

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
	R.Scene.add(presentationScreen);

	gameMechanics.globals.presentationScreen = presentationScreen;
};

const initLowMinions = evt => {
	let minion = evt.globals.lowMinion;
	let r = 2.65;
	let step = Math.PI / 3.855;
	for (let i = 0; i < 6; i++) {
		let min = minion[Math.floor(Math.random() * 3)].clone();
		min.position.x = r * Math.cos(step * i);
		min.position.z = r * Math.sin(step * i);
		min.rotation.y = 135;
		R.Scene.add(min)
	}
};
const initMinions = (evt) => {
	let minion = evt.globals.minion;
	let r = 1.5;
	let step = Math.PI / 3;
	for (let i = 0; i < 4; i++) {
		let min = minion[Math.floor(Math.random() * 3)].clone();
		min.position.x = r * Math.cos(step * i);
		min.position.z = r * Math.sin(step * i);
		min.rotation.y = 135;
		R.Scene.add(min)
	}
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
});

state_init.taron.on('finish', (evt) => {

});

state_init.taron.on('fastForward', (evt) => {
    initRoom(evt);
    initPresentationScreen(evt);
    initPresentationControls(evt);
    makeBallScalable(evt);
});

/**
 * CARDBOARD
 */

state_init.cardboard.on('start', (evt) => {
	initRoom(evt);
	initPresentationScreen(evt);
	initMinions(evt);
	initLowMinions(evt);
});

state_init.cardboard.on('finish', (evt) => {

});

state_init.cardboard.on('fastForward', (evt) => {
	initRoom(evt);
	initPresentationScreen(evt);
});

/**
 * LAPTOP
 */

state_init.laptop.on('start', (evt) => {
	initRoom(evt);
	initPresentationScreen(evt);
});

state_init.laptop.on('finish', (evt) => {

});

state_init.laptop.on('fastForward', (evt) => {
	initRoom(evt);
	initPresentationScreen(evt);
});