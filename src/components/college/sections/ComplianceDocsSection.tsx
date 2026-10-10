import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useVerifierAuthority } from '@/hooks/useVerifierAuthority';
import { useCollegePolicies } from '@/hooks/useCollegePolicies';
import { cn } from '@/lib/utils';
import { inputCn } from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { JoinedToggle } from '@/components/college/quality/QualityChoices';
import { Ring, VisHead } from '@/components/college/student360/Student360Visuals';
import {
  LinkCard,
  QBTN,
  QBTN_PRIMARY,
  QCARD,
  QualityHeader,
} from '@/components/college/quality/QualityHubKit';
import { joinAnd, plural } from '@/components/college/quality/qualityText';
import { BarList, ChartEmpty, Donut, SegmentBar } from '@/components/college/quality/QualityKit';
import { daysFromToday, useScrRecords } from '@/components/college/quality/DocsScrRecords';
import { StaffComplianceList } from './StaffComplianceList';
import { PoliciesList } from './PoliciesList';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';
import { AddPolicyDialog } from '@/components/college/dialogs/AddPolicyDialog';
import { SCR_LEGEND, scrCounts, scrSegments } from '@/components/college/quality/complianceStatus';
import { AiAuthorPolicySheet } from '@/components/college/dialogs/AiAuthorPolicySheet';
import { PolicyTemplatesSheet } from '@/components/college/dialogs/PolicyTemplatesSheet';

/* ==========================================================================
   ComplianceDocsSection: the single central record and the policy library.

   Content only (CollegeDashboard draws the masthead). Redesigned to the
   College Hub kit on 7 Oct 2026: header with "?", one card holding the
   headline figures and the records-by-state donut beside what expires in
   the next 90 days, then where the gaps are and how far staff have read the
   policies, then the two lists behind chips and a search.

   Every figure reads v_single_central_record (the list reads the same view),
   so the chart and the list can never disagree.

   8 Oct 2026: the four figure tiles went into the header sentence; the one
   primary action opens the person with the most urgent gap (expired before
   missing), so "fix it" is one tap instead of a scroll to the list.
   `embedded` drops the page title when /college/compliance shows this
   under its own header.
   ========================================================================== */

type Tab = 'staff' | 'policies';

