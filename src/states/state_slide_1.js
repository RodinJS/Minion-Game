import State from '../GameMechanics/State.js';
import {showSlideOnMainScreen, showPresenterSlides} from '../random/changeSlide.js';


export const state_slide_1 = {
    taron: new State('state_slide_1'),
    cardboard: new State('state_slide_1'),
    laptop: new State('state_slide_1'),
};

/**
 * TARON
 */

state_slide_1.taron.on('start', (evt) => {
    showSlideOnMainScreen(evt, 1);
    showPresenterSlides(evt, 1);
});

state_slide_1.taron.on('finish', (evt) => {

});

state_slide_1.taron.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 1);
    showPresenterSlides(evt, 1);
});

/**
 * CARDBOARD
 */

state_slide_1.cardboard.on('start', (evt) => {
    showSlideOnMainScreen(evt, 1);
});

state_slide_1.cardboard.on('finish', (evt) => {
});

state_slide_1.cardboard.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 1);
});

/**
 * LAPTOP
 */

state_slide_1.laptop.on('start', (evt) => {
    showSlideOnMainScreen(evt, 1);
});

state_slide_1.laptop.on('finish', (evt) => {
});

state_slide_1.laptop.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 1);
});