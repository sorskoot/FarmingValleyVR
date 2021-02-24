/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('move-camera', {
    player: { type: WL.Type.Object },
    // teleportIndicatorMeshObject: { type: WL.Type.Object, default: null },
    // cantTeleportIndicatorMeshObject: { type: WL.Type.Object, default: null },
    // floorGroup: { type: WL.Type.Int, default: 1 }
}, {
    init: function () {
    },

    start: function () {
        
        // this.input = this.object.getComponent('input');        
        // this.teleportIndicatorMeshObject.translate([1000, -1000, 1000]);
        // this.cantTeleportIndicatorMeshObject.translate([1000, -1000, 1000]);       
        // this.picker = this.object.getComponent('target-picker');
        // this.picker.initialize(this.object.getComponent('input'));
        // this.picker.pickingAllowed = this.canTeleport.bind(this);
        // this.picker.picked = this.teleport.bind(this);
        //document.body.appendChild(canvas);
        
    },
    // teleport: function(x,y,z){
    //     console.log([x,z]);
    //     let position = [];
    //     this.player.getTranslationWorld(position);
    //     this.player.setTranslationWorld([~~x + .5, position[1], ~~z + .5]);
    // },
    // canTeleport: function (x,_ , y) {        
    //     let pixel = window.game.getMapPixel(x,y);            
    //     return pixel[3]===255;
    // },

});