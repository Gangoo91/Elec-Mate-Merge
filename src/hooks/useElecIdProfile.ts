import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type VerificationTier = "basic" | "verified" | "premium";
export type ProfileVisibility = "public" | "employers_only" | "private";

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
      const { data, error: fetchError } = await supabase
        .from("employer_elec_id_profiles")
        .select("*")
        .eq("employee_id", user.id)
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
        // Create new profile
        const { error: insertError } = await supabase
          .from("employer_elec_id_profiles")
          .insert({
            employee_id: user.id,
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
