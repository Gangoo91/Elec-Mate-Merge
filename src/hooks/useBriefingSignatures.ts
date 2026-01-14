import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type SignedVia = "manual" | "qr_code" | "app" | "link";

export interface BriefingAttendee {
  id: string;
  briefing_id: string;
  employee_id?: string;
  acknowledged: boolean;
  acknowledged_at?: string;
  signature_url?: string;
  signed_via: SignedVia;
  device_info?: string;
  location_lat?: number;
  location_lng?: number;
  photo_url?: string;
  guest_name?: string;
  guest_company?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
  };
}

export interface CreateAttendeeInput {
  briefing_id: string;
  employee_id?: string;
  guest_name?: string;
  guest_company?: string;
}

export interface SignOffInput {
  id: string;
  signature_url: string;
  signed_via?: SignedVia;
  device_info?: string;
  location_lat?: number;
  location_lng?: number;
  photo_url?: string;
  notes?: string;
}

// Fetch all attendees for a briefing
export function useBriefingAttendees(briefingId: string | undefined) {
  return useQuery({
    queryKey: ["briefing-attendees", briefingId],
    queryFn: async (): Promise<BriefingAttendee[]> => {
      if (!briefingId) return [];

      const { data, error } = await supabase
        .from("briefing_attendees")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("briefing_id", briefingId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as BriefingAttendee[];
    },
    enabled: !!briefingId,
  });
}

// Get attendee statistics for a briefing
export function useBriefingAttendeeStats(briefingId: string | undefined) {
  return useQuery({
    queryKey: ["briefing-attendees", briefingId, "stats"],
    queryFn: async () => {
      if (!briefingId) return null;

      const { data, error } = await supabase
        .from("briefing_attendees")
        .select("id, acknowledged")
        .eq("briefing_id", briefingId);

      if (error) throw error;

      return {
        total: data.length,
        signed: data.filter(a => a.acknowledged).length,
        pending: data.filter(a => !a.acknowledged).length,
        completionRate: data.length > 0
          ? Math.round((data.filter(a => a.acknowledged).length / data.length) * 100)
          : 0,
      };
    },
    enabled: !!briefingId,
  });
}

// Add an attendee to a briefing
export function useAddBriefingAttendee() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateAttendeeInput): Promise<BriefingAttendee> => {
      const { data, error } = await supabase
        .from("briefing_attendees")
        .insert({
          briefing_id: input.briefing_id,
          employee_id: input.employee_id,
          guest_name: input.guest_name,
          guest_company: input.guest_company,
          acknowledged: false,
          signed_via: "manual",
        })
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as BriefingAttendee;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["briefing-attendees", data.briefing_id] });
      const name = data.employee?.name || data.guest_name || "Attendee";
      toast({
        title: "Attendee added",
        description: `${name} has been added to the briefing.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Add multiple attendees at once
export function useAddBriefingAttendees() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ briefingId, employeeIds }: { briefingId: string; employeeIds: string[] }): Promise<BriefingAttendee[]> => {
      const inserts = employeeIds.map(employee_id => ({
        briefing_id: briefingId,
        employee_id,
        acknowledged: false,
        signed_via: "manual" as SignedVia,
      }));

      const { data, error } = await supabase
        .from("briefing_attendees")
        .insert(inserts)
        .select(`
          *,
          employee:employer_employees(id, name)
        `);

      if (error) throw error;
      return data as BriefingAttendee[];
    },
    onSuccess: (data) => {
      if (data.length > 0) {
        queryClient.invalidateQueries({ queryKey: ["briefing-attendees", data[0].briefing_id] });
      }
      toast({
        title: "Attendees added",
        description: `${data.length} attendees have been added to the briefing.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Remove an attendee from a briefing
export function useRemoveBriefingAttendee() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, briefingId }: { id: string; briefingId: string }): Promise<void> => {
      const { error } = await supabase
        .from("briefing_attendees")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["briefing-attendees", variables.briefingId] });
      toast({
        title: "Attendee removed",
        description: "The attendee has been removed from the briefing.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Sign off an attendee (capture signature)
export function useSignOffAttendee() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: SignOffInput): Promise<BriefingAttendee> => {
      const { data, error } = await supabase
        .from("briefing_attendees")
        .update({
          acknowledged: true,
          acknowledged_at: new Date().toISOString(),
          signature_url: input.signature_url,
          signed_via: input.signed_via || "manual",
          device_info: input.device_info,
          location_lat: input.location_lat,
          location_lng: input.location_lng,
          photo_url: input.photo_url,
          notes: input.notes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", input.id)
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as BriefingAttendee;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["briefing-attendees", data.briefing_id] });
      const name = data.employee?.name || data.guest_name || "Attendee";
      toast({
        title: "Signed off",
        description: `${name} has signed off on the briefing.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Sign off failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Upload signature image to storage and get URL
export function useUploadSignature() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ briefingId, attendeeId, signatureBlob }: {
      briefingId: string;
      attendeeId: string;
      signatureBlob: Blob;
    }): Promise<string> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileName = `signatures/${user.id}/${briefingId}/${attendeeId}-${Date.now()}.png`;

      const { data, error } = await supabase.storage
        .from("briefings")
        .upload(fileName, signatureBlob, {
          contentType: "image/png",
          upsert: true,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("briefings")
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Upload photo evidence
export function useUploadPhoto() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ briefingId, photoBlob }: {
      briefingId: string;
      photoBlob: Blob;
    }): Promise<string> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileName = `photos/${user.id}/${briefingId}/${Date.now()}.jpg`;

      const { data, error } = await supabase.storage
        .from("briefings")
        .upload(fileName, photoBlob, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("briefings")
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Generate QR code data for a briefing
export function generateBriefingQRData(briefingId: string): string {
  // This generates a URL that can be scanned to sign off
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return `${baseUrl}/briefing-signoff/${briefingId}`;
}

// Validate briefing access token (for QR code sign-off)
export function useBriefingByToken(token: string | undefined) {
  return useQuery({
    queryKey: ["briefing", "token", token],
    queryFn: async () => {
      if (!token) return null;

      // The token is the briefing ID for now (could be enhanced with JWT)
      const { data, error } = await supabase
        .from("briefings")
        .select(`
          *,
          attendees:briefing_attendees(
            *,
            employee:employer_employees(id, name)
          )
        `)
        .eq("id", token)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!token,
  });
}
