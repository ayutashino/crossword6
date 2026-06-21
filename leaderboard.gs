/**
 * 海のいきもの タイピング — 共有ランキング用 Google Apps Script
 *
 * 【セットアップ】
 * 1. https://script.google.com で新規プロジェクトを作成し、このコードを貼り付け。
 * 2. 上部メニュー「デプロイ」→「新しいデプロイ」→種類「ウェブアプリ」。
 *    - 説明：任意
 *    - 次のユーザーとして実行：自分
 *    - アクセスできるユーザー：全員（Anyone）
 *    デプロイして表示される「ウェブアプリの URL」（…/exec）をコピー。
 * 3. typing.html の先頭付近にある
 *      const LB_ENDPOINT = "";
 *    の "" の中に、その URL を貼り付けて保存・再デプロイ。
 * → これで別のPC・スマホからも同じランキングが見え、友達と競えます。
 *
 * データは、このスクリプトに紐づくスプレッドシート（自動作成）に保存されます。
 */

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    // スタンドアロンの場合は専用スプレッドシートを作成して保持
    var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
    if (id) { ss = SpreadsheetApp.openById(id); }
    else {
      ss = SpreadsheetApp.create('umi-typing-leaderboard');
      PropertiesService.getScriptProperties().setProperty('SHEET_ID', ss.getId());
    }
  }
  var sh = ss.getSheetByName('scores');
  if (!sh) {
    sh = ss.insertSheet('scores');
    sh.appendRow(['ts', 'course', 'time', 'name', 'score', 'acc', 'kpm']);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var course = (e && e.parameter && e.parameter.course) || '';
  var time = (e && e.parameter && e.parameter.time) || '';
  var sh = sheet_();
  var rows = sh.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < rows.length; i++) {
    var r = rows[i];
    if (String(r[1]) === String(course) && String(r[2]) === String(time)) {
      out.push({ name: r[3], score: Number(r[4]), acc: Number(r[5]), kpm: Number(r[6]) });
    }
  }
  out.sort(function (a, b) { return b.score - a.score; });
  return json_(out.slice(0, 20));
}

function doPost(e) {
  var data;
  try { data = JSON.parse(e.postData.contents); }
  catch (err) { return json_({ ok: false, error: 'bad json' }); }
  var name = String(data.name || 'ゲスト').slice(0, 12);
  var sh = sheet_();
  sh.appendRow([new Date(), String(data.course || ''), String(data.time || ''),
    name, Number(data.score) || 0, Number(data.acc) || 0, Number(data.kpm) || 0]);
  return json_({ ok: true });
}
