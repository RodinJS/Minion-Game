import State from '../GameMechanics/State.js';

const startBallFlying = (evt) => {
    const ball = evt.globals.ball;
    const ballFinalPosition = new R.utils.Vector3(0, 5, 5);

    const lerpBall = () => {
        if(ball.position.distanceTo(ballFinalPosition) < .1) {
            // todo: go to next state
            ball.removeEventListener(R.CONST.UPDATE, lerpBall);
            return;
        }
        ball.position.lerp(ballFinalPosition, .1);
    };

    ball.addEventListener(R.CONST.UPDATE,);
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
    startBallFlying();
});

state_init.taron.on('finish', (evt) => {

});

state_init.taron.on('fastForward', (evt) => {
    startBallFlying();
});

/**
 * CARDBOARD
 */

state_init.cardboard.on('start', (evt) => {

});

state_init.cardboard.on('finish', (evt) => {

});

state_init.cardboard.on('fastForward', (evt) => {

});

/**
 * LAPTOP
 */

state_init.laptop.on('start', (evt) => {

});

state_init.laptop.on('finish', (evt) => {

});

state_init.laptop.on('fastForward', (evt) => {

});