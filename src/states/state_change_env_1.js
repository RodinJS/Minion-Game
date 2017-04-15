import State from '../GameMechanics/State.js';
import {changeEnv} from '../random/changeEnv.js';
import * as R from 'rodin/core';
import {audio} from '../sounds/gameSounds.js'

export const state_change_env_1 = {
    taron: new State('state_change_env_1'),
    cardboard: new State('state_change_env_1'),
    laptop: new State('state_change_env_1'),
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

state_change_env_1.taron.on('start', (evt) => {
    changeEnv(evt, 1);
    addListenerForNext(evt);
    evt.globals.snow.visible = false;
});

state_change_env_1.taron.on('finish', (evt) => {

});

state_change_env_1.taron.on('fastForward', (evt) => {
    changeEnv(evt, 1);
    evt.globals.snow.visible = false;
});

/**
 * CARDBOARD
 */

state_change_env_1.cardboard.on('start', (evt) => {
    changeEnv(evt, 1);
});

state_change_env_1.cardboard.on('finish', (evt) => {

});

state_change_env_1.cardboard.on('fastForward', (evt) => {
    changeEnv(evt, 1);
});

/**
 * LAPTOP
 */

state_change_env_1.laptop.on('start', (evt) => {
    changeEnv(evt, 1);
    // audio.play('minionsWow');

});

state_change_env_1.laptop.on('finish', (evt) => {

});

state_change_env_1.laptop.on('fastForward', (evt) => {
    changeEnv(evt, 1);
});