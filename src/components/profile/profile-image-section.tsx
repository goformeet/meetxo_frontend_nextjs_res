'use client';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { getSession } from "next-auth/react";
import { getPresignedUrl, setUpProfile, uploadFileToAWS } from "@/services/api";
import { SocialMediaLink } from "@/components/profile/profile-information-form";
import Cropper, {Area} from 'react-easy-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";



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

// Function to create a cropped image
const createCroppedImage = async (imageSrc: string, pixelCrop: { x: number, y: number, width: number, height: number }) => {
    const image = new Image();
    image.src = imageSrc;

    return new Promise<Blob>((resolve) => {
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                throw new Error('No 2d context');
            }

            // Set canvas dimensions to the cropped size
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            // Draw the cropped image
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            // Convert canvas to blob
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                }
            }, 'image/jpeg', 0.95);
        };
    });
};

export default function ProfileImageSection({ user, setUpdateSuccess, setUser }: {
    user: UserType,
    setUpdateSuccess: Dispatch<SetStateAction<boolean>>,
    setUser: Dispatch<SetStateAction<UserType | null>>
}) {
    const [imageSubmitting, setImageSubmitting] = useState(false);
    const [showCropper, setShowCropper] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number, y: number, width: number, height: number } | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        // Create a URL for the image
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setShowCropper(true);
        };
        reader.readAsDataURL(file);
    };

    const onCropComplete = (_: Area, croppedAreaPixels: { x: number, y: number, width: number, height: number }) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setImageSrc(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCropConfirm = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        setImageSubmitting(true);
        setShowCropper(false);

        try {
            // Create cropped image blob
            const croppedImageBlob = await createCroppedImage(imageSrc, croppedAreaPixels);

            // Convert to file
            const fileName = 'profile-image.jpg';
            const croppedImageFile = new File([croppedImageBlob], fileName, { type: 'image/jpeg' });

            const session = await getSession();
            if (!session?.accessToken) throw new Error("User not authenticated");

            const token = session.accessToken;

            // Step 1: Get presigned URL from API
            const { uploadUrl, publicUrl } = await getPresignedUrl();

            // Step 2: Upload file to AWS
            await uploadFileToAWS(uploadUrl, croppedImageFile);

            const formData = {
                profile_image: publicUrl
            };

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
            setImageSrc(null);
        }
    };

    const handleDeleteImage = async () => {
        if (!user?.profile_image) return;

        try {
            setImageSubmitting(true);

            const session = await getSession();
            if (!session?.accessToken) throw new Error("User not authenticated");

            const token = session.accessToken;

            const formData = {
                profile_image: null
            };

            const response = await setUpProfile(formData, token);

            if (response.success && response.profile) {
                setUser(response.profile);
                setUpdateSuccess(true);
                setTimeout(() => setUpdateSuccess(false), 3000);
            }
        } catch (error) {
            console.error("Delete failed:", error);
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
                onChange={handleFileSelect}
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
                    disabled={!user?.profile_image || imageSubmitting}
                    onClick={handleDeleteImage}
                >
                    Delete Image
                </Button>
            </div>

            {/* Image Cropper Dialog */}
            <Dialog open={showCropper} onOpenChange={setShowCropper}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Crop Profile Picture</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 relative h-64 overflow-hidden rounded-md">
                        {imageSrc && (
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        )}
                    </div>
                    <div className="mt-4 flex justify-between">
                        <Button
                            variant="outline"
                            onClick={handleCropCancel}
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCropConfirm}
                            type="button"
                        >
                            Apply
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}