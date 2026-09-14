export function TypingIndicator() {
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
