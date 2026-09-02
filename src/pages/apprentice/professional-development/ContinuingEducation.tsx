/**
 * ContinuingEducation — editorial CPD landing.
 *
 * Why-continue, course categories, 5-step planning, funding, market
 * trends, regional insights, success stories. Replaces the previous
 * purple/blue/green/yellow/orange section dots and chunky Card chrome.
 */

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const courseCategories = [
  {
    title: 'HNC / HND electrical engineering',
    level: 'Level 4–5',
    duration: '1–3 years part-time',
    cost: '£3,000–£12,000',
    description:
      'Higher National qualifications for career progression into design, management, and engineering roles. Study part-time or via distance learning while working.',
    courses: [
      'Electrical principles',
      'Mathematics for engineers',
      'Digital electronics',
      'Power systems',
      'Circuit design',
      'Industrial control',
    ],
  },
  {
    title: 'Degree top-up (BEng / BSc)',
    level: 'Level 6',
    duration: '1–2 years part-time',
    cost: '£9,250/yr (loan eligible)',
    description:
      'Top up an HND to a full honours degree in Electrical Engineering or Building Services Engineering. Opens doors to CEng registration and senior design roles.',
    courses: [
      'Advanced electrical design',
      'Research methods',
      'Project management',
      'Building services engineering',
      'Sustainable energy systems',
      'Individual project / dissertation',
    ],
  },
  {
    title: 'Renewable energy courses',
    level: 'Specialist',
    duration: '1–5 days',
    cost: '£300–£1,500',
    description:
      'Short specialist courses covering solar PV, heat pumps, battery storage, and grid connection. High demand with strong salary uplift potential.',
    courses: [
      'Solar PV installation',
      'Heat pump systems',
      'Battery storage (BESS)',
      'Grid connection (G99/G100)',
      'MCS certification',
    ],
  },
  {
    title: 'Smart home technology',
    level: 'Emerging',
    duration: '2–5 days',
    cost: '£500–£1,200',
    description:
      'Hands-on training in home automation, IoT integration, smart lighting, and security systems. A growing market with premium service rates.',
    courses: [
      'Home automation systems',
      'IoT integration',
      'Smart lighting design',
      'Security systems',
      'Troubleshooting & diagnostics',
    ],
  },
  {
    title: 'Electric vehicle charging',
    level: 'High growth',
    duration: '1–3 days',
    cost: '£400–£800',
    description:
      'Practical workshops covering EV charging technologies, installation, testing, and business development. Sector growing rapidly ahead of the 2035 ICE phase-out.',
    courses: [
      'EV technologies overview',
      'Installation & commissioning',
      'Safety & testing',
      'Commercial installations',
      'Business development',
    ],
  },
  {
    title: 'Industrial & automation',
    level: 'Specialist',
    duration: '3–10 days',
    cost: '£800–£3,000',
    description:
      'Training in PLC programming, motor control, building management systems, and industrial maintenance. Higher salary brackets for qualified specialists.',
    courses: [
      'PLC programming (Siemens / AB)',
      'Motor control systems',
      'Building management systems',
      'Industrial maintenance',
    ],
  },
  {
    title: 'Health & safety',
    level: 'Essential',
    duration: '1–5 days',
    cost: '£200–£800',
    description:
      'Keep your safety qualifications current. Covers SSSTS / SMSTS, first aid, working at height, asbestos awareness. Required for most commercial and industrial sites.',
    courses: [
      'SSSTS / SMSTS',
      'First aid at work',
      'Working at height',
      'Asbestos awareness',
      'Manual handling',
    ],
  },
];

const planningSteps = [
  {
    step: 1,
    title: 'Assess your current skills',
    description:
      'Identify gaps between where you are and where you want to be. Review your qualifications, experience, and the skills your target role requires.',
  },
  {
    step: 2,
    title: 'Research the market',
    description:
      'Look at job adverts in your target area. What qualifications and skills are employers asking for? Which specialisms are in highest demand locally?',
  },
  {
    step: 3,
    title: 'Plan your funding',
    description:
      'Explore all options before committing. Advanced Learner Loans, employer sponsorship, professional body grants, and the Apprenticeship Levy can significantly reduce your costs.',
  },
  {
    step: 4,
    title: 'Choose your provider',
    description:
      'Compare course content, delivery methods, and pass rates. Check reviews from other electricians. Consider part-time, evening, or distance learning options that fit around work.',
  },
  {
    step: 5,
    title: 'Commit and complete',
    description:
      'Set a realistic study schedule and stick to it. Tell your employer and family about your plans. Track your progress and celebrate milestones along the way.',
  },
];

