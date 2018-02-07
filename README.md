# cadrail
このプログラムはWebブラウザで動作する鉄道模型のレイアウトエディタを目指して作成しています．
現在はエディタとしての機能がほとんどありませんが，以下のURLから試すことができます．
https://akamah.github.io/cadrail/

現在の操作方法：
矢印キー：レールを伸ばす
マウス：カメラの移動


# ローカルでの実行
まず，cadrail/ と同じ階層のディレクトリに [librail](/akamah/librail)を配置してください．
（開発中はnpmのパッケージにGitHubへのリンクとして登録すると手間なので）

その後，
`$ npm install` して
`$ npm run server` すると動作しますので，`localhost:8080`にアクセスしてください．

webpackするときは，`$ npm run build`すると`build/bundle.js`にパックされます．
