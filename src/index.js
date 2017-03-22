import * as RODIN from 'rodin/core';
RODIN.start();

const sphere = new RODIN.Sphere();
const cube1 = new RODIN.Box();
const cube2 = new RODIN.Box(.2, .2, .2, new THREE.MeshBasicMaterial({ wireframe: true, color: 0x996633 }));


RODIN.Scene.active._scene.add(new THREE.AmbientLight());

//scale animations
const hoverAnimation = new RODIN.AnimationClip('hover', {
    scale: {
        x: 1.5,
        y: 1.5,
        z: 1.5
    }
});
hoverAnimation.duration(200);

const hoverOutAnimation = new RODIN.AnimationClip('hoverout', {
    scale: {
        x: 1,
        y: 1,
        z: 1
    }
});
hoverOutAnimation.duration(200);

//rotation animations
const hoverAnimation2 = new RODIN.AnimationClip('hover', {
    rotation: {
        x: {from: 0, to: 0.2},
        y: {from: 0, to: 0.2},
        z: {from: 0, to: 0.2}
    }
});
hoverAnimation2.duration(200);

const hoverOutAnimation2 = new RODIN.AnimationClip('hoverout', {
    rotation: {
        x: {from: 0.2, to: 0},
        y: {from: 0.2, to: 0},
        z: {from: 0.2, to: 0}
    }
});
hoverOutAnimation2.duration(200);

sphere.on('ready', function () {
    sphere.position.x = -1;
    sphere.position.y = 0;
    sphere.parent = cube1;
});

sphere.animation.add(hoverAnimation, hoverOutAnimation);

sphere.on(RODIN.CONST.GAMEPAD_HOVER, function () {
    if (sphere.animation.isPlaying('hoverout')) {
        sphere.animation.stop('hoverout', false);
    }

    sphere.animation.start('hover');
});

sphere.on(RODIN.CONST.GAMEPAD_HOVER_OUT, function () {
    if (sphere.animation.isPlaying('hover')) {
        sphere.animation.stop('hover', false);
    }

    sphere.animation.start('hoverout');
});

cube1.animation.add(hoverAnimation2, hoverOutAnimation2);

cube1.on('ready', function () {
    cube1.position.set(1, 1.6, -2);
    cube1.scale.y = 2;
    RODIN.Scene.add(cube1);
});


cube1.on(RODIN.CONST.GAMEPAD_HOVER, function () {
    if (cube1.animation.isPlaying('hoverout')) {
        cube1.animation.stop('hoverout', false);
    }

    cube1.animation.start('hover');
});

cube1.on(RODIN.CONST.GAMEPAD_HOVER_OUT, function () {
    if (cube1.animation.isPlaying('hover')) {
        cube1.animation.stop('hover', false);
    }

    cube1.animation.start('hoverout');
});

cube2.animation.add(hoverAnimation, hoverOutAnimation);

cube2.on('ready', function () {
    cube2.position = new THREE.Vector3(-1, 1.6, -2);
    cube2._threeObject.rotation.z = Math.PI / 4;
    RODIN.Scene.add(cube2);
});

cube2.on(RODIN.CONST.GAMEPAD_HOVER, function () {
    if (cube2.animation.isPlaying('hoverout')) {
        cube2.animation.stop('hoverout', false);
    }

    cube2.animation.start('hover');
});

cube2.on(RODIN.CONST.GAMEPAD_HOVER_OUT, function () {
    if (cube2.animation.isPlaying('hover')) {
        cube2.animation.stop('hover', false);
    }

    cube2.animation.start('hoverout');
});