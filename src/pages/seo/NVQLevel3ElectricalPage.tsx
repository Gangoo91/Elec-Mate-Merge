import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  Award,
  PoundSterling,
  ClipboardCheck,
  CheckCircle2,
  GraduationCap,
  FileCheck2,
  Zap,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Qualifications', href: '/how-to-become-electrician' },
  { label: 'NVQ Level 3 Electrical', href: '/nvq-level3-electrical' },
];

const tocItems = [
  { id: 'what-is-nvq', label: 'What is the NVQ Level 3?' },
  { id: 'nvq-vs-cg2365', label: 'NVQ vs City and Guilds 2365' },
  { id: 'who-needs-it', label: 'Who Needs an NVQ Level 3?' },
  { id: 'eal-vs-cg', label: 'EAL vs City and Guilds Providers' },
  { id: 'portfolio', label: 'Building Your Portfolio of Evidence' },
  { id: 'am2', label: 'AM2 Assessment' },
  { id: 'costs', label: 'Costs (£800–£2,500)' },
  { id: 'timescale', label: 'Timescale (6–24 Months)' },
  { id: 'for-electricians', label: 'For Electricians: After Your NVQ' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The NVQ Level 3 Diploma in Electrotechnical Technology (Installation) is a competency-based qualification assessed entirely through a portfolio of evidence and on-site observation. There are no written examinations.',
  'The NVQ Level 3 is the standard qualification route for experienced electricians who are already working in the trade but did not complete a formal apprenticeship or college-based qualification.',
  'It is fundamentally different from the City and Guilds 2365 Diploma — the 2365 is knowledge-based (exams plus practical assessments), while the NVQ is competency-based (observed workplace performance plus portfolio evidence).',
  'To achieve a JIB ECS Gold Card (electrician grade) you must hold NVQ Level 3 or equivalent and the AM2 assessment. The NVQ alone is not sufficient — both are required.',
  'Costs range from approximately £800 to £2,500 depending on the centre and the number of observations required. Timescales range from six months for candidates working across a wide variety of projects to 24 months for those in a narrow installation environment.',
];

const faqs = [
  {
    question: 'What is the difference between an NVQ Level 3 and City and Guilds 2365?',
    answer:
      'The City and Guilds 2365 Diploma in Electrical Installations is a knowledge-based qualification delivered through a college. It involves written examinations, practical assessments, and classroom learning, and is the standard qualification completed during a formal electrical apprenticeship. The NVQ Level 3 (formally the Level 3 NVQ Diploma in Electrotechnical Technology) is a competency-based qualification assessed through observed workplace performance and a portfolio of evidence. There are no written exams. The NVQ is designed for experienced electricians who are already working in the trade but lack a formal qualification. Most apprentices complete both the 2365 and NVQ together as part of their apprenticeship programme.',
  },
  {
    question: 'Do I need an NVQ Level 3 to get a Gold ECS Card?',
    answer:
      'Yes. To obtain a JIB Electrotechnical Certification Scheme (ECS) Gold Card at electrician grade, you must hold an NVQ Level 3 (or equivalent, such as the City and Guilds 2360 or 2365 at the appropriate level) and the AM2 assessment. An NVQ Level 3 alone, without the AM2, will result in an ECS Experienced Worker card rather than a Gold Card. The Gold Card is the recognised industry standard for a fully qualified electrician and is required by most large contractors and principal employers.',
  },
  {
    question: 'How long does the NVQ Level 3 take to complete?',
    answer:
      'The timescale varies significantly depending on the breadth of your work and how quickly you can gather sufficient portfolio evidence. Candidates working across a wide range of installation environments — domestic, commercial, industrial — can gather diverse evidence more quickly and may complete in six to twelve months. Candidates in a single specialised environment (e.g., only domestic rewires) may take eighteen to twenty-four months to demonstrate competence across all required units. Your assessor will make regular site visits to observe your work and verify evidence.',
  },
  {
    question: 'What does the NVQ portfolio of evidence include?',
    answer:
      'The portfolio typically includes: witness statements from your employer or site supervisors confirming observed competence, photographic evidence of completed installation work, test results and certificates you have produced, job sheets and work records, risk assessment and method statement examples, and records of direct observations by your NVQ assessor. Evidence must cover all mandatory and selected optional units of the qualification. Your assessor will guide you on the specific evidence required for each unit.',
  },
  {
    question: 'Can I do an NVQ Level 3 without an employer?',
    answer:
      'In practice, no. The NVQ Level 3 requires real workplace evidence from live installation projects. Without employment or a working arrangement in the electrical industry, you cannot generate the evidence required. Some NVQ centres will work with self-employed electricians who can demonstrate active site work. If you are self-employed and working on your own projects, you can use those projects as evidence, but you will still need a qualified supervisor to provide witness statements.',
  },
  {
    question: 'What is the AM2 assessment and is it separate from the NVQ?',
    answer:
      'The AM2 (Achievement Measure 2) is a practical assessment conducted at an approved AM2 centre. It tests candidates across a range of practical installation and testing tasks under time pressure, simulating real-world installation conditions. It is separate from the NVQ Level 3 and is not part of the NVQ itself — it is an additional assessment required for ECS Gold Card eligibility. The AM2 is administered by Lazonby Training (formerly JTL) and is conducted at approved assessment centres. Most candidates attempt the AM2 after completing, or shortly before completing, their NVQ.',
  },
  {
    question: 'How much does the NVQ Level 3 cost?',
    answer:
      'Total costs vary between approximately £800 and £2,500 depending on the training provider, your location, and the number of site visits required by your assessor. Some providers offer all-inclusive packages covering registration fees, assessment visits, and the final portfolio verification. Others charge per visit. Government funding may be available for eligible candidates through Adult Skills funding (for those aged 24 or over in England). Apprentices completing their programme through a training provider will typically have their NVQ funded as part of the apprenticeship package.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/how-to-become-electrician',
    title: 'How to Become an Electrician',
    description: 'Routes into the electrical trade: apprenticeships, adult entry, AM2, and getting your first job.',
    icon: GraduationCap,
    category: 'Career Guide',
  },
  {
    href: '/am2-assessment-prep',
    title: 'AM2 Assessment Preparation',
    description: 'What to expect in the AM2 practical assessment and how to pass first time.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/electrical-engineering-degree',
    title: 'Electrical Engineering Degree Routes',
    description: 'BEng vs MEng, HNC/HND top-up, Chartered Engineer routes and 2026 salary guide.',
    icon: BookOpen,
    category: 'Career Guide',
  },
  {
    href: '/niceic-registration',
    title: 'NICEIC Registration Guide',
    description: 'How to register with NICEIC as a sole trader or company — requirements, costs, and assessment.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-nvq',
    heading: 'What is the NVQ Level 3 in Electrotechnical Installation?',
    content: (
      <>
        <p>
          The Level 3 NVQ Diploma in Electrotechnical Technology (Installation, Maintenance and
          Commissioning) — commonly referred to as the NVQ Level 3 — is a competency-based
          qualification regulated by Ofqual. It confirms that a candidate can perform electrical
          installation work to the required standard in a real workplace environment.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No written examinations</strong> — the NVQ is assessed entirely through
                a portfolio of evidence and direct observation by a qualified assessor. Candidates
                are not required to sit any written exams. This makes it accessible to experienced
                electricians who have strong practical ability but may struggle with formal
                academic assessments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace-based assessment</strong> — your assessor makes regular visits
                to your workplace or job sites to observe you working and to verify your portfolio
                evidence. The qualification is awarded when you have demonstrated competence
                across all mandatory and selected optional units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Units covered</strong> — the qualification covers safe working practices,
                health and safety, wiring systems and enclosures, installing wiring systems,
                terminating and connecting conductors, inspection and testing, and fault
                diagnosis. The specific units depend on the pathway (installation, maintenance,
                or commissioning).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 knowledge required</strong> — while there is no written exam,
                candidates are expected to demonstrate working knowledge of BS 7671 (the IET
                Wiring Regulations) during observations and assessor questioning. Regular study
                of the 18th Edition Wiring Regulations is essential.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'nvq-vs-cg2365',
    heading: 'NVQ Level 3 vs City and Guilds 2365: Key Differences',
    content: (
      <>
        <p>
          Both the NVQ Level 3 and the City and Guilds 2365 Diploma are recognised routes to
          electrical qualifications in the UK, but they serve different purposes and suit
          different candidates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City and Guilds 2365 — knowledge-based</strong> — delivered through a
                college, involves written examinations, practical assessments, and classroom
                learning. Typically completed as part of a formal apprenticeship. Covers
                electrical principles, science, technology, and installation in a structured
                curriculum. Suitable for those starting in the trade with no prior experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NVQ Level 3 — competency-based</strong> — assessed entirely through
                workplace observation and portfolio of evidence. No written examinations.
                Suitable for experienced electricians already working in the trade who want to
                formalise their competence. Does not replace the 2365 — they test different things.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprenticeship — both together</strong> — the standard electrical
                apprenticeship (Level 3 Electrotechnical Installation Apprenticeship) includes
                both the City and Guilds 2365 (knowledge) and NVQ Level 3 (competency)
                components, plus the AM2 assessment. This is the most comprehensive route and
                the benchmark the industry measures against.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Card recognition</strong> — both routes, combined with AM2, lead
                to the JIB ECS Gold Card. The NVQ alone (without the 2365 or equivalent and
                AM2) leads only to an Experienced Worker card, which is not accepted by many
                principal contractors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'who-needs-it',
    heading: 'Who Needs an NVQ Level 3?',
    content: (
      <>
        <p>
          The NVQ Level 3 is primarily designed for experienced electricians who are working
          in the trade but do not hold a formal qualification. Several specific situations
          make the NVQ the right choice.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mature entrants with site experience</strong> — electricians who entered
                the trade in a different way (e.g., helping a family member, working as a mate
                for years, or entering from abroad) and who have significant practical experience
                but no UK qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overseas-qualified electricians</strong> — electricians who qualified
                in countries where their qualification is not directly recognised in the UK.
                The NVQ provides a recognised UK competency qualification to support
                registration with competent person schemes such as NICEIC or NAPIT.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Those upgrading from older qualifications</strong> — electricians who
                hold older City and Guilds qualifications (e.g., the 2360 Part I and Part II)
                that are no longer accepted as current by some competent person schemes or
                principal employers may use the NVQ to evidence current competence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic installers seeking commercial work</strong> — those who can
                demonstrate competence in a wider range of installation environments, including
                commercial and industrial work, to satisfy the evidence requirements of larger
                principal contractors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eal-vs-cg',
    heading: 'EAL vs City and Guilds: Choosing Your NVQ Provider',
    content: (
      <>
        <p>
          The NVQ Level 3 in Electrotechnical Technology is offered by two primary awarding
          bodies in the UK: EAL (the engineering sector awarding organisation) and City and
          Guilds. Both are regulated by Ofqual and produce qualifications recognised for ECS
          card purposes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EAL (Excellence Achievement and Learning)</strong> — the specialist
                engineering and technology awarding body, owned by the Electrical Contractors
                Association (ECA). EAL NVQs are delivered through approved EAL training centres
                and are widely accepted by NICEIC, NAPIT, ELECSA, and the JIB. EAL has a
                significant presence in the electrotechnical sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City and Guilds</strong> — the UK&apos;s most widely known vocational awarding
                body. The City and Guilds Level 3 NVQ Diploma in Electrotechnical Technology
                is widely delivered through FE colleges and private training centres. City and
                Guilds NVQs are accepted for ECS card purposes and by all major competent
                person schemes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to choose</strong> — consider the local availability of approved
                centres, the centre&apos;s assessor-to-candidate ratio, the flexibility of assessment
                visits, and the total cost. Both awarding bodies produce equivalent outcomes for
                career purposes. The quality of the training centre and assessor matters more
                than the awarding body.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'portfolio',
    heading: 'Building Your Portfolio of Evidence',
    content: (
      <>
        <p>
          The portfolio of evidence is the core of the NVQ Level 3. It must demonstrate that
          you are competent across all required units through real workplace evidence.
          Understanding what good evidence looks like is key to completing the NVQ efficiently.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Direct observation records</strong> — your assessor observes you
                performing installation, testing, and fault-finding tasks on site and records
                what they observed. This is the strongest form of evidence and cannot be replaced
                by other types.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Witness statements</strong> — written statements from your employer,
                supervisor, or colleagues confirming they have seen you perform specific tasks.
                Must be signed and dated. Witness statements supplement but do not replace
                assessor observations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photographic evidence</strong> — photographs of completed work,
                labelled and annotated to show what they demonstrate. Particularly useful for
                evidencing installation work (cable containment, consumer units, socket positions)
                that is later concealed or handed over to the client.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work products</strong> — test sheets, certificates (EIC, EICR, Minor
                Works), risk assessments, method statements, job sheets, and other documents
                you produce as part of your work. Using{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Elec-Mate for certificates
                </SEOInternalLink>{' '}
                produces professional, compliant documents that are excellent portfolio evidence.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'am2',
    heading: 'The AM2 Assessment: What to Expect',
    content: (
      <>
        <p>
          The AM2 (Achievement Measure 2) is a practical assessment conducted at an approved
          AM2 centre over approximately one and a half days. It is separate from the NVQ
          but is required alongside it for ECS Gold Card eligibility.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What you are assessed on</strong> — installation of a wiring system from
                drawings, terminating cables and equipment, inspection and testing of the
                installation, completing test documentation, and fault diagnosis on a pre-faulted
                installation. All tasks are completed under time pressure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Booking the AM2</strong> — the AM2 is booked through Lazonby Training
                (formerly JTL) at approved assessment centres across the UK. Booking well in
                advance is recommended as centres can have waiting lists of several weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost</strong> — the AM2 assessment fee is approximately £350 to £500
                in 2026. Travel and accommodation costs for candidates attending distant
                centres should also be budgeted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Preparation</strong> — practise your inspection and testing technique,
                ensure you can complete test documentation quickly and accurately, and review
                common fault-finding scenarios. The{' '}
                <SEOInternalLink href="/am2-assessment-prep">
                  AM2 preparation guide
                </SEOInternalLink>{' '}
                covers the assessment in detail.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'NVQ Level 3 Costs in 2026',
    content: (
      <>
        <p>
          The total cost of achieving the NVQ Level 3 varies significantly by provider.
          Understand what is included in any quoted price before committing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registration fee</strong> — typically £100 to £300, paid to the
                training centre to register you with the awarding body. This is usually
                non-refundable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assessment visit fees</strong> — some providers charge per assessor
                visit (typically £80 to £150 per visit). Others include a fixed number of
                visits in the overall package. Candidates who need more visits to complete
                their evidence pay more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All-inclusive packages</strong> — many private training centres offer
                all-inclusive NVQ packages ranging from £800 to £2,500 depending on location
                and the number of observations included. Confirm what is included — some
                packages exclude AM2 costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AM2 assessment (separate)</strong> — approximately £350 to £500. Not
                included in most NVQ packages unless specifically stated. Budget for this
                separately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Government funding</strong> — Adult Skills funding (for those aged 19
                or over in England) may cover some or all of the NVQ cost for eligible
                candidates. Check with the training centre whether you qualify before paying
                full price.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'timescale',
    heading: 'How Long Does the NVQ Level 3 Take?',
    content: (
      <>
        <p>
          The NVQ timescale is determined by how quickly you can gather sufficient portfolio
          evidence across all required units. Candidates working across a variety of project
          types complete faster; those in a narrow work environment take longer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6 to 12 months</strong> — candidates working across domestic and
                commercial projects, regularly performing inspection and testing, and producing
                certificates and test documentation. Wide evidence base allows all units to be
                covered quickly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>12 to 24 months</strong> — candidates in a single installation
                environment (e.g., exclusively domestic rewires, or only commercial maintenance)
                who need to seek additional opportunities to evidence units not covered by their
                regular work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Factors that slow progress</strong> — infrequent assessor visits,
                delays in obtaining witness statements, a narrow range of work types, and
                failure to maintain an organised portfolio. Starting your portfolio early and
                documenting work systematically from day one is the most effective approach.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Life After Your NVQ',
    content: (
      <>
        <p>
          Completing your NVQ Level 3 and AM2 opens the door to ECS Gold Card status,
          registration with a competent person scheme, and self-employed trading. Having
          the right tools from day one sets you up for a professional, compliant practice.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Professional Certificates from Day One</h4>
                <p className="text-white text-sm leading-relaxed">
                  Once you are registered with a competent person scheme, you are required to
                  issue compliant certificates for all notifiable work. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to complete EICs, EICRs, and Minor Works Certificates on your phone and
                  issue PDFs to clients on the day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Invoice Like a Professional</h4>
                <p className="text-white text-sm leading-relaxed">
                  Going self-employed means quoting and invoicing from day one. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce written, itemised quotes and turn them into invoices in one tap.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Start your electrical business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site certifying, professional quoting, and business management from their phone. 7-day free trial, no credit card required."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NVQLevel3ElectricalPage() {
  return (
    <GuideTemplate
      title="NVQ Level 3 Electrical Installation UK | Qualification Guide 2026"
      description="Complete guide to the NVQ Level 3 Electrotechnical Installation qualification. What it is, how it differs from City and Guilds 2365, who needs it, EAL vs C&G providers, AM2 assessment, costs (£800–£2,500), and timescales (6–24 months)."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Qualification Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          NVQ Level 3 Electrical Installation:{' '}
          <span className="text-yellow-400">Complete UK Guide 2026</span>
        </>
      }
      heroSubtitle="The NVQ Level 3 Electrotechnical Installation qualification is the recognised competency-based route for experienced electricians without a formal UK qualification. This guide explains what the NVQ is, how it compares to City and Guilds 2365, who needs it, how to build a portfolio of evidence, the AM2 assessment, costs from £800 to £2,500, and realistic timescales."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the NVQ Level 3 Electrical"
      relatedPages={relatedPages}
      ctaHeading="Certify and Quote Professionally with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC and EICR completion, instant PDF export, and professional quoting. Start your 7-day free trial today."
    />
  );
}
