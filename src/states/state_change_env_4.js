import State from '../GameMechanics/State.js';
import {chengeEnv} from '../random/changeEnv.js';
import * as R from 'rodin/core';

export const state_change_env_4 = {
    taron: new State('state_change_env_4'),
    cardboard: new State('state_change_env_4'),
    laptop: new State('state_change_env_4'),
};

const addListenerForNext = (evt) => {
    const listener = (e) => {
        evt.gameMechanics.next();
        R.Scene.active.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
    };

    R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
};


/**
 * TARON
 */

state_change_env_4.taron.on('start', (evt) => {
    chengeEnv(evt, 4);
    addListenerForNext(evt);
    evt.globals.snow.visible = true;
});

state_change_env_4.taron.on('finish', (evt) => {

});

state_change_env_4.taron.on('fastForward', (evt) => {
    chengeEnv(evt, 4);
    evt.globals.snow.visible = true;
});

/**
 * CARDBOARD
 */

state_change_env_4.cardboard.on('start', (evt) => {
    chengeEnv(evt, 4);
});

state_change_env_4.cardboard.on('finish', (evt) => {

});

state_change_env_4.cardboard.on('fastForward', (evt) => {
    chengeEnv(evt, 4);
});

/**
 * LAPTOP
 */

state_change_env_4.laptop.on('start', (evt) => {
    chengeEnv(evt, 4);
});

state_change_env_4.laptop.on('finish', (evt) => {

});

state_change_env_4.laptop.on('fastForward', (evt) => {
    chengeEnv(evt, 4);
});