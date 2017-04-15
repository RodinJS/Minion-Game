import {SharedObject} from './GameMechanics/SharedObject.js';

export const shareObjects = (gameMechanics) => {
    const sharedBall = new SharedObject(gameMechanics.globals.ball, [
        'globalPosition.x',
        'globalPosition.y',
        'globalPosition.z',

        'globalRotation.x',
        'globalRotation.y',
        'globalRotation.z',

        'globalScale.x',
        'globalScale.y',
        'globalScale.z'
    ]).active(false).lerp(true).updateInterval(100);
    gameMechanics.addSharedObject(sharedBall);

    gameMechanics.globals.sharedBall = sharedBall;

    // /**
    //  * shared gun model position and rotation
    //  */
    // const sharedGun = new SharedObject(gameMechanics.globals.gun, [
    //     'globalPosition.x',
    //     'globalPosition.y',
    //     'globalPosition.z',
    //
    //     'globalRotation.x',
    //     'globalRotation.y',
    //     'globalRotation.z',
    // ]).active(false).lerp(true).updateInterval(100);
    // gameMechanics.addSharedObject(sharedGun);
    //
    // gameMechanics.globals.sharedGun = sharedGun;

    /**
     * shared Gru model
     */
    const sharedGru = new SharedObject(gameMechanics.globals.gru, [
        'globalPosition.x',
        'globalPosition.y',
        'globalPosition.z',

        'globalRotation.x',
        'globalRotation.y',
        'globalRotation.z',
    ]).active(true).lerp(false).updateInterval(100);
    gameMechanics.addSharedObject(sharedGru);


    /**
     * shared Gru right hand model
     */
    const sharedRightHand = new SharedObject(gameMechanics.globals.rightHand, [
        'globalPosition.x',
        'globalPosition.y',
        'globalPosition.z',

        'globalRotation.x',
        'globalRotation.y',
        'globalRotation.z',
    ]).active(true).lerp(false).updateInterval(100);
    gameMechanics.addSharedObject(sharedRightHand);

    /**
     * shared Gru left hand model
     */
    const sharedLeftHand = new SharedObject(gameMechanics.globals.leftHand, [
        'globalPosition.x',
        'globalPosition.y',
        'globalPosition.z',

        'globalRotation.x',
        'globalRotation.y',
        'globalRotation.z',
    ]).active(true).lerp(false).updateInterval(100);
    gameMechanics.addSharedObject(sharedLeftHand);
};