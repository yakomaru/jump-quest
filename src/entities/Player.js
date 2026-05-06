import {
  GRAVITY, WALK_SPEED, AIR_CONTROL, JUMP_VELOCITY,
  JUMP_HOLD_GRAV, JUMP_HOLD_MAX, DRAG_GROUND, DRAG_AIR,
  COYOTE_TIME, JUMP_BUFFER, KNOCKBACK_X, KNOCKBACK_Y, HURT_DURATION
} from '../constants.js';

const STATE = { IDLE: 0, RUNNING: 1, JUMPING: 2, FALLING: 3, HURT: 4 };

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
    this.body.setSize(12, 15);
    this.body.setOffset(2, 1);

    this.state       = STATE.IDLE;
    this.hurtTimer   = 0;
    this.isJumping   = false;
    this.jumpStartTime = 0;
    this.lastGroundedTime = 0;
    this.jumpPressTime = -9999;
    this.canJump     = false;
    this.lives       = 3;
  }

  update(cursors, time, delta) {
    const onGround = this.body.blocked.down;
    const now = time;

    // track grounded state for coyote time
    if (onGround) {
      this.canJump = true;
      this.lastGroundedTime = now;

      // jump buffer: fire jump if pressed just before landing
      if (this.state !== STATE.HURT && now - this.jumpPressTime < JUMP_BUFFER) {
        this._doJump(now);
      }
    } else {
      // small grace window after walking off edge
      if (now - this.lastGroundedTime > COYOTE_TIME) {
        this.canJump = false;
      }
    }

    // stop variable jump if key released or max hold elapsed
    if (this.isJumping) {
      const held = cursors.up.isDown || cursors.space?.isDown;
      if (!held || now - this.jumpStartTime > JUMP_HOLD_MAX) {
        this.isJumping = false;
        this.body.setGravityY(0);
      }
    }

    if (this.state === STATE.HURT) {
      this.hurtTimer -= delta;
      if (this.hurtTimer <= 0) {
        this.hurtTimer = 0;
        this.clearTint();
        this.state = STATE.IDLE;
      }
      return; // input locked during knockback
    }

    // jump input
    const jumpJustPressed = Phaser.Input.Keyboard.JustDown(cursors.up) ||
                            (cursors.space && Phaser.Input.Keyboard.JustDown(cursors.space));
    if (jumpJustPressed) {
      this.jumpPressTime = now;
      if (this.canJump) {
        this._doJump(now);
      }
    }

    // horizontal movement
    const speed = onGround ? WALK_SPEED : WALK_SPEED * AIR_CONTROL;
    if (cursors.left.isDown) {
      this.body.setVelocityX(-speed);
      this.flipX = true;
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(speed);
      this.flipX = false;
    } else {
      // apply drag
      const drag = onGround ? DRAG_GROUND : DRAG_AIR;
      this.body.setDragX(drag);
    }

    // variable jump gravity reduction while holding
    if (this.isJumping) {
      this.body.setGravityY(-GRAVITY + JUMP_HOLD_GRAV);
    }

    // update state for visuals
    if (!onGround) {
      this.state = this.body.velocity.y < 0 ? STATE.JUMPING : STATE.FALLING;
    } else if (Math.abs(this.body.velocity.x) > 5) {
      this.state = STATE.RUNNING;
    } else {
      this.state = STATE.IDLE;
    }
  }

  _doJump(now) {
    this.body.setVelocityY(JUMP_VELOCITY);
    this.isJumping    = true;
    this.jumpStartTime = now;
    this.canJump      = false;
    this.jumpPressTime = -9999;
    this.body.setGravityY(-GRAVITY + JUMP_HOLD_GRAV);
  }

  applyKnockback(enemyX) {
    if (this.hurtTimer > 0) return;

    const dir = this.x <= enemyX ? -1 : 1;
    this.body.setVelocity(dir * KNOCKBACK_X, KNOCKBACK_Y);
    this.isJumping = false;
    this.body.setGravityY(0);

    this.hurtTimer = HURT_DURATION;
    this.state = STATE.HURT;
    this.setTint(0xff4444);

    this.lives -= 1;
    this.scene.events.emit('player-hurt', this.lives);

    if (this.lives <= 0) {
      this.scene.time.addEvent({
        delay: 300,
        callback: () => this.scene.events.emit('player-died')
      });
    }
  }
}
