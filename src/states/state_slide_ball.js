import State from '../GameMechanics/State.js';
import {showSlideOnMainScreen} from '../random/changeSlide.js';
import {collision} from '../random/collision.js';
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
            console.log('throwing ball');
            throwingWall.removeEventListener(R.CONST.UPDATE, throwingWall);
            evt.gameMechanics.next();
        }
    };

    throwingWall.on(R.CONST.UPDATE, throwWallUpdate);
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
});

state_slide_ball.taron.on('finish', (evt) => {

});

state_slide_ball.taron.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 3);
    showBall(evt);
    hidePresentationControls(evt);
    initThrowingWall(evt);
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