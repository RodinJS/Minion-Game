import {ParticleSystem} from './ParticleSystem.js';
import {randomVectorInSphere} from '../random/randomVectorInSphere.js';
import * as R from 'rodin/core';

class FireworkChild extends ParticleSystem {
    constructor() {
        const lifetime = 3000;
        const params = {
            startCount: {value: 0, randomness: 0},
            numberPerSecond: {value: 500000, randomness: 0},
            maxParticles: {value: 50, randomness: 0},
            particleSize: {value: new THREE.Vector3(0.05, 0.05, 0.05), randomness: new THREE.Vector3(0.01, 0.01, 0.01)},
            startPosition: {randomness: new THREE.Vector3()},
            velocity: {
                type: 'add',
                path: (c, p) => {
                    if (!p.direction) {
                        p.direction = R.utils.vector3.addNoise(randomVectorInSphere(), new THREE.Vector3(.2, .2, .2));
                        p._threeObject.material.transparent = true;
                    }

                    p._threeObject.material.opacity = 1 - c / 3000;
                    p.direction.multiplyScalar(.9);
                    p.direction.y -= 6 * R.Time.delta * .0001;
                    return new THREE.Vector3().copy(p.direction).multiplyScalar(1.5 * R.Time.delta * .001);
                }
            },
            color: {
                value: [0x336699, 0x336699]
            },
            lifetime: {value: 1000000, randomness: 0}
        };

        super(params);

        this.bornTime = R.Time.now;
        this.on(R.CONST.UPDATE, () => {
            if (R.Time.now - this.bornTime > lifetime) {
                this.destroy();
            }
        });
    }
}

/**
 * Firework class
 */
export class Firework extends ParticleSystem {
    constructor() {
        const lifetime = 3000;
        const params = {
            startCount: {value: 0, randomness: 0},
            numberPerSecond: {value: 500000, randomness: 0},
            maxParticles: {value: 500, randomness: 0},
            particleSize: {value: new THREE.Vector3(0.05, 0.05, 0.05), randomness: new THREE.Vector3(0.01, 0.01, 0.01)},
            startPosition: {randomness: new THREE.Vector3()},
            velocity: {
                type: 'set',
                path: (c, p) => {
                    if (!p.direction) {
                        p.direction = R.utils.vector3.addNoise(randomVectorInSphere(), new THREE.Vector3(.15, .15, .15)).multiplyScalar(2);
                        p.mustExplode = Math.random() < .02;
                        p.explodAfter = Math.random() * .5 + .5;
                    }

                    if (p.mustExplode && !p.exploded && c / p.lifetime > p.explodAfter) {
                        const tmp = new FireworkChild();
                        R.Scene.add(tmp);

                        tmp.globalPosition = p.globalPosition.clone();
                        p.mustExplode = false;
                        p.lifefime = 1000000;
                        p.exploded = true;
                        return p.direction;
                    }
                    else {
                        let newPos = new THREE.Vector3().copy(p.direction).multiplyScalar(Math.sqrt(c / p.lifetime));
                        newPos.y -= 5 * R.Time.delta * .0001;
                        return newPos;
                    }
                }
            },
            color: {
                value: [0x336699, 0x336699]
            },
            lifetime: {value: lifetime, randomness: 0}
        };

        super(params);

        this.bornTime = R.Time.now;

        this.on(R.CONST.UPDATE, () => {
            if (R.Time.now - this.bornTime > lifetime)
                this.destroy();
        })
    }
}