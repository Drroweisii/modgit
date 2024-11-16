export const WORKER_CONFIG = {
  MAX_LEVEL: 50,
  WORKER_COSTS: {
    emsx: 1,
    usdt: 100,
    btc: 1000
  },
  UPGRADE_COST_MULTIPLIER: 2,
};

export const MERGE_RULES = {
  REQUIRED_LEVEL_MATCH: true,
  MUST_BE_ADJACENT: true,
  MAX_LEVEL: 50,
  MERGE_BONUS: 1.1,
};

export const WORKER_RARITY = {
  COMMON: { color: 'gray', chance: 0.6, multiplier: 1 },
  RARE: { color: 'blue', chance: 0.25, multiplier: 1.5 },
  EPIC: { color: 'purple', chance: 0.1, multiplier: 2.5 },
  LEGENDARY: { color: 'yellow', chance: 0.05, multiplier: 5 },
};