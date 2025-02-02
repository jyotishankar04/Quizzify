import React from "react";

interface ScoreCardProps {
  text: string;
  textColor: string;
  bgColor: string;
  description: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  text,
  description,
  textColor,
  bgColor,
}) => {
  return (
    <div className={"text-center p-4  rounded-lg " + bgColor}>
      <div className={"text-4xl font-bold  mb-2 " + textColor}>{text}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  );
};

export default ScoreCard;
