/**
 * Sheets for People → Subcontractors (ELE-1830): one subbie's period, the
 * edit form, the issue confirmation (the CIS maths line by line), a statement
 * view with print, and the firm's HMRC references.
 *
 * The CIS sums come from the database (cis_statement_amounts); nothing here
 * recalculates money, it only lays the figures out so the owner can check them.
 */
import { useEffect, useState, type ReactNode } from 'react';
import { Loader2, Pencil, Printer, FileText, Undo2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FormSheet from '@/components/forms/FormSheet';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Field,
  FormCard,
  FormGrid,
  Pill,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
} from '@/components/employer/editorial';
import {
  CIS_STATUS_OPTIONS,
  cisLabel,
  expiryState,
  fmtDay,
  fmtDays,
  fmtShortDay,
  gbp,
  rpcErrorMessage,
  useIssueStatement,
  useSaveCisSettings,
  useSaveSubcontractor,
  useVoidStatement,
  type CisStatus,
  type RateBasis,
  type SubcontractorRow,
  type SubcontractorRun,
  type SubcontractorStatement,
} from '@/hooks/useSubcontractors';
import { printStatement } from './statementPrint';

const cardCn = 'rounded-2xl border border-white/[0.1] bg-white/[0.04] p-4 sm:p-5 space-y-3';
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

