import State from '../GameMechanics/State.js';
import {changeEnv} from '../random/changeEnv.js';
import * as R from 'rodin/core';
import {audio} from "../sounds/gameSounds.js";

const hideStuff = (evt) => {
    evt.globals.room.parent = null;
    evt.globals.presentationScreen.parent = null;

    for (let i = 0; i < evt.globals.lowMinions.length; i++) {
        evt.globals.lowMinions[i].children[0]._threeObject.material.materials[0].color = new THREE.Color(0.8, 0.8, 0.8);
    }
};

let snowInited = false;

const addListenerForNext = (evt) => {
    const listener = (e) => {
        if(!snowInited) {
            evt.globals.snow.visible = true;
            snowInited = true;
        } else {
            evt.gameMechanics.next();
            R.Scene.active.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
        }
    };

    R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
};

export const state_change_env_0 = {
    taron: new State('state_change_env_0'),
    cardboard: new State('state_change_env_0'),
    laptop: new State('state_change_env_0'),
};

/**
 * TARON
 */

state_change_env_0.taron.on('start', (evt) => {
    hideStuff(evt);
    changeEnv(evt, 0);
    addListenerForNext(evt);
    audio.play('minionsWow');

});

state_change_env_0.taron.on('finish', (evt) => {

});

state_change_env_0.taron.on('fastForward', (evt) => {
    hideStuff(evt);
    changeEnv(evt, 0);
});

/**
 * CARDBOARD
 */

state_change_env_0.cardboard.on('start', (evt) => {
    hideStuff(evt);
    changeEnv(evt, 0);

});

state_change_env_0.cardboard.on('finish', (evt) => {

});

state_change_env_0.cardboard.on('fastForward', (evt) => {
    hideStuff(evt);
    changeEnv(evt, 0);
});

/**
 * LAPTOP
 */

state_change_env_0.laptop.on('start', (evt) => {
    hideStuff(evt);
    changeEnv(evt, 0);
    audio.play('minionsWow');
});

state_change_env_0.laptop.on('finish', (evt) => {

});

state_change_env_0.laptop.on('fastForward', (evt) => {
    hideStuff(evt);
    changeEnv(evt, 0);
});