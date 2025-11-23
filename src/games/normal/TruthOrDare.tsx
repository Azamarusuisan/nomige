import { useState } from "react";
import GameLayout from "../../components/GameLayout";
import { NORMAL_TRUTH_QUESTIONS, NORMAL_DARE_MISSIONS } from "../../data/adultTruthOrDare";

export default function TruthOrDare() {
  const [choice, setChoice] = useState<"truth" | "dare" | null>(null);
  const [content, setContent] = useState<string>("");
  const [usedTruth, setUsedTruth] = useState<Set<number>>(new Set());
  const [usedDare, setUsedDare] = useState<Set<number>>(new Set());

  const selectChoice = (type: "truth" | "dare") => {
    setChoice(type);

    const questions = type === "truth" ? NORMAL_TRUTH_QUESTIONS : NORMAL_DARE_MISSIONS;
    const used = type === "truth" ? usedTruth : usedDare;

    // 使用済みをリセット
    if (used.size >= questions.length) {
      if (type === "truth") {
        setUsedTruth(new Set());
      } else {
        setUsedDare(new Set());
      }
    }

    // ランダムに選ぶ
    let index: number;
    do {
      index = Math.floor(Math.random() * questions.length);
    } while (used.has(index) && used.size < questions.length);

    setContent(questions[index]);

    // 使用済みに追加
    if (type === "truth") {
      setUsedTruth(new Set([...usedTruth, index]));
    } else {
      setUsedDare(new Set([...usedDare, index]));
    }
  };

  const reset = () => {
    setChoice(null);
    setContent("");
  };

  return (
    <GameLayout title="Truth or Dare">
      <div className="space-y-6">
        {!choice ? (
          <>
            <div className="glass-card rounded-3xl p-6 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-gold text-xl font-bold mb-2">Truth or Dare</h2>
              <p className="text-gold-light/70 text-sm">
                真実を語るか、罰ゲームを実行するか？
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => selectChoice("truth")}
                className="glass-card glow-gold p-8 rounded-3xl text-center btn-ios"
              >
                <div className="text-5xl mb-3">🤔</div>
                <h3 className="text-gold text-xl font-bold">Truth</h3>
                <p className="text-gold-light/50 text-xs mt-2">質問に答える</p>
              </button>

              <button
                onClick={() => selectChoice("dare")}
                className="glass-card glow-gold p-8 rounded-3xl text-center btn-ios"
              >
                <div className="text-5xl mb-3">🎭</div>
                <h3 className="text-gold text-xl font-bold">Dare</h3>
                <p className="text-gold-light/50 text-xs mt-2">罰ゲーム</p>
              </button>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-gold font-semibold mb-2">遊び方</h3>
              <ul className="text-gold-light/70 text-sm space-y-1">
                <li>1. 順番を決める（ルーレットなど）</li>
                <li>2. TruthかDareを選ぶ</li>
                <li>3. 出た内容を実行！</li>
                <li>4. できなかったら飲む🍺</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className={`glass-card rounded-3xl p-8 text-center glow-gold`}>
              <div className="text-5xl mb-4">
                {choice === "truth" ? "🤔" : "🎭"}
              </div>
              <h2 className="text-gold text-xl font-bold mb-6">
                {choice === "truth" ? "Truth" : "Dare"}
              </h2>
              <div className="bg-black/50 rounded-2xl p-6 border-2 border-gold">
                <p className="text-gold-light text-xl font-semibold leading-relaxed">
                  {content}
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <p className="text-gold/70 text-center text-sm">
                {choice === "truth"
                  ? "正直に答えてね！嘘はダメ🙅"
                  : "ちゃんと実行してね！できなかったら飲む🍺"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => selectChoice("truth")}
                className="glass-card text-gold font-bold py-4 rounded-2xl btn-ios"
              >
                次のTruth
              </button>
              <button
                onClick={() => selectChoice("dare")}
                className="glass-card text-gold font-bold py-4 rounded-2xl btn-ios"
              >
                次のDare
              </button>
            </div>

            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold py-4 rounded-2xl shadow-lg"
            >
              選び直す
            </button>
          </>
        )}
      </div>
    </GameLayout>
  );
}
