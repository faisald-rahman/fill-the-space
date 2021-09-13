import globalData from "../const/globalData";

export default class Box {
    /**
     * 
     * @param {Element} element 
     * @param {number} posX
     * @param {number} posY 
     * @param {Function} onBoxClick 
     */
    constructor(element, posX, posY, onBoxClick = () => {}) {
        /**
         * @type {Element}
         */
        this.box = element;

        /**
         * @type {Element}
         */
        this.child = this.box.firstChild;

        this.isCanChangeShape = true;
        this.isFilled = false;

        /**
         * @type {Function}
         */
        this.onBoxClick = () => onBoxClick(posX, posY);

        this.box.addEventListener("mousedown", this.handleBoxClick.bind(this));
    }

    handleBoxClick() {
        if(!this.isCanChangeShape) return;

        this.onBoxClick();
    }

    changeShape() {
        if(!this.isCanChangeShape) return;

        if (!this.isFilled) {
            this.isFilled = true;
            this.child.classList.remove(globalData.classList.box.childBoxDot);
        } else {
            this.isFilled = false;
            this.child.classList.add(globalData.classList.box.childBoxDot);
        }
    }

    /**
     * 
     * @param {number} idx 
     */
    init(idx) {
        this.isCanChangeShape = true;
        this.isFilled = false;

        if (idx === 0) {
            this.isCanChangeShape = false;
            this.box.className = `${globalData.classList.box.box} ${globalData.classList.box.boxHide}`;
            this.child.className = `${globalData.classList.box.childBox} ${globalData.classList.box.childBoxHide}`;
        } else if (idx === 1) {
            this.isFilled = true;
            this.box.className = globalData.classList.box.box;
            this.child.className = globalData.classList.box.childBox;
        } else {
            this.box.className = globalData.classList.box.box;
            this.child.className = `${globalData.classList.box.childBox} ${globalData.classList.box.childBoxDot}`;
        }
    }

    addCompleteEffect() {
        this.child.classList.add(globalData.classList.box.childboxWhite);
    }
}