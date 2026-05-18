interface CarouselPaginationProps {
  currentSlide: number;
  totalSlides: number;
  onDotClick: (index: number) => void;
}

export function CarouselPagination({ currentSlide, totalSlides, onDotClick }: CarouselPaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 py-4 md:hidden">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: currentSlide === index ? '#6366f1' : '#64748b',
            transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)'
          }}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
