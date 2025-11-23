import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GameLayout from "../components/GameLayout";
import AdModal from "../components/AdModal";
import type { GameMode } from "../types";

type Suit = "♠" | "♥" | "♦" | "♣";
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

interface Card {
  suit: Suit;
  rank: Rank;
}

interface HoldCard {
  rank: Rank;
  count: number;
}

const suits: Suit[] = ["♠", "♥", "♦", "♣"];
const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const CARD_EFFECTS: Record<Rank, string> = {
  "A": "指名カード（誰か1人に飲ませる）",
  "2": "キャバ嬢（誰かが飲んだら一緒に飲む、K以外で回避不可）",
  "3": "右回り",
  "4": "地獄じゃんけん（全員でじゃんけん→あいこ回数だけ杯数加算→最後負けが飲む。キャバ嬢も対象）",
  "5": "杯数決めて次引いた人が飲む",
  "6": "タバコ（引くまでタバコ禁止。ホールド可）",
  "7": "トイレ（引くまでトイレ禁止。ホールド可）",
  "8": "トイレ&タバコ（両方OK。ホールド可）",
  "9": "左の人 最終面接（左の人が飲む）",
  "10": "自分が飲む",
  "J": "ゲームカード（自由にゲーム開始）",
  "Q": "右の人が飲む",
  "K": "回避カード（罰ゲーム or キャバ嬢を1回スキップ可能。ホールド可）"
};

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
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

