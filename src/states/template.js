/**
 * When making states copy this and modify!
 */
import State from '../GameMechanics/State.js';

export const state_init = {
    taron: new State('state_init'),
    cardboard: new State('state_init'),
    laptop: new State('state_init'),
};

/**
 * TARON
 */

state_init.taron.on('start', (evt) => {

});

state_init.taron.on('finish', (evt) => {

});

state_init.taron.on('fastForward', (evt) => {

});

/**
 * CARDBOARD
 */

state_init.cardboard.on('start', (evt) => {

});

state_init.cardboard.on('finish', (evt) => {

});

state_init.cardboard.on('fastForward', (evt) => {

});

/**
 * LAPTOP
 */

state_init.laptop.on('start', (evt) => {

});

state_init.laptop.on('finish', (evt) => {

});

state_init.laptop.on('fastForward', (evt) => {

});