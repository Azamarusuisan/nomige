import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-gold mb-4 text-center">
        飲みゲー
      </h1>
      <p className="text-gold-light text-xl mb-12 text-center">
        Ultimate Party Games
      </p>
      <button
        onClick={() => navigate("/select")}
        className="bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl px-12 py-4 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95"
      >
        飲みゲーを始めよう
      </button>
    </div>
  );
}
