import { describe, expect, it } from 'vitest';
import { WorkTimeCalculator } from '../WorkTimeCalculator';

describe('WorkTimeCalculator', () => {
  const calculator = new WorkTimeCalculator();

  it('calculates worked minutes without breaks', () => {
    const result = calculator.calculate({
      startedAt: new Date('2026-06-23T07:00:00'),
      endedAt: new Date('2026-06-23T15:30:00'),
    });

    expect(result.totalMinutes).toBe(510);
    expect(result.workedMinutes).toBe(510);
  });

  it('calculates worked minutes with unpaid break', () => {
    const result = calculator.calculate({
      startedAt: new Date('2026-06-23T07:00:00'),
      endedAt: new Date('2026-06-23T18:15:00'),
      unpaidBreakMinutes: 30,
    });

    expect(result.totalMinutes).toBe(675);
    expect(result.workedMinutes).toBe(645);
  });

  it('throws when end time is before start time', () => {
    expect(() =>
      calculator.calculate({
        startedAt: new Date('2026-06-23T15:30:00'),
        endedAt: new Date('2026-06-23T07:00:00'),
      }),
    ).toThrow('End time must be after start time');
  });

  it('throws when break minutes are negative', () => {
    expect(() =>
      calculator.calculate({
        startedAt: new Date('2026-06-23T07:00:00'),
        endedAt: new Date('2026-06-23T15:30:00'),
        unpaidBreakMinutes: -15,
      }),
    ).toThrow('Break minutes cannot be negative');
  });
});