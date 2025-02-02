/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import QuizPlayQuestionCard from "../../components/_root/_quiz/QuizPlayQuestionCard";
import QuizPlayTopBar from "../../components/_root/_quiz/QuizPlayTopBar";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleQuizQuestionsByid,
  useSubmitAnswer,
} from "../../lib/reactquery/react-query";
import LoadingModal from "../../components/PupUploading";
import toast from "react-hot-toast";
import SubmitLoading from "../../components/_root/_quiz/SubmitLoading";
import { Pause, Play } from "lucide-react";
import {
  getDisplayTimeFromSeconds,
  getFormatedTimeFromSeconds,
} from "../../lib/momentjs";

const QuizPlayground = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const navigate = useNavigate();
  const { quizId: id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTimeExpired, setIsTimeExpired] = useState(false);

  const { data, isLoading: isFetchingQuestions } =
    useGetSingleQuizQuestionsByid(id as string);

  // Initialize timer value from the quiz duration
  const [timerValue, setTimerValue] = useState(() => {
    if (data?.data.quizDuration) {
      const formatted = getFormatedTimeFromSeconds(data.data.quizDuration);
      return {
        minutes: formatted.minutes,
        seconds: formatted.seconds,
      };
    }
    return { minutes: 0, seconds: 0 };
  });

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string | null>
  >({});

  const {
    mutateAsync: submitAnswer,
    isPending: isSubmitting,
    data: response,
    isSuccess,
  } = useSubmitAnswer(id as string);

  useEffect(() => {
    // Set initial timer value when data is loaded
    if (data?.data.quizDuration) {
      const formatted = getFormatedTimeFromSeconds(data.data.quizDuration);
      setTimerValue({
        minutes: formatted.minutes,
        seconds: formatted.seconds,
      });
    }
  }, [data?.data.quizDuration]);

  useEffect(() => {
    if (!isTimerRunning || isTimeExpired) return;

    const interval = setInterval(() => {
      setTimerValue((prev) => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;

        if (newSeconds < 0) {
          if (newMinutes === 0) {
            clearInterval(interval);
            setIsTimerRunning(false);
            setIsTimeExpired(true);
            return prev;
          }
          newMinutes -= 1;
          newSeconds = 59;
        }

        return { minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, isTimeExpired]);

  // Auto-submit when time expires
  useEffect(() => {
    if (isTimeExpired) {
      handleSubmit();
    }
  }, [isTimeExpired]);

  if (isFetchingQuestions && !data) {
    return <p className="text-center text-black h-full">Loading...</p>;
  }

  if (isSuccess) {
    navigate(
      "/app/quizzes/results?quizId=" + id + "&attemptId=" + response.data.id
    );
  }

  const questions = data.data.questions;

  const handleAnswerChange = (questionId: string, selectedOptionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOptionId,
    }));
  };

  const handleSubmit = async () => {
    const unanswered = questions.filter((q: any) => !selectedAnswers[q.id]);

    if (unanswered.length > 0 && !isTimeExpired) {
      toast.error("Please answer all the questions before submitting");
      return;
    }

    const elapsedTime =
      data.data.quizDuration - (timerValue.minutes * 60 + timerValue.seconds);

    await submitAnswer({
      ...selectedAnswers,
      duration: elapsedTime.toString(),
    });

    setSelectedAnswers({});
    setCurrentQuestionIndex(0);

    if (!isTimeExpired) {
      toast.success("Quiz submitted successfully!");
    } else {
      toast.error("Time's up! Quiz submitted automatically.");
    }
  };

  const progress = ((currentQuestionIndex + 1) / data.data.quizLength) * 100;

  if (isSubmitting) {
    return <SubmitLoading />;
  }

  return (
    <div className="w-full h-full gap-3 text-black flex flex-col justify-start items-center">
      <LoadingModal isVisible={isFetchingQuestions} />
      <header className="text-xl font-bold py-3 text-gray-900">
        <h1>Quiz Playground</h1>
      </header>
      <main className="max-w-4xl flex flex-col gap-5 w-full mx-auto">
        <div className="flex flex-col gap-3 card">
          <QuizPlayTopBar
            topic={data.data.topic}
            topicContext={data.data.topicContext}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={data.data.quizLength}
            progress={progress}
          />
          <div className="flex flex-row justify-between items-center gap-3">
            <div className="flex flex-col items-center">
              <p className="text-md text-gray-700 font-semibold">Time Left</p>
              <p
                className={`text-2xl font-bold ${
                  isTimeExpired ? "text-error" : ""
                }`}
              >
                {timerValue.minutes < 10
                  ? `0${timerValue.minutes}`
                  : timerValue.minutes}
                :
                {timerValue.seconds < 10
                  ? `0${timerValue.seconds}`
                  : timerValue.seconds}
              </p>
            </div>
            <div>
              <button disabled={isTimeExpired}>
                {isTimerRunning ? (
                  <Pause
                    className="w-8 h-8"
                    onClick={() => setIsTimerRunning(false)}
                  />
                ) : (
                  <Play
                    className="w-8 h-8"
                    onClick={() => setIsTimerRunning(true)}
                  />
                )}
              </button>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-md text-gray-700 font-semibold">Total Time</p>
              <p className="text-2xl font-bold">
                {getDisplayTimeFromSeconds(data.data.quizDuration)}
              </p>
            </div>
          </div>
        </div>
        <QuizPlayQuestionCard
          key={questions[currentQuestionIndex].id}
          index={currentQuestionIndex}
          id={questions[currentQuestionIndex].id}
          text={questions[currentQuestionIndex].text}
          options={questions[currentQuestionIndex].options}
          isRunning={isTimerRunning}
          selectedAnswer={
            selectedAnswers[questions[currentQuestionIndex].id] || null
          }
          onAnswerChange={handleAnswerChange}
        />
        <div className="flex justify-between mt-5">
          <button
            className="btn btn-secondary"
            disabled={!isTimerRunning || currentQuestionIndex === 0}
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
            }
          >
            Previous
          </button>

          <button
            className="btn btn-primary"
            onClick={() =>
              currentQuestionIndex === questions.length - 1
                ? handleSubmit()
                : setCurrentQuestionIndex((prev) =>
                    Math.min(prev + 1, questions.length - 1)
                  )
            }
            disabled={!isTimerRunning}
          >
            {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizPlayground;
