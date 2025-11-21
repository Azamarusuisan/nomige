import { useState, useEffect } from "react";
import GameLayout from "../components/GameLayout";

type Suit = "♠" | "♥" | "♦" | "♣";
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
}

const suits: Suit[] = ["♠", "♥", "♦", "♣"];
const ranks: { rank: Rank; value: number }[] = [
  { rank: "A", value: 1 },
  { rank: "2", value: 2 },
  { rank: "3", value: 3 },
  { rank: "4", value: 4 },
  { rank: "5", value: 5 },
  { rank: "6", value: 6 },
  { rank: "7", value: 7 },
  { rank: "8", value: 8 },
  { rank: "9", value: 9 },
  { rank: "10", value: 10 },
  { rank: "J", value: 11 },
  { rank: "Q", value: 12 },
  { rank: "K", value: 13 },
];

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const { rank, value } of ranks) {
      deck.push({ suit, rank, value });
    }
  }
  return shuffleDeck(deck);
}

function shuffleDeck(deck: Card[]): Card[] {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

export default function HighLow() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [nextCard, setNextCard] = useState<Card | null>(null);
  const [result, setResult] = useState<string>("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const newDeck = createDeck();
    setDeck(newDeck.slice(1));
    setCurrentCard(newDeck[0]);
    setNextCard(null);
    setResult("");
    setShowResult(false);
  };

  const guess = (choice: "high" | "low") => {
    if (deck.length === 0 || !currentCard) {
      startGame();
      return;
    }

    const next = deck[0];
    setNextCard(next);
    setShowResult(true);

    let resultText = "";
    if (choice === "high") {
      if (next.value > currentCard.value) {
        resultText = "正解！ セーフ！";
      } else if (next.value === currentCard.value) {
        resultText = "同じ！ 引き分け！";
      } else {
        resultText = "不正解... 飲め！";
      }
    } else {
      if (next.value < currentCard.value) {
        resultText = "正解！ セーフ！";
      } else if (next.value === currentCard.value) {
        resultText = "同じ！ 引き分け！";
      } else {
        resultText = "不正解... 飲め！";
      }
    }
    setResult(resultText);

    setTimeout(() => {
      setCurrentCard(next);
      setDeck(deck.slice(1));
      setNextCard(null);
      setShowResult(false);
      setResult("");
    }, 2000);
  };

  const getSuitColor = (suit: Suit) => {
    return suit === "♥" || suit === "♦" ? "text-red-500" : "text-white";
  };

  return (
    <GameLayout title="ハイ&ロー">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-gold text-lg text-center">
          次のカードが現在のカードより大きいか小さいかを当てよう！
        </div>

        {currentCard && (
          <div className="bg-white rounded-xl p-8 shadow-2xl w-48 h-64 flex flex-col items-center justify-center">
            <div className={`text-6xl ${getSuitColor(currentCard.suit)}`}>
              {currentCard.suit}
            </div>
            <div className="text-5xl font-bold text-black mt-4">
              {currentCard.rank}
            </div>
          </div>
        )}

        {showResult && nextCard && (
          <div className="bg-white rounded-xl p-8 shadow-2xl w-48 h-64 flex flex-col items-center justify-center">
            <div className={`text-6xl ${getSuitColor(nextCard.suit)}`}>
              {nextCard.suit}
            </div>
            <div className="text-5xl font-bold text-black mt-4">
              {nextCard.rank}
            </div>
          </div>
        )}

        {result && (
          <div className="text-2xl font-bold text-gold-light animate-pulse">
            {result}
          </div>
        )}

        {!showResult && (
          <div className="flex space-x-4">
            <button
              onClick={() => guess("high")}
              className="bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl px-8 py-4 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95"
            >
              HIGH
            </button>
            <button
              onClick={() => guess("low")}
              className="bg-gradient-to-r from-gray-700 to-gray-600 text-gold font-bold text-xl px-8 py-4 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95"
            >
              LOW
            </button>
          </div>
        )}

        <div className="text-gold text-sm">
          残り: {deck.length} 枚
        </div>

        <button
          onClick={startGame}
          className="bg-gray-800 text-gold px-6 py-3 rounded-lg border border-gold hover:bg-gray-700 transition font-bold"
        >
          新しいゲーム
        </button>
      </div>
    </GameLayout>
  );
}
