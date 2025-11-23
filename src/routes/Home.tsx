import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AD_NOTICE_KEY = "adNoticeShown";

export default function Home() {
  const navigate = useNavigate();
  const [showAdNotice, setShowAdNotice] = useState(false);
  const [pendingMode, setPendingMode] = useState<"normal" | "adult" | null>(null);

  useEffect(() => {
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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 animate-fade-in">
      {/* ロゴエリア */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light mb-3 tracking-tight">
          飲みゲー
        </h1>
        <p className="text-gold-light/70 text-lg font-medium tracking-widest uppercase">
          Ultimate Party Games
        </p>
      </div>

      {/* モード選択ボタン */}
      <div className="space-y-5 w-full max-w-sm">
        <button
          onClick={() => handleModeSelect("normal")}
          className="btn-ios w-full glass-card glow-gold px-8 py-6 rounded-3xl shadow-ios flex items-center justify-center space-x-3"
        >
          <span className="text-3xl">🍻</span>
          <span className="text-gold font-bold text-xl">Normal Mode</span>
        </button>

        <button
          onClick={() => handleModeSelect("adult")}
          className="btn-ios w-full glass-card-pink glow-pink px-8 py-6 rounded-3xl shadow-ios flex items-center justify-center space-x-3"
        >
          <span className="text-3xl">🔞</span>
          <span className="text-pink-400 font-bold text-xl">Adult Mode</span>
        </button>
      </div>

      {/* 注意書き */}
      <p className="text-gray-600 text-sm mt-10 text-center font-medium">
        ※ Adult Modeは18歳以上向けです
      </p>

      {/* 広告通知モーダル */}
      {showAdNotice && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="glass-card-pink rounded-4xl p-8 max-w-sm w-full text-center shadow-ios-lg">
            <div className="text-5xl mb-5">📢</div>
            <h2 className="text-2xl font-bold text-pink-400 mb-4">お知らせ</h2>
            <p className="text-pink-200/80 mb-8 leading-relaxed">
              このアプリは一部広告を使用しています。<br />
              運営費に充てています。
            </p>
            <button
              onClick={handleAdNoticeClose}
              className="btn-ios w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
