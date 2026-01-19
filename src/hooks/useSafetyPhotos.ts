import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export interface SafetyPhoto {
  id: string;
  filename: string;
  file_url: string;
  description: string;
  category: string;
  location: string | null;
  tags: string[] | null;
  gps_latitude: number | null;
  gps_longitude: number | null;
  file_size: number | null;
  mime_type: string | null;
  folder_name: string | null;
  project_reference: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface PhotoFilters {
  category?: string;
  search?: string;
  project?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export const PHOTO_CATEGORIES = [
  { value: "before_work", label: "Before Work", color: "bg-blue-500", icon: "📋" },
  { value: "after_work", label: "After Work", color: "bg-green-500", icon: "✅" },
  { value: "safety_procedure", label: "Safety Procedure", color: "bg-yellow-500", icon: "⚠️" },
  { value: "hazard_identification", label: "Hazard ID", color: "bg-red-500", icon: "🚨" },
  { value: "ppe_compliance", label: "PPE Compliance", color: "bg-purple-500", icon: "🦺" },
  { value: "equipment_check", label: "Equipment Check", color: "bg-orange-500", icon: "🔧" },
  { value: "site_condition", label: "Site Condition", color: "bg-cyan-500", icon: "🏗️" },
  { value: "other", label: "Other", color: "bg-gray-500", icon: "📷" },
] as const;

export function useSafetyPhotos(filters?: PhotoFilters) {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all photos
  const photosQuery = useQuery({
    queryKey: ["safety-photos", session?.user?.id, filters],
    queryFn: async () => {
      if (!session?.user?.id) return [];

      let query = supabase
        .from("safety_photos")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      // Apply filters
      if (filters?.category && filters.category !== "all") {
        query = query.eq("category", filters.category);
      }
      if (filters?.project) {
        query = query.eq("project_reference", filters.project);
      }
      if (filters?.dateFrom) {
        query = query.gte("created_at", filters.dateFrom.toISOString());
      }
      if (filters?.dateTo) {
        query = query.lte("created_at", filters.dateTo.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;

      // Client-side search filter
      let photos = data as SafetyPhoto[];
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        photos = photos.filter(
          (p) =>
            p.description?.toLowerCase().includes(searchLower) ||
            p.location?.toLowerCase().includes(searchLower) ||
            p.tags?.some((t) => t.toLowerCase().includes(searchLower))
        );
      }

      return photos;
    },
    enabled: !!session?.user?.id,
  });

  // Get unique projects
  const projectsQuery = useQuery({
    queryKey: ["safety-photo-projects", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];

      const { data, error } = await supabase
        .from("safety_photos")
        .select("project_reference, created_at")
        .eq("user_id", session.user.id)
        .not("project_reference", "is", null)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Group by project and count
      const projectMap = new Map<string, { count: number; lastUpdated: string }>();
      data.forEach((row) => {
        if (row.project_reference) {
          const existing = projectMap.get(row.project_reference);
          if (existing) {
            existing.count++;
            if (row.created_at > existing.lastUpdated) {
              existing.lastUpdated = row.created_at;
            }
          } else {
            projectMap.set(row.project_reference, {
              count: 1,
              lastUpdated: row.created_at,
            });
          }
        }
      });

      return Array.from(projectMap.entries()).map(([name, data]) => ({
        name,
        count: data.count,
        lastUpdated: data.lastUpdated,
      }));
    },
    enabled: !!session?.user?.id,
  });

  // Get stats by category
  const statsQuery = useQuery({
    queryKey: ["safety-photo-stats", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return { total: 0, byCategory: {} };

      const { data, error } = await supabase
        .from("safety_photos")
        .select("category")
        .eq("user_id", session.user.id);

      if (error) throw error;

      const byCategory: Record<string, number> = {};
      data.forEach((row) => {
        byCategory[row.category] = (byCategory[row.category] || 0) + 1;
      });

      return {
        total: data.length,
        byCategory,
      };
    },
    enabled: !!session?.user?.id,
  });

  // Delete photo mutation
  const deleteMutation = useMutation({
    mutationFn: async (photo: SafetyPhoto) => {
      // Delete from storage
      const filePath = photo.file_url.split("/safety-photos/")[1];
      if (filePath) {
        await supabase.storage.from("safety-photos").remove([filePath]);
      }
      // Delete record
      const { error } = await supabase.from("safety_photos").delete().eq("id", photo.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Photo deleted" });
      queryClient.invalidateQueries({ queryKey: ["safety-photos"] });
      queryClient.invalidateQueries({ queryKey: ["safety-photo-stats"] });
      queryClient.invalidateQueries({ queryKey: ["safety-photo-projects"] });
    },
    onError: (error: any) => {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    },
  });

  // Update photo mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Pick<SafetyPhoto, "description" | "category" | "location" | "tags" | "project_reference">>;
    }) => {
      const { error } = await supabase
        .from("safety_photos")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Photo updated" });
      queryClient.invalidateQueries({ queryKey: ["safety-photos"] });
    },
    onError: (error: any) => {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    },
  });

  return {
    photos: photosQuery.data || [],
    projects: projectsQuery.data || [],
    stats: statsQuery.data || { total: 0, byCategory: {} },
    isLoading: photosQuery.isLoading,
    isError: photosQuery.isError,
    refetch: photosQuery.refetch,
    deletePhoto: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    updatePhoto: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}

// Helper functions
export function getCategoryColor(category: string): string {
  return PHOTO_CATEGORIES.find((c) => c.value === category)?.color || "bg-gray-500";
}

export function getCategoryLabel(category: string): string {
  return PHOTO_CATEGORIES.find((c) => c.value === category)?.label || category;
}

export function getCategoryIcon(category: string): string {
  return PHOTO_CATEGORIES.find((c) => c.value === category)?.icon || "📷";
}
