import { LEVEL_1_ROWS, LEVEL_1_ENEMY_SPAWNS, LEVEL_1_FLYING_SPAWNS } from './levels/Level1Data.js';
import { LEVEL_2_ROWS, LEVEL_2_ENEMY_SPAWNS, LEVEL_2_FLYING_SPAWNS, GOAL_TILE } from './levels/Level2Data.js';

export const LEVEL_DATA   = LEVEL_1_ROWS.map((row, i) => [...row, ...LEVEL_2_ROWS[i]]);
export const ENEMY_SPAWNS  = [...LEVEL_1_ENEMY_SPAWNS,  ...LEVEL_2_ENEMY_SPAWNS];
export const FLYING_SPAWNS = [...LEVEL_1_FLYING_SPAWNS, ...LEVEL_2_FLYING_SPAWNS];
export { GOAL_TILE };
