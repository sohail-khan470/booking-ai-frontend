import { useEffect } from "react";
import { useStore } from "../../../store/store";

export const useStaff = () => {
  const {
    staff,
    staffLoading,
    staffError,
    fetchStaff,
    addStaff,
    updateStaff,
    deleteStaff,
  } = useStore();

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return {
    staff,
    loading: staffLoading,
    error: staffError,
    refetch: fetchStaff,
    addStaff,
    updateStaff,
    deleteStaff,
  };
};
