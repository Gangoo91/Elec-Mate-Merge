import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import { providerWords } from '@/lib/collegeProviderType';

/* ==========================================================================
   ELE-1922 — Learners and billing, for a college admin or head of department.

   How the college is charged, in its own numbers: learners counted ONCE, at
   the start of the academic year (everyone on a linked cohort that day), the
   count for this year, the cohorts the agreement covers, invoices Elec-Mate
   raised to the college's purchase order, and the renewal date. There are no
   seats: a learner leaving later changes nothing.

   Prices are not shown until Elec-Mate has set them for the college; until
   then the page says the price is on the order form. Read-only: Elec-Mate
   records the count and invoices (Admin → Colleges → Hub colleges).
   ========================================================================== */

interface Billing {
  college_id: string;
  college_name: string;
  provider_type: string | null;
  has_account: boolean;
  pricing_model: 'to_confirm' | 'college_funded';
  college_price_pence: number | null;
  setup_fee_pence: number | null;
  academic_year: string;
  academic_year_start_month: number;
  renewal_date: string | null;
  po_number: string | null;
  billing_contact_name: string | null;
  billing_contact_email: string | null;
  payment_terms_days: number;
  invoice_split: 'annual' | 'two_instalments';
  live: { linked: number; no_cohort: number };
  count: {
    academic_year: string;
    counted_on: string;
    learner_count: number;
    corrected: boolean;
  } | null;
  previous_counts: Array<{ academic_year: string; counted_on: string; learner_count: number }>;
  cohorts: Array<{ id: string; name: string; billing_linked: boolean; learners: number }>;
  invoices: Array<{
    id: string;
    academic_year: string;
    description: string;
    amount_pence: number;
    vat_pence: number;
    invoice_number: string | null;
    po_number: string | null;
    status: 'sent' | 'paid';
    issued_on: string | null;
    due_on: string | null;
    paid_on: string | null;
  }>;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const money = (p: number) =>
  (p / 100).toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: p % 100 ? 2 : 0,
  });
