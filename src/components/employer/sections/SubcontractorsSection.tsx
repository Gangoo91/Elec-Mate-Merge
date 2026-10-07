/**
 * People → Subcontractors (ELE-1830).
 *
 * Labour-only sparkies and regular subbies: roster rows with team_role
 * 'Subcontractor'. Same jobs, packs, briefings and timesheets as the team; no
 * holiday, no PAYE payroll. Paid by a self-bill statement per CIS tax month
 * (6th to 5th) from APPROVED days, with CIS on labour only.
 *
 * Office managers see days, trade and insurance; get_subcontractor_run hides
 * every money field from them, and the screen follows its money_visible flag.
 */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download, Landmark } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  EmptyState,
  LoadingBlocks,
  SecondaryButton,
  AlertRow,
} from '@/components/employer/editorial';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { SUBCONTRACTORS_HELP } from '@/components/employer/help/people';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import {
  downloadText,
  expiryState,
  fmtDay,
  fmtDays,
  gbp,
  statementsCsv,
  taxMonth,
  useSubcontractorRun,
  type SubcontractorRow,
  type SubcontractorStatement,
} from '@/hooks/useSubcontractors';
import {
  CisSettingsSheet,
  IssueStatementSheet,
  StatementSheet,
  SubcontractorDetailSheet,
  SubcontractorEditSheet,
} from '@/components/employer/subcontractors/SubcontractorSheets';
import { toast } from '@/hooks/use-toast';

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || '?';

