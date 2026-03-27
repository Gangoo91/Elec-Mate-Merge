import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  TrendingUp,
  GraduationCap,
  PoundSterling,
  Briefcase,
  Star,
  Clock,
  FileCheck2,
  Calculator,
  Wrench,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/electrician-career-ladder-uk' },
  { label: 'Career Ladder', href: '/guides/electrician-career-ladder-uk' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'apprentice', label: 'Apprentice' },
  { id: 'electrician', label: 'Qualified Electrician' },
  { id: 'senior', label: 'Senior Electrician' },
  { id: 'supervisor', label: 'Contracts Supervisor' },
  { id: 'manager', label: 'Contracts Manager' },
  { id: 'director', label: 'Electrical Director' },
  { id: 'alternative', label: 'Alternative Routes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The standard UK electrical career ladder runs: Apprentice → Qualified Electrician → Senior Electrician → Contracts Supervisor → Contracts Manager → Electrical Director.',
  'From starting an apprenticeship to becoming a qualified electrician typically takes 4 to 5 years, including the apprenticeship period and AM2 assessment.',
  'Progressing from qualified electrician to contracts supervisor typically takes a further 5 to 8 years, involving further qualifications and increasing site responsibility.',
  'Salaries roughly double from the beginning of an apprenticeship (£10,000–£16,000) to qualified electrician (£32,000–£48,000) and can double again for experienced contracts managers (£65,000–£90,000).',
  'Alternative routes include self-employment/contracting, specialist technical roles (HV, BMS, CompEx), training and lecturing, and building an electrical contracting business.',
];

