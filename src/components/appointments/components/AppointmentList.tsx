import React, { useState } from "react";
import type { Appointment } from "../../../types";

interface AppointmentListProps {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, appointment: Partial<Appointment>) => Promise<void>;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  loading,
  error,
  onDelete,
  onEdit,
}) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Appointments
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              All scheduled appointments
            </p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            New Appointment
          </button>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <li key={appointment.appointmentId} className="hover:bg-gray-50">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Appointment #{appointment.appointmentId}
                  </p>
                  <span
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      appointment.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : appointment.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "COMPLETED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      onEdit(appointment.appointmentId, { status: "COMPLETED" })
                    }
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.appointmentId)}
                    disabled={deletingId === appointment.appointmentId}
                    className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
                  >
                    {deletingId === appointment.appointmentId
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {appointment.appointmentDate}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    Service:{" "}
                    {appointment.service?.serviceName ||
                      `Service #${appointment.serviceId}`}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {appointments.length === 0 && (
        <div className="px-4 py-12 text-center">
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
            No appointments
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new appointment.
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
