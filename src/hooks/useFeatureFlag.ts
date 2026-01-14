import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface FeatureFlag {
  id: string;
  name: string;
  is_enabled: boolean;
  enabled_for_roles: string[];
  enabled_for_users: string[];
  percentage_rollout: number;
}

// Cache for feature flags
let flagsCache: FeatureFlag[] | null = null;
let lastFetch = 0;
const CACHE_TTL = 60000; // 1 minute

export function useFeatureFlags() {
  const { user, profile } = useAuth();

  return useQuery({
    queryKey: ["feature-flags"],
    queryFn: async () => {
      // Use cache if fresh
      if (flagsCache && Date.now() - lastFetch < CACHE_TTL) {
        return flagsCache;
      }

      const { data, error } = await supabase
        .from("feature_flags")
        .select("*");

      if (error) {
        console.error("Error fetching feature flags:", error);
        return [];
      }

      flagsCache = data as FeatureFlag[];
      lastFetch = Date.now();
      return flagsCache;
    },
    staleTime: CACHE_TTL,
    refetchInterval: CACHE_TTL,
  });
}

export function useFeatureFlag(flagName: string): boolean {
  const { user, profile } = useAuth();
  const { data: flags } = useFeatureFlags();

  if (!flags) return false;

  const flag = flags.find((f) => f.name === flagName);
  if (!flag) return false;

  // Check if globally disabled
  if (!flag.is_enabled) return false;

  // Check if user is in specific user list
  if (flag.enabled_for_users?.length > 0) {
    if (user?.id && flag.enabled_for_users.includes(user.id)) {
      return true;
    }
  }

  // Check if user's role is in enabled roles
  if (flag.enabled_for_roles?.length > 0) {
    if (profile?.role && flag.enabled_for_roles.includes(profile.role)) {
      return true;
    }
    // If specific roles are set but user doesn't match, return false
    if (flag.enabled_for_roles.length > 0) {
      return false;
    }
  }

  // Check percentage rollout
  if (flag.percentage_rollout < 100) {
    // Use user ID or session to determine bucket
    const bucket = user?.id
      ? parseInt(user.id.replace(/-/g, "").slice(0, 8), 16) % 100
      : Math.random() * 100;
    return bucket < flag.percentage_rollout;
  }

  return flag.is_enabled;
}

// Specific feature flag hooks for common flags
export function useMaintenanceMode(): boolean {
  return useFeatureFlag("maintenance_mode");
}

export function useBetaFeatures(): boolean {
  return useFeatureFlag("beta_features");
}

export function useAIAssistant(): boolean {
  return useFeatureFlag("ai_assistant");
}

export function useNewOnboarding(): boolean {
  return useFeatureFlag("new_onboarding");
}
