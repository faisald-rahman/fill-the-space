// const testModules = require('./test-module');
require('../css/main.css');
import btnClickSfx from "../sfx/btnClickSfx";
import circleSfx from "../sfx/circleSfx";
import clickSfx from "../sfx/clickSfx";
import winSfx from "../sfx/winSfx";
// require('../scss/style.scss');

import BoxManager from "./class/BoxManager";
import Button from "./class/Button";
import CircleTransition from "./class/CircleTransition";
import Congrat from "./class/Congrat";
import ClickCounter from "./class/Counter/ClickCounter";
import Counter from "./class/Counter/Counter";
import Save from "./class/Save";
import globalData from "./const/globalData";

/********** Paste your code here! ************/

const gridsWrapper = document.getElementById("grids-wrapper");
for (let i = 0; i < globalData.grid.totalRow; i += 1) {

    const subWrapper = document.createElement("div");
    subWrapper.className = globalData.classList.wrapper.subGridWrapper;
    for (let j = 0; j < globalData.grid.totalBoxPerRow; j += 1) {
        const box = document.createElement("div");
        box.className = globalData.classList.box.box;

        const boxChild = document.createElement("div");
        boxChild.className = globalData.classList.box.childBox;

        box.appendChild(boxChild);
        subWrapper.appendChild(box);
    }

    gridsWrapper.appendChild(subWrapper);
}

const save = new Save(1);
save.loadData();
const boxManager = new BoxManager();
const circleTransition = new CircleTransition();
const congrat = new Congrat(save);
const levelCounter = new Counter(globalData.ids.levelCounter);
const clickCounter = new ClickCounter(globalData.ids.clickCounter);
const resetBtn = new Button(globalData.ids.reset);
const nextBtn = new Button(globalData.ids.next);
const prevBtn = new Button(globalData.ids.prev);

/********** Function ************/
const disablePrevClick = () => {
    if (levelCounter.counter === 1) {
        prevBtn.setDisableClick(true);
    }
}

const disableNextClick = () => {
    if (levelCounter.counter === globalData.level.max || !save.isCanClickNext(levelCounter.counter)) {
        nextBtn.setDisableClick(true);
    }
}

const setDisabledClickAllButton = (isDisabled) => {
    resetBtn.setDisableClick(isDisabled);
    nextBtn.setDisableClick(isDisabled);
    prevBtn.setDisableClick(isDisabled);
    disablePrevClick();
    disableNextClick();
}

const disabledClickCounter = () => {
    clickCounter.setDisabled(levelCounter.counter < save.maxLevel || save.isGameComplete);
}

const handleBoxClick = () => {
    clickSfx().start();
    if (save.isGameComplete) return;

    clickCounter.increaseCounter();
    save.setMaxClick(clickCounter.counter);
}

const handleStartCompleteBoxAnimatin = () => {
    setDisabledClickAllButton(true);
    winSfx().start();
}

const handleSetLevel = () => {
    disabledClickCounter();
}

const handleLevelComplete = () => {
    circleTransition.show(levelCounter.counter === globalData.level.max && !save.isGameComplete);
    circleSfx().start();
}

const handleCircleTransitionDone = () => {
    if (levelCounter.counter < globalData.level.max) {
        levelCounter.increaseCounter();
        boxManager.setLevel(levelCounter.counter - 1);
        save.setMaxLevel(levelCounter.counter);
        save.saveToLocalStorage();
    } else {
        boxManager.setLevel(0);
        levelCounter.init(1);
    }
    
    setDisabledClickAllButton(false);
}

const handleResetClick = () => {
    btnClickSfx().start();
    boxManager.setLevel(levelCounter.counter - 1);
}

const handleNextClick = () => {
    if (levelCounter.counter === globalData.level.max || !save.isCanClickNext(levelCounter.counter)) return;

    btnClickSfx().start();
    levelCounter.increaseCounter();
    boxManager.setLevel(levelCounter.counter - 1);
    prevBtn.setDisableClick(false);
    if (levelCounter.counter === globalData.level.max || !save.isCanClickNext(levelCounter.counter)) {
        nextBtn.setDisableClick(true);
    }
}

const handlePrevClick = () => {
    if (levelCounter.counter === 1) return;

    btnClickSfx().start();
    levelCounter.decreaseCounter();
    boxManager.setLevel(levelCounter.counter - 1);
    nextBtn.setDisableClick(false);
    if (levelCounter.counter === 1) {
        prevBtn.setDisableClick(true);
    }
}

const handleAllLevelComplete = () => {
    congrat.show(save.maxClick);
    save.setIsGameComplete(true);
    save.saveToLocalStorage();
    setDisabledClickAllButton();
}

const handlePlayAgainClick = () => {
    circleTransition.handleShowDone();
}

/********** Event ************/
circleTransition.setEvent(handleCircleTransitionDone, handleAllLevelComplete);
resetBtn.setClickEvent(handleResetClick);
nextBtn.setClickEvent(handleNextClick);
prevBtn.setClickEvent(handlePrevClick);
congrat.setOnPlayAgainClick(handlePlayAgainClick);
boxManager.setEvent(handleSetLevel, handleBoxClick, handleStartCompleteBoxAnimatin, handleLevelComplete);

/********** Init ************/
levelCounter.init(save.maxLevel);
clickCounter.init(save.maxClick);
boxManager.setLevel(save.maxLevel - 1);
congrat.init();
disableNextClick();
disablePrevClick();