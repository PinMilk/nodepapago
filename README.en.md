# nodepapago - Unofficial Papago library.
[![TypeScript](https://img.shields.io/badge/Built%20with-Typescript-informational?logo=typescript)](https://www.typescriptlang.org/)
[![Passed](https://img.shields.io/badge/Build-Passed-success)](#)
[![License](https://img.shields.io/github/license/pinmilk/nodepapago)](#)
- Note: It can stop working anytime.
- [한국어](./README.md)
- [日本語](./README.JA.md)

[![NPM](https://nodei.co/npm/nodepapago.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nodepapago/)

## Installation
```
npm install nodepapago
```
## Github
`https://github.com/PinMIlk/nodepapago`
## npm
`https://www.npmjs.com/package/nodepapago`
## Examples
Actual translations may differ from the expected outputs below depending on Papago's translation model.

```typescript
import Translator from 'nodepapago';

new Translator({
    parameter: {
        target: 'ko',
        text: 'So far, so good!'
    }
}).translate()
    .then(res => console.log(res))
    .catch(e => console.log(e));
// Expected output: '지금까지, 너무 좋아요!'

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
    .catch(e => console.log(e));
// Expected output: [ '안녕하세요, 선생님.', '안녕하세요, 부인.' ]

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
    .catch(e => console.log(e));
// Expected output: sooooo long...

Translator.detect('So far, so bueno!')
    .then(res => console.log(res))
    .catch(e => console.log(e));
// Expected output: 'en' (Papago's language detection results may change.)
```
## Reference tables
### Configuration
| Key | Description | Type | Required | Default |
| ---- | ---- | ---- | ---- | ---- |
| `parameter` | [Translation parameters (list)](#parameters) | `TranslateParameter \| TranslateParameter[]` | Y | `-` |
| `honorific` | Use honorific language | `boolean` | N | `false` |
| `verbose` | Return the result as raw JSON | `boolean` | N | `false` |
| `multi` | Translate multiple texts | `boolean` | N | `false` |
### Parameters
| Property | Description | Type | Required | Default |
| ---- | ---- | ---- | ---- | ---- |
| `source` | Source text language code | `string` | N | `detect` |
| `target` | Target language code | `string` | Y | `-` |
| `text` | Text to be translated | `string` | Y | `-` |
### Language detection
| Parameter | Description | Type | Required |
| ---- | ---- | ---- | ---- |
| `text` | Text whose language should be detected | `string` | Y |
## Language codes
| Code | Language |
|----|----|
| `ko` | Korean |
| `en` | English |
| `ja` | Japanese |
| `zh-cn` | Chinese (Simplified) |
| `zh-tw` | Chinese (Traditional) |
| `hi` | Hindi |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `pt` | Portuguese |
| `vi` | Vietnamese |
| `id` | Indonesian |
| `fa` | Persian |
| `ar` | Arabic |
| `mm` | Burmese |
| `th` | Thai |
| `ru` | Russian |
| `it` | Italian |
| `detect` | Automatic detection |
## Local build and translation tests
```bash
npx tsc
node test.js
```
If a request fails during multi-text translation, `translate()` rejects, so you can handle the error with `.catch()`.

## Changelog
### v2.2.1
* `Changed hashing algorithm`
### v2.2.4
* `Changed hashing algorithm`
### v3.0.0
* `Rewrote the entire source code`
### v3.0.1
* `Changed hashing algorithm`
### v3.1.0
* `Changed hashing algorithm`
* `Modularized`
### v3.1.1
* `Changed UUID generation (Papago's original method → UUID module)`
* `Slightly reduced the library's footprint`
* `Changed the default language of README.md to Korean`
### v3.2.0
* `Changed hashing algorithm`
## License
nodepapago is licensed under the MIT License.
