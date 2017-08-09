const state = {
    nameCandidate: null,
    name: null
}

function greeting() {
    return aliceSpeak(null, 'Hello, Master')
        .then(() => aliceSpeak(null, 'What is my name ?'))
}

function toggleMic(mic) {
    console.log('toggel mic')
    const obj = $('.mic .btn-mic')
    obj.toggleClass('active')

    if (obj.hasClass('active')) {
        if (!state.nameCandidate) {
            startNaming(mic)
        } else {
            startConfirm(mic)
        }
    } else {
        if (!state.nameCandidate) {
            stopNaming(mic)
        } else {
            stopConfirm(mic)
        }
    }
}

function startNaming(mic) {
    console.log('start naming')
    mic.clear()
    mic.listen(text => {
        myDialog(text.trim())
    })
}

function getName(text) {
    const m = /your.+name.+is(.+)/g.exec(text)
    if (m) {
        return m[1]
    } else {
        return null
    }
}

function stopNaming(mic) {
    console.log('stop naming')
    const str = mic.get()
    mic.clear()
    mic.listen(null)

    console.log('str:', str)
    const text = str.trim()
    myDialog(text)

    let name = getName(text)
    console.log('name:', name)
    if (name) {
        name = name.trim()
        confirmNaming(name)
    } else {
        aliceSpeak(null, `I don't understand, please try again`)
    }
}

function confirmNaming(name) {
    console.log('confirm naming')

    state.nameCandidate = name

    aliceSpeak(null, `So, my name is ${name}, right ?`)
}

function startConfirm(mic) {
    mic.clear()
    mic.listen(text => {
        myDialog(text.trim())
    })
}

function stopConfirm(mic) {
    const text = mic.get()
    mic.listen(null)

    if (text.match(/yes|right/g)) {
        doneNaming(state.nameCandidate)
    } else if (text.match(/no|(try.+again)/g)) {
        state.nameCandidate = null
        aliceSpeak(null, `Okay, what is my name, then ?`)
    } else {
        aliceSpeak(null, `I don't understand, please try again`)
    }
}

function doneNaming(name) {
    console.log('done naming')

    state.name = name

    aliceSpeak(state.name, `Nice to meet you, master!`)
        .then(() => popup())
}

function popup() {
    $('#alice-dialog-wrapper').finish()
    $('.modal').modal({
        backdrop: 'static',
        keyboard: false
    })

    speak('Congratulations ! you just finished, Name Your Alice, with perfect score!')
}

function nextStep() {
    console.log('next step')

    window.location.href = `scene_4.html#${state.name}`
}

function main() {
    const mic = initMic()

    // greeting()
    // $('.btn-mic').click(() => toggleMic(mic))

    popup()
}
