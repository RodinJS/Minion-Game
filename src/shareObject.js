import {SharedObject} from './GameMechanics/SharedObject.js';

export const shareObjects = (gameMechanics) => {
    const sharedBall = new SharedObject(gameMechanics.globals.ball, ['position.x', 'position.y', 'position.z']).active(false).lerp(true).updateInterval(100);
    gameMechanics.addSharedObject(sharedBall);

    gameMechanics.globals.sharedBall = sharedBall;
};