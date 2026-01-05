import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAutomationRules,
  getAutomationRule,
  toggleAutomationRule,
  createAutomationRule,
  updateAutomationRule,
  deleteAutomationRule,
  getAutomationLogs,
  getAutomationStats,
  runAutomationRule,
  type AutomationRule,
  type AutomationLog,
  type AutomationStats,
} from "@/services/automationService";
import { toast } from "@/hooks/use-toast";

export function useAutomationRules() {
  return useQuery<AutomationRule[]>({
    queryKey: ["automation-rules"],
    queryFn: getAutomationRules,
  });
}

export function useAutomationRule(id: string | null) {
  return useQuery<AutomationRule | null>({
    queryKey: ["automation-rule", id],
    queryFn: () => (id ? getAutomationRule(id) : null),
    enabled: !!id,
  });
}

export function useToggleAutomation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      toggleAutomationRule(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automation-rules"] });
      queryClient.invalidateQueries({ queryKey: ["automation-stats"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to toggle automation: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

export function useCreateAutomation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAutomationRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automation-rules"] });
      queryClient.invalidateQueries({ queryKey: ["automation-stats"] });
      toast({
        title: "Automation Created",
        description: "Your new automation rule has been created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create automation: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateAutomation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof updateAutomationRule>[1] }) =>
      updateAutomationRule(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automation-rules"] });
      toast({
        title: "Automation Updated",
        description: "Your automation rule has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update automation: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteAutomation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAutomationRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automation-rules"] });
      queryClient.invalidateQueries({ queryKey: ["automation-stats"] });
      toast({
        title: "Automation Deleted",
        description: "The automation rule has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete automation: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

export function useAutomationLogs(options?: {
  ruleId?: string;
  status?: 'success' | 'failed' | 'partial';
  limit?: number;
}) {
  return useQuery<AutomationLog[]>({
    queryKey: ["automation-logs", options],
    queryFn: () => getAutomationLogs(options),
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useAutomationStats() {
  return useQuery<AutomationStats>({
    queryKey: ["automation-stats"],
    queryFn: getAutomationStats,
  });
}

export function useRunAutomation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: runAutomationRule,
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["automation-rules"] });
        queryClient.invalidateQueries({ queryKey: ["automation-logs"] });
        queryClient.invalidateQueries({ queryKey: ["automation-stats"] });
        toast({
          title: "Automation Executed",
          description: "The automation rule has been run successfully.",
        });
      } else {
        toast({
          title: "Automation Failed",
          description: result.error || "The automation failed to run.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to run automation: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}
