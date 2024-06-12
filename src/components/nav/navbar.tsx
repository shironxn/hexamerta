"use client";

import Link from "next/link";
import { ThemeChanger } from "./theme-changer";
import { Home, LogOut } from "lucide-react";
import { signOut } from "@/actions/auth";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const Navbar = ({
  userData,
}: {
  userData: Promise<User | null> | null;
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (userData) {
        try {
          const data = await userData;
          setUser(data);
        } catch (err) {
          setUser(null);
        }
      }
    };
    fetchUser();
  }, [userData]);

  return (
    <nav className="py-2 px-4 top-0 inset-x-0 items-center z-50 text-secondary flex justify-between md:rounded-md fixed md:mt-2">
      <div className="hover:text-accent">
        <Link href={"/"}>
          <Home className="w-8 h-8" />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-2">
        {user && (
          <div className="hover:text-accent">
            <button onClick={() => signOut()}>
              <LogOut className="w-8 h-8" />
            </button>
          </div>
        )}
        <div className="hover:text-accent">
          <ThemeChanger />
        </div>
      </div>
    </nav>
  );
};
