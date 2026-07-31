# 手動確認表

要件定義書「16-4. 手動確認」に沿って結果を記録する。自動化できる項目はPlaywrightでも再確認する。

| 確認項目 | 環境・条件 | 結果 | 備考 |
|---|---|---|---|
| レスポンシブ | 375px | 成功 | 全9ページをPlaywright、トップを目視で確認 |
| レスポンシブ | 768px | 成功 | 全9ページをPlaywright、フォームを目視で確認 |
| レスポンシブ | 1024px | 成功 | 全9ページをPlaywright、サービスを目視で確認 |
| レスポンシブ | 1440px | 成功 | 全9ページをPlaywright、事例詳細を目視で確認 |
| 横スクロール | 320px〜1920px | 成功 | 320、360、375、768、1024、1280、1440、1920pxで全9ページを確認 |
| 拡大表示 | 200％ | 成功 | 1280px表示領域の200％相当となる640 CSS pxで全9ページのリフローを確認 |
| ブラウザ | Chrome | 成功 | Playwright Chromiumで全E2Eを確認 |
| ブラウザ | Firefox | 成功 | Playwright Firefoxで全E2Eを確認 |
| ブラウザ | Safari | 成功（エンジン確認） | 実機Safariの代替としてPlaywright WebKitで確認 |
| ブラウザ | Edge | 成功（エンジン確認） | Edgeと同系統のPlaywright Chromiumで確認。実機確認は未実施 |
| キーボード操作 | FAQ | 成功 | Enter・Space、複数同時開閉をPlaywrightで確認 |
| 動きの抑制 | `prefers-reduced-motion` | 成功 | フェード移動を行わず本文を表示 |
| 架空サイト表記 | 全9ページ | 成功 | Playwrightで共通表示を確認 |
| フォーム非送信 | 入力から完了まで | 成功 | POST通信なし、同一URLで完了を確認 |
| コンソール | 全9ページ | 成功 | 3ブラウザエンジンのPlaywrightでエラーなし |
| 内部リンク・アセット | 全9ページ | 成功 | ローカル参照を自動巡回し、全件成功 |
| 画像属性 | 全9ページ | 成功 | alt、width、heightを自動確認 |
| Lighthouse | 公開用dist・モバイル | 成功 | Performance、Accessibility、Best Practices、SEOが各100、CLS 0 |

## Day 10の確認条件

- 対象：全9ページ
- 表示幅：375px、768px、1024px、1440px
- 横スクロール追加確認：320px、360px、1280px、1920px
- 拡大表示：1280pxの表示領域を200％にした場合に相当する640 CSS pxでリフローを確認
- ブラウザ：Playwright Chromium、Firefox、WebKit
- 制約：この開発環境では実機SafariとMicrosoft Edgeを起動していないため、同系統エンジンによる確認として記録する
