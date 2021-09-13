import globalData from "../const/globalData";

class CircleTransition {
    constructor() {
        this.circle = document.getElementById(globalData.ids.circleTransition);
        this.onShowDone = () => {};
    }

    setEvent(onShowDone = () => {}, onAllLevelComplete = () => {}) {
        this.onShowDone = onShowDone;
        this.onAllLevelComplete = onAllLevelComplete;
    }

    show(isAllLevelComplete = false) {
        this.circle.classList.remove(globalData.classList.circleTransition.hide);
        this.circle.classList.add(globalData.classList.circleTransition.show);

        setTimeout(() => {
            if (!isAllLevelComplete) {
                this.handleShowDone();
            } else {
                this.onAllLevelComplete();
            }
        }, 1500);
    }

    handleShowDone() {
        this.onShowDone();
        this.circle.classList.remove(globalData.classList.circleTransition.show);
        this.circle.classList.add(globalData.classList.circleTransition.hide);
    }
}

export default CircleTransition;