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
    evt.gameMechanics.globals.box.position.x -= 0.6;
    console.log('second state started');
});

state_slide_2.taron.on('finish', (evt) => {
    console.log('second state finished');
});

state_slide_2.taron.on('fastForward', (evt) => {
    evt.gameMechanics.globals.box.position.x -= 0.6;
    console.log('second state fast-forwarded');
});

/**
 * CARDBOARD
 */

state_slide_2.cardboard.on('start', (evt) => {
    evt.gameMechanics.globals.box.position.x -= 0.6;
    console.log('second state started');
});

state_slide_2.cardboard.on('finish', (evt) => {
    console.log('second state finished');
});

state_slide_2.cardboard.on('fastForward', (evt) => {
    evt.gameMechanics.globals.box.position.x -= 0.6;
    console.log('second state fast-forwarded');
});


/**
 * LAPTOP
 */

state_slide_2.laptop.on('start', (evt) => {
    console.log('second state started');
});

state_slide_2.laptop.on('finish', (evt) => {
    console.log('second state finished');
});

state_slide_2.laptop.on('fastForward', (evt) => {
    evt.gameMechanics.globals.box.position.x -= 0.6;
    console.log('second state fast-forwarded');
});