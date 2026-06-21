# 海のいきもの クロスワード ＆ タイピング

## 構成
- index.html … トップ。クリアごとに次が解放（①クリアで「同難易度②」と「次難易度①」が解放）。15ステージ→生物学者編150×150。
- e1–e3 / m1–m3 / h1–h3 / u1–u3 / g1–g3 / boss … 各難易度の3パターンは **語・答え・キーワードがすべて異なる独立パズル**。
- typing.html … タイピングゲーム（クリア済みステージがコースになる）。typing_words.js / typing_phrases.js / typing_stages.js を同梱。
- leaderboard.gs … 共有ランキング用 Google Apps Script（任意）。

## 公開（Vercel）
このフォルダごとデプロイ（Framework: Other／Build なし）。進行・キーワード・ハイスコアは localStorage。

## 共有ランキング（友達・別PCと競う／任意）
1. leaderboard.gs を https://script.google.com に貼り、「ウェブアプリ」としてデプロイ（実行：自分／アクセス：全員）。
2. 表示された URL を typing.html 先頭の  const LB_ENDPOINT = "";  の "" 内に貼って保存・再デプロイ。
→ 別端末からも同じ「みんなのランキング」が見えます。空のままなら各端末ローカル記録。
