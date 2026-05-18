import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, onKeyPress, disabled }: ChatInputProps) {
  return (
    <div className={`flex items-center gap-2 bg-slate-800 rounded-xl px-4 py-3 transition-opacity ${disabled ? 'opacity-60' : ''}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        disabled={disabled}
        placeholder="Ask anything about Dmytro's experience..."
        className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-500 outline-none disabled:cursor-not-allowed"
      />
      <button
        onClick={onSend}
        disabled={disabled}
        className="w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
