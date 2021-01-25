WL.registerComponent('patch-of-land', {
    meshRough: {type: WL.Type.Mesh},
    meshTilled: {type: WL.Type.Mesh},
    meshWet: {type: WL.Type.Mesh},
    materialRough:{type:WL.Type.Material},
    materialTilled:{type:WL.Type.Material},
    materialWet:{type:WL.Type.Material},
}, {
    init: function() {
        console.log('init() with param', this.param);
    },
    start: function() {
        
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                let o = WL.scene.addObject(this.object);        
                //o.name = "//`land-${x}-${y}`;
                o.resetTranslationRotation();
                o.resetScaling();                
                o.addComponent("landtile",
                {
                    state: TILESTATE_ROUGH,
                    meshRough:this.meshRough,
                    meshTilled:this.meshTilled,
                    meshWet:this.meshWet,
                    materialRough:this.materialRough,
                    materialTilled:this.materialTilled,
                    materialWet:this.materialWet
                });
                o.translate([x,y,.1]);   
                o.scale([.45,.45,.45]);
                o.rotateAxisAngleDeg(AXIS.X, -90);
            }            
        }       
    },
    update: function(dt) {
     
    }    
});