import globalData from "../const/globalData";

class Save {
    constructor(maxLevel = 1, maxClick = 0, isGameComplete = false) {
        this.maxLevel = maxLevel;
        this.maxClick = maxClick;
        this.isGameComplete = isGameComplete;
    }

    setMaxLevel(maxLevel) {
        this.maxLevel = maxLevel > this.maxLevel ? maxLevel : this.maxLevel;
    }

    setMaxClick(maxClick) {
        this.maxClick = maxClick > this.maxClick ? maxClick : this.maxClick;
    }

    setIsGameComplete(isGameComplete) {
        this.isGameComplete = isGameComplete;
    }

    isCanClickNext(currentLevel) {
        return currentLevel < this.maxLevel;
    }

    isCanIncreaseClick(currentLevel) {
        return currentLevel > this.maxLevel;
    }

    saveToLocalStorage() {
        localStorage.setItem(globalData.saveKey.maxLevel, this.maxLevel);
        localStorage.setItem(globalData.saveKey.maxClick, this.maxClick);
        localStorage.setItem(globalData.saveKey.isGameComplete, this.isGameComplete);
    }

    loadData() {
        this.maxLevel = parseInt(localStorage.getItem(globalData.saveKey.maxLevel) || 1);
        this.maxClick = parseInt(localStorage.getItem(globalData.saveKey.maxClick) || 0);
        this.isGameComplete = localStorage.getItem(globalData.saveKey.isGameComplete) === "true" || false;
    }
}

export default Save;