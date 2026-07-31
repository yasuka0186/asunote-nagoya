# Day 11 作業報告

## 実施内容

- 全9ページへ固有のtitle、description、canonicalを設定
- 全9ページへOGP・X向けメタタグとfaviconを設定
- トップへOrganization、パンくずのある7ページへBreadcrumbListを設定
- robots.txtとsitemap.xmlを作成
- 1200×630pxのOGP画像を作成
- ファーストビュー以外の写真へ遅延読み込みを設定
- 画像の表示寸法を明示し、ヒーロー画像へ取得優先度を設定
- HTML・CSS・JavaScriptをdistへ圧縮出力する本番ビルドを追加
- Lighthouse初回計測を実施

## Lighthouse初回結果

ローカル開発サーバー、モバイル条件、トップページで計測した。

| カテゴリ | スコア |
|---|---:|
| Performance | 82 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Performanceは90点目標に未達。JavaScriptで導入事例とお知らせを初期描画する際のレイアウト変化、開発サーバーがテキスト圧縮を行わない点、未使用CSSが主な改善候補として検出された。Day 12で影響の大きい項目から改善する。

## URL設定

公開予定URL `https://yasuka0186.github.io/asunote-nagoya/` をベースURLとして設定した。Day 13のGitHub Pages公開後に実URLと照合し、canonical、OGP、構造化データ、sitemapを最終確認する。
