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

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex justify-center border-b border-slate-700 px-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 text-sm transition-colors relative ${
            activeTab === tab.id
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
          )}
        </button>
      ))}
    </div>
  );
}
