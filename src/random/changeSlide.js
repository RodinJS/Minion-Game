export const showSlideOnMainScreen = (evt, slide = 0) => {
    slide %= evt.globals.presentationSlides.length;

    evt.globals.presentationScreen._threeObject.material.map = evt.globals.presentationSlides[slide];
    evt.globals.presentationScreen._threeObject.material.needsUpdate = true;
};

export const showPresenterSlides = (evt, slide = 0) => {
    slide %= evt.globals.presentationSlides.length;

    evt.globals.presentationControls.screen._threeObject.material.map = evt.globals.presentationSlides[slide];
    evt.globals.presentationControls.screen._threeObject.material.needsUpdate = true;
};