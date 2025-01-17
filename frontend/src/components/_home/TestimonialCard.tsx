import React from "react";

// Types
interface TestimonialCardProps {
  name: string;
  role: string;
  rating: number;
  feedback: string;
  color: string;
}

// Mock testimonials data

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  rating,
  feedback,
  color,
}) => {
  return (
    <div className="w-full g:w-1/3 flex-shrink-0 px-4">
      <div className="bg-neutral-800 rounded-2xl p-8 h-full border border-neutral-700 animate__animated animate__fadeInUp">
        <div className="flex items-center mb-6">
          <div
            className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white font-bold text-xl`}
          >
            {name.charAt(0)}
          </div>
          <div className="ml-4">
            <h4 className="text-white font-semibold">{name}</h4>
            <p className="text-neutral-400">{role}</p>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex text-yellow-400">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </div>
        </div>
        <p className="text-neutral-300">{`"${feedback}"`}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
