import React from "react";
import type { Service } from "../../../types";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {service.serviceName}
        </h3>
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
          ID: {service.serviceId}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        {service.description && (
          <div>
            <span className="font-medium">Description:</span>{" "}
            {service.description}
          </div>
        )}
        <div>
          <span className="font-medium">Duration:</span> {service.duration}{" "}
          minutes
        </div>
        <div>
          <span className="font-medium">Price:</span> ${service.price}
        </div>
        <div>
          <span className="font-medium">Created:</span>{" "}
          {formatDate(service.createdAt)}
        </div>
      </div>
    </div>
  );
};
