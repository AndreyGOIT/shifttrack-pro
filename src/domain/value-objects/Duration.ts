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
}