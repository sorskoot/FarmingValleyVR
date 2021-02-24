/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('sky', {
}, {

    init: function () {
        this.colorCycle = [
            [217, 249, 182],
            [144, 236, 239],
            [112, 215, 242],
            [112, 215, 242],
            [112, 215, 242],
            [112, 215, 242],
            [255, 129, 169],
            [55, 108, 155],
            [5, 9, 13],
            [5, 9, 13],
            [5, 9, 13],
            [5, 9, 13],
            [217, 249, 182],            
        ];
        this.material = this.object.getComponent('mesh').material;

        let color = [
            this.colorCycle[0][0] / 255.0,
            this.colorCycle[0][1] / 255.0,
            this.colorCycle[0][2] / 255.0, 1];

        this.material.color = color;
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

        this.material.color = [
            mathUtils.lerp(color1[0], color2[0], position),
            mathUtils.lerp(color1[1], color2[1], position),
            mathUtils.lerp(color1[2], color2[2], position),
            1]

        if (this.dayCycleTime >= this.daySteps) {
            this.dayCycleTime -= this.daySteps;
        }
    },
    
});

