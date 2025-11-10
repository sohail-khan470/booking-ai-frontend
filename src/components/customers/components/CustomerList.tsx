import React from "react";
import type { Customer } from "../../../types";

interface CustomerListProps {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  loading,
  error,
}) => {
  if (loading) return <div>Loading customers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Customers
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {customers.map((customer) => (
          <li key={customer.customerId}>
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {customer.name}
                </p>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {customer.phoneNumber}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>{customer.email}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
