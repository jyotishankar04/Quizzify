interface HIWCardProps {
  title: string;
  description: string;
  step: number;
  side: "left" | "right";
}

const HIWCard: React.FC<HIWCardProps> = ({
  title,
  description,
  step,
  side,
}) => {
  return (
    <div
      className={`flex flex-col-reverse lg:flex-row ${
        side === "right" ? "lg:flex-row-reverse  md:ml-20" : " "
      } items-center gap-8 relative`}
    >
      {/* Circle with Step Number */}
      <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold z-10">
        {step}
      </div>

      {/* Text Content */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-neutral-400">{description}</p>
      </div>

      {/* Spacer for central alignment */}
      <div className="hidden lg:block lg:w-1/2"></div>
    </div>
  );
};

export default HIWCard;
