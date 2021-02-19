/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('action-controller', {
    meshRough: { type: WL.Type.Mesh },
    materialRough: { type: WL.Type.Material },
}, {  
    start: function() {
        this.picker = this.object.getComponent('target-picker');
        this.picker.canTrigger = this.canTrigger.bind(this);
       // this.picker.pickingAllowed = this.actingAllowed.bind(this);
        this.picker.picked = this.act.bind(this);
    },
    update: function(dt) {
    },
    
    act:function(x,y,z){
        switch(window.game.currentAction){
            case "Buying":
                let o = WL.scene.addObject();
              
                let m = o.addComponent('mesh');
                 o.resetTranslationRotation();
                 o.resetScaling();
                 o.translate([~~x+.5,.01,~~z+.5]);
                 o.scale([.0625, .0625, .0625]);
                m.mesh = this.meshRough;
                m.material = this.materialRough;
                console.log(o);
                break;
        }
    },
    canTrigger:function(){
        return (window.game.currentAction == "Buying")
    }
});