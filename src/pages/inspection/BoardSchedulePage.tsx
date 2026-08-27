import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { buildBoardSchedulePayload } from '@/utils/board-schedule-payload';
import ImportFromCertSheet from '@/components/inspection/board-schedule/ImportFromCertSheet';
/*
 * Page layout comes from the shared kit, not from private copies. This page's
 * design is the one the other Notices & Labels documents were brought in line
 * with, so it has to consume the kit too — otherwise it becomes the tenth
 * divergent copy rather than the source.
 */
import { PageHeader } from '@/components/forms/PageHeader';
import {
  pageShellCn, pageContainerCn, pageMainCn, pageCardCn, pageWideCardCn,
  pageInputCn as inputCn, pageLabelCn as labelCn, pageTextareaCn,
  pageSectionHeadingCn, pagePrimaryBtnCn, pageSecondaryBtnCn, pageAccentBtnCn,
} from '@/components/forms/pageStyles';
import { reportCloud, type ReportType } from '@/utils/reportCloud';
import { useCertificateEmail } from '@/hooks/useCertificateEmail';
import { EmailCertificateDialog } from '@/components/certificate-completion/EmailCertificateDialog';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import type { BoardCircuit, BoardScheduleData } from '@/utils/generate-board-schedule-pdf';

const PHASES = ['L1', 'L2', 'L3'] as const;
const REPORT_TYPE: ReportType = 'board-schedule';
const DRAFT_KEY = 'board-schedule-draft';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

