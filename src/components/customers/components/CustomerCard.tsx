import React from "react";
import type { Customer } from "../../../types";

interface CustomerCardProps {
  customer: Customer;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          ID: {customer.customerId}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        {customer.phoneNumber && (
          <div>
            <span className="font-medium">Phone:</span> {customer.phoneNumber}
          </div>
        )}
        {customer.email && (
          <div>
            <span className="font-medium">Email:</span> {customer.email}
          </div>
        )}
      </div>
    </div>
  );
};
