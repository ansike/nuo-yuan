import { z } from 'zod'
 
export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'User name must be at least 4 characters' })
    .trim(),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters' })
    .trim(),
})
export const LoginFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'User name must be at least 4 characters' })
    .trim(),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters' })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type SessionPayload = {
    userId: number
    expiresAt: Date
}