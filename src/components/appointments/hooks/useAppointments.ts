import { useEffect } from "react";
import { useStore } from "../../../store/store";

export const useAppointments = () => {
  const {
    appointments,
    loading,
    error,
    fetchAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  } = useStore();

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };
};
