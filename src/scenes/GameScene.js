import { TILE_SIZE, GRAVITY } from '../constants.js';
import { buildLevel } from '../level/LevelBuilder.js';
import { LEVEL_DATA, ENEMY_SPAWNS, FLYING_SPAWNS, GOAL_TILE } from '../level/LevelData.js';
import Player      from '../entities/Player.js';
import Enemy       from '../entities/Enemy.js';
import FlyingEnemy from '../entities/FlyingEnemy.js';

const WORLD_W = 30 * TILE_SIZE;  // 480
const WORLD_H = 60 * TILE_SIZE;  // 960

export default class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  create() {
    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);
    this.physics.world.gravity.y = GRAVITY;

    // Build level geometry
    const { platforms, oneWayPlats, spikes } = buildLevel(this, LEVEL_DATA);
    this.platforms   = platforms;
    this.oneWayPlats = oneWayPlats;
    this.spikes      = spikes;

    // Goal
    const [gCol, gRow] = GOAL_TILE;
    this.goal = this.physics.add.staticSprite(
      gCol * TILE_SIZE + TILE_SIZE / 2,
      gRow * TILE_SIZE + TILE_SIZE / 2,
      'goal'
    );

    // Player spawns near bottom center
    this.player = new Player(this, WORLD_W / 2, WORLD_H - 3 * TILE_SIZE);

    // Walking enemies (ledge-aware)
    this.enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: false });
    ENEMY_SPAWNS.forEach(([col, row]) => {
      const e = new Enemy(
        this,
        col * TILE_SIZE + TILE_SIZE / 2,
        row * TILE_SIZE - TILE_SIZE / 2,
        platforms,
        oneWayPlats
      );
      this.enemies.add(e);
    });

    // Flying enemies — plain array so physics.add.group can't reset allowGravity
    this.flyingEnemies = [];
    FLYING_SPAWNS.forEach(([x, y, range]) => {
      this.flyingEnemies.push(new FlyingEnemy(this, x, y, range));
    });

    // Colliders
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.enemies, platforms);
    this.physics.add.collider(this.enemies, oneWayPlats);

    // One-way platforms: only collide when player is moving downward
    this.physics.add.collider(this.player, oneWayPlats, null, (_player, _plat) => {
      return _player.body.velocity.y >= 0;
    });

    // Enemy contact → knockback
    this.physics.add.overlap(this.player, this.enemies, (_player, enemy) => {
      _player.applyKnockback(enemy.x);
    });

    // Flying enemy contact → knockback (overlap accepts plain arrays)
    this.physics.add.overlap(this.player, this.flyingEnemies, (_player, fe) => {
      _player.applyKnockback(fe.x);
    });

    // Spike contact → knockback
    this.physics.add.overlap(this.player, spikes, (_player, spike) => {
      _player.applyKnockback(spike.x);
    });

    // Goal contact → win
    this.physics.add.overlap(this.player, this.goal, () => {
      if (!this._won) {
        this._won = true;
        this.events.emit('player-won');
      }
    });

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Camera
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Launch HUD (stays running across restarts)
    if (!this.scene.isActive('UIScene')) {
      this.scene.launch('UIScene');
    }

    this._won = false;
  }

  update(time, delta) {
    this.player.update(this.cursors, time, delta);

    this.enemies.getChildren().forEach(e => e.update());
    this.flyingEnemies.forEach(fe => fe.update());

    // Emit height progress (0=bottom, 1=top)
    const pct = 1 - (this.player.y / WORLD_H);
    this.events.emit('progress', Phaser.Math.Clamp(pct, 0, 1));
  }
}
