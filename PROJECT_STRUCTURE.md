# プロジェクト構造

```
nomikai-app/
├── public/
│   └── _redirects              # Render Static Site用のリダイレクト設定
├── src/
│   ├── components/
│   │   └── GameLayout.tsx      # 共通レイアウトコンポーネント
│   ├── data/
│   │   ├── games.ts            # ゲーム一覧データ
│   │   ├── kingsRules.ts       # キングスカップのルールデータ
│   │   ├── ojisanImages.ts     # おじさんくじ引き画像データ（空配列）
│   │   ├── oogiriPrompts.ts    # 大喜利のお題データ（100個）
│   │   ├── rouletteList.ts     # 飲みゲールーレットのリスト
│   │   └── songs.ts            # 飲み歌ルーレットの曲データ
│   ├── games/
│   │   ├── Cabajou.tsx         # キャバ嬢ゲーム
│   │   ├── HighLow.tsx         # ハイ&ロー
│   │   ├── KingsCup.tsx        # キングスカップ
│   │   ├── Ojisan.tsx          # おじさんくじ引き
│   │   ├── Oogiri.tsx          # 大喜利
│   │   ├── Roulette.tsx        # 飲みゲールーレット
│   │   └── SongRoulette.tsx    # 飲み歌ルーレット
│   ├── routes/
│   │   ├── GameRouter.tsx      # ゲームルーティング
│   │   ├── Home.tsx            # スタート画面
│   │   └── Select.tsx          # ゲーム選択画面
│   ├── App.tsx                 # メインアプリコンポーネント
│   ├── index.css               # グローバルスタイル（Tailwind含む）
│   ├── main.tsx                # エントリーポイント
│   └── types.ts                # 型定義
├── index.html                  # HTMLテンプレート
├── package.json                # 依存関係
├── postcss.config.js           # PostCSS設定
├── tailwind.config.js          # Tailwind CSS設定
├── tsconfig.json               # TypeScript設定
├── vite.config.ts              # Vite設定
└── README.md                   # プロジェクト説明
```

## 実装済みファイルの説明

### データファイル

- **games.ts**: 全7ゲームの情報（ID、タイトル、説明）
- **kingsRules.ts**: キングスカップのカード効果（A-K）
- **ojisanImages.ts**: おじさんくじ引きの画像URL配列（空配列、後で追加可能）
- **oogiriPrompts.ts**: 大喜利のお題100個
- **rouletteList.ts**: 飲みゲールーレットのリアルゲーム8種類
- **songs.ts**: 飲み歌ルーレットの初期曲リスト7曲

### ゲームコンポーネント

1. **HighLow.tsx**: トランプでハイ&ローゲーム
2. **KingsCup.tsx**: ルール編集可能なキングスカップ
3. **Roulette.tsx**: リアル飲み会ゲームをランダム選択
4. **Ojisan.tsx**: 24枚のカードからドボンを避けるゲーム
5. **Oogiri.tsx**: 100個のお題からランダム表示
6. **SongRoulette.tsx**: 曲リスト編集可能な歌ルーレット
7. **Cabajou.tsx**: トランプ52枚を使ったキャバ嬢ゲーム

### ルーティング

- **Home.tsx**: スタート画面（"飲みゲーを始めよう"ボタン）
- **Select.tsx**: 7つのゲームカード表示
- **GameRouter.tsx**: `/game/:id` で各ゲームにルーティング

### 共通コンポーネント

- **GameLayout.tsx**: 全ゲーム共通のレイアウト（ヘッダー、戻るボタン）

### 設定ファイル

- **tailwind.config.js**: 黒×金のカスタムカラー設定
- **index.css**: Tailwindディレクティブとグローバルスタイル
- **_redirects**: SPA用のリダイレクト設定（Render用）

## 実装済み機能

### localStorage使用

- キングスカップ: ルール編集内容を保存
- 飲み歌ルーレット: 曲リスト編集内容を保存

### ゲーム機能

- ハイ&ロー: デッキシャッフル、自動リシャッフル
- キングスカップ: ルール編集、リセット機能
- 飲みゲールーレット: アニメーション付きルーレット
- おじさんくじ引き: 24枚カード、ドボンモーダル表示
- 大喜利: 100個のお題からランダム表示
- 飲み歌ルーレット: 曲追加/削除/編集、リセット機能
- キャバ嬢ゲーム: カード効果表示、ホールド機能、自動リシャッフル

### デザイン

- 黒背景 (#000)
- 金色アクセント (#D4AF37, #FFD700)
- スマホ専用レスポンシブデザイン
- Tailwind CSSによるユーティリティファーストデザイン
