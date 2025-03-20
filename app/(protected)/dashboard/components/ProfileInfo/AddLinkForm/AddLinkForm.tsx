import { AddLinkFormProps } from "./AddLinkForm.types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { dataSocialNetworks } from "@/data/social-networks";
import Image from "next/image";
import axios from "axios";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";
import { toast } from "sonner";


const formSchema = z.object({
    link: z.string().min(2).max(200),
    name: z.string().min(1).max(50),
    icon: z.string({
        required_error: "Please select an icon!"
    }),
});

export function AddLinkForm(props: AddLinkFormProps) {
    const { onReload } = props;
    const { reloadUser } = useUser();
    const [openDialog, setOpenDialog] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
            name: "",
            icon: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/update-user/social-networks", values);
            toast.success("Social network added!");

            onReload(true);
            setOpenDialog(false);
            reloadUser();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="mt-6">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger>
                    <div className="w-full bg-[#680148] hover:bg-[#680147bd] rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300 px-4 py-2 text-white">
                        <Plus className="w-7 h-7" />
                        Add social network
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new social network</DialogTitle>
                        <div className="grid gap-4 py-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="icon"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel>Select your icon</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                            const selectedLink = dataSocialNetworks.find((link) => link.icon === value);
                                                            if (selectedLink) {
                                                                form.setValue("name", selectedLink.name)
                                                            }
                                                        }}
                                                        defaultValue={field.value || ""}
                                                        className="grid grid-cols-4 space-x-1"
                                                    >
                                                        {
                                                            dataSocialNetworks.map((link) => (
                                                                <FormItem key={link.name} className="flex items-center gap-1 space-x-0 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value={link.icon} />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        <Image
                                                                            src={link.icon}
                                                                            alt="Icon"
                                                                            width={40}
                                                                            height={40}
                                                                        />
                                                                    </FormLabel>
                                                                </FormItem>
                                                            ))
                                                        }
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="link"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Enter Link</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="URL" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Enter social network name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Social network" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button className="w-full bg-[#680148] hover:bg-[#680147bd]" type="submit">Add new Social Network</Button>
                                </form>
                            </Form>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}