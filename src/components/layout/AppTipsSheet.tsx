import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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
        title: 'Diagram Builder',
        body: 'Generate single-line diagrams, circuit layouts and schematics from a brief description.',
        route: ELEC('install-planner'),
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
        body: 'Plan your week, see jobs at a glance, set reminders. Connects with the AI day planner for routing.',
        route: ELEC('business/calendar'),
      },
      {
        title: 'Spark Tasks',
        body: 'Your job to-do list grouped by project, with priorities. Add from site, track to completion.',
        route: ELEC('tasks'),
      },
      {
        title: 'Snagging',
        body: 'Log defects with photos against a project, assign to yourself or a mate, and generate a snag list PDF.',
        route: ELEC('snagging'),
      },
      {
        title: 'Take card payments',
        body: 'Connect Stripe and your invoices include a Pay Now link. Money lands directly in your account.',
        route: SETTINGS_BUSINESS,
      },
      {
        title: 'Accounting sync',
        body: 'Push invoices and expenses to Xero, QuickBooks, Sage or FreeAgent. Set up once in your business settings.',
        route: SETTINGS_BUSINESS,
      },
      {
        title: 'Late payment chasers',
        body: 'Automatic reminder emails for overdue invoices, with a tone that escalates over time. You stay in control.',
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
        body: 'The full text, searchable, with practical notes alongside.',
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
        title: 'Bulk PDF export',
        body: 'Select a date range or project and export every cert, quote and invoice as a single bundle.',
        route: ELEC('invoices'),
      },
      {
        title: 'Search regs from any cert',
        body: 'A reg lookup is one tap from inside the cert forms. Find the right reference without leaving the form.',
        route: ELEC('inspection-testing'),
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 240, damping: 22 },
  },
};

const matchesQuery = (tip: Tip, q: string) => {
  if (!q) return true;
  const needle = q.toLowerCase();
  return tip.title.toLowerCase().includes(needle) || tip.body.toLowerCase().includes(needle);
};

const AppTipsSheet = ({ open, onOpenChange }: AppTipsSheetProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return sections;
    return sections
      .map((s) => ({ ...s, tips: s.tips.filter((t) => matchesQuery(t, query)) }))
      .filter((s) => s.tips.length > 0);
  }, [query]);

  const handleOpen = (route?: string) => {
    if (!route) return;
    onOpenChange(false);
    // tiny delay so sheet close animation doesn't compete with route change
    setTimeout(() => navigate(route), 150);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[92vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Sticky header — editorial: thin gold accent, big title, search */}
          <div className="flex-shrink-0 sticky top-0 z-10 backdrop-blur-xl bg-background/95">
            <div className="h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400" />

            <div className="px-5 sm:px-8 pt-6 pb-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-elec-yellow">
                Tips &amp; Guidance
              </div>
              <h2 className="mt-2 text-[28px] sm:text-[34px] leading-[1.05] font-semibold text-white tracking-tight">
                A guide to every part of Elec-Mate.
              </h2>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tips"
                aria-label="Search tips"
                className={cn(
                  'mt-5 w-full bg-transparent border-0 border-b border-white/15',
                  'text-base text-white placeholder:text-white/35',
                  'pb-2 pt-1 outline-none focus:border-elec-yellow/70 focus:ring-0',
                  'transition-colors touch-manipulation'
                )}
              />
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <motion.div
              className="px-5 sm:px-8 pt-2 pb-20"
              variants={containerVariants}
              initial="hidden"
              animate={open ? 'visible' : 'hidden'}
            >
              {filtered.length === 0 ? (
                <div className="py-20 text-center text-sm text-white/50">
                  No tips match &ldquo;{query}&rdquo;.
                </div>
              ) : (
                filtered.map((section) => (
                  <motion.section
                    key={section.number}
                    variants={sectionVariants}
                    className="pt-10 sm:pt-14 first:pt-6"
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
                      <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-white/65">
                        {section.intro}
                      </p>
                    )}

                    {/* Tips — hairline-separated rows, no icons, no chrome */}
                    <ul className="mt-6 border-t border-white/[0.06]">
                      {section.tips.map((tip) => {
                        const interactive = Boolean(tip.route);
                        return (
                          <li key={tip.title} className="border-b border-white/[0.06]">
                            <button
                              type="button"
                              onClick={() => handleOpen(tip.route)}
                              disabled={!interactive}
                              className={cn(
                                'w-full text-left py-5 sm:py-6 flex items-start gap-6',
                                'group touch-manipulation',
                                interactive
                                  ? 'cursor-pointer hover:bg-white/[0.02] transition-colors'
                                  : 'cursor-default'
                              )}
                            >
                              <div className="flex-1 min-w-0 pr-2">
                                <div className="text-[16px] sm:text-[17px] font-semibold text-white leading-snug">
                                  {tip.title}
                                </div>
                                <p className="mt-1.5 text-[14px] sm:text-[15px] leading-relaxed text-white/65 max-w-[60ch]">
                                  {tip.body}
                                </p>
                              </div>

                              {interactive && (
                                <span
                                  className={cn(
                                    'flex-shrink-0 mt-1 text-[13px] font-medium tracking-wide',
                                    'text-elec-yellow/80 group-hover:text-elec-yellow',
                                    'transition-colors whitespace-nowrap'
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
