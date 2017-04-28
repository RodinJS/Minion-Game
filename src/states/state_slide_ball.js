import State from '../GameMechanics/State.js';
import {showSlideOnMainScreen} from '../random/changeSlide.js';
import {collision} from '../random/collision.js';
import * as R from 'rodin/core';
import {makeScalable} from '../random/ScalableObject.js';

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
 * Init add scale listener wall
 */
const addScaleListener = (evt) => {
    evt.globals.ball.on("SCALED", (e) => {
        setTimeout(()=>{evt.gameMechanics.next();}, 1500);
    });
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
                z: hand.globalPosition.z
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

const removeSplash = (evt)=>{
    document.getElementById('wait').style.display = 'none';
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
    showBall(evt);
    hidePresentationControls(evt);
    addScaleListener(evt);
    initBallAnimation(evt);
});

state_slide_ball.taron.on('finish', (evt) => {

});

state_slide_ball.taron.on('fastForward', (evt) => {
    showBall(evt);
    hidePresentationControls(evt);
    addScaleListener(evt);
    makeBallScalable(evt);
});

/**
 * CARDBOARD
 */

state_slide_ball.cardboard.on('start', (evt) => {
    showBall(evt);
    removeSplash(evt);
});

state_slide_ball.cardboard.on('finish', (evt) => {

});

state_slide_ball.cardboard.on('fastForward', (evt) => {
    showBall(evt);
    removeSplash(evt);
});

/**
 * LAPTOP
 */

state_slide_ball.laptop.on('start', (evt) => {
    showBall(evt);
});

state_slide_ball.laptop.on('finish', (evt) => {

});

state_slide_ball.laptop.on('fastForward', (evt) => {
    showBall(evt);
});