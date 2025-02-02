import React, { useState, useEffect, useRef } from "react";

interface TimerCardProps {
  quizStarted: boolean; // Prop to indicate if the quiz has started
  onQuizEnd: (timeTaken: number) => void; // Callback to return time taken when quiz ends
}

const TimerCard: React.FC<TimerCardProps> = ({ quizStarted, onQuizEnd }) => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null); // Use `number` for browser environments

  // Format time into mm:ss
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secondsRemaining
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (quizStarted) {
      setIsRunning(true);
      setTime(0); // Reset time
      timerRef.current = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (!quizStarted && isRunning) {
      // Quiz ended
      setIsRunning(false);
      if (timerRef.current !== null) {
        clearInterval(timerRef.current); // Clear the interval only if it's not null
      }
      onQuizEnd(time); // Return time taken
    }

    return () => {
      // Cleanup on unmount
      if (timerRef.current !== null) {
        clearInterval(timerRef.current); // Clear the interval only if it's not null
      }
    };
  }, [quizStarted]);

  return (
    <div
      className={`
        fixed 
        top-5 
        right-5 
        bg-white 
        p-4 
        rounded-lg 
        shadow-md 
        z-50 
        border-2 
        ${isRunning ? "bg-green-500 text-white" : "bg-gray-200"}
      `}
    >
      <h3 className="text-lg font-semibold">
        {isRunning ? "Quiz Timer" : "Waiting to Start"}
      </h3>
      <span className="text-2xl font-bold">{formatTime(time)}</span>
    </div>
  );
};

export default TimerCard;
