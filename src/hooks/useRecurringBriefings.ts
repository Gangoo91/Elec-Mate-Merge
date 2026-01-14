import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { addDays, addWeeks, addMonths, format, parseISO } from "date-fns";

export type RecurringPattern = "daily" | "weekly" | "biweekly" | "monthly";

export interface RecurringBriefingConfig {
  briefingId: string;
  pattern: RecurringPattern;
  enabled: boolean;
}

// Calculate next date based on pattern
function getNextDate(currentDate: string, pattern: RecurringPattern): string {
  const date = parseISO(currentDate);

  switch (pattern) {
    case "daily":
      return format(addDays(date, 1), "yyyy-MM-dd");
    case "weekly":
      return format(addWeeks(date, 1), "yyyy-MM-dd");
    case "biweekly":
      return format(addWeeks(date, 2), "yyyy-MM-dd");
    case "monthly":
      return format(addMonths(date, 1), "yyyy-MM-dd");
    default:
      return format(addWeeks(date, 1), "yyyy-MM-dd");
  }
}

// Get human-readable pattern label
export function getPatternLabel(pattern: RecurringPattern): string {
  switch (pattern) {
    case "daily":
      return "Daily";
    case "weekly":
      return "Weekly";
    case "biweekly":
      return "Every 2 weeks";
    case "monthly":
      return "Monthly";
    default:
      return "Weekly";
  }
}

// Get pattern options for select
export const RECURRING_PATTERNS: Array<{ value: RecurringPattern; label: string }> = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Every 2 weeks" },
  { value: "monthly", label: "Monthly" },
];

/**
 * Enable recurring on a briefing
 */
export function useSetRecurring() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      briefingId,
      pattern,
      enabled,
    }: RecurringBriefingConfig): Promise<void> => {
      const { error } = await supabase
        .from("briefings")
        .update({
          recurring: enabled,
          recurring_pattern: enabled ? pattern : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", briefingId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      toast({
        title: variables.enabled ? "Recurring enabled" : "Recurring disabled",
        description: variables.enabled
          ? `This briefing will repeat ${getPatternLabel(variables.pattern).toLowerCase()}.`
          : "This briefing will no longer repeat.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

/**
 * Create next occurrence of a recurring briefing
 */
export function useCreateNextOccurrence() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (briefingId: string): Promise<string> => {
      // Get the parent briefing
      const { data: parentBriefing, error: fetchError } = await supabase
        .from("briefings")
        .select("*")
        .eq("id", briefingId)
        .single();

      if (fetchError) throw fetchError;
      if (!parentBriefing) throw new Error("Briefing not found");
      if (!parentBriefing.recurring || !parentBriefing.recurring_pattern) {
        throw new Error("Briefing is not set to recurring");
      }

      // Calculate next date
      const currentDate = parentBriefing.date || format(new Date(), "yyyy-MM-dd");
      const nextDate = getNextDate(currentDate, parentBriefing.recurring_pattern as RecurringPattern);

      // Create new briefing
      const { data: newBriefing, error: createError } = await supabase
        .from("briefings")
        .insert({
          user_id: parentBriefing.user_id,
          job_id: parentBriefing.job_id,
          title: parentBriefing.title,
          briefing_type: parentBriefing.briefing_type,
          content: parentBriefing.content,
          date: nextDate,
          time: parentBriefing.time,
          location: parentBriefing.location,
          presenter: parentBriefing.presenter,
          status: "Scheduled",
          template_id: parentBriefing.template_id,
          toolbox_template_id: parentBriefing.toolbox_template_id,
          recurring: true,
          recurring_pattern: parentBriefing.recurring_pattern,
          parent_briefing_id: parentBriefing.parent_briefing_id || briefingId,
          risk_level: parentBriefing.risk_level,
          duration_minutes: parentBriefing.duration_minutes,
          notes: parentBriefing.notes,
        })
        .select()
        .single();

      if (createError) throw createError;
      return newBriefing.id;
    },
    onSuccess: (newId) => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      toast({
        title: "Next briefing created",
        description: "The next occurrence has been scheduled.",
      });
      return newId;
    },
    onError: (error) => {
      toast({
        title: "Failed to create next occurrence",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

/**
 * Get all briefings in a recurring series
 */
export function useRecurringSeries(parentBriefingId: string | undefined) {
  return useQuery({
    queryKey: ["briefings", "recurring-series", parentBriefingId],
    queryFn: async () => {
      if (!parentBriefingId) return [];

      // Get the original parent ID (in case we're looking at a child)
      const { data: briefing, error: briefingError } = await supabase
        .from("briefings")
        .select("id, parent_briefing_id")
        .eq("id", parentBriefingId)
        .single();

      if (briefingError) throw briefingError;

      const rootId = briefing.parent_briefing_id || briefing.id;

      // Get all briefings in the series
      const { data, error } = await supabase
        .from("briefings")
        .select("*")
        .or(`id.eq.${rootId},parent_briefing_id.eq.${rootId}`)
        .order("date", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!parentBriefingId,
  });
}

/**
 * Check if any recurring briefings need their next occurrence created
 * This should be called when a briefing is marked as "Completed"
 */
export function useCheckRecurringNeedsNext() {
  const createNext = useCreateNextOccurrence();

  return async (briefingId: string) => {
    // Get the briefing
    const { data: briefing, error } = await supabase
      .from("briefings")
      .select("id, recurring, recurring_pattern, date, status")
      .eq("id", briefingId)
      .single();

    if (error || !briefing) return false;

    // If it's recurring and being completed, check if next one exists
    if (briefing.recurring && briefing.recurring_pattern && briefing.status === "Completed") {
      const nextDate = getNextDate(
        briefing.date || format(new Date(), "yyyy-MM-dd"),
        briefing.recurring_pattern as RecurringPattern
      );

      // Check if next occurrence already exists
      const { data: existing, error: existError } = await supabase
        .from("briefings")
        .select("id")
        .eq("parent_briefing_id", briefing.id)
        .eq("date", nextDate)
        .single();

      if (!existError && existing) {
        // Already exists
        return false;
      }

      // Create next occurrence
      await createNext.mutateAsync(briefingId);
      return true;
    }

    return false;
  };
}

/**
 * Hook to update briefing status and auto-create next if recurring
 */
export function useCompleteBriefingWithRecurring() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const checkRecurring = useCheckRecurringNeedsNext();

  return useMutation({
    mutationFn: async (briefingId: string): Promise<{ nextCreated: boolean }> => {
      // Update status to Completed
      const { error } = await supabase
        .from("briefings")
        .update({
          status: "Completed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", briefingId);

      if (error) throw error;

      // Check if we need to create next occurrence
      const nextCreated = await checkRecurring(briefingId);
      return { nextCreated };
    },
    onSuccess: ({ nextCreated }) => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      toast({
        title: "Briefing completed",
        description: nextCreated
          ? "Next recurring briefing has been scheduled."
          : "Briefing marked as completed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to complete",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
