/**
 * PrePurchaseSurvey.tsx — ELE-1634
 *
 * An advisory, photo-led electrical survey for somebody BUYING a house, with an
 * AI drafting a note against each photograph.
 *
 * ── 🔴 NOT AN EICR ────────────────────────────────────────────────────────
 * Nothing here may imply a BS 7671 inspection. The reader is a house-buyer, not
 * a tradesperson, and they cannot be expected to know the difference unless the
 * document tells them — so `SURVEY_LIMITATIONS` prints on every copy and the
 * subtitle on this screen says it too.
 *
 * ── 🔴 CAMERA-FIRST, NOT A WIZARD ─────────────────────────────────────────
 * There are no steps. The shutter is the first thing on the screen, the
 * findings stack up beneath it, and the client/scope/summary cards sit below,
 * collapsed, for whenever the electrician gets to them. That is the brief:
 * *"the report assembles behind it"*.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, FileText, ReceiptText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { reportCloud } from '@/utils/reportCloud';
import { useReportSync } from '@/hooks/useReportSync';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import SurveyCapture from '@/components/inspection/pre-purchase-survey/SurveyCapture';
import SurveyFindingCard from '@/components/inspection/pre-purchase-survey/SurveyFindingCard';
import SurveyDetailsSections from '@/components/inspection/pre-purchase-survey/SurveyDetailsSections';
import SurveyNextSteps from '@/components/inspection/pre-purchase-survey/SurveyNextSteps';
import {
  getDefaultPrePurchaseSurveyFormData,
  acceptedFindings,
  type PrePurchaseSurveyFormData,
  type SurveyFinding,
} from '@/types/pre-purchase-survey';
import { formatPrePurchaseSurveyJson } from '@/utils/prePurchaseSurveyJsonFormatter';
import { generateCertificateNumber } from '@/utils/certificateNumbering';
import {
  uploadSurveyPhoto,
  analyseSurveyPhoto,
  MAX_FINDINGS,
} from '@/utils/survey-photo-storage';
import { createQuoteFromCertificate } from '@/utils/certificateToQuote';
import { takeSurveySeed } from '@/utils/siteVisitToSurvey';
import { openOrDownloadPdf } from '@/utils/pdf-download';

const REPORT_TYPE = 'pre-purchase-survey' as const;
const BASE = '/electrician/inspection-testing/pre-purchase-survey';

export default function PrePurchaseSurvey() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const { companyProfile } = useCompanyProfile();

  const [formData, setFormData] = useState<PrePurchaseSurveyFormData>(
    getDefaultPrePurchaseSurveyFormData()
  );
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );

  const prevRef = useRef(formData);
  prevRef.current = formData;

  const { status: syncStatus, saveNow, syncNowImmediate } = useReportSync({
    reportId: savedReportId,
    reportType: REPORT_TYPE,
    formData,
    enabled: !isLoading,
    isHydrating: isLoading,
    onReportCreated: (newId: string) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `${BASE}/${newId}`);
    },
  });

  /*
   * 🔴 The report id, for the photo upload path — as a REF, not from state.
   *
   * The first photograph is very often taken before `savedReportId` has landed:
   * `onReportCreated` fires from the autosave, and the whole point of this
   * screen is that the shutter works immediately. Reading the id out of the
   * async callback below would capture whatever it was at mount — usually null —
   * and the upload would go to `null/<uuid>.jpg`, outside the RLS policy.
   */
  const reportIdRef = useRef<string | null>(savedReportId);
  reportIdRef.current = savedReportId;

  /*
   * Where photos go before the report row exists. Stable for the session, so a
   * burst of photos taken before the first autosave still land together.
   */
  const draftFolderRef = useRef(`draft-${crypto.randomUUID()}`);

  /*
   * 🔴 Hydrate from the cloud AT MOST ONCE, ever.
   *
   * This bit me on the first real run. `onReportCreated` rewrites the URL from
   * `/new` to `/<report-id>` while photographs are still being analysed; when
   * that re-ran this effect, the fetch returned the row as it was a moment ago
   * and `setFormData` stamped it over live state — silently discarding the
   * analysis that was in flight, and leaving a finding on 'ready' with no draft
   * against it. It also started a second autosave loop, which then lost an
   * `edit_version` race with the first and put the header into "Retry save".
   *
   * Nothing that happens after mount can require re-reading the server: from
   * that point this component IS the newer copy. So the guard is a ref rather
   * than a dependency comparison — dependencies are exactly what went wrong.
   */
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    if (isNew || !id) {
      hydratedRef.current = true;
      setIsLoading(false);
      return;
    }
    hydratedRef.current = true;
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
            ...getDefaultPrePurchaseSurveyFormData(),
            ...prevRef.current,
            ...(stored as Partial<PrePurchaseSurveyFormData>),
          } as PrePurchaseSurveyFormData;

          /*
           * ⚠️ An interrupted analysis is a FAILURE, not a finished one.
           *
           * A finding stored mid-analysis comes back as 'analysing' and would
           * spin for ever — the request that would have resolved it died with
           * the tab that made it. Marking it 'ready' was worse than the spinner
           * though: the card then showed nothing at all, with no hint that the
           * photograph had never been read and no way to ask again. 'failed'
           * says so and offers the retry.
           */
          loaded.findings = (loaded.findings ?? []).map((f) =>
            f.status === 'analysing' ? { ...f, status: 'failed' as const } : f
          );

          setFormData(loaded);
          setSavedReportId(id);

          /*
           * 🔴 Restore the PDF so "What next" survives a reload.
           *
           * `generatedPdfUrl` is component state, so reopening a finished
           * survey showed "Issue the survey" again and the work arising, the
           * quote and the send were all gone — the exact loss the on-page panel
           * exists to prevent.
           *
           * ⚠️ Its own query: `getReportData` selects `data` only, and
           * `pdf_url` is a column on the row, not a key inside the form JSON.
           */
          const { data: row } = await supabase
            .from('reports')
            .select('pdf_url')
            .eq('report_id', id)
            .is('deleted_at', null)
            .maybeSingle();
          if (!cancelled && row?.pdf_url) setGeneratedPdfUrl(row.pdf_url);
        }
      } catch (err) {
        console.error('[PrePurchaseSurvey] load failed:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, isNew]);

  /* Allocate the reference once, on a new survey. */
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
      .catch((err) => console.error('[PrePurchaseSurvey] number allocation failed:', err));
    return () => {
      cancelled = true;
    };
  }, [isNew, formData.certificateNumber]);

  useEffect(() => {
    if (!companyProfile) return;
    setFormData((prev) => ({
      ...prev,
      companyName: prev.companyName || companyProfile.company_name || '',
    }));
  }, [companyProfile]);

  const handleUpdate = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (field: keyof PrePurchaseSurveyFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  /* Patch one finding by id — never by index, which shifts under a deletion. */
  const patchFinding = useCallback((findingId: string, patch: Partial<SurveyFinding>) => {
    setFormData((prev) => ({
      ...prev,
      findings: prev.findings.map((f) => (f.id === findingId ? { ...f, ...patch } : f)),
    }));
  }, []);

  const removeFinding = useCallback((findingId: string) => {
    setFormData((prev) => ({
      ...prev,
      findings: prev.findings.filter((f) => f.id !== findingId),
    }));
  }, []);

  /**
   * Asks the model about one already-stored photograph and seeds the finding.
   *
   * 🔴 `accepted` is untouched — deliberately. This function only ever fills in
   * a DRAFT. Whatever comes back, the electrician still has to read it and tap
   * Accept before it can reach the PDF, and that is true on both paths into
   * here: a photo just taken, and one carried over from a site visit.
   */
  const runAnalysis = useCallback(
    async (findingId: string, url: string, hint?: string) => {
      const analysis = await analyseSurveyPhoto(url, hint);
      if (analysis) {
        patchFinding(findingId, {
          aiAnalysis: analysis,
          identifiedAs: analysis.identifiedAs,
          note: analysis.advice,
          severity: analysis.severity,
          status: 'ready',
        });
      } else {
        patchFinding(findingId, { status: 'failed' });
      }
    },
    [patchFinding]
  );

  /**
   * Ask again about a photograph whose analysis failed or was interrupted.
   *
   * Without this a photo that got nothing is a dead card — the electrician can
   * still write it up by hand, but there is no way to get back the help they
   * were promised, and the commonest cause is a dropped connection on site.
   */
  const retryAnalysis = useCallback(
    async (findingId: string, photoUrl: string, hint: string) => {
      patchFinding(findingId, { status: 'analysing' });
      await runAnalysis(findingId, photoUrl, hint);
    },
    [patchFinding, runAnalysis]
  );

  /* ── Photo → upload → analyse ─────────────────────────────────────────── */
  const handlePick = useCallback(
    async (files: File[]) => {
      const room = MAX_FINDINGS - prevRef.current.findings.length;
      if (room <= 0) {
        toast.error(`That is ${MAX_FINDINGS} photographs — the limit for one survey`);
        return;
      }
      const batch = files.slice(0, room);
      if (batch.length < files.length) {
        toast.info(`Added ${batch.length} — that is the ${MAX_FINDINGS} photo limit`);
      }

      setUploading(true);
      try {
        /*
         * Sequential, not Promise.all. Six phone photos analysed at once would
         * open six Gemini calls from a phone on site data — and the electrician
         * reads them one at a time anyway, so the cards filling in order is
         * closer to what they expect than all six landing together.
         */
        for (const file of batch) {
          /*
           * 🔴 The id comes from `saveNow()`'s RETURN VALUE, not from state.
           *
           * The row is very often created by this very call — the first
           * photograph routinely lands before any autosave has run, because the
           * shutter is the first thing on the screen. `onReportCreated` sets
           * state, and state is not readable until the next render, so reading
           * it here would give null and put the upload at `null/<uuid>.jpg`,
           * outside the RLS policy and invisible for ever after.
           */
          /*
           * 🔴 A photo must NEVER be blocked on the report row existing.
           *
           * This used to hard-fail with "Could not start the survey" whenever
           * `saveNow()` came back without an id — which is what Andrew hit on
           * device (ELE-1642), on the very first tap of a brand-new survey.
           * The id only names a FOLDER inside the user's own storage prefix;
           * RLS keys on the user id, so a placeholder is perfectly safe and the
           * photo is never lost. The row lands on the next autosave.
           */
          let targetId = reportIdRef.current;
          if (!targetId) {
            const result = await saveNow().catch(() => null);
            targetId = result?.reportId ?? null;
            if (targetId) reportIdRef.current = targetId;
          }
          const folderId = targetId ?? draftFolderRef.current;

          const url = await uploadSurveyPhoto(folderId, file);
          if (!url) {
            toast.error('One photo could not be saved');
            continue;
          }

          const findingId = crypto.randomUUID();
          const draft: SurveyFinding = {
            id: findingId,
            photoUrl: url,
            location: '',
            identifiedAs: '',
            note: '',
            severity: 'unclear',
            accepted: false,
            status: 'analysing',
          };
          setFormData((prev) => ({ ...prev, findings: [...prev.findings, draft] }));

          await runAnalysis(findingId, url);
        }
      } finally {
        setUploading(false);
      }
    },
    [runAnalysis, saveNow]
  );

  /* ── "Turn this into a survey", arriving from a site visit ────────────── */
  const seededRef = useRef(false);
  useEffect(() => {
    if (!isNew || seededRef.current) return;
    const sessionId = new URLSearchParams(window.location.search).get('seed');
    if (!sessionId) return;
    /*
     * Claimed synchronously, before the await below. In StrictMode this effect
     * runs twice, and the second pass would otherwise add every photograph a
     * second time — `takeSurveySeed` clears the blob, but not before the first
     * pass has yielded.
     */
    seededRef.current = true;

    const seed = takeSurveySeed(sessionId);
    if (!seed) return;

    setFormData((prev) => ({
      ...prev,
      clientName: prev.clientName || seed.clientName,
      clientEmail: prev.clientEmail || seed.clientEmail,
      clientPhone: prev.clientPhone || seed.clientPhone,
      installationAddress: prev.installationAddress || seed.installationAddress,
    }));

    const urls = seed.photoUrls.slice(0, MAX_FINDINGS);
    if (!urls.length) return;

    /*
     * The photographs are ALREADY in storage — the site visit uploaded them —
     * so there is nothing to compress or re-upload. They go straight in as
     * unaccepted findings and are analysed one at a time.
     */
    const drafts: SurveyFinding[] = urls.map((url, i) => ({
      id: crypto.randomUUID(),
      photoUrl: url,
      location: seed.photoLabels[i] || '',
      identifiedAs: '',
      note: '',
      severity: 'unclear',
      accepted: false,
      status: 'analysing',
    }));
    setFormData((prev) => ({ ...prev, findings: [...prev.findings, ...drafts] }));
    toast.success(`Brought ${drafts.length} photo${drafts.length === 1 ? '' : 's'} over`);

    (async () => {
      setUploading(true);
      try {
        for (const d of drafts) await runAnalysis(d.id, d.photoUrl, d.location);
      } finally {
        setUploading(false);
      }
    })();
  }, [isNew, runAnalysis]);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await saveNow();
      toast.success('Survey saved');
    } catch {
      toast.error('Could not save');
    } finally {
      setIsSaving(false);
    }
  };

  const accepted = acceptedFindings(formData.findings);
  const unreviewed = formData.findings.length - accepted.length;
  const canGenerate =
    !!formData.clientName && !!formData.installationAddress && accepted.length > 0;

  /*
   * The three things that actually gate the PDF, named individually.
   *
   * `canGenerate` is the same three conditions ANDed together, so this list and
   * the button can never disagree about why it is disabled — which is the usual
   * way a readiness hint goes stale.
   */
  const readiness = [
    { label: 'Client named', done: !!formData.clientName.trim() },
    { label: 'Property address added', done: !!formData.installationAddress.trim() },
    {
      label:
        accepted.length > 0
          ? `${accepted.length} finding${accepted.length === 1 ? '' : 's'} confirmed`
          : 'At least one confirmed finding',
      done: accepted.length > 0,
    },
  ];

  /*
   * "Quote the remedial work" — straight into the quote builder, prefilled.
   *
   * 🔴 Only `urgent` and `attention` become line items. "Dated but working" is
   * advice about the future, not work to be priced now, and quoting for it off
   * the back of a survey is how an advisory document turns into a sales tool —
   * which would poison the thing that makes the survey worth having.
   *
   * Every item is sent UNPRICED. The survey involved no testing and no
   * investigation, so there is no honest basis for a figure yet; the builder
   * gets the descriptions ready and the electrician puts the numbers on.
   */
  const remedialFindings = accepted.filter(
    (f) => f.severity === 'urgent' || f.severity === 'attention'
  );

  const handleQuoteRemedials = () => {
    const url = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'Pre-Purchase Survey',
      certificateReference: formData.certificateNumber || '',
      reportId: savedReportId || undefined,
      pdfUrl: generatedPdfUrl || undefined,
      items: remedialFindings.map((f) => ({
        id: f.id,
        description: [f.location, f.identifiedAs].filter(Boolean).join(' — ') || f.note,
        quantity: 1,
        unit: 'item',
        unitPrice: 0,
        totalPrice: 0,
        category: 'labour',
        notes: f.note,
        source: 'pre-purchase-survey',
        defectDescription: f.note,
      })),
      jobDescription: `Remedial work arising from the pre-purchase electrical survey at ${
        formData.installationAddress || 'the property'
      }. Prices to be confirmed — the survey was visual only and no testing was carried out.`,
    });
    navigate(url);
  };

  const pdfFilename = `Pre-Purchase-Survey-${formData.certificateNumber || 'report'}.pdf`;

  const handleDownload = async () => {
    if (!generatedPdfUrl) return;
    try {
      await openOrDownloadPdf(generatedPdfUrl, pdfFilename);
    } catch {
      /* openOrDownloadPdf reports its own failures. */
    }
  };

  /*
   * Built once and rendered in BOTH the generation dialog and the page, so the
   * two can never offer different next steps. The page copy matters because
   * the dialog is dismissible: closing it must not throw away the moment.
   */
  const nextSteps = (variant: 'dialog' | 'panel') => (
    <SurveyNextSteps
      variant={variant}
      findings={accepted}
      reportId={savedReportId}
      clientEmail={formData.clientEmail}
      clientName={formData.clientName}
      onDownload={handleDownload}
      onQuote={handleQuoteRemedials}
      buildPayload={() => formatPrePurchaseSurveyJson(formData, companyProfile)}
    />
  );

  const handleGenerate = async () => {
    if (!canGenerate) {
      toast.error('Add the client, the property and at least one accepted finding');
      return;
    }
    setIsGenerating(true);
    setShowGenerationDialog(true);
    setGenerationError(null);
    try {
      await syncNowImmediate();
      const payload = formatPrePurchaseSurveyJson(formData, companyProfile);

      if (savedReportId) {
        await supabase
          .from('reports')
          .update({ pdf_payload: payload })
          .eq('report_id', savedReportId);
      }

      /* The VCR edge function — same chassis, as the brief specifies. */
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
      toast.success('Survey generated');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'PDF generation failed';
      console.error('[PrePurchaseSurvey] generate failed:', err);
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

  const hasFindings = formData.findings.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <CertShellHeader
        onBack={() => navigate(-1)}
        title="Pre-Purchase Survey"
        subtitle={formData.certificateNumber || 'Advisory visual survey — not an EICR'}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
      />

      <main className="mx-auto max-w-[1600px] px-4 py-4 pb-28 sm:px-6 lg:px-8">
        {/*
         * 🔴 On screen as well as on the PDF. An electrician who has only ever
         * issued EICRs needs to know what they are handing over before they
         * start, not when they read the footer of the finished document.
         *
         * A rule and a line of type rather than a filled alert box. The point
         * is that it is ALWAYS there, on every survey — and a shouty orange
         * panel is something people learn to scroll past, as well as being the
         * wrong register for a document that goes to a paying client.
         */}
        <div className="-mx-4 border-y border-white/[0.1] bg-white/[0.03] px-4 py-3 sm:mx-0 sm:rounded-xl sm:border-x sm:px-5">
          <p className="border-l-2 border-elec-yellow pl-3 text-[13px] leading-relaxed text-white">
            <span className="font-semibold">Advisory visual survey.</span> Not an EICR and
            not an inspection to BS 7671 — no testing is recorded, and every suggested note
            is a draft you confirm before it reaches the report.
          </p>
        </div>

        {/*
         * Two columns from `lg`. The old single narrow column left most of a
         * desktop empty while the work — the photographs — was squeezed into
         * the middle. The photographs get the width; the paperwork sits beside
         * them and stays put while the findings scroll.
         */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start lg:gap-6">
          <div className="min-w-0 space-y-3">
            {!hasFindings ? (
              <SurveyCapture variant="hero" onPick={handlePick} disabled={uploading} />
            ) : (
              <>
                <SurveyCapture variant="bar" onPick={handlePick} disabled={uploading} />

                <div className="flex items-baseline justify-between gap-3 px-1 pt-1">
                  <h2 className="text-[15px] font-semibold tracking-tight text-white">
                    {formData.findings.length} photograph
                    {formData.findings.length === 1 ? '' : 's'}
                  </h2>
                  <p className="text-[13px] font-medium text-white">
                    {unreviewed > 0 ? (
                      <span className="text-elec-yellow">{unreviewed} to review</span>
                    ) : (
                      'All confirmed'
                    )}
                  </p>
                </div>

                <div className="space-y-3">
                  {formData.findings.map((f, i) => (
                    <SurveyFindingCard
                      key={f.id}
                      finding={f}
                      index={i}
                      onChange={(patch) => patchFinding(f.id, patch)}
                      onRemove={() => removeFinding(f.id)}
                      onRetry={() => retryAnalysis(f.id, f.photoUrl, f.location)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/*
           * Sticky on desktop so the readiness panel and the actions stay in
           * reach however long the findings list gets. `top` clears the shell
           * header, which is fixed.
           */}
          <aside className="min-w-0 space-y-3 lg:sticky lg:top-[84px]">
            <SurveyDetailsSections formData={formData} onUpdate={handleUpdate} />

            {/*
             * Once the survey exists, the panel becomes what to DO with it.
             *
             * The generation dialog can be dismissed with a tap, and before
             * this the flow ended there — Andrew: *"it come to the end download
             * the pdf, but that was it, nothing else."* Keeping the same
             * actions on the page means the work arising, the quote and the
             * send are still there when they come back to it tomorrow.
             */}
            {generatedPdfUrl ? (
              <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
                {nextSteps('panel')}
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] disabled:opacity-40"
                >
                  Regenerate after edits
                </button>
              </div>
            ) : (
            <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
              <h2 className="text-[15px] font-semibold tracking-tight text-white">
                Issue the survey
              </h2>

              {/*
               * A checklist, not a disabled button with a sentence under it.
               * "Needs the client, the property and one accepted finding" makes
               * you go and work out which one is missing; this says so.
               */}
              <ul className="mt-3 space-y-2">
                {readiness.map((r) => (
                  <li key={r.label} className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                        r.done ? 'bg-emerald-400/20' : 'border border-white/25'
                      )}
                    >
                      {r.done && <Check className="h-3 w-3 text-emerald-400" />}
                    </span>
                    <span className="text-[13px] leading-snug text-white">{r.label}</span>
                  </li>
                ))}
              </ul>

              {/*
               * 🔴 Unconfirmed photographs are stated here, next to the button.
               *
               * The realistic failure is not somebody choosing to publish an AI
               * draft — it is somebody with twenty photographs not noticing that
               * six were never opened. Those six are silently excluded, so
               * saying so is what stops the report going out quietly short.
               */}
              {unreviewed > 0 && (
                <p className="mt-3 border-l-2 border-elec-yellow pl-3 text-[13px] leading-snug text-white">
                  {unreviewed} photograph{unreviewed === 1 ? '' : 's'} you have not confirmed
                  will be left out.
                </p>
              )}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white/70"
              >
                <FileText className="h-[18px] w-[18px]" />
                Generate survey
              </button>

              {/* Appears once there is something worth quoting for. */}
              {remedialFindings.length > 0 && (
                <button
                  type="button"
                  onClick={handleQuoteRemedials}
                  className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.06] text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.98]"
                >
                  <ReceiptText className="h-[18px] w-[18px]" />
                  Quote the remedial work ({remedialFindings.length})
                </button>
              )}
            </div>
            )}
          </aside>
        </div>
      </main>

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isGenerating}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilename}
        errorMessage={generationError}
        documentLabel="Survey"
        actions={generatedPdfUrl ? nextSteps('dialog') : undefined}
      />
    </div>
  );
}
