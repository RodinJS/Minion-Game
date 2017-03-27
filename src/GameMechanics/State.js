import * as R from 'rodin/core';

export default class State extends R.EventEmitter {
    constructor(name) {
        super();
        this.name = name;
    }

    start(gameMechanics) {
        const evt = new R.RodinEvent(null);
        evt.gameMechanics = gameMechanics;
        this.emit('start', evt);
    }

    fastForward(gameMechanics) {
        const evt = new R.RodinEvent(null);
        evt.gameMechanics = gameMechanics;
        return this.emit('fastForward', evt);
    }

    finish(gameMechanics) {
        const evt = new R.RodinEvent(null);
        evt.gameMechanics = gameMechanics;
        this.emit('finish', evt);
    }
}