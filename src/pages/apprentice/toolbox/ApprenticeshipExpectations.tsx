/**
 * ApprenticeshipExpectations — editorial 4-year apprenticeship guide.
 *
 * Eight sections covering the year-by-year journey, salary, qualifications,
 * EPA, support network, what's provided, what's expected, and industry
 * outlook. Replaces the previous amber/yellow/blue/purple/cyan/red coloured
 * card pattern with the editorial style shared across the apprentice hub.
 */

import {
  ArrowLeft,
  Clock,
  ChevronRight,
  PoundSterling,
  BookOpen,
  Award,
  Shield,
  Wrench,
  Briefcase,
  Calendar,
  FileText,
  Target,
  TrendingUp,
  Users,
  Zap,
  CreditCard,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Lightbulb,
  BadgeCheck,
  Heart,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import SalaryProgressionChart from '@/components/apprentice/apprenticeship-expectations/SalaryProgressionChart';

/* ─── Editorial card ─── */
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div
    className={'rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 ' + className}
  >
    {children}
  </div>
);

/* ─── Single bullet with icon ─── */
const Bullet = ({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed">
    <Icon className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
    <span>{children}</span>
  </li>
);

/* ─── Year card (navigable) ─── */
const YearCard = ({
  year,
  title,
  subtitle,
  salary,
  to,
}: {
  year: number;
  title: string;
  subtitle: string;
  salary: string;
  to: string;
}) => (
  <Link
    to={to}
    className="block rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 active:bg-white/[0.04] active:scale-[0.99] transition-all touch-manipulation"
  >
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] flex items-center justify-center flex-shrink-0">
        <span className="text-[13px] font-mono font-semibold text-elec-yellow tabular-nums">
          {year}
        </span>
      </div>
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <h3 className="text-[15px] font-semibold text-white tracking-tight leading-snug">
            {title}
          </h3>
          <span className="text-[11px] font-mono text-elec-yellow tabular-nums">{salary}</span>
        </div>
        <p className="text-[12.5px] text-white/70 leading-relaxed">{subtitle}</p>
        <div className="flex items-center gap-3 pt-0.5">
          <span className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.14em] text-white/55">
            <Clock className="h-3 w-3" />
            12 months
          </span>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0 mt-1" />
    </div>
  </Link>
);

/* ─── Post-qualification career card (non-navigable) ─── */
const CareerCard = ({
  title,
  description,
  badge,
  salary,
}: {
  title: string;
  description: string;
  badge: string;
  salary: string;
}) => (
  <Card>
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h3 className="text-[15px] font-semibold text-white tracking-tight">{title}</h3>
        <span className="text-[11px] font-mono text-elec-yellow tabular-nums">{salary}</span>
      </div>
      <p className="text-[12.5px] text-white/70 leading-relaxed">{description}</p>
      <span className="inline-flex items-center h-6 px-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-[10px] font-medium uppercase tracking-[0.14em] text-white/85">
        {badge}
      </span>
    </div>
  </Card>
);

