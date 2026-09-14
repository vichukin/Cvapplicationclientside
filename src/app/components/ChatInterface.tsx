import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
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
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onPromptClick: (prompt: string) => void;
  onRetry: (payload: RetryPayload) => void;
}

const suggestedPrompts = [
  'Tell me about RAG',
  'Team Lead experience',
  'English level'
];

export function ChatInterface({
  messages,
  inputValue,
  isStreaming,
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
  }, [messages]);

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
