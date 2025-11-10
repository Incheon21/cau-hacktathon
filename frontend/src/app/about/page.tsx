import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-black mb-4">
                            About{" "}
                            <span className="text-[#d6ff01]">ParkNow</span>
                        </h1>
                        <p className="text-xl text-[#808080]">
                            Revolutionizing parking management with AI and
                            real-time technology
                        </p>
                    </div>
                    {/* Mission Section */}
                    <div className="bg-black border-2 border-[#808080] rounded-2xl shadow-lg p-8 mb-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#d6ff01] rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#d6ff01] mb-3">
                                    Our Mission
                                </h2>
                                <p className="text-gray-300 leading-relaxed">
                                    ParkNow aims to eliminate the frustration of
                                    finding parking spots in large facilities.
                                    By leveraging AI-powered CCTV analysis and
                                    real-time data streaming, we provide instant
                                    visibility into parking availability,
                                    helping drivers save time and facility
                                    managers optimize space utilization.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* How It Works */}
                    {/* How It Works */}
                    <div className="bg-black border-2 border-[#808080] rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-[#d6ff01] mb-6 flex items-center gap-3">
                            <span className="text-2xl">⚙️</span>
                            How It Works
                        </h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-[#d6ff01] text-black rounded-full flex items-center justify-center font-bold">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">
                                        CCTV Integration
                                    </h3>
                                    <p className="text-gray-300">
                                        Existing parking lot cameras are
                                        integrated with our AI detection system
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-[#d6ff01] text-black rounded-full flex items-center justify-center font-bold">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">
                                        AI Detection
                                    </h3>
                                    <p className="text-gray-300">
                                        YOLO/OpenCV algorithms analyze video
                                        feeds to detect vehicle presence in
                                        real-time
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-[#d6ff01] text-black rounded-full flex items-center justify-center font-bold">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">
                                        Real-Time Updates
                                    </h3>
                                    <p className="text-gray-300">
                                        WebSocket technology streams updates
                                        instantly to all connected clients
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-[#d6ff01] text-black rounded-full flex items-center justify-center font-bold">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">
                                        User Access
                                    </h3>
                                    <p className="text-gray-300">
                                        Drivers and managers access live parking
                                        data through our intuitive dashboard
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    {/* Features */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-[#808080] rounded-xl shadow-lg p-6 border-2 border-white">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Real-Time Monitoring
                            </h3>
                            <p className="text-gray-300">
                                Instant updates on parking availability with
                                sub-second latency
                            </p>
                        </div>
                        <div className="bg-[#808080] rounded-xl shadow-lg p-6 border-2 border-white">
                            <div className="text-3xl mb-3">🤖</div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                AI-Powered
                            </h3>
                            <p className="text-gray-300">
                                Advanced computer vision for accurate vehicle
                                detection
                            </p>
                        </div>
                        <div className="bg-[#808080] rounded-xl shadow-lg p-6 border-2 border-white">
                            <div className="text-3xl mb-3">📱</div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Mobile Friendly
                            </h3>
                            <p className="text-gray-300">
                                Access from any device - desktop, tablet, or
                                smartphone
                            </p>
                        </div>
                        <div className="bg-[#808080] rounded-xl shadow-lg p-6 border-2 border-white">
                            <div className="text-3xl mb-3">🏢</div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Enterprise Ready
                            </h3>
                            <p className="text-gray-300">
                                Scalable solution for malls, offices, and large
                                facilities
                            </p>
                        </div>
                    </div>
                    {/* Tech Stack */}
                    <div className="bg-black border-2 border-[#808080] rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-[#d6ff01] mb-6 flex items-center gap-3">
                            <span className="text-2xl">🛠️</span>
                            Technology Stack
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-white mb-3">
                                    Frontend
                                </h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#d6ff01] rounded-full"></span>
                                        Next.js 14 with App Router
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#d6ff01] rounded-full"></span>
                                        TypeScript for type safety
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#d6ff01] rounded-full"></span>
                                        TailwindCSS for styling
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#d6ff01] rounded-full"></span>
                                        WebSocket for real-time updates
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-3">
                                    Backend
                                </h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#d6ff01] rounded-full"></span>
                                        FastAPI (Python)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#d6ff01] rounded-full"></span>
                                        WebSocket support
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#d6ff01] rounded-full"></span>
                                        YOLO/OpenCV (planned)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#d6ff01] rounded-full"></span>
                                        Async/await architecture
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* CTA */}
                    <div className="bg-black border-4 border-[#d6ff01] rounded-2xl shadow-lg p-8 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4 text-[#d6ff01]">
                            Ready to Get Started?
                        </h2>
                        <p className="text-lg mb-6 text-gray-300">
                            Experience the future of parking management today
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href="/client"
                                className="bg-[#d6ff01] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#c2e601] transition-colors"
                            >
                                Find Parking
                            </Link>
                            <Link
                                href="/dashboard"
                                className="bg-[#808080] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#707070] transition-colors border-2 border-white"
                            >
                                View Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