const regionalInsights = [
  {
    region: 'London & South East',
    projects: [
      'Old Oak Common HS2 station — major infrastructure build requiring thousands of electrical workers',
      'Thames Tideway Tunnel — ongoing infrastructure with specialist electrical requirements',
      'Residential retrofit programme — energy efficiency upgrades across social housing',
    ],
    outlook:
      'Premium rates but high competition. Strong demand for commercial and infrastructure specialists.',
  },
  {
    region: 'North West',
    projects: [
      'Manchester housing growth — thousands of new homes requiring domestic electricians',
      'Data centre corridor — hyperscale facilities along the M62 corridor',
      'Industrial decarbonisation — factory upgrades across Greater Manchester and Merseyside',
    ],
    outlook: 'Growing demand with competitive salaries. Strong industrial and commercial markets.',
  },
  {
    region: 'Midlands',
    projects: [
      'HS2 Birmingham interchange — major transport infrastructure project',
      'Gigafactory development — electric vehicle battery manufacturing facilities',
      'Smart motorway upgrades — M6, M42, and M1 electrical infrastructure',
    ],
    outlook: 'Diverse opportunities across domestic, commercial, and industrial sectors.',
  },
  {
    region: 'South West',
    projects: [
      "Hinkley Point C — Europe's largest construction site requiring thousands of electrical specialists",
      'Offshore wind connections — Bristol Channel and Celtic Sea wind farm infrastructure',
      'Tourism sector upgrades — hospitality and leisure electrical modernisation',
    ],
    outlook: 'Hinkley Point C driving exceptional demand for nuclear-qualified electricians.',
  },
  {
    region: 'Scotland',
    projects: [
      'ScotWind offshore programme — massive offshore wind development',
      'Edinburgh and Glasgow housing — significant residential growth',
      'Renewable energy hub — hydrogen and BESS development across the Highlands',
    ],
    outlook: 'Renewable energy creating strong specialist demand, especially offshore.',
  },
  {
    region: 'Wales & Northern Ireland',
    projects: [
      'Celtic Freeport development — Port Talbot industrial regeneration',
      'Belfast regeneration — city centre commercial and residential development',
      'Rural electrification — broadband and power upgrades in remote areas',
    ],
    outlook:
      'Emerging opportunities with government investment in infrastructure and renewable energy.',
  },
];

const successStories = [
  {
    name: 'Sarah Mitchell',
    location: 'Bristol',
    role: 'Solar PV specialist',
    change: '£28k → £39k (+40%)',
    path: 'Completed City & Guilds 2922 Solar PV and MCS certification part-time over 6 months while working as a domestic electrician.',
    detail:
      'Now leads a four-person solar installation team for a renewable energy company. Handles system design, installation, and DNO applications.',
    tip: 'Start with one renewable cert — it opens the door to the whole green energy sector.',
  },
  {
    name: 'James Okafor',
    location: 'Manchester',
    role: 'EV charging business owner',
    change: '£32k → £52k + own business',
    path: 'Invested £1,200 in City & Guilds 2921 EV Charging and Smart Charging certifications. Built a client base through local EV owner groups.',
    detail:
      'Started his own EV charging installation company within 2 years. Now employs two electricians and covers the entire North West.',
    tip: 'The EV market is still young enough that you can build a strong local reputation quickly.',
  },
  {
    name: 'Mike Thompson',
    location: 'Birmingham',
    role: 'Automation engineer',
    change: '£35k → £58k',
    path: 'Completed HND in Electrical Engineering part-time over 2 years at Aston University, then added Siemens PLC programming certification.',
    detail:
      'Transitioned from domestic work to industrial automation at a major car manufacturer. Now programmes robotic welding cells and conveyor systems.',
    tip: 'The HND was hard work alongside a full-time job, but it opened doors I could never have accessed otherwise.',
  },
  {
    name: 'Lisa Chen',
    location: 'London',
    role: 'Training manager',
    change: '£36k → £45k + benefits',
    path: 'Topped up her HND to a BEng (Hons) via distance learning, then completed a Level 4 Education & Training certificate.',
    detail:
      'Now manages the electrical training programme for a major M&E contractor. Develops curriculum, assesses apprentices, and leads CPD sessions.',
    tip: 'Teaching others deepens your own understanding — and the work-life balance is much better than site work.',
  },
  {
    name: 'David Hughes',
    location: 'Cardiff',
    role: 'Data centre specialist',
    change: '£34k → £62k',
    path: 'Gained HV Switching qualification and CDCDP certification after 5 years in commercial electrical work.',
    detail:
      'Works at a hyperscale data centre in South Wales. Specialises in UPS systems, PDU installation, and critical power distribution. Regular overtime pushes the total package above £70k.',
    tip: 'Data centres are one of the best-kept secrets in our trade — pay and conditions are exceptional.',
  },
  {
    name: 'Priya Sharma',
    location: 'Leeds',
    role: 'Electrical designer (IEng)',
    change: '£30k → £55k',
    path: 'Completed HNC part-time, then topped up to BEng via Open University. Achieved IEng registration through the IET after 3 years of logged experience.',
    detail:
      'Designs electrical systems for new-build commercial projects at a building services consultancy. Works in AutoCAD and Revit, rarely picks up a screwdriver.',
    tip: 'If you enjoy the technical side more than the physical, design is a brilliant career path with excellent earning potential.',
  },
];

