import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type {
  ElecIdProfile,
  ElecIdSkill,
  ElecIdWorkHistory,
  ElecIdTraining,
  ElecIdQualification,
} from "@/services/elecIdService";

// Types for public profile viewing
export interface PublicElecIdData {
  profile: ElecIdProfile;
  sections: string[];
  ownerName: string;
  companyName: string | null;
  expiresAt: string | null;
}

export interface ShareLinkData {
  id: string;
  profile_id: string;
  share_token: string;
  expires_at: string | null;
  sections: string[];
  is_active: boolean;
  view_count: number;
}

// Fetch profile data by share token
export function usePublicElecIdByToken(token: string | undefined) {
  return useQuery({
    queryKey: ["public-elec-id", "token", token],
    queryFn: async (): Promise<PublicElecIdData | null> => {
      if (!token) return null;

      // First, get the share link
      const { data: shareLink, error: shareLinkError } = await supabase
        .from("employer_elec_id_share_links")
        .select("*")
        .eq("share_token", token)
        .eq("is_active", true)
        .maybeSingle();

      if (shareLinkError) {
        console.error("Error fetching share link:", shareLinkError);
        throw shareLinkError;
      }

      if (!shareLink) {
        return null;
      }

      // Check if expired
      if (shareLink.expires_at && new Date(shareLink.expires_at) < new Date()) {
        return null;
      }

      // Increment view count (fire and forget)
      supabase
        .from("employer_elec_id_share_links")
        .update({ view_count: (shareLink.view_count || 0) + 1 })
        .eq("id", shareLink.id)
        .then(() => {});

      // Get the profile
      const profile = await fetchProfileById(shareLink.profile_id, shareLink.sections);
      if (!profile) return null;

      return {
        profile,
        sections: shareLink.sections,
        ownerName: profile.employee?.name || "Unknown",
        companyName: null,
        expiresAt: shareLink.expires_at,
      };
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

// Fetch profile data by Elec-ID number (direct verification)
export function usePublicElecIdByNumber(elecIdNumber: string | undefined) {
  return useQuery({
    queryKey: ["public-elec-id", "number", elecIdNumber],
    queryFn: async (): Promise<PublicElecIdData | null> => {
      if (!elecIdNumber) return null;

      // Get the profile directly by Elec-ID number
      const { data: profile, error: profileError } = await supabase
        .from("employer_elec_id_profiles")
        .select(`
          *,
          employee:employer_employees(id, name, role, photo_url, email, phone)
        `)
        .eq("elec_id_number", elecIdNumber)
        .maybeSingle();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }

      if (!profile) {
        return null;
      }

      // Increment profile views (fire and forget)
      supabase
        .from("employer_elec_id_profiles")
        .update({ profile_views: (profile.profile_views || 0) + 1 })
        .eq("id", profile.id)
        .then(() => {});

      // Get all related data for verification view (all sections)
      const fullProfile = await fetchProfileById(profile.id, ["basics", "qualifications", "experience", "skills", "training"]);
      if (!fullProfile) return null;

      return {
        profile: fullProfile,
        sections: ["basics", "qualifications", "experience", "skills", "training"],
        ownerName: profile.employee?.name || "Unknown",
        companyName: null,
        expiresAt: null,
      };
    },
    enabled: !!elecIdNumber,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

// Helper to fetch profile with related data based on allowed sections
async function fetchProfileById(
  profileId: string,
  sections: string[]
): Promise<ElecIdProfile | null> {
  const { data: profile, error: profileError } = await supabase
    .from("employer_elec_id_profiles")
    .select(`
      *,
      employee:employer_employees(id, name, role, photo_url, email, phone)
    `)
    .eq("id", profileId)
    .maybeSingle();

  if (profileError || !profile) return null;

  let skills: ElecIdSkill[] = [];
  let workHistory: ElecIdWorkHistory[] = [];
  let training: ElecIdTraining[] = [];
  let qualifications: ElecIdQualification[] = [];

  // Only fetch sections that are allowed
  const promises: Promise<void>[] = [];

  if (sections.includes("skills")) {
    promises.push(
      supabase
        .from("employer_elec_id_skills")
        .select("*")
        .eq("profile_id", profileId)
        .then(({ data }) => {
          skills = (data || []) as ElecIdSkill[];
        })
    );
  }

  if (sections.includes("experience")) {
    promises.push(
      supabase
        .from("employer_elec_id_work_history")
        .select("*")
        .eq("profile_id", profileId)
        .order("start_date", { ascending: false })
        .then(({ data }) => {
          workHistory = (data || []) as ElecIdWorkHistory[];
        })
    );
  }

  if (sections.includes("training")) {
    promises.push(
      supabase
        .from("employer_elec_id_training")
        .select("*")
        .eq("profile_id", profileId)
        .order("completed_date", { ascending: false })
        .then(({ data }) => {
          training = (data || []) as ElecIdTraining[];
        })
    );
  }

  if (sections.includes("qualifications")) {
    promises.push(
      supabase
        .from("employer_elec_id_qualifications")
        .select("*")
        .eq("profile_id", profileId)
        .order("date_achieved", { ascending: false })
        .then(({ data }) => {
          qualifications = (data || []) as ElecIdQualification[];
        })
    );
  }

  await Promise.all(promises);

  return {
    ...profile,
    skills,
    work_history: workHistory,
    training,
    qualifications,
  } as ElecIdProfile;
}
