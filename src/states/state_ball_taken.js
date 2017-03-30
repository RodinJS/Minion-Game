import State from '../GameMechanics/State.js';
import * as R from 'rodin/core';
window.R = R;

/**
 * Take ball.
 * Just add to gamepad
 */
const takeBall = (evt) => {
    const ball = evt.globals.ball;
    const ballGamePad = evt.globals.ballGamePad;
    const secondGamePad = evt.globals.secondGamePad;

    let zoomStartDistance = 0;
    let zoomStartScale = 0;
    let zoomStartZ = 0;

    ballGamePad.sculpt.add(ball);
    ball.position.set(0, 0, - ball.radius);

    ball.on(R.CONST.UPDATE, () => {
        /**
         * todo: change to vive
         * Zooming ball
         */
        if(R.GamePad.getButton(R.Buttons.oculusTouchLeftTrigger) && R.GamePad.getButton(R.Buttons.oculusTouchRightTrigger)) {
            const currentDistance = secondGamePad.sculpt.position.distanceTo(ballGamePad.sculpt.position);
            const currentZ = ball.globalPosition.distanceTo(ballGamePad.sculpt.position);

            if(!zoomStartDistance) {
                zoomStartDistance = currentDistance;
                zoomStartScale = ball.scale.x;
                zoomStartZ = currentZ;
            }

            const scale = currentDistance / zoomStartDistance * zoomStartScale;
            ball.scale.set(scale, scale, scale);
            ball.position.z = - currentDistance / zoomStartDistance * zoomStartZ;
        }

        /**
         * todo: check if this is normal
         * Ball is taken but not zooming
         */
        else {
            zoomStartDistance = 0;
        }
    });
};


export const state_ball_taken = {
    taron: new State('state_ball_taken'),
    cardboard: new State('state_ball_taken'),
    laptop: new State('state_ball_taken'),
};

/**
 * TARON
 */

state_ball_taken.taron.on('start', (evt) => {
    takeBall(evt);
});

state_ball_taken.taron.on('finish', (evt) => {

});

state_ball_taken.taron.on('fastForward', (evt) => {
    takeBall(evt);
});

/**
 * CARDBOARD
 */

state_ball_taken.cardboard.on('start', (evt) => {

});

state_ball_taken.cardboard.on('finish', (evt) => {

});

state_ball_taken.cardboard.on('fastForward', (evt) => {

});

/**
 * LAPTOP
 */

state_ball_taken.laptop.on('start', (evt) => {

});

state_ball_taken.laptop.on('finish', (evt) => {

});

state_ball_taken.laptop.on('fastForward', (evt) => {

});