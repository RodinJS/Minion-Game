import * as R from 'rodin/core';

export const highlightMinion = (sculpt, evt) => {
    if (!evt.globals.minionHighLightBox) {
        evt.globals.minionHighLightBox = new R.Box(.3, 6, .3, new THREE.MeshBasicMaterial({color: 0xffff00}));
        R.Scene.add(evt.globals.minionHighLightBox);
    }

    sculpt.add(evt.globals.minionHighLightBox);
};