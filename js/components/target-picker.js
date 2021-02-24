WL.registerComponent('target-picker', {
    allowedPickerMeshObject: { type: WL.Type.Object, default: null },
    notAllowedPickerMeshObject: { type: WL.Type.Object, default: null },
    floorGroup: { type: WL.Type.Int, default: 1 },
}, {
    canTrigger:function(){
        return true;
    },
    pickingAllowed:function(x,y,z){
        return true;
    },
    picked:function(x,y,z){
        console.log('please override picked function');
    },
    initialize:function(input){
        this.pickingActive = false;
        this.input = input;     
        
        // throw error or warning when no input is on the mesh.
        this.allowedPickerMeshObject.translate([1000, -1000, 1000]);
        this.notAllowedPickerMeshObject.translate([1000, -1000, 1000]);
        this.initialized = true;
        
    },
    start: function() {
     
    },    
    update: function(dt) {
        if (!this.initialized ||!this.input.xrInputSource) {
            return;
        }
        if (this.input.xrInputSource.gamepad.buttons[0].pressed && this.pickingActive === false && this.canTrigger()) {
          
            this.pickingActive = true;
        }
        if (!this.input.xrInputSource.gamepad.buttons[0].pressed && this.pickingActive === true) {
            this.pickingActive = false;
            if (this.hitSpot) {
                
                console.log(this.input.xrInputSource)
                if (this.pickingAllowed(this.hitSpot[0],this.hitSpot[1],this.hitSpot[2])) {
                    this.picked(this.hitSpot[0],this.hitSpot[1],this.hitSpot[2]);
                }
                if (!this.indicatorHidden) {
                    this.allowedPickerMeshObject.translate([1000, -1000, 1000]);
                    this.notAllowedPickerMeshObject.translate([1000, -1000, 1000]);
                    this.indicatorHidden = true;
                }
                this.hitSpot = undefined;
            }
        }

        if (this.pickingActive) {
            let origin = [0, 0, 0];
            glMatrix.quat2.getTranslation(origin, this.object.transformWorld);
            
            let quat = this.object.transformWorld;

            let forwardDirection = [0, 0, 0];
            glMatrix.vec3.transformQuat(forwardDirection, [0, 0, -1], quat);
            let rayHit = WL.scene.rayCast(origin, 
                forwardDirection, (1 << this.floorGroup)) ;
            
            if (rayHit.hitCount > 0) {
                if (this.indicatorHidden) {
                    this.indicatorHidden = false;
                }
                this.hitSpot = rayHit.locations[0];

                if (this.pickingAllowed(~~this.hitSpot[0], 0, ~~this.hitSpot[2])) {
                    this.notAllowedPickerMeshObject.setTranslationWorld([1000, 1000, 1000]);
                    this.allowedPickerMeshObject.resetTranslationRotation();
                    this.allowedPickerMeshObject.translate([Math.floor(rayHit.locations[0][0]) + .5, Math.floor(rayHit.locations[0][1]) + .1,  Math.floor(rayHit.locations[0][2]) + .5]);
                }else{
                    this.allowedPickerMeshObject.setTranslationWorld([1000, 1000, 1000]);
                    this.notAllowedPickerMeshObject.resetTranslationRotation();
                    this.notAllowedPickerMeshObject.translate([Math.floor(rayHit.locations[0][0]) + .5,  Math.floor(rayHit.locations[0][1]) + .1,  Math.floor(rayHit.locations[0][2]) + .5]);
                }
            } else {
                if (!this.indicatorHidden) {
                    this.allowedPickerMeshObject.translate([1000, 1000, 1000]);
                    this.notAllowedPickerMeshObject.translate([1000, 1000, 1000]);
                    this.indicatorHidden = true;
                }
                this.hitSpot = undefined;
            }
        }
    },
});