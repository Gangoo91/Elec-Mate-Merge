import { supabase } from "@/integrations/supabase/client";
import { EICScheduleOfTests } from "@/types/eic-integration";
import { toast } from "@/hooks/use-toast";

/**
 * Export EIC Schedule to Supabase for Inspection & Testing app integration
 */
export async function exportEICScheduleToInspectionApp(
  schedule: EICScheduleOfTests
): Promise<{ success: boolean; scheduleId?: string; error?: string }> {
  try {
    console.log("📤 Exporting EIC Schedule to Inspection App...", schedule);
    
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // Insert into eic_schedules table (type will auto-update after migration)
    const { data, error } = await supabase
      .from("eic_schedules" as any)
      .insert({
        user_id: user.user.id,
        installation_id: schedule.installationId,
        installation_address: schedule.installationAddress,
        designer_name: schedule.designerName,
        design_date: schedule.designDate,
        schedule_data: schedule.circuits,
        status: schedule.status,
      })
      .select()
      .single();
    
    if (error) {
      console.error("❌ Error exporting EIC schedule:", error);
      throw error;
    }
    
    console.log("✅ EIC Schedule exported successfully:", data);
    
    const scheduleId = (data as any)?.id || "unknown";
    
    toast({
      title: "EIC Schedule Exported",
      description: `${schedule.circuits.length} circuits ready for testing. Schedule ID: ${scheduleId.slice(0, 8)}`,
    });
    
    return { success: true, scheduleId };
  } catch (error) {
    console.error("❌ Export error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to export EIC schedule";
    
    toast({
      title: "Export Failed",
      description: errorMessage,
      variant: "destructive",
    });
    
    return { success: false, error: errorMessage };
  }
}

/**
 * Get existing EIC schedules for a user
 */
export async function getUserEICSchedules() {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return [];
  
  const { data, error } = await supabase
    .from("eic_schedules" as any)
    .select("*")
    .eq("user_id", user.user.id)
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Error fetching EIC schedules:", error);
    return [];
  }
  
  return data || [];
}
