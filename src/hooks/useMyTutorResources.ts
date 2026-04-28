import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useMyTutorResources — apprentice-side. Lists materials uploaded by the
   tutor team that should be visible to this learner. Filters to:

     - same college_id
     - visibility in ('cohort_members', 'college') — i.e. things shared with
       learners (not 'private' or 'tutors' which are tutor-only)

   Limits to 30 most recent. The full materials library will be at a deeper
   route (future) — this card is a digest.
   ========================================================================== */

export type ResourceKind =
  | 'document'
  | 'slide'
  | 'sheet'
  | 'image'
  | 'video'
  | 'audio'
  | 'link'
  | 'other';

export interface MyResource {
  id: string;
  title: string;
  description: string | null;
  kind: ResourceKind;
  file_path: string | null;
  external_url: string | null;
  mime_type: string | null;
  thumbnail_path: string | null;
  uploader_name: string | null;
  ac_count: number;
  created_at: string;
}

export function useMyTutorResources() {
  const { user } = useAuth();
  const [resources, setResources] = useState<MyResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasCollegeLink, setHasCollegeLink] = useState(false);

  const fetchAll = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const uid = user.id;

    // Resolve the apprentice's college from their college_students row
    // (preferred — so they only see materials from their attending college)
    // with profiles.college_id as a secondary fallback.
    const { data: cs } = await supabase
      .from('college_students')
      .select('college_id')
      .eq('user_id', uid)
      .maybeSingle();
    let collegeId: string | null = (cs?.college_id as string | null) ?? null;
    if (!collegeId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', uid)
        .maybeSingle();
      collegeId = (profile?.college_id as string | null) ?? null;
    }
    setHasCollegeLink(Boolean(collegeId));
    if (!collegeId) {
      setResources([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('college_resources')
      .select(
        'id, college_id, title, description, kind, file_path, external_url, mime_type, thumbnail_path, visibility, created_at, college_staff(name)'
      )
      .eq('college_id', collegeId)
      .in('visibility', ['cohort_members', 'college'])
      .order('created_at', { ascending: false })
      .limit(30);

    const resourceRows = (data ?? []) as Array<{
      id: string;
      title: string;
      description: string | null;
      kind: string;
      file_path: string | null;
      external_url: string | null;
      mime_type: string | null;
      thumbnail_path: string | null;
      created_at: string;
      college_staff: { name: string } | null;
    }>;

    // Resolve AC counts in one round-trip (badge display).
    const ids = resourceRows.map((r) => r.id);
    const acCount = new Map<string, number>();
    if (ids.length > 0) {
      const { data: links } = await supabase
        .from('resource_ac_links')
        .select('resource_id')
        .in('resource_id', ids);
      for (const row of (links ?? []) as { resource_id: string }[]) {
        acCount.set(row.resource_id, (acCount.get(row.resource_id) ?? 0) + 1);
      }
    }

    setResources(
      resourceRows.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        kind: r.kind as ResourceKind,
        file_path: r.file_path,
        external_url: r.external_url,
        mime_type: r.mime_type,
        thumbnail_path: r.thumbnail_path,
        uploader_name: r.college_staff?.name ?? null,
        ac_count: acCount.get(r.id) ?? 0,
        created_at: r.created_at,
      }))
    );
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Realtime — when a tutor uploads with visible scope, the card updates
  // without refresh.
  useEffect(() => {
    if (!user) return;
    let chan: ReturnType<typeof supabase.channel> | null = null;
    (async () => {
      const { data: cs } = await supabase
        .from('college_students')
        .select('college_id')
        .eq('user_id', user.id)
        .maybeSingle();
      const collegeId = (cs?.college_id as string | null) ?? null;
      if (!collegeId) return;
      chan = supabase
        .channel(`my_tutor_resources:${collegeId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'college_resources',
            filter: `college_id=eq.${collegeId}`,
          },
          () => fetchAll()
        )
        .subscribe();
    })();
    return () => {
      if (chan) supabase.removeChannel(chan);
    };
  }, [user, fetchAll]);

  return { resources, loading, hasCollegeLink, refresh: fetchAll };
}

/** Build a public URL or signed URL for a resource. Resources are in the
    `college-resources` bucket — falls back to external_url for link-kind. */
export async function resolveResourceUrl(r: MyResource): Promise<string | null> {
  if (r.external_url) return r.external_url;
  if (!r.file_path) return null;
  const { data } = supabase.storage.from('college-resources').getPublicUrl(r.file_path);
  return data.publicUrl;
}
