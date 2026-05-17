import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SnagAnalysis {
  /** Mate's title suggestion at the time the photo was analysed. */
  title?: string;
  /** Mate's priority suggestion. */
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  /** AI-generated details (may include inline reg citation). */
  details?: string;
  /** AI-guessed location hint. */
  location_hint?: string | null;
  /** RAG-grounded BS 7671 citations the synthesis used. */
  citations?: Array<{ ref: string; topic?: string }>;
  /** True if the synthesis pass anchored on RAG, false if vision-only. */
  grounded?: boolean;
}

export interface SnagPhoto {
  id: string;
  url: string;
  caption?: string;
  /** Stored AI analysis from parse-snag-photo (when this photo was used to suggest the snag). */
  analysis?: SnagAnalysis;
}

export interface Snag {
  id: string;
  title: string;
  details?: string;
  status: string;
  priority: string;
  location?: string;
  projectId?: string;
  projectTitle?: string;
  tags: string[];
  photos: SnagPhoto[];
  createdAt: string;
  completedAt?: string;
}

export interface SnagCounts {
  open: number;
  resolved: number;
  critical: number;
}

interface SnagRow {
  id: string;
  title: string;
  details?: string | null;
  status: string;
  priority: string;
  location?: string | null;
  project_id?: string | null;
  tags?: string[] | null;
  created_at: string;
  completed_at?: string | null;
}

interface ProjectGroup {
  projectId: string | null;
  projectTitle: string;
  snags: Snag[];
}

export interface SnagPhotoUpload {
  /** Raw base64 (without data: prefix). */
  base64: string;
  /** Mime type — image/jpeg | image/png | image/heic | image/webp. */
  type: string;
  /**
   * Optional AI analysis result from parse-snag-photo — stored on the
   * photo_analyses row so the suggestion is preserved alongside the photo.
   */
  analysis?: Record<string, unknown>;
}

export interface CreateSnagInput {
  title: string;
  details?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  location?: string;
  projectId?: string;
  /** Optional photos to attach after the snag row is inserted. */
  photos?: SnagPhotoUpload[];
}

export interface ProjectOption {
  id: string;
  title: string;
}

