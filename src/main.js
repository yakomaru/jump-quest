import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';
import UIScene   from './scenes/UIScene.js';

import { GRAVITY } from './constants.js';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 480,
  height: 270,
  zoom: 2,
  backgroundColor: '#1a1a2e',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GRAVITY },
      debug: false
    }
  },
  scene: [BootScene, GameScene, UIScene]
});
