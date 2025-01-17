import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  iconColor,
}) => {
  return (
    <div
      className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out animate__animated animate__fadeInUp border border-neutral-100"
      id="el-1t8ers3w"
    >
      <div
        className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
        id="el-yld62d8q"
      >
        <div
          className={`w-8 h-8 ${iconColor} fill-current`}
          id="el-1x7z9j5k"
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      </div>
      ++0
      <h3
        className="text-2xl font-semibold mb-3 text-neutral-900"
        id="el-5s1iebky"
      >
        {title}
      </h3>
      <p className="text-neutral-600 leading-relaxed" id="el-h3kx0emz">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
