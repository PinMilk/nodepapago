import { Translator } from "./";

new Translator().translate('detect', 'ko', 'So far, so good!')
    .then(res => console.log(res))
    .catch(e => console.log(e));

new Translator().multiTranslate('en', 'ko', ['Morning, sir', 'Morning, ma\'am'], {
    honorfic: true,
    verbose: false
})
    .then(res => console.log(res))
    .catch(e => console.log(e));

new Translator().detect('So far, so bueno!')
    .then(res => console.log(res))
    .catch(e => console.log(e));