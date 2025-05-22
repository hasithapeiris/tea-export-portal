import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header_1, Header_2, Header_3 } from "../assets";

const slides = [
  {
    image: Header_1,
    text: "Welcome to Tea Information Portal",
    subText:
      "Our platform provides in-depth insights into tea production trends, export data, and global market demand, helping industry stakeholders make informed decisions.",
  },
  {
    image: Header_2,
    text: "Predictive Information",
    subText:
      "Stay ahead with our tea production forecasting tools, powered by machine learning. Get real-time insights on production volumes, and future trends to optimize cultivation and export strategies.",
    buttonText: "Read Full Story",
    buttonLink: "/news",
  },
  {
    image: Header_3,
    text: "Current Trends",
    subText:
      "Our platform analyzes forex earnings from tea exports, helping businesses understand currency fluctuations, export revenue trends, and future market predictions.",
    buttonText: "Read Full Story",
    buttonLink: "/news",
  },
];

const MainCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative min-h-screen bg-slate-800 w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full relative">
            <div className="absolute h-screen inset-0 bg-black bg-opacity-50">
              <img
                src={slide.image}
                alt={slide.text}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-70"></div>
              <div
                key={current}
                className="wrapper-header absolute inset-0 flex flex-col justify-center items-center text-center text-white"
              >
                <h1 className="font-heading text-5xl font-extrabold mb-4 animate-fade-in md:text-7xl">
                  {slide.text.toUpperCase()}
                </h1>
                {slide.subText && (
                  <p className="text-lg md:text-xl font-normal mb-4 animate-fade-in-delay">
                    {slide.subText}
                  </p>
                )}

                {slide.buttonText && (
                  <a
                    href={slide.buttonLink}
                    className="bg-yellow-300 text-black py-2 px-4 rounded-lg font-semibold animate-fade-in-extra-delay"
                  >
                    {slide.buttonText.toUpperCase()}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          setCurrent((current - 1 + slides.length) % slides.length)
        }
        className="absolute left-8 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-25 hover:bg-opacity-35 text-white rounded-full hidden md:block"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-25 hover:bg-opacity-35 text-white rounded-full hidden md:block"
      >
        <ChevronRight />
      </button>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="flex flex-center w-6 h-10 border-2 border-white rounded-full relative animate-bounce">
          <div className="w-2 h-2 bg-white rounded-full absolute top-2 animate-move-up-down"></div>
        </div>
      </div>
    </div>
  );
};

export default MainCarousel;
