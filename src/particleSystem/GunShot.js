import * as R from 'rodin/core';

const lerpBezier = (p0, p1, p2, t) => {
    const res = new THREE.Vector3(0, 0, 0);
    res.add(p0.multiplyScalar(Math.pow(1 - t, 2)));
    res.add(p1.multiplyScalar(2 * t * (1 - t)));
    res.add(p2.multiplyScalar(Math.pow(t, 2)));

    return res;
};

const center = (v1, v2) => {
    return new THREE.Vector3().copy(v1).add(v2).multiplyScalar(.5);
};

export class GunShot extends R.Sculpt {
    constructor(gun, target) {
        const position = gun.globalPosition.clone();
        const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(gun.globalQuaternion);
        const speed = position.distanceTo(target);

        target = target.clone();

        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            linewidth: 2
        });

        const distortion = 4;
        const geometry = new THREE.Geometry();

        for (let i = 0; i < distortion; ++i) {
            geometry.vertices.push(new THREE.Vector3());
        }

        super(new THREE.Line(geometry, material));

        this.position.copy(position);

        const distance = position.distanceTo(target);
        const duration = distance / speed * 1000;

        let burnTime = null;

        const p1 = position.clone();
        const p2 = direction.clone().multiplyScalar(position.distanceTo(target) / 1.5).add(position);
        const p3 = target.clone();

        const cylinders = [
            new R.Cylinder(.02, .01, 1),
            new R.Cylinder(.01, .005, 1),
            new R.Cylinder(.005, .001, 1)
        ];

        cylinders[0]._threeObject.geometry.rotateX( Math.PI / 2 );
        cylinders[1]._threeObject.geometry.rotateX( Math.PI / 2 );
        cylinders[2]._threeObject.geometry.rotateX( Math.PI / 2 );

        cylinders[0].scale.z = .001;
        cylinders[1].scale.z = .001;
        cylinders[2].scale.z = .001;

        this.add(cylinders[0]);
        this.add(cylinders[1]);
        this.add(cylinders[2]);

        const lerpPosition = () => {
            burnTime = burnTime || R.Time.currentFrameTimestamp;
            const t = (R.Time.currentFrameTimestamp - burnTime) / duration;
            // this.position = lerpBezier(p1.clone(), p2.clone(), p3.clone(), t);

            const trajectory = [];

            const startT = Math.max(0, t - .5);
            const step = (t - startT) / distortion;
            for (let i = t, vIndex = 0; i >= startT && vIndex < distortion; i -= step, vIndex++) {
                const pos = lerpBezier(p1.clone(), p2.clone(), p3.clone(), i).sub(position);
                trajectory.push(pos);
                geometry.vertices[vIndex].copy(pos.clone());
            }

            geometry.verticesNeedUpdate = true;
            cylinders[0].position = center(trajectory[1], trajectory[0]);
            cylinders[0]._threeObject.lookAt(trajectory[0]);
            cylinders[0].scale.z = trajectory[0].distanceTo(trajectory[1]);

            cylinders[1].position = center(trajectory[2], trajectory[1]);
            cylinders[1]._threeObject.lookAt(trajectory[1]);
            cylinders[1].scale.z = trajectory[1].distanceTo(trajectory[2]);

            cylinders[2].position = center(trajectory[3], trajectory[2]);
            cylinders[2]._threeObject.lookAt(trajectory[2]);
            cylinders[2].scale.z = trajectory[2].distanceTo(trajectory[3]);

            if (t > 1) {
                this.emit('haselem', new R.RodinEvent(this));
                this.parent = null;
                geometry.dispose();
                material.dispose();
                this.removeEventListener(R.CONST.UPDATE, lerpPosition);
            }
        };

        this.on(R.CONST.UPDATE, lerpPosition);
    }
}