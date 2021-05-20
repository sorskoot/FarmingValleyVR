WL.registerComponent('growable', {
    growthTime: { type: WL.Type.Float, default: 5.0 },
    growthChance: { type: WL.Type.Float, default: 0.8 }, // == 80%
    numberOfStages: {type: WL.Type.Int, default: 4}
}, {
    init: function () {

    },
    addOnGrow: function (callback) {
        this.callback = callback;
    },
    start: function () {
        this.growthTimer = this.growthTime;
        this.stage = 0;
    },
    update: function (dt) {
        if (this.callback || this.stage < this.numberOfStages-1) {            
            this.growthTimer -= dt;
            if (this.growthTimer < 0) {
                this.growthTimer = this.growthTime;
                if (Math.random() <= this.growthChance) {
                    this.stage++;
                    this.callback(this.object, this.stage)
                }
            }
        }
    },
    isFullyGrown:function(){
        return this.stage == this.numberOfStages-1;
    }
});