import globalData from "../const/globalData";
import levels from "../const/levels";
import utils from "../utils";
import Box from "./Box";

export default class BoxManager {
    constructor() {

        /**
         * @type {Array<Array<Box>>}
         */
        this.boxes = [];

        /**
         * @type {Array<Box>}
         */
        this.activeBoxes = [];

        this.isCanClickBox = true;

        this.checkCompleteDebounce = utils.debounce(this.checkComplete, 500);
        this.onSetLevel = () => {};
        this.onBoxCllick = () => {};
        this.onLevelComplete = () => {};
        this.onStartCompleteAnimation = () => {};

        this.currentLevel = 0;

        const boxeElemements = Array.from(document.getElementsByClassName("box")) || [];
        let y = 0;
        let x = 0;
        boxeElemements.forEach(boxEl => {
            if (x === 0) this.boxes[y] = [];

            const box = new Box(boxEl, x, y, this.handleBoxClick.bind(this));
            this.boxes[y][x] = box;
            x += 1;
            if (x === globalData.box.totalBoxPerRow) {
                x = 0;
                y += 1;
            }
        });
    }

    init() {
        this.activeBoxes.length = 0;
        this.isCanClickBox = true;
    }

    setEvent(onSetLevel = () => {}, onBoxCllick = () => {}, onStartCompleteAnimation = () => {}, onLevelComplete = () => {}) {
        this.onSetLevel = onSetLevel;
        this.onBoxCllick = onBoxCllick;
        this.onLevelComplete = onLevelComplete;
        this.onStartCompleteAnimation = onStartCompleteAnimation;
    }

    /**
     * 
     * @param {number} level 
     */
    setLevel(level) {
        this.init();
        this.currentLevel = level;

        levels[level].forEach((subLevel, y) => {
            subLevel.forEach((idx, x) => {
                const box = this.boxes[y][x];
                box.init(idx);

                if (idx !== 0) this.activeBoxes.push(box);
            });
        });

        this.onSetLevel();
    }

    checkComplete() {
        
        let isComplete = true;

        for (let i = 0; i < this.activeBoxes.length; i += 1) {
            if (!this.activeBoxes[i].isFilled) {
                isComplete = false;
                break;
            }
        }

        if (isComplete) {
            // this.setLevel(this.currentLevel + 1);
            for (let i = 0; i < this.activeBoxes.length; i += 1) {
                this.activeBoxes[i].addCompleteEffect();
            }
            this.isCanClickBox = false;
            this.onStartCompleteAnimation();
            setTimeout(() => {
                this.onLevelComplete();
            }, 1000);
        }
    }

    handleBoxClick(posX, posY) {
        if (!this.isCanClickBox) return;

        // this.isCanClickBox = false;
        this.changeShapeOfBox(posX, posY);
        this.changeShapeOfBox(posX + 1, posY);
        this.changeShapeOfBox(posX - 1, posY);
        this.changeShapeOfBox(posX, posY + 1);
        this.changeShapeOfBox(posX, posY - 1);

        this.checkCompleteDebounce();
        this.onBoxCllick();

        // setTimeout(() => {
        //     this.isCanClickBox = true;
        // }, 250);
    }

    changeShapeOfBox(posX, posY) {
        if(posX < 0 || posX >= globalData.grid.totalBoxPerRow || posY < 0 || posY >= globalData.grid.totalRow) return;

        this.boxes[posY][posX].changeShape();
    }
}