import { Link, useSearchParams } from "react-router-dom";
import ScoreCard from "../../components/_root/_quiz/ScoreCard";
import { useGetResultByAttemptId } from "../../lib/reactquery/react-query";
import SubmitLoading from "../../components/_root/_quiz/SubmitLoading";
import { useQueryClient } from "@tanstack/react-query";
import { getDisplayTimeFromSeconds } from "../../lib/momentjs";

const AttemptResults = () => {
  const [searchParams] = useSearchParams();
  const attemptId = searchParams.get("attemptId");
  const quizId = searchParams.get("quizId");
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess } = useGetResultByAttemptId(
    quizId!,
    attemptId!
  );
  if (isSuccess) {
    queryClient.invalidateQueries({
      queryKey: ["quiz", quizId!],
    });
    queryClient.invalidateQueries({
      queryKey: ["quizzes"],
    });
  }
  if (isLoading) {
    return <SubmitLoading />;
  }
  return (
    <div className="h-full m-auto w-full flex flex-col justify-start items-center mt-10">
      <div className="w-full max-w-7xl  card">
        <div className="">
          <h1 className="text-3xl font-bold mb-1 text-gray-900">Results</h1>
          <p className="text-gray-600">
            Your attempt has been submitted successfully. You can view the
            results here.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-3">
          <ScoreCard
            text={data.data.totalScore}
            description="Your score"
            textColor="text-indigo-700"
            bgColor="bg-indigo-100"
          />
          <ScoreCard
            text={data.data.totalQuestions}
            description="Total Questions"
            textColor="text-yellow-700"
            bgColor="bg-yellow-100"
          />
          <ScoreCard
            text={getDisplayTimeFromSeconds(data.data.quizDuration)}
            description="Time taken"
            textColor="text-green-700"
            bgColor="bg-green-200"
          />
        </div>
      </div>
      <div className="w-full max-w-7xl flex justify-center items-center  card mt-4">
        <div className="flex items-center gap-10">
          <Link to={`/app/quizzes`}>
            <button className="btn btn-outline mt-4">Go to Quizzes</button>
          </Link>

          <Link to={`/app/quizzes/${quizId}`}>
            <button className="btn btn-primary  mt-4 ">Replay Quiz</button>
          </Link>
          <Link to={`/app/quizzes/create`}>
            <button className="btn btn-outline mt-4 ">Create a new Quiz</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AttemptResults;
