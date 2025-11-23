# 飲みゲー (Nomigee) - 飲み会ゲームアプリ

モバイルファーストの飲み会ゲームWebアプリ。20種類のゲームを搭載。

## 🎮 ゲーム一覧

### Normal Mode (10ゲーム)
| ゲーム | slug | 説明 |
|--------|------|------|
| キングスカップ | kingcup | カードの能力に従って飲む王道ゲーム |
| 指名ルーレット | roulette | ホイールで「誰が飲むか」を決める |
| スマホ王様ゲーム | king | 王様と命令をアプリがランダム決定 |
| ワードウルフ | wolf | 少数派を会話から当てるゲーム |
| Truth or Dare | truth | 真実 or 罰ゲームを選ぶ定番 |
| 恋愛診断ルーレット | love | 恋愛質問をルーレットで引く |
| 役割デッキ配布 | roles | 飲み会での役割をランダム配布 |
| 匿名投票ゲーム | vote | 「一番◯◯な人」を匿名投票 |
| 指差し一致ゲーム | pointfinger | せーので指差し→刺された人が飲む |
| 座席ルーレット | seatroulette | 止まった方向の人が飲む |

### Adult Mode (10ゲーム) 🔞
| ゲーム | slug | 説明 |
|--------|------|------|
| エロTruth or Dare | a_truth | 大人向けの質問と罰ゲーム |
| エロ大喜利 | a_oogiri | 大人向けお題で大喜利 |
| エロ指差しゲーム | a_pointfinger | エロ寄せの指差しゲーム |
| エロ匿名投票 | a_vote | エロいお題で匿名投票 |
| エロルーレット | a_roulette | エロい指令をルーレットで決定 |
| 妄想ストーリーリレー | a_story | エロい妄想をリレー形式で作成 |
| 経験人数ランキング | a_rank | 経験人数を予想してランキング |
| 秘密暴露ルーレット | a_secret | 当たった人が秘密を暴露 |
| エロミッションカード | a_mission | エロいミッションをカードで引く |
| 理想の夜シチュエーション | a_fantasy | 理想の夜を当て合う |

## 🛠 技術スタック

- **Frontend**: React 19 + TypeScript
- **Build**: Vite 7
- **Styling**: Tailwind CSS
- **Router**: React Router v7

## 📁 ディレクトリ構造

```
nomikai-app/
├── src/
│   ├── components/      # 共通コンポーネント
│   ├── data/            # ゲームデータ・質問集
│   │   ├── gamesConfig.ts
│   │   ├── adultOogiri.ts
│   │   ├── adultTruthOrDare.ts
│   │   └── ...
│   ├── games/
│   │   ├── normal/      # Normalモードのゲーム
│   │   └── adult/       # Adultモードのゲーム
│   └── routes/          # ルーティング
├── public/
│   └── games/           # SEO用静的ページ
│       ├── kingcup/
│       ├── roulette/
│       └── ...
└── dist/                # ビルド出力
```

## 🚀 起動方法

```bash
# インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 🌐 デプロイ (Render)

**Static Site** として設定:
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

## 📊 アクセス解析

Google Analytics を使用する場合、`index.html` のコメントを外してトラッキングIDを設定:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-あなたのID"></script>
```

## 🎨 デザインテーマ

- Background: `#000000` (黒)
- Primary Gold: `#D4AF37`
- Accent Gold: `#FFD700`
- Adult Mode Pink: `#EC4899`
- Font: Inter (SF Pro風)
- iOS風のガラスモーフィズムUI

## 📝 TODO (将来の拡張)

- [ ] 管理者ダッシュボード
- [ ] ゲームのお気に入り機能
- [ ] カスタムルール保存
- [ ] PWA対応

## 注意事項

- このアプリはスマホ専用です（縦画面前提）
- Adult Modeは18歳以上向けです
- お酒は20歳になってから、適量を楽しみましょう

---

© 2024 飲みゲー - Ultimate Party Games
