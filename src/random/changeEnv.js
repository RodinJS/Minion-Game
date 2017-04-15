import * as R from 'rodin/core';
import {SkySphere} from './SkySphere.js';

export const chengeEnv = (evt, i) => {
    alert('i ' + i);
    if(evt.globals.env) {
        evt.globals.env.dispose();
    }

    evt.globals.env = new SkySphere(evt.globals.envTextures[i]);
    R.Scene.add(evt.globals.env);
};
