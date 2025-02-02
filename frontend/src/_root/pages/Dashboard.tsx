/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import DashTopCard from "../../components/_root/_dash/DashTopCard";
import LoadingModal from "../../components/PupUploading";
import { useAuthContext } from "../../context/AuthContext";
import {
  getDisplayTimeFromSeconds,
  getNormalMMdoYYformat,
} from "../../lib/momentjs";
import { useGetDashboardStats } from "../../lib/reactquery/react-query";

const Dashboard = () => {
  const { user } = useAuthContext();
  const {
    data: dashboardStats,
    isLoading: isDashboardStatsLoading,
    isError,
  } = useGetDashboardStats();

  if (isDashboardStatsLoading) {
    return (
      <div className="text-black p-10 w-full">
        <LoadingModal isVisible={isDashboardStatsLoading} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-black p-10 w-full flex justify-center items-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p>{isError}</p>
      </div>
    );
  }

  const statsData = [
    {
      id: 1,
      label: "Total Quizzes",
      value: dashboardStats.data.totalQuizes,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      icon: `<svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>`,
      iconColor: "text-blue-600",
      progressColor: "bg-blue-600",
      progressWidth: "75%",
    },
    {
      id: 2,
      label: "Attempts",
      value: dashboardStats.data.totalAttempts,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      icon: `<svg
    className="w-6 h-6"
    fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          </svg>`,
      iconColor: "text-green-600",
      progressColor: "bg-green-600",
      progressWidth: "60%",
    },
    {
      id: 3,
      label: "Total Played quiz",
      value: dashboardStats.data.totalQuizPlayed,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
      iconColor: "text-yellow-600",
      icon: ` <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>`,
      progressColor: "bg-yellow-600",
      progressWidth: "85%",
    },
    {
      id: 4,
      label: "Questions Created",
      value: dashboardStats.data.totalQuestionCreated,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      textColor: "text-purple-600",
      icon: `<svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>`,
      progressColor: "bg-purple-600",
      progressWidth: "90%",
    },
  ];

  return (
    <main className=" p-8">
      <header className="flex justify-between items-center w-full mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2 text-black text-xl font-semibold">
          <p>
            Welcome back,{" "}
            <span className="text-blue-600">
              {user && user.name.split(" ")[0]}
            </span>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <DashTopCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
            iconColor={stat.iconColor}
            textColor={stat.textColor}
          />
        ))}
      </div>

      {/* Recent Quizzes */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Quizzes
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {dashboardStats.data.recentQuizes.map((quiz: any) => (
            <div>
              <Link
                to={`/app/quizzes/${quiz.quizId}`}
                className="p-6 flex items-center justify-between space-x-4 border-b border-gray-200"
              >
                <div className=" text-black">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {quiz.quiz.topic}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {quiz.quiz.topicContext}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-900">
                    {quiz.quiz._count.questions} Questions
                  </p>
                  <p className="text-sm badge badge-primary">
                    {quiz.quiz.quizLevel}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm text-gray-500">
                    Created on {getNormalMMdoYYformat(quiz.createdAt)}
                  </p>
                  <p className="text-sm badge font-semibold  badge-secondary">
                    {getDisplayTimeFromSeconds(quiz.quiz.quizDuration)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Quiz Button */}
      <Link
        to="/app/quizzes/create"
        className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="text-lg">Generate New Quiz</span>
      </Link>
    </main>
  );
};

export default Dashboard;
