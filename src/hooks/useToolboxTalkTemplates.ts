import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ToolboxTalkCategory =
  | "electrical_safety"
  | "working_at_height"
  | "general_safety"
  | "tools_equipment"
  | "health_environment"
  | "domestic"
  | "commercial"
  | "seasonal";

export type RiskLevel = "low" | "medium" | "high";

export interface ToolboxTalkTemplate {
  id: string;
  category: ToolboxTalkCategory;
  name: string;
  summary?: string;
  content: string;
  risk_level: RiskLevel;
  duration_minutes: number;
  discussion_points?: string[];
  key_hazards?: string[];
  control_measures?: string[];
  legal_references?: string[];
  sort_order: number;
  is_active: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

// Get friendly name for category
export function getCategoryLabel(category: ToolboxTalkCategory): string {
  const labels: Record<ToolboxTalkCategory, string> = {
    electrical_safety: "Electrical Safety",
    working_at_height: "Working at Height",
    general_safety: "General Site Safety",
    tools_equipment: "Tools & Equipment",
    health_environment: "Health & Environment",
    domestic: "Domestic Work",
    commercial: "Commercial/Industrial",
    seasonal: "Seasonal/Topical",
  };
  return labels[category] || category;
}

// Get icon colour for category
export function getCategoryColour(category: ToolboxTalkCategory): string {
  const colours: Record<ToolboxTalkCategory, string> = {
    electrical_safety: "text-elec-yellow",
    working_at_height: "text-orange-400",
    general_safety: "text-blue-400",
    tools_equipment: "text-purple-400",
    health_environment: "text-green-400",
    domestic: "text-pink-400",
    commercial: "text-cyan-400",
    seasonal: "text-amber-400",
  };
  return colours[category] || "text-muted-foreground";
}

// Get risk level colour
export function getRiskLevelColour(level: RiskLevel): string {
  const colours: Record<RiskLevel, string> = {
    low: "text-green-400 bg-green-400/10",
    medium: "text-amber-400 bg-amber-400/10",
    high: "text-red-400 bg-red-400/10",
  };
  return colours[level] || "text-muted-foreground bg-muted";
}

// Fetch all active toolbox talk templates
export function useToolboxTalkTemplates() {
  return useQuery({
    queryKey: ["toolbox-talk-templates"],
    queryFn: async (): Promise<ToolboxTalkTemplate[]> => {
      const { data, error } = await supabase
        .from("toolbox_talk_templates")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as ToolboxTalkTemplate[];
    },
  });
}

// Fetch toolbox talk templates by category
export function useToolboxTalkTemplatesByCategory(category: ToolboxTalkCategory | undefined) {
  return useQuery({
    queryKey: ["toolbox-talk-templates", category],
    queryFn: async (): Promise<ToolboxTalkTemplate[]> => {
      if (!category) return [];

      const { data, error } = await supabase
        .from("toolbox_talk_templates")
        .select("*")
        .eq("is_active", true)
        .eq("category", category)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as ToolboxTalkTemplate[];
    },
    enabled: !!category,
  });
}

// Fetch a single toolbox talk template
export function useToolboxTalkTemplate(id: string | undefined) {
  return useQuery({
    queryKey: ["toolbox-talk-templates", id],
    queryFn: async (): Promise<ToolboxTalkTemplate | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("toolbox_talk_templates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as ToolboxTalkTemplate;
    },
    enabled: !!id,
  });
}

// Search toolbox talk templates
export function useSearchToolboxTalkTemplates(searchQuery: string) {
  return useQuery({
    queryKey: ["toolbox-talk-templates", "search", searchQuery],
    queryFn: async (): Promise<ToolboxTalkTemplate[]> => {
      if (!searchQuery.trim()) return [];

      const { data, error } = await supabase
        .from("toolbox_talk_templates")
        .select("*")
        .eq("is_active", true)
        .or(`name.ilike.%${searchQuery}%,summary.ilike.%${searchQuery}%`)
        .order("usage_count", { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as ToolboxTalkTemplate[];
    },
    enabled: searchQuery.trim().length >= 2,
  });
}

// Get template categories with counts
export function useToolboxTalkCategories() {
  return useQuery({
    queryKey: ["toolbox-talk-templates", "categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("toolbox_talk_templates")
        .select("category")
        .eq("is_active", true);

      if (error) throw error;

      // Count by category
      const counts: Record<string, number> = {};
      for (const item of data) {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }

      // Convert to array with labels
      const categories = Object.entries(counts).map(([category, count]) => ({
        category: category as ToolboxTalkCategory,
        label: getCategoryLabel(category as ToolboxTalkCategory),
        colour: getCategoryColour(category as ToolboxTalkCategory),
        count,
      }));

      // Sort by predefined order
      const order: ToolboxTalkCategory[] = [
        "electrical_safety",
        "working_at_height",
        "general_safety",
        "tools_equipment",
        "health_environment",
        "domestic",
        "commercial",
        "seasonal",
      ];

      return categories.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
    },
  });
}

// Increment usage count when a template is used
export function useIncrementTemplateUsage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.rpc("increment_toolbox_template_usage", { template_id: id });

      // If RPC doesn't exist, fall back to manual update
      if (error && error.code === "42883") {
        const { data: current } = await supabase
          .from("toolbox_talk_templates")
          .select("usage_count")
          .eq("id", id)
          .single();

        await supabase
          .from("toolbox_talk_templates")
          .update({ usage_count: (current?.usage_count || 0) + 1 })
          .eq("id", id);
      } else if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toolbox-talk-templates"] });
    },
  });
}

// Get popular templates (most used)
export function usePopularToolboxTalkTemplates(limit: number = 10) {
  return useQuery({
    queryKey: ["toolbox-talk-templates", "popular", limit],
    queryFn: async (): Promise<ToolboxTalkTemplate[]> => {
      const { data, error } = await supabase
        .from("toolbox_talk_templates")
        .select("*")
        .eq("is_active", true)
        .order("usage_count", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as ToolboxTalkTemplate[];
    },
  });
}
