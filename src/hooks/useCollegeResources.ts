import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   College resources — the Materials Library.
   - List + filter + search
   - Drag-drop / multi-file upload with per-file progress
   - Auto-detect kind from mime; auto-title from filename
   - External link resources
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

export type ResourceVisibility =
  | 'private'
  | 'tutors'
  | 'cohort_members'
  | 'college'
  | 'public_link';

export interface CollegeResource {
  id: string;
  college_id: string;
  uploader_id: string | null;
  title: string;
  description: string | null;
  kind: ResourceKind;
  file_path: string | null;
  external_url: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  duration_seconds: number | null;
  thumbnail_path: string | null;
  tags: string[];
  visibility: ResourceVisibility;
  views_count: number;
  downloads_count: number;
  created_at: string;
  updated_at: string;
  uploader_name?: string | null;
  ac_count?: number;
  ai_tagging?: boolean;
}

const AUTO_LINK_THRESHOLD = 0.75;

export interface UploadItem {
  token: string;
  file: File;
  progress: number; // 0..1
  status: 'queued' | 'uploading' | 'saving' | 'done' | 'error';
  error?: string;
  resourceId?: string;
}

export function kindFromFile(file: File): ResourceKind {
  const m = file.type;
  if (!m) return 'other';
  if (m.startsWith('image/')) return 'image';
  if (m.startsWith('video/')) return 'video';
  if (m.startsWith('audio/')) return 'audio';
  if (m === 'application/pdf') return 'document';
  if (
    m === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    m === 'application/vnd.ms-powerpoint'
  )
    return 'slide';
  if (
    m === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    m === 'application/vnd.ms-excel' ||
    m === 'text/csv'
  )
    return 'sheet';
  if (
    m === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    m === 'application/msword' ||
    m === 'text/plain' ||
    m === 'text/markdown'
  )
    return 'document';
  return 'other';
}

