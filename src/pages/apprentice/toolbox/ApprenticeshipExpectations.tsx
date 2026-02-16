import {
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
  Heart,
  Zap,
  CreditCard,
  CheckCircle,
  GraduationCap,
  MapPin,
  Lightbulb,
  BadgeCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import SalaryProgressionChart from '@/components/apprentice/apprenticeship-expectations/SalaryProgressionChart';

/* ─── Bullet item (icon + text) used inside InfoCard ─── */
const Bullet = ({
  icon: Icon,
  colour,
  children,
}: {
  icon: React.ElementType;
  colour: string;
  children: React.ReactNode;
}) => (
  <li className="flex items-start gap-2">
    <Icon className={`h-3 w-3 ${colour} flex-shrink-0 mt-0.5`} />
    <span>{children}</span>
  </li>
);

/* ─── Section header (coloured dot + bold title) ─── */
const SectionHeader = ({
  colour,
  children,
}: {
  colour: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-2 pt-6 pb-3">
    <div className={`w-2 h-2 rounded-full ${colour}`} />
    <h2 className="text-white font-bold text-base">{children}</h2>
  </div>
);

/* ─── Static info card (no navigation) ─── */
const InfoCard = ({
  borderColour,
  title,
  children,
}: {
  borderColour: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div
    className={`p-4 rounded-xl border border-white/10 border-l-4 ${borderColour} bg-white/5`}
  >
    <h3 className="text-white font-semibold text-[15px] leading-snug">{title}</h3>
    <div className="mt-2 text-white text-xs leading-relaxed space-y-1.5">{children}</div>
  </div>
);

/* ─── Year journey card (navigable → year detail page) ─── */
const YearCard = ({
  year,
  title,
  subtitle,
  salary,
  colour,
  to,
}: {
  year: number;
  title: string;
  subtitle: string;
  salary: string;
  colour: string;
  to: string;
}) => (
  <Link to={to} className="block">
    <div
      className={`p-4 rounded-xl border border-white/10 border-l-4 ${colour}
        bg-white/5 touch-manipulation active:scale-[0.98] active:bg-white/10 transition-all cursor-pointer`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-[15px] leading-snug">{title}</h3>
          <p className="text-white text-xs mt-1">{subtitle}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-white">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Yr {year}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              12 months
            </span>
            <span className="flex items-center gap-1">
              <PoundSterling className="h-3 w-3" />
              {salary}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          <ChevronRight className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  </Link>
);

/* ─── Career path card ─── */
const CareerCard = ({
  borderColour,
  title,
  description,
  salary,
  badge,
  dotColour,
}: {
  borderColour: string;
  title: string;
  description: string;
  salary: string;
  badge: string;
  dotColour: string;
}) => (
  <div
    className={`p-4 rounded-xl border border-white/10 border-l-4 ${borderColour} bg-white/5`}
  >
    <h3 className="text-white font-semibold text-[15px] leading-snug">{title}</h3>
    <p className="text-white text-xs mt-1">{description}</p>
    <div className="flex items-center gap-3 mt-2 text-xs text-white">
      <span className="flex items-center gap-1">
        <div className={`w-1.5 h-1.5 rounded-full ${dotColour}`} />
        {badge}
      </span>
      <span className="flex items-center gap-1">
        <PoundSterling className="h-3 w-3" />
        {salary}
      </span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════════════════════ */
const ApprenticeshipExpectations = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-3 animate-fade-in pb-20">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-xl font-bold text-white">Apprenticeship Expectations</h1>
      </div>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-4 gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
        <div className="text-center">
          <div className="text-white font-bold text-sm">4 Years</div>
          <div className="text-white text-[10px]">Duration</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-sm">Level 3</div>
          <div className="text-white text-[10px]">Standard</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-sm">ECS Card</div>
          <div className="text-white text-[10px]">Required (JIB)</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-sm">£15k+</div>
          <div className="text-white text-[10px]">Starting</div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
         Section 1 — Your 4-Year Journey
         ═══════════════════════════════════════════════════ */}
      <SectionHeader colour="bg-amber-400">Your 4-Year Journey</SectionHeader>

      <div className="space-y-3">
        <YearCard
          year={1}
          title="Year 1 — Foundation"
          subtitle="Safety, basics, ECS card, portfolio started"
          salary="£15-18k"
          colour="border-l-amber-400"
          to="/apprentice/toolbox/apprenticeship-expectations/year-1"
        />
        <YearCard
          year={2}
          title="Year 2 — Development"
          subtitle="BS 7671, installations, testing basics"
          salary="£18-22k"
          colour="border-l-amber-400"
          to="/apprentice/toolbox/apprenticeship-expectations/year-2"
        />
        <YearCard
          year={3}
          title="Year 3 — Progression"
          subtitle="Commercial work, fault-finding, supervision"
          salary="£24-28k"
          colour="border-l-amber-400"
          to="/apprentice/toolbox/apprenticeship-expectations/year-3"
        />
        <YearCard
          year={4}
          title="Year 4 — Mastery"
          subtitle="AM2S, 18th Edition, JIB grading"
          salary="£27-33k"
          colour="border-l-amber-400"
          to="/apprentice/toolbox/apprenticeship-expectations/year-4"
        />
      </div>

      {/* ═══════════════════════════════════════════════════
         Section 2 — Salary & Pay
         ═══════════════════════════════════════════════════ */}
      <SectionHeader colour="bg-elec-yellow">Salary &amp; Pay</SectionHeader>

      <div className="space-y-3">
        {/* Chart */}
        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          <SalaryProgressionChart />
        </div>

        {/* NMW & JIB Rates */}
        <InfoCard borderColour="border-l-elec-yellow" title="NMW & JIB Rates">
          <ul className="space-y-1.5 list-none">
            <Bullet icon={PoundSterling} colour="text-elec-yellow">
              Apprentice NMW: £7.55/hr (Apr 2025), rising to £8.00/hr (Apr 2026)
            </Bullet>
            <Bullet icon={PoundSterling} colour="text-elec-yellow">
              JIB rates are higher — most electrical employers follow JIB
            </Bullet>
            <Bullet icon={PoundSterling} colour="text-elec-yellow">
              JIB Stage 1: £8.16/hr → Stage 2: £9.89/hr → Stage 3: £11.70/hr → Stage 4: £14.03/hr
              (national)
            </Bullet>
            <Bullet icon={MapPin} colour="text-elec-yellow">
              London rates approximately 12-15% higher
            </Bullet>
            <Bullet icon={CheckCircle} colour="text-elec-yellow">
              Same rate at college as on site (JIB 2025 change)
            </Bullet>
          </ul>
        </InfoCard>

        {/* Benefits Beyond Pay */}
        <InfoCard borderColour="border-l-elec-yellow" title="Benefits Beyond Pay">
          <ul className="space-y-1.5 list-none">
            <Bullet icon={Calendar} colour="text-elec-yellow">
              20 days annual leave + 8 bank holidays (28 days total statutory minimum)
            </Bullet>
            <Bullet icon={Shield} colour="text-elec-yellow">
              Statutory sick pay (often enhanced by employer)
            </Bullet>
            <Bullet icon={PoundSterling} colour="text-elec-yellow">
              Workplace pension contributions from employer
            </Bullet>
            <Bullet icon={GraduationCap} colour="text-elec-yellow">
              All college fees covered (100% government-funded)
            </Bullet>
            <Bullet icon={Wrench} colour="text-elec-yellow">
              Basic tool kit provided by employer
            </Bullet>
            <Bullet icon={Shield} colour="text-elec-yellow">
              All PPE provided (hard hat, boots, hi-vis, gloves)
            </Bullet>
          </ul>
        </InfoCard>
      </div>

      {/* ═══════════════════════════════════════════════════
         Section 3 — Training & Qualifications
         ═══════════════════════════════════════════════════ */}
      <SectionHeader colour="bg-blue-400">Training &amp; Qualifications</SectionHeader>

      <div className="space-y-3">
        <InfoCard borderColour="border-l-blue-500" title="College & Off-the-Job Training">
          <ul className="space-y-1.5 list-none">
            <Bullet icon={CheckCircle} colour="text-blue-400">
              Off-the-job training hours now fixed per standard (since August 2025, replacing the old
              20% rule)
            </Bullet>
            <Bullet icon={Calendar} colour="text-blue-400">
              Typically 1 day/week at college (day release) or block release
            </Bullet>
            <Bullet icon={FileText} colour="text-blue-400">
              Portfolio evidence collection throughout — photos, worksheets, sign-offs
            </Bullet>
            <Bullet icon={Target} colour="text-blue-400">
              Progress reviews with training assessor every 6-8 weeks
            </Bullet>
            <Bullet icon={Lightbulb} colour="text-blue-400">
              T-Level in Building Services Engineering is an alternative 2-year college route (not a
              replacement for the apprenticeship)
            </Bullet>
          </ul>
        </InfoCard>

        <InfoCard borderColour="border-l-blue-500" title="Qualifications You'll Gain">
          <ul className="space-y-1.5 list-none">
            <Bullet icon={Award} colour="text-blue-400">
              <span className="font-medium">Knowledge:</span> City &amp; Guilds 2365-03 Level 3
              Diploma (or EAL equivalent)
            </Bullet>
            <Bullet icon={Award} colour="text-blue-400">
              <span className="font-medium">Competence:</span> NVQ Level 3 Electrotechnical Services
              (C&amp;G 5357 or EAL equivalent)
            </Bullet>
            <Bullet icon={Award} colour="text-blue-400">
              <span className="font-medium">EPA:</span> AM2S End Point Assessment
            </Bullet>
            <Bullet icon={BookOpen} colour="text-blue-400">
              <span className="font-medium">Industry:</span> 18th Edition BS 7671:2018+A3:2024 (Amd
              4 expected 2026)
            </Bullet>
            <Bullet icon={CreditCard} colour="text-blue-400">
              <span className="font-medium">Card:</span> ECS Apprentice → ECS Electrician on
              qualification
            </Bullet>
          </ul>
        </InfoCard>
      </div>

      {/* ═══════════════════════════════════════════════════
         Section 4 — Assessment & EPA
         ═══════════════════════════════════════════════════ */}
      <SectionHeader colour="bg-purple-400">Assessment &amp; EPA</SectionHeader>

      <div className="space-y-3">
        <InfoCard borderColour="border-l-purple-500" title="On-Programme Assessment">
          <ul className="space-y-1.5 list-none">
            <Bullet icon={CheckCircle} colour="text-purple-400">
              Continuous practical skill assessments on site
            </Bullet>
            <Bullet icon={CheckCircle} colour="text-purple-400">
              Written theory examinations at college
            </Bullet>
            <Bullet icon={CheckCircle} colour="text-purple-400">
              Portfolio evidence collection — photos, work logs, supervisor sign-offs
            </Bullet>
            <Bullet icon={CheckCircle} colour="text-purple-400">
              Regular workplace observations by training assessor
            </Bullet>
          </ul>
        </InfoCard>

        <InfoCard borderColour="border-l-purple-500" title="End Point Assessment (AM2S)">
          <div className="flex items-center gap-3 mb-2 text-xs text-white">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              NET
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              ~2.5 days
            </span>
            <span className="flex items-center gap-1">
              <Target className="h-3 w-3" />3 parts
            </span>
          </div>
          <ul className="space-y-1.5 list-none">
            <Bullet icon={BadgeCheck} colour="text-purple-400">
              Sole EPAO: NET (National Electrotechnical Training)
            </Bullet>
            <Bullet icon={Wrench} colour="text-purple-400">
              17-hour practical (~2.5 days) in equipped assessment booths
            </Bullet>
            <Bullet icon={Users} colour="text-purple-400">
              90-minute professional discussion with assessor
            </Bullet>
            <Bullet icon={BookOpen} colour="text-purple-400">
              90-minute knowledge test (multiple-choice)
            </Bullet>
            <Bullet icon={Award} colour="text-purple-400">
              <span className="font-medium">Grading:</span> Distinction / Pass / Fail
            </Bullet>
            <Bullet icon={CheckCircle} colour="text-purple-400">
              Gateway: must complete all on-programme training before EPA entry
            </Bullet>
            <Bullet icon={FileText} colour="text-purple-400">
              ST0152 v1.2 (July 2025) has revised EPA plan
            </Bullet>
          </ul>
        </InfoCard>
      </div>

      {/* ═══════════════════════════════════════════════════
         Section 5 — Your Support Network
         ═══════════════════════════════════════════════════ */}
      <SectionHeader colour="bg-cyan-400">Your Support Network</SectionHeader>

      <div className="space-y-3">
        <InfoCard borderColour="border-l-cyan-500" title="Workplace Mentor">
          <p>
            A qualified electrician on your site who provides day-to-day guidance. They demonstrate
            techniques, answer questions, and help you develop practical skills. Available throughout
            every working day.
          </p>
        </InfoCard>
        <InfoCard borderColour="border-l-cyan-500" title="College Tutor">
          <p>
            Your academic point of contact at college. Provides pastoral support, helps with theory
            concepts, and monitors your academic progress. Available during college hours and often by
            email.
          </p>
        </InfoCard>
        <InfoCard borderColour="border-l-cyan-500" title="Training Assessor">
          <p>
            Visits your workplace every 6-8 weeks for formal progress reviews. Checks your portfolio,
            conducts workplace observations, and ensures you're on track for gateway and EPA.
          </p>
        </InfoCard>
        <InfoCard borderColour="border-l-cyan-500" title="HR / Apprentice Lead">
          <p>
            Your employer's pastoral support contact. Handles any workplace concerns, wellbeing issues,
            or administrative queries. Can also liaise between you and the training provider if needed.
          </p>
        </InfoCard>
      </div>

      {/* ═══════════════════════════════════════════════════
         Section 6 — What's Provided
         ═══════════════════════════════════════════════════ */}
      <SectionHeader colour="bg-blue-400">What&apos;s Provided</SectionHeader>

      <InfoCard borderColour="border-l-blue-500" title="Provided by Your Employer & Government">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1">
          <div className="flex items-start gap-2">
            <Wrench className="h-3 w-3 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Hand Tools</span>
              <p className="text-white text-[10px]">Starter kit from day one</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="h-3 w-3 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">PPE</span>
              <p className="text-white text-[10px]">Hat, boots, hi-vis, gloves</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <GraduationCap className="h-3 w-3 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">College Fees</span>
              <p className="text-white text-[10px]">100% government-funded</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <PoundSterling className="h-3 w-3 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Regular Wage</span>
              <p className="text-white text-[10px]">From day one inc. college</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-3 w-3 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Supervision</span>
              <p className="text-white text-[10px]">Qualified electricians</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Award className="h-3 w-3 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Qualification</span>
              <p className="text-white text-[10px]">L3 Diploma, NVQ, AM2S</p>
            </div>
          </div>
        </div>
      </InfoCard>

      {/* ═══════════════════════════════════════════════════
         Section 7 — Your Responsibilities
         ═══════════════════════════════════════════════════ */}
      <SectionHeader colour="bg-amber-400">Your Responsibilities</SectionHeader>

      <InfoCard borderColour="border-l-amber-400" title="What's Expected of You">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1">
          <div className="flex items-start gap-2">
            <Calendar className="h-3 w-3 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Attend College</span>
              <p className="text-white text-[10px]">Missing sessions affects funding</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="h-3 w-3 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Portfolio Weekly</span>
              <p className="text-white text-[10px]">Update every week, not monthly</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Briefcase className="h-3 w-3 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Be Professional</span>
              <p className="text-white text-[10px]">Punctual, respectful, reliable</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <BookOpen className="h-3 w-3 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Self-Study</span>
              <p className="text-white text-[10px]">1-2 hrs/week outside work</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="h-3 w-3 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Safety First</span>
              <p className="text-white text-[10px]">No shortcuts, ever</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-3 w-3 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Meet Deadlines</span>
              <p className="text-white text-[10px]">Exams, assignments, sign-offs</p>
            </div>
          </div>
        </div>
      </InfoCard>

      {/* ═══════════════════════════════════════════════════
         Section 8 — After Qualification
         ═══════════════════════════════════════════════════ */}
      <SectionHeader colour="bg-elec-yellow">After Qualification</SectionHeader>

      <div className="space-y-3">
        <CareerCard
          borderColour="border-l-elec-yellow"
          title="Employed Electrician"
          description="Working for a contractor on domestic, commercial, or industrial projects"
          badge="JIB Graded"
          salary="£35-45k"
          dotColour="bg-elec-yellow"
        />
        <CareerCard
          borderColour="border-l-elec-yellow"
          title="Self-Employed"
          description="Running your own business — higher earning potential, more responsibility"
          badge="Varies"
          salary="£45-65k+"
          dotColour="bg-elec-yellow"
        />
        <CareerCard
          borderColour="border-l-elec-yellow"
          title="Supervisor / Foreman"
          description="Leading teams on site, managing projects and junior electricians"
          badge="JIB Technician"
          salary="£44-55k"
          dotColour="bg-elec-yellow"
        />
        <CareerCard
          borderColour="border-l-elec-yellow"
          title="Specialist (EV / Solar / Data)"
          description="Growing demand sectors — electric vehicles, renewables, smart buildings"
          badge="PAYE"
          salary="£40-60k"
          dotColour="bg-elec-yellow"
        />
      </div>

      {/* ═══════════════════════════════════════════════════
         Section 9 — Industry Outlook
         ═══════════════════════════════════════════════════ */}
      <SectionHeader colour="bg-red-400">Industry Outlook</SectionHeader>

      <InfoCard borderColour="border-l-red-500" title="UK Electrical Industry 2025/2026">
        <ul className="space-y-1.5 list-none">
          <Bullet icon={Zap} colour="text-red-400">
            National shortage: 9,600+ unfilled positions (227:1 job-to-apprentice ratio)
          </Bullet>
          <Bullet icon={TrendingUp} colour="text-red-400">
            Median salary: approximately £39k (ONS April 2025)
          </Bullet>
          <Bullet icon={Zap} colour="text-red-400">
            Demand driven by net zero, EV infrastructure, heat pumps, and housing
          </Bullet>
          <Bullet icon={BookOpen} colour="text-red-400">
            BS 7671 Amendment 4 expected 2026
          </Bullet>
        </ul>
      </InfoCard>

      {/* ═══════════════════════════════════════════════════
         Footer — JIB Grade Progression
         ═══════════════════════════════════════════════════ */}
      <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-white font-semibold text-sm mb-2">JIB Grade Progression</h3>
        <p className="text-white text-xs leading-relaxed">
          Electrician → Approved Electrician (2 yr + Inspection &amp; Testing quals) → Technician (5
          yr + Level 4 qualification)
        </p>
      </div>
    </div>
  );
};

export default ApprenticeshipExpectations;
