export const randomVectorInSphere = () => {
    let pos = new THREE.Vector3(0, 0, 1);
    pos.applyEuler(new THREE.Euler(
        (Math.random() * 2 - 1) * Math.PI,
        (Math.random() * 2 - 1) * Math.PI,
        (Math.random() * 2 - 1) * Math.PI
    ));

    return pos;
};