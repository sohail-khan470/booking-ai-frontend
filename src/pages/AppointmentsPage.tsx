import React from "react";
import AppointmentList from "../components/appointments/components/AppointmentList";
import { useAppointments } from "../components/appointments/hooks/useAppointments";
import type { Appointment } from "../types";

const AppointmentsPage: React.FC = () => {
  console.log("inside appointments page");

  const { appointments, loading, error, deleteAppointment, updateAppointment } =
    useAppointments();

  const handleDelete = async (id: number) => {
    await deleteAppointment(id);
  };

  const handleEdit = async (id: number, updates: Partial<Appointment>) => {
    await updateAppointment(id, updates);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <p className="text-gray-600">Manage all appointments</p>
      </div>

      <AppointmentList
        appointments={appointments}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default AppointmentsPage;
