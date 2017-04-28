import State from '../GameMechanics/State.js';
import {GunShot} from '../particleSystem/GunShot.js';
import {highlightMinion} from '../random/highlight.js';
import * as R from 'rodin/core';
import {audio} from '../sounds/gameSounds.js';


/**
 * Shot
 */
const shot = (evt) => {
    const gunShot = new GunShot(evt.globals.gun, new THREE.Vector3(0, 1, 0).add(evt.globals.flyingMinions[1].globalPosition));
    R.Scene.add(gunShot);
    audio.play('gunShotSound');
    gunShot.on('haselem', (e) => {
        audio.play('minionsScream');
        audio.play('minionsWow');
        audio.play('minionLaughin');
        evt.globals.flyingMinions[1].animation.start('throw');
        highlightMinion(evt.globals.flyingMinions[2], evt);
        addListenerForNextShot(evt);
    });
};

const shotNonTaron = (evt) => {
    const gunShot = new GunShot(evt.globals.gun, new THREE.Vector3(0, 1, 0).add(evt.globals.flyingMinions[1].globalPosition));
    R.Scene.add(gunShot);
    gunShot.on('haselem', (e) => {
        evt.globals.flyingMinions[1].animation.start('throw');
    });
};

const shotLaptop = evt => {
    const gunShot = new GunShot(evt.globals.gun, new THREE.Vector3(0, 1, 0).add(evt.globals.flyingMinions[1].globalPosition));
    audio.play('gunShotSound');
    R.Scene.add(gunShot);
    gunShot.on('haselem', (e) => {
        audio.play('minionsScream');
        audio.play('minionsWow');
        audio.play('minionLaughin');
        evt.globals.flyingMinions[1].animation.start('throw');
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

export const state_gun_shot_1 = {
    taron: new State('state_gun_shot_1'),
    cardboard: new State('state_gun_shot_1'),
    laptop: new State('state_gun_shot_1'),
};

/**
 * TARON
 */

state_gun_shot_1.taron.on('start', (evt) => {
    shot(evt);
});

state_gun_shot_1.taron.on('finish', (evt) => {
});

state_gun_shot_1.taron.on('fastForward', (evt) => {
});

/**
 * CARDBOARD
 */

state_gun_shot_1.cardboard.on('start', (evt) => {
    shotNonTaron(evt);
});

state_gun_shot_1.cardboard.on('finish', (evt) => {
});

state_gun_shot_1.cardboard.on('fastForward', (evt) => {
});

/**
 * LAPTOP
 */

state_gun_shot_1.laptop.on('start', (evt) => {
    // shotNonTaron(evt);
    shotLaptop(evt);
});

state_gun_shot_1.laptop.on('finish', (evt) => {
});

state_gun_shot_1.laptop.on('fastForward', (evt) => {
    shotLaptop(evt);
});