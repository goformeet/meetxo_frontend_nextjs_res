'use client'
import React, { useRef } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const FormSchema = z.object({
    title: z.string().min(6, { message: "Title must be at least 6 characters." }),
    shortDescription: z.string().min(6, { message: "Short description must be at least 6 characters." }),
    longDescription: z.string().min(6, { message: "Long description must be at least 6 characters." }),
    duration: z.coerce.number().positive("Duration must be a positive number"),
    price: z.coerce.number().positive("Price must be a positive number"),
    maxParticipants: z.coerce.number().positive("Must be a positive number"),
    eventType: z.enum(["Online", "Offline"], { message: "Event type is required" }),
    eventLink: z.string().url({ message: "Must be a valid URL" }).optional(),
});

export default function ProfileServiceForm({ service }: { service: string }) {
    console.log("🚀 ~ ProfileServiceForm ~ service:", service)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            shortDescription: "",
            longDescription: "",
            duration: 30,
            price: 0,
            maxParticipants: 1,
            eventType: "Online",
            eventLink: "",
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="py-8 px-4">
                    <div className="flex gap-6">
                        <Avatar className="h-[88px] w-[88px]">
                            <AvatarImage src="" />
                            <AvatarFallback>
                                <Image src={'/images/camera.svg'} alt="Camera Icon" width={31} height={31} />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-between">
                            <Input className="py-4 px-5 h-11 md:h-14 hidden"
                                type="file"
                                ref={fileInputRef}
                                hidden
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleFileChange}
                            />
                            <p className="text-[#718096] text-sm">We only support .JPG, .JPEG, or .PNG files.</p>
                            <div className="flex gap-2">
                                <Button className="text-white font-bold" onClick={() => fileInputRef.current?.click()} type="button">
                                    Upload your photo
                                </Button>
                                <Button className="font-bold hover:no-underline" variant={"link"} type="button">
                                    Delete Image
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        {/* Title */}
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Title <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" placeholder="1:1 Mentorship with John Doe" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Short Description */}
                        <FormField control={form.control} name="shortDescription" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Short Description <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" placeholder="Enter a short description" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Long Description */}
                        <FormField control={form.control} name="longDescription" render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Long Description</FormLabel>
                                <FormControl><Textarea placeholder="Long Description" className="resize-none" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Duration */}
                        <FormField control={form.control} name="duration" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Duration (Minutes) <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" type="number" placeholder="30" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Price */}
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Price ($) <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" type="number" placeholder="100" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Maximum Participants */}
                        <FormField control={form.control} name="maxParticipants" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Maximum Participants <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" type="number" placeholder="10" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Event Type (Online/Offline) */}
                        <FormField control={form.control} name="eventType" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Type <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="py-4 px-5 h-11 md:h-14">
                                            <SelectValue placeholder="Select event type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Online">Online</SelectItem>
                                            <SelectItem value="Offline">Offline</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Event Link */}
                        <FormField control={form.control} name="eventLink" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Link</FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" placeholder="Enter event link (if online)" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    {/* Submit Button */}
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
