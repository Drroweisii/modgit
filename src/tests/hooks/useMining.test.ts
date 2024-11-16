import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMining } from '../../hooks/useMining';

describe('useMining', () => {
  const mockWorkers = [
    {
      id: 'worker1',
      type: 'emsx',
      level: 1,
      position: 0,
      miningRate: 0.1,
      stats: {
        baseRate: 1,
        speedMultiplier: 1,
        powerMultiplier: 1,
        comboBonus: 0,
        luckChance: 0.01
      }
    }
  ];

  it('calculates initial mining rates', () => {
    const { result } = renderHook(() => useMining(mockWorkers));
    expect(result.current.miningRates.emsx).toBeGreaterThan(0);
    expect(result.current.miningRates.usdt).toBe(0);
    expect(result.current.miningRates.btc).toBe(0);
  });

  it('updates rates with multiple workers', () => {
    const multipleWorkers = [
      ...mockWorkers,
      {
        id: 'worker2',
        type: 'emsx',
        level: 1,
        position: 1,
        miningRate: 0.1,
        stats: {
          baseRate: 1,
          speedMultiplier: 1,
          powerMultiplier: 1,
          comboBonus: 0,
          luckChance: 0.01
        }
      }
    ];

    const { result } = renderHook(() => useMining(multipleWorkers));
    expect(result.current.miningRates.emsx).toBeGreaterThan(mockWorkers[0].miningRate);
  });
});