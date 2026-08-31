/**
 * PlugInSolarCertificate.tsx — ELE-1660
 *
 * Plug-in Solar Suitability & Commissioning Certificate.
 *
 * Covers the whole job rather than a single visit: assess the existing
 * installation, record the remedial work that assessment calls for, then verify
 * and hand over. The assessment logic is in `src/lib/plugInSolarAssessment.ts`
 * and every finding carries its own source, so the report can distinguish a
 * requirement from advice.
 *
 * Scope, deliberately: this is NOT a BS 7671 Section 712 installation
 * certificate, and it does not certify the manufacturer's product. See the
 * closing section of the handover tab.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import CertShellHeader, {
  type CertShellStep,
} from '@/components/inspection/shared/CertShellHeader';
import CertShellFooter, {
  certFooterNeutralButton,
} from '@/components/inspection/shared/CertShellFooter';
import CertLockBar from '@/components/inspection/CertLockBar';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';

import {
  createQuoteFromCertificate,
  createInvoiceFromCertificate,
  type CertificateLineItem,
} from '@/utils/certificateToQuote';
import { reportCloud } from '@/utils/reportCloud';
import { generateCertificateNumber } from '@/utils/certificateNumbering';
import type { Customer } from '@/hooks/inspection/useCustomers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import { scrollToTopForStepChange } from '@/utils/scroll';

import { assessPlugInSolar } from '@/lib/plugInSolarAssessment';
import {
  createEmptyPlugInSolarData,
  toAssessmentInput,
  type PlugInSolarData,
} from '@/types/plug-in-solar';

import PlugInSolarSuitability from '@/components/inspection/plug-in-solar/PlugInSolarSuitability';
import PlugInSolarDeviceSiting from '@/components/inspection/plug-in-solar/PlugInSolarDeviceSiting';
import PlugInSolarRemedialWorks from '@/components/inspection/plug-in-solar/PlugInSolarRemedialWorks';
import PlugInSolarVerification from '@/components/inspection/plug-in-solar/PlugInSolarVerification';
import PlugInSolarHandover from '@/components/inspection/plug-in-solar/PlugInSolarHandover';

/* eslint-disable @typescript-eslint/no-explicit-any */

const REPORT_TYPE = 'plug-in-solar';
const ROUTE_BASE = '/electrician/inspection-testing/plug-in-solar';

const STEPS: CertShellStep[] = [
  { id: 'suitability', label: 'Property' },
  { id: 'device', label: 'Device' },
  { id: 'remedial', label: 'Works' },
  { id: 'verification', label: 'Testing' },
  { id: 'handover', label: 'Handover' },
];

const NEXT_LABELS = [
  'Continue to Device',
  'Continue to Works',
  'Continue to Testing',
  'Continue to Handover',
];