const HELP: PageHelpContent = {
  id: 'college-compliance-docs',
  title: 'Staff records and policies',
  what: 'The single central record for every member of staff (DBS, right to work, references, declarations) and the college policies staff must read and sign. Inspectors ask for both on day one.',
  steps: [
    {
      title: 'Fix what is red first',
      body: 'Expired and missing records are the ones an inspector will find. Tap a person to upload the document, add the expiry date and the reference number.',
    },
    {
      title: 'Verify what is uploaded',
      body: 'A record someone else uploaded shows as awaiting verification until a second person checks the original and signs it off.',
    },
    {
      title: 'Keep policies live and read',
      body: 'Switch to Policies to add one, start from a template, or draft one. Publish it and staff are asked to acknowledge it; the log is kept for you.',
    },
  ],
  legend: SCR_LEGEND,
  notes: [
    {
      title: 'Where these records come from',
      body: 'Each staff member has the statutory checks their role needs. Add staff under People and they appear here automatically.',
    },
  ],
  source: 'Keeping children safe in education (statutory guidance), single central record.',
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function ComplianceDocsSection({ embedded = false }: { embedded?: boolean } = {}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('staff');
  const [openStaffId, setOpenStaffId] = useState<string | null>(null);
  const [addPolicyOpen, setAddPolicyOpen] = useState(false);
  const [aiAuthorOpen, setAiAuthorOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { rows: scr, loading: scrLoading } = useScrRecords(refreshKey);
  const { policies, loading: policiesLoading } = useCollegePolicies();
  const { isVerifier } = useVerifierAuthority();

  const showList = (tab: Tab) => {
    setActiveTab(tab);
    window.requestAnimationFrame(() =>
      document
        .getElementById('compliance-records')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  const stats = useMemo(() => {
    const s = { valid: 0, expiring: 0, expired: 0, missing: 0, total: scr.length };
    for (const r of scr) {
      if (r.computed_status === 'valid') s.valid += 1;
      else if (r.computed_status === 'expiring') s.expiring += 1;
      else if (r.computed_status === 'expired') s.expired += 1;
      else if (r.computed_status === 'missing') s.missing += 1;
    }
    // Anything else is awaiting verification (worked out as the remainder).
    return scrCounts(s);
  }, [scr]);

  // Anything with an expiry in the next 90 days (or already past but still
  // marked valid/expiring), soonest first.
  const upcoming = useMemo(
    () =>
      scr
        .filter(
          (r) => r.expires_at && (r.computed_status === 'valid' || r.computed_status === 'expiring')
        )
        .map((r) => ({ ...r, days: daysFromToday(r.expires_at as string) }))
        .filter((r) => r.days <= 90)
        .sort((a, b) => a.days - b.days),
    [scr]
  );

  // Gaps by requirement: expired + missing per statutory check.
  const gaps = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of scr) {
      if (r.computed_status !== 'expired' && r.computed_status !== 'missing') continue;
      const k = r.requirement ?? 'Other';
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return Array.from(m.entries())
      .map(([label, n]) => ({ label, n, tone: 'bad' as const }))
      .sort((a, b) => b.n - a.n)
      .slice(0, 6);
  }, [scr]);

  const pol = useMemo(() => {
    const live = policies.filter((p) => p.status === 'live');
    const needAck = live.filter((p) => p.requires_acknowledgement);
    const signed = needAck.reduce((s, p) => s + Math.min(p.ack_count, p.ack_target), 0);
    const target = needAck.reduce((s, p) => s + p.ack_target, 0);
    const reviewDue = policies.filter(
      (p) => p.status !== 'archived' && p.review_due_at && daysFromToday(p.review_due_at) <= 30
    ).length;
    return {
      live: live.length,
      draft: policies.filter((p) => p.status === 'draft').length,
      archived: policies.filter((p) => p.status === 'archived').length,
      signed,
      target,
      pct: target > 0 ? Math.round((100 * signed) / target) : null,
      reviewDue,
    };
  }, [policies]);

  const inDatePct = stats.inDatePct ?? 0;

  /* The person with the most urgent gap: expired first, then missing. */
  const nextGap = useMemo(() => {
    const exp = scr.find((r) => r.computed_status === 'expired');
    const miss = scr.find((r) => r.computed_status === 'missing');
    return exp ?? miss ?? null;
  }, [scr]);

  const summary = scrLoading
    ? 'Reading the single central record…'
    : stats.total === 0
      ? 'No staff records yet. Add staff under People and their checks appear here.'
      : (() => {
          const gapsBits = [
            stats.expired > 0 ? `${stats.expired} expired` : '',
            stats.missing > 0 ? `${stats.missing} missing` : '',
            stats.expiring > 0 ? `${stats.expiring} expiring within 60 days` : '',
            stats.pending_verification > 0
              ? `${stats.pending_verification} awaiting verification`
              : '',
          ].filter(Boolean);
          return gapsBits.length === 0
            ? `All ${stats.total} staff checks are in date.`
            : `${stats.valid} of ${stats.total} staff checks in date. ${joinAnd(gapsBits).replace(/^./, (c) => c.toUpperCase())}.`;
        })();
  const policyLine = policiesLoading
    ? null
    : pol.live === 0
      ? 'No live policies yet, so staff have nothing to sign.'
      : `${plural(pol.live, 'live policy', 'live policies')}${pol.target > 0 ? `, ${pol.signed} of ${pol.target} signatures collected` : ''}${pol.reviewDue > 0 ? `, ${pol.reviewDue} due a review within 30 days` : ''}.`;

  const primary =
    activeTab === 'policies' ? (
      <button type="button" className={QBTN_PRIMARY} onClick={() => setAddPolicyOpen(true)}>
        Add policy
      </button>
    ) : nextGap ? (
      <button
        type="button"
        className={QBTN_PRIMARY}
        onClick={() => setOpenStaffId(nextGap.college_staff_id)}
      >
        Fix next gap
      </button>
    ) : (
      <button type="button" className={QBTN_PRIMARY} onClick={() => showList('staff')}>
        Update a record
      </button>
    );

  return (
    <div className="space-y-8 sm:space-y-10">
      {embedded ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-[20px] font-bold tracking-tight text-white sm:text-[24px]">
              Staff records and policies
            </h2>
            <p className="mt-1 max-w-3xl text-[14.5px] leading-relaxed text-white">{summary}</p>
            {policyLine && <p className="mt-0.5 text-[13px] text-white">{policyLine}</p>}
          </div>
          <div className="flex flex-wrap gap-2 [&>*]:w-full sm:[&>*]:w-auto">{primary}</div>
        </div>
      ) : (
        <QualityHeader
          eyebrow="Quality and compliance"
          title="Staff records and policies"
          summary={summary}
          sub={
            <>
              {policyLine}
              {nextGap && activeTab === 'staff' && (
                <>
                  {' '}
                  Fix next gap opens {nextGap.name}: {nextGap.requirement ?? 'a check'} is{' '}
                  {nextGap.computed_status === 'expired' ? 'expired' : 'missing'}.
                </>
              )}
            </>
          }
          help={HELP}
          actions={
            isVerifier ? (
              <button
                type="button"
                className={QBTN}
                onClick={() => navigate('/college/compliance/pack')}
              >
                Audit pack
              </button>
            ) : undefined
          }
          primary={primary}
        />
      )}

      <motion.section variants={itemVariants} initial="hidden" animate="visible" className={QCARD}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <p className="mb-3 text-[13px] font-semibold text-white">Records by state</p>
            {scrLoading ? (
              <ChartEmpty text="Loading records…" />
            ) : (
              <div className="max-w-xl">
                <Donut
                  centre={`${inDatePct}%`}
                  centreSub="in date"
                  emptyText="No staff records yet. Add staff under People."
                  segments={scrSegments(stats, () => showList('staff'))}
                />
              </div>
            )}
          </div>
          <div>
            <p className="mb-3 text-[13px] font-semibold text-white">
              Expiring in the next 90 days
            </p>
            {scrLoading ? null : upcoming.length === 0 ? (
              <p className="text-[12.5px] leading-snug text-white">
                Nothing expires in the next 90 days. The next renewals will show here.
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.06]">
                {upcoming.slice(0, 6).map((r) => (
                  <li key={`${r.college_staff_id}-${r.requirement}`}>
                    <button
                      type="button"
                      onClick={() => setOpenStaffId(r.college_staff_id)}
                      className="flex min-h-[48px] w-full items-center gap-3 py-2 text-left touch-manipulation hover:bg-white/[0.03]"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold text-white">
                          {r.name}
                        </span>
                        <span className="block truncate text-[12px] text-white">
                          {r.requirement}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-right text-[12px] font-semibold tabular-nums',
                          r.days <= 60 ? 'text-orange-300' : 'text-white'
                        )}
                      >
                        {r.days < 0
                          ? `${plural(Math.abs(r.days), 'day')} overdue`
                          : r.days === 0
                            ? 'Expires today'
                            : `In ${plural(r.days, 'day')}`}
                        <span className="block text-[12px] font-normal text-white">
                          {fmtDate(r.expires_at as string)}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
                {upcoming.length > 6 && (
                  <li className="pt-2 text-[12px] text-white">and {upcoming.length - 6} more</li>
                )}
              </ul>
            )}
          </div>
        </div>
      </motion.section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2"
      >
        <motion.section variants={itemVariants} className={QCARD}>
          <VisHead
            title="Where the gaps are"
            sub="Expired or missing, by statutory check"
            onOpen={() => showList('staff')}
          />
          <div className="mt-5">
            {scrLoading ? null : gaps.length === 0 ? (
              <ChartEmpty
                text={
                  stats.total === 0
                    ? 'No records yet'
                    : 'No gaps. Every check is on file and in date.'
                }
              />
            ) : (
              <BarList rows={gaps} />
            )}
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className={QCARD}>
          <VisHead
            title="Policies"
            sub="Live policies and how many staff have signed them"
            onOpen={() => showList('policies')}
          />
          {policiesLoading ? null : policies.length === 0 ? (
            <div className="mt-5 space-y-3">
              <ChartEmpty text="No policies yet. Start from a template or add your own." />
              <div className="flex flex-wrap gap-2">
                <button type="button" className={QBTN} onClick={() => setTemplatesOpen(true)}>
                  Browse templates
                </button>
                <button type="button" className={QBTN} onClick={() => setAddPolicyOpen(true)}>
                  Add a policy
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 items-center gap-5 sm:grid-cols-[auto_1fr]">
              <Ring
                pct={pol.pct}
                value={pol.pct === null ? '—' : `${pol.pct}%`}
                label="Acknowledged"
                sub={
                  pol.target > 0
                    ? `${pol.signed} of ${pol.target} signatures`
                    : 'No live policy needs signing'
                }
                warn={pol.pct !== null && pol.pct < 80}
                onClick={() => showList('policies')}
              />
              <div className="min-w-0 space-y-4">
                <SegmentBar
                  segments={[
                    {
                      label: 'Live',
                      n: pol.live,
                      tone: 'good',
                      onClick: () => showList('policies'),
                    },
                    {
                      label: 'Draft',
                      n: pol.draft,
                      tone: 'warn',
                      onClick: () => showList('policies'),
                    },
                    {
                      label: 'Archived',
                      n: pol.archived,
                      tone: 'neutral',
                      onClick: () => showList('policies'),
                    },
                  ]}
                />
                <p
                  className={cn(
                    'text-[12.5px] leading-snug',
                    pol.reviewDue > 0 ? 'text-orange-300' : 'text-white'
                  )}
                >
                  {pol.reviewDue > 0
                    ? `${pol.reviewDue} ${pol.reviewDue === 1 ? 'policy is' : 'policies are'} due a review within 30 days.`
                    : 'No policy reviews due in the next 30 days.'}
                </p>
              </div>
            </div>
          )}
        </motion.section>
      </motion.div>

      <section className="space-y-4">
        <CollegeSectionTitle
          id="compliance-records"
          title={activeTab === 'staff' ? 'Staff records' : 'College policies'}
          sub={
            activeTab === 'staff'
              ? 'DBS, right to work, references and declarations. Tap a person to update their records.'
              : 'Versions and acknowledgement logs are kept automatically.'
          }
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <JoinedToggle<Tab>
            label="Staff records or policies"
            options={[
              { key: 'staff', label: 'Staff records' },
              { key: 'policies', label: 'Policies' },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />
          <label className="relative block w-full sm:max-w-sm">
            <Search
              className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
              aria-hidden
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === 'staff' ? 'Search staff, role or department' : 'Search policies'
              }
              aria-label="Search compliance records"
              className={cn(inputCn, 'pl-7')}
            />
          </label>
        </div>
        {activeTab === 'staff' ? (
          <StaffComplianceList search={searchQuery} onOpen={setOpenStaffId} />
        ) : (
          <PoliciesList
            search={searchQuery}
            onOpen={(id) => navigate(`/college/policies/${id}`)}
            onAdd={() => setAddPolicyOpen(true)}
          />
        )}
      </section>

      <section className="space-y-4">
        <CollegeSectionTitle title="Also here" sub="Inspection views built from these records" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            'grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2',
            isVerifier ? 'xl:grid-cols-4' : 'xl:grid-cols-3'
          )}
        >
          <LinkCard
            title="Ofsted lens"
            body="A live snapshot of your evidence against what inspectors look at."
            onClick={() => navigate('/college/compliance/ofsted')}
          />
          {isVerifier && (
            <LinkCard
              title="Audit pack"
              body="The single central record, policies and sign-off logs, ready to print."
              onClick={() => navigate('/college/compliance/pack')}
            />
          )}
          <LinkCard
            title="Policy templates"
            body="Browse starter policies and copy one in as a draft."
            onClick={() => setTemplatesOpen(true)}
          />
          <LinkCard
            title="Draft a policy"
            body="Give it a topic and get a draft to review, edit and publish. Uses AI."
            onClick={() => setAiAuthorOpen(true)}
          />
        </motion.div>
      </section>

      <StaffComplianceDrawer
        open={!!openStaffId}
        onOpenChange={(open) => {
          if (!open) {
            setOpenStaffId(null);
            setRefreshKey((k) => k + 1);
          }
        }}
        staffId={openStaffId}
      />

      <AddPolicyDialog open={addPolicyOpen} onOpenChange={setAddPolicyOpen} />
      <AiAuthorPolicySheet open={aiAuthorOpen} onOpenChange={setAiAuthorOpen} />
      <PolicyTemplatesSheet open={templatesOpen} onOpenChange={setTemplatesOpen} />
    </div>
  );
}
