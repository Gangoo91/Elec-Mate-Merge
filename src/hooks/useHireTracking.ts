import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export interface HireRecord {
  id: string;
  worker_profile_id: string;
  employer_id: string;
  hired_at: string;
  job_type?: string;
  fee_amount?: number;
  fee_status: "pending" | "paid" | "waived";
  created_at: string;
}

// Standard hire fee for talent pool placements
const HIRE_FEE = 50.00;

export function useHireTracking() {
  const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);

  // Record a hire to the database for fee tracking
  const recordHire = useCallback(
    async (
      workerProfileId: string,
      jobType?: string,
      customFee?: number
    ): Promise<boolean> => {
      if (!user?.id) {
        console.warn("No authenticated user for hire tracking");
        return false;
      }

      setIsRecording(true);

      try {
        const { error } = await supabase
          .from("elec_id_hire_records")
          .insert({
            worker_profile_id: workerProfileId,
            employer_id: user.id,
            job_type: jobType,
            fee_amount: customFee ?? HIRE_FEE,
            fee_status: "pending",
          });

        if (error) {
          // If table doesn't exist or RLS fails, log but don't block the booking
          console.error("Error recording hire:", error);
          return false;
        }

        return true;
      } catch (err) {
        console.error("Error recording hire:", err);
        return false;
      } finally {
        setIsRecording(false);
      }
    },
    [user?.id]
  );

  // Get hire records for the current employer
  const getEmployerHireRecords = useCallback(async (): Promise<HireRecord[]> => {
    if (!user?.id) return [];

    try {
      const { data, error } = await supabase
        .from("elec_id_hire_records")
        .select("*")
        .eq("employer_id", user.id)
        .order("hired_at", { ascending: false });

      if (error) {
        console.error("Error fetching hire records:", error);
        return [];
      }

      return (data as HireRecord[]) || [];
    } catch (err) {
      console.error("Error fetching hire records:", err);
      return [];
    }
  }, [user?.id]);

  // Get total pending fees for the employer
  const getPendingFees = useCallback(async (): Promise<number> => {
    if (!user?.id) return 0;

    try {
      const { data, error } = await supabase
        .from("elec_id_hire_records")
        .select("fee_amount")
        .eq("employer_id", user.id)
        .eq("fee_status", "pending");

      if (error) {
        console.error("Error fetching pending fees:", error);
        return 0;
      }

      return (data || []).reduce((sum, record) => sum + (record.fee_amount || 0), 0);
    } catch (err) {
      console.error("Error fetching pending fees:", err);
      return 0;
    }
  }, [user?.id]);

  return {
    recordHire,
    getEmployerHireRecords,
    getPendingFees,
    isRecording,
    standardFee: HIRE_FEE,
  };
}
