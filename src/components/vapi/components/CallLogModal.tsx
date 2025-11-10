import React from "react";
import type { CallLog } from "../../../types";

interface CallLogModalProps {
  callLog: CallLog;
  onClose: () => void;
}

export const CallLogModal: React.FC<CallLogModalProps> = ({
  callLog,
  onClose,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Call Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Call ID
              </label>
              <p className="mt-1 text-gray-900 font-mono text-sm">
                {callLog.callId}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Status
              </label>
              <p className="mt-1">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    callLog.status.toLowerCase() === "completed"
                      ? "bg-green-100 text-green-800"
                      : callLog.status.toLowerCase() === "failed"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {callLog.status}
                </span>
              </p>
            </div>
            {callLog.phoneNumber && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-900">{callLog.phoneNumber}</p>
              </div>
            )}
            {callLog.cost !== undefined && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Cost
                </label>
                <p className="mt-1 text-gray-900 font-semibold">
                  ${callLog.cost.toFixed(2)}
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Created At
              </label>
              <p className="mt-1 text-gray-900">
                {formatDate(callLog.createdAt)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Updated At
              </label>
              <p className="mt-1 text-gray-900">
                {formatDate(callLog.updatedAt)}
              </p>
            </div>
          </div>

          {/* Appointment Link */}
          {callLog.appointmentId && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Related Appointment
              </label>
              <div className="mt-2">
                <a
                  href={`/appointments/${callLog.appointmentId}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  View Appointment #{callLog.appointmentId}
                </a>
              </div>
            </div>
          )}

          {/* Transcript */}
          {callLog.transcript && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Transcript
              </label>
              <div className="mt-2 bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {callLog.transcript}
                </p>
              </div>
            </div>
          )}

          {/* Recording */}
          {callLog.recordingUrl && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Recording
              </label>
              <div className="mt-2">
                <audio controls className="w-full">
                  <source src={callLog.recordingUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <a
                  href={callLog.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Recording
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
