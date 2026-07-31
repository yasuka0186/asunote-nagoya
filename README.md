# 株式会社アスノテ名古屋 コーポレートサイト

愛知県・名古屋市周辺の中小企業を支援する、架空のDX・業務改善会社のコーポレートサイトです。中小企業向けホームページ制作案件への応募を想定した自主制作ポートフォリオとして制作します。

> 本サイトはポートフォリオ用に制作する架空企業のデモサイトです。企業情報、導入事例、成果数値、連絡先はすべて架空の内容です。

## 制作状況

- 完了工程：Day 11（SEO・性能）
- 次の工程：Day 12（テスト・修正）
- 公開URL：未公開
- GitHubリポジトリ：<https://github.com/yasuka0186/asunote-nagoya>
- 制作期間：13工程

## 使用技術

- HTML5
- Sass（SCSS）／CSS
- JavaScript（ES Modules）
- Lucide
- Vitest
- Playwright
- ESLint
- Stylelint
- HTML Validate

## ページ一覧

| ページ | URL |
|---|---|
| トップページ | `/` |
| サービス | `/services/` |
| 導入事例一覧 | `/cases/` |
| 製造業の導入事例詳細 | `/cases/manufacturing/` |
| お知らせ一覧 | `/news/` |
| 会社案内 | `/company/` |
| お問い合わせ | `/contact/` |
| プライバシーポリシー | `/privacy/` |
| 404 | `/404.html` |

## セットアップ

```bash
npm install
```

## 開発用コマンド

```bash
npm run watch:css
npm run build:css
npm run build:production
npm run lint
npm run validate:html
npm test
npm run test:e2e
npm run audit:lighthouse
```

`build:production`は、編集用ソースを維持したまま圧縮済み公開ファイルを`dist/`へ生成します。`audit:lighthouse`の実行時は、別のターミナルで`npx http-server . -a 127.0.0.1 -p 4173 -c-1`を起動してください。

Day 11のLighthouse初回結果はPerformance 82、Accessibility 100、Best Practices 100、SEO 100です。PerformanceはJavaScriptによる共通データの初期描画に伴うレイアウト変化などをDay 12で改善します。詳細は[`docs/day-11-report.md`](docs/day-11-report.md)を参照してください。

詳細な要件と制作日程は [`docs/asunote-requirements-schedule.md`](docs/asunote-requirements-schedule.md) を参照してください。

Day 2の設計成果物は、[`docs/design/wireframes.md`](docs/design/wireframes.md) と [`docs/design/design-system.md`](docs/design/design-system.md) にまとめています。

完成原稿は[`docs/content/`](docs/content/)に、素材とライセンス情報は[`docs/assets-licenses.md`](docs/assets-licenses.md)にまとめています。

## 使用素材とライセンス

写真はすべて[Pexels License](https://www.pexels.com/license/)に基づき、2026年7月30日に取得してWebPへ最適化しています。写真はイメージとして使用し、架空企業や架空事例との実在の関係を示すものではありません。

| 素材 | 撮影者・配布元 | 用途 |
|---|---|---|
| [オフィスでのミーティング](https://www.pexels.com/photo/people-having-a-meeting-at-the-office-7651932/) | Thirdman / Pexels | 会社案内 |
| [工場で作業する人々](https://www.pexels.com/photo/people-working-on-a-factory-11765539/) | Mehmet Turgut Kirkgoz / Pexels | 製造業事例 |
| [倉庫で働く人々](https://www.pexels.com/photo/workers-in-warehouse-4483862/) | Tiger Lily / Pexels | 卸売業事例 |
| [オフィスでパソコンを使う人物](https://www.pexels.com/photo/professional-man-working-on-laptop-in-office-36733403/) | Vitaly Gariev / Pexels | 士業事務所事例 |
| ロゴ、ファーストビューイラスト | オリジナルSVG | ブランド、業務改善表現 |
