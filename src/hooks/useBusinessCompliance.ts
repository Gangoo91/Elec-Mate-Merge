import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type ComplianceType =
  | "insurance_pl"
  | "insurance_el"
  | "insurance_pi"
  | "insurance_vehicle"
  | "niceic"
  | "napit"
  | "eca"
  | "select"
  | "stroma"
  | "gas_safe"
  | "f_gas"
  | "oftec"
  | "vehicle_mot"
  | "vehicle_tax"
  | "vehicle_insurance";

export type ComplianceStatus = "active" | "expiring" | "expired" | "pending_renewal";

export interface BusinessCompliance {
  id: string;
  user_id: string;
  compliance_type: ComplianceType;
  name: string;
  provider?: string;
  policy_number?: string;
  cover_amount?: number;
  start_date?: string;
  expiry_date?: string;
  status: ComplianceStatus;
  file_url?: string;
  auto_renewal: boolean;
  reminder_sent_30: boolean;
  reminder_sent_7: boolean;
  vehicle_registration?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type CreateBusinessComplianceInput = Omit<
  BusinessCompliance,
  "id" | "user_id" | "created_at" | "updated_at" | "status" | "reminder_sent_30" | "reminder_sent_7"
>;

export type UpdateBusinessComplianceInput = Partial<CreateBusinessComplianceInput>;

// Get friendly name for compliance type
export function getComplianceTypeLabel(type: ComplianceType): string {
  const labels: Record<ComplianceType, string> = {
    insurance_pl: "Public Liability Insurance",
    insurance_el: "Employers Liability Insurance",
    insurance_pi: "Professional Indemnity Insurance",
    insurance_vehicle: "Vehicle Insurance",
    niceic: "NICEIC Registration",
    napit: "NAPIT Registration",
    eca: "ECA Membership",
    select: "SELECT Registration",
    stroma: "Stroma Certification",
    gas_safe: "Gas Safe Registration",
    f_gas: "F-Gas Certification",
    oftec: "OFTEC Registration",
    vehicle_mot: "Vehicle MOT",
    vehicle_tax: "Vehicle Tax",
    vehicle_insurance: "Vehicle Insurance",
  };
  return labels[type] || type;
}

// Get category for compliance type
export function getComplianceCategory(type: ComplianceType): string {
  if (type.startsWith("insurance_")) return "Insurance";
  if (["niceic", "napit", "eca", "select", "stroma"].includes(type)) return "Memberships";
  if (["gas_safe", "f_gas", "oftec"].includes(type)) return "Registrations";
  if (type.startsWith("vehicle_")) return "Vehicles";
  return "Other";
}

// Fetch all business compliance for the current user
export function useBusinessCompliance() {
  return useQuery({
    queryKey: ["business-compliance"],
    queryFn: async (): Promise<BusinessCompliance[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("business_compliance")
        .select("*")
        .eq("user_id", user.id)
        .order("expiry_date", { ascending: true, nullsFirst: false });

      if (error) throw error;
      return data as BusinessCompliance[];
    },
  });
}

// Fetch business compliance by category
export function useBusinessComplianceByCategory(category: string) {
  return useQuery({
    queryKey: ["business-compliance", category],
    queryFn: async (): Promise<BusinessCompliance[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Map category to compliance types
      const typesByCategory: Record<string, ComplianceType[]> = {
        Insurance: ["insurance_pl", "insurance_el", "insurance_pi", "insurance_vehicle"],
        Memberships: ["niceic", "napit", "eca", "select", "stroma"],
        Registrations: ["gas_safe", "f_gas", "oftec"],
        Vehicles: ["vehicle_mot", "vehicle_tax", "vehicle_insurance"],
      };

      const types = typesByCategory[category] || [];

      const { data, error } = await supabase
        .from("business_compliance")
        .select("*")
        .eq("user_id", user.id)
        .in("compliance_type", types)
        .order("expiry_date", { ascending: true, nullsFirst: false });

      if (error) throw error;
      return data as BusinessCompliance[];
    },
    enabled: !!category,
  });
}

// Fetch expiring business compliance (within 30 days)
export function useExpiringBusinessCompliance() {
  return useQuery({
    queryKey: ["business-compliance", "expiring"],
    queryFn: async (): Promise<BusinessCompliance[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("business_compliance")
        .select("*")
        .eq("user_id", user.id)
        .lte("expiry_date", thirtyDaysFromNow)
        .in("status", ["active", "expiring"])
        .order("expiry_date", { ascending: true });

      if (error) throw error;
      return data as BusinessCompliance[];
    },
  });
}

// Get business compliance statistics
export function useBusinessComplianceStats() {
  return useQuery({
    queryKey: ["business-compliance", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("business_compliance")
        .select("id, status, expiry_date, compliance_type")
        .eq("user_id", user.id);

      if (error) throw error;

      const today = new Date().toISOString().split("T")[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const stats = {
        total: data.length,
        active: data.filter(c => c.status === "active").length,
        expiring: data.filter(c =>
          c.expiry_date &&
          c.expiry_date >= today &&
          c.expiry_date <= thirtyDaysFromNow
        ).length,
        expired: data.filter(c => c.status === "expired").length,
        byCategory: {
          insurance: data.filter(c => c.compliance_type.startsWith("insurance_")).length,
          memberships: data.filter(c => ["niceic", "napit", "eca", "select", "stroma"].includes(c.compliance_type)).length,
          registrations: data.filter(c => ["gas_safe", "f_gas", "oftec"].includes(c.compliance_type)).length,
          vehicles: data.filter(c => c.compliance_type.startsWith("vehicle_")).length,
        },
      };

      return stats;
    },
  });
}

// Create a new business compliance record
export function useCreateBusinessCompliance() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateBusinessComplianceInput): Promise<BusinessCompliance> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("business_compliance")
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data as BusinessCompliance;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["business-compliance"] });
      toast({
        title: "Compliance record added",
        description: `${data.name} has been added.`,
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

// Update an existing business compliance record
export function useUpdateBusinessCompliance() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateBusinessComplianceInput & { id: string }): Promise<BusinessCompliance> => {
      const { data, error } = await supabase
        .from("business_compliance")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as BusinessCompliance;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-compliance"] });
      toast({
        title: "Record updated",
        description: "The compliance record has been updated.",
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

// Delete a business compliance record
export function useDeleteBusinessCompliance() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("business_compliance")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-compliance"] });
      toast({
        title: "Record deleted",
        description: "The compliance record has been removed.",
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

// Calculate overall compliance score (0-100)
export function useComplianceScore() {
  return useQuery({
    queryKey: ["compliance-score"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Fetch all compliance data
      const [businessResult, qualificationsResult] = await Promise.all([
        supabase
          .from("business_compliance")
          .select("id, status, expiry_date")
          .eq("user_id", user.id),
        supabase
          .from("employee_qualifications")
          .select("id, status, expiry_date")
          .eq("user_id", user.id),
      ]);

      if (businessResult.error) throw businessResult.error;
      if (qualificationsResult.error) throw qualificationsResult.error;

      const allItems = [
        ...(businessResult.data || []),
        ...(qualificationsResult.data || []),
      ];

      if (allItems.length === 0) return { score: 100, message: "No compliance items to track" };

      const today = new Date().toISOString().split("T")[0];
      const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      // Calculate score based on status
      let totalScore = 0;
      for (const item of allItems) {
        if (item.status === "expired" || (item.expiry_date && item.expiry_date < today)) {
          totalScore += 0; // Expired items contribute 0
        } else if (item.expiry_date && item.expiry_date <= sevenDaysFromNow) {
          totalScore += 50; // Expiring within 7 days contributes 50
        } else if (item.expiry_date && item.expiry_date <= thirtyDaysFromNow) {
          totalScore += 75; // Expiring within 30 days contributes 75
        } else {
          totalScore += 100; // Active items contribute 100
        }
      }

      const score = Math.round(totalScore / allItems.length);

      let message = "Excellent compliance status";
      if (score < 50) message = "Critical: Immediate action required";
      else if (score < 70) message = "Warning: Several items need attention";
      else if (score < 90) message = "Good: Some items expiring soon";

      return { score, message };
    },
  });
}
