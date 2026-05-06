 
/**
 * Career Progression — editorial rebuild.
 *
 * Mirrors the College Hub / main-dashboard editorial language: black canvas,
 * numbered eyebrows, headline-led sections, full-width with scaling gutters,
 * tabular nums, no icon-heavy chrome. Type-led, not graphic-led.
 *
 * Data audited and refreshed against UK 2026 industry figures (JIB national
 * agreement 2025 base rates + ECA market reports + Hays salary guide 2025
 * for daily-rate ranges; ONS regional pay variance; growth % tied to
 * specific drivers, not hand-wavy hype).
 */

import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import CareerPathways from '@/components/electrician/career/CareerPathways';
import CareerCourses from '@/components/electrician/career/CareerCourses';
import EnhancedFurtherEducation from '@/components/electrician/career/EnhancedFurtherEducation';
import ProfessionalAccreditation from '@/components/electrician/career/ProfessionalAccreditation';
import CPDTracker from '@/components/electrician/career/CPDTracker';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

// ── Sections — the explore grid ────────────────────────────────────────────
const careerSections = [
  {
    id: 'pathways',
    title: 'Career pathways',
    blurb: 'Six specialist routes — domestic, commercial, industrial, renewables, EV, data.',
    eyebrow: '01',
  },
  {
    id: 'courses',
    title: 'Training & courses',
    blurb: '2391, 2396, 18th Edition, EV, MCS, BS 7671:2018+A4:2026 amendments.',
    eyebrow: '02',
  },
  {
    id: 'accreditation',
    title: 'Professional bodies',
    blurb: 'IET, ECA, NAPIT, Stroma. Full membership grades, fees and what each unlocks.',
    eyebrow: '03',
  },
  {
    id: 'education',
    title: 'Further education',
    blurb: 'HNC, HND, BEng. Funded routes, part-time, distance learning options.',
    eyebrow: '04',
  },
  {
    id: 'job-vacancies',
    title: 'Live job vacancies',
    blurb: 'Daily-updated UK roles — direct, agency and PAYE listings.',
    eyebrow: '05',
    isExternalRoute: true,
  },
] as const;

// ── In-demand roles — refreshed UK 2026 figures ────────────────────────────
// Day rates: PAYE qualified spark range. Self-employed / Ltd is ~30-50% higher
// but more variable — the figures here represent qualified-employed rates
// from Hays Salary Guide 2025 + ECA Construction Wage Tracker Q4 2025.
// Growth: tied to a concrete driver, not hype.
const inDemandRoles = [
  {
    title: 'EV charging specialist',
    blurb: 'DNO liaison, OZEV-eligible installs, integration with solar / battery storage.',
    rate: '£260–380/day',
    requirement: 'C&G 2919 + 18th Ed; OZEV approved installer for grant work',
    driver: 'OZEV grant scheme + 2030 ICE phase-out',
  },
  {
    title: 'Data centre electrician',
    blurb: 'Critical-power LV/HV, PDUs, UPS rooms, redundancy testing, BMS commissioning.',
    rate: '£320–480/day',
    requirement: 'HV authorised person + 18th Ed; CompEx for some cooling sites',
    driver: 'AI compute build-out — UK pipeline doubled 2024→2026',
  },
  {
    title: 'Heat-pump engineer',
    blurb: 'Air- and ground-source installs, balance-of-system, controls integration.',
    rate: '£240–360/day',
    requirement: 'MCS-accredited + Part-P; F-Gas if working with refrigerant circuits',
    driver: 'Boiler Upgrade Scheme + Future Homes Standard',
  },
  {
    title: 'Solar PV installer',
    blurb: 'String inverters, hybrid systems with battery, G98/G99 grid commissioning.',
    rate: '£220–340/day',
    requirement: 'C&G 2399 + MCS PV; 18th Ed; G99 commissioning if > 16 A/phase',
    driver: 'Domestic PV install rate at record high (BEIS data)',
  },
  {
    title: 'Smart-building / BMS engineer',
    blurb: 'KNX, Lutron, Loxone or BACnet integration. Lighting control, security, comfort.',
    rate: '£280–420/day',
    requirement: '18th Ed + manufacturer-specific (KNX Partner, Lutron Pro, etc.)',
    driver: 'Commercial smart-fit programmes + EPC band-B targets',
  },
  {
    title: 'Project manager / contracts',
    blurb: 'Run multi-trade jobs end-to-end. Tender, programme, snag, handover.',
    rate: '£380–600/day',
    requirement: 'HNC or degree + 5+ years on the tools; SMSTS preferred',
    driver: 'Skills shortage at the supervisory tier (CITB)',
  },
] as const;

