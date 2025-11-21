import { useParams, useNavigate } from "react-router-dom";
import type { GameId } from "../types";
import HighLow from "../games/HighLow";
import KingsCup from "../games/KingsCup";
import Roulette from "../games/Roulette";
import Ojisan from "../games/Ojisan";
import Oogiri from "../games/Oogiri";
import SongRoulette from "../games/SongRoulette";
import Cabajou from "../games/Cabajou";

export default function GameRouter() {
  const { id } = useParams<{ id: GameId }>();
  const navigate = useNavigate();

  const renderGame = () => {
    switch (id) {
      case "highlow":
        return <HighLow />;
      case "kingscup":
        return <KingsCup />;
      case "roulette":
        return <Roulette />;
      case "ojisan":
        return <Ojisan />;
      case "oogiri":
        return <Oogiri />;
      case "songroulette":
        return <SongRoulette />;
      case "cabajou":
        return <Cabajou />;
      default:
        return (
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl text-gold mb-4">ゲームが見つかりません</h1>
              <button
                onClick={() => navigate("/select")}
                className="bg-gold text-black px-6 py-3 rounded-lg font-bold"
              >
                ゲーム選択へ戻る
              </button>
            </div>
          </div>
        );
    }
  };

  return <>{renderGame()}</>;
}
