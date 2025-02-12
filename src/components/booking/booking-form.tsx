import React, { forwardRef, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "../ui/button";

const FormSchema = z.object({
    userName: z.string().min(6, {
        message: "Your name must be at least 6 characters.",
    }),
    email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
    phone: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits." })
        .max(15, { message: "Phone number cannot exceed 15 digits." })
        .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
    recive_details: z.boolean().optional()
});

// Define the ref's function type
export interface BookingFormRef {
    submitForm: () => void;
}

// Use forwardRef to allow the parent to trigger submission
const BookingForm = forwardRef<BookingFormRef, { handleFormSubmit: () => void }>(
    ({ handleFormSubmit }, ref) => {

        const form = useForm<z.infer<typeof FormSchema>>({
            resolver: zodResolver(FormSchema),
            defaultValues: {
                userName: "",
                email: "",
                phone: "",
                recive_details: false,
            },
        });

        function onSubmit(data: z.infer<typeof FormSchema>) {
            console.log("🚀 ~ onSubmit ~ data:", data);
            handleFormSubmit();
        }

        // Expose the submitForm function to the parent
        useImperativeHandle(ref, () => ({
            submitForm: () => {
                form.handleSubmit(onSubmit)();
            }
        }));

        return (
            <div className='lg:w-2/5 rounded-[16px] border border-[#E3E6EA] p-[26px]'>
                <h3 className='text-2xl/8 font-extrabold'>Breaking into Product Management
                    (₹1999)</h3>
                
                <div className='bg-primary-light rounded-[12px] flex items-center justify-between mt-6 p-4'>
                    <div className='flex gap-3 items-center flex-shrink-0'>
                        <div className='flex flex-shrink-0 flex-col justify-center gap-0.5 rounded-[16px] overflow-hidden border border-[#DEDEDF] bg-[#F6F6F6] font-bold text-sm'>
                            <p className='px-5 pt-3'>Jan</p>
                            <div className='pb-3 bg-white'>
                                <p className='text-center'>31</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-0.5'>
                            <p className='text-base/6 font-bold'>
                                Fri, 31 Jan
                            </p>
                            <p className='text-[#5C5C5C]'>11:30 - 12:00PM (GMT +05:30)</p>
                        </div>
                    </div>
                    <Button className='h-fit border border-foreground text-foreground font-bold' variant={'outline'}>Change</Button>
                </div>

                <Form {...form}>
                    <form className="flex flex-col items-start mt-8 w-full">
                        <FormField
                            control={form.control}
                            name="userName"
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
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start w-full mt-6">
                                    <FormLabel className="text-left text-sm font-plus-jakarta-sans">
                                        Email <span className="text-[#E03137]">*</span>
                                    </FormLabel>
                                    <FormControl className="w-full bg-[#FAFAFA]">
                                        <Input
                                            className="py-4 px-5 h-11 md:h-14"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start w-full mt-6">
                                    <FormLabel className="text-left text-sm font-plus-jakarta-sans">
                                        Phone <span className="text-[#E03137]">*</span>
                                    </FormLabel>
                                    <FormControl className="w-full bg-[#FAFAFA]">
                                        <Input
                                            className="py-4 px-5 h-11 md:h-14"
                                            placeholder="Enter your phone number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="recive_details"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 w-full mt-4">
                                    <FormControl>
                                        <Checkbox
                                            className='!text-white border-foreground data-[state=checked]:bg-[#008060]'
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Use different settings for my mobile devices
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

            </div>
        );
    }
);
BookingForm.displayName = "BookingForm";
export default BookingForm;
