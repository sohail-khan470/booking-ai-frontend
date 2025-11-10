import React from "react";
import type { Appointment } from "../../../types";

interface AppointmentCardProps {
  appointment: Appointment;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Appointment #{appointment.appointmentId}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.status === "CONFIRMED"
              ? "bg-green-100 text-green-800"
              : appointment.status === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : appointment.status === "CANCELLED"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Customer:</span>{" "}
          {appointment.customer?.name || "N/A"}
        </div>
        <div>
          <span className="font-medium">Service:</span>{" "}
          {appointment.service?.serviceName || "N/A"}
        </div>
        <div>
          <span className="font-medium">Staff:</span>{" "}
          {appointment.staff?.name || "N/A"}
        </div>
        <div>
          <span className="font-medium">Date:</span>{" "}
          {formatDate(appointment.appointmentDate)}
        </div>
        <div>
          <span className="font-medium">Created:</span>{" "}
          {formatDate(appointment.createdAt)}
        </div>
      </div>
    </div>
  );
};
