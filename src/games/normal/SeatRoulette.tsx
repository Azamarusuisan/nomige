import { useState, useRef } from "react";
import GameLayout from "../../components/GameLayout";

export default function SeatRoulette() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const spinCount = useRef(0);

  const directions = [
    "前", "右前", "右", "右後ろ", "後ろ", "左後ろ", "左", "左前"
  ];

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    spinCount.current += 1;

    // ランダムな回転量（3〜5回転 + ランダムな角度）
    const spins = 3 + Math.random() * 2;
    const extraDegrees = Math.random() * 360;
    const totalRotation = spins * 360 + extraDegrees;
    const newRotation = rotation + totalRotation;

    setRotation(newRotation);

    setTimeout(() => {
      // 最終角度から方向を計算
      const finalAngle = (newRotation % 360 + 360) % 360;
      const index = Math.floor(((360 - finalAngle + 22.5) % 360) / 45);
      setResult(directions[index]);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <GameLayout title="座席ルーレット">
      <div className="space-y-6">
        <div className="glass-card rounded-3xl p-6 text-center">
          <div className="text-5xl mb-4">💺</div>
          <h2 className="text-gold text-xl font-bold mb-2">座席ルーレット</h2>
          <p className="text-gold-light/70 text-sm">
            ホイールを回して、止まった方向の人が飲む！
          </p>
        </div>

        {/* ルーレット */}
        <div className="relative w-72 h-72 mx-auto">
          {/* 方向ラベル */}
          <div className="absolute inset-0 pointer-events-none">
            {directions.map((dir, i) => {
              const angle = (i * 45 - 90) * (Math.PI / 180);
              const radius = 140;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <div
                  key={dir}
                  className="absolute text-gold font-bold text-sm"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {dir}
                </div>
              );
            })}
          </div>

          {/* ホイール */}
          <div
            className="absolute inset-6 rounded-full overflow-hidden shadow-2xl"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? "transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                : "none",
            }}
          >
            {/* 8等分のセクション */}
            {directions.map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)",
                  background: i % 2 === 0
                    ? "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)"
                    : "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
                }}
              />
            ))}
            {/* 中心 */}
            <div className="absolute inset-1/3 bg-black rounded-full flex items-center justify-center border-4 border-gold z-10">
              <span className="text-gold text-2xl">🍺</span>
            </div>
          </div>

          {/* 矢印（固定） */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-gold" />
          </div>
        </div>

        <button
          onClick={spin}
          disabled={isSpinning}
          className={`w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg ${
            isSpinning ? "opacity-50" : ""
          }`}
        >
          {isSpinning ? "回転中..." : "ルーレットを回す"}
        </button>

        {result && (
          <div className="glass-card rounded-3xl p-8 text-center glow-gold animate-fade-in">
            <div className="text-4xl mb-4">🎯</div>
            <p className="text-gold/70 mb-2">飲むのは...</p>
            <div className="bg-black/50 rounded-2xl p-6 border-2 border-gold">
              <p className="text-gold-light text-3xl font-bold">
                {result}の人！
              </p>
            </div>
            <p className="text-gold/50 text-sm mt-4">
              スマホを置いた場所から見て「{result}」にいる人が飲む🍺
            </p>
          </div>
        )}

        <div className="glass-card rounded-2xl p-4">
          <p className="text-gold/70 text-center text-sm">
            回した回数: {spinCount.current}回
          </p>
        </div>
      </div>
    </GameLayout>
  );
}
