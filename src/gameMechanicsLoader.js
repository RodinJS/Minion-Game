import * as R from 'rodin/core';
import {loadJD} from './util/loadJD.js'
import {audio} from './sounds/gameSounds.js';

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
    const room = loadJD('/public/resource/models/stage/stage.JD');
    queuedElements.push(room);
    room.on(R.CONST.READY, function () {
        removeFromQueue(this);
    });

    gameMechanics.globals.room = room;
};

/**
 *
 * Load high poly minions model
 */
const loadMinionModel = (gameMechanics) => {
    gameMechanics.globals.highMinions = [];
    const minionsCount = 6;

    const minionsUrls = [
        '/public/resource/models/minions/minion_01_anim.JD',
        '/public/resource/models/minions/minion_02_anim.JD',
        '/public/resource/models/minions/minion_03_anim.JD'
    ];

    for (let i = 0; i < minionsCount; i++) {
        let minion;
        if (i <= 1 || i >= 4) {
            minion = loadJD(minionsUrls[0]);
        } else {
            minion = loadJD(minionsUrls[Math.floor(Math.random() * minionsUrls.length)]);
        }

        queuedElements.push(minion);
        minion.on('jdReady', () => {
            gameMechanics.globals.highMinions.push(minion);
            removeFromQueue(minion);
        });
    }
};

/**
 * Load low poly minions model
 */
const loadLowMinionModel = (gameMechanics) => {
    gameMechanics.globals.lowMinions = [];
    const minionsCount = 12;

    const minionsUrls = [
        '/public/resource/models/minions/minion_01_low_anim.JD',
        '/public/resource/models/minions/minion_02_low_anim.JD',
        '/public/resource/models/minions/minion_03_low_anim.JD'
    ];

    for (let i = 0; i < minionsCount; i++) {
        let minion;
        if (i >= 8){
            minion = loadJD(minionsUrls[2]);
        } else {
            minion = loadJD(minionsUrls[Math.floor(Math.random() * minionsUrls.length)]);
        }

        queuedElements.push(minion);
        minion.on('jdReady', () => {
            gameMechanics.globals.lowMinions.push(minion);
            removeFromQueue(minion);
        });
    }
};

/**
 * load presentation slides
 */
const loadPresentationSlides = (gameMechanics) => {
    gameMechanics.globals.presentationSlide = R.Loader.loadTexture('/public/resource/images/slides/rodin.jpg');
};

/**
 * load presentation slides
 */
const loadEnvTextures = (gameMechanics) => {
    const envTextures = [
        '/public/resource/images/env/env0.jpg',
        '/public/resource/images/env/env1.jpg',
        '/public/resource/images/env/env2.jpg',
        '/public/resource/images/env/env3.jpg',
        '/public/resource/images/env/env4.jpg',
        '/public/resource/images/env/env5.jpg'
    ].map(R.Loader.loadTexture);

    gameMechanics.globals.envTextures = envTextures;
};

/**
 * load ball model
 */
const loadBallModel = (gameMechanics) => {
    const ballLoad = new R.Sculpt('/public/resource/models/ball/ball.obj');
    const ball = new R.Sphere(new THREE.MeshBasicMaterial({transparent: true, opacity: 0}));
    queuedElements.push(ball);
    ballLoad.on(R.CONST.READY, function () {
        ball.add(ballLoad);
        ball.scale.set(1.6, 1.6, 1.6);
        removeFromQueue(ball);
    });

    gameMechanics.globals.ball = ball;
};

/**
 * load Gru model
 */
const loadGruModel = (gameMechanics) => {
    const gru = loadJD('/public/resource/models/gru_cut/gru.JD');
    queuedElements.push(gru);
    gru.on('jdReady', function () {
        removeFromQueue(gru);
    });

    gameMechanics.globals.gru = gru;

    const rightHand = new R.Sculpt('/public/resource/models/gru_cut/hand_right.obj');
    queuedElements.push(rightHand);
    gru.on('ready', function () {
        removeFromQueue(rightHand);
    });

    gameMechanics.globals.rightHand = rightHand;

    const leftHand = new R.Sculpt('/public/resource/models/gru_cut/hand_left.obj');
    queuedElements.push(leftHand);
    gru.on('ready', function () {
        removeFromQueue(leftHand);
    });

    gameMechanics.globals.leftHand = leftHand;
};

/**
 * load gun model
 */
const loadGunModel = (gameMechanics) => {
    const gun = loadJD('/public/resource/models/gru_gun/gun.JD');
    queuedElements.push(gun);
    gun.on('jdReady', function () {
        removeFromQueue(gun);
    });

    gameMechanics.globals.gun = gun;
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
        loadGruModel(this.gameMechanics);
        loadGunModel(this.gameMechanics);
        loadMinionModel(this.gameMechanics);
        loadLowMinionModel(this.gameMechanics);
        loadEnvTextures(this.gameMechanics);
        audio.playPreloadSound();
    }

    /**
     * CARDBOARD
     */

    cardboard() {
        loadRoomModel(this.gameMechanics);
        loadPresentationSlides(this.gameMechanics);
        loadBallModel(this.gameMechanics);
        loadGruModel(this.gameMechanics);
        loadGunModel(this.gameMechanics);
        loadMinionModel(this.gameMechanics);
        loadLowMinionModel(this.gameMechanics);
        loadEnvTextures(this.gameMechanics);
    }

    /**
     * LAPTOP
     */
    laptop() {
        loadRoomModel(this.gameMechanics);
        loadPresentationSlides(this.gameMechanics);
        loadBallModel(this.gameMechanics);
        loadGruModel(this.gameMechanics);
        loadGunModel(this.gameMechanics);
        loadMinionModel(this.gameMechanics);
        loadLowMinionModel(this.gameMechanics);
        loadEnvTextures(this.gameMechanics);
        audio.playPreloadSound();
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
