// Auth types
export interface User {
  userId: number;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Existing types (keep your current ones and add these)

export interface Customer {
  customerId: number;
  name: string;
  phoneNumber?: string;
  email?: string;
}

export interface Staff {
  staffId: number;
  name: string;
  role?: string;
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

export interface Slot {
  slotId: number;
  staffId: number;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  staff?: Staff;
}

export interface CallLog {
  callLogId: number;
  callId: string;
  phoneNumber?: string;
  transcript?: string;
  recordingUrl?: string;
  cost?: number;
  status: string;
  appointmentId?: number;
  createdAt: string;
  updatedAt: string;
  appointment?: Appointment;
}

export interface StaffSchedule {
  scheduleId: number;
  staffId: number;
  dayOfWeek:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface VapiWebhookPayload {
  message: {
    type: string;
    [key: string]: unknown;
  };
}
