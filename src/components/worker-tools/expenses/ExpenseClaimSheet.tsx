/**
 * New / edit expense claim — Worker Tools → Expenses (ELE-2001).
 *
 * Two kinds of claim:
 *   Mileage — from → to (job address prefilled), miles worked out from the
 *     route or typed, one way or return. The amount is ALWAYS worked out on the
 *     server at the firm's rate (mileage_quote / submit_my_mileage_claim); the
 *     sheet only shows that figure.
 *   Receipt — amount, category, receipt from the camera OR a file (PDF too).
 *     On iPhone a `capture` attribute forces the camera, so the two buttons are
 *     two inputs: "Take photo" (camera) and "Choose photo or PDF" (no capture).
 *
 * Edit is only offered on Pending claims; the server re-checks.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Camera, FileText, Loader2, MapPin, Route, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, selectTriggerCn, textareaCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { JobChoice, Segmented } from '@/components/worker-tools/WorkerUi';
import { PrimaryButton, SecondaryButton } from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import type { WorkerExpenseClaim, WorkerClaimInput, WorkerMileageInput } from '@/hooks/useExpenses';
import { useMileageQuote, HMRC_MILEAGE } from '@/hooks/useFirmPaySettings';
import {
  WORKER_EXPENSE_CATEGORIES,
  gbp,
  isMileage,
  parseDistanceText,
  pence,
} from '@/components/worker-tools/expenses/expenseShared';
import { isPdfReceipt, useSignedReceipt } from '@/components/worker-tools/expenses/receiptLinks';

export type ClaimKind = 'mileage' | 'receipt';

interface JobOption {
  id: string;
  title: string;
  client_name?: string | null;
  address?: string | null;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string | undefined;
  /** The firm's flat rate in pence, or null for the HMRC approved rate. */
  firmRatePence: number | null | undefined;
  jobs: JobOption[];
  jobsLoading?: boolean;
  /** Present when editing a Pending claim. */
  claim?: WorkerExpenseClaim | null;
  initialKind?: ClaimKind;
  onSubmitPlain: (input: WorkerClaimInput) => Promise<unknown>;
  onSubmitMileage: (input: WorkerMileageInput) => Promise<unknown>;
  busy?: boolean;
}

const LAST_FROM_KEY = 'elecmate.worker.mileageFrom';
const todayIso = () => format(new Date(), 'yyyy-MM-dd');

function readLastFrom(): string {
  try {
    return localStorage.getItem(LAST_FROM_KEY) ?? '';
  } catch {
    return '';
  }
}
function saveLastFrom(v: string) {
  try {
    if (v.trim()) localStorage.setItem(LAST_FROM_KEY, v.trim());
  } catch {
    /* private mode — nothing to remember */
  }
}

