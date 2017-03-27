import * as R from 'rodin/core';

// todo: implement lerp support

export default class SharedObject {
    constructor(object, properties = ['matrix.elements']) {
        this.object = object;
        this.properties = properties;

        this.updateInterval = 1000;
        this.lastUpdateTime = 0;

        this.active = false;
    }

    applyProperties(source) {
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
        return this.active && timestamp - this.lastUpdateTime > this.updateInterval;
    }
}