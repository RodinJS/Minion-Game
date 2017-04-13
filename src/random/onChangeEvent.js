import * as R from 'rodin/core';

const events = [];

export const addOnChangeEvent = (sculpt, property, cb) => {
    events.push({sculpt, property, cb})
};

export const removeOnChangeEvent = (sculpt, property, cb = undefined) => {
    for (let i = 0; i < events.length; i++) {
        if (events[i].sculpt === sculpt && events[i].property === property && (!cb || events[i].cb === cb)) {
            //events.splice(i, 1);
            events[i].removed = true;
        }
    }
};

const update = () => {
    for (let i = 0; i < events.length; i++) {
        if (events[i].removed) {
            continue;
        }
        if (!events[i][events[i].property]) {
            events[i][events[i].property] = R.utils.object.getProperty(events[i].sculpt, events[i].property)
        }

        if (events[i][events[i].property] !== R.utils.object.getProperty(events[i].sculpt, events[i].property)) {
            events[i].cb && events[i].cb();
        }

        events[i][events[i].property] = R.utils.object.getProperty(events[i].sculpt, events[i].property)
    }
};
console.log(R);
R.messenger.on(R.CONST.RENDER_START, () => {
    update();
});
