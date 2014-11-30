KMB Ver.1.0 produce by 遠藤

【攻撃場所に必要なもの】
・HTTPサーバソフトウェア
・HTTPクライアントソフトウェア（ブラウザ）
　　└WebSocketに対応していること
・PHP実行環境
・IPアドレス（LAN接続）

【防御場所に必要なもの】
・HTTPクライアントソフトウェア（ブラウザ）
　　└WebSocketに対応していること

【使い方】
１．HTTPサーバを立ち上げる
２．appproc\server\server.batを実行する
３．攻撃場所のブラウザを立ち上げてhttp://127.0.0.1/（appprocまでのパス）/appproc/にアクセス
４．防御場所のブラウザを立ち上げてhttp://（IPアドレス）/（appprocまでのパス）/appproc/にアクセス

【その他】
server.batが実行されていない、または防御場所が存在しない場合は、
キャラクター転送を行わずに独立して動作します。
