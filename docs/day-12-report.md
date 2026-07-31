# Day 12 作業報告

## 実施内容

- Vitest、Playwright、HTML Validator、ESLint、Stylelintを再実行
- 全9ページのコンソールエラーを確認
- 内部リンクとローカルアセット参照の自動巡回テストを追加
- 全画像のalt、width、heightを自動確認
- Firefoxで不安定だったFAQテストの状態待ちを追加
- 本番ビルド時に共通データから事例・お知らせを事前描画
- JavaScript有効状態をCSS読込前に設定し、モバイルナビによるCLSを解消
- スクロール演出を移動なしのフェードへ調整
- Lighthouseを圧縮済み公開用distに対して再計測

## Lighthouse改善結果

ローカルで公開用`dist/`を配信し、モバイル条件のトップページで計測した。

| カテゴリ | Day 11 | Day 12 |
|---|---:|---:|
| Performance | 82 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Cumulative Layout Shiftは0.364から0へ改善した。計測値は実行環境により変動するため、Day 13に公開URLでも最終確認する。

## 品質判定

重大・高優先度の不具合は0件。公開環境固有のベースパス、canonical、OGP、sitemapはDay 13の実URL確認対象とする。
