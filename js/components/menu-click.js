import { Component } from "@wonderlandengine/api";

/**
 * @type {Component}
 */
const MenuClickComponent = {

    // /**
    //  * @type {Object}
    //  */
    // subMenu,
    // /**
    //  * @type {Material}
    //  */
    // hoverMaterial,

    // /**
    //  * @type {Material}
    //  */
    // selectMaterial,


    init() {

    },

    start() {
        this.isSelected = false;
        let target = this.object.getComponent("cursor-target");
        target.addClickFunction(this.onClick.bind(this));
        target.addHoverFunction(this.onHover.bind(this));
        target.addUnHoverFunction(this.onUnHover.bind(this));
        this.originalMaterial = this.object.getComponent('mesh').material.clone();
        this.object.getComponent('mesh').material = this.originalMaterial;
        window.game.addMenuChangeFunction(this.menuChange.bind(this));
        this.selectMaterial = this.selectMaterial.clone();
        
        this.originalColor = new Float32Array(4);
        this.originalColor.set(this.object.getComponent('mesh').material.color);
        this.selectedColor = new Float32Array(4);
        this.selectedColor.set(this.selectMaterial.color);
        this.showSubmenu(false);
    },

    update(dt) {

    },
    onHover() {
        let color = new Float32Array(4);
        glMatrix.vec3.scale(color, this.isSelected ? this.selectedColor : this.originalColor, .7);
        color[3] = 1;
        this.object.getComponent('mesh').material.color = color;

    },
    onUnHover() {
        this.object.getComponent('mesh').material.color = this.isSelected ? this.selectedColor : this.originalColor;
    },
    onClick() {
        // this.showSubmenu(true);
        window.game.menuItem(this.menuItem,this.parameter, this._id);
    },

    showSubmenu(show) {
        if (this.subMenu) {
            if (!show) {
                this.subMenu.setTranslationLocal([5000, 5000, 5000]);
            } else {
                this.subMenu.setTranslationLocal([0, 0, 0]);
            }
            // const submenuMesh = this.subMenu.getComponent("mesh");
            // if (submenuMesh) {
            //     submenuMesh.active = show;
            // }
        }
    },

    menuChange(id) {
        this.isSelected = this._id === id;
        this.showSubmenu(this.isSelected);
        this.isSelected ? this.onHover() : this.onUnHover();
    }
};

window.WL.registerComponent('menu-click', {
    hoverMaterial: { type: WL.Type.Material },
    selectMaterial: { type: WL.Type.Material },    
    menuItem: {
        type: WL.Type.String,
        default: "Move"
    },
    parameter:{
        type: WL.Type.String
    },
    subMenu: { type: WL.Type.Object, default: null }
}, MenuClickComponent);