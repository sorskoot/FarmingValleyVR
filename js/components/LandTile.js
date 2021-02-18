/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('landtile', {
    state: { type: WL.Type.Enum, values: ["rough", "tilled", "wet"], default: "rough" },
    meshRough: { type: WL.Type.Mesh },
    meshTilled: { type: WL.Type.Mesh },
    meshWet: { type: WL.Type.Mesh },
    materialRough: { type: WL.Type.Material },
    materialTilled: { type: WL.Type.Material },
    materialWet: { type: WL.Type.Material },
}, {
    bought:false,

    init: function () {
        
    },
    initialize: function () {
        this.meshes = [
            { mesh: this.meshRough, material: this.materialRough },
            { mesh: this.meshTilled, material: this.materialTilled },
            { mesh: this.meshWet, material: this.materialWet },
        ]

        /** @type WL.CollisionComponent  */
        let collisionComponent = this.object.addComponent('collision');
        collisionComponent.collider = WL.Collider.AxisAlignedBox;
        collisionComponent.group = 1 << 1;
        collisionComponent.extents = [.45, .1, .45];
        collisionComponent.active = true;

        this.collisionComponent = collisionComponent;
         
        let target = this.object.addComponent('cursor-target');
        target.addClickFunction(this.onClick.bind(this));
    },
    start: function () {


    },
    update: function (dt) {

    },
    onClick: function () {
        switch (window.game.currentAction) {
            case "Buying":
                if (this.state === TILESTATE_ROUGH && !this.bought) {
                    this.object.scale([.25,.25,.25]);
                    this.bought = true;
                    this.updateState();
                }
                break;
            case "Tilling":
                if (this.state === TILESTATE_ROUGH && this.bought) {
                    this.state = TILESTATE_TILLED;
                    this.updateState();
                }
                break;
            case "Watering":
                if (this.state === TILESTATE_TILLED) {
                    this.state = TILESTATE_WET;
                    this.updateState();
                }
                break;
            case "Seeding":
                if (this.state === TILESTATE_WET) {
                    var temp = [0, 0, 0];
                    this.object.getTranslationWorld(temp);       
                    this.plant = window.game.plant(temp);
                }
                break;
            default:
                break;
        }


    },
    updateState: function () {       
        /** @type WL.MeshComponent  */
        const meshComponent = this.object.getComponent('mesh');
        meshComponent.mesh = this.meshes[this.state].mesh;
        meshComponent.material = this.meshes[this.state].material;
        // if (this.state == 0) {
        //     this.meshComponent.material = this.materialRough;
        // } else {
        //     this.meshComponent.material = this.materialTilled;
        // }
    }
});