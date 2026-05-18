interface ExperienceData {
  title: string;
  dates: string;
  bullets: string[];
}

const experienceData: ExperienceData[] = [
  {
    title: 'Independent .NET & AI Developer',
    dates: 'Oct 2024 - Present',
    bullets: [
      'Integrated Semantic Kernel and OpenAI API into ASP.NET Core applications to build intelligent chatbots and modular data processing agents.',
      'Advised a high-traffic repair platform (20k+ daily visitors) on AI adoption, proposing a RAG architecture with Vector DBs to automate complex support queries.'
    ]
  },
  {
    title: 'Lead Backend Developer (Freelance)',
    dates: 'Jan 2023 - Sep 2024',
    bullets: [
      'Led backend development for a scalable rental platform within a cross-functional team of 6 (developers and designers).',
      'Designed RESTful APIs (ASP.NET Core) and optimized SQL schemas using EF Core.',
      'Managed cloud infrastructure via Azure (App Service, SQL Database, Blob Storage, Key Vault) and set up CI/CD pipelines via GitHub Actions.'
    ]
  },
  {
    title: 'Web Developer & Technical Consultant (Freelance)',
    dates: '2021 - 2023',
    bullets: [
      'Developed custom web applications and provided architectural consultancy for a restaurant POS and management system.'
    ]
  },
  {
    title: 'Project Coordinator & .NET Developer (Student Project)',
    dates: 'Jan 2022 - Dec 2022',
    bullets: [
      'Coordinated a 15-person team to deliver a .NET desktop app, managing Git workflows, task distribution, and core C# logic.'
    ]
  }
];

export function VerticalTimeline() {
  return (
    <div className="relative pl-8">
      {/* Vertical Indigo Line */}
      <div className="absolute left-2 top-2 bottom-0 w-px bg-indigo-600" />

      {/* Timeline Items */}
      <div className="space-y-8">
        {experienceData.map((experience, index) => (
          <div key={index} className="relative">
            {/* Indigo Dot Node */}
            <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-slate-800" />

            {/* Content */}
            <div className="ml-2">
              <h3 className="text-white text-base mb-1">{experience.title}</h3>
              <p className="text-slate-400 text-sm mb-3">{experience.dates}</p>
              <ul className="space-y-2">
                {experience.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="text-slate-300 text-sm flex gap-2">
                    <span className="text-indigo-400 mt-1.5 flex-shrink-0">•</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
