import {ParticleSystem} from './ParticleSystem.js';
import * as R from 'rodin/core';

export class GunShot extends ParticleSystem {
    constructor(position, direction, target) {
        const speed = 3;
        const size = 0.05;
        const args = {
            startCount: {value: 0, randomness: 0},
            numberPerSecond: {value: 50, randomness: 0},
            maxParticles: {value: 100000, randomness: 0},
            particleSize: {value: new THREE.Vector3(size, size, size), randomness: new THREE.Vector3(size, size, size)},
            startPosition: {randomness: new THREE.Vector3()},
            velocity: {
                type: 'add',
                path: (c, p) => {
                    p._threeObject.material.transparent = true;
                    let coeficent = 1 - c / p.lifetime;
                    let scale = size * coeficent;
                    p.scale.set(scale, scale, scale);
                    p._threeObject.material.opacity =  coeficent;

                    return new THREE.Vector3(0, 0, -3 * speed).multiplyScalar(R.Time.delta * .0001)
                }
            },
            color: {
                value: [0xd3e4ff, 0xd3e4ff]
            },
            lifetime: {value: 200, randomness: 0}
        };

        super(args);

        this.position.copy(position);

        const distance = position.distanceTo(target);
        const duration = distance / speed * 1000;

        let burnTime = null;

        const lerpPosition = () => {
            burnTime = burnTime || R.Time.currentFrameTimestamp;

            const t = (R.Time.currentFrameTimestamp - burnTime) / duration;
            const currentTarget = this.position.lerpVectors(position, target, t);
            this.globalQuaternion = this.globalQuaternion.setFromUnitVectors( currentTarget.clone().normalize(), position.clone().normalize());

            this.position.lerp(currentTarget, .1);
            if(t > 1) {
                this.emit('haselem', new R.RodinEvent(this));
                this.destroy();
                this.removeEventListener(R.CONST.UPDATE, lerpPosition);
            }
        };

        this.on(R.CONST.UPDATE, lerpPosition);
    }
}