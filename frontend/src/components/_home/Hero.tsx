import QuizGredientCard from "./QuizGredientCard";

const Hero = () => {
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20"
      id="el-9giyyesp"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center" id="el-wxhdxngb">
        <div className="text-center lg:text-left" id="el-3njbt4ny">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate__animated animate__fadeInUp"
            id="el-crs77koo"
          >
            AI-Powered Quiz Generation
            <span className="text-indigo-500" id="el-5ftfwtpb">
              Made Simple
            </span>
          </h1>
          <p
            className="text-xl text-neutral-300 mb-8 animate__animated animate__fadeInUp animate__delay-1s"
            id="el-r5xvfjr9"
          >
            Create customized quizzes instantly with our AI technology. Perfect
            for education, training, and self-assessment.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate__animated animate__fadeInUp animate__delay-2s"
            id="el-qfdqxmne"
          >
            <button
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all font-semibold"
              id="el-idwpiw0r"
            >
              Try Demo Quiz
            </button>
            <button
              className="px-8 py-4 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transform hover:scale-105 transition-all font-semibold"
              id="el-3bi8itff"
            >
              Learn More
            </button>
          </div>
        </div>
        {/*  */}
        <QuizGredientCard />
      </div>
    </div>
  );
};

export default Hero;
