import { useState } from "react";
import GameLayout from "../../components/GameLayout";

const POINT_TOPICS = [
  "家でママって呼んでそうな人",
  "実は彼氏/彼女いそうな人",
  "一番お酒弱そうな人",
  "一番ナルシストそうな人",
  "一番貯金ありそうな人",
  "一番浪費家そうな人",
  "一番彼氏/彼女に尽くしそうな人",
  "一番束縛しそうな人",
  "一番ドケチそうな人",
  "一番秘密ありそうな人",
  "一番泣き虫そうな人",
  "一番怒ったら怖そうな人",
  "一番ゲーム好きそうな人",
  "一番家でゴロゴロしてそうな人",
  "一番几帳面そうな人",
  "一番大雑把そうな人",
  "一番寝坊しそうな人",
  "一番遅刻しそうな人",
  "一番忘れ物しそうな人",
  "一番SNS依存そうな人",
  "一番YouTube見てそうな人",
  "一番TikTok見てそうな人",
  "一番カラオケ上手そうな人",
  "一番ダンス上手そうな人",
  "一番料理できなそうな人",
  "一番親に甘えてそうな人",
  "一番一人暮らし向いてなさそうな人",
  "一番ペット飼ってそうな人",
  "一番インドア派そうな人",
  "一番アウトドア派そうな人",
];

export default function PointFinger() {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [usedTopics, setUsedTopics] = useState<Set<number>>(new Set());
  const [showTopic, setShowTopic] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const selectTopic = () => {
    let used = usedTopics;
    if (used.size >= POINT_TOPICS.length) {
      used = new Set();
      setUsedTopics(new Set());
    }

    let index: number;
    do {
      index = Math.floor(Math.random() * POINT_TOPICS.length);
    } while (used.has(index) && used.size < POINT_TOPICS.length);

    setCurrentTopic(POINT_TOPICS[index]);
    setUsedTopics(new Set([...used, index]));
    setShowTopic(true);
    setCountdown(null);
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
    <GameLayout title="指差し一致ゲーム">
      <div className="space-y-6">
        {!showTopic ? (
          <>
            <div className="glass-card rounded-3xl p-6 text-center">
              <div className="text-5xl mb-4">👆</div>
              <h2 className="text-gold text-xl font-bold mb-2">指差し一致ゲーム</h2>
              <p className="text-gold-light/70 text-sm">
                お題に当てはまる人を「せーの」で指差す！<br />
                刺された人が飲む🍺
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-gold font-semibold mb-3">遊び方</h3>
              <ol className="text-gold-light/70 text-sm space-y-2">
                <li>1. お題を確認する</li>
                <li>2. カウントダウン後、全員で指を差す</li>
                <li>3. 一番多く指された人が飲む</li>
                <li>4. 同数なら全員飲む</li>
              </ol>
            </div>

            <button
              onClick={selectTopic}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              お題を出す
            </button>
          </>
        ) : (
          <>
            <div className="glass-card rounded-3xl p-8 text-center glow-gold">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-gold/70 text-sm mb-3">今回のお題</p>
              <div className="bg-black/50 rounded-2xl p-6 border-2 border-gold">
                <p className="text-gold-light text-2xl font-bold leading-relaxed">
                  {currentTopic}
                </p>
              </div>
            </div>

            {countdown === null && (
              <button
                onClick={startCountdown}
                className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
              >
                カウントダウン開始
              </button>
            )}

            {countdown !== null && countdown > 0 && (
              <div className="glass-card rounded-3xl p-12 text-center glow-gold">
                <div className="text-gold-light text-9xl font-extrabold animate-pulse">
                  {countdown}
                </div>
              </div>
            )}

            {countdown === 0 && (
              <div className="glass-card rounded-3xl p-8 text-center glow-gold animate-pulse">
                <div className="text-6xl mb-4">👆</div>
                <div className="text-gold-light text-4xl font-extrabold">
                  指差せ！
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={nextTopic}
                className="glass-card text-gold font-bold py-4 rounded-2xl btn-ios"
              >
                次のお題
              </button>
              <button
                onClick={reset}
                className="bg-gradient-to-r from-gold to-gold-light text-black font-bold py-4 rounded-2xl"
              >
                最初から
              </button>
            </div>
          </>
        )}
      </div>
    </GameLayout>
  );
}
