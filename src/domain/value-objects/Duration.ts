export class Duration {
  private constructor(
    private readonly minutes: number,
  ) {}

  static fromMinutes(minutes: number): Duration {
    if (minutes < 0) {
      throw new Error('Duration cannot be negative.');
    }

    return new Duration(minutes);
  }

  toMinutes(): number {
    return this.minutes;
  }
  
  static zero(): Duration {
    return new Duration(0);
  }

  add(other: Duration): Duration {
    return new Duration(this.minutes + other.minutes);
  }

  subtract(other: Duration): Duration {
    const result = this.minutes - other.minutes;

    if (result < 0) {
      throw new Error('Duration cannot be negative.');
    }

    return new Duration(result);
  }

  equals(other: Duration): boolean {
    return this.minutes === other.minutes;
  }
}