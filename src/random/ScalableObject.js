import {SharedObject} from '../GameMechanics/SharedObject.js';
import * as R from 'rodin/core';

function enforce() {
}

export class ScalableObject extends R.Sculpt {
    constructor(...args) {
        super(...args);
        this.helper = null;
        this.gripHelper1 = null;
        this.gripHelper2 = null;
        this.initScaleDist = 1;
        this.initScaleObj = 1;
        this.gripVectors = {firstHand: null, secondHand: null};

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