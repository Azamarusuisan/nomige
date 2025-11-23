import { useState } from "react";
import GameLayout from "../../components/GameLayout";
import AdModal from "../../components/AdModal";

const MISSIONS = [
  { level: "easy", mission: "セクシーな目線を3秒送る", emoji: "👀" },
  { level: "easy", mission: "好きなAV女優/男優を言う", emoji: "🎬" },
  { level: "easy", mission: "理想のタイプを下ネタ込みで言う", emoji: "💭" },
  { level: "easy", mission: "腰を3回振る", emoji: "💃" },
  { level: "easy", mission: "甘え声で「好き」と言う", emoji: "💕" },
  { level: "medium", mission: "喘ぎ声のモノマネ", emoji: "🗣️" },
  { level: "medium", mission: "隣の人の耳元で囁く", emoji: "👂" },
  { level: "medium", mission: "セクシーなポーズをとる", emoji: "📸" },
  { level: "medium", mission: "壁ドンされる側を演じる", emoji: "🧱" },
  { level: "medium", mission: "一番恥ずかしい性体験を話す", emoji: "🙈" },
  { level: "hard", mission: "一番エロい妄想を告白", emoji: "💬" },
  { level: "hard", mission: "AVのタイトルを即興で作る", emoji: "🎥" },
  { level: "hard", mission: "隣の人の肩を揉む（10秒）", emoji: "💆" },
  { level: "hard", mission: "セクシーなウインク連発", emoji: "😉" },
  { level: "hard", mission: "好きな体位を実演（言葉で）", emoji: "🛏️" },
  { level: "extreme", mission: "服を1枚脱ぐ", emoji: "👔" },
  { level: "extreme", mission: "一番の性癖を暴露", emoji: "🔓" },
  { level: "extreme", mission: "経験人数を正直に言う", emoji: "🔢" },
  { level: "extreme", mission: "初体験の話を詳しく", emoji: "📖" },
  { level: "extreme", mission: "一番エロかった夜を話す", emoji: "🌙" },
];

const LEVELS = ["easy", "medium", "hard", "extreme"] as const;
const LEVEL_LABELS = {
  easy: "😊 イージー",
  medium: "😏 ミディアム",
  hard: "🔥 ハード",
  extreme: "💀 エクストリーム",
};

export default function AdultMission() {
  const [currentMission, setCurrentMission] = useState<typeof MISSIONS[0] | null>(null);
  const [usedMissions, setUsedMissions] = useState<Set<number>>(new Set());
  const [isDrawing, setIsDrawing] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7);

  const drawCard = () => {
    if (isDrawing) return;

    setIsDrawing(true);
    setCurrentMission(null);

    setTimeout(() => {
      let used = usedMissions;
      if (used.size >= MISSIONS.length) {
        used = new Set();
        setUsedMissions(new Set());
      }

      let index: number;
      do {
        index = Math.floor(Math.random() * MISSIONS.length);
      } while (used.has(index) && used.size < MISSIONS.length);

      setCurrentMission(MISSIONS[index]);
      setUsedMissions(new Set([...used, index]));
      setIsDrawing(false);

      const newCount = playCount + 1;
      setPlayCount(newCount);
      if (newCount >= nextAdAt) {
        setShowAd(true);
        setPlayCount(0);
        setNextAdAt(Math.floor(Math.random() * 4) + 7);
      }
    }, 500);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "easy": return "bg-green-500/20 text-green-400 border-green-500";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
      case "hard": return "bg-orange-500/20 text-orange-400 border-orange-500";
      case "extreme": return "bg-red-500/20 text-red-400 border-red-500";
      default: return "bg-pink-500/20 text-pink-400 border-pink-500";
    }
  };

  return (
    <GameLayout title="エロミッションカード">
      <div className="space-y-6">
        <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
          <div className="text-5xl mb-4">🃏</div>
          <h2 className="text-pink-400 text-xl font-bold mb-2">エロミッションカード</h2>
          <p className="text-pink-200/70 text-sm">
            カードを引いてミッションを実行！
          </p>
        </div>

        {/* カード表示エリア */}
        <div className="relative h-64">
          {!currentMission ? (
            <div
              onClick={drawCard}
              className={`absolute inset-0 glass-card-pink rounded-3xl flex flex-col items-center justify-center cursor-pointer btn-ios ${
                isDrawing ? "animate-pulse" : ""
              }`}
            >
              <div className="text-6xl mb-4">🎴</div>
              <p className="text-pink-400 font-bold">
                {isDrawing ? "引いています..." : "タップしてカードを引く"}
              </p>
            </div>
          ) : (
            <div className="absolute inset-0 glass-card-pink rounded-3xl p-6 flex flex-col items-center justify-center glow-pink animate-fade-in">
              <div className={`px-4 py-1 rounded-full text-sm font-bold mb-4 border ${getLevelColor(currentMission.level)}`}>
                {LEVEL_LABELS[currentMission.level as keyof typeof LEVEL_LABELS]}
              </div>
              <div className="text-5xl mb-4">{currentMission.emoji}</div>
              <div className="bg-black/50 rounded-2xl p-4 border-2 border-pink-500 w-full">
                <p className="text-pink-200 text-xl font-bold text-center">
                  {currentMission.mission}
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={drawCard}
          disabled={isDrawing}
          className={`w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg ${
            isDrawing ? "opacity-50" : ""
          }`}
        >
          {currentMission ? "次のカードを引く" : "カードを引く"}
        </button>

        <div className="glass-card-pink rounded-2xl p-4">
          <p className="text-pink-400/70 text-center text-sm mb-2">
            できなかったら飲む🍺
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {LEVELS.map((level) => (
              <span
                key={level}
                className={`px-2 py-1 rounded text-xs border ${getLevelColor(level)}`}
              >
                {LEVEL_LABELS[level]}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card-pink rounded-2xl p-4">
          <p className="text-pink-400/70 text-center text-sm">
            残りカード: {MISSIONS.length - usedMissions.size} / {MISSIONS.length}
          </p>
        </div>
      </div>
      <AdModal isOpen={showAd} onClose={() => setShowAd(false)} />
    </GameLayout>
  );
}
