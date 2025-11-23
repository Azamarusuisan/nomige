import { useState, useRef } from "react";
import GameLayout from "../../components/GameLayout";
import AdModal from "../../components/AdModal";

const SECRET_CATEGORIES = [
  "恋愛の秘密",
  "性の秘密",
  "過去の秘密",
  "浮気の秘密",
  "変態の秘密",
  "夜の秘密",
  "体の秘密",
  "恥ずかしい秘密",
  "誰にも言えない秘密",
  "元カレ/元カノの秘密",
];

export default function AdultSecret() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [targetPlayer, setTargetPlayer] = useState<number | null>(null);
  const [playerCount, setPlayerCount] = useState(4);
  const [phase, setPhase] = useState<"setup" | "play">("setup");
  const spinCount = useRef(0);
  const [playCount, setPlayCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7);

  const startGame = () => {
    setPhase("play");
  };

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCurrentCategory(null);
    setTargetPlayer(null);
    spinCount.current += 1;

    const spins = 3 + Math.random() * 2;
    const newRotation = rotation + spins * 360;
    setRotation(newRotation);

    setTimeout(() => {
      const category = SECRET_CATEGORIES[Math.floor(Math.random() * SECRET_CATEGORIES.length)];
      const player = Math.floor(Math.random() * playerCount) + 1;
      setCurrentCategory(category);
      setTargetPlayer(player);
      setIsSpinning(false);

      const newCount = playCount + 1;
      setPlayCount(newCount);
      if (newCount >= nextAdAt) {
        setShowAd(true);
        setPlayCount(0);
        setNextAdAt(Math.floor(Math.random() * 4) + 7);
      }
    }, 2000);
  };

  const reset = () => {
    setPhase("setup");
    setCurrentCategory(null);
    setTargetPlayer(null);
  };

  return (
    <GameLayout title="秘密暴露ルーレット">
      <div className="space-y-6">
        {phase === "setup" && (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
              <div className="text-5xl mb-4">🤫</div>
              <h2 className="text-pink-400 text-xl font-bold mb-2">秘密暴露ルーレット</h2>
              <p className="text-pink-200/70 text-sm">
                ルーレットで当たった人が秘密を暴露！
              </p>
            </div>

            <div className="glass-card-pink rounded-2xl p-6">
              <label className="text-pink-400 font-semibold block mb-3">参加人数</label>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPlayerCount(Math.max(2, playerCount - 1))}
                  className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 text-2xl font-bold btn-ios"
                >
                  -
                </button>
                <span className="text-pink-400 text-4xl font-bold w-16 text-center">
                  {playerCount}
                </span>
                <button
                  onClick={() => setPlayerCount(Math.min(12, playerCount + 1))}
                  className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 text-2xl font-bold btn-ios"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              ゲームスタート
            </button>
          </>
        )}

        {phase === "play" && (
          <>
            {/* ルーレット */}
            <div className="relative w-64 h-64 mx-auto">
              <div
                className="w-full h-full rounded-full border-8 border-pink-500 flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-purple-500/20"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? "transform 2s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
                }}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-8 bg-pink-500 rounded-b-full" />
                <div className="text-6xl">🤫</div>
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl text-pink-500">
                ▼
              </div>
            </div>

            <button
              onClick={spin}
              disabled={isSpinning}
              className={`w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg ${
                isSpinning ? "opacity-50" : ""
              }`}
            >
              {isSpinning ? "回転中..." : "ルーレットを回す"}
            </button>

            {currentCategory && targetPlayer && (
              <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink animate-fade-in">
                <div className="text-4xl mb-4">🎯</div>
                <div className="space-y-4">
                  <div className="bg-black/50 rounded-2xl p-4 border-2 border-pink-500">
                    <p className="text-pink-400/70 text-sm mb-1">対象者</p>
                    <p className="text-pink-200 text-3xl font-bold">
                      プレイヤー {targetPlayer}
                    </p>
                  </div>
                  <div className="bg-black/50 rounded-2xl p-4 border-2 border-pink-500">
                    <p className="text-pink-400/70 text-sm mb-1">暴露カテゴリ</p>
                    <p className="text-pink-200 text-xl font-bold">
                      {currentCategory}
                    </p>
                  </div>
                </div>
                <p className="text-pink-400/50 text-sm mt-4">
                  言えなかったら飲む🍺
                </p>
              </div>
            )}

            <button
              onClick={reset}
              className="w-full glass-card-pink text-pink-400 font-bold py-4 rounded-2xl btn-ios"
            >
              設定に戻る
            </button>
          </>
        )}
      </div>
      <AdModal isOpen={showAd} onClose={() => setShowAd(false)} />
    </GameLayout>
  );
}
