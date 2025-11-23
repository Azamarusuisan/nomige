import { useState } from "react";
import GameLayout from "../../components/GameLayout";
import AdModal from "../../components/AdModal";

export default function AdultRank() {
  const [playerCount, setPlayerCount] = useState(4);
  const [phase, setPhase] = useState<"setup" | "guess" | "reveal">("setup");
  const [guesses, setGuesses] = useState<number[]>([]);
  const [currentGuesser, setCurrentGuesser] = useState(1);
  const [playCount, setPlayCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7);

  const startGame = () => {
    setGuesses([]);
    setCurrentGuesser(1);
    setPhase("guess");
  };

  const submitGuess = (ranking: number[]) => {
    const newGuesses = [...guesses];
    newGuesses[currentGuesser - 1] = ranking.length;
    setGuesses(newGuesses);

    if (currentGuesser < playerCount) {
      setCurrentGuesser(currentGuesser + 1);
    } else {
      setPhase("reveal");

      const newCount = playCount + 1;
      setPlayCount(newCount);
      if (newCount >= nextAdAt) {
        setShowAd(true);
        setPlayCount(0);
        setNextAdAt(Math.floor(Math.random() * 4) + 7);
      }
    }
  };

  const reset = () => {
    setPhase("setup");
    setGuesses([]);
    setCurrentGuesser(1);
  };

  return (
    <GameLayout title="経験人数ランキング当てゲーム">
      <div className="space-y-6">
        {phase === "setup" && (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
              <div className="text-5xl mb-4">📊</div>
              <h2 className="text-pink-400 text-xl font-bold mb-2">経験人数ランキング当てゲーム</h2>
              <p className="text-pink-200/70 text-sm">
                参加者の経験人数を予想してランキングを当てろ！
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
                <li>1. 各自が他の人の経験人数を予想</li>
                <li>2. ランキング形式で並べる</li>
                <li>3. 実際の順位と比較</li>
                <li>4. 一番外した人が飲む🍺</li>
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

        {phase === "guess" && (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center">
              <div className="text-4xl mb-3">🤔</div>
              <p className="text-pink-400 text-xl font-bold mb-2">
                プレイヤー {currentGuesser} の予想
              </p>
              <p className="text-pink-200/70 text-sm">
                他の人の経験人数を予想してね
              </p>
            </div>

            <div className="glass-card-pink rounded-2xl p-6 text-center">
              <p className="text-pink-200/70 text-sm mb-4">
                1位から{playerCount}位まで予想を紙に書こう
              </p>
              <p className="text-pink-400/50 text-xs">
                ※自分は除いてOK
              </p>
            </div>

            <button
              onClick={() => submitGuess([])}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              予想完了 → 次の人へ
            </button>
          </>
        )}

        {phase === "reveal" && (
          <>
            <div className="glass-card-pink rounded-3xl p-8 text-center glow-pink">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-pink-400 text-2xl font-bold mb-4">答え合わせ！</h2>
              <p className="text-pink-200/70">
                実際の経験人数を告白して<br />
                ランキングを発表しよう！
              </p>
            </div>

            <div className="glass-card-pink rounded-2xl p-6">
              <h3 className="text-pink-400 font-semibold mb-3">手順</h3>
              <ol className="text-pink-200/70 text-sm space-y-2">
                <li>1. 全員が実際の人数を告白</li>
                <li>2. 実際のランキングを作成</li>
                <li>3. 予想と比較</li>
                <li>4. 一番外れた人が飲む！</li>
              </ol>
            </div>

            <div className="glass-card-pink rounded-2xl p-4 text-center">
              <p className="text-pink-400 font-bold">
                正直に答えてね！嘘はダメ🙅
              </p>
            </div>

            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              もう一度遊ぶ
            </button>
          </>
        )}
      </div>
      <AdModal isOpen={showAd} onClose={() => setShowAd(false)} />
    </GameLayout>
  );
}
