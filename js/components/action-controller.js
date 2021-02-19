/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('action-controller', {

}, {  
    start: function() {
        this.picker = this.object.getComponent('target-picker');
        this.picker.canTrigger = this.canTrigger.bind(this);
        // this.picker.pickingAllowed = this.canTeleport.bind(this);
        // this.picker.picked = this.teleport.bind(this);
    },
    update: function(dt) {
    },
    canTrigger:function(){
        return (window.game.currentAction == "Buying")
    }
});