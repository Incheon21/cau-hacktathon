"use client";

import { useEffect, useState } from "react";
import ParkingGrid from "@/components/ParkingGrid";

type Slot = {
    id: string;
    status: string;
};

export default function Dashboard() {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [reconnectAttempt, setReconnectAttempt] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ws: WebSocket | null = null;
        let reconnectTimeout: NodeJS.Timeout;

        const connect = () => {
            try {
                // Connect to WebSocket server
                ws = new WebSocket("ws://localhost:8000/ws/slots");

                ws.onopen = () => {
                    console.log("Connected to WebSocket");
                    setIsConnected(true);
                    setReconnectAttempt(0); // Reset reconnection counter on success
                    setError(null); // Clear any previous errors
                };

                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        setSlots(data);
                    } catch (err) {
                        console.error(
                            "Failed to parse WebSocket message:",
                            err
                        );
                    }
                };

                ws.onerror = (error: Event) => {
                    const errorMsg =
                        "Failed to connect to WebSocket server. Check if backend is running on port 8000.";
                    console.error("WebSocket error occurred:", {
                        type: error.type,
                        timestamp: new Date().toISOString(),
                        message: errorMsg,
                    });
                    setIsConnected(false);
                    setError(errorMsg);
                };

                ws.onclose = (event) => {
                    console.log(
                        "WebSocket connection closed",
                        event.code,
                        event.reason
                    );
                    setIsConnected(false);

                    // Attempt to reconnect after 3 seconds, max 5 attempts
                    if (reconnectAttempt < 5) {
                        console.log(
                            `Reconnecting in 3 seconds... (attempt ${
                                reconnectAttempt + 1
                            }/5)`
                        );
                        reconnectTimeout = setTimeout(() => {
                            setReconnectAttempt((prev) => prev + 1);
                            connect();
                        }, 3000);
                    } else {
                        console.error("Max reconnection attempts reached");
                    }
                };
            } catch (err) {
                console.error("Failed to create WebSocket connection:", err);
                setIsConnected(false);
            }
        };

        connect();

        // Cleanup on unmount
        return () => {
            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
            }
            if (ws) {
                ws.close();
            }
        };
    }, [reconnectAttempt]);

    const available = slots.filter((s) => s.status === "available").length;
    const occupied = slots.filter((s) => s.status === "occupied").length;
    const unknown = slots.filter((s) => s.status === "unknown").length;

    return (
        <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
            <div className="max-w-4xl w-full">
                <h1 className="text-4xl font-bold text-center mb-2">
                    ParkNow Dashboard
                </h1>

                <div className="flex items-center justify-center gap-2 mb-6">
                    <div
                        className={`w-3 h-3 rounded-full ${
                            isConnected ? "bg-green-500" : "bg-red-500"
                        }`}
                    ></div>
                    <p className="text-gray-600">
                        {isConnected
                            ? "Live Connection Active"
                            : "Disconnected"}
                    </p>
                </div>

                {error && !isConnected && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        <p className="font-semibold">Connection Error</p>
                        <p className="text-sm">{error}</p>
                        {reconnectAttempt > 0 && reconnectAttempt < 5 && (
                            <p className="text-sm mt-1">
                                Reconnecting... (attempt {reconnectAttempt}/5)
                            </p>
                        )}
                        {reconnectAttempt >= 5 && (
                            <p className="text-sm mt-1">
                                Max reconnection attempts reached. Please
                                refresh the page.
                            </p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-gray-600 mb-2">Available</p>
                        <p className="text-3xl font-bold text-green-600">
                            {available}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-gray-600 mb-2">Occupied</p>
                        <p className="text-3xl font-bold text-red-600">
                            {occupied}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-gray-600 mb-2">Unknown</p>
                        <p className="text-3xl font-bold text-gray-600">
                            {unknown}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">
                        Parking Slots
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Total: {slots.length} slots | {available} available
                    </p>
                    {slots.length > 0 ? (
                        <ParkingGrid slots={slots} />
                    ) : (
                        <p className="text-gray-500 text-center py-8">
                            Waiting for data from server...
                        </p>
                    )}
                </div>

                <div className="mt-6 flex justify-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="text-sm text-gray-600">Occupied</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                        <span className="text-sm text-gray-600">Unknown</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
