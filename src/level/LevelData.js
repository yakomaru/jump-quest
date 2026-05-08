import { TILE_SIZE } from '../constants.js';
import { LEVEL_1_ROWS, LEVEL_1_ENEMY_SPAWNS, LEVEL_1_FLYING_SPAWNS } from './levels/Level1Data.js';
import { LEVEL_2_ROWS, LEVEL_2_ENEMY_SPAWNS, LEVEL_2_FLYING_SPAWNS } from './levels/Level2Data.js';
import { LEVEL_3_ROWS, LEVEL_3_ENEMY_SPAWNS, LEVEL_3_FLYING_SPAWNS, GOAL_TILE } from './levels/Level3Data.js';

// Number of rows added at the top for Level 3 (world rows 0–29 = Level 3)
const L3_ROWS = 30;
const ROW_OFFSET = L3_ROWS;           // L1/L2 tile rows shift down by this many rows
const PX_OFFSET  = L3_ROWS * TILE_SIZE; // L1/L2 pixel-coord spawns shift down by this many px

// Wall tiles for the Level 1 column range (cols 0–29) above the existing Level 1 area
const L1_WALL = new Array(30).fill(0).map((_, c) => (c === 0 || c === 29) ? 1 : 0);

export const LEVEL_DATA = [
  // Rows 0–29: Level 3 play area (L1 column range = wall tiles)
  ...LEVEL_3_ROWS.map(l3row => [...L1_WALL, ...l3row]),
  // Rows 30–89: original Level 1 + Level 2 data (shifted down by prepending 30 rows above)
  ...LEVEL_1_ROWS.map((row, i) => [...row, ...LEVEL_2_ROWS[i]]),
];

// Enemy spawns: L1/L2 use tile-row coords → add ROW_OFFSET; L3 is already at world rows 0–29
export const ENEMY_SPAWNS = [
  ...LEVEL_1_ENEMY_SPAWNS.map(([c, r]) => [c, r + ROW_OFFSET]),
  ...LEVEL_2_ENEMY_SPAWNS.map(([c, r]) => [c, r + ROW_OFFSET]),
  ...LEVEL_3_ENEMY_SPAWNS,
];

// Flying spawns: L1/L2 use pixel-y coords → add PX_OFFSET; L3 is already in world pixels
export const FLYING_SPAWNS = [
  ...LEVEL_1_FLYING_SPAWNS.map(([x, y, range]) => [x, y + PX_OFFSET, range]),
  ...LEVEL_2_FLYING_SPAWNS.map(([x, y, range]) => [x, y + PX_OFFSET, range]),
  ...LEVEL_3_FLYING_SPAWNS,
];

export { GOAL_TILE };
