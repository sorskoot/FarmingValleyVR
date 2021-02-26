/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('path-up', {
   upTarget:{ type: WL.Type.Object, default: null },
   downTarget:{ type: WL.Type.Object, default: null }
}, {
    getUpLocation:function(){
        let vec = new Float32Array(3);
        return this.upTarget.getTranslationWorld(vec);
    },
    getDownLocation:function(){
        let vec = new Float32Array(3);
        return this.downTarget.getTranslationWorld(vec);
    }
});