# Day 13 作業報告

## 完了条件

公開URL、公開リポジトリ、README、手動確認表、PC・スマートフォン画像、ポートフォリオ掲載文を第三者へ提示できること。

## 実装内容

- GitHub Actionsで公開用`dist/`を生成し、GitHub Pagesへ配信するワークフローを追加
- Jekyll処理を無効化する`.nojekyll`を公開ビルドへ追加
- 公開URLの全9ページ、canonical、OGP、アセットのベースパス、`robots.txt`、`sitemap.xml`を確認するスクリプトを追加
- 公開ページを安定した表示状態で撮影するスクリプトとPC・スマートフォン画像を追加
- README、手動確認表、ポートフォリオ掲載文を完成

## 公開・確認結果

- 公開URL：<https://yasuka0186.github.io/asunote-nagoya/>
- リポジトリ：<https://github.com/yasuka0186/asunote-nagoya>
- GitHub Actions初回デプロイ：成功
- 全9ページ、`robots.txt`、`sitemap.xml`：公開URLで成功
- canonical、OGP、sitemap：実URLと一致
- GitHub Pagesの`/asunote-nagoya/`ベースパス：画像、CSS、JavaScriptを含め問題なし
- 公開サイトと公開リポジトリ：第三者相当のHTTPアクセスで200、リポジトリはPUBLIC
- 最終Lighthouse：Performance 99、Accessibility 100、Best Practices 100、SEO 100、CLS 0

## スクリーンショット

- [PC版（1440px）](screenshots/home-desktop.png)
- [スマートフォン版（375px）](screenshots/home-mobile.png)

## 残課題

重大・高優先度の未解決不具合はない。実機SafariとMicrosoft Edge、実ブラウザの200％拡大は利用環境上未実施のため、Playwright WebKit・Chromiumと640 CSS pxのリフロー確認で代替している。
