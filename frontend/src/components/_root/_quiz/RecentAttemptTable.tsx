import { getDisplayTimeFromSeconds } from "../../../lib/momentjs";

type RecentAttemptTableProps = {
  id: string;
  name: string;
  score: string;
  time: string;
  date: string;
};

const RecentAttemptTable: React.FC<{ data: RecentAttemptTableProps[] }> = ({
  data,
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4 text-gray-600">User</th>
          <th className="text-left py-3 px-4 text-gray-600">Score</th>
          <th className="text-left py-3 px-4 text-gray-600">Time Taken</th>
          <th className="text-left py-3 px-4 text-gray-600">Date</th>
        </tr>
      </thead>
      <tbody className="text-gray-600">
        {data.map((attempt: RecentAttemptTableProps) => (
          <tr key={attempt.id}>
            <td className="py-3 px-4">{attempt.name}</td>
            <td className="py-3 px-4">{attempt.score}</td>
            <td className="py-3 px-4">
              {getDisplayTimeFromSeconds(Number(attempt.time))}
            </td>
            <td className="py-3 px-4">{attempt.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentAttemptTable;
