import * as R from 'rodin/core';

export class ScalableObject extends R.Sculpt {
    constructor(...args) {
        super(...args);
        this.helper = null;
        this.gripHelper1 = null;
        this.gripHelper2 = null;
        this.initScaleDist = 1;
        this.initScaleObj = 1;
        this.gripVectors = {firstHand: null, secondHand: null};

        this.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            this.btnDown(evt);
        });

        this.on(R.CONST.GAMEPAD_BUTTON_UP, (evt) => {
            this.btnUp(evt);
        });

        this.on(R.CONST.UPDATE, (evt) => {
            this.updateFunc(evt);
        });
    }

    btnDown(evt) {
        if (!this.gripVectors.firstHand) {
            this.parent = evt.gamepad.sculpt;
            this.gripVectors.firstHand = new THREE.Vector3(evt.point.x, evt.point.y, evt.point.z);

            if (!this.gripHelper1) {
                this.gripHelper1 = new R.Box(.05, .05, .05, new THREE.MeshBasicMaterial({
                    wireframe: true,
                    color: 0x996633
                }));
            }
            R.Scene.add(this.gripHelper1);
            this.gripHelper1.visible = false;
            this.gripHelper1.position.set(this.gripVectors.firstHand.x, this.gripVectors.firstHand.y, this.gripVectors.firstHand.z);
            this.gripHelper1.parent = evt.gamepad.sculpt;

        }
        else {
            this.gripVectors.secondHand = new THREE.Vector3(evt.point.x, evt.point.y, evt.point.z);

            if (!this.gripHelper2) {
                this.gripHelper2 = new R.Box(.05, .05, .05, new THREE.MeshBasicMaterial({
                    wireframe: true,
                    color: 0x996633
                }));
            }
            R.Scene.add(this.gripHelper2);
            this.gripHelper2.visible = false;
            this.gripHelper2.position.set(this.gripVectors.secondHand.x, this.gripVectors.secondHand.y, this.gripVectors.secondHand.z);
            this.gripHelper2.parent = evt.gamepad.sculpt;

            if (!this.helper) {
                this.helper = new R.Box(.05, .05, .05, new THREE.MeshBasicMaterial({
                    wireframe: true,
                    transparent: true,
                    color: 0x000000,
                    opacity: 0
                }));
            }
            R.Scene.add(this.helper);
            let posVec = new THREE.Vector3(0, 0, 0).addVectors(this.gripHelper1.globalPosition, this.gripHelper2.globalPosition);
            this.helper.position.set(posVec.x / 2, posVec.y / 2, posVec.z / 2);
            this.helper._threeObject.lookAt(this.gripHelper1.globalPosition);
            this.parent = this.helper;
            this.initScaleDist = new THREE.Vector3(0, 0, 0).subVectors(this.gripHelper1.globalPosition, this.gripHelper2.globalPosition).length();
        }
    }

    btnUp(evt) {
        this.initScaleObj = this.scale.x;
        this.gripVectors.firstHand = null;
        this.gripVectors.secondHand = null;
        if (this.gripHelper1) this.gripHelper1.parent = null;
        if (this.gripHelper2) this.gripHelper2.parent = null;
        this.parent = R.Scene.active;
        if (this.helper) R.Scene.remove(this.helper);
    }

    updateFunc(evt) {
        if (!this.gripVectors || !this.gripVectors.firstHand || !this.gripVectors.secondHand) return;
        let posVec = new THREE.Vector3(0, 0, 0).addVectors(this.gripHelper1.globalPosition, this.gripHelper2.globalPosition);
        this.helper.position.set(posVec.x / 2, posVec.y / 2, posVec.z / 2);
        const scale = new THREE.Vector3(0, 0, 0).subVectors(this.gripHelper1.globalPosition, this.gripHelper2.globalPosition).length() / this.initScaleDist;
        this.helper.scale.set(scale * this.initScaleObj, scale * this.initScaleObj, scale * this.initScaleObj);
        this.helper._threeObject.lookAt(this.gripHelper1.globalPosition);
    }
}

/**
 * @Aram
 * Es gndak@ menak Taron@ petq a karana scale ani, dra hamar enq es functian sarqel, ete aveli lav ban mtaces poxi
 * @param sculpt
 */