const keyTrends = [
  {
    trend: 'Net zero transition',
    detail:
      'The UK government target of net zero by 2050 is driving massive investment in renewable energy, EV infrastructure, and energy efficiency. Electricians with green skills will be in highest demand.',
  },
  {
    trend: 'Smart buildings',
    detail:
      'Building automation, IoT integration, and smart energy management are becoming standard in new-build commercial and high-end residential properties.',
  },
  {
    trend: 'Electrification of heat',
    detail:
      'The phase-out of gas boilers in new builds from 2025 is creating huge demand for heat pump installation skills. MCS-certified installers are already in short supply.',
  },
  {
    trend: 'Data centre growth',
    detail:
      'The UK data centre market is expanding rapidly. These facilities require specialist electrical skills including HV, UPS systems, and precision power distribution.',
  },
];

const whyContinue = [
  {
    title: 'Stay current',
    detail:
      'BS 7671:2018+A4:2026 landed April 2026. Technology and regulations evolve constantly — electricians who keep learning stay relevant and employable.',
  },
  {
    title: 'Higher earnings',
    detail:
      "Specialist training adds £8,000–£15,000 annually. That's a 30–50% salary increase for qualified specialists vs general electricians.",
  },
  {
    title: 'Future-proof your career',
    detail:
      'The UK needs 1.2 million green jobs by 2030. EV, solar, heat pump, and battery storage skills are in critical demand now and will only grow.',
  },
];

const fundingPoints = [
  'Apprenticeship funding — the ST0152 Installation & Maintenance Electrician funding band is £23,000 (raised from £21,000 on 20 July 2025). Employers with a pay bill over £3m pay into the levy; smaller employers get 95% government co-investment.',
  'Advanced Learner Loans — cover full course fees for Level 3–6 qualifications including degree top-ups. Repayments start above the Plan 2 threshold, which is uprated each April — check GOV.UK.',
  'Employer sponsorship — many larger contractors fund training as part of staff development. Always ask before paying yourself.',
  'IET Education Grants — £500–£2,000 for IET members pursuing further education.',
  'Skills Bootcamps — free government-funded intensive courses in specific technical areas.',
  'CITB Training Grants — construction industry training board grants for eligible employers and individuals.',
];

const a4Changes = [
  {
    change: 'Arc Fault Detection Devices (AFDDs)',
    detail:
      'Now required on single-phase socket-outlet final circuits up to 32A in higher-risk residential buildings, HMOs, purpose-built student accommodation and care homes (Reg 421.1.7) — they catch series and parallel arc faults that MCBs and RCDs miss.',
  },
  {
    change: 'Prosumer installations',
    detail:
      'New requirements for installations with their own generation or storage — solar PV, batteries, EV vehicle-to-grid — where energy flows both ways. Switching and protective devices in the energy path must be suitable for bidirectional current.',
  },
  {
    change: 'Solar PV — Section 712',
    detail:
      'Updated provisions for PV generators, DC isolation and protection. Directly relevant to the fast-growing renewables market.',
  },
  {
    change: 'Open-PEN / TN-C-S protection',
    detail:
      'Strengthened protection against a broken combined neutral-earth (open-PEN) conductor, especially for EV charging on PME supplies (Section 722).',
  },
  {
    change: 'Certificates & the exam',
    detail:
      'Updated model forms and schedule columns. From 16 October 2026 the A4 version of the 18th Edition exam (2382-26) is the only one sat — Gold-card holders need A4 knowledge.',
  },
];

