WL.registerComponent('corn', {
    stage01Mesh: { type: WL.Type.Mesh },
    stage02Mesh: { type: WL.Type.Mesh },
    stage03Mesh: { type: WL.Type.Mesh },
    stage04Mesh: { type: WL.Type.Mesh },
    material: { type: WL.Type.Material }
}, {
    name: "corn",

    init: function () {
        window.game.registerPlant(this);
    },
    start: function () {

    },

    update: function (dt) {

    },

    plant: function (position) {
        if (!this.meshes) {
            this.meshes = [
                this.stage01Mesh,
                this.stage02Mesh,
                this.stage03Mesh,
                this.stage04Mesh
            ];
        };
        let obj = WL.scene.addObject(this.object);
        meshComponent = obj.addComponent('mesh');
        meshComponent.mesh = this.meshes[0];
        meshComponent.material = this.material;
        let growable = obj.addComponent('growable',{growthChance:0.4});
        growable.addOnGrow(this.onGrow.bind(this));
        obj.setTranslationLocal(position);

        obj.scale([.0625, .0625, .0625]);
        this.isPlanted = true;
    },

    onGrow: function (obj, stage) {
        if (stage < 4) {
            let m = obj.getComponent('mesh');
            m.mesh = this.meshes[stage];
        }
    }
});