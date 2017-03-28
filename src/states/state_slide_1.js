import State from '../GameMechanics/State.js';

export const state_slide_1 = {
    taron: new State('state_slide_1'),
    cardboard: new State('state_slide_1'),
    laptop: new State('state_slide_1'),
};

/**
 * TARON
 */

state_slide_1.taron.on('start', (evt) => {
    console.log('first state started');
});

state_slide_1.taron.on('finish', (evt) => {
    console.log('first state finished');
});

state_slide_1.taron.on('fastForward', (evt) => {
    console.log('first state fast-forwarded');
});

/**
 * CARDBOARD
 */

state_slide_1.cardboard.on('start', (evt) => {
    console.log('first state started');
});

state_slide_1.cardboard.on('finish', (evt) => {
    console.log('first state finished');
});

state_slide_1.cardboard.on('fastForward', (evt) => {
    console.log('first state fast-forwarded');
});

/**
 * LAPTOP
 */

state_slide_1.laptop.on('start', (evt) => {
    console.log('first state started');
});

state_slide_1.laptop.on('finish', (evt) => {
    console.log('first state finished');
});

state_slide_1.laptop.on('fastForward', (evt) => {
    console.log('first state fast-forwarded');
});