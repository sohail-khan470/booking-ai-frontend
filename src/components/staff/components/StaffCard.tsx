import React from "react";
import type { Staff } from "../../../types";

interface StaffCardProps {
  staff: Staff;
}

export const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{staff.name}</h3>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          ID: {staff.staffId}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        {staff.role && (
          <div>
            <span className="font-medium">Role:</span> {staff.role}
          </div>
        )}
      </div>
    </div>
  );
};
