import { appData } from "./appData";
const playersList = document.querySelector(".players-list");

const listUpdater = () => {
  // Возможно, это не лучший вариант обновлять элементы
  // Если в списке больше одного игрока - удаляем старый список и делаем новый
  if (appData.listWithProgress.length > 1) {
    while (playersList.firstChild) {
      playersList.removeChild(playersList.firstChild);
    }
  }

  appData.listWithProgress.forEach((currPlayer) => {
    const listItem = document.createElement("li");
    listItem.classList.add("player");

    listItem.innerHTML = `
      <span class='player__name'>${currPlayer.name}</span>
      <div class='player__score'>
        <span>${currPlayer.points}</span>
        <div class='progress-bar' style='width: ${currPlayer.rateBarLength}'></div>
      </div>
    `;

    return playersList.appendChild(listItem);
  });
};

export default listUpdater;