function Row({ label, value, strong }: { label: ReactNode; value: ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <span className={cn('text-[13px] text-white', strong && 'font-semibold')}>{label}</span>
      <span
        className={cn(
          'text-[13px] text-white tabular-nums text-right',
          strong && 'font-semibold text-[15px]'
        )}
      >
        {value}
      </span>
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-[14px] font-semibold text-white">{children}</h3>;
}

/* ── The maths, line by line ─────────────────────────────────────────── */

export function CisBreakdown({
  rateBasis,
  rate,
  days,
  hours,
  labour,
  other,
  materials,
  cisStatus,
  cisRate,
  deduction,
  net,
}: {
  rateBasis: RateBasis;
  rate: number;
  days: number;
  hours: number;
  labour: number;
  other: number;
  materials: number;
  cisStatus: CisStatus | string;
  cisRate: number;
  deduction: number;
  net: number;
}) {
  const liable = labour + other;
  const gross = labour + other + materials;
  return (
    <div className="divide-y divide-white/[0.08]">
      <Row
        label="Labour"
        value={
          <>
            {rateBasis === 'hour'
              ? `${Number(hours).toFixed(2)} h × ${gbp(rate)}`
              : `${fmtDays(days)} × ${gbp(rate)}`}{' '}
            = <span className="font-semibold">{gbp(labour)}</span>
          </>
        }
      />
      {other > 0 && <Row label="Other costs (travel and similar)" value={gbp(other)} />}
      <Row label="Materials, not subject to CIS" value={gbp(materials)} />
      <Row label="Gross" value={gbp(gross)} />
      <Row
        label={`CIS deduction (${cisLabel(cisStatus)})`}
        value={
          <>
            {Math.round(cisRate * 100)}% of {gbp(liable)} ={' '}
            <span className="font-semibold">−{gbp(deduction)}</span>
          </>
        }
      />
      <Row label="Net to pay" value={gbp(net)} strong />
    </div>
  );
}

/* ── One subbie: days, cover, terms, amounts, statements ─────────────── */

export function SubcontractorDetailSheet({
  sub,
  run,
  onClose,
  onEdit,
  onIssue,
  onOpenStatement,
}: {
  sub: SubcontractorRow | null;
  run: SubcontractorRun | undefined;
  onClose: () => void;
  onEdit: () => void;
  onIssue: () => void;
  onOpenStatement: (s: SubcontractorStatement) => void;
}) {
  const money = run?.money_visible ?? false;
  const statements = (run?.statements ?? []).filter((s) => s.roster_id === sub?.roster_id);
  const ins = expiryState(sub?.insurance_expiry);
  const ecs = expiryState(sub?.ecs_expiry);
  const canIssue =
    money && !!sub && (sub.timesheet_ids.length > 0 || (sub.expense_ids?.length ?? 0) > 0);
  const rateSet = (sub?.terms?.rate ?? 0) > 0;

  return (
    <FormSheet
      open={!!sub}
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      eyebrow={sub?.trade || 'Subcontractor'}
      title={sub?.name ?? ''}
      description={
        run ? `Tax month ${fmtDay(run.period_start)} to ${fmtDay(run.period_end)}` : undefined
      }
      footer={
        <div className="flex gap-2">
          <SecondaryButton fullWidth onClick={onEdit} data-help="subcontractors.edit">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </SecondaryButton>
          {money && (
            <PrimaryButton
              fullWidth
              onClick={onIssue}
              disabled={!canIssue}
              data-help="subcontractors.issue"
            >
              <FileText className="h-4 w-4 mr-2" />
              Issue statement
            </PrimaryButton>
          )}
        </div>
      }
      bodyClassName="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 items-start"
    >
      {sub && (
        <>
          <div className="space-y-4 min-w-0">
            <section className={cardCn}>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>Approved days</CardTitle>
                <Pill tone={sub.day_count > 0 ? 'emerald' : 'blue'}>{fmtDays(sub.day_count)}</Pill>
              </div>
              {sub.days.length === 0 ? (
                <p className="text-[13px] text-white">
                  No approved days waiting to be billed in this tax month.
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.08]">
                  {sub.days.map((d) => (
                    <li key={d.date} className="py-2 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-white">{fmtShortDay(d.date)}</p>
                        {d.jobs && <p className="text-[12px] text-white truncate">{d.jobs}</p>}
                      </div>
                      <span className="text-[13px] text-white tabular-nums">
                        {Number(d.hours).toFixed(1)} h
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {sub.awaiting_count > 0 && (
                <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-[12.5px] text-orange-300">
                  {sub.awaiting_count} timesheet{sub.awaiting_count === 1 ? '' : 's'} still waiting
                  for approval. Approve them in Timesheets to bill them.
                </p>
              )}
              {sub.billed_days > 0 && (
                <p className="text-[12.5px] text-white">
                  {fmtDays(sub.billed_days)} in this month already on a statement.
                </p>
              )}
            </section>

            <section className={cardCn}>
              <CardTitle>Insurance and cards</CardTitle>
              <Row
                label="Public liability"
                value={<Pill tone={ins.tone}>{ins.label}</Pill>}
              />
              {(sub.insurance_provider || sub.insurance_policy_number) && (
                <Row
                  label="Insurer"
                  value={[sub.insurance_provider, sub.insurance_policy_number]
                    .filter(Boolean)
                    .join(' · ')}
                />
              )}
              {sub.insurance_cover_amount ? (
                <Row label="Cover" value={gbp(sub.insurance_cover_amount).replace('.00', '')} />
              ) : null}
              <Row label="ECS card" value={<Pill tone={ecs.tone}>{ecs.label}</Pill>} />
              <Row label="Elec-ID" value={sub.elec_id_number || 'No Elec-ID yet'} />
              {!sub.linked_account && (
                <p className="text-[12.5px] text-white">
                  Not signed in yet. Once they join from the invite they submit days in the app.
                </p>
              )}
            </section>
          </div>

          <div className="space-y-4 min-w-0">
            {money ? (
              <>
                <section className={cardCn}>
                  <CardTitle>Pay terms</CardTitle>
                  <Row
                    label="Rate"
                    value={
                      rateSet
                        ? `${gbp(sub.terms?.rate)} a ${sub.terms?.rate_basis === 'hour' ? 'hour' : 'day'}`
                        : 'Not set'
                    }
                  />
                  <Row label="CIS" value={cisLabel(sub.terms?.cis_status)} />
                  <Row label="UTR" value={sub.terms?.utr || 'Not recorded'} />
                  {sub.terms?.cis_verification_number && (
                    <Row label="HMRC verification" value={sub.terms.cis_verification_number} />
                  )}
                  <Row
                    label="VAT"
                    value={
                      sub.terms?.vat_registered
                        ? `Registered${sub.terms.vat_number ? ` · ${sub.terms.vat_number}` : ''}`
                        : 'Not registered'
                    }
                  />
                  {!rateSet && (
                    <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-[12.5px] text-orange-300">
                      Set their rate (tap Edit) before you issue a statement.
                    </p>
                  )}
                </section>

                {sub.amounts && rateSet && (
                  <section className={cardCn}>
                    <CardTitle>This statement would be</CardTitle>
                    <CisBreakdown
                      rateBasis={sub.terms?.rate_basis ?? 'day'}
                      rate={Number(sub.terms?.rate ?? 0)}
                      days={sub.day_count}
                      hours={Number(sub.hours)}
                      labour={Number(sub.amounts.labour)}
                      other={Number(sub.amounts.other_costs)}
                      materials={Number(sub.amounts.materials)}
                      cisStatus={sub.terms?.cis_status ?? 'unverified'}
                      cisRate={Number(sub.amounts.cis_rate)}
                      deduction={Number(sub.amounts.cis_deduction)}
                      net={Number(sub.amounts.net_payable)}
                    />
                  </section>
                )}

                {(sub.expenses?.length ?? 0) > 0 && (
                  <section className={cardCn}>
                    <CardTitle>Approved costs</CardTitle>
                    <ul className="divide-y divide-white/[0.08]">
                      {sub.expenses!.map((x) => (
                        <li key={x.id} className="py-2 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[13px] text-white truncate">
                              {x.description || x.category || 'Cost'}
                            </p>
                            <p className="text-[12px] text-white">
                              {x.materials ? 'Materials, no CIS' : 'CIS applies'}
                              {x.date ? ` · ${fmtDay(x.date)}` : ''}
                            </p>
                          </div>
                          <span className="text-[13px] text-white tabular-nums">
                            {gbp(x.amount)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            ) : (
              <section className={cardCn}>
                <CardTitle>Pay</CardTitle>
                <p className="text-[13px] text-white">
                  The owner or an admin sets their rate and issues their statement. You see the
                  days.
                </p>
              </section>
            )}

            <section className={cardCn}>
              <CardTitle>Statements this month</CardTitle>
              {statements.length === 0 ? (
                <p className="text-[13px] text-white">None yet.</p>
              ) : (
                <ul className="divide-y divide-white/[0.08]">
                  {statements.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => onOpenStatement(s)}
                        className="w-full min-h-11 py-2 flex items-center justify-between gap-3 text-left touch-manipulation"
                      >
                        <span className="min-w-0">
                          <span className="block text-[13px] font-medium text-white">
                            {s.statement_number}
                          </span>
                          <span className="block text-[12px] text-white">
                            {fmtDays(s.day_count)} · {fmtDay(s.issued_at)}
                          </span>
                        </span>
                        {s.voided_at ? (
                          <Pill tone="red">Voided</Pill>
                        ) : money ? (
                          <span className="text-[13px] font-semibold text-white tabular-nums">
                            {gbp(s.net_payable)}
                          </span>
                        ) : (
                          <Pill tone="emerald">Issued</Pill>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </FormSheet>
  );
}

/* ── Edit: details for everyone, terms for owner/admin ───────────────── */

interface EditDraft {
  trade: string;
  trading_name: string;
  insurance_provider: string;
  insurance_policy_number: string;
  insurance_cover_amount: string;
  insurance_expiry: string;
  rate_basis: RateBasis;
  rate: string;
  cis_status: CisStatus;
  cis_verification_number: string;
  cis_verified_on: string;
  utr: string;
  vat_registered: boolean;
  vat_number: string;
}

const draftFrom = (sub: SubcontractorRow): EditDraft => ({
  trade: sub.trade ?? '',
  trading_name: sub.trading_name ?? '',
  insurance_provider: sub.insurance_provider ?? '',
  insurance_policy_number: sub.insurance_policy_number ?? '',
  insurance_cover_amount: sub.insurance_cover_amount ? String(sub.insurance_cover_amount) : '',
  insurance_expiry: sub.insurance_expiry ?? '',
  rate_basis: sub.terms?.rate_basis ?? 'day',
  rate: sub.terms?.rate ? String(sub.terms.rate) : '',
  cis_status: sub.terms?.cis_status ?? 'unverified',
  cis_verification_number: sub.terms?.cis_verification_number ?? '',
  cis_verified_on: sub.terms?.cis_verified_on ?? '',
  utr: sub.terms?.utr ?? '',
  vat_registered: sub.terms?.vat_registered ?? false,
  vat_number: sub.terms?.vat_number ?? '',
});

export function SubcontractorEditSheet({
  sub,
  money,
  onClose,
}: {
  sub: SubcontractorRow | null;
  money: boolean;
  onClose: () => void;
}) {
  const save = useSaveSubcontractor();
  const [d, setD] = useState<EditDraft | null>(null);
  useEffect(() => {
    if (sub) setD(draftFrom(sub));
  }, [sub]);

  const set =
    (k: keyof EditDraft) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setD((p) => (p ? { ...p, [k]: e.target.value } : p));

  const submit = async () => {
    if (!sub || !d) return;
    const utr = d.utr.replace(/\s/g, '');
    if (money && utr && !/^\d{10}$/.test(utr)) {
      toast({ title: 'Check the UTR', description: 'A UTR is 10 digits.', variant: 'destructive' });
      return;
    }
    try {
      await save.mutateAsync({
        rosterId: sub.roster_id,
        details: {
          trade: d.trade.trim() || null,
          trading_name: d.trading_name.trim() || null,
          insurance_provider: d.insurance_provider.trim() || null,
          insurance_policy_number: d.insurance_policy_number.trim() || null,
          insurance_cover_amount: d.insurance_cover_amount
            ? Math.round(Number(d.insurance_cover_amount))
            : null,
          insurance_expiry: d.insurance_expiry || null,
        },
        terms: money
          ? {
              rate_basis: d.rate_basis,
              rate: d.rate ? Number(d.rate) : null,
              cis_status: d.cis_status,
              cis_verification_number: d.cis_verification_number.trim() || null,
              cis_verified_on: d.cis_verified_on || null,
              utr: utr || null,
              vat_registered: d.vat_registered,
              vat_number: d.vat_registered ? d.vat_number.trim() || null : null,
            }
          : undefined,
      });
      toast({ title: 'Saved' });
      onClose();
    } catch (e) {
      toast({ title: 'Not saved', description: rpcErrorMessage(e), variant: 'destructive' });
    }
  };

  return (
    <FormSheet
      open={!!sub}
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      eyebrow="Edit subcontractor"
      title={sub?.name ?? ''}
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
      {d && (
        <>
          <div className="space-y-4 min-w-0">
            <FormCard eyebrow="Trade">
              <FormGrid cols={2}>
                <Field label="Trade">
                  <Input value={d.trade} onChange={set('trade')} placeholder="Electrician" className={inputClass} />
                </Field>
                <Field label="Trading name">
                  <Input
                    value={d.trading_name}
                    onChange={set('trading_name')}
                    placeholder="e.g. JS Electrical"
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>
            <FormCard eyebrow="Public liability insurance">
              <FormGrid cols={2}>
                <Field label="Insurer">
                  <Input value={d.insurance_provider} onChange={set('insurance_provider')} className={inputClass} />
                </Field>
                <Field label="Policy number">
                  <Input
                    value={d.insurance_policy_number}
                    onChange={set('insurance_policy_number')}
                    className={inputClass}
                  />
                </Field>
                <Field label="Cover (£)">
                  <Input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    step="100000"
                    value={d.insurance_cover_amount}
                    onChange={set('insurance_cover_amount')}
                    placeholder="2000000"
                    className={inputClass}
                  />
                </Field>
                <Field label="Expires" hint="You get a bell 30 days and 7 days before.">
                  <Input
                    type="date"
                    value={d.insurance_expiry}
                    onChange={set('insurance_expiry')}
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>
          </div>

          <div className="space-y-4 min-w-0">
            {money ? (
              <>
                <FormCard eyebrow="Rate">
                  <div className="grid grid-cols-2 gap-2">
                    {(['day', 'hour'] as RateBasis[]).map((b) => (
                      <button
                        key={b}
                        type="button"
                        aria-pressed={d.rate_basis === b}
                        onClick={() => setD((p) => (p ? { ...p, rate_basis: b } : p))}
                        className={cn(
                          'h-11 rounded-full border text-[13px] touch-manipulation',
                          d.rate_basis === b ? chipOn : chipOff
                        )}
                      >
                        {b === 'day' ? 'Day rate' : 'Hourly rate'}
                      </button>
                    ))}
                  </div>
                  <Field label={d.rate_basis === 'day' ? 'Day rate (£)' : 'Hourly rate (£)'}>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step={d.rate_basis === 'day' ? '5' : '0.5'}
                      value={d.rate}
                      onChange={set('rate')}
                      placeholder={d.rate_basis === 'day' ? '180' : '25'}
                      className={inputClass}
                    />
                  </Field>
                </FormCard>
                <FormCard eyebrow="CIS">
                  <div className="grid grid-cols-2 gap-2">
                    {CIS_STATUS_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        aria-pressed={d.cis_status === o.value}
                        onClick={() => setD((p) => (p ? { ...p, cis_status: o.value } : p))}
                        className={cn(
                          'min-h-11 rounded-2xl border px-3 py-2 text-[12.5px] touch-manipulation',
                          d.cis_status === o.value ? chipOn : chipOff
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[12px] text-white">
                    {CIS_STATUS_OPTIONS.find((o) => o.value === d.cis_status)?.hint}
                  </p>
                  <FormGrid cols={2}>
                    <Field label="UTR" hint="10 digits. Only the owner and admins see it.">
                      <Input
                        inputMode="numeric"
                        value={d.utr}
                        onChange={set('utr')}
                        placeholder="1234567890"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="HMRC verification number">
                      <Input
                        value={d.cis_verification_number}
                        onChange={set('cis_verification_number')}
                        placeholder="V1234567890"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Verified on">
                      <Input
                        type="date"
                        value={d.cis_verified_on}
                        onChange={set('cis_verified_on')}
                        className={inputClass}
                      />
                    </Field>
                  </FormGrid>
                </FormCard>
                <FormCard eyebrow="VAT">
                  <div className="grid grid-cols-2 gap-2">
                    {[false, true].map((v) => (
                      <button
                        key={String(v)}
                        type="button"
                        aria-pressed={d.vat_registered === v}
                        onClick={() => setD((p) => (p ? { ...p, vat_registered: v } : p))}
                        className={cn(
                          'h-11 rounded-full border text-[13px] touch-manipulation',
                          d.vat_registered === v ? chipOn : chipOff
                        )}
                      >
                        {v ? 'VAT registered' : 'Not registered'}
                      </button>
                    ))}
                  </div>
                  {d.vat_registered && (
                    <>
                      <Field label="VAT number">
                        <Input value={d.vat_number} onChange={set('vat_number')} className={inputClass} />
                      </Field>
                      <p className="text-[12px] text-white">
                        Their statement carries a domestic reverse charge note. VAT is not added to
                        the statement.
                      </p>
                    </>
                  )}
                </FormCard>
              </>
            ) : (
              <FormCard eyebrow="Pay">
                <p className="text-[13px] text-white">
                  Only the owner or an admin can see or set the rate, CIS status and UTR.
                </p>
              </FormCard>
            )}
          </div>
        </>
      )}
    </FormSheet>
  );
}

/* ── Issue: confirm the sums, then issue ─────────────────────────────── */

export function IssueStatementSheet({
  sub,
  run,
  firm,
  onClose,
  onIssued,
}: {
  sub: SubcontractorRow | null;
  run: SubcontractorRun | undefined;
  firm: string | undefined;
  onClose: () => void;
  onIssued: (statementId: string) => void;
}) {
  const issue = useIssueStatement();
  const a = sub?.amounts;
  const go = async () => {
    if (!sub || !run || !firm) return;
    try {
      const res = await issue.mutateAsync({
        firm,
        rosterId: sub.roster_id,
        start: run.period_start,
        end: run.period_end,
        timesheetIds: sub.timesheet_ids,
        expenseIds: sub.expense_ids ?? [],
      });
      toast({
        title: res.replayed ? 'Already issued' : `Statement ${res.statement_number ?? ''} issued`,
        description: sub.linked_account
          ? `${sub.name.split(' ')[0]} can see it in their app.`
          : 'They see it once they join from the invite.',
      });
      onIssued(res.statement_id);
    } catch (e) {
      toast({ title: 'Not issued', description: rpcErrorMessage(e), variant: 'destructive' });
    }
  };
  return (
    <FormSheet
      open={!!sub}
      onOpenChange={(o) => !o && onClose()}
      eyebrow="Self-bill statement"
      title={sub ? `Pay ${sub.name}` : ''}
      description={
        run ? `Tax month ${fmtDay(run.period_start)} to ${fmtDay(run.period_end)}` : undefined
      }
      footer={
        <div className="flex gap-2">
          <SecondaryButton fullWidth onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton
            fullWidth
            onClick={go}
            disabled={issue.isPending || !a}
            data-help="subcontractors.issue-confirm"
          >
            {issue.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Issue'}
          </PrimaryButton>
        </div>
      }
    >
      {sub && a && (
        <>
          <section className={cardCn}>
            <CisBreakdown
              rateBasis={sub.terms?.rate_basis ?? 'day'}
              rate={Number(sub.terms?.rate ?? 0)}
              days={sub.day_count}
              hours={Number(sub.hours)}
              labour={Number(a.labour)}
              other={Number(a.other_costs)}
              materials={Number(a.materials)}
              cisStatus={sub.terms?.cis_status ?? 'unverified'}
              cisRate={Number(a.cis_rate)}
              deduction={Number(a.cis_deduction)}
              net={Number(a.net_payable)}
            />
          </section>
          <p className="text-[12.5px] text-white">
            CIS comes off labour and other costs only. Materials are paid in full. You pay{' '}
            {gbp(a.cis_deduction)} to HMRC on your CIS300 return for this month.
          </p>
          {sub.terms?.cis_status === 'unverified' && (
            <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-[12.5px] text-orange-300">
              Not verified with HMRC, so 30% is deducted. Verify them and set their CIS status to
              cut it to 20% or 0%.
            </p>
          )}
          <p className="text-[12.5px] text-white">
            The days are marked as billed, so they can never be paid twice. You can void it within
            48 hours.
          </p>
        </>
      )}
    </FormSheet>
  );
}

/* ── A statement: view, print, void ──────────────────────────────────── */

export function StatementSheet({
  statement,
  run,
  onClose,
}: {
  statement: SubcontractorStatement | null;
  run: SubcontractorRun | undefined;
  onClose: () => void;
}) {
  const voidIt = useVoidStatement();
  const money = run?.money_visible ?? false;
  const s = statement;
  const doVoid = async () => {
    if (!s) return;
    try {
      await voidIt.mutateAsync(s.id);
      toast({ title: 'Statement voided', description: 'The days are back to unbilled.' });
      onClose();
    } catch (e) {
      toast({ title: 'Not voided', description: rpcErrorMessage(e), variant: 'destructive' });
    }
  };
  return (
    <FormSheet
      open={!!s}
      onOpenChange={(o) => !o && onClose()}
      eyebrow={s?.voided_at ? 'Voided statement' : 'Self-bill statement'}
      title={s?.statement_number ?? ''}
      description={s ? `${s.name ?? ''} · ${fmtDay(s.period_start)} to ${fmtDay(s.period_end)}` : undefined}
      footer={
        money && s ? (
          <div className="flex gap-2">
            {s.can_void && (
              <DestructiveButton fullWidth onClick={doVoid} disabled={voidIt.isPending}>
                <Undo2 className="h-4 w-4 mr-2" />
                Void
              </DestructiveButton>
            )}
            <PrimaryButton
              fullWidth
              onClick={() =>
                printStatement(s, {
                  companyName: run?.company_name ?? null,
                  employerRef: run?.cis_settings?.employer_tax_reference ?? null,
                  accountsOfficeRef: run?.cis_settings?.accounts_office_reference ?? null,
                })
              }
            >
              <Printer className="h-4 w-4 mr-2" />
              Print or save PDF
            </PrimaryButton>
          </div>
        ) : undefined
      }
    >
      {s && (
        <>
          <section className={cardCn}>
            <Row label="Days" value={fmtDays(s.day_count)} />
            <Row label="Hours" value={`${Number(s.hours).toFixed(1)} h`} />
            <Row label="Issued" value={fmtDay(s.issued_at)} />
            {s.voided_at && <Row label="Voided" value={fmtDay(s.voided_at)} />}
          </section>
          {money && s.rate_basis ? (
            <>
              <section className={cardCn}>
                <CisBreakdown
                  rateBasis={s.rate_basis}
                  rate={Number(s.rate ?? 0)}
                  days={Number(s.day_count)}
                  hours={Number(s.hours)}
                  labour={Number(s.labour_amount ?? 0)}
                  other={Number(s.other_costs ?? 0)}
                  materials={Number(s.materials_amount ?? 0)}
                  cisStatus={s.cis_status ?? 'unverified'}
                  cisRate={Number(s.cis_rate ?? 0)}
                  deduction={Number(s.cis_deduction ?? 0)}
                  net={Number(s.net_payable ?? 0)}
                />
              </section>
              <section className={cardCn}>
                <Row label="UTR" value={s.utr || 'Not recorded'} />
                {s.cis_verification_number && (
                  <Row label="HMRC verification" value={s.cis_verification_number} />
                )}
                <Row label="CIS status" value={cisLabel(s.cis_status)} />
                {s.vat_registered && (
                  <p className="text-[12.5px] text-white">
                    Reverse charge: customer to account to HMRC for the VAT. VAT is not on this
                    statement.
                  </p>
                )}
              </section>
            </>
          ) : (
            <p className="text-[13px] text-white">
              The amounts are visible to the owner and admins only.
            </p>
          )}
        </>
      )}
    </FormSheet>
  );
}

/* ── The firm's HMRC references ──────────────────────────────────────── */

export function CisSettingsSheet({
  open,
  firm,
  run,
  onClose,
}: {
  open: boolean;
  firm: string | undefined;
  run: SubcontractorRun | undefined;
  onClose: () => void;
}) {
  const save = useSaveCisSettings();
  const [ref, setRef] = useState('');
  const [aor, setAor] = useState('');
  useEffect(() => {
    if (!open) return;
    setRef(run?.cis_settings?.employer_tax_reference ?? '');
    setAor(run?.cis_settings?.accounts_office_reference ?? '');
  }, [open, run]);
  const submit = async () => {
    if (!firm) return;
    try {
      await save.mutateAsync({
        firm,
        employer_tax_reference: ref.trim() || null,
        accounts_office_reference: aor.trim() || null,
      });
      toast({ title: 'Saved' });
      onClose();
    } catch (e) {
      toast({ title: 'Not saved', description: rpcErrorMessage(e), variant: 'destructive' });
    }
  };
  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => !o && onClose()}
      eyebrow="CIS"
      title="Your HMRC references"
      description="Printed on every statement you give a subcontractor."
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
    >
      <FormCard>
        <Field label="Employer reference" hint="On your HMRC CIS letters, e.g. 123/AB45678.">
          <Input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="123/AB45678" className={inputClass} />
        </Field>
        <Field label="Accounts office reference">
          <Input value={aor} onChange={(e) => setAor(e.target.value)} placeholder="123PA00045678" className={inputClass} />
        </Field>
      </FormCard>
    </FormSheet>
  );
}
