/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('landtile', {
    state: {type: WL.Type.Enum, values:["rough","tilled","wet"], default:"rough"},
    meshRough: {type: WL.Type.Mesh},
    meshTilled: {type: WL.Type.Mesh},
    meshWet: {type: WL.Type.Mesh},
    materialRough:{type:WL.Type.Material},
    materialTilled:{type:WL.Type.Material},
    materialWet:{type:WL.Type.Material},
}, {
    init: function() {
        this.meshes=[
            {mesh: this.meshRough, material:this.materialRough},
            {mesh: this.meshTilled, material:this.materialTilled},
            {mesh: this.meshWet, material:this.materialWet},
        ]        
    },
    start: function() {
        /** @type WL.MeshComponent  */
        let meshComponent = this.object.addComponent('mesh');

        /** @type WL.CollisionComponent  */
        let collisionComponent = this.object.addComponent('collision');
        collisionComponent.collider = WL.Collider.Box;
        collisionComponent.group = 1;
        collisionComponent.extents = [1,1,.1];

        this.collisionComponent = collisionComponent;
        this.meshComponent = meshComponent;
        
        this.updateState();

        let target = this.object.addComponent('cursor-target');
        target.addClickFunction(this.onClick.bind(this));
        
    },
    update: function(dt) {

    },
    onClick:function(){
        console.log("click");
        this.state = TILESTATE_TILLED;
        this.updateState();
    },
    updateState:function(){        
        this.meshComponent.mesh = this.meshes[this.state].mesh;
        this.meshComponent.material = this.meshes[this.state].material;        
    }
});