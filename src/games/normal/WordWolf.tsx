import { useState } from "react";
import GameLayout from "../../components/GameLayout";

const WORD_SETS = [
  { majority: "犬", minority: "猫" },
  { majority: "ラーメン", minority: "うどん" },
  { majority: "夏", minority: "冬" },
  { majority: "海", minority: "山" },
  { majority: "コーヒー", minority: "紅茶" },
  { majority: "東京", minority: "大阪" },
  { majority: "野球", minority: "サッカー" },
  { majority: "映画館", minority: "Netflix" },
  { majority: "朝", minority: "夜" },
  { majority: "iPhone", minority: "Android" },
  { majority: "カレー", minority: "シチュー" },
  { majority: "電車", minority: "バス" },
  { majority: "ビール", minority: "チューハイ" },
  { majority: "焼肉", minority: "寿司" },
  { majority: "温泉", minority: "サウナ" },
  { majority: "結婚式", minority: "葬式" },
  { majority: "お正月", minority: "クリスマス" },
  { majority: "富士山", minority: "エベレスト" },
  { majority: "ディズニーランド", minority: "USJ" },
  { majority: "LINE", minority: "電話" },
];

interface Player {
  id: number;
  word: string;
  isWolf: boolean;
  revealed: boolean;
}

export default function WordWolf() {
  const [playerCount, setPlayerCount] = useState(4);
  const [wolfCount, setWolfCount] = useState(1);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [phase, setPhase] = useState<"setup" | "distribute" | "discuss" | "vote">("setup");
  const [wordSet, setWordSet] = useState<{ majority: string; minority: string } | null>(null);

  const startGame = () => {
    const set = WORD_SETS[Math.floor(Math.random() * WORD_SETS.length)];
    setWordSet(set);

    // ウルフをランダムに選ぶ
    const wolfIndices = new Set<number>();
    while (wolfIndices.size < wolfCount) {
      wolfIndices.add(Math.floor(Math.random() * playerCount));
    }

    const newPlayers: Player[] = [];
    for (let i = 0; i < playerCount; i++) {
      const isWolf = wolfIndices.has(i);
      newPlayers.push({
        id: i + 1,
        word: isWolf ? set.minority : set.majority,
        isWolf,
        revealed: false,
      });
    }

    setPlayers(newPlayers);
    setCurrentPlayer(0);
    setPhase("distribute");
  };

  const revealWord = () => {
    const updated = [...players];
    updated[currentPlayer].revealed = true;
    setPlayers(updated);
  };

  const nextPlayer = () => {
    const updated = [...players];
    updated[currentPlayer].revealed = false;
    setPlayers(updated);

    if (currentPlayer < playerCount - 1) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      setPhase("discuss");
    }
  };

  const showAnswer = () => {
    setPhase("vote");
  };

  const reset = () => {
    setPlayers([]);
    setCurrentPlayer(0);
    setPhase("setup");
    setWordSet(null);
  };

  return (
    <GameLayout title="ワードウルフ">
      <div className="space-y-6">
        {phase === "setup" && (
          <>
            <div className="glass-card rounded-3xl p-6 text-center">
              <div className="text-5xl mb-4">🐺</div>
              <h2 className="text-gold text-xl font-bold mb-2">ワードウルフ</h2>
              <p className="text-gold-light/70 text-sm">
                少数派（ウルフ）を会話から見つけ出せ！
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <label className="text-gold font-semibold block mb-3">参加人数</label>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
                    className="w-12 h-12 rounded-xl bg-gold/20 text-gold text-2xl font-bold"
                  >
                    -
                  </button>
                  <span className="text-gold text-4xl font-bold w-16 text-center">
                    {playerCount}
                  </span>
                  <button
                    onClick={() => setPlayerCount(Math.min(12, playerCount + 1))}
                    className="w-12 h-12 rounded-xl bg-gold/20 text-gold text-2xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gold font-semibold block mb-3">ウルフの数</label>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setWolfCount(Math.max(1, wolfCount - 1))}
                    className="w-12 h-12 rounded-xl bg-gold/20 text-gold text-2xl font-bold"
                  >
                    -
                  </button>
                  <span className="text-gold text-4xl font-bold w-16 text-center">
                    {wolfCount}
                  </span>
                  <button
                    onClick={() => setWolfCount(Math.min(Math.floor(playerCount / 2), wolfCount + 1))}
                    className="w-12 h-12 rounded-xl bg-gold/20 text-gold text-2xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              ゲームスタート
            </button>
          </>
        )}

        {phase === "distribute" && players[currentPlayer] && (
          <>
            <div className="glass-card rounded-3xl p-8 text-center">
              <div className="text-gold text-xl mb-6">
                プレイヤー {currentPlayer + 1} の番
              </div>

              {!players[currentPlayer].revealed ? (
                <button
                  onClick={revealWord}
                  className="w-full bg-gold/20 text-gold font-bold text-xl py-8 rounded-2xl border-2 border-gold border-dashed"
                >
                  タップしてお題を見る
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-black/50 rounded-2xl p-8 border-2 border-gold">
                    <p className="text-gold/70 text-sm mb-2">あなたのお題</p>
                    <p className="text-gold-light text-4xl font-bold">
                      {players[currentPlayer].word}
                    </p>
                  </div>
                  <p className="text-gold/50 text-xs">
                    ※他の人に見せないでね！
                  </p>
                </div>
              )}
            </div>

            {players[currentPlayer].revealed && (
              <button
                onClick={nextPlayer}
                className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
              >
                {currentPlayer < playerCount - 1 ? "次の人へ" : "話し合い開始"}
              </button>
            )}
          </>
        )}

        {phase === "discuss" && (
          <>
            <div className="glass-card rounded-3xl p-8 text-center glow-gold">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-gold text-2xl font-bold mb-4">話し合いタイム</h2>
              <p className="text-gold-light/70">
                自分のお題について話し合おう！<br />
                少数派（ウルフ）は誰だ？
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-gold font-semibold mb-3">ルール</h3>
              <ul className="text-gold-light/70 text-sm space-y-2">
                <li>• お題について会話してください</li>
                <li>• ただしお題を直接言うのはNG</li>
                <li>• ウルフは多数派のフリをしよう</li>
                <li>• 多数派はウルフを見つけ出そう</li>
              </ul>
            </div>

            <button
              onClick={showAnswer}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              投票・答え合わせ
            </button>
          </>
        )}

        {phase === "vote" && wordSet && (
          <>
            <div className="glass-card rounded-3xl p-8 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-gold text-xl font-bold mb-6">正解発表！</h2>

              <div className="space-y-4">
                <div className="bg-gold/10 rounded-2xl p-4">
                  <p className="text-gold/70 text-sm mb-1">多数派のお題</p>
                  <p className="text-gold text-2xl font-bold">{wordSet.majority}</p>
                </div>
                <div className="bg-pink-500/10 rounded-2xl p-4">
                  <p className="text-pink-400/70 text-sm mb-1">少数派（ウルフ）のお題</p>
                  <p className="text-pink-400 text-2xl font-bold">{wordSet.minority}</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-gold font-semibold mb-3">ウルフは...</h3>
              <div className="flex flex-wrap gap-2">
                {players.filter(p => p.isWolf).map(p => (
                  <span
                    key={p.id}
                    className="bg-pink-500/20 text-pink-400 px-4 py-2 rounded-xl font-bold"
                  >
                    プレイヤー {p.id}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              もう一度遊ぶ
            </button>
          </>
        )}
      </div>
    </GameLayout>
  );
}
