import State from '../GameMechanics/State.js';

export const state_slide_2 = {
    taron: new State('state_slide_2'),
    cardboard: new State('state_slide_2'),
    laptop: new State('state_slide_2'),
};

/**
 * TARON
 */

state_slide_2.taron.on('start', () => {
    console.log('second state started');
});

state_slide_2.taron.on('finish', () => {
    console.log('second state finished');
});

/**
 * CARDBOARD
 */

state_slide_2.cardboard.on('start', () => {
    console.log('second state started');
});

state_slide_2.cardboard.on('finish', () => {
    console.log('second state finished');
});


/**
 * LAPTOP
 */

state_slide_2.laptop.on('start', () => {
    console.log('second state started');
});

state_slide_2.laptop.on('finish', () => {
    console.log('second state finished');
});