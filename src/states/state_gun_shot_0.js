import State from '../GameMechanics/State.js';
import {GunShot} from '../particleSystem/GunShot.js';
import * as R from 'rodin/core';

/**
 * Shot
 */
const shot = (evt) => {
    const gunShot = new GunShot(evt.globals.gun.globalPosition, null, evt.globals.flyingMinions[0].globalPosition);
    R.Scene.add(gunShot);

    gunShot.on('haselem', (e) => {
        evt.globals.flyingMinions[0].animation.start('throw');
        evt.gameMechanics.next();
    });
};

export const state_gun_shot_0 = {
    taron: new State('state_gun_shot_0'),
    cardboard: new State('state_gun_shot_0'),
    laptop: new State('state_gun_shot_0'),
};

/**
 * TARON
 */

state_gun_shot_0.taron.on('start', (evt) => {
    shot(evt);
});

state_gun_shot_0.taron.on('finish', (evt) => {
});

state_gun_shot_0.taron.on('fastForward', (evt) => {
});

/**
 * CARDBOARD
 */

state_gun_shot_0.cardboard.on('start', (evt) => {
    shot(evt);
});

state_gun_shot_0.cardboard.on('finish', (evt) => {

});

state_gun_shot_0.cardboard.on('fastForward', (evt) => {
});

/**
 * LAPTOP
 */

state_gun_shot_0.laptop.on('start', (evt) => {
    shot(evt);
});

state_gun_shot_0.laptop.on('finish', (evt) => {
});

state_gun_shot_0.laptop.on('fastForward', (evt) => {
});