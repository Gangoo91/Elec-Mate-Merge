import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   useResourceLinks — AC + lesson linking for a single resource.
   ========================================================================== */

export interface ResourceAcLink {
  id: string;
  resource_id: string;
  qualification_code: string;
  unit_code: string;
  ac_code: string;
  mapping_source: 'tutor' | 'ai_suggested' | 'ai_confirmed';
  confidence: number | null;
}

export interface ResourceLessonLink {
  id: string;
  resource_id: string;
  lesson_plan_id: string;
  lesson_title?: string | null;
}

export function useResourceLinks(resourceId: string | null) {
  const { toast } = useToast();
  const [acLinks, setAcLinks] = useState<ResourceAcLink[]>([]);
  const [lessonLinks, setLessonLinks] = useState<ResourceLessonLink[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!resourceId) {
      setAcLinks([]);
      setLessonLinks([]);
      return;
    }
    setLoading(true);
    try {
      const [acRes, lRes] = await Promise.all([
        supabase
          .from('resource_ac_links')
          .select(
            'id, resource_id, qualification_code, unit_code, ac_code, mapping_source, confidence'
          )
          .eq('resource_id', resourceId)
          .order('unit_code')
          .order('ac_code'),
        supabase
          .from('resource_lesson_links')
          .select('id, resource_id, lesson_plan_id, college_lesson_plans(title)')
          .eq('resource_id', resourceId),
      ]);
      setAcLinks((acRes.data ?? []) as ResourceAcLink[]);
      setLessonLinks(
        ((lRes.data ?? []) as unknown as {
          id: string;
          resource_id: string;
          lesson_plan_id: string;
          college_lesson_plans: { title: string | null } | null;
        }[]).map((r) => ({
          id: r.id,
          resource_id: r.resource_id,
          lesson_plan_id: r.lesson_plan_id,
          lesson_title: r.college_lesson_plans?.title ?? null,
        }))
      );
    } finally {
      setLoading(false);
    }
  }, [resourceId]);

  useEffect(() => {
    load();
  }, [load]);

  const addAcLink = useCallback(
    async (args: { qualification_code: string; unit_code: string; ac_code: string }) => {
      if (!resourceId) return;
      const { data, error } = await supabase
        .from('resource_ac_links')
        .insert({
          resource_id: resourceId,
          qualification_code: args.qualification_code,
          unit_code: args.unit_code,
          ac_code: args.ac_code,
          mapping_source: 'tutor',
        })
        .select(
          'id, resource_id, qualification_code, unit_code, ac_code, mapping_source, confidence'
        )
        .maybeSingle();
      if (error) {
        toast({
          title: 'Could not link AC',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      if (data) setAcLinks((prev) => [...prev, data as ResourceAcLink]);
    },
    [resourceId, toast]
  );

  const removeAcLink = useCallback(
    async (id: string) => {
      setAcLinks((prev) => prev.filter((l) => l.id !== id));
      const { error } = await supabase.from('resource_ac_links').delete().eq('id', id);
      if (error) {
        toast({
          title: 'Could not remove',
          description: error.message,
          variant: 'destructive',
        });
        load();
      }
    },
    [load, toast]
  );

  const addLessonLink = useCallback(
    async (lessonPlanId: string) => {
      if (!resourceId) return;
      const { data: userRes } = await supabase.auth.getUser();
      let staffId: string | null = null;
      if (userRes?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('college_id')
          .eq('id', userRes.user.id)
          .maybeSingle();
        if (profile?.college_id) {
          const { data: staff } = await supabase
            .from('college_staff')
            .select('id')
            .eq('user_id', userRes.user.id)
            .eq('college_id', profile.college_id)
            .maybeSingle();
          staffId = staff?.id ?? null;
        }
      }

      const { data, error } = await supabase
        .from('resource_lesson_links')
        .insert({ resource_id: resourceId, lesson_plan_id: lessonPlanId, added_by: staffId })
        .select('id, resource_id, lesson_plan_id, college_lesson_plans(title)')
        .maybeSingle();
      if (error) {
        toast({
          title: 'Could not attach',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      if (data) {
        const row = data as unknown as {
          id: string;
          resource_id: string;
          lesson_plan_id: string;
          college_lesson_plans: { title: string | null } | null;
        };
        setLessonLinks((prev) => [
          ...prev,
          {
            id: row.id,
            resource_id: row.resource_id,
            lesson_plan_id: row.lesson_plan_id,
            lesson_title: row.college_lesson_plans?.title ?? null,
          },
        ]);
      }
    },
    [resourceId, toast]
  );

  const removeLessonLink = useCallback(
    async (id: string) => {
      setLessonLinks((prev) => prev.filter((l) => l.id !== id));
      const { error } = await supabase
        .from('resource_lesson_links')
        .delete()
        .eq('id', id);
      if (error) {
        toast({
          title: 'Could not detach',
          description: error.message,
          variant: 'destructive',
        });
        load();
      }
    },
    [load, toast]
  );

  return {
    acLinks,
    lessonLinks,
    loading,
    addAcLink,
    removeAcLink,
    addLessonLink,
    removeLessonLink,
    refresh: load,
  };
}

/* ==========================================================================
   useLessonResources — list resources attached to ONE lesson plan.
   Used on the LessonPlanPage to render "Attached resources".
   ========================================================================== */

export interface LessonAttachedResource {
  id: string;
  link_id: string;
  title: string;
  kind: string;
  file_path: string | null;
  external_url: string | null;
  mime_type: string | null;
}

export function useLessonResources(lessonPlanId: string | null) {
  const [resources, setResources] = useState<LessonAttachedResource[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!lessonPlanId) {
      setResources([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await supabase
        .from('resource_lesson_links')
        .select(
          'id, college_resources(id, title, kind, file_path, external_url, mime_type)'
        )
        .eq('lesson_plan_id', lessonPlanId);
      setResources(
        ((data ?? []) as unknown as {
          id: string;
          college_resources: {
            id: string;
            title: string;
            kind: string;
            file_path: string | null;
            external_url: string | null;
            mime_type: string | null;
          } | null;
        }[])
          .filter((r) => r.college_resources)
          .map((r) => ({
            id: r.college_resources!.id,
            link_id: r.id,
            title: r.college_resources!.title,
            kind: r.college_resources!.kind,
            file_path: r.college_resources!.file_path,
            external_url: r.college_resources!.external_url,
            mime_type: r.college_resources!.mime_type,
          }))
      );
    } finally {
      setLoading(false);
    }
  }, [lessonPlanId]);

  useEffect(() => {
    load();
  }, [load]);

  return { resources, loading, refresh: load };
}
