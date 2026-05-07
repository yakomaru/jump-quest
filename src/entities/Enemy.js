import { ENEMY_SPEED } from '../constants.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, solidGroup, oneWayGroup) {
    super(scene, x, y, 'enemy_patrol');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
    this.solidGroup  = solidGroup;
    this.oneWayGroup = oneWayGroup;
    this.direction   = 1;
  }

  update() {
    if (!this.active) return;

    if (this.body.blocked.left || this.body.blocked.right || !this._hasGroundAhead()) {
      this.direction *= -1;
    }

    this.body.setVelocityX(ENEMY_SPEED * this.direction);
    this.flipX = this.direction < 0;
  }

  _hasGroundAhead() {
    const cx = this.x + this.direction * (this.body.halfWidth + 8);
    const cy = this.y + this.body.halfHeight + 4;
    const hit = (g) => g.getChildren().some(p => p.active &&
      cx >= p.body.left && cx <= p.body.right &&
      cy >= p.body.top  && cy <= p.body.bottom + 4);
    return hit(this.solidGroup) || hit(this.oneWayGroup);
  }
}
