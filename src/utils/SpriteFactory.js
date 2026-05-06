export function createAllTextures(scene) {
  createPlayerTexture(scene);
  createGroundTexture(scene);
  createPlatformTexture(scene);
  createSpikeTexture(scene);
  createEnemyTexture(scene);
  createGoalTexture(scene);
  createHeartTexture(scene);
}

function createPlayerTexture(scene) {
  const g = scene.add.graphics();
  // legs
  g.fillStyle(0x1565c0);
  g.fillRect(3, 11, 4, 5);
  g.fillRect(9, 11, 4, 5);
  // body
  g.fillStyle(0x4fc3f7);
  g.fillRect(2, 5, 12, 7);
  // head
  g.fillStyle(0xffe0b2);
  g.fillRect(4, 0, 8, 6);
  // eyes
  g.fillStyle(0x1a1a1a);
  g.fillRect(5, 2, 2, 2);
  g.fillRect(9, 2, 2, 2);
  g.generateTexture('player', 16, 16);
  g.destroy();
}

function createGroundTexture(scene) {
  const g = scene.add.graphics();
  g.fillStyle(0x5d4037);
  g.fillRect(0, 0, 16, 16);
  // lighter top edge
  g.fillStyle(0x795548);
  g.fillRect(0, 0, 16, 3);
  // subtle texture dots
  g.fillStyle(0x4e342e);
  g.fillRect(3, 6, 2, 2);
  g.fillRect(10, 10, 2, 2);
  g.generateTexture('tile_ground', 16, 16);
  g.destroy();
}

function createPlatformTexture(scene) {
  const g = scene.add.graphics();
  g.fillStyle(0x546e7a);
  g.fillRect(0, 0, 16, 16);
  g.fillStyle(0x78909c);
  g.fillRect(0, 0, 16, 4);
  g.fillStyle(0x37474f);
  g.fillRect(0, 4, 16, 1);
  g.generateTexture('tile_platform', 16, 16);
  g.destroy();
}

function createSpikeTexture(scene) {
  const g = scene.add.graphics();
  g.fillStyle(0xffd600);
  // three triangles drawn as filled polygons
  g.fillTriangle(2, 16, 6, 4, 10, 16);
  g.fillStyle(0xffab00);
  g.fillTriangle(6, 16, 10, 4, 14, 16);
  g.generateTexture('tile_spike', 16, 16);
  g.destroy();
}

function createEnemyTexture(scene) {
  const g = scene.add.graphics();
  // body
  g.fillStyle(0xc62828);
  g.fillRect(2, 4, 12, 10);
  // head bump
  g.fillStyle(0xb71c1c);
  g.fillRect(4, 1, 8, 4);
  // eyes
  g.fillStyle(0xffffff);
  g.fillRect(4, 5, 3, 3);
  g.fillRect(9, 5, 3, 3);
  g.fillStyle(0x000000);
  g.fillRect(5, 6, 1, 1);
  g.fillRect(10, 6, 1, 1);
  // feet
  g.fillStyle(0x7f0000);
  g.fillRect(2, 13, 4, 2);
  g.fillRect(10, 13, 4, 2);
  g.generateTexture('enemy_patrol', 16, 16);
  g.destroy();
}

function createGoalTexture(scene) {
  const g = scene.add.graphics();
  g.fillStyle(0xffd700);
  g.fillCircle(8, 8, 7);
  g.fillStyle(0xffa000);
  g.fillCircle(8, 8, 4);
  g.fillStyle(0xffffff);
  g.fillRect(6, 6, 4, 1);
  g.generateTexture('goal', 16, 16);
  g.destroy();
}

function createHeartTexture(scene) {
  const g = scene.add.graphics();
  g.fillStyle(0xe53935);
  // heart shape via rects approximation
  g.fillRect(1, 3, 4, 3);
  g.fillRect(7, 3, 4, 3);
  g.fillRect(0, 5, 12, 4);
  g.fillRect(1, 8, 10, 3);
  g.fillRect(2, 10, 8, 2);
  g.fillRect(3, 11, 6, 2);
  g.fillRect(4, 12, 4, 2);
  g.fillRect(5, 13, 2, 1);
  g.generateTexture('heart', 12, 14);
  g.destroy();
}
