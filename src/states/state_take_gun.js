import State from '../GameMechanics/State.js';
import * as R from 'rodin/core';

/**
 * Add gun
 * @param evt
 */
const addTriggerGunEvent = (evt) => {
    // todo: fix this to vive
    const gamepad = R.GamePad.oculusTouchRight;
    evt.globals.gunGamepad = gamepad;
    evt.globals.throwingWall.parent = null;
    const addGunToOculus = (e) => {
        // todo: fix this to vive
        if(R.Buttons.oculusTouchRightTrigger.pressed) {
            gamepad.removeEventListener(R.CONST.UPDATE, addGunToOculus);
            evt.gameMechanics.next();
        }
    };

    gamepad.on(R.CONST.UPDATE, addGunToOculus);
};

const takeGunForward = (evt) => {
    const gamepad = R.GamePad.oculusTouchRight;
    evt.globals.gunGamepad = gamepad;
    evt.globals.throwingWall.parent = null;
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
    addTriggerGunEvent(evt);
});

state_take_gun.taron.on('finish', (evt) => {
});

state_take_gun.taron.on('fastForward', (evt) => {
    takeGunForward(evt);
});

/**
 * CARDBOARD
 */

state_take_gun.cardboard.on('start', (evt) => {
});

state_take_gun.cardboard.on('finish', (evt) => {
});

state_take_gun.cardboard.on('fastForward', (evt) => {
});

/**
 * LAPTOP
 */

state_take_gun.laptop.on('start', (evt) => {
});

state_take_gun.laptop.on('finish', (evt) => {
});

state_take_gun.laptop.on('fastForward', (evt) => {
});