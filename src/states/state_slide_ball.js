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

/**
 * Hide Presentation controls (only for taron)
 */
const hidePresentationControls = (evt) => {
    const presentationControls = evt.globals.presentationControls;
    R.Scene.remove(presentationControls);

    evt.globals.ball.on(R.CONST.UPDATE, function () {
        this.position.x += R.Time.delta * 0.001;
    });
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
});

state_slide_ball.taron.on('finish', (evt) => {

});

state_slide_ball.taron.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 3);
    showBall(evt);
    hidePresentationControls(evt);
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