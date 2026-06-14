/**
 * Certifications — editorial directory of UK electrical certifications.
 *
 * Core certs, specialist categories, competent-person schemes, planning
 * strategy, and a recommended order. Replaces the previous yellow/blue/
 * green/purple section dots + multi-coloured Card chrome with the
 * editorial pattern.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

interface CoreCert {
  title: string;
  provider: string;
  cost: string;
  duration: string;
  validity: string;
  renewalRequired: boolean;
  prerequisites: string;
  description: string;
}

const coreCertifications: CoreCert[] = [
  {
    title: '18th Edition BS 7671 (Wiring Regulations)',
    provider: 'City & Guilds 2382 / EAL',
    cost: '£400–£600',
    duration: '3–5 days',
    validity: 'Current — update required when new edition published (expected mid-2030s)',
    renewalRequired: false,
    prerequisites: 'No formal prerequisites — but basic electrical knowledge strongly recommended',
    description:
      'The foundation of all UK electrical work. Covers the requirements of BS 7671:2018+A4:2026 for the design, erection, and verification of electrical installations. Mandatory for anyone carrying out electrical work.',
  },
  {
    title: 'AM2 Practical Assessment',
    provider: 'JTL / NET',
    cost: '£300–£450',
    duration: '1 day',
    validity: 'Lifetime — no renewal required',
    renewalRequired: false,
    prerequisites: 'Completion of Level 3 Electrical Installation apprenticeship or equivalent',
    description:
      'End-point practical assessment for electrical apprenticeships. Tests real-world installation skills including wiring, termination, and safe isolation under timed conditions.',
  },
  {
    title: 'Part P Building Regulations',
    provider: 'Various providers',
    cost: '£200–£350',
    duration: '1–2 days',
    validity: 'Lifetime knowledge — scheme membership renewed annually',
    renewalRequired: false,
    prerequisites: '18th Edition certificate recommended',
    description:
      'Understanding of the building regulations governing electrical work in dwellings. Required knowledge for domestic electrical installers in England and Wales.',
  },
  {
    title: '2391 Inspection & Testing',
    provider: 'City & Guilds 2391-52',
    cost: '£900–£1,400',
    duration: '5–7 days',
    validity: 'No expiry — CPD required',
    renewalRequired: false,
    prerequisites: '18th Edition certificate + 2–3 years practical experience recommended',
    description:
      'Qualification for initial verification and periodic inspection of electrical installations. Essential for producing EICRs and electrical installation certificates. A qualification, not a licence — does not expire.',
  },
  {
    title: 'PAT Testing (In-Service Inspection & Testing)',
    provider: 'City & Guilds 2377 / EAL',
    cost: '£200–£400',
    duration: '1–2 days',
    validity: 'No expiry — CPD recommended',
    renewalRequired: false,
    prerequisites: 'Basic electrical knowledge — no formal prerequisites',
    description:
      'Portable appliance testing qualification covering visual inspection, earth continuity, insulation resistance, and functional checks. Widely required in commercial and industrial environments.',
  },
];

interface SpecialistCert {
  name: string;
  cost: string;
  duration: string;
  note?: string;
}

const specialistCategories: { category: string; growth: string; certs: SpecialistCert[] }[] = [
  {
    category: 'Electric vehicle charging',
    growth: '45%',
    certs: [
      { name: 'City & Guilds 2919 (EV Charging)', cost: '£400–£600', duration: '2 days' },
      { name: 'Smart charging & load management', cost: '£300–£500', duration: '1 day' },
      {
        name: 'EV infrastructure certification',
        cost: '£500–£800',
        duration: '2–3 days',
        note: 'The OZEV Electric Vehicle Homecharge Scheme (EVHS) closed in March 2024. Current EV certification focuses on the IET Code of Practice for EV Charging Equipment Installation.',
      },
    ],
  },
  {
    category: 'Battery storage (BESS)',
    growth: '42%',
    certs: [
      { name: 'MCS approved battery storage', cost: '£600–£1,000', duration: '3 days' },
      { name: 'G99/G100 grid connection', cost: '£400–£600', duration: '1–2 days' },
    ],
  },
  {
    category: 'Heat pumps',
    growth: '38%',
    certs: [
      { name: 'MCS approved heat pump installation', cost: '£800–£1,200', duration: '3–5 days' },
      { name: 'F-Gas handling certification', cost: '£500–£800', duration: '2–3 days' },
    ],
  },
  {
    category: 'Solar PV',
    growth: 'Established',
    certs: [
      { name: 'Solar PV installation', cost: '£800–£1,200', duration: '5 days' },
      { name: 'City & Guilds 2399 (PV design)', cost: '£600–£900', duration: '3 days' },
    ],
  },
  {
    category: 'Fire detection & alarm',
    growth: '20%',
    certs: [
      { name: 'BS 5839 fire detection & alarm', cost: '£600–£1,000', duration: '3–5 days' },
      { name: 'Emergency lighting (BS 5266)', cost: '£400–£700', duration: '2–3 days' },
      {
        name: 'Fire alarm commissioning & maintenance',
        cost: '£500–£800',
        duration: '2–3 days',
        note: 'Required for commercial and industrial fire alarm maintenance contracts. Strong demand from facilities management companies.',
      },
    ],
  },
  {
    category: 'High voltage',
    growth: 'Premium',
    certs: [
      { name: 'HV switching operations', cost: '£2,000–£3,500', duration: '3–5 days' },
      { name: 'HV cable jointing', cost: '£3,500–£5,500', duration: '5–10 days' },
    ],
  },
  {
    category: 'Data centres',
    growth: '35%',
    certs: [
      { name: 'CDCDP (Certified Data Centre Design Professional)', cost: '£2,000–£3,500', duration: '5 days' },
      { name: 'UPS systems & power distribution', cost: '£800–£1,500', duration: '3 days' },
      {
        name: 'Raised floor & containment systems',
        cost: '£500–£800',
        duration: '2 days',
        note: 'Data centres are one of the fastest-growing sectors in the UK. Hyperscale facilities along the M4/M62 corridors are creating thousands of specialist electrical roles.',
      },
    ],
  },
  {
    category: 'Industrial & automation',
    growth: 'Steady',
    certs: [
      { name: 'PLC programming (Siemens / AB)', cost: '£1,500–£3,000', duration: '5 days' },
      { name: 'Motor control systems', cost: '£800–£1,200', duration: '3 days' },
    ],
  },
];

const competentPersonSchemes = [
  {
    name: 'NICEIC',
    cost: '£500–£900/yr',
    description:
      'The most widely recognised competent person scheme in the UK. Offers Domestic Installer and Approved Contractor registration. Rigorous assessment process builds strong customer trust.',
    benefits: [
      'High consumer recognition',
      'Self-certification of Part P work',
      'Technical helpline',
      'Regular assessment ensures standards',
    ],
  },
  {
    name: 'NAPIT',
    cost: '£400–£750/yr',
    description:
      'Multi-trade competent person scheme offering registration across electrical, plumbing, heating, and ventilation. Competitive pricing with comprehensive support.',
    benefits: [
      'Multi-trade registration options',
      'Self-certification of Part P work',
      'Online reporting portal',
      'Training and CPD support',
    ],
  },
  {
    name: 'Stroma',
    cost: '£400–£650/yr',
    description:
      'Competent person scheme covering electrical, gas, and building control certification. Formerly separate schemes now consolidated under the Stroma brand. Good for multi-skilled installers.',
    benefits: [
      'Electrical, gas, and building control',
      'Self-certification of Part P work',
      'Competitive annual fees',
      'Combined multi-discipline registration',
    ],
  },
];

const planningTips = [
  'Start with core certifications — 18th Edition and AM2 are your foundation',
  'Add the 2391 once you have 2–3 years of practical experience',
  'Consider PAT Testing early — quick, affordable, steady demand',
  'Choose specialist certifications based on your local market demand',
  'Fire alarm (BS 5839) and emergency lighting (BS 5266) are valuable for commercial work',
  'Check if your employer will fund training — many will cover all or part',
  'Book courses well in advance — popular ones fill up months ahead',
  'Keep a CPD log of all training and development activities',
  'Join a competent person scheme once you\'re working independently',
];

const Certifications = () => {
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
          eyebrow="Apprentice · Qualifications"
          title="Certifications & qualifications"
          description="The right certifications open doors to higher pay, specialist work, and career progression. From essentials to competent-person schemes — what each one is for and when to chase it."
          tone="yellow"
        />
      </motion.div>

      {/* ── Core certifications ──────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Core certifications"
          title="The five every electrician needs"
          meta="Foundation tier — most employers and schemes expect these"
        />
        <ul className="space-y-2.5">
          {coreCertifications.map((cert) => (
            <li
              key={cert.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
            >
              <h3 className="text-[15px] font-semibold text-white tracking-tight leading-snug">
                {cert.title}
              </h3>
              <p className="text-[13px] text-white/85 leading-relaxed">
                {cert.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 border-t border-white/[0.04]">
                <KpiTile label="Provider" value={cert.provider} />
                <KpiTile label="Cost" value={cert.cost} mono />
                <KpiTile label="Duration" value={cert.duration} mono />
                <KpiTile label="Validity" value={cert.validity} />
              </div>
              <div className="pt-1">
                <Eyebrow>Prerequisites</Eyebrow>
                <p className="text-[12px] text-white/70 leading-relaxed mt-1">
                  {cert.prerequisites}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Specialist certifications ────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Specialist categories"
          title="Eight high-demand areas"
          meta="Pick what matches your local market"
        />
        <ul className="space-y-2.5">
          {specialistCategories.map((cat) => (
            <li
              key={cat.category}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="text-[15px] font-semibold text-white tracking-tight">
                  {cat.category}
                </h3>
                <span
                  className={
                    'inline-flex items-center h-6 px-2 rounded-md border text-[10px] font-medium uppercase tracking-[0.14em] ' +
                    (cat.growth === 'Premium' || cat.growth.endsWith('%')
                      ? 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow'
                      : 'border-white/[0.10] bg-white/[0.03] text-white/85')
                  }
                >
                  {cat.growth} growth
                </span>
              </div>
              <ul className="space-y-2">
                {cat.certs.map((c) => (
                  <li
                    key={c.name}
                    className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
                  >
                    <p className="text-[13px] font-medium text-white leading-snug">
                      {c.name}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-mono tabular-nums text-white/55">
                      <span>{c.cost}</span>
                      <span>·</span>
                      <span>{c.duration}</span>
                    </div>
                    {c.note && (
                      <p className="text-[11.5px] text-white/70 leading-relaxed mt-1">
                        {c.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Competent person schemes ─────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Competent person schemes"
          title="Three main routes"
          meta="Required once you self-certify Part P work"
        />
        <ul className="space-y-2.5">
          {competentPersonSchemes.map((scheme) => (
            <li
              key={scheme.name}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="text-[15px] font-semibold text-white tracking-tight">
                  {scheme.name}
                </h3>
                <span className="text-[11px] font-mono text-elec-yellow tabular-nums">
                  {scheme.cost}
                </span>
              </div>
              <p className="text-[13px] text-white/85 leading-relaxed">
                {scheme.description}
              </p>
              <ul className="space-y-1.5">
                {scheme.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Planning strategy ────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Planning"
          title="Nine moves that pay off"
          meta="The sequencing that gets you the highest return"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-2">
            {planningTips.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Recommended order ────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5">
          <Eyebrow className="text-elec-yellow/85">Recommended order</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            Years 1–3: 18th Edition + AM2 + Part P. Years 3–5: 2391 + PAT Testing
            + first specialist cert (EV, Solar, or Fire Alarm). Year 5+: advanced
            specialisms (BESS, HV, Data Centres, PLC) + competent person scheme.
            This gives you the widest range of opportunities while building on
            solid foundations.
          </p>
        </div>
      </motion.section>

      {/* ── Footnote ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <p className="text-[11px] text-white/40 leading-relaxed">
          Certification costs and durations are indicative and vary by provider
          and location. Check with approved training providers for current
          pricing. Reflects BS 7671:2018+A4:2026.
        </p>
      </motion.section>
    </PageFrame>
  );
};

/* ─────────────────── KPI tile ─────────────────── */

function KpiTile({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="space-y-0.5 min-w-0">
      <Eyebrow className="text-[9px]">{label}</Eyebrow>
      <p
        className={
          'text-[11.5px] text-white leading-snug break-words ' +
          (mono ? 'font-mono tabular-nums' : '')
        }
      >
        {value}
      </p>
    </div>
  );
}

export default Certifications;
