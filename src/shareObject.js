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
};