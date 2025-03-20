"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormNameAndUsernameProps } from "./FormNameAndUsername.types";
import { useUser } from "@/hooks/use-user";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { UpdateInfoSchema } from "@/schemas";

export function FormNameAndUsername(props: FormNameAndUsernameProps) {
    const { setOpenDialog } = props;
    const { user, reloadUser } = useUser();

    const form = useForm<z.infer<typeof UpdateInfoSchema>>({
        resolver: zodResolver(UpdateInfoSchema),
        defaultValues: {
            username: user?.username || "",
            name: user?.name || "",
            bio: user?.bio || ""
        },
    });

    const onSubmit = async (values: z.infer<typeof UpdateInfoSchema>) => {
        try {
            await axios.patch("/api/update-user", {
                name: values.name,
                username: values.username,
                bio: values.bio
            });

            setOpenDialog(false);
            reloadUser();
            toast.success("Values Updated! 🔥");
            form.reset();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full bg-[#680148] hover:bg-[#680147bd]">Save</Button>
            </form>
        </Form>
    )
}