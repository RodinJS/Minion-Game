import State from '../GameMechanics/State.js';
import {makeUnscaleable} from '../random/ScalableObject.js';
import {levitate} from '../random/levitate.js';
import * as R from 'rodin/core';

/**
 * Start flying ball (taron only)
 */
const startBallFlying = (evt) => {
    const ball = evt.globals.ball;
    makeUnscaleable(ball);
    R.Scene.add(ball);

    const ballAnim = new R.AnimationClip('ball', {
        position: {
            x: 0,
            y: 5,
            z: 5,
        },
        scale: {
            x: this.maxScale || 2,
            y: this.maxScale || 2,
            z: this.maxScale || 2,
        }
    });
    ballAnim.duration(700);

    ball.animation.add(ballAnim);
    ball.animation.start('ball');
    ball.on(R.CONST.ANIMATION_COMPLETE, (e) => {
        if(e.animation === 'ball') {
            levitate(ball, Infinity, new R.utils.Vector3(.5, .5, .5));
            evt.gameMechanics.next();
        }
    });
};

/**
 * Ball flying fast forward
 */
const ballFlyingFastForward = (evt) => {
    const ball = evt.globals.ball;
    ball.position.set(0, 5, 5);
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
    ballFlyingFastForward(evt);
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