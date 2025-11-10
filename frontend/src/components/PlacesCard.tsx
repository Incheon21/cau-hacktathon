import Link from "next/link";

type PlacesCardProps = {
    id: string;
    name: string;
    available: number;
    occupied: number;
    isSelected: boolean;
    onSelect: () => void;
};

export default function PlacesCard({
    id,
    name,
    available,
    occupied,
    isSelected,
    onSelect,
}: PlacesCardProps) {
    return (
        <div
            className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-2 ${
                isSelected
                    ? "bg-[#d6ff01] text-black border-[#d6ff01] shadow-lg scale-105"
                    : "bg-[#808080] hover:bg-[#707070] text-white border-[#808080] hover:shadow-md"
            }`}
        >
            <button onClick={onSelect} className="w-full text-left mb-3">
                <div className="font-semibold text-lg mb-2">{name}</div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>{available} available</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>{occupied} occupied</span>
                    </div>
                </div>
            </button>
            <Link
                href={`/${id}`}
                className={`block w-full text-center py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                    isSelected
                        ? "bg-black text-[#d6ff01] hover:bg-gray-900"
                        : "bg-black text-white hover:bg-gray-900 border border-white"
                }`}
            >
                View Full Details →
            </Link>
        </div>
    );
}
