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
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegeLinkCard,
  CollegePageHeader,
  CollegeSectionTitle,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { AreaHero } from '@/components/college/student360/Student360AreaHeroes';
import { Ring, VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
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

export function ComplianceDocsSection() {
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

  const fig = (n: number) => (scrLoading ? '—' : String(n));
  const inDatePct = stats.inDatePct ?? 0;

  return (
    <div className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="Quality and compliance"
        title="Staff records and policies"
        description="Every statutory check for every member of staff, and the policies they have to read and sign."
        help={HELP}
        actions={
          <>
            {isVerifier && (
              <button
                type="button"
                className={COLLEGE_BTN}
                onClick={() => navigate('/college/compliance/pack')}
              >
                Audit pack
              </button>
            )}
            <button
              type="button"
              className={COLLEGE_BTN_PRIMARY}
              onClick={() =>
                activeTab === 'policies' ? setAddPolicyOpen(true) : showList('staff')
              }
            >
              {activeTab === 'policies' ? 'Add policy' : 'Update a record'}
            </button>
          </>
        }
      />

      <AreaHero
        figures={[
          {
            label: 'In date',
            value: fig(stats.valid),
            sub: stats.total > 0 ? `of ${stats.total} records, ${inDatePct}%` : 'No records yet',
            good: stats.total > 0 && stats.valid === stats.total,
          },
          {
            label: 'Expiring',
            value: fig(stats.expiring),
            sub: stats.expiring > 0 ? 'Within 60 days. Renew now' : 'Nothing due in 60 days',
            warn: stats.expiring > 0,
          },
          {
            label: 'Expired',
            value: fig(stats.expired),
            sub: stats.expired > 0 ? 'Not valid today' : 'None expired',
            warn: stats.expired > 0,
          },
          {
            label: 'Missing',
            value: fig(stats.missing),
            sub: stats.missing > 0 ? 'Not yet on file' : 'Every record on file',
            warn: stats.missing > 0,
          },
        ]}
        chartTitle="Records by state"
        chart={
          scrLoading ? (
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
          )
        }
        side={
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
                          r.days <= 60 ? 'text-orange-400' : 'text-white'
                        )}
                      >
                        {r.days < 0
                          ? `${Math.abs(r.days)}d overdue`
                          : r.days === 0
                            ? 'Today'
                            : `${r.days}d`}
                        <span className="block text-[11px] font-normal text-white">
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
        }
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2"
      >
        <motion.section variants={itemVariants} className={VIS_CARD}>
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

        <motion.section variants={itemVariants} className={VIS_CARD}>
          <VisHead
            title="Policies"
            sub="Live policies and how many staff have signed them"
            onOpen={() => showList('policies')}
          />
          {policiesLoading ? null : policies.length === 0 ? (
            <div className="mt-5 space-y-3">
              <ChartEmpty text="No policies yet. Start from a template or add your own." />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={COLLEGE_BTN}
                  onClick={() => setTemplatesOpen(true)}
                >
                  Browse templates
                </button>
                <button
                  type="button"
                  className={COLLEGE_BTN}
                  onClick={() => setAddPolicyOpen(true)}
                >
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
                    pol.reviewDue > 0 ? 'text-orange-400' : 'text-white'
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
          <div className="flex flex-wrap gap-2">
            {(
              [
                { value: 'staff', label: 'Staff records' },
                { value: 'policies', label: 'Policies' },
              ] as { value: Tab; label: string }[]
            ).map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setActiveTab(t.value)}
                className={cn(chipCn(activeTab === t.value), 'h-11 px-5')}
              >
                {t.label}
              </button>
            ))}
          </div>
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
          <CollegeLinkCard
            title="Ofsted lens"
            body="A live snapshot of your evidence against what inspectors look at."
            onClick={() => navigate('/college/compliance/ofsted')}
          />
          {isVerifier && (
            <CollegeLinkCard
              title="Audit pack"
              body="The single central record, policies and sign-off logs, ready to print."
              onClick={() => navigate('/college/compliance/pack')}
            />
          )}
          <CollegeLinkCard
            title="Policy templates"
            body="Browse starter policies and copy one in as a draft."
            onClick={() => setTemplatesOpen(true)}
          />
          <CollegeLinkCard
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
