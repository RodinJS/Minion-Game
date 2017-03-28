import State from '../GameMechanics/State.js';
import {ParticleSystem} from '../particleSystem/ParticleSystem.js';
import * as R from 'rodin/core';

const initParticleSystem = (evt) => {
    const ps = new ParticleSystem({
        startCount: {value: 50, randomness: 0},
        numberPerSecond: {value: 500000, randomness: 0},
        maxParticles: {value: 50, randomness: 0},
        particleSize: {value: new THREE.Vector3(0.1, 0.1, 0.1), randomness: new THREE.Vector3(0.01, 0.01, 0.01)},
        startPosition: {randomness: new THREE.Vector3()},
        velocity: {
            type: 'add',
            path: (c, p) => {
                if(!p.direction) {
                    p.direction = R.utils.vector3.addNoise(new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 2, 3));
                }

                p.direction.y -= 9.8 * R.Time.delta * .0001;
                return new THREE.Vector3().copy(p.direction).multiplyScalar(R.Time.delta * .001);
            }
        },
        color: {
            value: [0x336699, 0x669933, 0x996633, 0x993366]
        },
        lifetime: {value: 2000, randomness: 0}
    });

    R.Scene.add(ps);
    ps.position.set(0, 3, -5);
    evt.gameMechanics.globals.ps = ps;
};

export const state_slide_1 = {
    taron: new State('state_slide_1'),
    cardboard: new State('state_slide_1'),
    laptop: new State('state_slide_1'),
};

/**
 * TARON
 */

state_slide_1.taron.on('start', (evt) => {
    console.log('first state started');

    initParticleSystem(evt);
});

state_slide_1.taron.on('finish', (evt) => {
    console.log('first state finished');
});

state_slide_1.taron.on('fastForward', (evt) => {
    console.log('first state fast-forwarded');

    initParticleSystem(evt);
});

/**
 * CARDBOARD
 */

state_slide_1.cardboard.on('start', (evt) => {
    console.log('first state started');

    initParticleSystem(evt);
});

state_slide_1.cardboard.on('finish', (evt) => {
    console.log('first state finished');
});

state_slide_1.cardboard.on('fastForward', (evt) => {
    console.log('first state fast-forwarded');

    initParticleSystem(evt);
});

/**
 * LAPTOP
 */

state_slide_1.laptop.on('start', (evt) => {
    console.log('first state started');

    initParticleSystem(evt);
});

state_slide_1.laptop.on('finish', (evt) => {
    console.log('first state finished');
});

state_slide_1.laptop.on('fastForward', (evt) => {
    console.log('first state fast-forwarded');

    initParticleSystem(evt);
});