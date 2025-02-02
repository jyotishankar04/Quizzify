import QuizPageCard from "../../components/_root/_quiz/QuizPageCard";
import LoadingModal from "../../components/PupUploading";
import { useGetAllQuizzes } from "../../lib/reactquery/react-query";
import { TOnlyQuiz } from "../../types";

const Quizzes = () => {
  const { data, isLoading } = useGetAllQuizzes();

  return (
    <div className="text-black p-10 w-full">
      <LoadingModal isVisible={isLoading} />
      <div className="bg-white  rounded-xl border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Quizzes
          </h2>
        </div>
        <div className="divide-y w-full divide-gray-200">
          {data?.data?.length ? (
            data.data.map((quiz: TOnlyQuiz) => (
              <QuizPageCard
                key={quiz.id}
                id={quiz.id}
                topic={quiz.topic}
                topicContext={quiz.topicContext}
                quizLength={quiz.quizLength}
                quizLevel={quiz.quizLevel}
                createdAt={quiz.createdAt}
                quizDuration={quiz.quizDuration}
                updatedAt={quiz.updatedAt}
                _count={quiz._count}
                authorId={quiz.authorId}
                isPublic={quiz.isPublic}
              />
            ))
          ) : (
            <div className="p-6 text-center text-gray-600">
              No quizzes available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
