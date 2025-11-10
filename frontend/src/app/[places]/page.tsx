"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

type Slot = {
    id: string;
    status: "available" | "occupied" | "unknown";
};

type PlaceData = {
    id: string;
    name: string;
    address: string;
    totalSlots: number;
    pricePerHour: number;
    openingHours: string;
};

const placesData: Record<string, PlaceData> = {
    lotteworld: {
        id: "lotteworld",
        name: "LOTTEWORLD MALL",
        address: "240 Olympic-ro, Songpa-gu, Seoul",
        totalSlots: 250,
        pricePerHour: 3000,
        openingHours: "10:00 AM - 10:00 PM",
    },
    jakarta: {
        id: "jakarta",
        name: "JAKARTA MALL",
        address: "Jl. MH Thamrin No.1, Jakarta",
        totalSlots: 180,
        pricePerHour: 2500,
        openingHours: "9:00 AM - 9:00 PM",
    },
    paskal: {
        id: "paskal",
        name: "PASKAL",
        address: "Jl. Pasir Kaliki No.25-27, Bandung",
        totalSlots: 150,
        pricePerHour: 2000,
        openingHours: "10:00 AM - 10:00 PM",
    },
    coex: {
        id: "coex",
        name: "COEX MALL",
        address: "513 Yeongdong-daero, Gangnam-gu, Seoul",
        totalSlots: 300,
        pricePerHour: 3500,
        openingHours: "10:00 AM - 10:00 PM",
    },
};

export default function PlacePage() {
    const params = useParams();
    const router = useRouter();
    const placeId = params.places as string;
    const placeData = placesData[placeId];

    const [slots, setSlots] = useState<Slot[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!placeData) {
            router.push("/client");
            return;
        }

        let ws: WebSocket | null = null;

        const connectWebSocket = () => {
            try {
                // Connect to WebSocket for this specific location
                ws = new WebSocket(`ws://localhost:8000/ws/slots/${placeId}`);

                ws.onopen = () => {
                    console.log(`Connected to WebSocket for ${placeId}`);
                    setIsConnected(true);
                };

                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        if (data.error) {
                            console.error("Location not found:", data.error);
                            return;
                        }
                        setSlots(data);
                    } catch (err) {
                        console.error(
                            "Failed to parse WebSocket message:",
                            err
                        );
                    }
                };

                ws.onerror = (error) => {
                    console.error(`WebSocket error for ${placeId}:`, error);
                    setIsConnected(false);
                };

                ws.onclose = () => {
                    console.log(`WebSocket connection closed for ${placeId}`);
                    setIsConnected(false);
                };
            } catch (err) {
                console.error("Failed to create WebSocket connection:", err);
                setIsConnected(false);
            }
        };

        connectWebSocket();

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [placeData, router, placeId]);

    if (!placeData) {
        return null;
    }

    const available = slots.filter((s) => s.status === "available").length;
    const occupied = slots.filter((s) => s.status === "occupied").length;
    const occupancyRate = ((occupied / slots.length) * 100).toFixed(0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Navbar />

            <div className="container mx-auto px-6 py-8">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/client")}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
                >
                    <svg
                        className="w-5 h-5"
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
                    Back to Search
                </button>

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                {placeData.name}
                            </h1>
                            <p className="text-gray-600 flex items-center gap-2">
                                <svg
                                    className="w-5 h-5"
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
                                {placeData.address}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-3 h-3 rounded-full ${
                                    isConnected ? "bg-green-500" : "bg-red-500"
                                }`}
                            ></div>
                            <span className="text-sm text-gray-600">
                                {isConnected ? "Live" : "Offline"}
                            </span>
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                            <p className="text-green-600 text-sm font-medium mb-1">
                                Available
                            </p>
                            <p className="text-3xl font-bold text-green-700">
                                {available}
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-xl border border-red-200">
                            <p className="text-red-600 text-sm font-medium mb-1">
                                Occupied
                            </p>
                            <p className="text-3xl font-bold text-red-700">
                                {occupied}
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                            <p className="text-blue-600 text-sm font-medium mb-1">
                                Occupancy
                            </p>
                            <p className="text-3xl font-bold text-blue-700">
                                {occupancyRate}%
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                            <p className="text-purple-600 text-sm font-medium mb-1">
                                Price/Hour
                            </p>
                            <p className="text-3xl font-bold text-purple-700">
                                ₩{placeData.pricePerHour.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 flex gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{placeData.openingHours}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <span>Total: {placeData.totalSlots} slots</span>
                        </div>
                    </div>
                </div>

                {/* Parking Layout */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Live Parking Map
                        </h2>
                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-400 rounded border-2 border-green-600"></div>
                                <span className="text-gray-600">Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-400 rounded border-2 border-red-600"></div>
                                <span className="text-gray-600">Occupied</span>
                            </div>
                        </div>
                    </div>

                    {/* Parking Grid */}
                    <div className="bg-gradient-to-br from-gray-100 to-slate-200 rounded-xl p-8 relative overflow-hidden">
                        {/* Entrance/Exit Marker */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                            ⬇️ ENTRANCE
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-10 gap-3 mt-8">
                            {slots.map((slot) => (
                                <div
                                    key={slot.id}
                                    className={`aspect-square rounded-lg border-3 transition-all duration-300 hover:scale-110 cursor-pointer ${
                                        slot.status === "occupied"
                                            ? "bg-red-400 border-red-600 shadow-md"
                                            : "bg-green-400 border-green-600 shadow-md hover:shadow-lg"
                                    }`}
                                    title={`${slot.id}: ${slot.status}`}
                                >
                                    <div className="w-full h-full flex items-center justify-center text-xs font-mono font-bold text-white">
                                        {slot.status === "available" && "✓"}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Exit Marker */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            ⬆️ EXIT
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-3">
                            <div className="text-blue-500 text-xl">💡</div>
                            <div>
                                <p className="text-sm font-semibold text-blue-900 mb-1">
                                    Real-Time Updates
                                </p>
                                <p className="text-sm text-blue-700">
                                    This map updates automatically every 3
                                    seconds. Green spots are available, red
                                    spots are occupied. Click any spot for more
                                    details.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
