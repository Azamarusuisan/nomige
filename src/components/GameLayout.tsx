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
    <div className="min-h-screen bg-black p-4 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className={`${isAdult ? "glass-card-pink" : "glass-card"} rounded-2xl p-4 mb-6`}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(`/select?mode=${mode}`)}
              className={`btn-ios px-4 py-2 rounded-xl font-semibold ${
                isAdult
                  ? "bg-pink-600/30 text-pink-400"
                  : "bg-gold/20 text-gold"
              }`}
            >
              ← 戻る
            </button>
            <h1 className={`text-xl font-bold ${isAdult ? "text-pink-400" : "text-gold"}`}>
              {title}
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
