import api from "./axios";
import type { Appointment, Service, Slot, Staff, Customer } from "../types";

// Vapi API calls
export const vapiApi = {
  healthCheck: () => api.get("/vapi/health"),
  // Webhook is called by Vapi, not directly from frontend
};

// Appointments API
export const appointmentsApi = {
  getAll: () => api.get("/appointments"),
  getById: (id: number) => api.get(`/appointments/${id}`),
  create: (data: Partial<Appointment>) => api.post("/appointments", data),
  update: (id: number, data: Partial<Appointment>) =>
    api.put(`/appointments/${id}`, data),
  delete: (id: number) => api.delete(`/appointments/${id}`),
  updateStatus: (id: number, status: string) =>
    api.patch(`/appointments/${id}/status`, { status }),
  getByCustomer: (customerId: number) =>
    api.get(`/appointments/customer/${customerId}`),
  getByStaff: (staffId: number) => api.get(`/appointments/staff/${staffId}`),
};

// Services API
export const servicesApi = {
  getAll: () => api.get("/services"),
  getById: (id: number) => api.get(`/services/${id}`),
  create: (data: Partial<Service>) => api.post("/services", data),
  update: (id: number, data: Partial<Service>) =>
    api.put(`/services/${id}`, data),
  delete: (id: number) => api.delete(`/services/${id}`),
  getByDuration: (duration: number) =>
    api.get("/services/duration", { params: { duration } }),
};

// Slots API
export const slotsApi = {
  getAll: () => api.get("/slots"),
  getById: (id: number) => api.get(`/slots/${id}`),
  create: (data: Partial<Slot>) => api.post("/slots", data),
  update: (id: number, data: Partial<Slot>) => api.put(`/slots/${id}`, data),
  delete: (id: number) => api.delete(`/slots/${id}`),
  getAvailable: (params?: Record<string, unknown>) =>
    api.get("/slots/available", { params }),
  getByStaff: (staffId: number) => api.get(`/slots/staff/${staffId}`),
  bookSlot: (id: number) => api.patch(`/slots/${id}/book`),
  freeSlot: (id: number) => api.patch(`/slots/${id}/free`),
};

// Staff API
export const staffApi = {
  getAll: () => api.get("/staff"),
  getById: (id: number) => api.get(`/staff/${id}`),
  create: (data: Partial<Staff>) => api.post("/staff", data),
  update: (id: number, data: Partial<Staff>) => api.put(`/staff/${id}`, data),
  delete: (id: number) => api.delete(`/staff/${id}`),
  addSchedule: (id: number, data: Record<string, unknown>) =>
    api.post(`/staff/${id}/schedules`, data),
  getSchedules: (id: number) => api.get(`/staff/${id}/schedules`),
};

// Customers API
export const customersApi = {
  getAll: () => api.get("/customers"),
  getById: (id: number) => api.get(`/customers/${id}`),
  create: (data: Partial<Customer>) => api.post("/customers", data),
  update: (id: number, data: Partial<Customer>) =>
    api.put(`/customers/${id}`, data),
  delete: (id: number) => api.delete(`/customers/${id}`),
  search: (query: string) =>
    api.get("/customers/search", { params: { query } }),
};

export default api;
