import State from '../GameMechanics/State.js';
import {changeEnv} from '../random/changeEnv.js';
import * as R from 'rodin/core';
import {audio} from '../sounds/gameSounds.js'


export const state_change_env_3 = {
    taron: new State('state_change_env_3'),
    cardboard: new State('state_change_env_3'),
    laptop: new State('state_change_env_3'),
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

state_change_env_3.taron.on('start', (evt) => {
    changeEnv(evt, 3);
    addListenerForNext(evt);
    audio.play('minionsWow');

});

state_change_env_3.taron.on('finish', (evt) => {

});

state_change_env_3.taron.on('fastForward', (evt) => {
    changeEnv(evt, 3);
});

/**
 * CARDBOARD
 */

state_change_env_3.cardboard.on('start', (evt) => {
    changeEnv(evt, 3);
    audio.play('minionsWow');

});

state_change_env_3.cardboard.on('finish', (evt) => {

});

state_change_env_3.cardboard.on('fastForward', (evt) => {
    changeEnv(evt, 3);
});

/**
 * LAPTOP
 */

state_change_env_3.laptop.on('start', (evt) => {
    changeEnv(evt, 3);
    audio.play('minionsWow');
});

state_change_env_3.laptop.on('finish', (evt) => {

});

state_change_env_3.laptop.on('fastForward', (evt) => {
    changeEnv(evt, 3);
});