export const makeScalable = (sculpt) => {
    sculpt.helper = null;
    sculpt.gripHelper1 = null;
    sculpt.gripHelper2 = null;
    sculpt.initScaleDist = 1;
    sculpt.initScaleObj = 1;
    sculpt.gripVectors = {firstHand: null, secondHand: null};

    const btnDown = (evt) => {
        if (!sculpt.gripVectors.firstHand) {
            sculpt.parent = evt.gamepad.sculpt;
            sculpt.gripVectors.firstHand = new THREE.Vector3(evt.point.x, evt.point.y, evt.point.z);

            if (!sculpt.gripHelper1) {
                sculpt.gripHelper1 = new R.Box(.05, .05, .05, new THREE.MeshBasicMaterial({
                    wireframe: true,
                    color: 0x996633
                }));
            }
            R.Scene.add(sculpt.gripHelper1);
            sculpt.gripHelper1.visible = false;
            sculpt.gripHelper1.position.set(sculpt.gripVectors.firstHand.x, sculpt.gripVectors.firstHand.y, sculpt.gripVectors.firstHand.z);
            sculpt.gripHelper1.parent = evt.gamepad.sculpt;

        }
        else {
            sculpt.gripVectors.secondHand = new THREE.Vector3(evt.point.x, evt.point.y, evt.point.z);

            if (!sculpt.gripHelper2) {
                sculpt.gripHelper2 = new R.Box(.05, .05, .05, new THREE.MeshBasicMaterial({
                    wireframe: true,
                    color: 0x996633
                }));
            }
            R.Scene.add(sculpt.gripHelper2);
            sculpt.gripHelper2.visible = false;
            sculpt.gripHelper2.position.set(sculpt.gripVectors.secondHand.x, sculpt.gripVectors.secondHand.y, sculpt.gripVectors.secondHand.z);
            sculpt.gripHelper2.parent = evt.gamepad.sculpt;

            if (!sculpt.helper) {
                sculpt.helper = new R.Box(.05, .05, .05, new THREE.MeshBasicMaterial({
                    wireframe: true,
                    transparent: true,
                    color: 0x000000,
                    opacity: 0
                }));
            }
            R.Scene.add(sculpt.helper);
            let posVec = new THREE.Vector3(0, 0, 0).addVectors(sculpt.gripHelper1.globalPosition, sculpt.gripHelper2.globalPosition);
            sculpt.helper.position.set(posVec.x / 2, posVec.y / 2, posVec.z / 2);
            sculpt.helper._threeObject.lookAt(sculpt.gripHelper1.globalPosition);
            sculpt.parent = sculpt.helper;
            sculpt.initScaleDist = new THREE.Vector3(0, 0, 0).subVectors(sculpt.gripHelper1.globalPosition, sculpt.gripHelper2.globalPosition).length();
        }
    };

    const btnUp = (evt) => {
        sculpt.initScaleObj = sculpt.scale.x;
        sculpt.gripVectors.firstHand = null;
        sculpt.gripVectors.secondHand = null;
        if (sculpt.gripHelper1) sculpt.gripHelper1.parent = null;
        if (sculpt.gripHelper2) sculpt.gripHelper2.parent = null;
        sculpt.parent = R.Scene.active;
        if (sculpt.helper) R.Scene.remove(sculpt.helper);
    };

    const updateFunc = (evt) => {
        if (!sculpt.gripVectors || !sculpt.gripVectors.firstHand || !sculpt.gripVectors.secondHand) return;
        let posVec = new THREE.Vector3(0, 0, 0).addVectors(sculpt.gripHelper1.globalPosition, sculpt.gripHelper2.globalPosition);
        sculpt.helper.position.set(posVec.x / 2, posVec.y / 2, posVec.z / 2);
        const scale = new THREE.Vector3(0, 0, 0).subVectors(sculpt.gripHelper1.globalPosition, sculpt.gripHelper2.globalPosition).length() / sculpt.initScaleDist;
        sculpt.helper.scale.set(scale * sculpt.initScaleObj, scale * sculpt.initScaleObj, scale * sculpt.initScaleObj);
        sculpt.helper._threeObject.lookAt(sculpt.gripHelper1.globalPosition);
    };

    sculpt.scaleFunctions = {btnDown, btnUp, updateFunc};

    sculpt.on(R.CONST.GAMEPAD_BUTTON_DOWN, btnDown);
    sculpt.on(R.CONST.GAMEPAD_BUTTON_UP, btnUp);
    sculpt.on(R.CONST.UPDATE, updateFunc);
};

export const makeUnscaleable = (sculpt) => {
    sculpt.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, sculpt.scaleFunctions.btnDown);
    sculpt.removeEventListener(R.CONST.GAMEPAD_BUTTON_UP, sculpt.scaleFunctions.btnUp);
    sculpt.removeEventListener(R.CONST.UPDATE, sculpt.scaleFunctions.updateFunc);
};