type Slot = {
  id: string;
  status: string;
};

interface ParkingGridProps {
  slots: Slot[];
}

export default function ParkingGrid({ slots }: ParkingGridProps) {
  const getColor = (status: string) => {
    if (status === "available") return "bg-green-500";
    if (status === "occupied") return "bg-red-500";
    return "bg-gray-400";
  };

  return (
    <div className="grid grid-cols-5 gap-2 mt-6">
      {slots.map((slot) => (
        <div
          key={slot.id}
          className={`p-4 rounded text-white text-center font-bold ${getColor(slot.status)}`}
        >
          {slot.id}
        </div>
      ))}
    </div>
  );
}