export default function BoardSchedulePage() {

  /*
   * ELE-1615 — the company profile is what brands the document. This page
   * previously hardcoded `companyName: ''` and never loaded a profile at all,
   * so every board schedule ever generated came out with no company details.
   * That was the actual bug behind the "add my branding" request.
   */
  const { companyProfile } = useCompanyProfile();

  /*
   * `:id` is the report_id of a saved schedule. Absent means a new one.
   * A board schedule is saved as a `reports` row like every other issued
   * document (ELE-1615) — that is what makes it findable in the certificate
   * library, reopenable, and emailable through send-certificate-resend, which
   * can only attach a PDF for a report that exists.
   */
  const { id: editId } = useParams<{ id: string }>();

  const [isThreePhase, setIsThreePhase] = useState(false);
  const [generating, setGenerating] = useState<null | 'door' | 'full'>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [reportId, setReportId] = useState<string | null>(editId ?? null);
  const [certificateNumber, setCertificateNumber] = useState('');

  const [board, setBoard] = useState<BoardScheduleData>(() => {
    const blank: BoardScheduleData = {
      boardRef: '', location: '', mainSwitchRating: '', rcdDetails: '',
      circuits: [{ id: crypto.randomUUID(), circuitNumber: '1', description: '', rating: '', type: 'MCB' }],
      companyName: '', notes: '',
      clientName: '', clientEmail: '', installationAddress: '',
      scheduleDate: new Date().toISOString().slice(0, 10),
    };
    // A local draft only ever restores into a NEW schedule. Restoring it over
    // a saved one would silently overwrite the stored record with whatever was
    // last typed on a different board.
    if (editId) return blank;
    const saved = storageGetJSONSync<Partial<BoardScheduleData>>(DRAFT_KEY, null);
    return saved ? { ...blank, ...saved } : blank;
  });

  /* Load a saved schedule when opened with an id. */
  useEffect(() => {
    if (!editId) return;
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const stored = await reportCloud.getReportData(editId, user.id);
      if (!stored || cancelled) return;
      /*
       * `isThreePhase` and `certificateNumber` are stored inside `data` but are
       * NOT part of the board itself — they are pulled out into their own state
       * rather than spread in, so `board` stays exactly the shape the payload
       * builder and the PDF contract expect instead of accumulating stray keys
       * that get written back on every save.
       */
      const { isThreePhase: storedThreePhase, certificateNumber: storedCertNo, ...rest } =
        stored as Partial<BoardScheduleData> & { isThreePhase?: boolean; certificateNumber?: string };
      setBoard((prev) => ({ ...prev, ...rest }));
      setIsThreePhase(!!storedThreePhase);
      setCertificateNumber(storedCertNo ?? '');
      setReportId(editId);
    })();
    return () => { cancelled = true; };
  }, [editId]);

  /* Debounced local draft — new schedules only, per the note above. */
  useEffect(() => {
    if (editId) return;
    const t = setTimeout(() => storageSetJSONSync(DRAFT_KEY, board), 2000);
    return () => clearTimeout(t);
  }, [board, editId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateBoard = useCallback((field: keyof BoardScheduleData, value: any) => {
    setBoard((prev) => ({ ...prev, [field]: value }));
  }, []);

  /** Distinct way numbers, in first-seen order — three-phase repeats each one. */
  const wayNumbers = Array.from(new Set(board.circuits.map((c) => c.circuitNumber)));

  /*
   * 🔴 A WAY IS NOT A PHASE. On three phase, adding a way adds THREE rows —
   * L1, L2 and L3 all belonging to that one way number. Single phase adds one.
   */
  const addWay = () => {
    /*
     * 🔴 Next way is one past the HIGHEST existing number, not the count.
     * Counting broke as soon as a way was deleted: remove way 2 from a 3-way
     * board and you are left with [1, 3], count 2, so "Add way" minted a
     * SECOND way 3. Both then grouped under one way number in the PDF, and
     * deleting either removed both — `removeWay` filters by number.
     * Non-numeric references (an imported "2a") fall back to the count.
     */
    const highest = wayNumbers.reduce((max, w) => {
      const n = parseInt(w, 10);
      return Number.isFinite(n) && n > max ? n : max;
    }, 0);
    const nextNum = String((highest || wayNumbers.length) + 1);
    const rows: BoardCircuit[] = (isThreePhase ? PHASES : ['']).map((phase) => ({
      id: crypto.randomUUID(),
      circuitNumber: nextNum,
      description: '',
      rating: '',
      type: 'MCB',
      phase: phase || undefined,
    }));
    setBoard((prev) => ({ ...prev, circuits: [...prev.circuits, ...rows] }));
  };

  const updateCircuit = (id: string, field: keyof BoardCircuit, value: string) => {
    setBoard((prev) => ({ ...prev, circuits: prev.circuits.map((c) => c.id === id ? { ...c, [field]: value } : c) }));
  };

  /** Removing works on the WAY, so a three-phase way goes as a set of three. */
  const removeWay = (wayNumber: string) => {
    if (wayNumbers.length <= 1) return;
    setBoard((prev) => ({ ...prev, circuits: prev.circuits.filter((c) => c.circuitNumber !== wayNumber) }));
  };

  /*
   * Switching mode rebuilds the rows rather than trying to reconcile them.
   * Going single → three expands each way into L1/L2/L3, keeping what was
   * typed on L1. Going three → single keeps only the L1 row of each way,
   * because there is no honest way to merge three circuits into one.
   */
  const setPhaseMode = (three: boolean) => {
    if (three === isThreePhase) return;
    setBoard((prev) => {
      const ways = Array.from(new Set(prev.circuits.map((c) => c.circuitNumber)));
      const next: BoardCircuit[] = [];
      for (const way of ways) {
        const existing = prev.circuits.filter((c) => c.circuitNumber === way);
        if (three) {
          PHASES.forEach((phase, i) => {
            const src = i === 0 ? existing[0] : undefined;
            /*
             * ⚠️ The L1 row carries the WHOLE original circuit across, not just
             * description/rating/type. Copying only those three threw away
             * cableSize, zs and rcdRating — so toggling a board imported from a
             * certificate to three phase silently discarded every test result,
             * `has_extended` flipped false, and the PDF lost its Cable, Zs and
             * RCD columns entirely.
             */
            next.push({
              ...(src ?? {}),
              id: crypto.randomUUID(),
              circuitNumber: way,
              description: src?.description ?? '',
              rating: src?.rating ?? '',
              type: src?.type ?? 'MCB',
              phase,
            });
          });
        } else {
          const src = existing[0];
          // Same reasoning as above — carry the row, then drop the phase.
          next.push({
            ...(src ?? {}),
            id: crypto.randomUUID(),
            circuitNumber: way,
            description: src?.description ?? '',
            rating: src?.rating ?? '',
            type: src?.type ?? 'MCB',
            phase: undefined,
          });
        }
      }
      return { ...prev, circuits: next };
    });
    setIsThreePhase(three);
  };

  /*
   * Everything the PDF and the emailed copy are rendered from.
   *
   * Memoised because it is read during render (the email hook takes it as
   * `formattedData`), so building it inline re-ran the brand contrast maths and
   * remapped every circuit on every keystroke.
   */
  const payload = useMemo(
    () => buildBoardSchedulePayload(board, companyProfile, { threePhase: isThreePhase }),
    [board, companyProfile, isThreePhase]
  );

  /** Board reference plus one described circuit — the same bar the PDF sets. */
  const isUsable = !!board.boardRef && board.circuits.some((c) => c.description);

  /*
   * Save as a `reports` row and return its report_id.
   *
   * ⚠️ `isThreePhase` is written INTO `data`. It is not derivable from the
   * circuits — a three-phase board whose L2/L3 rows are still blank looks
   * identical to a single-phase one — so reopening a saved schedule without it
   * would silently demote it to single phase and drop the phase column from
   * the document.
   *
   * `pdf_payload` is stored alongside because send-certificate-resend
   * regenerates from `report.pdf_payload` when the client does not hand it a
   * formatted payload. Without it, emailing a schedule saved in an earlier
   * session would send a link to a stale PDF, or fail outright.
   */
  const persist = useCallback(async (): Promise<string | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error('Please sign in to save this schedule'); return null; }

    const stored = { ...board, isThreePhase, certificateNumber } as unknown as Record<string, unknown>;

    if (reportId) {
      await reportCloud.updateReport(reportId, user.id, stored);
      await supabase.from('reports').update({ pdf_payload: payload }).eq('report_id', reportId);
      return reportId;
    }

    const result = await reportCloud.createReport(user.id, REPORT_TYPE, stored);
    if (!result.success || !result.reportId) { toast.error('Could not save the schedule'); return null; }

    setReportId(result.reportId);

    /*
     * `createReport` allocates the certificate number itself (ELE-1542, one
     * counter per account + prefix + year) and returns only the report_id, so
     * it is read back here. Without this the number would show as blank on
     * screen and in the email until the page was reloaded.
     */
    const { data: row } = await supabase
      .from('reports')
      .select('certificate_number')
      .eq('report_id', result.reportId)
      .maybeSingle();
    if (row?.certificate_number) setCertificateNumber(row.certificate_number);

    await supabase.from('reports').update({ pdf_payload: payload }).eq('report_id', result.reportId);
    // The local draft has served its purpose once the row exists; leaving it
    // would restore this board over the NEXT new schedule the user starts.
    storageRemoveSync(DRAFT_KEY);
    return result.reportId;
  }, [board, isThreePhase, certificateNumber, reportId, payload]);

  const handleSave = async () => {
    if (!isUsable) { toast.error('Add a board reference and at least one circuit'); return; }
    setSaving(true);
    try {
      const id = await persist();
      if (id) toast.success(reportId ? 'Schedule updated' : 'Schedule saved');
    } catch (err) {
      console.error('[BoardSchedule] save failed:', err);
      toast.error('Could not save the schedule');
    } finally {
      setSaving(false);
    }
  };

  /*
   * Sending goes through the SAME Brevo path as every certificate
   * (send-certificate-resend), which needs a saved row to attach a PDF to.
   * The formatted payload is handed over directly so the send does not depend
   * on `pdf_payload` having been written yet.
   */
  const { sendCertificateEmail, isLoading: emailSending } = useCertificateEmail({
    certificateType: 'board-schedule',
    reportId: reportId || '',
    certificateNumber,
    clientName: board.clientName,
    clientEmail: board.clientEmail,
    installationAddress: board.installationAddress,
    inspectionDate: board.scheduleDate,
    companyName: companyProfile?.company_name,
    formattedData: payload,
  });

  const openEmail = async () => {
    if (!isUsable) { toast.error('Add a board reference and at least one circuit'); return; }
    setSaving(true);
    try {
      // Save first — there is nothing to email until the row exists.
      const id = await persist();
      if (!id) return;
      setEmailOpen(true);
    } catch (err) {
      console.error('[BoardSchedule] save-before-send failed:', err);
      toast.error('Could not save the schedule');
    } finally {
      setSaving(false);
    }
  };

  const handleGenerate = async (type: 'door' | 'full') => {
    if (!isUsable) { toast.error('Add a board reference and at least one circuit'); return; }

    setGenerating(type);
    try {
      /*
       * Both documents are PDFMonkey templates fed by ONE payload builder.
       * The door label ignores the fields it has no business carrying (cable
       * size, Zs, RCD ratings, logo, scheme, notes) rather than taking a
       * different payload — one builder, one contract, two templates.
       *
       * ⚠️ The door label used to be client-side jsPDF, which meant two
       * divergent layouts to keep in step and no company branding on the one
       * document that stays with the board. If offline capture matters later,
       * the answer is a queued retry, not a second jsPDF layout.
       */

      const fn = type === 'door' ? 'generate-cu-door-label-pdf' : 'generate-board-schedule-pdf';
      const { data, error } = await supabase.functions.invoke(fn, { body: { payload } });

      if (error) throw error;
      if (!data?.success || !data?.pdfUrl) {
        throw new Error(data?.error || 'No PDF returned');
      }

      const filename =
        type === 'door'
          ? `CU-Door-Label-${board.boardRef}.pdf`
          : `Board-Schedule-${board.boardRef}.pdf`;

      /*
       * Only the A4 schedule is recorded against the report. The CU door label
       * is a sticker for the inside of a consumer unit — writing its URL to
       * `pdf_url` would make it the file a client received when they asked for
       * their schedule, and send-certificate-resend would then attach it.
       */
      if (type === 'full' && reportId) {
        await supabase
          .from('reports')
          .update({
            pdf_url: data.pdfUrl,
            pdf_generated_at: new Date().toISOString(),
            pdf_payload: payload,
          })
          .eq('report_id', reportId);
      }

      const { openOrDownloadPdf } = await import('@/utils/pdf-download');
      await openOrDownloadPdf(data.pdfUrl, filename);
      toast.success(type === 'door' ? 'CU door label generated' : 'Board schedule generated');
    } catch (err) {
      console.error('Board schedule error:', err);
      toast.error(
        type === 'door'
          ? 'Could not generate the door label. Check your connection and try again.'
          : 'Could not generate the schedule. Check your connection and try again.'
      );
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className={pageShellCn}>
      <PageHeader
        eyebrow="Printable"
        title="Board Schedule"
        lead="Two documents, one entry."
        description="A CU door label to leave inside the board, or a branded A4 schedule for the client."
        reference={certificateNumber || undefined}
        actions={
          <>
            {/* Live count — a way is not a row, so this reports ways, not circuits. */}
            <span className="hidden h-11 items-center rounded-xl border border-white/[0.16] bg-white/[0.06] px-3.5 text-[13px] font-semibold text-white sm:inline-flex">
              {wayNumbers.length} {wayNumbers.length === 1 ? 'way' : 'ways'} &middot;{' '}
              {isThreePhase ? 'Three phase' : 'Single phase'}
            </span>
            <button
              onClick={() => setImportOpen(true)}
              className="h-11 flex-1 rounded-xl border border-elec-yellow/50 bg-elec-yellow/10 px-4 text-[13px] font-semibold text-elec-yellow transition-colors hover:bg-elec-yellow/20 touch-manipulation active:scale-[0.98] sm:flex-none"
            >
              Import from certificate
            </button>
          </>
        }
      />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(pageContainerCn, pageMainCn)}
      >
        {/* Board details */}
        {/*
          Client and site. Not decoration — these populate `reports.client_name`
          and `installation_address` (so a saved schedule is findable in the
          certificate library), prefill the send dialog, and name who the A4
          document was prepared for.
        */}
        <motion.section variants={itemVariants} className={pageCardCn}>
          <h2 className={pageSectionHeadingCn}>Client &amp; site</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <div><Label className={labelCn}>Client name</Label><Input value={board.clientName || ''} onChange={(e) => updateBoard('clientName', e.target.value)} className={inputCn} placeholder="e.g. Mrs J Hartley" /></div>
            <div><Label className={labelCn}>Client email</Label><Input type="email" inputMode="email" autoCapitalize="none" autoCorrect="off" value={board.clientEmail || ''} onChange={(e) => updateBoard('clientEmail', e.target.value)} className={inputCn} placeholder="Used to send the schedule" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <div><Label className={labelCn}>Site address</Label><Input value={board.installationAddress || ''} onChange={(e) => updateBoard('installationAddress', e.target.value)} className={inputCn} placeholder="Where the board is installed" /></div>
            <div><Label className={labelCn}>Date</Label><Input type="date" value={board.scheduleDate || ''} onChange={(e) => updateBoard('scheduleDate', e.target.value)} className={inputCn} /></div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className={pageCardCn}>
          <h2 className={pageSectionHeadingCn}>Board details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label className={labelCn}>Board Reference *</Label><Input value={board.boardRef} onChange={(e) => updateBoard('boardRef', e.target.value)} className={inputCn} placeholder="e.g. DB1" /></div>
            <div><Label className={labelCn}>Location</Label><Input value={board.location} onChange={(e) => updateBoard('location', e.target.value)} className={inputCn} placeholder="e.g. Plant room" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label className={labelCn}>Board make / model</Label><Input value={board.boardMake || ''} onChange={(e) => updateBoard('boardMake', e.target.value)} className={inputCn} placeholder="e.g. Hager VML" /></div>
            <div><Label className={labelCn}>Total ways</Label><Input value={board.totalWays || ''} onChange={(e) => updateBoard('totalWays', e.target.value)} className={inputCn} placeholder="e.g. 12" inputMode="numeric" /></div>
          </div>
        </motion.section>

        {/* Second card fills the right-hand column that used to sit empty. */}
        <motion.section variants={itemVariants} className={pageCardCn}>
          <h2 className={pageSectionHeadingCn}>Supply &amp; protection</h2>

          {/* Two options, so chips rather than a select (design system). */}
          <div>
            <Label className={labelCn}>Supply</Label>
            <div className="flex gap-2">
              {([['Single phase', false], ['Three phase', true]] as const).map(([text, three]) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => setPhaseMode(three)}
                  className={cn(
                    'h-11 flex-1 rounded-xl border text-[13px] transition-colors touch-manipulation active:scale-[0.98]',
                    isThreePhase === three
                      ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                      : 'bg-white/[0.08] border-white/[0.16] text-white font-medium'
                  )}
                >
                  {text}
                </button>
              ))}
            </div>
            {isThreePhase && (
              <p className="mt-2 text-[12px] text-white">
                Each way carries L1, L2 and L3 — brown, black and grey (BS 7671 Table 51).
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label className={labelCn}>Main Switch</Label><Input value={board.mainSwitchRating} onChange={(e) => updateBoard('mainSwitchRating', e.target.value)} className={inputCn} placeholder="e.g. 100A DP" /></div>
            <div><Label className={labelCn}>RCD Details</Label><Input value={board.rcdDetails} onChange={(e) => updateBoard('rcdDetails', e.target.value)} className={inputCn} placeholder="e.g. 63A 30mA" /></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Both are recorded per board on EICRs, so they import cleanly. */}
            <div><Label className={labelCn}>SPD</Label><Input value={board.spd || ''} onChange={(e) => updateBoard('spd', e.target.value)} className={inputCn} placeholder="e.g. Type 2 fitted" /></div>
            <div><Label className={labelCn}>Fed from</Label><Input value={board.fedFrom || ''} onChange={(e) => updateBoard('fedFrom', e.target.value)} className={inputCn} placeholder="e.g. Main DB, way 6" /></div>
          </div>
        </motion.section>

        {/* Circuits */}
        <motion.section variants={itemVariants} className={cn(pageCardCn, 'space-y-3')}>
          <div className="flex items-center justify-between">
            <h2 className={pageSectionHeadingCn}>Circuits</h2>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/[0.12] text-white">
              {wayNumbers.length} {wayNumbers.length === 1 ? 'way' : 'ways'}
            </span>
          </div>

          {/* Grouped by way: on three phase one way owns three rows. */}
          {wayNumbers.map((wayNumber) => {
            const rows = board.circuits.filter((c) => c.circuitNumber === wayNumber);
            return (
              <div key={wayNumber} className="rounded-xl border border-white/[0.14] bg-white/[0.03] p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-white">Way {wayNumber}</span>
                  {wayNumbers.length > 1 && (
                    <button
                      onClick={() => removeWay(wayNumber)}
                      aria-label={`Remove way ${wayNumber}`}
                      className="w-11 h-11 -mr-2 -my-2 rounded-lg flex items-center justify-center text-[20px] leading-none text-red-400 hover:bg-red-500 hover:text-white transition-colors touch-manipulation"
                    >
                      ×
                    </button>
                  )}
                </div>

                {rows.map((circuit) => (
                  /*
                   * Mobile-first: description gets its own full-width row, then
                   * rating and device sit side by side beneath it. The previous
                   * 12-column single row squeezed the description to a few
                   * characters on a phone — which is the device this is filled
                   * in on, at a board. From sm: up it collapses to one row.
                   */
                  <div key={circuit.id} className="flex items-start gap-2.5">
                    {isThreePhase && (
                      /* Conductor colours, BS 7671 Table 51 — matches the PDF. */
                      <span
                        className={cn(
                          'mt-[26px] w-10 h-8 rounded-md flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 ring-1 ring-white/20',
                          circuit.phase === 'L1' && 'bg-[#6B4423]',
                          circuit.phase === 'L2' && 'bg-[#1C1C1C]',
                          circuit.phase === 'L3' && 'bg-[#6E6E6E]'
                        )}
                      >
                        {circuit.phase}
                      </span>
                    )}
                    <div className="flex-1 min-w-0 space-y-2 sm:space-y-0 sm:flex sm:items-end sm:gap-3">
                      <div className="sm:flex-1 sm:min-w-0">
                        <Label className={labelCn}>Description</Label>
                        <Input value={circuit.description} onChange={(e) => updateCircuit(circuit.id, 'description', e.target.value)} className={inputCn} placeholder="e.g. Sockets — kitchen ring" />
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-3">
                        <div className="sm:w-20">
                          <Label className={labelCn}>Rating</Label>
                          <Input value={circuit.rating} onChange={(e) => updateCircuit(circuit.id, 'rating', e.target.value)} className={cn(inputCn, 'text-center')} placeholder="A" inputMode="numeric" />
                        </div>
                        <div className="sm:w-32">
                          <Label className={labelCn}>Device</Label>
                          <Input value={circuit.type} onChange={(e) => updateCircuit(circuit.id, 'type', e.target.value)} className={inputCn} placeholder="MCB" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          <button onClick={addWay} className="h-11 w-full rounded-xl border border-dashed border-white/[0.3] text-[13px] font-semibold text-white hover:border-elec-yellow/60 hover:text-elec-yellow transition-colors touch-manipulation active:scale-[0.98]">
            Add Way
          </button>
        </motion.section>

        {/* Notes */}
        <motion.section variants={itemVariants} className={cn(pageCardCn, 'space-y-3')}>
          <h2 className={pageSectionHeadingCn}>Notes</h2>
          <Textarea value={board.notes || ''} onChange={(e) => updateBoard('notes', e.target.value)} className={pageTextareaCn} placeholder="Additional notes..." />
        </motion.section>

        {/*
          Full-width action bar spanning both columns. Previously the buttons
          sat huddled at the left of a single column, and the branded A4
          document — the whole point of the work — was the SECONDARY button
          while the door label took the primary yellow. Swapped, and both are
          now equal halves of the full width.
        */}
        <motion.section variants={itemVariants} className={cn(pageWideCardCn, 'space-y-4')}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className={pageSectionHeadingCn}>Generate</h2>
            {/*
              Say whether the document will carry their branding BEFORE they
              generate it, rather than letting them find out from a blank
              header — which is exactly how this went unnoticed for months.
            */}
            <p className="text-[12px] text-white">
              {companyProfile?.company_name
                ? `Branded as ${companyProfile.company_name}`
                : 'Add company details in Settings → Business to brand this'}
            </p>
          </div>

          {/*
            Four actions, ordered by what an electrician actually does: save the
            record, print the label that goes in the board, produce the client's
            copy, send it. The A4 schedule keeps the primary yellow — it is the
            document the rest of this exists to produce.
          */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <button
              disabled={saving || generating !== null}
              className={pageSecondaryBtnCn}
              onClick={handleSave}
            >
              {saving ? 'Saving…' : reportId ? 'Update' : 'Save'}
            </button>
            <button
              disabled={generating !== null}
              className={pageSecondaryBtnCn}
              onClick={() => handleGenerate('door')}
            >
              {generating === 'door' ? 'Generating…' : 'Door label'}
            </button>
            <button
              disabled={generating !== null}
              className={pagePrimaryBtnCn}
              onClick={() => handleGenerate('full')}
            >
              {generating === 'full' ? 'Generating…' : 'A4 schedule'}
            </button>
            <button
              disabled={saving || generating !== null}
              className={pageAccentBtnCn}
              onClick={openEmail}
            >
              Send to client
            </button>
          </div>

          {/*
            Saved-state line. A board schedule now IS a record, so the page has
            to say whether this one has been kept — otherwise "Send to client"
            silently creating a certificate-library entry would be a surprise.
          */}
          <p className="text-[12px] text-white">
            {reportId
              ? `Saved${certificateNumber ? ` as ${certificateNumber}` : ''} — sending emails the latest version.`
              : 'Not saved yet. Saving files this under Certificates so you can reopen and reissue it.'}
          </p>
        </motion.section>
      </motion.main>

      {/*
        Pulls circuits, devices, cable sizes and Zs from an existing cert.
        Replaces the whole form state rather than merging — a half-merged
        board schedule would be worse than either source on its own.
      */}
      <EmailCertificateDialog
        open={emailOpen}
        onOpenChange={setEmailOpen}
        certificateType="Board Schedule"
        certificateNumber={certificateNumber}
        clientName={board.clientName}
        clientEmail={board.clientEmail}
        installationAddress={board.installationAddress}
        inspectionDate={board.scheduleDate}
        companyName={companyProfile?.company_name}
        isLoading={emailSending}
        onSend={async (email, cc, message) => {
          // persist() runs before the dialog opens, so this should never fire —
          // but sending with an empty reportId would have the edge function
          // look up a report that cannot exist and fail with a confusing error.
          if (!reportId) { toast.error('Save the schedule before sending it'); return; }
          await sendCertificateEmail({ recipientEmail: email, cc, customMessage: message });
        }}
      />

      <ImportFromCertSheet
        open={importOpen}
        onOpenChange={setImportOpen}
        onImport={(imported, threePhase) => {
          /*
           * The date is the page's, not the certificate's. A schedule imported
           * from an EICR done last month is still being ISSUED today, and a
           * wholesale replace left the date field blank because
           * `buildScheduleFromCert` has no notion of one.
           */
          setBoard({
            ...imported,
            scheduleDate: board.scheduleDate || new Date().toISOString().slice(0, 10),
          });
          setIsThreePhase(threePhase);
        }}
      />
    </div>
  );
}
