"use client";
import { Button } from "@/components/ui/button";
import { Session } from "@/types/sessionTypes";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginButton() {
  const [user, setUser] = useState<Session | null>(null);
   const [loading, setLoading] = useState(true);
   const pathname = usePathname();
  const getUser = async () => {
    const session = await getSession();
    // console.log("🚀 ~ getUser ~ session:", session)
    setUser(session as Session);
    setLoading(false);
  };
    const handleLogout = async () => {
      await signOut(); 
    };
  useEffect(() => {
    getUser();
  }, [pathname]);

  if (user) {
    return (
      <Button
      disabled={loading}
        onClick={() => handleLogout()}
        className=" py-2 px-4 h-[42px] text-white font-semibold"
      >
        Logout
      </Button>
    );
  } else {
    return (
      <Link href={"/login"}>
        <Button
          disabled={loading}
          className=" py-2 px-4 h-[42px] text-white font-semibold"
        >
          Login
        </Button>
      </Link>
    );
  }
}
