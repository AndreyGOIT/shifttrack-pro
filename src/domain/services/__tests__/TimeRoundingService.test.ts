import { describe, expect, it } from 'vitest';
import { TimeRoundingService } from '../TimeRoundingService';

describe('TimeRoundingService', () => {
  const service = new TimeRoundingService();

  const cases = [
    ['07:00', '07:00'],
    ['07:01', '07:15'],
    ['07:07', '07:15'],
    ['07:14', '07:15'],
    ['07:15', '07:15'],
    ['07:16', '07:30'],
    ['17:07', '17:15'],
    ['17:46', '18:00'],
  ];

  it.each(cases)(
    'rounds %s to %s',
    (input, expected) => {
      const date = new Date(`2026-06-23T${input}:00`);

      const result = service.roundUpTo15Minutes(date);

      const formatted = result
        .toTimeString()
        .slice(0, 5);

      expect(formatted).toBe(expected);
    },
  );
});