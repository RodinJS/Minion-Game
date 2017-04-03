import * as R from 'rodin/core';

export const shot = ( evt, finalPos, callBack ) => {
    /*const bullet = new R.ParticleSystem({
        startCount: {value: 20, randomness: 3},
        numberPerSecond: {value: 500000, randomness: 0},
        maxParticles: {value: 23, randomness: 0},
        particleSize: {value: new THREE.Vector3(0.1, 0.1, 0.1), randomness: new THREE.Vector3(0.01, 0.01, 0.01)},
        startPosition: {randomness: evt.globals.gun.position},
        velocity: {
            type: 'add',
            path: (c, p) => {
                if(!p.direction) {
                    p.direction = RODIN.utils.vector3.addNoise(new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 2, 3));
                }

                p.direction.y -= 9.8 * RODIN.Time.delta * .0001;
                return new THREE.Vector3().copy(p.direction).multiplyScalar(RODIN.Time.delta * .001);
            }
        },
        color: {
            value: {
                from: 0x336699,
                to: 0x993366
            }
        },
        lifetime: {value: 2000, randomness: 0}
    });*/
    // bullet.animatieTO(finalPos);
    // onanimationfinish
    //{
        //remove bullet
    //   callBack && callBack();
    //}

};