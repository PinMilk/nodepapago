# nodepapago - 非公式のPapagoライブラリ。
[![TypeScript](https://img.shields.io/badge/Built%20with-Typescript-informational?logo=typescript)](https://www.typescriptlang.org/)
[![Passed](https://img.shields.io/badge/Build-Passed-success)](#)
[![License](https://img.shields.io/github/license/pinmilk/nodepapago)](#)
- 注意：このプログラムは、いつでも動作しなくなる可能性があります。
- [한국어](./README.md)
- [English](./README.en.md)

[![NPM](https://nodei.co/npm/nodepapago.svg)](https://nodei.co/npm/nodepapago/)

## インストール
```
npm install nodepapago
```
## Github
`https://github.com/PinMIlk/nodepapago`
## npm
`https://www.npmjs.com/package/nodepapago`
## 使用例
Papagoの翻訳モデルによって、実際の翻訳文は以下の想定結果と異なる場合があります。

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
// 想定結果: '지금까지, 너무 좋아요!'

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
// 想定結果: [ '안녕하세요, 선생님.', '안녕하세요, 부인.' ]

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
// 想定結果: 非常に長いJSON出力のため省略...

Translator.detect('So far, so bueno!')
    .then(res => console.log(res))
    .catch(e => console.log(e));
// 想定結果: 'en'（Papagoの言語検出結果は変わる場合があります。）
```
## 仕様一覧
### 設定
| キー | 説明 | 型 | 必須 | 既定値 |
| ---- | ---- | ---- | ---- | ---- |
| `parameter` | [翻訳パラメーター（リスト）](#パラメーター) | `TranslateParameter \| TranslateParameter[]` | Y | `-` |
| `honorific` | 敬語を使用する | `boolean` | N | `false` |
| `verbose` | 結果を生のJSONで返すかどうか | `boolean` | N | `false` |
| `multi` | 複数のテキストを翻訳する | `boolean` | N | `false` |
### パラメーター
| プロパティ | 説明 | 型 | 必須 | 既定値 |
| ---- | ---- | ---- | ---- | ---- |
| `source` | 原文の言語コード | `string` | N | `detect` |
| `target` | 翻訳先の言語コード | `string` | Y | `-` |
| `text` | 翻訳するテキスト | `string` | Y | `-` |
### 言語検出
| パラメーター | 説明 | 型 | 必須 |
| ---- | ---- | ---- | ---- |
| `text` | 言語を検出するテキスト | `string` | Y |
## 言語コード
| コード | 言語 |
|----|----|
| `ko` | 韓国語 |
| `en` | 英語 |
| `ja` | 日本語 |
| `zh-cn` | 中国語（簡体字） |
| `zh-tw` | 中国語（繁体字） |
| `hi` | ヒンディー語 |
| `es` | スペイン語 |
| `fr` | フランス語 |
| `de` | ドイツ語 |
| `pt` | ポルトガル語 |
| `vi` | ベトナム語 |
| `id` | インドネシア語 |
| `fa` | ペルシア語 |
| `ar` | アラビア語 |
| `mm` | ビルマ語 |
| `th` | タイ語 |
| `ru` | ロシア語 |
| `it` | イタリア語 |
| `detect` | 自動検出 |
## ローカルビルドと翻訳テスト
```bash
npx tsc
node test.js
```
複数のテキストの翻訳中にリクエストが失敗すると、`translate()`がrejectされるため、`.catch()`でエラーを処理できます。

## 変更履歴
### v2.2.1
* `ハッシュアルゴリズムを変更`
### v2.2.4
* `ハッシュアルゴリズムを変更`
### v3.0.0
* `ソースコード全体を書き換え`
### v3.0.1
* `ハッシュアルゴリズムを変更`
### v3.1.0
* `ハッシュアルゴリズムを変更`
* `モジュール化`
### v3.1.1
* `UUIDの生成方法を変更（従来のPapago方式 → UUIDモジュール）`
* `若干の軽量化`
* `README.mdの既定の言語を韓国語に変更`
### v3.2.0
* `ハッシュアルゴリズムを変更`
## ライセンス
nodepapagoはMITライセンスに基づいて提供されています。
