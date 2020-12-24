import generateCubes from "./generateCubes";
import { appData } from "./appData";

const gameField = document.querySelector(".field-container");

const renderCubes = () => {
  // Контейнер с кубами, который можно удалять по окончанию времени
  const cubes = document.createElement("div");
  cubes.classList.add("cubes");
  // Добавляем кубы в хранилище, которое очищается по окончанию времени
  appData.renderedCubes = generateCubes();
  // Рендерим кубы из хранилища
  appData.renderedCubes.forEach((cube) => {
    const newCube = document.createElement("div");
    newCube.classList.add("cube", cube.type);
    newCube.id = cube.id;

    newCube.style.top = cube.position.top;
    newCube.style.left = cube.position.left;
    newCube.style.right = cube.position.right;
    newCube.style.bottom = cube.position.bottom;

    cubes.appendChild(newCube);
  });
  // Добавляем контейнер с кубами на поле
  gameField.appendChild(cubes);
};

const onCubeClick = (e) => {
  // Если метод setPoints не получит id, он поймёт, что элемент остался один
  if (appData.renderedCubes.length === 1) {
    appData.setPoints();
    e.remove();
    renderCubes();
  } else {
    appData.setPoints(e.id);
    e.remove();
  }
};

// Управление кубами
gameField.addEventListener("click", (e) => {
  if (e.target.className.includes("cube")) {
    onCubeClick(e.target);
  }
});

export default renderCubes;
