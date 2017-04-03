const sphere2Plane = (sphere, plane) => {
    // todo: check this functionality later
    //console.log(sphere.position.distanceTo(plane.position));

    if(sphere.globalPosition.distanceTo(plane.position) < sphere.radius) {
        return true;
    }

    return false;
};

export const collision =  {
    sphere2Plane
};