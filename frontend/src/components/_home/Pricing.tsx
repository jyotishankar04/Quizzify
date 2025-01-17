// Pricing.tsx
import React, { useState } from "react";
import PricingCard from "./PricingCard";
import { _pricingData } from "../../constants/home.constants";

const Pricing: React.FC = () => {
  // State to manage whether the user selects monthly or annual pricing
  const [isAnnual, setIsAnnual] = useState(false);

  // Toggle pricing type (Monthly / Annual)
  const togglePricing = () => {
    setIsAnnual((prev) => !prev);
  };

  return (
    <section id="pricing" className="py-20 w-full bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your learning journey
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center items-center space-x-4 mb-12 animate__animated animate__fadeInUp">
          <span className="text-neutral-600 font-medium">Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="pricing-toggle"
              className="sr-only peer"
              checked={isAnnual}
              onChange={togglePricing}
            />
            <div className="w-14 h-7 bg-neutral-300 rounded-full peer peer-checked:after:translate-x-7 peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
          <span className="text-neutral-600 font-medium">
            Annual{" "}
            <span className="text-indigo-600 text-sm">(Save up to 25%)</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {_pricingData.map((plan) => (
            <PricingCard
              key={plan.id}
              name={plan.title}
              priceMonthly={plan.priceMonthly}
              priceAnnual={plan.priceAnnual}
              features={plan.features}
              buttonText={plan.buttonText}
              highlighted={plan.highlighted}
              isAnnual={isAnnual} // Pass the pricing toggle state
              discount={plan.discount}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
