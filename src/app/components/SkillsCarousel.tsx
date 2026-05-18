import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const skillCards = [
  {
    title: 'Backend & Cloud',
    categories: [
      {
        name: 'Backend',
        skills: ['C#', 'ASP.NET Core', 'ASP.NET MVC', 'Web API', 'Entity Framework (EF Core)', 'Dapper', 'JWT', 'Identity']
      },
      {
        name: 'Cloud & DevOps',
        skills: ['Azure (App Service, Blob Storage, Key Vault, CosmosDB, SQL Database)', 'Git', 'CI/CD (GitHub Actions)', 'OAuth 2.0']
      }
    ]
  },
  {
    title: 'Databases & Frontend',
    categories: [
      {
        name: 'Databases',
        skills: ['MSSQL Server', 'PostgreSQL', 'MySQL']
      },
      {
        name: 'Frontend',
        skills: ['React', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Bootstrap 5', 'jQuery']
      }
    ]
  },
  {
    title: 'AI & Testing',
    categories: [
      {
        name: 'AI & Emerging Tech',
        skills: ['Semantic Kernel', 'OpenAI API', 'RAG architecture', 'Vector DBs', 'LLMs']
      },
      {
        name: 'Testing & Tools',
        skills: ['xUnit', 'NUnit', 'NSubstitute', 'Bogus']
      }
    ]
  }
];

interface SkillsCarouselProps {
  onSlideChange?: (index: number) => void;
  currentSlide?: number;
}

export function SkillsCarousel({ onSlideChange }: SkillsCarouselProps) {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '20px',
    beforeChange: (_current: number, next: number) => {
      if (onSlideChange) onSlideChange(next);
    }
  };

  return (
    <div className="experience-carousel-container">
      <Slider ref={sliderRef} {...settings}>
        {skillCards.map((card, cardIndex) => (
          <div key={cardIndex} className="px-1.5">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-white text-base font-medium mb-4">{card.title}</h3>
              <div className="space-y-4">
                {card.categories.map((cat, catIndex) => (
                  <div key={catIndex}>
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">{cat.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2.5 py-1 bg-indigo-600/20 text-indigo-300 text-xs rounded-lg border border-indigo-600/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
