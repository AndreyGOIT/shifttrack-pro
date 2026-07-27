import {
  FINLAND_DEFAULT_OVERTIME_RULES,
  OvertimeRules,
} from '../rules/OvertimeRules';

export interface OvertimeCalculationInput {
  workedMinutes: number;
}

export interface OvertimeCalculationResult {
  regularMinutes: number;
  overtime50Minutes: number;
  overtime100Minutes: number;
}

export class OvertimeCalculator {
  calculate(
  input: OvertimeCalculationInput,
  rules: OvertimeRules = FINLAND_DEFAULT_OVERTIME_RULES,
): OvertimeCalculationResult {
  const regularMinutes = Math.min(
    input.workedMinutes,
    rules.regularDailyMinutes,
  );

  const overtimeMinutes = Math.max(
    0,
    input.workedMinutes - rules.regularDailyMinutes,
  );

  const overtime50Minutes = Math.min(
    overtimeMinutes,
    rules.firstOvertimeTierMinutes,
  );

  const overtime100Minutes = Math.max(
    0,
    overtimeMinutes - rules.firstOvertimeTierMinutes,
  );

  return {
    regularMinutes,
    overtime50Minutes,
    overtime100Minutes,
  };
}
}