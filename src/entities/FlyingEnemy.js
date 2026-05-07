export default class FlyingEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, patrolRange = 80) {
    super(scene, x, y, 'enemy_flying');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.allowGravity = false;
    this.startX      = x;
    this.direction   = 1;
    this.patrolRange = patrolRange;
  }

  update() {
    if (!this.active) return;

    this.body.setVelocityX(85 * this.direction);
    if (this.x > this.startX + this.patrolRange) this.direction = -1;
    if (this.x < this.startX - this.patrolRange) this.direction =  1;
    this.flipX = this.direction < 0;
  }
}