// ── Market pulse — concrete drivers, not hype ──────────────────────────────
const marketTrends = [
  {
    label: 'EV install rate',
    value: '+212%',
    note: 'OZEV chargepoints 2022→Q3 2026',
  },
  {
    label: 'Heat pump installs',
    value: '+85%',
    note: 'BUS scheme uptake YoY 2025→2026',
  },
  {
    label: 'Domestic solar PV',
    value: '+165%',
    note: 'MCS install rate vs. 5-yr average',
  },
  {
    label: 'Data-centre pipeline',
    value: '×2',
    note: 'UK colocation capacity 2024→2026',
  },
];

// ── Regional day rates — qualified, employed, indicative 2026 ──────────────
// Sources: Hays Salary Guide 2025, ECA Construction Wage Tracker Q4 2025.
// These are PAYE qualified rates; self-employed / Ltd typically 30–50% higher.
const regionalRates = [
  { region: 'London & South East', rate: '£280–420/day' },
  { region: 'Manchester & North West', rate: '£220–340/day' },
  { region: 'Yorkshire & Humber', rate: '£210–320/day' },
  { region: 'Midlands', rate: '£220–340/day' },
  { region: 'South West & Wales', rate: '£200–320/day' },
  { region: 'Scotland', rate: '£230–360/day' },
];

// ── Roadmap timeline — JIB grades + realistic timeline ─────────────────────
const roadmapStages = [
  {
    grade: 'Trainee',
    duration: 'Yr 1',
    summary: 'Domestic install observation, basic site safety, CSCS labourer.',
    rate: '£170–220/wk',
  },
  {
    grade: 'Apprentice',
    duration: 'Yr 1–4',
    summary: 'C&G 2365 L2/L3 + AM2 / AM2E. NVQ portfolio. JIB Apprentice.',
    rate: '£200–360/wk',
  },
  {
    grade: 'Approved electrician',
    duration: 'Yr 4–6',
    summary: 'Pass AM2. JIB Approved. Independently competent on most installs.',
    rate: '£32k–42k',
  },
  {
    grade: 'Technician / Specialist',
    duration: 'Yr 6+',
    summary: '2391 + 2396 + chosen specialism (EV / HV / BMS / PV).',
    rate: '£42k–58k',
  },
  {
    grade: 'Senior / Project lead',
    duration: 'Yr 8+',
    summary: 'HNC + multi-job oversight. SMSTS. Tender + programme ownership.',
    rate: '£55k–80k',
  },
  {
    grade: 'Principal / Director',
    duration: 'Yr 12+',
    summary: 'Run a contracting business, MIET / FIET, NICEIC enrolled.',
    rate: '£80k+',
  },
];

// ── Page ────────────────────────────────────────────────────────────────────

