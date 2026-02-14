import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { SafetyPhoto } from "./useSafetyPhotos";

export interface PhotoProject {
  id: string;
  user_id: string;
  customer_id: string | null;
  name: string;
  description: string | null;
  job_reference: string | null;
  address: string | null;
  status: "active" | "completed" | "archived";
  created_at: string;
  updated_at: string;
  // Joined data (not in DB)
  photo_count?: number;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  photos?: SafetyPhoto[];
  type_counts?: Record<string, number>;
  thumbnail_urls?: string[];
}

export interface CreateProjectInput {
  name: string;
  customer_id?: string;
  description?: string;
  job_reference?: string;
  address?: string;
}

export interface UpdateProjectInput {
  name?: string;
  customer_id?: string | null;
  description?: string | null;
  job_reference?: string | null;
  address?: string | null;
  status?: "active" | "completed" | "archived";
}

export const PHOTO_TYPES = [
  {
    value: "safety",
    label: "Safety",
    colour: "bg-green-500",
    dotColour: "bg-green-400",
    icon: "🟢",
  },
  {
    value: "job_progress",
    label: "Job Progress",
    colour: "bg-blue-500",
    dotColour: "bg-blue-400",
    icon: "🔵",
  },
  {
    value: "completion",
    label: "Completion",
    colour: "bg-emerald-500",
    dotColour: "bg-emerald-400",
    icon: "✅",
  },
  {
    value: "snagging",
    label: "Snagging",
    colour: "bg-orange-500",
    dotColour: "bg-orange-400",
    icon: "🟠",
  },
  {
    value: "before",
    label: "Before",
    colour: "bg-indigo-500",
    dotColour: "bg-indigo-400",
    icon: "⬅",
  },
  {
    value: "after",
    label: "After",
    colour: "bg-purple-500",
    dotColour: "bg-purple-400",
    icon: "➡",
  },
  {
    value: "general",
    label: "General",
    colour: "bg-gray-500",
    dotColour: "bg-gray-400",
    icon: "⚪",
  },
] as const;

export function getPhotoTypeColour(type: string): string {
  return (
    PHOTO_TYPES.find((t) => t.value === type)?.dotColour || "bg-gray-400"
  );
}

export function getPhotoTypeLabel(type: string): string {
  return PHOTO_TYPES.find((t) => t.value === type)?.label || type;
}

