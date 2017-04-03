import State from '../GameMechanics/State.js';
import {shot} from '../random/shot.js';
import * as R from 'rodin/core';

const shotFinalPos = new R.utils.Vector3(10, 10, 10);

const addTriggerGunEvent = (evt) => {
    gunTriggerEvent.evt = evt;
    R.GamePad.viveRight.on(R.CONST.GAMEPAD_BUTTON_DOWN, gunTriggerEvent);
};

const gunTriggerEvent = (e) => {
    R.GamePad.viveRight.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, gunTriggerEvent);
    gunTriggerEvent.evt.gameMechanics.next();
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
    shot(evt, shotFinalPos, () => {
        // trcnenq minionin
        addTriggerGunEvent(evt);
    });
});

state_gun_shot_0.taron.on('finish', (evt) => {

});

state_gun_shot_0.taron.on('fastForward', (evt) => {
    // minion@ otum dnel!
});

/**
 * CARDBOARD
 */

state_gun_shot_0.cardboard.on('start', (evt) => {
    shot(evt, shotFinalPos, () => {
        // trcnenq minionin
    });
});

state_gun_shot_0.cardboard.on('finish', (evt) => {

});

state_gun_shot_0.cardboard.on('fastForward', (evt) => {
// minion@ otum dnel!
});

/**
 * LAPTOP
 */

state_gun_shot_0.laptop.on('start', (evt) => {
    shot(evt, shotFinalPos, () => {
        // trcnenq minionin
    });
});

state_gun_shot_0.laptop.on('finish', (evt) => {

});

state_gun_shot_0.laptop.on('fastForward', (evt) => {
// minion@ otum dnel!
});