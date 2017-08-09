function aboutToEvolve(aliceName) {
    // speak
    console.log('about to evolve')
    return aliceSpeak(aliceName, 'I am about to evolve')
}

function swapToRaichu() {
    return Promise.resolve($('.creature .pikachu').css('opacity', 0))
        .then(() => $('.creature .raichu').css('opacity', 1))

}

function swapToPikachu() {
    return Promise.resolve($('.creature .pikachu').css('opacity', 1))
        .then(() => $('.creature .raichu').css('opacity', 0))

}

function changeModel() {
    return swapToRaichu()
        .then(() => wait(50))
        .then(swapToPikachu)
        .then(() => wait(50))
        .then(swapToRaichu)
        .then(() => wait(50))
        .then(swapToPikachu)
        .then(() => wait(60))
        .then(swapToRaichu)
        .then(() => wait(70))
        .then(swapToPikachu)
        .then(() => wait(80))
        .then(swapToRaichu)
        .then(() => wait(100))
        .then(swapToPikachu)
        .then(() => wait(120))
        .then(swapToRaichu)
        .then(() => wait(140))
        .then(swapToPikachu)
        .then(() => wait(160))
        .then(swapToRaichu)
        .then(() => wait(180))
        .then(swapToPikachu)
        .then(() => wait(200))
        .then(swapToRaichu)
        .then(() => wait(220))
        .then(swapToPikachu)
        .then(() => wait(240))
        .then(swapToRaichu)
        .then(() => wait(260))
        .then(swapToPikachu)
        .then(() => wait(280))
        .then(swapToRaichu)
        .then(() => wait(300))
}

function evolve(aliceName) {
    console.log('evolve')
    return Promise.all([
        aliceSpeak(aliceName, 'pak pak pak'),
        wait(100).then(() => changeModel())
    ])
}

function afterEvolve(aliceName) {
    console.log('after evolve')
    return aliceSpeak(aliceName, 'Hello, Master!')
}

function showQuit(aliceName) {
    $('.exit').fadeIn('fast')
    return aliceSpeak(aliceName, 'That is the end of the demo, Thank you for trying!')
}

function main(aliceName) {
    // showQuit()
    aboutToEvolve(aliceName)
        .then(() => evolve(aliceName))
        .then(() => afterEvolve(aliceName))
        .then(() => wait(2000))
        .then(() => showQuit(aliceName))
}
