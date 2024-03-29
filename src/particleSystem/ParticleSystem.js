import {Particle} from './Particle.js';
import * as R from 'rodin/core';

const enforce = function () {
};

/**
 * set general parameters for Particle System
 * @constructor
 *
 * @version 0.0.1
 *
 * @param {Object} [ params ] - General parameters of particle system
 *
 * @param {Object} [ params.numberPerSecond ] - Set random number of particles, which creating per second.
 * @param {Number} [ params.numberPerSecond.value = 10 ]
 * @param {Number} [ params.numberPerSecond.randomness = 0 ]
 *
 * @param {Object} [ params.maxParticles ] - Set maximum random number of particles in scene.
 * @param {Number} [ params.maxParticles.value = 1000 ]
 * @param {Number} [ params.maxParticles.randomness = 0 ]
 *
 * @param {Object} [ params.particleSize ] - Each particle size,
 *                                           if value or randomness is a number, it is scale symmetric
 * @param {THREE.Vector3 | Number} [ params.particleSize.value = new THREE.Vector3(0.05, 0.05, 0.05) ]
 * @param {THREE.Vector3 | Number} [ params.particleSize.randomness = new THREE.Vector3(0.01, 0.01, 0.01) ]
 *
 * @param {Object} [ params.startPositionRandomness ] - Set random start position of each particle
 * @param {THREE.Vector3 | Number} [ params.startPositionRandomness.randomness = new THREE.Vector3(1, 1, 1) ]
 *
 * @param {Object} [ params.velocity ] Set particles moving trajectory by the path,
 * @param {String} [ params.velocity.type = 'set' | 'add' ] - If type is a 'set' next position vector is setting to
 *                                                            particle current position, if type is a 'add'
 *                                                            next position vector is adding to particle current position
 * @param {THREE.Vector3 | function} [ params.velocity.path = new THREE.Vector3( 0, 3, 0 ) ]
 *
 *
 * @param {Object} [ params.lifetime ] - A particle life time, it is starting when particle was born and finishing when was died
 * @param {Number} [ params.lifetime.value = 1000 ]
 * @param {Number} [ params.lifetime.randomness = 100 ]
 *
 * @param {THREE.SpriteMaterial} [ params.particlesMaterial = new THREE.SpriteMaterial()] - Material for each particle
 */
export class ParticleSystem extends R.Sculpt {
    constructor(params) {
        if (params && !params.particlesMaterial) {
            params.particlesMaterial = new THREE.SpriteMaterial({
                map: R.Loader.loadTexture('https://cdn.rodin.io/resources/img/particleSystem/particle_default_map.png')
            });
        }

        super();
        this.particles = [];
        this.params = params;

        this._halfParticles = 0;

        for (let i = 1; i < Math.min(params.startCount.value, params.maxParticles.value); i++) {
            this.createParticle();
        }

        this.on(R.CONST.UPDATE, () => {
            this.mupdate(enforce);
        });
    }

    mupdate() {
        let addNewCount = Math.min(
                R.utils.number.addNoise(this.params.numberPerSecond.value, this.params.numberPerSecond.randomness) / 1000 * R.Time.delta,
                R.utils.number.addNoise(this.params.maxParticles.value, this.params.maxParticles.randomness) - this.particles.length
            ) + this._halfParticles;

        this._halfParticles = addNewCount - Math.floor(addNewCount);

        for (let i = 1; i < addNewCount; i++) {
            this.createParticle();
        }

        this.particles.map(particle => {
            if (particle.isDead()) {
                return this.destroyParticle(particle);
            }

            if (this.params.velocity.path instanceof THREE.Vector3) {
                const noise = new THREE.Vector3().copy(this.params.velocity.randomness).multiplyScalar(R.Time.delta * .001);
                let vec = R.utils.vector3.addNoise(new THREE.Vector3().copy(this.params.velocity.path).multiplyScalar(R.Time.delta * .001), noise);
                particle.position.add(vec);
            } else {
                let coef = R.Time.now - particle.bornTime;
                let vec = this.params.velocity.path(coef, particle);
                if (this.params.velocity.type == 'add') {
                    particle.position.add(vec);
                } else {
                    particle.position.set(vec.x, vec.y, vec.z).add(particle.initialPosition);
                }
            }

            if (!isNaN(this.params.color.value)) {
                if (!particle.__color__) {
                    particle.__color__ = new THREE.Color(this.params.color.value);
                }
                // If value is a string
            } else if (typeof(this.params.color.value) === "string") {
                if (!particle.__color__) {
                    particle.__color__ = new THREE.Color(this.params.color.value);
                }
                // If value is an array
            } else if (Array.isArray(this.params.color.value)) {
                if (!particle.__color__) {
                    particle.__color__ = new THREE.Color(
                        this.params.color.value[Math.floor(Math.random() * this.params.color.value.length)]
                    );
                }
                // If value is an object
            } else if (typeof(this.params.color.value) === 'object') {
                if (!particle.__color__) {
                    let starColor = new THREE.Color(this.params.color.value.from);
                    let lastColor = new THREE.Color(this.params.color.value.to);

                    particle.__color__ = new THREE.Color(
                        starColor.r + Math.abs((starColor.r - lastColor.r)) * Math.random(),
                        starColor.g + Math.abs((starColor.g - lastColor.g)) * Math.random(),
                        starColor.b + Math.abs((starColor.b - lastColor.b)) * Math.random()
                    );
                }
                // If value is a function
            } else {
                let coef = R.Time.now - particle.bornTime;
                particle.__color__ = new THREE.Color(this.params.color.value(coef, particle))

            }
            particle._threeObject.material.color = particle.__color__;
        });
    }

    destroyParticle(p) {
        p.parent = null;
        this.particles.splice(this.particles.indexOf(p), 1);
        p._threeObject.material.dispose();
    }

    createParticle() {
        let particle = new Particle(
            this.params.particlesMaterial,
            this.params.lifetime,
            this.params.particleSize,
            this.params.startPosition
        );

        this.particles.push(particle);
        this.add(particle);
    }

    destroy() {
        R.Scene.remove(this);
        for(let i = 0; i < this.particles.length; i ++) {
            this.destroyParticle(this.particles[i]);
        }
    }
}