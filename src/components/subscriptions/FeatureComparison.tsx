import { useState } from 'react';
import { Check, Minus, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Tiers ─────────────────────────────────────────────────────────────────
type Tier = 'apprentice' | 'electrician' | 'mate' | 'employer' | 'college';

const TIERS: { key: Tier; name: string; price: string; earlyAccess?: boolean; popular?: boolean }[] =
  [
    { key: 'apprentice', name: 'Apprentice', price: '£5.99/mo' },
    { key: 'electrician', name: 'Electrician', price: '£12.99/mo', popular: true },
    { key: 'mate', name: 'Mate', price: '£29.99/mo', earlyAccess: true },
    { key: 'employer', name: 'Employer', price: '£49.99/mo', earlyAccess: true },
    { key: 'college', name: 'College', price: 'On request', earlyAccess: true },
  ];

// Expand "minTier" into the list of plans that include the feature, respecting inheritance:
//   apprentice → electrician → mate → employer   (college is a separate track)
function expand(minTier: Tier): Tier[] {
  if (minTier === 'apprentice') return ['apprentice', 'electrician', 'mate', 'employer'];
  if (minTier === 'electrician') return ['electrician', 'mate', 'employer'];
  if (minTier === 'mate') return ['mate', 'employer'];
  if (minTier === 'employer') return ['employer'];
  return ['college'];
}

interface MatrixRow {
  label: string;
  availableIn: Tier[];
}

interface MatrixSection {
  heading: string;
  rows: MatrixRow[];
}

const row = (label: string, minTier: Tier, extra?: Tier[]): MatrixRow => ({
  label,
  availableIn: Array.from(new Set([...expand(minTier), ...(extra ?? [])])),
});

const SECTIONS: MatrixSection[] = [
  {
    heading: 'Learning & qualifications',
    rows: [
      row('Level 2, Level 3, AM2, HNC, MOET & Functional Skills', 'apprentice'),
      row('500+ practice questions & 8 mock exams', 'apprentice'),
      row('29 flashcard sets with spaced repetition', 'apprentice'),
      row('75 curated training videos', 'apprentice'),
      row('BS 7671 A4:2026 study guide with interactive diagrams', 'apprentice'),
      row('28-guide toolbox — safety cases, craft skills, site jargon', 'apprentice'),
      row('Full study centre — 24 courses (CSCS, IPAF, PASMA, soft skills)', 'apprentice'),
      row('13 in-depth upskilling courses (BS 7671, I&T, PAT, Fire Alarm, Solar, EV)', 'electrician'),
      row('11 quick-reference testing guides', 'electrician'),
      row('Training log', 'electrician'),
    ],
  },
  {
    heading: 'Calculators & tools',
    rows: [
      row('75 electrical calculators', 'apprentice'),
      row('13 financial calculators (break-even, hourly rate, VAT, CIS…)', 'electrician'),
    ],
  },
  {
    heading: 'On-the-job apprentice tools',
    rows: [
      row('Site diary with mood tracking & AI coach', 'apprentice'),
      row('OJT logbook, evidence upload & assessor sign-off', 'apprentice'),
      row('Portfolio builder with quality scoring', 'apprentice'),
      row('EPA simulator & gateway readiness', 'apprentice'),
      row('Career pathways & progression', 'apprentice'),
    ],
  },
  {
    heading: 'Study AI & wellbeing',
    rows: [
      row('Ask Dave — AI mentor with chat & image upload', 'apprentice'),
      row('Circuit, Code, Installation & Learning AI assistants', 'apprentice'),
      row('Mental health hub, peer support, crisis resources', 'apprentice'),
      row('Streaks, XP & study leaderboard', 'apprentice'),
    ],
  },
  {
    heading: 'AI specialists',
    rows: [
      row('Circuit Designer, Cost Engineer, Installation, Commissioning', 'electrician'),
      row('Maintenance, Health & Safety (RAMS), Project Manager, Tutor', 'electrician'),
      row('Voice AI Assistant', 'electrician'),
    ],
  },
  {
    heading: 'Certificates (15 types)',
    rows: [
      row('EICR, EIC, Minor Works', 'electrician'),
      row('PAT, Isolation, Testing-Only, Smoke/CO', 'electrician'),
      row('Solar PV, EV Charging, BESS, Emergency Lighting, Lightning Protection', 'electrician'),
      row('Commissioning G98 / G99', 'electrician'),
      row('Fire Alarm — Install, Commissioning, Inspection, Design, Modification', 'electrician'),
      row('Apple & Google Wallet passes for certificates', 'electrician'),
    ],
  },
  {
    heading: 'Testing & design',
    rows: [
      row('AI board scanner — circuit detection from photo', 'electrician'),
      row('Schedule of tests with progress dashboard', 'electrician'),
      row('Zs calculator, AI circuit designer, room planner', 'electrician'),
    ],
  },
  {
    heading: 'Business tools',
    rows: [
      row('Customer CRM with timeline & payment analytics', 'electrician'),
      row('Projects dashboard with linked certs, quotes, photos', 'electrician'),
      row('Quote builder + Smart AI quote + variation orders', 'electrician'),
      row('Invoice builder with Stripe links & partial payments', 'electrician'),
      row('Site visits, photo docs with before/after', 'electrician'),
      row('Time tracker → auto-invoice', 'electrician'),
      row('Snagging', 'electrician'),
      row('Inventory / van stock', 'electrician'),
      row('Expenses with OCR receipts & HMRC mileage', 'electrician'),
      row('Price book, rate card', 'electrician'),
    ],
  },
  {
    heading: 'Materials & pricing',
    rows: [
      row('Live material pricing & regional rates', 'electrician'),
      row('Materials marketplace, procurement, merchant finder', 'electrician'),
      row('Tools marketplace', 'electrician'),
    ],
  },
  {
    heading: 'Health & safety',
    rows: [
      row('RAMS generator + AI RAMS', 'electrician'),
      row('1,000+ hazard database & COSHH builder', 'electrician'),
      row('Permits to work, fire watch, near-miss reporting', 'electrician'),
      row('Toolbox talks & pre-use checks', 'electrician'),
    ],
  },
  {
    heading: 'Integrations',
    rows: [
      row('Xero / QuickBooks sync', 'electrician'),
      row('Stripe Connect', 'electrician'),
    ],
  },
  {
    heading: 'Mate — WhatsApp AI',
    rows: [
      row('Mate on WhatsApp (chat, voice, photos)', 'mate'),
      row('Two-way voice conversations — speak to Mate, it speaks back', 'mate'),
      row('Photo → quote pipeline (consumer unit, site install, receipt)', 'mate'),
      row('Forward customer email → Mate drafts the reply', 'mate'),
      row('Voice notes → tasks, quotes, expenses, RAMS', 'mate'),
      row('BS 7671 A4:2026 answers — AFDDs, PNB, Zs, cable ratings', 'mate'),
      row('Live UK wholesaler pricing lookup with options', 'mate'),
      row('"Plan my day" — TSP route optimisation + weather', 'mate'),
      row('Daily morning brief (schedule, overdue, urgent)', 'mate'),
      row('Quote drafting + auto-follow-up + open/click tracking', 'mate'),
      row('Invoice chasing workflows with Stripe links', 'mate'),
      row('Revenue forecast, cash-flow, at-risk alerts', 'mate'),
      row('RAMS + method statements generated in chat', 'mate'),
      row('Client portal tokens generated on demand', 'mate'),
      row('Expenses + HMRC mileage synced to Xero / QuickBooks', 'mate'),
      row('Google Solar API roof analysis', 'mate'),
    ],
  },
  {
    heading: 'Employer — People Hub',
    rows: [
      row('Team management with roles & RBAC permissions', 'employer'),
      row('Elec-ID digital credentials — compliance, renewal alerts', 'employer'),
      row('Timesheets, leave & holiday allowances', 'employer'),
      row('Team chat — channels, DMs, reactions, read receipts', 'employer'),
      row('Announcements & team-wide briefings', 'employer'),
      row('Talent pool — browse electricians, filter by skills', 'employer'),
      row('Job vacancies — post, applications, interviews, templates', 'employer'),
    ],
  },
  {
    heading: 'Employer — Jobs Hub',
    rows: [
      row('Kanban job board with labels & checklists', 'employer'),
      row('Gantt timeline for scheduling & dependencies', 'employer'),
      row('Job packs with scope, docs, client sign-offs', 'employer'),
      row('GPS worker tracking with live map & location history', 'employer'),
      row('Progress logs with photo evidence & audit trail', 'employer'),
      row('Quality & snagging with before/after compare', 'employer'),
      row('Testing workflow — manage EICR / EIC per job', 'employer'),
      row('Client portal (white-label)', 'employer'),
      row('Fleet — vehicles, daily checks, services, fuel, tools', 'employer'),
      row('Photo gallery — timeline, map view, before / after', 'employer'),
      row('Variation orders with approval workflow', 'employer'),
    ],
  },
  {
    heading: 'Employer — Finance Hub',
    rows: [
      row('Multi-user quotes, invoices & acceptance tracking', 'employer'),
      row('Tender search & bid pipeline', 'employer'),
      row('Per-job P&L — budget vs. actual', 'employer'),
      row('Price book with labour rates & markup rules', 'employer'),
      row('Team expenses & mileage with OCR', 'employer'),
      row('Procurement — orders, suppliers, PAT & calibration', 'employer'),
      row('Reports — revenue, profitability, debtor aging', 'employer'),
      row('Digital signatures', 'employer'),
      row('Stripe Connect for bank payouts', 'employer'),
    ],
  },
  {
    heading: 'Employer — Safety Hub',
    rows: [
      row('Incident reporting, near-miss log, witness testimonies', 'employer'),
      row('Policies with versioning & acknowledgement tracking', 'employer'),
      row('Contracts — employment, subcontractor, HR templates', 'employer'),
      row('Training records with CPD log & expiry alerts', 'employer'),
      row('Toolbox briefings with QR sign-off & photo distribution', 'employer'),
      row('Compliance calendar with insurance, PAT & calibration', 'employer'),
      row('Corrective actions & observations', 'employer'),
    ],
  },
  {
    heading: 'Employer — Smart Docs & automation',
    rows: [
      row('AI Design Spec', 'employer'),
      row('AI Method Statement', 'employer'),
      row('AI Briefing Pack with photos', 'employer'),
      row('AI Quote Generator', 'employer'),
      row('Automations rule engine', 'employer'),
      row('Integrations: Xero, Sage, Google Workspace, Dropbox', 'employer'),
      row('Webhooks to Slack / Teams', 'employer'),
    ],
  },
  {
    heading: 'College — Run your college',
    rows: [
      row('College overview dashboard with KPIs', 'college'),
      row('Cohort & student management with roster imports', 'college'),
      row('Tutor management — assignment, caseload, tracking', 'college'),
      row('Support staff management', 'college'),
      row('Bulk student invites & onboarding', 'college'),
      row('Student assignment tracking', 'college'),
    ],
  },
  {
    heading: 'College — Teaching & learning',
    rows: [
      row('Lesson plans & teaching resources library', 'college'),
      row('Course & curriculum mapping', 'college'),
      row('Attendance registers with absence reasons', 'college'),
      row('Grading & mark entry', 'college'),
      row('Scheduled assessments with reminders', 'college'),
      row('Portfolio review with comments & signatures', 'college'),
      row('Full Elec-Mate study centre for every learner', 'college'),
    ],
  },
  {
    heading: 'College — Apprenticeship compliance',
    rows: [
      row('Individual Learning Plans (ILPs) with milestones', 'college'),
      row('20% off-the-job hours logging & review', 'college'),
      row('EPA gateway tracking & readiness snapshots', 'college'),
      row('EPA simulator per learner', 'college'),
      row('IQA sampling, findings & corrective actions', 'college'),
      row('Standardisation meetings with minutes', 'college'),
      row('Workplace visits with photo evidence', 'college'),
      row('Compliance document tracking & renewals', 'college'),
      row('140 apprenticeship KSBs mapped to evidence', 'college'),
      row('Evidence quality validations with tutor feedback', 'college'),
    ],
  },
  {
    heading: 'College — Integrations & data',
    rows: [
      row('LTI 1.3 SSO — Canvas, Moodle, Blackboard, D2L', 'college'),
      row('LTI grade passback', 'college'),
      row('LTI roster sync', 'college'),
      row('Tokenised tool launches & resource links', 'college'),
      row('Activity audit log for Ofsted & EQA', 'college'),
    ],
  },
];

// ─── Cell renderer ─────────────────────────────────────────────────────────
const Cell = ({ included, tier }: { included: boolean; tier: Tier }) => {
  if (!included) return <Minus className="h-4 w-4 text-white/20" aria-label="Not included" />;
  const earlyAccess = tier === 'mate' || tier === 'employer' || tier === 'college';
  return (
    <Check
      className={cn(
        'h-4 w-4',
        earlyAccess ? 'text-amber-400' : 'text-elec-yellow'
      )}
      aria-label="Included"
    />
  );
};

// ─── Component ─────────────────────────────────────────────────────────────
const FeatureComparison = () => {
  const [openPlan, setOpenPlan] = useState<string | null>(null);

  return (
    <section id="compare" className="space-y-5 scroll-mt-16">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Compare all features
        </h2>
        <p className="text-[13px] text-white/70 mt-1">
          Every capability across the five plans. <span className="text-amber-400">Amber ticks</span>{' '}
          mark early-access plans.
        </p>
      </div>

      {/* Mobile — per-plan accordion */}
      <div className="lg:hidden space-y-2">
        {TIERS.map((tier) => {
          const isOpen = openPlan === tier.key;
          const included = SECTIONS.flatMap((s) =>
            s.rows.filter((r) => r.availableIn.includes(tier.key)).map((r) => ({ ...r, section: s.heading }))
          );
          return (
            <div
              key={tier.key}
              className={cn(
                'rounded-xl border overflow-hidden bg-white/[0.02]',
                isOpen
                  ? tier.popular
                    ? 'border-elec-yellow/40'
                    : tier.earlyAccess
                      ? 'border-amber-500/30'
                      : 'border-white/20'
                  : 'border-white/[0.06]'
              )}
            >
              <button
                onClick={() => setOpenPlan(isOpen ? null : tier.key)}
                className="flex items-center gap-3 w-full p-4 text-left touch-manipulation min-h-[52px]"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white">{tier.name}</span>
                    {tier.popular && (
                      <span className="text-[10px] font-bold text-black bg-elec-yellow px-1.5 py-0.5 rounded">
                        POPULAR
                      </span>
                    )}
                    {tier.earlyAccess && (
                      <span className="text-[10px] font-bold text-amber-400 border border-amber-400/40 px-1.5 py-0.5 rounded">
                        EARLY ACCESS
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-white/70">{tier.price}</span>
                </div>
                <span className="text-[11px] text-white/60 tabular-nums">
                  {included.length} features
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white/60 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-white/[0.04] pt-3">
                  {SECTIONS.map((section) => {
                    const rows = section.rows.filter((r) => r.availableIn.includes(tier.key));
                    if (rows.length === 0) return null;
                    return (
                      <div key={section.heading} className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50">
                          {section.heading}
                        </p>
                        <ul className="space-y-1">
                          {rows.map((r, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check
                                className={cn(
                                  'h-3.5 w-3.5 shrink-0 mt-0.5',
                                  tier.earlyAccess ? 'text-amber-400' : 'text-elec-yellow'
                                )}
                              />
                              <span className="text-[13px] text-white/85 leading-snug">
                                {r.label}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop — full matrix */}
      <div className="hidden lg:block rounded-2xl border border-white/[0.08] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[minmax(0,1fr)_repeat(5,110px)] bg-white/[0.03] border-b border-white/[0.08]">
          <div className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/60">
            Feature
          </div>
          {TIERS.map((tier) => (
            <div
              key={tier.key}
              className={cn(
                'px-2 py-4 text-center',
                tier.popular && 'bg-elec-yellow/[0.06]',
                tier.earlyAccess && !tier.popular && 'bg-amber-500/[0.04]'
              )}
            >
              <div
                className={cn(
                  'text-sm font-bold',
                  tier.popular ? 'text-elec-yellow' : tier.earlyAccess ? 'text-amber-400' : 'text-white'
                )}
              >
                {tier.name}
              </div>
              <div className="text-[11px] text-white/60 mt-0.5">{tier.price}</div>
              {tier.earlyAccess && (
                <div className="text-[10px] font-semibold text-amber-400 mt-1 uppercase tracking-wide">
                  Early access
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            <div className="grid grid-cols-[minmax(0,1fr)_repeat(5,110px)] bg-white/[0.015] border-t border-white/[0.04]">
              <div className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 col-span-6">
                {section.heading}
              </div>
            </div>
            {section.rows.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-[minmax(0,1fr)_repeat(5,110px)] border-t border-white/[0.03] hover:bg-white/[0.015] transition-colors"
              >
                <div className="px-5 py-2.5 text-[13px] text-white/80 leading-snug">{r.label}</div>
                {TIERS.map((tier) => (
                  <div
                    key={tier.key}
                    className={cn(
                      'flex justify-center items-center py-2.5',
                      tier.popular && 'bg-elec-yellow/[0.02]',
                      tier.earlyAccess && !tier.popular && 'bg-amber-500/[0.015]'
                    )}
                  >
                    <Cell included={r.availableIn.includes(tier.key)} tier={tier.key} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureComparison;
