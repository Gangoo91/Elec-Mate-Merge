import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   usePolicyTemplates — Compliance Phase 6.

   Read-only catalogue of platform-shared starter policy markdown. Any
   authenticated user can SELECT (RLS scopes to status='live'); only the
   migration / service role can INSERT/UPDATE.

   Cloning is a separate flow: insert into college_policies (v0 draft)
   carrying the cloned content_md + suggested category/owner_role. The
   college's normal review-and-publish pipeline takes over from there.
   ========================================================================== */

export interface PolicyTemplate {
  id: string;
  lookup_key: string;
  title: string;
  category: string;
  suggested_owner_role: string | null;
  requires_acknowledgement: boolean;
  summary: string;
  content_md: string;
  framework_citations: string[];
  ofsted_areas: string[];
  sort_rank: number;
}

export function usePolicyTemplates() {
  const { toast } = useToast();
  const [items, setItems] = useState<PolicyTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cloning, setCloning] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('policy_templates')
      .select(
        'id, lookup_key, title, category, suggested_owner_role, requires_acknowledgement, summary, content_md, framework_citations, ofsted_areas, sort_rank'
      )
      .eq('status', 'live')
      .order('sort_rank', { ascending: true });
    if (err) setError(err.message);
    setItems((data ?? []) as PolicyTemplate[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /**
   * Clone a template into the caller's college as a v1 draft policy.
   * Returns the new policy id on success so the caller can navigate to
   * the detail page. Throws (or shows a toast) on failure.
   */
  const clone = useCallback(
    async (template: PolicyTemplate): Promise<string | null> => {
      setCloning(template.id);
      try {
        const { data: userRes } = await supabase.auth.getUser();
        const uid = userRes?.user?.id;
        if (!uid) throw new Error('Not signed in');

        // Resolve college via `profiles.college_id` to match
        // AddPolicyDialog exactly. The earlier `college_staff.college_id`
        // lookup was inconsistent: a user with a profiles.college_id but
        // no college_staff row could create policies via Add but not via
        // Templates, which is confusing and asymmetric.
        const { data: profile } = await supabase
          .from('profiles')
          .select('college_id')
          .eq('id', uid)
          .maybeSingle();
        const collegeId =
          ((profile as { college_id?: string } | null)?.college_id as string | null) ?? null;
        if (!collegeId) {
          throw new Error('Your account isn\u2019t linked to a college.');
        }

        const { data: inserted, error: insErr } = await supabase
          .from('college_policies')
          .insert({
            college_id: collegeId,
            title: template.title,
            category: template.category,
            content_md: template.content_md,
            owner_role: template.suggested_owner_role,
            requires_acknowledgement: template.requires_acknowledgement,
            status: 'draft',
            // Match AddPolicyDialog: drafts start at v1, not v0. Otherwise
            // publishVersion() lands at v0 because it computes
            // `version + (status==='live' ? 1 : 0)` on a draft.
            version: 1,
            // Audit: stamp the cloning user so PolicyDetailPage's
            // version history shows who created this from a template,
            // not just an anonymous draft.
            created_by: uid,
          })
          .select('id')
          .single();
        if (insErr) throw insErr;
        const newId = (inserted as { id: string } | null)?.id ?? null;
        toast({
          title: 'Template cloned',
          description: `"${template.title}" saved as a draft. Review and publish when ready.`,
        });
        return newId;
      } catch (e) {
        toast({
          title: 'Could not clone template',
          description: (e as Error).message,
          variant: 'destructive',
        });
        return null;
      } finally {
        setCloning(null);
      }
    },
    [toast]
  );

  return { items, loading, error, refresh, clone, cloning };
}
