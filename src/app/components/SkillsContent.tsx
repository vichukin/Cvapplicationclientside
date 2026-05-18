const skillCategories = [
  {
    name: 'Backend',
    skills: ['C#', 'ASP.NET Core', 'ASP.NET MVC', 'Web API', 'Entity Framework (EF Core)', 'Dapper', 'JWT', 'Identity']
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Azure (App Service, Blob Storage, Key Vault, CosmosDB, SQL Database)', 'Git', 'CI/CD (GitHub Actions)', 'OAuth 2.0']
  },
  {
    name: 'Databases',
    skills: ['MSSQL Server', 'PostgreSQL', 'MySQL']
  },
  {
    name: 'Frontend',
    skills: ['React', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Bootstrap 5', 'jQuery']
  },
  {
    name: 'AI & Emerging Tech',
    skills: ['Semantic Kernel', 'OpenAI API', 'RAG architecture', 'Vector DBs', 'LLMs']
  },
  {
    name: 'Testing & Tools',
    skills: ['xUnit', 'NUnit', 'NSubstitute', 'Bogus']
  }
];

export function SkillsContent() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {skillCategories.map((cat, index) => (
        <div key={index} className="bg-slate-700/40 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">{cat.name}</p>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-2.5 py-1 bg-indigo-600/20 text-indigo-300 text-xs rounded-lg border border-indigo-600/30 hover:bg-indigo-600/30 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
