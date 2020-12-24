import moment from "moment";
import { appData } from "./appData";

const timeScreen = document.querySelector(".time__left");
const startButton = document.querySelector(".btn-start");
const pauseButton = document.querySelector(".btn.btn-pause");
const endGameText = document.querySelector(".endgame-text");

export class Timer {
  constructor(time) {
    this.time = time;
    this.timeLeft = moment().set({ ...time });
    this.durationLeft = moment.duration({ ...time });

    this.isPaused = false;

    this.intervalId = "";
    this.timeoutId = "";
  }

  resetTimer() {
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
    this.timeLeft = moment().set({ ...this.time });
    this.durationLeft = moment.duration({ ...this.time });
    this.isPaused = false;
    timeScreen.innerHTML = "";
  }

  // старт отсчёта времени
  startCountdown() {
    // Если новая игра - убираем задержку
    // Иначе, при продолжении, пройдёт лишняя секунда
    if (!this.isPaused) {
      this.timeLeft.subtract(1, "second");
      timeScreen.innerHTML = moment(this.timeLeft).format("mm:ss");
      this.isPaused = false;
    }

    this.intervalId = setInterval(() => {
      this.timeLeft.subtract(1, "second");
      this.durationLeft.subtract(1000, "milliseconds");
      timeScreen.innerHTML = moment(this.timeLeft).format("mm:ss");
    }, 1000);

    this.timeoutId = setTimeout(() => {
      startButton.classList.remove("hidden");
      pauseButton.classList.add("hidden");
      endGameText.innerHTML = `Good job! You've earned <span class="text__points">${appData.points}</span> points!`;
      // сбросить таймер
      this.resetTimer();
      $("#exampleModal").modal("show");
      appData.clearCubes();
    }, this.durationLeft);
  }

  // пауза
  setPause() {
    this.isPaused = true;
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
    timeScreen.innerHTML = moment(this.timeLeft).format("mm:ss");
  }
}
