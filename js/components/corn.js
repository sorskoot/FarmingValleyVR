WL.registerComponent('corn', {
    stage01Mesh: {type: WL.Type.Mesh},
    stage02Mesh: {type: WL.Type.Mesh},
    stage03Mesh: {type: WL.Type.Mesh},
    stage04Mesh: {type: WL.Type.Mesh},
    material:{type: WL.Type.Mesh}
}, {
    name:"corn",

    init: function() {
        window.game.registerPlant(this);
    },
    start: function() {
        
    },
    update: function(dt) {
        
    },
    plant:function(position){
        let obj = WL.scene.addObject(this.object);      
       
        let meshComponent = obj.addComponent('mesh');
        
        meshComponent.mesh = this.stage01Mesh;
        meshComponent.material = this.material;
        console.log(position);
        obj.setTranslationLocal(position);
        console.log(obj.transformWorld);
        console.log(this.object.scalingWorld);
        obj.scale([.0625, .0625, .0625]);
    }
});