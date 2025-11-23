export type GameMode = "normal" | "adult";

export type GameConfig = {
  mode: GameMode;
  slug: string;
  title: string;
  type: string;
  description: string;
  emoji: string;
};

export const GAMES_CONFIG: GameConfig[] = [
  // ========================================
  // NORMAL MODE GAMES (10)
  // ========================================
  {
    mode: "normal",
    slug: "kingcup",
    title: "キングスカップ",
    type: "card",
    description: "カードの能力に従って飲む王道ゲーム（スマホでカード内容カスタム可）",
    emoji: "👑"
  },
  {
    mode: "normal",
    slug: "roulette",
    title: "指名ルーレット",
    type: "roulette",
    description: "360度ホイールで「誰が飲むか」を決める指名ゲーム",
    emoji: "🎰"
  },
  {
    mode: "normal",
    slug: "king",
    title: "スマホ王様ゲーム",
    type: "king",
    description: "王様と命令内容をアプリがランダムに決める飲み会王道ゲーム",
    emoji: "🤴"
  },
  {
    mode: "normal",
    slug: "wolf",
    title: "ワードウルフ",
    type: "wordwolf",
    description: "お題単語をこっそり配って会話から少数派を当てるゲーム",
    emoji: "🐺"
  },
  {
    mode: "normal",
    slug: "truth",
    title: "Truth or Dare",
    type: "truth",
    description: "真実 or 罰ゲームを選ぶ定番ゲーム（健全寄せ）",
    emoji: "🎯"
  },
  {
    mode: "normal",
    slug: "love",
    title: "恋愛診断ルーレット",
    type: "love",
    description: "恋愛観・タイプ診断の質問をルーレットで引いて全員で答える",
    emoji: "💕"
  },
  {
    mode: "normal",
    slug: "roles",
    title: "役割デッキ配布",
    type: "roles",
    description: "司会・盛り上げ・DJなど飲み会での役割をアプリがランダム配布する",
    emoji: "🎭"
  },
  {
    mode: "normal",
    slug: "vote",
    title: "匿名投票ゲーム",
    type: "vote",
    description: "「一番◯◯そうな人」などを匿名投票して結果を発表、票が多い人が飲む",
    emoji: "🗳️"
  },
  {
    mode: "normal",
    slug: "pointfinger",
    title: "指差し一致ゲーム",
    type: "pointfinger",
    description: "お題に対してせーので指差し→刺された人が飲む",
    emoji: "👆"
  },
  {
    mode: "normal",
    slug: "seatroulette",
    title: "座席ルーレット",
    type: "seat",
    description: "360度のホイールを回して、止まった方向・座席にいる人が飲むゲーム",
    emoji: "💺"
  },

  // ========================================
  // ADULT MODE GAMES (10)
  // ========================================
  {
    mode: "adult",
    slug: "a_truth",
    title: "エロTruth or Dare",
    type: "adult_truth",
    description: "大人向けの真実 or 罰ゲーム",
    emoji: "🔥"
  },
  {
    mode: "adult",
    slug: "a_oogiri",
    title: "エロ大喜利",
    type: "adult_oogiri",
    description: "大人向けのお題で盛り上がる大喜利",
    emoji: "💬"
  },
  {
    mode: "adult",
    slug: "a_pointfinger",
    title: "エロ指差しゲーム",
    type: "adult_point",
    description: "「一番◯◯しそうな人」系をエロ寄せで",
    emoji: "👉"
  },
  {
    mode: "adult",
    slug: "a_vote",
    title: "エロ匿名投票ゲーム",
    type: "adult_vote",
    description: "エロいお題で匿名投票、票が多い人が飲む",
    emoji: "🗳️"
  },
  {
    mode: "adult",
    slug: "a_roulette",
    title: "エロルーレット",
    type: "adult_roulette",
    description: "エロい指令をルーレットで決める",
    emoji: "🎡"
  },
  {
    mode: "adult",
    slug: "a_story",
    title: "妄想ストーリーリレー",
    type: "adult_story",
    description: "エロい妄想ストーリーをリレー形式で作る",
    emoji: "📖"
  },
  {
    mode: "adult",
    slug: "a_rank",
    title: "経験人数ランキング当てゲーム",
    type: "adult_rank",
    description: "参加者の経験人数を予想してランキングを当てる",
    emoji: "📊"
  },
  {
    mode: "adult",
    slug: "a_secret",
    title: "秘密暴露ルーレット",
    type: "adult_secret",
    description: "ルーレットで当たった人が秘密を暴露する",
    emoji: "🤫"
  },
  {
    mode: "adult",
    slug: "a_mission",
    title: "エロミッションカード",
    type: "adult_mission",
    description: "エロいミッションをカードで引いて実行する",
    emoji: "🃏"
  },
  {
    mode: "adult",
    slug: "a_fantasy",
    title: "理想の夜シチュエーション当てゲーム",
    type: "adult_fantasy",
    description: "理想の夜のシチュエーションを当て合う",
    emoji: "🌙"
  }
];

// Helper functions
export const getNormalGames = () => GAMES_CONFIG.filter(g => g.mode === "normal");
export const getAdultGames = () => GAMES_CONFIG.filter(g => g.mode === "adult");
export const getGameBySlug = (slug: string) => GAMES_CONFIG.find(g => g.slug === slug);
