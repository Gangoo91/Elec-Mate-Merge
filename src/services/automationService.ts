import { supabase } from "@/integrations/supabase/client";

export interface AutomationRule {
  id: string;
  name: string;
  description: string | null;
  category: string;
  trigger_type: string;
  trigger_config: {
    schedule?: string;
    description?: string;
    table?: string;
    field?: string;
  };
  conditions: Array<{
    field: string;
    operator: string;
    value: unknown;
  }>;
  actions: Array<{
    type: string;
    config: Record<string, unknown>;
  }>;
  is_active: boolean;
  is_system: boolean;
  last_run_at: string | null;
  next_run_at: string | null;
  run_count: number;
  success_count: number;
  failure_count: number;
  created_at: string;
  updated_at: string;
}

export interface AutomationLog {
  id: string;
  rule_id: string;
  trigger_data: Record<string, unknown> | null;
  records_processed: number;
  actions_taken: Array<{
    type: string;
    success: boolean;
    details?: string;
  }>;
  status: 'success' | 'failed' | 'partial';
  error_message: string | null;
  duration_ms: number | null;
  executed_at: string;
}

export interface AutomationStats {
  totalRules: number;
  activeRules: number;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  actionsThisWeek: number;
}

// Fetch all automation rules
export async function getAutomationRules(): Promise<AutomationRule[]> {
  const { data, error } = await supabase
    .from("automation_rules")
    .select("*")
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching automation rules:", error);
    throw error;
  }

  return (data || []) as unknown as AutomationRule[];
}

// Fetch a single automation rule
export async function getAutomationRule(id: string): Promise<AutomationRule | null> {
  const { data, error } = await supabase
    .from("automation_rules")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching automation rule:", error);
    throw error;
  }

  return data as unknown as AutomationRule | null;
}

// Toggle automation rule active state
export async function toggleAutomationRule(id: string, isActive: boolean): Promise<boolean> {
  const { error } = await supabase
    .from("automation_rules")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) {
    console.error("Error toggling automation rule:", error);
    throw error;
  }

  return true;
}

// Create a new automation rule
export async function createAutomationRule(
  rule: Omit<AutomationRule, 'id' | 'created_at' | 'updated_at' | 'run_count' | 'success_count' | 'failure_count' | 'last_run_at' | 'next_run_at'>
): Promise<AutomationRule> {
  const { data, error } = await supabase
    .from("automation_rules")
    .insert({
      name: rule.name,
      description: rule.description,
      category: rule.category,
      trigger_type: rule.trigger_type,
      trigger_config: rule.trigger_config,
      conditions: rule.conditions,
      actions: rule.actions,
      is_active: rule.is_active,
      is_system: rule.is_system,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating automation rule:", error);
    throw error;
  }

  return data as unknown as AutomationRule;
}

// Update an automation rule
export async function updateAutomationRule(
  id: string,
  updates: Partial<Pick<AutomationRule, 'name' | 'description' | 'trigger_config' | 'conditions' | 'actions' | 'is_active'>>
): Promise<AutomationRule> {
  const { data, error } = await supabase
    .from("automation_rules")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating automation rule:", error);
    throw error;
  }

  return data as unknown as AutomationRule;
}

// Delete an automation rule
export async function deleteAutomationRule(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("automation_rules")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting automation rule:", error);
    throw error;
  }

  return true;
}

// Fetch automation logs
export async function getAutomationLogs(
  options: {
    ruleId?: string;
    status?: 'success' | 'failed' | 'partial';
    limit?: number;
  } = {}
): Promise<AutomationLog[]> {
  let query = supabase
    .from("automation_logs")
    .select("*")
    .order("executed_at", { ascending: false })
    .limit(options.limit || 50);

  if (options.ruleId) {
    query = query.eq("rule_id", options.ruleId);
  }

  if (options.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching automation logs:", error);
    throw error;
  }

  return (data || []) as unknown as AutomationLog[];
}

// Get automation statistics
export async function getAutomationStats(): Promise<AutomationStats> {
  // Get rules stats
  const { data: rules, error: rulesError } = await supabase
    .from("automation_rules")
    .select("is_active, run_count, success_count, failure_count");

  if (rulesError) {
    console.error("Error fetching automation stats:", rulesError);
    throw rulesError;
  }

  // Get logs from the last 7 days
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const { data: recentLogs, error: logsError } = await supabase
    .from("automation_logs")
    .select("actions_taken")
    .gte("executed_at", weekAgo.toISOString());

  if (logsError) {
    console.error("Error fetching recent logs:", logsError);
    throw logsError;
  }

  const totalRules = rules?.length || 0;
  const activeRules = rules?.filter(r => r.is_active).length || 0;
  const totalExecutions = rules?.reduce((sum, r) => sum + (r.run_count || 0), 0) || 0;
  const successfulExecutions = rules?.reduce((sum, r) => sum + (r.success_count || 0), 0) || 0;
  const failedExecutions = rules?.reduce((sum, r) => sum + (r.failure_count || 0), 0) || 0;
  
  // Count actions from recent logs
  const actionsThisWeek = (recentLogs || []).reduce((sum, log) => {
    const actions = log.actions_taken as Array<{ type: string; success: boolean }> || [];
    return sum + actions.length;
  }, 0);

  return {
    totalRules,
    activeRules,
    totalExecutions,
    successfulExecutions,
    failedExecutions,
    actionsThisWeek,
  };
}

// Manually run an automation rule
export async function runAutomationRule(ruleId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke("run-automations", {
      body: { ruleId },
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error running automation:", error);
    return { success: false, error: (error as Error).message };
  }
}

// Get category display info
export function getCategoryInfo(category: string): { label: string; color: string } {
  const categories: Record<string, { label: string; color: string }> = {
    compliance: { label: 'Compliance', color: 'bg-orange-500' },
    jobs: { label: 'Jobs', color: 'bg-blue-500' },
    finance: { label: 'Finance', color: 'bg-green-500' },
    hr: { label: 'HR', color: 'bg-purple-500' },
    general: { label: 'General', color: 'bg-gray-500' },
  };
  return categories[category] || categories.general;
}

// Get trigger type display info
export function getTriggerTypeInfo(triggerType: string): { label: string; icon: string } {
  const types: Record<string, { label: string; icon: string }> = {
    schedule: { label: 'Scheduled', icon: 'Clock' },
    field_change: { label: 'Field Change', icon: 'RefreshCw' },
    record_created: { label: 'Record Created', icon: 'Plus' },
    manual: { label: 'Manual', icon: 'Hand' },
  };
  return types[triggerType] || { label: triggerType, icon: 'Zap' };
}
