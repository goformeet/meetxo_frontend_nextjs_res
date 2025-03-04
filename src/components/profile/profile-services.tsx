'use client'
import React, { useEffect, useState, useTransition } from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import EmptyServices from '../empty-services';
import ProfileServiceForm from './profile-service-from';
import { getEventsByHost, getServicesById, User } from "@/services/api";
import { SocialMediaLink } from "@/components/profile/profile-information-form";
import { getSession } from "next-auth/react";
import { Clock3, Loader, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import Dot from "@/components/dot";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import EventCard from "@/components/event-card";
import ProfileEventsForm from "@/components/profile/profile-events-form";

// Move types to separate interfaces for better organization
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
    keywords: string[];
    location: [number, number];
    is_active: boolean;
    currency: { code: string; symbol: string };
    created_at: string;
    updated_at: string;
    __v: number;
}

interface EventType {
    _id: string;
    user_id: string;
    max_participants: number;
    meeting_link: string;
    title: string;
    description: string;
    price: number;
    image: string;
    type: string;
    start_date: string;
    location: string;
    created_at: string;
    updated_at: string;
    __v: number;
    profile_id: {
        name: string;
    }
}

interface UserType {
    _id: string;
    name: string;
    email: string;
    username: string;
    profession_id?: {
        _id: string;
        title: string;
    };
    profession_sub_category_id?: {
        _id: string;
        profession_id: string;
        title: string;
    };
    is_host: boolean;
    about_me?: string;
    profile_image?: string;
    social_media_links?: SocialMediaLink[];
}

// Define category type for type safety
type CategoryType = "1:1 Call" | "Events" | "Digital Product";

