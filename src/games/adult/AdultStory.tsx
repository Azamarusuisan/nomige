import { useState } from "react";
import GameLayout from "../../components/GameLayout";
import AdModal from "../../components/AdModal";

const STORY_STARTERS = [
  "合コンで出会った二人が...",
  "終電を逃した夜...",
  "温泉旅行で...",
  "酔った勢いで...",
  "隣に住む人と...",
  "会社の飲み会の後...",
  "学校の先生と生徒が...",
  "マッチングアプリで出会った二人が...",
  "エレベーターで二人きりになって...",
  "友達の元カレ/元カノと...",
  "上司と部下が出張先で...",
  "バーで隣に座った人と...",
  "久しぶりに会った元カレ/元カノと...",
  "雨宿りで出会った人と...",
  "ジムで知り合った人と...",
];

const STORY_KEYWORDS = [
  "見つめ合う",
  "手を握る",
  "キスする",
  "抱きしめる",
  "耳元でささやく",
  "服を脱ぐ",
  "シャワーを浴びる",
  "ベッドに倒れ込む",
  "朝まで...",
  "告白する",
  "後悔する",
  "誰かに見られる",
  "連絡先を交換する",
  "そのまま帰る",
  "もう一度会う約束をする",
];

export default function AdultStory() {
  const [phase, setPhase] = useState<"start" | "playing" | "end">("start");
  const [currentStarter, setCurrentStarter] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [roundCount, setRoundCount] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7);

  const startGame = () => {
    const starter = STORY_STARTERS[Math.floor(Math.random() * STORY_STARTERS.length)];
    setCurrentStarter(starter);
    setCurrentKeyword("");
    setRoundCount(0);
    setPhase("playing");
  };

  const nextTurn = () => {
    const keyword = STORY_KEYWORDS[Math.floor(Math.random() * STORY_KEYWORDS.length)];
    setCurrentKeyword(keyword);
    setRoundCount(roundCount + 1);

    const newCount = playCount + 1;
    setPlayCount(newCount);
    if (newCount >= nextAdAt) {
      setShowAd(true);
      setPlayCount(0);
      setNextAdAt(Math.floor(Math.random() * 4) + 7);
    }
  };

  const endGame = () => {
    setPhase("end");
  };

  const reset = () => {
    setPhase("start");
    setCurrentStarter("");
    setCurrentKeyword("");
    setRoundCount(0);
  };

  return (
    <GameLayout title="妄想ストーリーリレー">
      <div className="space-y-6">
        {phase === "start" && (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink">
              <div className="text-5xl mb-4">📖</div>
              <h2 className="text-pink-400 text-xl font-bold mb-2">妄想ストーリーリレー</h2>
              <p className="text-pink-200/70 text-sm">
                エロい妄想ストーリーをリレー形式で作ろう！
              </p>
            </div>

            <div className="glass-card-pink rounded-2xl p-6">
              <h3 className="text-pink-400 font-semibold mb-3">遊び方</h3>
              <ol className="text-pink-200/70 text-sm space-y-2">
                <li>1. 最初のシチュエーションが出る</li>
                <li>2. 順番にストーリーを続ける</li>
                <li>3. キーワードが出たらそれを使う</li>
                <li>4. 面白くない人が飲む🍺</li>
              </ol>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              ゲームスタート
            </button>
          </>
        )}

        {phase === "playing" && (
          <>
            <div className="glass-card-pink rounded-3xl p-6 text-center">
              <p className="text-pink-400/70 text-sm mb-2">シチュエーション</p>
              <div className="bg-black/50 rounded-2xl p-4 border-2 border-pink-500">
                <p className="text-pink-200 text-lg font-semibold">
                  {currentStarter}
                </p>
              </div>
            </div>

            {currentKeyword && (
              <div className="glass-card-pink rounded-3xl p-6 text-center glow-pink animate-fade-in">
                <p className="text-pink-400/70 text-sm mb-2">使うキーワード</p>
                <div className="bg-black/50 rounded-2xl p-4 border-2 border-pink-500">
                  <p className="text-pink-200 text-2xl font-bold">
                    「{currentKeyword}」
                  </p>
                </div>
                <p className="text-pink-400/50 text-xs mt-3">
                  このキーワードを使ってストーリーを続けてね
                </p>
              </div>
            )}

            <div className="glass-card-pink rounded-2xl p-4">
              <p className="text-pink-400/70 text-center">
                ラウンド: {roundCount}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={nextTurn}
                className="glass-card-pink text-pink-400 font-bold py-4 rounded-2xl btn-ios"
              >
                次のキーワード
              </button>
              <button
                onClick={endGame}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 rounded-2xl"
              >
                終了
              </button>
            </div>
          </>
        )}

        {phase === "end" && (
          <>
            <div className="glass-card-pink rounded-3xl p-8 text-center glow-pink">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-pink-400 text-2xl font-bold mb-4">終了！</h2>
              <p className="text-pink-200/70">
                一番つまらなかった人が飲む🍺
              </p>
            </div>

            <div className="glass-card-pink rounded-2xl p-4">
              <p className="text-pink-400/70 text-center">
                合計 {roundCount} ターン
              </p>
            </div>

            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              もう一度遊ぶ
            </button>
          </>
        )}
      </div>
      <AdModal isOpen={showAd} onClose={() => setShowAd(false)} />
    </GameLayout>
  );
}
