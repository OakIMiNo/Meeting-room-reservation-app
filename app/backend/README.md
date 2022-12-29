-  backendディレクトリの構成
 cruds, models, routers, schemas ディレクトリにテーブルごとにファイル作成
<pre>
C:.
│  
├─api
│  ├─cruds 
│  ├─models  dbのテーブル
│  ├─routers API
│  ├─schemas APIのリクエストやレスポンスの型を定義用
│  ├─db.py   dbとの接続設定
│  ├─migrate_db.py 
│  ├─main.py ルートファイル
│  ├─__init.py__
│  └─sample.py pytest挙動確認用のファイル。削除可
├─tests 
├─Dockerfile
├─poetry.lock
├─pyproject.toml
└─READ.ME
</pre>

