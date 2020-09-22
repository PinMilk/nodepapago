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
"use strict";
const Translator = require("nodepapago").default;

new Translator().translate('en', 'ko', 'You\'re fucking weak.')
    .then(res => console.log(res))
    .catch(e => console.log(e));

new Translator().multiTranslate('en', 'ko', ['You\'re fucking weak.', 'Holy...', 'Jesus Christ'])
    .then(res => console.log(res))
    .catch(e => console.log(e));
```

## 라이선스
nodepapago는 MIT 라이선스를 따릅니다..
## References
- genUUID - 2020DevelopingKakaotalkBot([papago-kakao-bot](https://github.com/2020DevelopingKakaotalkBot/papago-kakao-bot))