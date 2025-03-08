'use client'
import React, { useEffect, useState, useTransition } from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import EmptyServices from '../empty-services';
import ProfileServiceForm from './profile-service-from';
import { getMyEvents, getMyServices, User, deleteService, deleteEvent } from "@/services/api";
import { SocialMediaLink } from "@/components/profile/profile-information-form";
import { getSession } from "next-auth/react";
import { Clock3, Loader, Loader2, Pencil, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import Dot from "@/components/dot";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import EventCard from "@/components/event-card";
import ProfileEventsForm from "@/components/profile/profile-events-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { toast } from "sonner"
import Image from "next/image";

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
    const [editMode, setEditMode] = useState(false);
    const [selectedItemToEdit, setSelectedItemToEdit] = useState<Service | EventType | null>(null);

    // Delete confirmation modal state
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{id: string, type: "service" | "event", name: string} | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Handle booking click with proper type safety
    const handleClick = (id: string) => {
        if (!user?.name) return;

        setSelectedId(id);
        startTransition(() => {
            router.push(`${user.name}/booking?id=${id}`);
        });
    };

    // Handle delete button click
    const handleDeleteClick = (item: Service | EventType) => {
        // Determine if it's a service or event by checking properties
        const isService = 'name' in item;

        setItemToDelete({
            id: item._id,
            type: isService ? "service" : "event",
            name: isService ? (item as Service).name : (item as EventType).title
        });

        setDeleteModalOpen(true);
    };

    // Handle confirmation of deletion
    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        setDeleteLoading(true);

        try {
            const session = await getSession();
            if (!session?.accessToken) {
                router.push('/login');
                return;
            }

            const token = session.accessToken;

            if (itemToDelete.type === "service") {
                const response = await deleteService(itemToDelete.id, token);
                if (response.success) {
                    // Remove the deleted service from state
                    setServices(services.filter(service => service._id !== itemToDelete.id));
                    toast.success("Service deleted successfully")
                } else {
                    throw new Error(response.message || "Failed to delete service");
                }
            } else {
                const response = await deleteEvent(itemToDelete.id, token);
                if (response.success) {
                    // Remove the deleted event from state
                    setEvents(events.filter(event => event._id !== itemToDelete.id));
                    toast.success("Event deleted successfully");
                } else {
                    throw new Error(response.message || "Failed to delete event");
                }
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error(error instanceof Error ? error.message : "An error occurred")
        } finally {
            setDeleteLoading(false);
            setDeleteModalOpen(false);
            setItemToDelete(null);
        }
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
    const fetchServices = async () => {
        setCategoryLoading(true);
        try {
            const session = await getSession();
            if (!session?.accessToken) {
                router.push('/login');
                return;
            }
            const token = session.accessToken;
            const res = await getMyServices(token);
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
    const fetchEvents = async () => {
        setCategoryLoading(true);
        try {
            const session = await getSession();
            if (!session?.accessToken) {
                router.push('/login');
                return;
            }
            const token = session.accessToken;
            const res = await getMyEvents(token);
            if (res.success) {
                setEvents(res.data);
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
        setEditMode(false);
        setSelectedItemToEdit(null);

        // Fetch data based on current category
        if (category === "1:1 Call") {
            fetchServices();
        } else if (category === "Events") {
            fetchEvents();
        }
        // For Digital Product, we could add a similar fetch function
    }, [category, user?._id]);

    // Handle Add button click
    const handleAddClick = () => {
        setEditMode(false);
        setSelectedItemToEdit(null);
        setShowForm(true);
    };

    // Handle Edit button click
    const handleEditClick = (item: Service | EventType) => {
        setEditMode(true);
        setSelectedItemToEdit(item);
        setShowForm(true);
    };

    // Handle closing the form
    const handleCloseForm = () => {
        setShowForm(false);
        setEditMode(false);
        setSelectedItemToEdit(null);

        // Refresh data after form is closed
        if (category === "1:1 Call") {
            fetchServices();
        } else if (category === "Events") {
            fetchEvents();
        }
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

        if (category === "1:1 Call" && services.length > 0 && !showForm) {
            return (
                <div className="space-y-6">
                    {
                        services.map((data) => (
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

                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleDeleteClick(data)}
                                            className="bg-red-500 hover:bg-red-600 font-roboto text-sm/normal font-semibold capitalize py-[9px] px-[16px] leading-normal rounded-[8px] h-fit text-white shadow-none"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Delete
                                        </Button>

                                        <Button
                                            onClick={() => handleEditClick(data)}
                                            className="bg-amber-500 hover:bg-amber-600 font-roboto text-sm/normal font-semibold capitalize py-[9px] px-[16px] leading-normal rounded-[8px] h-fit text-white shadow-none"
                                        >
                                            <Pencil className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>

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
                            </div>
                        ))
                    }
                </div>
            )
        } else if (category === "Events" && events.length > 0 && !showForm) {
            return (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
                    {events.map((event) => (
                        <div key={event._id} className="relative">
                            <div className="absolute top-2 right-2 z-10 flex gap-1">
                                <Button
                                    onClick={() => handleDeleteClick(event)}
                                    className="bg-red-500 hover:bg-red-600 rounded-full p-2 h-8 w-8"
                                >
                                    <Trash2 className="h-4 w-4 text-white" />
                                </Button>
                                <Button
                                    onClick={() => handleEditClick(event)}
                                    className="bg-amber-500 hover:bg-amber-600 rounded-full p-2 h-8 w-8"
                                >
                                    <Pencil className="h-4 w-4 text-white" />
                                </Button>
                            </div>
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            );
        } else if (category === "Digital Product") {
            return (
                <div className="flex flex-col items-center">
                    <Image
                        src="/images/assets-cuate.png"
                        alt="Coming Soon"
                        width={329}
                        height={307}
                    />
                    <p className="text-lg font-bold text-center">Coming soon!</p>
                    <p className="text-sm text-center">
                        Get ready for exclusive expert-led digital products
                    </p>
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
                    category === "Events" && events.length === 0 ) && !categoryLoading &&
                !showForm && <EmptyServices />
            }

            {/* Add button - show only if form is not visible */}
            {!showForm && category !== "Digital Product" && (
                <div className="flex justify-center mt-5">
                    <Button
                        className="text-white py-3 px-10 h-fit"
                        onClick={handleAddClick}
                    >
                        Add {category}
                    </Button>
                </div>
            )}


            {/* Show form with edit mode based on selected category */}
            {showForm && category === "1:1 Call" ? (
                <ProfileServiceForm
                    setShowFormAction={handleCloseForm}
                    editMode={editMode}
                    serviceToEdit={editMode ? selectedItemToEdit as Service : undefined}
                />
            ) : showForm && category === "Events" ? (
                <ProfileEventsForm
                    setShowFormAction={handleCloseForm}
                    editMode={editMode}
                    eventToEdit={editMode ? selectedItemToEdit as EventType : undefined}
                />
            ) : ""}

            {/* Delete Confirmation Modal */}
            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">{itemToDelete?.name}</span>?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDeleteModalOpen(false)}
                            disabled={deleteLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleConfirmDelete}
                            disabled={deleteLoading}
                        >
                            {deleteLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}