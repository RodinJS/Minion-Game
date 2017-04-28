import State from '../GameMechanics/State.js';
import * as R from 'rodin/core';
import {getAngle} from '../util/angle.js';
import {SharedObject} from '../GameMechanics/SharedObject.js';
import {Snow} from '../particleSystem/Snow.js';

const hideViveControllers = () => {
    const hideObject = (object) => {
        if (object.isReady)
            object.visible = false;
        else
            object.on(R.CONST.READY, () => {
                object.visible = false;
            })
    };

    hideObject(R.GamePad.viveLeft.controllerModel);
    hideObject(R.GamePad.viveRight.controllerModel);
};

/**
 * Init room
 * Set rotation position and EE
 */
const initRoom = (evt) => {
    evt.globals.room.position.y = -0.48;
    R.Scene.add(evt.globals.room);
    R.GamePad.cardboard.gazePoint.Sculpt.parent = null;
    R.GamePad.cardboard.gazePoint.Sculpt.visible = false;
};

/**
 * Create presentation Screen
 */
const initPresentationScreen = (evt) => {
    const presentationScreen = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(8, 4), new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: evt.globals.presentationSlide
    })));
    presentationScreen.position.set(0, 2.6, -2);
    evt.globals.presentationScreen = presentationScreen;
    R.Scene.add(presentationScreen);
};

/**
 *
 * Init Gru model and play 'floating' animation
 */
const initGru = (evt) => {
    const gru = evt.globals.gru;
    R.Scene.add(gru);
    gru.animations[0].play();
    // hoverBoardSound.play();
    R.Scene.add(evt.globals.rightHand);
    R.Scene.add(evt.globals.leftHand);

};

const hideGru = (evt) => {
    evt.globals.gru.visible = false;
};

