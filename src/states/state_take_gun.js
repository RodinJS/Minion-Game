import State from '../GameMechanics/State.js';
import * as R from 'rodin/core';

/**
 * Init and show gun
 */
const showGun = (evt) => {
    const gun = evt.globals.gun;
    R.Scene.add(gun);
};

/**
 * Add gun to hand
 */
// kanchel erb dzere hetevna
const addToHand = (evt) => {
    const gun = evt.globals.gun;
    R.GamePad.viveRight.sculpt.add(gun);
    addTriggerGunEvent(evt);
};

/**
 * add trigger on gamePad button down
 * @param evt
 */
const addTriggerGunEvent = (evt) => {
    gunTriggerEvent.evt = evt;
    R.GamePad.viveRight.on(R.CONST.GAMEPAD_BUTTON_DOWN, gunTriggerEvent);
};

/**
 * remove trigger from gamPad, go to next state
 * @param e
 */
const gunTriggerEvent = (e) => {
    R.GamePad.viveRight.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, gunTriggerEvent);
    gunTriggerEvent.evt.gameMechanics.next();
};


export const state_take_gun = {
    taron: new State('state_take_gun'),
    cardboard: new State('state_take_gun'),
    laptop: new State('state_take_gun'),
};

/**
 * TARON
 */

state_take_gun.taron.on('start', (evt) => {
    showGun(evt);
    addToHand(evt);
    evt.globals.sharedGun.active(true);

});

state_take_gun.taron.on('finish', (evt) => {

});

state_take_gun.taron.on('fastForward', (evt) => {
    showGun(evt);
    addToHand(evt);
    evt.globals.sharedGun.active(true);
});

/**
 * CARDBOARD
 */

state_take_gun.cardboard.on('start', (evt) => {
    showGun(evt);
});

state_take_gun.cardboard.on('finish', (evt) => {

});

state_take_gun.cardboard.on('fastForward', (evt) => {
    showGun(evt);
});

/**
 * LAPTOP
 */

state_take_gun.laptop.on('start', (evt) => {
    showGun(evt);
});

state_take_gun.laptop.on('finish', (evt) => {

});

state_take_gun.laptop.on('fastForward', (evt) => {
    showGun(evt);
});