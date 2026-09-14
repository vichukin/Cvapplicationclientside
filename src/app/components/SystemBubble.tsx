export type RetryPayload = Array<{ role: string; text: string }>;

interface SystemBubbleProps {
  type: 'cold-start' | 'error';
  retryPayload?: RetryPayload;
  onRetry?: (payload: RetryPayload) => void;
}

export function SystemBubble({ type, retryPayload, onRetry }: SystemBubbleProps) {
  if (type === 'cold-start') {
    return (
      <div className="flex justify-center mb-4 px-2">
        <div className="w-full max-w-[85%] rounded-xl px-5 py-4 bg-slate-700/40 border border-slate-600/50 text-center">
          <p className="text-slate-400 text-xs leading-relaxed">
            ☁️ Waking up the server... The initial start may take 10–15 seconds. Thank you for your patience.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-4 px-2">
      <div className="w-full max-w-[85%] rounded-xl px-4 py-3 bg-amber-950/30 border border-amber-600/35 space-y-2.5">
        <p className="text-amber-300/80 text-xs leading-relaxed">
          ⚠️ Connection timeout or failed to fetch data.
        </p>
        {retryPayload && onRetry && (
          <button
            onClick={() => onRetry(retryPayload)}
            className="text-xs px-3 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/35 border border-amber-600/40 text-amber-300 transition-colors"
          >
            ↺ Retry Request
          </button>
        )}
      </div>
    </div>
  );
}
