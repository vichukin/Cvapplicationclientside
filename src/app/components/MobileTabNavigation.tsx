interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' }
];

interface MobileTabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function MobileTabNavigation({ activeTab, onTabChange }: MobileTabNavigationProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide border-b border-slate-700 px-4 md:hidden">
      <div className="flex gap-2 min-w-max py-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
