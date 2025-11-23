import { useState } from "react";
import GameLayout from "../../components/GameLayout";
import AdModal from "../../components/AdModal";

const FANTASY_SCENARIOS = [
  {
    category: "場所",
    options: ["ホテル", "自宅", "車の中", "野外", "オフィス", "温泉"],
  },
  {
    category: "シチュエーション",
    options: ["酔った勢い", "計画的デート", "ワンナイト", "再会", "禁断の関係", "初めて"],
  },
  {
    category: "相手",
    options: ["恋人", "元カレ/元カノ", "憧れの人", "年上", "年下", "外国人"],
  },
  {
    category: "ムード",
    options: ["甘々", "激しく", "焦らし", "Sっ気", "Mっ気", "イチャイチャ"],
  },
  {
    category: "時間帯",
    options: ["深夜", "朝方", "昼間", "夕方", "お泊り", "終電後"],
  },
];

export default function AdultFantasy() {
  const [playerCount, setPlayerCount] = useState(4);
  const [currentScenario, setCurrentScenario] = useState<typeof FANTASY_SCENARIOS[0] | null>(null);
  const [targetPlayer, setTargetPlayer] = useState<number | null>(null);
  const [phase, setPhase] = useState<"setup" | "play" | "guess">("setup");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentGuesser, setCurrentGuesser] = useState(1);
  const [playCount, setPlayCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7);

  const startGame = () => {
    setPhase("play");
    nextRound();
  };

  const nextRound = () => {
    const scenario = FANTASY_SCENARIOS[Math.floor(Math.random() * FANTASY_SCENARIOS.length)];
    const player = Math.floor(Math.random() * playerCount) + 1;
    setCurrentScenario(scenario);
    setTargetPlayer(player);
    setAnswers({});
    setCurrentGuesser(1);
    setPhase("play");

    const newCount = playCount + 1;
    setPlayCount(newCount);
    if (newCount >= nextAdAt) {
      setShowAd(true);
      setPlayCount(0);
      setNextAdAt(Math.floor(Math.random() * 4) + 7);
    }
  };

  const startGuessing = () => {
    setPhase("guess");
  };

  const submitGuess = (option: string) => {
    const newAnswers = { ...answers, [currentGuesser]: option };
    setAnswers(newAnswers);

    if (currentGuesser < playerCount) {
      setCurrentGuesser(currentGuesser + 1);
    }
  };

  const reset = () => {
    setPhase("setup");
    setCurrentScenario(null);
    setTargetPlayer(null);
    setAnswers({});
    setCurrentGuesser(1);
  };

  return (
    <GameLayout title="理想の夜シチュエーション当てゲーム">
      <div className="space-y-6">
        {phase === "setup" && (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
              <div className="text-5xl mb-4">🌙</div>
              <h2 className="text-pink-400 text-xl font-bold mb-2">理想の夜シチュエーション当てゲーム</h2>
              <p className="text-pink-200/70 text-sm">
                対象者の理想の夜を当てろ！
              </p>
            </div>

            <div className="glass-card-pink rounded-2xl p-6">
              <label className="text-pink-400 font-semibold block mb-3">参加人数</label>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
                  className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 text-2xl font-bold btn-ios"
                >
                  -
                </button>
                <span className="text-pink-400 text-4xl font-bold w-16 text-center">
                  {playerCount}
                </span>
                <button
                  onClick={() => setPlayerCount(Math.min(8, playerCount + 1))}
                  className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 text-2xl font-bold btn-ios"
                >
                  +
                </button>
              </div>
            </div>

            <div className="glass-card-pink rounded-2xl p-6">
              <h3 className="text-pink-400 font-semibold mb-3">遊び方</h3>
              <ol className="text-pink-200/70 text-sm space-y-2">
                <li>1. 対象者とカテゴリが決まる</li>
                <li>2. 他の人は対象者の理想を予想</li>
                <li>3. 対象者が正解を発表</li>
                <li>4. 外れた人が飲む🍺</li>
              </ol>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              ゲームスタート
            </button>
          </>
        )}

        {phase === "play" && currentScenario && targetPlayer && (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
              <div className="text-4xl mb-3">🎯</div>
              <p className="text-pink-400/70 text-sm mb-2">対象者</p>
              <p className="text-pink-200 text-3xl font-bold">
                プレイヤー {targetPlayer}
              </p>
            </div>

            <div className="glass-card-pink rounded-3xl p-6 text-center">
              <p className="text-pink-400/70 text-sm mb-2">カテゴリ</p>
              <div className="bg-black/50 rounded-2xl p-4 border-2 border-pink-500 mb-4">
                <p className="text-pink-200 text-2xl font-bold">
                  理想の「{currentScenario.category}」は？
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {currentScenario.options.map((option) => (
                  <span
                    key={option}
                    className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card-pink rounded-2xl p-4 text-center">
              <p className="text-pink-200/70 text-sm">
                プレイヤー {targetPlayer} 以外の人は予想を決めてね
              </p>
            </div>

            <button
              onClick={startGuessing}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              予想を発表
            </button>
          </>
        )}

        {phase === "guess" && currentScenario && targetPlayer && (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center">
              <p className="text-pink-400/70 mb-2">カテゴリ</p>
              <p className="text-pink-400 font-bold text-lg">
                理想の「{currentScenario.category}」は？
              </p>
            </div>

            {currentGuesser <= playerCount && currentGuesser !== targetPlayer ? (
              <>
                <div className="glass-card-pink rounded-3xl p-6 text-center">
                  <p className="text-pink-400 text-xl font-bold mb-4">
                    プレイヤー {currentGuesser} の予想
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {currentScenario.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => submitGuess(option)}
                      className="glass-card-pink glow-pink p-4 rounded-2xl text-center btn-ios"
                    >
                      <span className="text-pink-200 font-bold">{option}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="glass-card-pink rounded-3xl p-8 text-center glow-pink">
                  <div className="text-5xl mb-4">🎉</div>
                  <p className="text-pink-400 text-xl font-bold mb-4">
                    プレイヤー {targetPlayer} が正解を発表！
                  </p>
                  <p className="text-pink-200/70">
                    外れた人は飲む🍺
                  </p>
                </div>

                <button
                  onClick={nextRound}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
                >
                  次のラウンド
                </button>

                <button
                  onClick={reset}
                  className="w-full glass-card-pink text-pink-400 font-bold py-4 rounded-2xl btn-ios"
                >
                  最初から
                </button>
              </>
            )}
          </>
        )}
      </div>
      <AdModal isOpen={showAd} onClose={() => setShowAd(false)} />
    </GameLayout>
  );
}
