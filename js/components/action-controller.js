/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('action-controller', {
    player: { type: WL.Type.Object },
    meshRough: { type: WL.Type.Mesh },
    materialRough: { type: WL.Type.Material },
}, {
    start: function () {
        this.picker = this.object.getComponent('target-picker');
        this.picker.initialize(this.object.getComponent('input'));
        this.picker.canTrigger = this.canTrigger.bind(this);
        this.picker.pickingAllowed = this.actingAllowed.bind(this);
        this.picker.picked = this.act.bind(this);

    },
    update: function (dt) {
        
    },

    act: function (x, y, z) {
        switch (window.game.currentAction) {
            case "Moving":
                // let o = WL.scene.addObject();              
                // let m = o.addComponent('mesh');
                //  o.resetTranslationRotation();
                //  o.resetScaling();
                //  o.translate([~~x+.5,.01,~~z+.5]);
                //  o.scale([.0625, .0625, .0625]);
                // m.mesh = this.meshRough;
                // m.material = this.materialRough;
                // console.log(o);
                let position = [];
                this.player.getTranslationWorld(position);
                this.player.setTranslationWorld([Math.floor(x) + .5, position[1], Math.floor(z) + .5]);
                break;
        }
    },
    canTrigger: function () {
        return (window.game.currentAction == "Moving");
    },
    actingAllowed: function (x, _, y) {
        switch (window.game.currentAction) {
            case "Moving":
                let pixel = window.game.getMapPixel(x, y);
                return pixel[3] === 255;
        }
    },
});