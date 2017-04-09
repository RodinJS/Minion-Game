import * as R from 'rodin/core';
import {gameMechanicsLoader} from './gameMechanicsLoader.js';
R.start();

import GameMechanics from './GameMechanics/GameMechanics.js';
import {shareObjects} from './shareObject.js';
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

/**
 * Init function for gameMechanics
 * this is called when gameMechanics starts working
 * @param gameMechanic
 */
const init = function (gameMechanics) {
    shareObjects(gameMechanics);
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
        gameMechanics.start(init, 5);
    });
    SS.getConnectedUsersList();
});

gameMechanicsLoader.load();

// document.onclick = function () {
//     gameMechanics.next();
// };

window.gameMechanics = gameMechanics;