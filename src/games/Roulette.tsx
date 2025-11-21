import { useState } from "react";
import GameLayout from "../components/GameLayout";
import { ROULETTE_LIST } from "../data/rouletteList";

export default function Roulette() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    setIsSpinning(true);
    setSelectedGame(null);

    // ルーレット演出
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * ROULETTE_LIST.length);
      setSelectedGame(ROULETTE_LIST[randomIndex]);
      counter++;

      if (counter > 20) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * ROULETTE_LIST.length);
        setSelectedGame(ROULETTE_LIST[finalIndex]);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <GameLayout title="飲みゲールーレット">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-gold text-center">
          今日やるゲームをルーレットで決めよう！
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-gold rounded-2xl p-12 w-full min-h-[300px] flex items-center justify-center shadow-2xl">
          {selectedGame ? (
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-light mb-4 animate-pulse">
                {selectedGame}
              </div>
              {!isSpinning && (
                <div className="text-gold text-lg">これで決まり！</div>
              )}
            </div>
          ) : (
            <div className="text-gold-light text-2xl">？？？</div>
          )}
        </div>

        <button
          onClick={spin}
          disabled={isSpinning}
          className={`bg-gradient-to-r from-gold to-gold-light text-black font-bold text-2xl px-12 py-6 rounded-lg shadow-lg transform transition ${
            isSpinning
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105 active:scale-95"
          }`}
        >
          {isSpinning ? "抽選中..." : "ルーレットを回す"}
        </button>

        <div className="w-full mt-8">
          <div className="text-gold text-center mb-4 font-bold">
            ゲームリスト
          </div>
          <div className="grid grid-cols-2 gap-2">
            {ROULETTE_LIST.map((game, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gold rounded px-3 py-2 text-gold-light text-sm text-center"
              >
                {game}
              </div>
            ))}
          </div>
        </div>
      </div>
    </GameLayout>
  );
}