const day = (iso: string | null) =>
  iso
    ? new Date(`${iso.slice(0, 10)}T12:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

const HELP: PageHelpContent = {
  id: 'college-billing',
  title: 'Learners and billing',
  what: 'How Elec-Mate charges your college, using your own numbers: the learners counted for this academic year, the cohorts your agreement covers, invoices and your renewal date.',
  steps: [
    {
      title: 'Counted once a year',
      body: 'At the start of the academic year Elec-Mate counts every learner on a linked cohort. That is the number for the whole year. Nobody is counted again at a new intake or each term.',
    },
    {
      title: 'No seats',
      body: 'A learner who leaves part way through costs nothing more and there is nothing to archive or free up. They keep their own account and record.',
    },
    {
      title: 'Invoices',
      body: 'Elec-Mate sends invoices to your purchase order, paid by bank transfer. They appear here once sent, and show as paid when the money arrives.',
    },
  ],
  notes: [
    {
      title: 'Who sees this page',
      body: 'College admins and heads of department. Elec-Mate records the count and the invoices; if anything looks wrong, use Help and support to tell us.',
    },
  ],
};

export default function CollegeBillingPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['college-billing'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc(
        'get_college_billing' as never,
        { p_college: null } as never
      );
      if (error) throw error;
      return (data ?? null) as Billing | null;
    },
  });
  const words = providerWords(data?.provider_type);

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Learners and billing"
        backTo="/college?section=collegesettings"
      />
      <HubBody hidePushPrompt>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <CollegePageHeader
            eyebrow={words.Noun}
            title="Learners and billing"
            description="Learners are counted once, at the start of the academic year. A learner who leaves later costs nothing more, and there are no seats to manage."
            help={HELP}
          />

          {isLoading ? (
            <div className={cn(COLLEGE_CARD, 'text-[14px] text-white')}>Loading…</div>
          ) : !data ? (
            <CollegeEmpty
              title="For admins and heads of department"
              body={`Billing is shown to ${words.yours}'s admins and heads of department. Ask one of them, or message Elec-Mate from Help and support.`}
              action={
                <button
                  type="button"
                  onClick={() => navigate('/college/help')}
                  className={COLLEGE_BTN}
                >
                  Help and support
                </button>
              }
            />
          ) : (
            <>
              <CollegeStats
                items={[
                  {
                    label: `Counted for ${data.academic_year}`,
                    value: data.count ? String(data.count.learner_count) : 'Not yet',
                    sub: data.count
                      ? `Counted ${day(data.count.counted_on)}`
                      : 'Taken at the start of the year',
                  },
                  {
                    label: 'On linked cohorts now',
                    value: String(data.live.linked),
                    sub: 'For information; the count does not change',
                  },
                  {
                    label: 'Renewal',
                    value: data.renewal_date ? day(data.renewal_date) : 'Not set',
                    sub: data.renewal_date ? 'Agreement runs to this date' : 'Set when you sign',
                  },
                  {
                    label: 'Invoices',
                    value: String(data.invoices.length),
                    sub: data.invoices.some((i) => i.status === 'sent')
                      ? `${data.invoices.filter((i) => i.status === 'sent').length} waiting for payment`
                      : 'Nothing outstanding',
                  },
                ]}
              />

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <motion.section variants={itemVariants} className={cn(COLLEGE_CARD, 'space-y-4')}>
                  <CollegeSectionTitle title="How you are charged" />
                  <div>
                    <p className="text-[12.5px] font-medium text-white">
                      Price per learner per year
                    </p>
                    <p
                      className="mt-1 text-[22px] font-bold text-white"
                      data-testid="billing-price"
                    >
                      {data.pricing_model === 'college_funded' && data.college_price_pence !== null
                        ? money(data.college_price_pence)
                        : 'On your order form'}
                    </p>
                  </div>
                  <ul className="space-y-2.5 text-[13.5px] leading-relaxed text-white">
                    <li>
                      Counted once, at the start of the academic year (
                      {MONTHS[data.academic_year_start_month - 1]}): everyone on a linked cohort
                      that day. Not per term, and not again at each intake.
                    </li>
                    <li>
                      A learner who leaves later costs nothing more. There are no seats to free up
                      or archive.
                    </li>
                    <li>Learners keep their own account and record when they finish or move on.</li>
                    <li>
                      Invoices come from Elec-Mate to your purchase order, paid by bank transfer
                      within {data.payment_terms_days} days
                      {data.invoice_split === 'two_instalments'
                        ? ', in two instalments'
                        : ', once a year in advance'}
                      .
                    </li>
                  </ul>
                  {data.live.no_cohort > 0 && (
                    <p className="rounded-xl border border-orange-400/50 px-3 py-2 text-[13px] text-white">
                      {data.live.no_cohort} learner{data.live.no_cohort === 1 ? ' is' : 's are'} on
                      your roll without a cohort, so they are not on a linked cohort. Put them in a
                      cohort before the count.
                    </p>
                  )}
                </motion.section>

                <motion.section variants={itemVariants} className={cn(COLLEGE_CARD, 'space-y-3')}>
                  <CollegeSectionTitle title="Billing details" />
                  <dl className="grid grid-cols-1 gap-3 text-[13.5px] text-white sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <dt className="text-[12px] font-medium">Purchase order</dt>
                      <dd className="mt-0.5 font-semibold">{data.po_number ?? 'Not given yet'}</dd>
                    </div>
                    <div>
                      <dt className="text-[12px] font-medium">Invoices go to</dt>
                      <dd className="mt-0.5 font-semibold">
                        {data.billing_contact_name || data.billing_contact_email
                          ? [data.billing_contact_name, data.billing_contact_email]
                              .filter(Boolean)
                              .join(', ')
                          : 'Not given yet'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[12px] font-medium">Payment terms</dt>
                      <dd className="mt-0.5 font-semibold">
                        {data.payment_terms_days} days, bank transfer
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[12px] font-medium">Academic year</dt>
                      <dd className="mt-0.5 font-semibold">
                        {data.academic_year}, from {MONTHS[data.academic_year_start_month - 1]}
                      </dd>
                    </div>
                  </dl>
                  <p className="text-[12.5px] leading-relaxed text-white">
                    To change any of this, message Elec-Mate from Help and support.
                  </p>
                </motion.section>
              </div>

              <section className="space-y-3">
                <CollegeSectionTitle
                  title="Cohorts and the count"
                  sub="Linked cohorts are the ones your agreement covers. Their learners are counted at the start of the year."
                />
                {data.cohorts.length === 0 ? (
                  <CollegeEmpty
                    title="No cohorts yet"
                    body="Create cohorts in set-up; new cohorts are linked by default."
                  />
                ) : (
                  <ul className={COLLEGE_LIST}>
                    {data.cohorts.map((c) => (
                      <li
                        key={c.id}
                        className="flex min-h-[56px] items-center gap-3 px-5 py-3 sm:px-6"
                      >
                        <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-white">
                          {c.name}
                        </span>
                        <span className="text-[13px] tabular-nums text-white">
                          {c.learners} learner{c.learners === 1 ? '' : 's'}
                        </span>
                        <span
                          className={cn(
                            'shrink-0 rounded-full border px-2.5 py-0.5 text-[12px] font-semibold',
                            c.billing_linked
                              ? 'border-emerald-400/50 text-emerald-300'
                              : 'border-white/[0.2] text-white'
                          )}
                        >
                          {c.billing_linked ? 'Linked' : 'Not linked'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="space-y-3">
                <CollegeSectionTitle
                  title="Invoices"
                  sub="Raised by Elec-Mate to your purchase order."
                />
                {data.invoices.length === 0 ? (
                  <CollegeEmpty
                    title="No invoices yet"
                    body="Invoices appear here once Elec-Mate has sent them."
                  />
                ) : (
                  <ul className={COLLEGE_LIST}>
                    {data.invoices.map((i) => (
                      <li
                        key={i.id}
                        className="flex min-h-[64px] flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3 sm:px-6"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-medium text-white">
                            {i.description}
                          </p>
                          <p className="text-[12px] text-white">
                            {[
                              i.invoice_number,
                              i.academic_year,
                              i.issued_on && `sent ${day(i.issued_on)}`,
                              i.due_on && i.status === 'sent' && `due ${day(i.due_on)}`,
                            ]
                              .filter(Boolean)
                              .join(' · ')}
                          </p>
                        </div>
                        <span className="text-[14px] font-semibold tabular-nums text-white">
                          {money(i.amount_pence + i.vat_pence)}
                        </span>
                        <span
                          className={cn(
                            'rounded-full border px-2.5 py-0.5 text-[12px] font-semibold',
                            i.status === 'paid'
                              ? 'border-emerald-400/50 text-emerald-300'
                              : 'border-orange-400/50 text-orange-300'
                          )}
                        >
                          {i.status === 'paid' ? `Paid ${day(i.paid_on)}` : 'Waiting'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {data.previous_counts.length > 0 && (
                <section className="space-y-3">
                  <CollegeSectionTitle title="Earlier years" />
                  <ul className={COLLEGE_LIST}>
                    {data.previous_counts.map((c) => (
                      <li
                        key={c.academic_year}
                        className="flex min-h-[52px] items-center gap-3 px-5 py-3 sm:px-6"
                      >
                        <span className="flex-1 text-[14px] text-white">{c.academic_year}</span>
                        <span className="text-[14px] font-semibold tabular-nums text-white">
                          {c.learner_count} learners
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </motion.div>
      </HubBody>
    </HubPage>
  );
}