export const useSnags = () => {
  const { toast } = useToast();
  const [snags, setSnags] = useState<Snag[]>([]);
  const [projects, setProjects] = useState<ProjectGroup[]>([]);
  const [projectList, setProjectList] = useState<ProjectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef(false);

  const loadSnags = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setSnags([]);
        setProjects([]);
        return;
      }

      // Fetch tasks tagged as snagging
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('spark_tasks')
        .select(
          'id, title, details, status, priority, location, project_id, tags, created_at, completed_at'
        )
        .eq('user_id', user.id)
        .contains('tags', ['snagging'])
        .neq('status', 'cancelled')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const rows = (data || []) as SnagRow[];

      // Fetch project titles for grouped display
      const projectIds = [...new Set(rows.filter((r) => r.project_id).map((r) => r.project_id!))];
      let projectMap: Record<string, string> = {};

      if (projectIds.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: projectData } = await (supabase as any)
          .from('spark_projects')
          .select('id, title')
          .in('id', projectIds);

        if (projectData) {
          projectMap = Object.fromEntries(
            projectData.map((p: { id: string; title: string }) => [p.id, p.title])
          );
        }
      }

      // Fetch all user projects for the add-snag project picker
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: allProjects } = await (supabase as any)
        .from('spark_projects')
        .select('id, title')
        .eq('user_id', user.id)
        .order('title', { ascending: true });

      if (allProjects) {
        setProjectList(
          allProjects.map((p: { id: string; title: string }) => ({ id: p.id, title: p.title }))
        );
      }

      // Fetch photos linked to snag tasks via photo_analyses
      const snagIds = rows.map((r) => r.id);
      const photoMap: Record<string, SnagPhoto[]> = {};

      if (snagIds.length > 0) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: photoData } = await (supabase as any)
            .from('photo_analyses')
            .select('id, image_url, analysis_result, linked_task_id')
            .in('linked_task_id', snagIds);

          if (photoData) {
            for (const p of photoData as {
              id: string;
              image_url: string;
              analysis_result?: Record<string, unknown> | null;
              linked_task_id: string;
            }[]) {
              const taskId = p.linked_task_id;
              if (!photoMap[taskId]) photoMap[taskId] = [];
              const analysis = (p.analysis_result as Record<string, unknown>) || null;
              photoMap[taskId].push({
                id: p.id,
                url: p.image_url,
                caption: analysis?.caption as string | undefined,
                analysis:
                  analysis && (analysis.title || analysis.citations || analysis.grounded != null)
                    ? {
                        title: analysis.title as string | undefined,
                        priority: analysis.priority as
                          | 'low'
                          | 'normal'
                          | 'high'
                          | 'urgent'
                          | undefined,
                        details: analysis.details as string | undefined,
                        location_hint: (analysis.location_hint as string | null | undefined) ?? null,
                        citations: Array.isArray(analysis.citations)
                          ? (analysis.citations as Array<{ ref: string; topic?: string }>)
                          : [],
                        grounded: analysis.grounded as boolean | undefined,
                      }
                    : undefined,
              });
            }
          }
        } catch {
          // photo_analyses query may fail if column doesn't exist — non-critical
        }
      }

      const mapped: Snag[] = rows.map((r) => ({
        id: r.id,
        title: r.title,
        details: r.details || undefined,
        status: r.status,
        priority: r.priority,
        location: r.location || undefined,
        projectId: r.project_id || undefined,
        projectTitle: r.project_id ? projectMap[r.project_id] || 'Unknown Project' : undefined,
        tags: r.tags || [],
        photos: photoMap[r.id] || [],
        createdAt: r.created_at,
        completedAt: r.completed_at || undefined,
      }));

      setSnags(mapped);

      // Group by project
      const grouped: Record<string, ProjectGroup> = {};
      for (const snag of mapped) {
        const key = snag.projectId || '__unassigned__';
        if (!grouped[key]) {
          grouped[key] = {
            projectId: snag.projectId || null,
            projectTitle: snag.projectTitle || 'Unassigned',
            snags: [],
          };
        }
        grouped[key].snags.push(snag);
      }
      setProjects(Object.values(grouped));
    } catch (error) {
      console.error('Failed to load snags:', error);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadSnags();

    // Realtime subscription for snagging tasks
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const setupRealtime = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      channel = supabase
        .channel('snags-realtime')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'spark_tasks',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const row = (payload.new || {}) as Record<string, unknown>;
            const tags = Array.isArray(row.tags) ? row.tags : [];
            if (tags.includes('snagging')) {
              if (payload.eventType === 'INSERT') {
                toast({
                  title: 'New Snag',
                  description: (row.title as string) || 'Snag added',
                  duration: 4000,
                });
              }
              loadSnags();
            }
          }
        )
        .subscribe();
    };

    setupRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [loadSnags, toast]);

  const resolveSnag = async (id: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Optimistic update
      setSnags((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: 'done', completedAt: new Date().toISOString() } : s
        )
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('spark_tasks')
        .update({ status: 'done', completed_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({ title: 'Snag resolved', description: 'Marked as done.' });
      loadSnags();
    } catch (error) {
      loadSnags(); // Rollback via refresh
      toast({ title: 'Failed to resolve snag', variant: 'destructive' });
    }
  };

  const createSnag = async (input: CreateSnagInput) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: created, error } = await (supabase as any)
        .from('spark_tasks')
        .insert({
          user_id: user.id,
          title: input.title,
          details: input.details || null,
          status: 'open',
          priority: input.priority,
          location: input.location || null,
          project_id: input.projectId || null,
          tags: ['snagging'],
        })
        .select('id')
        .single();

      if (error) throw error;
      const snagId: string | undefined = created?.id;

      // Attach photos (best-effort — snag is saved even if a photo fails)
      if (snagId && input.photos && input.photos.length > 0) {
        await Promise.allSettled(
          input.photos.map(async (photo, idx) => {
            try {
              const ext = (photo.type.split('/')[1] || 'jpg').toLowerCase();
              const path = `${user.id}/${snagId}/${Date.now()}-${idx}.${ext}`;
              // Convert base64 → Blob for storage upload
              const binary = atob(photo.base64);
              const bytes = new Uint8Array(binary.length);
              for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
              const blob = new Blob([bytes], { type: photo.type });
              const { error: uploadError } = await supabase.storage
                .from('job-photos')
                .upload(path, blob, {
                  contentType: photo.type,
                  cacheControl: '3600',
                  upsert: false,
                });
              if (uploadError) throw uploadError;
              const {
                data: { publicUrl },
              } = supabase.storage.from('job-photos').getPublicUrl(path);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              await (supabase as any).from('photo_analyses').insert({
                user_id: user.id,
                analysis_type: 'snag-photo',
                image_url: publicUrl,
                analysis_result: photo.analysis || {},
                observations: [],
                linked_task_id: snagId,
              });
            } catch (err) {
              console.warn('Snag photo upload failed:', err);
            }
          })
        );
      }

      toast({ title: 'Snag added', description: input.title });
      loadSnags();
    } catch (error) {
      console.error('Failed to create snag:', error);
      toast({ title: 'Failed to add snag', variant: 'destructive' });
    }
  };

  const counts: SnagCounts = {
    open: snags.filter((s) => s.status === 'open').length,
    resolved: snags.filter((s) => s.status === 'done').length,
    critical: snags.filter(
      (s) => s.status === 'open' && (s.priority === 'urgent' || s.priority === 'high')
    ).length,
  };

  return {
    snags,
    projects,
    projectList,
    isLoading,
    counts,
    createSnag,
    resolveSnag,
    refreshSnags: loadSnags,
  };
};
