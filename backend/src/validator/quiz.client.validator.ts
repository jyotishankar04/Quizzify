import z from "zod";

const createQuizValidator = z
  .object({
    topic: z
      .string()
      .min(3, { message: "Topic must be at least 3 characters long" }),
    topicContext: z
      .string()
      .min(5, { message: "Topic context must be at least 5 characters long" })
      .optional(),
    quizLength: z.number().int().positive(),
    quizLevel: z.enum([
      "noob",
      "beginner",
      "intermediate",
      "advanced",
      "master",
    ]),
  })
  .refine(
    (data) =>
      ["noob", "beginner", "intermediate", "advanced", "master"].includes(
        data.quizLevel
      ),
    {
      message: "Not a quiz level",
    }
  );

export { createQuizValidator };