export default function ProfileServices() {
    const router = useRouter();

    // Define categories as a constant outside component to prevent re-creation
    const CATEGORIES = [
        { id: 2, name: "1:1 Call" as CategoryType },
        { id: 3, name: "Events" as CategoryType },
        { id: 4, name: "Digital Product" as CategoryType }
    ];

    const [category, setCategory] = useState<CategoryType>(CATEGORIES[0].name);
    const [services, setServices] = useState<Service[]>([]);
    const [events, setEvents] = useState<EventType[]>([]);
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [selectedId, setSelectedId] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Handle booking click with proper type safety
    const handleClick = (id: string) => {
        if (!user?.name) return;

        setSelectedId(id);
        startTransition(() => {
            router.push(`${user.name}/booking?id=${id}`);
        });
    };

    // Fetch user profile data
    const fetchUserProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            const session = await getSession();
            if (!session?.accessToken) {
                router.push('/login');
                return;
            }

            const token = session.accessToken;
            const response = await User(token);

            if (response.success && response.profile) {
                setUser(response.profile);
                return response.profile;
            } else {
                setError("Failed to load profile data");
                return null;
            }
        } catch (err) {
            console.error("Error fetching user:", err);
            setError("An error occurred while loading your profile");
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Fetch services data
    const fetchServices = async (userId: string) => {
        setCategoryLoading(true);
        try {
            const res = await getServicesById(userId);
            if (res.success) {
                setServices(res.services);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setCategoryLoading(false);
        }
    };

    // Fetch events data
    const fetchEvents = async (userId: string) => {
        setCategoryLoading(true);
        try {
            if(user?.is_host) {
                const res = await getEventsByHost(userId);
                if (res.success) {
                    setEvents(res.data);
                }
            }
        }
         finally {
            setCategoryLoading(false);
        }
    };

    // Initialize user data on component mount
    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Fetch data based on selected category when user or category changes
    useEffect(() => {
        if (!user?._id) return;

        // Reset states when category changes
        setShowForm(false);

        // Fetch data based on current category
        if (category === "1:1 Call") {
            fetchServices(user._id);
        } else if (category === "Events") {
            fetchEvents(user._id);
        }
        // For Digital Product, we could add a similar fetch function
    }, [category, user?._id]);

    // Handle Add button click
    const handleAddClick = () => {
        setShowForm(true);
    };

    // Render loading state
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-4 text-lg">Loading your profile...</p>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="p-8">
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button
                    onClick={fetchUserProfile}
                    className="mt-4"
                >
                    Try Again
                </Button>
            </div>
        );
    }

    // Render content based on category
    const renderContent = () => {
        if (categoryLoading) {
            return (
                <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p className="mt-2">Loading {category}...</p>
                </div>
            );
        }

        if (category === "1:1 Call" && services.length > 0) {
            return services.map((data) => (
                <div
                    key={data._id}
                    className="p-4 border border-[#E0E0E0] rounded-[16px] flex justify-between"
                >
                    <div>
                        <p className="text-xl/[130%] font-medium mb-2">
                            {data.name}
                        </p>
                        <div className="flex items-center gap-2">
                            <p className="text-[#7C7C7C] text-base/[150%]">
                                {data.short_description}
                            </p>
                        </div>
                        <div className="my-4 flex gap-2 items-center">
                            <div className="flex gap-1 items-center">
                                <Clock3 className="text-foreground" />
                                <p className="text-[#7C7C7C] text-sm">
                                    {data.duration} Minutes
                                </p>
                            </div>
                            <Dot />
                            <div className="flex gap-1 items-center">
                                <p className="text-[#7C7C7C] text-sm">
                                    {data.is_offline_available
                                        ? "Online & Offline"
                                        : "Online"}
                                </p>
                            </div>
                        </div>
                        <Accordion type="single" collapsible>
                            <AccordionItem
                                className="border-none w-fit items-center"
                                value="details"
                            >
                                <AccordionTrigger
                                    icon="/images/more-details-icon.svg"
                                    className="font-semibold text-2xl/8 tracking-[-1%] text-left w-fit"
                                >
                                    <p className="text-sm/[155%] mr-1 text-primary font-normal">
                                        View Details
                                    </p>
                                </AccordionTrigger>
                                <AccordionContent className="text-[#7E8492] pb-0 mt-4 font-medium text-base/[150%]">
                                    {data.long_description}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        {data.online_pricing ? (
                            <p className="text-[32px]/[120%] font-medium font-roboto">
                                {data?.currency?.symbol || "$"}
                                {data.online_pricing}
                            </p>
                        ) : (
                            <span className="text-[#52c627]">Free</span>
                        )}

                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(data._id);
                            }}
                            disabled={true}
                            className={cn(
                                "font-roboto text-sm/normal font-semibold capitalize py-[9px] px-[16px] leading-normal rounded-[8px] h-fit text-white shadow-none"
                            )}
                        >
                            {isPending && selectedId === data._id ? (
                                <>
                                    <Loader className="h-5 w-5 animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                "Book Session"
                            )}
                        </Button>
                    </div>
                </div>
            ));
        } else if (category === "Events" && events.length > 0) {
            return (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="">
            <p className="text-xl font-bold pb-4 border-b border-[#F1F2F4]">
                Services
            </p>
            <div className="flex gap-3 my-3">
                {CATEGORIES.map((categ) => (
                    <Button
                        variant={"outline"}
                        key={categ.id}
                        onClick={() => setCategory(categ.name)}
                        className={cn(
                            "bg-transparent text-sm md:text-base/6 font-normal capitalize py-2.5 md:py-4 px-4 md:px-6 leading-normal rounded-lg md:rounded-[12px] h-fit shadow-none hover:bg-primary/70 hover:text-background transition-all",
                            {
                                "bg-primary text-white dark:text-background font-bold":
                                    categ.name === category,
                            }
                        )}
                    >
                        {categ.name}
                    </Button>
                ))}
            </div>
            <div className="">
                {renderContent()}
            </div>

            {/* Show EmptyServices only if there's no data and form is not showing */}
            {(category === "1:1 Call" && services.length === 0 ||
                    category === "Events" && events.length === 0 ||
                    category === "Digital Product") && !categoryLoading &&
                !showForm && <EmptyServices />
            }

            {/* Add button - show only if form is not visible */}
            {!showForm && (
                <div className="flex justify-center mt-5">
                    <Button
                        className="text-white py-3 px-10 h-fit"
                        onClick={handleAddClick}
                    >
                        Add {category}
                    </Button>
                </div>
            )}

            {/* Show form only when Add button is clicked */}
            {showForm && category === "1:1 Call" ? <ProfileServiceForm setShowFormAction={setShowForm} /> : showForm && category === "Events" ? <ProfileEventsForm setShowFormAction={setShowForm} /> : ""}
        </div>
    );
}