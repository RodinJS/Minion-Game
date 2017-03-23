import * as R from 'rodin/core';


class SharedObject {
    constructor(object, ...properties) {
        this.object = object;
        this.properties = properties;
    }

    applyProperties(source) {

        for (let i in this.properties) {
            R.utils.object.setProperty(this.object, this.properties[i],
                R.utils.object.getProperty(source, this.properties[i]));
        }
    }
}