export function ExpenseClaimSheet({
  open,
  onOpenChange,
  employeeId,
  firmRatePence,
  jobs,
  jobsLoading,
  claim,
  initialKind = 'mileage',
  onSubmitPlain,
  onSubmitMileage,
  busy,
}: Props) {
  const editing = !!claim;
  const [kind, setKind] = useState<ClaimKind>(initialKind);

  // Shared
  const [incurredOn, setIncurredOn] = useState(todayIso());
  const [jobId, setJobId] = useState('');
  const [note, setNote] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [removeReceipt, setRemoveReceipt] = useState(false);

  // Receipt claim
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  // Mileage
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isReturn, setIsReturn] = useState(false);
  const [oneWayMiles, setOneWayMiles] = useState('');
  const [routeNote, setRouteNote] = useState<string | null>(null);
  const [routing, setRouting] = useState(false);
  const autoTo = useRef<string | null>(null);

  const cameraRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // (Re)fill the form each time the sheet opens.
  useEffect(() => {
    if (!open) return;
    setReceiptFile(null);
    setRemoveReceipt(false);
    setRouteNote(null);
    if (claim) {
      const mileage = isMileage(claim);
      setKind(mileage ? 'mileage' : 'receipt');
      setIncurredOn((claim.incurred_on || claim.submitted_date || todayIso()).slice(0, 10));
      setJobId(claim.job_id ?? '');
      // A generated "Mileage: A → B" summary is rebuilt by the server — don't
      // send it back as a note or it would go stale when the route changes.
      const desc = claim.description ?? '';
      setNote(mileage && desc.startsWith('Mileage:') ? '' : desc === claim.category ? '' : desc);
      setAmount(mileage ? '' : String(Number(claim.amount) || ''));
      setCategory(mileage ? '' : (claim.category || '').toLowerCase());
      setFrom(claim.mileage_from ?? '');
      setTo(claim.mileage_to ?? '');
      setIsReturn(!!claim.mileage_return);
      const total = Number(claim.mileage_miles) || 0;
      setOneWayMiles(total ? String(claim.mileage_return ? total / 2 : total) : '');
      autoTo.current = null;
    } else {
      setKind(initialKind);
      setIncurredOn(todayIso());
      setJobId('');
      setNote('');
      setAmount('');
      setCategory('');
      setFrom(readLastFrom());
      setTo('');
      setIsReturn(false);
      setOneWayMiles('');
      autoTo.current = null;
    }
  }, [open, claim, initialKind]);

  // Picking a job fills "To" with its address unless the worker typed one.
  const pickJob = (id: string) => {
    setJobId(id);
    const job = jobs.find((j) => j.id === id);
    const addr = job?.address?.trim() || '';
    if (kind === 'mileage' && addr && (!to.trim() || to === autoTo.current)) {
      setTo(addr);
      autoTo.current = addr;
      setRouteNote(null);
    }
  };

  const oneWay = parseFloat(oneWayMiles);
  const totalMiles = Number.isFinite(oneWay) && oneWay > 0 ? oneWay * (isReturn ? 2 : 1) : 0;
  const quote = useMileageQuote(
    kind === 'mileage' ? employeeId : null,
    totalMiles,
    incurredOn || null,
    claim?.id ?? null
  );

  const workOutMiles = async () => {
    if (from.trim().length < 3 || to.trim().length < 3) {
      toast.error('Add where you set off from and where you went');
      return;
    }
    setRouting(true);
    try {
      const { data, error } = await supabase.functions.invoke('google-travel-time', {
        body: { origin: from.trim(), destination: to.trim() },
      });
      const payload = data as { distanceText?: string | null; error?: string } | null;
      const miles = parseDistanceText(payload?.distanceText);
      if (error || miles == null) throw new Error(payload?.error || 'No route');
      const rounded = Math.max(0.1, Math.round(miles * 10) / 10);
      setOneWayMiles(String(rounded));
      setRouteNote(`Driving route: ${rounded} miles one way. Change it if you went another way.`);
    } catch {
      toast.error("Couldn't work out the route", {
        description: 'Check both addresses, or type the miles from your dashboard.',
      });
    } finally {
      setRouting(false);
    }
  };

  // One object URL per picked image, released when it changes or closes.
  const previewUrl = useMemo(
    () => (receiptFile && receiptFile.type.startsWith('image/') ? URL.createObjectURL(receiptFile) : null),
    [receiptFile]
  );
  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const plainAmount = parseFloat(amount);
  const existingReceipt = claim?.receipt_url && !removeReceipt ? claim.receipt_url : null;
  const signed = useSignedReceipt(open && existingReceipt && !receiptFile ? existingReceipt : null);

  const canSave =
    kind === 'mileage'
      ? totalMiles > 0 && totalMiles <= 2000 && !!incurredOn && from.trim() !== '' && to.trim() !== ''
      : Number.isFinite(plainAmount) && plainAmount > 0 && plainAmount <= 10000 && !!category && !!incurredOn;

  const save = async () => {
    if (!canSave || busy) return;
    try {
      if (kind === 'mileage') {
        saveLastFrom(from);
        await onSubmitMileage({
          miles: Math.round(totalMiles * 10) / 10,
          from: from.trim(),
          to: to.trim(),
          isReturn,
          jobId: jobId || null,
          description: note.trim(),
          incurredOn,
          receiptFile,
          removeReceipt,
        });
      } else {
        await onSubmitPlain({
          category,
          amount: Math.round(plainAmount * 100) / 100,
          description: note.trim(),
          jobId: jobId || null,
          incurredOn,
          receiptFile,
          removeReceipt,
        });
      }
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save the claim');
    }
  };

  const rateLine = useMemo(() => {
    if (firmRatePence != null) return `Your firm pays ${pence(firmRatePence)} a mile.`;
    return `HMRC approved rate: ${HMRC_MILEAGE.firstPence}p a mile for your first ${HMRC_MILEAGE.thresholdMiles.toLocaleString('en-GB')} business miles this tax year, then ${HMRC_MILEAGE.afterPence}p.`;
  }, [firmRatePence]);

  const quoteAmount = quote.data?.amount;
  const saveLabel =
    kind === 'mileage'
      ? quoteAmount != null && totalMiles > 0
        ? `${editing ? 'Save' : 'Send'} ${gbp(quoteAmount)}`
        : editing
          ? 'Save changes'
          : 'Send claim'
      : `${editing ? 'Save' : 'Send'} ${gbp(Number.isFinite(plainAmount) && plainAmount > 0 ? plainAmount : 0)}`;

  const jobOptions = [{ id: '', title: 'No job', client_name: null, address: null }, ...jobs];

  // ── Pieces ────────────────────────────────────────────────────────────────
  const dateField = (
    <div>
      <label className={labelCn} htmlFor="claim-date">
        {kind === 'mileage' ? 'Day of the journey' : 'Date on the receipt'}
      </label>
      <input
        id="claim-date"
        type="date"
        max={todayIso()}
        value={incurredOn}
        onChange={(e) => setIncurredOn(e.target.value)}
        className={inputCn}
      />
    </div>
  );

  const jobField = (
    <div>
      <p className={labelCn}>Job (optional)</p>
      <JobChoice jobs={jobOptions} value={jobId} onChange={pickJob} loading={jobsLoading} />
    </div>
  );

  const noteField = (
    <div>
      <label className={labelCn} htmlFor="claim-note">
        {kind === 'mileage' ? 'What was the trip for? (optional)' : 'What was it for?'}
      </label>
      <textarea
        id="claim-note"
        value={note}
        onChange={(e) => setNote(e.target.value.slice(0, 500))}
        placeholder={kind === 'mileage' ? 'e.g. Collected cable from CEF' : 'e.g. 2 × 25 m 2.5 T&E'}
        className={cn(textareaCn, 'min-h-[72px]')}
      />
    </div>
  );

  const receiptField = (
    <div className="space-y-2.5">
      <p className={labelCn}>Receipt{kind === 'mileage' ? ' (optional)' : ''}</p>
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setReceiptFile(f);
          e.target.value = '';
        }}
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/*,application/pdf"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setReceiptFile(f);
          e.target.value = '';
        }}
      />
      {receiptFile || existingReceipt ? (
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.14] bg-white/[0.04] px-3 py-2.5">
          {receiptFile ? (
            previewUrl ? (
              <img
                src={previewUrl}
                alt=""
                className="h-12 w-12 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <FileText className="h-6 w-6 shrink-0 text-elec-yellow" />
            )
          ) : isPdfReceipt(existingReceipt) || !signed.data ? (
            <FileText className="h-6 w-6 shrink-0 text-elec-yellow" />
          ) : (
            <img src={signed.data} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-white">
              {receiptFile ? receiptFile.name : 'Receipt attached'}
            </p>
            <p className="text-[12px] text-white">
              {receiptFile ? 'Uploads when you save' : 'Already on this claim'}
            </p>
          </div>
          <button
            type="button"
            aria-label="Remove receipt"
            onClick={() => {
              if (receiptFile) setReceiptFile(null);
              else setRemoveReceipt(true);
            }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.14] text-white touch-manipulation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-2" data-help="wt-expenses.photo">
        <button
          type="button"
          onClick={() => cameraRef.current?.click()}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.05] px-3 text-[13.5px] font-semibold text-white touch-manipulation active:scale-[0.99]"
        >
          <Camera className="h-4 w-4 text-elec-yellow" />
          Take photo
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.05] px-3 text-[13.5px] font-semibold text-white touch-manipulation active:scale-[0.99]"
        >
          <FileText className="h-4 w-4 text-elec-yellow" />
          Photo or PDF
        </button>
      </div>
    </div>
  );

  const mileageHero = (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
        You&rsquo;ll claim
      </p>
      <p className="mt-1.5 text-[34px] font-semibold leading-none tabular-nums text-white">
        {totalMiles > 0 && quoteAmount != null ? gbp(quoteAmount) : '£0.00'}
        {quote.isFetching && totalMiles > 0 && (
          <Loader2 className="ml-2 inline h-5 w-5 animate-spin align-middle text-white" />
        )}
      </p>
      <p className="mt-2 text-[13px] leading-snug text-white">
        {totalMiles > 0 && quote.data
          ? quote.data.bands
              .map((b) => `${Number(b.miles).toLocaleString('en-GB')} mi at ${pence(Number(b.pence))}`)
              .join(' + ')
          : 'Add the miles to see what you will get back.'}
      </p>
      <p className="mt-1 text-[12px] leading-snug text-white">{rateLine}</p>
    </div>
  );

  const mileageFields = (
    <div className="space-y-5">
      <div className="grid gap-4">
        <div>
          <label className={labelCn} htmlFor="mi-from">
            From
          </label>
          <input
            id="mi-from"
            data-help="wt-expenses.from"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setRouteNote(null);
            }}
            placeholder="Home, yard or a postcode"
            autoComplete="off"
            className={inputCn}
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="mi-to">
            To
          </label>
          <input
            id="mi-to"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              autoTo.current = null;
              setRouteNote(null);
            }}
            placeholder="Job address, merchant or a postcode"
            autoComplete="off"
            className={inputCn}
          />
        </div>
      </div>

      <Segmented<'one' | 'return'>
        value={isReturn ? 'return' : 'one'}
        onChange={(v) => setIsReturn(v === 'return')}
        options={[
          { value: 'one', label: 'One way' },
          { value: 'return', label: 'There and back' },
        ]}
      />

      <div>
        <label className={labelCn} htmlFor="mi-miles">
          Miles {isReturn ? 'each way' : ''}
        </label>
        <div className="flex items-end gap-3">
          <input
            id="mi-miles"
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0"
            max="1000"
            value={oneWayMiles}
            onChange={(e) => {
              setOneWayMiles(e.target.value);
              setRouteNote(null);
            }}
            placeholder="0.0"
            className={cn(inputCn, 'flex-1 tabular-nums')}
          />
          <SecondaryButton
            data-help="wt-expenses.work-out"
            onClick={workOutMiles}
            disabled={routing || from.trim().length < 3 || to.trim().length < 3}
            className="shrink-0"
          >
            {routing ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : (
              <Route className="mr-1.5 h-4 w-4 text-elec-yellow" />
            )}
            Work out miles
          </SecondaryButton>
        </div>
        <p className="mt-1.5 text-[12px] leading-snug text-white">
          {routeNote ??
            (isReturn && totalMiles > 0
              ? `${totalMiles.toLocaleString('en-GB')} miles in total.`
              : 'Business journeys only, not your normal commute to a permanent workplace.')}
        </p>
      </div>
    </div>
  );

  const receiptFields = (
    <div className="space-y-5">
      <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
        <label
          htmlFor="claim-amount"
          className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow"
        >
          Amount
        </label>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-[34px] font-semibold leading-none text-white">£</span>
          <input
            id="claim-amount"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[34px] font-semibold leading-none tabular-nums text-white caret-elec-yellow placeholder:text-white/25 focus:outline-none focus:ring-0 touch-manipulation [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <p className="mt-2 text-[12px] text-white">Including VAT, as on the receipt.</p>
      </div>
      <div>
        <p className={labelCn}>What kind of spend?</p>
        <MobileSelectPicker
          value={category}
          onValueChange={setCategory}
          title="What kind of spend?"
          placeholder="Choose one…"
          triggerClassName={selectTriggerCn}
          options={WORKER_EXPENSE_CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
        />
      </div>
    </div>
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={editing ? 'Edit claim' : 'New claim'}
      title={
        editing
          ? kind === 'mileage'
            ? 'Change your mileage claim'
            : 'Change your claim'
          : kind === 'mileage'
            ? 'Claim mileage'
            : 'Claim a receipt'
      }
      description={
        editing
          ? 'You can change a claim until the office approves it.'
          : 'Goes to the office to approve. You will get a notification when they do.'
      }
      footer={
        <PrimaryButton
          data-help="wt-expenses.send"
          fullWidth
          size="lg"
          disabled={!canSave || busy}
          onClick={save}
        >
          {busy ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
          {busy ? 'Saving…' : saveLabel}
        </PrimaryButton>
      }
    >
      {!editing && (
        <Segmented<ClaimKind>
          value={kind}
          onChange={(v) => {
            setKind(v);
            setReceiptFile(null);
          }}
          options={[
            { value: 'mileage', label: 'Mileage' },
            { value: 'receipt', label: 'Receipt' },
          ]}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-5">
          {kind === 'mileage' ? mileageHero : receiptFields}
          {kind === 'mileage' ? mileageFields : null}
        </div>
        <div className="space-y-5">
          {dateField}
          {jobField}
          {kind === 'mileage' && jobId && !jobs.find((j) => j.id === jobId)?.address && (
            <p className="flex items-center gap-1.5 text-[12px] text-white">
              <MapPin className="h-3.5 w-3.5 text-elec-yellow" />
              This job has no address on it — type where you went.
            </p>
          )}
          {noteField}
          {receiptField}
        </div>
      </div>
    </FormSheet>
  );
}
