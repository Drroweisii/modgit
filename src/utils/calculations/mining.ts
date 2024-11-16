import { Worker, GameState } from '../../types/game';
import { MINING_CONFIG, MINING_MULTIPLIER } from '../constants';
import { calculateAdjacentBonus, calculateRarityMultiplier, calculateComboMultiplier } from './worker';

export function calculateMiningRate(worker: Worker, gameState: GameState): number {
  const baseRate = MINING_CONFIG.BASE_MINING_RATES[worker.type] * 
                  worker.stats.baseRate * 
                  Math.pow(MINING_MULTIPLIER, worker.level - 1);
  
  const adjacentBonus = calculateAdjacentBonus(worker, gameState.workers);
  const rarityMultiplier = calculateRarityMultiplier(worker);
  const comboMultiplier = calculateComboMultiplier(worker, gameState.workers);
  
  return baseRate * adjacentBonus * rarityMultiplier * comboMultiplier;
}

export function calculateOfflineMining(lastUpdate: number): number {
  const now = Date.now();
  const timeDiff = Math.min(now - lastUpdate, MINING_CONFIG.MAX_OFFLINE_TIME);
  return (timeDiff / 1000) * MINING_CONFIG.OFFLINE_MINING_RATE;
}