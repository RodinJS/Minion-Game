import * as R from 'rodin/core';

const lerpBezier = (p0, p1, p2, t) => {
    const res = new THREE.Vector3(0, 0, 0);
    res.add(p0.multiplyScalar(Math.pow(1 - t, 2)));
    res.add(p1.multiplyScalar(2 * t * (1 - t)));
    res.add(p2.multiplyScalar(Math.pow(t, 2)));

    return res;
};

export class GunShot extends R.Sphere {
    constructor(position, direction, target) {
        const speed = 10;

        position = position.clone();
        target = target.clone();
        target.add(new THREE.Vector3(0, 1, 0));
        super(.1);
        this.position.copy(position);

        const distance = position.distanceTo(target);
        const duration = distance / speed * 1000;

        let burnTime = null;

        const p1 = position.clone();
        const p2 = direction.clone().multiplyScalar(position.distanceTo(target) / 3).add(position);
        const p3 = target.clone();

        const lerpPosition = () => {
            burnTime = burnTime || R.Time.currentFrameTimestamp;
            const t = (R.Time.currentFrameTimestamp - burnTime) / duration;
            // this.position = this.position.lerpVectors(position, target, t);
            this.position = lerpBezier(p1.clone(), p2.clone(), p3.clone(), t);
            if (t > 1) {
                this.emit('haselem', new R.RodinEvent(this));
                this.parent = null;
                this.removeEventListener(R.CONST.UPDATE, lerpPosition);
            }
        };

        this.on(R.CONST.UPDATE, lerpPosition);
    }
}