import { describe, expect, it } from 'vitest';
import { PayrollCalculationEngine } from '../PayrollCalculationEngine';

describe('PayrollCalculationEngine', () => {
  it('calculates worked time using the calculation pipeline', () => {
    const engine = new PayrollCalculationEngine();

    const result = engine.calculate({
      startedAt: new Date('2026-06-23T07:07:00'),
      endedAt: new Date('2026-06-23T15:32:00'),
    });

    expect(result.totalMinutes).toBe(510);
    expect(result.workedMinutes).toBe(480);
  });
});