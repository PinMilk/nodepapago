import { Translator } from "./";

new Translator().translate('en', 'ko', 'You\'re fucking weak.')
    .then(res => console.log(res))
    .catch(e => console.log(e));

new Translator().multiTranslate('en', 'ko', ['You\'re fucking weak.', 'Holy...', 'Jesus Christ'])
    .then(res => console.log(res))
    .catch(e => console.log(e));