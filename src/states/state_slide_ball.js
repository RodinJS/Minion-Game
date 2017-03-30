import State from '../GameMechanics/State.js';
import {showSlideOnMainScreen} from '../random/changeSlide.js';
import * as R from 'rodin/core';

/**
 * Init and show ball
 */
const showBall = (evt) => {
    const ball = evt.globals.ball;
    ball.position = evt.globals.presentationScreen.position.clone();

    evt.globals.sharedBall.active(true);

    R.Scene.add(ball);
};

const addListenerOnUpdateToCheckIfBallTaken = (evt) => {
    const ball = evt.globals.ball;

    /**
     * This function is separated to change later
     */
    const mustTakeBall = () => {
        return R.GamePad.getButtonDown(R.Buttons.oculusTouchLeftTrigger) || R.GamePad.getButtonDown(R.Buttons.oculusTouchRightTrigger);
    };

    /**
     * Calling this function on ball update
     */
    const tryTakeBall = () => {
        if(mustTakeBall()) {
            console.log('asd');

            /**
             * We need these for next state
             * To Check if second hand is zooming ball
             */
            evt.globals.ballGamePad = R.GamePad.oculusTouchRight;
            evt.globals.secondGamePad = evt.globals.ballGamePad.hand === 'left' ? R.GamePad.oculusTouchRight : R.GamePad.oculusTouchLeft;
            ball.removeEventListener(R.CONST.UPDATE, tryTakeBall);
            evt.gameMechanics.next();
        }
    };

    ball.on(R.CONST.UPDATE, tryTakeBall);
};

/**
 * Hide Presentation controls (only for taron)
 */
const hidePresentationControls = (evt) => {
    const presentationControls = evt.globals.presentationControls;
    R.Scene.remove(presentationControls);
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
    addListenerOnUpdateToCheckIfBallTaken(evt);
});

state_slide_ball.taron.on('finish', (evt) => {

});

state_slide_ball.taron.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 3);
    showBall(evt);
    hidePresentationControls(evt);
    addListenerOnUpdateToCheckIfBallTaken(evt);
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
});