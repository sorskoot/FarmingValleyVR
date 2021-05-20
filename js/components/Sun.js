import {mathUtils} from '../utils/math-utils';

WL.registerComponent('sun', {
}, {

    init: function () {

        this.colorCycle = [
            [242 / 255, 156 / 255, 3 / 255],
            [240 / 255, 228 / 255, 177 / 255],
            [255 / 255, 255 / 255, 255 / 255],
            [255 / 255, 255 / 255, 255 / 255],
            [255 / 255, 255 / 255, 255 / 255],
            [255 / 255, 255 / 255, 255 / 255],
            [255 / 255, 129 / 255, 169 / 255],
            [209 / 255, 137 / 255, 2 / 255],
            [16 / 255, 16 / 255, 32 / 255],
            [16 / 255, 16 / 255, 32 / 255],
            [16 / 255, 16 / 255, 32 / 255],
            [16 / 255, 16 / 255, 32 / 255],
            [242 / 255, 156 / 255, 3 / 255],
        ];
        this.light = this.object.getComponent('light');
        this.light.color = new Float32Array([1, 0, 0, 1]);

        let color = new Float32Array([
            this.colorCycle[0][0],
            this.colorCycle[0][1],
            this.colorCycle[0][2], 1]);

        this.light.color.set(color);
        this.daySteps = 12;
    },
    start: function () {
        this.dayCycleTime = 0;
        this.helper = 0;
    },
    update: function (dt) {
        this.helper += dt;
        this.dayCycleTime += dt / 100;
        if (this.helper > 1) {
            this.helper -= 1;      
            let position = (this.dayCycleTime % this.daySteps) % 1;
            let day = ~~(this.dayCycleTime % this.daySteps);

            let color1 = [
                this.colorCycle[day][0],
                this.colorCycle[day][1],
                this.colorCycle[day][2]];

            let color2 = [
                this.colorCycle[day + 1][0],
                this.colorCycle[day + 1][1],
                this.colorCycle[day + 1][2]];

            this.light.color.set([
                mathUtils.lerp(color1[0], color2[0], position),
                mathUtils.lerp(color1[1], color2[1], position),
                mathUtils.lerp(color1[2], color2[2], position),
                1]);

            if (this.dayCycleTime >= this.daySteps) {
                this.dayCycleTime -= this.daySteps;
            }
        }
    },

});

