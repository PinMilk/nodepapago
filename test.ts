import { Translator } from "./";

new Translator().translate('detect', 'ko', 'You\'re fucking weak.')
    .then(res => console.log(res))
    .catch(e => console.log(e));

new Translator().multiTranslate('en', 'ko', ['You\'re fucking weak.', 'Holy...', 'Jesus Christ'])
    .then(res => console.log(res))
    .catch(e => console.log(e));

new Translator().detect('So far, so bueno!')
    .then(res => console.log(res))
    .catch(e => console.log(e));