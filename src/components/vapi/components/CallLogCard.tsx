import React from "react";
import type { CallLog } from "../../../types";

interface CallLogCardProps {
  callLog: CallLog;
  onViewDetails: (callLog: CallLog) => void;
}

export const CallLogCard: React.FC<CallLogCardProps> = ({
  callLog,
  onViewDetails,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Call ID: {callLog.callId.slice(0, 8)}...
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatDate(callLog.createdAt)}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            callLog.status
          )}`}
        >
          {callLog.status}
        </span>
      </div>

      <div className="space-y-2">
        {callLog.phoneNumber && (
          <div className="flex items-center text-sm">
            <span className="text-gray-600 font-medium w-24">Phone:</span>
            <span className="text-gray-900">{callLog.phoneNumber}</span>
          </div>
        )}

        {callLog.cost !== undefined && (
          <div className="flex items-center text-sm">
            <span className="text-gray-600 font-medium w-24">Cost:</span>
            <span className="text-gray-900">${callLog.cost.toFixed(2)}</span>
          </div>
        )}

        {callLog.appointmentId && (
          <div className="flex items-center text-sm">
            <span className="text-gray-600 font-medium w-24">Appointment:</span>
            <span className="text-blue-600">#{callLog.appointmentId}</span>
          </div>
        )}

        {callLog.transcript && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 font-medium mb-1">
              Transcript:
            </p>
            <p className="text-sm text-gray-700 line-clamp-3">
              {callLog.transcript}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onViewDetails(callLog)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          View Details
        </button>
        {callLog.recordingUrl && (
          <a
            href={callLog.recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium text-center"
          >
            Recording
          </a>
        )}
      </div>
    </div>
  );
};
