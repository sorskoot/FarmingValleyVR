WL.registerComponent('patch-of-land', {
    meshRough: { type: WL.Type.Mesh },
    meshTilled: { type: WL.Type.Mesh },
    meshWet: { type: WL.Type.Mesh },
    materialRough: { type: WL.Type.Material },
    materialTilled: { type: WL.Type.Material },
    materialWet: { type: WL.Type.Material },
}, {
    init: function () {
        console.log('init() with param', this.param);
    },
    start: function () {

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                let o = WL.scene.addObject(this.object);
                //o.name = "//`land-${x}-${y}`;
                o.resetTranslationRotation();
                o.resetScaling();
                let tile = o.addComponent("landtile", {
                    state: TILESTATE_ROUGH,
                    meshRough: this.meshRough,
                    meshTilled: this.meshTilled,
                    meshWet: this.meshWet,
                    materialRough: this.materialRough,
                    materialTilled: this.materialTilled,
                    materialWet: this.materialWet
                })
                tile.initialize();
                o.translate([x, 0, y]);
                o.scale([.0625, .0625, .0625]);
                //o.rotateAxisAngleDeg(AXIS.X, -90);
            }
        }
    },
    update: function (dt) {

    }
});