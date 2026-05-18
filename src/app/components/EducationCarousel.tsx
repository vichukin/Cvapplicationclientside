import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const educationItems = [
  {
    degree: 'AI Developer',
    institution: 'WSB Merito',
    location: 'Gdynia, Poland',
    dates: 'Oct 2024 - Present'
  },
  {
    degree: 'IT Technician',
    institution: 'ZSE Gdansk',
    location: 'Gdansk, Poland',
    dates: 'Sep 2022 - May 2025'
  },
  {
    degree: 'Software Developer',
    institution: 'IT Academy Step of Ukraine',
    location: '',
    dates: 'May 2021 - May 2024'
  }
];

const languages = [
  { language: 'Russian / Ukrainian', level: 'Native speaker', proficiency: 100 },
  { language: 'Polish', level: 'C1 — Advanced', proficiency: 90 },
  { language: 'English', level: 'B2 — Upper-intermediate', proficiency: 72 }
];

interface EducationCarouselProps {
  onSlideChange?: (index: number) => void;
  currentSlide?: number;
}

export function EducationCarousel({ onSlideChange }: EducationCarouselProps) {
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
        {/* Card 1 — Education */}
        <div className="px-1.5">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white text-base font-medium mb-4">Education</h3>
            <div className="space-y-4">
              {educationItems.map((edu, index) => (
                <div key={index} className="flex gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">{edu.degree}</p>
                    <p className="text-indigo-300 text-sm">{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{edu.dates}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2 — Languages */}
        <div className="px-1.5">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white text-base font-medium mb-5">Languages</h3>
            <div className="space-y-5">
              {languages.map((lang, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-white text-sm">{lang.language}</span>
                    <span className="text-indigo-300 text-xs">{lang.level}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div
                      className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${lang.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
