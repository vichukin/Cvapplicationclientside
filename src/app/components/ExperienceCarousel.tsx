import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

interface ExperienceCarouselProps {
  onSlideChange?: (index: number) => void;
  currentSlide?: number;
}

export function ExperienceCarousel({ onSlideChange, currentSlide }: ExperienceCarouselProps) {
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
      if (onSlideChange) {
        onSlideChange(next);
      }
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: '15px'
        }
      }
    ]
  };

  return (
    <div className="experience-carousel-container">
      <Slider ref={sliderRef} {...settings}>
        {experienceData.map((experience, index) => (
          <div key={index} className="px-1.5">
            <div className="bg-slate-800 rounded-xl p-6 h-full border border-slate-700">
              <h3 className="text-white text-base leading-relaxed mb-2">{experience.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{experience.dates}</p>
              <ul className="space-y-3">
                {experience.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="text-slate-300 text-sm leading-relaxed flex gap-2">
                    <span className="text-indigo-400 mt-1.5 flex-shrink-0">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
