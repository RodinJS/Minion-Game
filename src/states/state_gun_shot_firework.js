import State from '../GameMechanics/State.js';
import {GunShot} from '../particleSystem/GunShot.js';
import * as R from 'rodin/core';
import {audio} from '../sounds/gameSounds.js';

/**
 * Shot
 */
const shot = (evt) => {
    const gunShot = new GunShot(evt.globals.gun, evt.globals.ball.globalPosition);
    R.Scene.add(gunShot);
    gunShot.on('haselem', (e) => {
        evt.gameMechanics.next();
    });
};

const shotNonTaron = (evt) => {
    const gunShot = new GunShot(evt.globals.gun, evt.globals.ball.globalPosition);
    audio.play('gunShotSound');
    R.Scene.add(gunShot);
};

const shotLaptop = (evt) => {
    const gunShot = new GunShot(evt.globals.gun, evt.globals.ball.globalPosition);
    audio.play('gunShotSound');
    R.Scene.add(gunShot);
};


export const state_gun_shot_firework = {
    taron: new State('state_gun_shot_firework'),
    cardboard: new State('state_gun_shot_firework'),
    laptop: new State('state_gun_shot_firework'),
};

/**
 * TARON
 */

state_gun_shot_firework.taron.on('start', (evt) => {
    shot(evt);
});

state_gun_shot_firework.taron.on('finish', (evt) => {
});

state_gun_shot_firework.taron.on('fastForward', (evt) => {
});

/**
 * CARDBOARD
 */

state_gun_shot_firework.cardboard.on('start', (evt) => {
    shotNonTaron(evt);
});

state_gun_shot_firework.cardboard.on('finish', (evt) => {

});

state_gun_shot_firework.cardboard.on('fastForward', (evt) => {
});

/**
 * LAPTOP
 */

state_gun_shot_firework.laptop.on('start', (evt) => {
    shotLaptop(evt);
});

state_gun_shot_firework.laptop.on('finish', (evt) => {
});

state_gun_shot_firework.laptop.on('fastForward', (evt) => {
    shotLaptop(evt);
});