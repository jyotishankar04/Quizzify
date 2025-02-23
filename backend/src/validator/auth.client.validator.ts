import z from "zod";

const clientRegisterValidator = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const clientLoginValidator = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const updatePasswordValidator = z.object({
  currentPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
}).refine(( {currentPassword,newPassword,confirmPassword})=>{
  return newPassword === confirmPassword
},{
    message: "Passwords do not match",
});



export { clientRegisterValidator, clientLoginValidator ,updatePasswordValidator};
