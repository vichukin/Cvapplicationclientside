import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SystemBubble } from './SystemBubble';
import type { RetryPayload } from './SystemBubble';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system-cold-start' | 'system-error';
  text: string;
  retryPayload?: RetryPayload;
  onRetry?: (payload: RetryPayload) => void;
}

export function ChatMessage({ role, text, retryPayload, onRetry }: ChatMessageProps) {
  if (role === 'system-cold-start') {
    return <SystemBubble type="cold-start" />;
  }

  if (role === 'system-error') {
    return <SystemBubble type="error" retryPayload={retryPayload} onRetry={onRetry} />;
  }

  // Empty assistant message = still loading: show typing dots
  if (role === 'assistant' && text === '') {
    return (
      <div className="flex justify-start mb-4">
        <div className="rounded-xl px-4 py-3 bg-slate-800">
          <div className="flex gap-1 items-center h-4">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '160ms' }} />
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '320ms' }} />
          </div>
        </div>
      </div>
    );
  }

  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 ${
          isUser ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white'
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
        ) : (
          <div className="prose prose-invert max-w-none prose-sm text-slate-300 prose-p:text-slate-300 prose-p:leading-relaxed prose-p:my-3 prose-headings:text-slate-100 prose-headings:my-2 prose-strong:text-slate-200 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-code:text-indigo-300 prose-code:bg-slate-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-a:text-indigo-400 prose-blockquote:border-indigo-500 prose-blockquote:text-slate-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
