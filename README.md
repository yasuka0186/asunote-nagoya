# 株式会社アスノテ名古屋 コーポレートサイト

愛知県・名古屋市周辺の中小企業を支援する、架空のDX・業務改善会社のコーポレートサイトです。中小企業向けホームページ制作案件への応募を想定し、要件定義、デザイン、実装、テスト、公開までを行った自主制作ポートフォリオです。

> 本サイトはポートフォリオ用に制作した架空企業のデモサイトです。企業情報、導入事例、成果数値、連絡先はすべて架空の内容です。

## 公開情報

- 公開サイト：<https://yasuka0186.github.io/asunote-nagoya/>
- GitHubリポジトリ：<https://github.com/yasuka0186/asunote-nagoya>
- 制作期間：13工程（Day 1〜Day 13）
- 制作状況：完成・公開済み

## 想定ターゲットと目的

主な対象は、愛知県・名古屋市周辺でExcelや紙業務の改善、クラウド導入、継続的なIT相談を必要としている中小企業の経営者・担当者です。専門用語を抑えてサービスと導入後の変化を伝え、問い合わせへ迷わず進めるサイトを目指しました。

## ページ一覧

| ページ | 公開URL |
|---|---|
| トップページ | [サイトを開く](https://yasuka0186.github.io/asunote-nagoya/) |
| サービス | [サイトを開く](https://yasuka0186.github.io/asunote-nagoya/services/) |
| 導入事例一覧 | [サイトを開く](https://yasuka0186.github.io/asunote-nagoya/cases/) |
| 製造業の導入事例詳細 | [サイトを開く](https://yasuka0186.github.io/asunote-nagoya/cases/manufacturing/) |
| お知らせ一覧 | [サイトを開く](https://yasuka0186.github.io/asunote-nagoya/news/) |
| 会社案内 | [サイトを開く](https://yasuka0186.github.io/asunote-nagoya/company/) |
| お問い合わせ | [サイトを開く](https://yasuka0186.github.io/asunote-nagoya/contact/) |
| プライバシーポリシー | [サイトを開く](https://yasuka0186.github.io/asunote-nagoya/privacy/) |
| 404 | [サイトを開く](https://yasuka0186.github.io/asunote-nagoya/404.html) |

## 主な機能

- PCナビゲーションとスマートフォンメニュー
- FAQアコーディオン
- 共通データを利用した導入事例・お知らせ表示
- 入力・確認・完了の3段階デモフォーム
- 必須、形式、文字数、同意の入力検証とエラー箇所へのフォーカス移動
- スマートフォン固定CTA、スクロール表示、`prefers-reduced-motion`対応
- GitHub Actionsによる公開用ビルドとGitHub Pagesへの自動配信

## 使用技術

- HTML5
- Sass（SCSS）／CSS、BEM
- JavaScript（ES Modules）
- Lucide
- Vitest、Playwright
- ESLint、Stylelint、HTML Validate
- Lighthouse
- GitHub Actions、GitHub Pages

## 工夫した点

- モバイルファーストで320px〜1920pxまでの表示を確認し、情報量の多いページでも読み順を保ちました。
- フォームは外部送信を行わないデモ仕様を明記しつつ、実案件を想定した検証、確認、入力保持、完了状態まで実装しました。
- 導入事例とお知らせをES Modulesの共通データへ分離し、トップと一覧で再利用しました。
- JavaScript無効時にも主要コンテンツを読めるよう、公開ビルドで共通データをHTMLへ事前描画しました。
- 架空企業・架空事例であることを各所に明記し、実在の実績と誤認されない表現に統一しました。

## 品質への対応

### レスポンシブ・アクセシビリティ

375px、768px、1024px、1440pxを中心に、320px〜1920pxと200％相当のリフローを確認しました。スキップリンク、ランドマーク、見出し構造、代替テキスト、フォームラベル、視認可能なフォーカス、キーボード操作、動きの抑制に対応しています。

### SEO・パフォーマンス

全ページ固有のtitle・description、canonical、OGP、X向けメタタグ、faviconを設定しました。Organization・BreadcrumbListの構造化データ、`robots.txt`、`sitemap.xml`も公開URLに合わせています。画像のWebP化、寸法指定、遅延読み込み、HTML・CSS・JavaScriptの圧縮を実施しています。

### テスト結果

- Vitest：3ファイル、7テスト成功
- Playwright：Chromium・Firefox・WebKit、153テスト成功
- ESLint／Stylelint／HTML Validate：エラーなし
- 公開確認：全9ページ、`robots.txt`、`sitemap.xml`が成功。コンソールエラーおよびPagesベースパス外のアセット参照なし
- 最終Lighthouse（公開URL・モバイル）：Performance 99、Accessibility 100、Best Practices 100、SEO 100、CLS 0

詳細は[手動確認表](docs/manual-checklist.md)と[Day 13レポート](docs/day-13-report.md)を参照してください。

## ローカルでの確認

Node.js 20以上を使用します。

```bash
npm install
npm run build:production
npm run serve:production
```

`http://127.0.0.1:4173/`を開いて確認します。編集時は`npm run watch:css`、品質確認には以下を使用します。

```bash
npm run lint
npm run validate:html
npm test
npm run test:e2e
npm run verify:public
```

`build:production`は圧縮・事前描画済みの公開ファイルを`dist/`へ生成します。`dist/`は生成物のためGit管理対象外です。

## スクリーンショット

### PC版（1440px）

![トップページ PC版](docs/screenshots/home-desktop.png)

### スマートフォン版（375px）

![トップページ スマートフォン版](docs/screenshots/home-mobile.png)

## 使用素材とライセンス

写真はすべて[Pexels License](https://www.pexels.com/license/)に基づき、WebPへ最適化しています。写真はイメージとして使用し、架空企業や架空事例との実在の関係を示すものではありません。詳細は[素材・ライセンス一覧](docs/assets-licenses.md)を参照してください。ロゴとファーストビューイラストはオリジナルSVGです。

## 既知の制約

- お問い合わせフォームはデモであり、入力内容を外部へ送信・保存しません。
- 実機SafariはPlaywright WebKit、Microsoft Edgeは同系統のPlaywright Chromiumで代替確認しています。
- 200％拡大は1280px表示領域の200％相当となる640 CSS pxでリフローを確認しています。
- 架空事例のうち詳細ページがあるのは製造業のみで、お知らせ詳細ページは制作対象外です。

## 制作資料

- [要件定義書・制作スケジュール](docs/asunote-requirements-schedule.md)
- [ワイヤーフレーム](docs/design/wireframes.md)
- [デザインシステム](docs/design/design-system.md)
- [完成原稿](docs/content/)
- [ポートフォリオ掲載文](docs/portfolio-description.md)
