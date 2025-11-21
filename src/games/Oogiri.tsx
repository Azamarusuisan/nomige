import { useState } from "react";
import GameLayout from "../components/GameLayout";
import { OOGIRI_PROMPTS } from "../data/oogiriPrompts";

export default function Oogiri() {
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * OOGIRI_PROMPTS.length);
    setCurrentPrompt(OOGIRI_PROMPTS[randomIndex]);
  };

  return (
    <GameLayout title="大喜利">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-gold text-center">
          エロいお題で盛り上がろう！
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-gold rounded-2xl p-8 w-full min-h-[300px] flex items-center justify-center shadow-2xl">
          {currentPrompt ? (
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-light leading-relaxed">
                {currentPrompt}
              </div>
            </div>
          ) : (
            <div className="text-gold-light text-2xl">
              お題を引いてください
            </div>
          )}
        </div>

        <button
          onClick={getRandomPrompt}
          className="bg-gradient-to-r from-gold to-gold-light text-black font-bold text-2xl px-12 py-6 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95"
        >
          お題を引く
        </button>

        <div className="text-gold-light text-sm text-center opacity-75">
          全{OOGIRI_PROMPTS.length}種類のお題
        </div>
      </div>
    </GameLayout>
  );
}
