import { create } from "zustand";
import { TQuiz } from "../../types";

type TSingleQuiz = {
  quiz: TQuiz;
  setQuiz: (quiz: TQuiz) => void;
  removeQuiz: () => void;
};

const useSingleQuizStore = create<TSingleQuiz>((set) => ({
  quiz: {
    id: "",
    topic: "",
    topicContext: "",
    quizLength: 0,
    quizLevel: "",
    questions: [],
    authorId: "",
    createdAt: "",
    updatedAt: "",
    _count: {
      questions: 0,
    },
    isCompleted: false,
    isPublic: false,
  } as TQuiz,
  setQuiz: (quiz) => set({ quiz }),
  removeQuiz: () => set({ quiz: {} as TQuiz }),
}));

export default useSingleQuizStore;
