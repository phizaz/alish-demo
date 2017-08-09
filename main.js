function speak(text) {
    return new Promise((res, rej) => {
        responsiveVoice.speak(text, "UK English Male", {
            pitch: 1, rate: 1,
            onend() {
                res()
            }
        });
    })
}

function aliceDialog(name, text) {
    return new Promise((res, rej) => {
        let str = ''
        if (name) {
            str += `<i>${name}:</i> `
        }
        str += text
        $('#alice-dialog').html(str)
        $('#alice-dialog-wrapper')
            .finish()
            .fadeTo('normal', 1)
            .delay(7000)
            .fadeTo('fast', 0)
        res()
    })
}

function aliceSpeak(name, text) {
    return Promise.all([
        speak(text),
        aliceDialog(name, text)
    ])
}


function myDialog(text) {
    return new Promise((res, rej) => {
        if (!text.trim()) {
            res()
            return
        }

        const current = $('#my-dialog').html()
        if (current == text) {
            res()
            return
        }

        $('#my-dialog').html(text)
        $('#my-dialog-wrapper')
            .finish()
            .fadeTo('normal', 1)
            .delay(4000)
            .fadeTo('fast', 0)
        res()
    })
}


function wait(ms) {
    console.log('wait for', ms, 'ms')
    return new Promise((res, rej) => {
        setTimeout(res, ms)
    })
}

function initMic() {
    var listener

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

    if (SpeechRecognition) {
        var speechRecognizer = new SpeechRecognition();
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = 'en-US';
        speechRecognizer.start();

        var finalFast = '';

        speechRecognizer.onresult = (e) => {
            var finalTranscripts = '';
            var interimTranscripts = '';
            for (var i = e.resultIndex; i < e.results.length; i++) {
                var transcript = e.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if (e.results[i].isFinal) {
                    finalTranscripts += transcript;
                } else {
                    interimTranscripts += transcript;
                }
            }
            finalFast = finalTranscripts + interimTranscripts
            console.log('transcripts:', finalFast)
            if (listener) {
                listener(finalFast)
            }
        }

        speechRecognizer.onerror = (e) => {
            console.error(e)
        }
    } else {
        throw Error('browser not supported')
    }

    return {
        get() {
            return finalFast
        },

        listen(fn) {
            listener = fn
        },

        clear() {
            finalTranscripts = ''
        }
    }
}

