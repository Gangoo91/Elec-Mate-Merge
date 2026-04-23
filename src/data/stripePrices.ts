export interface FeatureGroup {
  heading: string;
  items: string[];
}

export interface PlanDetails {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featureGroups?: FeatureGroup[];
  notIncluded: string[];
  popular: boolean;
  color: string;
  priceId: string;
  savings?: string;
  coming?: boolean;
  earlyAccess?: boolean;
  pricingOnRequest?: boolean;
  contactEmail?: string;
  ctaLabel?: string;
  inheritsFrom?: string;
}

// Stripe price IDs
export const stripePrices = {
  monthly: {
    apprentice: 'price_1TKlA22RKw5t5RAmpvhojy0b',
    electrician: 'price_1TKlA12RKw5t5RAmdhZyhX1I',
    business_ai: 'price_1T6DUx2RKw5t5RAmpb177NJV',
    employer: 'price_1SlyAT2RKw5t5RAmUmTRGimH',
  },
  yearly: {
    apprentice: 'price_1TKlKK2RKw5t5RAmGVR5EcF9',
    electrician: 'price_1TKlKL2RKw5t5RAmpD8FH7qp',
    business_ai: 'price_1T6DUy2RKw5t5RAmo9HgAukW',
    employer: 'price_1SlyB82RKw5t5RAmN447YJUW',
  },
};

// ─── Feature groups (shared between monthly / yearly — price differs only) ────
const APPRENTICE_GROUPS: FeatureGroup[] = [
  {
    heading: 'Learning paths',
    items: [
      'Level 2, Level 3, AM2, HNC, MOET & Functional Skills',
      '8 mock exams, 500+ practice questions',
      '75 curated training videos',
    ],
  },
  {
    heading: 'Study centre access',
    items: [
      'Full study centre — 24 in-depth courses',
      'Safety: CSCS, IPAF, PASMA, MEWP, working at height',
      'Soft skills: leadership, communication, resilience',
    ],
  },
  {
    heading: 'Study tools',
    items: [
      '75 electrical calculators',
      '29 flashcard sets with spaced repetition',
      'BS 7671 study guide with interactive diagrams',
      '28-guide toolbox: safety cases, craft skills, site jargon',
    ],
  },
  {
    heading: 'On the job',
    items: [
      'Site diary with mood tracking and AI coach',
      'OJT logbook, evidence upload, assessor sign-off',
      'Portfolio builder with quality scoring',
      'EPA simulator and gateway readiness',
      'Career pathways and progression',
    ],
  },
  {
    heading: 'Study AI & wellbeing',
    items: [
      'Ask Dave — AI mentor with chat and image upload',
      'Circuit, Code, Installation and Learning AI assistants',
      'Mental health hub, peer support and crisis resources',
      'Streaks, XP and study leaderboard',
    ],
  },
];

const ELECTRICIAN_GROUPS: FeatureGroup[] = [
  {
    heading: 'AI specialists (9)',
    items: [
      'Circuit Designer, Cost Engineer, Installation, Commissioning',
      'Maintenance, Health & Safety (RAMS), Project Manager',
      'Tutor and Voice AI Assistant',
    ],
  },
  {
    heading: 'Certificates (15 types)',
    items: [
      'EICR, EIC, Minor Works, PAT, Isolation, Testing-Only',
      'Solar PV, EV Charging, BESS, Emergency Lighting',
      'Lightning Protection, Smoke/CO, Commissioning G98/G99',
      'Fire Alarm — Install, Commissioning, Inspection, Design, Mod',
      'Apple & Google Wallet passes for certificates',
    ],
  },
  {
    heading: 'Testing & design',
    items: [
      'AI board scanner — circuit detection from photo',
      'Schedule of tests with progress dashboard',
      'Zs calculator, AI circuit designer, room planner',
    ],
  },
  {
    heading: 'Run your business',
    items: [
      'Customer CRM with timeline and payment analytics',
      'Projects dashboard with linked certs, quotes and photos',
      'Quote builder, Smart AI quote, variation orders',
      'Invoice builder with Stripe links and partial payments',
      'Site visits, photo docs with before/after',
      'Time tracker → auto-invoice, snagging, inventory',
      'Expenses with OCR receipts and HMRC mileage',
    ],
  },
  {
    heading: 'Materials & pricing',
    items: [
      'Live material pricing and regional rates',
      'Materials marketplace, procurement, merchant finder',
      'Price book, rate card and tools marketplace',
    ],
  },
  {
    heading: 'Calculators & finance',
    items: [
      '75 electrical calculators (shared with Apprentice)',
      '13 financial calculators: break-even, hourly rate, job profit, VAT, CIS',
    ],
  },
  {
    heading: 'Health & safety',
    items: [
      'RAMS generator and AI RAMS',
      '1,000+ hazard database, COSHH, permits to work',
      'Fire watch, near-miss reporting, toolbox talks',
    ],
  },
  {
    heading: 'Learning & upskilling',
    items: [
      '13 in-depth upskilling courses — BS 7671, I&T, PAT, Fire Alarm, Solar, EV',
      '11 quick-reference testing guides',
      'Training log to track what you have completed',
    ],
  },
  {
    heading: 'Voice & integrations',
    items: ['Voice-to-form, voice quotes, voice notes', 'Xero / QuickBooks sync, Stripe Connect'],
  },
];

