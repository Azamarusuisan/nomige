import { useState, useEffect } from "react";
import GameLayout from "../components/GameLayout";
import { OJISAN_IMAGES } from "../data/ojisanImages";

type CardType = "normal" | "dobon";

interface Card {
  id: number;
  type: CardType;
  flipped: boolean;
}

export default function Ojisan() {
  const [cards, setCards] = useState<Card[]>([]);
  const [dobonImage, setDobonImage] = useState<string | null>(null);
  const [showDobon, setShowDobon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newCards: Card[] = [];
    // 24枚のカード: 22枚normal + 2枚dobon
    for (let i = 0; i < 22; i++) {
      newCards.push({ id: i, type: "normal", flipped: false });
    }
    for (let i = 22; i < 24; i++) {
      newCards.push({ id: i, type: "dobon", flipped: false });
    }
    // シャッフル
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    setCards(newCards);
    setShowDobon(false);
    setDobonImage(null);
  };

  const flipCard = (id: number) => {
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped) return;

    const newCards = cards.map((c) =>
      c.id === id ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    if (card.type === "dobon") {
      // ドボン！画像をランダムに表示
      if (OJISAN_IMAGES.length > 0) {
        const randomImage =
          OJISAN_IMAGES[Math.floor(Math.random() * OJISAN_IMAGES.length)];
        setDobonImage(randomImage);
      }
      setShowDobon(true);
    }
  };

  const closeDobon = () => {
    setShowDobon(false);
    setDobonImage(null);
  };

  return (
    <GameLayout title="おじさんくじ引き">
      <div className="space-y-6">
        <div className="text-gold text-center">
          カードを選んでドボンを引いたら罰ゲーム！
        </div>

        <div className="grid grid-cols-4 gap-2">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => flipCard(card.id)}
              disabled={card.flipped}
              className={`aspect-square rounded-lg font-bold text-lg transition transform ${
                card.flipped
                  ? card.type === "dobon"
                    ? "bg-red-600 text-white"
                    : "bg-green-600 text-white"
                  : "bg-gradient-to-br from-gold to-gold-light text-black hover:scale-105 active:scale-95"
              } ${card.flipped ? "cursor-not-allowed" : ""}`}
            >
              {card.flipped ? (card.type === "dobon" ? "ドボン" : "セーフ") : "？"}
            </button>
          ))}
        </div>

        <button
          onClick={initializeGame}
          className="w-full bg-gray-800 text-gold font-bold py-3 rounded-lg border border-gold hover:bg-gray-700 transition"
        >
          新しいゲーム
        </button>

        {/* ドボンモーダル */}
        {showDobon && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-red-600 rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-4xl font-bold text-red-500 text-center mb-6 animate-pulse">
                ドボン！！！
              </h2>
              {dobonImage ? (
                <img
                  src={dobonImage}
                  alt="おじさん"
                  className="w-full rounded-lg mb-6"
                />
              ) : (
                <div className="bg-gray-800 rounded-lg p-12 mb-6 text-center text-gold">
                  <p className="text-xl">罰ゲーム確定！</p>
                  <p className="text-sm mt-2 opacity-75">
                    ※ 画像は後で追加されます
                  </p>
                </div>
              )}
              <button
                onClick={closeDobon}
                className="w-full bg-gold text-black font-bold py-3 rounded-lg hover:bg-gold-light transition"
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
