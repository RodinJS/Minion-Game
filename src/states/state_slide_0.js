import State from '../GameMechanics/State.js';
import {showSlideOnMainScreen, showPresenterSlides} from '../random/changeSlide.js';


export const state_slide_0 = {
    taron: new State('state_slide_0'),
    cardboard: new State('state_slide_0'),
    laptop: new State('state_slide_0'),
};

/**
 * TARON
 */

state_slide_0.taron.on('start', (evt) => {
    showSlideOnMainScreen(evt, 0);
    showPresenterSlides(evt, 0);
});

state_slide_0.taron.on('finish', (evt) => {

});

state_slide_0.taron.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 0);
    showPresenterSlides(evt, 0);
});

/**
 * CARDBOARD
 */

state_slide_0.cardboard.on('start', (evt) => {
    showSlideOnMainScreen(evt, 0);
});

state_slide_0.cardboard.on('finish', (evt) => {
});

state_slide_0.cardboard.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 0);
});

/**
 * LAPTOP
 */

state_slide_0.laptop.on('start', (evt) => {
    showSlideOnMainScreen(evt, 0);
});

state_slide_0.laptop.on('finish', (evt) => {
});

state_slide_0.laptop.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 0);
});