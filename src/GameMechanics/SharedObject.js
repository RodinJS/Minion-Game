import * as R from 'rodin/core';
import {lerp} from '../util/lerp.js';

function enforce() {
}

export class SharedObject {
    constructor(object, properties = ['position.x', 'position.y', 'position.z']) {
        this.object = object;
        this.properties = properties;

        this._updateInterval = 1000;
        this.lastUpdateTime = 0;

        this._active = false;
        this._isLerp = false;

        this._lerpTarget = null;
    }

    active(val) {
        this._active = !!val;
        return this;
    }

    lerp(val) {
        this._isLerp = !!val;
        return this;
    }

    updateInterval(val) {
        this._updateInterval = val;
        return this;
    }


    lerpProperties(e, destination, v) {
        if (e !== enforce) {
            throw new Error('lerpProperties is a private function!')
        }
        const source = this.getPropertiesObject();
        this.applyProperties(enforce, lerp(source, destination, v));
        return this;
    }

    setProperties(props) {
        if (this._isLerp) {
            this._lerpTarget = props;
        }
        else {
            this.applyProperties(enforce, props);
        }
    }

    applyProperties(e, source) {
        if (e !== enforce) {
            throw new Error('applyProperties is a private function, use setProperties instead!')
        }
        for (let i in this.properties) {
            R.utils.object.setProperty(this.object, this.properties[i],
                R.utils.object.getProperty(source, this.properties[i]));
        }
    }

    getPropertiesObject() {
        const res = {};
        for (let i in this.properties) {
            R.utils.object.setProperty(res, this.properties[i],
                R.utils.object.getProperty(this.object, this.properties[i]));
        }
        return res;
    }

    get isSharedObject() {
        return true;
    }

    /**
     * Shows if it is time to update current object
     * @param timestamp
     */
    shouldUpdate(timestamp) {
        return this._active && timestamp - this.lastUpdateTime > this._updateInterval;
    }

    update() {
        if (this._isLerp && this._lerpTarget) {
            this.lerpProperties(enforce, this._lerpTarget, R.Time.delta / 30);
        }
    }
}