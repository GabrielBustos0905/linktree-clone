import * as z from "zod";

export const LoginSchemas = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string())
});

export const RegisterSchemas = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
});

export const ResetPasswordSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    })
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
});

export const StepFourSchema = z.object({
    name: z.string(),
    username: z.string().min(1, {
        message: "Username is required!"
    })
});

export const UpdateInfoSchema = z.object({
    username: z.string().min(2).max(50),
    name: z.string().min(2).max(100).optional(),
    bio: z.string().min(2).max(400).optional(),
});

export const LinkSchema = z.object({
    link: z.string().min(2).max(200),
});