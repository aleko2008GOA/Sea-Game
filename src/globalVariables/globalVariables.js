const animations = {
    // background sea
    sea: {
        waveSpeed: 1000,
        seaAnimationFrameId: null,
        seaFrameFunc: null
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
        gameWinLose: false,
        pause: false
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
    // device
    device: null,
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

    charWidthHeight: 50,
    charMaxSpeed60FPS: 2,
    charDeltaSpeed60FPS: 0.02
}

export { animations, parameters };