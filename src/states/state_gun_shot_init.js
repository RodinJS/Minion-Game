import State from '../GameMechanics/State.js';
import {highlightMinion} from '../random/highlight.js';
import * as R from 'rodin/core';

/**
 * Taron mode
 */
const addGun2Gamepad = (evt) => {
    evt.globals.gunGamepad.sculpt.add(evt.globals.gun);
    //todo: add transparency
    const gunEventHandler = new R.Box(1, new THREE.MeshBasicMaterial({wireframe: true}));
    gunEventHandler.position.set(0, 0, -1.5);
    evt.globals.gun.add(gunEventHandler);
    evt.globals.gun.eventHandler = gunEventHandler;
    evt.globals.sharedGun.active(true);
};

/**
 * Slave mode
 */
const addGun2Scene = (evt) => {
    R.Scene.add(evt.globals.gun);
    evt.globals.sharedGun.active(true);
};

/**
 * Add listener for first shot
 */
const addListenerForFirstShot = (evt) => {
    const gun = evt.globals.gun;
    const listener = (e) => {
        // todo: fix this to vive
        gun.eventHandler.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
        evt.gameMechanics.next();
    };

    gun.eventHandler.on(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
};

export const state_gun_shot_init = {
    taron: new State('state_gun_shot_init'),
    cardboard: new State('state_gun_shot_init'),
    laptop: new State('state_gun_shot_init'),
};

/**
 * TARON
 */

state_gun_shot_init.taron.on('start', (evt) => {
    addGun2Gamepad(evt);
    addListenerForFirstShot(evt);
    highlightMinion(evt.globals.flyingMinions[0], evt);
});

state_gun_shot_init.taron.on('finish', (evt) => {
});

state_gun_shot_init.taron.on('fastForward', (evt) => {
    addGun2Gamepad(evt);
});

/**
 * CARDBOARD
 */

state_gun_shot_init.cardboard.on('start', (evt) => {
    addGun2Scene(evt);
});

state_gun_shot_init.cardboard.on('finish', (evt) => {

});

state_gun_shot_init.cardboard.on('fastForward', (evt) => {
    addGun2Scene(evt);
});

/**
 * LAPTOP
 */

state_gun_shot_init.laptop.on('start', (evt) => {
    addGun2Scene(evt);
});

state_gun_shot_init.laptop.on('finish', (evt) => {
});

state_gun_shot_init.laptop.on('fastForward', (evt) => {
    addGun2Scene(evt);
});