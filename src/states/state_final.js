import State from '../GameMechanics/State.js';
import {chengeEnv} from '../random/changeEnv.js';

export const state_final = {
    taron: new State('state_final'),
    cardboard: new State('state_final'),
    laptop: new State('state_final'),
};

/**
 * TARON
 */

state_final.taron.on('start', (evt) => {
    chengeEnv(evt, 5);
    evt.globals.snow.visible = false;
});

state_final.taron.on('finish', (evt) => {

});

state_final.taron.on('fastForward', (evt) => {
    chengeEnv(evt, 5);
    evt.globals.snow.visible = false;
});

/**
 * CARDBOARD
 */

state_final.cardboard.on('start', (evt) => {
    chengeEnv(evt, 5);
});

state_final.cardboard.on('finish', (evt) => {

});

state_final.cardboard.on('fastForward', (evt) => {
    chengeEnv(evt, 5);
});

/**
 * LAPTOP
 */

state_final.laptop.on('start', (evt) => {
    chengeEnv(evt, 5);
});

state_final.laptop.on('finish', (evt) => {

});

state_final.laptop.on('fastForward', (evt) => {
    chengeEnv(evt, 5);
});