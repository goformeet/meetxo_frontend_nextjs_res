// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
          phone?: string;
          user_id: string;
          is_host: boolean;
          is_new_user: boolean;
        } & DefaultSession["user"];
      }

  interface User extends DefaultUser {
    phone?: string;
    user_id: string;
    is_host: boolean;
    is_new_user: boolean;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    phone?: string;
    user_id: string;
    is_host: boolean;
    is_new_user: boolean;
    accessToken: string;
  }
}