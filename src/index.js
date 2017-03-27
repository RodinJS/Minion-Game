import * as R from 'rodin/core';

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
SS.getConnectedUsersList();

SS.onMessage('getConnectedUsersList', (data) => {
    console.log(data);
});


let gameMechanics = new GameMechanics();

gameMechanics.addDevice({name: 'taron', isMaster: true});
gameMechanics.addDevice({name: 'cardboard', isMaster: false});
gameMechanics.addDevice({name: 'laptop', isMaster: false});

gameMechanics.setCurrentDevice(currentDevice);


for (let i in states) {
    gameMechanics.addState(states[i]);
}


const init = function (gameMechanic) {
    const sphere = new R.Sphere();
    sphere.position.set(0, 1.6, -1);
    gameMechanic.globals.sphere = sphere;

    const box = new R.Box();
    box.position.set(0.5, 1.6, -1);
    gameMechanic.globals.box = box;


    const sharedSphere = new SharedObject(sphere, ['position.x', 'position.y', 'position.z']).active(true).lerp(true).updateInterval(100);
    gameMechanic.addSharedObject(sharedSphere);



    R.Scene.add(sphere);
    R.Scene.add(box);
    window.sphere = sphere;
};

const sendData = (data) => {
    SS.broadcastToAll('RodinGameEvent', data);
};
gameMechanics.setDataSender(sendData);

SS.onMessage('RodinGameEvent', (data) => {
    if (data.socketId == SS.Socket.id)
        return;
    console.log('data recieved', data);
    gameMechanics.onData(data);
});


gameMechanics.start(init, 0);

document.onclick = function () {
    gameMechanics.next();
};