import { useState, useEffect, useCallback } from "react";
import { useStore } from "../../../store/store";
import { slotsApi } from "../../../utils/api";
import type { Slot } from "../../../types";

export const useSlots = () => {
  const {
    slots,
    setSlots,
    addSlot,
    updateSlot,
    removeSlot,
    setLoading,
    setError,
  } = useStore();
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);

  const fetchSlots = useCallback(async () => {
    try {
      setLoading(true);
      const response = await slotsApi.getAll();
      setSlots(response.data);
      setError(null);
    } catch (error: unknown) {
      const err = error as Error;
      setError(err.message || "Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  }, [setSlots, setLoading, setError]);

  const fetchAvailableSlots = useCallback(
    async (filters?: Record<string, unknown>) => {
      try {
        setLoading(true);
        const response = await slotsApi.getAvailable(filters);
        setAvailableSlots(response.data);
        setError(null);
      } catch (error: unknown) {
        const err = error as Error;
        setError(err.message || "Failed to fetch available slots");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  const fetchSlotsByStaff = useCallback(
    async (staffId: number) => {
      try {
        setLoading(true);
        const response = await slotsApi.getByStaff(staffId);
        setSlots(response.data);
        setError(null);
      } catch (error: unknown) {
        const err = error as Error;
        setError(err.message || "Failed to fetch staff slots");
      } finally {
        setLoading(false);
      }
    },
    [setSlots, setLoading, setError]
  );

  const createSlot = useCallback(
    async (slotData: Partial<Slot>) => {
      try {
        setLoading(true);
        const response = await slotsApi.create(slotData);
        addSlot(response.data);
        setError(null);
        return response.data;
      } catch (error: unknown) {
        const err = error as Error;
        setError(err.message || "Failed to create slot");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addSlot, setLoading, setError]
  );

  const updateSlotById = useCallback(
    async (id: number, slotData: Partial<Slot>) => {
      try {
        setLoading(true);
        const response = await slotsApi.update(id, slotData);
        updateSlot(id, response.data);
        setError(null);
        return response.data;
      } catch (error: unknown) {
        const err = error as Error;
        setError(err.message || "Failed to update slot");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [updateSlot, setLoading, setError]
  );

  const deleteSlot = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await slotsApi.delete(id);
        removeSlot(id);
        setError(null);
      } catch (error: unknown) {
        const err = error as Error;
        setError(err.message || "Failed to delete slot");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [removeSlot, setLoading, setError]
  );

  const bookSlotById = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        const response = await slotsApi.bookSlot(id);
        updateSlot(id, response.data);
        setError(null);
        return response.data;
      } catch (error: unknown) {
        const err = error as Error;
        setError(err.message || "Failed to book slot");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [updateSlot, setLoading, setError]
  );

  const freeSlotById = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        const response = await slotsApi.freeSlot(id);
        updateSlot(id, response.data);
        setError(null);
        return response.data;
      } catch (error: unknown) {
        const err = error as Error;
        setError(err.message || "Failed to free slot");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [updateSlot, setLoading, setError]
  );

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  return {
    slots,
    availableSlots,
    fetchSlots,
    fetchAvailableSlots,
    fetchSlotsByStaff,
    createSlot,
    updateSlotById,
    deleteSlot,
    bookSlotById,
    freeSlotById,
  };
};
