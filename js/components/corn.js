WL.registerComponent('corn', {
    stage01Mesh: { type: WL.Type.Mesh },
    stage02Mesh: { type: WL.Type.Mesh },
    stage03Mesh: { type: WL.Type.Mesh },
    stage04Mesh: { type: WL.Type.Mesh },
    material: { type: WL.Type.Material }
}, {
    name: "Corn",

    init: function () {
        window.game.registerPlant(this);
        this.plantProperties = new PlantType("Corn", 6);
        this.plantedAt = [];
    },
    start: function () {

    },

    update: function (dt) {

    },

    plant: function (position) {
        if(!!~this.plantedAt.indexOf(position.toString())){
            console.log("Plant already at: "+position);
            return;
        }
        this.plantedAt.push(position.toString());       
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
        let growable = obj.addComponent('growable', { 
            growthTime: .5,
            growthChance: .4 
        }); 

        growable.addOnGrow(this.onGrow.bind(this));

        let collider = obj.addComponent('collision', {
            collider: WL.Collider.AxisAlignedBox,
            group: 1 << 1,
            extents: [.5, 1, .5]
        });

        let target = obj.addComponent('cursor-target');
        target.addClickFunction(this.onClick.bind(this, obj));

        collider.active = false;

        obj.setTranslationLocal(position);
        obj.scale([.0625, .0625, .0625]);
    },

    onGrow: function (obj, stage) {
        if (stage < 4) {
            let m = obj.getComponent('mesh');
            m.mesh = this.meshes[stage];
        }

        if (stage === 3) {
            let collision = obj.getComponent('collision');
            collision.active = true;
        }
    },

    onClick:function(obj){        
        this.plantedAt.splice(this.plantedAt.indexOf(obj.getTranslationLocal([0,0,0]).toString(),1));
        obj.destroy();                       
        window.game.harvested(this.plantProperties);
    }
    
});