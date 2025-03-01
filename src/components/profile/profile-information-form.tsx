'use client'
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {Professions, ProfessionSubCategories, setUpProfile, User} from "@/services/api";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ProfileImageSection from "@/components/profile/profile-image-section";
import {getFallbackLetters} from "@/lib/utils";

// Form schema
const FormSchema = z.object({
    name: z.string().min(6, { message: "Your name must be at least 6 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    professionCategory: z.string().min(1, { message: "Select a category." }),
    profession: z.string().min(1, { message: "Select a profession." }),
    about: z.string().optional(),
    socialLinks: z
        .array(
            z.object({
                icon: z.string().min(1, { message: "Select a platform." }),
                url: z.string({ message: "Enter a valid URL." }),
            })
        )
        .optional(),
});

// Types
export interface Profession {
    _id: string;
    title: string;
}

export interface SubCategory {
    _id: string;
    title: string;
    profession_id?: string;
}

export interface SocialMediaLink {
    platform: string;
    url: string;
    _id: string;
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
    about_me?: string;
    profile_image?: string;
    social_media_links?: SocialMediaLink[];
}

export default function ProfileInformationComponent() {
    const router = useRouter();
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [formInitialized, setFormInitialized] = useState(false);
    const [loadingSubcategories, setLoadingSubcategories] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // Initialize form with empty values
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            professionCategory: "",
            profession: "",
            about: "",
            socialLinks: [],
        },
    });

    // Handle file change

    // Form submission
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setSubmitting(true);

        try {
            // Add your API call here to update the user profile
            const formData = {
                name: data.name,
                profession_id: data.professionCategory,
                profession_sub_category_id: data.profession,
                about_me: data.about || '',
                social_media_links: data.socialLinks?.map(link => ({
                    platform: link.icon,
                    url: link.url
                })),
            };

            const session = await getSession();
            if (session?.accessToken) {
                const token = session.accessToken || '';
                const response = await setUpProfile(formData, token);

                if (response.success && response.profile) {
                    setUser(response.profile);
                    setUpdateSuccess(true);
                    setTimeout(() => setUpdateSuccess(false), 3000);
                } else {
                    setError("Failed to update profile data");
                }
            } else {
                router.push('/login');
            }
        } catch (err) {
            console.error(err);
            setError("Failed to update profile. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Field array for social links
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "socialLinks",
    });

    // Fetch user data
    const handleGetUser = async () => {
        setLoading(true);
        setError(null);

        try {
            const session = await getSession();
            if (session?.accessToken) {
                const token = session.accessToken || '';
                const response = await User(token);

                if (response.success && response.profile) {
                    setUser(response.profile);
                } else {
                    setError("Failed to load profile data");
                }
            } else {
                router.push('/login');
            }
        } catch (err) {
            console.error("Error fetching user:", err);
            setError("An error occurred while loading your profile");
        } finally {
            setLoading(false);
        }
    };

    // Fetch professions
    const fetchProfessions = async () => {
        try {
            const response = await Professions();
            if (response.success) {
                setProfessions(response.professions);
                return response.professions;
            } else {
                console.error("Failed to load professions");
                return [];
            }
        } catch (err) {
            console.error("Error fetching professions:", err);
            return [];
        }
    };

    // Fetch subcategories
    const fetchSubCategories = async (categoryId: string) => {
        if (!categoryId) return [];

        setLoadingSubcategories(true);
        try {
            const response = await ProfessionSubCategories(categoryId);

            if (response.success) {
                setSubCategories(response.sub_categories);
                return response.sub_categories;
            } else {
                setSubCategories([]);
                return [];
            }
        } catch {
            setSubCategories([]);
            return [];

        } finally {
            setLoadingSubcategories(false);
        }
    };

    // Initial data loading
    useEffect(() => {
        const initialize = async () => {
            await handleGetUser();
            await fetchProfessions();
        };

        initialize();
    }, []);

    // Set form values when user data is loaded
    useEffect(() => {
        const initializeForm = async () => {
            if (!user) return;

            // Only initialize once
            if (formInitialized) return;

            // Get professions if not already loaded
            let currentProfessions = professions;
            if (professions.length === 0) {
                currentProfessions = await fetchProfessions();
            }

            if (currentProfessions.length === 0) return;

            // Set basic fields
            form.setValue("name", user.name || '');
            form.setValue("email", user.email || '');
            form.setValue("about", user.about_me || '');

            // Handle profession category
            let categoryId = "";
            if (user.profession_id?._id) {
                categoryId = user.profession_id._id;
            } else if (user.profession_sub_category_id?.profession_id) {
                categoryId = user.profession_sub_category_id.profession_id;
            }

            if (categoryId) {
                // Verify category exists in professions
                const categoryExists = currentProfessions.some(p => p._id === categoryId);
                if (categoryExists) {
                    // Use form.reset for the category to ensure it's properly selected in UI
                    form.setValue("professionCategory", categoryId, { shouldValidate: true });

                    // Load subcategories for this category
                    const subCats = await fetchSubCategories(categoryId);

                    // Set subcategory if available
                    if (user.profession_sub_category_id?._id && subCats.length > 0) {
                        setLoadingSubcategories(true);
                        const subcategoryExists = subCats.some(
                            (sc: {_id: string;}) => sc._id === user.profession_sub_category_id?._id
                        );

                        if (subcategoryExists) {
                            form.setValue("profession", user.profession_sub_category_id._id,
                                { shouldValidate: !loadingSubcategories });
                        }
                        setLoadingSubcategories(false);
                    }
                }
            }

            // Set social links
            if (user.social_media_links && user.social_media_links.length > 0) {
                const formattedLinks = user.social_media_links.map(link => ({
                    icon: link.platform.toLowerCase(),
                    url: link.url
                }));
                form.setValue("socialLinks", formattedLinks);
            }

            setFormInitialized(true);
        };

        initializeForm();
    }, [user, professions, form, formInitialized]);

    // Handle profession category change
    const handleCategoryChange = async (value: string) => {
        form.setValue("professionCategory", value, { shouldValidate: true });
        form.setValue("profession", "");
        await fetchSubCategories(value);
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-4 text-lg">Loading your profile...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="p-8">
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button
                    onClick={handleGetUser}
                    className="mt-4"
                >
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <p className="text-xl font-bold pb-4 border-b border-[#F1F2F4]">
                    Personal Information
                </p>

                {updateSuccess && (
                    <Alert className="mt-4 bg-green-50 text-green-700 border-green-200">
                        <AlertDescription>Profile updated successfully!</AlertDescription>
                    </Alert>
                )}

                <div className="py-8 px-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Avatar className="h-[88px] w-[88px]">
                            <AvatarImage src={user?.profile_image || "/images/avatar.svg"} alt="Profile" />
                            <AvatarFallback className="text-white bg-primary">
                                {getFallbackLetters(user?.name || '')}
                            </AvatarFallback>
                        </Avatar>
                        {user && <ProfileImageSection  user={user} setUpdateSuccess={setUpdateSuccess} setUser={setUser} />}
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
                                            readOnly
                                            className="py-4 px-5 h-11 md:h-14 bg-gray-50"
                                            placeholder="Enter your mail"
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
                                    <Select
                                        onValueChange={handleCategoryChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="py-4 px-5 h-11 md:h-14">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {professions.map((profession) => (
                                                <SelectItem key={profession._id} value={profession._id}>
                                                    {profession.title}
                                                </SelectItem>
                                            ))}
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
                                    <Select
                                        onValueChange={(value) => form.setValue("profession", value, { shouldValidate: !loadingSubcategories })}
                                        value={field.value}
                                        disabled={!form.getValues("professionCategory") || loadingSubcategories}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="py-4 px-5 h-11 md:h-14">
                                            {loadingSubcategories ? (
                                                <div className="flex items-center">
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    <span>Loading...</span>
                                                </div>
                                            ) : (
                                                <SelectValue placeholder="Select a profession" />
                                            )}
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subCategories.map((category) => (
                                                <SelectItem key={category._id} value={category._id}>
                                                    {category.title}
                                                </SelectItem>
                                            ))}
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
                                            className="resize-none min-h-[100px]"
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
                                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                    <SelectTrigger className="h-11 md:h-14">
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
                                                    <Input
                                                        placeholder="Enter URL"
                                                        className="h-11 md:h-14"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        className="text-destructive"
                                        type="button"
                                        onClick={() => remove(index)}
                                        variant="link"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="link"
                                className="mt-4"
                                onClick={() => append({ icon: "", url: "" })}
                            >
                                + Add More
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="mt-6 text-white font-bold"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : "Update Profile"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}