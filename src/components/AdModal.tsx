interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

        {/* テスト表示（後で広告に差し替え） */}
        <div className="bg-gray-800 border-2 border-pink-500 rounded-2xl p-8 mb-4">
          <div className="text-pink-400 text-3xl font-bold">test</div>
          <div className="text-pink-300/60 text-sm mt-2">広告枠</div>
        </div>

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
