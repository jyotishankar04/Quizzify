import { model } from "../../../config/gemini.config";

export interface IQuizPrompt {
  topic: string;
  topicContext: string;
  quizLength: number;
  quizLevel: string;
}

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
- The number of questions matches the specified quiz length.`;
  return prompt;
};

const getQuizes = async (prompt: string) => {
  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    process.stdout.write(chunkText);
  }
  return result;
};

export { getQuizPrompt };
