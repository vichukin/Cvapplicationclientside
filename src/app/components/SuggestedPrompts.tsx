interface SuggestedPromptsProps {
  prompts: string[];
  onPromptClick?: (prompt: string) => void;
}

export function SuggestedPrompts({ prompts, onPromptClick }: SuggestedPromptsProps) {
  return (
    <div className="flex gap-2 flex-wrap mb-3">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onPromptClick?.(prompt)}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-full transition-colors cursor-pointer"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
