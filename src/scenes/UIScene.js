import { MAX_LIVES } from '../constants.js';

export default class UIScene extends Phaser.Scene {
  constructor() { super({ key: 'UIScene', active: false }); }

  create() {
    this.hearts = [];
    this._buildHearts(MAX_LIVES);

    // height progress bar background
    this.barBg = this.add.rectangle(472, 135, 6, 260, 0x333333).setOrigin(0.5);
    this.barFill = this.add.rectangle(472, 135 + 130, 4, 0, 0x4fc3f7).setOrigin(0.5, 1);

    this.winText  = this.add.text(240, 135, 'YOU WIN!\nPress R to restart', {
      fontSize: '20px', fill: '#ffd700', align: 'center', fontFamily: 'monospace'
    }).setOrigin(0.5).setVisible(false);

    this.diedText = this.add.text(240, 135, 'GAME OVER\nPress R to restart', {
      fontSize: '20px', fill: '#ff4444', align: 'center', fontFamily: 'monospace'
    }).setOrigin(0.5).setVisible(false);

    const game = this.scene.get('GameScene');
    game.events.on('player-hurt', (lives) => this._updateHearts(lives), this);
    game.events.on('player-died', () => {
      this.diedText.setVisible(true);
      this._listenRestart();
    }, this);
    game.events.on('player-won', () => {
      this.winText.setVisible(true);
      this._listenRestart();
    }, this);
    game.events.on('progress', (pct) => {
      const maxH = 260;
      this.barFill.height = maxH * pct;
    }, this);
  }

  _buildHearts(count) {
    for (let i = 0; i < count; i++) {
      const h = this.add.image(10 + i * 16, 10, 'heart').setOrigin(0);
      this.hearts.push(h);
    }
  }

  _updateHearts(lives) {
    this.hearts.forEach((h, i) => {
      h.setTint(i < lives ? 0xffffff : 0x333333);
    });
  }

  _listenRestart() {
    this.input.keyboard.once('keydown-R', () => {
      this.winText.setVisible(false);
      this.diedText.setVisible(false);
      this._updateHearts(MAX_LIVES);
      this.scene.stop('GameScene');
      this.scene.launch('GameScene');
    });
  }
}
