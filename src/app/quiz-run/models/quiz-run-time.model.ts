import { QuizRunSession } from './quiz-run-session.model';

export class QuizRunTime {
  constructor(
    public minutes: number,
    public seconds: number
  ) {}

  static getElapsedTime(quizRunSession: QuizRunSession) {
    const stopTime = quizRunSession.stopTimeString
      ? Date.parse(quizRunSession.stopTimeString)
      : Date.now();
    const startTime = Date.parse(quizRunSession.startTimeString);

    const diff = stopTime - startTime;
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    return new QuizRunTime(minutes, seconds);
  }

  toString = (): string => {
    const minutesString = this.minutes.toString().padStart(2, '0');
    const secondsString = this.seconds.toString().padStart(2, '0');

    return `${minutesString}:${secondsString}`;
  };

  getSeconds() {
    return this.minutes * 60 + this.seconds;
  }
}
