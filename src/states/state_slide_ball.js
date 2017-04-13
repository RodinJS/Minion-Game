import State from '../GameMechanics/State.js';
import {showSlideOnMainScreen} from '../random/changeSlide.js';
import {collision} from '../random/collision.js';
import * as R from 'rodin/core';
import {makeScalable} from '../random/ScalableObject.js';
import {balloonBounceSound} from '../sounds/gameSounds.js';

/**
 * Init and show ball
 */
const showBall = (evt) => {
    const ball = evt.globals.ball;

    ball.position = evt.globals.presentationScreen.position.clone();
    evt.globals.sharedBall.active(true);
    R.Scene.add(ball);
};

/**
 * Hide Presentation controls (only for taron)
 */
const hidePresentationControls = (evt) => {
    const presentationControls = evt.globals.presentationControls;
    R.Scene.remove(presentationControls);
};

/**
 * Init throwing wall
 */
const initThrowingWall = (evt) => {
    const throwingWall = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(2, 1, 5, 5), new THREE.MeshBasicMaterial({wireframe: true, side: THREE.DoubleSide})));
    throwingWall.position.set(0, 2, 1.5);
    R.Scene.add(throwingWall);

    const throwWallUpdate = () => {
        if(collision.sphere2Plane(evt.globals.ball, throwingWall)) {
            throwingWall.removeEventListener(R.CONST.UPDATE, throwWallUpdate);
            evt.gameMechanics.next();
        }
    };

    throwingWall.on(R.CONST.UPDATE, throwWallUpdate);
    evt.globals.throwingWall = throwingWall;
};

const makeBallScalable = (evt) => {
    makeScalable(evt.globals.ball);
};

const initBallAnimation = (evt) => {
    const ball = evt.globals.ball;
    const hand = evt.globals.rightHand;

    const listener = () => {
        const anim = new R.AnimationClip('takeBall', {
            position: {
                x: hand.globalPosition.x,
                y: hand.globalPosition.y,
                z: hand.globalPosition.z,
            }
        });
        anim.duration(500);

        ball.animation.add(anim);
        ball.on(R.CONST.ANIMATION_COMPLETE, (e) => {
            if(e.animation === 'takeBall') {
                makeBallScalable(evt);
            }
        });

        ball.animation.start('takeBall');

        ball.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, listener)
    };

    ball.on(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
};

export const state_slide_ball = {
    taron: new State('state_slide_ball'),
    cardboard: new State('state_slide_ball'),
    laptop: new State('state_slide_ball'),
};

/**
 * TARON
 */

state_slide_ball.taron.on('start', (evt) => {
    showSlideOnMainScreen(evt, 3);
    showBall(evt);
    hidePresentationControls(evt);
    initThrowingWall(evt);
    initBallAnimation(evt);
});

state_slide_ball.taron.on('finish', (evt) => {

});

state_slide_ball.taron.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 3);
    showBall(evt);
    hidePresentationControls(evt);
    initThrowingWall(evt);
    makeBallScalable(evt);
});

/**
 * CARDBOARD
 */

state_slide_ball.cardboard.on('start', (evt) => {
    showSlideOnMainScreen(evt, 3);
    showBall(evt);
});

state_slide_ball.cardboard.on('finish', (evt) => {

});

state_slide_ball.cardboard.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 3);
    showBall(evt);
});

/**
 * LAPTOP
 */

state_slide_ball.laptop.on('start', (evt) => {
    showSlideOnMainScreen(evt, 3);
    showBall(evt);
});

state_slide_ball.laptop.on('finish', (evt) => {

});

state_slide_ball.laptop.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 3);
    showBall(evt);
    ballSound(evt);
});