const QuizGredientCard = () => {
  return (
    <div
      className="relative animate__animated animate__fadeInRight"
      id="el-215cuf61"
    >
      <div
        className="bg-gradient-to-br from-indigo-900/70 to-purple-900/70 backdrop-blur-md p-8 rounded-3xl border border-indigo-600/30 shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
        id="el-54u1mj8b"
      >
        <div
          className="flex items-center justify-between mb-8"
          id="el-6lcikm2r"
        >
          <div className="flex items-center gap-3" id="el-4rmt71go">
            <svg
              className="w-6 h-6 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              id="el-sl255pw1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.96-.413-2.636-1.08l-.548.547z"
                id="el-bh6gi31l"
              ></path>
            </svg>
            <span className="text-indigo-200 font-medium" id="el-plcce1bg">
              Quiz Generator AI
            </span>
          </div>
          <div
            className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/20"
            id="el-cn9gthb5"
          >
            <span className="text-xs text-indigo-200" id="el-y3gzurjf">
              Ready
            </span>
          </div>
        </div>

        <div className="space-y-6" id="el-jniceu3k">
          <div className="flex space-x-4" id="el-1ge22kbi">
            <div className="flex-1 space-y-4 py-1" id="el-nzho80r8">
              <h3
                className="text-indigo-200 text-lg font-medium"
                id="el-rwvw5f2z"
              >
                Generated Quiz
              </h3>
              <div className="space-y-3" id="el-7nhryub6">
                <p className="text-indigo-300" id="el-aq9prodc">
                  Your quiz questions will appear here once generated.
                </p>
                <p className="text-indigo-400/70" id="el-pl1g9tzo">
                  Click the button below to start generating questions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end" id="el-lakmt3ju">
          <button
            className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 rounded-lg border border-indigo-400/20 transition-all duration-300"
            id="el-mysa8ju6"
          >
            Generate Quiz
          </button>
        </div>
      </div>

      <div
        className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl"
        id="el-1y0qxvcb"
      ></div>
      <div
        className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
        id="el-pavcfvnk"
      ></div>
    </div>
  );
};

export default QuizGredientCard;
