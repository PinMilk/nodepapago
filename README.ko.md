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
## 표
### 설정
| 키 | 설명 | 타입 | 필수 | 기본값 |
| ---- | ---- | ---- | ---- | ---- |
| `parameter` | [매개변수 (리스트)]](#매개변수) | `TranslateParameter \| TranslateParameter[]` | Y | `-` |
| `honorfic` | 높임말 | `boolean` | N | `false` |
| `verbose` | 결과를 json으로 내보낼 지 결정합니다. | `boolean` | N | `false` |
| `multi` | 다중 번역 | `boolean` | N | `false` |
### 매개변수
| 프로퍼티 | 설명 | 타입 | 필수 | 기본값 |
| ---- | ---- | ---- | ---- | ---- |
| `source` | 원본 텍스트 언어 코드 | `string` | N | `detect` |
| `target` | 번역할 텍스트 언어 코드| `string` | Y | `-` |
| `text` | 번역할 문장 | `string` | Y | `-` |
### 언어 감지
| 매개변수 | 설명 | 타입 | 필수 |
| ---- | ---- | ---- | ---- |
| `text` | 언어를 감지할 문장 | `string` | Y |
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
## 변경점
### v2.2.1
`해싱 알고리즘 변경`
### v2.2.4
`해싱 알고리즘 변경`
### v3.0.0
`전체 소스 변경`
## 라이선스
nodepapago는 MIT 라이선스를 따릅니다.