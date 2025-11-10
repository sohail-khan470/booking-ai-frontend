import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/store";
import { useAppointments } from "../components/appointments/hooks/useAppointments";
import { useCustomers } from "../components/customers/hooks/useCustomers";
import { useServices } from "../components/services/hooks/useServices";
import { useStaff } from "../components/staff/hooks/useStaff";
import { useVapi } from "../components/vapi/hooks/useVapi";

export const Dashboard: React.FC = () => {
  const { appointments, services, customers, staff, callLogs } = useStore();
  const { refetch: fetchAppointments } = useAppointments();
  const { refetch: fetchCustomers } = useCustomers();
  const { refetch: fetchServices } = useServices();
  const { refetch: fetchStaff } = useStaff();
  const { vapiStatus } = useVapi();

  console.log(appointments, services, customers, staff, callLogs);
  console.log("dashboard pages");

  useEffect(() => {
    fetchAppointments();
    fetchCustomers();
    fetchServices();
    fetchStaff();
  }, [fetchAppointments, fetchCustomers, fetchServices, fetchStaff]);

  const stats = {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter((a) => a.status === "PENDING")
      .length,
    confirmedAppointments: appointments.filter((a) => a.status === "CONFIRMED")
      .length,
    totalCustomers: customers.length,
    totalServices: services.length,
    totalStaff: staff.length,
    totalCalls: callLogs.length,
    recentAppointments: appointments.slice(0, 5),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Vapi Status Alert */}
        <div
          className={`mb-6 rounded-lg p-4 ${
            vapiStatus === "connected"
              ? "bg-green-50 border border-green-200"
              : "bg-yellow-50 border border-yellow-200"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-3 ${
                vapiStatus === "connected" ? "bg-green-500" : "bg-yellow-500"
              }`}
            ></div>
            <p
              className={`text-sm font-medium ${
                vapiStatus === "connected"
                  ? "text-green-900"
                  : "text-yellow-900"
              }`}
            >
              Vapi AI is{" "}
              {vapiStatus === "connected"
                ? "connected and ready"
                : "checking connection..."}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/appointments"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Appointments</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalAppointments}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {stats.confirmedAppointments} confirmed
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              </div>
            </div>
          </Link>

          <Link
            to="/customers"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Customers</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalCustomers}
                </p>
                <p className="text-xs text-gray-500 mt-1">Active customers</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <Link
            to="/services"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Services Offered</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalServices}
                </p>
                <p className="text-xs text-gray-500 mt-1">Available services</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <Link
            to="/vapi"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Vapi AI Calls</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalCalls}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total call logs</p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Appointments & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Appointments */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Appointments
              </h2>
              <Link
                to="/appointments"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All →
              </Link>
            </div>
            {stats.recentAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No appointments yet
              </p>
            ) : (
              <div className="space-y-3">
                {stats.recentAppointments.map((appointment) => (
                  <div
                    key={appointment.appointmentId}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {appointment.customer?.name ||
                          `Customer #${appointment.customerId}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.service?.serviceName ||
                          `Service #${appointment.serviceId}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(appointment.appointmentDate).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {/* <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/appointments"
                className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
              >
                New Appointment
              </Link>
              <Link
                to="/customers"
                className="block w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
              >
                Add Customer
              </Link>
              <Link
                to="/slots"
                className="block w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
              >
                Manage Slots
              </Link>
              <Link
                to="/vapi"
                className="block w-full bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors text-center font-medium"
              >
                View Call Logs
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