function titleFromName(name: string): string {
  return name
    .replace(/\.[^./]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function useCollegeResources() {
  const { toast } = useToast();
  const [resources, setResources] = useState<CollegeResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const uploadTokenRef = useRef(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes?.user) {
        setResources([]);
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userRes.user.id)
        .maybeSingle();
      if (!profile?.college_id) {
        setResources([]);
        return;
      }
      const { data } = await supabase
        .from('college_resources')
        .select(
          'id, college_id, uploader_id, title, description, kind, file_path, external_url, mime_type, size_bytes, duration_seconds, thumbnail_path, tags, visibility, views_count, downloads_count, created_at, updated_at, college_staff(name)'
        )
        .eq('college_id', profile.college_id)
        .order('created_at', { ascending: false });

      // Fetch AC link counts per resource for badge display
      const resourceIds = (data ?? []).map((r) => r.id as string);
      const countByResource = new Map<string, number>();
      if (resourceIds.length > 0) {
        const { data: linkRows } = await supabase
          .from('resource_ac_links')
          .select('resource_id')
          .in('resource_id', resourceIds);
        for (const row of (linkRows ?? []) as { resource_id: string }[]) {
          countByResource.set(
            row.resource_id,
            (countByResource.get(row.resource_id) ?? 0) + 1
          );
        }
      }

      setResources(
        ((data ?? []) as unknown as (CollegeResource & {
          college_staff: { name: string } | null;
        })[]).map((r) => ({
          ...r,
          uploader_name: r.college_staff?.name ?? null,
          ac_count: countByResource.get(r.id) ?? 0,
        }))
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /** Upload a single file. Returns the created resource row. */
  const uploadFile = useCallback(
    async (file: File, opts?: { title?: string; tags?: string[] }) => {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes?.user) throw new Error('Not signed in');
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userRes.user.id)
        .maybeSingle();
      if (!profile?.college_id) throw new Error('No college for current user');
      const { data: staff } = await supabase
        .from('college_staff')
        .select('id')
        .eq('user_id', userRes.user.id)
        .eq('college_id', profile.college_id)
        .maybeSingle();

      const resourceId = crypto.randomUUID();
      const safeName = file.name.replace(/[^\w.\-() ]/g, '_');
      const path = `${profile.college_id}/${resourceId}/${safeName}`;

      const { error: upErr } = await supabase.storage
        .from('college-resources')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type || undefined,
        });
      if (upErr) throw upErr;

      const kind = kindFromFile(file);
      const title = opts?.title?.trim() || titleFromName(file.name);

      const { data: inserted, error: insErr } = await supabase
        .from('college_resources')
        .insert({
          id: resourceId,
          college_id: profile.college_id,
          uploader_id: staff?.id ?? null,
          title,
          kind,
          file_path: path,
          mime_type: file.type || null,
          size_bytes: file.size,
          tags: opts?.tags ?? [],
          visibility: 'tutors',
        })
        .select(
          'id, college_id, uploader_id, title, description, kind, file_path, external_url, mime_type, size_bytes, duration_seconds, thumbnail_path, tags, visibility, views_count, downloads_count, created_at, updated_at'
        )
        .maybeSingle();
      if (insErr || !inserted) {
        // Roll back the blob if the insert failed so we don't leak files
        await supabase.storage.from('college-resources').remove([path]);
        throw insErr ?? new Error('Resource insert failed');
      }
      return inserted as CollegeResource;
    },
    []
  );

  /**
   * Fire the AI auto-tagger for a resource, silently. High-confidence
   * suggestions (≥ 0.75) are written as resource_ac_links immediately so
   * the tutor sees them already linked when they open the resource. Lower
   * confidence results are ignored here — the "✨ AI suggest" button in
   * the preview sheet will re-fetch if the tutor wants a wider review.
   */
  const autoTagInBackground = useCallback(
    async (resourceId: string) => {
      // Mark as tagging so UI can show a subtle spinner on the card
      setResources((prev) =>
        prev.map((r) => (r.id === resourceId ? { ...r, ai_tagging: true } : r))
      );
      try {
        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;
        if (!token) return;
        const res = await fetch(
          'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/ai-tag-resource',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ resource_id: resourceId }),
          }
        );
        if (!res.ok) return;
        const body = (await res.json()) as {
          suggestions?: Array<{
            qualification_code: string;
            unit_code: string;
            ac_code: string;
            confidence: number;
          }>;
        };
        const toInsert = (body.suggestions ?? []).filter(
          (s) => Number(s.confidence) >= AUTO_LINK_THRESHOLD
        );
        if (toInsert.length === 0) return;
        // Insert high-confidence ones as ai_suggested (tutor can still review/remove).
        // Swallow duplicate-key violations gracefully.
        for (const s of toInsert) {
          await supabase
            .from('resource_ac_links')
            .insert({
              resource_id: resourceId,
              qualification_code: s.qualification_code,
              unit_code: s.unit_code,
              ac_code: s.ac_code,
              mapping_source: 'ai_suggested',
              confidence: s.confidence,
            })
            .then(({ error }) => {
              if (error && !error.message.includes('duplicate key')) {
                console.warn('[auto-tag link failed]', error);
              }
            });
        }
        // Reflect count on the card
        setResources((prev) =>
          prev.map((r) =>
            r.id === resourceId
              ? { ...r, ac_count: (r.ac_count ?? 0) + toInsert.length }
              : r
          )
        );
      } catch (e) {
        console.warn('[auto-tag error]', e);
      } finally {
        setResources((prev) =>
          prev.map((r) => (r.id === resourceId ? { ...r, ai_tagging: false } : r))
        );
      }
    },
    []
  );

  /** Queue and process a batch of files through the upload flow. */
  const uploadMany = useCallback(
    async (files: File[]) => {
      const items: UploadItem[] = files.map((f) => ({
        token: `up-${++uploadTokenRef.current}`,
        file: f,
        progress: 0,
        status: 'queued',
      }));
      setUploads((prev) => [...items, ...prev]);

      for (const item of items) {
        setUploads((prev) =>
          prev.map((u) => (u.token === item.token ? { ...u, status: 'uploading' } : u))
        );
        try {
          const row = await uploadFile(item.file);
          setUploads((prev) =>
            prev.map((u) =>
              u.token === item.token
                ? { ...u, status: 'done', progress: 1, resourceId: row.id }
                : u
            )
          );
          // Mark the new row as currently AI-tagging so the card spinner shows
          setResources((prev) => [
            { ...row, ac_count: 0, ai_tagging: true },
            ...prev,
          ]);
          // Fire-and-forget — tutor doesn't wait
          autoTagInBackground(row.id);
        } catch (e) {
          setUploads((prev) =>
            prev.map((u) =>
              u.token === item.token
                ? { ...u, status: 'error', error: (e as Error).message }
                : u
            )
          );
          toast({
            title: `Upload failed · ${item.file.name}`,
            description: (e as Error).message,
            variant: 'destructive',
          });
        }
      }
    },
    [uploadFile, autoTagInBackground, toast]
  );

  /** Add an external link resource (no file). */
  const addLink = useCallback(
    async (args: { title: string; url: string; description?: string; tags?: string[] }) => {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes?.user) throw new Error('Not signed in');
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userRes.user.id)
        .maybeSingle();
      if (!profile?.college_id) throw new Error('No college for current user');
      const { data: staff } = await supabase
        .from('college_staff')
        .select('id')
        .eq('user_id', userRes.user.id)
        .eq('college_id', profile.college_id)
        .maybeSingle();

      const { data: inserted, error } = await supabase
        .from('college_resources')
        .insert({
          college_id: profile.college_id,
          uploader_id: staff?.id ?? null,
          title: args.title.trim(),
          description: args.description?.trim() || null,
          kind: 'link',
          external_url: args.url.trim(),
          tags: args.tags ?? [],
          visibility: 'tutors',
        })
        .select(
          'id, college_id, uploader_id, title, description, kind, file_path, external_url, mime_type, size_bytes, duration_seconds, thumbnail_path, tags, visibility, views_count, downloads_count, created_at, updated_at'
        )
        .maybeSingle();
      if (error || !inserted) throw error ?? new Error('Insert failed');
      const row = inserted as CollegeResource;
      setResources((prev) => [{ ...row, ac_count: 0, ai_tagging: true }, ...prev]);
      autoTagInBackground(row.id);
      return row;
    },
    [autoTagInBackground]
  );

  const removeUploadItem = useCallback((token: string) => {
    setUploads((prev) => prev.filter((u) => u.token !== token));
  }, []);

  const clearFinishedUploads = useCallback(() => {
    setUploads((prev) => prev.filter((u) => u.status !== 'done'));
  }, []);

  const deleteResource = useCallback(
    async (resourceId: string) => {
      const row = resources.find((r) => r.id === resourceId);
      setResources((prev) => prev.filter((r) => r.id !== resourceId));
      try {
        if (row?.file_path) {
          await supabase.storage.from('college-resources').remove([row.file_path]);
        }
        const { error } = await supabase
          .from('college_resources')
          .delete()
          .eq('id', resourceId);
        if (error) throw error;
      } catch (e) {
        toast({
          title: 'Delete failed',
          description: (e as Error).message,
          variant: 'destructive',
        });
        // Restore optimistic removal
        if (row) setResources((prev) => [row, ...prev]);
      }
    },
    [resources, toast]
  );

  /** Sign a private file for download / preview. Expires in 1 hour. */
  const signedUrl = useCallback(async (filePath: string) => {
    const { data, error } = await supabase.storage
      .from('college-resources')
      .createSignedUrl(filePath, 60 * 60);
    if (error || !data) throw error ?? new Error('Sign URL failed');
    return data.signedUrl;
  }, []);

  return {
    resources,
    loading,
    error,
    uploads,
    uploadMany,
    addLink,
    removeUploadItem,
    clearFinishedUploads,
    deleteResource,
    signedUrl,
    refresh: load,
  };
}
