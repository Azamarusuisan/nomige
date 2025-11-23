import { useNavigate, useSearchParams } from "react-router-dom";
import type { ReactNode } from "react";
import type { GameMode } from "../types";

interface GameLayoutProps {
  title: string;
  children: ReactNode;
}

export default function GameLayout({ title, children }: GameLayoutProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") as GameMode) || "normal";
  const isAdult = mode === "adult";

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(`/select?mode=${mode}`)}
            className={`px-4 py-2 rounded-lg border hover:bg-gray-700 transition font-bold bg-gray-800 ${
              isAdult
                ? "text-pink-400 border-pink-500"
                : "text-gold border-gold"
            }`}
          >
            ← 戻る
          </button>
          <h1 className={`text-2xl font-bold ${isAdult ? "text-pink-400" : "text-gold"}`}>
            {title}
          </h1>
          <div className="w-20"></div>
        </div>
        {children}
      </div>
    </div>
  );
}
