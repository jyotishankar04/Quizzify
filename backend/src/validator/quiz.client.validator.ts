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
    duration: z.number().int().positive(),
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

const jsonCreateQuizValidator = z.object({
  topic: z
    .string()
    .min(3, { message: "Topic must be at least 3 characters long" }),
  topicContext: z
    .string()
    .min(5, { message: "Topic context must be at least 5 characters long" })
    .optional(),
  quizLength: z.number().int().positive(),
  quizLevel: z.enum(["noob", "beginner", "intermediate", "advanced", "master"]),
  questions: z.array(
    z.object({
      text: z.string(),
      Option: z.array(
        z.object({
          text: z.string(),
          isCorrect: z.boolean(),
        })
      ),
    })
  ),
});

const questionEditValidator = z.array(
  z.object({
    id: z.string({ required_error: "Question id is required" }),
    text: z.string({ required_error: "Question text is required" }),
    Option: z.array(
      z.object(
        {
          id: z.string({ required_error: "Option id is required" }),
          text: z.string({ required_error: "Option text is required" }),
          isCorrect: z.boolean({
            required_error: "Option isCorrect is required",
          }),
        },
        { required_error: "Options are required" }
      )
    ),
  }),
  { required_error: "Questions are required" }
);

export { createQuizValidator, jsonCreateQuizValidator, questionEditValidator };
