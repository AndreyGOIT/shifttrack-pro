export class TimeRoundingService {
  roundUpTo15Minutes(date: Date): Date {
    const rounded = new Date(date);

    const minutes = rounded.getMinutes();

    if (minutes === 0) {
      return rounded;
    }

    const roundedMinutes = Math.ceil(minutes / 15) * 15;

    if (roundedMinutes === 60) {
      rounded.setHours(rounded.getHours() + 1);
      rounded.setMinutes(0);
    } else {
      rounded.setMinutes(roundedMinutes);
    }

    rounded.setSeconds(0);
    rounded.setMilliseconds(0);

    return rounded;
  }
}