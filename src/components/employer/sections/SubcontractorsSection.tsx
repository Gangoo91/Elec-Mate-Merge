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
  Avatar,
  IconButton,
  LoadingBlocks,
  SecondaryButton,
} from '@/components/employer/editorial';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import {
  Initials,
  PlainEmpty,
  Row,
  Tag,
  colClass,
  heroBtn,
  frameClass,
  rowBtnSecondary,
  rowsClass,
  twoColClass,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
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
import { AddEmployeeDialog } from '@/components/employer/dialogs/AddEmployeeDialog';
import { cisHeroBit, useCisMonth, type CisMonth, type CisSubbie } from '@/hooks/useCis';
import {
  CisChecksSheet,
  CisReturnPanel,
  CisReturnSheet,
  HmrcChecksPanel,
} from '@/components/employer/subcontractors/CisPanels';

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
  const [addOpen, setAddOpen] = useState(false);
  // ELE-2064: the CIS300 helper and HMRC checks (owner/admin only).
  const cis = useCisMonth(run?.firm, period.start, period.end, money);
  const [checksFor, setChecksFor] = useState<CisSubbie | null>(null);
  const [markMonth, setMarkMonth] = useState<CisMonth | null>(null);

  const byId = (id: string | null) => (id ? (subs.find((s) => s.roster_id === id) ?? null) : null);
  const open = byId(openId);

  // Live: approvals elsewhere update the days without a reload.
  useRealtimeInvalidate(
    'subcontractor-run',
    [
      { table: 'employer_timesheets' },
      { table: 'employer_subcontractor_details' },
      { table: 'employer_cis_returns' },
      { table: 'employer_cis_checks' },
    ],
    [['subcontractor-run'], ['cis-month']],
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

  // Deep link: ?cis=return (the CIS deadline bells) scrolls to the return panel.
  const cisParam = searchParams.get('cis');
  useEffect(() => {
    if (!cisParam || !cis.data) return;
    requestAnimationFrame(() =>
      document.getElementById('cis-return')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('cis');
        return next;
      },
      { replace: true }
    );
  }, [cisParam, cis.data, setSearchParams]);

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
  if (money && run && !run.cis_settings?.employer_tax_reference && subs.length > 0)
    blockers.push({
      text: 'Your HMRC employer reference is not set, so statements print without it.',
      fixLabel: 'Add it',
      onFix: () => setCisOpen(true),
    });

  const periodLabel = `${fmtDay(period.start)} to ${fmtDay(period.end)}`;
  const liveStatements = statements.filter((s) => !s.voided_at);

  // Where this tax month stands, in one line.
  const heroLine = (() => {
    if (isLoading) return 'Day rates, CIS, insurance and a self-bill statement from approved days.';
    if (subs.length === 0)
      return 'Day rates, CIS, insurance and a self-bill statement from approved days.';
    const bits: string[] = [];
    if (totals.awaiting > 0)
      bits.push(
        `${totals.awaiting} ${totals.awaiting === 1 ? 'day' : 'days'} waiting for approval`
      );
    const cover = coverAlerts.length + noInsurance.length;
    if (cover > 0) bits.push(`${cover} with insurance to check`);
    const cisBit = money ? cisHeroBit(cis.data) : null;
    if (cisBit) bits.push(cisBit);
    const toVerify = money
      ? (cis.data?.subcontractors ?? []).filter((x) => x.state === 'reverify' || x.state === 'verify_first').length
      : 0;
    if (toVerify > 0) bits.push(`${toVerify} to verify with HMRC`);
    if (bits.length === 0)
      return `${fmtDays(totals.days)} approved this tax month. Nothing waiting.`;
    const s = bits.join(', ');
    return `${s.charAt(0).toUpperCase()}${s.slice(1)}.`;
  })();

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Subcontractors"
        description={heroLine}
        actions={
          <div className="flex items-center gap-2">
            {money && (
              <SecondaryButton
                onClick={() => setCisOpen(true)}
                aria-label="HMRC references"
                className={cn(heroBtn, 'shrink-0 px-4 sm:px-5 border-white/[0.18] font-semibold')}
              >
                <Landmark className="mr-2 h-4 w-4" />
                <span className="sm:hidden">HMRC</span>
                <span className="hidden sm:inline">HMRC references</span>
              </SecondaryButton>
            )}
            <PageHelpButton help={SUBCONTRACTORS_HELP} blockers={blockers} />
          </div>
        }
      />
      <HowItWorks help={SUBCONTRACTORS_HELP} blockers={blockers} />

      {/* Period: the CIS tax month */}
      <div
        className={cn(panel, 'flex items-center gap-2 px-2 py-2 sm:px-3')}
        data-help="subcontractors.period"
      >
        <IconButton
          onClick={() => setOffset((o) => o - 1)}
          aria-label="Previous tax month"
          className="shrink-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </IconButton>
        <div className="min-w-0 flex-1 text-center sm:text-left sm:pl-2">
          <span className="text-[13px] text-white">Tax month </span>
          <span className="text-[15px] font-semibold text-white">{periodLabel}</span>
        </div>
        {offset !== 0 && (
          <button
            type="button"
            onClick={() => setOffset(0)}
            className="h-11 shrink-0 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            This month
          </button>
        )}
        <IconButton
          onClick={() => setOffset((o) => Math.min(o + 1, 1))}
          disabled={offset >= 1}
          aria-label="Next tax month"
          className="shrink-0"
        >
          <ChevronRight className="h-5 w-5" />
        </IconButton>
      </div>

      {isLoading ? (
        <LoadingBlocks />
      ) : isError ? (
        <div className={panel}>
          <PlainEmpty
            bare
            text="Subcontractors didn't load. Check your connection and try again."
            action={
              <button type="button" onClick={() => refetch()} className={rowBtnSecondary}>
                Try again
              </button>
            }
          />
        </div>
      ) : subs.length === 0 ? (
        <div className={panel}>
          <PlainEmpty
            bare
            text="No subcontractors yet. They get the same jobs, packs and timesheets as your team, with no holiday or PAYE, and you pay them by a self-bill statement from the days you approve."
            action={
              <button type="button" onClick={() => setAddOpen(true)} className={rowBtnSecondary}>
                Add a subcontractor
              </button>
            }
          />
        </div>
      ) : (
        <>
          <StatStrip
            columns={4}
            stats={
              money
                ? [
                    { label: 'Days approved', value: totals.days, sub: 'This tax month' },
                    {
                      label: 'Awaiting approval',
                      value: totals.awaiting,
                      tone: totals.awaiting > 0 ? 'yellow' : undefined,
                      sub: totals.awaiting > 0 ? 'In Timesheets' : 'Nothing waiting',
                    },
                    { label: 'CIS to deduct', value: gbp(totals.cis), sub: 'Labour only' },
                    { label: 'Net to pay', value: gbp(totals.net), sub: 'After CIS' },
                  ]
                : [
                    { label: 'Subcontractors', value: subs.length },
                    { label: 'Days approved', value: totals.days, sub: 'This tax month' },
                    {
                      label: 'Awaiting approval',
                      value: totals.awaiting,
                      tone: totals.awaiting > 0 ? 'yellow' : undefined,
                    },
                    {
                      label: 'Cover to check',
                      value: totals.coverIssues,
                      tone: totals.coverIssues > 0 ? 'red' : undefined,
                    },
                  ]
            }
          />

          <div className={twoColClass}>
            <div className={colClass}>
              <section data-help="subcontractors.list">
                <PanelTitle title="Your subcontractors" meta={subs.length} />
                <div className={cn(panel, rowsClass)}>
                  {subs.map((s) => (
                    <SubRow
                      key={s.roster_id}
                      s={s}
                      money={money}
                      onOpen={() => setOpenId(s.roster_id)}
                    />
                  ))}
                </div>
              </section>

              <section>
                <PanelTitle
                  title="Statements"
                  meta={liveStatements.length > 0 ? liveStatements.length : 'This tax month'}
                />
                <div className={cn(panel, statements.length > 0 && rowsClass)}>
                  {statements.length === 0 ? (
                    <PlainEmpty
                      bare
                      text={
                        money
                          ? 'None yet. Open a subcontractor and tap Issue statement.'
                          : 'None yet. The owner or an admin issues them.'
                      }
                    />
                  ) : (
                    statements.map((st) => (
                      <Row
                        key={st.id}
                        title={`${st.statement_number} · ${st.name ?? ''}`}
                        detail={`${fmtDays(Number(st.day_count))} · issued ${fmtDay(st.issued_at)}`}
                        trailing={
                          st.voided_at ? (
                            <Tag tone="red">Voided</Tag>
                          ) : money ? (
                            <span className="text-[14px] font-semibold text-white tabular-nums">
                              {gbp(st.net_payable)} net
                            </span>
                          ) : (
                            <Tag tone="done">Issued</Tag>
                          )
                        }
                        onClick={() => setStatement(st)}
                      />
                    ))
                  )}
                  {money && (
                    <div className="border-t border-white/[0.07] px-4 py-3 sm:px-5">
                      <button
                        type="button"
                        onClick={exportCsv}
                        data-help="subcontractors.export"
                        className={rowBtnSecondary}
                      >
                        <Download className="h-4 w-4" />
                        Export statements (CSV)
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className={colClass}>
              {money && (
                <>
                  <CisReturnPanel
                    data={cis.data}
                    loading={cis.isLoading}
                    refs={{
                      employerRef: run?.cis_settings?.employer_tax_reference ?? null,
                      accountsOfficeRef: run?.cis_settings?.accounts_office_reference ?? null,
                    }}
                    onMark={(m) => setMarkMonth(m)}
                  />
                  <HmrcChecksPanel data={cis.data} onOpen={(x) => setChecksFor(x)} />
                </>
              )}
              <section>
                <PanelTitle
                  title="Cover to check"
                  meta={
                    coverAlerts.length + noInsurance.length > 0
                      ? coverAlerts.length + (noInsurance.length > 0 ? 1 : 0)
                      : undefined
                  }
                />
                <div
                  className={cn(
                    panel,
                    (coverAlerts.length > 0 || noInsurance.length > 0) && rowsClass
                  )}
                >
                  {coverAlerts.length === 0 && noInsurance.length === 0 ? (
                    <PlainEmpty bare text="Everyone's insurance is in date." />
                  ) : (
                    <>
                      {coverAlerts.map((s) => {
                        const expired = expiryState(s.insurance_expiry).tone === 'red';
                        return (
                          <Row
                            key={`ins-${s.roster_id}`}
                            title={`${s.name}: insurance ${expired ? 'expired' : 'running out'}`}
                            detail={`Public liability ${expiryState(s.insurance_expiry).label}`}
                            meta={
                              <span className="text-white">
                                Ask for the new certificate before sending them to a job.
                              </span>
                            }
                            trailing={
                              <Tag tone={expired ? 'red' : 'yellow'}>
                                {expired ? 'Expired' : 'Soon'}
                              </Tag>
                            }
                            onClick={() => setOpenId(s.roster_id)}
                          />
                        );
                      })}
                      {noInsurance.length > 0 && (
                        <Row
                          title={`${noInsurance.length} without insurance on file`}
                          detail={noInsurance.map((s) => s.name).join(', ')}
                          trailing={<Tag tone="outline">Add it</Tag>}
                          onClick={() => setEditId(noInsurance[0].roster_id)}
                        />
                      )}
                    </>
                  )}
                </div>
              </section>

              <p className="text-[13px] leading-relaxed text-white">
                Subcontractors are left out of the PAYE payroll run and have no holiday allowance.
                {money
                  ? ' CIS comes off labour and other costs only; materials are paid in full.'
                  : ' Only the owner and admins see rates and amounts.'}
              </p>
            </div>
          </div>
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
        onChecks={
          money
            ? () => {
                const x = cis.data?.subcontractors.find((c) => c.roster_id === openId);
                if (!x) return;
                setOpenId(null);
                setChecksFor(x);
              }
            : undefined
        }
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
      {money && (
        <>
          <CisChecksSheet
            subbie={
              checksFor
                ? (cis.data?.subcontractors.find((x) => x.roster_id === checksFor.roster_id) ??
                  checksFor)
                : null
            }
            onClose={() => setChecksFor(null)}
          />
          <CisReturnSheet firm={run?.firm} month={markMonth} onClose={() => setMarkMonth(null)} />
        </>
      )}
      <CisSettingsSheet
        open={cisOpen}
        firm={run?.firm}
        run={run}
        onClose={() => setCisOpen(false)}
      />
      <AddEmployeeDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        defaults={{ teamRole: 'Subcontractor' }}
      />
    </PageFrame>
  );
}

function SubRow({ s, money, onOpen }: { s: SubcontractorRow; money: boolean; onOpen: () => void }) {
  const ins = expiryState(s.insurance_expiry);
  const ecs = expiryState(s.ecs_expiry);
  const noRate = money && !((s.terms?.rate ?? 0) > 0);
  // One status per row, the most pressing first.
  const status =
    ins.tone === 'red' ? (
      <Tag tone="red">Insurance expired</Tag>
    ) : noRate ? (
      <Tag tone="outline">No rate</Tag>
    ) : s.awaiting_count > 0 ? (
      <Tag tone="yellow">{s.awaiting_count} waiting</Tag>
    ) : ins.tone === 'amber' ? (
      <Tag tone="yellow">Insurance {ins.label}</Tag>
    ) : ins.tone === 'blue' ? (
      <Tag tone="outline">No insurance</Tag>
    ) : (
      <Tag tone="done">Cover ok</Tag>
    );
  const detail = [
    s.trade || 'Subcontractor',
    s.elec_id_number,
    s.ecs_expiry && ecs.tone !== 'emerald' ? `ECS ${ecs.label}` : null,
  ]
    .filter(Boolean)
    .join(' · ');
  return (
    <Row
      lead={
        s.photo_url ? (
          <Avatar
            initials={initials(s.name)}
            photo={s.photo_url}
            className="[&>div]:h-10 [&>div]:w-10 [&>div]:rounded-full"
          />
        ) : (
          <Initials name={s.name} />
        )
      }
      title={s.name}
      detail={detail}
      trailing={
        <>
          <span className="hidden text-right sm:block">
            <span className="block text-[14px] font-semibold text-white tabular-nums">
              {fmtDays(Number(s.day_count))}
            </span>
            {money && s.amounts && (s.terms?.rate ?? 0) > 0 && s.day_count > 0 && (
              <span className="block text-[12px] text-white tabular-nums">
                {gbp(s.amounts.net_payable)} net
              </span>
            )}
          </span>
          {status}
        </>
      }
      onClick={onOpen}
    />
  );
}
