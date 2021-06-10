import * as glMatrix from 'gl-matrix'
window.glMatrix = glMatrix;

import '@wonderlandengine/components/mouse-look';
import '@wonderlandengine/components/wasd-controls';
import '@wonderlandengine/components/cursor';
import '@wonderlandengine/components/cursor-target';

import './js/components/action-controller';
import './js/components/corn';
import './js/components/level-collider';
import './js/components/menu-click';
import './js/components/patch-of-land';
import './js/components/path-up';
import './js/components/prefab';
import './js/components/prefab-storage';
import './js/components/register-with-game';
import './js/components/reparent-in-vr';
import './js/components/sky';
import './js/components/snap-rotate';
import './js/components/sun';
import './js/components/target-picker';
import './js/components/tomato';
import './js/components/cauliflower';
import './js/components/growable';

import {Game} from './js/lib/game';

if ('onSceneLoaded' in WL) {
    console.log('X)-<< onSceneLoaded')
    window.game = new Game()
}
