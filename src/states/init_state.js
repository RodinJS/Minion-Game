import State from '../GameMechanics/State.js';

export const state_init = {
    taron: new State('state_init'),
    cardboard: new State('state_init'),
    laptop: new State('state_init'),
};

/**
 * TARON
 */

state_init.taron.on('start', (evt, globals, locals) => {

});

state_init.taron.on('finish', (evt, globals, locals) => {

});

state_init.taron.on('fastForward', (evt, globals, locals) => {

});

/**
 * CARDBOARD
 */

state_init.cardboard.on('start', (evt, globals, locals) => {

});

state_init.cardboard.on('finish', (evt, globals, locals) => {

});

state_init.cardboard.on('fastForward', (evt, globals, locals) => {

});

/**
 * LAPTOP
 */

state_init.laptop.on('start', (evt, globals, locals) => {

});

state_init.laptop.on('finish', (evt, globals, locals) => {

});

state_init.laptop.on('fastForward', (evt, globals, locals) => {

});