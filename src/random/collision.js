const sphere2Plane = (sphere, plane) => {

    // if(sphere.globalPosition.distanceTo(plane.position) < sphere.radius) {
    //     return true;
    // }

    if(sphere.globalPosition.z > plane.globalPosition.z)
        return true;

    return false;
};

export const collision =  {
    sphere2Plane
};