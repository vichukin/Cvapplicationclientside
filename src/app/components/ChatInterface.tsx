import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { SystemBubble } from './SystemBubble';
import { SuggestedPrompts } from './SuggestedPrompts';
import { ChatInput } from './ChatInput';
import type { RetryPayload } from './SystemBubble';

export interface Message {
  id: number;
  role: 'user' | 'assistant' | 'system-cold-start' | 'system-error';
  text: string;
  retryPayload?: RetryPayload;
}

interface ChatInterfaceProps {
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

export function ChatInterface({
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
}: ChatInterfaceProps) {
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isLoading, isWakingUp]);

  return (
    <>
      <div ref={chatHistoryRef} className="flex-1 overflow-y-auto p-6">
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

      <div className="border-t border-slate-700 px-6 py-4">
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
    </>
  );
}
