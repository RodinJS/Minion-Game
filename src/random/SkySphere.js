import * as R from 'rodin/core';

export class SkySphere extends R.Sphere {
    constructor(map) {
        const material = new THREE.MeshBasicMaterial({
            map,
            side: THREE.DoubleSide
        });

        super(50, 10, 10, material);
        this.material = material;
    }

    dispose() {
        this.parent = null;
        this.material.dispose();
    }
}