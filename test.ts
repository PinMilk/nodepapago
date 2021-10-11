import Translator from './'

new Translator({
    parameter: {
        target: 'ko',
        text: 'So far, so good!'
    },
    honorific: false
}).translate()
    .then(res => console.log(res))
    .catch(e => console.log(e))

new Translator({
    parameter: [
        {
            source: 'en',
            target: 'ko',
            text: 'Morning, sir.'
        },
        {
            source: 'en',
            target: 'ko',
            text: 'Morning, ma\'am.'
        }
    ],
    honorific: true
}).translate()
    .then(res => console.log(res))
    .catch(e => console.log(e))

new Translator({
    parameter: [
        {
            source: 'en',
            target: 'ko',
            text: 'Morning!'
        },
        {
            source: 'en',
            target: 'ko',
            text: 'Morning, baby!'
        }
    ],
    verbose: true
}).translate()
    .then(res => console.log(res))
    .catch(e => console.log(e))

Translator.detect('So far, so bueno!')
    .then(res => console.log(res))
    .catch(e => console.log(e))
