import {mathUtils} from '../utils/math-utils';

WL.registerComponent('sky', {
}, {

    init: function () {
        this.colorCycle = [
            [217 / 255, 249 / 255, 182 / 255],
            [144 / 255, 236 / 255, 239 / 255],
            [112 / 255, 215 / 255, 242 / 255],
            [112 / 255, 215 / 255, 242 / 255],
            [112 / 255, 215 / 255, 242 / 255],
            [112 / 255, 215 / 255, 242 / 255],
            [255 / 255, 129 / 255, 169 / 255],
            [55 / 255, 108 / 255, 155 / 255],
            [5 / 255, 9 / 255, 13 / 255],
            [5 / 255, 9 / 255, 13 / 255],
            [5 / 255, 9 / 255, 13 / 255],
            [5 / 255, 9 / 255, 13 / 255],
            [217 / 255, 249 / 255, 182 / 255],
        ];
     

        let color = [
            this.colorCycle[0][0],
            this.colorCycle[0][1],
            this.colorCycle[0][2], 1];
        
        WL.scene.clearColor = color;
     
        this.daySteps = 12;
    },
    start: function () {
        this.dayCycleTime = 0;
        this.helper=0;
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
            
            WL.scene.clearColor = [
                mathUtils.lerp(color1[0], color2[0], position),
                mathUtils.lerp(color1[1], color2[1], position),
                mathUtils.lerp(color1[2], color2[2], position),
                1]

            if (this.dayCycleTime >= this.daySteps) {
                this.dayCycleTime -= this.daySteps;
            }
        }
    },

});

