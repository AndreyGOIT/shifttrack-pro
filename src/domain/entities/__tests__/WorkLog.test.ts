import { describe, expect, it } from 'vitest';
import { WorkLog, WorkLogStatus } from '../WorkLog';
import { PayrollCalculationEngine } from '../../services/PayrollCalculationEngine';

function createWorkLog(overrides = {}) {
  return new WorkLog({
    id: 'worklog-1',
    employeeId: 'employee-1',
    organizationId: 'organization-1',
    shiftDate: new Date('2026-07-01'),
    plannedStartTime: new Date('2026-07-01T07:00:00'),
    plannedEndTime: new Date('2026-07-01T15:30:00'),
    ...overrides,
  });
}

describe('WorkLog', () => {
  it('should be created in DRAFT status by default', () => {
    const workLog = createWorkLog();

    expect(workLog.getStatus()).toBe(WorkLogStatus.DRAFT);
  });

  it('should transition from DRAFT to SUBMITTED', () => {
    const workLog = createWorkLog();

    workLog.submit();

    expect(workLog.getStatus()).toBe(WorkLogStatus.SUBMITTED);
  });

  it('should not allow approving a draft work log', () => {
    const workLog = createWorkLog();

    expect(() => workLog.approve()).toThrow(
      'Only submitted work logs can be approved.',
    );
  });

  it('should transition from SUBMITTED to APPROVED', () => {
    const workLog = createWorkLog();

    workLog.submit();
    workLog.approve();

    expect(workLog.getStatus()).toBe(WorkLogStatus.APPROVED);
  });

  it('should transition from SUBMITTED to REJECTED', () => {
    const workLog = createWorkLog();

    workLog.submit();
    workLog.reject();

    expect(workLog.getStatus()).toBe(WorkLogStatus.REJECTED);
  });

  it('should transition from REJECTED back to DRAFT', () => {
    const workLog = createWorkLog();

    workLog.submit();
    workLog.reject();
    workLog.reopen();

    expect(workLog.getStatus()).toBe(WorkLogStatus.DRAFT);
  });

  it('should not allow reopening an approved work log', () => {
    const workLog = createWorkLog();

    workLog.submit();
    workLog.approve();

    expect(() => workLog.reopen()).toThrow(
      'Only rejected work logs can be reopened.',
    );
  });

  it('should calculate worked duration using payroll engine', () => {
    const workLog = createWorkLog();
    const engine = new PayrollCalculationEngine();

    workLog.recalculate(engine);

    expect(workLog.getWorkedDuration()?.toMinutes()).toBe(480);
  });

  it('should prefer actual times over planned times', () => {
    const workLog = createWorkLog({
      actualStartTime: new Date('2026-07-01T07:15:00'),
      actualEndTime: new Date('2026-07-01T16:00:00'),
    });

    const engine = new PayrollCalculationEngine();

    workLog.recalculate(engine);

    expect(workLog.getWorkedDuration()?.toMinutes()).toBe(495);
  });

  it('should not recalculate approved work log', () => {
    const workLog = createWorkLog();
    const engine = new PayrollCalculationEngine();

    workLog.submit();
    workLog.approve();

    expect(() => workLog.recalculate(engine)).toThrow(
      'Approved work logs cannot be recalculated.',
    );
  });
});
