import * as R from 'rodin/core';
import {balloonBounceSound} from '../sounds/gameSounds.js'

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
        else if (!sculpt.gripVectors.secondHand) {
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

        if (sculpt.gripVectors && sculpt.gripVectors.firstHand && sculpt.gripVectors.secondHand) {
            sculpt.gripVectors.firstHand = null;
            sculpt.gripVectors.secondHand = null;
            let bounceAnim = new R.AnimationClip("bounceAnim", {
                scale: {
                    x: {from: sculpt.initScaleObj, to: sculpt.helper.scale.z},
                    y: {from: sculpt.initScaleObj, to: sculpt.helper.scale.z},
                    z: {from: sculpt.helper.scale.z, to: sculpt.helper.scale.z}
                }
            });
            bounceAnim.duration(500);
            bounceAnim.easing(function (k) {
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
            });
            balloonBounceSound.play();
            sculpt.helper.animation.add(bounceAnim);
            sculpt.helper.animation.start("bounceAnim");
            sculpt.helper.on(R.CONST.ANIMATION_COMPLETE, (evt)=> {
                sculpt.helper.scale.set(sculpt.helper.scale.z, sculpt.helper.scale.z, sculpt.helper.scale.z);
                sculpt.initScaleObj = sculpt.helper.scale.z;
                sculpt.parent = R.Scene.active;
                sculpt.scale.set(sculpt.helper.scale.z, sculpt.helper.scale.z, sculpt.helper.scale.z);

                if (sculpt.gripHelper1 && sculpt.gripHelper1.parent) sculpt.gripHelper1.parent = null;
                if (sculpt.gripHelper2 && sculpt.gripHelper2.parent) sculpt.gripHelper2.parent = null;
                if (sculpt.helper && sculpt.helper.parent) sculpt.helper.parent = null;

                if (sculpt.helper.animation.getClip("bounceAnim")) sculpt.helper.animation.remove("bounceAnim");
            });
        }
        else{
            if (sculpt.gripVectors.firstHand) {
                if(!sculpt.gripVectors.secondHand){
                    sculpt.parent = R.Scene.active;
                    sculpt.gripVectors.firstHand = null;
                    if(sculpt.gripHelper1){
                        sculpt.gripHelper1.parent = null;
                    }
                }

                sculpt.gripVectors.firstHand = null;
                sculpt.gripVectors.secondHand = null;

            }

        }

    };

    const updateFunc = (evt) => {
        if (!sculpt.gripVectors || !sculpt.gripVectors.firstHand || !sculpt.gripVectors.secondHand) return;
        let posVec = new THREE.Vector3(0, 0, 0).addVectors(sculpt.gripHelper1.globalPosition, sculpt.gripHelper2.globalPosition);
        sculpt.helper.position.set(posVec.x / 2, posVec.y / 2, posVec.z / 2);
        const scale = new THREE.Vector3(0, 0, 0).subVectors(sculpt.gripHelper1.globalPosition, sculpt.gripHelper2.globalPosition).length() / sculpt.initScaleDist;
        sculpt.helper.scale.z = scale * sculpt.initScaleObj;
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