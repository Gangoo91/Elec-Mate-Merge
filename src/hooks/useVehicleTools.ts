import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type ToolCategory = "test_equipment" | "power_tools" | "hand_tools" | "safety" | "consumables";
export type ToolCondition = "good" | "fair" | "needs_repair" | "out_of_service";

export interface VehicleTool {
  id: string;
  user_id: string;
  vehicle_id: string;
  name: string;
  category?: ToolCategory;
  make?: string;
  model?: string;
  serial_number?: string;
  value?: number;
  calibration_due?: string;
  pat_test_due?: string;
  condition: ToolCondition;
  notes?: string;
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

export type CreateToolInput = Omit<VehicleTool, "id" | "user_id" | "created_at" | "updated_at">;
export type UpdateToolInput = Partial<CreateToolInput>;

export const TOOL_CATEGORIES: Array<{ value: ToolCategory; label: string }> = [
  { value: "test_equipment", label: "Test Equipment" },
  { value: "power_tools", label: "Power Tools" },
  { value: "hand_tools", label: "Hand Tools" },
  { value: "safety", label: "Safety Equipment" },
  { value: "consumables", label: "Consumables" },
];

export const TOOL_CONDITIONS: Array<{ value: ToolCondition; label: string }> = [
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "needs_repair", label: "Needs Repair" },
  { value: "out_of_service", label: "Out of Service" },
];

// Fetch tools for a specific vehicle
export function useVehicleTools(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ["vehicleTools", vehicleId],
    queryFn: async (): Promise<VehicleTool[]> => {
      if (!vehicleId) return [];

      const { data, error } = await supabase
        .from("vehicle_tools")
        .select("*")
        .eq("vehicle_id", vehicleId)
        .order("category", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;
      return data as VehicleTool[];
    },
    enabled: !!vehicleId,
  });
}

// Fetch all tools for the current user (across all vehicles)
export function useAllTools() {
  return useQuery({
    queryKey: ["allTools"],
    queryFn: async (): Promise<VehicleTool[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("vehicle_tools")
        .select("*")
        .eq("user_id", user.id)
        .order("name", { ascending: true });

      if (error) throw error;
      return data as VehicleTool[];
    },
  });
}

// Get tool stats for a vehicle
export function useToolStats(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ["toolStats", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return null;

      const { data, error } = await supabase
        .from("vehicle_tools")
        .select("value, calibration_due, pat_test_due, condition")
        .eq("vehicle_id", vehicleId);

      if (error) throw error;

      const today = new Date().toISOString().split("T")[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      return {
        totalCount: data.length,
        totalValue: data.reduce((sum, t) => sum + (t.value || 0), 0),
        calibrationDue: data.filter(t => t.calibration_due && t.calibration_due <= thirtyDaysFromNow).length,
        patDue: data.filter(t => t.pat_test_due && t.pat_test_due <= thirtyDaysFromNow).length,
        needsRepair: data.filter(t => t.condition === "needs_repair" || t.condition === "out_of_service").length,
      };
    },
    enabled: !!vehicleId,
  });
}

// Create a new tool
export function useCreateTool() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateToolInput): Promise<VehicleTool> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("vehicle_tools")
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data as VehicleTool;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicleTools", data.vehicle_id] });
      queryClient.invalidateQueries({ queryKey: ["toolStats", data.vehicle_id] });
      queryClient.invalidateQueries({ queryKey: ["allTools"] });
      toast({
        title: "Tool added",
        description: `${data.name} has been added to the vehicle.`,
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

// Update a tool
export function useUpdateTool() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateToolInput & { id: string }): Promise<VehicleTool> => {
      const { data, error } = await supabase
        .from("vehicle_tools")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as VehicleTool;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicleTools", data.vehicle_id] });
      queryClient.invalidateQueries({ queryKey: ["toolStats", data.vehicle_id] });
      queryClient.invalidateQueries({ queryKey: ["allTools"] });
      toast({
        title: "Tool updated",
        description: "The tool has been updated successfully.",
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

// Delete a tool
export function useDeleteTool() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, vehicleId }: { id: string; vehicleId: string }): Promise<void> => {
      const { error } = await supabase
        .from("vehicle_tools")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["vehicleTools", variables.vehicleId] });
      queryClient.invalidateQueries({ queryKey: ["toolStats", variables.vehicleId] });
      queryClient.invalidateQueries({ queryKey: ["allTools"] });
      toast({
        title: "Tool removed",
        description: "The tool has been removed from the vehicle.",
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
