import { describe, it, expect } from 'vitest';
import { formatNumber, calculateUpgradeCost } from '../../utils/calculations';

describe('calculations', () => {
  describe('formatNumber', () => {
    it('formats small numbers', () => {
      expect(formatNumber(123.456)).toBe('123.46');
    });

    it('formats thousands', () => {
      expect(formatNumber(1234.56)).toBe('1.23K');
    });

    it('formats millions', () => {
      expect(formatNumber(1234567.89)).toBe('1.23M');
    });

    it('formats billions', () => {
      expect(formatNumber(1234567890.12)).toBe('1.23B');
    });
  });

  describe('calculateUpgradeCost', () => {
    it('calculates level 1 cost', () => {
      expect(calculateUpgradeCost(1)).toBeGreaterThan(0);
    });

    it('increases cost with level', () => {
      const level1Cost = calculateUpgradeCost(1);
      const level2Cost = calculateUpgradeCost(2);
      expect(level2Cost).toBeGreaterThan(level1Cost);
    });
  });
});