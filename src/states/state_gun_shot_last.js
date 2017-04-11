import State from '../GameMechanics/State.js';
import {GunShot} from '../particleSystem/GunShot.js';
import * as R from 'rodin/core';
import {gunShotSound} from '../sounds/gameSounds.js';

/**
 * Shot
 */
const shot = (evt) => {
    const gunShot = new GunShot(evt.globals.gun.globalPosition, null, evt.globals.flyingMinions[3].globalPosition);
    R.Scene.add(gunShot);
	gunShotSound.play();
    gunShot.on('haselem', (e) => {
        evt.globals.flyingMinions[3].animation.start('throw');
        evt.gameMechanics.next();
    });
};

const shotNonTaron = (evt) => {
    const gunShot = new GunShot(evt.globals.gun.globalPosition, null, evt.globals.flyingMinions[3].globalPosition);
    R.Scene.add(gunShot);

    gunShot.on('haselem', (e) => {
        evt.globals.flyingMinions[3].animation.start('throw');
    });
};

export const state_gun_shot_last = {
    taron: new State('state_gun_shot_last'),
    cardboard: new State('state_gun_shot_last'),
    laptop: new State('state_gun_shot_last'),
};

/**
 * TARON
 */

state_gun_shot_last.taron.on('start', (evt) => {
    shot(evt);
});

state_gun_shot_last.taron.on('finish', (evt) => {
});

state_gun_shot_last.taron.on('fastForward', (evt) => {
});

/**
 * CARDBOARD
 */

state_gun_shot_last.cardboard.on('start', (evt) => {
    shotNonTaron(evt);
});

state_gun_shot_last.cardboard.on('finish', (evt) => {

});

state_gun_shot_last.cardboard.on('fastForward', (evt) => {
});

/**
 * LAPTOP
 */

state_gun_shot_last.laptop.on('start', (evt) => {
    shotNonTaron(evt);
});

state_gun_shot_last.laptop.on('finish', (evt) => {
});

state_gun_shot_last.laptop.on('fastForward', (evt) => {
});