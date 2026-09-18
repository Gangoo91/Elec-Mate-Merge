/**
 * RoutineInspectionReport.tsx — ELE-1110
 *
 * A maintenance visit record. ONE REPORT, TWO VISITS:
 *
 *   landlord   — the yearly walk round of a rented dwelling, between EICRs.
 *   commercial — planned maintenance of a commercial or industrial
 *                installation, with an optional thermographic survey.
 *
 * 🔴 NOT a BS 7671 model form, and nothing here may imply that it is.
 *
 * 🔴 THE TWO REST ON DIFFERENT LAW, and the report says which. A landlord is
 * bound by a continuing repairing duty — Landlord and Tenant Act 1985 s11(1)(b)
 * in England and Wales, Housing (Scotland) Act 2014 s13 in Scotland. A
 * commercial dutyholder is bound by EAWR 1989 Reg 4(2). Printing one on a
 * report governed by the other is an overclaim on a signed document, so the
 * legal statement follows `formData.visitType` everywhere it appears — on
 * screen, and in the PDF payload's `metadata.legal_basis`.
 *
 * Sources for both, verified against `bs7671_facets`, are in the headers of
 * `data/landlordInspectionItems.ts` and `data/routineInspectionItems.ts`.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { openOrDownloadPdf } from '@/utils/pdf-download';
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
  THERMAL_PRIORITY_ACTION,
  type RoutineInspectionFormData,
} from '@/types/routine-inspection';
import {
  itemsForVisitType,
  getDefaultRoutineInspectionItems,
  DEFAULT_VISIT_TYPE,
} from '@/data/routineInspectionItems';
import { formatRoutineInspectionJson } from '@/utils/routineInspectionJsonFormatter';
import { generateCertificateNumber } from '@/utils/certificateNumbering';
import {
  createQuoteFromCertificate,
  type CertificateLineItem,
} from '@/utils/certificateToQuote';

const REPORT_TYPE = 'routine-inspection' as const;
const BASE = '/electrician/inspection-testing/routine-inspection';

/*
 * ⚠️ Derived from the hook, not duplicated here.
 *
 * The rail used to be this hard-coded five. The hook now drops the thermal step
 * for a landlord visit, and a second copy of the list would have gone on
 * rendering a step the footer could not navigate to — the classic two-sources
 * bug, in the one place where the user can see both at once.
 */
