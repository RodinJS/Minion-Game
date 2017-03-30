import * as R from 'rodin/core';
import {gameMechanicsLoader} from './gameMechanicsLoader.js';

R.start();

import GameMechanics from './GameMechanics/GameMechanics.js'
import SharedObject from  './GameMechanics/SharedObject.js';
import {QueryString} from './util/url.js';

import states from './states/index.js';

const queryParameters = QueryString();
if (!queryParameters.device) {
    queryParameters.device = 'cardboard';
}
const currentDevice = queryParameters.device;
console.log(currentDevice);

const SS = new RodinSocket();
SS.connect({});


let gameMechanics = new GameMechanics();
let startingState = 0;

gameMechanics.addDevice({name: 'taron', isMaster: true});
gameMechanics.addDevice({name: 'cardboard', isMaster: false});
gameMechanics.addDevice({name: 'laptop', isMaster: false});

gameMechanics.setCurrentDevice(currentDevice);
if (gameMechanics.isMaster) {
    SS.setData({isMaster: true});
}

for (let i in states) {
    gameMechanics.addState(states[i]);
}


const init = function (gameMechanic) {
    // const sphere = new R.Sphere();
    // sphere.position.set(0, 1.6, -1);
    // gameMechanic.globals.sphere = sphere;
    //
    // const box = new R.Box();
    // box.position.set(0.5, 1.6, -1);
    // gameMechanic.globals.box = box;
    //
    //
    // const sharedSphere = new SharedObject(sphere, ['position.x', 'position.y', 'position.z']).active(true).lerp(true).updateInterval(100);
    // gameMechanic.addSharedObject(sharedSphere);
    //
    //
    // R.Scene.add(sphere);
    // R.Scene.add(box);
    // window.sphere = sphere;
};

const sendData = (data) => {
    SS.broadcastToAll('RodinGameEvent', data);
};
gameMechanics.setDataSender(sendData);

SS.onMessage('RodinGameEvent', (data) => {
    if (data.socketId == SS.Socket.id)
        return;
    if (!gameMechanics._isRunning)
        return;
    //console.log('data recieved', data);
    gameMechanics.onData(data);
});


gameMechanics.onStateChange((gameMechanics) => {
    if (gameMechanics.isMaster) {
        SS.setData({currentState: gameMechanics.state, isMaster: true});
    }
});

gameMechanicsLoader.gameMechanics = gameMechanics;
gameMechanicsLoader.on(R.CONST.READY, () => {
    // startingState will contains the state we should start at:
    // is we are the master it will be 0
    // if we are not it will be whatever state the master is currently
    SS.onMessage('getConnectedUsersList', (data) => {
        for (let i in data) {
            if (data[i].isMaster === true) {
                startingState = data[i].currentState;
                console.log('setting current starting state to ', startingState);
                break;
            }
        }
        gameMechanics.start(init, startingState);
    });
    SS.getConnectedUsersList();
});

gameMechanicsLoader.load();

// document.onclick = function () {
//     gameMechanics.next();
// };

window.gameMechanics = gameMechanics;