import React, { useState, useEffect } from "react";
import { _testimonials } from "../../constants/home.constants";
import TestimonialCard from "./TestimonialCard";

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % _testimonials.length);
    }, 5000);

    return () => clearInterval(autoSlide);
  }, []);

  const handlePrevSlide = () => {
    const nextSlide =
      currentSlide === 0 ? _testimonials.length - 1 : currentSlide - 1;
    updateSlide(nextSlide);
  };

  const handleNextSlide = () => {
    const nextSlide = (currentSlide + 1) % _testimonials.length;
    updateSlide(nextSlide);
  };

  return (
    <section id="testimonials" className="py-12 md:py-20 w-full bg-neutral-900">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16 animate__animated animate__fadeIn">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            What Our Users Say
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            Join thousands of satisfied users who have transformed their
            learning experience
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              id="testimonials-container"
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentSlide * (isMobile ? 100 : 33.333)
                }%)`,
              }}
            >
              {_testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`${
                    isMobile ? "w-full" : "w-1/3"
                  } flex-shrink-0 px-2 md:px-4`}
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-1/2 md:-translate-x-1/4 
                     text-white text-xl md:text-2xl font-semibold bg-indigo-500/50 backdrop-blur-md 
                     hover:bg-indigo-500 aspect-square rounded-full p-1 md:p-2"
          >
            &lt;
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-1/2 md:translate-x-1/4 
                     backdrop-blur-md text-white text-xl md:text-2xl font-semibold bg-purple-400/50 
                     hover:bg-purple-400/90 aspect-square rounded-full p-1 md:p-2"
          >
            &gt;
          </button>
        </div>

        {/* Dots Indicator for Mobile */}
        {isMobile && (
          <div className="flex justify-center mt-4 gap-2">
            {_testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => updateSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? "w-4 bg-purple-400"
                    : "w-2 bg-neutral-600"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
