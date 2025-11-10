import React from "react";
import StaffList from "../components/staff/components/StaffList";
import { useStaff } from "../components/staff/hooks/useStaff";

const StaffPage: React.FC = () => {
  const { staff, loading, error } = useStaff();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff</h1>
        <p className="text-gray-600">Manage staff members</p>
      </div>

      <StaffList staff={staff} loading={loading} error={error} />
    </div>
  );
};

export default StaffPage;
