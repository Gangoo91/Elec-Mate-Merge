/**
 * CIS done properly (ELE-2064), the panels on People → Subcontractors:
 *
 *   CisReturnPanel   the month's CIS300: statements by the 19th, the return (or
 *                    nil return) by the 19th, HMRC paid by the 22nd, the figures
 *                    per subbie, and a CSV in CIS300 order
 *   HmrcChecksPanel  who needs verifying or re-verifying
 *   CisChecksSheet   one subbie's HMRC verification and due-diligence log
 *   CisReturnSheet   mark the month filed (or nil) and paid
 *
 * Owner and admins only; the section renders none of this for office managers.
 */
import { useEffect, useMemo, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FormSheet from '@/components/forms/FormSheet';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/employer/editorial';
import {
  PlainEmpty,
  Row,
  Tag,
  panel,
  PanelTitle,
  rowBtnSecondary,
  rowsClass,
} from '@/components/employer/pageParts/PageParts';
import {
  CIS_STATUS_OPTIONS,
  cisLabel,
  downloadText,
  fmtDay,
  gbp,
  type CisStatus,
} from '@/hooks/useSubcontractors';
import {
  CHECK_KINDS,
  checkLabel,
  cis300Csv,
  cisErrorMessage,
  returnMonth,
  useCisChecks,
  useRecordCisCheck,
  useSaveCisReturn,
  verifyCopy,
  type CheckKind,
  type CisMonth,
  type CisOverview,
  type CisSubbie,
} from '@/hooks/useCis';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const short = (d: string) =>
  new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
const monthLabel = (m: CisMonth) => `${short(m.month_start)} to ${short(m.month_end)}`;

/* ── The return ───────────────────────────────────────────────────────── */

export function CisReturnPanel({
  data,
  loading,
  refs,
  onMark,
}: {
  data: CisOverview | undefined;
  loading: boolean;
  refs: { employerRef: string | null; accountsOfficeRef: string | null };
  onMark: (m: CisMonth) => void;
}) {
  const m = returnMonth(data);
  if (loading || !m || !data) {
    return (
      <section data-help="subcontractors.cis">
        <PanelTitle title="CIS return" />
        <div className={panel}>
          <PlainEmpty
            bare
            text={loading ? 'Working out the return…' : 'The CIS return did not load.'}
          />
        </div>
      </section>
    );
  }
  const today = data.today;
  const filed = m.filing?.filed_on;
  const paid = m.filing?.paid_on;
  const deducted = Number(m.totals.deducted);
  const unbilled = m.unbilled.length;

  const statementsTag =
    unbilled > 0 ? (
      <Tag tone={today > m.statements_by ? 'red' : 'yellow'}>{unbilled} to issue</Tag>
    ) : (
      <Tag tone="done">{m.rows.length > 0 ? 'Issued' : 'None due'}</Tag>
    );
  const returnTag = filed ? (
    <Tag tone="done">Filed {short(filed)}</Tag>
  ) : today > m.return_by ? (
    <Tag tone="red">Late</Tag>
  ) : (
    <Tag tone="yellow">Due {short(m.return_by)}</Tag>
  );
  const payTag =
    deducted <= 0 ? (
      <Tag tone="done">Nothing to pay</Tag>
    ) : paid ? (
      <Tag tone="done">Paid {short(paid)}</Tag>
    ) : today > m.pay_by ? (
      <Tag tone="red">Late</Tag>
    ) : (
      <Tag tone="yellow">By {short(m.pay_by)}</Tag>
    );

  const exportCsv = () => {
    downloadText(`cis300-${m.month_start}-to-${m.month_end}.csv`, cis300Csv(m, refs));
  };

  return (
    <section data-help="subcontractors.cis" id="cis-return">
      <PanelTitle title="CIS return" meta={`Tax month ${monthLabel(m)}`} />
      <div className={cn(panel, 'overflow-hidden')}>
        <div className={rowsClass}>
          <Row
            title="Statements to subcontractors"
            detail={
              unbilled > 0
                ? `${m.unbilled.map((u) => u.name).join(', ')} still to get one, by ${short(m.statements_by)}`
                : `Within 14 days of the month end, by ${short(m.statements_by)}`
            }
            trailing={statementsTag}
          />
          <Row
            title={m.nil ? 'Nil return' : 'CIS300 return'}
            detail={
              m.nil
                ? `Nobody paid this month. File a nil return or tell HMRC you are inactive, by ${short(m.return_by)}.`
                : `${m.totals.subcontractors} subcontractor${m.totals.subcontractors === 1 ? '' : 's'}, ${gbp(m.totals.payments)} paid, by ${short(m.return_by)}`
            }
            trailing={returnTag}
            onClick={() => onMark(m)}
          />
          <Row
            title="Pay HMRC"
            detail={
              deducted > 0
                ? `${gbp(deducted)} deducted, by ${short(m.pay_by)} (the 19th by post)`
                : 'No deductions this month'
            }
            trailing={payTag}
            onClick={deducted > 0 ? () => onMark(m) : undefined}
          />
        </div>

        {m.rows.length > 0 && (
          <div className="border-t border-white/[0.07]">
            <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-4 px-4 pt-3 pb-1 text-[12px] font-semibold text-white sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:px-5">
              <span>Subcontractor</span>
              <span className="text-right">Paid</span>
              <span className="hidden text-right sm:block">Materials</span>
              <span className="text-right">Deducted</span>
            </div>
            <ul>
              {m.rows.map((r) => (
                <li
                  key={r.roster_id}
                  className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-4 px-4 py-2 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:px-5"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-medium text-white">
                      {r.name}
                    </span>
                    <span className="block truncate text-[12px] text-white">
                      {cisLabel(r.cis_status)}
                      {r.utr ? ` · UTR ${r.utr}` : ' · no UTR'}
                    </span>
                  </span>
                  <span className="text-right text-[13px] text-white tabular-nums">
                    {gbp(r.payments)}
                  </span>
                  <span className="hidden text-right text-[13px] text-white tabular-nums sm:block">
                    {gbp(r.materials)}
                  </span>
                  <span className="text-right text-[13px] font-semibold text-white tabular-nums">
                    {gbp(r.deducted)}
                  </span>
                </li>
              ))}
              <li className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-4 border-t border-white/[0.07] px-4 py-2.5 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:px-5">
                <span className="text-[13px] font-semibold text-white">Total</span>
                <span className="text-right text-[13px] font-semibold text-white tabular-nums">
                  {gbp(m.totals.payments)}
                </span>
                <span className="hidden text-right text-[13px] font-semibold text-white tabular-nums sm:block">
                  {gbp(m.totals.materials)}
                </span>
                <span className="text-right text-[13px] font-semibold text-white tabular-nums">
                  {gbp(m.totals.deducted)}
                </span>
              </li>
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2 border-t border-white/[0.07] px-4 py-3 sm:px-5">
          <button type="button" onClick={exportCsv} className={rowBtnSecondary}>
            <Download className="h-4 w-4" />
            CIS300 figures (CSV)
          </button>
          <button type="button" onClick={() => onMark(m)} className={rowBtnSecondary}>
            {filed ? 'Update filing' : 'Mark as filed'}
          </button>
        </div>
      </div>
      <p className="mt-2 text-[12.5px] leading-relaxed text-white">
        File on HMRC's CIS online service or in your CIS software. Late returns cost £100, rising
        after 2, 6 and 12 months. The CSV lists each subbie in the order the return asks for them.
      </p>
    </section>
  );
}

/* ── Who needs verifying ──────────────────────────────────────────────── */

export function HmrcChecksPanel({
  data,
  onOpen,
}: {
  data: CisOverview | undefined;
  onOpen: (s: CisSubbie) => void;
}) {
  const subs = data?.subcontractors ?? [];
  const attention = subs.filter((s) => s.state !== 'ok' || s.concerns > 0);
  if (subs.length === 0) return null;
  return (
    <section data-help="subcontractors.verify">
      <PanelTitle title="HMRC checks" meta={attention.length > 0 ? attention.length : undefined} />
      <div className={cn(panel, 'overflow-hidden')}>
        <div className={rowsClass}>
          {(attention.length > 0 ? attention : subs).map((s) => {
            const v = verifyCopy(s);
            return (
              <Row
                key={s.roster_id}
                title={s.name}
                detail={
                  s.concerns > 0 && s.state === 'ok'
                    ? `${s.concerns} check${s.concerns === 1 ? '' : 's'} with a concern logged`
                    : v.line
                }
                trailing={
                  <Tag tone={s.concerns > 0 && s.state === 'ok' ? 'yellow' : v.tone}>
                    {s.concerns > 0 && s.state === 'ok' ? 'Concern' : v.pill}
                  </Tag>
                }
                onClick={() => onOpen(s)}
              />
            );
          })}
        </div>
        {attention.length === 0 && (
          <p className="border-t border-white/[0.07] px-4 py-3 text-[12.5px] text-white sm:px-5">
            Everyone is verified and on a return in the last 2 tax years.
          </p>
        )}
      </div>
    </section>
  );
}

/* ── One subbie's checks ──────────────────────────────────────────────── */

export function CisChecksSheet({
  subbie,
  onClose,
}: {
  subbie: CisSubbie | null;
  onClose: () => void;
}) {
  const { data: checks = [], isLoading } = useCisChecks(subbie?.roster_id);
  const record = useRecordCisCheck();
  const [kind, setKind] = useState<CheckKind>('verification');
  const [on, setOn] = useState(todayIso());
  const [outcome, setOutcome] = useState<'ok' | 'concern' | 'failed'>('ok');
  const [status, setStatus] = useState<CisStatus>('standard');
  const [reference, setReference] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!subbie) return;
    setKind(subbie.state === 'ok' ? 'gps_review' : 'verification');
    setOn(todayIso());
    setOutcome('ok');
    setStatus(subbie.cis_status === 'unverified' ? 'standard' : subbie.cis_status);
    setReference('');
    setNote('');
  }, [subbie]);

  const v = subbie ? verifyCopy(subbie) : null;
  const hint = CHECK_KINDS.find((k) => k.value === kind)?.hint;

  const save = async () => {
    if (!subbie) return;
    try {
      await record.mutateAsync({
        rosterId: subbie.roster_id,
        kind,
        checkedOn: on,
        outcome,
        reference: reference.trim() || null,
        cisStatus: kind === 'verification' ? status : null,
        note: note.trim() || null,
      });
      toast({
        title: kind === 'verification' ? 'Verification saved' : 'Check saved',
        description:
          kind === 'verification' ? `${subbie.name} is now ${cisLabel(status)}.` : undefined,
      });
      setReference('');
      setNote('');
    } catch (e) {
      toast({ title: 'Not saved', description: cisErrorMessage(e), variant: 'destructive' });
    }
  };

  return (
    <FormSheet
      open={!!subbie}
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      eyebrow="HMRC checks"
      title={subbie?.name ?? ''}
      description={v?.line}
      footer={
        <div className="flex gap-2">
          <SecondaryButton fullWidth onClick={onClose}>
            Close
          </SecondaryButton>
          <PrimaryButton fullWidth onClick={save} disabled={record.isPending}>
            {record.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save check'}
          </PrimaryButton>
        </div>
      }
      bodyClassName="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 items-start"
    >
      {subbie && (
        <>
          <div className="min-w-0 space-y-4">
            <FormCard eyebrow="Record a check">
              <div className="grid grid-cols-2 gap-2">
                {CHECK_KINDS.map((k) => (
                  <button
                    key={k.value}
                    type="button"
                    aria-pressed={kind === k.value}
                    onClick={() => setKind(k.value)}
                    className={cn(
                      'min-h-11 rounded-2xl border px-3 py-2 text-[12.5px] touch-manipulation',
                      kind === k.value ? chipOn : chipOff
                    )}
                  >
                    {k.label}
                  </button>
                ))}
              </div>
              {hint && <p className="text-[12px] text-white">{hint}</p>}

              {kind === 'verification' && (
                <div className="grid grid-cols-2 gap-2">
                  {CIS_STATUS_OPTIONS.filter((o) => o.value !== 'unverified').map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      aria-pressed={status === o.value}
                      onClick={() => setStatus(o.value)}
                      className={cn(
                        'min-h-11 rounded-2xl border px-3 py-2 text-[12.5px] touch-manipulation',
                        status === o.value ? chipOn : chipOff
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}

              <FormGrid cols={2}>
                <Field label="Checked on">
                  <Input
                    type="date"
                    value={on}
                    max={todayIso()}
                    onChange={(e) => setOn(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field
                  label={kind === 'verification' ? 'HMRC verification number' : 'Reference'}
                  hint={
                    kind === 'verification' ? 'HMRC gives one for every verification.' : undefined
                  }
                >
                  <Input
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder={kind === 'verification' ? 'V1234567890' : 'Optional'}
                    className={inputClass}
                  />
                </Field>
              </FormGrid>

              {kind !== 'verification' && (
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ['ok', 'All fine'],
                      ['concern', 'A concern'],
                      ['failed', 'Failed'],
                    ] as const
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      aria-pressed={outcome === val}
                      onClick={() => setOutcome(val)}
                      className={cn(
                        'h-11 rounded-full border text-[13px] touch-manipulation',
                        outcome === val ? chipOn : chipOff
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              <Field label="Note">
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="What you looked at and what you found"
                  className="min-h-[88px] text-base text-white"
                />
              </Field>
            </FormCard>
            <p className="text-[12.5px] leading-relaxed text-white">
              Since 6 April 2026 HMRC can remove gross payment status at once, charge a 30% penalty
              and bar reapplying for 5 years when a business knew or should have known a payment was
              linked to fraud. A dated log of what you checked is your evidence.
            </p>
          </div>

          <div className="min-w-0 space-y-4">
            <section>
              <PanelTitle title="Log" meta={checks.length > 0 ? checks.length : undefined} />
              <div className={cn(panel, 'overflow-hidden')}>
                {isLoading ? (
                  <PlainEmpty bare text="Loading…" />
                ) : checks.length === 0 ? (
                  <PlainEmpty bare text="Nothing logged yet." />
                ) : (
                  <div className={rowsClass}>
                    {checks.map((c) => (
                      <Row
                        key={c.id}
                        title={checkLabel(c.kind)}
                        detail={[
                          fmtDay(c.checked_on),
                          c.kind === 'verification' && c.cis_status ? cisLabel(c.cis_status) : null,
                          c.reference,
                          c.note,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                        trailing={
                          c.outcome === 'ok' ? (
                            <Tag tone="done">Fine</Tag>
                          ) : c.outcome === 'concern' ? (
                            <Tag tone="yellow">Concern</Tag>
                          ) : (
                            <Tag tone="red">Failed</Tag>
                          )
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </FormSheet>
  );
}

/* ── Mark the month filed and paid ────────────────────────────────────── */

export function CisReturnSheet({
  firm,
  month,
  onClose,
}: {
  firm: string | undefined;
  month: CisMonth | null;
  onClose: () => void;
}) {
  const save = useSaveCisReturn();
  const [filedOn, setFiledOn] = useState('');
  const [reference, setReference] = useState('');
  const [paidOn, setPaidOn] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  useEffect(() => {
    if (!month) return;
    setFiledOn(month.filing?.filed_on ?? todayIso());
    setReference(month.filing?.submission_reference ?? '');
    setPaidOn(month.filing?.paid_on ?? '');
    setPaidAmount(
      month.filing?.paid_amount != null
        ? String(month.filing.paid_amount)
        : Number(month.totals.deducted) > 0
          ? Number(month.totals.deducted).toFixed(2)
          : ''
    );
  }, [month]);
  const deducted = Number(month?.totals.deducted ?? 0);
  const label = useMemo(() => (month ? monthLabel(month) : ''), [month]);

  const submit = async () => {
    if (!firm || !month) return;
    try {
      await save.mutateAsync({
        firm,
        monthEnd: month.month_end,
        filedOn: filedOn || null,
        nilReturn: month.nil,
        reference: reference.trim() || null,
        paidOn: deducted > 0 ? paidOn || null : null,
        paidAmount: deducted > 0 && paidOn ? Number(paidAmount) || null : null,
      });
      toast({ title: 'Saved', description: 'The reminders for this month stop.' });
      onClose();
    } catch (e) {
      toast({ title: 'Not saved', description: cisErrorMessage(e), variant: 'destructive' });
    }
  };

  return (
    <FormSheet
      open={!!month}
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      eyebrow="CIS return"
      title={`Tax month ${label}`}
      description={
        month?.nil
          ? 'A nil return: nobody was paid this month.'
          : `${month?.totals.subcontractors ?? 0} subcontractors, ${gbp(month?.totals.payments)} paid, ${gbp(deducted)} deducted.`
      }
      footer={
        <div className="flex gap-2">
          <SecondaryButton fullWidth onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton fullWidth onClick={submit} disabled={save.isPending}>
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
          </PrimaryButton>
        </div>
      }
      bodyClassName="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 items-start"
    >
      {month && (
        <>
          <FormCard eyebrow={month.nil ? 'Nil return filed' : 'CIS300 filed'}>
            <FormGrid cols={2}>
              <Field label="Filed on" hint={`Due by ${fmtDay(month.return_by)}.`}>
                <Input
                  type="date"
                  value={filedOn}
                  max={todayIso()}
                  onChange={(e) => setFiledOn(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="HMRC reference" hint="The submission receipt, if you have one.">
                <Input
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Optional"
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>
          {deducted > 0 ? (
            <FormCard eyebrow="Paid to HMRC">
              <FormGrid cols={2}>
                <Field
                  label="Paid on"
                  hint={`Due by ${fmtDay(month.pay_by)}, or the 19th by post.`}
                >
                  <Input
                    type="date"
                    value={paidOn}
                    max={todayIso()}
                    onChange={(e) => setPaidOn(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Amount (£)">
                  <Input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
              <p className="text-[12px] text-white">
                Paid with your PAYE, using your accounts office reference.
              </p>
            </FormCard>
          ) : (
            <FormCard eyebrow="Paid to HMRC">
              <p className="text-[13px] text-white">
                Nothing was deducted, so there is nothing to pay.
              </p>
            </FormCard>
          )}
        </>
      )}
    </FormSheet>
  );
}
