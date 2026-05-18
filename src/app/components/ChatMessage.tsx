import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  text: string;
}

export function ChatMessage({ role, text }: ChatMessageProps) {
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
