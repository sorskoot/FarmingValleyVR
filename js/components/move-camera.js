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
       
 

        let myimage = new Image();
        let canvas = document.createElement('canvas');
        this.ctx = canvas.getContext("2d");
        myimage.onload = function () {
            this.ctx.drawImage(myimage, 0, 0);
        }.bind(this);
        myimage.src = './map.png';

        this.picker = this.object.getComponent('target-picker');
        this.picker.pickingAllowed = this.canTeleport.bind(this);
        this.picker.picked = this.teleport.bind(this);
        //document.body.appendChild(canvas);
        
    },
    teleport: function(x,y,z){
        let position = [];
        this.player.getTranslationWorld(position);
        this.player.setTranslationWorld([~~x + .5, position[1], ~~z + .5]);
    },
    canTeleport: function (x,_ , y) {
        //~~this.hitSpot[0],0, ~~this.hitSpot[2]
        let pixel = 
            imageHelpers.getPixelXY(this.ctx.getImageData(0, 0, 100, 100), ~~x + 50, ~~y + 50);
        return pixel[3]===255;
    },

});