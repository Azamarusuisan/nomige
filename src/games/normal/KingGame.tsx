import { useState } from "react";
import GameLayout from "../../components/GameLayout";

const COMMANDS = [
  "隣の人と乾杯する",
  "一気飲みする",
  "好きな人を指名して飲ませる",
  "全員で乾杯",
  "自分だけ飲む",
  "指名した人と一緒に飲む",
  "左隣の人に飲ませる",
  "右隣の人に飲ませる",
  "モノマネをしながら飲む",
  "一番若い人が飲む",
  "一番年上の人が飲む",
  "メガネをかけている人が飲む",
  "腕立て5回してから飲む",
  "30秒以内に飲み干す",
  "目を閉じて飲む",
  "両手で飲む",
  "片足立ちで飲む",
  "誰かに「好き」と言ってから飲む",
  "変顔しながら飲む",
  "ラップ調で乾杯の音頭をとる",
];

export default function KingGame() {
  const [kingNumber, setKingNumber] = useState<number | null>(null);
  const [command, setCommand] = useState<string>("");
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [phase, setPhase] = useState<"setup" | "reveal" | "result">("setup");

  const startGame = () => {
    const king = Math.floor(Math.random() * playerCount) + 1;
    const cmd = COMMANDS[Math.floor(Math.random() * COMMANDS.length)];
    setKingNumber(king);
    setCommand(cmd);
    setPhase("reveal");
  };

  const showResult = () => {
    setPhase("result");
  };

  const reset = () => {
    setKingNumber(null);
    setCommand("");
    setPhase("setup");
  };

  return (
    <GameLayout title="スマホ王様ゲーム">
      <div className="space-y-6">
        {phase === "setup" && (
          <>
            <div className="glass-card rounded-3xl p-6 text-center">
              <div className="text-5xl mb-4">🤴</div>
              <h2 className="text-gold text-xl font-bold mb-2">王様ゲーム</h2>
              <p className="text-gold-light/70 text-sm">
                参加人数を設定して、王様と命令をランダムに決めよう！
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <label className="text-gold font-semibold block mb-3">
                参加人数
              </label>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPlayerCount(Math.max(2, playerCount - 1))}
                  className="w-12 h-12 rounded-xl bg-gold/20 text-gold text-2xl font-bold"
                >
                  -
                </button>
                <span className="text-gold text-4xl font-bold w-16 text-center">
                  {playerCount}
                </span>
                <button
                  onClick={() => setPlayerCount(Math.min(20, playerCount + 1))}
                  className="w-12 h-12 rounded-xl bg-gold/20 text-gold text-2xl font-bold"
                >
                  +
                </button>
              </div>
              <p className="text-gold-light/50 text-xs text-center mt-2">
                各自1〜{playerCount}の番号を決めてね
              </p>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              王様を決める！
            </button>
          </>
        )}

        {phase === "reveal" && (
          <>
            <div className="glass-card rounded-3xl p-8 text-center glow-gold">
              <div className="text-6xl mb-4">👑</div>
              <h2 className="text-gold text-2xl font-bold mb-2">王様は...</h2>
              <div className="text-gold-light text-8xl font-extrabold my-6">
                {kingNumber}番
              </div>
              <p className="text-gold/70">の人です！</p>
            </div>

            <button
              onClick={showResult}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              命令を見る
            </button>
          </>
        )}

        {phase === "result" && (
          <>
            <div className="glass-card rounded-3xl p-8 text-center glow-gold">
              <div className="text-5xl mb-4">📜</div>
              <h2 className="text-gold text-xl font-bold mb-4">王様の命令</h2>
              <div className="bg-black/50 rounded-2xl p-6 border-2 border-gold">
                <p className="text-gold-light text-2xl font-bold leading-relaxed">
                  {command}
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <p className="text-gold/70 text-center text-sm">
                王様（{kingNumber}番）が誰にやらせるか決めてね！
              </p>
            </div>

            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              もう一度遊ぶ
            </button>
          </>
        )}
      </div>
    </GameLayout>
  );
}
