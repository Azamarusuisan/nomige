import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GameLayout from "../../components/GameLayout";
import AdModal from "../../components/AdModal";
import { DEFAULT_KINGS_RULES } from "../../data/kingsRules";
import type { KingsRule } from "../../data/kingsRules";
import type { GameMode } from "../../types";

type Suit = "♠" | "♥" | "♦" | "♣";
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

interface Card {
  suit: Suit;
  rank: Rank;
}

const STORAGE_KEY = "kingscup-rules";
const suits: Suit[] = ["♠", "♥", "♦", "♣"];
const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

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

export default function KingsCup() {
  const [searchParams] = useSearchParams();
  const gameMode = (searchParams.get("mode") as GameMode) || "normal";
  const isAdult = gameMode === "adult";

  const [mode, setMode] = useState<"game" | "edit">("game");
  const [rules, setRules] = useState<KingsRule[]>([]);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editingRule, setEditingRule] = useState<string>("");

  // ゲームモード用の状態
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [showRule, setShowRule] = useState(false);

  // 広告用の状態（Adult Modeのみ）
  const [drawCount, setDrawCount] = useState(0);
  const [nextAdAt, setNextAdAt] = useState(() => Math.floor(Math.random() * 4) + 7); // 7-10
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    loadRules();
    initializeGame();
  }, []);

  const loadRules = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setRules(JSON.parse(saved));
    } else {
      setRules(DEFAULT_KINGS_RULES);
    }
  };

  const saveRules = (newRules: KingsRule[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRules));
    setRules(newRules);
  };

  const initializeGame = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    setCurrentCard(null);
    setShowRule(false);
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
    setShowRule(true);
    setDeck(deck.slice(1));

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

  const closeRule = () => {
    setShowRule(false);
  };

  const startEdit = (card: string, rule: string) => {
    setEditingCard(card);
    setEditingRule(rule);
  };

  const saveEdit = () => {
    if (editingCard) {
      const newRules = rules.map((r) =>
        r.card === editingCard ? { ...r, rule: editingRule } : r
      );
      saveRules(newRules);
      setEditingCard(null);
      setEditingRule("");
    }
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setEditingRule("");
  };

  const resetRules = () => {
    if (confirm("ルールを初期状態に戻しますか？")) {
      localStorage.removeItem(STORAGE_KEY);
      setRules(DEFAULT_KINGS_RULES);
    }
  };

  const getSuitColor = (suit: Suit) => {
    return suit === "♥" || suit === "♦" ? "text-red-500" : "text-white";
  };

  const getCurrentRule = (rank: Rank): string => {
    const rule = rules.find((r) => r.card === rank);
    return rule ? rule.rule : "";
  };

  // ゲームモード
  if (mode === "game") {
    return (
      <GameLayout title="キングスカップ">
        <div className="space-y-6">
          <div className="text-gold text-center">
            カードを引いてルールに従おう！
          </div>

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

          <div className="flex space-x-2">
            <button
              onClick={initializeGame}
              className="flex-1 bg-gray-800 text-gold font-bold py-3 rounded-lg border border-gold hover:bg-gray-700 transition"
            >
              新しいゲーム
            </button>
            <button
              onClick={() => setMode("edit")}
              className="flex-1 bg-gray-800 text-gold font-bold py-3 rounded-lg border border-gold hover:bg-gray-700 transition"
            >
              ルール編集
            </button>
          </div>

          {/* ルール表示モーダル */}
          {showRule && currentCard && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
              <div className={`bg-gradient-to-br from-gray-900 to-black border-4 ${isAdult ? "border-pink-500" : "border-gold"} rounded-2xl p-8 max-w-md w-full`}>
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

                <div className={`bg-black border-2 ${isAdult ? "border-pink-500" : "border-gold"} rounded-lg p-4 mb-6`}>
                  <div className={`text-lg leading-relaxed text-center ${isAdult ? "text-pink-300" : "text-gold-light"}`}>
                    {getCurrentRule(currentCard.rank)}
                  </div>
                </div>

                <button
                  onClick={closeRule}
                  className={`w-full font-bold py-3 rounded-lg transition ${isAdult ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gold text-black hover:bg-gold-light"}`}
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* 広告モーダル（Adult Modeのみ） */}
          <AdModal isOpen={showAd} onClose={handleAdClose} />
        </div>
      </GameLayout>
    );
  }

  // ルール編集モード
  return (
    <GameLayout title="キングスカップ">
      <div className="space-y-4">
        <div className="text-gold text-center mb-6">
          カードごとのルールを確認・編集できます
        </div>

        <div className="space-y-3">
          {rules.map((rule) => (
            <div
              key={rule.card}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-gold rounded-lg p-4"
            >
              {editingCard === rule.card ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gold text-black font-bold text-xl w-12 h-12 rounded-lg flex items-center justify-center">
                      {rule.card}
                    </div>
                    <input
                      type="text"
                      value={editingRule}
                      onChange={(e) => setEditingRule(e.target.value)}
                      className="flex-1 bg-gray-800 text-gold border border-gold rounded px-3 py-2"
                      autoFocus
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={saveEdit}
                      className="flex-1 bg-gold text-black font-bold py-2 rounded hover:bg-gold-light transition"
                    >
                      保存
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-700 text-gold font-bold py-2 rounded hover:bg-gray-600 transition"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => startEdit(rule.card, rule.rule)}
                >
                  <div className="bg-gold text-black font-bold text-xl w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    {rule.card}
                  </div>
                  <div className="flex-1 text-gold-light">{rule.rule}</div>
                  <div className="text-gold text-sm">編集 →</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={resetRules}
            className="flex-1 bg-gray-800 text-gold font-bold py-3 rounded-lg border border-gold hover:bg-gray-700 transition"
          >
            ルールをリセット
          </button>
          <button
            onClick={() => setMode("game")}
            className="flex-1 bg-gold text-black font-bold py-3 rounded-lg hover:bg-gold-light transition"
          >
            ゲームへ戻る
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
