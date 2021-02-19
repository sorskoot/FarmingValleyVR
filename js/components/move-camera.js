/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('move-camera', {
    player: { type: WL.Type.Object },
    teleportIndicatorMeshObject: { type: WL.Type.Object, default: null },
    cantTeleportIndicatorMeshObject: { type: WL.Type.Object, default: null },
    floorGroup: { type: WL.Type.Int, default: 1 }
}, {
    init: function () {
    },

    start: function () {
        this.input = this.object.getComponent('input');

        this.teleportActive = false;
        let myimage = new Image();
        let canvas = document.createElement('canvas');
        this.ctx = canvas.getContext("2d");
        myimage.onload = function () {
            this.ctx.drawImage(myimage, 0, 0);
        }.bind(this);
        myimage.src = './map.png';

        //document.body.appendChild(canvas);
    },

    update: function (dt) {
        if (!this.input.xrInputSource) {
            return;
        }
        if (this.input.xrInputSource.gamepad.buttons[0].pressed && this.teleportActive === false) {
            this.teleportActive = true;
        }
        if (!this.input.xrInputSource.gamepad.buttons[0].pressed && this.teleportActive === true) {
            this.teleportActive = false;
            if (this.hitSpot) {
                if (this.canTeleport(~~this.hitSpot[0], ~~this.hitSpot[2])) {
                    let position = [];
                    this.player.getTranslationWorld(position);
                    this.player.setTranslationWorld([~~this.hitSpot[0] + .5, position[1], ~~this.hitSpot[2] + .5]);
                    console.log([~~this.hitSpot[0] + .5, position[1], ~~this.hitSpot[2] + .5]);
                }
                if (!this.indicatorHidden) {
                    this.teleportIndicatorMeshObject.translate([1000, -1000, 1000]);
                    this.cantTeleportIndicatorMeshObject.translate([1000, -1000, 1000]);
                    this.indicatorHidden = true;
                }
                this.hitSpot = undefined;
            }
        }

        if (this.teleportActive && this.teleportIndicatorMeshObject) {
            let origin = [0, 0, 0];
            glMatrix.quat2.getTranslation(origin, this.object.transformWorld);

            let quat = this.object.transformWorld;

            let forwardDirection = [0, 0, 0];
            glMatrix.vec3.transformQuat(forwardDirection, [0, 0, -1], quat);
            let rayHit = WL.scene.rayCast(origin, forwardDirection, 1 << this.floorGroup);

            if (rayHit.hitCount > 0) {
                if (this.indicatorHidden) {
                    this.indicatorHidden = false;
                }
                this.hitSpot = rayHit.locations[0];

                if (this.canTeleport(~~this.hitSpot[0], ~~this.hitSpot[2])) {
                    this.cantTeleportIndicatorMeshObject.setTranslationWorld([1000, 1000, 1000]);
                    this.teleportIndicatorMeshObject.resetTranslationRotation();
                    this.teleportIndicatorMeshObject.translate([~~rayHit.locations[0][0] + .5, ~~rayHit.locations[0][1] + .1, ~~rayHit.locations[0][2] + .5]);
                }else{
                    this.teleportIndicatorMeshObject.setTranslationWorld([1000, 1000, 1000]);
                    this.cantTeleportIndicatorMeshObject.resetTranslationRotation();
                    this.cantTeleportIndicatorMeshObject.translate([~~rayHit.locations[0][0] + .5, ~~rayHit.locations[0][1] + .1, ~~rayHit.locations[0][2] + .5]);
                }
            } else {
                if (!this.indicatorHidden) {
                    this.teleportIndicatorMeshObject.translate([1000, 1000, 1000]);
                    this.cantTeleportIndicatorMeshObject.translate([1000, 1000, 1000]);
                    this.indicatorHidden = true;
                }
                this.hitSpot = undefined;
            }
        }

    },
    canTeleport: function (x, y) {
        let pixel = 
            imageHelpers.getPixelXY(this.ctx.getImageData(0, 0, 100, 100), x + 50, y + 50);
        return pixel[3]===255;
    },

});