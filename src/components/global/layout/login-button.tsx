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
    try {
      const session = await getSession();
      setUser(session as Session);
    } catch (error) {
      console.error("Error fetching session:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false, // Prevent automatic redirection
        callbackUrl: '/login'
      });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally show an error message to the user
    }
  };

  useEffect(() => {
    getUser();
  }, [pathname]);

  if (loading) {
    return <Button disabled>Loading...</Button>;
  }

  if (user) {
    return (
        <Button
            onClick={handleLogout}
            className="py-2 px-4 h-[42px] text-white font-semibold"
        >
          Logout
        </Button>
    );
  } else {
    return (
        <Link href="/login">
          <Button
              className="py-2 px-4 h-[42px] text-white font-semibold"
          >
            Login
          </Button>
        </Link>
    );
  }
}