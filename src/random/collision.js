const sphere2Plane = (sphere, plane) => {
    // todo: check this functionality later
    if(sphere.position.distanceTo(plane.position) < sphere.radius) {
        return true;
    }

    return false;
};

export const collision =  {
    sphere2Plane
};