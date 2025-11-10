import { create } from "zustand";
import type {
  Appointment,
  Service,
  Slot,
  Staff,
  Customer,
  CallLog,
} from "../types";
import api from "../utils/axios";

interface AppState {
  // Appointments
  appointments: Appointment[];
  appointmentsLoading: boolean;
  appointmentsError: string | null;
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: number, appointment: Partial<Appointment>) => void;
  removeAppointment: (id: number) => void;
  fetchAppointments: () => Promise<void>;
  deleteAppointment: (id: number) => Promise<void>;

  // Services
  services: Service[];
  servicesLoading: boolean;
  servicesError: string | null;
  setServices: (services: Service[]) => void;
  addService: (service: Service) => void;
  updateService: (id: number, service: Partial<Service>) => void;
  removeService: (id: number) => void;
  fetchServices: () => Promise<void>;
  deleteService: (id: number) => Promise<void>;

  // Slots
  slots: Slot[];
  setSlots: (slots: Slot[]) => void;
  addSlot: (slot: Slot) => void;
  updateSlot: (id: number, slot: Partial<Slot>) => void;
  removeSlot: (id: number) => void;

  // Staff
  staff: Staff[];
  staffLoading: boolean;
  staffError: string | null;
  setStaff: (staff: Staff[]) => void;
  addStaff: (staff: Staff) => void;
  updateStaff: (id: number, staff: Partial<Staff>) => void;
  removeStaff: (id: number) => void;
  fetchStaff: () => Promise<void>;
  deleteStaff: (id: number) => Promise<void>;

  // Customers
  customers: Customer[];
  customersLoading: boolean;
  customersError: string | null;
  setCustomers: (customers: Customer[]) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: number, customer: Partial<Customer>) => void;
  removeCustomer: (id: number) => void;
  fetchCustomers: () => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;

  // Call Logs (for Vapi)
  callLogs: CallLog[];
  setCallLogs: (callLogs: CallLog[]) => void;
  addCallLog: (callLog: CallLog) => void;

  // UI State
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Appointments
  appointments: [],
  appointmentsLoading: false,
  appointmentsError: null,
  setAppointments: (appointments) => set({ appointments }),
  addAppointment: async (appointment) => {
    try {
      set({ appointmentsLoading: true, appointmentsError: null });
      const response = await api.post("/appointments", appointment);
      set((state) => ({
        appointments: [...state.appointments, response.data],
      }));
    } catch (error) {
      set({
        appointmentsError:
          error instanceof Error ? error.message : "Failed to add appointment",
      });
      throw error;
    } finally {
      set({ appointmentsLoading: false });
    }
  },
  updateAppointment: async (id, appointment) => {
    try {
      set({ appointmentsLoading: true, appointmentsError: null });
      const response = await api.put(`/appointments/${id}`, appointment);
      set((state) => ({
        appointments: state.appointments.map((a) =>
          a.appointmentId === id ? { ...a, ...response.data } : a
        ),
      }));
    } catch (error) {
      set({
        appointmentsError:
          error instanceof Error
            ? error.message
            : "Failed to update appointment",
      });
      throw error;
    } finally {
      set({ appointmentsLoading: false });
    }
  },
  removeAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((a) => a.appointmentId !== id),
    })),
  fetchAppointments: async () => {
    try {
      set({ appointmentsLoading: true, appointmentsError: null });
      const response = await api.get("/appointments");
      console.log(response);
      const data = response.data;

      set({ appointments: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      set({
        appointmentsError:
          error instanceof Error
            ? error.message
            : "Failed to fetch appointments",
      });
    } finally {
      set({ appointmentsLoading: false });
    }
  },
  deleteAppointment: async (id) => {
    try {
      set({ appointmentsLoading: true, appointmentsError: null });
      await api.delete(`/appointments/${id}`);
      get().removeAppointment(id);
    } catch (error) {
      set({
        appointmentsError:
          error instanceof Error
            ? error.message
            : "Failed to delete appointment",
      });
      throw error;
    } finally {
      set({ appointmentsLoading: false });
    }
  },

  // Services
  services: [],
  servicesLoading: false,
  servicesError: null,
  setServices: (services) => set({ services }),
  addService: async (service) => {
    try {
      set({ servicesLoading: true, servicesError: null });
      const response = await api.post("/services", service);
      set((state) => ({ services: [...state.services, response.data] }));
    } catch (error) {
      set({
        servicesError:
          error instanceof Error ? error.message : "Failed to add service",
      });
      throw error;
    } finally {
      set({ servicesLoading: false });
    }
  },
  updateService: async (id, service) => {
    try {
      set({ servicesLoading: true, servicesError: null });
      const response = await api.put(`/services/${id}`, service);
      set((state) => ({
        services: state.services.map((s) =>
          s.serviceId === id ? { ...s, ...response.data } : s
        ),
      }));
    } catch (error) {
      set({
        servicesError:
          error instanceof Error ? error.message : "Failed to update service",
      });
      throw error;
    } finally {
      set({ servicesLoading: false });
    }
  },
  removeService: (id) =>
    set((state) => ({
      services: state.services.filter((s) => s.serviceId !== id),
    })),
  fetchServices: async () => {
    try {
      set({ servicesLoading: true, servicesError: null });
      const response = await api.get("/services");
      const data = response.data;
      set({ services: Array.isArray(data) ? data : [] });
    } catch (error) {
      set({
        servicesError:
          error instanceof Error ? error.message : "Failed to fetch services",
      });
    } finally {
      set({ servicesLoading: false });
    }
  },
  deleteService: async (id) => {
    try {
      set({ servicesLoading: true, servicesError: null });
      await api.delete(`/services/${id}`);
      get().removeService(id);
    } catch (error) {
      set({
        servicesError:
          error instanceof Error ? error.message : "Failed to delete service",
      });
      throw error;
    } finally {
      set({ servicesLoading: false });
    }
  },

  // Slots
  slots: [],
  setSlots: (slots) => set({ slots }),
  addSlot: (slot) => set((state) => ({ slots: [...state.slots, slot] })),
  updateSlot: (id, slot) =>
    set((state) => ({
      slots: state.slots.map((s) => (s.slotId === id ? { ...s, ...slot } : s)),
    })),
  removeSlot: (id) =>
    set((state) => ({
      slots: state.slots.filter((s) => s.slotId !== id),
    })),

  // Staff
  staff: [],
  staffLoading: false,
  staffError: null,
  setStaff: (staff) => set({ staff }),
  addStaff: async (staff) => {
    try {
      set({ staffLoading: true, staffError: null });
      const response = await api.post("/staff", staff);
      set((state) => ({ staff: [...state.staff, response.data] }));
    } catch (error) {
      set({
        staffError:
          error instanceof Error ? error.message : "Failed to add staff",
      });
      throw error;
    } finally {
      set({ staffLoading: false });
    }
  },
  updateStaff: async (id, staff) => {
    try {
      set({ staffLoading: true, staffError: null });
      const response = await api.put(`/staff/${id}`, staff);
      set((state) => ({
        staff: state.staff.map((s) =>
          s.staffId === id ? { ...s, ...response.data } : s
        ),
      }));
    } catch (error) {
      set({
        staffError:
          error instanceof Error ? error.message : "Failed to update staff",
      });
      throw error;
    } finally {
      set({ staffLoading: false });
    }
  },
  removeStaff: (id) =>
    set((state) => ({
      staff: state.staff.filter((s) => s.staffId !== id),
    })),
  fetchStaff: async () => {
    try {
      set({ staffLoading: true, staffError: null });
      const response = await api.get("/staff");
      const data = response.data;
      set({ staff: Array.isArray(data) ? data : [] });
    } catch (error) {
      set({
        staffError:
          error instanceof Error ? error.message : "Failed to fetch staff",
      });
    } finally {
      set({ staffLoading: false });
    }
  },
  deleteStaff: async (id) => {
    try {
      set({ staffLoading: true, staffError: null });
      await api.delete(`/staff/${id}`);
      get().removeStaff(id);
    } catch (error) {
      set({
        staffError:
          error instanceof Error ? error.message : "Failed to delete staff",
      });
      throw error;
    } finally {
      set({ staffLoading: false });
    }
  },

  // Customers
  customers: [],
  customersLoading: false,
  customersError: null,
  setCustomers: (customers) => set({ customers }),
  addCustomer: async (customer) => {
    try {
      set({ customersLoading: true, customersError: null });
      const response = await api.post("/customers", customer);
      set((state) => ({ customers: [...state.customers, response.data] }));
    } catch (error) {
      set({
        customersError:
          error instanceof Error ? error.message : "Failed to add customer",
      });
      throw error;
    } finally {
      set({ customersLoading: false });
    }
  },
  updateCustomer: async (id, customer) => {
    try {
      set({ customersLoading: true, customersError: null });
      const response = await api.put(`/customers/${id}`, customer);
      set((state) => ({
        customers: state.customers.map((c) =>
          c.customerId === id ? { ...c, ...response.data } : c
        ),
      }));
    } catch (error) {
      set({
        customersError:
          error instanceof Error ? error.message : "Failed to update customer",
      });
      throw error;
    } finally {
      set({ customersLoading: false });
    }
  },
  removeCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((c) => c.customerId !== id),
    })),
  fetchCustomers: async () => {
    try {
      set({ customersLoading: true, customersError: null });
      const response = await api.get("/customers");
      const data = response.data;
      set({ customers: Array.isArray(data) ? data : [] });
    } catch (error) {
      set({
        customersError:
          error instanceof Error ? error.message : "Failed to fetch customers",
      });
    } finally {
      set({ customersLoading: false });
    }
  },
  deleteCustomer: async (id) => {
    try {
      set({ customersLoading: true, customersError: null });
      await api.delete(`/customers/${id}`);
      get().removeCustomer(id);
    } catch (error) {
      set({
        customersError:
          error instanceof Error ? error.message : "Failed to delete customer",
      });
      throw error;
    } finally {
      set({ customersLoading: false });
    }
  },

  // Call Logs
  callLogs: [],
  setCallLogs: (callLogs) => set({ callLogs }),
  addCallLog: (callLog) =>
    set((state) => ({ callLogs: [callLog, ...state.callLogs] })),

  // UI State
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}));
