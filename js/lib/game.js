import {gameConfig, ACTIONS,ENTITYTYPE,MAPINDEX} from './gameConfig';
import {imageHelpers} from '../utils/imageHelpers'

const MENU_ITEMS = {
    TILLING: "Till",
    WATERING: "Water",
    SEEDING: "Seed",
    MOVING: "Move",
    HARVESTING: "Harvesting"
}





const PLANTS = {
    CORN:"Corn",
    TOMATO:"Tomato",
}

const HEIGHTINDEX = { 82: 6, 137: 4, 171: 2, 206: 0 };

export class Game {
    constructor() {
        this.currentAction = "Nothing";
        this.currentActionParameter = null;
        this.menuChangeHandlers = [];
        this.registeredPlants = {};
        this.inventory = {};
        this.plantmap = [[]];
        this.loadMap();

        Promise.all([
            new Promise(res => setInterval(() => { if (this.mapLoaded) res() }, 100)),
            new Promise(res => setInterval(() => { if (this.prefabLoaded) res() }, 100))
        ]).then(() => {
            this.generateEntities();
        })
    }

    generateEntities() {
        let treeObjs = WL.scene.addObjects(gameConfig.treeAmount, null, 3)
        for (let i = 0; i < gameConfig.treeAmount; i++) {
            let tree = this.prefabStorage.instantiate('Tree', treeObjs[i]);
            this.placeRandom(tree, ENTITYTYPE.TREE);
        }
        let twigObjs = WL.scene.addObjects(gameConfig.treeAmount, null, 3)
        for (let i = 0; i < gameConfig.stickAmount; i++) {
            let twig = this.prefabStorage.instantiate('Twig',twigObjs[i]);
            this.placeRandom(twig, ENTITYTYPE.TWIG);
        }
        let rocksObjs = WL.scene.addObjects(gameConfig.treeAmount, null, 3)
        for (let i = 0; i < gameConfig.stoneAmount; i++) {
            let rock = this.prefabStorage.instantiate('Rock',rocksObjs[i]);
            this.placeRandom(rock, ENTITYTYPE.ROCK);
        }
        let grassObjs = WL.scene.addObjects(gameConfig.treeAmount, null, 3)
        for (let i = 0; i < gameConfig.grassAmount; i++) {
            let grass = this.prefabStorage.instantiate('Grass',grassObjs[i]);
            this.placeRandom(grass, ENTITYTYPE.GRASS);
        }
    }

    placeRandom(entity, entityType) {
        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        const color = this.getMapPixel(x, y);
        if (color[MAPINDEX.WATER] === 255 && color[MAPINDEX.ENTITYTYPE] === 0) {

            this.setMapPixelEntityType(x, y, entityType);

            entity.rotateAxisAngleDeg([0, 1, 0], Math.random() * 360);
            entity.setTranslationWorld([Math.floor(x) + .5,
            HEIGHTINDEX[color[MAPINDEX.HEIGHT]], Math.floor(y) + .5]);
        }
    }

    registerPrefabStorage(prefabStorage) {
        this.prefabStorage = prefabStorage;

        // needs to change to a special place that triggers when everything is done loading
        this.prefabLoaded = true;
    }

    addMenuChangeFunction(callback) {
        this.menuChangeHandlers.push(callback);
    }
    menuItem(command, parameter, id) {
        switch (command) {
            case MENU_ITEMS.TILLING:
                this.currentAction = ACTIONS.TILLING;
                break;
            case MENU_ITEMS.WATERING:
                this.currentAction = ACTIONS.WATERING;
                break;
            case MENU_ITEMS.SEEDING:                
                this.currentAction = ACTIONS.SEEDING
                this.currentActionParameter = parameter;
                break;
            case MENU_ITEMS.MOVING:
                this.currentAction = ACTIONS.MOVING
                break;
            case MENU_ITEMS.HARVESTING:
                this.currentAction = ACTIONS.HARVESTING
                break;                
        }
        for (let index = 0; index < this.menuChangeHandlers.length; index++) {
            this.menuChangeHandlers[index](id);
        }
    }

    plant(position) {        
        console.log(`planting: ${this.currentActionParameter}`);
        if (this.registeredPlants[this.currentActionParameter]) {            
            this.plantmap[`${Math.floor(position[0])} X ${Math.floor(position[2])}`]=
                this.registeredPlants[this.currentActionParameter].plant(position);
            console.log(this.plantmap[`${Math.floor(position[0])} X ${Math.floor(position[2])}`]);                        
        }
    }

    hasPlant(position){
        return !!this.plantmap[`${Math.floor(position[0])} X ${Math.floor(position[2])}`];
    }

    isHarvestable(position){           
        if(this.plantmap[`${Math.floor(position[0])} X ${Math.floor(position[2])}`]){            
            const plant = this.plantmap[`${Math.floor(position[0])} X ${Math.floor(position[2])}`];
            const growable = plant.getComponent('growable');
            console.log(growable);
            return growable.isFullyGrown();
        }
        return false;
    }
    
    harvest(position){        
        if(this.plantmap[`${Math.floor(position[0])} X ${Math.floor(position[2])}`]){
            
            const plant = this.plantmap[`${Math.floor(position[0])} X ${Math.floor(position[2])}`];
            this.harvested(plant.plantType);
            plant.destroy();
            this.plantmap[`${Math.floor(position[0])} X ${Math.floor(position[2])}`] = null;
            return true;
        }
    }

    registerPlant(plant) {
        console.log(plant.name);       
        if (!this.registeredPlants[plant.name]) {
            this.inventory[plant.name] = 0;
            this.registeredPlants[plant.name] = plant;
        }
    }

    /**
     * 
     * @param {PlantType} plantType 
     */
    harvested(plantType) {
        this.inventory[plantType.name] += plantType.harvestAmount;
        this.notify(`You harvested a total of ${this.inventory[plantType.name]} ${plantType.name}s.`);
    }

    notify(text) {
        this.notificationText.text = text;
        clearTimeout(this.lastNotification);
        this.lastNotification = setTimeout(() => { this.notificationText.text = "" }, 5000);
    }

    /**
     * 
     * @param {WL.Object} obj 
     */
    registerComponent(obj) {
        switch (obj.name) {
            case "Notifications":
                this.notificationText = obj.getComponent('text');
                break;
        }
    }

    loadMap() {
        let myimage = new Image();
        let canvas = document.createElement('canvas');
        this.mapCtx = canvas.getContext("2d");
        myimage.onload = function () {
            this.mapCtx.drawImage(myimage, 0, 0);
            this.mapLoaded = true;
        }.bind(this);
        myimage.src = './map.png';
       // document.body.appendChild(canvas);
    }

    getMapPixel(x, y) {
        return imageHelpers.getPixelXY(this.mapCtx.getImageData(0, 0, 100, 100), Math.floor(x) + 50, Math.floor(y) + 50);

    }

    setMapPixelEntityType(x, y, entityType) {
        let imgData = this.mapCtx.getImageData(0, 0, 100, 100);
        imgData.data[((Math.floor(y) + 50) * imgData.width + (Math.floor(x) + 50)) * 4 + MAPINDEX.ENTITYTYPE] = entityType;
        this.mapCtx.putImageData(imgData, 0, 0);
    }

}




