import { useState, useEffect, useCallback } from "react";
import { useStore } from "../../../store/store";
import { vapiApi } from "../../../utils/api";

export const useVapi = () => {
  const { callLogs, addCallLog, setLoading, setError } = useStore();
  const [vapiStatus, setVapiStatus] = useState<"connected" | "disconnected">(
    "disconnected"
  );

  const checkVapiHealth = useCallback(async () => {
    try {
      setLoading(true);
      const response = await vapiApi.healthCheck();
      if (response.data.status === "ok") {
        setVapiStatus("connected");
      } else {
        setVapiStatus("disconnected");
      }
      setError(null);
    } catch (error: unknown) {
      setVapiStatus("disconnected");
      const err = error as Error;
      setError(err.message || "Failed to connect to Vapi");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  useEffect(() => {
    checkVapiHealth();
    // Check health every 30 seconds
    const interval = setInterval(checkVapiHealth, 30000);
    return () => clearInterval(interval);
  }, [checkVapiHealth]);

  // You would typically fetch call logs from your backend
  // This is a placeholder - implement based on your backend API
  const fetchCallLogs = useCallback(async () => {
    try {
      setLoading(true);
      // Implement your call logs endpoint
      // const response = await api.get('/call-logs');
      // setCallLogs(response.data);
      setError(null);
    } catch (error: unknown) {
      const err = error as Error;
      setError(err.message || "Failed to fetch call logs");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  return {
    callLogs,
    vapiStatus,
    checkVapiHealth,
    fetchCallLogs,
    addCallLog,
  };
};
