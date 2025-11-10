import React from "react";
import type { Service } from "../../../types";

interface ServiceListProps {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  loading,
  error,
}) => {
  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Services
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {services.map((service) => (
          <li key={service.serviceId}>
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {service.serviceName}
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
                    {service.description}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    ${service.price} • {service.duration}min
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
