import * as RODIN from 'rodin/core';

export const loadJD = (url) => {
    let mixers = [];
    let loader = new THREE.JDLoader();
    let animations = [];

    const sculpt = new RODIN.Sculpt();
    sculpt.jdReady = false;

    loader.load(url, (data) => {
        let multiMaterial = new THREE.MultiMaterial(data.materials);

        let mesh = new THREE.SkinnedMesh(data.geometries[0], multiMaterial);
        if (mesh.geometry.animations) {
            let mixer = new THREE.AnimationMixer(mesh);
            mixers.push(mixer);
            for(let i = 0; i < mesh.geometry.animations.length; i ++) {
                animations.push(mixer.clipAction(mesh.geometry.animations[0]));
            }
        }

        sculpt.bones = mesh.skeleton.bones;
        sculpt.mixers = mixers;
        sculpt.mesh = mesh;
        sculpt.animations = animations;

        sculpt.jdSculpt = new RODIN.Sculpt(mesh);
        sculpt.add(sculpt.jdSculpt);
        sculpt.jdReady = true;
        sculpt.emit('jdReady', new RODIN.RodinEvent(sculpt.jdSculpt));
    });

    sculpt.on(RODIN.CONST.UPDATE, () => {
        for (let i = 0; i < mixers.length; ++i)
            mixers[i].update(RODIN.Time.delta / 1000);
    });

    return sculpt;
};
