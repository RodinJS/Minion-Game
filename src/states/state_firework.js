import State from '../GameMechanics/State.js';
import * as R from 'rodin/core';
import {Firework} from '../particleSystem/Firework.js';

/**
 * Shrink ball
 */
const shrinkBaall = (evt) => {
    const ball = evt.globals.ball;

    const shrinkAnimation = new R.AnimationClip('shrink', {
        scale: {
            x: .001,
            y: .001,
            z: .001
        }
    });
    shrinkAnimation.duration(200);

    ball.animation.add(shrinkAnimation);
    ball.animation.start('shrink');
};

/**
 * Init firework
 */
const initFirework = (evt) => {
    const firework = new Firework(1.5, [[2, -1, 1500], [-2, 1, 1600], [2, 1, 3000], [-2, -1.5, 3200]]);
    firework.position.set(0, 5, 5);
    R.Scene.add(firework);
    evt.globals.firework = firework;
};

/**
 * Transform ball to firework
 */
const ball2firework = (evt) => {
    const ball = evt.globals.ball;

    shrinkBaall(evt);
    ball.on(R.CONST.ANIMATION_COMPLETE, (e) => {
        if (e.animation === 'shrink') {
            initFirework(evt);
        }
    });
};

export const state_firework = {
    taron: new State('state_firework'),
    cardboard: new State('state_firework'),
    laptop: new State('state_firework'),
};

/**
 * TARON
 */

state_firework.taron.on('start', (evt) => {
    setTimeout(() => {
        ball2firework(evt);
    }, 10000);
});

state_firework.taron.on('finish', (evt) => {
});

state_firework.taron.on('fastForward', (evt) => {
    ball2firework(evt);
});

/**
 * CARDBOARD
 */

state_firework.cardboard.on('start', (evt) => {
    setTimeout(() => {
        ball2firework(evt);
    }, 5000);
});

state_firework.cardboard.on('finish', (evt) => {

});

state_firework.cardboard.on('fastForward', (evt) => {
    ball2firework(evt);
});

/**
 * LAPTOP
 */

state_firework.laptop.on('start', (evt) => {
    ball2firework(evt);
});

state_firework.laptop.on('finish', (evt) => {

});

state_firework.laptop.on('fastForward', (evt) => {
    ball2firework(evt);
});