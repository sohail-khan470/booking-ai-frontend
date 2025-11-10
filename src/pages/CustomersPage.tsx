import React from "react";
import CustomerList from "../components/customers/components/CustomerList";
import { useCustomers } from "../components/customers/hooks/useCustomers";

const CustomersPage: React.FC = () => {
  const { customers, loading, error } = useCustomers();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600">Manage customer information</p>
      </div>

      <CustomerList customers={customers} loading={loading} error={error} />
    </div>
  );
};

export default CustomersPage;
