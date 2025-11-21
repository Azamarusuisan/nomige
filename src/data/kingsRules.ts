export interface KingsRule {
  card: string;
  rule: string;
}

export const DEFAULT_KINGS_RULES: KingsRule[] = [
  { card: "A", rule: "全員飲む" },
  { card: "2", rule: "指名して飲ませる" },
  { card: "3", rule: "自分が飲む" },
  { card: "4", rule: "女子が飲む" },
  { card: "5", rule: "男子が飲む" },
  { card: "6", rule: "左の人が飲む" },
  { card: "7", rule: "右の人が飲む" },
  { card: "8", rule: "飲み仲間（次に誰かが飲んだら一緒に飲む）" },
  { card: "9", rule: "ルール追加" },
  { card: "10", rule: "カテゴリーゲーム" },
  { card: "J", rule: "親指マスター（親指を立てたら全員立てる、最後の人が飲む）" },
  { card: "Q", rule: "質問マスター（質問に答えたら飲む）" },
  { card: "K", rule: "キングスカップ（中央のカップに注ぐ、4枚目を引いた人が飲む）" }
];
