import * as R from 'rodin/core';
import { loadJD } from './util/loadJD.js'
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
	// const room = new R.Sculpt('/public/resource/models/room/Deck.obj');
	const room = loadJD('/public/resource/models/stage/stage.JD');
	queuedElements.push(room);
	room.on(R.CONST.READY, function () {
		removeFromQueue(this);
	});

	gameMechanics.globals.room = room;
};

const loadMinionModel = (gameMechanics) => {
	const minions = [
		'/public/resource/models/minion/minion_01.JD',
		'/public/resource/models/minion/minion_02.JD',
		'/public/resource/models/minion/minion_03.JD',
	].map(i => loadJD(i));

	gameMechanics.globals.minion = minions

};
const loadLowMinionModel = (gameMechanics) => {
	const minions = [
		'/public/resource/models/minion/minion_01_low.JD',
		'/public/resource/models/minion/minion_02_low.JD',
		'/public/resource/models/minion/minion_03_low.JD',
	].map(i => loadJD(i));

	gameMechanics.globals.lowMinion = minions;
	console.log(gameMechanics)
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
	const ball = new R.Sphere(new THREE.MeshBasicMaterial({ color: 0x996633, wireframe: true }));
	queuedElements.push(ball);
	ball.on(R.CONST.READY, function () {
		removeFromQueue(this);
	});

	gameMechanics.globals.ball = ball;
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
		loadMinionModel(this.gameMechanics);
		loadLowMinionModel(this.gameMechanics);
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