const syncGruMotion = (evt) => {
    const sculptBones = evt.globals.gru.bones.map(i => new R.Sculpt(i));

    R.GamePad.viveLeft.sculpt.add(evt.globals.leftHand);
    R.GamePad.viveRight.sculpt.add(evt.globals.rightHand);

    evt.globals.gru.on(R.CONST.UPDATE, () => {
        const pos = R.Scene.activeCamera.position.clone();
        pos.y = 0.0;
        const worldDirection = R.Scene.activeCamera.getWorldDirection();
        const yRotation = new THREE.Vector2(worldDirection.x, worldDirection.z).normalize();
        let yAngle = -getAngle(new THREE.Vector2(0, 0), yRotation);

        yAngle = (yAngle - Math.PI * 2) / 2 + Math.PI * 2;
        yAngle -= Math.PI / 2 - Math.PI / 4;
        evt.globals.gru.globalRotation.y = yAngle;
        evt.globals.gru.globalRotation.x = 0;
        evt.globals.gru.globalRotation.z = 0;

        evt.globals.gru.position = pos;

        sculptBones[8].quaternion.setFromUnitVectors(
            sculptBones[8].globalPosition.clone().normalize(),
            R.GamePad.viveLeft.sculpt.position.clone().normalize()
        );
    });
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

const initLowMinions = evt => {
    let minionSculpt = evt.globals.minionsSculpt;
    const flyingMinionIndex = [4, 7, 2, 6];


    const throwAnimation = new R.AnimationClip('throw', {
        position: {
            y: 3
        },
        rotation: {
            x: -Math.PI / 2 + 0.0234,
            z: Math.PI,
            y: Math.PI
        }
    });

    throwAnimation.duration(10000).easing((k) => {
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
    });

    evt.globals.flyingMinions = [];

    evt.globals.lowMinions[0].position.set(3.5, -1.6, 3.5);
    evt.globals.lowMinions[1].position.set(4, -1.6, 1.5);
    evt.globals.lowMinions[2].position.set(4, -1.6, -1.5);
    evt.globals.lowMinions[3].position.set(3.5, -1.6, -3.5);
    evt.globals.lowMinions[4].position.set(1.3, -1.6, -4);
    evt.globals.lowMinions[5].position.set(-1.4, -1.6, -4);
    evt.globals.lowMinions[6].position.set(-3.5, -1.6, -3.5);
    evt.globals.lowMinions[7].position.set(-4, -1.6, -1.5);
    evt.globals.lowMinions[8].position.set(-4, -1.6, 1.5);
    evt.globals.lowMinions[9].position.set(-3.5, -1.6, 3.5);
    evt.globals.lowMinions[10].position.set(-1.1, -1.6, 4);
    evt.globals.lowMinions[11].position.set(1.2, -1.6, 4);

    for (let i = 0; i < evt.globals.lowMinions.length; i++) {
        const minion = evt.globals.lowMinions[i];

        minion.rotation.y = Math.PI;
        minion.scale.set(1.35, 1.35, 1.35);

        const color = {r: 0.5, g: 0.5, b: 0.5};
        minion.children[0]._threeObject.material.materials[0].color.r = color.r;
        minion.children[0]._threeObject.material.materials[0].color.g = color.g;
        minion.children[0]._threeObject.material.materials[0].color.b = color.b;

        let minionIndex = flyingMinionIndex.indexOf(i);
        if (minionIndex !== -1) {
            minion.animation.add(throwAnimation);
            evt.globals.flyingMinions[minionIndex] = (minion);
        }

        minionSculpt.add(minion);
        animateMinion(minion);
    }
};

const initHighMinions = (evt) => {
    const minionSculpt = evt.globals.minionsSculpt;

    evt.globals.highMinions[0].position.set(1, -1.6, 2);
    evt.globals.highMinions[1].position.set(2, -1.6, 0);
    evt.globals.highMinions[2].position.set(1, -1.6, -2);
    evt.globals.highMinions[3].position.set(-1, -1.6, -2);
    evt.globals.highMinions[4].position.set(-2, -1.6, 0);
    evt.globals.highMinions[5].position.set(-1, -1.6, 2);

    for (let i = 0; i < evt.globals.highMinions.length; i++) {
        const minion = evt.globals.highMinions[i];

        minion.rotation.y = Math.PI;
        minion.scale.set(1.35, 1.35, 1.35);

        const color = {r: 0.8, g: 0.8, b: 0.8};
        minion.children[0]._threeObject.material.materials[0].color.r = color.r;
        minion.children[0]._threeObject.material.materials[0].color.g = color.g;
        minion.children[0]._threeObject.material.materials[0].color.b = color.b;

        minionSculpt.add(minion);
        animateMinion(minion);
    }
};

const initSnow = (evt) => {
    let snow = new Snow();
    snow.position.z = 5;
    R.Scene.add(snow);
    evt.globals.snow = snow;
    snow.visible = false;

    const sharedSnow = new SharedObject(snow, ['visible']).active(true).lerp(false).updateInterval(100);
    evt.gameMechanics.addSharedObject(sharedSnow);
};


/**
 *
 * Init all types of minions
 * Set minions sculpt position
 */
const initMinions = (evt) => {
    const minionsSculpt = new R.Sculpt();
    R.Scene.add(minionsSculpt);
    minionsSculpt.position.z = 8;
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
     * Start button text style
     * @type {Text}
     */
    const startButtonText = new R.Text({
        text: 'START',
        color: 0xffd200,
        fontSize: 0.08
    });

    /**
     * Start button style parameters
     */
    let startBtnParams = {name: "startBtn", width: 0.4, height: 0.18};
    startBtnParams.background = {color: 0x336699, opacity: 0.8};
    startBtnParams.border = {radius: 0.18};

    /**
     * Create start button given parameters
     */
    let startButton = new R.Element(startBtnParams);
    startButton.position.set(0, 0, -1);
    presentationControls.add(startButton);
    presentationControls.startButton = startButton;

    startButton.add(startButtonText);
    startButtonText.position.z = 0.02;

    /**
     * Add button down event, for starting game
     */
    startButton.on(R.CONST.GAMEPAD_BUTTON_DOWN, () => {
        evt.gameMechanics.next();
    });

    R.Scene.add(presentationControls);
    R.Scene.postRender(() => {
        presentationControls.matrix = R.Scene.activeCamera.matrix.clone();
    });

    evt.globals.presentationControls = presentationControls;
};

const cardboardCameraPosition = evt => {
    R.Scene.activeCamera.sculpt = new R.Sculpt();
    R.Scene.activeCamera.sculpt._threeObject.add(R.Scene.activeCamera);
    R.Scene.activeCamera.sculpt.position.z = 8;
    R.Scene.activeCamera.sculpt.position.y = -1.5;

    R.Scene.add(R.Scene.activeCamera.sculpt);
};

const laptopCameraPosition = evt => {
    R.Scene.activeCamera.sculpt = new R.Sculpt();
    R.Scene.activeCamera.sculpt._threeObject.add(R.Scene.activeCamera);
    R.Scene.activeCamera.sculpt.position.z = 13;
    R.Scene.activeCamera.sculpt.position.y = 1;

    R.Scene.add(R.Scene.activeCamera.sculpt);
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
    initGru(evt);
    hideGru(evt);
    syncGruMotion(evt);
    initPresentationScreen(evt);
    initPresentationControls(evt);
    initMinions(evt);
    initSnow(evt);
    hideViveControllers(evt);
});

state_init.taron.on('finish', (evt) => {

});

state_init.taron.on('fastForward', (evt) => {
    initRoom(evt);
    initGru(evt);
    hideGru(evt);
    syncGruMotion(evt);
    initPresentationScreen(evt);
    initPresentationControls(evt);
    initMinions(evt);
    initSnow(evt);
    hideViveControllers(evt);
});

/**
 * CARDBOARD
 */

state_init.cardboard.on('start', (evt) => {
    cardboardCameraPosition(evt);
    initRoom(evt);
    initGru(evt);
    initPresentationScreen(evt);
    initMinions(evt);
    initSnow(evt);
});

state_init.cardboard.on('finish', (evt) => {

});

state_init.cardboard.on('fastForward', (evt) => {
    cardboardCameraPosition(evt);
    initRoom(evt);
    initGru(evt);
    initMinions(evt);
    initPresentationScreen(evt);
    initSnow(evt);
});

/**
 * LAPTOP
 */

state_init.laptop.on('start', (evt) => {
    laptopCameraPosition(evt);
    initRoom(evt);
    initGru(evt);
    initGru(evt);
    initPresentationScreen(evt);
    initMinions(evt);
    initSnow(evt);
});

state_init.laptop.on('finish', (evt) => {

});

state_init.laptop.on('fastForward', (evt) => {
    laptopCameraPosition(evt);
    initRoom(evt);
    initGru(evt);
    initMinions(evt);
    initPresentationScreen(evt);
    initSnow(evt);
});