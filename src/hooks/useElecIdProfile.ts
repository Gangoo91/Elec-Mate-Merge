import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type VerificationTier = "basic" | "verified" | "premium";
export type ProfileVisibility = "public" | "employers_only" | "private";
export type RateType = "hourly" | "daily" | "weekly" | "yearly";

export interface ElecIdProfile {
  id: string;
  employee_id: string;
  elec_id_number: string;
  ecs_card_type: string | null;
  ecs_card_number: string | null;
  ecs_expiry_date: string | null;
  bio: string | null;
  specialisations: string[] | null;
  profile_views: number;
  shareable_link: string | null;
  is_verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  // Hybrid flow fields
  activated: boolean;
  activated_at: string | null;
  opt_out: boolean;
  opt_out_at: string | null;
  verification_tier: VerificationTier;
  tier_updated_at: string | null;
  available_for_hire: boolean;
  profile_visibility: ProfileVisibility;
  // Rate settings
  rate_type: RateType | null;
  rate_amount: number | null;
  created_at: string;
  updated_at: string;
}

interface UseElecIdProfileReturn {
  profile: ElecIdProfile | null;
  isLoading: boolean;
  error: string | null;
  isActivated: boolean;
  isOptedOut: boolean;
  activateProfile: (data: Partial<ElecIdProfile>) => Promise<boolean>;
  updateProfile: (data: Partial<ElecIdProfile>) => Promise<boolean>;
  setOptOut: (optOut: boolean) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export function useElecIdProfile(): UseElecIdProfileReturn {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ElecIdProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // First find the employee record for this user
      const { data: employee } = await supabase
        .from("employer_employees")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!employee) {
        // No employee record means no Elec-ID profile
        setProfile(null);
        setIsLoading(false);
        return;
      }

      // Fetch the Elec-ID profile using the employee ID
      const { data, error: fetchError } = await supabase
        .from("employer_elec_id_profiles")
        .select("*")
        .eq("employee_id", employee.id)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      setProfile(data as ElecIdProfile | null);
    } catch (err: any) {
      console.error("Error fetching Elec-ID profile:", err);
      setError(err.message || "Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Generate a unique Elec-ID number
  const generateElecIdNumber = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "EM-";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Activate profile (complete onboarding)
  const activateProfile = async (data: Partial<ElecIdProfile>): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const elecIdNumber = generateElecIdNumber();
      const now = new Date().toISOString();

      if (profile) {
        // Update existing profile
        const { error: updateError } = await supabase
          .from("employer_elec_id_profiles")
          .update({
            ...data,
            activated: true,
            activated_at: now,
            updated_at: now,
          })
          .eq("id", profile.id);

        if (updateError) throw updateError;
      } else {
        // First, find or create an employee record for this user
        let employeeId: string | null = null;

        // Check if user already has an employee record
        const { data: existingEmployee } = await supabase
          .from("employer_employees")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (existingEmployee) {
          employeeId = existingEmployee.id;
        } else {
          // Create a new employee record for this user
          const { data: newEmployee, error: employeeError } = await supabase
            .from("employer_employees")
            .insert({
              user_id: user.id,
              name: user.email?.split("@")[0] || "User",
              role: "electrician",
              team_role: "Electrician",
              status: "active",
              avatar_initials: (user.email?.substring(0, 2) || "US").toUpperCase(),
              hourly_rate: 0,
              certifications_count: 0,
              active_jobs_count: 0,
            })
            .select("id")
            .single();

          if (employeeError) {
            console.error("Error creating employee record:", employeeError);
            throw new Error("Failed to create employee record. Please try again.");
          }
          employeeId = newEmployee.id;
        }

        // Create new Elec-ID profile
        const { error: insertError } = await supabase
          .from("employer_elec_id_profiles")
          .insert({
            employee_id: employeeId,
            elec_id_number: elecIdNumber,
            activated: true,
            activated_at: now,
            verification_tier: "basic",
            available_for_hire: true,
            profile_visibility: "employers_only",
            ...data,
          });

        if (insertError) throw insertError;
      }

      await fetchProfile();
      return true;
    } catch (err: any) {
      console.error("Error activating Elec-ID:", err);
      setError(err.message || "Failed to activate profile");
      return false;
    }
  };

  // Update profile
  const updateProfile = async (data: Partial<ElecIdProfile>): Promise<boolean> => {
    if (!user?.id || !profile) return false;

    try {
      const { error: updateError } = await supabase
        .from("employer_elec_id_profiles")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (updateError) throw updateError;

      await fetchProfile();
      return true;
    } catch (err: any) {
      console.error("Error updating Elec-ID:", err);
      setError(err.message || "Failed to update profile");
      return false;
    }
  };

  // Set opt-out status
  const setOptOut = async (optOut: boolean): Promise<boolean> => {
    if (!user?.id || !profile) return false;

    try {
      const { error: updateError } = await supabase
        .from("employer_elec_id_profiles")
        .update({
          opt_out: optOut,
          opt_out_at: optOut ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (updateError) throw updateError;

      await fetchProfile();
      return true;
    } catch (err: any) {
      console.error("Error setting opt-out:", err);
      setError(err.message || "Failed to update opt-out status");
      return false;
    }
  };

  return {
    profile,
    isLoading,
    error,
    isActivated: profile?.activated ?? false,
    isOptedOut: profile?.opt_out ?? false,
    activateProfile,
    updateProfile,
    setOptOut,
    refetch: fetchProfile,
  };
}

export default useElecIdProfile;
