import globalData from "../const/globalData";
import Save from "./Save";

class Congrat {
    constructor() {
        this.congrat = document.getElementById(globalData.ids.congrat);
        this.detail = document.getElementById(globalData.ids.congratDetail);
        this.playagainBtn = document.getElementById(globalData.ids.playagain);
    }

    init() {
        this.congrat.classList.add(globalData.classList.congrat.hide);
    }

    setOnPlayAgainClick(onPlayAgainClick = () => {}) {
        this.playagainBtn.onclick = () => {
            onPlayAgainClick();
            this.congrat.classList.add(globalData.classList.congrat.hide);
            this.congrat.classList.remove(globalData.classList.congrat.show);
        }
    }

    show(maxClick = 0) {
        this.congrat.classList.remove(globalData.classList.congrat.hide);
        this.congrat.classList.add(globalData.classList.congrat.show);
        this.detail.innerHTML = `You have completed all levels with ${maxClick} click`;
    }
};

export default Congrat;