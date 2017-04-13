import State from '../GameMechanics/State.js';
import {makeScalable} from '../random/ScalableObject.js';
import * as R from 'rodin/core';

const makeBallScalable = (evt) => {
    makeScalable(evt.globals.ball);
};

const initBallAnimation = (evt) => {
    const ball = evt.globals.ball;
    const hand = evt.globals.rightHand;

    const listener = () => {
        console.log('asd');
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
            if(e.animation === 'takeBall')
                evt.gameMechanics.next();
        });

        ball.animation.start('takeBall');

        ball.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, listener)
    };

    ball.on(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
};

export const state_take_ball = {
    taron: new State('state_take_ball'),
    cardboard: new State('state_take_ball'),
    laptop: new State('state_take_ball'),
};

/**
 * TARON
 */

state_take_ball.taron.on('start', (evt) => {
    initBallAnimation();
});

state_take_ball.taron.on('finish', (evt) => {

});

state_take_ball.taron.on('fastForward', (evt) => {

});

/**
 * CARDBOARD
 */

state_take_ball.cardboard.on('start', (evt) => {

});

state_take_ball.cardboard.on('finish', (evt) => {

});

state_take_ball.cardboard.on('fastForward', (evt) => {

});

/**
 * LAPTOP
 */

state_take_ball.laptop.on('start', (evt) => {

});

state_take_ball.laptop.on('finish', (evt) => {

});

state_take_ball.laptop.on('fastForward', (evt) => {

});