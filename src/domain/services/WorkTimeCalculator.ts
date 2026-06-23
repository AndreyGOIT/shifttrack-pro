// src/domain/services/WorkTimeCalculator.ts

export interface WorkTimeCalculationInput {
  startedAt: Date;
  endedAt: Date;
  unpaidBreakMinutes?: number;
}

export interface WorkTimeCalculationResult {
  totalMinutes: number;
  workedMinutes: number;
}

export class WorkTimeCalculator {
  calculate(
    input: WorkTimeCalculationInput,
  ): WorkTimeCalculationResult {
    const { startedAt, endedAt, unpaidBreakMinutes = 0 } = input;

    if (endedAt <= startedAt) {
      throw new Error('End time must be after start time');
    }

    if (unpaidBreakMinutes < 0) {
      throw new Error('Break minutes cannot be negative');
    }

    const totalMinutes = Math.floor(
      (endedAt.getTime() - startedAt.getTime()) / 60000,
    );

    const workedMinutes = totalMinutes - unpaidBreakMinutes;

    if (workedMinutes < 0) {
      throw new Error('Worked minutes cannot be negative');
    }

    return {
      totalMinutes,
      workedMinutes,
    };
  }
}