/* ─── Grid stat (used in What's Provided / Responsibilities) ─── */
const GridStat = ({
  icon: Icon,
  title,
  meta,
}: {
  icon: LucideIcon;
  title: string;
  meta: string;
}) => (
  <div className="flex items-start gap-2.5">
    <Icon className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
    <div className="min-w-0">
      <p className="text-[12.5px] font-medium text-white leading-snug">{title}</p>
      <p className="text-[10.5px] text-white/55 leading-snug mt-0.5">{meta}</p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════════════════════ */
const ApprenticeshipExpectations = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Expectations"
          title="The 4-year journey"
          description="What each year of an Installation & Maintenance Electrician apprenticeship actually looks like — month by month, salary by salary, qualification by qualification."
          tone="yellow"
        />
      </motion.div>

      {/* ── Stats strip ── */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
      >
        <StatCell label="Duration" value="4 years" />
        <StatCell label="Standard" value="Level 3" />
        <StatCell label="Card" value="ECS" sub="JIB required" />
        <StatCell label="Starting" value="£15k+" />
      </motion.div>

      {/* ── Year journey ─────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Year journey"
          title="What each year looks like"
          meta="Tap any year for the month-by-month detail"
        />
        <div className="space-y-2.5">
          <YearCard
            year={1}
            title="Foundation"
            subtitle="Safety, basics, ECS card, portfolio started"
            salary="£15–18k"
            to="/apprentice/toolbox/apprenticeship-expectations/year-1"
          />
          <YearCard
            year={2}
            title="Development"
            subtitle="BS 7671, installations, testing basics"
            salary="£18–22k"
            to="/apprentice/toolbox/apprenticeship-expectations/year-2"
          />
          <YearCard
            year={3}
            title="Progression"
            subtitle="Commercial work, fault-finding, supervision"
            salary="£24–28k"
            to="/apprentice/toolbox/apprenticeship-expectations/year-3"
          />
          <YearCard
            year={4}
            title="Mastery"
            subtitle="AM2S, 18th Edition, JIB grading"
            salary="£27–33k"
            to="/apprentice/toolbox/apprenticeship-expectations/year-4"
          />
        </div>
      </motion.section>

      {/* ── Salary & pay ─────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Salary & pay"
          title="What you'll actually earn"
          meta="NMW · JIB rates · regional variance"
        />
        <div className="space-y-2.5">
          <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
            <SalaryProgressionChart />
          </div>
          <Card>
            <Eyebrow>NMW & JIB rates</Eyebrow>
            <ul className="space-y-1.5 list-none mt-2">
              <Bullet icon={PoundSterling}>
                Apprentice NMW: £8.00/hr (from 1 April 2026). Applies if you're under 19, or 19+ in
                the first year of your apprenticeship — after that you move to the age-appropriate
                NMW/NLW rate
              </Bullet>
              <Bullet icon={PoundSterling}>
                JIB rates are higher — most electrical employers follow JIB
              </Bullet>
              <Bullet icon={PoundSterling}>
                JIB national (eff. 5 Jan 2026): Stage 1 £8.16 → Stage 2 £10.60 → Stage 3 £13.05 →
                Stage 4 £14.03/hr
              </Bullet>
              <Bullet icon={MapPin}>
                London / M25 rates higher: £9.14 / £11.88 / £14.62 / £15.72/hr
              </Bullet>
              <Bullet icon={CheckCircle2}>Same rate at college as on site (JIB rule)</Bullet>
            </ul>
          </Card>
          <Card>
            <Eyebrow>Benefits beyond pay</Eyebrow>
            <ul className="space-y-1.5 list-none mt-2">
              <Bullet icon={Calendar}>
                20 days annual leave + 8 bank holidays (28 days statutory)
              </Bullet>
              <Bullet icon={Shield}>Statutory sick pay (often enhanced)</Bullet>
              <Bullet icon={PoundSterling}>Workplace pension contributions from employer</Bullet>
              <Bullet icon={GraduationCap}>
                All college fees covered (100% government-funded)
              </Bullet>
              <Bullet icon={Wrench}>Basic tool kit provided by employer</Bullet>
              <Bullet icon={Shield}>All PPE provided (hard hat, boots, hi-vis, gloves)</Bullet>
            </ul>
          </Card>
        </div>
      </motion.section>

      {/* ── Training & qualifications ────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Training & qualifications"
          title="What you'll cover"
          meta="College, off-the-job, and the certificates you walk away with"
        />
        <div className="space-y-2.5">
          <Card>
            <Eyebrow>College & off-the-job training</Eyebrow>
            <ul className="space-y-1.5 list-none mt-2">
              <Bullet icon={CheckCircle2}>
                Off-the-job training is fixed hours per standard (1 Aug 2025 onwards, replacing the
                old 20% rule) — ST0152 = 1,066 off-the-job hours
              </Bullet>
              <Bullet icon={Calendar}>
                Typically 1 day/week at college (day release) or block release
              </Bullet>
              <Bullet icon={FileText}>
                Portfolio evidence collected throughout — photos, worksheets, sign-offs
              </Bullet>
              <Bullet icon={Target}>Progress reviews with training assessor every 6–8 weeks</Bullet>
              <Bullet icon={Lightbulb}>
                T-Level in Building Services Engineering is a 2-year college alternative (not a
                replacement)
              </Bullet>
            </ul>
          </Card>
          <Card>
            <Eyebrow>Qualifications you'll gain</Eyebrow>
            <ul className="space-y-1.5 list-none mt-2">
              <Bullet icon={Award}>
                <span className="font-medium">Knowledge:</span> City & Guilds 2365-03 Level 3
                Diploma (or EAL equivalent)
              </Bullet>
              <Bullet icon={Award}>
                <span className="font-medium">Competence:</span> NVQ Level 3 Electrotechnical
                Services (C&G 5357 or EAL equivalent)
              </Bullet>
              <Bullet icon={Award}>
                <span className="font-medium">EPA:</span> AM2S End Point Assessment
              </Bullet>
              <Bullet icon={BookOpen}>
                <span className="font-medium">Industry:</span> BS 7671:2018+A4:2026 (18th Edition,
                Amendment 4, in force)
              </Bullet>
              <Bullet icon={CreditCard}>
                <span className="font-medium">Card:</span> ECS Apprentice → ECS Electrician on
                qualification
              </Bullet>
            </ul>
          </Card>
        </div>
      </motion.section>

      {/* ── Assessment & EPA ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Assessment & EPA"
          title="How you're judged"
          meta="On-programme assessment + the AM2S end point assessment"
        />
        <div className="space-y-2.5">
          <Card>
            <Eyebrow>On-programme assessment</Eyebrow>
            <ul className="space-y-1.5 list-none mt-2">
              <Bullet icon={CheckCircle2}>Continuous practical skill assessments on site</Bullet>
              <Bullet icon={CheckCircle2}>Written theory examinations at college</Bullet>
              <Bullet icon={CheckCircle2}>
                Portfolio evidence collection — photos, work logs, supervisor sign-offs
              </Bullet>
              <Bullet icon={CheckCircle2}>
                Regular workplace observations by training assessor
              </Bullet>
            </ul>
          </Card>
          <Card>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <Eyebrow>End point assessment (AM2S)</Eyebrow>
              <span className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.14em] text-white/55">
                <Clock className="h-3 w-3" />
                ~2.5 days
              </span>
            </div>
            <ul className="space-y-1.5 list-none mt-2">
              <Bullet icon={BadgeCheck}>Sole EPAO: NET (National Electrotechnical Training)</Bullet>
              <Bullet icon={Wrench}>
                A single integrated practical assessment (~16–18 hours, typically over ~2.5 days):
                safe isolation, composite installation, inspection &amp; testing, and fault
                diagnosis
              </Bullet>
              <Bullet icon={BookOpen}>
                An embedded online multiple-choice applied-knowledge test (the knowledge element is
                sat within the AM2S, not as a separate exam)
              </Bullet>
              <Bullet icon={Award}>
                <span className="font-medium">Grading:</span> Fail / Pass / Distinction
              </Bullet>
              <Bullet icon={CheckCircle2}>
                Gateway: complete the NVQ, evidence your off-the-job hours, and have your portfolio
                signed off before EPA entry
              </Bullet>
              <Bullet icon={FileText}>
                Standard ST0152 (Installation &amp; Maintenance Electrician); funding band rose to
                £23,000 from 20 July 2025
              </Bullet>
            </ul>
          </Card>
        </div>
      </motion.section>

      {/* ── Support network ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Support network"
          title="Who's in your corner"
          meta="Four people to lean on as you progress"
        />
        <div className="space-y-2.5">
          {[
            {
              title: 'Workplace mentor',
              body: 'A qualified electrician on your site who provides day-to-day guidance. Demonstrates techniques, answers questions, helps you build practical skills. Available throughout every working day.',
            },
            {
              title: 'College tutor',
              body: 'Your academic point of contact at college. Pastoral support, theory concepts, monitors your academic progress. Available during college hours and often by email.',
            },
            {
              title: 'Training assessor',
              body: "Visits your workplace every 6–8 weeks for formal progress reviews. Checks portfolio, conducts workplace observations, ensures you're on track for gateway and EPA.",
            },
            {
              title: 'HR · apprentice lead',
              body: "Your employer's pastoral support contact. Handles workplace concerns, wellbeing issues, or admin queries. Can liaise between you and the training provider when needed.",
            },
          ].map((c) => (
            <Card key={c.title}>
              <h3 className="text-[14px] font-semibold text-white leading-snug">{c.title}</h3>
              <p className="text-[12.5px] text-white/85 leading-relaxed mt-1.5">{c.body}</p>
            </Card>
          ))}
          <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
            <Eyebrow className="text-elec-yellow/85">Getting the most from your mentor</Eyebrow>
            <ul className="space-y-1.5 list-none mt-1">
              <Bullet icon={Lightbulb}>
                Ask &apos;why&apos;, not just &apos;how&apos; — a good mentor will explain the
                reasoning, and that&apos;s what sticks for your exams and EPA
              </Bullet>
              <Bullet icon={CheckCircle2}>
                Write the answer down the first time so you&apos;re not asking the same question
                twice — mentors notice who&apos;s retaining
              </Bullet>
              <Bullet icon={Wrench}>
                Offer to do the unglamorous jobs (clipping, tidying, fetching) without being asked —
                it earns you the interesting work faster
              </Bullet>
              <Bullet icon={Shield}>
                If you&apos;re ever asked to do something that feels unsafe, it is always acceptable
                to stop and ask — under the Electricity at Work Regulations 1989 the duty to work
                safely is yours too, not only your employer&apos;s
              </Bullet>
              <Bullet icon={Calendar}>
                If your mentor is off or you&apos;re moved to another team, ask your training
                assessor to confirm who&apos;s signing off your work so your portfolio evidence
                doesn&apos;t stall
              </Bullet>
            </ul>
          </div>
          <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
            <Eyebrow className="text-elec-yellow/85">External support</Eyebrow>
            <ul className="space-y-1.5 list-none mt-1">
              <Bullet icon={Heart}>
                Electrical Industries Charity — financial, practical and wellbeing support for
                people in the trade (electricalcharity.org)
              </Bullet>
              <Bullet icon={Shield}>
                ACAS — free, impartial advice on pay, contracts and workplace disputes (acas.org.uk)
              </Bullet>
              <Bullet icon={PoundSterling}>
                Check your apprentice pay — gov.uk &apos;Check Your Pay&apos; campaign
                (checkyourpay.campaign.gov.uk)
              </Bullet>
              <Bullet icon={Users}>
                Samaritans — free, 24/7 listening support if you&apos;re struggling: call 116 123
              </Bullet>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── What's provided ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="What's provided"
          title="By your employer & government"
          meta="What you get on day one"
        />
        <Card>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <GridStat icon={Wrench} title="Hand tools" meta="Starter kit from day one" />
            <GridStat icon={Shield} title="PPE" meta="Hat, boots, hi-vis, gloves" />
            <GridStat icon={GraduationCap} title="College fees" meta="100% government-funded" />
            <GridStat icon={PoundSterling} title="Regular wage" meta="From day one inc. college" />
            <GridStat icon={Users} title="Supervision" meta="Qualified electricians" />
            <GridStat icon={Award} title="Qualification" meta="L3 Diploma, NVQ, AM2S" />
          </div>
        </Card>
      </motion.section>

      {/* ── Your responsibilities ────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Your responsibilities"
          title="What's expected of you"
          meta="Show up, log, learn — the non-negotiables"
        />
        <Card>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <GridStat
              icon={Calendar}
              title="Attend college"
              meta="Missing sessions affects funding"
            />
            <GridStat
              icon={FileText}
              title="Portfolio weekly"
              meta="Update every week, not monthly"
            />
            <GridStat
              icon={Briefcase}
              title="Be professional"
              meta="Punctual, respectful, reliable"
            />
            <GridStat icon={BookOpen} title="Self-study" meta="1–2 hrs/week outside work" />
            <GridStat icon={Shield} title="Safety first" meta="No shortcuts, ever" />
            <GridStat icon={Clock} title="Meet deadlines" meta="Exams, assignments, sign-offs" />
          </div>
        </Card>
      </motion.section>

      {/* ── After qualification ──────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="After qualification"
          title="Four common routes"
          meta="Where most newly-qualified electricians land"
        />
        <div className="space-y-2.5">
          <CareerCard
            title="Employed electrician"
            description="Working for a contractor on domestic, commercial, or industrial projects"
            badge="JIB graded"
            salary="£35–45k"
          />
          <CareerCard
            title="Self-employed"
            description="Running your own business — higher earning potential, more responsibility"
            badge="Varies"
            salary="£45–65k+"
          />
          <CareerCard
            title="Supervisor · foreman"
            description="Leading teams on site, managing projects and junior electricians"
            badge="JIB technician"
            salary="£44–55k"
          />
          <CareerCard
            title="Specialist (EV / Solar / Data)"
            description="Growing demand sectors — electric vehicles, renewables, smart buildings"
            badge="PAYE"
            salary="£40–60k"
          />
        </div>
      </motion.section>

      {/* ── Industry outlook ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Industry outlook"
          title="UK electrical industry · 2025/26"
          meta="Why demand is high and where it's heading"
        />
        <Card>
          <ul className="space-y-1.5 list-none">
            <Bullet icon={Zap}>
              Acute shortage: roughly a 227:1 vacancy-to-apprentice ratio, with an estimated 104,000
              more electricians needed by 2032 (ECA / industry projection)
            </Bullet>
            <Bullet icon={TrendingUp}>Median salary: approximately £39k (ONS April 2025)</Bullet>
            <Bullet icon={Zap}>
              Demand driven by net zero, EV infrastructure, heat pumps, and housing
            </Bullet>
            <Bullet icon={BookOpen}>BS 7671:2018+A4:2026 (Amendment 4) now in force</Bullet>
          </ul>
        </Card>
      </motion.section>

      {/* ── JIB footer ───────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5">
          <Eyebrow className="text-elec-yellow/85">JIB grade progression</Eyebrow>
          <p className="text-[13px] text-white/85 leading-relaxed">
            Electrician → Approved Electrician (2 yr + Inspection & Testing quals) → Technician (5
            yr + Level 4 qualification).
          </p>
        </div>
      </motion.section>
    </PageFrame>
  );
};

/* ─────────────────── Stat cell ─────────────────── */

function StatCell({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3 sm:p-4 space-y-0.5">
      <Eyebrow className="text-[9.5px]">{label}</Eyebrow>
      <p className="text-[14px] sm:text-[15px] font-semibold text-white tracking-tight">{value}</p>
      {sub && <p className="text-[10px] text-white/55">{sub}</p>}
    </div>
  );
}

export default ApprenticeshipExpectations;
