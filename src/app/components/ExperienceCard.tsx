interface ExperienceCardProps {
  title: string;
  dates: string;
  bullets: string[];
}

export function ExperienceCard({ title, dates, bullets }: ExperienceCardProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 mb-4">
      <h3 className="text-white text-base mb-1">{title}</h3>
      <p className="text-slate-400 text-sm mb-4">{dates}</p>
      <ul className="space-y-2">
        {bullets.map((bullet, index) => (
          <li key={index} className="text-slate-300 text-sm flex gap-2">
            <span className="text-indigo-400 mt-1.5 flex-shrink-0">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
