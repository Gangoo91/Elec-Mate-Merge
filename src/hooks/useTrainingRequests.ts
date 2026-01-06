import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export interface TrainingRequest {
  id: string;
  worker_profile_id: string;
  employer_id: string;
  training_name: string;
  provider?: string;
  completed_date?: string;
  certificate_url?: string;
  status: "pending" | "approved" | "declined";
  requested_at: string;
  responded_at?: string;
  // Joined data
  worker_name?: string;
  employer_name?: string;
}

export interface CreateTrainingRequestInput {
  workerProfileId: string;
  trainingName: string;
  provider?: string;
  completedDate?: string;
  certificateUrl?: string;
}

export function useTrainingRequests() {
  const { user, profile } = useAuth();
  const [requests, setRequests] = useState<TrainingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch training requests - for employers (sent requests) or workers (received requests)
  const fetchRequests = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      // Determine if user is employer or worker based on role
      const isEmployer = profile?.role === 'employer';

      let query = supabase
        .from("elec_id_training_requests")
        .select("*")
        .order("requested_at", { ascending: false });

      if (isEmployer) {
        // Employer sees requests they've sent
        query = query.eq("employer_id", user.id);
      } else {
        // Worker sees requests they've received
        // Need to get their elec_id_profile first
        const { data: elecProfile } = await supabase
          .from("employer_elec_id_profiles")
          .select("id")
          .eq("employee_id", user.id)
          .single();

        if (elecProfile) {
          query = query.eq("worker_profile_id", elecProfile.id);
        } else {
          setRequests([]);
          setIsLoading(false);
          return;
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching training requests:", error);
        return;
      }

      setRequests((data as TrainingRequest[]) || []);
    } catch (err) {
      console.error("Error fetching training requests:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, profile?.role]);

  // Create a training request (employer action)
  const createRequest = useCallback(
    async (input: CreateTrainingRequestInput): Promise<boolean> => {
      if (!user?.id) {
        toast({
          title: "Not authenticated",
          description: "Please sign in to submit training requests.",
          variant: "destructive",
        });
        return false;
      }

      setIsSubmitting(true);

      try {
        const { error } = await supabase
          .from("elec_id_training_requests")
          .insert({
            worker_profile_id: input.workerProfileId,
            employer_id: user.id,
            training_name: input.trainingName,
            provider: input.provider,
            completed_date: input.completedDate,
            certificate_url: input.certificateUrl,
            status: "pending",
          });

        if (error) {
          console.error("Error creating training request:", error);
          toast({
            title: "Error",
            description: "Failed to submit training request.",
            variant: "destructive",
          });
          return false;
        }

        toast({
          title: "Request Sent",
          description: "Training record request has been sent to the worker for approval.",
        });

        // Refresh the list
        await fetchRequests();
        return true;
      } catch (err) {
        console.error("Error creating training request:", err);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [user?.id, fetchRequests]
  );

  // Respond to a training request (worker action)
  const respondToRequest = useCallback(
    async (requestId: string, approve: boolean): Promise<boolean> => {
      if (!user?.id) return false;

      setIsSubmitting(true);

      try {
        const { error } = await supabase
          .from("elec_id_training_requests")
          .update({
            status: approve ? "approved" : "declined",
            responded_at: new Date().toISOString(),
          })
          .eq("id", requestId);

        if (error) {
          console.error("Error responding to training request:", error);
          toast({
            title: "Error",
            description: "Failed to respond to request.",
            variant: "destructive",
          });
          return false;
        }

        // If approved, add to worker's training records
        if (approve) {
          const request = requests.find((r) => r.id === requestId);
          if (request) {
            // Get worker's profile ID
            const { data: elecProfile } = await supabase
              .from("employer_elec_id_profiles")
              .select("id")
              .eq("employee_id", user.id)
              .single();

            if (elecProfile) {
              // Add to elec_id_training table
              await supabase.from("elec_id_training").insert({
                profile_id: elecProfile.id,
                course_name: request.training_name,
                provider: request.provider,
                completion_date: request.completed_date,
                certificate_url: request.certificate_url,
                verified: true,
                verified_at: new Date().toISOString(),
                verified_by: "employer_attestation",
              });
            }
          }
        }

        toast({
          title: approve ? "Training Approved" : "Training Declined",
          description: approve
            ? "Training record has been added to your Elec-ID profile."
            : "Training request has been declined.",
        });

        // Refresh the list
        await fetchRequests();
        return true;
      } catch (err) {
        console.error("Error responding to training request:", err);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [user?.id, requests, fetchRequests]
  );

  // Get pending requests count (for notifications)
  const getPendingCount = useCallback((): number => {
    return requests.filter((r) => r.status === "pending").length;
  }, [requests]);

  // Initial fetch
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    isLoading,
    isSubmitting,
    createRequest,
    respondToRequest,
    getPendingCount,
    refreshRequests: fetchRequests,
  };
}
