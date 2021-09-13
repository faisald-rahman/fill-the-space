const box = {
    totalBoxPerRow: 7,
    boxAnimationTime: 250
}

const grid = {
    totalRow: 7,
    totalBoxPerRow: 7,
}

const level = {
    max: 18
}

const classList = {
    wrapper: {
        gridWrapper: "grids-wrapper",
        subGridWrapper: "sub-grid-wrapper",
    },
    box: {
        box: "box",
        boxHide: "box--hide",
        boxFloat: "box--float",
        childboxWhite: "child-box--white",
        childBox: "child-box",
        childBoxDot: "child-box--dot",
        childBoxHide: "child-box--hide"
    },
    circleTransition: {
        show: "circle-transition--show",
        hide: "circle-transition--hide",
    },
    btn: {
        disabled: "btn--disabled"
    },
    congrat: {
        show: "congrat--show",
        hide: "congrat--hide"
    },
    text: {
        disabled: "text--disabled"
    }
}

const ids = {
    clickCounter: "click-counter",
    levelCounter: "level-counter",
    circleTransition: "circle-transition",
    reset: "reset",
    next: "next",
    prev: "prev",
    congrat: "congrat",
    congratDetail: "congrat-detail",
    playagain: "playagain"
}

const saveKey = {
    maxLevel: "maxLevel",
    maxClick: "maxClick",
    isGameComplete: "isGameComplete"
}

export default {
    box,
    grid,
    level,
    classList,
    ids,
    saveKey
}