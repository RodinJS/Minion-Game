import {ParticleSystem} from './ParticleSystem.js';
import * as R from 'rodin/core';

export class GunShot extends ParticleSystem {
    constructor(position, direction, target) {
        const speed = 5;
        const size = 0.03;
        const args = {
            startCount: {value: 0, randomness: 0},
            numberPerSecond: {value: 50, randomness: 0},
            maxParticles: {value: 100000, randomness: 0},
            particleSize: {value: new THREE.Vector3(size, size, size), randomness: new THREE.Vector3(0.01, 0.01, 0.01)},
            startPosition: {randomness: new THREE.Vector3()},
            velocity: {
                type: 'add',
                path: (c, p) => {
                    p._threeObject.material.transparent = true;
                    let coeficent = 1 - c / p.lifetime;
                    let scale = size * coeficent;
                    p.scale.set(scale, scale, scale);
                    p._threeObject.material.opacity =  coeficent;

                    return new THREE.Vector3(0, 0, -speed).multiplyScalar(R.Time.delta * .0001)
                }
            },
            color: {
                value: [0xd3e4ff, 0xd3e4ff]
            },
            lifetime: {value: 200, randomness: 0}
        };

        super(args);

        this.position.copy(position);
        this.quaternion.setFromUnitVectors(new THREE.Vector3().copy(position).normalize(), new THREE.Vector3().copy(target).normalize());

        const distance = position.distanceTo(target);

        this.on(R.CONST.UPDATE, () => {

        });
    }
}