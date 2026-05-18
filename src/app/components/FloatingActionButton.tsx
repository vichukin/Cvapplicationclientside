import { MessageCircle } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 md:hidden">
      {/* Tooltip Speech Bubble */}
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2.5 animate-bounce-subtle">
        <div className="relative bg-slate-700 text-white text-sm px-3.5 py-2 rounded-xl shadow-lg whitespace-nowrap">
          Chat with my AI
          {/* Triangle Tail */}
          <div className="absolute left-full top-1/2 -translate-y-1/2">
            <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[8px] border-l-slate-700" />
          </div>
        </div>
      </div>

      {/* FAB Button */}
      <button
        onClick={onClick}
        className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
