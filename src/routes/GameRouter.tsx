import { useParams, useNavigate, useSearchParams } from "react-router-dom";

// Normal Games
import KingsCupGame from "../games/normal/KingsCup";
import RouletteGame from "../games/normal/Roulette";
import KingGame from "../games/normal/KingGame";
import WordWolf from "../games/normal/WordWolf";
import TruthOrDare from "../games/normal/TruthOrDare";
import LoveDiagnosis from "../games/normal/LoveDiagnosis";
import RolesDeck from "../games/normal/RolesDeck";
import VoteGame from "../games/normal/VoteGame";
import PointFinger from "../games/normal/PointFinger";
import SeatRoulette from "../games/normal/SeatRoulette";

// Adult Games
import AdultTruthOrDare from "../games/adult/AdultTruthOrDare";
import AdultOogiri from "../games/adult/AdultOogiri";
import AdultPointFinger from "../games/adult/AdultPointFinger";
import AdultVote from "../games/adult/AdultVote";
import AdultRoulette from "../games/adult/AdultRoulette";
import AdultStory from "../games/adult/AdultStory";
import AdultRank from "../games/adult/AdultRank";
import AdultSecret from "../games/adult/AdultSecret";
import AdultMission from "../games/adult/AdultMission";
import AdultFantasy from "../games/adult/AdultFantasy";

export default function GameRouter() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "normal";
  const isAdult = mode === "adult";

  const renderGame = () => {
    switch (id) {
      // Normal Games
      case "kingcup":
        return <KingsCupGame />;
      case "roulette":
        return <RouletteGame />;
      case "king":
        return <KingGame />;
      case "wolf":
        return <WordWolf />;
      case "truth":
        return <TruthOrDare />;
      case "love":
        return <LoveDiagnosis />;
      case "roles":
        return <RolesDeck />;
      case "vote":
        return <VoteGame />;
      case "pointfinger":
        return <PointFinger />;
      case "seatroulette":
        return <SeatRoulette />;

      // Adult Games
      case "a_truth":
        return <AdultTruthOrDare />;
      case "a_oogiri":
        return <AdultOogiri />;
      case "a_pointfinger":
        return <AdultPointFinger />;
      case "a_vote":
        return <AdultVote />;
      case "a_roulette":
        return <AdultRoulette />;
      case "a_story":
        return <AdultStory />;
      case "a_rank":
        return <AdultRank />;
      case "a_secret":
        return <AdultSecret />;
      case "a_mission":
        return <AdultMission />;
      case "a_fantasy":
        return <AdultFantasy />;

      default:
        return (
          <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className={`text-3xl font-bold mb-4 ${isAdult ? "text-pink-400" : "text-gold"}`}>
                ゲームが見つかりません
              </h1>
              <p className={`mb-6 ${isAdult ? "text-pink-200/70" : "text-gold/70"}`}>
                お探しのゲームは存在しないようです
              </p>
              <button
                onClick={() => navigate(`/select?mode=${mode}`)}
                className={`${isAdult ? "bg-pink-500" : "bg-gold"} text-black px-6 py-3 rounded-2xl font-bold`}
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
