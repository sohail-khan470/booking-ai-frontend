import React, { useState } from "react";
import { useSlots } from "../components/slots/hooks/useSlots";
import { useStore } from "../store/store";

export const SlotsPage: React.FC = () => {
  const {
    slots,
    availableSlots,
    fetchAvailableSlots,
    bookSlotById,
    freeSlotById,
    deleteSlot,
  } = useSlots();
  const { loading, staff } = useStore();
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const displaySlots = showAvailableOnly ? availableSlots : slots;

  const filteredSlots = displaySlots.filter((slot) => {
    const matchesStaff =
      selectedStaff === "all" || slot.staffId === parseInt(selectedStaff);
    const matchesDate = !selectedDate || slot.date.startsWith(selectedDate);
    return matchesStaff && matchesDate;
  });

  const handleBookSlot = async (slotId: number) => {
    try {
      await bookSlotById(slotId);
      alert("Slot booked successfully!");
    } catch {
      alert("Failed to book slot");
    }
  };

  const handleFreeSlot = async (slotId: number) => {
    try {
      await freeSlotById(slotId);
      alert("Slot freed successfully!");
    } catch {
      alert("Failed to free slot");
    }
  };

  const handleDeleteSlot = async (slotId: number) => {
    if (window.confirm("Are you sure you want to delete this slot?")) {
      try {
        await deleteSlot(slotId);
        alert("Slot deleted successfully!");
      } catch {
        alert("Failed to delete slot");
      }
    }
  };

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Time Slots Management
          </h1>
          <p className="text-gray-600">
            Manage staff availability and booking slots
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Staff Member
              </label>
              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Staff</option>
                {staff.map((s) => (
                  <option key={s.staffId} value={s.staffId}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setShowAvailableOnly(!showAvailableOnly);
                  if (!showAvailableOnly) {
                    fetchAvailableSlots();
                  }
                }}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  showAvailableOnly
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {showAvailableOnly ? "Show All" : "Available Only"}
              </button>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedStaff("all");
                  setSelectedDate("");
                  setShowAvailableOnly(false);
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Slots Grid */}
        {filteredSlots.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No slots found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters or create new slots.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSlots.map((slot) => (
              <div
                key={slot.slotId}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  slot.isBooked
                    ? "border-l-4 border-red-500"
                    : "border-l-4 border-green-500"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {slot.staff?.name || `Staff #${slot.staffId}`}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(slot.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      slot.isBooked
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {slot.isBooked ? "Booked" : "Available"}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-900 font-medium">
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!slot.isBooked ? (
                    <button
                      onClick={() => handleBookSlot(slot.slotId)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Book Slot
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFreeSlot(slot.slotId)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Free Slot
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteSlot(slot.slotId)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