export function SubcontractorsSection() {
  const [offset, setOffset] = useState(0);
  const period = useMemo(() => taxMonth(offset), [offset]);
  const { data: run, isLoading, isError, refetch } = useSubcontractorRun(period.start, period.end);
  const money = run?.money_visible ?? false;
  const subs = useMemo(() => run?.subcontractors ?? [], [run]);

  const [openId, setOpenId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [issueId, setIssueId] = useState<string | null>(null);
  const [statement, setStatement] = useState<SubcontractorStatement | null>(null);
  const [cisOpen, setCisOpen] = useState(false);

  const byId = (id: string | null) => (id ? (subs.find((s) => s.roster_id === id) ?? null) : null);
  const open = byId(openId);

  // Live: approvals elsewhere update the days without a reload.
  useRealtimeInvalidate(
    'subcontractor-run',
    [{ table: 'employer_timesheets' }, { table: 'employer_subcontractor_details' }],
    [['subcontractor-run']],
    true
  );

  // Deep link: ?member=<roster id> (the insurance-expiry bell) opens that subbie.
  const [searchParams, setSearchParams] = useSearchParams();
  const memberParam = searchParams.get('member');
  useEffect(() => {
    if (!memberParam || isLoading) return;
    if (subs.some((s) => s.roster_id === memberParam)) setOpenId(memberParam);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('member');
        return next;
      },
      { replace: true }
    );
  }, [memberParam, isLoading, subs, setSearchParams]);

  const totals = useMemo(() => {
    let days = 0;
    let awaiting = 0;
    let net = 0;
    let cis = 0;
    let coverIssues = 0;
    for (const s of subs) {
      days += Number(s.day_count) || 0;
      awaiting += s.awaiting_count || 0;
      net += Number(s.amounts?.net_payable ?? 0);
      cis += Number(s.amounts?.cis_deduction ?? 0);
      const i = expiryState(s.insurance_expiry).tone;
      const e = expiryState(s.ecs_expiry).tone;
      if (i === 'red' || i === 'amber' || e === 'red' || e === 'amber') coverIssues += 1;
    }
    return { days, awaiting, net, cis, coverIssues };
  }, [subs]);

  const coverAlerts = subs.filter((s) => {
    const t = expiryState(s.insurance_expiry).tone;
    return t === 'red' || t === 'amber';
  });
  const noInsurance = subs.filter((s) => !s.insurance_expiry);
  const statements = run?.statements ?? [];

  const exportCsv = () => {
    const live = statements.filter((s) => !s.voided_at);
    if (live.length === 0) {
      toast({ title: 'Nothing to export', description: 'No statements issued in this tax month.' });
      return;
    }
    downloadText(`cis-statements-${period.start}-to-${period.end}.csv`, statementsCsv(live));
  };

  const blockers: HelpBlocker[] = [];
  if (!isLoading && subs.length === 0)
    blockers.push({ text: 'Nobody on your team has the Subcontractor type yet.' });
  if (money && run && !run.cis_settings?.employer_tax_reference && subs.length > 0)
    blockers.push({
      text: 'Your HMRC employer reference is not set, so statements print without it.',
      fixLabel: 'Add it',
      onFix: () => setCisOpen(true),
    });

  const periodLabel = `${fmtDay(period.start)} to ${fmtDay(period.end)}`;

  return (
    <PageFrame>
      <PageHero
        eyebrow="People"
        title="Subcontractors"
        description="Day rates, CIS, insurance and a self-bill statement from the days you approved. No holiday, no PAYE."
        actions={
          <>
            {money && (
              <SecondaryButton onClick={() => setCisOpen(true)} className="hidden sm:inline-flex">
                <Landmark className="h-4 w-4 mr-2" />
                HMRC references
              </SecondaryButton>
            )}
            <PageHelpButton help={SUBCONTRACTORS_HELP} blockers={blockers} />
          </>
        }
      />
      <HowItWorks help={SUBCONTRACTORS_HELP} blockers={blockers} />

      {/* Period: the CIS tax month */}
      <div
        className="flex items-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.04] p-2"
        data-help="subcontractors.period"
      >
        <button
          type="button"
          onClick={() => setOffset((o) => o - 1)}
          className="h-11 w-11 shrink-0 rounded-full border border-white/[0.1] bg-white/[0.06] text-white flex items-center justify-center touch-manipulation"
          aria-label="Previous tax month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 min-w-0 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
            Tax month
          </p>
          <p className="text-[14px] font-semibold text-white truncate">{periodLabel}</p>
        </div>
        {offset !== 0 && (
          <button
            type="button"
            onClick={() => setOffset(0)}
            className="h-11 shrink-0 rounded-full border border-white/[0.1] bg-white/[0.06] px-3 text-[12.5px] font-medium text-white touch-manipulation"
          >
            This month
          </button>
        )}
        <button
          type="button"
          onClick={() => setOffset((o) => Math.min(o + 1, 1))}
          disabled={offset >= 1}
          className="h-11 w-11 shrink-0 rounded-full border border-white/[0.1] bg-white/[0.06] text-white flex items-center justify-center touch-manipulation disabled:opacity-40"
          aria-label="Next tax month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {isLoading ? (
        <LoadingBlocks />
      ) : isError ? (
        <EmptyState
          title="Couldn't load subcontractors"
          description="Check your connection and try again."
          action="Try again"
          onAction={() => refetch()}
        />
      ) : subs.length === 0 ? (
        <EmptyState
          title="No subcontractors yet"
          description="Add a subbie from Team and pick Subcontractor as the type. They get the same jobs, packs and timesheets as your team, with no holiday or PAYE. You pay them by a self-bill statement from the days you approve."
        />
      ) : (
        <>
          <StatStrip
            columns={4}
            stats={
              money
                ? [
                    { label: 'Days approved', value: totals.days },
                    {
                      label: 'Awaiting approval',
                      value: totals.awaiting,
                      tone: totals.awaiting > 0 ? 'orange' : undefined,
                    },
                    { label: 'CIS to deduct', value: gbp(totals.cis) },
                    { label: 'Net to pay', value: gbp(totals.net), accent: true },
                  ]
                : [
                    { label: 'Subcontractors', value: subs.length },
                    { label: 'Days approved', value: totals.days },
                    {
                      label: 'Awaiting approval',
                      value: totals.awaiting,
                      tone: totals.awaiting > 0 ? 'orange' : undefined,
                    },
                    {
                      label: 'Cover to check',
                      value: totals.coverIssues,
                      tone: totals.coverIssues > 0 ? 'red' : undefined,
                    },
                  ]
            }
          />

          {(coverAlerts.length > 0 || noInsurance.length > 0) && (
            <div className="space-y-2.5">
              {coverAlerts.map((s) => (
                <AlertRow
                  key={`ins-${s.roster_id}`}
                  tone={expiryState(s.insurance_expiry).tone === 'red' ? 'red' : 'amber'}
                  title={`${s.name}: insurance ${
                    expiryState(s.insurance_expiry).tone === 'red' ? 'expired' : 'running out'
                  }`}
                  subtitle={`Public liability ${expiryState(s.insurance_expiry).label}. Ask for the new certificate before sending them to a job.`}
                  onClick={() => setOpenId(s.roster_id)}
                />
              ))}
              {noInsurance.length > 0 && (
                <AlertRow
                  tone="orange"
                  title={`${noInsurance.length} without insurance on file`}
                  subtitle={noInsurance.map((s) => s.name).join(', ')}
                  onClick={() => setEditId(noInsurance[0].roster_id)}
                />
              )}
            </div>
          )}

          <div data-help="subcontractors.list">
            <ListCard>
              <ListCardHeader
                tone="orange"
                title="Your subcontractors"
                meta={<Pill tone="blue">{subs.length}</Pill>}
              />
              <ListBody>
                {subs.map((s) => (
                  <SubRow key={s.roster_id} s={s} money={money} onOpen={() => setOpenId(s.roster_id)} />
                ))}
              </ListBody>
            </ListCard>
          </div>

          <ListCard>
            <ListCardHeader
              tone="emerald"
              title="Statements this tax month"
              meta={<Pill tone="blue">{statements.filter((s) => !s.voided_at).length}</Pill>}
            />
            {money && (
              <div className="px-4 sm:px-5 pt-3 flex flex-wrap gap-2">
                <SecondaryButton onClick={exportCsv} data-help="subcontractors.export">
                  <Download className="h-4 w-4 mr-2" />
                  Export statements (CSV)
                </SecondaryButton>
                <SecondaryButton onClick={() => setCisOpen(true)} className="sm:hidden">
                  <Landmark className="h-4 w-4 mr-2" />
                  HMRC references
                </SecondaryButton>
              </div>
            )}
            {statements.length === 0 ? (
              <p className="px-5 py-5 text-[13px] text-white">
                {money
                  ? 'None yet. Open a subcontractor and tap Issue statement.'
                  : 'None yet. The owner or an admin issues them.'}
              </p>
            ) : (
              <ListBody>
                {statements.map((st) => (
                  <ListRow
                    key={st.id}
                    title={`${st.statement_number} · ${st.name ?? ''}`}
                    subtitle={`${fmtDays(Number(st.day_count))} · issued ${fmtDay(st.issued_at)}`}
                    trailing={
                      st.voided_at ? (
                        <Pill tone="red">Voided</Pill>
                      ) : money ? (
                        <Pill tone="emerald">{gbp(st.net_payable)} net</Pill>
                      ) : (
                        <Pill tone="emerald">Issued</Pill>
                      )
                    }
                    onClick={() => setStatement(st)}
                  />
                ))}
              </ListBody>
            )}
          </ListCard>

          <p className="text-[12.5px] text-white">
            Subcontractors are left out of the PAYE payroll run and have no holiday allowance.
            {money
              ? ' CIS comes off labour and other costs only; materials are paid in full.'
              : ' Only the owner and admins see rates and amounts.'}
          </p>
        </>
      )}

      <SubcontractorDetailSheet
        sub={open}
        run={run}
        onClose={() => setOpenId(null)}
        onEdit={() => {
          setEditId(openId);
          setOpenId(null);
        }}
        onIssue={() => {
          setIssueId(openId);
          setOpenId(null);
        }}
        onOpenStatement={(st) => {
          setOpenId(null);
          setStatement(st);
        }}
      />
      <SubcontractorEditSheet sub={byId(editId)} money={money} onClose={() => setEditId(null)} />
      <IssueStatementSheet
        sub={byId(issueId)}
        run={run}
        firm={run?.firm}
        onClose={() => setIssueId(null)}
        onIssued={async (id) => {
          setIssueId(null);
          const fresh = await refetch();
          const st = fresh.data?.statements.find((x) => x.id === id);
          if (st) setStatement(st);
        }}
      />
      <StatementSheet statement={statement} run={run} onClose={() => setStatement(null)} />
      <CisSettingsSheet open={cisOpen} firm={run?.firm} run={run} onClose={() => setCisOpen(false)} />
    </PageFrame>
  );
}

