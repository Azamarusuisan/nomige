import { useState } from "react";
import GameLayout from "../../components/GameLayout";
import AdModal from "../../components/AdModal";

const ADULT_POINT_TOPICS = [
  "一番エロそうな人",
  "一番経験人数多そうな人",
  "一番ムッツリそうな人",
  "一番早漏そうな人",
  "一番絶倫そうな人",
  "一番AVよく見てそうな人",
  "一番ワンナイトしそうな人",
  "一番浮気しそうな人",
  "一番セフレいそうな人",
  "一番SMのSっぽい人",
  "一番SMのMっぽい人",
  "一番夜うるさそうな人",
  "一番オナニー頻度高そうな人",
  "一番性癖やばそうな人",
  "一番ナンパ成功しそうな人",
  "一番逆ナン成功しそうな人",
  "一番キスうまそうな人",
  "一番テクありそうな人",
  "一番持続力ありそうな人",
  "一番朝まで持ちそうな人",
  "一番風俗行ってそうな人",
  "一番マッチングアプリ使ってそうな人",
  "一番エロい妄想してそうな人",
  "一番セクシーな人",
  "一番甘え上手そうな人",
];

export default function AdultPointFinger() {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [usedTopics, setUsedTopics] = useState<Set<number>>(new Set());
  const [showTopic, setShowTopic] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [playCount, setPlayCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7);

  const selectTopic = () => {
    let used = usedTopics;
    if (used.size >= ADULT_POINT_TOPICS.length) {
      used = new Set();
      setUsedTopics(new Set());
    }

    let index: number;
    do {
      index = Math.floor(Math.random() * ADULT_POINT_TOPICS.length);
    } while (used.has(index) && used.size < ADULT_POINT_TOPICS.length);

    setCurrentTopic(ADULT_POINT_TOPICS[index]);
    setUsedTopics(new Set([...used, index]));
    setShowTopic(true);
    setCountdown(null);

    const newCount = playCount + 1;
    setPlayCount(newCount);
    if (newCount >= nextAdAt) {
      setShowAd(true);
      setPlayCount(0);
      setNextAdAt(Math.floor(Math.random() * 4) + 7);
    }
  };

  const startCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const nextTopic = () => {
    setShowTopic(false);
    setCountdown(null);
    selectTopic();
  };

  const reset = () => {
    setCurrentTopic(null);
    setShowTopic(false);
    setCountdown(null);
  };

  return (
    <GameLayout title="エロ指差しゲーム">
      <div className="space-y-6">
        {!showTopic ? (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
              <div className="text-5xl mb-4">👉</div>
              <h2 className="text-pink-400 text-xl font-bold mb-2">エロ指差しゲーム</h2>
              <p className="text-pink-200/70 text-sm">
                お題に当てはまる人を「せーの」で指差す！
              </p>
            </div>

            <button
              onClick={selectTopic}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              お題を出す
            </button>
          </>
        ) : (
          <>
            <div className="glass-card-pink rounded-3xl p-8 text-center glow-pink">
              <p className="text-pink-400/70 text-sm mb-3">今回のお題</p>
              <div className="bg-black/50 rounded-2xl p-6 border-2 border-pink-500">
                <p className="text-pink-200 text-2xl font-bold leading-relaxed">
                  {currentTopic}
                </p>
              </div>
            </div>

            {countdown === null && (
              <button
                onClick={startCountdown}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
              >
                カウントダウン開始
              </button>
            )}

            {countdown !== null && countdown > 0 && (
              <div className="glass-card-pink rounded-3xl p-12 text-center glow-pink">
                <div className="text-pink-200 text-9xl font-extrabold animate-pulse">
                  {countdown}
                </div>
              </div>
            )}

            {countdown === 0 && (
              <div className="glass-card-pink rounded-3xl p-8 text-center glow-pink animate-pulse">
                <div className="text-6xl mb-4">👆</div>
                <div className="text-pink-200 text-4xl font-extrabold">
                  指差せ！
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={nextTopic}
                className="glass-card-pink text-pink-400 font-bold py-4 rounded-2xl btn-ios"
              >
                次のお題
              </button>
              <button
                onClick={reset}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 rounded-2xl"
              >
                最初から
              </button>
            </div>
          </>
        )}
      </div>
      <AdModal isOpen={showAd} onClose={() => setShowAd(false)} />
    </GameLayout>
  );
}
