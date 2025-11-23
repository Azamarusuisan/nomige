import { useState } from "react";
import GameLayout from "../../components/GameLayout";
import AdModal from "../../components/AdModal";

const ADULT_VOTE_TOPICS = [
  "一番床上手そうな人",
  "一番声が大きそうな人（夜）",
  "一番AVハマってそうな人",
  "一番ワンナイト経験ありそうな人",
  "一番浮気経験ありそうな人",
  "一番性欲強そうな人",
  "一番変態そうな人",
  "一番風俗好きそうな人",
  "一番オナニー頻度高そうな人",
  "一番絶倫そうな人",
  "一番早そうな人",
  "一番テクありそうな人",
  "一番ムッツリそうな人",
  "一番Sそうな人",
  "一番Mそうな人",
  "一番セフレいそうな人",
  "一番出会い系使ってそうな人",
  "一番経験人数多そうな人",
  "一番エロい妄想してそうな人",
  "一番攻めそうな人",
];

interface Vote {
  voter: number;
  target: number;
}

export default function AdultVote() {
  const [playerCount, setPlayerCount] = useState(4);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [currentVoter, setCurrentVoter] = useState(1);
  const [phase, setPhase] = useState<"setup" | "topic" | "vote" | "result">("setup");
  const [usedTopics, setUsedTopics] = useState<Set<number>>(new Set());
  const [playCount, setPlayCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7);

  const selectTopic = () => {
    let used = usedTopics;
    if (used.size >= ADULT_VOTE_TOPICS.length) {
      used = new Set();
      setUsedTopics(new Set());
    }

    let index: number;
    do {
      index = Math.floor(Math.random() * ADULT_VOTE_TOPICS.length);
    } while (used.has(index) && used.size < ADULT_VOTE_TOPICS.length);

    setCurrentTopic(ADULT_VOTE_TOPICS[index]);
    setUsedTopics(new Set([...used, index]));
    setPhase("topic");

    const newCount = playCount + 1;
    setPlayCount(newCount);
    if (newCount >= nextAdAt) {
      setShowAd(true);
      setPlayCount(0);
      setNextAdAt(Math.floor(Math.random() * 4) + 7);
    }
  };

  const startVoting = () => {
    setVotes([]);
    setCurrentVoter(1);
    setPhase("vote");
  };

  const castVote = (target: number) => {
    const newVotes = [...votes, { voter: currentVoter, target }];
    setVotes(newVotes);

    if (currentVoter < playerCount) {
      setCurrentVoter(currentVoter + 1);
    } else {
      setPhase("result");
    }
  };

  const getResults = () => {
    const counts: Record<number, number> = {};
    votes.forEach((v) => {
      counts[v.target] = (counts[v.target] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([player, count]) => ({ player: Number(player), count }))
      .sort((a, b) => b.count - a.count);
  };

  const reset = () => {
    setCurrentTopic(null);
    setVotes([]);
    setCurrentVoter(1);
    setPhase("setup");
  };

  const nextRound = () => {
    setVotes([]);
    setCurrentVoter(1);
    selectTopic();
  };

  return (
    <GameLayout title="エロ匿名投票ゲーム">
      <div className="space-y-6">
        {phase === "setup" && (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
              <div className="text-5xl mb-4">🗳️</div>
              <h2 className="text-pink-400 text-xl font-bold mb-2">エロ匿名投票ゲーム</h2>
              <p className="text-pink-200/70 text-sm">
                大人向けのお題で投票！
              </p>
            </div>

            <div className="glass-card-pink rounded-2xl p-6">
              <label className="text-pink-400 font-semibold block mb-3">参加人数</label>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
                  className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 text-2xl font-bold btn-ios"
                >
                  -
                </button>
                <span className="text-pink-400 text-4xl font-bold w-16 text-center">
                  {playerCount}
                </span>
                <button
                  onClick={() => setPlayerCount(Math.min(12, playerCount + 1))}
                  className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 text-2xl font-bold btn-ios"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={selectTopic}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              お題を決める
            </button>
          </>
        )}

        {phase === "topic" && currentTopic && (
          <>
            <div className="glass-card-pink rounded-3xl p-8 text-center glow-pink">
              <p className="text-pink-400/70 text-sm mb-3">今回のお題</p>
              <div className="bg-black/50 rounded-2xl p-6 border-2 border-pink-500">
                <p className="text-pink-200 text-2xl font-bold">
                  {currentTopic}
                </p>
              </div>
            </div>

            <button
              onClick={startVoting}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              投票開始
            </button>
          </>
        )}

        {phase === "vote" && (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center">
              <p className="text-pink-400/70 mb-2">お題</p>
              <p className="text-pink-400 font-bold text-lg">{currentTopic}</p>
            </div>

            <div className="glass-card-pink rounded-3xl p-6 text-center">
              <div className="text-4xl mb-3">🙈</div>
              <p className="text-pink-400 text-xl font-bold mb-2">
                プレイヤー {currentVoter} の番
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: playerCount }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => castVote(num)}
                  disabled={num === currentVoter}
                  className={`glass-card-pink p-4 rounded-2xl text-center btn-ios ${
                    num === currentVoter ? "opacity-30" : "glow-pink"
                  }`}
                >
                  <span className="text-pink-400 text-2xl font-bold">{num}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {phase === "result" && (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="text-pink-400 text-xl font-bold">結果発表！</h2>
              <p className="text-pink-400/70 text-sm mt-2">{currentTopic}</p>
            </div>

            <div className="space-y-3">
              {getResults().map((result, index) => (
                <div
                  key={result.player}
                  className={`glass-card-pink rounded-2xl p-4 flex items-center justify-between ${
                    index === 0 ? "border-2 border-pink-500 glow-pink" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {index === 0 ? "👑" : ""}
                    </span>
                    <span className="text-pink-400 font-bold text-xl">
                      プレイヤー {result.player}
                    </span>
                  </div>
                  <span className="text-pink-200 text-xl font-bold">
                    {result.count}票
                  </span>
                </div>
              ))}
            </div>

            {getResults().length > 0 && (
              <div className="glass-card-pink rounded-2xl p-4 text-center">
                <p className="text-pink-400">
                  プレイヤー {getResults()[0].player} が飲む！🍺
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={nextRound}
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
