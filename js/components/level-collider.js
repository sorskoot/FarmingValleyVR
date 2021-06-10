WL.registerComponent('level-collider', {
    level1: { type: WL.Type.Object },
    level2: { type: WL.Type.Object },
    level3: { type: WL.Type.Object },
    level4: { type: WL.Type.Object }
}, {
    start: function () {
        this.levels = [
            this.level1.getComponent('collision'),
            this.level2.getComponent('collision'),
            this.level3.getComponent('collision'),
            this.level4.getComponent('collision')];
        
        let target = this.level1.getComponent('cursor-target');
        target.addClickFunction(this.onClick.bind(this));
        this.currentLevel = 0;
        this.updateCollision();
    },
    onClick: function(obj, cursor) {
      //  console.log(cursor.cursorPos);
    },

    updateCollision: function () {
        for (let i = 0; i < this.levels.length; i++) {
            this.levels[i].active = i===this.currentLevel;
        }
    },
    levelUp: function () {
        if (this.currentLevel === 3) return;
        this.currentLevel++;
        this.updateCollision();
    },
    levelDown: function () {
        if (this.currentLevel === 0) return;
        this.currentLevel--;
        this.updateCollision();
    }
});