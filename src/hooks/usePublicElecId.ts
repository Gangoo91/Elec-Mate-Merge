import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type {
  ElecIdProfile,
  ElecIdSkill,
  ElecIdWorkHistory,
  ElecIdTraining,
  ElecIdQualification,
} from '@/services/elecIdService';

// Document type for public viewing
export interface PublicDocument {
  id: string;
  profile_id: string;
  document_type: string;
  document_name: string;
  file_url: string | null;
  verification_status: string | null;
  document_number: string | null;
  issue_date: string | null;
  expiry_date: string | null;
  issuing_body: string | null;
}

// Types for public profile viewing
export interface PublicElecIdData {
  profile: ElecIdProfile;
  sections: string[];
  ownerName: string;
  companyName: string | null;
  expiresAt: string | null;
  documents: PublicDocument[];
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

// Only render photos that are already usable URLs — the public page cannot
// sign bare storage paths, so skip those gracefully.
const toRenderablePhotoUrl = (url: string | null | undefined): string | null =>
  url && /^https?:\/\//i.test(url) ? url : null;

// Shape returned by the get_elec_id_by_share_token RPC
interface ShareTokenRpcPayload {
  status: 'ok' | 'not_found' | 'expired';
  sections?: string[];
  expires_at?: string | null;
  profile?: Record<string, unknown>;
  employee?: {
    name: string | null;
    role: string | null;
    job_title: string | null;
    photo_url: string | null;
    email: string | null;
    phone: string | null;
  };
  skills?: ElecIdSkill[];
  work_history?: ElecIdWorkHistory[];
  training?: ElecIdTraining[];
  qualifications?: ElecIdQualification[];
  certifications?: {
    id: string;
    name: string;
    issuing_body: string | null;
    certificate_number: string | null;
    issue_date: string | null;
    expiry_date: string | null;
    status: string | null;
  }[];
  documents?: PublicDocument[];
}

// Map an RPC payload (share-token or verify-by-number — same shape) into the
// hook's public data shape.
function mapRpcPayload(payload: ShareTokenRpcPayload | null): PublicElecIdData | null {
  if (!payload || payload.status !== 'ok' || !payload.profile) {
    // not_found and expired both render the page's "link invalid or expired" state
    return null;
  }

  const sections = payload.sections || ['basics'];
  const profileId = (payload.profile.id as string) || '';

  // Fold employer-recorded certifications into the training list so they render
  // in the "Training & certifications" card without a page change.
  const certsAsTraining: ElecIdTraining[] = (payload.certifications || []).map((cert) => ({
    id: cert.id,
    profile_id: profileId,
    training_name: cert.name,
    provider: cert.issuing_body,
    completed_date: cert.issue_date,
    expiry_date: cert.expiry_date,
    certificate_id: cert.certificate_number,
    funded_by: null,
    status: (cert.status || 'active').toLowerCase(),
    created_at: '',
  }));

  const profile = {
    ...payload.profile,
    employee: {
      id: '',
      name: payload.employee?.name || '',
      role: payload.employee?.role || '',
      photo_url: toRenderablePhotoUrl(payload.employee?.photo_url),
      email: payload.employee?.email ?? null,
      phone: payload.employee?.phone ?? null,
    },
    skills: payload.skills || [],
    work_history: payload.work_history || [],
    training: [...(payload.training || []), ...certsAsTraining],
    qualifications: payload.qualifications || [],
  } as unknown as ElecIdProfile;

  return {
    profile,
    sections,
    ownerName: payload.employee?.name || 'Unknown',
    companyName: null,
    expiresAt: payload.expires_at ?? null,
    // file_url is a bare storage path on every live row — unusable for anon
    // visitors (no way to sign it), so blank it out and the page hides the
    // "View" buttons instead of opening a broken image.
    documents: (payload.documents || []).map((d) => ({
      ...d,
      file_url: toRenderablePhotoUrl(d.file_url),
    })),
  };
}

// Generic caller for the two public Elec-ID RPCs (not yet in generated types).
async function fetchViaRpc(
  fnName: string,
  args: Record<string, unknown>
): Promise<PublicElecIdData | null | 'RPC_MISSING'> {
  const rpc = supabase.rpc as unknown as (
    fn: string,
    a: Record<string, unknown>
  ) => PromiseLike<{ data: unknown; error: { code?: string; message?: string } | null }>;
  const { data, error } = await rpc(fnName, args);

  if (error) {
    // PGRST202 = function not found — SQL not applied yet, use direct-read fallback
    if (error.code === 'PGRST202') return 'RPC_MISSING';
    console.error(`Error fetching public Elec-ID via ${fnName}:`, error);
    throw error;
  }

  return mapRpcPayload(data as ShareTokenRpcPayload | null);
}

// Preferred token path: single SECURITY DEFINER RPC — works for anonymous
// visitors regardless of the profile's visibility setting (the link is consent).
async function fetchByTokenViaRpc(token: string): Promise<PublicElecIdData | null | 'RPC_MISSING'> {
  return fetchViaRpc('get_elec_id_by_share_token', { p_token: token });
}

// Legacy fallback: direct table reads under RLS. Only works when the profile is
// publicly visible or the viewer is signed in with access — kept so the FE can
// ship ahead of the RPC.
async function fetchByTokenDirect(token: string): Promise<PublicElecIdData | null> {
  // First, get the share link
  const { data: shareLink, error: shareLinkError } = await supabase
    .from('employer_elec_id_share_links')
    .select('*')
    .eq('share_token', token)
    .eq('is_active', true)
    .maybeSingle();

  if (shareLinkError) {
    console.error('Error fetching share link:', shareLinkError);
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
    .from('employer_elec_id_share_links')
    .update({ view_count: (shareLink.view_count || 0) + 1 })
    .eq('id', shareLink.id)
    .then(() => {});

  // Get the profile and documents
  const { profile, documents } = await fetchProfileById(shareLink.profile_id, shareLink.sections);
  if (!profile) return null;

  return {
    profile,
    sections: shareLink.sections,
    ownerName: profile.employee?.name || 'Unknown',
    companyName: null,
    expiresAt: shareLink.expires_at,
    documents,
  };
}

// Fetch profile data by share token
export function usePublicElecIdByToken(token: string | undefined) {
  return useQuery({
    queryKey: ['public-elec-id', 'token', token],
    queryFn: async (): Promise<PublicElecIdData | null> => {
      if (!token) return null;

      // The share token IS the consent — the RPC serves the link holder whether
      // or not they are signed in, honouring the link's section choices.
      const rpcResult = await fetchByTokenViaRpc(token);
      if (rpcResult !== 'RPC_MISSING') return rpcResult;

      return fetchByTokenDirect(token);
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

// Fetch profile data by Elec-ID number (direct verification)
export function usePublicElecIdByNumber(elecIdNumber: string | undefined) {
  return useQuery({
    queryKey: ['public-elec-id', 'number', elecIdNumber],
    queryFn: async (): Promise<PublicElecIdData | null> => {
      if (!elecIdNumber) return null;

      // Preferred: SECURITY DEFINER RPC with curated fields (the anon
      // row-level read of employer_employees leaked pay/contact columns and
      // has been revoked — this rail replaces it).
      const rpcResult = await fetchViaRpc('get_public_elec_id_by_number', {
        p_elec_id_number: elecIdNumber,
      });
      if (rpcResult !== 'RPC_MISSING') return rpcResult;

      // Legacy fallback: direct profile read (works only for public profiles
      // while table-level policies allow it).
      const { data: profile, error: profileError } = await supabase
        .from('employer_elec_id_profiles')
        .select(
          `
          *,
          employee:employer_employees(id, name, role, photo_url, email, phone, user_id)
        `
        )
        .eq('elec_id_number', elecIdNumber)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        throw profileError;
      }

      if (!profile) {
        return null;
      }

      // Increment profile views (fire and forget)
      supabase
        .from('employer_elec_id_profiles')
        .update({ profile_views: (profile.profile_views || 0) + 1 })
        .eq('id', profile.id)
        .then(() => {});

      // Get all related data for verification view (all sections)
      const { profile: fullProfile, documents } = await fetchProfileById(profile.id, [
        'basics',
        'qualifications',
        'experience',
        'skills',
        'training',
      ]);
      if (!fullProfile) return null;

      return {
        profile: fullProfile,
        sections: ['basics', 'qualifications', 'experience', 'skills', 'training'],
        ownerName: profile.employee?.name || 'Unknown',
        companyName: null,
        expiresAt: null,
        documents,
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
): Promise<{ profile: ElecIdProfile | null; documents: PublicDocument[] }> {
  // Fetch profile with employee data
  const { data: profile, error: profileError } = await supabase
    .from('employer_elec_id_profiles')
    .select(
      `
      *,
      employee:employer_employees(id, name, role, photo_url, email, phone, user_id)
    `
    )
    .eq('id', profileId)
    .maybeSingle();

  if (profileError || !profile) return { profile: null, documents: [] };

  // If we have a user_id, also fetch from profiles table for better name/photo
  let userProfile: { full_name: string | null; avatar_url: string | null } | null = null;
  if (profile.employee?.user_id) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', profile.employee.user_id)
      .maybeSingle();
    userProfile = profileData;
  }

  // Merge user profile data with employee data - prefer profiles table data
  if (profile.employee && userProfile) {
    profile.employee = {
      ...profile.employee,
      name: userProfile.full_name || profile.employee.name,
      photo_url: userProfile.avatar_url || profile.employee.photo_url,
    };
  }

  let skills: ElecIdSkill[] = [];
  let workHistory: ElecIdWorkHistory[] = [];
  let training: ElecIdTraining[] = [];
  let qualifications: ElecIdQualification[] = [];
  let documents: PublicDocument[] = [];

  // Only fetch sections that are allowed
  const promises: Promise<void>[] = [];

  if (sections.includes('skills')) {
    promises.push(
      supabase
        .from('employer_elec_id_skills')
        .select('*')
        .eq('profile_id', profileId)
        .then(({ data }) => {
          skills = (data || []) as ElecIdSkill[];
        })
    );
  }

  if (sections.includes('experience')) {
    promises.push(
      supabase
        .from('employer_elec_id_work_history')
        .select('*')
        .eq('profile_id', profileId)
        .order('start_date', { ascending: false })
        .then(({ data }) => {
          workHistory = (data || []) as ElecIdWorkHistory[];
        })
    );
  }

  if (sections.includes('training')) {
    promises.push(
      supabase
        .from('employer_elec_id_training')
        .select('*')
        .eq('profile_id', profileId)
        .order('completed_date', { ascending: false })
        .then(({ data }) => {
          training = (data || []) as ElecIdTraining[];
        })
    );
  }

  if (sections.includes('qualifications')) {
    promises.push(
      supabase
        .from('employer_elec_id_qualifications')
        .select('*')
        .eq('profile_id', profileId)
        .order('date_achieved', { ascending: false })
        .then(({ data }) => {
          qualifications = (data || []) as ElecIdQualification[];
        })
    );
  }

  // Fetch verified documents for qualifications, training, and ECS card
  if (
    sections.includes('qualifications') ||
    sections.includes('training') ||
    sections.includes('basics')
  ) {
    promises.push(
      supabase
        .from('elec_id_documents')
        .select(
          'id, profile_id, document_type, document_name, file_url, verification_status, document_number, issue_date, expiry_date, issuing_body'
        )
        .eq('profile_id', profileId)
        .eq('verification_status', 'verified')
        .in('document_type', ['qualification', 'ecs_card', 'training', 'certificate'])
        .then(({ data }) => {
          documents = (data || []) as PublicDocument[];
        })
    );
  }

  await Promise.all(promises);

  return {
    profile: {
      ...profile,
      skills,
      work_history: workHistory,
      training,
      qualifications,
    } as ElecIdProfile,
    documents,
  };
}
