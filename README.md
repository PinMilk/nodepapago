# nodepapago - Unofficial papago translator.
[![TypeScript](https://img.shields.io/badge/Built%20with-Typescript-informational?logo=typescript)](https://www.typescriptlang.org/)
[![Passed](https://img.shields.io/badge/Build-Passed-success)](#)
[![License](https://img.shields.io/github/license/pinmilk/nodepapago)](#)
- Note: It can stop working anytime.
- [Korean Reference](./README.ko.md)

[![NPM](https://nodei.co/npm/nodepapago.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nodepapago/)

## Install
```
npm install nodepapago
```
## Github
`https://github.com/PinMIlk/nodepapago`
## npm
`https://www.npmjs.com/package/nodepapago`
## Example
### General
```typescript
import Translator from "nodepapago";

new Translator().translate('en', 'ko', 'You\'re fucking weak.')
    .then(res => console.log(res))
    .catch(e => console.log(e));
// Expected output: 넌 약해빠졌어
```

### Multi
```typescript
import Translator from "nodepapago";

new Translator().multiTranslate('en', 'ko', ['You\'re fucking weak.', 'Holy...', 'Jesus Christ'])
    .then(res => console.log(res))
    .catch(e => console.log(e));
// Expected output: ['넌 약해빠졌어', '이런...', '놀래라.']
```

### CommonJS
```javascript
"use strict";
const Translator = require("nodepapago").default;

new Translator().translate('en', 'ko', 'You\'re fucking weak.')
    .then(res => console.log(res))
    .catch(e => console.log(e));

new Translator().multiTranslate('en', 'ko', ['You\'re fucking weak.', 'Holy...', 'Jesus Christ'])
    .then(res => console.log(res))
    .catch(e => console.log(e));
```
## License
It is following MIT License.