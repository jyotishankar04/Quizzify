import React, { useState } from "react";
import FaqItem from "./FAQItem";
import { _faqData } from "../../constants/home.constants";

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // State to track the open FAQ item

  // Handle click to open a specific FAQ item
  const handleFaqClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle between open and closed
  };

  return (
    <section id="faq" className="py-20 w-full bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 text-lg">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4 animate__animated animate__fadeInUp">
          {_faqData.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index} // Only open the one that matches the current index
              onClick={() => handleFaqClick(index)} // Handle the click event
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
