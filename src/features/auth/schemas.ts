import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(6)
  .max(100)
  .transform((str) => str.trim())

export const name = z.string().min(2)

export const SignupInput = z.object({
  email,
  password,
  name,
  terms: z.boolean().refine((val) => val, { message: "You must accept the terms and conditions" }),
})

export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email,
  password,
})
export type LoginInputType = z.infer<typeof LoginInput>

export const ForgotPasswordInput = z.object({
  email,
})

export type ForgotPasswordInputType = z.infer<typeof ForgotPasswordInput>

export const ResetPasswordInput = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export type ResetPasswordInputType = z.infer<typeof ResetPasswordInput>
