import State from '../GameMechanics/State.js';
import {makeScalable} from '../random/ScalableObject.js';
import * as R from 'rodin/core';
import {getAngle} from '../util/angle.js';
import {gunShotSound, hoverBoardSound, scaleSound} from '../sounds/gameSounds.js';
import {GunShot} from '../particleSystem/GunShot.js';

import {addOnChangeEvent, removeOnChangeEvent} from '../random/onChangeEvent.js';

/**
 * Init room
 * Set rotation position and EE
 */
const initRoom = (evt) => {
	console.dir(gunShotSound);
	gunShotSound.play();
    evt.globals.room.position.y = -0.48;
    R.Scene.add(evt.globals.room);
};

const makeBallScalable = (evt) => {
    makeScalable(evt.globals.ball);
};

/**
 * Create presentation Screen
 */
const initPresentationScreen = (evt) => {
    const presentationScreen = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(9, 3), new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide
    })));
    presentationScreen.position.set(0, 3.6, -2);
    R.Scene.add(presentationScreen);

    gameMechanics.globals.presentationScreen = presentationScreen;
};

/**
 *
 * Init Gru model and play 'floating' animation
 */
const initGru = (evt) => {
    const gru = evt.globals.gru;
    //gru.scale.set(0.8, 0.8, 0.8);
    R.Scene.add(gru);
    gru.animations[0].play();
    hoverBoardSound.play();
    R.Scene.add(evt.globals.rightHand);
    R.Scene.add(evt.globals.leftHand);

    //R.Scene.add(new R.Box(0.1, 3.2));
};

const hideGru = (evt) => {
    evt.globals.gru.visible = false;
};

const syncGruMotion = (evt) => {
    const rBox = new R.Box(0.3);
    const lBox = new R.Box(0.3);

    // evt.globals.rBox = rBox;
    // evt.globals.lBox = lBox;

    R.Scene.add(rBox, lBox);

    const sculptBones = evt.globals.gru.bones.map(i => new R.Sculpt(i));

    R.GamePad.viveLeft.sculpt.add(evt.globals.leftHand);
    evt.globals.leftHand.position.x -= 0.2;
    evt.globals.leftHand.position.z -= 0.2;
    R.GamePad.viveRight.sculpt.add(evt.globals.rightHand);
    evt.globals.rightHand.position.x += 0.2;
    evt.globals.rightHand.position.z -= 0.2;

    evt.globals.gru.on(R.CONST.UPDATE, () => {
        const pos = R.Scene.activeCamera.position.clone();
        pos.y = 0.0;
        //pos.z -= -.8;
        const worldDirection = R.Scene.activeCamera.getWorldDirection();
        const yRotation = new THREE.Vector2(worldDirection.x, worldDirection.z).normalize();
        let yAngle = -getAngle(new THREE.Vector2(0, 0), yRotation);

        // yAngle = (yAngle - Math.PI * 2) / 2 + Math.PI * 2;
        // yAngle -= Math.PI / 2 - Math.PI / 4;
        yAngle -= Math.PI / 2;
        evt.globals.gru.rotation.y = yAngle;

        evt.globals.gru.position = pos;

        // rBox.position = sculptBones[8].globalPosition;
        // lBox.position = sculptBones[14].globalPosition;

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



const MinionsDistribution = (minion, radius, step) => {
    minion.position.x = radius * Math.cos(step) + (Math.random() * .5 + .2);
    minion.position.y = -1.6;
    minion.position.z = radius * Math.sin(step) + (Math.random() * .5 + .2);

    minion.rotation.y = Math.PI;
    minion.scale.set(1.35, 1.35, 1.35);
};

const initVeryLowMinions = evt => {
    let minionSculpt = evt.globals.minionsSculpt;
    let minion = evt.globals.veryLowMinions;

    for (let i = 0; i < 12; i++) {
        let min = minion.clone();

        MinionsDistribution(min, 6, Math.PI / 8 * i - Math.PI/5);

        const colors = [
            [{r: 0.416, g: 0.353, b: 0.133}, {r: 0, g: 0, b: 0}, {r: 0.048, g: 0.222, b: 0.453}],
            [{r: 0.337, g: 0.288, b: 0.011}, {r: 0, g: 0, b: 0}, {r: 0.020, g: 0.168, b: 0.337}],
            [{r: 0.213, g: 0.182, b: 0.066}, {r: 0, g: 0, b: 0}, {r: 0.008, g: 0.071, b: 0.155}],
        ];

        const color = colors[2];

        for (let i = 0; i < minion.children[0]._threeObject.material.materials.length; i++){
            minion.children[0]._threeObject.material.materials[i].color.r = color[i].r;
            minion.children[0]._threeObject.material.materials[i].color.g = color[i].g;
            minion.children[0]._threeObject.material.materials[i].color.b = color[i].b;
        }

        minionSculpt.add(min)
    }
};

const initLowMinions = evt => {
    let minionSculpt = evt.globals.minionsSculpt;
    const flyingMinionIndex = [9, 6,  11, 7];


    const throwAnimation = new R.AnimationClip('throw', {
        position: {
            y: 3
        },
        rotation: {
            x: Math.PI/2 + 0.0234,
            z: Math.PI,
            y: -Math.PI
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

    for (let i = 0; i < evt.globals.lowMinions.length; i++) {
        const minion = evt.globals.lowMinions[i];
        MinionsDistribution(minion, 4, Math.PI / 6 * i);

        const color = {r: 0.5, g: 0.5, b: 0.5};
        minion.children[0]._threeObject.material.materials[0].color.r = color.r;
        minion.children[0]._threeObject.material.materials[0].color.g = color.g;
        minion.children[0]._threeObject.material.materials[0].color.b = color.b;

        let minionIndex =flyingMinionIndex.indexOf(i);
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

    for (let i = 0; i < evt.globals.highMinions.length; i++) {
        const minion = evt.globals.highMinions[i];

        MinionsDistribution(minion, 2, Math.PI / 3 * i);

        const color = {r: 0.8, g: 0.8, b: 0.8};
        minion.children[0]._threeObject.material.materials[0].color.r = color.r;
        minion.children[0]._threeObject.material.materials[0].color.g = color.g;
        minion.children[0]._threeObject.material.materials[0].color.b = color.b;


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
    minionsSculpt.position.z = 8;
    evt.globals.minionsSculpt = minionsSculpt;
    initVeryLowMinions(evt);
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
    makeBallScalable(evt);
    initMinions(evt);
    addOnChangeEvent(evt.globals.ball, 'scale.z', ()=> {
        // scaleSound.play();
        removeOnChangeEvent(evt.globals.ball, 'scale.z');
    });
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
    makeBallScalable(evt);
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
});

state_init.cardboard.on('finish', (evt) => {

});

state_init.cardboard.on('fastForward', (evt) => {
    cardboardCameraPosition(evt);
    initRoom(evt);
    initGru(evt);
    initMinions(evt);
    initPresentationScreen(evt);
});

/**
 * LAPTOP
 */

state_init.laptop.on('start', (evt) => {
    laptopCameraPosition(evt);
    initRoom(evt);
    initGru(evt);
    initPresentationScreen(evt);
    initMinions(evt);
});

state_init.laptop.on('finish', (evt) => {

});

state_init.laptop.on('fastForward', (evt) => {
    laptopCameraPosition(evt);
    initRoom(evt);
    initGru(evt);
    initMinions(evt);
    initPresentationScreen(evt);
});