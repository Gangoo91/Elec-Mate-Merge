/**
 * RoutineInspectionReport.tsx — ELE-1110
 *
 * A planned-maintenance visit record, with an optional thermographic survey.
 * For the yearly service-contract work electricians increasingly sell: one to
 * two hours on site rather than a full EICR day.
 *
 * 🔴 NOT a BS 7671 model form, and nothing here may imply that it is. Its
 * standing comes from Regulation 4(2) of the Electricity at Work Regulations
 * 1989 — see the header of `data/routineInspectionItems.ts` for the sources.
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
import RoutineInspectionFormTabs from '@/components/inspection/routine-inspection/RoutineInspectionFormTabs';
import { useRoutineInspectionTabs } from '@/hooks/useRoutineInspectionTabs';
import {
  getDefaultRoutineInspectionFormData,
  deriveRoutineAssessment,
  effectiveAnomalies,
  type RoutineInspectionFormData,
} from '@/types/routine-inspection';
import { formatRoutineInspectionJson } from '@/utils/routineInspectionJsonFormatter';
import { generateCertificateNumber } from '@/utils/certificateNumbering';

const REPORT_TYPE = 'routine-inspection' as const;
const BASE = '/electrician/inspection-testing/routine-inspection';

const STEPS = [
  { id: 'client', label: 'Client' },
  { id: 'visit', label: 'Visit' },
  { id: 'inspection', label: 'Inspect' },
  { id: 'thermal', label: 'Thermal' },
  { id: 'declaration', label: 'Sign off' },
];

export default function RoutineInspectionReport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const { companyProfile } = useCompanyProfile();

  const [formData, setFormData] = useState<RoutineInspectionFormData>(
    getDefaultRoutineInspectionFormData()
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
    // Gates autosave while loading — without it the empty default state races
    // the fetch and overwrites the stored report with blanks.
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
            ...getDefaultRoutineInspectionFormData(),
            ...prevRef.current,
            ...(stored as Partial<RoutineInspectionFormData>),
          } as RoutineInspectionFormData;

          /*
           * ⚠️ Normalise thermal findings on load.
           *
           * A stored report can carry a priority that its reference does not
           * define — the report was written before the reference was chosen, or
           * the row was edited outside the app. Priority 2 exists only against
           * ambient, so a 2 sitting on a similar-component finding would print
           * a rating the criteria do not contain. Cleared rather than shown,
           * because a blank the inspector can see is recoverable and a wrong
           * rating on an issued PDF is not.
           */
          loaded.anomalies = (loaded.anomalies ?? []).map((a) =>
            a.reference === 'similar-component' && a.priority === '2'
              ? { ...a, priority: '', priorityOverridden: false }
              : a
          );

          setFormData(loaded);
          setSavedReportId(id);
        }
      } catch (err) {
        console.error('[RoutineInspection] load failed:', err);
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
   * Guarded on `!certificateNumber` so reopening a saved report never mints a
   * second number over the one already issued to a client. The visual condition
   * report shipped without this and its PDFs came out unidentified.
   */
  useEffect(() => {
    if (!isNew || formData.certificateNumber) return;
    let cancelled = false;
    generateCertificateNumber(REPORT_TYPE)
      .then((num) => {
        if (!cancelled) {
          setFormData((prev) =>
            prev.certificateNumber ? prev : { ...prev, certificateNumber: num }
          );
        }
      })
      .catch((err) => console.error('[RoutineInspection] number allocation failed:', err));
    return () => {
      cancelled = true;
    };
  }, [isNew, formData.certificateNumber]);

  /*
   * Only the trading name is carried onto the report. The registration scheme
   * and number belong to the BUSINESS, not to one visit — the PDF reads them
   * from the company profile, and a second per-report copy is two sources that
   * can disagree about the same fact.
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
    (field: keyof RoutineInspectionFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const tabs = useRoutineInspectionTabs(formData);

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
   * A visit with no answered items is not a visit. The bar is the inspection
   * itself rather than a signature: a signed but unwalked form is the failure
   * mode worth preventing.
   */
  const answered = (formData.inspectionItems ?? []).filter((i) => i.outcome !== '').length;
  const canGenerate =
    !!formData.clientName && !!formData.installationAddress && answered > 0;

  /*
   * 🔴 The SAME test `reportCloud` applies — signed, and actually walked.
   *
   * Generating used to force `status: 'completed'` unconditionally, so an
   * unsigned report came back from the PDF as complete while the completion
   * rule said otherwise. That is worse than either answer on its own: the
   * report list shows a finished job, and the one thing making it finished —
   * somebody's name against it — is missing.
   *
   * Producing the PDF unsigned stays allowed on purpose: showing a client the
   * findings before signing is normal, and the document carries a visibly empty
   * signature block. It just is not filed as done.
   */
  const isSignedOff = !!formData.inspectorSignature && answered > 0;

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

      const withOutcome: RoutineInspectionFormData = {
        ...formData,
        overallAssessment: deriveRoutineAssessment(
          formData.inspectionItems,
          formData.observations,
          effectiveAnomalies(formData)
        ),
      };
      const payload = formatRoutineInspectionJson(withOutcome, companyProfile);

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
        'generate-routine-inspection-pdf',
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
            ...(isSignedOff ? { status: 'completed' as const } : {}),
          })
          .eq('report_id', savedReportId);
      }

      setGeneratedPdfUrl(data.pdfUrl);
      toast.success(
        isSignedOff
          ? 'Routine inspection report generated'
          : 'Report generated — sign it to mark the visit complete'
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'PDF generation failed';
      console.error('[RoutineInspection] generate failed:', err);
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
        title="Routine Inspection Report"
        subtitle={
          formData.certificateNumber ||
          'Planned maintenance visit — no verification testing'
        }
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
          visit: tabs.isTabComplete('visit'),
          inspection: tabs.isTabComplete('inspection'),
          thermal: tabs.isTabComplete('thermal'),
          declaration: tabs.isTabComplete('declaration'),
        }}
      />

      <main className="mx-auto max-w-3xl px-4 py-4 pb-32 lg:max-w-none lg:px-8 xl:max-w-[1700px]">
        <RoutineInspectionFormTabs
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
        nextLabels={['Visit', 'Inspect', 'Thermal', 'Sign off', '']}
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
        pdfFilename={`Routine-Inspection-${formData.certificateNumber || 'report'}.pdf`}
        errorMessage={generationError}
        documentLabel="Report"
      />
    </div>
  );
}
