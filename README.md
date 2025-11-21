# 飲みゲー - 飲み会ゲーム集

飲み会で盛り上がる7つのゲームを収録したスマホ専用Webアプリ

## 収録ゲーム

1. **ハイ&ロー** - 次のカードが大きいか小さいか当てるゲーム
2. **キングスカップ** - カードごとにルールが決まった定番ゲーム（編集可能）
3. **飲みゲールーレット** - 今日やるゲームをルーレットで決める
4. **おじさんくじ引き** - ドボンを引いたら罰ゲーム！
5. **大喜利** - エロいお題で盛り上がる（100種類のお題）
6. **飲み歌ルーレット** - 歌う曲をルーレットで決める（編集可能）
7. **キャバ嬢ゲーム** - トランプで遊ぶ飲み会の定番ゲーム

## 技術スタック

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- localStorage（データ保存）

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## デプロイ

### Render Static Site へのデプロイ

1. Renderアカウントを作成
2. 新しいStatic Siteを作成
3. GitHubリポジトリを接続
4. ビルド設定：
   - Build Command: `npm run build`
   - Publish Directory: `dist`

## カスタマイズ

### おじさんくじ引き用の画像を追加

`src/data/ojisanImages.ts` ファイルを編集して画像URLを追加してください：

```typescript
export const OJISAN_IMAGES: string[] = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  // ...
];
```

### キングスカップのルールをカスタマイズ

アプリ内でルールを編集できます。編集したルールはlocalStorageに保存されます。

### 飲み歌ルーレットの曲を追加

アプリ内で曲リストを編集できます。編集したリストはlocalStorageに保存されます。

## ライセンス

MIT

## 注意事項

- このアプリはスマホ専用です（縦画面前提）
- データベースは使用せず、localStorageのみ使用
- お酒は20歳になってから、適量を楽しみましょう
