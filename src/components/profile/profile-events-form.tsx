import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
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
import {createEvent, getPresignedUrl, updateEvent, uploadFileToAWS} from "@/services/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {CalendarIcon, Loader2} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSession } from "next-auth/react";
import {Alert, AlertDescription} from "@/components/ui/alert";

// Define the EventType interface
interface EventType {
    _id: string;
    user_id: string;
    max_participants: number;
    meeting_link: string;
    title: string;
    description: string;
    price: number;
    image: string;
    type: "online" | "offline";
    start_date: string;
    location: string;
    duration?: number;
    currency?: {
        code: string;
        symbol: string
    };
    is_active?: boolean;
    created_at: string;
    updated_at: string;
    __v: number;
    profile_id: {
        name: string;
    }
}

// Properties for the component
interface ProfileEventsFormProps {
    setShowFormAction: Dispatch<SetStateAction<boolean>>;
    editMode?: boolean;
    eventToEdit?: EventType;
}

const FormSchema = z.object({
    title: z.string().min(6, { message: "Title must be at least 6 characters." }),
    description: z.string().min(6, { message: "Description must be at least 6 characters." }),
    duration: z.coerce.number().positive("Duration must be a positive number"),
    price: z.coerce.number().min(0, "Price must be 0 or a positive number"),
    currency: z.object({
        code: z.string({ required_error: "Currency code is required" }),
        symbol: z.string({ required_error: "Currency symbol is required" })
    }),
    type: z.enum(["online", "offline"], { required_error: "Event type is required" }),
    meeting_link: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
    event_date: z.date({ required_error: "Event date is required" }),
    event_time: z.string({ required_error: "Event time is required" }),
    location: z.string().optional().or(z.literal("")),
    image: z.string({ required_error: "Image is required" }),
    max_participants: z.coerce.number().positive("Must be a positive number"),
    is_active: z.boolean().default(true),
});

// Currency options
const currencies = [
    { code: "USD", symbol: "$", label: "USD ($)" },
    { code: "EUR", symbol: "€", label: "EUR (€)" },
    { code: "GBP", symbol: "£", label: "GBP (£)" },
    { code: "JPY", symbol: "¥", label: "JPY (¥)" },
    { code: "CAD", symbol: "C$", label: "CAD (C$)" },
    { code: "AUD", symbol: "A$", label: "AUD (A$)" },
];