function SubRow({
  s,
  money,
  onOpen,
}: {
  s: SubcontractorRow;
  money: boolean;
  onOpen: () => void;
}) {
  const ins = expiryState(s.insurance_expiry);
  const ecs = expiryState(s.ecs_expiry);
  return (
    <ListRow
      lead={<Avatar initials={initials(s.name)} photo={s.photo_url} />}
      title={s.name}
      subtitle={[s.trade || 'Subcontractor', s.elec_id_number].filter(Boolean).join(' · ')}
      trailing={
        <>
          <Pill tone={s.day_count > 0 ? 'emerald' : 'blue'}>{fmtDays(Number(s.day_count))}</Pill>
          {s.awaiting_count > 0 && <Pill tone="orange">{s.awaiting_count} waiting</Pill>}
          <Pill tone={ins.tone}>
            {ins.tone === 'blue' ? 'No insurance' : `Insurance ${ins.tone === 'emerald' ? 'ok' : ins.label}`}
          </Pill>
          {s.ecs_expiry && ecs.tone !== 'emerald' && <Pill tone={ecs.tone}>ECS {ecs.label}</Pill>}
          {money && s.amounts && (s.terms?.rate ?? 0) > 0 && s.day_count > 0 && (
            <Pill tone="emerald">{gbp(s.amounts.net_payable)} net</Pill>
          )}
          {money && !((s.terms?.rate ?? 0) > 0) && <Pill tone="amber">No rate</Pill>}
        </>
      }
      onClick={onOpen}
    />
  );
}
