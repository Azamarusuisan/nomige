import { useNavigate, useSearchParams } from "react-router-dom";
import { getNormalGames, getAdultGames } from "../data/gamesConfig";
import type { GameMode } from "../types";

export default function Select() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") as GameMode) || "normal";
  const isAdult = mode === "adult";

  const games = isAdult ? getAdultGames() : getNormalGames();

  return (
    <div className="min-h-screen bg-black p-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <span className={`text-sm px-4 py-2 rounded-full font-semibold ${
              isAdult
                ? "bg-pink-600/80 text-white"
                : "bg-gold/90 text-black"
            }`}>
              {isAdult ? "🔞 Adult Mode" : "🍻 Normal Mode"}
            </span>
          </div>
          <h1 className={`text-3xl font-extrabold tracking-tight ${
            isAdult ? "text-pink-400" : "text-gold"
          }`}>
            ゲームを選択
          </h1>
        </div>

        {/* ゲームカードグリッド */}
        <div className="grid grid-cols-2 gap-4">
          {games.map((game, index) => (
            <button
              key={game.slug}
              onClick={() => navigate(`/game/${game.slug}?mode=${mode}`)}
              className={`btn-ios ${isAdult ? "glass-card-pink glow-pink" : "glass-card glow-gold"} p-5 rounded-3xl shadow-ios text-left`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{game.emoji}</span>
                <h2 className={`text-base font-bold ${
                  isAdult ? "text-pink-400" : "text-gold"
                }`}>
                  {game.title}
                </h2>
              </div>
              <p className={`text-xs opacity-70 leading-relaxed ${
                isAdult ? "text-pink-200" : "text-gold-light"
              }`}>
                {game.description}
              </p>
            </button>
          ))}
        </div>

        {/* 戻るボタン */}
        <button
          onClick={() => navigate("/")}
          className={`btn-ios w-full mt-8 ${isAdult ? "glass-card-pink" : "glass-card"} font-bold py-4 rounded-2xl ${
            isAdult
              ? "text-pink-400"
              : "text-gold"
          }`}
        >
          ← モード選択に戻る
        </button>
      </div>
    </div>
  );
}
