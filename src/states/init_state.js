import State from '../GameMechanics/State.js';
import {makeScalable} from '../random/ScalableObject.js';
import * as R from 'rodin/core';
import {getAngle} from '../util/angle.js';
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
 * Init Gru model and play 'floating' animation
 */
const initGru = (evt) => {
    const gru = evt.globals.gru;
    //gru.position.y = 0.2;
    gru.scale.set(0.8, 0.8, 0.8);
    R.Scene.add(gru);
    gru.animations[0].play();

    //R.Scene.add(new R.Box(0.1, 3.2));
};

const syncGruMotion = (evt) => {
    const rBox = new R.Box(0.3);
    const lBox = new R.Box(0.3);

    // evt.globals.rBox = rBox;
    // evt.globals.lBox = lBox;

    R.Scene.add(rBox, lBox);

    const sculptBones = evt.globals.gru.bones.map(i => new R.Sculpt(i));

    evt.globals.gru.on(R.CONST.UPDATE, () => {
        const pos = R.Scene.activeCamera.position.clone();
        pos.y = 0.2;
        //pos.z -= -.4;
        const worldDirection = R.Scene.activeCamera.getWorldDirection();
        const yRotation = new THREE.Vector2(worldDirection.x, worldDirection.z).normalize();
        let yAngle = -getAngle(new THREE.Vector2(0, 0), yRotation);

        yAngle = (yAngle - Math.PI * 2) / 2 + Math.PI * 2;
        yAngle -= Math.PI / 2 - Math.PI / 4;

        evt.globals.gru.rotation.y = yAngle;

        evt.globals.gru.position = pos;

        rBox.position = sculptBones[8].globalPosition;
        lBox.position = sculptBones[14].globalPosition;

        sculptBones[8].quaternion.setFromUnitVectors(
            sculptBones[8].globalPosition.clone().normalize(),
            R.GamePad.viveLeft.sculpt.position.clone().normalize()
        );

        //evt.globals.gru.bones[8].rotation.z = Math.PI / 2;

        // evt.globals.gru.bones[9].position.set(
        //     R.GamePad.viveLeft.sculpt.position.x,
        //     -R.GamePad.viveLeft.sculpt.position.y,
        //     -R.GamePad.viveLeft.sculpt.position.z);
        // evt.globals.gru.bones[15].position.set(
        //     R.GamePad.viveRight.sculpt.position.x,
        //     -R.GamePad.viveRight.sculpt.position.y,
        //     -R.GamePad.viveRight.sculpt.position.z);
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
        [-0.03, -2.8],
        [-1.1, -3.6],
        [-0.3, 3.5],
        [-2.4, -2.6],
        [-2, 2.82],
        [-3.3, 1.8],
        [-2.6, 0.6],
        [-4, -2.5],
        [-4.2, -1],
        [-4, 0.07],
        [1.5, -3.3],
        [1.5, 3.3],
        [2.4, 2.24],
        [3, -2.2],
        [3.7, -1.2],
        [3.5, 0.5]
    ];

    for (let i = 0; i < evt.globals.lowMinions.length; i++) {
        const minion = evt.globals.lowMinions[i];
        const position = positions[i % positions.length];
        minion.position.set(position[0], -1.1, position[1]);
        minion.rotation.y = Math.PI;
        minion.scale.set(1.35, 1.35, 1.35);
        minionSculpt.add(minion);
        animateMinion(minion);
    }
};

const initHighMinions = (evt) => {
    const minionSculpt = evt.globals.minionsSculpt;

    const positions = [
        [1.2, -1.8],
        [-0.9, -1.5],
        [-2.6, -0.8],
        [-2, 1.6],
        [-0.5, 1.4],
        [0.85, 1.8],
        [2, 0.9],
        [2.2, -0.4],
        [-1.5, 0.3]
    ];

    for (let i = 0; i < evt.globals.highMinions.length; i++) {
        const minion = evt.globals.highMinions[i];
        const position = positions[i % positions.length];
        minion.position.set(position[0], -1.1, position[1]);
        minion.rotation.y = Math.PI;
        minion.scale.set(1.35, 1.35, 1.35);
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
    minionsSculpt.position.z = 15;
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
    cameraSculpt.position.z = 15;
    cameraSculpt.position.y = -1.1;
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
    initGru(evt);
    syncGruMotion(evt);
    initPresentationScreen(evt);
    initPresentationControls(evt);
    makeBallScalable(evt);
    initMinions(evt);
});

state_init.taron.on('finish', (evt) => {

});

state_init.taron.on('fastForward', (evt) => {
    initRoom(evt);
    initGru(evt);
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