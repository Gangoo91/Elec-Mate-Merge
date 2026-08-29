/**
 * VisualConditionReport.tsx — ELE-1262
 *
 * A visual-only condition report for an existing installation. Requested by a
 * customer who left for a competitor over it, because a Minor Works Certificate
 * is genuinely the wrong document for work that is neither an addition nor an
 * alteration (BS 7671 defines minor works as "additions and alterations ... that
 * do not extend to the provision of a new circuit").
 *
 * 🔴 NOT a BS 7671 model form, and nothing here may imply that it is. Modelled
 * on the NICEIC Domestic Visual Condition Report. See the header of
 * `data/visualConditionInspectionItems.ts` for the reasoning and the sources.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { reportCloud } from '@/utils/reportCloud';
import { useReportSync } from '@/hooks/useReportSync';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { scrollToTopForStepChange } from '@/utils/scroll';

import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import CertShellFooter from '@/components/inspection/shared/CertShellFooter';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import VisualConditionFormTabs from '@/components/inspection/visual-condition/VisualConditionFormTabs';
import { useVisualConditionTabs } from '@/hooks/useVisualConditionTabs';
import {
  getDefaultVisualConditionFormData,
  deriveVisualAssessment,
  type VisualConditionFormData,
} from '@/types/visual-condition';
import { formatVisualConditionJson } from '@/utils/visualConditionJsonFormatter';
import { generateCertificateNumber } from '@/utils/certificateNumbering';
import { findVisualPrefill, type VisualPrefill } from '@/utils/visual-condition-prefill';

const REPORT_TYPE = 'visual-condition' as const;
const BASE = '/electrician/inspection-testing/visual-condition';

const STEPS = [
  { id: 'client', label: 'Client' },
  { id: 'scope', label: 'Scope' },
  { id: 'installation', label: 'Supply' },
  { id: 'inspection', label: 'Inspect' },
  { id: 'declaration', label: 'Sign off' },
];

export default function VisualConditionReport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const { companyProfile } = useCompanyProfile();

  const [formData, setFormData] = useState<VisualConditionFormData>(
    getDefaultVisualConditionFormData()
  );
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );
  /* Latest form state for the loader, which must not close over a stale copy. */
  const prevRef = useRef(formData);
  prevRef.current = formData;

  const {
    status: syncStatus,
    saveNow,
    syncNowImmediate,
    onTabChange: syncOnTabChange,
  } = useReportSync({
    reportId: savedReportId,
    reportType: REPORT_TYPE,
    formData,
    enabled: !isLoading,
    // Gates autosave while loading from cloud — without it the empty default
    // state races the fetch and overwrites the stored report with blanks.
    isHydrating: isLoading,
    onReportCreated: (newId: string) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `${BASE}/${newId}`);
    },
  });

  /* ── Load an existing report ──────────────────────────────────────── */
  useEffect(() => {
    if (isNew || !id) {
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        const stored = await reportCloud.getReportData(id, user.id);
        if (stored && !cancelled) {
          const loaded = {
            ...getDefaultVisualConditionFormData(),
            ...prevRef.current,
            ...(stored as Partial<VisualConditionFormData>),
          } as VisualConditionFormData;

          /*
           * ⚠️ Normalise on load. `requiresTest` items cannot be answered
           * Satisfactory in the UI, but a stored report could still carry one —
           * if the flag was added to an item after the report was written, or
           * the row was edited outside the app. The chip row would then show
           * nothing selected while the PDF printed "Satisfactory", which is the
           * worst of both: it looks unanswered and prints a claim nobody made.
           */
          loaded.inspectionItems = loaded.inspectionItems.map((i) =>
            i.requiresTest && i.outcome === 'satisfactory'
              ? { ...i, outcome: 'further-investigation' as const }
              : i
          );

          setFormData(loaded);
          setSavedReportId(id);
        }
      } catch (err) {
        console.error('[VisualCondition] load failed:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, isNew]);

  /*
   * Allocate the report number once, on a NEW report.
   *
   * ⚠️ It was never allocated at all in the first cut — the reference printed
   * blank on the PDF and the file downloaded as "Visual-Condition-report.pdf".
   * Every other certificate type does this and it is easy to miss because
   * nothing fails: the document just comes out unidentified.
   *
   * Guarded on `!certificateNumber` so reopening a saved report never mints a
   * second number over the one already issued to a client.
   */
  useEffect(() => {
    if (!isNew || formData.certificateNumber) return;
    let cancelled = false;
    generateCertificateNumber(REPORT_TYPE)
      .then((num) => {
        if (!cancelled) {
          setFormData((prev) => (prev.certificateNumber ? prev : { ...prev, certificateNumber: num }));
        }
      })
      .catch((err) => console.error('[VisualCondition] number allocation failed:', err));
    return () => {
      cancelled = true;
    };
  }, [isNew, formData.certificateNumber]);

  /*
   * Offer the premises particulars from the last certificate at this address.
   *
   * Offered, never applied silently — the user typed the address, and having
   * six fields fill themselves without being asked is unnerving on a document
   * somebody signs. One tap to accept, one to dismiss.
   */
  const [prefill, setPrefill] = useState<VisualPrefill | null>(null);
  const [prefillDismissed, setPrefillDismissed] = useState(false);

  useEffect(() => {
    if (prefillDismissed || !formData.installationAddress) return;
    // Only worth offering while the report is still essentially blank.
    if (formData.earthingArrangement || formData.boardLocation) return;
    let cancelled = false;
    findVisualPrefill(formData.installationAddress, savedReportId ?? undefined)
      .then((p) => {
        if (!cancelled) setPrefill(p);
      })
      .catch(() => {
        /* convenience only — never block the form */
      });
    return () => {
      cancelled = true;
    };
  }, [
    formData.installationAddress,
    formData.earthingArrangement,
    formData.boardLocation,
    prefillDismissed,
    savedReportId,
  ]);

  const applyPrefill = () => {
    if (!prefill) return;
    setFormData((prev) => ({ ...prev, ...prefill.fields }));
    setPrefill(null);
    toast.success(`Filled from ${prefill.sourceType}`);
  };

  /*
   * Only the trading name is carried onto the report. The registration scheme
   * and number are properties of the BUSINESS, not of one visit — the PDF reads
   * them straight from the company profile, and keeping a second per-report
   * copy meant two sources that could disagree about the same fact.
   */
  useEffect(() => {
    if (!companyProfile) return;
    setFormData((prev) => ({
      ...prev,
      companyName: prev.companyName || companyProfile.company_name || '',
    }));
  }, [companyProfile]);

  const handleUpdate = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (field: keyof VisualConditionFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const tabs = useVisualConditionTabs(formData);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await saveNow();
      toast.success('Draft saved');
    } catch {
      toast.error('Could not save');
    } finally {
      setIsSaving(false);
    }
  };

  /*
   * A report with no answered items is not a report. The bar is deliberately
   * the inspection itself rather than a signature: a signed but unwalked form
   * is the failure mode worth preventing.
   */
  const answered = formData.inspectionItems.filter((i) => i.outcome !== '').length;
  const canGenerate =
    !!formData.clientName && !!formData.installationAddress && answered > 0;

  const handleGenerate = async () => {
    if (!canGenerate) {
      toast.error('Add the client, the address and at least one inspection result');
      return;
    }
    setIsGenerating(true);
    setShowGenerationDialog(true);
    setGenerationError(null);
    try {
      await syncNowImmediate();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const withOutcome: VisualConditionFormData = {
        ...formData,
        overallAssessment: deriveVisualAssessment(formData.observations, formData.inspectionItems),
      };
      const payload = formatVisualConditionJson(withOutcome, companyProfile);

      /*
       * Every autosave NULLs pdf_payload, so it is repopulated at generate —
       * server-side email regeneration reads it as its source.
       */
      if (savedReportId) {
        await supabase
          .from('reports')
          .update({ pdf_payload: payload })
          .eq('report_id', savedReportId);
      }

      const { data, error } = await supabase.functions.invoke(
        'generate-visual-condition-pdf',
        { body: { payload } }
      );
      if (error) throw new Error(error.message || 'PDF generation failed');
      if (!data?.success || !data?.pdfUrl) throw new Error(data?.error || 'No PDF returned');

      if (savedReportId) {
        await supabase
          .from('reports')
          .update({
            pdf_url: data.pdfUrl,
            pdf_generated_at: new Date().toISOString(),
            status: 'completed',
          })
          .eq('report_id', savedReportId);
      }

      setGeneratedPdfUrl(data.pdfUrl);
      toast.success('Visual condition report generated');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'PDF generation failed';
      console.error('[VisualCondition] generate failed:', err);
      setGenerationError(message);
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CertShellHeader
        onBack={() => navigate(-1)}
        title="Visual Condition Report"
        subtitle={formData.certificateNumber || 'Visual inspection only — no testing'}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={tabs.getProgressPercentage()}
        steps={STEPS}
        currentTab={tabs.currentTab}
        onTabChange={(tab: string) => {
          tabs.setCurrentTab(tab as typeof tabs.currentTab);
          syncOnTabChange();
          scrollToTopForStepChange();
        }}
        completedTabs={{
          client: tabs.isTabComplete('client'),
          scope: tabs.isTabComplete('scope'),
          installation: tabs.isTabComplete('installation'),
          inspection: tabs.isTabComplete('inspection'),
          declaration: tabs.isTabComplete('declaration'),
        }}
      />

      <main className="mx-auto max-w-3xl px-4 py-4 pb-32 lg:max-w-none lg:px-8 xl:max-w-[1700px]">
        {prefill && (
          <div className="mb-4 -mx-4 border-y border-elec-yellow/30 bg-elec-yellow/[0.08] p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
            <p className="text-[14px] font-semibold text-white">
              Fill from the {prefill.sourceType} at this address?
            </p>
            <p className="mt-1 text-[13px] leading-snug text-white">
              {prefill.sourceNumber ? `${prefill.sourceNumber} · ` : ''}
              Copies the client and the supply and board details. No test results are
              copied — this report records what you can see today.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={applyPrefill}
                className="h-11 flex-1 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black touch-manipulation active:scale-[0.98]"
              >
                Fill it in
              </button>
              <button
                onClick={() => {
                  setPrefill(null);
                  setPrefillDismissed(true);
                }}
                className="h-11 flex-1 rounded-xl border border-white/[0.16] bg-white/[0.06] text-[14px] font-semibold text-white touch-manipulation active:scale-[0.98]"
              >
                No thanks
              </button>
            </div>
          </div>
        )}

        <VisualConditionFormTabs
          currentTab={tabs.currentTab}
          formData={formData}
          onUpdate={handleUpdate}
        />
      </main>

      <CertShellFooter
        currentIndex={tabs.currentTabIndex}
        totalSteps={tabs.totalTabs}
        canPrevious={tabs.canNavigatePrevious}
        canNext={tabs.canNavigateNext}
        onPrevious={tabs.navigatePrevious}
        onNext={() => {
          tabs.navigateNext();
          syncOnTabChange();
          scrollToTopForStepChange();
        }}
        nextLabels={['Scope', 'Supply', 'Inspect', 'Sign off', '']}
        isLastStep={tabs.currentTabIndex === tabs.totalTabs - 1}
        onGenerate={handleGenerate}
        canGenerate={canGenerate}
        generateLabel="Generate report"
      />

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isGenerating}
        pdfUrl={generatedPdfUrl}
        pdfFilename={`Visual-Condition-${formData.certificateNumber || 'report'}.pdf`}
        errorMessage={generationError}
        documentLabel="Report"
      />
    </div>
  );
}
