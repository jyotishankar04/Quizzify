import { Share, User } from "lucide-react";
import { getNormalMMdoYYformat } from "../../lib/momentjs";
import { useGetProfile } from "../../lib/reactquery/react-query";
import LoadingModal from "../../components/PupUploading";
import { TOnlyQuiz } from "../../types";
import { Link } from "react-router-dom";

type CardProps = {
  title: string;
  stats?: {
    key: string;
    value: string | number;
  }[];
};

type QuizCardProps = {
  id: string;
  topic: string;
  topicContext: string;
  quizLength: number;
  quizLevel: string;
  createdAt: string;
  _count: {
    Attempt: number;
  };
};

const ProfilePage = () => {
  const { data, isLoading, isSuccess } = useGetProfile();
  if (isLoading) {
    return (
      <LoadingModal
        isVisible={isLoading}
        text="Loading Profile..."
        textContext="Please wait while we process your request"
      />
    );
  }
  const userStats = [
    {
      title: "Completed Quizzes",
      stats: [
        {
          key: "Total Quiz Taken",
          value: data.data._count.submissions || "_ _",
        },
        { key: "Avg. Score", value: " _ _" },
        {
          key: "Last Attempted",
          value:
            data.data.Attempt[0] &&
            getNormalMMdoYYformat(data.data.Attempt[0].createdAt),
        },
      ],
    },
    {
      title: "Created Contents",
      stats: [
        { key: "Quizzes Created", value: data.data._count.quizzes },
        { key: "Total Players", value: data.data.totalQuizPlayers },
        { key: "Avg. Rating", value: "_ _" },
      ],
    },
  ];

  if (isLoading) {
    return (
      <LoadingModal
        isVisible={isLoading}
        text="Loading Profile..."
        textContext="Please wait while we process your request"
      />
    );
  }
  if (!isSuccess) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-1 text-gray-900">
          Error in loading profile
        </h1>
        <p className="text-gray-600">
          We could not find your profile. Please try again later.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full flex mt-6 justify-start gap-5 flex-col items-center text-black">
      <div className="w-full max-w-7xl flex flex-row justify-between items-center card">
        <div className="flex items-start justify-start">
          <div className="w-40 h-40 overflow-hidden flex justify-center items-center border rounded-full">
            <User className="w-full h-full" />
          </div>
          <div className="ml-6 ">
            <h1 className="text-3xl font-bold mb-1">{data.data.name}</h1>
            <p className="text-gray-600">{data.data.email}</p>
            <p>State, Country</p>
            <p>
              Plan:
              <span className="font-bold text-blue-700">
                {data.data.subscription}
              </span>{" "}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              alert("Share Profile");
            }}
            className="btn btn-primary btn-disabled"
          >
            Share Profile <Share />
          </button>
        </div>
      </div>
      <div className="w-full max-w-7xl grid grid-cols-2 gap-4">
        {userStats.map((stat, index) => (
          <ProfileStatCard key={index} title={stat.title} stats={stat.stats} />
        ))}
      </div>
      <div className="w-full max-w-7xl card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Quizzes</h2>
        <div className="grid grid-cols-3 gap-4">
          {data.data.quizzes.length &&
            data.data.quizzes.map((quiz: TOnlyQuiz) => (
              <QuizCard
                key={quiz.id}
                id={quiz.id}
                _count={quiz._count}
                createdAt={quiz.createdAt}
                topic={quiz.topic}
                topicContext={quiz.topicContext}
                quizLength={quiz.quizLength}
                quizLevel={quiz.quizLevel}
              />
            ))}
          {!data.data.quizzes.length && (
            <p className="text-gray-500">No quizzes found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

const ProfileStatCard: React.FC<CardProps> = ({ title, stats = [] }) => {
  return (
    <div className="card flex flex-col gap-2 p-4">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="flex flex-col gap-1">
        {stats.map((stat, index) => (
          <p key={index} className="text-sm text-gray-500 flex justify-between">
            {stat.key} : <span>{stat.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

const QuizCard: React.FC<QuizCardProps> = ({
  topic,
  id,
  topicContext,
  quizLength,
  quizLevel,
  createdAt,
  _count,
}) => {
  return (
    <div className="card flex flex-row justify-between gap-2 p-4">
      <div className="flex flex-col gap-1">
        <Link
          to={`/app/quizzes/${id}`}
          className="text-xl font-semibold hover:underline hover:text-blue-600 text-gray-900"
        >
          {topic}
        </Link>
        <p className="text-sm text-gray-500">{topicContext}</p>
        <p className="text-sm text-gray-500">
          Created on {getNormalMMdoYYformat(createdAt)}
        </p>
        <p className="text-sm flex gap-2 mt-2">
          <span className="badge badge-primary"> {quizLevel} </span>
          <span className="badge badge-secondary">
            {" "}
            {quizLength} Questions{" "}
          </span>
        </p>
      </div>
      <p className="text-sm text-gray-500">
        Total Play: <span className="font-bold">{_count.Attempt}</span>
      </p>
    </div>
  );
};
