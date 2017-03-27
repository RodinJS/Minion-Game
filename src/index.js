import * as R from 'rodin/core';
import GameMechanics from './GameMechanics/GameMechanics.js'
import State from './GameMechanics/State.js';
import SharedObject from  './GameMechanics/SharedObject.js';

class sharedObjectTest {
    constructor() {
        this._x = 0;
    }

    get x() {
        return this._x;
    }

    set x(val) {
        this._x = val;
        console.log(`X changed to ${this._x}`);
    }
}

R.start();

let master = new GameMechanics();
let slave = new GameMechanics();

master.addDevice({name: 'master', isMaster: true});
master.addDevice({name: 'slave', isMaster: false});
master.setCurrentDevice('master');

slave.addDevice({name: 'master', isMaster: true});
slave.addDevice({name: 'slave', isMaster: false});
slave.setCurrentDevice('slave');

const masterStates = [];
masterStates.push(new State('first master state'));
masterStates.push(new State('second master state'));

masterStates[0].on('start', () => {
    console.log('first master state started');
});

masterStates[1].on('start', () => {
    console.log('second master state started');
});

const slaveStates = [];
slaveStates.push(new State('first slave state'));
slaveStates.push(new State('second slave state'));

slaveStates[0].on('start', () => {
    console.log('first slave state started');
});

slaveStates[1].on('start', () => {
    console.log('second slave state started');
});

for (let i in masterStates) {
    master.addState({
        master: masterStates[i],
        slave: slaveStates[i]
    });
    slave.addState({
        master: masterStates[i],
        slave: slaveStates[i]
    });
}


const init = function (gameMechanic) {
    const sharedObj = new SharedObject(new sharedObjectTest(), ['x']);
    gameMechanic.addSharedObject(sharedObj);
    sharedObj.active = true;

};

const sendData = (data) => {
    setTimeout(() => {
        console.log(data);
        slave.onData(data);
    }, 100);
};

master.setDataSender(sendData);

master.start(init, 0);
slave.start(init, 0);

document.onclick = function () {
    master.next();
};