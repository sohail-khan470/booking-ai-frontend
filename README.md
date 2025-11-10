# Booking System Frontend - Vapi AI Integration

A comprehensive React + TypeScript frontend for managing appointments, customers, services, staff, and Vapi AI call logs.

## 🚀 Features

- **Dashboard**: Overview of all system metrics
- **Appointments Management**: Create, view, update, and manage appointments
- **Customer Management**: Track customer information and history
- **Services Catalog**: Manage available services with pricing
- **Staff Management**: Handle staff schedules and availability
- **Time Slots**: Manage booking slots and availability
- **Vapi AI Integration**: Monitor and review AI-powered phone calls
  - Real-time call logs
  - Transcripts viewing
  - Recording playback
  - Call statistics and costs

## 🛠️ Tech Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **Zustand**: State management
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Axios**: API calls
- **Vite**: Build tool

## 📦 Installation

1. **Clone the repository** (if not already done)

2. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   ```

3. **Create environment file**:

   ```bash
   cp .env.example .env
   ```

4. **Update `.env` file** with your backend API URL:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── appointments/        # Appointment components & hooks
│   ├── customers/           # Customer components & hooks
│   ├── services/            # Service components & hooks
│   ├── staff/              # Staff components & hooks
│   ├── slots/              # Slot management (NEW)
│   ├── vapi/               # Vapi AI components & hooks (NEW)
│   │   ├── components/
│   │   │   ├── CallLogCard.tsx
│   │   │   ├── CallLogList.tsx
│   │   │   ├── CallLogModal.tsx
│   │   │   └── VapiStatus.tsx
│   │   └── hooks/
│   │       └── useVapi.ts
│   └── Layout.tsx          # Main layout with sidebar
├── pages/
│   ├── Dashboard.tsx       # Enhanced dashboard
│   ├── AppointmentsPage.tsx
│   ├── CustomersPage.tsx
│   ├── ServicesPage.tsx
│   ├── StaffPage.tsx
│   ├── SlotsPage.tsx       # NEW
│   └── VapiPage.tsx        # NEW - Vapi AI call management
├── store/
│   └── store.ts           # Zustand store with all entities
├── types/
│   └── index.ts           # TypeScript interfaces
├── utils/
│   └── api.ts             # API configuration & endpoints
├── App.tsx                # Main app with routing
└── main.tsx              # Entry point
```

## 🔌 API Integration

The frontend connects to your backend API at the configured `VITE_API_BASE_URL`.

### Available API Endpoints

#### Vapi Routes

- `GET /api/vapi/health` - Check Vapi connection status

#### Appointments

- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `PATCH /api/appointments/:id/status` - Update appointment status
- `GET /api/appointments/customer/:customerId` - Get customer appointments
- `GET /api/appointments/staff/:staffId` - Get staff appointments

#### Services

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

#### Slots

- `GET /api/slots` - Get all slots
- `GET /api/slots/available` - Get available slots
- `GET /api/slots/staff/:staffId` - Get staff slots
- `POST /api/slots` - Create new slot
- `PUT /api/slots/:id` - Update slot
- `DELETE /api/slots/:id` - Delete slot
- `PATCH /api/slots/:id/book` - Book a slot
- `PATCH /api/slots/:id/free` - Free a slot

#### Staff

- `GET /api/staff` - Get all staff
- `GET /api/staff/:id` - Get staff by ID
- `POST /api/staff` - Create new staff
- `PUT /api/staff/:id` - Update staff
- `DELETE /api/staff/:id` - Delete staff
- `POST /api/staff/:id/schedules` - Add staff schedule
- `GET /api/staff/:id/schedules` - Get staff schedules

#### Customers

- `GET /api/customers` - Get all customers
- `GET /api/customers/search?query=` - Search customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

## 🎨 Key Features

### Vapi AI Integration

- **Real-time Status Monitoring**: Check if Vapi AI service is connected
- **Call Log Management**: View all call logs with filtering and search
- **Detailed Call View**: Modal with full transcript and recording
- **Statistics Dashboard**: Track total calls, costs, and success rates
- **Appointment Linking**: Link calls to appointments for context

### Enhanced Dashboard

- Overview cards showing key metrics
- Recent appointments list
- Quick action buttons
- Vapi connection status indicator

### Time Slots Management

- View all available and booked slots
- Filter by staff member and date
- Book/free slots with one click
- Visual status indicators

## 🔧 Configuration

### Adding Call Logs Backend Endpoint

You'll need to create a backend endpoint to fetch call logs. Add this to your backend:

```javascript
// In your vapi-controller or similar
router.get("/call-logs", async (req, res) => {
  // Fetch call logs from database
  const callLogs = await prisma.callLog.findMany({
    include: {
      appointment: {
        include: {
          customer: true,
          service: true,
          staff: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(callLogs);
});
```

Then update the `useVapi` hook to fetch from this endpoint.

## 🎯 Usage Examples

### Viewing Call Logs

1. Navigate to "Vapi AI Calls" from the sidebar
2. View all call logs with status indicators
3. Click "View Details" to see full transcript
4. Use filters to search by phone, status, or content

### Managing Slots

1. Go to "Time Slots" page
2. Filter by staff member or date
3. Click "Book Slot" to mark as booked
4. Click "Free Slot" to make available again

### Dashboard Overview

- View real-time statistics
- Check recent appointments
- Monitor Vapi AI connection status
- Access quick actions for common tasks

## 🚨 Troubleshooting

### API Connection Issues

- Verify `VITE_API_BASE_URL` in `.env` is correct
- Ensure backend server is running
- Check browser console for CORS errors

### Vapi Status Shows Disconnected

- Verify Vapi webhook endpoint is accessible
- Check backend Vapi configuration
- Review backend logs for Vapi errors

### Build Errors

- Delete `node_modules` and run `npm install` again
- Clear build cache: `rm -rf dist .vite`
- Check for TypeScript errors: `npm run build`

## 📝 Next Steps

1. **Implement Call Logs Backend**: Create endpoint to fetch CallLog data
2. **Add Authentication**: Protect routes with JWT or similar
3. **Real-time Updates**: Implement WebSocket for live call updates
4. **Export Features**: Add CSV/PDF export for reports
5. **Enhanced Filtering**: Add date range pickers and advanced filters

## 🤝 Contributing

Feel free to enhance the frontend by:

- Adding form validation
- Implementing loading states
- Adding error boundaries
- Creating more detailed statistics
- Improving responsive design

## 📄 License

This project is part of your booking system application.
