import {ParticleSystem} from './ParticleSystem.js';
import {randomVectorInSphere} from '../random/randomVectorInSphere.js';
import * as R from 'rodin/core';

/**
 * Firework class
 */
export class Firework extends ParticleSystem {
    constructor(size, recursive) {
        const lifetime = 3500;
        const params = {
            startCount: {value: 0, randomness: 0},
            numberPerSecond: {value: 500000, randomness: 0},
            maxParticles: {value: 175, randomness: 0},
            particleSize: {
                value: new THREE.Vector3(0.05, 0.05, 0.05),
                randomness: new THREE.Vector3(0.015, 0.015, 0.015)
            },
            startPosition: {randomness: new THREE.Vector3()},
            velocity: {
                type: 'set',
                path: (c, p) => {
                    if (!p.direction) {
                        p.direction = R.utils.vector3.addNoise(randomVectorInSphere(), new THREE.Vector3(.15, .15, .15)).multiplyScalar(2 * size);
                        p._threeObject.material.transparent = true;
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
                value: [0xffffff, 0xffffff]
            },
            lifetime: {value: lifetime, randomness: 0},
            particleMaterial: new THREE.SpriteMaterial({
                color: 0xffffff
            })
        };

        super(params);

        this.firstDone = false;
        this.secondDone = false;
        this.thirdDone = false;
        this.fourthDone = false;

        this.bornTime = R.Time.currentFrameTimestamp;

        if (recursive)
            this.on(R.CONST.UPDATE, () => {
                const first = recursive[0];
                const second = recursive[1];
                const thirth = recursive[2];
                const fourth = recursive[3];
                const c = R.Time.currentFrameTimestamp - this.bornTime;

                if (!this.firstDone && c > first[2]) {
                    this.firstDone = true;
                    const tmp = new Firework(1.5);
                    tmp.position.set(first[0], first[1], 0).add(this.position);
                    R.Scene.add(tmp);
                }

                if (!this.secondDone && c > second[2]) {
                    this.secondDone = true;
                    const tmp = new Firework(1.5);
                    tmp.position.set(second[0], second[1], 0).add(this.position);
                    R.Scene.add(tmp);

                }

                if (!this.thirdDone && c > thirth[2]) {
                    this.thirdDone = true;
                    const tmp = new Firework(1.5);
                    tmp.position.set(thirth[0], thirth[1], 0).add(this.position);
                    R.Scene.add(tmp);

                }

                if (!this.fourthDone && c > fourth[2]) {
                    this.fourthDone = true;
                    const tmp = new Firework(1.5);
                    tmp.position.set(fourth[0], fourth[1], 0).add(this.position);
                    R.Scene.add(tmp);

                }
            });

        this.on(R.CONST.UPDATE, () => {
            if (R.Time.currentFrameTimestamp - this.bornTime > lifetime)
                this.destroy();
        })
    }
}