const MATE_GROUPS: FeatureGroup[] = [
  {
    heading: 'Your AI business partner on WhatsApp',
    items: [
      'Morning brief at 7am: schedule, overdue invoices, urgent tasks',
      'Proactive alerts when quotes go stale or clients go quiet',
      'Ask anything: "Zs for a B32 RCBO?" → instant BS 7671 answer with citation',
    ],
  },
  {
    heading: 'Two-way voice — hands-free on site',
    items: [
      'Voice notes in, voice replies back — natural conversation',
      'Perfect in the van, up a ladder, or when hands are dirty',
    ],
  },
  {
    heading: 'Send a photo, Mate does the rest',
    items: [
      'Consumer unit → priced quote draft with materials and labour',
      'Site install → cost estimate and material list',
      'Receipt → logged, VAT captured, synced to Xero / QuickBooks',
    ],
  },
  {
    heading: 'Quotes & invoices, hands-free',
    items: [
      'Draft quotes, auto-follow-up, track opens and clicks',
      'Send quotes with accept / decline buttons in the email',
      'Create invoices with Stripe payment links',
    ],
  },
  {
    heading: 'Calendar, routing & day planner',
    items: [
      '"Plan my day" → TSP-optimised route with live traffic and weather',
      'Create, update, delete events in chat',
    ],
  },
  {
    heading: 'CRM & client portal',
    items: [
      'Look up or update clients by name, phone, email or address',
      'Tokenised portal links — clients see their certs, invoices, quotes',
    ],
  },
  {
    heading: 'Tasks, projects & snagging',
    items: [
      'Create tasks or projects with ordered, auto-dated steps',
      'Snagging lists with photo evidence and resolve workflow',
    ],
  },
  {
    heading: 'RAMS & method statements',
    items: [
      'Full RAMS in ~3 minutes — H&S + Install Planner agents in parallel',
      'Standalone method statements generated on request',
    ],
  },
  {
    heading: 'Expenses, mileage & accounting',
    items: [
      'Photograph a receipt → line items extracted, VAT captured',
      'Mileage logged — HMRC 45p/mile auto-calculated',
      'One-tap sync to Xero or QuickBooks (OAuth)',
    ],
  },
  {
    heading: 'Business intelligence on demand',
    items: [
      'Revenue summary & forecast with growth and weighted pipeline',
      'Cash flow forecast with DSO and at-risk overdue',
      'Per-job profitability: revenue vs. expenses vs. margin',
    ],
  },
  {
    heading: 'Email assistant',
    items: [
      'Connect Gmail or Outlook (OAuth)',
      'AI classifies enquiries and drafts replies — you approve, Mate sends',
    ],
  },
  {
    heading: 'Knowledge & tools',
    items: [
      'BS 7671 A4:2026 end-to-end with instant reg citations',
      'Live UK wholesaler pricing — find the part, compare options',
      'Google Solar API — roof analysis, panel count, 20-year savings',
    ],
  },
];

const EMPLOYER_GROUPS: FeatureGroup[] = [
  {
    heading: 'People Hub',
    items: [
      'Team management with roles and permissions',
      'Elec-ID digital credentials — compliance, renewal alerts, share links',
      'Timesheets — clock in / out, approvals, leave and holiday',
      'Team chat — channels, direct messages, read receipts',
      'Job vacancies — post, applications, interviews, templates',
    ],
  },
  {
    heading: 'Jobs Hub',
    items: [
      'Kanban job board with labels, comments and checklists',
      'Gantt timeline for scheduling and dependencies',
      'GPS worker tracking with live map and location history',
      'Progress logs with photo evidence and full audit trail',
      'Quality & snagging — defect marking, photo compare, sign-off',
      'Testing workflow — drive EICR / EIC sequences per job',
      'Client portal (white-label) — job status, photos, certs, pay links',
    ],
  },
  {
    heading: 'Finance Hub',
    items: [
      'Multi-user quotes, invoices and acceptance tracking',
      'Per-job P&L — budget vs. actual, labour vs. materials vs. overhead',
      'Price book with labour rates, material costs and markup rules',
      'Team expenses and mileage with receipt OCR',
      'Procurement — orders, suppliers, PAT & calibration',
      'Reports — revenue, profitability, utilisation, debtor aging',
    ],
  },
  {
    heading: 'Safety Hub',
    items: [
      'RAMS generator + AI RAMS (3-minute pipeline)',
      'Incident reporting, near-miss log, witness testimonies',
      '1,000+ hazard database, COSHH builder, permits to work',
      'Training records with CPD log and certification expiry alerts',
      'Toolbox briefings with QR sign-off and photo distribution',
    ],
  },
  {
    heading: 'Smart Docs — AI document generation',
    items: [
      'AI Design Spec from a brief',
      'AI Method Statement',
      'AI Quote Generator',
      'All generated to branded PDF',
    ],
  },
  {
    heading: 'Automations & settings',
    items: [
      'Rules engine for compliance, jobs, finance and HR triggers',
      'Company branding — logo, colours, bank details',
      'Integrations: Xero, Sage, Google Workspace, Dropbox',
    ],
  },
];

