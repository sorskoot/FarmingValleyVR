const MENU_ITEMS = {
    TILLING: 1,
    WATERING: 2,
    SEEDING: 3,
    BUYING: 4
}

class Game {

    constructor() {
        this.currentAction = "Nothing";
        this.menuChangeHandlers = [];
        this.registeredPlants = [];
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
        // this.entityCanvas = document.createElement('canvas');
        // this.entityCanvas.width = 100;
        // this.entityCanvas.height = 100;
        // this.entityCtx = this.entityCanvas.getContext("2d");        
        // this.entityCtx

        for (let i = 0; i < gameConfig.treeAmount; i++) {
            let tree = this.prefabStorage.instantiate('Tree');
            this.placeRandom(tree);
        }
        for (let i = 0; i < gameConfig.stickAmount; i++) {
            let twig = this.prefabStorage.instantiate('Twig');
            this.placeRandom(twig);
        }
        for (let i = 0; i < gameConfig.stoneAmount; i++) {
            let rock = this.prefabStorage.instantiate('Rock');
            this.placeRandom(rock);
        }
        for (let i = 0; i < gameConfig.grassAmount; i++) {
            let grass = this.prefabStorage.instantiate('Grass');
            this.placeRandom(grass);
        }
    }

    placeRandom(entity) {
        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        const color = this.getMapPixel(x, y);
        if (color[3] === 255) {
            entity.rotateAxisAngleDeg([0, 1, 0], Math.random() * 360);
            entity.setTranslationWorld([~~x + .5,
            { 82: 6, 137: 4, 171: 2, 206: 0 }[color[1]], ~~y + .5]);

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
    menuItem(item) {
        switch (item) {
            case MENU_ITEMS.TILLING:
                this.currentAction = "Tilling"
                break;
            case MENU_ITEMS.WATERING:
                this.currentAction = "Watering"
                break;
            case MENU_ITEMS.SEEDING:
                this.currentAction = "Seeding"
                break;
            case MENU_ITEMS.BUYING:
                this.currentAction = "Buying"
                break;
        }
        for (let index = 0; index < this.menuChangeHandlers.length; index++) {
            this.menuChangeHandlers[index](item);
        }
        this.menuChangeHandlers
        console.log(this.currentAction);
    }

    plant(position) {
        if (this.registeredPlants[0]) {
            this.registeredPlants[0].plant(position);
            // this.plantmap[position.x][position.y] = 
        }

    }

    registerPlant(plant) {
        if (!~this.registeredPlants.findIndex(v => v.name === plant.name)) {
            this.inventory[plant.name] = 0;
            this.registeredPlants.push(plant);
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
    }

    getMapPixel(x, y) {
        return imageHelpers.getPixelXY(this.mapCtx.getImageData(0, 0, 100, 100), ~~x + 50, ~~y + 50);
    }
}

var game = new Game();



