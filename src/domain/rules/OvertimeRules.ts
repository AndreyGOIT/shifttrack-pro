export interface OvertimeRules {
  /**
   * Regular working time in minutes before overtime starts.
   * Default in Finland: 8 hours = 480 minutes.
   */
  regularDailyMinutes: number;

  /**
   * Maximum duration of the first overtime tier (+50%).
   * Default in Finland: first 2 hours = 120 minutes.
   */
  firstOvertimeTierMinutes: number;
}

export const FINLAND_DEFAULT_OVERTIME_RULES: OvertimeRules = {
  regularDailyMinutes: 480,
  firstOvertimeTierMinutes: 120,
};