import * as R from 'rodin/core';

class State extends R.EventEmitter {
    constructor(name) {
        super();
        this.name = name;
    }

    start() {
        this.emit('start');
    }

    fastForward() {
        return this.emit('fastForward');
    }

    finish() {
        this.emit('finish');
    }
}