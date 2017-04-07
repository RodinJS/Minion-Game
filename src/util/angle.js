const dotAngle = (a, b) => {
    return Math.acos((a.x * b.x + a.y * b.y) / a.length() / b.length());
};

export const getAngle = (a, b) => {
    a = a.sub(b);
    if (a.x >= 0 && a.y >= 0) {
        return dotAngle(a, new THREE.Vector2(1, 0));
    } else if (a.x >= 0 && a.y < 0) {
        return Math.PI * 2.0 - dotAngle(a, new THREE.Vector2(1, 0));
    } else if (a.x < 0 && a.y < 0) {
        return Math.PI * 2.0 - dotAngle(a, new THREE.Vector2(1, 0));
    } else {
        return dotAngle(a, new THREE.Vector2(1, 0));
    }
}