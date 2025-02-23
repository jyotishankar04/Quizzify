import  z from  "zod";

export  const  createSupportValidator = z.object({
     queryTitle: z.string().min(3, { message: "Query title must be at least 3 characters long" }),
    queryDescription: z.string().min(5, { message: "Query description must be at least 5 characters long" })
})


