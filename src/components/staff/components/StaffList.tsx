import React from "react";
import type { Staff } from "../../../types";

interface StaffListProps {
  staff: Staff[];
  loading: boolean;
  error: string | null;
}

const StaffList: React.FC<StaffListProps> = ({ staff, loading, error }) => {
  if (loading) return <div>Loading staff...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Staff Members
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {staff.map((staffMember) => (
          <li key={staffMember.staffId}>
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {staffMember.name}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {staffMember.role}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>Staff ID: {staffMember.staffId}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;
