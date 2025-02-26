'use client'
import React, { useEffect, useRef, useState } from "react";
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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {Professions, ProfessionSubCategories, setUpProfile, User} from "@/services/api";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
interface Profession {
    _id: string;
    title: string;
}

interface SubCategory {
    _id: string;
    title: string;
    profession_id?: string;
}

interface SocialMediaLink {
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
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loadingSubcategories, setLoadingSubcategories] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // Initialize form
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

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle file change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected File:", file);
            // Implement file upload logic here
        }
    };

    // Form submission
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log("Form submitted with data:", data);
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
                  }))
            }
                const session = await getSession();
                if (session?.accessToken) {
                    const token = session.accessToken || '';
                    const response = await setUpProfile(formData, token);

                    if (response.success && response.profile) {
                        setUser(response.profile);
                    } else {
                        setError("Failed to load profile data");
                    }
                } else {
                    router.push('/login');
                }


            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1000));

            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 3000);
        } catch (err) {
            console.error(err)
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
    const handleGetProfessions = async () => {
        try {
            const response = await Professions();
            if (response.success) {
                setProfessions(response.professions);
            } else {
                console.error("Failed to load professions");
            }
        } catch (err) {
            console.error("Error fetching professions:", err);
        }
    };

    // Fetch subcategories
    const handleGetSubProfessions = async (categoryId: string) => {
        if (!categoryId) return;

        setLoadingSubcategories(true);
        try {
            console.log("Fetching subcategories for:", categoryId);
            const response = await ProfessionSubCategories(categoryId);

            if (response.success) {
                console.log("Subcategories loaded:", response.sub_categories);
                setSubCategories(response.sub_categories);
            } else {
                console.error("Failed to load subcategories");
                setSubCategories([]);
            }
        } catch (err) {
            console.error("Error fetching subcategories:", err);
            setSubCategories([]);
        } finally {
            setLoadingSubcategories(false);
        }
    };

    // Initial data loading
    useEffect(() => {
        handleGetUser();
        handleGetProfessions();
    }, []);

    // Set form values when user data is loaded¯
    useEffect(() => {
        if (!user || professions.length === 0) return;

        // Set basic fields
        form.setValue("name", user.name || '');
        form.setValue("email", user.email || '');
        form.setValue("about", user.about_me || '');

        // Determine category ID from user data
        let categoryId = "";
        if (user.profession_id?._id) {
            categoryId = user.profession_id._id;
        } else if (user.profession_sub_category_id?.profession_id) {
            categoryId = user.profession_sub_category_id.profession_id;
        }

        if (categoryId) {
            // Verify category exists in professions
            const categoryExists = professions.some(p => p._id === categoryId);
            if (categoryExists) {
                form.setValue("professionCategory", categoryId);
                setSelectedCategory(categoryId);
                // Load subcategories for this category
                handleGetSubProfessions(categoryId);
            } else {
                console.error("User's profession category not found in available professions");
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
    }, [user, professions, form]);

// Set subcategory when subCategories are loaded
    useEffect(() => {
        if (subCategories.length > 0 && user?.profession_sub_category_id?._id) {
            const subcategoryExists = subCategories.some(
                sc => sc._id === user.profession_sub_category_id?._id
            );
            if (subcategoryExists) {
                form.setValue("profession", user.profession_sub_category_id._id);
            } else {
                console.error("User's subcategory not found in loaded subcategories");
                form.setValue("profession", ""); // Reset if not found
            }
        }
    }, [subCategories, user, form]);

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
                                <Button
                                    className="font-bold hover:no-underline"
                                    variant={"link"}
                                    type="button"
                                    disabled={!user?.profile_image}
                                >
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
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setSelectedCategory(value);
                                            // Reset subcategory when category changes
                                            form.setValue("profession", "");
                                            // Load subcategories for the selected category
                                            handleGetSubProfessions(value);
                                        }}
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
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={!selectedCategory || loadingSubcategories}
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
                                                <Select onValueChange={field.onChange} value={field.value}>
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