const faqs = [
  {
    question: 'How long does it take to become a qualified electrician in the UK?',
    answer:
      'The standard route takes 4 to 5 years. This includes a 3 to 4 year Level 3 Electrical Installation apprenticeship (combining on-the-job training with college study for NVQ Level 3 and City & Guilds 2365 Diploma or equivalent), followed by the AM2 End Point Assessment (typically taken towards the end of the apprenticeship or shortly after). Some apprentices complete within 3 years if they progress quickly; others take 4 years. After passing AM2, the electrician applies for the JIB ECS Gold Card and is graded as an Approved Electrician or Electrician Technician under the JIB grading scheme. The ECS Gold Card is the standard site access credential in the UK.',
  },
  {
    question: 'What qualifications do you need to become a senior electrician?',
    answer:
      'There is no single qualification that grants the title of senior electrician — it is largely a recognition of experience and capability within an employer. However, the qualifications that typically differentiate senior electricians from qualified electricians are: 18th Edition (BS 7671:2018+A2:2022, mandatory for all current work), C&G 2391 Inspection and Testing (or equivalent — 2394 and 2395), SSSTS (Site Supervisors Safety Training Scheme), possibly a specialist qualification (EV, solar PV, fire alarm, data systems), and experience as a lead electrician or working foreman on increasingly large projects. In practice, most electricians reach senior level after 5 to 8 years of varied experience.',
  },
  {
    question: 'What does a contracts supervisor do and what qualifications do they need?',
    answer:
      'A contracts supervisor manages the on-site delivery of one or more electrical contracts — coordinating the electricians on site, liaising with the main contractor and client, managing materials procurement, and ensuring the work is completed on programme, within budget, and to specification. Qualifications typically expected for a contracts supervisor role include: SMSTS (Site Management Safety Training Scheme), 18th Edition, First Aid at Work, CSCS Black Card (Construction Manager card), and often a supervisory NVQ Level 4 or equivalent. In some companies, a Contracts Supervisor may also be working on site as a lead electrician in addition to the supervisory duties.',
  },
  {
    question: 'How do you become an electrical contracts manager?',
    answer:
      'Electrical contracts managers typically progress from contracts supervisor roles after 3 to 5 years of supervisory experience. The contracts manager role moves further from the tools — it involves tendering for work, pricing variations, managing commercial relationships with clients and main contractors, monitoring the P&L of multiple contracts, and managing a team of supervisors and electricians. Qualifications that support the contracts manager role include: HNC or HND in Electrical Engineering, NVQ Level 5 or 6 in Construction Management, CIOB membership, or a construction-specific degree. Many contracts managers have been through the apprenticeship route and developed commercial skills through experience rather than formal academic qualifications.',
  },
  {
    question: 'What is the difference between an Electrical Contracts Manager and an Electrical Director?',
    answer:
      'An Electrical Contracts Manager has commercial and operational responsibility for a portfolio of contracts — they manage the projects and the people delivering them. An Electrical Director is typically a senior leader or company director responsible for the overall electrical business unit or division — setting strategy, managing key client relationships, overseeing business development, and holding P&L responsibility for the entire electrical operation. In smaller electrical contractors, the same person may hold both roles informally. In larger M&E contractors and national building services companies, the two roles are distinct. Electrical Directors typically need 15 to 20+ years of industry experience and often hold professional body membership (CIBSE, IET Membership or Fellowship, MIET or FIET).',
  },
  {
    question: 'Can you move into self-employment at any stage of the career ladder?',
    answer:
      'Yes. Self-employment is a viable route at different points on the career ladder. Many electricians go self-employed immediately after gaining their AM2 and ECS Gold Card — doing domestic work and building a customer base. Others stay employed for 5 to 10 years to build experience across different project types before going self-employed in their specialist area. Experienced contracts supervisors sometimes leave employment to work as freelance site supervisors, charging £350 to £500 per day. The key requirements for going self-employed at any stage are: relevant qualifications, Part P registration (for domestic work), PLI insurance, and a CSCS card if working on sites.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-salary-london',
    title: 'Electrician Salary in London',
    description: 'Detailed salary guide for London — from apprentice rates to contracts manager.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/master-electrician-uk',
    title: 'Master Electrician in the UK',
    description: 'What mastery means in the UK context, qualifications, and comparison to Europe.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/guides/from-electrician-to-electrical-contractor',
    title: 'From Electrician to Contractor',
    description: 'Going self-employed, pricing, insurance, and building a customer base.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/specialist-electrician-routes-uk',
    title: 'Specialist Electrician Routes',
    description: 'ATEX, HV, rail, data centre — specialist routes and salary uplift.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Training',
    description: 'Study for C&G 2391 — essential for career progression.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete installation certificates on site on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'The UK Electrician Career Ladder: From Apprentice to Director',
    content: (
      <>
        <p>
          The electrical industry in the UK has a clear career progression framework — from
          apprentice through to electrical director. Each rung of the ladder involves increasing
          technical complexity, commercial responsibility, and leadership. Salaries increase
          significantly at each stage, and the qualifications required reflect the expanding scope
          of the role.
        </p>
        <p>
          Unlike many professions, electricians can progress through the career ladder relatively
          quickly if they are ambitious, take on additional qualifications, and seek out
          responsibility. It is not uncommon for an electrician to move from apprenticeship to
          contracts supervisor within 10 to 12 years, and to contracts manager within 15 years.
        </p>
        <p>
          This guide sets out the six main stages of the UK electrician career ladder, the typical
          timeline and qualifications at each stage, and the salary range you can expect.
        </p>
      </>
    ),
  },
  {
    id: 'apprentice',
    heading: 'Stage 1: Apprentice Electrician',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-white font-semibold mb-1">Typical duration</p>
              <p className="text-white">3–4 years</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Salary range</p>
              <p className="text-white">£10,000–£22,000 (rising through years)</p>
            </div>
          </div>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>NVQ Level 3 Electrical Installation (on-the-job assessment)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>City &amp; Guilds 2365 Diploma in Electrical Installations (or equivalent Level 3 Tech Certificate)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>18th Edition (BS 7671) — typically taken in year 3 or 4</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>AM2 End Point Assessment — the gateway to full qualification</span>
            </li>
          </ul>
        </div>
        <p>
          Apprentice pay starts at the National Minimum Wage for apprentices (£7.55 per hour in
          2026) in year 1, rising to the National Minimum Wage for the apprentice's age in year 2+.
          Many employers pay above the minimum — a year 3 or 4 apprentice in a London commercial
          contractor might earn £18,000 to £22,000. On completing AM2, the apprentice applies for
          the JIB ECS Gold Card and becomes a fully qualified Approved Electrician.
        </p>
      </>
    ),
  },
  {
    id: 'electrician',
    heading: 'Stage 2: Qualified Electrician',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-white font-semibold mb-1">Typical entry point</p>
              <p className="text-white">On passing AM2</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Salary range</p>
              <p className="text-white">£28,000–£48,000 (varies by region)</p>
            </div>
          </div>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>JIB ECS Gold Card (Approved Electrician or Electrician Technician grade)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Part P registration scheme membership (for domestic work): NAPIT, NICEIC, or similar</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>CSCS Gold Card for site access</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>First Aid at Work (3-day) — increasingly expected on commercial sites</span>
            </li>
          </ul>
        </div>
        <p>
          As a newly qualified electrician, you will work under supervision on increasingly complex
          installations. This stage is about broadening experience across different work types —
          domestic, commercial, industrial — and beginning to build the 2391 Inspection and Testing
          qualification to unlock testing and certification work, which is both lucrative and
          important for further progression.
        </p>
        <SEOAppBridge
          title="Manage your electrical business from day one"
          description="Elec-Mate gives newly qualified electricians professional quoting, on-site certification, and job management tools to start their career the right way."
          icon={Wrench}
        />
      </>
    ),
  },
  {
    id: 'senior',
    heading: 'Stage 3: Senior Electrician',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-white font-semibold mb-1">Typical entry point</p>
              <p className="text-white">5–8 years post-qualification</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Salary range</p>
              <p className="text-white">£42,000–£62,000</p>
            </div>
          </div>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>C&amp;G 2391 Inspection and Testing (or 2394/2395)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>SSSTS (Site Supervisors Safety Training Scheme)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>One or more specialist qualifications (EV, solar PV, fire alarm, data, 2382 Design)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Substantial experience of leading small teams or working as the senior electrician on a section of a project</span>
            </li>
          </ul>
        </div>
        <p>
          Senior electricians are expected to be the point of technical reference on site — capable
          of reading and interpreting drawings, specifying materials, solving installation problems,
          and mentoring junior electricians and apprentices. The move to senior electrician is
          often marked by a significant salary uplift and forms the launching pad for progression
          into supervisory roles.
        </p>
      </>
    ),
  },
  {
    id: 'supervisor',
    heading: 'Stage 4: Contracts Supervisor',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-white font-semibold mb-1">Typical entry point</p>
              <p className="text-white">10–13 years post-qualification</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Salary range</p>
              <p className="text-white">£55,000–£75,000</p>
            </div>
          </div>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>SMSTS (Site Management Safety Training Scheme)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>CSCS Black Card (Construction Manager) or Supervisor card</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>NVQ Level 4 in Construction Site Supervision (increasingly expected)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Experience managing and co-ordinating electrical labour on site</span>
            </li>
          </ul>
        </div>
        <p>
          At contracts supervisor level, the role shifts decisively from hands-on electrical work
          to management of people, programme, and materials. The supervisor is responsible for
          on-site productivity, quality, and safety on one or more electrical contracts, reporting
          to the contracts manager.
        </p>
      </>
    ),
  },
  {
    id: 'manager',
    heading: 'Stage 5: Contracts Manager',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-white font-semibold mb-1">Typical entry point</p>
              <p className="text-white">15–18 years total experience</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Salary range</p>
              <p className="text-white">£65,000–£90,000</p>
            </div>
          </div>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>HNC or HND in Electrical or Building Services Engineering</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>NVQ Level 6 or 7 in Construction Management (or equivalent experience)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Commercial awareness: understanding of JCT/NEC contracts, variation management, final account negotiation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>MCIOB, MCIBSE, or MIET membership (valued, not always mandatory)</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'director',
    heading: 'Stage 6: Electrical Director',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-white font-semibold mb-1">Typical entry point</p>
              <p className="text-white">20+ years total experience</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Salary range</p>
              <p className="text-white">£90,000–£150,000+ (plus car, bonus, equity)</p>
            </div>
          </div>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Proven P&amp;L management across multiple contracts or a business division</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Strong client and stakeholder relationships</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>FIET, FCIBSE, or Chartered Engineer (CEng) status is common at director level</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Business development and tender strategy capability</span>
            </li>
          </ul>
        </div>
        <p>
          At electrical director level, the role is primarily strategic and commercial. The director
          sets the direction of the electrical business, manages key client relationships, monitors
          business performance, and leads the senior management team. Total remuneration at
          director level in a mid-size M&amp;E contractor typically includes salary, performance
          bonus (often 10 to 20% of salary), company car or car allowance, and potentially equity
          or profit share.
        </p>
      </>
    ),
  },
  {
    id: 'alternative',
    heading: 'Alternative Career Routes',
    content: (
      <>
        <p>
          The standard employed career ladder is not the only route. Other well-trodden paths include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employment and contracting</strong> — many electricians leave the
                employed route at any stage to build their own business. Successful small electrical
                contractors often achieve higher lifetime earnings than comparable employed paths,
                particularly in London and the South East.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist technical roles</strong> — HV, CompEx, rail, nuclear, offshore,
                and data centre specialists often earn more than contracts managers with equivalent
                years of experience, without the management burden.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Training and lecturing</strong> — experienced electricians with 2391 and
                good communication skills can move into FE college lecturing (£35,000 to £50,000),
                training delivery for NICEIC/NAPIT/ECA, or run their own CPD training courses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical design and consultancy</strong> — electricians with strong
                technical knowledge who pursue HNC/HND and design qualifications (C&amp;G 2396) can
                move into electrical design roles in building services consultancies, earning
                £45,000 to £75,000+ as a Chartered Building Services Engineer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianCareerLadderPage() {
  return (
    <GuideTemplate
      title="Electrician Career Ladder UK 2026 | Apprentice to Electrical Director"
      description="Complete guide to the UK electrician career ladder — apprentice, qualified electrician, senior electrician, contracts supervisor, contracts manager, and electrical director. Timelines, salaries, and required qualifications at each stage."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={TrendingUp}
      heroTitle={
        <>
          The UK Electrician Career Ladder:{' '}
          <span className="text-yellow-400">Apprentice to Electrical Director</span>
        </>
      }
      heroSubtitle="From starting an apprenticeship to running an electrical division — this guide maps the complete UK electrician career progression with realistic timelines, salary ranges, and the qualifications required at each stage."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the Electrician Career Ladder"
      relatedPages={relatedPages}
      ctaHeading="Support Your Career Progression with Elec-Mate"
      ctaSubheading="From newly qualified to contracts manager, Elec-Mate gives UK electricians the tools to work professionally — quoting, certification, training, and business management in one app."
    />
  );
}
