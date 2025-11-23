import { useState } from "react";
import GameLayout from "../../components/GameLayout";
import AdModal from "../../components/AdModal";

const ADULT_MISSIONS = [
  "隣の人に耳元でささやく",
  "セクシーな目線を5秒送る",
  "好きなAV女優/男優を3人言う",
  "一番エロい体験を話す",
  "腰を5回セクシーに振る",
  "喘ぎ声のモノマネ",
  "壁ドンされる側を演じる",
  "セクシーなウインク",
  "誘惑するポーズ",
  "隣の人の肩を揉む",
  "「好き」を最高にセクシーに言う",
  "理想のキスを説明",
  "一番エロい妄想を話す",
  "AVのタイトルを即興で作る",
  "恥ずかしい性体験を話す",
  "好きな体位を告白",
  "エロい一言を言う",
  "セクシーな顔をする",
  "隣の人の手を握る",
  "甘え声を出す",
];

export default function AdultRoulette() {
  const [currentMission, setCurrentMission] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCurrentMission(null);

    const spins = 3 + Math.random() * 2;
    const newRotation = rotation + spins * 360;
    setRotation(newRotation);

    setTimeout(() => {
      const mission = ADULT_MISSIONS[Math.floor(Math.random() * ADULT_MISSIONS.length)];
      setCurrentMission(mission);
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

  return (
    <GameLayout title="エロルーレット">
      <div className="space-y-6">
        <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
          <div className="text-5xl mb-4">🎡</div>
          <h2 className="text-pink-400 text-xl font-bold mb-2">エロルーレット</h2>
          <p className="text-pink-200/70 text-sm">
            エロい指令をルーレットで決める！
          </p>
        </div>

        {/* ルーレット */}
        <div className="relative w-64 h-64 mx-auto">
          <div
            className="w-full h-full rounded-full border-8 border-pink-500 flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-red-500/20"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? "transform 2s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-8 bg-pink-500 rounded-b-full" />
            <div className="text-6xl">😈</div>
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

        {currentMission && (
          <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink animate-fade-in">
            <div className="text-3xl mb-4">🎯</div>
            <div className="bg-black/50 rounded-2xl p-6 border-2 border-pink-500">
              <p className="text-pink-200 text-xl font-semibold leading-relaxed">
                {currentMission}
              </p>
            </div>
            <p className="text-pink-400/50 text-sm mt-4">
              できなかったら飲む🍺
            </p>
          </div>
        )}
      </div>
      <AdModal isOpen={showAd} onClose={() => setShowAd(false)} />
    </GameLayout>
  );
}
