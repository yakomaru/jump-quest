import { ENEMY_SPEED, PATROL_DIST } from '../constants.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_patrol');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
    this.direction = 1;
    this.patrolMoved = 0;
  }

  update(delta) {
    if (!this.active) return;

    const dist = (ENEMY_SPEED * delta) / 1000;
    this.patrolMoved += dist;

    if (this.patrolMoved >= PATROL_DIST || this.body.blocked.left || this.body.blocked.right) {
      this.direction *= -1;
      this.patrolMoved = 0;
    }

    this.body.setVelocityX(ENEMY_SPEED * this.direction);
    this.flipX = this.direction < 0;
  }
}
