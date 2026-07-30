export interface BreakCalculationInput {
  totalShiftMinutes: number;
  registeredBreakMinutes?: number;
}

export class BreakCalculator {
  private static readonly AUTO_BREAK_THRESHOLD_MINUTES = 360; // 6h
  private static readonly AUTO_BREAK_MINUTES = 30;

  calculate(input: BreakCalculationInput): number {
    const {
      totalShiftMinutes,
      registeredBreakMinutes = 0,
    } = input;

    if (totalShiftMinutes < 0) {
      throw new Error('Shift minutes cannot be negative');
    }

    if (registeredBreakMinutes < 0) {
      throw new Error('Break minutes cannot be negative');
    }

    if (registeredBreakMinutes > 0) {
      return registeredBreakMinutes;
    }

    if (
      totalShiftMinutes >
      BreakCalculator.AUTO_BREAK_THRESHOLD_MINUTES
    ) {
      return BreakCalculator.AUTO_BREAK_MINUTES;
    }

    return 0;
  }
}
