# nodePapago - Unofficial papago translator.
[![TypeScript](https://img.shields.io/badge/Built%20with-Typescript-informational?logo=typescript)](https://www.typescriptlang.org/)
[![Passed](https://img.shields.io/badge/Build-Passed-success)](#)
[![License](https://img.shields.io/github/license/pinmilk/nodepapago)](#)
- Note: It can stop working anytime.

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
// Expected output: 'it'
```
## Table
### Config
| Property | Detail | Type | Required | Default |
| ---- | ---- | ---- | ---- | ---- |
| `parameter` | [Translate parameter (list)](#Parameter) | `TranslateParameter \| TranslateParameter[]` | Y | `-` |
| `honorfic` | Respectability(Widely used in East Asian languages) | `boolean` | N | `false` |
| `verbose` | If it is true, returns with raw json | `boolean` | N | `false` |
| `multi` | Multi translation | `boolean` | N | `false` |
### Parameter
| Property | Detail | Type | Required | Default |
| ---- | ---- | ---- | ---- | ---- |
| `source` | Oringin language code | `string` | N | `detect` |
| `target` | Destination language code | `string` | Y | `-` |
| `text` | Text to be translated | `string` | Y | `-` |
### Language detect
| Parameter | Detail | Type | Required |
| ---- | ---- | ---- | ---- |
| `text` | Text to be detected language | `string` | Y |
## Language code table
| Code | Language |
|----|----|
| `ko` | Korean |
| `en` | English |
| `ja` | Japanese |
| `zh-cn` | Chinese(Simplified) |
| `zh-tw` | Chinese(Traditional) |
| `hi` | Hindi |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `pt` | Portuguese |
| `vi` | Vietnamese |
| `id` | Indonesian |
| `fa` | Persian |
| `ar` | Arabic |
| `mm` | Myanmar |
| `th` | Thai |
| `ru` | Russian |
| `it` | Italian |
| `detect` | Auto detect |
## Release
### v2.2.1
* `Changed hashing algorithm`
### v2.2.4
* `Changed hashing algorithm`
### v3.0.0
* `Changed all source`
### v3.0.1
* `Changed hashing algorithm`
### v3.1.0
* `Changed hashing algorithm`
* `Modularized`
* ### v3.1.1
* `Changed UUID Generation`
* `Little Lightweight`
* `Changed README.md File Language(English → Korean)`
## License
It is following MIT License.