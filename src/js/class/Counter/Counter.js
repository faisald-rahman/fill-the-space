class Counter {
    constructor(id) {
        this.text = document.getElementById(id);
        this.counter = 0;
    }

    init(counter = 0) {
        this.counter = counter;
        this.updateText();
    }

    increaseCounter() {
        this.counter += 1;
        this.updateText();
    }

    decreaseCounter() {
        this.counter -= 1;
        this.updateText();
    }

    updateText() {
        this.text.innerHTML = `${this.counter}`;
    }
}

export default Counter;