import { useState } from "react";
import GameLayout from "../../components/GameLayout";
import AdModal from "../../components/AdModal";
import { ADULT_TRUTH_QUESTIONS, ADULT_DARE_MISSIONS } from "../../data/adultTruthOrDare";

export default function AdultTruthOrDare() {
  const [choice, setChoice] = useState<"truth" | "dare" | null>(null);
  const [content, setContent] = useState<string>("");
  const [usedTruth, setUsedTruth] = useState<Set<number>>(new Set());
  const [usedDare, setUsedDare] = useState<Set<number>>(new Set());
  const [playCount, setPlayCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7);

  const selectChoice = (type: "truth" | "dare") => {
    setChoice(type);

    const questions = type === "truth" ? ADULT_TRUTH_QUESTIONS : ADULT_DARE_MISSIONS;
    const used = type === "truth" ? usedTruth : usedDare;

    if (used.size >= questions.length) {
      if (type === "truth") {
        setUsedTruth(new Set());
      } else {
        setUsedDare(new Set());
      }
    }

    let index: number;
    do {
      index = Math.floor(Math.random() * questions.length);
    } while (used.has(index) && used.size < questions.length);

    setContent(questions[index]);

    if (type === "truth") {
      setUsedTruth(new Set([...usedTruth, index]));
    } else {
      setUsedDare(new Set([...usedDare, index]));
    }

    // 広告ロジック
    const newCount = playCount + 1;
    setPlayCount(newCount);
    if (newCount >= nextAdAt) {
      setShowAd(true);
      setPlayCount(0);
      setNextAdAt(Math.floor(Math.random() * 4) + 7);
    }
  };

  const reset = () => {
    setChoice(null);
    setContent("");
  };

  return (
    <GameLayout title="エロTruth or Dare">
      <div className="space-y-6">
        {!choice ? (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
              <div className="text-5xl mb-4">🔥</div>
              <h2 className="text-pink-400 text-xl font-bold mb-2">エロTruth or Dare</h2>
              <p className="text-pink-200/70 text-sm">
                大人向けの質問と罰ゲーム！
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => selectChoice("truth")}
                className="glass-card-pink glow-pink p-8 rounded-3xl text-center btn-ios"
              >
                <div className="text-5xl mb-3">💋</div>
                <h3 className="text-pink-400 text-xl font-bold">Truth</h3>
                <p className="text-pink-200/50 text-xs mt-2">エロい質問</p>
              </button>

              <button
                onClick={() => selectChoice("dare")}
                className="glass-card-pink glow-pink p-8 rounded-3xl text-center btn-ios"
              >
                <div className="text-5xl mb-3">😈</div>
                <h3 className="text-pink-400 text-xl font-bold">Dare</h3>
                <p className="text-pink-200/50 text-xs mt-2">エロい罰ゲーム</p>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="glass-card-pink rounded-3xl p-8 text-center glow-pink">
              <div className="text-5xl mb-4">
                {choice === "truth" ? "💋" : "😈"}
              </div>
              <h2 className="text-pink-400 text-xl font-bold mb-6">
                {choice === "truth" ? "Truth" : "Dare"}
              </h2>
              <div className="bg-black/50 rounded-2xl p-6 border-2 border-pink-500">
                <p className="text-pink-200 text-xl font-semibold leading-relaxed">
                  {content}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => selectChoice("truth")}
                className="glass-card-pink text-pink-400 font-bold py-4 rounded-2xl btn-ios"
              >
                次のTruth
              </button>
              <button
                onClick={() => selectChoice("dare")}
                className="glass-card-pink text-pink-400 font-bold py-4 rounded-2xl btn-ios"
              >
                次のDare
              </button>
            </div>

            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg"
            >
              選び直す
            </button>
          </>
        )}
      </div>
      <AdModal isOpen={showAd} onClose={() => setShowAd(false)} />
    </GameLayout>
  );
}
