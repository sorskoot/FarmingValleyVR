export class PlantType{
    /**
     * Instantiates a new Plant Type
     * @param {string} name The name of the plant
     * @param {number} harvestAmount The number of drops when the plant is harvested
     */
    constructor(name, harvestAmount){
        this.name = name;
        this.harvestAmount = harvestAmount;
    }
}