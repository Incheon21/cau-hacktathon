"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-[#d6ff01] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-black text-xl font-bold">
                                P
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-[#d6ff01]">
                            PARKNOW
                        </h1>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors ${
                                isActive("/")
                                    ? "text-[#d6ff01]"
                                    : "text-gray-400 hover:text-[#d6ff01]"
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/client"
                            className={`text-sm font-medium transition-colors ${
                                isActive("/client")
                                    ? "text-[#d6ff01]"
                                    : "text-gray-400 hover:text-[#d6ff01]"
                            }`}
                        >
                            Find Parking
                        </Link>
                        <Link
                            href="/about"
                            className={`text-sm font-medium transition-colors ${
                                isActive("/about")
                                    ? "text-[#d6ff01]"
                                    : "text-gray-400 hover:text-[#d6ff01]"
                            }`}
                        >
                            About
                        </Link>
                        <Link
                            href="/dashboard"
                            className="bg-[#d6ff01] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#c2e601] transition-colors shadow-sm"
                        >
                            Dashboard
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-400 hover:text-[#d6ff01]">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