export default function ProfileEventsForm({ setShowFormAction, editMode = false, eventToEdit }: ProfileEventsFormProps) {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            duration: 0,
            price: 0,
            currency: {
                code: "USD",
                symbol: "$"
            },
            type: "online" as "online" | "offline",
            meeting_link: "", // Initialize with empty string
            location: "", // Initialize with empty string
            image: "", // Initialize with empty string
            max_participants: 0,
            is_active: true,
            event_time: "12:00"
            // event_date is handled by the Calendar component
        },
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initialize form with event data if in edit mode
    useEffect(() => {
        if (editMode && eventToEdit) {
            // Extract date and time from start_date
            const startDate = new Date(eventToEdit.start_date);
            const eventDate = startDate;
            const eventTime = format(startDate, "HH:mm");

            // Set the image URL
            setImageUrl(eventToEdit.image || "");

            // Set form values
            form.reset({
                title: eventToEdit.title,
                description: eventToEdit.description,
                duration: eventToEdit.duration || 0,
                price: eventToEdit.price,
                currency: eventToEdit.currency || {
                    code: "USD",
                    symbol: "$"
                },
                type: eventToEdit.type,
                meeting_link: eventToEdit.meeting_link || "",
                event_date: eventDate,
                event_time: eventTime,
                location: eventToEdit.location || "",
                image: eventToEdit.image,
                max_participants: eventToEdit.max_participants,
                is_active: eventToEdit.is_active !== undefined ? eventToEdit.is_active : true
            });
        }
    }, [editMode, eventToEdit, form]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsUploading(true);

            try {
                // Get presigned URL
                const { uploadUrl, publicUrl } = await getPresignedUrl();

                // Upload to AWS
                await uploadFileToAWS(uploadUrl, file);

                // Set the image URL for display and in form data
                setImageUrl(publicUrl);
                form.setValue("image", publicUrl);
                console.log("File uploaded successfully:", publicUrl);
            } catch (error) {
                console.error("Upload failed:", error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleCurrencyChange = (value: string) => {
        const selectedCurrency = currencies.find(c => c.code === value);
        if (selectedCurrency) {
            form.setValue("currency", {
                code: selectedCurrency.code,
                symbol: selectedCurrency.symbol
            });
        }
    };

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            setSubmitting(true);
            const session = await getSession();

            // Combine date and time and convert to UTC
            const localDateTimeString = `${format(data.event_date, "yyyy-MM-dd")}T${data.event_time}:00`;
            const localDateTime = new Date(localDateTimeString);
            const utcDateTime = new Date(localDateTime.toISOString());

            // Prepare event data with UTC start_date
            const eventData = {
                ...data,
                start_date: utcDateTime.toISOString(),
            };

            // Submit to API
            if (session?.accessToken) {
                let result;
                if (editMode && eventToEdit) {
                    // Update existing event
                    result = await updateEvent(eventToEdit._id, eventData, session.accessToken);
                } else {
                    // Create new event
                    result = await createEvent(eventData, session.accessToken);
                }

                if (result.success) {
                    setUpdateSuccess(true);
                    setTimeout(() => {setUpdateSuccess(false)}, 3000);
                    setTimeout(() => {setShowFormAction(false)}, 3500);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            // You can add error notification here
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="py-8 px-4">
                    <div className="flex gap-6">
                        <Avatar className="h-[88px] w-[88px]">
                            {imageUrl ? (
                                <AvatarImage src={imageUrl} alt="Event image" />
                            ) : (
                                <AvatarFallback>
                                    <Image src={'/images/camera.svg'} alt="Camera Icon" width={31} height={31} />
                                </AvatarFallback>
                            )}
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
                                <Button
                                    className="text-white font-bold"
                                    onClick={() => fileInputRef.current?.click()}
                                    type="button"
                                    disabled={isUploading}
                                >
                                    {isUploading ? "Uploading..." : "Upload your photo"}
                                </Button>
                                {imageUrl && (
                                    <Button
                                        className="font-bold hover:no-underline"
                                        variant="link"
                                        type="button"
                                        onClick={() => {
                                            setImageUrl("");
                                            form.setValue("image", "");
                                        }}
                                    >
                                        Delete Image
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {updateSuccess && (
                        <Alert className="mt-4 bg-green-50 text-green-700 border-green-200">
                            <AlertDescription>
                                {editMode ? "Event updated successfully!" : "Event created successfully!"}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        {/* Title */}
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Title <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" placeholder="1:1 Mentorship with John Doe" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Description */}
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Description <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl><Textarea placeholder="Detailed description of your event" className="resize-none" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Event Date */}
                        <FormField control={form.control} name="event_date" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Date <span className="text-[#E03137]">*</span></FormLabel>
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
                        )} />

                        {/* Event Time */}
                        <FormField control={form.control} name="event_time" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Time <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl>
                                    <Input
                                        type="time"
                                        className="py-4 px-5 h-11 md:h-14"
                                        {...field}
                                    />
                                </FormControl>
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
                                <FormLabel>Price <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" type="number" placeholder="100" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

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

                        {/* Event Type (Online/Offline) */}
                        <FormField control={form.control} name="type" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Type <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="py-4 px-5 h-11 md:h-14">
                                            <SelectValue placeholder="Select event type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="online">Online</SelectItem>
                                            <SelectItem value="offline">Offline</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Maximum Participants */}
                        <FormField control={form.control} name="max_participants" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Maximum Participants <span className="text-[#E03137]">*</span></FormLabel>
                                <FormControl><Input className="py-4 px-5 h-11 md:h-14" type="number" placeholder="10" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Meeting Link - Conditionally rendered based on type */}
                        {form.watch("type") === "online" && (
                            <FormField control={form.control} name="meeting_link" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Meeting Link <span className="text-[#E03137]">*</span></FormLabel>
                                    <FormControl><Input className="py-4 px-5 h-11 md:h-14" placeholder="https://zoom.us/j/123456789" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        )}

                        {/* Location - Conditionally rendered based on type */}
                        {form.watch("type") === "offline" && (
                            <FormField control={form.control} name="location" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Location <span className="text-[#E03137]">*</span></FormLabel>
                                    <FormControl><Input className="py-4 px-5 h-11 md:h-14" placeholder="123 Main St, City, Country" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        )}

                        {/* Is Active */}
                        <FormField control={form.control} name="is_active" render={({ field }) => (
                            <FormItem className="w-full flex items-center gap-2">
                                <FormControl>
                                    <Input
                                        type="checkbox"
                                        className="w-4 h-4"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                </FormControl>
                                <FormLabel className="!m-0">Active Event</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="mt-6 font-bold"
                            onClick={() => setShowFormAction(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={submitting}
                            type="submit"
                            className="mt-6 text-white font-bold"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {editMode ? "Updating..." : "Creating..."}
                                </>
                            ) : (editMode ? "Update Event" : "Create Event")}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
