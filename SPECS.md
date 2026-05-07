# Jump Quest — Design Specs

## Concept
Browser-based 2D platformer. The player climbs a vertical level from bottom to top. Enemies and spikes knock the player back, causing falls and progress loss. No lives or health — losing progress *is* the mechanic.

## Tech Stack
- **Phaser 3** (Arcade Physics) + **Vite** (dev server on port 3000)
- All sprites are generated programmatically via `scene.add.graphics()` → `generateTexture()`
- No external assets

## File Structure
```
src/
├── main.js              — Phaser config: 480×270 canvas at 2x zoom, scenes list
├── constants.js         — All tuning values (physics, timing, speeds)
├── scenes/
│   ├── BootScene.js     — Generates all textures, then starts GameScene
│   ├── GameScene.js     — Main loop: level build, spawns, colliders, camera
│   └── UIScene.js       — HUD overlay: height progress bar, win text
├── entities/
│   ├── Player.js        — Jump state machine, knockback, coyote time
│   ├── Enemy.js         — Walking patrol with ledge detection
│   └── FlyingEnemy.js   — Horizontal air patrol, gravity disabled
├── level/
│   ├── LevelData.js     — Tile arrays, enemy/flying/goal spawn coords
│   └── LevelBuilder.js  — Converts tile array → Phaser StaticGroups
└── utils/
    └── SpriteFactory.js — All generateTexture calls
```

## World
- **Tile size:** 16×16 px
- **World size:** 30 tiles wide × 60 tiles tall = 480×960 px
- **Canvas:** 480×270 rendered at 2x (960×540 on screen)
- **Tile IDs:** `0`=empty, `1`=solid ground, `2`=one-way platform, `3`=spike

## Physics Constants
| Constant | Value | Notes |
|---|---|---|
| `GRAVITY` | 500 px/s² | Applied by Arcade Physics world |
| `JUMP_VELOCITY` | -230 px/s | Initial upward velocity on jump |
| `JUMP_HOLD_GRAV` | 150 px/s² | Gravity reduction while holding jump |
| `JUMP_HOLD_MAX` | 250 ms | Max duration of held-jump bonus |
| `WALK_SPEED` | 120 px/s | Ground horizontal speed |
| `AIR_CONTROL` | 0.6 | Air speed = 72 px/s (set directly, not accelerated) |
| `DRAG_GROUND` | 800 | Fast stop on ground |
| `DRAG_AIR` | 200 | Gentle decel mid-air |
| `COYOTE_TIME` | 80 ms | Jump allowed after walking off a ledge |
| `JUMP_BUFFER` | 100 ms | Jump press queued before landing triggers jump |
| `KNOCKBACK_X` | 180 px/s | Horizontal knockback away from enemy |
| `KNOCKBACK_Y` | -220 px/s | Upward knockback (causes falls) |
| `HURT_DURATION` | 600 ms | Input locked during knockback |
| `ENEMY_SPEED` | 50 px/s | Walking enemy patrol speed |

## Jump Physics (key constraint for level design)
- **Held jump height:** ~67 px (~4 tiles) — effective gravity = 500 - 150 = 350 during hold
- **Flat-jump horizontal range:** ~75 px at 72 px/s air speed
- **3-row height-gaining jump range:** ~58 px horizontal max
- **Platform vertical spacing used:** 3 rows (48 px) throughout, 4 rows to goal
- **Max safe horizontal gap between platforms:** 44 px (3 tiles) to leave margin

## Level Layout (bottom → top)
```
Row  0: Ceiling (solid, gap at cols 14-15)
Row  4: GOAL one-way platform (cols 10-17)
Row  8: APPROACH-3 (cols 8-15)       ┐
Row 11: APPROACH-2 (cols 14-20)      │ goal approach — overlapping, flexible path
Row 14: APPROACH-1 (cols 9-15)       ┘
Row 17: STAIR-C (cols 4-6)           ┐
Row 20: STAIR-B (cols 8-10)          │ upper staircase — descends left, 4-col steps
Row 23: STAIR-A (cols 12-14)         ┘
Row 26: RIGHT-MID (cols 15-21)
Row 29: LEFT-MID (cols 8-13)
Row 32: CENTER-R (cols 17-22)
Row 35: CENTER-L (cols 9-14)
Row 38: RIGHT-REST wide (cols 15-26)
Row 41: STAIR-4 (cols 23-25)         ┐
Row 44: STAIR-3 (cols 18-20)         │ ascending staircase — climbs right, 5-col steps
Row 47: STAIR-2 (cols 13-15)         │
Row 50: STAIR-1 (cols 8-10)          │
Row 53: STAIR-0 (cols 2-5)           ┘
Row 56: INTRO wide (cols 2-14)
Row 59: Floor (solid)
```

## Enemies
### Walking Enemy (`Enemy.js`, texture: `enemy_patrol`)
- Patrols horizontally on its platform at 50 px/s
- Reverses on wall collision or when `_hasGroundAhead()` returns false
- Ledge detection: AABB point check at `(x + dir*(halfWidth+8), y + halfHeight+4)` against both `platforms` and `oneWayPlats` static groups
- Spawned from `ENEMY_SPAWNS` in LevelData: `[col, row]`
- 4 walking enemies: INTRO, RREST, RMID, APP1

### Flying Enemy (`FlyingEnemy.js`, texture: `enemy_flying`)
- `body.allowGravity = false` — floats mid-air
- Patrols horizontally between `startX ± patrolRange` at 60 px/s
- Stored in a **plain array** (not a physics group) — physics groups reset `allowGravity`
- Spawned from `FLYING_SPAWNS`: `[x_px, y_px, patrol_range_px]`
- 3 flying enemies: between center platforms, between upper stair and mid, near goal approach

## Player (`Player.js`)
States: `IDLE / RUNNING / JUMPING / FALLING / HURT`

- **Jump:** `setVelocityY(JUMP_VELOCITY)` on press; while held and `isJumping`, reduces gravity by `JUMP_HOLD_GRAV`; stops on release or after `JUMP_HOLD_MAX` ms
- **Coyote time:** `canJump` stays true for 80 ms after leaving a ledge
- **Jump buffer:** stores last press time; fires jump on landing if within 100 ms
- **Air movement:** velocity SET directly to `±WALK_SPEED * AIR_CONTROL` (not accumulated)
- **Knockback:** `applyKnockback(enemyX)` — locked for 600 ms, red tint, cannot re-trigger during hurt

## One-Way Platforms
Collision callback: `return player.body.velocity.y >= 0` — player passes through going up, lands going down. Enemies use solid colliders on one-way platforms (they don't fall through).

## Camera
`startFollow(player, true, 0.1, 0.1)` — smooth lerp tracking the player vertically.

## UI
`UIScene` runs in parallel. Listens to `GameScene` events:
- `progress` (0–1 float) → updates height bar height
- `player-won` → shows win text, listens for R to restart
