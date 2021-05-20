WL.registerComponent("reparent-in-vr", {
    InVR:{ type: WL.Type.Object },
    NotInVR:{ type: WL.Type.Object }
}, {
    start: function() {
        /* Initial activation/deactivation */
        this.onXRSessionEnd();

        WL.onXRSessionStart.push(this.onXRSessionStart.bind(this));
        WL.onXRSessionEnd.push(this.onXRSessionEnd.bind(this));
    },

    onXRSessionStart: function() {
       this.object.parent = this.InVR;
    },

    onXRSessionEnd: function() {
        this.object.parent = this.NotInVR;
    },
}
);
