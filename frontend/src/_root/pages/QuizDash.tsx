/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useNavigate, useParams } from "react-router-dom";
import QuizDashCard from "../../components/_root/_quiz/QuizDashCard";
import RecentAttemptTable from "../../components/_root/_quiz/RecentAttemptTable";
import {
  useDeleteQuiz,
  useGetSingleQuiz,
} from "../../lib/reactquery/react-query";
import LoadingModal from "../../components/PupUploading";
import { Attempt } from "../../types";
import {
  getDisplayTimeFromSeconds,
  getNormalMMdoYYformat,
} from "../../lib/momentjs";
import { useAuthContext } from "../../context/AuthContext";
import { Edit2, PlayCircle, Trash2, TriangleAlert } from "lucide-react";

const QuizDash = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { quizId: id } = useParams();
  if (!id) {
    return null;
  }

  const { data, isLoading } = useGetSingleQuiz(id as string);
  const { mutate: deleteQuiz, isPending: isDeleting } = useDeleteQuiz(
    id as string
  );

  const tableData =
    data?.data?.submissions.length > 0
      ? data?.data?.submissions[0].Attempt.map((attempt: Attempt) => ({
          id: attempt.id,
          name: attempt.users?.name,
          score: attempt.totalScore,
          time: attempt.quizDuration,
          date: getNormalMMdoYYformat(attempt.createdAt),
        }))
      : [];

  console.log("quizData", tableData);
  const quizData = data?.data;
  const _data = [
    {
      id: 1,
      lebel: "Performance",
      value: "_ _",
      description: "Average Score",
      color: "text-green-600",
    },
    {
      id: 2,
      lebel: "Completion Rate",
      value: "_ _",
      description: "Finish Rate",
      color: "text-yellow-600",
    },
    {
      id: 3,
      lebel: "Time Stats",
      value: "_ _",
      description: "Avg. Duration",
      color: "text-purple-600",
    },
  ];
  return (
    <section id="quiz-interface" className="min-h-screen bg-white py-8 px-4">
      <LoadingModal isVisible={isLoading} />

      <div className="max-w-6xl mx-auto">
        {/* Quiz Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {_data.map((item) => (
            <QuizDashCard key={item.id} {...item} />
          ))}
        </div>

        {/* Quiz Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {quizData?.topic}
              </h2>
              <p className="text-gray-600">{quizData?.topicContext}</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 gap-2">
              {user.id === quizData?.authorId && (
                <>
                  <div
                    className="tooltip tooltip-error "
                    data-tip="Delete quiz"
                  >
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    {/* The button to open modal */}
                    <label
                      htmlFor="delete-modal"
                      className="btn btn-error text-white"
                    >
                      <Trash2 />
                    </label>
                    {/* The button to open modal */}

                    {/* Put this part before </body> tag */}
                    <input
                      type="checkbox"
                      id="delete-modal"
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box text-gray-900 flex flex-col items-center">
                        <TriangleAlert className="text-yellow-500 w-16 h-16 bg-yellow-100 p-3 rounded-full" />
                        <h3 className="font-bold text-lg">Warning!</h3>
                        <p>Are you sure you want to delete this quiz?</p>
                        <div className="modal-action w-full grid grid-cols-2">
                          <button
                            onClick={() => {
                              document.getElementById("delete-modal")?.click();
                            }}
                            className="btn btn-outline"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={async () => {
                              await deleteQuiz();
                              window.location.href = "/app/quizzes";
                            }}
                            disabled={isDeleting}
                            className={`btn btn-error m-auto text-white ${
                              isDeleting && "loading "
                            }`}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tooltip tooltip-warning"
                    data-tip="Edit Functionality Not Available Yet!"
                  >
                    <Link
                      to={`/app/quizzes/edit/${id}`}
                      className="btn btn-outline btn-disabled"
                    >
                      <Edit2 />
                      Edit Quiz
                    </Link>
                  </div>
                </>
              )}
              <button
                onClick={() => navigate(`/app/quizzes/play/${id}`)}
                className="btn btn-primary mr-2"
              >
                <PlayCircle />
                Play Quiz
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Total Questions</div>
              <div className="text-xl font-bold text-gray-800">
                {quizData?.quizLength}
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Time Limit</div>
              <div className="text-xl font-bold text-gray-800">
                {getDisplayTimeFromSeconds(quizData?.quizDuration)}
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Difficulty</div>
              <div className="text-xl font-bold capitalize text-gray-800">
                {quizData?.quizLevel}
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Attempts</div>
              <div className="text-xl font-bold text-gray-800">
                {data?.data?._count.Attempt}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Attempts */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Attempts
          </h3>
          <div className="overflow-x-auto">
            {tableData.length > 0 ? (
              <RecentAttemptTable data={tableData} />
            ) : (
              <div className="text-gray-600">No recent attempts found.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizDash;
