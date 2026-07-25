import { BreakCalculator } from './BreakCalculator';
import { TimeRoundingService } from './TimeRoundingService';
import { WorkTimeCalculator } from './WorkTimeCalculator';

export interface PayrollCalculationInput {
  startedAt: Date;
  endedAt: Date;
  registeredBreakMinutes?: number;
}

export interface PayrollCalculationResult {
  totalMinutes: number;
  workedMinutes: number;
}

export class PayrollCalculationEngine {
  private readonly roundingService = new TimeRoundingService();
  private readonly breakCalculator = new BreakCalculator();
  private readonly workTimeCalculator = new WorkTimeCalculator();
  private calculateShiftDurationInMinutes(
    startedAt: Date,
    endedAt: Date,
  ): number {
    return Math.floor((endedAt.getTime() - startedAt.getTime()) / 60000);
  }

  calculate(input: PayrollCalculationInput): PayrollCalculationResult {
    const roundedStart = this.roundingService.roundUpTo15Minutes(
      input.startedAt,
    );

    const roundedEnd = this.roundingService.roundUpTo15Minutes(input.endedAt);

    const totalShiftMinutes = this.calculateShiftDurationInMinutes(
      roundedStart,
      roundedEnd,
    );

    const breakMinutes = this.breakCalculator.calculate({
      totalShiftMinutes,
      registeredBreakMinutes: input.registeredBreakMinutes,
    });

    return this.workTimeCalculator.calculate({
      startedAt: roundedStart,
      endedAt: roundedEnd,
      unpaidBreakMinutes: breakMinutes,
    });
  }
}
