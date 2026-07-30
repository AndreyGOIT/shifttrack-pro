import { describe, expect, it } from 'vitest';
import { BreakCalculator } from '../BreakCalculator';

describe('BreakCalculator', () => {
  const calculator = new BreakCalculator();

  it('returns registered break minutes when provided', () => {
    expect(
      calculator.calculate({
        totalShiftMinutes: 600,
        registeredBreakMinutes: 45,
      }),
    ).toBe(45);
  });

  it('applies automatic break for shifts longer than 6 hours', () => {
    expect(
      calculator.calculate({
        totalShiftMinutes: 480,
      }),
    ).toBe(30);
  });

  it('returns zero for short shifts', () => {
    expect(
      calculator.calculate({
        totalShiftMinutes: 300,
      }),
    ).toBe(0);
  });

  it('returns zero for exactly 6 hours', () => {
    expect(
      calculator.calculate({
        totalShiftMinutes: 360,
      }),
    ).toBe(0);
  });

  it('throws when break minutes are negative', () => {
    expect(() =>
      calculator.calculate({
        totalShiftMinutes: 480,
        registeredBreakMinutes: -10,
      }),
    ).toThrow('Break minutes cannot be negative');
  });

  it('throws when shift minutes are negative', () => {
    expect(() =>
      calculator.calculate({
        totalShiftMinutes: -1,
      }),
    ).toThrow('Shift minutes cannot be negative');
  });
});