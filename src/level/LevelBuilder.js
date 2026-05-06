import { TILE_SIZE } from '../constants.js';

export function buildLevel(scene, levelData) {
  const platforms     = scene.physics.add.staticGroup();
  const oneWayPlats   = scene.physics.add.staticGroup();
  const spikes        = scene.physics.add.staticGroup();

  for (let row = 0; row < levelData.length; row++) {
    for (let col = 0; col < levelData[row].length; col++) {
      const id = levelData[row][col];
      if (id === 0) continue;

      const x = col * TILE_SIZE + TILE_SIZE / 2;
      const y = row * TILE_SIZE + TILE_SIZE / 2;

      if (id === 1) {
        platforms.create(x, y, 'tile_ground').setImmovable(true);
      } else if (id === 2) {
        const plat = oneWayPlats.create(x, y, 'tile_platform').setImmovable(true);
        plat.body.checkCollision.down  = false;
        plat.body.checkCollision.left  = false;
        plat.body.checkCollision.right = false;
      } else if (id === 3) {
        spikes.create(x, y, 'tile_spike').setImmovable(true);
      }
    }
  }

  return { platforms, oneWayPlats, spikes };
}
