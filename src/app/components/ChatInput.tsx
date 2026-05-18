import { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, onKeyPress, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={`flex items-end gap-2 bg-slate-800 rounded-xl px-4 py-2 transition-opacity ${disabled ? 'opacity-60' : ''}`}>
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask anything about Dmytro's experience..."
        className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-500 outline-none resize-none overflow-y-auto leading-normal py-1.5 min-h-[28px] disabled:cursor-not-allowed"
        style={{ maxHeight: '9rem' }}
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
