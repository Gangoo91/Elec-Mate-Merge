/**
 * IndustryNetworking — editorial guide to the UK electrical industry network.
 *
 * Professional bodies, events, online communities, LinkedIn strategy,
 * actionable tips, mentorship programmes, networking action plan, and ROI.
 * Replaces orange/blue/green/purple/yellow chunky cards with editorial.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const professionalBodies = [
  {
    name: 'IET (Institution of Engineering and Technology)',
    cost: '£200–£400/yr',
    members: '150,000+ members',
    description:
      'The leading professional body for electrical and electronic engineers in the UK. Offers EngTech, IEng, and CEng professional registration, CPD tracking, and technical resources.',
    benefits: [
      'Professional registration (EngTech / IEng / CEng)',
      'CPD tracking and recording',
      'Technical resources and publications',
      'Local network events across the UK',
    ],
    recommended: true,
  },
  {
    name: 'JIB (Joint Industry Board)',
    cost: 'Via employer (no individual fee)',
    members: 'Industry-wide grading body',
    description:
      'Sets grading, pay rates, and working conditions for the UK electrical contracting industry. Your JIB grade directly determines your minimum pay rate and is recognised by every major contractor.',
    benefits: [
      'Industry-standard grading and pay rates',
      'ECS (Electrotechnical Certification Scheme) card',
      'Recognition across all major contractors',
      'Dispute resolution and welfare benefits',
    ],
    recommended: true,
  },
  {
    name: "ECA (Electrical Contractors' Association)",
    cost: '£300–£800/yr',
    members: 'Industry representation',
    description:
      "The UK's leading trade association for electrical contractors. Business support, industry representation, and training opportunities for member companies.",
    benefits: [
      'Industry lobbying and representation',
      'Business support and advice',
      'Training course discounts',
      'Contract and legal templates',
    ],
    recommended: false,
  },
  {
    name: 'NICEIC',
    cost: '£500–£1,500/yr',
    members: 'Consumer trust brand',
    description:
      'Primarily a competent person scheme, but membership also provides networking opportunities, technical support, and industry credibility that opens doors.',
    benefits: [
      'Strong consumer brand recognition',
      'Technical helpline support',
      'Industry events and training',
      'Contractor search directory listing',
    ],
    recommended: true,
  },
  {
    name: 'NAPIT',
    cost: '£400–£1,200/yr',
    members: 'Multi-trade network',
    description:
      'Multi-trade competent person scheme and professional body. Good for networking across electrical, plumbing, and heating disciplines.',
    benefits: [
      'Cross-trade networking',
      'Certification schemes',
      'Online training resources',
      'Annual conference and events',
    ],
    recommended: false,
  },
  {
    name: 'REA (Association for Renewable Energy & Clean Technology)',
    cost: '£500–£2,000/yr',
    members: 'Green energy sector',
    description:
      'The voice of the UK renewable energy industry. Essential for electricians specialising in solar, wind, battery storage, and EV charging.',
    benefits: [
      'Green energy industry insights',
      'Policy updates and consultations',
      'Sustainability networking events',
      'Market intelligence reports',
    ],
    recommended: false,
  },
];

const industryEvents = [
  {
    name: 'Electrical Industry Awards',
    frequency: 'Annual',
    location: 'London',
    cost: '£100–£500',
    description:
      "The UK's premier electrical industry awards ceremony. Excellent networking with industry leaders, manufacturers, and contractors.",
  },
  {
    name: 'IET Local Networks',
    frequency: 'Monthly',
    location: 'UK-wide',
    cost: 'Free for members',
    description:
      'Regular local technical talks, seminars, and networking events run by IET volunteers across the UK. Great for meeting local professionals.',
  },
  {
    name: 'Elex (The Electrical Trade Show)',
    frequency: 'Several shows a year',
    location: 'London, Exeter, Coventry, Manchester & more',
    cost: 'Free entry',
    description:
      'The UK electrical trade show — new products, wholesaler deals, and free CPD seminars on the wiring regs, EV and renewables. Free to attend, runs at venues around the country through the year.',
  },
  {
    name: 'SkillELECTRIC / WorldSkills UK',
    frequency: 'Annual competition',
    location: 'Regional heats → national final',
    cost: 'Free to enter',
    description:
      'The national skills competition for electrical installation apprentices, run by NET. A genuine CV standout, brilliant for confidence, and a pathway towards WorldSkills — entries open early in the year.',
  },
  {
    name: 'Renewable Energy Events',
    frequency: 'Annual',
    location: 'Birmingham NEC',
    cost: '£500–£1,500',
    description:
      'Dedicated renewable energy exhibitions covering solar, wind, battery storage, and EV infrastructure. Essential for green energy specialists.',
  },
  {
    name: 'ECA Industry Conference',
    frequency: 'Annual',
    location: 'Various',
    cost: 'Free for ECA members',
    description:
      'Annual conference covering industry trends, regulation changes, and business development. Strong networking with electrical contractors.',
  },
];

const onlineCommunities = [
  {
    name: 'LinkedIn',
    members: 'Professional network',
    cost: 'Free',
    description:
      'The primary professional networking platform. Join electrical industry groups, follow contractors and manufacturers, and share your work.',
  },
  {
    name: 'ElectriciansForums.net',
    members: 'UK electricians forum',
    cost: 'Free',
    description:
      "Long-running UK electricians' forum. Technical discussions, regulation queries (especially active around amendment releases), career advice.",
  },
  {
    name: 'IET Communities',
    members: '20,000+ members',
    cost: 'IET membership',
    description:
      'Online discussion forums run by the IET covering technical topics, career development, and industry news. Moderated by qualified professionals.',
  },
  {
    name: 'IET Young Professionals',
    members: 'Under-35 community',
    cost: 'IET membership',
    description:
      "The IET's community for early-career engineers — events, mentoring and competitions aimed squarely at apprentices and recently-qualified electricians. A low-pressure way into the wider network.",
  },
  {
    name: 'Facebook Trade Groups',
    members: 'Variable',
    cost: 'Free',
    description:
      'Informal but active groups like "Electricians UK" and "Spark\'s Corner". Good for quick advice, job leads, and product recommendations.',
  },
];

const linkedInTips = [
  {
    tip: 'Clear headline',
    detail:
      'Something a hiring contractor would actually search for: "Apprentice Electrician — Year 3 · 18th Edition · BS 7671:2018+A4:2026". State qualifications and stage plainly.',
  },
  {
    tip: 'Fill the basics',
    detail:
      "Photo, current employer, qualifications, ECS card status. Recruiters skim — if the basics are blank they move on. Doesn't need polish, needs to be there.",
  },
  {
    tip: 'Show real work',
    detail:
      "Post photos of jobs you're proud of (with employer + client permission). One good board, one tidy second-fix run, one finished cert — that's a portfolio.",
  },
  {
    tip: 'Comment more than you post',
    detail:
      "Replying to other people's posts with a useful technical thought is faster than writing your own and gets you in front of more people. Show you know your stuff.",
  },
];

const networkingTips = [
  {
    tip: 'Carry business cards',
    detail:
      'Even as an apprentice, a simple card with your name, qualifications, and contact details makes you memorable. Hand them out at every event you attend.',
  },
  {
    tip: 'Ask questions',
    detail:
      "At events and talks, always ask a question. It shows you're engaged, helps you learn, and gives speakers a reason to remember you. Follow up afterwards.",
  },
  {
    tip: 'Volunteer at events',
    detail:
      'Offer to help set up at IET local network events or trade shows. You meet organisers and speakers directly — and they remember the people who helped.',
  },
  {
    tip: 'Connect with suppliers',
    detail:
      'Build relationships with electrical wholesaler reps. They know which companies are hiring, which projects are starting, and can introduce you to decision-makers.',
  },
  {
    tip: 'Follow up fast',
    detail:
      'Send a LinkedIn connection request or email within 24 hours of meeting someone. Reference something specific from your conversation. Speed shows professionalism.',
  },
];

const mentorshipProgrammes = [
  {
    name: 'IET Mentor Scheme',
    duration: '12 months',
    cost: 'Free for IET members',
    description:
      'Structured mentoring programme matching you with experienced engineers. Covers career planning, professional registration, and technical development.',
  },
  {
    name: 'ECA Apprentice Mentoring',
    duration: 'Flexible',
    cost: 'Free',
    description:
      'Informal mentoring through ECA member companies. Connects apprentices with experienced electricians for guidance and support.',
  },
  {
    name: 'Women in Engineering',
    duration: '6–12 months',
    cost: 'Usually free',
    description:
      'Dedicated mentoring programmes for women in engineering and electrical trades. Run by the IET, WES, and industry partners.',
  },
  {
    name: 'JTL Mentoring Support',
    duration: 'Throughout apprenticeship',
    cost: 'Free',
    description:
      'JTL training officers provide ongoing mentoring and support throughout your apprenticeship. They visit your workplace, check your progress, and help resolve any issues.',
  },
];

const actionPlan = [
  {
    step: 1,
    title: 'Start online',
    detail:
      'Create or update your LinkedIn profile this week. Join 2–3 electrical industry groups and start engaging with posts. Follow the IET, ECA, and key industry figures.',
  },
  {
    step: 2,
    title: 'Attend an event',
    detail:
      'Find a local IET talk, trade show, or ECA branch meeting within the next month. Go with the goal of meeting 3 new people and exchanging contact details.',
  },
  {
    step: 3,
    title: 'Build relationships',
    detail:
      'Follow up with everyone you meet within 48 hours. Connect on LinkedIn, send a brief message, and look for ways to help them. Networking is about giving, not just taking.',
  },
  {
    step: 4,
    title: 'Get your ECS card',
    detail:
      "If you don't already have one, apply for your ECS card through the JIB. It's the industry-standard proof of your qualifications and is required on most commercial sites.",
  },
];

const IndustryNetworking = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/professional-development')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Network"
          title="Industry networking"
          description="Trade bodies, conferences, and mentor programmes — the rooms where progression actually happens. Most apprentices skip this until late; the ones who don't get the better jobs."
          tone="yellow"
        />
      </motion.div>

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5">
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            Your network is your net worth in this industry. The connections you make as an
            apprentice can become lifelong professional relationships — opening doors to jobs,
            partnerships, and opportunities you'd never find on your own.
          </p>
        </div>
      </motion.div>

      {/* ── Professional bodies ──────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Professional bodies"
          title="Six worth knowing"
          meta="Recommended ones flagged"
        />
        <ul className="space-y-2.5">
          {professionalBodies.map((body) => (
            <li
              key={body.name}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="text-[15px] font-semibold text-white tracking-tight">{body.name}</h3>
                {body.recommended && (
                  <span className="inline-flex items-center h-6 px-2 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[10px] font-medium uppercase tracking-[0.14em] text-elec-yellow">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-[13px] text-white/85 leading-relaxed">{body.description}</p>
              <div className="flex items-center gap-2 text-[11.5px] font-mono tabular-nums text-white/55">
                <span>{body.cost}</span>
                <span>·</span>
                <span>{body.members}</span>
              </div>
              <ul className="space-y-1.5">
                {body.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Industry events ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Industry events"
          title="Five conferences that matter"
          meta="Where the deals actually get done"
        />
        <ul className="space-y-2">
          {industryEvents.map((event) => (
            <li
              key={event.name}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2"
            >
              <h3 className="text-[14px] font-semibold text-white tracking-tight">{event.name}</h3>
              <p className="text-[13px] text-white/85 leading-relaxed">{event.description}</p>
              <div className="flex items-center gap-2 text-[11.5px] font-mono tabular-nums text-white/55 flex-wrap">
                <span>{event.frequency}</span>
                <span>·</span>
                <span>{event.location}</span>
                <span>·</span>
                <span>{event.cost}</span>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Online communities ───────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Online communities"
          title="Four places to lurk"
          meta="Read first, post later"
        />
        <ul className="space-y-2">
          {onlineCommunities.map((community) => (
            <li
              key={community.name}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2"
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="text-[14px] font-semibold text-white tracking-tight">
                  {community.name}
                </h3>
                <span className="inline-flex items-center h-6 px-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-[10.5px] font-medium uppercase tracking-[0.14em] text-white/85">
                  {community.cost}
                </span>
              </div>
              <p className="text-[13px] text-white/85 leading-relaxed">{community.description}</p>
              <p className="text-[11.5px] text-white/55 font-mono">{community.members}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── LinkedIn ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="LinkedIn strategy"
          title="Four moves that compound"
          meta="The platform recruiters actually search"
        />
        <ul className="space-y-2">
          {linkedInTips.map((item) => (
            <li
              key={item.tip}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-1"
            >
              <h3 className="text-[14px] font-semibold text-white tracking-tight">{item.tip}</h3>
              <p className="text-[13px] text-white/85 leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Networking tips ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Networking tips that work"
          title="Five habits to build"
          meta="None of these cost money — all of them pay off"
        />
        <ul className="space-y-2">
          {networkingTips.map((item) => (
            <li
              key={item.tip}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-1"
            >
              <h3 className="text-[14px] font-semibold text-white tracking-tight">{item.tip}</h3>
              <p className="text-[13px] text-white/85 leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Mentorship ───────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Mentorship programmes"
          title="Four formal routes"
          meta="A mentor accelerates everything"
        />
        <ul className="space-y-2">
          {mentorshipProgrammes.map((programme) => (
            <li
              key={programme.name}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2"
            >
              <h3 className="text-[14px] font-semibold text-white tracking-tight">
                {programme.name}
              </h3>
              <p className="text-[13px] text-white/85 leading-relaxed">{programme.description}</p>
              <div className="flex items-center gap-2 text-[11.5px] font-mono tabular-nums text-white/55">
                <span>{programme.duration}</span>
                <span>·</span>
                <span>{programme.cost}</span>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Action plan ──────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Action plan"
          title="Four steps for this month"
          meta="Start small, compound from there"
        />
        <ol className="space-y-2">
          {actionPlan.map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] flex items-center justify-center flex-shrink-0">
                  <span className="text-[13px] font-mono font-semibold text-elec-yellow tabular-nums">
                    {item.step}
                  </span>
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </motion.section>

      {/* ── ROI tip ──────────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5">
          <Eyebrow className="text-elec-yellow/85">The ROI of networking</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            Industry surveys consistently show that{' '}
            <span className="font-mono text-elec-yellow">60–70%</span> of job opportunities are
            never advertised publicly. They're filled through referrals and personal connections.
            Even 30 minutes a week on LinkedIn can transform your career opportunities within a
            year.
          </p>
        </div>
      </motion.section>

      {/* ── Footnote ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <p className="text-[11px] text-white/40 leading-relaxed">
          Professional body information based on current UK membership rates and benefits. Costs and
          offerings may change — check directly with each organisation for the latest details.
        </p>
      </motion.section>
    </PageFrame>
  );
};

export default IndustryNetworking;