const STEP_LABEL: Record<string, string> = {
  client: 'Client',
  visit: 'Visit',
  inspection: 'Inspect',
  thermal: 'Thermal',
  declaration: 'Sign off',
};

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
  /*
   * Read from the report ROW, not from the form.
   *
   * `reports.customer_id` is written by the `trg_reports_auto_link_customer`
   * trigger once the client details match a customer — it is not something the
   * form holds or could hold. It is used for one thing: offering this client's
   * jobs first in the photo picker. Null is a perfectly good answer, so nothing
   * here waits on it or fails without it.
   */
  const [customerId, setCustomerId] = useState<string | null>(null);
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

          /*
           * The next-visit date moved from `nextInspectionDate` to
           * `nextInspectionDue`, which is the key the `sync_report_next_due`
           * trigger reads — see the field's note in `types/routine-inspection`.
           * Only reports written before that rename carry the old key, and
           * dropping the date would quietly un-book next year's visit, so it
           * is read across rather than migrated.
           */
          if (!loaded.nextInspectionDue) {
            const legacy = (stored as Record<string, unknown>).nextInspectionDate;
            if (typeof legacy === 'string' && legacy) loaded.nextInspectionDue = legacy;
          }

          /*
           * 🔴 RECONCILE THE SCHEDULE WITH THE VISIT TYPE — ANSWERS WIN.
           *
           * The two can arrive disagreeing, for two very different reasons:
           *
           *   • A report written BEFORE the visit type existed has no
           *     `visitType` key at all, so the merge above fills it from the
           *     defaults — which say `landlord`. Every one of those reports
           *     actually holds the COMMERCIAL schedule.
           *   • DUPLICATE strips `inspectionItems` so last year's answers
           *     cannot carry, while keeping `visitType` because next year's
           *     visit to the same property is the same kind of visit. That
           *     report arrives with a type and no schedule.
           *
           * 🔴 THE ORDER OF THESE CHECKS IS THE WHOLE THING. Resolving it the
           * other way round — regenerating the schedule to match the type —
           * destroyed 25 answered items and 3 observations on a completed,
           * signed, already-issued report, because `landlord` had quietly won
           * a merge against a key that was never stored.
           *
           * So: the answers are the evidence and the label is cheap. Where the
           * items belong to a real schedule, THEY decide what kind of visit
           * this is. Items are only generated when there are none to believe.
           */
          const scheduleOf = (items: unknown) => {
            if (!Array.isArray(items) || items.length === 0) return null;
            const ids = items.map((i) => (i as { id?: unknown })?.id);
            if (!ids.every((id) => typeof id === 'string')) return null;
            for (const candidate of ['landlord', 'commercial'] as const) {
              const known = new Set(itemsForVisitType(candidate).map((i) => i.id));
              if ((ids as string[]).every((id) => known.has(id))) return candidate;
            }
            return null;
          };

          /*
           * ⚠️ JUDGED ON WHAT WAS STORED, never on the merged result.
           *
           * `loaded.inspectionItems` falls back to the DEFAULT schedule when the
           * row has none — which is exactly the duplicate case, and those
           * defaults are a complete, real-looking landlord schedule. Reading
           * them here relabelled every duplicated COMMERCIAL visit as a landlord
           * one and handed it the wrong 42 questions.
           */
          const actual = scheduleOf((stored as Record<string, unknown>).inspectionItems);
          if (actual) {
            // The schedule is real. It is the record of the visit, so it is
            // authoritative — correct the label to match it, never the reverse.
            loaded.visitType = actual;
          } else {
            /*
             * No schedule, or one belonging to neither set. Nothing to
             * preserve, so build the one the visit type asks for. Observations
             * are cleared with it: each is bound to an item by `itemId`, and
             * against a schedule that does not hold that item it is an orphan
             * the summary counts and no screen can show.
             */
            loaded.visitType = loaded.visitType ?? DEFAULT_VISIT_TYPE;
            loaded.inspectionItems = getDefaultRoutineInspectionItems(loaded.visitType);
            loaded.observations = [];
          }

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
   * Resolve the linked customer for the photo picker.
   *
   * ⚠️ Runs on `savedReportId` rather than inside the loader, because a report
   * created FROM THIS SCREEN has no id at first render — `onReportCreated`
   * supplies it after the first autosave, and a fetch that only ran in the
   * loader would never fire for a brand-new report. The row is also linked by a
   * trigger AFTER the client details are written, so this re-runs when the id
   * changes rather than assuming the link already exists.
   *
   * A failure here is not worth reporting: the picker simply stops sorting this
   * client's jobs to the top.
   */
  useEffect(() => {
    if (!savedReportId) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('reports')
        .select('customer_id')
        .eq('report_id', savedReportId)
        .maybeSingle();
      if (!cancelled) setCustomerId((data?.customer_id as string | null) ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [savedReportId]);

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
  const steps = tabs.steps.map((s) => ({ id: s.id, label: STEP_LABEL[s.id] ?? s.shortLabel }));

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

  /*
   * ── "Price the remedial work" ─────────────────────────────────────────
   *
   * The end of the visit is the moment worth catching: the electrician knows
   * what the property needs and is still stood in front of the person who owns
   * it. Same route the EICR and the pre-purchase survey already take.
   *
   * 🔴 EVERY ITEM GOES ACROSS UNPRICED. A maintenance visit carries no
   * verification testing, so there is no honest basis for a figure yet — the
   * descriptions are what is worth carrying, and the numbers are the
   * electrician's to put on in the builder.
   *
   * All four codes are included, matching the EICR, because they share the
   * vocabulary: a C3 is a shortfall identified today, not advice about the
   * future. (The pre-purchase survey drops its advisory tier for exactly that
   * reason — different vocabulary, different meaning.)
   */
  const quotableFindings: CertificateLineItem[] = [
    ...(formData.observations ?? [])
      .filter((o) => o.code === 'C1' || o.code === 'C2' || o.code === 'C3' || o.code === 'FI')
      /* Excluded by the inspector on site — see `excludeFromQuote`. It changes
         what is priced and nothing else: the finding still prints, still
         carries its code, and still counts towards the verdict. */
      .filter((o) => !o.excludeFromQuote)
      .map((o) => ({
        id: o.id,
        description:
          [o.location, o.description].filter(Boolean).join(' — ') || o.description,
        quantity: 1,
        unit: 'item',
        unitPrice: 0,
        totalPrice: 0,
        category: 'labour',
        notes: o.description,
        source: 'routine-inspection',
        defectCode: o.code || undefined,
        defectDescription: o.description,
      })),
    /*
     * Thermal findings are remedial work too, and the NETA table already says
     * what to do about each one — so the action rides along as the note rather
     * than being re-typed. `effectiveAnomalies` rather than `anomalies`: a
     * survey switched off must not contribute findings it no longer claims.
     */
    ...effectiveAnomalies(formData)
      .filter((a) => a.priority !== '')
      .map((a) => ({
        id: a.id,
        description:
          [a.location, a.equipment || a.description].filter(Boolean).join(' — ') ||
          a.description,
        quantity: 1,
        unit: 'item',
        unitPrice: 0,
        totalPrice: 0,
        category: 'labour',
        notes:
          a.action ||
          THERMAL_PRIORITY_ACTION[a.priority as Exclude<typeof a.priority, ''>],
        source: 'routine-inspection-thermal',
        defectCode: `Thermal P${a.priority}`,
        defectDescription: a.description,
      })),
  ];

  const handleQuoteRemedials = () => {
    navigate(
      createQuoteFromCertificate({
        clientName: formData.clientName || '',
        clientEmail: formData.clientEmail || '',
        clientPhone: formData.clientPhone || '',
        clientAddress: formData.clientAddress || '',
        installationAddress: formData.installationAddress || '',
        certificateType: 'Routine Inspection',
        certificateReference: formData.certificateNumber || '',
        reportId: savedReportId || undefined,
        pdfUrl: generatedPdfUrl || undefined,
        ...(quotableFindings.length > 0 && { items: quotableFindings }),
        jobDescription: `Remedial work arising from the routine inspection at ${
          formData.installationAddress || 'the property'
        }. Prices to be confirmed — the visit was a maintenance inspection and no verification testing was carried out.`,
      })
    );
  };

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
            /*
             * Written explicitly, not left to the trigger.
             *
             * `sync_report_next_due()` fills the column from the report JSON
             * only `if new.next_inspection_due is null` — so the FIRST autosave
             * after a date is picked wins, and a date corrected afterwards
             * never reaches it. The recall would then chase a date the PDF does
             * not say. An explicit non-null value passes straight through the
             * trigger, so the issued report and the reminder always agree.
             *
             * Bounded to this report type on purpose: the same staleness
             * affects every type the trigger serves, and widening a shared
             * trigger is not this change's business.
             */
            ...(formData.nextInspectionDue
              ? { next_inspection_due: formData.nextInspectionDue }
              : {}),
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
        steps={steps}
        currentTab={tabs.currentTab}
        onTabChange={(tab: string) => {
          tabs.setCurrentTab(tab as typeof tabs.currentTab);
          syncOnTabChange();
          scrollToTopForStepChange();
        }}
        completedTabs={Object.fromEntries(
          tabs.steps.map((s) => [s.id, tabs.isTabComplete(s.id)])
        )}
      />

      <main className="mx-auto max-w-3xl px-4 py-4 pb-32 lg:max-w-none lg:px-8 xl:max-w-[1700px]">
        <RoutineInspectionFormTabs
          currentTab={tabs.currentTab}
          formData={formData}
          onUpdate={handleUpdate}
          customerId={customerId}
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
        /* The label on the Next button is the step it goes TO, so it is the
           rail shifted by one with a blank at the end. Built from the same
           list the rail uses, so dropping the thermal step cannot leave the
           footer promising "Thermal" and landing on Sign off. */
        nextLabels={[...steps.slice(1).map((s) => s.label), '']}
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
        /*
         * Supplying `actions` REPLACES the dialog's own download button, so it
         * has to offer one — see the prop's note. Download stays first and
         * styled as the primary: the report is what the client is owed, and
         * the quote is an offer to do more work. Reversing that would make the
         * document feel like the lead-in to a sale.
         */
        /*
         * 🔴 Offered ONLY when the visit actually found something.
         *
         * A clean visit has nothing to price, and putting a quote button on it
         * anyway turns a maintenance record into a prompt to sell — which is
         * the fastest way to make the document worth less than it costs. The
         * dialog falls back to its own Download button when this is undefined,
         * so the clean case stays a plain "here is your report".
         */
        actions={
          generatedPdfUrl && quotableFindings.length > 0 ? (
            <div className="flex w-full flex-col gap-2">
              <Button
                onClick={() =>
                  openOrDownloadPdf(
                    generatedPdfUrl,
                    `Routine-Inspection-${formData.certificateNumber || 'report'}.pdf`
                  ).catch(() => {
                    /* openOrDownloadPdf reports its own failures. */
                  })
                }
                className="h-11 w-full touch-manipulation bg-yellow-500 font-semibold text-black hover:bg-yellow-600"
              >
                <Download className="mr-2 h-4 w-4" />
                Download report
              </Button>
              <Button
                variant="outline"
                onClick={handleQuoteRemedials}
                className="h-11 w-full touch-manipulation"
              >
                <FileText className="mr-2 h-4 w-4" />
                {`Price the remedial work — ${quotableFindings.length} item${
                  quotableFindings.length === 1 ? '' : 's'
                }`}
              </Button>
            </div>
          ) : undefined
        }
      />
    </div>
  );
}
