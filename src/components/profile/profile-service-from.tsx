'use client'
import React, {Dispatch, SetStateAction, useState, useEffect} from "react";
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
import { createService, updateService } from "@/services/api";
import { getSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import {Alert, AlertDescription} from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// Define Service interface
interface Service {
    _id: string;
    user_id: string;
    name: string;
    short_description: string;
    long_description: string;
    duration: number;
    online_pricing: number;
    offline_pricing: number;
    is_offline_available: boolean;
    is_online_available?: boolean;
    keywords: string[];
    location?: [number, number];
    location_link?: string;
    is_active: boolean;
    currency: { code: string; symbol: string };
    created_at: string;
    updated_at: string;
    __v: number;
}

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
    location_link: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
});

interface ProfileServiceFormProps {
    setShowFormAction: Dispatch<SetStateAction<boolean>>;
    editMode?: boolean;
    serviceToEdit?: Service;
}

export default function ProfileServiceForm({
                                               setShowFormAction,
                                               editMode = false,
                                               serviceToEdit
                                           }: ProfileServiceFormProps) {
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
            location_link: "",
        },
    });

    // Initialize form with service data for edit mode
    useEffect(() => {
        if (editMode && serviceToEdit) {
            // Determine event type based on available flags
            let type = "Online";
            if (serviceToEdit.is_online_available && serviceToEdit.is_offline_available) {
                type = "Both";
            } else if (serviceToEdit.is_offline_available) {
                type = "Offline";
            }
            setEventType(type);

            // Populate form fields
            form.reset({
                name: serviceToEdit.name,
                short_description: serviceToEdit.short_description,
                long_description: serviceToEdit.long_description,
                duration: serviceToEdit.duration,
                online_pricing: serviceToEdit.online_pricing,
                offline_pricing: serviceToEdit.offline_pricing,
                currency: serviceToEdit.currency,
                is_online_available: serviceToEdit.is_online_available ?? true,
                is_offline_available: serviceToEdit.is_offline_available,
                keywords: serviceToEdit?.keywords && Array.isArray(serviceToEdit.keywords) ? serviceToEdit.keywords : [''],
                location_link: serviceToEdit.location_link || "",
            });
        }
    }, [editMode, serviceToEdit, form]);

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
            const session = await getSession();

            if (session?.accessToken) {
                let result;

                if (editMode && serviceToEdit) {
                    // Update existing service
                    result = await updateService(serviceToEdit._id, data, session.accessToken);
                } else {
                    // Create new service
                    result = await createService(data, session.accessToken);
                }

                if(result.success) {
                    setUpdateSuccess(true);
                    setTimeout(() => {setUpdateSuccess(false)}, 3000);
                    setTimeout(() => {setShowFormAction(false)}, 3500);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="py-8 px-4">
                    {updateSuccess && (
                        <Alert className="mt-4 bg-green-50 text-green-700 border-green-200">
                            <AlertDescription>
                                {editMode ? "Service updated successfully!" : "Service created successfully!"}
                            </AlertDescription>
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

                        {/* Duration */}
                        <FormField control={form.control} name="duration" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Duration (Minutes) <span className="text-red-600">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" type="number" placeholder="30" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    {/* Submit & Cancel Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            type="button"
                            onClick={() => setShowFormAction(false)}
                            variant="outline"
                            className="font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={submitting}
                            type="submit"
                            className="text-white font-bold"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {editMode ? "Updating..." : "Creating..."}
                                </>
                            ) : (editMode ? "Update Service" : "Create Service")}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}