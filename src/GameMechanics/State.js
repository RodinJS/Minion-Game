import * as R from 'rodin/core';

export default class State extends R.EventEmitter {
    constructor(name) {
        super();
        this.name = name;
    }

    start() {
        this.emit('start', new R.RodinEvent());
    }

    fastForward() {
        return this.emit('fastForward', new R.RodinEvent());
    }

    finish() {
        this.emit('finish', new R.RodinEvent());
    }
}