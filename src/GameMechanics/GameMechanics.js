import * as CONSTS from './CONSTS';

class GameMechanics {
    constructor() {
        this.devices = [];
        this.locals = [];

        this.isHost = false;

        this.states = [];
        this._currentState = null;

        this.dataSender = null;

        this.sharedObjects = [];
    }

    /**
     *
     * @param {name: String, isHost: bool} device
     * @param {function} init
     */
    addDevice(device, init) {
        this.locals[device.name] = {};
        this.states[device.name] = [];
        this.isHost = !!device.isHost;

        this.devices.push(device);

    }

    get state() {
        return this._currentState;
    }

    get stateName() {
        return this.state[this.state].name;
    }

    set state(val) {
        this.states[this._currentState].finish();

        this._currentState = val;
        this.states[this._currentState].start();

        // if we are the host we have to tell
        // all the slaves to change state as well
        if (this.isHost) {
            if (!this.dataSender) {
                throw new Error("No dataSender defined for gameMechanics host!");
            }

            this.dataSender({type: CONSTS.STATE_CHANGE, state: this._currentState});
        }
    }

    start(startState = 0) {
        for (let i = 0; i < startState; i++) {
            this.states[i].fastForward();
        }
        this.state = startState;
    }

    next() {
        this.state = this.state + 1;
    }

    setDataSender(fcn) {
        this.dataSender = fcn;
    }

    setDataReciever(fcn) {
        // todo: don't know if we even need this,
        // todo: maybe this is an event?
        this.dataReciever = fcn;
    }

}