import State from '../GameMechanics/State.js';
import {GunShot} from '../particleSystem/GunShot.js';
import {highlightMinion} from '../random/highlight.js';
import * as R from 'rodin/core';
import {gunShotSound, minionsScream, minionsWow, minionLaughing} from '../sounds/gameSounds.js';

/**
 * Shot
 */
const shot = (evt) => {
    const gunShot = new GunShot(evt.globals.gun, new THREE.Vector3(0, 1, 0).add(evt.globals.flyingMinions[2].globalPosition));
    R.Scene.add(gunShot);
	gunShotSound.play();
    gunShot.on('haselem', (e) => {
        minionsScream.play();
        minionsWow.play();
        minionLaughing.play();
        evt.globals.flyingMinions[2].animation.start('throw');
        highlightMinion(evt.globals.flyingMinions[3], evt);
        addListenerForNextShot(evt);
    });
};

const shotNonTaron = (evt) => {
    const gunShot = new GunShot(evt.globals.gun, new THREE.Vector3(0, 1, 0).add(evt.globals.flyingMinions[2].globalPosition));
    R.Scene.add(gunShot);
    gunShotSound.play();
    gunShot.on('haselem', (e) => {
        minionsScream.play();
        minionsWow.play();
        minionLaughing.play();
        evt.globals.flyingMinions[2].animation.start('throw');
    });
};

/**
 * Add listener for first shot
 */
const addListenerForNextShot = (evt) => {
    const gun = evt.globals.gun;
    const listener = (e) => {
        // todo: fix this to vive
        gun.eventHandler.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
        evt.gameMechanics.next();
    };

    gun.eventHandler.on(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
};

export const state_gun_shot_2 = {
    taron: new State('state_gun_shot_2'),
    cardboard: new State('state_gun_shot_2'),
    laptop: new State('state_gun_shot_2'),
};

/**
 * TARON
 */

state_gun_shot_2.taron.on('start', (evt) => {
    shot(evt);
});

state_gun_shot_2.taron.on('finish', (evt) => {
});

state_gun_shot_2.taron.on('fastForward', (evt) => {
});

/**
 * CARDBOARD
 */

state_gun_shot_2.cardboard.on('start', (evt) => {
    shotNonTaron(evt);
});

state_gun_shot_2.cardboard.on('finish', (evt) => {
});

state_gun_shot_2.cardboard.on('fastForward', (evt) => {
});

/**
 * LAPTOP
 */

state_gun_shot_2.laptop.on('start', (evt) => {
    shotNonTaron(evt);
});

state_gun_shot_2.laptop.on('finish', (evt) => {
});

state_gun_shot_2.laptop.on('fastForward', (evt) => {
});