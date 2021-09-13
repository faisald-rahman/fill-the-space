import globalData from "../const/globalData";

class Button {
    constructor(id) {
        this.btn = document.getElementById(id);
    }

    setClickEvent(onClick) {
        this.btn.onclick = onClick;
    }

    setDisableClick(isDisabled = true) {
        if (isDisabled) {
            this.btn.classList.add(globalData.classList.btn.disabled);
        } else {
            this.btn.classList.remove(globalData.classList.btn.disabled);
        }
    }
}

export default Button;