const COLLEGE_GROUPS: FeatureGroup[] = [
  {
    heading: 'Run your college',
    items: [
      'College overview dashboard with KPIs and activity feed',
      'Cohort and student management with roster imports',
      'Tutor management — assignment, caseload and tracking',
      'Support staff management',
      'Bulk student invites and onboarding flows',
      'Student assignment tracking',
      'College settings — branding, compliance contacts, notifications',
    ],
  },
  {
    heading: 'Teaching & learning',
    items: [
      'Lesson plans and teaching resources library',
      'Course and curriculum mapping',
      'Attendance registers with absence reasons',
      'Grading and mark entry',
      'Scheduled assessments with reminders',
      'Portfolio review with comments and signatures',
      'Access to the full Elec-Mate study centre for every learner',
    ],
  },
  {
    heading: 'Apprenticeship compliance',
    items: [
      'Individual Learning Plans (ILPs) with milestone tracking',
      '20% off-the-job hours logging and review',
      'EPA gateway tracking and readiness snapshots',
      'End-point assessment (EPA) simulator per learner',
      'IQA sampling records, findings and corrective actions',
      'Standardisation meetings with minutes and attendees',
      'Workplace visits with photo evidence',
      'Compliance document tracking and renewals',
      '140 apprenticeship KSBs mapped to evidence',
      'Evidence quality validations with tutor feedback',
    ],
  },
  {
    heading: 'Integrations & data',
    items: [
      'LTI 1.3 SSO — Canvas, Moodle, Blackboard, D2L',
      'LTI grade passback',
      'LTI roster sync',
      'Tokenised tool launches and resource links',
      'College activity audit log for Ofsted and EQA',
    ],
  },
];

// Flatten helper so the legacy `features` field stays populated
const flatten = (groups: FeatureGroup[]) => groups.flatMap((g) => g.items);

// Native App Store / Google Play fallback prices (only Apprentice + Electrician on native)
export const nativePriceData = {
  monthly: [
    {
      id: 'apprentice-monthly',
      name: 'Apprentice',
      price: '£6.99',
      period: '/month',
      description: 'Study, test and track your apprenticeship',
      featureGroups: APPRENTICE_GROUPS,
      features: flatten(APPRENTICE_GROUPS),
      notIncluded: [],
      popular: false,
      color: '',
      priceId: '',
    },
    {
      id: 'electrician-monthly',
      name: 'Electrician',
      price: '£14.99',
      period: '/month',
      description: 'Certs, AI agents, CRM and the full business toolkit',
      featureGroups: ELECTRICIAN_GROUPS,
      features: flatten(ELECTRICIAN_GROUPS),
      notIncluded: [],
      popular: true,
      color: '',
      priceId: '',
    },
  ],
  yearly: [
    {
      id: 'apprentice-yearly',
      name: 'Apprentice',
      price: '£69.99',
      period: '/year',
      description: 'Study, test and track your apprenticeship',
      featureGroups: APPRENTICE_GROUPS,
      features: flatten(APPRENTICE_GROUPS),
      notIncluded: [],
      popular: false,
      color: '',
      savings: 'Save £13.89 vs monthly',
      priceId: '',
    },
    {
      id: 'electrician-yearly',
      name: 'Electrician',
      price: '£149.99',
      period: '/year',
      description: 'Certs, AI agents, CRM and the full business toolkit',
      featureGroups: ELECTRICIAN_GROUPS,
      features: flatten(ELECTRICIAN_GROUPS),
      notIncluded: [],
      popular: true,
      color: '',
      savings: 'Save £29.89 vs monthly',
      priceId: '',
    },
  ],
};

