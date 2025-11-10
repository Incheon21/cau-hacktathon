"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

const carouselItems = [
    {
        title: "Find Parking in Seconds",
        description: "Real-time parking availability at your fingertips",
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "AI-Powered Detection",
        description: "Advanced computer vision for accurate spot tracking",
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Save Time & Money",
        description: "No more circling around looking for parking spots",
        color: "from-green-500 to-emerald-500",
    },
    {
        title: "Enterprise Solutions",
        description: "Perfect for malls, offices, and large facilities",
        color: "from-orange-500 to-red-500",
    },
];

const popularPlaces = [
    {
        id: "lotteworld",
        name: "LOTTEWORLD MALL",
        location: "Seoul, South Korea",
        available: 50,
        total: 250,
        image: "🏬",
    },
    {
        id: "coex",
        name: "COEX MALL",
        location: "Gangnam, Seoul",
        available: 150,
        total: 300,
        image: "🏢",
    },
    {
        id: "jakarta",
        name: "JAKARTA MALL",
        location: "Jakarta, Indonesia",
        available: 75,
        total: 180,
        image: "🏪",
    },
    {
        id: "paskal",
        name: "PASKAL",
        location: "Bandung, Indonesia",
        available: 120,
        total: 150,
        image: "🏛️",
    },
];

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const filteredPlaces = popularPlaces.filter(
        (place) =>
            place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Content */}
                    <div className="text-center mb-12">
                        <h1 className="text-7xl font-bold text-black mb-6">
                            PARK<span className="text-[#d6ff01]">NOW</span>
                        </h1>
                        <p className="text-2xl text-gray-300 mb-4">
                            Smart Parking Visibility System
                        </p>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                            Find available parking spots in real-time using
                            AI-powered detection. Stop wasting time circling
                            around. Park smarter, not harder.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="/client"
                                className="bg-[#d6ff01] text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#c2e601] transition-all shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Find Parking Now
                            </Link>
                            <Link
                                href="/about"
                                className="bg-transparent text-[#d6ff01] px-8 py-4 rounded-xl text-lg font-semibold border-2 border-[#d6ff01] hover:bg-[#d6ff01] hover:text-black transition-all shadow-md hover:shadow-lg"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className="relative bg-[#808080] rounded-2xl shadow-2xl overflow-hidden mb-16">
                        <div className="relative h-80">
                            {carouselItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ${
                                        index === currentSlide
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }`}
                                >
                                    <div className="h-full bg-black flex items-center justify-center text-white p-12">
                                        <div className="text-center">
                                            <h2 className="text-4xl font-bold mb-4 text-[#d6ff01]">
                                                {item.title}
                                            </h2>
                                            <p className="text-xl text-gray-300">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Carousel Indicators */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                            {carouselItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        index === currentSlide
                                            ? "bg-[#d6ff01] w-8"
                                            : "bg-gray-500 hover:bg-gray-400"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={() =>
                                setCurrentSlide(
                                    (prev) =>
                                        (prev - 1 + carouselItems.length) %
                                        carouselItems.length
                                )
                            }
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#d6ff01] hover:bg-[#c2e601] text-black p-3 rounded-full transition-all"
                            aria-label="Previous slide"
                        >
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
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() =>
                                setCurrentSlide(
                                    (prev) => (prev + 1) % carouselItems.length
                                )
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#d6ff01] hover:bg-[#c2e601] text-black p-3 rounded-full transition-all"
                            aria-label="Next slide"
                        >
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
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Search and Places Section */}
            <section className="container mx-auto px-6 pb-16 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Popular Locations
                        </h2>
                        <p className="text-lg text-[#808080]">
                            Browse parking facilities near you
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <svg
                                    className="h-6 w-6 text-[#808080]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search for malls, locations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 text-lg border-2 border-[#808080] rounded-2xl focus:border-[#d6ff01] focus:outline-none transition-colors shadow-lg bg-white text-black"
                            />
                        </div>
                    </div>

                    {/* Places Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredPlaces.map((place) => {
                            const availabilityPercent =
                                (place.available / place.total) * 100;
                            const isLow = availabilityPercent < 30;
                            const isMedium =
                                availabilityPercent >= 30 &&
                                availabilityPercent < 60;

                            return (
                                <Link
                                    key={place.id}
                                    href={`/${place.id}`}
                                    className="bg-black border-2 border-[#808080] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:border-[#d6ff01] transition-all hover:scale-105 group"
                                >
                                    <div className="bg-[#808080] p-8 text-center">
                                        <div className="text-6xl mb-2">
                                            {place.image}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#d6ff01] transition-colors">
                                            {place.name}
                                        </h3>
                                        <p className="text-[#808080] text-sm mb-4 flex items-center gap-1">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            {place.location}
                                        </p>

                                        {/* Availability Bar */}
                                        <div className="mb-3">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-[#808080]">
                                                    Availability
                                                </span>
                                                <span
                                                    className={`font-semibold ${
                                                        isLow
                                                            ? "text-red-500"
                                                            : isMedium
                                                            ? "text-orange-500"
                                                            : "text-green-500"
                                                    }`}
                                                >
                                                    {place.available}/
                                                    {place.total}
                                                </span>
                                            </div>
                                            <div className="w-full bg-[#808080] rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all ${
                                                        isLow
                                                            ? "bg-red-500"
                                                            : isMedium
                                                            ? "bg-orange-500"
                                                            : "bg-green-500"
                                                    }`}
                                                    style={{
                                                        width: `${availabilityPercent}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span
                                                className={`text-sm font-semibold ${
                                                    isLow
                                                        ? "text-red-500"
                                                        : isMedium
                                                        ? "text-orange-500"
                                                        : "text-green-500"
                                                }`}
                                            >
                                                {isLow
                                                    ? "Limited spots"
                                                    : isMedium
                                                    ? "Some available"
                                                    : "Good availability"}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {filteredPlaces.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <p className="text-xl text-black">
                                No locations found
                            </p>
                            <p className="text-[#808080] mt-2">
                                Try a different search term
                            </p>
                        </div>
                    )}

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <Link
                            href="/client"
                            className="inline-block bg-[#d6ff01] text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#c2e601] hover:shadow-xl transition-all hover:scale-105"
                        >
                            View All Locations →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-black py-16 border-t-4 border-[#d6ff01]">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-[#d6ff01] mb-4">
                                Why Choose ParkNow?
                            </h2>
                            <p className="text-lg text-gray-400">
                                The smartest way to find parking
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center bg-[#808080] p-6 rounded-2xl">
                                <div className="w-20 h-20 bg-[#d6ff01] rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
                                    ⚡
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Real-Time Updates
                                </h3>
                                <p className="text-gray-300">
                                    Get instant updates on parking availability
                                    with WebSocket technology
                                </p>
                            </div>
                            <div className="text-center bg-[#808080] p-6 rounded-2xl">
                                <div className="w-20 h-20 bg-[#d6ff01] rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
                                    🤖
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    AI-Powered
                                </h3>
                                <p className="text-gray-300">
                                    Advanced computer vision detects vehicles
                                    with high accuracy
                                </p>
                            </div>
                            <div className="text-center bg-[#808080] p-6 rounded-2xl">
                                <div className="w-20 h-20 bg-[#d6ff01] rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
                                    📱
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Easy to Use
                                </h3>
                                <p className="text-gray-300">
                                    Simple, intuitive interface works on any
                                    device
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-12 border-t-2 border-[#808080]">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-[#d6ff01] rounded-lg flex items-center justify-center">
                                <span className="text-black text-xl font-bold">
                                    P
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-[#d6ff01]">
                                PARKNOW
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Smart Parking Visibility System
                        </p>
                        <div className="flex justify-center gap-6 mb-6">
                            <Link
                                href="/"
                                className="text-gray-400 hover:text-[#d6ff01] transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/client"
                                className="text-gray-400 hover:text-[#d6ff01] transition-colors"
                            >
                                Find Parking
                            </Link>
                            <Link
                                href="/about"
                                className="text-gray-400 hover:text-[#d6ff01] transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="/dashboard"
                                className="text-gray-400 hover:text-[#d6ff01] transition-colors"
                            >
                                Dashboard
                            </Link>
                        </div>
                        <p className="text-gray-500 text-sm">
                            © 2025 ParkNow. Built for better parking
                            experience.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
