import { MoveRight } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useGetSingleQuiz,
  useUpdateQuizData,
} from "../../lib/reactquery/react-query";
import LoadingModal from "../../components/PupUploading";
import { TQuizCreate } from "../../types";
import EditQuizQuestions from "../../components/_root/_quiz/EditQuizQuestions";

const EditQuizPage = () => {
  const { register, handleSubmit } = useForm();

  const { quizId: id } = useParams();

  const { data: defaultData, isLoading: isDefaultDataLoading } =
    useGetSingleQuiz(id as string);
  const {
    mutate: updateData,
    isSuccess: isDataUpdated,
    isPending: isUpdatingData,
    isError: isUpdatingDataError,
  } = useUpdateQuizData(id as string);

  const handleUpdateQuizDetails = handleSubmit(async (data) => {
    if (!data) {
      return toast.error("Please fill all the fields");
    }
    if (!data.topic.trim() || !data.topicContext.trim()) {
      return toast.error("Please fill all the fields");
    }
    await updateData(data as TQuizCreate);
  });
  if (isDataUpdated) {
    toast.success("Quiz Updated Successfully");
  }
  if (isUpdatingDataError) {
    toast.error("Something went wrong");
    return;
  }
  if (isDefaultDataLoading) {
    return <LoadingModal isVisible={isDefaultDataLoading} text="Loading..." />;
  }
  if (isUpdatingData) {
    return <LoadingModal isVisible={isUpdatingData} text="Updating..." />;
  }
  return (
    <section className="min-h-screen w-full  bg-white text-black p-6">
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Quiz Setup</h2>
          <form className="space-y-6" onSubmit={handleUpdateQuizDetails}>
            <div className="space-y-4">
              {/* <TopicInput /> */}
              <div className="space-y-2">
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Topic
                </label>
                <input
                  {...register("topic")}
                  defaultValue={defaultData.data.topic}
                  type="text"
                  id="topicContext"
                  className="w-full px-4 py-2 input text-black input-bordered"
                  placeholder="e.g. JavaScript"
                />
              </div>
              {/* <SubtopicInput /> */}
              <div className="space-y-2">
                <label
                  htmlFor="topicContext"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Topic Context
                </label>
                <input
                  {...register("topicContext")}
                  type="text"
                  defaultValue={defaultData.data.topicContext}
                  id="topicContext"
                  className="w-full px-4 py-2 input text-black input-bordered"
                  placeholder="e.g. Variables"
                />
              </div>
              {/* <QuestionsSelect /> */}
              {
                <>
                  <label
                    htmlFor="quizLength"
                    className="block text-sm font-medium text-neutral-700"
                  >
                    No. of Questions
                  </label>
                  <select
                    {...register("quizLength")}
                    name="quizLength"
                    defaultValue={defaultData.data.quizLength}
                    className="w-full select select-bordered focus:outline-none focus:ring-1 ring-blue-500"
                  >
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={15}>15 Questions</option>
                    <option value={20}>20 Questions</option>
                    <option value={25}>25 Questions</option>
                    <option value={30}>30 Questions</option>
                  </select>
                </>
              }
              {
                // Quiz Duration
                <>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-neutral-700"
                  >
                    Quiz Duration
                  </label>
                  <select
                    {...register("duration")}
                    name="duration"
                    defaultValue={defaultData.data.quizDuration}
                    className="w-full select select-bordered focus:outline-none focus:ring-1 ring-blue-500"
                  >
                    {[
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                      18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                    ].map((duration) => (
                      <option
                        className="capitalize "
                        key={duration}
                        value={duration * 60}
                      >
                        {duration} {duration > 1 ? "Minutes" : "Minute"}
                      </option>
                    ))}
                  </select>
                </>
              }
              {/* <DifficultyLevel /> */}
              <>
                <label
                  htmlFor="quizLevel"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Difficulty Level
                </label>
                <select
                  {...register("quizLevel")}
                  name="quizLevel"
                  defaultValue={defaultData.data.quizLevel}
                  className="w-full select select-bordered focus:outline-none focus:ring-1 ring-blue-500"
                >
                  {[
                    "noob",
                    "beginner",
                    "intermediate",
                    "advanced",
                    "master",
                  ].map((level) => (
                    <option className="capitalize " key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-sm hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Update Quiz Details</span>
              <MoveRight />
            </button>
          </form>
        </div>
      </div>

      {/* {isPending && <CreatingLoading />} */}
      <EditQuizQuestions />
    </section>
  );
};

export default EditQuizPage;
