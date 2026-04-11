import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  ClipboardCheck,
  Award,
  BookOpen,
  PoundSterling,
  Calendar,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-qualifications-pathway' },
  { label: 'Employer Guides', href: '/guides/city-guilds-2365-electrical' },
  {
    label: 'Supervising Electrical Apprentices',
    href: '/guides/supervising-electrical-apprentices',
  },
];

const tocItems = [
  { id: 'overview', label: 'Employer Obligations for Apprentice Supervision' },
  { id: 'supervision-ratio', label: 'Supervision Ratios and Live Conductor Rules' },
  { id: 'training-plan', label: 'Training Plan and Progress Reviews' },
  { id: 'jib-rates', label: 'JIB Apprenticeship Rates and Wage Uplift' },
  { id: 'am2-support', label: 'Supporting Your Apprentice Through the AM2' },
  { id: 'epao', label: 'End Point Assessment: The EPAO Process' },
  { id: 'for-employers', label: 'Elec-Mate Tools for Employers' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Employers who take on electrical apprentices have specific legal obligations under the Health and Safety at Work etc. Act 1974 and the Management of Health and Safety at Work Regulations 1999, particularly around adequate supervision and risk assessment for young workers.',
  'Electrical apprentices must never work unsupervised near live conductors. The JIB (Joint Industry Board) code of conduct and BS 7671 both support this — unlicensed persons must not carry out live working. Apprentices are not competent persons under the Electricity at Work Regulations 1989.',
  "The JIB apprenticeship wage schedule sets mandatory minimum hourly rates for electrical apprentices at each year of apprenticeship. Rates increase annually and upon achieving AM2 qualification. Failure to pay JIB rates is a breach of the employer's JIB registration agreement.",
  'The End Point Assessment Organisation (EPAO) for the electrical installation apprenticeship standard is EMTA (Engineering and Manufacturing Training Association). The employer and training provider must complete a gateway review confirming the apprentice is ready before EMTA schedules the AM2.',
  'A structured training plan — covering the full range of NVQ units across the apprenticeship duration — benefits both the apprentice and the employer by ensuring the NVQ portfolio is completed systematically rather than in a last-minute rush.',
];

const faqs = [
  {
    question: 'What supervision ratio is required for electrical apprentices?',
    answer:
      'There is no single statutory "supervision ratio" for electrical apprentices expressed as a fixed number. The requirement is that supervision must be adequate to protect the health and safety of the apprentice and others. The Management of Health and Safety at Work Regulations 1999 Regulation 19 requires employers to ensure young persons (under 18) are not employed in work that is beyond their physical or psychological capacity, involves harmful exposure to hazardous substances, or involves a risk of accidents that they cannot be expected to recognise because of their lack of experience. For electrical apprentices of all ages, the practical principle is that supervision must be close enough to ensure safety at all times — particularly during any work that involves proximity to energised conductors or equipment. The JIB supports a graduated supervision approach where the level of supervision reduces as the apprentice gains experience, but near live conductors, direct supervision (the supervisor physically present and actively monitoring) is always required.',
  },
  {
    question: 'Can an electrical apprentice work on their own?',
    answer:
      'An apprentice can perform some tasks independently — for example, routing cable in a property before the consumer unit is energised, or preparing containment. They should not work independently on tasks that involve proximity to energised conductors, or on tasks that require the competence of a qualified electrician (such as certifying completed work). The Electricity at Work Regulations 1989 (EWR) Regulation 12 prohibits work on or near live conductors unless it is unreasonable in all circumstances for the equipment to be dead. EWR Regulation 16 requires that no one works on electrical equipment unless they are technically competent or under appropriate supervision. An apprentice is by definition not yet technically competent — the supervision requirement applies throughout the apprenticeship. "Appropriate supervision" means the supervisor is genuinely supervising — physically present, aware of what the apprentice is doing, and capable of intervening immediately if a safety issue arises.',
  },
  {
    question: 'What are the JIB apprenticeship hourly rates in 2026?',
    answer:
      'JIB (Joint Industry Board for the Electrical Contracting Industry) sets mandatory minimum hourly rates for apprentices employed by JIB-registered employers. The rates are structured by year of apprenticeship and are updated annually, typically in January. For 2026, the approximate rates (confirm current rates at jib.org.uk) are: Year 1 — approximately £7.80–£8.20/hour; Year 2 — approximately £9.00–£9.50/hour; Year 3 — approximately £10.50–£11.00/hour; Year 4 (if applicable) — approximately £12.00–£12.50/hour. Upon passing the AM2 and achieving the AM2 certificate, the apprentice transitions to the Electrician rate, which is significantly higher than the Year 4 rate. Exact current rates must be confirmed with the JIB directly at jib.org.uk. Employers must pay at least the JIB rate — paying below the JIB rate is a breach of the registration agreement and can result in JIB membership suspension.',
  },
  {
    question: "What is the employer's role in the EPAO process?",
    answer:
      'The employer plays a central role in the End Point Assessment gateway process. Before the apprentice can attempt the AM2, the employer must: confirm that the apprentice has demonstrated the required on-the-job competence across the Knowledge, Skills, and Behaviours (KSBs) defined in the apprenticeship standard; sign off the gateway review (jointly with the training provider) certifying that the apprentice is ready for End Point Assessment; confirm that the apprentice has completed their NVQ portfolio to the required standard; and confirm that the apprentice has achieved the required Maths and English level (typically Functional Skills Level 2 or GCSE grade 4/C). The employer cannot withhold gateway sign-off unreasonably — if the apprentice has met all the requirements, the employer must support them in progressing to the AM2. Withholding gateway sign-off as a way of retaining a productive apprentice on lower wages is a breach of the apprenticeship agreement.',
  },
  {
    question: 'What happens if an apprentice fails the AM2?',
    answer:
      "If an apprentice fails the AM2 on their first attempt, they can resit after a suitable preparation period. There is no statutory limit on the number of AM2 attempts, but apprenticeship funding (from the Education and Skills Funding Agency or the employer's Apprenticeship Levy account) may limit the number of funded resit attempts. The employer should review the assessor feedback with the apprentice and identify the specific areas where additional preparation is needed. The training provider should offer additional mock AM2 sessions targeting the failure areas. The most common failure causes are time management and testing sequence — both are addressable with focused practice. Employers should avoid pressuring apprentices to resit before they are genuinely ready — a second failure compounds the apprentice's loss of confidence and delays qualification.",
  },
  {
    question: "Do apprentices count towards the supervisor's workload on a job?",
    answer:
      "An apprentice under active supervision adds to rather than reduces the supervisor's workload — the supervisor must divide their attention between their own work and monitoring and instructing the apprentice. Employers should factor this into job pricing and task allocation. As the apprentice gains experience and competence (in their third and fourth year), they can take on more independent tasks under general (rather than close) supervision — at this point they do begin to add productive capacity to the job. The correct view of an apprentice is as a long-term investment: the cost of supervision in years 1–2 is offset by the value of a qualified electrician who knows the employer's methods, systems, and clients in years 5 and beyond.",
  },
  {
    question: 'What training plan should I provide for an electrical apprentice?',
    answer:
      'The training plan should map out how the apprentice will gain experience of all the activities required to complete their NVQ units and apprenticeship standard KSBs over the duration of the apprenticeship. A good training plan considers: the range of installation types the employer can provide (domestic, commercial, industrial, specialist — the more varied, the richer the portfolio evidence); planned rotation across different job types to ensure the apprentice gains experience in all mandatory unit areas; scheduled assessor observation visits that align with planned job activities; progression milestones (when the apprentice should be able to carry out specific tasks with reduced supervision); and support for off-the-job training requirements (typically 20% of the apprenticeship time). Review the training plan with the apprentice and training provider at the beginning of the apprenticeship and at each progress review. Adjust as the apprentice develops faster or slower than anticipated.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/apprentice-portfolio-building-tips',
    title: 'Apprentice Portfolio Building Tips',
    description: 'NVQ evidence requirements, observation records, and portfolio organisation.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/am2-assessment-preparation',
    title: 'AM2 Assessment Preparation',
    description: 'What the AM2 covers, how to book, and a 2–4 week preparation plan.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2365-unit-201',
    title: 'C&G 2365 Unit 201 — Health and Safety',
    description: 'The health and safety knowledge your apprentice will be assessed on.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2365-electrical',
    title: 'City & Guilds 2365 Complete Overview',
    description: 'Full qualification structure and progression for electrical apprentices.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/training/apprentice-hub',
    title: 'Apprentice Training Hub',
    description: 'Full Level 2 and Level 3 training modules with AI study support.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/supervising-electrical-apprentices',
    title: 'Electrical Qualifications Pathway',
    description: 'Overview of electrical qualifications from apprenticeship to Master Electrician.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Employer Obligations When Supervising Electrical Apprentices',
    content: (
      <>
        <p>
          Taking on an electrical apprentice is a legal commitment as well as a business decision.
          Employers have specific obligations under employment law, health and safety legislation,
          the JIB registration agreement, and the apprenticeship agreement itself. Meeting these
          obligations protects the apprentice, the employer, and the quality of the finished
          qualification.
        </p>
        <p>
          The primary legislative framework for apprentice supervision comes from the Health and
          Safety at Work etc. Act 1974, the Management of Health and Safety at Work Regulations 1999
          (particularly Regulation 19 on young persons), and the Electricity at Work Regulations
          1989. These place duties on the employer that cannot be contracted away — they apply
          regardless of what the apprenticeship agreement says.
        </p>
        <p>
          Beyond legal compliance, the quality of on-the-job supervision and training directly
          determines how quickly an apprentice develops genuine competence. An apprentice who is
          given real responsibility, progressively challenging work, and constructive feedback
          reaches AM2 standard significantly faster than one who is relegated to labouring tasks
          throughout the apprenticeship.
        </p>
      </>
    ),
  },
  {
    id: 'supervision-ratio',
    heading: 'Supervision Ratios and the Live Conductor Rule',
    content: (
      <>
        <p>
          The most important supervision rule for electrical apprentices is simple: apprentices must
          never work unsupervised near live conductors. This is not just a JIB preference — it is a
          legal requirement under the Electricity at Work Regulations 1989 and a fundamental safety
          principle.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EWR Regulation 16:</strong> No one shall engage in work activity in such
                circumstances that danger may arise unless they are competent to prevent that
                danger, or are under appropriate supervision. An apprentice is not a competent
                person under EWR. Appropriate supervision near live conductors means the supervisor
                is physically present and actively monitoring — not in a different room or on a
                separate floor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation:</strong> Only a competent person can carry out safe
                isolation. An apprentice should not isolate a circuit and leave it isolated as the
                last person accountable for that isolation. They can participate in safe isolation
                under direct supervision and as part of learning the procedure — but the competent
                supervisor carries responsibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>What apprentices can do independently:</strong> Cable routing in dead
                installations, containment installation (raceways, trunking, conduit) in isolated
                areas, fetching and preparing materials, labelling, and other tasks that do not
                involve proximity to energised conductors. As the apprenticeship progresses and
                competence develops, the range of tasks the apprentice can do with general (rather
                than close) supervision increases — but work near live conductors always requires
                the supervisor to be present.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The MHSWR Regulation 19 requires a specific risk assessment for young workers (under 18).
          This must identify the specific risks to which the young person may be exposed, including
          electrical hazards, and the controls in place. Even for apprentices over 18, best practice
          is to carry out a similar risk assessment for new apprentice employees.
        </p>
      </>
    ),
  },
  {
    id: 'training-plan',
    heading: 'Training Plan and Progress Reviews',
    content: (
      <>
        <p>
          A structured training plan is not just good practice — it is a requirement of the
          apprenticeship funding rules. The plan should be agreed at the start of the apprenticeship
          between the employer, apprentice, and training provider, and reviewed at regular
          intervals.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 space-y-4">
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-yellow-400" />
              Initial Training Plan (Start of Apprenticeship)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Map the NVQ units against the types of work the employer carries out. Identify any
              unit areas where the employer cannot provide on-the-job experience (for example, an
              employer who only does domestic work may not be able to provide evidence for
              commercial or industrial units). Agree a plan with the training provider for how these
              gaps will be addressed — through day release at college, block release at a training
              centre, or work experience with another employer.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              Quarterly Progress Reviews
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Meet with the apprentice and training provider assessor quarterly to review progress
              against the training plan. Identify units that are behind schedule and plan specific
              activities to generate the missing evidence. Discuss the apprentice's development,
              strengths, and areas requiring additional support. Review whether the training plan
              needs adjusting in light of changes to the work programme.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-400" />
              Pre-Gateway Review (6 Months Before AM2)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Approximately 6 months before the expected AM2 date, conduct a thorough portfolio
              review. Identify any remaining unit gaps and plan activities to close them. Confirm
              that Maths and English requirements are met. Begin planning the AM2 preparation period
              and confirm the booking timeline with EMTA through the training provider.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'jib-rates',
    heading: 'JIB Apprenticeship Rates and Wage Uplift Schedule',
    content: (
      <>
        <p>
          The Joint Industry Board for the Electrical Contracting Industry (JIB) sets mandatory
          minimum wage rates for electricians and apprentices employed by JIB-registered employers.
          JIB registration is a requirement for membership of the major electrical contracting
          employer associations (ECA, SELECT) and for many public sector and main contractor supply
          chains.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white mb-4">
            Apprentice Wage Structure (2026 — Confirm at jib.org.uk)
          </h3>
          <div className="space-y-3">
            {[
              { period: 'Year 1', rate: '~£8.00/hour', note: 'Starting rate, maximum supervision' },
              {
                period: 'Year 2',
                rate: '~£9.25/hour',
                note: 'Increasing independence on safe tasks',
              },
              { period: 'Year 3', rate: '~£10.75/hour', note: 'Significant competence expected' },
              {
                period: 'Year 4 / Pre-AM2',
                rate: '~£12.25/hour',
                note: 'Near-qualified, minimal supervision on most tasks',
              },
              {
                period: 'Post-AM2 (Electrician)',
                rate: 'JIB Electrician rate (significantly higher)',
                note: 'Full qualified electrician rate',
              },
            ].map((row) => (
              <div
                key={row.period}
                className="flex items-start gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <div className="w-28 shrink-0">
                  <p className="text-yellow-400 font-semibold text-sm">{row.period}</p>
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{row.rate}</p>
                  <p className="text-white text-xs">{row.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">
                Always confirm current rates with the JIB
              </h4>
              <p className="text-white text-sm leading-relaxed">
                JIB rates are updated annually. The figures above are approximate 2026 values for
                reference only. Always check the current JIB Working Rule Agreement at jib.org.uk
                for the definitive rates. Paying below the JIB rate is a breach of the employer's
                JIB registration agreement and can result in suspension of JIB membership.
              </p>
            </div>
          </div>
        </div>
        <p>
          Beyond the minimum JIB rates, many employers pay enhanced rates to attract and retain good
          apprentices — particularly in areas with high competition for electrical apprentices.
          Travel expenses, tool allowances, and enhanced rates for lodging away from home are also
          common in the industry.
        </p>
      </>
    ),
  },
  {
    id: 'am2-support',
    heading: 'Supporting Your Apprentice Through the AM2',
    content: (
      <>
        <p>
          The AM2 is the final practical hurdle before the apprentice qualifies. The employer's
          support during the preparation period significantly affects the outcome:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Allow preparation time:</strong> In the 2–4 weeks before the AM2, allow the
                apprentice to attend additional mock assessment sessions at the training provider.
                Some employers allow reduced hours on site during this period. The cost of a mock
                session is significantly less than the cost of an AM2 resit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide varied experience:</strong> In the months leading up to the AM2,
                ensure the apprentice has recently wired consumer units, carried out the full
                inspection and testing sequence, and practised fault-finding on real installations.
                The AM2 tasks are directly drawn from these activities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Support, do not pressure:</strong> Anxiety is one of the factors that causes
                AM2 failure — particularly time pressure anxiety. Encourage the apprentice without
                creating additional stress about the importance of passing. A candidate who has
                practised adequately should approach the AM2 with confidence rather than fear.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Submit the gateway review promptly:</strong> Once the apprentice is
                genuinely ready, submit the gateway review without delay. EMTA assessment centres
                have waiting lists — the earlier the gateway is submitted, the earlier the AM2 can
                be scheduled and the sooner the apprentice qualifies.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'epao',
    heading: 'End Point Assessment: The EPAO Process',
    content: (
      <>
        <p>
          The End Point Assessment Organisation (EPAO) for the electrical installation
          apprenticeship standard (ST0215) is EMTA (Engineering and Manufacturing Training
          Association). EMTA manages the AM2 assessment process, appoints and trains AM2 assessors,
          and issues the End Point Assessment certificates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 space-y-4">
          <div>
            <h3 className="font-bold text-white mb-2">The Gateway Process</h3>
            <p className="text-white text-sm leading-relaxed">
              Before the AM2 can be scheduled, the employer and training provider must complete a
              gateway review confirming: the NVQ portfolio is complete and internally verified; the
              apprenticeship standard KSBs are evidenced; Maths and English requirements are met;
              and the employer confirms the apprentice is ready for End Point Assessment. The
              gateway review is submitted to EMTA, who then schedules the AM2 at an approved
              assessment centre.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">After the AM2</h3>
            <p className="text-white text-sm leading-relaxed">
              Following a successful AM2, EMTA issues the End Point Assessment certificate. The
              apprentice can then apply for a JIB ECS Gold Card (Electrician grade), which requires:
              the AM2 certificate, the Level 3 NVQ Diploma, and a valid ECS health and safety test
              pass. The JIB Gold Card is the industry standard proof of electrical qualification —
              most contractors and employers require it for site access and employment as a
              qualified electrician.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Support your apprentice with AI-powered study and site tools"
          description="Elec-Mate gives your apprentice access to inspection and testing training modules, AI fault-finding support, and EIC certification tools — everything needed to build portfolio evidence and prepare for the AM2."
          icon={Users}
        />
      </>
    ),
  },
  {
    id: 'for-employers',
    heading: 'Elec-Mate Tools for Employers with Apprentices',
    content: (
      <>
        <p>
          Elec-Mate supports both the employer and the apprentice throughout the electrical
          apprenticeship:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Apprentices can complete{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  under supervision, generating professional portfolio evidence and learning the
                  certification process in a real-work context.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Apprentice Training Hub</h4>
                <p className="text-white text-sm leading-relaxed">
                  The Elec-Mate apprentice training hub covers all City & Guilds 2365 units with AI
                  practice questions, worked examples, and flashcards for revision on the go.
                  Complement the college day release with structured on-the-job revision.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  AI Risk Assessment and Method Statements
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate site-specific risk assessments and method statements that the apprentice
                  can learn from and contribute to. The process of creating a method statement
                  teaches the apprentice to identify hazards and controls — excellent portfolio
                  knowledge evidence for health and safety units.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Support your apprentice with the tools qualified electricians use every day"
          description="Join 1,000+ UK electrical contractors using Elec-Mate for quoting, certification, and AI site support. Give your apprentice access to the same professional tools — building real competence alongside real work. 7-day free trial."
          icon={Users}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SupervisingApprenticesPage() {
  return (
    <GuideTemplate
      title="Supervising Electrical Apprentices UK | Employer Obligations, JIB Rates, AM2 Support"
      description="Complete guide for UK electrical employers supervising apprentices. Supervision ratios, live conductor rules, JIB apprenticeship wage rates 2026, training plan structure, AM2 support, and the EPAO End Point Assessment process."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Employer Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Supervising Electrical Apprentices:{' '}
          <span className="text-yellow-400">Employer Obligations, JIB Rates, and AM2 Support</span>
        </>
      }
      heroSubtitle="Everything UK electrical employers need to know about supervising apprentices — legal obligations, supervision ratios near live conductors, JIB apprenticeship wage rates, training plan structure, AM2 preparation support, and the EPAO End Point Assessment process."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Supervising Electrical Apprentices"
      relatedPages={relatedPages}
      ctaHeading="Support Your Apprentice with Professional Electrical Tools"
      ctaSubheading="Give your apprentice access to the EIC certification app, AI training hub, and fault-finding tools used by 1,000+ UK electrical contractors. Build real portfolio evidence on real jobs. 7-day free trial."
    />
  );
}
