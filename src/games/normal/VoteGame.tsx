import { useState } from "react";
import GameLayout from "../../components/GameLayout";

const VOTE_TOPICS = [
  "一番モテそうな人",
  "一番お金持ちそうな人",
  "一番浮気しそうな人",
  "一番結婚早そうな人",
  "一番ギャンブル好きそうな人",
  "一番嘘つきそうな人",
  "一番ドSそうな人",
  "一番甘えん坊そうな人",
  "一番料理上手そうな人",
  "一番朝弱そうな人",
  "一番酒に強そうな人",
  "一番メンヘラそうな人",
  "一番オタクそうな人",
  "一番頭良さそうな人",
  "一番スポーツできそうな人",
  "一番怖い上司になりそうな人",
  "一番社長になりそうな人",
  "一番芸能人になれそうな人",
  "一番詐欺に引っかかりそうな人",
  "一番借金しそうな人",
  "一番整形してそうな人",
  "一番過去がありそうな人",
  "一番ナンパ成功しそうな人",
  "一番逆ナンされそうな人",
  "一番面白い人",
];

interface Vote {
  voter: number;
  target: number;
}

export default function VoteGame() {
  const [playerCount, setPlayerCount] = useState(4);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [currentVoter, setCurrentVoter] = useState(1);
  const [phase, setPhase] = useState<"setup" | "topic" | "vote" | "result">("setup");
  const [usedTopics, setUsedTopics] = useState<Set<number>>(new Set());

  const selectTopic = () => {
    let used = usedTopics;
    if (used.size >= VOTE_TOPICS.length) {
      used = new Set();
      setUsedTopics(new Set());
    }

    let index: number;
    do {
      index = Math.floor(Math.random() * VOTE_TOPICS.length);
    } while (used.has(index) && used.size < VOTE_TOPICS.length);

    setCurrentTopic(VOTE_TOPICS[index]);
    setUsedTopics(new Set([...used, index]));
    setPhase("topic");
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
    <GameLayout title="匿名投票ゲーム">
      <div className="space-y-6">
        {phase === "setup" && (
          <>
            <div className="glass-card rounded-3xl p-6 text-center">
              <div className="text-5xl mb-4">🗳️</div>
              <h2 className="text-gold text-xl font-bold mb-2">匿名投票ゲーム</h2>
              <p className="text-gold-light/70 text-sm">
                「一番◯◯な人」を投票！票が多い人が飲む🍺
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <label className="text-gold font-semibold block mb-3">参加人数</label>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
                  className="w-12 h-12 rounded-xl bg-gold/20 text-gold text-2xl font-bold btn-ios"
                >
                  -
                </button>
                <span className="text-gold text-4xl font-bold w-16 text-center">
                  {playerCount}
                </span>
                <button
                  onClick={() => setPlayerCount(Math.min(12, playerCount + 1))}
                  className="w-12 h-12 rounded-xl bg-gold/20 text-gold text-2xl font-bold btn-ios"
                >
                  +
                </button>
              </div>
              <p className="text-gold-light/50 text-xs text-center mt-2">
                各自1〜{playerCount}の番号を決めてね
              </p>
            </div>

            <button
              onClick={selectTopic}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              お題を決める
            </button>
          </>
        )}

        {phase === "topic" && currentTopic && (
          <>
            <div className="glass-card rounded-3xl p-8 text-center glow-gold">
              <div className="text-5xl mb-4">📋</div>
              <h2 className="text-gold text-lg mb-4">今回のお題</h2>
              <div className="bg-black/50 rounded-2xl p-6 border-2 border-gold">
                <p className="text-gold-light text-2xl font-bold">
                  {currentTopic}
                </p>
              </div>
            </div>

            <button
              onClick={startVoting}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              投票開始
            </button>
          </>
        )}

        {phase === "vote" && (
          <>
            <div className="glass-card rounded-3xl p-6 text-center">
              <p className="text-gold/70 mb-2">お題</p>
              <p className="text-gold font-bold text-lg">{currentTopic}</p>
            </div>

            <div className="glass-card rounded-3xl p-6 text-center">
              <div className="text-4xl mb-3">🙈</div>
              <p className="text-gold text-xl font-bold mb-2">
                プレイヤー {currentVoter} の番
              </p>
              <p className="text-gold-light/70 text-sm">
                他の人は見ないでね！
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: playerCount }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => castVote(num)}
                  disabled={num === currentVoter}
                  className={`glass-card p-4 rounded-2xl text-center btn-ios ${
                    num === currentVoter ? "opacity-30" : "glow-gold"
                  }`}
                >
                  <span className="text-gold text-2xl font-bold">{num}</span>
                </button>
              ))}
            </div>

            <p className="text-gold/50 text-center text-xs">
              ※自分以外の人に投票してね
            </p>
          </>
        )}

        {phase === "result" && (
          <>
            <div className="glass-card rounded-3xl p-6 text-center glow-gold">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="text-gold text-xl font-bold">結果発表！</h2>
              <p className="text-gold/70 text-sm mt-2">{currentTopic}</p>
            </div>

            <div className="space-y-3">
              {getResults().map((result, index) => (
                <div
                  key={result.player}
                  className={`glass-card rounded-2xl p-4 flex items-center justify-between ${
                    index === 0 ? "border-2 border-gold glow-gold" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {index === 0 ? "👑" : index === 1 ? "🥈" : index === 2 ? "🥉" : ""}
                    </span>
                    <span className="text-gold font-bold text-xl">
                      プレイヤー {result.player}
                    </span>
                  </div>
                  <span className="text-gold-light text-xl font-bold">
                    {result.count}票
                  </span>
                </div>
              ))}
            </div>

            {getResults().length > 0 && (
              <div className="glass-card rounded-2xl p-4 text-center">
                <p className="text-gold">
                  プレイヤー {getResults()[0].player} が飲む！🍺
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={nextRound}
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
