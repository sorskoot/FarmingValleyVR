/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('action-controller', {
    player: { type: WL.Type.Object },
    meshRough: { type: WL.Type.Mesh },
    materialRough: { type: WL.Type.Material },
    levelColliderObject: { type: WL.Type.Object },
}, {
    start: function () {
        this.levelCollider = this.levelColliderObject.getComponent('level-collider');
        this.picker = this.object.getComponent('target-picker');
        this.picker.initialize(this.object.getComponent('input'));
        this.picker.canTrigger = this.canTrigger.bind(this);
        this.picker.pickingAllowed = this.actingAllowed.bind(this);
        this.picker.picked = this.act.bind(this);
        this.currentHeight = 206;
    },
    update: function (dt) {

    },

    act: function (obj, x, y, z) {
        switch (window.game.currentAction) {
            case ACTIONS.MOVING:
                let position = [];
                let pathUp = obj.getComponent('path-up');
                if (pathUp) {
                    let objPos = []
                    obj.getTranslationWorld(objPos);
                    let pixel = window.game.getMapPixel(objPos[0], objPos[2]);
                    let targetPosition;
                    if (pixel[MAPINDEX.HEIGHT] === this.currentHeight) {
                        targetPosition = pathUp.getUpLocation();      
                        this.levelCollider.levelUp();   
                        console.log('level up');
                    } else {
                        targetPosition = pathUp.getDownLocation();
                        this.levelCollider.levelDown();
                        console.log('level up');
                    }
                    console.log(position);
                    this.player.getTranslationWorld(position);
                    this.player.setTranslationWorld([Math.floor(targetPosition[0]) + .5, targetPosition[1]+1.7, Math.floor(targetPosition[2]) + .5]);                    
                    let targetPixel = window.game.getMapPixel(targetPosition[0], targetPosition[2]);
                    this.currentHeight = targetPixel[MAPINDEX.HEIGHT];
                } else {
                    this.player.getTranslationWorld(position);
                    this.player.setTranslationWorld([Math.floor(x) + .5, position[1], Math.floor(z) + .5]);
                }
                break;
            case ACTIONS.TILLING:                
                let landTile = window.game.prefabStorage.instantiate('Tilled_Ground');
                landTile.setTranslationWorld([Math.floor(x) + .5, y, Math.floor(z) + .5]);
                console.log(`${x}-${z}`);
                window.game.setMapPixelEntityType(x, z, ENTITYTYPE.TILLED);
                break;
            case ACTIONS.SEEDING:                
                window.game.setMapPixelEntityType(x, z, ENTITYTYPE.PLANT);
                this.plant = window.game.plant([Math.floor(x) + .5, y, Math.floor(z) + .5])
                break;
            case ACTIONS.HARVESTING:  
                const succeeded = window.game.harvest([Math.floor(x), y, Math.floor(z)]);
                if(succeeded){
                    window.game.setMapPixelEntityType(x, z, ENTITYTYPE.TILLED);
                }
                break; 
        }
    },
    canTrigger: function () {
        return (window.game.currentAction == ACTIONS.MOVING) ||
               (window.game.currentAction == ACTIONS.TILLING) ||
               (window.game.currentAction == ACTIONS.HARVESTING) ||
               (window.game.currentAction == ACTIONS.SEEDING);
    },
    /**
     * 
     * @param {WL.Object} obj 
     * @param {number} x 
     * @param {number} _ 
     * @param {number} y 
     */
    actingAllowed: function (obj, x, _, y) {
        let pixel = window.game.getMapPixel(Math.floor(x), Math.floor(y));
        switch (window.game.currentAction) {
            case ACTIONS.MOVING:
                let pathUp = obj.getComponent('path-up');
                if (pathUp) {
                    return true;
                }                
                return pixel[MAPINDEX.WATER] === 255
                && pixel[MAPINDEX.HEIGHT] === this.currentHeight;
                
            case ACTIONS.TILLING:                
                return pixel[MAPINDEX.WATER] === 255
                    && pixel[MAPINDEX.HEIGHT] === this.currentHeight
                    && pixel[MAPINDEX.ENTITYTYPE] === ENTITYTYPE.NONE; 
            
            case ACTIONS.SEEDING:                           
                return pixel[MAPINDEX.WATER] === 255
                    && pixel[MAPINDEX.HEIGHT] === this.currentHeight
                    && pixel[MAPINDEX.ENTITYTYPE] === ENTITYTYPE.TILLED; 
            
            case ACTIONS.HARVESTING:
                return window.game.isHarvestable([x, _, y]);
                // return pixel[MAPINDEX.WATER] === 255
                //     && pixel[MAPINDEX.HEIGHT] === this.currentHeight
                //     && pixel[MAPINDEX.ENTITYTYPE] === ENTITYTYPE.PLANT; 
        }
    }
});