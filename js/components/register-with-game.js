WL.registerComponent('register-with-game', {
}, {
    init: function() {
        window.game.registerComponent(this.object);
    }
});