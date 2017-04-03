import State from '../GameMechanics/State.js';
import * as R from 'rodin/core';
import {ParticleSystem} from '../particleSystem/ParticleSystem.js';

const shrinkBaall = (evt) => {
    const ball = evt.globals.ball;

    const shrinkAnimation = new R.AnimationClip('shrink', {
        scale: {
            x: .001,
            y: .001,
            z: .001
        }
    });
    shrinkAnimation.duration(200);

    ball.animation.add(shrinkAnimation);
    ball.animation.start('shrink');
};

const initFirework = (evt) => {
    const firework = new ParticleSystem({
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

    firework.position.set(0, 5, 5);
    R.Scene.add(firework);
    evt.globals.firework = firework;
};

const ball2firework = (evt) => {
    const ball = evt.globals.ball;

    shrinkBaall(evt);
    ball.on(R.CONST.ANIMATION_COMPLETE, (e) => {
        if(e.animation === 'shrink') {
            initFirework(evt);
        }
    });
};

export const state_firework = {
    taron: new State('state_firework'),
    cardboard: new State('state_firework'),
    laptop: new State('state_firework'),
};

/**
 * TARON
 */

state_firework.taron.on('start', (evt) => {
    ball2firework(evt);
});

state_firework.taron.on('finish', (evt) => {

});

state_firework.taron.on('fastForward', (evt) => {
    ball2firework(evt);
});

/**
 * CARDBOARD
 */

state_firework.cardboard.on('start', (evt) => {
    // todo: fix this
    setTimeout(() => {
        ball2firework(evt);
    }, 5000);
});

state_firework.cardboard.on('finish', (evt) => {

});

state_firework.cardboard.on('fastForward', (evt) => {
    ball2firework(evt);
});

/**
 * LAPTOP
 */

state_firework.laptop.on('start', (evt) => {
    ball2firework(evt);
});

state_firework.laptop.on('finish', (evt) => {

});

state_firework.laptop.on('fastForward', (evt) => {
    ball2firework(evt);
});