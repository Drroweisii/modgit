import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameState } from '../../hooks/useGameState';

describe('useGameState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.gameState.balances.emsx).toBe(10);
    expect(result.current.gameState.workers).toHaveLength(0);
  });

  it('can hire a worker', () => {
    const { result } = renderHook(() => useGameState());
    
    act(() => {
      result.current.hireWorker('emsx');
    });

    expect(result.current.gameState.workers).toHaveLength(1);
    expect(result.current.gameState.balances.emsx).toBeLessThan(10);
  });
});