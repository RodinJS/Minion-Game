import State from '../GameMechanics/State.js';
import * as R from 'rodin/core';

/**
 * Init room
 */
const initRoom = (evt) => {
    const room = new R.Sculpt('/public/resource/models/room/Deck.obj');
    room.on(R.CONST.READY, function () {
        this.rotation.y = Math.PI;
        R.Scene.add(this);
    });

    evt.globals.room = room;
};

export const state_init = {
    taron: new State('state_init'),
    cardboard: new State('state_init'),
    laptop: new State('state_init'),
};

/**
 * TARON
 */

state_init.taron.on('start', (evt) => {
    initRoom(evt);
});

state_init.taron.on('finish', (evt) => {

});

state_init.taron.on('fastForward', (evt) => {
    initRoom(evt);
});

/**
 * CARDBOARD
 */

state_init.cardboard.on('start', (evt) => {
    initRoom(evt);
});

state_init.cardboard.on('finish', (evt) => {

});

state_init.cardboard.on('fastForward', (evt) => {
    initRoom(evt);
});

/**
 * LAPTOP
 */

state_init.laptop.on('start', (evt) => {
    initRoom(evt);
});

state_init.laptop.on('finish', (evt) => {

});

state_init.laptop.on('fastForward', (evt) => {
    initRoom(evt);
});