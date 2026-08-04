// src/domain/entities/WorkLog.ts

import { Duration } from '../value-objects/Duration';
import { PayrollCalculationEngine } from '../services/PayrollCalculationEngine';

export enum WorkLogStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface WorkLogProps {
  id: string;
  employeeId: string;
  organizationId: string;

  shiftDate: Date;

  plannedStartTime: Date;
  plannedEndTime: Date;

  actualStartTime?: Date;
  actualEndTime?: Date;

  status?: WorkLogStatus;
}

export class WorkLog {
  private readonly id: string;
  private readonly employeeId: string;
  private readonly organizationId: string;

  private readonly shiftDate: Date;

  private readonly plannedStartTime: Date;
  private readonly plannedEndTime: Date;

  private actualStartTime?: Date;
  private actualEndTime?: Date;

  private status: WorkLogStatus;

  private workedDuration?: Duration;

  constructor(props: WorkLogProps) {
    this.id = props.id;
    this.employeeId = props.employeeId;
    this.organizationId = props.organizationId;

    this.shiftDate = props.shiftDate;

    this.plannedStartTime = props.plannedStartTime;
    this.plannedEndTime = props.plannedEndTime;

    this.actualStartTime = props.actualStartTime;
    this.actualEndTime = props.actualEndTime;

    this.status = props.status ?? WorkLogStatus.DRAFT;
  }

  private getEffectiveStartTime(): Date {
    return this.actualStartTime ?? this.plannedStartTime;
  }

  private getEffectiveEndTime(): Date {
    return this.actualEndTime ?? this.plannedEndTime;
  }

  submit(): void {
    if (this.status !== WorkLogStatus.DRAFT) {
      throw new Error('Only draft work logs can be submitted.');
    }

    this.status = WorkLogStatus.SUBMITTED;
  }

  approve(): void {
    if (this.status !== WorkLogStatus.SUBMITTED) {
      throw new Error('Only submitted work logs can be approved.');
    }

    this.status = WorkLogStatus.APPROVED;
  }

  reject(): void {
    if (this.status !== WorkLogStatus.SUBMITTED) {
      throw new Error('Only submitted work logs can be rejected.');
    }

    this.status = WorkLogStatus.REJECTED;
  }

  reopen(): void {
    if (this.status !== WorkLogStatus.REJECTED) {
      throw new Error('Only rejected work logs can be reopened.');
    }

    this.status = WorkLogStatus.DRAFT;
  }
    
  recalculate(engine: PayrollCalculationEngine): void {
  if (this.status === WorkLogStatus.APPROVED) {
    throw new Error(
      'Approved work logs cannot be recalculated.'
    );
  }

  const result = engine.calculate({
    startedAt: this.getEffectiveStartTime(),
    endedAt: this.getEffectiveEndTime(),
  });

  this.workedDuration = Duration.fromMinutes(
    result.workedMinutes,
  );
}

  setWorkedDuration(duration: Duration): void {
    if (this.status === WorkLogStatus.APPROVED) {
      throw new Error('Approved work logs cannot be modified.');
    }

    this.workedDuration = duration;
  }

  getStatus(): WorkLogStatus {
    return this.status;
  }

  getWorkedDuration(): Duration | undefined {
    return this.workedDuration;
  }
}
