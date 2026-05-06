export default class UIScene extends Phaser.Scene {
  constructor() { super({ key: 'UIScene', active: false }); }

  create() {
    // height progress bar
    this.add.rectangle(472, 135, 6, 260, 0x333333).setOrigin(0.5);
    this.barFill = this.add.rectangle(472, 135 + 130, 4, 0, 0x4fc3f7).setOrigin(0.5, 1);

    this.winText = this.add.text(240, 135, 'YOU WIN!\nPress R to restart', {
      fontSize: '20px', fill: '#ffd700', align: 'center', fontFamily: 'monospace'
    }).setOrigin(0.5).setVisible(false);

    const game = this.scene.get('GameScene');
    game.events.on('player-won', () => {
      this.winText.setVisible(true);
      this._listenRestart();
    }, this);
    game.events.on('progress', (pct) => {
      this.barFill.height = 260 * pct;
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
