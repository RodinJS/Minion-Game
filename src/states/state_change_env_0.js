import State from '../GameMechanics/State.js';
import * as R from 'rodin/core';
import {SkySphere} from '../random/SkySphere.js';

const hideStuff = (evt) => {
    evt.globals.room.parent = null;
};

const chengeEnv = (evt) => {
    if(evt.globals.env) {
        evt.globals.env.dispose();
    }

    evt.globals.env = new SkySphere(evt.globals.envTextures[0]);
    R.Scene.add(evt.globals.env);
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
    chengeEnv(evt);
});

state_change_env_0.taron.on('finish', (evt) => {

});

state_change_env_0.taron.on('fastForward', (evt) => {
    hideStuff(evt);
    chengeEnv(evt);
});

/**
 * CARDBOARD
 */

state_change_env_0.cardboard.on('start', (evt) => {
    hideStuff(evt);
    chengeEnv(evt);
});

state_change_env_0.cardboard.on('finish', (evt) => {

});

state_change_env_0.cardboard.on('fastForward', (evt) => {
    hideStuff(evt);
    chengeEnv(evt);
});

/**
 * LAPTOP
 */

state_change_env_0.laptop.on('start', (evt) => {
    hideStuff(evt);
    chengeEnv(evt);
});

state_change_env_0.laptop.on('finish', (evt) => {

});

state_change_env_0.laptop.on('fastForward', (evt) => {
    hideStuff(evt);
    chengeEnv(evt);
});