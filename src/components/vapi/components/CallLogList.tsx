import React, { useState } from "react";
import { CallLogModal } from "./CallLogModal";
// import { CallLog } from "../../../types";
// import { CallLog } from "../../../types";
import { CallLogCard } from "./CallLogCard";
import type { CallLog } from "../../../types";

interface CallLogListProps {
  callLogs: CallLog[];
  loading?: boolean;
}

export const CallLogList: React.FC<CallLogListProps> = ({
  callLogs,
  loading,
}) => {
  const [selectedCallLog, setSelectedCallLog] = useState<CallLog | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCallLogs = callLogs.filter((log) => {
    const matchesStatus =
      filterStatus === "all" ||
      log.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      log.callId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.phoneNumber?.includes(searchQuery) ||
      log.transcript?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search by call ID, phone, or transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[300px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>
      </div>

      {/* Call Logs Grid */}
      {filteredCallLogs.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No call logs
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery || filterStatus !== "all"
              ? "No calls match your filters."
              : "Call logs will appear here once calls are made."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCallLogs.map((callLog) => (
            <CallLogCard
              key={callLog.callLogId}
              callLog={callLog}
              onViewDetails={setSelectedCallLog}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedCallLog && (
        <CallLogModal
          callLog={selectedCallLog}
          onClose={() => setSelectedCallLog(null)}
        />
      )}
    </div>
  );
};
