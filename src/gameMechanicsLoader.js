import * as R from 'rodin/core';
import {loadJD} from './util/loadJD.js'

const queuedElements = [];

const removeFromQueue = (elem) => {
    const index = queuedElements.indexOf(elem);
    console.log(index);
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
        const minion = loadJD(minionsUrls[Math.floor(Math.random() * minionsUrls.length)]);
        queuedElements.push(minion);
        minion.on('jdReady', () => {
            gameMechanics.globals.highMinions.push(minion);
            removeFromQueue(minion);
        });
    }
};

const loadVeryLowMinionModel = (gameMechanics) => {
    const url = '/public/resource/models/minion/minoin_low_very_low.JD';
    const minion = loadJD(url);
    queuedElements.push(minion);
    minion.on('jdReady', () => {
        gameMechanics.globals.veryLowMinions = minion;
        removeFromQueue(minion);
    });
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
        const minion = loadJD(minionsUrls[Math.floor(Math.random() * minionsUrls.length)]);
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
    const presentationSlides = [
        '/public/resource/images/slides/Demo slides_Page_02.jpg',
        '/public/resource/images/slides/Demo slides_Page_03.jpg',
        '/public/resource/images/slides/Demo slides_Page_04.jpg',
        '/public/resource/images/slides/Demo slides_Page_05.jpg'
    ].map(R.Loader.loadTexture);

    gameMechanics.globals.presentationSlides = presentationSlides;
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
 * load gun model
 */
const loadShootingModel = (gameMechanics) => {
    const shooting = loadJD('/public/resource/models/shooting_model/shooting.JD');
    queuedElements.push(shooting);
    shooting.on('jdReady', function () {
        removeFromQueue(shooting);
    });

    gameMechanics.globals.shooting = shooting;
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
        loadShootingModel(this.gameMechanics);
        loadVeryLowMinionModel(this.gameMechanics);
        loadMinionModel(this.gameMechanics);
        loadLowMinionModel(this.gameMechanics);
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
        loadShootingModel(this.gameMechanics);
        loadVeryLowMinionModel(this.gameMechanics);
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
        loadGruModel(this.gameMechanics);
        loadGunModel(this.gameMechanics);
        loadShootingModel(this.gameMechanics);
        loadVeryLowMinionModel(this.gameMechanics);
        loadMinionModel(this.gameMechanics);
        loadLowMinionModel(this.gameMechanics);
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
