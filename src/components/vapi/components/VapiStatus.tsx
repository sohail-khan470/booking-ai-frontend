import React from "react";

interface VapiStatusProps {
  status: "connected" | "disconnected";
  onRefresh: () => void;
}

export const VapiStatus: React.FC<VapiStatusProps> = ({
  status,
  onRefresh,
}) => {
  return (
    <div
      className={`rounded-lg p-4 ${
        status === "connected"
          ? "bg-green-50 border border-green-200"
          : "bg-red-50 border border-red-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-3 ${
              status === "connected"
                ? "bg-green-500 animate-pulse"
                : "bg-red-500"
            }`}
          ></div>
          <div>
            <h3
              className={`font-semibold ${
                status === "connected" ? "text-green-900" : "text-red-900"
              }`}
            >
              Vapi AI Status
            </h3>
            <p
              className={`text-sm ${
                status === "connected" ? "text-green-700" : "text-red-700"
              }`}
            >
              {status === "connected"
                ? "Connected and ready to receive calls"
                : "Unable to connect to Vapi AI service"}
            </p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            status === "connected"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Refresh
        </button>
      </div>
    </div>
  );
};
