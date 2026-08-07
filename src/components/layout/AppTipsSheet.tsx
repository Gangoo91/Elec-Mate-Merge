import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface AppTipsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Tip {
  title: string;
  body: string;
  route?: string;
}

interface Section {
  number: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tips: Tip[];
}

// Verified routes from AppRouter / ElectricianHubRoutes:
//   /settings?tab=account|business|elec-id
//   /electrician/<feature>
const SETTINGS_ACCOUNT = '/settings?tab=account';
const SETTINGS_BUSINESS = '/settings?tab=business';
const SETTINGS_ELEC_ID = '/settings?tab=elec-id';
const ELEC = (p: string) => `/electrician/${p}`;

const sections: Section[] = [
  {
    number: '01',
    eyebrow: 'Setup',
    title: 'Get set up',
    intro:
      'A few minutes here saves hours later. Your details auto-fill into every cert, quote and invoice you generate.',
    tips: [
      {
        title: 'Profile',
        body: 'Your name, role, ECS card and years of experience. The basics that appear on shared documents.',
        route: SETTINGS_ACCOUNT,
      },
      {
        title: 'Company identity',
        body: 'Business name, address, phone, email, registration and VAT numbers. Pulled into every PDF.',
        route: SETTINGS_BUSINESS,
      },
      {
        title: 'Brand kit',
        body: 'Logo, primary and accent colours, signature. Sets the tone of the documents your clients receive.',
        route: SETTINGS_BUSINESS,
      },
      {
        title: 'Rates and pricing',
        body: 'Default hourly rate, overhead, profit margin, plus per-role rates for electricians, apprentices, labourers and designers.',
        route: SETTINGS_BUSINESS,
      },
      {
        title: 'Inspector details',
        body: 'Qualifications (18th Edition, 2391, AM2), scheme registration (NICEIC, NAPIT, ELECSA), insurance. Auto-fills certificates.',
        route: SETTINGS_BUSINESS,
      },
      {
        title: 'Test instruments',
        body: 'MFTs, insulation testers, loop impedance testers — with serial numbers and calibration dates. Flagged when calibration is due.',
        route: SETTINGS_BUSINESS,
      },
      {
        title: 'Payment and banking',
        body: 'Bank details for invoices. Connect Stripe to take card payments directly from clients.',
        route: SETTINGS_BUSINESS,
      },
    ],
  },
  {
    number: '02',
    eyebrow: 'Compliance',
    title: 'Certificates',
    intro:
      'Every certificate auto-saves to your device first, then syncs. You can finish a job offline and the data is safe.',
    tips: [
      {
        title: 'EICR',
        body: 'The full Electrical Installation Condition Report — board-by-board, schedule of tests, observations and recommendations.',
        route: ELEC('inspection-testing'),
      },
      {
        title: 'EIC and Minor Works',
        body: 'New install certs with all the schedule fields, model-form-accurate, ready to print or email.',
        route: ELEC('inspection-testing'),
      },
      {
        title: 'Solar PV and EV charging',
        body: 'Specialist certs with the right declarations and presets — no need to remember which fields apply.',
        route: ELEC('inspection-testing'),
      },
      {
        title: 'Fire alarm and emergency lighting',
        body: 'Design, installation, commissioning, modification and inspection certs for BS 5839 and BS 5266.',
        route: ELEC('inspection-testing'),
      },
      {
        title: 'Specialist notices',
        body: 'BESS, PAT, Smoke and CO alarm, Lightning Protection, G98 and G99, Permit to Work, Danger and Limitation notices.',
        route: ELEC('inspection-testing'),
      },
      {
        title: 'Board scanner',
        body: 'Snap a photo of a distribution board and the circuit details are read automatically. Cuts out the manual entry.',
        route: ELEC('inspection-testing'),
      },
      {
        title: 'Schedule of tests, fast',
        body: 'Bulk-set RCD results, AFDD results and BS standards across every circuit in one tap.',
        route: ELEC('inspection-testing'),
      },
      {
        title: 'A4:2026 ready',
        body: 'AFDD requirements, updated TN-C-S earthing rules and the new schedule columns are all in the current cert forms.',
      },
    ],
  },
  {
    number: '03',
    eyebrow: 'AI tools',
    title: 'Design, quote, plan',
    intro:
      'Built for the trade. Trained on real pricing data, BS 7671 and the way jobs actually run.',
    tips: [
      {
        title: 'Circuit Designer',
        body: 'Describe an installation. Get cable sizes, protective devices, volt drop and Zs values to BS 7671.',
        route: ELEC('circuit-designer'),
      },
      {
        title: 'Cost Engineer',
        body: 'Itemised quotes from real trade pricing. Specify the job, get a client-ready breakdown with materials and labour.',
        route: ELEC('cost-engineer'),
      },
      {
        title: 'RAMS and method statements',
        body: 'Risk Assessment plus Method Statement, generated from the job description. Hazards, controls, PPE and step-by-step.',
        route: ELEC('health-safety'),
      },
      {
        title: 'Installation Specialist',
        body: 'Step-by-step installation guidance for any kind of electrical work, with regulation references.',
        route: ELEC('installation-specialist'),
      },
      {
        title: 'Room Planner',
        body: 'Draw the walls, drop sockets, lights and switches where they go, and run the cables between them. Several rooms to a plan, saved and exported for the client. Stuck on the shape — let the AI build it from a description.',
        route: ELEC('business/room-planner'),
      },
      {
        title: 'On-site analysis',
        body: 'Photo of a component or fault and get the identification, likely cause and the next thing to check.',
      },
      {
        title: 'BS 7671 lookup',
        body: 'Searchable regulations with practical guidance notes. Find any reg in seconds, from any cert form.',
      },
    ],
  },
  {
    number: '04',
    eyebrow: 'Day to day',
    title: 'Run the business',
    intro: 'The pipeline from enquiry to paid, in one place.',
    tips: [
      {
        title: 'Quotes',
        body: 'Itemised quotes with your rates, materials and labour. Validity period, deposit and warranty terms in your settings.',
        route: ELEC('quotes'),
      },
      {
        title: 'Invoices',
        body: 'Convert a quote to an invoice in one tap, or create one standalone. Bank details and T&Cs auto-fill.',
        route: ELEC('invoices'),
      },
      {
        title: 'Calendar',
        body: 'Plan your week, see jobs at a glance, set reminders. A nudge lands before each one so nothing gets missed.',
        route: ELEC('business/calendar'),
      },
      {
        title: 'Spark Tasks',
        body: 'Your job to-do list grouped by project, with priorities. Add from site, track to completion.',
        route: ELEC('tasks'),
      },
      {
        title: 'Snagging',
        body: 'Log defects with photos against a project and work them off as they are cleared. Photograph a fault and you get a read on what it is and what to check.',
        route: ELEC('snagging'),
      },
      {
        title: 'Take card payments',
        body: 'Connect Stripe and your invoices include a Pay Now link. Money lands directly in your account.',
        route: SETTINGS_BUSINESS,
      },
      {
        title: 'Accounting sync',
        body: 'Push invoices and expenses straight to Xero or QuickBooks. Connect once in your business settings and it keeps itself in step.',
        route: SETTINGS_BUSINESS,
      },
      {
        title: 'Late payment chasers',
        body: 'Overdue invoices are flagged for you daily. Chase with one tap and pick the tone yourself — gentle, firm or final notice. Nothing goes to a client without you sending it.',
        route: ELEC('invoices'),
      },
      {
        title: 'Receipt to expense',
        body: 'Photograph a receipt. Date, supplier, amount and VAT extracted into a logged expense.',
        route: ELEC('expenses'),
      },
    ],
  },
  {
    number: '05',
    eyebrow: 'Learning',
    title: 'Learn and grow',
    intro:
      'Whether you are coming through your apprenticeship or staying current as a qualified spark.',
    tips: [
      {
        title: 'Apprentice Hub',
        body: 'Level 2 and Level 3 with interactive content, mock exams, OJT tracking and progress through the standards.',
      },
      {
        title: 'EPA and AM2 simulators',
        body: 'Knowledge tests, professional discussions, safe isolation, testing and fault finding under exam conditions.',
      },
      {
        title: 'Mood and wellbeing',
        body: 'Weekly check-ins, signposting to the Electrical Industries Charity, Mind, and Samaritans. Private to you.',
      },
      {
        title: 'CPD and upskilling',
        body: 'Courses for qualified electricians on regs, solar PV, EV charging, fire alarm and more.',
      },
      {
        title: 'BS 7671, OSG, GN3',
        body: 'Search the regulations by what you are actually trying to do and get the reg number, what it requires and how it plays out on site. Amendment 4:2026 throughout.',
      },
    ],
  },
  {
    number: '06',
    eyebrow: 'Trade card',
    title: 'Elec-ID',
    intro: 'Your professional identity, sharable in a tap.',
    tips: [
      {
        title: 'Build your trade card',
        body: 'Qualifications, expiry dates, work history, scheme registration. The single source of truth for who you are.',
        route: SETTINGS_ELEC_ID,
      },
      {
        title: 'Generate your CV',
        body: 'A professional CV pulled from your Elec-ID profile, ready to send to employers or contracts.',
        route: ELEC('cv-builder'),
      },
      {
        title: 'Share via QR',
        body: 'A public profile link, with a QR code. Hand it to clients, recruiters, anyone.',
        route: SETTINGS_ELEC_ID,
      },
    ],
  },
  {
    number: '07',
    eyebrow: 'Power user',
    title: 'Pro tips',
    intro: 'Small things that compound over time.',
    tips: [
      {
        title: 'Quick search anywhere',
        body: 'Cmd+K on desktop, or the search button in the header on mobile, jumps straight to any page in the app.',
      },
      {
        title: 'Brand every PDF',
        body: 'Logo, primary and accent colours, signature. Set them once in business settings and every cert, quote and invoice carries your brand.',
        route: SETTINGS_BUSINESS,
      },
      {
        title: 'Quote to invoice in one tap',
        body: 'When a job is done, open the quote and tap Convert. The invoice carries client, line items, rates and bank details across.',
        route: ELEC('quotes'),
      },
      {
        title: 'Let quotes chase themselves',
        body: 'Turn on auto follow-up and an unanswered quote gets chased at 3 days, then again at 7 — then it stops. You get a heads-up before it expires. Invoices are the other way round: you chase those yourself, so nothing goes to a client unless you send it.',
        route: ELEC('quotes'),
      },
      {
        title: 'Let the observation writer word it',
        body: 'Type what you found in your own words and it comes back written up properly — the classification code, the wording and the regulation reference, all from BS 7671.',
        route: ELEC('inspection-testing'),
      },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

// `as const` on type: framer-motion's Variants wants the literal 'spring', not
// a widened string — without it this whole object fails to type-check.
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 240, damping: 22 },
  },
};

