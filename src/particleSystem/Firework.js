import {ParticleSystem} from './ParticleSystem.js';
import {randomVectorInSphere} from '../random/randomVectorInSphere.js';
import * as R from 'rodin/core';

/**
 * Firework class
 */
export class Firework extends ParticleSystem {
    constructor(size) {
        const lifetime = 4000;
        const params = {
            startCount: {value: 0, randomness: 0},
            numberPerSecond: {value: 500000, randomness: 0},
            maxParticles: {value: 90, randomness: 0},
            particleSize: {
                value: new THREE.Vector3(0.4, 0.4, 0.4),
                randomness: new THREE.Vector3(0.00, 0.00, 0.00)
            },
            startPosition: {randomness: new THREE.Vector3()},
            velocity: {
                type: 'set',
                path: (c, p) => {
                    if (!p.direction) {
                        p.direction = R.utils.vector3.addNoise(randomVectorInSphere(), new THREE.Vector3(.15, .15, .15)).multiplyScalar(2 * size);
                    }

                    p._threeObject.material.opacity = 1 - Math.pow(c / lifetime, 2.5);
                    let newPos = new THREE.Vector3().copy(p.direction).multiplyScalar(Math.pow(c / p.lifetime, 2 / 3));
                    p.gravityFactor = p.gravityFactor || 0;
                    p.gravityFactor += 15 * Math.pow(c / p.lifetime, 1.2) * R.Time.delta * .0001;
                    newPos.y -= p.gravityFactor;
                    return newPos;
                }
            },
            color: {
                value: [0xffffff]
            },
            lifetime: {value: lifetime, randomness: 0},
            particlesMaterial: new THREE.SpriteMaterial({
                map: R.Loader.loadTexture('/public/images/star_blue.png')
            })
        };

        super(params);

        this.bornTime = R.Time.currentFrameTimestamp;
        this.on(R.CONST.UPDATE, () => {
            if (R.Time.currentFrameTimestamp - this.bornTime > lifetime) {
                this.destroy();
            }
        });
    }

    get isFirework() {
        return true;
    }
}