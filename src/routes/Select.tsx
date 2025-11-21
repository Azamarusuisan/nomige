import { useNavigate } from "react-router-dom";
import { GAMES } from "../data/games";

export default function Select() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gold text-center mb-8">
          ゲームを選択
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {GAMES.map((game) => (
            <button
              key={game.id}
              onClick={() => navigate(`/game/${game.id}`)}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-gold p-6 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95 hover:border-gold-light"
            >
              <h2 className="text-xl font-bold text-gold mb-2">
                {game.title}
              </h2>
              <p className="text-sm text-gold-light opacity-80">
                {game.description}
              </p>
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full mt-8 bg-gray-800 text-gold font-bold py-3 rounded-lg border border-gold hover:bg-gray-700 transition"
        >
          戻る
        </button>
      </div>
    </div>
  );
}
