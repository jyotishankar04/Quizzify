type QuizPlayTopBarProps = {
  topic: string;
  topicContext: string;
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
};

const QuizPlayTopBar: React.FC<QuizPlayTopBarProps> = ({
  currentQuestion,
  totalQuestions,
  progress,
  topic,
  topicContext,
}) => {
  return (
    <div className=" flex-1">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">{topic}</h1>
          <p className="text-gray-600 text-sm">Topic: {topicContext}</p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-indigo-500">
            {currentQuestion}/{totalQuestions}
          </h1>
          <p>Question</p>
        </div>
      </div>
      <div>
        <progress
          className="progress progress-primary w-full"
          value={progress}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default QuizPlayTopBar;
