import { quizLevel } from "@prisma/client";
import { model } from "../../../config/gemini.config";
import prisma from "../../../config/prisma.config";

export interface IQuizPrompt {
  topic: string;
  topicContext: string;
  quizLength: number;
  quizLevel: string;
}

export type QuizCreationProps = {
  topic: string;
  topicContext: string;
  quizLength: number;
  quizLevel: string;
  quizDuration: number;
  author: {
    id: string;
  };
  questions: {
    id: string;
    text: string;
    Option: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
  }[];
};

const getQuizPrompt = ({
  topic,
  topicContext,
  quizLength,
  quizLevel,
}: IQuizPrompt) => {
  const prompt = `Generate a quiz in JSON format based on the following parameters:
- Topic: ${topic}
- Context: ${topicContext}
- Number of Questions: ${quizLength}
- Difficulty Level: ${quizLevel}

**Difficulty Levels**:
1. Noob: Very basic questions requiring minimal knowledge of the topic.
2. Beginner: Slightly more detailed questions that test foundational knowledge.
3. Intermediate: Questions requiring moderate understanding and some problem-solving skills.
4. Advanced: Complex questions that test in-depth knowledge and analysis.
5. Expert: Highly challenging questions for those with mastery of the topic.

Each question must include:
1. A unique question identifier.
2. The question text, relevant to the topic and context.
3. Four answer options, each with a unique identifier.
4. A field indicating which option is correct (isCorrect: true for the correct option, false for others).
5. Each question should be structured in proper JSON format.

The output should be a valid JSON object structured like this:
{
  "questions": [
    {
      "id": "q1",
      "text": "What is the capital of France?",
      "options": [
        { "id": "o1", "text": "Paris", "isCorrect": true },
        { "id": "o2", "text": "London", "isCorrect": false },
        { "id": "o3", "text": "Berlin", "isCorrect": false },
        { "id": "o4", "text": "Madrid", "isCorrect": false }
      ]
    },
    {
      "id": "q2",
      "text": "Which of the following is a prime number?",
      "options": [
        { "id": "o1", "text": "4", "isCorrect": false },
        { "id": "o2", "text": "9", "isCorrect": false },
        { "id": "o3", "text": "11", "isCorrect": true },
        { "id": "o4", "text": "15", "isCorrect": false }
      ]
    }
  ]
}

Ensure:
- All questions align with the specified topic, context, and difficulty level.
- The difficulty level directly impacts the complexity of the questions and answers.
- Only valid JSON is generated as the output.
- The number of questions matches the specified quiz length.
- The whole structure is valid JSON and can be parsed correctly.
`;
  return prompt;
};

const pushQuizesToDb = async (data: QuizCreationProps) => {
  try {
    const result = await prisma.quiz.create({
      data: {
        topic: data.topic,
        topicContext: data.topicContext,
        quizLength: data.quizLength,
        quizLevel: data.quizLevel as quizLevel,
        quizDuration: data.quizDuration,
        author: {
          connect: {
            id: data.author.id,
          },
        },
        questions: {
          create: data.questions.map((question) => ({
            text: question.text,
            options: {
              create: question.Option.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
            _count: true,
          },
        },
        submissions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },

        _count: true,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating the quiz!");
  }
};

export { getQuizPrompt, pushQuizesToDb };
