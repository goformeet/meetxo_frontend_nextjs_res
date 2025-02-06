import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface User {
    name: string;
    avatar?: string;
}

interface AvatarGroupProps {
    users: User[];
    max?: number;
}

export function AvatarGroup({ users, max = 5 }: AvatarGroupProps) {

    const displayUsers = users.slice(0, max);
    const extraCount = users.length - max;

    return (
        <div className="flex items-center mt-3 mb-4">
            {displayUsers.map((user, index) => (
                <Avatar
                    key={index}
                    className="w-7 h-7 border-2 border-background -ml-2 first:ml-0"
                >
                    {user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    )}
                </Avatar>
            ))}
            {extraCount > 0 && (
                <div className="flex items-center justify-center text-primary dark:text-white  text-xs/[160%] font-medium ml-3">
                    +{extraCount} Going
                </div>
            )}
        </div>
    );
}
