WL.registerComponent('hide-runtime', {}, {
    start: function() {
        this.object.getComponent('mesh').active = false;
    },
    
});