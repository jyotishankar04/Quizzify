import { useEffect, useState } from "react";

const SubmitLoading = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "Analyzing your answers...",
    "Calculating results...",
    "Almost done...",
    "Finalizing...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
        {/* Loading Animation */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Generating Your Quiz
        </h2>

        {/* Status Messages */}
        <p className="text-gray-600 mb-8">{messages[currentMessageIndex]}</p>

        {/* Cancel Button */}
        <button className="mt-8 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          Cancel Generation
        </button>
      </div>
    </div>
  );
};

export default SubmitLoading;
