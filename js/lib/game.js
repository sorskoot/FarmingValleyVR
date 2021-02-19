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
        //this.loadData();
    }

    async loadData() {
        var data = await fetch("/test.json");
        var result = await data.json();
        console.log(result.test);
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
        this.lastNotification = setTimeout(()=>{ this.notificationText.text = "" }, 5000);
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
}

var game = new Game();


