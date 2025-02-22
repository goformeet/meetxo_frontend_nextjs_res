'use client'
import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
    name: z.string().min(6, { message: "Your name must be at least 6 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string()
        .min(10, { message: "Phone number must be at least 10 digits." })
        .max(15, { message: "Phone number can't exceed 15 digits." })
        .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
    professionCategory: z.string().min(1, { message: "Select a category." }),
    profession: z.string().min(1, { message: "Select a profession." }),
    about: z.string().optional(),
    socialLinks: z
        .array(
            z.object({
                icon: z.string().min(1, { message: "Select a platform." }),
                url: z.string().url({ message: "Enter a valid URL." }),
            })
        )
        .optional(),
    profileImage: z.any().optional(),
});

export default function ProfileInformationForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            professionCategory: "",
            profession: "",
            about: "",
            socialLinks: [],
            profileImage: null,
        },
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected File:", file);
        }
    };

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log("Form Data:", data);
    };

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "socialLinks",
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <p className="text-xl font-bold pb-4 border-b border-[#F1F2F4]">
                    Personal Information
                </p>
                <div className="py-8 px-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Avatar className="h-[88px] w-[88px]">
                            <AvatarImage src="/images/avatar.svg" />
                        </Avatar>
                        <div className="flex flex-col gap-1 justify-between">
                            {/* Hidden File Input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                hidden
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleFileChange}
                            />
                            <p className="text-[#718096] text-sm">
                                We only support .JPG, .JPEG, or .PNG files.
                            </p>
                            <div className="flex gap-2">
                                {/* Upload Button Triggers File Input */}
                                <Button
                                    className="text-white font-bold"
                                    onClick={() => fileInputRef.current?.click()}
                                    type="button"
                                >
                                    Upload your photo
                                </Button>
                                <Button className="font-bold hover:no-underline" variant={"link"} type="button">
                                    Delete Image
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="inline-flex flex-col items-start w-full">
                                    <FormLabel className="text-left text-sm font-plus-jakarta-sans">
                                        Name <span className="text-[#E03137]">*</span>
                                    </FormLabel>
                                    <FormControl>
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
                                <FormItem className="flex flex-col items-start w-full">
                                    <FormLabel className="text-left text-sm font-plus-jakarta-sans">
                                        Email <span className="text-[#E03137]">*</span>
                                    </FormLabel>
                                    <FormControl>
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
                            name="professionCategory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profession Category <span className="text-[#E03137]">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="py-4 px-5 h-11 md:h-14">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tech">Tech</SelectItem>
                                            <SelectItem value="healthcare">Healthcare</SelectItem>
                                            <SelectItem value="education">Education</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profession"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profession <span className="text-[#E03137]">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="py-4 px-5 h-11 md:h-14">
                                            <SelectValue placeholder="Select a profession" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="developer">Developer</SelectItem>
                                            <SelectItem value="doctor">Doctor</SelectItem>
                                            <SelectItem value="teacher">Teacher</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="about"
                            render={({ field }) => (
                                <FormItem className="lg:col-span-2">
                                    <FormLabel>About me</FormLabel>
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
                        {/* Social Links Section */}
                        <div className="mt-6 lg:col-span-2">
                            <p className="text-lg font-semibold">Social Links</p>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex flex-col lg:flex-row items-end gap-4 mt-4">
                                    <FormField
                                        control={form.control}
                                        name={`socialLinks.${index}.icon`}
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Platform</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a platform" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="facebook">Facebook</SelectItem>
                                                        <SelectItem value="twitter">Twitter</SelectItem>
                                                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                                                        <SelectItem value="instagram">Instagram</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`socialLinks.${index}.url`}
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter URL" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button className="text-destructive" type="button" onClick={() => remove(index)} variant="link">
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant={'link'} className="mt-4" onClick={() => append({ icon: "", url: "" })}>
                               + Add More
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" className="mt-6 text-white font-bold">
                            Update Profile
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
