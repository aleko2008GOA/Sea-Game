const animations = {
    // background sea
    sea: {
        waveSpeed: 1000,
        seaFrameFunc: null,
        seaAnimationFrameId: false
    },
    // text generating
    generator: {
        interval: null,
        intervalFunc: null,
        eventListenersAdded: false,
        eventListenerFunc: null
    },
    // game moment
    moment: {
        notLoaded: true,
        startSrceen: false,
        generating: false,
        loseWinPause: false,
        gameProcess: false,
        gameWinLose: false,
        pause: false
    },
    // character
    animationFrameFunc: null,
    animationFrameId: false,

    stunFrameId: false,
    stunFunc: null,

    immutableFunc: null,
    immutableFrameId: false,
    
    eventListenersAdded: false,

    allFrameId: null,
    allFrameFunc: null
}

const parameters = {
    // device
    device: null,
    // health
    hearts: 3,
    // lights
    collected: 0,
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
    charMaxSpeed60FPSMobile: {
        left: 0, right: 0, up: 0, down: 0
    },
    positionMobile: {
        x: 0, y: 0
    },
    charDeltaSpeed60FPS: 0.02,
    lastStamp: null,
    gameStarted: false,
    // object sizes
    standartSize: {
        chunck: {
            width: 300,
            height: 300
        },
        canvas: {
            width: 3000,
            height: 3000
        },
        screen: {
            width: 800,
            height: 450,
        },
        instructions: {
            width: 300,
            minHeight: 100,
            maxHeight: 300 
        },
        joystick: {
            width: 225,
            height: 225,
            joisticRadius: 65,
            joisticCircleRadius: 40
        },

        character: {
            width: 50,
            height: 50
        },
        iceberg: {
            width: 50,
            height: 50
        },
        light: {
            width: 50,
            height: 50
        },
        wave: {
            fullWidth: 30,
            fullHeight: 15,
            imgWidth: 20,
            imgHeight: 5
        }
    },
    defaultScreen: {
        width: 800,
        height: 450,
    },

    images: {
        characterImages: null
    },
    FPS: 'auto'
}

export { animations, parameters };