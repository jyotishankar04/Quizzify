import { _howItWorks } from "../../constants/home.constants";
import HIWCard from "./HIWCard";

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-20  bg-neutral-900 w-full text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="el-l0obai5u">
        {/* <!-- Section Header --> */}
        <div
          className="text-center mb-16 animate__animated animate__fadeIn"
          id="el-hbqgu15f"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" id="el-c50r5e1v">
            How QuizAI Works
          </h2>
          <p
            className="text-neutral-400 text-lg max-w-2xl mx-auto"
            id="el-uu0fxfpe"
          >
            Create and take AI-powered quizzes in three simple steps
          </p>
        </div>

        {/* <!-- Steps --> */}
        <div className="relative" id="el-11zx1tl4">
          {/* <!-- Connection Line --> */}
          <div
            className="hidden lg:block absolute left-1/2 top-24 w-0.5 h-[60%] bg-gradient-to-b from-indigo-500 to-purple-500"
            id="el-skupit1n"
          ></div>

          {/* <!-- Steps Grid --> */}
          <div className="space-y-12 lg:space-y-24" id="el-3n03nnrp">
            {/* <!-- Step 1 --> */}
            {_howItWorks.map((item, index) => (
              <HIWCard
                {...item}
                side={index % 2 == 0 ? "left" : "right"}
                key={index}
              />
            ))}
          </div>
        </div>

        {/* <!-- CTA Button --> */}
        <div
          className="text-center mt-16 animate__animated animate__fadeInUp"
          id="el-0p30nnxk"
        >
          <button
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all font-semibold inline-flex items-center gap-2"
            id="el-x8hri17j"
          >
            Try It Now
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              id="el-q4ykox2e"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                id="el-8dn3ejjc"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* <!-- Background Elements --> */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        id="el-b3i7q8vw"
      >
        <div
          className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"
          id="el-lfykdq4e"
        ></div>
        <div
          className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          id="el-ji2gi6qq"
        ></div>
      </div>
    </section>
  );
};

export default HowItWorks;