// Web (Stripe) subscription data — 5 plans
export const stripePriceData = {
  monthly: [
    {
      id: 'apprentice-monthly',
      name: 'Apprentice',
      price: '£5.99',
      period: '/month',
      description: 'Study, test and track your apprenticeship',
      featureGroups: APPRENTICE_GROUPS,
      features: flatten(APPRENTICE_GROUPS),
      notIncluded: [],
      popular: false,
      color: '',
      priceId: stripePrices.monthly.apprentice,
    },
    {
      id: 'electrician-monthly',
      name: 'Electrician',
      price: '£12.99',
      period: '/month',
      description: 'Certs, AI agents, CRM and the full business toolkit',
      featureGroups: ELECTRICIAN_GROUPS,
      features: flatten(ELECTRICIAN_GROUPS),
      notIncluded: [],
      popular: true,
      color: '',
      priceId: stripePrices.monthly.electrician,
      inheritsFrom: 'Apprentice',
    },
    {
      id: 'business-ai-monthly',
      name: 'Mate',
      price: '£29.99',
      period: '/month',
      description: 'Your AI assistant on WhatsApp — handles admin while you work',
      featureGroups: MATE_GROUPS,
      features: flatten(MATE_GROUPS),
      notIncluded: [],
      popular: false,
      color: '',
      priceId: stripePrices.monthly.business_ai,
      earlyAccess: true,
      inheritsFrom: 'Electrician',
    },
    {
      id: 'employer-monthly',
      name: 'Employer',
      price: '£49.99',
      period: '/month',
      description: 'Run the whole firm — team, jobs, finance, safety',
      featureGroups: EMPLOYER_GROUPS,
      features: flatten(EMPLOYER_GROUPS),
      notIncluded: [],
      popular: false,
      color: '',
      priceId: stripePrices.monthly.employer,
      earlyAccess: true,
      inheritsFrom: 'Mate',
    },
    {
      id: 'college-monthly',
      name: 'College',
      price: 'Pricing on request',
      period: '',
      description: 'Full college tutor dashboard for apprenticeship providers',
      featureGroups: COLLEGE_GROUPS,
      features: flatten(COLLEGE_GROUPS),
      notIncluded: [],
      popular: false,
      color: '',
      priceId: '',
      pricingOnRequest: true,
      earlyAccess: true,
      ctaLabel: 'Get in touch',
      contactEmail: 'founder@elec-mate.com',
    },
  ],
  yearly: [
    {
      id: 'apprentice-yearly',
      name: 'Apprentice',
      price: '£59.99',
      period: '/year',
      description: 'Study, test and track your apprenticeship',
      featureGroups: APPRENTICE_GROUPS,
      features: flatten(APPRENTICE_GROUPS),
      notIncluded: [],
      popular: false,
      color: '',
      savings: 'Save £11.89 vs monthly',
      priceId: stripePrices.yearly.apprentice,
    },
    {
      id: 'electrician-yearly',
      name: 'Electrician',
      price: '£129.99',
      period: '/year',
      description: 'Certs, AI agents, CRM and the full business toolkit',
      featureGroups: ELECTRICIAN_GROUPS,
      features: flatten(ELECTRICIAN_GROUPS),
      notIncluded: [],
      popular: true,
      color: '',
      savings: 'Save £25.89 vs monthly',
      priceId: stripePrices.yearly.electrician,
      inheritsFrom: 'Apprentice',
    },
    {
      id: 'business-ai-yearly',
      name: 'Mate',
      price: '£299.99',
      period: '/year',
      description: 'Your AI assistant on WhatsApp — handles admin while you work',
      featureGroups: MATE_GROUPS,
      features: flatten(MATE_GROUPS),
      notIncluded: [],
      popular: false,
      color: '',
      savings: 'Save £59.89 vs monthly',
      priceId: stripePrices.yearly.business_ai,
      earlyAccess: true,
      inheritsFrom: 'Electrician',
    },
    {
      id: 'employer-yearly',
      name: 'Employer',
      price: '£499.99',
      period: '/year',
      description: 'Run the whole firm — team, jobs, finance, safety',
      featureGroups: EMPLOYER_GROUPS,
      features: flatten(EMPLOYER_GROUPS),
      notIncluded: [],
      popular: false,
      color: '',
      savings: 'Save £99.89 vs monthly',
      priceId: stripePrices.yearly.employer,
      earlyAccess: true,
      inheritsFrom: 'Mate',
    },
    {
      id: 'college-yearly',
      name: 'College',
      price: 'Pricing on request',
      period: '',
      description: 'Full college tutor dashboard for apprenticeship providers',
      featureGroups: COLLEGE_GROUPS,
      features: flatten(COLLEGE_GROUPS),
      notIncluded: [],
      popular: false,
      color: '',
      priceId: '',
      pricingOnRequest: true,
      earlyAccess: true,
      ctaLabel: 'Get in touch',
      contactEmail: 'founder@elec-mate.com',
    },
  ],
};
