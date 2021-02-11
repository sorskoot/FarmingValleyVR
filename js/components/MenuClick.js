WL.registerComponent('menu-click', {
    hoverMaterial: { type: WL.Type.Material },
    selectMaterial: { type: WL.Type.Material },
    menuItem: { type: WL.Type.Enum, values: ["Nothing", "Till", "Water", "Seed","Buy"], default: "Till" }
}, {
    init: function () {
    },
    start: function () {
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
    },

    update: function (dt) {

    },
    onHover: function () {
        let color = new Float32Array(4);
        
        glMatrix.vec3.scale(color, this.isSelected ? this.selectedColor : this.originalColor, .7);
        color[3]=1;
        this.object.getComponent('mesh').material.color = color;
   
    },
    onUnHover: function () {
        this.object.getComponent('mesh').material.color = this.isSelected ? this.selectedColor : this.originalColor;
    },
    onClick: function () {
        window.game.menuItem(this.menuItem);
    },

    menuChange: function (e) {
        this.isSelected = this.menuItem === e;
        this.isSelected ? this.onHover() : this.onUnHover();
    }
});