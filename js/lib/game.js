const MENU_ITEMS = {
    TILLING: 1,
    WATERING: 2,
    SEEDING: 3
}

class Game {

     constructor() {
        this.currentAction = "Nothing";
        this.menuChangeHandlers = [];
        
        //this.loadData();
    }
    
    async loadData(){
        var data = await fetch("/test.json");
        var result = await data.json();
        console.log(result.test);       
    }

    addMenuChangeFunction(callback){
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
        }
        for (let index = 0; index < this.menuChangeHandlers.length; index++) {
            this.menuChangeHandlers[index](item);            
        }
        this.menuChangeHandlers
        console.log(this.currentAction);
    }
}

var game = new Game();


