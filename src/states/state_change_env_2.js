import State from '../GameMechanics/State.js';
import {changeEnv} from '../random/changeEnv.js';
import * as R from 'rodin/core';
import {audio} from '../sounds/gameSounds.js'


export const state_change_env_2 = {
    taron: new State('state_change_env_2'),
    cardboard: new State('state_change_env_2'),
    laptop: new State('state_change_env_2'),
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

state_change_env_2.taron.on('start', (evt) => {
    changeEnv(evt, 2);
    addListenerForNext(evt);
    audio.play('minionsWow');

});

state_change_env_2.taron.on('finish', (evt) => {

});

state_change_env_2.taron.on('fastForward', (evt) => {
    changeEnv(evt, 2);
});

/**
 * CARDBOARD
 */

state_change_env_2.cardboard.on('start', (evt) => {
    changeEnv(evt, 2);
    audio.play('minionsWow');

});

state_change_env_2.cardboard.on('finish', (evt) => {

});

state_change_env_2.cardboard.on('fastForward', (evt) => {
    changeEnv(evt, 2);
});

/**
 * LAPTOP
 */

state_change_env_2.laptop.on('start', (evt) => {
    changeEnv(evt, 2);
    audio.play('minionsWow');

});

state_change_env_2.laptop.on('finish', (evt) => {

});

state_change_env_2.laptop.on('fastForward', (evt) => {
    changeEnv(evt, 2);
});