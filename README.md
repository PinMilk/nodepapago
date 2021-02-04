# nodePapago - Unofficial papago translator.
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
```typescript
import { Translator } from "nodepapago";

new Translator().translate('detect', 'ko', 'So far, so good!')
    .then(res => console.log(res))
    .catch(e => console.log(e));
// Expected output: '지금까지, 잘했어!'

new Translator().multiTranslate('en', 'ko', ['Morning, sir', 'Morning, ma\'am'], {
    honorfic: true,
    verbose: false
})
    .then(res => console.log(res))
    .catch(e => console.log(e));
// Expected output: ['안녕하세요, 손님.', '안녕하세요, 부인']

new Translator().detect('So far, so bueno!')
    .then(res => console.log(res))
    .catch(e => console.log(e));
// Expected output: 'it'
```
## Parameter
### Just translation
| Parameter | Detail | Type | Required | default |
| ---- | ---- | ---- | ---- | ---- |
| `source` | Oringin language code | `string` | N | `detect` |
| `target` | Target language code | `string` | Y | `-` |
| `text` | Text to be translated | `string` | Y | `-` |
| `config` | Translation config | `TranslatorConfig` | N | [Config table](#config-table) |
### Multi translation
| Parameter | Detail | Type | Required | default |
| ---- | ---- | ---- | ---- | ---- |
| `source` | Oringin language code | `string` | N | `detect` |
| `target` | Target language code | `string` | Y | `-` |
| `contents` | Text array to be translated | `Array<string>` | Y | `-` |
| `config` | Translation config | `TranslatorConfig` | N | [Config table](#config-table) |
### Language detect
| Parameter | Detail | Type | Required |
| ---- | ---- | ---- | ---- |
| `text` | Text to be detected language | `string` | Y |
### Config table
| Key | Detail | Type | Required | Default |
| ---- | ---- | ---- | ---- | ---- |
| `honorfic` | Respectability(Widely used in East Asian languages) | `boolean` | N | `false` |
| `verbose` | If it is true, returns with raw json | `boolean` | N | `false` |
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
### 2.2.1
`Changed hashing algorithm`
## License
It is following MIT License.