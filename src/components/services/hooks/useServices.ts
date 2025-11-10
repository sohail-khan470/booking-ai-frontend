import { useEffect } from "react";
import { useStore } from "../../../store/store";

export const useServices = () => {
  const {
    services,
    servicesLoading,
    servicesError,
    fetchServices,
    addService,
    updateService,
    deleteService,
  } = useStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    loading: servicesLoading,
    error: servicesError,
    refetch: fetchServices,
    addService,
    updateService,
    deleteService,
  };
};