export default function Cabajou() {
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") as GameMode) || "normal";
  const isAdult = mode === "adult";

  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [showEffect, setShowEffect] = useState(false);
  const [holdCards, setHoldCards] = useState<HoldCard[]>([]);
  const [hasKabajou, setHasKabajou] = useState(false);

  // 広告用の状態（Adult Modeのみ）
  const [drawCount, setDrawCount] = useState(0);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7); // 7-10
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    setCurrentCard(null);
    setShowEffect(false);
    setHoldCards([]);
    setHasKabajou(false);
  };

  const drawCard = () => {
    if (deck.length === 0) {
      // デッキを再生成
      const newDeck = createDeck();
      setDeck(newDeck);
      return;
    }

    const card = deck[0];
    setCurrentCard(card);
    setShowEffect(true);
    setDeck(deck.slice(1));

    // ホールド可能なカードの処理
    if (card.rank === "6" || card.rank === "7" || card.rank === "8" || card.rank === "K") {
      // ホールドに追加
      const existing = holdCards.find(h => h.rank === card.rank);
      if (existing) {
        setHoldCards(holdCards.map(h =>
          h.rank === card.rank ? { ...h, count: h.count + 1 } : h
        ));
      } else {
        setHoldCards([...holdCards, { rank: card.rank, count: 1 }]);
      }
    }

    // キャバ嬢カードの処理
    if (card.rank === "2") {
      setHasKabajou(true);
    }

    // Adult Modeの広告ロジック
    if (isAdult) {
      const newDrawCount = drawCount + 1;
      setDrawCount(newDrawCount);

      if (newDrawCount >= nextAdAt) {
        setShowAd(true);
        setDrawCount(0);
        setNextAdAt(Math.floor(Math.random() * 4) + 7); // 次は7-10枚後
      }
    }
  };

  const handleAdClose = () => {
    setShowAd(false);
  };

  const useHoldCard = (rank: Rank) => {
    const holdCard = holdCards.find(h => h.rank === rank);
    if (!holdCard) return;

    if (holdCard.count === 1) {
      setHoldCards(holdCards.filter(h => h.rank !== rank));
    } else {
      setHoldCards(holdCards.map(h =>
        h.rank === rank ? { ...h, count: h.count - 1 } : h
      ));
    }

    // Kカードでキャバ嬢を解除
    if (rank === "K" && hasKabajou) {
      setHasKabajou(false);
      alert("キャバ嬢を回避しました！");
    } else {
      alert(`${rank}カードを使用しました！`);
    }
  };

  const closeEffect = () => {
    setShowEffect(false);
  };

  const getSuitColor = (suit: Suit) => {
    return suit === "♥" || suit === "♦" ? "text-red-500" : "text-white";
  };

  return (
    <GameLayout title="キャバ嬢ゲーム">
      <div className="space-y-6">
        <div className="text-gold text-center text-sm">
          トランプで遊ぶ飲み会の定番ゲーム
        </div>

        {/* キャバ嬢状態の表示 */}
        {hasKabajou && (
          <div className="bg-red-900 border-2 border-red-500 rounded-lg p-3 text-center">
            <div className="text-red-300 font-bold animate-pulse">
              キャバ嬢状態（誰かが飲んだら一緒に飲む）
            </div>
          </div>
        )}

        {/* ホールドカード表示 */}
        {holdCards.length > 0 && (
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gold rounded-lg p-4">
            <div className="text-gold text-sm font-bold mb-2 text-center">
              ストック中のカード
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {holdCards.map((holdCard) => (
                <button
                  key={holdCard.rank}
                  onClick={() => useHoldCard(holdCard.rank)}
                  className="bg-gold text-black font-bold px-4 py-2 rounded hover:bg-gold-light transition"
                >
                  {holdCard.rank} × {holdCard.count}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* カード表示エリア */}
        <div className="flex flex-col items-center space-y-4">
          {currentCard ? (
            <div className="bg-white rounded-xl p-8 shadow-2xl w-48 h-64 flex flex-col items-center justify-center">
              <div className={`text-6xl ${getSuitColor(currentCard.suit)}`}>
                {currentCard.suit}
              </div>
              <div className="text-5xl font-bold text-black mt-4">
                {currentCard.rank}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-gold rounded-xl p-8 shadow-2xl w-48 h-64 flex items-center justify-center">
              <div className="text-gold-light text-4xl">？</div>
            </div>
          )}

          <button
            onClick={drawCard}
            className="bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl px-12 py-4 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95"
          >
            カードを引く
          </button>

          <div className="text-gold text-sm">残り: {deck.length} 枚</div>
        </div>

        <button
          onClick={startGame}
          className="w-full bg-gray-800 text-gold font-bold py-3 rounded-lg border border-gold hover:bg-gray-700 transition"
        >
          新しいゲーム
        </button>

        {/* カード効果モーダル */}
        {showEffect && currentCard && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-gold rounded-2xl p-8 max-w-md w-full">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white rounded-xl p-6 w-32 h-44 flex flex-col items-center justify-center shadow-xl">
                  <div className={`text-5xl ${getSuitColor(currentCard.suit)}`}>
                    {currentCard.suit}
                  </div>
                  <div className="text-4xl font-bold text-black mt-2">
                    {currentCard.rank}
                  </div>
                </div>
              </div>

              <div className="bg-black border-2 border-gold rounded-lg p-4 mb-6">
                <div className="text-gold-light text-lg leading-relaxed text-center">
                  {CARD_EFFECTS[currentCard.rank]}
                </div>
              </div>

              <button
                onClick={closeEffect}
                className="w-full bg-gold text-black font-bold py-3 rounded-lg hover:bg-gold-light transition"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* ルール一覧 */}
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gold rounded-lg p-4">
          <div className="text-gold font-bold mb-3 text-center">カード効果一覧</div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {ranks.map((rank) => (
              <div
                key={rank}
                className="flex items-start space-x-3 bg-black bg-opacity-50 rounded p-2"
              >
                <div className="bg-gold text-black font-bold text-sm w-8 h-8 rounded flex items-center justify-center flex-shrink-0">
                  {rank}
                </div>
                <div className="text-gold-light text-xs leading-relaxed">
                  {CARD_EFFECTS[rank]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 広告モーダル（Adult Modeのみ） */}
        <AdModal isOpen={showAd} onClose={handleAdClose} />
      </div>
    </GameLayout>
  );
}
