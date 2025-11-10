"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PlacesCard from "@/components/PlacesCard";

type Mall = {
    id: string;
    name: string;
    totalSlots: number;
    available: number;
    occupied: number;
};

type LocationInfo = {
    name: string;
    totalSlots: number;
    available: number;
    occupied: number;
};

export default function ClientPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMall, setSelectedMall] = useState<Mall | null>(null);
    const [malls, setMalls] = useState<Mall[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch locations from backend
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("http://localhost:8000/locations");
                const data: Record<string, LocationInfo> =
                    await response.json();

                // Convert backend data to Mall format
                const mallsData: Mall[] = Object.entries(data)
                    .filter(([id]) => id !== "dashboard") // Exclude dashboard
                    .map(([id, info]) => ({
                        id,
                        name: info.name,
                        totalSlots: info.totalSlots,
                        available: info.available,
                        occupied: info.occupied,
                    }));

                setMalls(mallsData);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch locations:", error);
                setIsLoading(false);
            }
        };

        fetchLocations();

        // Refresh data every 5 seconds
        const interval = setInterval(fetchLocations, 5000);

        return () => clearInterval(interval);
    }, []);

    const filteredMalls = malls.filter((mall) =>
        mall.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-5 gap-6">
                    {/* Left Sidebar - Mall Selection */}
                    <div className="lg:col-span-2">
                        <div className="bg-black border-2 border-[#808080] rounded-2xl shadow-lg p-6 sticky top-8">
                            <h2 className="text-2xl font-bold text-[#d6ff01] mb-6">
                                Find Parking
                            </h2>

                            {/* Search Bar */}
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-[#808080]"
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
                                    placeholder="Search for malls..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-12 pr-4 py-3 border-2 border-[#808080] rounded-xl focus:border-[#d6ff01] focus:outline-none transition-colors bg-white text-black"
                                />
                            </div>

                            {/* Mall List */}
                            <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                {isLoading ? (
                                    <div className="text-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d6ff01] mx-auto mb-4"></div>
                                        <p className="text-[#808080]">
                                            Loading locations...
                                        </p>
                                    </div>
                                ) : filteredMalls.length > 0 ? (
                                    filteredMalls.map((mall) => (
                                        <PlacesCard
                                            key={mall.id}
                                            id={mall.id}
                                            name={mall.name}
                                            available={mall.available}
                                            occupied={mall.occupied}
                                            isSelected={
                                                selectedMall?.id === mall.id
                                            }
                                            onSelect={() =>
                                                setSelectedMall(mall)
                                            }
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-[#808080]">
                                        <p>No malls found</p>
                                        <p className="text-sm mt-2">
                                            Try a different search term
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
