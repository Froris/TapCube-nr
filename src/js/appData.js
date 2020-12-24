import sortBy from "lodash/sortBy";
import listUpdater from "./updateStatistics";

const pointsScreen = document.querySelector(".points__sum");
const lastPlayerName = document.querySelector(".last-user__name");
const lastPlayerScore = document.querySelector(".last-user__points");

export const appData = {
  points: 0,
  players: [],
  listWithProgress: [],
  renderedCubes: [],
  lastPlayer: {
    name: "Player",
    points: 0,
  },

  clearPoints() {
    this.points = 0;
    pointsScreen.innerHTML = this.points;
  },

  clearCubes() {
    this.renderedCubes = [];
    $(".cubes").remove();
  },

  setPoints(cubeId) {
    if (!cubeId) {
      this.points += this.renderedCubes[0].points;
    } else {
      const idx = this.renderedCubes.findIndex((cube) => cube.id === cubeId);
      const selectedCube = this.renderedCubes.splice(idx, 1);
      this.points += selectedCube[0].points;
    }
    pointsScreen.innerHTML = this.points;
  },

  getSortedList() {
    // Сортируем массив игроков по набранным очкам
    const sortedList = sortBy(this.players, ["points"]).reverse();
    // Добавляем полоску прогресса к объектам игроков
    this.listWithProgress = sortedList.map((player) => {
      let prevPlayer = sortedList[0];
      if (prevPlayer === undefined) {
        return { ...player, rateBarLength: "100%" };
      } else {
        return { ...player, rateBarLength: Math.floor((player.points / prevPlayer.points) * 100) + "%" };
      }
    });
  },

  savePlayer() {
    const newPlayer = {
      name: this.lastPlayer.name,
      points: this.points,
    };

    this.players.push(newPlayer);
    this.getSortedList();

    localStorage.setItem("savedPlayers", JSON.stringify(this.players));
  },

  updateLastPlayer() {
    lastPlayerName.innerHTML = this.lastPlayer.name;
    lastPlayerScore.innerHTML = this.points;

    this.lastPlayer.name = "Player";
    this.lastPlayer.points = 0;
  },

  getPlayersFromStorage() {
    const players = JSON.parse(localStorage.getItem("savedPlayers"));
    if (players !== null) {
      this.players = [...players];
      this.getSortedList();
      listUpdater();
    }
  },
};
