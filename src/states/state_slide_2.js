import State from '../GameMechanics/State.js';

export const state_slide_2 = {
    taron: new State('state_slide_2'),
    cardboard: new State('state_slide_2'),
    laptop: new State('state_slide_2'),
};

/**
 * TARON
 */

state_slide_2.taron.on('start', (evt) => {
    evt.globals.ps.parent = null;
});

state_slide_2.taron.on('finish', (evt) => {

});

state_slide_2.taron.on('fastForward', (evt) => {

});

/**
 * CARDBOARD
 */

state_slide_2.cardboard.on('start', (evt) => {
    evt.globals.ps.parent = null;
});

state_slide_2.cardboard.on('finish', (evt) => {

});

state_slide_2.cardboard.on('fastForward', (evt) => {

});


/**
 * LAPTOP
 */

state_slide_2.laptop.on('start', (evt) => {
    evt.globals.ps.parent = null;
});

state_slide_2.laptop.on('finish', (evt) => {

});

state_slide_2.laptop.on('fastForward', (evt) => {

});