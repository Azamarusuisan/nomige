import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import GameLayout from "../components/GameLayout";
import AdModal from "../components/AdModal";
import { OOGIRI_PROMPTS } from "../data/oogiriPrompts";
import { OOGIRI_PROMPTS_NORMAL } from "../data/oogiriPromptsNormal";
import type { GameMode } from "../types";

export default function Oogiri() {
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") as GameMode) || "normal";
  const isAdult = mode === "adult";

  const prompts = isAdult ? OOGIRI_PROMPTS : OOGIRI_PROMPTS_NORMAL;
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);

  // 広告用の状態（Adult Modeのみ）- 7回に1回
  const [promptCount, setPromptCount] = useState(0);
  const [showAd, setShowAd] = useState(false);

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setCurrentPrompt(prompts[randomIndex]);

    // Adult Modeでは7回に1回広告表示
    if (isAdult) {
      const newCount = promptCount + 1;
      setPromptCount(newCount);
      if (newCount >= 7) {
        setShowAd(true);
        setPromptCount(0);
      }
    }
  };

  const handleAdClose = () => {
    setShowAd(false);
  };

  return (
    <GameLayout title="大喜利">
      <div className="flex flex-col items-center space-y-8">
        {/* モード表示 */}
        <div className="text-center">
          <span className={`text-sm px-3 py-1 rounded-full ${
            isAdult
              ? "bg-pink-600 text-white"
              : "bg-gold text-black"
          }`}>
            {isAdult ? "🔞 Adult Mode" : "🍻 Normal Mode"}
          </span>
        </div>

        <div className={`text-center ${isAdult ? "text-pink-400" : "text-gold"}`}>
          {isAdult ? "エロいお題で盛り上がろう！" : "面白いお題で盛り上がろう！"}
        </div>

        <div className={`bg-gradient-to-br from-gray-900 to-black border-4 rounded-2xl p-8 w-full min-h-[300px] flex items-center justify-center shadow-2xl ${
          isAdult ? "border-pink-500" : "border-gold"
        }`}>
          {currentPrompt ? (
            <div className="text-center">
              <div className={`text-3xl font-bold leading-relaxed ${
                isAdult ? "text-pink-300" : "text-gold-light"
              }`}>
                {currentPrompt}
              </div>
            </div>
          ) : (
            <div className={`text-2xl ${isAdult ? "text-pink-300" : "text-gold-light"}`}>
              お題を引いてください
            </div>
          )}
        </div>

        <button
          onClick={getRandomPrompt}
          className={`font-bold text-2xl px-12 py-6 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95 ${
            isAdult
              ? "bg-gradient-to-r from-pink-600 to-red-500 text-white"
              : "bg-gradient-to-r from-gold to-gold-light text-black"
          }`}
        >
          お題を引く
        </button>

        <div className={`text-sm text-center opacity-75 ${
          isAdult ? "text-pink-300" : "text-gold-light"
        }`}>
          全{prompts.length}種類のお題
        </div>

        {/* 広告モーダル（Adult Modeのみ） */}
        <AdModal isOpen={showAd} onClose={handleAdClose} />
      </div>
    </GameLayout>
  );
}
