import State from '../GameMechanics/State.js';

export const state_slide_1 = {
    taron: new State('state_slide_2'),
    cardboard: new State('state_slide_2'),
    laptop: new State('state_slide_2'),
};

/**
 * TARON
 */

state_slide_1.taron.on('start', () => {
    console.log('first state started');
});

state_slide_1.taron.on('finish', () => {
    console.log('first state finished');
});

/**
 * CARDBOARD
 */

state_slide_1.cardboard.on('start', () => {
    console.log('first state started');
});

state_slide_1.cardboard.on('finish', () => {
    console.log('first state finished');
});


/**
 * LAPTOP
 */

state_slide_1.laptop.on('start', () => {
    console.log('first state started');
});

state_slide_1.laptop.on('finish', () => {
    console.log('first state finished');
});