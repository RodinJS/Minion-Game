import State from '../GameMechanics/State.js';

const hidePreviousEnvironment = (evt) => {
    console.log(evt.globals.room);
};


export const state_change_environment_0 = {
    taron: new State('state_change_environment_0'),
    cardboard: new State('state_change_environment_0'),
    laptop: new State('state_change_environment_0'),
};

/**
 * TARON
 */

state_change_environment_0.taron.on('start', (evt) => {
    hidePreviousEnvironment(evt);
});

state_change_environment_0.taron.on('finish', (evt) => {

});

state_change_environment_0.taron.on('fastForward', (evt) => {
    hidePreviousEnvironment(evt);
});

/**
 * CARDBOARD
 */

state_change_environment_0.cardboard.on('start', (evt) => {
    hidePreviousEnvironment(evt);
});

state_change_environment_0.cardboard.on('finish', (evt) => {

});

state_change_environment_0.cardboard.on('fastForward', (evt) => {
    hidePreviousEnvironment(evt);
});

/**
 * LAPTOP
 */

state_change_environment_0.laptop.on('start', (evt) => {
    hidePreviousEnvironment(evt);
});

state_change_environment_0.laptop.on('finish', (evt) => {

});

state_change_environment_0.laptop.on('fastForward', (evt) => {
    hidePreviousEnvironment(evt);
});