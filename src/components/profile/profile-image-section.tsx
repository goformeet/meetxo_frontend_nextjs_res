'use client';
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import {getSession} from "next-auth/react";
import {getPresignedUrl, setUpProfile, uploadFileToAWS} from "@/services/api";
import {SocialMediaLink} from "@/components/profile/profile-information-form";


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

export default function ProfileImageSection ({ user, setUpdateSuccess, setUser }: { user: UserType, setUpdateSuccess: Dispatch<SetStateAction<boolean>>; setUser: Dispatch<SetStateAction<UserType | null>>;}) {

    const [imageSubmitting, setImageSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            setImageSubmitting(false); // Reset loading state if no file is selected
            return;
        }

        setImageSubmitting(true);

        try {
            const session = await getSession();
            if (!session?.accessToken) throw new Error("User not authenticated");

            const token = session.accessToken;

            // Step 1: Get presigned URL from API
            const { uploadUrl, publicUrl } = await getPresignedUrl(file.name, token);

            // Step 2: Upload file to AWS
            await uploadFileToAWS(uploadUrl, file);

            const  formData = {
                profile_image: publicUrl
            }

            const response = await setUpProfile(formData, token);

            if (response.success && response.profile) {
                setUser(response.profile);
                setUpdateSuccess(true);
                setTimeout(() => setUpdateSuccess(false), 3000);
            }

        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setImageSubmitting(false);
        }
    };


    return (
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
                    disabled={imageSubmitting}
                >
                    {imageSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                        </>
                    ) : "Update your photo"}
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
    )
}