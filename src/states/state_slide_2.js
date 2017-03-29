import State from '../GameMechanics/State.js';
import {showSlideOnMainScreen, showPresenterSlides} from '../random/changeSlide.js';


export const state_slide_2 = {
    taron: new State('state_slide_2'),
    cardboard: new State('state_slide_2'),
    laptop: new State('state_slide_2'),
};

/**
 * TARON
 */

state_slide_2.taron.on('start', (evt) => {
    showSlideOnMainScreen(evt, 2);
    showPresenterSlides(evt, 2);
});

state_slide_2.taron.on('finish', (evt) => {

});

state_slide_2.taron.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 2);
    showPresenterSlides(evt, 2);
});

/**
 * CARDBOARD
 */

state_slide_2.cardboard.on('start', (evt) => {
    showSlideOnMainScreen(evt, 2);
});

state_slide_2.cardboard.on('finish', (evt) => {
});

state_slide_2.cardboard.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 2);
});

/**
 * LAPTOP
 */

state_slide_2.laptop.on('start', (evt) => {
    showSlideOnMainScreen(evt, 2);
});

state_slide_2.laptop.on('finish', (evt) => {
});

state_slide_2.laptop.on('fastForward', (evt) => {
    showSlideOnMainScreen(evt, 2);
});