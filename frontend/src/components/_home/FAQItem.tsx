import React from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean; // New prop to determine if this FAQ item is open
  onClick: () => void; // Function to handle the toggle
}

const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className="faq-item border  border-neutral-700 rounded-lg overflow-hidden">
      <button
        className="faq-button w-full flex justify-between items-center p-6 bg-neutral-800 hover:bg-neutral-700 transition-colors text-left"
        onClick={onClick}
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <svg
          className={`w-6 h-6 text-neutral-400 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`faq-answer bg-neutral-800 px-6 pb-6 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <p className="text-neutral-300">{answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;
