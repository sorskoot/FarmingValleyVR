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
    init: function () {

    },
    initialize: function () {
        this.meshes = [
            { mesh: this.meshRough, material: this.materialRough },
            { mesh: this.meshTilled, material: this.materialTilled },
            { mesh: this.meshWet, material: this.materialWet },
        ]

        /** @type WL.MeshComponent  */
        let meshComponent = this.object.addComponent('mesh');

        /** @type WL.CollisionComponent  */
        let collisionComponent = this.object.addComponent('collision');
        collisionComponent.collider = WL.Collider.AxisAlignedBox;
        collisionComponent.group = 1 << 1;
        collisionComponent.extents = [.45, .1, .45];
        collisionComponent.active = true;

        this.collisionComponent = collisionComponent;
        this.meshComponent = meshComponent;

        this.updateState();

        let target = this.object.addComponent('cursor-target');
        target.addClickFunction(this.onClick.bind(this));
    },
    start: function () {


    },
    update: function (dt) {

    },
    onClick: function () {

        switch (window.game.currentAction) {
            case "Tilling":
                if (this.state === TILESTATE_ROUGH) {
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
        this.meshComponent.mesh = this.meshes[this.state].mesh;
        this.meshComponent.material = this.meshes[this.state].material;
        // if (this.state == 0) {
        //     this.meshComponent.material = this.materialRough;
        // } else {
        //     this.meshComponent.material = this.materialTilled;
        // }
    }
});