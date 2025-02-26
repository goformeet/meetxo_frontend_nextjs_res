export type UserType = {
    name: string;
    email: string;
    profession_id: {
        _id: string;
        title: string;
        description: string;
        image: string;
        is_active: boolean;
        created_at: string;
        updated_at: string;
        __v: number;
        index?: number;
    };
    profession_sub_category_id: {
        _id: string;
        profession_id: string;
        title: string;
        description: string;
        image: string;
        is_active: boolean;
        created_at: string;
        updated_at: string;
        __v: number;
    };
    about_me: string;
    socialLinks: Array<{
        icon: string;
        url: string;
    }>;
}