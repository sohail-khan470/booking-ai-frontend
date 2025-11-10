import React from "react";
import ServiceList from "../components/services/components/ServiceList";
import { useServices } from "../components/services/hooks/useServices";

const ServicesPage: React.FC = () => {
  const { services, loading, error } = useServices();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-600">Manage services offered</p>
      </div>

      <ServiceList services={services} loading={loading} error={error} />
    </div>
  );
};

export default ServicesPage;
