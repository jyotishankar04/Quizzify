import React from "react";

interface QuizForgeProps {
  size?: number; // Size of the circular icon in pixels
  textSize?: string; // Tailwind class for text size
  className?: string; // Additional Tailwind classes
}

const QuizForge: React.FC<QuizForgeProps> = ({
  size = 64,
  textSize = "text-2xl",
  className = "",
}) => {
  const circleSize = `${size}px`;
  const dotSize = `${size / 10}px`; // Dots are 1/10th the size of the main circle

  return (
    <div
      className={`flex items-center space-x-4 group cursor-pointer group ${className}`}
    >
      <div
        className="relative"
        style={{ width: circleSize, height: circleSize }}
      >
        <div
          className="bg-indigo-500 bg-opacity-80 rounded-full flex items-center justify-center shadow-lg"
          style={{ width: circleSize, height: circleSize }}
        >
          <span
            className="text-white group-hover:scale-125 duration-200 font-bold"
            style={{ fontSize: size / 2 }}
          >
            ?
          </span>
        </div>

        {/* Top Dot */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-400 rounded-full shadow-md transition-all duration-500 "
            style={{ width: dotSize, height: dotSize }}
          ></div>
        </div>

        {/* Bottom Dot */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-yellow-400 rounded-full shadow-md transition-all duration-500 "
            style={{ width: dotSize, height: dotSize }}
          ></div>
        </div>

        {/* Right Dot */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-green-400 rounded-full shadow-md transition-all duration-500 "
            style={{ width: dotSize, height: dotSize }}
          ></div>
        </div>
      </div>

      <div
        className={`font-bold text-[#5046e5] group-hover:text-indigo-500 transition-colors ${textSize}`}
      >
        Quiz Forge
      </div>
    </div>
  );
};

export default QuizForge;
