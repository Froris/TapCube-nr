import "./styles/index.scss";
import { Timer } from "./js/timer";
import renderCubes from "./js/renderCubes";
import { appData } from "./js/appData";
import listUpdater from "./js/updateStatistics";

const startButton = document.querySelector(".btn-start");
const pauseButton = document.querySelector(".btn-pause");
const continueButton = document.querySelector(".btn-continue");
const newGameButton = document.querySelector(".btn-new-game");

$(document).ready(() => {
  $("#startModal").modal("show");
  appData.getPlayersFromStorage();
});

// Управление паузой/рестартом
const newTimer = new Timer({ hours: 0, minutes: 0, seconds: 4 });

pauseButton.addEventListener("click", () => {
  continueButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
  newTimer.setPause();
});

continueButton.addEventListener("click", () => {
  continueButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
  newTimer.startCountdown();
});

newGameButton.addEventListener("click", () => {
  localStorage.clear();
  document.location.reload();
  pauseButton.classList.add("hidden");
  continueButton.classList.add("hidden");
  startButton.classList.remove("hidden");
  newTimer.resetTimer();
  appData.clearPoints();
  appData.clearCubes();
});

// Начало игры / Рендер кубов

startButton.addEventListener("click", () => {
  startButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
  newTimer.startCountdown();

  renderCubes();
});

// Сохранение игрока
const saveButton = document.querySelector(".btn.save");
const closeEndModalButton = document.querySelector(".close-end");
const input = document.querySelector(".form-control");

closeEndModalButton.addEventListener("click", () => {
  appData.clearPoints();
});

input.addEventListener("input", (e) => {
  appData.lastPlayer.name = e.target.value;
});

saveButton.addEventListener("click", () => {
  input.value = "";
  appData.savePlayer();
  appData.updateLastPlayer();

  listUpdater();
  appData.clearPoints();
});
