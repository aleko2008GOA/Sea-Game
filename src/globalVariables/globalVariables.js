const animations = {
    // background sea
    sea: {
        waveSpeed: 1000,
        seaAnimationFrameId: null
    },
    // text generating
    generator: {
        interval: null,
        intervalFunc: null
    },
    // game moment
    moment: {
        startSrceen: false,
        generating: false,
        loseWinPause: false,
        gameProcess: false,
        gameWinLose: false
    },
    // character
    animationFrameId: null,
    animationFrameFunc: null,

    stunFunc: null,
    stunFrameId: null,

    immutableFunc: null,
    immutableFrameId: null,
    
    eventListenersAdded: false,
}

const parameters = {
    // health
    hearts: 3,
    // other
    speed: {
        left: 0, right: 0, up: 0, down: 0
    },
    immutable: true,
    timeInterval: null,
    timeChangeFunc: null,
    time: 300,
}

export { animations, parameters };