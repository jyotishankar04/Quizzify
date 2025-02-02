import { Link } from "react-router-dom";
import {
  getDisplayTimeFromSeconds,
  getNormalMMdoYYformat,
} from "../../../lib/momentjs";
import { TOnlyQuiz } from "../../../types";

const QuizPageCard: React.FC<TOnlyQuiz> = ({
  id,
  topic,
  topicContext,
  quizLength,
  quizLevel,
  createdAt,
  quizDuration,
  _count,
}) => {
  return (
    <div className="p-6 w-full grid grid-cols-4 gap-4">
      <div>
        <Link
          to={`/app/quizzes/${id}`}
          className="text-lg hover:underline hover:text-blue-600 font-medium text-gray-900"
        >
          {topic}
        </Link>
        <p className="text-sm text-gray-500">{topicContext}</p>

        <p className="text-sm text-gray-500">
          Created on {getNormalMMdoYYformat(createdAt)}
        </p>
      </div>
      <div className="text-left text-md">
        <p className=" text-gray-500">
          Quiz Level:{" "}
          <span className="font-bold text-gray-900">{quizLevel}</span>
        </p>
        <p className=" text-gray-500">
          Questions:{" "}
          <span className="font-bold text-gray-900">{quizLength}</span>
        </p>
      </div>
      <div className="flex items-center justify-center flex-col gap-2">
        <span
          className={`px-3 py-1 text-sm  rounded-full  text-yellow-600 bg-yellow-100`}
        >
          {_count.Attempt} Attempts
        </span>
        <span className="text-sm text-gray-500 ml-2">
          Duration: {getDisplayTimeFromSeconds(quizDuration)}
        </span>
      </div>
      <div className="flex items-center justify-end">
        <Link to={`/app/quizzes/${id}`} className="btn px-10 btn-primary">
          View
        </Link>
      </div>
    </div>
  );
};

export default QuizPageCard;
