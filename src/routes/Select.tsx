import { useNavigate, useSearchParams } from "react-router-dom";
import { GAMES } from "../data/games";
import type { GameMode } from "../types";

export default function Select() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") as GameMode) || "normal";
  const isAdult = mode === "adult";

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-2xl mx-auto">
        {/* モード表示 */}
        <div className="text-center mb-4">
          <span className={`text-sm px-3 py-1 rounded-full ${
            isAdult
              ? "bg-pink-600 text-white"
              : "bg-gold text-black"
          }`}>
            {isAdult ? "🔞 Adult Mode" : "🍻 Normal Mode"}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gold text-center mb-8">
          ゲームを選択
        </h1>

        {/* Adult Mode: 上部広告 */}
        {isAdult && (
          <div className="mb-6 bg-gradient-to-r from-pink-900 to-purple-900 border border-pink-500 rounded-2xl p-4 text-center">
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-300 hover:text-pink-100 transition"
            >
              🔞 今日話せる相手を探す →
            </a>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {GAMES.map((game) => (
            <button
              key={game.id}
              onClick={() => navigate(`/game/${game.id}?mode=${mode}`)}
              className={`bg-gradient-to-br from-gray-900 to-black border-2 p-6 rounded-2xl shadow-lg transform transition hover:scale-105 active:scale-95 ${
                isAdult
                  ? "border-pink-500 hover:border-pink-400"
                  : "border-gold hover:border-gold-light"
              }`}
            >
              <h2 className={`text-xl font-bold mb-2 ${
                isAdult ? "text-pink-400" : "text-gold"
              }`}>
                {game.title}
              </h2>
              <p className={`text-sm opacity-80 ${
                isAdult ? "text-pink-200" : "text-gold-light"
              }`}>
                {game.description}
              </p>
            </button>
          ))}
        </div>

        {/* Adult Mode: 下部広告 */}
        {isAdult && (
          <div className="mt-6 bg-gradient-to-r from-purple-900 to-pink-900 border border-pink-500 rounded-2xl p-4 text-center">
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-300 hover:text-pink-100 transition"
            >
              💕 出会いを見つける →
            </a>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className={`w-full mt-8 bg-gray-800 font-bold py-3 rounded-lg border hover:bg-gray-700 transition ${
            isAdult
              ? "text-pink-400 border-pink-500"
              : "text-gold border-gold"
          }`}
        >
          ← モード選択に戻る
        </button>
      </div>
    </div>
  );
}
