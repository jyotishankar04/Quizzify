import React from "react";

interface PricingCardProps {
  name: string;
  priceMonthly: string;
  priceAnnual: string;
  features: string[];
  buttonText: string;
  highlighted: boolean;
  isAnnual: boolean; // New prop to handle the selected pricing type
  discount: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  priceMonthly,
  priceAnnual,
  features,
  buttonText,
  highlighted,
  isAnnual, // Destructure the new prop
  discount, // Destructure the discount prop
}) => {
  // Decide which price to display based on the pricing type (monthly or annual)
  const displayPrice = isAnnual ? priceAnnual : priceMonthly;

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg text-neutral-900 p-8 border flex flex-col ${
        highlighted
          ? "border-indigo-600 transform scale-105 shadow-xl"
          : "border-neutral-200 hover:border-indigo-500"
      } transition-all duration-300`}
    >
      {highlighted && (
        <div className="absolute top-0 right-8 -translate-y-1/2">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8 relative">
        <h3 className="text-2xl font-bold mb-4">{name}</h3>
        <div className="flex justify-center items-center">
          <span className="text-4xl font-bold text-black">{displayPrice}</span>
          <div className="flex items-center flex-col">
            {discount && (
              <span className="text-indigo-600 text-sm font-semibold">
                {discount}
              </span>
            )}
            <span className="text-neutral-500 ml-1 text-xl">
              /{isAnnual ? "year" : "month"}
            </span>
          </div>
        </div>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-neutral-600">
            <svg
              className="w-5 h-5 text-green-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 px-6 rounded-lg font-semibold ${
          highlighted
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
        } transition-colors`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
