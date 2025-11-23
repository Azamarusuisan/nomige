import { useState } from "react";
import GameLayout from "../../components/GameLayout";

const ROLES = [
  { name: "司会者", emoji: "🎤", description: "飲み会の進行役！場を仕切ろう" },
  { name: "盛り上げ番長", emoji: "🎉", description: "テンションMAXで盛り上げる" },
  { name: "DJ", emoji: "🎵", description: "BGM担当！リクエストに応えよう" },
  { name: "カメラマン", emoji: "📸", description: "思い出を撮影する係" },
  { name: "ドリンク係", emoji: "🍺", description: "空いたグラスを見逃すな！" },
  { name: "ムードメーカー", emoji: "😆", description: "笑いを提供し続ける" },
  { name: "ツッコミ担当", emoji: "👊", description: "ボケには全力でツッコむ" },
  { name: "聞き上手", emoji: "👂", description: "話を聞いて相槌を打つ" },
  { name: "タイムキーパー", emoji: "⏰", description: "時間管理をする" },
  { name: "会計係", emoji: "💰", description: "お金の計算をする" },
  { name: "フォロー役", emoji: "🤝", description: "困ってる人をサポート" },
  { name: "ゲーム進行役", emoji: "🎮", description: "ゲームをスムーズに進行" },
  { name: "乾杯の音頭", emoji: "🥂", description: "乾杯を仕切る" },
  { name: "話題提供者", emoji: "💬", description: "ネタを振り続ける" },
  { name: "場繋ぎ役", emoji: "🌉", description: "沈黙を埋める" },
];

interface Assignment {
  playerNumber: number;
  role: typeof ROLES[0];
}

export default function RolesDeck() {
  const [playerCount, setPlayerCount] = useState(4);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [phase, setPhase] = useState<"setup" | "result">("setup");

  const assignRoles = () => {
    const shuffledRoles = [...ROLES].sort(() => Math.random() - 0.5);
    const newAssignments: Assignment[] = [];

    for (let i = 0; i < playerCount; i++) {
      newAssignments.push({
        playerNumber: i + 1,
        role: shuffledRoles[i % shuffledRoles.length],
      });
    }

    setAssignments(newAssignments);
    setPhase("result");
  };

  const reset = () => {
    setAssignments([]);
    setPhase("setup");
  };

  return (
    <GameLayout title="役割デッキ配布">
      <div className="space-y-6">
        {phase === "setup" && (
          <>
            <div className="glass-card rounded-3xl p-6 text-center">
              <div className="text-5xl mb-4">🎭</div>
              <h2 className="text-gold text-xl font-bold mb-2">役割デッキ配布</h2>
              <p className="text-gold-light/70 text-sm">
                飲み会での役割をランダムに配布！
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <label className="text-gold font-semibold block mb-3">参加人数</label>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPlayerCount(Math.max(2, playerCount - 1))}
                  className="w-12 h-12 rounded-xl bg-gold/20 text-gold text-2xl font-bold btn-ios"
                >
                  -
                </button>
                <span className="text-gold text-4xl font-bold w-16 text-center">
                  {playerCount}
                </span>
                <button
                  onClick={() => setPlayerCount(Math.min(15, playerCount + 1))}
                  className="w-12 h-12 rounded-xl bg-gold/20 text-gold text-2xl font-bold btn-ios"
                >
                  +
                </button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-gold font-semibold mb-3">配布される役割の例</h3>
              <div className="flex flex-wrap gap-2">
                {ROLES.slice(0, 6).map((role) => (
                  <span
                    key={role.name}
                    className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs"
                  >
                    {role.emoji} {role.name}
                  </span>
                ))}
                <span className="text-gold/50 text-xs">...など</span>
              </div>
            </div>

            <button
              onClick={assignRoles}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              役割を配布する
            </button>
          </>
        )}

        {phase === "result" && (
          <>
            <div className="glass-card rounded-3xl p-6 text-center glow-gold">
              <div className="text-4xl mb-2">🎭</div>
              <h2 className="text-gold text-xl font-bold">役割発表！</h2>
            </div>

            <div className="space-y-3">
              {assignments.map((assignment) => (
                <div
                  key={assignment.playerNumber}
                  className="glass-card rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className="bg-gold text-black font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center">
                    {assignment.playerNumber}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{assignment.role.emoji}</span>
                      <span className="text-gold font-bold">
                        {assignment.role.name}
                      </span>
                    </div>
                    <p className="text-gold-light/50 text-xs">
                      {assignment.role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl py-4 rounded-2xl shadow-lg"
            >
              もう一度配布する
            </button>
          </>
        )}
      </div>
    </GameLayout>
  );
}
