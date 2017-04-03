import State from '../GameMechanics/State.js';
import * as R from 'rodin/core';

const startBallFlying = (evt) => {
    const ball = evt.globals.ball;
    R.Scene.add(ball);
    const ballFinalPosition = new R.utils.Vector3(0, 5, 5);

    const lerpBall = () => {
        if(ball.position.distanceTo(ballFinalPosition) < .1) {
            ball.removeEventListener(R.CONST.UPDATE, lerpBall);
            evt.gameMechanics.next();
            return;
        }
        ball.position.lerp(ballFinalPosition, .1);
    };

    ball.addEventListener(R.CONST.UPDATE, lerpBall);
};

export const state_ball_flying = {
    taron: new State('state_ball_flying'),
    cardboard: new State('state_ball_flying'),
    laptop: new State('state_ball_flying'),
};

/**
 * TARON
 */

state_ball_flying.taron.on('start', (evt) => {
    startBallFlying(evt);
});

state_ball_flying.taron.on('finish', (evt) => {

});

state_ball_flying.taron.on('fastForward', (evt) => {
    startBallFlying(evt);
});

/**
 * CARDBOARD
 */

state_ball_flying.cardboard.on('start', (evt) => {

});

state_ball_flying.cardboard.on('finish', (evt) => {

});

state_ball_flying.cardboard.on('fastForward', (evt) => {

});

/**
 * LAPTOP
 */

state_ball_flying.laptop.on('start', (evt) => {

});

state_ball_flying.laptop.on('finish', (evt) => {

});

state_ball_flying.laptop.on('fastForward', (evt) => {

});