const ContinuingEducation = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · CPD"
        title="Continuing education"
        backTo="/apprentice/professional-development"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          {
            'A4:2026 changes, EV charging, solar PV, smart homes — stay current and the upskilling pays. The roles that pay best usually require the certifications most people skip.'
          }
        </p>

        {/* ── Why continue ─────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="Why continue learning"
            title="Three reasons the maths works"
            meta="The trade is moving — and so is its pay"
          />
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {whyContinue.map((b) => (
              <li
                key={b.title}
                className={cn(
                  'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-1.5',
                  CARD_SURFACE
                )}
              >
                <Eyebrow>{b.title}</Eyebrow>
                <p className="text-[13px] text-white leading-relaxed">{b.detail}</p>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── What changed in A4:2026 ──────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="BS 7671:2018+A4:2026"
            title="What changed — and why it pays to know"
            meta="The current amendment. Knowing it first is billable."
          />
          <ul className="space-y-2">
            {a4Changes.map((c) => (
              <li
                key={c.change}
                className={cn(
                  'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-1.5',
                  CARD_SURFACE
                )}
              >
                <Eyebrow>{c.change}</Eyebrow>
                <p className="text-[13px] text-white leading-relaxed">{c.detail}</p>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── Course categories ────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="Course categories"
            title="Where to put your time"
            meta="Seven directions, ranked roughly by ROI"
          />
          <ul className="space-y-2.5">
            {courseCategories.map((cat) => (
              <li
                key={cat.title}
                className={cn(
                  'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-3',
                  CARD_SURFACE
                )}
              >
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="text-[15px] font-semibold text-white tracking-tight">
                    {cat.title}
                  </h3>
                  <span className="inline-flex items-center h-6 px-2 rounded-md border border-elec-yellow/30 bg-white/[0.05] text-[10px] font-medium uppercase tracking-[0.14em] text-elec-yellow">
                    {cat.level}
                  </span>
                </div>
                <p className="text-[13px] text-white leading-relaxed">{cat.description}</p>
                <div className="flex items-center gap-2 text-[11.5px] font-mono tabular-nums text-white">
                  <span>{cat.duration}</span>
                  <span>·</span>
                  <span>{cat.cost}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.courses.map((course) => (
                    <span
                      key={course}
                      className="inline-flex items-center h-7 px-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-[11px] text-white"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── Planning ─────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="Planning"
            title="Five steps before you commit"
            meta="Don't book the course until you've done the homework"
          />
          <ol className="space-y-2">
            {planningSteps.map((item) => (
              <li
                key={item.step}
                className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}
              >
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-md border border-elec-yellow/30 bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    <span className="text-[13px] font-mono font-semibold text-elec-yellow tabular-nums">
                      {item.step}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h3 className="text-[14px] font-semibold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-white leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* ── Funding ──────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="Funding"
            title="Six routes to lower the bill"
            meta="Many courses are partially or fully funded — understand your options"
          />
          <div className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}>
            <ul className="space-y-2">
              {fundingPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-[13px] text-white leading-relaxed"
                >
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* ── Market trends ────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="Market trends"
            title="Four shifts driving demand"
            meta="What employers will pay for over the next 5 years"
          />
          <ul className="space-y-2">
            {keyTrends.map((item) => (
              <li
                key={item.trend}
                className={cn(
                  'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-1.5',
                  CARD_SURFACE
                )}
              >
                <h3 className="text-[14px] font-semibold text-white tracking-tight">
                  {item.trend}
                </h3>
                <p className="text-[13px] text-white leading-relaxed">{item.detail}</p>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── Regional insights ────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="Regional insights"
            title="Where the projects are"
            meta="Local market signals across six UK regions"
          />
          <ul className="space-y-2">
            {regionalInsights.map((region) => (
              <li
                key={region.region}
                className={cn(
                  'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-3',
                  CARD_SURFACE
                )}
              >
                <h3 className="text-[15px] font-semibold text-white tracking-tight">
                  {region.region}
                </h3>
                <ul className="space-y-1.5">
                  {region.projects.map((project) => (
                    <li
                      key={project}
                      className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[12px] text-white leading-relaxed pt-1 border-t border-white/[0.04]">
                  {region.outlook}
                </p>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── Success stories ──────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="Success stories"
            title="Six routes through CPD"
            meta="What it looked like for the people who did it"
          />
          <ul className="space-y-2">
            {successStories.map((story) => (
              <li
                key={story.name}
                className={cn(
                  'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-2.5',
                  CARD_SURFACE
                )}
              >
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-semibold text-white tracking-tight">
                      {story.name}
                    </h3>
                    <p className="text-[11.5px] text-white mt-0.5">
                      {story.role} · {story.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center h-6 px-2 rounded-md border border-elec-yellow/30 bg-white/[0.05] text-[11px] font-mono tabular-nums text-elec-yellow">
                    {story.change}
                  </span>
                </div>
                <p className="text-[13px] text-white leading-relaxed">{story.detail}</p>
                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <Eyebrow>Education path</Eyebrow>
                  <p className="text-[12.5px] text-white leading-relaxed">{story.path}</p>
                </div>
                <div className="flex items-start gap-2 pt-1">
                  <Eyebrow>Top tip</Eyebrow>
                  <span className="text-[12.5px] text-white leading-relaxed italic">
                    "{story.tip}"
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── Footnote ─────────────────────────────────────────────── */}
        <motion.section variants={itemVariants}>
          <p className="text-[11px] text-white leading-relaxed">
            Course information and funding details based on DfE apprenticeship funding rules, IET
            professional standards, and current UK electrical industry data. Costs and availability
            vary by provider and region. Check with individual providers for current pricing.
          </p>
        </motion.section>
      </HubBody>
    </HubPage>
  );
};

export default ContinuingEducation;
