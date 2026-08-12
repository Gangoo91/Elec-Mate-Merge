/**
 * RAMS results — its own route, `/electrician/site-safety/ai-rams/:jobId`.
 *
 * Results used to live inside AIRAMSGenerator behind a `showResults` boolean.
 * That meant a refresh, a shared link or the browser Back button all threw the
 * finished document away, because the only handle on it was React state. The
 * job id is the natural identity for a generated RAMS, so it belongs in the URL.
 *
 * The page loads the job by id, so it is refresh-safe and linkable.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { RAMSDocumentTabs } from '@/components/electrician-tools/site-safety/ai-rams/RAMSDocumentTabs';
import { useRAMSJobPolling } from '@/hooks/useRAMSJobPolling';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { generateRAMSPDF } from '@/utils/rams-pdf-professional';
import { generateMethodStatementPDF } from '@/utils/method-statement-pdf';
import type { RAMSData, RAMSRisk } from '@/types/rams';
import type { MethodStatementData, MethodStep } from '@/types/method-statement';

const SITE_SAFETY = '/electrician/site-safety';

/**
 * The method agent writes two shapes: a flat `steps[]` and a much richer
 * `method_steps[]` carrying phase, objective, hold points, acceptance criteria,
 * quality checks, named instruments, BS 7671 citations and the hazards each
 * step controls. Flatten the rich fields onto the step the UI renders, keyed by
 * id — without this the cards show a title and a paragraph and discard the rest.
 */
function mergeV2Steps(
  method?: Partial<MethodStatementData>
): Partial<MethodStatementData> | undefined {
  if (!method) return method;
  const v2 = (method as { method_steps?: Array<Record<string, unknown>> }).method_steps;
  if (!Array.isArray(v2) || !method.steps?.length) return method;

  const byId = new Map(v2.filter((s) => s?.id).map((s) => [String(s.id), s]));
  return {
    ...method,
    steps: method.steps.map((step, i) => {
      const rich = byId.get(String(step.id ?? `step-${i + 1}`));
      return rich ? ({ ...rich, ...step } as MethodStep) : step;
    }),
  };
}

const RAMSResultsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const { job, status, ramsData, methodData, startPolling } = useRAMSJobPolling(jobId ?? null);

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [loadAttempted, setLoadAttempted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  /**
   * Local working copy. Seeded from the job and then owned here, so edits are
   * immediate. Only adopts an incoming half while the local one is still empty —
   * a late-arriving prop must never overwrite something the user has typed.
   */
  const [doc, setDoc] = useState<{
    rams?: RAMSData;
    method?: Partial<MethodStatementData>;
  }>({});

  useEffect(() => {
    setDoc((prev) => ({
      rams: prev.rams?.risks?.length ? prev.rams : (ramsData as RAMSData | undefined),
      method: prev.method?.steps?.length
        ? prev.method
        : mergeV2Steps(methodData as Partial<MethodStatementData> | undefined),
    }));
  }, [ramsData, methodData]);

  const patchRisk = useCallback((riskId: string, updates: Record<string, unknown>) => {
    setDoc((p) => ({
      ...p,
      rams: p.rams
        ? {
            ...p.rams,
            risks: (p.rams.risks ?? []).map((r) =>
              r.id === riskId ? ({ ...r, ...updates } as RAMSRisk) : r
            ),
          }
        : p.rams,
    }));
  }, []);

  const removeRisk = useCallback((riskId: string) => {
    setDoc((p) => ({
      ...p,
      rams: p.rams ? { ...p.rams, risks: (p.rams.risks ?? []).filter((r) => r.id !== riskId) } : p.rams,
    }));
  }, []);

  const addRisk = useCallback(() => {
    setDoc((p) => {
      if (!p.rams) return p;
      const blank = {
        id: `risk-${Date.now()}`,
        hazard: '',
        risk: '',
        controls: '',
        likelihood: 3,
        severity: 3,
        riskRating: 9,
      } as RAMSRisk;
      return { ...p, rams: { ...p.rams, risks: [...(p.rams.risks ?? []), blank] } };
    });
  }, []);

  const patchStep = useCallback((stepId: string, updates: Record<string, unknown>) => {
    setDoc((p) => ({
      ...p,
      method: p.method
        ? {
            ...p.method,
            steps: (p.method.steps ?? []).map((s) =>
              s.id === stepId ? ({ ...s, ...updates } as MethodStep) : s
            ),
          }
        : p.method,
    }));
  }, []);

  const removeStep = useCallback((stepId: string) => {
    setDoc((p) => ({
      ...p,
      method: p.method
        ? { ...p.method, steps: (p.method.steps ?? []).filter((s) => s.id !== stepId) }
        : p.method,
    }));
  }, []);

  const addStep = useCallback(() => {
    setDoc((p) => {
      if (!p.method) return p;
      const n = (p.method.steps ?? []).length + 1;
      const blank = {
        id: `step-${Date.now()}`,
        stepNumber: n,
        title: '',
        description: '',
        estimatedDuration: '15 minutes',
        riskLevel: 'low',
      } as unknown as MethodStep;
      return { ...p, method: { ...p.method, steps: [...(p.method.steps ?? []), blank] } };
    });
  }, []);

  // One fetch on mount. The hook stops polling by itself once the job is in a
  // terminal state, so a finished job costs exactly one request.
  useEffect(() => {
    if (!jobId) return;
    startPolling();
    const t = window.setTimeout(() => setLoadAttempted(true), 1500);
    return () => window.clearTimeout(t);
  }, [jobId, startPolling]);

  const handleSave = useCallback(async () => {
    if (!jobId || !doc.rams) return;
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const { error } = await supabase
        .from('rams_generation_jobs')
        // Cast at the boundary only: these are plain JSON documents, but the
        // generated Supabase types model the columns as `Json`, which our
        // domain interfaces don't structurally satisfy.
        .update({
          rams_data: doc.rams as unknown as never,
          method_data: doc.method as unknown as never,
        })
        .eq('id', jobId)
        .eq('user_id', user.id);
      if (error) throw error;

      setLastSaved(new Date());
      toast({ title: 'Saved', description: 'Your changes have been saved.' });
    } catch (err) {
      toast({
        title: 'Could not save',
        description: err instanceof Error ? err.message : 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  }, [jobId, doc]);

  /** Saves first so the PDF can never be generated from stale data. */
  const runExport = useCallback(
    async (kind: 'combined' | 'rams' | 'method') => {
      if (!doc.rams) return;
      setIsExporting(true);
      try {
        await handleSave();
        if (kind === 'method') {
          await generateMethodStatementPDF(doc.method as MethodStatementData);
        } else {
          await generateRAMSPDF(doc.rams, kind === 'combined' ? (doc.method as never) : undefined);
        }
      } catch (err) {
        toast({
          title: 'Export failed',
          description: err instanceof Error ? err.message : 'Could not build the PDF.',
          variant: 'destructive',
        });
      } finally {
        setIsExporting(false);
      }
    },
    [doc, handleSave]
  );

  const handleRetryAgent = useCallback(
    async (agent: 'hs' | 'method') => {
      if (!jobId) return;
      const { data, error } = await supabase.functions.invoke('rams-generator', {
        body: { action: 'retry-agent', jobId, agent },
      });
      if (error || !data?.jobId) {
        toast({
          title: 'Retry failed',
          description: error?.message || data?.error || 'Could not retry.',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Retrying',
        description:
          agent === 'hs' ? 'Regenerating the risk assessment.' : 'Regenerating the method statement.',
      });
      startPolling();
    },
    [jobId, startPolling]
  );

  const projectName =
    (ramsData as { projectName?: string } | undefined)?.projectName ||
    (methodData as { jobTitle?: string } | undefined)?.jobTitle ||
    'RAMS';

  const isRunning = status === 'pending' || status === 'processing';
  const hasAnything = !!ramsData || !!methodData;

  // Still loading, or a retry is mid-flight with nothing to show yet.
  if (!hasAnything && (!loadAttempted || isRunning)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        {/* The hook reports 'pending' until its first fetch resolves, so a
            finished job would otherwise read "Still generating…" on load.
            Only claim that once we've actually seen the row. */}
        <p className="text-[13px] text-white">
          {job && isRunning ? 'Still generating…' : 'Loading your RAMS…'}
        </p>
      </div>
    );
  }

  if (!hasAnything) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-[20px] font-semibold text-white">RAMS not found</h1>
        <p className="max-w-sm text-[13px] leading-relaxed text-white">
          This job either doesn&rsquo;t exist or belongs to another account.
        </p>
        <button
          type="button"
          onClick={() => navigate(SITE_SAFETY)}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation"
        >
          Back to Site Safety
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-elec-dark">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-elec-dark/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6 md:px-10 lg:px-16">
          <button
            type="button"
            onClick={() => navigate(SITE_SAFETY)}
            className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-medium text-white transition-colors hover:text-elec-yellow touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            RAMS
          </span>
          <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">
            {projectName}
          </span>
          <span
            className={cn(
              'shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.18em]',
              status === 'partial' ? 'text-amber-400' : 'text-emerald-400'
            )}
          >
            {status === 'partial' ? 'Generated with gaps' : 'Complete'}
          </span>
        </div>
      </header>

      {/* Body — enters as a continuation of the generating screen, not a jump cut. */}
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="px-4 py-4 sm:px-6 sm:py-6 md:px-10 lg:px-16"
      >
        <RAMSDocumentTabs
          ramsData={doc.rams}
          methodData={doc.method}
          editable
          isExporting={isExporting}
          onUpdateRisk={patchRisk}
          onRemoveRisk={removeRisk}
          onAddRisk={addRisk}
          onUpdateStep={patchStep}
          onRemoveStep={removeStep}
          onAddStep={addStep}
          onExportCombined={() => runExport('combined')}
          onExportRams={() => runExport('rams')}
          onExportMethod={() => runExport('method')}
        />
      </motion.main>
    </div>
  );
};

export default RAMSResultsPage;
