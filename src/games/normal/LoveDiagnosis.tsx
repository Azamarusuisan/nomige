import { useState } from "react";
import GameLayout from "../../components/GameLayout";

const LOVE_QUESTIONS = [
  "理想のデートは？",
  "初デートで行きたい場所は？",
  "恋人に求める一番大事なことは？",
  "告白は自分からする派？される派？",
  "遠距離恋愛できる？",
  "束縛されるの好き？嫌い？",
  "恋人の元カレ/元カノ気になる？",
  "付き合って何日で「好き」って言う？",
  "一目惚れしたことある？",
  "好きなタイプを3つ挙げて",
  "恋人に浮気されたら許せる？",
  "年上派？年下派？同い年派？",
  "甘えたい派？甘えられたい派？",
  "サプライズされたい？したい？",
  "恋人との連絡頻度は？",
  "付き合う前にキスできる？",
  "恋人の友達と仲良くしたい？",
  "記念日は大事にする？",
  "同棲するなら付き合ってどれくらいから？",
  "結婚願望ある？",
  "恋人の親に会うのは緊張する？",
  "ペアルック着れる？",
  "恋人の携帯見たことある？",
  "元カレ/元カノと連絡取る？",
  "恋に落ちた瞬間を教えて",
];

export default function LoveDiagnosis() {
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCurrentQuestion(null);

    // ルーレットアニメーション
    const spins = 3 + Math.random() * 2;
    const newRotation = rotation + spins * 360;
    setRotation(newRotation);

    setTimeout(() => {
      // ランダムに質問を選ぶ
      let used = usedQuestions;
      if (used.size >= LOVE_QUESTIONS.length) {
        used = new Set();
        setUsedQuestions(new Set());
      }

      let index: number;
      do {
        index = Math.floor(Math.random() * LOVE_QUESTIONS.length);
      } while (used.has(index) && used.size < LOVE_QUESTIONS.length);

      setCurrentQuestion(LOVE_QUESTIONS[index]);
      setUsedQuestions(new Set([...used, index]));
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <GameLayout title="恋愛診断ルーレット">
      <div className="space-y-6">
        <div className="glass-card rounded-3xl p-6 text-center">
          <div className="text-5xl mb-4">💕</div>
          <h2 className="text-gold text-xl font-bold mb-2">恋愛診断ルーレット</h2>
          <p className="text-gold-light/70 text-sm">
            恋愛に関する質問に全員で答えよう！
          </p>
        </div>

        {/* ルーレット */}
        <div className="relative w-64 h-64 mx-auto">
          <div
            className="w-full h-full rounded-full border-8 border-gold flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-red-500/20"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? "transform 2s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-8 bg-gold rounded-b-full" />
            <div className="text-6xl">💕</div>
          </div>
          {/* 矢印 */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl">
            ▼
          </div>
        </div>

        <button
          onClick={spin}
          disabled={isSpinning}
          className={`w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-xl py-4 rounded-2xl shadow-lg ${
            isSpinning ? "opacity-50" : ""
          }`}
        >
          {isSpinning ? "回転中..." : "ルーレットを回す"}
        </button>

        {currentQuestion && (
          <div className="glass-card rounded-3xl p-6 text-center glow-gold animate-fade-in">
            <div className="text-3xl mb-4">❓</div>
            <div className="bg-black/50 rounded-2xl p-6 border-2 border-gold">
              <p className="text-gold-light text-xl font-semibold leading-relaxed">
                {currentQuestion}
              </p>
            </div>
            <p className="text-gold/50 text-sm mt-4">
              全員で答えてみよう！
            </p>
          </div>
        )}

        <div className="glass-card rounded-2xl p-4">
          <p className="text-gold/70 text-center text-sm">
            残り質問数: {LOVE_QUESTIONS.length - usedQuestions.size} / {LOVE_QUESTIONS.length}
          </p>
        </div>
      </div>
    </GameLayout>
  );
}
