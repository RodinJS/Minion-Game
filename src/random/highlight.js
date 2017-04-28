import * as R from 'rodin/core';

export const highlightMinion = (sculpt, evt) => {
    if (!evt.globals.minionHighLightBox) {
        evt.globals.minionHighLightBox = new R.Cylinder(0.1, 0.0001, 0.4, new THREE.MeshBasicMaterial({color: 0xffd200}));

        let dir = 1;
        let speed = 0.15;
        evt.globals.minionHighLightBox.on(R.CONST.UPDATE, function () {
            this.position.y += speed * R.Time.delta * .001 * Math.pow(-1, dir);

            if((!(dir % 2) && this.position.y > 2.25) || ((dir % 2) && this.position.y < 2))
                dir ++;
        });

        evt.globals.minionHighLightBox.position.set(0, 2.25, 0);
        R.Scene.add(evt.globals.minionHighLightBox);
    }

    sculpt.add(evt.globals.minionHighLightBox);
};