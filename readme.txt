KMB Ver.1.0 produce by 遠藤

▼攻撃場所端末に必要なもの
・HTTPサーバ
・ブラウザ
　　└WebSocketに対応していること
・PHP実行環境
・LAN接続

▼防御場所端末に必要なもの
・ブラウザ
　　└WebSocketに対応していること
・LAN接続

▼使い方
１．攻撃場所でHTTPサーバを立ち上げる
２．攻撃場所でappproc\server\server.batを実行する
３．攻撃場所のブラウザを立ち上げてhttp://127.0.0.1/（appprocまでのパス）/appproc/にアクセス
４．防御場所のブラウザを立ち上げてhttp://（IPアドレス）/（appprocまでのパス）/appproc/にアクセス

▼その他
server.batが実行されていない、または防御場所が存在しない場合は、
場所移動を行わずに独立して動作します。

▼謝辞
イラストを提供して下さった吉野さん
PHPスクリプトを参考にさせていただいたsaaraan.com様
二方に多大なる感謝を。