export function usePhotoProjects(statusFilter?: string) {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  // Fetch projects with photo counts and customer info
  const projectsQuery = useQuery({
    queryKey: ["photo-projects", session?.user?.id, statusFilter],
    queryFn: async () => {
      if (!session?.user?.id) return [];

      try {
        // Fetch projects
        let query = supabase
          .from("photo_projects")
          .select("*")
          .eq("user_id", session.user.id)
          .order("updated_at", { ascending: false });

        if (statusFilter && statusFilter !== "all") {
          query = query.eq("status", statusFilter);
        }

        const { data: projects, error } = await query;
        if (error) {
          if (
            error.code === "42P01" ||
            error.message?.includes("does not exist")
          ) {
            return [];
          }
          throw error;
        }

        if (!projects || projects.length === 0) return [];

        // Fetch photo counts and thumbnails for each project
        const projectIds = projects.map((p) => p.id);
        const { data: photoData } = await supabase
          .from("safety_photos")
          .select("project_id, photo_type, file_url")
          .in("project_id", projectIds)
          .order("created_at", { ascending: false });

        // Fetch customer names for projects that have customer_id
        const customerIds = projects
          .map((p) => p.customer_id)
          .filter(Boolean) as string[];

        let customerMap = new Map<
          string,
          { name: string; email?: string; phone?: string }
        >();
        if (customerIds.length > 0) {
          const { data: customers } = await supabase
            .from("customers")
            .select("id, name, email, phone")
            .in("id", customerIds);
          if (customers) {
            customers.forEach((c) => {
              customerMap.set(c.id, {
                name: c.name,
                email: c.email,
                phone: c.phone,
              });
            });
          }
        }

        // Build enriched projects
        return projects.map((project) => {
          const projectPhotos = (photoData || []).filter(
            (p) => p.project_id === project.id,
          );
          const typeCounts: Record<string, number> = {};
          projectPhotos.forEach((p) => {
            const type = p.photo_type || "general";
            typeCounts[type] = (typeCounts[type] || 0) + 1;
          });

          const customer = project.customer_id
            ? customerMap.get(project.customer_id)
            : null;

          return {
            ...project,
            photo_count: projectPhotos.length,
            type_counts: typeCounts,
            thumbnail_urls: projectPhotos.slice(0, 4).map((p) => p.file_url),
            customer_name: customer?.name || null,
            customer_email: customer?.email || null,
            customer_phone: customer?.phone || null,
          } as PhotoProject;
        });
      } catch {
        return [];
      }
    },
    enabled: !!session?.user?.id,
  });

  // Get a single project with all its photos
  const getProjectWithPhotos = async (
    projectId: string,
  ): Promise<{ project: PhotoProject; photos: SafetyPhoto[] } | null> => {
    if (!session?.user?.id) return null;

    const { data: project, error: projError } = await supabase
      .from("photo_projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (projError || !project) return null;

    const { data: photos } = await supabase
      .from("safety_photos")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    // Get customer info
    let customer = null;
    if (project.customer_id) {
      const { data } = await supabase
        .from("customers")
        .select("id, name, email, phone")
        .eq("id", project.customer_id)
        .single();
      customer = data;
    }

    return {
      project: {
        ...project,
        photo_count: (photos || []).length,
        customer_name: customer?.name || null,
        customer_email: customer?.email || null,
        customer_phone: customer?.phone || null,
      } as PhotoProject,
      photos: (photos || []) as SafetyPhoto[],
    };
  };

  // Create project
  const createMutation = useMutation({
    mutationFn: async (input: CreateProjectInput) => {
      if (!session?.user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("photo_projects")
        .insert({
          user_id: session.user.id,
          name: input.name,
          customer_id: input.customer_id || null,
          description: input.description || null,
          job_reference: input.job_reference || null,
          address: input.address || null,
          status: "active",
        })
        .select()
        .single();

      if (error) throw error;
      return data as PhotoProject;
    },
    onSuccess: () => {
      toast({ title: "Project created" });
      queryClient.invalidateQueries({ queryKey: ["photo-projects"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update project
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateProjectInput;
    }) => {
      const { error } = await supabase
        .from("photo_projects")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Project updated" });
      queryClient.invalidateQueries({ queryKey: ["photo-projects"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Archive project
  const archiveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("photo_projects")
        .update({ status: "archived", updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Project archived" });
      queryClient.invalidateQueries({ queryKey: ["photo-projects"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Archive failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete project (only if no photos)
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Check for photos first
      const { count } = await supabase
        .from("safety_photos")
        .select("*", { count: "exact", head: true })
        .eq("project_id", id);

      if (count && count > 0) {
        throw new Error(
          "Cannot delete a project that has photos. Archive it instead.",
        );
      }

      const { error } = await supabase
        .from("photo_projects")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Project deleted" });
      queryClient.invalidateQueries({ queryKey: ["photo-projects"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Generate job reference suggestion
  const generateJobReference = (): string => {
    const year = new Date().getFullYear();
    const num = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
    return `JOB-${year}-${num}`;
  };

  return {
    projects: projectsQuery.data || [],
    isLoading: projectsQuery.isLoading,
    isError: projectsQuery.isError,
    refetch: projectsQuery.refetch,
    getProjectWithPhotos,
    createProject: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateProject: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    archiveProject: archiveMutation.mutate,
    deleteProject: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    generateJobReference,
  };
}
