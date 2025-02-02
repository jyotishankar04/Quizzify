type QuizPlayQuestionCardProps = {
  index: number;
  id: string;
  text: string;
  options: { id: string; text: string }[];
  selectedAnswer: string | null;
  onAnswerChange: (questionId: string, selectedOptionId: string) => void;
};

type props = {
  isRunning: boolean;
} & QuizPlayQuestionCardProps;

const QuizPlayQuestionCard: React.FC<props> = ({
  id,
  text,
  options,
  selectedAnswer,
  onAnswerChange,
  isRunning,
}) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(id, event.target.value);
  };

  return (
    <div className="card">
      <div className="mb-8">
        <h1 className="text-lg font-semibold text-gray-800/80">{text}</h1>
      </div>
      <div className="flex gap-2 flex-col">
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center border border-gray-400 rounded-lg p-4 ${
              selectedAnswer === option.id
                ? "border-indigo-500 bg-indigo-500/30"
                : ""
            }`}
          >
            <input
              type="radio"
              id={option.id}
              value={option.id}
              name={`question-${id}`}
              className="radio radio-primary"
              checked={selectedAnswer === option.id}
              onChange={handleOptionChange}
              disabled={!isRunning}
            />
            <span className="ml-2">{option.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPlayQuestionCard;