const TOTAL_TIPS = sections.reduce((n, s) => n + s.tips.length, 0);

const matchesQuery = (tip: Tip, q: string) => {
  if (!q) return true;
  const needle = q.toLowerCase();
  return tip.title.toLowerCase().includes(needle) || tip.body.toLowerCase().includes(needle);
};

const AppTipsSheet = ({ open, onOpenChange }: AppTipsSheetProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  // Jumping between sections: 40-odd tips across 7 sections is too much to
  // reach by scrolling alone, so the chip row seeks the scroll container.
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const filtered = useMemo(() => {
    if (!query.trim()) return sections;
    return sections
      .map((s) => ({ ...s, tips: s.tips.filter((t) => matchesQuery(t, query)) }))
      .filter((s) => s.tips.length > 0);
  }, [query]);

  const resultCount = useMemo(
    () => filtered.reduce((n, s) => n + s.tips.length, 0),
    [filtered]
  );

  const searching = query.trim().length > 0;

  // Typing a search while scrolled halfway down left you looking at the middle
  // of the result list. Every keystroke changes the results, so go back to the
  // first one. Not smooth — an animated scroll per keystroke is nauseating.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [query]);

  const jumpTo = (number: string) => {
    const el = sectionRefs.current[number];
    const scroller = scrollRef.current;
    if (!el || !scroller) return;
    // offsetTop is measured against the scroll container, which is `relative`
    // for exactly this reason. -8 leaves the heading clear of the sticky edge.
    scroller.scrollTo({ top: Math.max(0, el.offsetTop - 8), behavior: 'smooth' });
  };

  const handleOpen = (route?: string) => {
    if (!route) return;
    onOpenChange(false);
    // tiny delay so sheet close animation doesn't compete with route change
    setTimeout(() => navigate(route), 150);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl border-t border-white/[0.14] bg-[#16161b] p-0 focus:outline-none">
        <div className="flex h-full flex-col">
          {/* Sticky header — title, search, then a jump row for the sections */}
          <div className="sticky top-0 z-10 flex-shrink-0 border-b border-white/[0.10] bg-[#16161b]/95 backdrop-blur-xl">
            <div className="h-[2px] bg-elec-yellow" />

            <div className="px-4 pt-6 pb-4 sm:px-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-elec-yellow">
                Tips &amp; Guidance
              </div>
              <h2 className="mt-2 text-[28px] font-semibold leading-[1.05] tracking-tight text-white sm:text-[34px]">
                A guide to every part of Elec-Mate.
              </h2>

              <div className="mt-5 flex items-center gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${TOTAL_TIPS} tips`}
                  aria-label="Search tips"
                  className={cn(
                    'input-underline h-11 min-w-0 flex-1 rounded-none border-0 border-b border-white/[0.15]',
                    'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25',
                    'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow',
                    'focus:outline-none focus:ring-0 focus-visible:ring-0 touch-manipulation'
                  )}
                />
                {searching && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="h-11 flex-shrink-0 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Searching replaces the jump row with a count — the sections
                  it would scroll to are the ones being filtered away. */}
              {searching ? (
                <div className="mt-3 text-[13px] font-medium text-white">
                  {resultCount} {resultCount === 1 ? 'tip' : 'tips'}
                </div>
              ) : (
                <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8">
                  {sections.map((s) => (
                    <button
                      key={s.number}
                      type="button"
                      onClick={() => jumpTo(s.number)}
                      className={cn(
                        'h-9 flex-shrink-0 rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5',
                        'text-[13px] font-medium whitespace-nowrap text-white',
                        'transition-colors hover:border-elec-yellow/50 hover:bg-elec-yellow/10',
                        'touch-manipulation'
                      )}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Body — `relative` so section offsetTop is measured against this
              scroller, which is what jumpTo() seeks. */}
          <div ref={scrollRef} className="relative flex-1 overflow-y-auto overscroll-contain">
            <motion.div
              className="px-4 pt-2 pb-20 sm:px-8"
              variants={containerVariants}
              initial="hidden"
              animate={open ? 'visible' : 'hidden'}
            >
              {filtered.length === 0 ? (
                <div className="py-20 text-center text-sm text-white">
                  No tips match &ldquo;{query}&rdquo;.
                </div>
              ) : (
                filtered.map((section) => (
                  <motion.section
                    key={section.number}
                    ref={(el) => {
                      sectionRefs.current[section.number] = el;
                    }}
                    variants={sectionVariants}
                    className="pt-10 first:pt-6 sm:pt-14"
                  >
                    {/* Section header — number in yellow, eyebrow, then title */}
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="text-[44px] sm:text-[56px] leading-none font-light text-elec-yellow/80 tabular-nums">
                        {section.number}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
                          {section.eyebrow}
                        </div>
                        <h3 className="mt-1 text-[22px] sm:text-[26px] leading-tight font-semibold text-white tracking-tight">
                          {section.title}
                        </h3>
                      </div>
                    </div>

                    {section.intro && (
                      <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-white">
                        {section.intro}
                      </p>
                    )}

                    {/* Tips as cards. Full-bleed and flush-stacked on a phone,
                        insetting into two columns from lg — the old single
                        column left the Open link stranded ~700px from its own
                        text on a desktop-width sheet. */}
                    <ul className="mt-6 grid grid-cols-1 sm:gap-4 lg:grid-cols-2">
                      {section.tips.map((tip) => {
                        const interactive = Boolean(tip.route);
                        return (
                          <li key={tip.title} className="-mt-px flex sm:mt-0">
                            <button
                              type="button"
                              onClick={() => handleOpen(tip.route)}
                              disabled={!interactive}
                              className={cn(
                                '-mx-4 flex w-[calc(100%+2rem)] flex-col items-start p-4 text-left sm:mx-0 sm:w-full sm:p-5',
                                'rounded-none border-y border-white/[0.14] sm:rounded-2xl sm:border-x',
                                'bg-gradient-to-b from-white/[0.08] to-white/[0.04]',
                                'group touch-manipulation transition-colors',
                                interactive
                                  ? 'cursor-pointer hover:border-elec-yellow/40 hover:from-white/[0.12] hover:to-white/[0.06]'
                                  : 'cursor-default'
                              )}
                            >
                              <div className="text-[16px] font-semibold leading-snug text-white sm:text-[17px]">
                                {tip.title}
                              </div>
                              <p className="mt-1.5 text-[14px] leading-relaxed text-white sm:text-[15px]">
                                {tip.body}
                              </p>

                              {interactive && (
                                <span
                                  className={cn(
                                    'mt-3 inline-flex h-9 items-center rounded-lg bg-elec-yellow/10 px-3',
                                    'text-[13px] font-semibold text-elec-yellow',
                                    'transition-colors group-hover:bg-elec-yellow group-hover:text-black'
                                  )}
                                >
                                  Open →
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.section>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppTipsSheet;
