import State from '../GameMechanics/State.js';
import * as R from 'rodin/core';
import {Firework} from '../particleSystem/Firework.js';
import {audio} from "../sounds/gameSounds.js";

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
    const firework = new Firework(2, 0xfaffba, [[2, -1, 1500, 0xffbae6], [-2, 1, 1600, 0xbae9ff], [2, 1, 3000, 0xbaffbe], [-2, -1.5, 3200, 0xbcb5ff]]);
    firework.position.set(0, 7, 5);
    R.Scene.add(firework);
};

/**
 * Transform ball to firework
 */
const ball2firework = (evt) => {
    const ball = evt.globals.ball;
    shrinkBaall(evt);
    ball.on(R.CONST.ANIMATION_COMPLETE, (e) => {
        if (e.animation === 'shrink') {
            ball.parent = null;
            initFirework(evt);
        }
    });
};

const ball2FireworkLaptop = evt => {
    const ball = evt.globals.ball;
    shrinkBaall(evt);
    audio.play('fireWorkSound');
    ball.on(R.CONST.ANIMATION_COMPLETE, (e) => {
        if (e.animation === 'shrink') {
            ball.parent = null;
            initFirework(evt);
            audio.play('fireWorkSound');
            audio.play('minionsWow');
        }
    });
};

const ball2FireworkForward = evt => {
    evt.globals.ball.parent = null;
};

const addListenerForNext = (evt) => {
    const listener = (e) => {
        evt.gameMechanics.next();
        R.Scene.active.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
    };

    R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
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
    evt.globals.sharedBall.active(false);
    ball2firework(evt);
    addListenerForNext(evt);
});

state_firework.taron.on('finish', (evt) => {
});

state_firework.taron.on('fastForward', (evt) => {
    evt.globals.sharedBall.active(false);
    ball2FireworkForward(evt);
});

/**
 * CARDBOARD
 */

state_firework.cardboard.on('start', (evt) => {
    ball2firework(evt);
});

state_firework.cardboard.on('finish', (evt) => {

});

state_firework.cardboard.on('fastForward', (evt) => {
    ball2FireworkForward(evt);
});

/**
 * LAPTOP
 */

state_firework.laptop.on('start', (evt) => {
    ball2FireworkLaptop(evt);
});

state_firework.laptop.on('finish', (evt) => {

});

state_firework.laptop.on('fastForward', (evt) => {
    ball2FireworkForward(evt);
});