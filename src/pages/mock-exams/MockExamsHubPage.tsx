/**
 * MockExamsHubPage — /mock-exams index.
 *
 * Lists all 37 free mock exams grouped by category. Designed as a share-target
 * (clean URL, branded card grid) for Facebook trade groups + apprentice chats.
 */
import { Link } from 'react-router-dom';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import useSEO from '@/hooks/useSEO';
import { GraduationCap, HardHat, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

interface ExamCard {
  slug: string;
  title: string;
  qCount: number;
  blurb: string;
}

const TRADE_CERTS: ExamCard[] = [
  {
    slug: 'cscs-card',
    title: 'CSCS Card Mock Test',
    qCount: 200,
    blurb: 'HS&E test practice — general site safety, electrical, COSHH, manual handling.',
  },
  {
    slug: 'first-aid',
    title: 'First Aid at Work',
    qCount: 200,
    blurb: 'CPR, choking, severe bleeding, shock, secondary survey.',
  },
  {
    slug: 'ipaf',
    title: 'IPAF MEWP Operator',
    qCount: 200,
    blurb: 'Categories 1a, 1b, 3a, 3b — pre-use checks, harnesses, exclusion zones.',
  },
  {
    slug: 'pasma',
    title: 'PASMA Towers for Users',
    qCount: 200,
    blurb: 'Aluminium tower assembly, bracing, max working heights, dismantling.',
  },
  {
    slug: 'asbestos-awareness',
    title: 'Asbestos Awareness (Cat A)',
    qCount: 200,
    blurb: 'UKATA/IATP — ACMs, CAR 2012, duty to manage, emergency response.',
  },
  {
    slug: 'working-at-height',
    title: 'Working at Height (WAHR 2005)',
    qCount: 200,
    blurb: 'Hierarchy of control, ladder safety, fall arrest vs restraint, rescue plans.',
  },
  {
    slug: 'manual-handling',
    title: 'Manual Handling (MHOR 1992)',
    qCount: 200,
    blurb: 'TILE assessment, MAC tool, team lifts, mechanical aids.',
  },
  {
    slug: 'coshh',
    title: 'COSHH (Hazardous Substances)',
    qCount: 200,
    blurb: 'WELs, safety data sheets, RPE selection, biological agents.',
  },
  {
    slug: 'fire-safety',
    title: 'Fire Safety Awareness',
    qCount: 200,
    blurb: 'Fire classes A-F, extinguisher choice, alarm categories, evacuation.',
  },
  {
    slug: 'confined-spaces',
    title: 'Confined Spaces (CSR 1997)',
    qCount: 200,
    blurb: 'Specified risks, atmospheric testing, permits, rescue arrangements.',
  },
];

const ELECTRICAL_EXAMS: ExamCard[] = [
  {
    slug: '18th-edition-bs-7671',
    title: '18th Edition BS 7671 (A4:2026)',
    qCount: 300,
    blurb: 'Chapter 41 protection, RCDs, AFDDs, EV charging, special locations.',
  },
  {
    slug: '2391-inspection-testing',
    title: 'C&G 2391 Inspection & Testing',
    qCount: 300,
    blurb: 'Initial verification, periodic inspection, EICR coding, GN3 sequence.',
  },
  {
    slug: 'am2-online-knowledge-test',
    title: 'AM2 Online Knowledge Test',
    qCount: 177,
    blurb: 'Section E online theory — H&S, BS 7671, safe isolation, fault diagnosis.',
  },
  {
    slug: 'pat-testing',
    title: 'PAT Testing (C&G 2377)',
    qCount: 120,
    blurb: 'In-service inspection and testing, equipment classes, EAWR duties, records.',
  },
  {
    slug: 'emergency-lighting',
    title: 'Emergency Lighting (BS 5266)',
    qCount: 300,
    blurb: 'Maintained vs non-maintained, 3-hour duration, design, testing regimes.',
  },
  {
    slug: 'fire-alarm',
    title: 'Fire Alarm Systems (BS 5839-1)',
    qCount: 150,
    blurb: 'Categories L1-L5 and P1/P2, detectors, zoning, cabling, maintenance.',
  },
  {
    slug: 'ev-charging',
    title: 'EV Charging Installation',
    qCount: 150,
    blurb: 'Connector types, earthing and protection, smart charging, testing.',
  },
  {
    slug: 'data-cabling',
    title: 'Data Cabling',
    qCount: 150,
    blurb: 'Structured cabling, terminations, testing and certification, PoE.',
  },
  {
    slug: 'renewable-energy',
    title: 'Renewable Energy & Solar PV',
    qCount: 200,
    blurb: 'Panel tech, inverters, system design, grid connection, battery storage.',
  },
  {
    slug: 'smart-home',
    title: 'Smart Home Technology',
    qCount: 200,
    blurb: 'Zigbee, Z-Wave, mesh networking, hubs, security, installation practice.',
  },
  {
    slug: 'industrial-electrical',
    title: 'Industrial Electrical',
    qCount: 120,
    blurb: 'Three-phase distribution, motors, PLCs, fault finding, safe isolation.',
  },
  {
    slug: 'instrumentation',
    title: 'Instrumentation',
    qCount: 125,
    blurb: 'Sensors, 4-20mA loops, PID control, calibration, fault finding.',
  },
  {
    slug: 'bms',
    title: 'Building Management Systems',
    qCount: 245,
    blurb: 'BMS fundamentals, HVAC integration, protocols, commissioning.',
  },
  {
    slug: 'fibre-optics',
    title: 'Fibre Optics',
    qCount: 250,
    blurb: 'Singlemode vs multimode, connectors, splicing, installation, faults.',
  },
];

const LEVEL_2: ExamCard[] = [
  {
    slug: 'level-2-electrical-health-safety',
    title: 'Unit 1 — Health & Safety',
    qCount: 301,
    blurb: 'HASAWA, EAWR, RIDDOR, COSHH, manual handling, CDM 2015, PPE.',
  },
  {
    slug: 'level-2-electrical-principles',
    title: 'Unit 2 — Electrical Principles',
    qCount: 301,
    blurb: "AC/DC, Ohm's Law, three-phase, magnetism, transformers, capacitance.",
  },
  {
    slug: 'level-2-installation-theory',
    title: 'Unit 3 — Installation Theory',
    qCount: 301,
    blurb: 'Cable types (T&E, SWA, MICC), conduit, trunking, accessories, BS 7671.',
  },
  {
    slug: 'level-2-installation-practice',
    title: 'Unit 4 — Installation Practice',
    qCount: 301,
    blurb: 'Risk assessment, safe isolation, tools, method statements, PPE.',
  },
  {
    slug: 'level-2-communications-career',
    title: 'Unit 5 — Comms & Career',
    qCount: 301,
    blurb: 'Site team roles, customer care, professional bodies, ECS Gold Card.',
  },
];

const LEVEL_3: ExamCard[] = [
  {
    slug: 'level-3-electrical-health-safety',
    title: 'Unit 1 — H&S (Supervisor Grade)',
    qCount: 251,
    blurb: 'HASAWA s.2/s.3/s.7, CDM 2015, CAR 2012, Building Safety Act 2022.',
  },
  {
    slug: 'level-3-environmental-technologies',
    title: 'Unit 2 — Environmental Technologies',
    qCount: 251,
    blurb: 'Solar PV, heat pumps, EV charging, MCS scheme, grid connection.',
  },
  {
    slug: 'level-3-electrical-science',
    title: 'Unit 3 — Electrical Science',
    qCount: 251,
    blurb: 'Three-phase, motors, transformers, voltage drop, Zs, PFC, RLC.',
  },
  {
    slug: 'level-3-fault-diagnosis',
    title: 'Unit 4 — Fault Diagnosis',
    qCount: 251,
    blurb: 'Logical fault-finding, MFT use, dead vs live testing, EICR coding.',
  },
  {
    slug: 'level-3-inspection-testing',
    title: 'Unit 5 — Inspection, Testing & Commissioning',
    qCount: 201,
    blurb: 'GN3 sequence, RCD tests, MFT use, polarity, IR, certification.',
  },
  {
    slug: 'level-3-systems-design',
    title: 'Unit 6 — Systems Design',
    qCount: 201,
    blurb: 'Load assessment, diversity, cable sizing, voltage drop, schematics.',
  },
  {
    slug: 'level-3-career-development',
    title: 'Unit 7 — Career Development',
    qCount: 201,
    blurb: 'CPD, ECS Gold Card, NICEIC/NAPIT, JIB grades, supervisor route.',
  },
];

const TOTAL_QUESTIONS = [...TRADE_CERTS, ...ELECTRICAL_EXAMS, ...LEVEL_2, ...LEVEL_3].reduce(
  (n, c) => n + c.qCount,
  0
);

function Section({
  title,
  icon: Icon,
  cards,
  accent,
}: {
  title: string;
  icon: typeof GraduationCap;
  cards: ExamCard[];
  accent: string;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3 mb-5">
        <span className={`p-2 rounded-xl ${accent}`}>
          <Icon className="w-5 h-5" />
        </span>
        {title}
        <span className="text-white/40 text-sm font-normal ml-1">({cards.length})</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.slug}
            to={`/mock-exams/${c.slug}`}
            className="group block rounded-2xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/40 p-5 transition-colors touch-manipulation"
          >
            <h3 className="font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors">
              {c.title}
            </h3>
            <p className="mt-2 text-sm text-white/75 leading-relaxed">{c.blurb}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-yellow-400">
                {c.qCount} questions
              </span>
              <ArrowRight className="w-4 h-4 text-white/55 group-hover:text-yellow-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function MockExamsHubPage() {
  useSEO({
    title: 'Free UK Mock Exams for Electricians + Tradespeople',
    description:
      '7,800+ free practice questions across 37 mock exams: CSCS, 18th Edition, 2391, AM2, PAT testing, EV charging, fire alarm, Level 2 + 3. No sign-up to try.',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Mock Exams', url: '/mock-exams' },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free UK Mock Exams Hub',
      description: `${TOTAL_QUESTIONS}+ free practice questions across 37 mock exams.`,
      url: 'https://www.elec-mate.com/mock-exams',
      isAccessibleForFree: true,
      inLanguage: 'en-GB',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
        url: 'https://www.elec-mate.com',
      },
    },
  });

  return (
    <PublicPageLayout>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <header>
          <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-3">
            <GraduationCap className="w-4 h-4" />
            {TOTAL_QUESTIONS.toLocaleString()} free practice questions
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            Free UK mock exams for electricians + tradespeople
          </h1>
          <p className="mt-5 text-white/85 leading-relaxed text-base sm:text-lg max-w-3xl">
            Every mock exam below is free, no sign-up needed, drawn from real question banks used
            inside the Elec-Mate study centre. Pick one, run a 25-question random selection, score
            yourself, see worked explanations on every wrong answer.
          </p>
        </header>

        <Section
          title="Trade certifications"
          icon={HardHat}
          cards={TRADE_CERTS}
          accent="bg-orange-500/15 text-orange-300"
        />
        <Section
          title="Electrical exams"
          icon={Zap}
          cards={ELECTRICAL_EXAMS}
          accent="bg-yellow-500/15 text-yellow-300"
        />
        <Section
          title="Level 2 Electrical (C&G 2365)"
          icon={ShieldCheck}
          cards={LEVEL_2}
          accent="bg-emerald-500/15 text-emerald-300"
        />
        <Section
          title="Level 3 Electrical (C&G 2365)"
          icon={GraduationCap}
          cards={LEVEL_3}
          accent="bg-blue-500/15 text-blue-300"
        />

        <section className="mt-16 rounded-2xl bg-gradient-to-br from-yellow-500/[0.08] to-transparent border border-yellow-500/20 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Want the full bank + progress tracking?
          </h2>
          <p className="mt-3 text-white/85 leading-relaxed max-w-2xl">
            Free mock exams above pull 25 questions at random. Inside the Elec-Mate app you get the
            full banks (200-300 questions each), category breakdowns, weak-area alerts, AI
            explanations on every question, the AM2 simulator, EPA simulator, and study tracking
            across all your courses. Free to sign up — no charge until day 8.
          </p>
          <Link
            to="/auth/signup?ref=mock-exams-hub"
            className="mt-5 inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold touch-manipulation"
          >
            Start free in Elec-Mate
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </main>
    </PublicPageLayout>
  );
}
