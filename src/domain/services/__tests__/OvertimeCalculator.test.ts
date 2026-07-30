import { describe, expect, it } from 'vitest';
import { OvertimeCalculator } from '../OvertimeCalculator';

describe('OvertimeCalculator', () => {
  const calculator = new OvertimeCalculator();

  it('returns zero overtime for zero worked minutes', () => {
    const result = calculator.calculate({
      workedMinutes: 0,
    });

    expect(result).toEqual({
      regularMinutes: 0,
      overtime50Minutes: 0,
      overtime100Minutes: 0,
    });
  });

  it('returns only regular minutes below the daily limit', () => {
    const result = calculator.calculate({
      workedMinutes: 479,
    });

    expect(result).toEqual({
      regularMinutes: 479,
      overtime50Minutes: 0,
      overtime100Minutes: 0,
    });
  });

  it('returns only regular minutes at the daily limit', () => {
    const result = calculator.calculate({
      workedMinutes: 480,
    });

    expect(result).toEqual({
      regularMinutes: 480,
      overtime50Minutes: 0,
      overtime100Minutes: 0,
    });
  });

  it('starts 50% overtime after the daily limit', () => {
    const result = calculator.calculate({
      workedMinutes: 481,
    });

    expect(result).toEqual({
      regularMinutes: 480,
      overtime50Minutes: 1,
      overtime100Minutes: 0,
    });
  });

  it('calculates first overtime tier correctly', () => {
    const result = calculator.calculate({
      workedMinutes: 540,
    });

    expect(result).toEqual({
      regularMinutes: 480,
      overtime50Minutes: 60,
      overtime100Minutes: 0,
    });
  });

  it('caps first overtime tier at two hours', () => {
    const result = calculator.calculate({
      workedMinutes: 600,
    });

    expect(result).toEqual({
      regularMinutes: 480,
      overtime50Minutes: 120,
      overtime100Minutes: 0,
    });
  });

  it('starts 100% overtime after the first overtime tier', () => {
    const result = calculator.calculate({
      workedMinutes: 660,
    });

    expect(result).toEqual({
      regularMinutes: 480,
      overtime50Minutes: 120,
      overtime100Minutes: 60,
    });
  });
});