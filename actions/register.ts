"use server";

import * as z from "zod";
import { RegisterSchemas } from "@/schemas";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

 
export async function register(values: z.infer<typeof RegisterSchemas>) {
    const validateField = RegisterSchemas.safeParse(values);

    if(!validateField.success) return { error: "Invalid fields" };
    
    const { email, password, name } = validateField.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser) return { error: "Email already in use" }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    return { success: "User created!"}
}