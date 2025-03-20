import { useState } from "react";
import { EditSocialNetworkProps } from "./EditSocialNetwork.types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import axios from "axios";
import { useUser } from "@/hooks/use-user";
import { LinkSchema } from "@/schemas";

export function EditSocialNetwork(props: EditSocialNetworkProps) {
    const { link, onReload } = props;
    const [showDialog, setShowDialog] = useState(false);
    const { reloadUser } = useUser();

    const form = useForm<z.infer<typeof LinkSchema>>({
        resolver: zodResolver(LinkSchema),
        defaultValues: {
            link: link.link || "",
        },
    });

    const onSubmit = async (values: z.infer<typeof LinkSchema>) => {
        await axios.patch(`/api/update-user/social-networks/${link.id}`, {
            link: values.link
        });
        setShowDialog(false);
        onReload(true);
        reloadUser();
    };

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link social network</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https:/domain/username" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Example: https:/domain/username
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-[#680148] hover:bg-[#680147bd] rounded-full">Save</Button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog >

    )
}