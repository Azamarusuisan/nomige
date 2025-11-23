interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 広告リンク（アフィリエイトリンクに差し替え可能）
const AD_CONFIG = {
  text: "PR: スポンサーリンク",
  url: "https://example.com",
  description: "広告枠"
};

export default function AdModal({ isOpen, onClose }: AdModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6 animate-fade-in">
      <div className="glass-card-pink rounded-3xl p-6 max-w-sm w-full text-center shadow-ios-lg relative">
        {/* 大きな×ボタン */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-12 h-12 bg-gray-800 border-2 border-pink-500 rounded-full flex items-center justify-center text-pink-400 text-2xl font-bold hover:bg-gray-700 transition btn-ios"
        >
          ×
        </button>

        <div className="text-xs text-pink-400/60 mb-3">PR</div>
        <a
          href={AD_CONFIG.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl mb-4 hover:from-pink-600 hover:to-pink-700 transition"
        >
          {AD_CONFIG.text}
        </a>
        <button
          onClick={onClose}
          className="btn-ios w-full py-3 text-pink-400 font-semibold rounded-xl bg-pink-900/30 hover:bg-pink-900/50 transition"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
