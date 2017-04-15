import State from '../GameMechanics/State.js';
import {changeEnv} from '../random/changeEnv.js';
import * as R from 'rodin/core';

export const state_final = {
    taron: new State('state_final'),
    cardboard: new State('state_final'),
    laptop: new State('state_final'),
};

const showFinalDialog = () => {
    document.getElementById('final').style.display = "block";
};

const showExitScreen = (evt) => {
    R.Scene.add(evt.globals.presentationScreen);
    evt.globals.presentationScreen._threeObject.material.map = R.Loader.loadTexture('/public/resource/images/exit.jpg');
};

/**
 * TARON
 */

state_final.taron.on('start', (evt) => {
    changeEnv(evt, 5);
    evt.globals.snow.visible = false;
});

state_final.taron.on('finish', (evt) => {

});

state_final.taron.on('fastForward', (evt) => {
    changeEnv(evt, 5);
    evt.globals.snow.visible = false;
});

/**
 * CARDBOARD
 */

state_final.cardboard.on('start', (evt) => {
    changeEnv(evt, 5);
    showFinalDialog();
    showExitScreen(evt);
});

state_final.cardboard.on('finish', (evt) => {

});

state_final.cardboard.on('fastForward', (evt) => {
    changeEnv(evt, 5);
    showFinalDialog();
    showExitScreen(evt);
});

/**
 * LAPTOP
 */

state_final.laptop.on('start', (evt) => {
    changeEnv(evt, 5);
    showFinalDialog();
});

state_final.laptop.on('finish', (evt) => {

});

state_final.laptop.on('fastForward', (evt) => {
    changeEnv(evt, 5);
    showFinalDialog();
});