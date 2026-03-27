import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Electrical Apprenticeship Apply', href: '/electrical-apprenticeship-apply' },
];

const tocItems = [
  { id: 'pathway-overview', label: 'Level 2 vs Level 3 Pathways' },
  { id: 'ecs-cscs-cards', label: 'ECS Card and CSCS Card' },
  { id: 'finding-employers', label: 'Finding Employers and Training Providers' },
  { id: 'application-tips', label: 'Application Tips' },
  { id: 'interview-prep', label: 'Interview Preparation' },
  { id: 'what-employers-want', label: 'What Employers Look For' },
  { id: 'for-apprentices', label: 'For Apprentices — Using Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The standard route to becoming a qualified electrician in the UK is a Level 3 Apprenticeship (Electrical Installation — Installation Electrician/Maintenance Electrician), combining on-the-job training with a college day-release programme. The apprenticeship typically takes three to four years.',
  'An ECS (Electrotechnical Certification Scheme) card is the industry-standard identity and competence card for electricians in the UK. It is required to work on most commercial and industrial sites. The card is obtained through the JIB (Joint Industry Board) upon completion of a recognised qualification.',
  'The main approved training providers in England are JTL (the largest electrical apprenticeship provider), ECITB (Engineering Construction Industry Training Board for industrial sites), and in Scotland, SELECT (the trade association). Employers can also run direct apprenticeships through their own EPAO (End-Point Assessment Organisation).',
  'Apprenticeship applications in England are submitted through the Find an Apprenticeship service (gov.uk/apply-apprenticeship). Candidates should prepare a strong personal statement emphasising practical interest in electrical work, reliability, and commitment to safety.',
  'Starting salaries for electrical apprentices in England are set by the National Minimum Wage for apprentices (\u00a36.40/hr as of April 2024 for those under 19 or in the first year), but many employers — particularly JIB-registered contractors — pay the full JIB apprentice rate which is significantly higher.',
];

const faqs = [
  {
    question: 'What qualifications do I need to start an electrical apprenticeship?',
    answer:
      'Most employers and training providers require a minimum of four or five GCSEs at grade 4 (C) or above, including maths and English. Maths is particularly important as electrical work involves calculations for cable sizing, load assessment, and circuit design. Some providers accept functional skills qualifications at Level 2 in place of GCSEs. There is no upper age limit for apprenticeships — adults changing career can apply for electrical apprenticeships, though some employers prefer school leavers for their longer period of training. A keen interest in practical work and a basic understanding of electricity (for example through GCSE Physics or a Level 2 introductory electrical course) is highly valued at interview.',
  },
  {
    question: "What is the difference between JTL and an employer's own apprenticeship?",
    answer:
      'JTL (formerly Joint Training Ltd) is the largest independent training provider for electrical and plumbing apprenticeships in England and Wales. JTL manages the college day-release element, coordinates the apprenticeship programme, and supports employers who may not have the capacity to manage training internally. Employers register with JTL and JTL places apprentices with them. Alternatively, larger electrical contractors may run their own apprenticeship scheme directly, working with a college and an End-Point Assessment Organisation (EPAO) of their choice. Both routes lead to the same Level 3 qualification. JTL apprentices benefit from JTL\'s extensive employer network and pastoral support, while direct employer apprenticeships may offer more consistent work and a clearer route to employment after qualification.',
  },
  {
    question: 'What is an ECS card and when do I get it?',
    answer:
      'The Electrotechnical Certification Scheme (ECS) card is the UK electrical industry\'s site access and competence card, administered by the JIB (Joint Industry Board). It proves to employers, contractors, and clients that the holder has the training, qualifications, and health and safety knowledge required to work on electrotechnical sites. Apprentices are issued a trainee ECS card during their apprenticeship. Upon successful completion of the Level 3 qualification and End-Point Assessment, the card is upgraded to an AM2 Achievement card, and subsequently to an Approved Electrician card after two years of post-qualification experience. The Gold Card (Electrician level) requires NVQ Level 3 plus the AM2 assessment.',
  },
  {
    question: 'What is the AM2 assessment?',
    answer:
      'The AM2 (Apprentice Membership assessment grade 2) is the practical assessment that forms the final part of the Level 3 Electrical Installation apprenticeship End-Point Assessment. It tests competence in practical electrical work across a range of tasks including wiring installations, terminations, testing, fault finding, and health and safety. The AM2 is conducted over two days at a designated AM2 centre (typically a training facility). Candidates must bring their own tools and are assessed against defined performance criteria. Passing the AM2, together with the Level 3 qualification, entitles the candidate to apply for an ECS Approved Electrician card and apply for JIB grade. Failure can be retaken after a period of further practice.',
  },
  {
    question: 'How much do electrical apprentices earn in the UK?',
    answer:
      'The statutory National Minimum Wage for apprentices (those under 19, or over 19 in their first year) is \u00a36.40 per hour as of April 2024. However, most JIB-registered electrical contractors pay the JIB apprentice rate, which is considerably higher and scales with the year of the apprenticeship and the apprentice\'s age. In year one, JIB apprentice rates range from approximately \u00a38 to \u00a311 per hour depending on age bracket. By year three and four, rates approach \u00a314 to \u00a317 per hour. Outside JIB-registered firms, pay varies more widely. When evaluating an apprenticeship, consider the JIB-registration status of the employer as it indicates commitment to the industry wage structure and training standards.',
  },
  {
    question: 'Can I do an electrical apprenticeship if I already have a degree?',
    answer:
      'Yes. There is no restriction on graduates entering electrical apprenticeships. Career changers with degrees in engineering, physics, or related subjects often bring strong analytical skills that benefit their electrical training. The apprenticeship programme is the same regardless of prior education, though some candidates with relevant prior learning may be eligible for credit towards units of the qualification. Speak to the training provider about recognition of prior learning (RPL) at enrolment. Some graduates choose to enter the industry via a fast-track Level 3 course or commercial electrical short courses rather than the full apprenticeship route, though the apprenticeship remains the most recognised and structured pathway to a qualified electrician status.',
  },
  {
    question: 'What tools do I need as an electrical apprentice?',
    answer:
      'Employers vary in what tools they provide versus what they expect apprentices to supply. At a minimum, an apprentice should have: a set of insulated screwdrivers (flathead and Pozi), a pair of side cutters, long-nose pliers, combination pliers, a cable knife, a wire stripper, a tape measure, and a spirit level. A basic two-pole voltage tester (such as a Kewtech KT150) is essential for safety. As the apprenticeship progresses, a multifunction tester (MFT) will be needed for testing — either provided by the employer on site or purchased by the apprentice. The JIB publishes a recommended tool list for apprentices. Avoid buying cheap non-insulated tools — always use VDE-rated insulated tools for live working.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-test-equipment-guide',
    title: 'Electrical Test Equipment Guide',
    description: 'MFT buying guide, CAT ratings, GS38 compliance, and calibration requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/wiring-regulations-building-regulations',
    title: 'Wiring Regulations and Building Regulations',
    description: 'How BS 7671 relates to Part P, notifiable work, and competent person schemes.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Electrical inspection obligations for landlords in rented properties.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Generate compliant Electrical Installation Certificates — practice on Elec-Mate as an apprentice.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'pathway-overview',
    heading: 'Level 2 vs Level 3 Apprenticeship Pathways',
    content: (
      <>
        <p>
          The electrical installation apprenticeship in England and Wales follows a structured
          pathway leading to a recognised industry qualification. Understanding the difference
          between Level 2 and Level 3 is important when choosing a route into the trade.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">Level 2 — Electrical Installation (Intermediate)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Covers the fundamentals of electrical installation work — basic wiring, domestic
                circuits, cable containment, and health and safety. Duration: typically
                12 to 18 months. Leads to a City and Guilds 2365 Level 2 diploma or
                equivalent EAL qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The Level 2 apprenticeship is an intermediate stepping stone, not a
                qualified electrician status. Most employers and training providers route
                apprentices directly through to Level 3 as a combined three to four year
                programme.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">Level 3 — Electrical Installation (Advanced)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The primary route to becoming a fully qualified electrician. Covers
                commercial and industrial wiring, three-phase systems, motor circuits,
                inspection and testing, fault diagnosis, and BS 7671 Wiring Regulations.
                Duration: three to four years including the Level 2 stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Leads to a City and Guilds 2365 Level 3 diploma, NVQ Level 3 in Electrical
                Installations, and successful completion of the AM2 End-Point Assessment.
                Entitles the holder to an ECS Approved Electrician card and JIB grade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scotland:</strong> The equivalent qualification is the SVQ Level 3
                in Electrical Installation. Training is delivered through colleges and
                approved by SELECT (the Electrical Contractors Association of Scotland).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ecs-cscs-cards',
    heading: 'ECS Card and CSCS Card',
    content: (
      <>
        <p>
          Site access cards are a practical requirement for working on most commercial and
          industrial electrical sites in the UK. Two main card schemes are relevant to electricians.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">ECS Card (Electrotechnical Certification Scheme)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The ECS card is the electrical industry equivalent of the CSCS card and is
                administered by the JIB. It confirms the holder has the qualifications,
                health and safety training, and experience appropriate to their grade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Card grades during apprenticeship:</strong> Apprentice card (trainee);
                Apprentice Membership card (after completing AM2 and Level 3 diploma);
                Approved Electrician card (after two years post-qualification experience);
                Electrician card (JIB Gold Card, with NVQ Level 3 and AM2).
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">CSCS Card (Construction Skills Certification Scheme)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The CSCS card is required by principal contractors on major construction sites
                and confirms the holder has relevant health and safety training. For electricians,
                the ECS card is the preferred card as it is accepted on all electrical and
                construction sites. The ECS and CSCS schemes are linked — ECS card holders
                do not need a separate CSCS card on most sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                To obtain an ECS card, applicants must pass the Health, Safety and Environment
                (HS&E) test — an online test administered by CITB covering construction and
                electrical health and safety. The test must be passed within two years of
                the card application.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-employers',
    heading: 'Finding Employers and Training Providers',
    content: (
      <>
        <p>
          The most important step in applying for an electrical apprenticeship is identifying
          a host employer willing to take you on. Without an employer, most training providers
          cannot enrol you on the programme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>gov.uk/apply-apprenticeship:</strong> The official Find an Apprenticeship
                service lists vacancies from employers registered with approved training
                providers. Search for "electrical installation" to find current vacancies
                in your area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>JTL (jtltraining.com):</strong> The largest electrical apprenticeship
                provider in England and Wales. JTL works with thousands of employer partners
                and can help match candidates to suitable employers in their area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Direct approach to local electrical contractors:</strong> Many
                electricians find their first apprenticeship by approaching local firms
                directly. Look for NICEIC, NAPIT, or ECA (Electrical Contractors Association)
                registered companies — these are more likely to have training programmes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT (Scotland):</strong> SELECT maintains a list of approved
                training providers and member employers offering apprenticeships in Scotland.
                Visit select.org.uk for vacancy listings and career guidance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'application-tips',
    heading: 'Application Tips for Electrical Apprenticeships',
    content: (
      <>
        <p>
          A well-prepared application significantly improves the chance of securing an
          interview. Employers receive many applications for electrical apprenticeships — a
          generic application will not stand out.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tailor your personal statement:</strong> Explain specifically why
                you want to be an electrician — not a generic "I enjoy practical work."
                Mention any relevant experience such as helping a family member with DIY
                electrical work, a school project, or a short work experience placement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Highlight maths ability:</strong> Electrical work requires
                competence in basic algebra, Ohm's law calculations, and cable sizing.
                Mention your maths GCSE grade and any additional maths study. If your
                maths grade is low, take a Level 2 Functional Skills maths course.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Show commitment:</strong> Employers want to see that you understand
                the commitment required — three to four years of combined work and study.
                Mention your willingness to work long hours, follow instructions, and
                prioritise safety at all times.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'interview-prep',
    heading: 'Interview Preparation',
    content: (
      <>
        <p>
          Electrical apprenticeship interviews assess attitude, aptitude, and commitment
          as much as existing knowledge. Employers do not expect school leavers to have
          trade knowledge — they are looking for potential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common interview questions:</strong> "Why do you want to become an
                electrician?", "What do you know about health and safety on a construction
                site?", "Describe a time you solved a practical problem", "Are you comfortable
                working at heights or in confined spaces?".
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Aptitude tests:</strong> Some employers and training providers use
                numerical reasoning or spatial reasoning tests as part of the selection
                process. Practise basic maths — fractions, percentages, and simple formula
                rearrangement — before the interview.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Presentation:</strong> Arrive clean, punctual, and smartly dressed.
                Electrical sites have strict rules about presentation and timekeeping — an
                employer will judge whether you can represent the company professionally
                on client premises.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-employers-want',
    heading: 'What Employers Look for in an Electrical Apprentice',
    content: (
      <>
        <p>
          Understanding what employers value helps candidates present themselves more
          effectively throughout the application process.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reliability and punctuality:</strong> Tradespeople are often the
                first to arrive and last to leave on site. A reputation for unreliability
                will end an apprenticeship quickly. Employers rate reliability above almost
                any other attribute.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety awareness:</strong> Electrical work is dangerous. Employers
                need apprentices who follow instructions, do not take shortcuts, and ask
                questions when unsure. A cavalier attitude to safety is grounds for immediate
                dismissal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Willingness to learn:</strong> The apprenticeship combines on-site
                learning with college day-release. Apprentices who engage fully with both
                components — and study in their own time — progress faster and are more
                valued by employers.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Once qualified, using professional tools like the{' '}
          <SEOInternalLink href="/tools/eicr-certificate" label="Elec-Mate EICR app" />{' '}
          demonstrates to employers that you take your career seriously and stay current
          with industry best practice.
        </p>
      </>
    ),
  },
  {
    id: 'for-apprentices',
    heading: "For Apprentices — Using Elec-Mate to Learn",
    content: (
      <>
        <p>
          Elec-Mate includes a Study Centre with structured learning content for Level 2 and
          Level 3 electrical apprentices, alongside the professional certificate tools used
          by qualified electricians.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/study-centre" label="Study Centre" />{' '}
                — structured Level 2 and Level 3 course modules covering BS 7671, circuit
                theory, inspection and testing, and trade calculations. Ideal for exam
                preparation and on-the-job revision.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eicr-certificate" label="EICR Certificate" />{' '}
                — practise completing periodic inspection reports on your phone. Understanding
                the certificate format early in your apprenticeship gives you a significant
                advantage when it comes to assessment.
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

export default function ElectricalApprenticeshipApplyPage() {
  return (
    <GuideTemplate
      title="How to Apply for an Electrical Apprenticeship UK — Level 2, Level 3, ECS Card"
      description="Complete guide to applying for an electrical apprenticeship in the UK: Level 2 vs Level 3 pathways, ECS card, CSCS card, finding employers through JTL, ECITB and SELECT, application tips, and interview preparation."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprenticeship Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Electrical Apprenticeship{' '}
          <span className="text-yellow-400">— How to Apply in the UK</span>
        </>
      }
      heroSubtitle="Level 2 and Level 3 pathways, ECS card, CSCS card, finding employers through JTL, ECITB and SELECT, application tips, interview preparation, and what employers look for."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electrical Apprenticeship — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Study for your electrical qualification with Elec-Mate"
      ctaSubheading="Structured Level 2 and Level 3 learning modules, BS 7671 revision, and professional certificate practice."
    />
  );
}
