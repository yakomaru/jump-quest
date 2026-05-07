export default class UIScene extends Phaser.Scene {
  constructor() { super({ key: 'UIScene', active: false }); }

  create() {
    this.winText = this.add.text(240, 135, 'YOU WIN!\nPress R to restart', {
      fontSize: '20px', fill: '#ffd700', align: 'center', fontFamily: 'monospace'
    }).setOrigin(0.5).setVisible(false);

    const game = this.scene.get('GameScene');
    game.events.on('player-won', () => {
      this.winText.setVisible(true);
      this._listenRestart();
    }, this);
  }

  _listenRestart() {
    this.input.keyboard.once('keydown-R', () => {
      this.winText.setVisible(false);
      this.scene.stop('GameScene');
      this.scene.launch('GameScene');
    });
  }
}
