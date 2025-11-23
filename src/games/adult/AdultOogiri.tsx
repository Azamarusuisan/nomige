import { useState } from "react";
import GameLayout from "../../components/GameLayout";
import AdModal from "../../components/AdModal";
import { ADULT_OOGIRI_QUESTIONS } from "../../data/adultOogiri";

export default function AdultOogiri() {
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [playCount, setPlayCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7);

  const drawQuestion = () => {
    let used = usedQuestions;
    if (used.size >= ADULT_OOGIRI_QUESTIONS.length) {
      used = new Set();
      setUsedQuestions(new Set());
    }

    let index: number;
    do {
      index = Math.floor(Math.random() * ADULT_OOGIRI_QUESTIONS.length);
    } while (used.has(index) && used.size < ADULT_OOGIRI_QUESTIONS.length);

    setCurrentQuestion(ADULT_OOGIRI_QUESTIONS[index]);
    setUsedQuestions(new Set([...used, index]));

    // 広告ロジック
    const newCount = playCount + 1;
    setPlayCount(newCount);
    if (newCount >= nextAdAt) {
      setShowAd(true);
      setPlayCount(0);
      setNextAdAt(Math.floor(Math.random() * 4) + 7);
    }
  };

  return (
    <GameLayout title="エロ大喜利">
      <div className="space-y-6">
        <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
          <div className="text-5xl mb-4">💬</div>
          <h2 className="text-pink-400 text-xl font-bold mb-2">エロ大喜利</h2>
          <p className="text-pink-200/70 text-sm">
            お題に対して面白い回答を考えよう！
          </p>
        </div>

        {currentQuestion && (
          <div className="glass-card-pink rounded-3xl p-8 text-center glow-pink animate-fade-in">
            <p className="text-pink-400/70 text-sm mb-4">お題</p>
            <div className="bg-black/50 rounded-2xl p-6 border-2 border-pink-500">
              <p className="text-pink-200 text-2xl font-bold leading-relaxed">
                {currentQuestion}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={drawQuestion}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
        >
          {currentQuestion ? "次のお題" : "お題を引く"}
        </button>

        <div className="glass-card-pink rounded-2xl p-4">
          <h3 className="text-pink-400 font-semibold mb-2">遊び方</h3>
          <ul className="text-pink-200/70 text-sm space-y-1">
            <li>1. お題を引く</li>
            <li>2. 全員で回答を考える</li>
            <li>3. 順番に発表</li>
            <li>4. 一番面白くなかった人が飲む🍺</li>
          </ul>
        </div>

        <div className="glass-card-pink rounded-2xl p-4">
          <p className="text-pink-400/70 text-center text-sm">
            残りお題: {ADULT_OOGIRI_QUESTIONS.length - usedQuestions.size} / {ADULT_OOGIRI_QUESTIONS.length}
          </p>
        </div>
      </div>
      <AdModal isOpen={showAd} onClose={() => setShowAd(false)} />
    </GameLayout>
  );
}
