"use client";

import Link from "next/link";
import { ThemeChanger } from "./theme-changer";

export const Navbar = () => {
  return (
    <nav className="p-4 fixed w-full top-0 left-0">
      <div className="justify-between flex">
        <div>
          <Link href={"/"} className="btn btn-ghost">
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
        <div>
          <button className="btn btn-ghost">
            <ThemeChanger />
          </button>
        </div>
      </div>
    </nav>
  );
};