import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface GameLayoutProps {
  title: string;
  children: ReactNode;
}

export default function GameLayout({ title, children }: GameLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/select")}
            className="bg-gray-800 text-gold px-4 py-2 rounded-lg border border-gold hover:bg-gray-700 transition font-bold"
          >
            ← 戻る
          </button>
          <h1 className="text-2xl font-bold text-gold">{title}</h1>
          <div className="w-20"></div>
        </div>
        {children}
      </div>
    </div>
  );
}
