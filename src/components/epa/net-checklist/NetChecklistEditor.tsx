/**
 * NetChecklistEditor — NET's AM2S v1 Candidate Checklist, filled in the app
 * and signed by the apprentice, the employer and the college (ELE-2050).
 *
 * One component for the learner (/apprentice/net-checklist) and their tutor
 * (/college/net-checklist/:studentId). NET says the checklist is completed by
 * the apprentice with input from the employer and training provider, ideally
 * in a three-way discussion, so the learner and their college staff can both
 * set the ratings; every change is saved at once and both see the same form.
 *
 * Every word of the checklist is NET's (src/data/net/am2sV1Checklist.ts).
 * The declarations are NET's too (served by the database, bound to the
 * answers on signing). A signature made on earlier answers is shown as such,
 * and the export leaves it off NET's form.
 *
 * The export fills NET's own PDF (src/lib/net/netChecklistPdf.ts).
 */
import { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { SignatureCapture } from '@/components/ui/signature-capture';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, COLLEGE_CARD } from '@/components/college/ui/CollegeUi';
import { LC_CARD, lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import {
  ALL_ITEMS,
  NET_ACTION_PLAN,
  NET_AM2S_FORM,
  NET_CERT_DELIVERY,
  NET_IMPORTANT,
  NET_MANDATORY_EVIDENCE,
  NET_SIX_MONTHS,
  NET_TICK_INSTRUCTION,
  NET_USING_THIS_CHECKLIST,
  RATINGS,
  SECTIONS,
  type Rating,
} from '@/data/net/am2sV1Checklist';
import {
  requestNetEmployerSignature,
  saveNetChecklist,
  signNetChecklist,
  useNetChecklist,
  type NetChecklistState,
  type NetSignature,
  type SignKind,
} from '@/hooks/epa/useElectricalEpa';
import { useGatewayReadiness } from '@/hooks/epa/useGatewayReadiness';

const fmt = (iso: string | null | undefined) =>
  iso
    ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

const SIGN_LABEL: Record<SignKind, string> = {
  candidate: 'Apprentice declaration',
  employer: 'Employer: behaviours statement and declaration',
  provider: 'Training provider declaration',
};

/*
 * A rating is a choice of four, so it is one joined toggle (College Hub
 * design language, 10 Oct), not four boxes. The chosen option is white; a
 * chosen Limited or Unsure is orange, so a gap reads at a glance down the page.
 */
const TOGGLE_GROUP = 'flex w-full rounded-xl border border-white/[0.12] p-0.5';

function ratingChip(on: boolean, warn: boolean) {
  return cn(
    'inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-[10px] px-1 text-[12.5px] font-semibold transition-colors touch-manipulation sm:text-[13px]',
    on
      ? warn
        ? 'bg-orange-400 text-black'
        : 'bg-white text-black'
      : 'text-white hover:bg-white/[0.06] active:bg-white/[0.08]'
  );
}

function RatingGroup({
  label,
  value,
  onPick,
  disabled,
  testId,
}: {
  label: string;
  value: Rating | undefined;
  onPick: (r: Rating) => void;
  disabled?: boolean;
  testId: string;
}) {
  return (
    <div className="min-w-0" role="radiogroup" aria-label={label} data-testid={testId}>
      <p className="mb-1.5 text-[13px] font-semibold text-white">{label}</p>
      <div className={TOGGLE_GROUP}>
        {RATINGS.map((r) => (
          <button
            key={r.value}
            type="button"
            role="radio"
            aria-checked={value === r.value}
            disabled={disabled}
            onClick={() => onPick(r.value)}
            className={ratingChip(value === r.value, r.value === 'limited' || r.value === 'unsure')}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SignaturePanel({
  kind,
  state,
  learnerId,
  onDone,
  frame,
}: {
  kind: SignKind;
  state: NetChecklistState;
  learnerId: string;
  onDone: () => void;
  frame: string;
}) {
  const { toast } = useToast();
  const sig: NetSignature | undefined = state.signatures[kind];
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [link, setLink] = useState<string | null>(null);

  const signed = !!sig?.signed_at;
  const canSignHere =
    (kind === 'candidate' && state.viewer === 'learner') ||
    (kind === 'provider' && state.can_sign_provider);
  const showForm = canSignHere && (!signed || sig?.stale);

  const sign = async () => {
    if (!image) return;
    setBusy(true);
    try {
      await signNetChecklist(learnerId, kind as 'candidate' | 'provider', name, image);
      toast({ title: 'Signed', description: `${SIGN_LABEL[kind]} signed on NET's form.` });
      setName('');
      setImage(null);
      onDone();
    } catch (e) {
      toast({ title: 'Not signed', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  const askEmployer = async () => {
    setBusy(true);
    try {
      const r = await requestNetEmployerSignature(learnerId);
      const url = `${window.location.origin}/net-checklist-sign/${r.token}`;
      setLink(url);
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: 'Link copied',
          description: 'Send it to the employer. It works for 30 days with no account.',
        });
      } catch {
        /* clipboard blocked: the link is shown */
      }
      onDone();
    } catch (e) {
      toast({ title: 'No link made', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  const pendingUrl =
    link ?? (sig?.token ? `${window.location.origin}/net-checklist-sign/${sig.token}` : null);

  return (
    <section className={frame} data-testid={`net-sign-${kind}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-[15px] font-semibold text-white">{SIGN_LABEL[kind]}</h3>
        {signed ? (
          <span className={lcChip(sig?.stale ? 'action' : 'done')}>
            {sig?.stale ? 'Sign again' : 'Signed'}
          </span>
        ) : sig?.pending_link ? (
          <span className={lcChip('action')}>Link sent</span>
        ) : (
          <span className={lcChip('neutral')}>Not signed</span>
        )}
      </div>
      <p className="mt-3 whitespace-pre-line text-[13.5px] leading-relaxed text-white">
        {state.statements[kind]}
      </p>
      <p className="mt-2 text-[12px] text-white">Wording: NET, form {NET_AM2S_FORM.version}.</p>

      {signed && (
        <div className="mt-4 flex items-center gap-3 border-t border-white/[0.08] pt-3">
          {sig?.signature_image && (
            <img
              src={sig.signature_image}
              alt=""
              className="h-12 w-28 shrink-0 rounded-md bg-white object-contain p-1"
            />
          )}
          <p className="text-[13px] text-white">
            {sig?.signer_name}
            {sig?.signer_company ? `, ${sig.signer_company}` : ''} · {fmt(sig?.signed_at)}
            {sig?.stale && (
              <span className="mt-0.5 block text-orange-300">
                The answers changed after this was signed, so it is left off NET&apos;s form until
                it is signed again.
              </span>
            )}
          </p>
        </div>
      )}

      {showForm && (
        <div className="mt-4 space-y-4 border-t border-white/[0.08] pt-4">
          {!state.ready_to_sign ? (
            <p className="text-[13px] text-white">
              {state.checklist?.registered_version
                ? `Signing opens when every item is rated at least Adequate for Knowledge and Experience (${state.gaps.unrated.length} to rate, ${state.gaps.below.length} below Adequate).`
                : 'Tick the registered version (1.1 or 1.2) and rate every item first.'}
            </p>
          ) : (
            <>
              <div>
                <label className={labelCn} htmlFor={`net-name-${kind}`}>
                  Print name
                </label>
                <input
                  id={`net-name-${kind}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCn}
                  autoComplete="name"
                />
              </div>
              <div>
                <p className={labelCn}>Signature</p>
                <div className="overflow-hidden rounded-xl bg-white">
                  <SignatureCapture
                    variant="light"
                    showActions={false}
                    onCapture={setImage}
                    height={140}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={sign}
                disabled={busy || name.trim().length < 2 || !image}
                className={cn(COLLEGE_BTN_PRIMARY, 'w-full sm:w-auto')}
              >
                {busy
                  ? 'Signing…'
                  : kind === 'candidate'
                    ? 'Sign as the apprentice'
                    : 'Sign for the training provider'}
              </button>
            </>
          )}
        </div>
      )}

      {kind === 'employer' && state.viewer === 'staff' && (!signed || sig?.stale) && (
        <div className="mt-4 space-y-3 border-t border-white/[0.08] pt-4">
          <p className="text-[13px] text-white">
            NET: no third party may sign instead of the employer. The employer signs on their own
            phone or computer through a link, with no account.
            {state.context.employer_name
              ? ` Employer on record: ${state.context.employer_name}.`
              : ''}
          </p>
          {pendingUrl && (
            <p
              className="break-all rounded-lg border border-white/[0.14] px-3 py-2 font-mono text-[12px] text-white"
              data-testid="net-employer-link"
            >
              {pendingUrl}
            </p>
          )}
          <button type="button" onClick={askEmployer} disabled={busy} className={COLLEGE_BTN}>
            {busy
              ? 'Making the link…'
              : pendingUrl
                ? 'Make a new link'
                : 'Get the employer’s signing link'}
          </button>
        </div>
      )}
    </section>
  );
}

export function NetChecklistEditor({
  learnerId,
  audience,
}: {
  learnerId: string;
  audience: 'learner' | 'staff';
}) {
  const { toast } = useToast();
  const { data, loading, error, reload, setData } = useNetChecklist(learnerId);
  const gateway = useGatewayReadiness(learnerId);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [exporting, setExporting] = useState<'pack' | 'form' | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const frame = audience === 'learner' ? LC_CARD : COLLEGE_CARD;

  const ratings = useMemo(() => data?.checklist?.ratings ?? {}, [data]);
  const rated = ALL_ITEMS.filter((i) => ratings[i.key]?.k && ratings[i.key]?.e).length;
  const signedCount = data
    ? (['candidate', 'employer', 'provider'] as SignKind[]).filter(
        (k) => data.signatures[k]?.signed_at && !data.signatures[k]?.stale
      ).length
    : 0;

  const save = async (patch: Record<string, unknown>, key: string) => {
    setSavingKey(key);
    try {
      await saveNetChecklist(learnerId, patch);
      await reload();
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSavingKey(null);
    }
  };

  const pick = (key: string, which: 'k' | 'e', r: Rating) => {
    // Optimistic: show the tick now, save, then reload the signatures' state.
    if (data) {
      const next = { ...ratings, [key]: { ...ratings[key], [which]: r } };
      setData({
        ...data,
        checklist: data.checklist ? { ...data.checklist, ratings: next } : data.checklist,
      });
    }
    void save({ ratings: { [key]: { [which]: r } } }, key);
  };

  const exportPdf = async (kind: 'pack' | 'form') => {
    if (!data?.checklist) return;
    setExporting(kind);
    try {
      const input = {
        learnerName: data.context.learner_name ?? 'Apprentice',
        collegeName: data.context.college_name,
        employerName: data.context.employer_name,
        checklist: data.checklist,
        signatures: data.signatures,
        applyBy: data.apply_by,
        gateway: (gateway.data?.items ?? []).map((i) => ({
          label: i.label,
          state: i.state,
          sentence: i.sentence,
        })),
        qualification: gateway.data?.standard_code
          ? `${gateway.data.standard_title ?? ''} (${gateway.data.standard_code}) · ${gateway.data.assessment ?? ''}`
          : null,
      };
      const safeName = (data.context.learner_name ?? 'apprentice').replace(/[^A-Za-z0-9]+/g, '-');
      // pdf-lib loads only when a PDF is asked for.
      const { buildBookingPack, downloadPdf, fillNetChecklist } =
        await import('@/lib/net/netChecklistPdf');
      const bytes = kind === 'pack' ? await buildBookingPack(input) : await fillNetChecklist(input);
      downloadPdf(
        bytes,
        kind === 'pack'
          ? `NET-booking-pack-${safeName}.pdf`
          : `NET-AM2S-v1-checklist-${safeName}.pdf`
      );
    } catch (e) {
      toast({
        title: 'Could not make the PDF',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setExporting(null);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <p className="py-10 text-center text-[14px] text-white">
        Could not load the checklist. {error}
      </p>
    );
  }

  if (!data.context.applicable) {
    return (
      <div className={frame} data-testid="net-checklist-not-applicable">
        <p className="text-[15px] font-semibold text-white">
          NET&apos;s AM2S v1 checklist is not the right form here
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-white">
          {data.context.not_applicable_reason}
        </p>
        <p className="mt-2 text-[13px] text-white">
          Use NET&apos;s own form for that assessment from{' '}
          <a
            href={NET_AM2S_FORM.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-elec-yellow underline underline-offset-2"
          >
            NET&apos;s booking and admin help
          </a>
          , and upload the signed copy to the evidence pack.
        </p>
      </div>
    );
  }

  const c = data.checklist;
  const belowSet = new Set(data.gaps.below);
  const staff = audience === 'staff';

  return (
    <div className="space-y-5 sm:space-y-6" data-testid="net-checklist">
      {/* Summary + export */}
      <section className={frame} data-testid="net-checklist-summary">
        <p className="text-[13px] font-semibold text-elec-yellow">
          NET {NET_AM2S_FORM.name} · form {NET_AM2S_FORM.version}
        </p>
        <h2
          className="mt-1 text-[17px] font-semibold leading-snug text-white"
          data-testid="net-checklist-headline"
        >
          {`${rated} of ${ALL_ITEMS.length} items rated, ${data.gaps.below.length} below Adequate, ${signedCount} of 3 signatures.`}
        </h2>
        <p className="mt-1 text-[13px] leading-snug text-white">
          {data.all_signed
            ? `Signed by all three.${data.apply_by ? ` NET accepts the signatures until ${fmt(data.apply_by)}.` : ''} Download the booking pack and send it to your chosen assessment centre.`
            : 'Filled in here, exported on NET’s own PDF. The apprentice, employer and college each sign their declaration.'}
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => exportPdf('pack')}
            disabled={!c || !!exporting}
            className={data.all_signed ? COLLEGE_BTN_PRIMARY : COLLEGE_BTN}
          >
            {exporting === 'pack' ? 'Making the pack…' : 'Download the NET booking pack'}
          </button>
          <button
            type="button"
            onClick={() => exportPdf('form')}
            disabled={!c || !!exporting}
            className={COLLEGE_BTN}
          >
            {exporting === 'form' ? 'Filling NET’s form…' : 'NET checklist only (PDF)'}
          </button>
        </div>
        <details className="mt-4 border-t border-white/[0.08] pt-3">
          <summary className="flex min-h-11 cursor-pointer items-center text-[13px] font-semibold text-white touch-manipulation">
            What NET needs before booking
          </summary>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-white">
            {NET_MANDATORY_EVIDENCE.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="mt-2 text-[12px] text-white">
            Source:{' '}
            <a
              href={NET_AM2S_FORM.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-elec-yellow underline underline-offset-2"
            >
              NET, AM2S v1
            </a>
            . Form:{' '}
            <a
              href={NET_AM2S_FORM.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-elec-yellow underline underline-offset-2"
            >
              NET&apos;s PDF ({NET_AM2S_FORM.published})
            </a>
            .
          </p>
        </details>
      </section>

      {/* Page 1 of NET's form */}
      <section className={frame}>
        <h3 className="text-[15px] font-semibold text-white">Candidate</h3>
        <p className="mt-1 text-[13px] text-white">
          {data.context.learner_name}
          {data.context.college_name ? ` · ${data.context.college_name}` : ''}
        </p>
        <div className="mt-4">
          <p className={labelCn}>Registered version with Apprenticeship Service (please tick)</p>
          <div
            className={cn(TOGGLE_GROUP, 'sm:max-w-xs')}
            role="radiogroup"
            aria-label="Registered version"
          >
            {(['1.1', '1.2'] as const).map((v) => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={c?.registered_version === v}
                onClick={() => save({ registered_version: v }, 'version')}
                className={cn(ratingChip(c?.registered_version === v, false), 'text-[13.5px]')}
              >
                Version {v}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCn} htmlFor="net-ni">
              NI Number*
            </label>
            <input
              id="net-ni"
              defaultValue={c?.ni_number ?? data.context.ni_number ?? ''}
              onBlur={(e) =>
                e.target.value !== (c?.ni_number ?? '') && save({ ni_number: e.target.value }, 'ni')
              }
              className={inputCn}
              autoComplete="off"
            />
            <p className="mt-1 text-[12px] text-white">
              *or PPS/Social Security number for candidates from Channel Islands/ROI
            </p>
          </div>
          <div>
            <label className={labelCn} htmlFor="net-uln">
              Candidate ULN (Unique Learner Number)
            </label>
            <input
              id="net-uln"
              inputMode="numeric"
              defaultValue={c?.uln ?? data.context.uln ?? ''}
              onBlur={(e) =>
                e.target.value !== (c?.uln ?? '') && save({ uln: e.target.value }, 'uln')
              }
              className={inputCn}
            />
          </div>
        </div>
        <p className="mt-4 border-t border-white/[0.08] pt-3 text-[13px] leading-relaxed text-white">
          {NET_USING_THIS_CHECKLIST}
        </p>
      </section>

      {/* Sections A1 to E */}
      {SECTIONS.map((s) => {
        const done = s.items.filter((i) => ratings[i.key]?.k && ratings[i.key]?.e).length;
        return (
          <section
            key={s.key}
            className={cn(frame, 'p-0 sm:p-0')}
            data-testid={`net-section-${s.key}`}
          >
            <div className="px-4 pb-3 pt-4 sm:px-6 sm:pt-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[15px] font-semibold leading-snug text-white">{s.title}</h3>
                <span className={lcChip(done === s.items.length ? 'done' : 'neutral')}>
                  {done}/{s.items.length}
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-snug text-white">{s.intro}</p>
              <p className="mt-1 text-[12px] text-white">{NET_TICK_INSTRUCTION}</p>
            </div>
            <ol className="divide-y divide-white/[0.07] border-t border-white/[0.08]">
              {s.items.map((it) => {
                const r = ratings[it.key] ?? {};
                return (
                  <li key={it.key} className="px-4 py-3 sm:px-6" data-item={it.key}>
                    {it.before && (
                      <p className="mb-2 text-[13px] font-semibold text-white">{it.before}</p>
                    )}
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)_minmax(0,300px)] lg:items-center lg:gap-5">
                      <p className="text-[13.5px] leading-snug text-white">
                        <span className="mr-1.5 font-bold tabular-nums">
                          {it.key.split('.')[1]}
                        </span>
                        {it.text}
                        {belowSet.has(it.key) && (
                          <span className={cn(lcChip('action'), 'ml-2 align-middle')}>
                            Below Adequate
                          </span>
                        )}
                        {savingKey === it.key && (
                          <Loader2 className="ml-2 inline h-3.5 w-3.5 animate-spin text-white" />
                        )}
                      </p>
                      <RatingGroup
                        label="Knowledge"
                        value={r.k}
                        onPick={(v) => pick(it.key, 'k', v)}
                        testId={`rate-${it.key}-k`}
                      />
                      <RatingGroup
                        label="Experience"
                        value={r.e}
                        onPick={(v) => pick(it.key, 'e', v)}
                        testId={`rate-${it.key}-e`}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}

      {/* Action plan */}
      <section className={frame}>
        <h3 className="text-[15px] font-semibold text-white">Action plan</h3>
        <p className="mt-1 text-[13px] leading-snug text-white">{NET_ACTION_PLAN}</p>
        <textarea
          aria-label="Action plan"
          defaultValue={c?.action_plan ?? ''}
          onChange={(e) => setPlan(e.target.value)}
          onBlur={() =>
            plan !== null && plan !== (c?.action_plan ?? '') && save({ action_plan: plan }, 'plan')
          }
          className={cn(textareaCn, 'mt-3')}
          rows={3}
          placeholder={
            data.gaps.below.length
              ? `What will happen for the ${data.gaps.below.length} item(s) below Adequate, and by when`
              : 'Only needed if an area is below Adequate'
          }
        />
      </section>

      {/* Declarations */}
      <section className={frame}>
        <h3 className="text-[15px] font-semibold text-white">Important</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-white">{NET_IMPORTANT}</p>
        <p className="mt-2 text-[13px] font-semibold text-white">
          {NET_SIX_MONTHS}
          {data.apply_by
            ? ` From the first current signature: apply by ${fmt(data.apply_by)}.`
            : ''}
        </p>
      </section>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
        {(['candidate', 'employer', 'provider'] as SignKind[]).map((k) => (
          <SignaturePanel
            key={k}
            kind={k}
            state={data}
            learnerId={learnerId}
            onDone={reload}
            frame={frame}
          />
        ))}
      </div>

      {/* Completion certificate (training provider use) */}
      {staff && (
        <section className={frame} data-testid="net-cert">
          <h3 className="text-[15px] font-semibold text-white">
            Delivery of Apprenticeship Completion Certificate
          </h3>
          <p className="mt-1 text-[12px] text-white">
            Applicable to England only. For training provider use.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-white">{NET_CERT_DELIVERY}</p>
          <p className={cn(labelCn, 'mt-4')}>
            Please confirm which party the Apprenticeship Completion certificate should be sent to:
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ['employer', 'The apprentice’s employer'],
                ['apprentice', 'Directly to the apprentice'],
              ] as const
            ).map(([v, l]) => (
              <button
                key={v}
                type="button"
                aria-pressed={c?.cert_delivery === v}
                onClick={() => save({ cert_delivery: v }, 'cert')}
                className={cn(
                  ratingChip(c?.cert_delivery === v, false),
                  'flex-none px-4 text-[13px]'
                )}
              >
                {l}
              </button>
            ))}
          </div>
          {c?.cert_delivery === 'employer' && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(
                [
                  ['cert_recipient_name', 'Name of Recipient'],
                  ['cert_organisation', 'Organisation'],
                  ['cert_address', 'Address'],
                  ['cert_postcode', 'Postcode'],
                ] as const
              ).map(([f, l]) => (
                <div key={f}>
                  <label className={labelCn} htmlFor={`net-${f}`}>
                    {l}
                  </label>
                  <input
                    id={`net-${f}`}
                    defaultValue={
                      (c?.[f] as string | null) ??
                      (f === 'cert_organisation' ? (data.context.employer_name ?? '') : '')
                    }
                    onBlur={(e) =>
                      e.target.value !== ((c?.[f] as string | null) ?? '') &&
                      save({ [f]: e.target.value }, f)
                    }
                    className={inputCn}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default NetChecklistEditor;
