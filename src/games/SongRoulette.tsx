import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GameLayout from "../components/GameLayout";
import AdModal from "../components/AdModal";
import { DEFAULT_SONGS } from "../data/songs";
import type { GameMode } from "../types";

const STORAGE_KEY = "songroulette-songs";

export default function SongRoulette() {
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") as GameMode) || "normal";
  const isAdult = mode === "adult";

  const [songs, setSongs] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSongs, setEditingSongs] = useState<string[]>([]);

  // 広告用の状態（Adult Modeのみ）- 3回に1回
  const [spinCount, setSpinCount] = useState(0);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSongs(JSON.parse(saved));
    } else {
      setSongs(DEFAULT_SONGS);
    }
  };

  const saveSongs = (newSongs: string[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSongs));
    setSongs(newSongs);
  };

  const spin = () => {
    if (songs.length === 0) {
      alert("曲を追加してください");
      return;
    }

    setIsSpinning(true);
    setSelectedSong(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setSelectedSong(songs[randomIndex]);
      counter++;

      if (counter > 20) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * songs.length);
        setSelectedSong(songs[finalIndex]);
        setIsSpinning(false);

        // Adult Modeでは3回に1回広告表示
        if (isAdult) {
          const newCount = spinCount + 1;
          setSpinCount(newCount);
          if (newCount >= 3) {
            setShowAd(true);
            setSpinCount(0);
          }
        }
      }
    }, 100);
  };

  const handleAdClose = () => {
    setShowAd(false);
  };

  const startEdit = () => {
    setEditingSongs([...songs]);
    setIsEditing(true);
  };

  const updateSong = (index: number, value: string) => {
    const newSongs = [...editingSongs];
    newSongs[index] = value;
    setEditingSongs(newSongs);
  };

  const addSong = () => {
    setEditingSongs([...editingSongs, ""]);
  };

  const removeSong = (index: number) => {
    const newSongs = editingSongs.filter((_, i) => i !== index);
    setEditingSongs(newSongs);
  };

  const saveEdit = () => {
    const filtered = editingSongs.filter((s) => s.trim() !== "");
    if (filtered.length === 0) {
      alert("少なくとも1曲は必要です");
      return;
    }
    saveSongs(filtered);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const resetSongs = () => {
    if (confirm("曲リストを初期状態に戻しますか？")) {
      localStorage.removeItem(STORAGE_KEY);
      setSongs(DEFAULT_SONGS);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <GameLayout title="飲み歌ルーレット">
        <div className="space-y-4">
          <div className="text-gold text-center mb-4">曲リストを編集</div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {editingSongs.map((song, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  value={song}
                  onChange={(e) => updateSong(index, e.target.value)}
                  className="flex-1 bg-gray-800 text-gold border border-gold rounded px-3 py-2"
                  placeholder="曲名を入力"
                />
                <button
                  onClick={() => removeSong(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition font-bold"
                >
                  削除
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addSong}
            className="w-full bg-gray-800 text-gold font-bold py-3 rounded-lg border border-gold hover:bg-gray-700 transition"
          >
            ＋ 曲を追加
          </button>

          <div className="flex space-x-2">
            <button
              onClick={saveEdit}
              className="flex-1 bg-gold text-black font-bold py-3 rounded-lg hover:bg-gold-light transition"
            >
              保存
            </button>
            <button
              onClick={cancelEdit}
              className="flex-1 bg-gray-700 text-gold font-bold py-3 rounded-lg hover:bg-gray-600 transition"
            >
              キャンセル
            </button>
          </div>

          <button
            onClick={resetSongs}
            className="w-full bg-gray-800 text-red-400 font-bold py-3 rounded-lg border border-red-400 hover:bg-gray-700 transition"
          >
            リセット
          </button>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout title="飲み歌ルーレット">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-gold text-center">
          歌う曲をルーレットで決めよう！
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-gold rounded-2xl p-12 w-full min-h-[250px] flex items-center justify-center shadow-2xl">
          {selectedSong ? (
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-light mb-4 animate-pulse">
                {selectedSong}
              </div>
              {!isSpinning && (
                <div className="text-gold text-lg">歌ってください！</div>
              )}
            </div>
          ) : (
            <div className="text-gold-light text-2xl">？？？</div>
          )}
        </div>

        <button
          onClick={spin}
          disabled={isSpinning}
          className={`bg-gradient-to-r from-gold to-gold-light text-black font-bold text-2xl px-12 py-6 rounded-lg shadow-lg transform transition ${
            isSpinning
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105 active:scale-95"
          }`}
        >
          {isSpinning ? "抽選中..." : "ルーレットを回す"}
        </button>

        <button
          onClick={startEdit}
          className="bg-gray-800 text-gold font-bold px-8 py-3 rounded-lg border border-gold hover:bg-gray-700 transition"
        >
          曲リストを編集
        </button>

        <div className="w-full mt-8">
          <div className="text-gold text-center mb-4 font-bold">
            現在の曲リスト ({songs.length}曲)
          </div>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {songs.map((song, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gold rounded px-4 py-2 text-gold-light text-center"
              >
                {song}
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
