/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('sun', {
}, {

    init: function () {
        this.colorCycle = [
            [242, 156, 3],
            [240, 228, 177],
            [255, 255, 255],
            [255, 255, 255],
            [255, 255, 255],
            [255, 255, 255],
            [255, 129, 169],
            [209, 137, 2],
            [16, 16, 32],
            [16, 16, 32],
            [16, 16, 32],
            [16, 16, 32],
            [242, 156, 3],            
        ];

        this.light = this.object.getComponent('light');
        this.light.color = new Float32Array([1,0,0,1]);

        let color = new Float32Array([
            this.colorCycle[0][0] / 255.0,
            this.colorCycle[0][1] / 255.0,
            this.colorCycle[0][2] / 255.0, 1]);
        
        this.light.color.set(color);        
        this.daySteps=12;
    },
    start: function () {
        
        this.dayCycleTime = 0;
    },
    update: function (dt) {
        this.dayCycleTime += dt / 10;
        let position = (this.dayCycleTime % this.daySteps) % 1;
        let day = ~~(this.dayCycleTime % this.daySteps);

        let color1 = [
            this.colorCycle[day][0] / 255.0,
            this.colorCycle[day][1] / 255.0,
            this.colorCycle[day][2] / 255.0];

        let color2 = [
            this.colorCycle[day + 1][0] / 255.0,
            this.colorCycle[day + 1][1] / 255.0,
            this.colorCycle[day + 1][2] / 255.0];

        this.light.color.set([
            mathUtils.lerp(color1[0], color2[0], position),
            mathUtils.lerp(color1[1], color2[1], position),
            mathUtils.lerp(color1[2], color2[2], position),
            1]);

        if (this.dayCycleTime >= this.daySteps) {
            this.dayCycleTime -= this.daySteps;
        }
    },
    
});

