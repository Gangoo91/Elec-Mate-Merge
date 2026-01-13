import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type PhotoCategory = "Before" | "During" | "After" | "Completion" | "Issue";

export interface JobPhoto {
  id: string;
  user_id: string;
  job_id?: string;
  filename: string;
  category: PhotoCategory;
  notes?: string;
  uploaded_by?: string;
  location_lat?: number;
  location_lng?: number;
  location_address?: string;
  approved: boolean;
  shared_with_client: boolean;
  storage_path?: string;
  progress_log_id?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  job?: {
    id: string;
    title: string;
    client: string;
  };
  uploader?: {
    id: string;
    name: string;
  };
}

// Extended interface for UI display (compatible with existing components)
export interface JobPhotoDisplay extends JobPhoto {
  jobId: string;
  jobTitle: string;
  uploadedBy: string;
  uploadedById: string;
  timestamp: string;
  location?: {
    lat?: number;
    lng?: number;
    address?: string;
  };
  sharedWithClient: boolean;
}

export type CreateJobPhotoInput = Omit<JobPhoto, "id" | "user_id" | "created_at" | "updated_at" | "job" | "uploader">;
export type UpdateJobPhotoInput = Partial<CreateJobPhotoInput>;

// Transform database record to display format
function toDisplayFormat(photo: JobPhoto): JobPhotoDisplay {
  return {
    ...photo,
    jobId: photo.job_id || "",
    jobTitle: photo.job?.title || "Unknown Job",
    uploadedBy: photo.uploader?.name || "Unknown",
    uploadedById: photo.uploaded_by || "",
    timestamp: photo.created_at,
    location: photo.location_lat && photo.location_lng ? {
      lat: photo.location_lat,
      lng: photo.location_lng,
      address: photo.location_address,
    } : undefined,
    sharedWithClient: photo.shared_with_client,
  };
}

// Fetch all job photos for the current user
export function useJobPhotos() {
  return useQuery({
    queryKey: ["jobPhotos"],
    queryFn: async (): Promise<JobPhotoDisplay[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_photos")
        .select(`
          *,
          job:employer_jobs(id, title, client),
          uploader:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as JobPhoto[]).map(toDisplayFormat);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Fetch photos for a specific job
export function useJobPhotosByJob(jobId: string | undefined) {
  return useQuery({
    queryKey: ["jobPhotos", "job", jobId],
    queryFn: async (): Promise<JobPhotoDisplay[]> => {
      if (!jobId) return [];

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_photos")
        .select(`
          *,
          job:employer_jobs(id, title, client),
          uploader:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as JobPhoto[]).map(toDisplayFormat);
    },
    enabled: !!jobId,
  });
}

// Fetch photos by category
export function useJobPhotosByCategory(category: PhotoCategory) {
  return useQuery({
    queryKey: ["jobPhotos", "category", category],
    queryFn: async (): Promise<JobPhotoDisplay[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_photos")
        .select(`
          *,
          job:employer_jobs(id, title, client),
          uploader:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .eq("category", category)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as JobPhoto[]).map(toDisplayFormat);
    },
  });
}

// Get photo statistics
export function useJobPhotoStats() {
  return useQuery({
    queryKey: ["jobPhotos", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_photos")
        .select("id, category, approved, shared_with_client")
        .eq("user_id", user.id);

      if (error) throw error;

      const stats = {
        total: data.length,
        approved: data.filter(p => p.approved).length,
        shared: data.filter(p => p.shared_with_client).length,
        issues: data.filter(p => p.category === "Issue").length,
        before: data.filter(p => p.category === "Before").length,
        during: data.filter(p => p.category === "During").length,
        after: data.filter(p => p.category === "After").length,
        completion: data.filter(p => p.category === "Completion").length,
      };

      return stats;
    },
  });
}

// Upload a photo file to storage and create database record
export function useUploadJobPhoto() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      file,
      jobId,
      category,
      notes,
      uploadedBy,
      location,
    }: {
      file: File;
      jobId?: string;
      category: PhotoCategory;
      notes?: string;
      uploadedBy?: string;
      location?: { lat: number; lng: number; address?: string };
    }): Promise<JobPhoto> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const timestamp = Date.now();
      const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const storagePath = `${user.id}/job-photos/${filename}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("job-photos")
        .upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        // If bucket doesn't exist, create a fallback URL
        if (uploadError.message.includes("not found")) {
          console.warn("Storage bucket 'job-photos' not found, storing reference only");
        } else {
          throw uploadError;
        }
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("job-photos")
        .getPublicUrl(storagePath);

      // Create database record
      const { data, error } = await supabase
        .from("job_photos")
        .insert({
          user_id: user.id,
          job_id: jobId || null,
          filename: urlData?.publicUrl || filename,
          category,
          notes: notes || null,
          uploaded_by: uploadedBy || null,
          location_lat: location?.lat || null,
          location_lng: location?.lng || null,
          location_address: location?.address || null,
          approved: false,
          shared_with_client: false,
          storage_path: storagePath,
        })
        .select(`
          *,
          job:employer_jobs(id, title, client),
          uploader:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobPhoto;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPhotos"] });
      toast({
        title: "Photo uploaded",
        description: "The photo has been saved successfully.",
      });
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

// Create a new job photo (metadata only, for when file is already uploaded)
export function useCreateJobPhoto() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateJobPhotoInput): Promise<JobPhoto> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_photos")
        .insert({ ...input, user_id: user.id })
        .select(`
          *,
          job:employer_jobs(id, title, client),
          uploader:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobPhoto;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPhotos"] });
      toast({
        title: "Photo uploaded",
        description: "The photo has been saved successfully.",
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

// Update a job photo
export function useUpdateJobPhoto() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateJobPhotoInput & { id: string }): Promise<JobPhoto> => {
      const { data, error } = await supabase
        .from("job_photos")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client),
          uploader:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobPhoto;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPhotos"] });
      toast({
        title: "Photo updated",
        description: "The photo has been updated successfully.",
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

// Toggle photo approval
export function useTogglePhotoApproval() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<JobPhoto> => {
      // Get current state first
      const { data: current, error: fetchError } = await supabase
        .from("job_photos")
        .select("approved")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      const { data, error } = await supabase
        .from("job_photos")
        .update({
          approved: !current.approved,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client),
          uploader:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobPhoto;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPhotos"] });
    },
  });
}

// Toggle photo sharing
export function useTogglePhotoSharing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<JobPhoto> => {
      // Get current state first
      const { data: current, error: fetchError } = await supabase
        .from("job_photos")
        .select("shared_with_client")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      const { data, error } = await supabase
        .from("job_photos")
        .update({
          shared_with_client: !current.shared_with_client,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client),
          uploader:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobPhoto;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPhotos"] });
    },
  });
}

// Delete a job photo
export function useDeleteJobPhoto() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("job_photos")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPhotos"] });
      toast({
        title: "Photo deleted",
        description: "The photo has been removed.",
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
