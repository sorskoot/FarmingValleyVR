/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('move-camera', {
    player: { type: WL.Type.Object },
    teleportIndicatorMeshObject: { type: WL.Type.Object, default: null },
    floorGroup: { type: WL.Type.Int, default: 1 }
}, {
    init: function () {
        // if(this.teleportIndicatorMeshObject) {
        //     let origin = [0, 0, 0];
        //     glMatrix.quat2.getTranslation(origin, this.object.transformWorld);

        //     this.indicatorHidden = true;
        //     this.hitSpot = undefined;

        // } else {
        //     console.error(this.object.name, '- Teleport Component: Teleport indicator mesh is missing.');
        // }
        
    },

    start: function () {
        this.input = this.object.getComponent('input');
        
        this.teleportActive = false;
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
                console.log('TELEPORT!!');
                let position = []
                this.player.getTranslationWorld(position);
                this.player.setTranslationWorld([~~this.hitSpot[0]+.5,position[1],~~this.hitSpot[2]+.5]);
                if (!this.indicatorHidden) {
                    this.teleportIndicatorMeshObject.translate([1000, -1000, 1000]);
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

                this.teleportIndicatorMeshObject.resetTranslationRotation();
                this.teleportIndicatorMeshObject.translate([~~rayHit.locations[0][0]+.5, ~~rayHit.locations[0][1] + .1, ~~rayHit.locations[0][2]+.5]);

                this.hitSpot = rayHit.locations[0];

            } else {
                if (!this.indicatorHidden) {
                    this.teleportIndicatorMeshObject.translate([1000, 1000, 1000]);
                    this.indicatorHidden = true;
                }
                this.hitSpot = undefined;
            }
        }

    },
});