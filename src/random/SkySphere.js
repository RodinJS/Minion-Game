import * as R from 'rodin/core';

export class SkySphere extends R.Sphere {
    constructor(map) {
        const material = new THREE.MeshBasicMaterial({
            map,
            side: THREE.DoubleSide
        });

        super(50, 24, 24, material);
        this.material = material;

        this.rotation.y = Math.PI;
    }

    dispose() {
        this.parent = null;
        this.material.dispose();
    }
}