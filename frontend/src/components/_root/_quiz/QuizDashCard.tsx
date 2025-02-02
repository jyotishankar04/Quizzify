type QuizDashCardProps = {
  id: number;
  lebel: string;
  value: string;
  description: string;
  color: string;
};

const QuizDashCard: React.FC<QuizDashCardProps> = ({
  lebel,
  value,
  description,
  color,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{lebel}</h3>
      <div className="flex items-center justify-between">
        <div className={"text-3xl font-bold " + color}>{value}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
};

export default QuizDashCard;
