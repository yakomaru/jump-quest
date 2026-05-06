import { createAllTextures } from '../utils/SpriteFactory.js';

export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    createAllTextures(this);
    this.scene.start('GameScene');
  }
}
