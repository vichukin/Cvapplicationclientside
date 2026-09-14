import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { SystemBubble } from './SystemBubble';
import { SuggestedPrompts } from './SuggestedPrompts';
import { ChatInput } from './ChatInput';
import type { Message } from './ChatInterface';
import type { RetryPayload } from './SystemBubble';

interface MobileChatBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  inputValue: string;
  isStreaming: boolean;
  isLoading: boolean;
  isWakingUp: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onPromptClick: (prompt: string) => void;
  onRetry: (payload: RetryPayload) => void;
}

const suggestedPrompts = [
  'How was this app built?',
  'Work experience',
  'English level',
  'When can you start?'
];

export function MobileChatBottomSheet({
  isOpen,
  onClose,
  messages,
  inputValue,
  isStreaming,
  isLoading,
  isWakingUp,
  onInputChange,
  onSendMessage,
  onKeyPress,
  onPromptClick,
  onRetry
}: MobileChatBottomSheetProps) {
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current && isOpen) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading, isWakingUp]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      <div className="fixed inset-x-0 bottom-0 bg-slate-900 rounded-t-3xl z-50 md:hidden flex flex-col max-h-[85vh]">
        <div className="flex justify-center py-3 border-b border-slate-700">
          <div className="w-12 h-1 bg-slate-600 rounded-full" />
        </div>

        <div className="border-b border-slate-700 px-4 py-3 flex items-center justify-between">
          <h2 className="text-white text-base">Chat with Dmytro's AI Assistant</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-slate-400 text-xs">Online</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        <div ref={chatHistoryRef} className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              text={message.text}
              retryPayload={message.retryPayload}
              onRetry={onRetry}
            />
          ))}
          {isLoading && <TypingIndicator />}
          {isWakingUp && <SystemBubble type="cold-start" />}
        </div>

        <div className="border-t border-slate-700 px-4 py-3 bg-slate-900">
          <SuggestedPrompts
            prompts={suggestedPrompts}
            onPromptClick={onPromptClick}
          />
          <ChatInput
            value={inputValue}
            onChange={onInputChange}
            onSend={onSendMessage}
            onKeyPress={onKeyPress}
            disabled={isStreaming}
          />
        </div>
      </div>
    </>
  );
}