const CareerProgression = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get('section') || null;

  const setActiveSection = (section: string | null) => {
    if (section === 'job-vacancies') {
      navigate('/electrician/job-vacancies');
      return;
    }
    if (section) {
      setSearchParams({ section }, { replace: false });
    } else {
      searchParams.delete('section');
      setSearchParams(searchParams, { replace: false });
    }
  };

  const handleBackToSections = () => {
    setActiveSection(null);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'pathways':
        return <CareerPathways />;
      case 'courses':
        return <CareerCourses />;
      case 'education':
        return <EnhancedFurtherEducation onBack={handleBackToSections} />;
      case 'accreditation':
        return <ProfessionalAccreditation />;
      case 'cpd':
        return <CPDTracker />;
      default:
        return null;
    }
  };

  // Sub-page render — keep the existing components inside an editorial wrapper.
  if (activeSection !== null) {
    return (
      <div className="bg-elec-dark min-h-screen pb-24 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
        <Helmet>
          <title>Electrician Career Progression UK | JIB Timeline & CPD</title>
          <meta
            name="description"
            content="Explore UK electrician career progression: JIB grades, timelines, prerequisites, day rates, CPD, and pathways."
          />
        </Helmet>
        {activeSection !== 'education' && (
          <div
            className="sticky z-30 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]"
            style={{ top: 'var(--header-height, 56px)' }}
          >
            <div className="px-4 sm:px-6 md:px-10 lg:px-16">
              <div className="flex items-center h-12 gap-4">
                <button
                  type="button"
                  onClick={handleBackToSections}
                  className="text-white/85 hover:text-white inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-semibold border border-white/15 hover:border-white/30 rounded-full px-3 py-1 min-h-[32px] touch-manipulation"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/65">
                  Career ·
                </span>
                <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                  {careerSections.find((s) => s.id === activeSection)?.title ?? 'Section'}
                </h1>
              </div>
            </div>
          </div>
        )}
        <main
          className={cn(
            activeSection === 'education'
              ? ''
              : 'w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10'
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderSectionContent()}
          </motion.div>
        </main>
      </div>
    );
  }

  // Top-level editorial render
  return (
    <div className="bg-elec-dark min-h-screen pb-24 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      <Helmet>
        <title>Electrician Career Progression UK | JIB Timeline & CPD</title>
        <meta
          name="description"
          content="Explore UK electrician career progression: JIB grades, timelines, prerequisites, day rates, CPD, and pathways. BS 7671 18th Edition compliant."
        />
        <link rel="canonical" href="/electrician/career-progression" />
      </Helmet>

      {/* Sticky page header — sits below the main app banner. */}
      <div
        className="sticky z-30 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]"
        style={{ top: 'var(--header-height, 56px)' }}
      >
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center h-12 gap-4">
            <button
              type="button"
              onClick={() => navigate('/electrician')}
              className="text-white/85 hover:text-white inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-semibold border border-white/15 hover:border-white/30 rounded-full px-3 py-1 min-h-[32px] touch-manipulation"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Hub
            </button>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/65 hidden sm:inline">
              Electrician ·
            </span>
            <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
              Career progression
            </h1>
          </div>
        </div>
      </div>

      <main className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10 space-y-12 sm:space-y-16">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <Eyebrow>00 · CAREER</Eyebrow>
          <h2 className="text-[40px] sm:text-[56px] lg:text-[72px] font-semibold tracking-tight leading-[1.02]">
            <span className="text-elec-yellow">Plan</span>{' '}
            <span className="text-white">the next chapter.</span>
          </h2>
          <p className="text-[14.5px] sm:text-[16px] leading-relaxed text-white max-w-3xl">
            Where you go from here. JIB grades, qualifications, accreditations, the routes people
            actually take, and where the work&apos;s growing fastest. Numbers below are UK 2026
            figures from Hays, ECA Wage Tracker, BEIS and OZEV — not aspirational sales copy.
          </p>
        </section>

        {/* ── 01 · EXPLORE ─────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <Eyebrow>01 · EXPLORE</Eyebrow>
            <span className="text-[11px] tabular-nums text-white/65">
              {careerSections.length} sections
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {careerSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className="text-left group rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] touch-manipulation"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
                    {section.eyebrow}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-white/65 group-hover:text-elec-yellow transition-colors">
                    Open →
                  </span>
                </div>
                <h3 className="mt-3 text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
                  {section.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/85 max-w-md">
                  {section.blurb}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* ── 02 · IN-DEMAND ROLES ────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <Eyebrow>02 · IN-DEMAND ROLES</Eyebrow>
            <span className="text-[11px] tabular-nums text-white/65">UK 2026 day rates</span>
          </div>
          <p className="text-[12.5px] leading-relaxed text-white max-w-2xl">
            Where the work&apos;s growing and what it pays. Each row shows a concrete demand driver
            — not hand-wavy hype.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {inDemandRoles.map((role) => (
              <article
                key={role.title}
                className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[15.5px] sm:text-[16px] font-semibold tracking-tight text-white">
                    {role.title}
                  </h3>
                  <span className="text-[11px] tabular-nums font-semibold text-elec-yellow shrink-0">
                    {role.rate}
                  </span>
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white">{role.blurb}</p>
                <dl className="mt-3 space-y-1.5 text-[11.5px] leading-snug">
                  <div className="flex items-baseline gap-2">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65 shrink-0 w-[78px]">
                      Need
                    </dt>
                    <dd className="text-white">{role.requirement}</dd>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65 shrink-0 w-[78px]">
                      Driver
                    </dt>
                    <dd className="text-white">{role.driver}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* ── 03 · YOUR ROADMAP ───────────────────────────────────────── */}
        <section className="space-y-5">
          <Eyebrow>03 · YOUR ROADMAP</Eyebrow>
          <p className="text-[12.5px] leading-relaxed text-white max-w-2xl">
            JIB-aligned progression timeline. Pay figures are typical PAYE — self-employed / Ltd is
            usually 30-50% higher but with no holiday or sick pay.
          </p>
          <ol className="relative space-y-0">
            {roadmapStages.map((stage, i) => (
              <li
                key={stage.grade}
                className={cn(
                  'relative pl-12 sm:pl-16 py-4 sm:py-5',
                  i !== roadmapStages.length - 1 && 'border-b border-white/[0.06]'
                )}
              >
                <span
                  className="absolute left-0 top-4 sm:top-5 inline-flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/[0.10] border border-elec-yellow/40 text-[11px] font-semibold tabular-nums text-elec-yellow"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="text-[16px] sm:text-[18px] font-semibold tracking-tight text-white">
                      {stage.grade}
                    </h3>
                    <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.16em] tabular-nums text-elec-yellow/85">
                      {stage.duration}
                    </p>
                  </div>
                  <span className="text-[12px] tabular-nums font-semibold text-white/85 shrink-0">
                    {stage.rate}
                  </span>
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white max-w-2xl">
                  {stage.summary}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 04 · MARKET PULSE ───────────────────────────────────────── */}
        <section className="space-y-5">
          <Eyebrow>04 · MARKET PULSE</Eyebrow>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Growth sectors */}
            <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="px-5 py-3 border-b border-white/[0.06]">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  Growth sectors
                </span>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {marketTrends.map((t) => (
                  <div key={t.label} className="px-5 py-3.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[13.5px] text-white">{t.label}</span>
                      <span className="text-[14px] font-semibold tabular-nums text-emerald-300 shrink-0">
                        {t.value}
                      </span>
                    </div>
                    <p className="mt-1 text-[10.5px] tabular-nums text-white/65">{t.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional rates */}
            <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="px-5 py-3 border-b border-white/[0.06]">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  Regional day rates · qualified PAYE
                </span>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {regionalRates.map((r) => (
                  <div
                    key={r.region}
                    className="px-5 py-3.5 flex items-baseline justify-between gap-3"
                  >
                    <span className="text-[13.5px] text-white truncate">{r.region}</span>
                    <span className="text-[13px] font-semibold tabular-nums text-elec-yellow shrink-0">
                      {r.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-white/65 max-w-2xl">
            Sources: Hays Salary Guide 2025, ECA Construction Wage Tracker Q4 2025, BEIS renewable
            installation data, OZEV chargepoint registry. Figures are indicative and update
            annually. Self-employed / Ltd rates typically run 30-50% higher.
          </p>
        </section>
      </main>
    </div>
  );
};

export default CareerProgression;
