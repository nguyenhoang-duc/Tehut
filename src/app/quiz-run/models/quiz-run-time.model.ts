export class QuizRunTime {
  constructor(
    public hours: number,
    public minutes: number,
    public seconds: number
  ) {}

  static getCurrentQuizRunTime(startTime: number) {
    const diff = Date.now() - startTime;
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 60);

    return new QuizRunTime(hours, minutes, seconds);
  }

  toString = (): string => {
    const hourString = this.hours.toString().padStart(2, '0');
    const minutesString = this.minutes.toString().padStart(2, '0');
    const secondsString = this.seconds.toString().padStart(2, '0');

    return `${hourString}:${minutesString}:${secondsString}`;
  };
}
