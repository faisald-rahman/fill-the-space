import globalData from "../../const/globalData";
import Counter from "./Counter";

class ClickCounter extends Counter {
    constructor() {
        super(globalData.ids.clickCounter);
        this.isDisabled = false;
    }

    increaseCounter() {
       if (this.isDisabled) return;

       super.increaseCounter();
    }

    setDisabled(isDisabled) {
        this.isDisabled = isDisabled;
        if (isDisabled) {
            this.text.classList.add(globalData.classList.text.disabled);
        } else {
            this.text.classList.remove(globalData.classList.text.disabled);
        }
    }
}

export default ClickCounter;