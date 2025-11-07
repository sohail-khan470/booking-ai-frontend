// Core types matching your Prisma schema
export interface Staff {
  staffId: number;
  name: string;
  role?: string;
}

export interface Customer {
  customerId: number;
  name: string;
  phoneNumber?: string;
  email?: string;
}

export interface Service {
  serviceId: number;
  serviceName: string;
  description?: string;
  duration: number;
  price: number;
  createdAt: string;
}

export interface Appointment {
  appointmentId: number;
  customerId: number;
  serviceId: number;
  staffId: number;
  appointmentDate: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
  service?: Service;
  staff?: Staff;
}

export interface StaffSchedule {
  scheduleId: number;
  staffId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  staff?: Staff;
}

export interface Slot {
  slotId: number;
  staffId: number;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  staff?: Staff;
}

// Store types
export interface AppState {
  appointments: Appointment[];
  staff: Staff[];
  customers: Customer[];
  services: Service[];
  loading: boolean;
  error: string | null;
}
