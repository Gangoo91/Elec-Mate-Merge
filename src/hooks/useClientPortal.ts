import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

export interface ClientPortalLink {
  id: string;
  user_id: string;
  job_id: string;
  client_name: string;
  client_email?: string;
  access_token: string;
  permissions: PortalPermissions;
  is_active: boolean;
  last_accessed_at?: string;
  expires_at?: string;
  views_count: number;
  created_at: string;
  updated_at: string;
  // Joined data
  job?: {
    id: string;
    title: string;
    client: string;
    progress: number;
    status: string;
    start_date?: string;
    end_date?: string;
  };
}

export type CreatePortalLinkInput = {
  job_id: string;
  client_name: string;
  client_email?: string;
  permissions?: Partial<PortalPermissions>;
  expires_at?: string;
};

export type UpdatePortalLinkInput = {
  client_name?: string;
  client_email?: string;
  permissions?: Partial<PortalPermissions>;
  is_active?: boolean;
  expires_at?: string;
};

const defaultPermissions: PortalPermissions = {
  showProgress: true,
  showPhotos: true,
  showTimeline: true,
  showIssues: false,
  allowMessages: true,
  showBeforePhotos: true,
  showDuringPhotos: true,
  showAfterPhotos: true,
  showCompletionPhotos: true,
  showIssuePhotos: false,
};

// Fetch all portal links for the current user
export function useClientPortalLinks() {
  return useQuery({
    queryKey: ["clientPortalLinks"],
    queryFn: async (): Promise<ClientPortalLink[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("client_portal_links")
        .select(`
          *,
          job:employer_jobs(id, title, client, progress, status, start_date, end_date)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ClientPortalLink[];
    },
  });
}

// Fetch portal link for a specific job
export function usePortalLinkByJob(jobId: string | undefined) {
  return useQuery({
    queryKey: ["clientPortalLinks", "job", jobId],
    queryFn: async (): Promise<ClientPortalLink | null> => {
      if (!jobId) return null;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("client_portal_links")
        .select(`
          *,
          job:employer_jobs(id, title, client, progress, status, start_date, end_date)
        `)
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .maybeSingle();

      if (error) throw error;
      return data as ClientPortalLink | null;
    },
    enabled: !!jobId,
  });
}

// Get portal statistics
export function usePortalStats() {
  return useQuery({
    queryKey: ["clientPortalLinks", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("client_portal_links")
        .select("id, is_active, views_count, last_accessed_at")
        .eq("user_id", user.id);

      if (error) throw error;

      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const stats = {
        total: data.length,
        active: data.filter(l => l.is_active).length,
        inactive: data.filter(l => !l.is_active).length,
        totalViews: data.reduce((sum, l) => sum + (l.views_count || 0), 0),
        recentlyViewed: data.filter(l => l.last_accessed_at && l.last_accessed_at > sevenDaysAgo).length,
      };

      return stats;
    },
  });
}

// Create a new portal link
export function useCreatePortalLink() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreatePortalLinkInput): Promise<ClientPortalLink> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const permissions = {
        ...defaultPermissions,
        ...input.permissions,
      };

      const { data, error } = await supabase
        .from("client_portal_links")
        .insert({
          user_id: user.id,
          job_id: input.job_id,
          client_name: input.client_name,
          client_email: input.client_email,
          permissions,
          expires_at: input.expires_at,
        })
        .select(`
          *,
          job:employer_jobs(id, title, client, progress, status, start_date, end_date)
        `)
        .single();

      if (error) throw error;
      return data as ClientPortalLink;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["clientPortalLinks"] });
      toast({
        title: "Portal link created",
        description: `Link created for ${data.client_name}.`,
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

// Update a portal link
export function useUpdatePortalLink() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdatePortalLinkInput & { id: string }): Promise<ClientPortalLink> => {
      // If updating permissions, merge with existing
      let updateData: Record<string, unknown> = {
        ...input,
        updated_at: new Date().toISOString(),
      };

      if (input.permissions) {
        // Get current permissions first
        const { data: current, error: fetchError } = await supabase
          .from("client_portal_links")
          .select("permissions")
          .eq("id", id)
          .single();

        if (fetchError) throw fetchError;

        updateData.permissions = {
          ...(current.permissions as PortalPermissions),
          ...input.permissions,
        };
      }

      const { data, error } = await supabase
        .from("client_portal_links")
        .update(updateData)
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client, progress, status, start_date, end_date)
        `)
        .single();

      if (error) throw error;
      return data as ClientPortalLink;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientPortalLinks"] });
      toast({
        title: "Portal updated",
        description: "The portal settings have been saved.",
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

// Update portal permissions
export function useUpdatePortalPermissions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, permissions }: { id: string; permissions: Partial<PortalPermissions> }): Promise<ClientPortalLink> => {
      // Get current permissions first
      const { data: current, error: fetchError } = await supabase
        .from("client_portal_links")
        .select("permissions")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      const newPermissions = {
        ...(current.permissions as PortalPermissions),
        ...permissions,
      };

      const { data, error } = await supabase
        .from("client_portal_links")
        .update({
          permissions: newPermissions,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client, progress, status, start_date, end_date)
        `)
        .single();

      if (error) throw error;
      return data as ClientPortalLink;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientPortalLinks"] });
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

// Regenerate access token
export function useRegenerateToken() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<ClientPortalLink> => {
      // Generate new token on the server side by updating with a random value
      // The default value will be generated by the database
      const { data, error } = await supabase.rpc("regenerate_portal_token", { link_id: id });

      // If the RPC doesn't exist, fall back to manual update
      if (error && error.code === "42883") {
        // Generate token client-side as fallback
        const newToken = Array.from(crypto.getRandomValues(new Uint8Array(24)))
          .map(b => b.toString(16).padStart(2, "0"))
          .join("");

        const { data: updated, error: updateError } = await supabase
          .from("client_portal_links")
          .update({
            access_token: newToken,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select(`
            *,
            job:employer_jobs(id, title, client, progress, status, start_date, end_date)
          `)
          .single();

        if (updateError) throw updateError;
        return updated as ClientPortalLink;
      }

      if (error) throw error;

      // Fetch the updated record
      const { data: updated, error: fetchError } = await supabase
        .from("client_portal_links")
        .select(`
          *,
          job:employer_jobs(id, title, client, progress, status, start_date, end_date)
        `)
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;
      return updated as ClientPortalLink;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientPortalLinks"] });
      toast({
        title: "Link refreshed",
        description: "A new secure portal link has been generated.",
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

// Toggle portal active status
export function useTogglePortalActive() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }): Promise<ClientPortalLink> => {
      const { data, error } = await supabase
        .from("client_portal_links")
        .update({
          is_active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client, progress, status, start_date, end_date)
        `)
        .single();

      if (error) throw error;
      return data as ClientPortalLink;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["clientPortalLinks"] });
      toast({
        title: data.is_active ? "Portal activated" : "Portal deactivated",
        description: data.is_active
          ? "The client portal link is now active."
          : "The client portal link has been disabled.",
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

// Delete a portal link
export function useDeletePortalLink() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("client_portal_links")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientPortalLinks"] });
      toast({
        title: "Portal link deleted",
        description: "The portal link has been removed.",
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
