import * as CONSTS from './CONSTS.js';
import SharedObject from './SharedObject.js'
import * as R from 'rodin/core';

export default class GameMechanics {
    constructor() {
        this.devices = [];
        this._currentDevice = null;

        this.locals = [];

        this.isMaster = false;

        this.states = {};
        this._currentState = null;

        this.dataSender = null;

        this.sharedObjects = [];

        this._isRunning = false;

        this._init = null;

        R.messenger.on(R.CONST.RENDER_START, (e) => {
            // handle Slave case somehow, when we get socket service

            if (!this.isMaster) {
                return;
            }

            if (!this._isRunning) {
                return;
            }

            const payload = {};

            for (let i in this.sharedObjects) {
                if (this.sharedObjects[i].shouldUpdate(R.Time.currentFrameTimestamp)) {
                    payload[i] = this.sharedObjects[i].getPropertiesObject();
                    this.sharedObjects[i].lastUpdateTime = R.Time.currentFrameTimestamp;
                }
            }

            if (!this.dataSender) {
                throw new Error("No dataSender defined for gameMechanics master!");
            }
            if (Object.keys(payload).length > 0) {
                this.dataSender({type: CONSTS.SHARED_OBJECTS, payload: payload});
            }

        });

    }

    /**
     *
     * @param {name: String, isHost: bool} device
     */
    addDevice(device) {
        if (typeof device === 'string') {
            device = {name: device, isMaster: false};
        }

        this.locals[device.name] = {};
        this.states[device.name] = [];
        this.isMaster = !!device.isMaster;

        this.devices.push(device);
    }

    /**
     * sets current device
     * @param deviceName
     */
    setCurrentDevice(deviceName) {
        // this is slow but whatever
        let indexOfDevice = this.devices.map(device => device.name).indexOf(deviceName);
        if (indexOfDevice == -1) {
            throw new Error(`${deviceName} is not a device in this gameMechanics`);
        }
        this._currentDevice = deviceName;
        this.isMaster = !!this.devices[indexOfDevice].isMaster;
    }

    get state() {
        return this._currentState;
    }

    get stateName() {
        return this.state[this.state].name;
    }

    /**
     *
     * @param {} states
     */
    addState(states) {
        // if (states.length !== this.devices.length) {
        //     throw new Error('You must provide a state for each device!');
        // }

        for (let i in states) {
            this.states[i].push(states[i]);
        }
    }

    set state(val) {
        // Call finish of the current state
        // Before we change the state
        if (this._currentState !== null)
            this.states[this._currentDevice][this._currentState].finish();

        this._currentState = val;
        this.states[this._currentDevice][this._currentState].start();

        // if we are the master we have to tell
        // all the slaves to change state as well
        if (this.isMaster) {
            if (!this.dataSender) {
                throw new Error("No dataSender defined for gameMechanics master!");
            }

            this.dataSender({type: CONSTS.STATE_CHANGE, state: this._currentState});
        }
    }

    /**
     *
     * @param {function} init
     * @param {Number} startState
     */
    start(init, startState = 0) {
        this._init = init;
        this._init.bind(this)(this);

        for (let i = 0; i < startState; i++) {
            this.states[this._currentDevice][i].fastForward();
        }

        this.state = startState;

        this._isRunning = true;
    }

    stop() {
        this._isRunning = false;
    }

    next() {
        this.state = this.state + 1;
    }

    setDataSender(fcn) {
        this.dataSender = fcn;
    }

    onData(data) {
        if (this.isMaster) {
            throw new Error('Can not call onData of a master!');
        }

        if (data.type === CONSTS.STATE_CHANGE) {
            this.state = data.state;
        }

        if (data.type === CONSTS.SHARED_OBJECTS) {
            for (let i in data.payload) {
                this.sharedObjects[i].applyProperties(data.payload[i]);
            }
        }
    }

    /**
     *
     * @param {SharedObject} obj
     */
    addSharedObject(obj) {
        this.sharedObjects.push(obj)
    }

}