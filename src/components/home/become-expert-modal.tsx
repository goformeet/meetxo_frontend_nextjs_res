'use client';
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from '@/lib/utils';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";


// Define the structure of the API response
interface ApiResponse {
    message: string;
}

const FormSchema = z.object({
    name: z.string().min(6, {
        message: "Your name must be at least 6 characters.",
    }),
    contact: z
        .string()
        .min(1, { message: "Email or phone number is required." })
        .refine(
            (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || // Valid email check
                /^\d{10,}$/.test(value), // Valid phone number check (at least 10 digits)
            { message: "Please enter a valid email or phone number." }
        ),
});

export default function BecomeExpertModal({ name, open, setOpen }: { name: string; open: boolean; setOpen: (open: boolean) => void }) {

    const [fromSubmitted, setFormSubmitted] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: name,
            contact: "",
        },
    });
    useEffect(() => {
        form.setValue("name", name);
    }, [name, form]);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await axios.post<ApiResponse>('/api/become-expert', data);
            toast(response.data.message);  // Reset form after successful submission
            setFormSubmitted(true);
        } catch {
            toast("Failed to send message. Try again later.");
        }
    }

    const isButtonDisabled = !form.watch("contact") || !form.watch("name");

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent className="sm:max-w-[425px]">
                {
                    !fromSubmitted ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Join as expert</DialogTitle>
                                <DialogDescription>
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="flex flex-col items-start mt-8 w-full"
                                >
                                    {/* Name Field */}
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-start w-full">
                                                <FormLabel className="text-left text-sm font-plus-jakarta-sans">
                                                    Name <span className="text-[#E03137]">*</span>
                                                </FormLabel>
                                                <FormControl className="w-full">
                                                    <Input
                                                        className="py-4 px-5 h-11 md:h-14"
                                                        placeholder="Enter your name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Single Input Field for Email or Phone */}
                                    <FormField
                                        control={form.control}
                                        name="contact"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-start w-full mt-6">
                                                <FormLabel className="text-left text-sm font-plus-jakarta-sans">
                                                    Email or Phone <span className="text-[#E03137]">*</span>
                                                </FormLabel>
                                                <FormControl className="w-full">
                                                    <Input
                                                        className="py-4 px-5 h-11 md:h-14"
                                                        placeholder="Enter your email or phone number"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <Button
                                        disabled={isButtonDisabled}
                                        className={cn(
                                            "bg-primary text-white w-full mt-7 md:mt-8 px-6 py-6 font-plus-jakarta-sans text-base font-bold leading-[150%] tracking-[0.3px]",
                                            { "opacity-50 cursor-not-allowed": isButtonDisabled }
                                        )}
                                        type="submit"
                                    >
                                        Continue
                                    </Button>
                                </form>
                            </Form>
                        </>
                    ) : (
                        <DialogHeader>
                            <DialogTitle className='text-xl font-bold text-center'>
                                Our Team Will Contact You!
                            </DialogTitle>
                            {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                        </DialogHeader>
                    )
                }
            </DialogContent>
            <Toaster />
        </Dialog>
    )
}
