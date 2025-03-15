"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchemas } from "@/schemas";
import { login } from "@/actions/login";

import { CardWrapper } from "./CardWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use" : "";
    const callbackUrl = searchParams.get("callbackUrl")

    const form = useForm<z.infer<typeof LoginSchemas>>({
        resolver: zodResolver(LoginSchemas),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchemas>) => {
        setError("");
        setSuccess("")

        startTransition(() => {
            login(values, callbackUrl).then((data) => {
                if (data?.error) {
                    form.reset();
                    setError(data.error)
                };
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success)
                };
            }).catch(() => {
                setError("Something went wrong!")
            })
        });
    };

    return (
        <CardWrapper
            headerLabel="Welcome back!"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="next-auth@gmail.com"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="*****"
                                        type="password"
                                    />
                                </FormControl>
                                <Button
                                    size="sm"
                                    variant="link"
                                    asChild
                                    className="px-0 font-normal flex justify-start"
                                >
                                    <Link href="/auth/reset-password">
                                        Forgot password?
                                    </Link>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}