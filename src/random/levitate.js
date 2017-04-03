import * as R from 'rodin/core';

const levitateUpdate = function (evt) {
    if(!this.levitateDestination) {
        this.levitateDestination = R.utils.vector3.addNoise(this.levitateInitialPosition, this.levitateNoise);
    }

    if(this.position.distanceTo(this.levitateDestination) < .1) {
        this.levitateDestination = R.utils.vector3.addNoise(this.levitateInitialPosition, this.levitateNoise);
    }

    this.position.lerp(this.levitateDestination, .05);
};

export const levitate = (sculpt, duration, noise) => {
    sculpt.levitateDuration = duration;
    sculpt.levitateNoise = noise;
    sculpt.levitateInitialPosition = sculpt.position.copy();

    const levitateUpdateFunc = levitateUpdate.bind(sculpt);
    const update = (evt) => {

        if(sculpt.levitateDuration < 0) {
            return sculpt.removeEventListener(R.CONST.UPDATE, update);
        }

        sculpt.levitateDuration -= R.Time.delta;
        levitateUpdateFunc(evt);
    };

    sculpt.on(R.CONST.UPDATE, update);
};