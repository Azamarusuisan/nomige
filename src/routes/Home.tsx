import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AD_NOTICE_KEY = "adNoticeShown";

export default function Home() {
  const navigate = useNavigate();
  const [showAdNotice, setShowAdNotice] = useState(false);
  const [pendingMode, setPendingMode] = useState<"normal" | "adult" | null>(null);

  useEffect(() => {
    // 初回のみ広告通知を表示するかチェック
    const shown = localStorage.getItem(AD_NOTICE_KEY);
    if (!shown) {
      // まだ表示していない
    }
  }, []);

  const handleModeSelect = (mode: "normal" | "adult") => {
    if (mode === "adult") {
      const shown = localStorage.getItem(AD_NOTICE_KEY);
      if (!shown) {
        setPendingMode(mode);
        setShowAdNotice(true);
        return;
      }
    }
    navigate(`/select?mode=${mode}`);
  };

  const handleAdNoticeClose = () => {
    localStorage.setItem(AD_NOTICE_KEY, "true");
    setShowAdNotice(false);
    if (pendingMode) {
      navigate(`/select?mode=${pendingMode}`);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-gold mb-4 text-center">
        飲みゲー
      </h1>
      <p className="text-gold-light text-xl mb-12 text-center">
        Ultimate Party Games
      </p>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={() => handleModeSelect("normal")}
          className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl px-8 py-5 rounded-2xl shadow-lg transform transition hover:scale-105 active:scale-95"
        >
          🍻 Normal Mode
        </button>

        <button
          onClick={() => handleModeSelect("adult")}
          className="w-full bg-gradient-to-r from-pink-600 to-red-500 text-white font-bold text-xl px-8 py-5 rounded-2xl shadow-lg transform transition hover:scale-105 active:scale-95"
        >
          🔞 Adult Mode
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-8 text-center">
        ※ Adult Modeは18歳以上向けです
      </p>

      {/* 広告通知モーダル */}
      {showAdNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gold rounded-2xl p-8 max-w-sm w-full text-center">
            <div className="text-4xl mb-4">📢</div>
            <h2 className="text-2xl font-bold text-gold mb-4">お知らせ</h2>
            <p className="text-gold-light mb-6 leading-relaxed">
              このアプリは一部広告を使用しています。<br />
              運営費に充てています。
            </p>
            <button
              onClick={handleAdNoticeClose}
              className="w-full bg-gold text-black font-bold py-3 rounded-xl hover:bg-gold-light transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
