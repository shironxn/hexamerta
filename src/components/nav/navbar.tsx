"use client";

import Link from "next/link";
import { ThemeChanger } from "./theme-changer";

export const Navbar = () => {
  return (
    <div>
      <nav className="py-2 px-4 top-0 inset-x-0 bg-secondary items-center z-50 text-base-100 flex justify-between md:rounded-md container fixed md:mt-2 shadow">
        <div className="hover:text-accent">
          <Link href={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </div>
        <div className="hover:text-accent">
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
};
