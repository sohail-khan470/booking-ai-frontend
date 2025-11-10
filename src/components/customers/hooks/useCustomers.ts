import { useEffect } from "react";
import { useStore } from "../../../store/store";

export const useCustomers = () => {
  const {
    customers,
    customersLoading,
    customersError,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  } = useStore();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    loading: customersLoading,
    error: customersError,
    refetch: fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };
};
