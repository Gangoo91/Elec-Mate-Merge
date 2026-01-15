import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Types
export interface PortalData {
  id: string;
  job_id: string;
  client_name: string;
  permissions: PortalPermissions;
  is_active: boolean;
  job_title: string;
  job_status: string;
  job_address: string;
  job_start_date: string | null;
  job_end_date: string | null;
  job_progress: number;
  company_name: string;
}

export interface PortalPermissions {
  showProgress: boolean;
  showPhotos: boolean;
  showTimeline: boolean;
  showIssues: boolean;
  allowMessages: boolean;
  showBeforePhotos: boolean;
  showDuringPhotos: boolean;
  showAfterPhotos: boolean;
  showCompletionPhotos: boolean;
  showIssuePhotos: boolean;
}

export interface ProgressLog {
  id: string;
  log_date: string;
  work_completed: string | null;
  work_planned: string | null;
  issues_encountered: string | null;
  weather: string | null;
  workers_on_site: number | null;
  created_at: string;
}

export interface PortalPhoto {
  id: string;
  storage_path: string;
  filename: string;
  category: string;
  notes: string | null;
  created_at: string;
  url?: string;
}

export interface PortalMessage {
  id: string;
  message: string;
  sender_type: "client" | "employer";
  created_at: string;
  read_at: string | null;
}

// Fetch portal data by token
export function usePortalData(token: string | undefined) {
  return useQuery({
    queryKey: ["portal", token],
    queryFn: async (): Promise<PortalData | null> => {
      if (!token) return null;

      const { data, error } = await supabase.rpc("get_portal_by_token", {
        p_token: token,
      });

      if (error) {
        console.error("Error fetching portal:", error);
        throw error;
      }

      if (!data || data.length === 0) {
        return null;
      }

      // Transform the response
      const row = data[0];
      return {
        id: row.id,
        job_id: row.job_id,
        client_name: row.client_name,
        permissions: row.permissions as PortalPermissions,
        is_active: row.is_active,
        job_title: row.job_title,
        job_status: row.job_status,
        job_address: row.job_address,
        job_start_date: row.job_start_date,
        job_end_date: row.job_end_date,
        job_progress: row.job_progress || 0,
        company_name: row.company_name || "Your Contractor",
      };
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}

// Fetch progress logs for portal
export function usePortalProgressLogs(token: string | undefined) {
  return useQuery({
    queryKey: ["portal-progress-logs", token],
    queryFn: async (): Promise<ProgressLog[]> => {
      if (!token) return [];

      const { data, error } = await supabase.rpc("get_portal_progress_logs", {
        p_token: token,
      });

      if (error) {
        console.error("Error fetching progress logs:", error);
        return [];
      }

      return (data || []).map((row: Record<string, unknown>) => ({
        id: row.id as string,
        log_date: row.log_date as string,
        work_completed: row.work_completed as string | null,
        work_planned: row.work_planned as string | null,
        issues_encountered: row.issues_encountered as string | null,
        weather: row.weather as string | null,
        workers_on_site: row.workers_on_site as number | null,
        created_at: row.created_at as string,
      }));
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Fetch photos for portal
export function usePortalPhotos(token: string | undefined) {
  return useQuery({
    queryKey: ["portal-photos", token],
    queryFn: async (): Promise<PortalPhoto[]> => {
      if (!token) return [];

      const { data, error } = await supabase.rpc("get_portal_photos", {
        p_token: token,
      });

      if (error) {
        console.error("Error fetching photos:", error);
        return [];
      }

      // Get public URLs for photos
      const photos = await Promise.all(
        (data || []).map(async (row: Record<string, unknown>) => {
          let url = "";
          if (row.storage_path) {
            const { data: urlData } = supabase.storage
              .from("visual-uploads")
              .getPublicUrl(row.storage_path as string);
            url = urlData?.publicUrl || "";
          }

          return {
            id: row.id as string,
            storage_path: row.storage_path as string,
            filename: row.filename as string,
            category: row.category as string,
            notes: row.notes as string | null,
            created_at: row.created_at as string,
            url,
          };
        })
      );

      return photos;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Fetch messages for portal
export function usePortalMessages(token: string | undefined) {
  return useQuery({
    queryKey: ["portal-messages", token],
    queryFn: async (): Promise<PortalMessage[]> => {
      if (!token) return [];

      const { data, error } = await supabase.rpc("get_portal_messages", {
        p_token: token,
      });

      if (error) {
        console.error("Error fetching messages:", error);
        return [];
      }

      return (data || []).map((row: Record<string, unknown>) => ({
        id: row.id as string,
        message: row.message as string,
        sender_type: row.sender_type as "client" | "employer",
        created_at: row.created_at as string,
        read_at: row.read_at as string | null,
      }));
    },
    enabled: !!token,
    staleTime: 1000 * 30, // 30 seconds for messages
    refetchInterval: 1000 * 30, // Poll every 30 seconds
  });
}

// Send message mutation
export function useSendPortalMessage(token: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: string) => {
      if (!token) throw new Error("No token provided");

      const { data, error } = await supabase.rpc("send_portal_message", {
        p_token: token,
        p_message: message,
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-messages", token] });
    },
  });
}
