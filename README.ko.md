# nodepapago - 비공식 파파고 라이브러리.
[![TypeScript](https://img.shields.io/badge/Built%20with-Typescript-informational?logo=typescript)](https://www.typescriptlang.org/)
[![Passed](https://img.shields.io/badge/Build-Passed-success)](#)
[![License](https://img.shields.io/github/license/pinmilk/nodepapago)](#)
- Note: It can stop working anytime.
- 전달: 이 프로그램은 언제라도 작동을 멈출 수 있습니다.

[![NPM](https://nodei.co/npm/nodepapago.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nodepapago/)
## 설치
```
npm install nodepapago
```
## Github
`https://github.com/PinMIlk/nodepapago`
## npm
`https://www.npmjs.com/package/nodepapago`
## 예시
### Translate
```typescript
import Translator from "nodepapago";

new Translator().translate('en', 'ko', 'You\'re fucking weak.')
    .then(res => console.log(res))
    .catch(e => console.log(e));
// Expected output: 넌 약해빠졌어

new Translator().translate('detect', 'ko', 'You\'re fucking weak.')
    .then(res => console.log(res))
    .catch(e => console.log(e));
// Expected output: 넌 약해빠졌어(자동 감지)
```

### Multi Translate
```typescript
import Translator from "nodepapago";

new Translator().multiTranslate('en', 'ko', ['You\'re fucking weak.', 'Holy...', 'Jesus Christ'])
    .then(res => console.log(res))
    .catch(e => console.log(e));
// Expected output: ['넌 약해빠졌어', '이런...', '놀래라.']
```

### CommonJS
```javascript
const Translator = require("nodepapago").default;

new Translator().translate('en', 'ko', 'You\'re fucking weak.')
    .then(res => console.log(res))
    .catch(e => console.log(e));

new Translator().multiTranslate('en', 'ko', ['You\'re fucking weak.', 'Holy...', 'Jesus Christ'])
    .then(res => console.log(res))
    .catch(e => console.log(e));
```
## 언어 코드
| 코드 | 언어 |
|----|----|
| `ko` | 한국어 |
| `en` | 영어 |
| `ja` | 일본어 |
| `zh-cn` | 중국어(간체) |
| `zh-tw` | 중국어(번체) |
| `hi` | 힌디어 |
| `es` | 에스파냐어 |
| `fr` | 프랑스어 |
| `de` | 독일어 |
| `pt` | 포르투갈어 |
| `vi` | 베트남어 |
| `id` | 인도네시아어 |
| `fa` | 페르시아어 |
| `ar` | 아랍어 |
| `mm` | 미얀마어 |
| `th` | 태국어 |
| `ru` | 러시아어 |
| `it` | 이탈리아어 |
| `detect` | 자동 감지 |
## 라이선스
nodepapago는 MIT 라이선스를 따릅니다.