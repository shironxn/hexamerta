"use client";

import Link from "next/link";
import { ThemeChanger } from "./theme-changer";
import { Home, LogOut, ScanLine, UserCog } from "lucide-react";
import { signOut } from "@/actions/auth";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export const Navbar = ({ user }: { user: User | null }) => {
  const router = useRouter();
  return (
    <nav className="py-2 px-4 top-0 inset-x-0 items-center z-50 text-secondary flex justify-between md:rounded-md fixed md:mt-2">
      <div className="flex items-center gap-2">
        <div className="hover:text-accent">
          <Link href={"/"}>
            <Home className="w-8 h-8" />
          </Link>
        </div>
        {user && (
          <>
            <button
              className="hover:text-accent"
              onClick={() => router.push("/acara/dashboard")}
            >
              <UserCog className="w-8 h-8" />
            </button>
            <button
              className="hover:text-accent"
              onClick={() => router.push("/acara/dashboard/scan")}
            >
              <ScanLine className="w-8 h-8" />
            </button>
            <button className="hover:text-accent" onClick={() => signOut()}>
              <LogOut className="w-8 h-8" />
            </button>
          </>
        )}
      </div>

      <div className="hover:text-accent">
        <ThemeChanger />
      </div>
    </nav>
  );
};