const PlugInSolarCertificate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: editId } = useParams<{ id: string }>();
  const isNew = !editId || editId === 'new';

  const [data, setData] = useState<PlugInSolarData>(createEmptyPlugInSolarData());
  const [savedReportId, setSavedReportId] = useState<string | null>(isNew ? null : editId ?? null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [currentTab, setCurrentTab] = useState<string>('suitability');
  const [showGenerate, setShowGenerate] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [showRecovery, setShowRecovery] = useState(false);
  const [generateVariant, setGenerateVariant] = useState<'assessment' | 'decision'>('assessment');
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const currentIndex = Math.max(
    0,
    STEPS.findIndex((s) => s.id === currentTab),
  );

  const {
    isLocked,
    lockedAt,
    editVersion,
    lockReport: lockReportBase,
    amendReport,
    databaseId,
    openReport,
    hasVersions,
  } = useCertLock({
    reportId: savedReportId,
    onAmended: (newId) => navigate(`${ROUTE_BASE}/${newId}`),
  });

  const {
    status: syncStatus,
    saveNow,
    syncNowImmediate,
    hasRecoverableDraft,
    recoverDraft,
    discardDraft,
  } = useReportSync({
    reportId: savedReportId,
    reportType: REPORT_TYPE as any,
    formData: data,
    enabled: !isLoading && !isLocked,
    // Gate autosave while hydrating or a blank form overwrites the saved one.
    isHydrating: isLoading,
    onReportCreated: (newId: string) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `${ROUTE_BASE}/${newId}`);
    },
  });

  /**
   * Back goes where you came from — the specialist certs page, the renewables
   * page, a customer record — rather than a hardcoded hub, which is what it did
   * before and always dumped you a level up from where you started.
   *
   * `location.key` is 'default' only on the first entry in the history stack,
   * so a deep link (fresh tab, emailed URL) has nothing to go back to and would
   * leave the app entirely. That case falls through to the specialist section.
   */
  const handleBack = useCallback(() => {
    if (location.key !== 'default') navigate(-1);
    else navigate('/electrician/inspection-testing?section=specialist');
  }, [location.key, navigate]);

  const lockReport = useCallback(async () => {
    try {
      await syncNowImmediate?.();
    } catch {
      /* best-effort flush before locking */
    }
    await lockReportBase();
  }, [syncNowImmediate, lockReportBase]);

  // Load an existing report.
  useEffect(() => {
    if (isNew || !editId) {
      setIsLoading(false);
      return;
    }
    const load = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }
        const reportData = await reportCloud.getReportData(editId, user.id);
        if (reportData) {
          setData((prev) => ({ ...createEmptyPlugInSolarData(), ...prev, ...(reportData as any) }));
          setSavedReportId(editId);
        }
      } catch (err) {
        console.error('Failed to load plug-in solar certificate:', err);
        toast.error('Could not load this certificate.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [editId, isNew]);

  // Prefill the assessor from the company profile.
  useEffect(() => {
    if (data.assessorName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) {
        setData((prev) => ({
          ...prev,
          assessorName: prev.assessorName || cp.inspector_name || '',
        }));
      }
    });
    // Once on mount — re-running would fight the user's own edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Assign the certificate number once, on a new certificate.
   *
   * Deliberately not deferred to generation time: the number goes on the quote
   * and the invoice too, and those can be raised before anyone taps Generate.
   */
  useEffect(() => {
    if (!isNew || data.certificateNumber) return;
    let cancelled = false;
    generateCertificateNumber(REPORT_TYPE).then((n) => {
      if (!cancelled) setData((prev) => (prev.certificateNumber ? prev : { ...prev, certificateNumber: n }));
    });
    return () => {
      cancelled = true;
    };
  }, [isNew, data.certificateNumber]);

  // Draft recovery — offered only on a new certificate, where an interrupted
  // session would otherwise be lost silently.
  useEffect(() => {
    if (!isNew || !hasRecoverableDraft) return;
    setShowRecovery(true);
  }, [isNew, hasRecoverableDraft]);

  const update = useCallback(
    <K extends keyof PlugInSolarData>(field: K, value: PlugInSolarData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  /** Fill the client block from a CRM record, keeping the link for the timeline. */
  const handleSelectCustomer = useCallback((customer: Customer | null) => {
    setData((prev) => ({
      ...prev,
      customerId: customer?.id ?? '',
      clientName: customer?.name ?? prev.clientName,
      clientEmail: customer?.email ?? prev.clientEmail,
      clientTelephone: customer?.phone ?? prev.clientTelephone,
      clientAddress: customer?.address ?? prev.clientAddress,
      // Only seed the installation address when it is still blank — on a
      // landlord's job the property is rarely the client's own address.
      installationAddress: prev.installationAddress || customer?.address || '',
    }));
  }, []);

  const result = useMemo(() => assessPlugInSolar(toAssessmentInput(data)), [data]);

  /**
   * Per-step completion. Deliberately lenient on the later steps: an
   * assessment-only visit is a legitimate finished job, so testing and
   * commissioning are not required for the document to be issuable.
   */
  const completedTabs = useMemo<Record<string, boolean>>(() => {
    const suitability = Boolean(
      data.clientName &&
        data.installationAddress &&
        data.circuitProtection !== 'unknown' &&
        data.targetCircuitKind !== 'unknown',
    );
    return {
      suitability,
      device: Boolean(data.deviceMake && data.mountingSurface !== 'unknown'),
      /*
       * Gated on `suitability` on purpose. `every` is true for an empty list, so
       * without this a blank form reported the works step as done and the ring
       * opened at 20% — then *fell* to 0% as the assessment found things. An
       * empty list only means "no work needed" once the assessment has actually
       * been filled in enough to produce findings.
       */
      remedial: suitability && data.remedialItems.every((i) => i.status !== 'required'),
      verification: Boolean(data.commissioningDate && data.functionalCheckPassed !== 'unknown'),
      handover: Boolean(data.assessorName && data.assessorSignature),
    };
  }, [data]);

  const progressPercent = useMemo(() => {
    const done = STEPS.filter((s) => completedTabs[s.id]).length;
    return Math.round((done / STEPS.length) * 100);
  }, [completedTabs]);

  /**
   * Flush the form, resolve branding, then render through PDFMonkey.
   *
   * The assessment is recomputed here rather than passed down from the form, so
   * what the PDF states is derived from the same rules engine the screen used —
   * there is no second, drifting copy of the verdict.
   */
  const handleGenerate = async (variant: 'assessment' | 'decision' = 'assessment') => {
    if (!data.installationAddress) {
      toast.error('Installation address required');
      return;
    }
    setGenerateVariant(variant);
    setIsGenerating(true);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerate(true);
    try {
      await syncNowImmediate?.();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setGenerationError('Please sign in.');
        return;
      }

      const { formatPlugInSolarJson, fetchPlugInSolarPhotos, PLUG_IN_SOLAR_ACCENT } = await import(
        '@/utils/plugInSolarJsonFormatter'
      );
      const { fetchCertBranding } = await import('@/utils/certBranding');
      const [branding, photos] = await Promise.all([
        fetchCertBranding(PLUG_IN_SOLAR_ACCENT),
        savedReportId
          ? fetchPlugInSolarPhotos(savedReportId)
          : Promise.resolve({ consumerUnit: [], siting: [] }),
      ]);
      const payload = formatPlugInSolarJson(data, result, branding, photos);

      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
        'generate-plug-in-solar-pdf',
        { body: { formData: payload, reportId: savedReportId, variant } },
      );
      if (pdfError) throw new Error(pdfError.message || 'PDF generation failed');
      if (!pdfResult?.success) throw new Error(pdfResult?.error || 'PDF generation failed');
      if (!pdfResult?.pdfUrl) throw new Error('No PDF URL returned');

      setGeneratedPdfUrl(pdfResult.pdfUrl);
      // The decision sheet is supplementary — it must not become the
      // certificate's own PDF.
      if (variant === 'assessment') update('pdfUrl', pdfResult.pdfUrl);
    } catch (err) {
      setGenerationError(
        err instanceof Error ? err.message : 'Could not generate the assessment PDF.',
      );
    } finally {
      setIsGenerating(false);
    }
  };

  /** Client block shared by the quote and invoice routes. */
  const certClientData = useMemo(
    () => ({
      clientName: data.clientName || '',
      clientEmail: data.clientEmail || '',
      clientPhone: data.clientTelephone || '',
      clientAddress: data.clientAddress || data.installationAddress || '',
      installationAddress: data.installationAddress || '',
      certificateType: 'Plug-in Solar Assessment' as const,
      certificateReference: data.certificateNumber || '',
      reportId: savedReportId || undefined,
      pdfUrl: data.pdfUrl || undefined,
      // The default copy would read "following Plug-in Solar Assessment
      // inspection", which is both clumsy and inaccurate — this was an
      // assessment, not an inspection.
      jobDescription:
        'Work identified by a plug-in solar suitability assessment of the existing installation.',
    }),
    [data, savedReportId],
  );

  /**
   * Remedial works → quote.
   *
   * Only work that is still outstanding goes across: something already complete
   * shouldn't be quoted again, and something the client declined shouldn't
   * reappear on a price list they've already refused.
   *
   * Prices are deliberately left at zero. The rules engine knows what work is
   * needed; it has no business guessing what anybody charges for it.
   */
  const quotableItems = useMemo<CertificateLineItem[]>(
    () =>
      data.remedialItems
        .filter((i) => i.status === 'required' || i.status === 'quoted')
        .map((i, idx) => ({
          id: `pis-${i.findingId}-${idx}`,
          description: i.description,
          quantity: 1,
          unit: 'job',
          unitPrice: 0,
          totalPrice: 0,
          category: 'Remedial works',
          subcategory: 'Plug-in solar suitability',
          notes: i.notes || undefined,
          source: 'plug-in-solar-assessment',
        })),
    [data.remedialItems],
  );

  const handleCreateQuote = () => {
    if (!data.clientName && !data.installationAddress) {
      toast.error('Add the client or property first.');
      return;
    }
    navigate(
      createQuoteFromCertificate({
        ...certClientData,
        ...(quotableItems.length > 0 && { items: quotableItems }),
      }),
    );
  };

  const handleCreateInvoice = () => navigate(createInvoiceFromCertificate(certClientData));

  const handleSendEmail = async () => {
    if (!emailRecipient.includes('@')) {
      toast.error('Enter a valid email address.');
      return;
    }
    setIsSendingEmail(true);
    try {
      const { error } = await supabase.functions.invoke('send-certificate-resend', {
        body: { reportId: savedReportId, recipientEmail: emailRecipient },
      });
      if (error) throw new Error(error.message);
      toast.success(`Assessment emailed to ${emailRecipient}`);
      setShowEmailDialog(false);
      setEmailRecipient('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not send the email.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const goToStep = (index: number) => {
    const step = STEPS[index];
    if (!step) return;
    setCurrentTab(step.id);
    scrollToTopForStepChange();
  };

  /**
   * Has anything actually been assessed yet?
   *
   * Every tri-state starts at "not checked", which the engine correctly reports
   * as work needed — so an untouched certificate announced "Work needed" before
   * the electrician had entered a thing. That is a finding about a house nobody
   * has looked at. Until there is real input the header says so.
   */
  const hasAssessmentInput = useMemo(
    () =>
      Boolean(
        data.clientName ||
          data.installationAddress ||
          data.circuitProtection !== 'unknown' ||
          data.targetCircuitKind !== 'unknown' ||
          data.mountingSurface !== 'unknown' ||
          data.rcdType !== 'unknown',
      ),
    [data],
  );

  const subtitle = useMemo(() => {
    const ref = data.certificateNumber || (savedReportId ? 'Draft' : 'New');
    if (!hasAssessmentInput) return `${ref} · Not started`;
    const verdict =
      result.outcome === 'pass'
        ? 'No blocking issues'
        : result.outcome === 'needs-work'
          ? 'Work needed'
          : 'Not suitable as proposed';
    return `${ref} · ${verdict}`;
  }, [data.certificateNumber, savedReportId, result.outcome, hasAssessmentInput]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <CertShellHeader
        onBack={handleBack}
        title="Plug-in Solar"
        subtitle={subtitle}
        syncStatus={syncStatus}
        onManualSave={saveNow}
        progressPercent={progressPercent}
        steps={STEPS}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        completedTabs={completedTabs}
      />

      <CertLockBar
        isLocked={isLocked}
        lockedAt={lockedAt}
        editVersion={editVersion}
        canIssue={Boolean(data.assessorSignature && savedReportId)}
        onLock={lockReport}
        onAmend={amendReport}
        databaseId={databaseId}
        hasVersions={hasVersions}
        onOpenVersion={openReport}
      />

      {/* Matches the specialist-cert shell: full-bleed on phones, wide two-column
          canvas from lg up. See EVChargingCertificate. */}
      <main className="-mx-3 px-4 py-4 pb-36 sm:mx-auto sm:px-4 lg:max-w-[1600px] lg:px-8">
        {currentTab === 'suitability' && (
          <PlugInSolarSuitability
            data={data}
            onUpdate={update}
            reportId={savedReportId}
            onSelectCustomer={handleSelectCustomer}
          />
        )}
        {currentTab === 'device' && (
          <PlugInSolarDeviceSiting data={data} onUpdate={update} reportId={savedReportId} />
        )}
        {currentTab === 'remedial' && (
          <PlugInSolarRemedialWorks
            data={data}
            onUpdate={update}
            onCreateQuote={handleCreateQuote}
            quotableCount={quotableItems.length}
          />
        )}
        {currentTab === 'verification' && (
          <PlugInSolarVerification data={data} onUpdate={update} />
        )}
        {currentTab === 'handover' && (
          <PlugInSolarHandover
            data={data}
            onUpdate={update}
            onCreateDecisionSheet={() => handleGenerate('decision')}
          />
        )}
      </main>

      <CertShellFooter
        currentIndex={currentIndex}
        totalSteps={STEPS.length}
        canPrevious={currentIndex > 0}
        canNext={currentIndex < STEPS.length - 1}
        onPrevious={() => goToStep(currentIndex - 1)}
        onNext={() => goToStep(currentIndex + 1)}
        nextLabels={NEXT_LABELS}
        isLastStep={currentIndex === STEPS.length - 1}
        onGenerate={() => handleGenerate('assessment')}
        canGenerate={Boolean(data.assessorSignature)}
        generateLabel="Generate certificate"
        previewReportType={REPORT_TYPE}
        previewData={data as unknown as Record<string, unknown>}
        /* Deliberately the same five as every other certificate: Back, Preview,
           Email, Invoice, Generate. Quote lives on the Works step next to the
           items it prices, and the decision sheet on Handover next to the
           landlord questions — a six-button footer crowded all of them. */
        lastStepActions={
          <>
            <button
              type="button"
              onClick={() => {
                if (!savedReportId) {
                  toast.error('Save the certificate first before emailing.');
                  return;
                }
                setEmailRecipient(data.clientEmail || '');
                setShowEmailDialog(true);
              }}
              className={certFooterNeutralButton}
            >
              Email
            </button>
            <button type="button" onClick={handleCreateInvoice} className={certFooterNeutralButton}>
              Invoice
            </button>
          </>
        }
      />

      <AlertDialog open={showRecovery} onOpenChange={setShowRecovery}>
        <AlertDialogContent className="max-w-[90vw] rounded-2xl border border-white/[0.1] bg-[#111114] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-white">
              Unsaved assessment found
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-white">
              An earlier assessment on this device was not finished. Pick up where it left off, or
              start a new one.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col gap-2 sm:flex-col">
            <AlertDialogAction
              onClick={() => {
                const draft = recoverDraft?.();
                if (draft) setData((prev) => ({ ...prev, ...(draft as Partial<PlugInSolarData>) }));
                setShowRecovery(false);
              }}
              className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
            >
              Carry on with it
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => {
                discardDraft?.();
                setShowRecovery(false);
              }}
              className="h-12 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] font-medium text-white hover:bg-white/[0.08] hover:text-white touch-manipulation"
            >
              Start a new one
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Email — same shape as the EV reference and G98. */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-[90vw] rounded-2xl border border-white/[0.1] bg-[#111114] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-white">Email assessment</DialogTitle>
            <DialogDescription className="text-sm text-white">
              Enter the recipient's email address.
            </DialogDescription>
          </DialogHeader>
          <div className="py-3">
            <label htmlFor="pis-email-to" className="mb-1 block text-[12px] font-medium text-white">
              Recipient email
            </label>
            <Input
              id="pis-email-to"
              type="email"
              value={emailRecipient}
              onChange={(e) => setEmailRecipient(e.target.value)}
              disabled={isSendingEmail}
              placeholder="client@example.com"
              className="input-underline h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white focus:border-elec-yellow focus-visible:ring-0 focus:outline-none touch-manipulation"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                  Sending…
                </>
              ) : (
                'Send assessment'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="h-12 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] font-medium text-white hover:bg-white/[0.08] hover:text-white touch-manipulation"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CertificateGenerationDialog
        open={showGenerate}
        onOpenChange={setShowGenerate}
        isGenerating={isGenerating}
        pdfUrl={generatedPdfUrl}
        pdfFilename={`${data.certificateNumber || 'Plug-in-solar'}-${generateVariant}.pdf`}
        errorMessage={generationError}
        documentLabel={generateVariant === 'decision' ? 'Property decision' : 'Assessment'}
      />
    </div>
  );
};

export default PlugInSolarCertificate;
