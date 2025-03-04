'use client'
import React, {Dispatch, SetStateAction, useState} from "react";
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
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {CalendarIcon, Loader2} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createService } from "@/services/api";
import { getSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import {Alert, AlertDescription} from "@/components/ui/alert";

// Currency options
const currencies = [
    { code: "USD", symbol: "$", label: "USD ($)" },
    { code: "EUR", symbol: "€", label: "EUR (€)" },
    { code: "GBP", symbol: "£", label: "GBP (£)" },
    { code: "JPY", symbol: "¥", label: "JPY (¥)" },
    { code: "CAD", symbol: "C$", label: "CAD (C$)" },
    { code: "AUD", symbol: "A$", label: "AUD (A$)" },
];

const FormSchema = z.object({
    name: z.string().min(6, { message: "Name must be at least 6 characters." }),
    short_description: z.string().min(6, { message: "Short description must be at least 6 characters." }),
    long_description: z.string().min(6, { message: "Long description must be at least 6 characters." }),
    duration: z.coerce.number().positive("Duration must be a positive number"),
    online_pricing: z.coerce.number().positive("Price must be a positive number"),
    offline_pricing: z.coerce.number().positive("Price must be a positive number"),
    currency: z.object({
        code: z.string().min(1, { message: "Currency code is required" }),
        symbol: z.string().min(1, { message: "Currency symbol is required" })
    }),
    is_online_available: z.boolean().default(false),
    is_offline_available: z.boolean().default(false),
    keywords: z.string().transform(val => val.split(',').map(item => item.trim()).filter(item => item !== '')),
    online_link: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
    location_link: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
    // meetingDate: z.date({ required_error: "Meeting date is required" }),
    // meetingTime: z.string({ required_error: "Meeting time is required" }),
    // maxParticipants: z.coerce.number().positive("Must be a positive number"),
});

export default function ProfileServiceForm({ setShowFormAction }: { setShowFormAction: Dispatch<SetStateAction<boolean>>;}) {
    const [eventType, setEventType] = useState("Online");
    const [submitting, setSubmitting] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            short_description: "",
            long_description: "",
            duration: 30,
            online_pricing: 100,
            offline_pricing: 150,
            currency: {
                code: 'USD',
                symbol: '$'
            },
            is_online_available: true,
            is_offline_available: false,
            keywords: [],
            online_link: "",
            location_link: "",
            // meetingDate: new Date(),
            // meetingTime: "10:00",
            // maxParticipants: 1,
        },
    });

    const handleCurrencyChange = (value: string) => {
        const selectedCurrency = currencies.find(c => c.code === value);
        if (selectedCurrency) {
            form.setValue("currency", {
                code: selectedCurrency.code,
                symbol: selectedCurrency.symbol
            });
        }
    };

    // Update is_online_available and is_offline_available based on event type selection
    const handleEventTypeChange = (value: string) => {
        setEventType(value);
        if (value === "Online") {
            form.setValue("is_online_available", true);
            form.setValue("is_offline_available", false);
        } else if (value === "Offline") {
            form.setValue("is_online_available", false);
            form.setValue("is_offline_available", true);
        } else if (value === "Both") {
            form.setValue("is_online_available", true);
            form.setValue("is_offline_available", true);
        }
    };

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            setSubmitting(true);

            // Convert date and time to UTC format
            // const dateTimeString = `${format(data.meetingDate, "yyyy-MM-dd")}T${data.meetingTime}:00`;
            // const meetingDateTime = new Date(dateTimeString).toISOString();

            // Prepare service data
            const serviceData = {
                ...data,
                // meetingDateTime,
            };

            const session = await getSession();

            // Submit to API
            if (session?.accessToken) {
                const result = await createService(serviceData, session.accessToken);
                if(result.success) {
                    setUpdateSuccess(true);
                    setTimeout(() => {setUpdateSuccess(false)}, 3000);
                    setShowFormAction(false);
                }
            }
            // You can add success notification or redirect here
        } catch (error) {
            console.error("Error submitting form:", error);
            // You can add error notification here
        }finally {
            setSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="py-8 px-4">
                    {updateSuccess && (
                        <Alert className="mt-4 bg-green-50 text-green-700 border-green-200">
                            <AlertDescription>Service created successfully!</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        {/* Title */}
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Title <span className="text-red-600">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" placeholder="1:1 Mentorship with John Doe" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Short Description */}
                        <FormField control={form.control} name="short_description" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Short Description <span className="text-red-600">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" placeholder="Enter a short description" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Long Description */}
                        <FormField control={form.control} name="long_description" render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Long Description <span className="text-red-600">*</span></FormLabel>
                                <FormControl><Textarea placeholder="Long Description" className="resize-none" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Keywords */}
                        <FormField control={form.control} name="keywords" render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Keywords <span className="text-red-600">*</span></FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-4 px-5 h-11 md:h-14"
                                        placeholder="mentorship, career coaching, leadership (comma separated)"
                                        {...field}
                                    />
                                </FormControl>
                                <p className="text-sm text-gray-500 mt-1">Add keywords separated by commas</p>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Event Type (Online/Offline/Both) */}
                        <FormItem className="w-full">
                            <FormLabel>Event Type <span className="text-red-600">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={handleEventTypeChange} value={eventType}>
                                    <SelectTrigger className="py-4 px-5 h-11 md:h-14">
                                        <SelectValue placeholder="Select event type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Online">Online</SelectItem>
                                        <SelectItem value="Offline">Offline</SelectItem>
                                        <SelectItem value="Both">Both</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>

                        {/* Online Availability (Hidden) */}
                        <FormField control={form.control} name="is_online_available" render={({ field }) => (
                            <FormItem className="hidden">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )} />

                        {/* Offline Availability (Hidden) */}
                        <FormField control={form.control} name="is_offline_available" render={({ field }) => (
                            <FormItem className="hidden">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )} />

                        {/* Event Link - Only shown if Online is selected */}
                        {/* {(eventType === "Online" || eventType === "Both") && (
                            <FormField control={form.control} name="online_link" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel> Meeting Link  <span className="text-red-600">*</span></FormLabel>
                                    <FormControl><Input className="py-4 px-5 h-11 md:h-14" placeholder="Enter link" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        )} */}

                        {(eventType === "Offline" || eventType === "Both") && (
                            <FormField control={form.control} name="location_link" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel> Location  <span className="text-red-600">*</span></FormLabel>
                                    <FormControl><Input className="py-4 px-5 h-11 md:h-14" placeholder="Location" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        )}

                        {/* Currency */}
                        <FormField control={form.control} name="currency.code" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Currency <span className="text-red-600">*</span></FormLabel>
                                <FormControl>
                                    <Select onValueChange={handleCurrencyChange} value={field.value}>
                                        <SelectTrigger className="py-4 px-5 h-11 md:h-14">
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {currencies.map(currency => (
                                                <SelectItem key={currency.code} value={currency.code}>
                                                    {currency.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Hidden field for currency symbol */}
                        <FormField control={form.control} name="currency.symbol" render={({ field }) => (
                            <FormItem className="hidden">
                                <FormControl><Input {...field} /></FormControl>
                            </FormItem>
                        )} />

                        {/* Online Price - Only shown if Online is selected */}
                        {(eventType === "Online" || eventType === "Both") && (
                            <FormField control={form.control} name="online_pricing" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Online Price <span className="text-red-600">*</span></FormLabel>
                                    <FormControl><Input className="py-4 px-5 h-11 md:h-14" type="number" placeholder="100" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        )}

                        {/* Offline Price - Only shown if Offline is selected */}
                        {(eventType === "Offline" || eventType === "Both") && (
                            <FormField control={form.control} name="offline_pricing" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Offline Price <span className="text-red-600">*</span></FormLabel>
                                    <FormControl><Input className="py-4 px-5 h-11 md:h-14" type="number" placeholder="150" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        )}

                        {/* Meeting Date */}
                        {/* <FormField control={form.control} name="meetingDate" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Meeting Date <span className="text-red-600">*</span></FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "py-4 px-5 h-11 md:h-14 w-full justify-start text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )} /> */}

                        {/* Meeting Time */}
                        {/* <FormField control={form.control} name="meetingTime" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Meeting Time <span className="text-red-600">*</span></FormLabel>
                                <FormControl>
                                    <Input
                                        type="time"
                                        className="py-4 px-5 h-11 md:h-14"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} /> */}

                        {/* Duration */}
                        <FormField control={form.control} name="duration" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Duration (Minutes) <span className="text-red-600">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" type="number" placeholder="30" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Maximum Participants */}
                        {/*<FormField control={form.control} name="maxParticipants" render={({ field }) => (*/}
                        {/*    <FormItem className="w-full">*/}
                        {/*        <FormLabel>Maximum Participants <span className="text-red-600">*</span></FormLabel>*/}
                        {/*        <FormControl><Input className="py-4 px-5 h-11 md:h-14" type="number" placeholder="10" {...field} /></FormControl>*/}
                        {/*        <FormMessage />*/}
                        {/*    </FormItem>*/}
                        {/*)} />*/}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button disabled={submitting} type="submit" className="mt-6 text-white font-bold">

                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : "Create Service"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}