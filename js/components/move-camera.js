/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('move-camera', {
    player: {type: WL.Type.Object},
    teleportIndicatorMeshObject: {type: WL.Type.Object, default: null},
    floorGroup: {type: WL.Type.Int, default: 1}
}, {
    init: function() {              
        if(this.teleportIndicatorMeshObject) {
            let origin = [0, 0, 0];
            glMatrix.quat2.getTranslation(origin, this.object.transformWorld);

            this.indicatorHidden = true;
            this.hitSpot = undefined;

        } else {
            console.error(this.object.name, '- Teleport Component: Teleport indicator mesh is missing.');
        }

        this.teleportActive = false;    
    },
    update: function(dt) {
        let xrSession = WL.xrSession;
        if (!xrSession) return;
        for (let i = 0; i < xrSession.inputSources.length; ++i) {
            let input = xrSession.inputSources[i];
            if (input.handedness == 'left') {
                let gamepad = input.gamepad;
                if (!gamepad) continue;
                let yAxis = gamepad.axes[3];
                // console.log(yAxis);
                if(yAxis < -.8 & !this.teleportActive){
                    this.teleportActive = true;
                }
                if(yAxis > -.2 & this.teleportActive){
                    this.teleportActive = false;
                    console.log('TELEPORT!')
                    if(this.hitSpot){
                        
                        this.player.resetTransform();
                        this.player.translate(this.hitSpot);
                        this.hitSpot = null;
                    }
                }
            }
        }

        if(this.teleportActive && this.teleportIndicatorMeshObject)
        {
            let origin = [0, 0, 0];
            glMatrix.quat2.getTranslation(origin, this.object.transformWorld);

            let quat = this.object.transformWorld;

            let forwardDirection = [0, 0, 0];
            glMatrix.vec3.transformQuat(forwardDirection, [0, 0, -1], quat);
            let rayHit = WL.scene.rayCast(origin, forwardDirection, 1 << this.floorGroup);            

            if(rayHit.hitCount > 0) {
                console.log(rayHit);
                if(this.indicatorHidden) {
                    this.indicatorHidden = false;
                }

                this.teleportIndicatorMeshObject.resetTransform();
                this.teleportIndicatorMeshObject.translate(rayHit.locations[0]);

                this.hitSpot = rayHit.locations[0];
                
            } else {
                if(!this.indicatorHidden) {
                    this.teleportIndicatorMeshObject.translate([1000, 1000, 1000]);
                    this.indicatorHidden = true;
                }
                this.hitSpot = undefined;
            }
        }

    },
});