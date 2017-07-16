# ビルド・実行

`$ npm install` からの
`$ npm run build` で頼む

# 開発メモ

## Three.jsおよび型定義のインストール

TypeScript 2.0からは，NPMを通したインストールが推奨されている．
`npm init`など，適切に`package.json`を作成したのちに以下のコマンドを叩いた．

```console
npm install three
npm install @types/three
```

https://github.com/typings/typings

https://gitignore.io でnpm用のやつを生成すること．

それから，Threeの型定義でIterableを使うようなので，以下のうちどれかが必要
* targetを es6にする
* `"lib": ["es2015", "es2015.iterable", "dom"],` を付け加える

新しいが信頼はできない記事がある: https://tyablog.net/2017/03/29/typescript-three-js/

## Webpackするやつ

パックしてくれるので便利．TypeScript + Webpackでググればいくらでも出てくる．

