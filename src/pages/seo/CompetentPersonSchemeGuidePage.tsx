import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Award,
  PoundSterling,
  Building2,
  FileCheck2,
  BookOpen,
  Target,
  Scale,
  CreditCard,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-training-courses-uk' },
  { label: 'Competent Person Schemes', href: '/guides/competent-person-scheme-guide' },
];

const tocItems = [
  { id: 'overview', label: 'What Is a Competent Person Scheme?' },
  { id: 'part-p', label: 'Part P and Self-Certification' },
  { id: 'providers', label: 'NICEIC, NAPIT, ELECSA, and STROMA' },
  { id: 'costs', label: 'Costs and Fees' },
  { id: 'assessment', label: 'Assessment Process' },
  { id: 'choosing', label: 'Which Scheme to Choose' },
  { id: 'ongoing', label: 'Ongoing Obligations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A Competent Person Scheme (CPS) allows you to self-certify your own electrical work under Part P of the Building Regulations in England and Wales. Without it, you must notify Building Control before starting notifiable work, which costs the homeowner time and money.',
  'The main electrical CPS providers are NICEIC, NAPIT, ELECSA, and STROMA. All four are authorised by the government and allow you to self-certify the same types of work. The differences are in cost, assessment approach, and additional services.',
  'To join, you need the C&G 2382 (18th Edition), a practical qualification (NVQ Level 3 or equivalent), and the C&G 2391 (Inspection and Testing) or equivalent. Most schemes also require evidence of relevant work experience.',
  'Annual costs range from approximately 400 to 900 pounds depending on the scheme and your business type (sole trader vs company). This includes the annual subscription and one assessment visit per year.',
  'Being a member of a competent person scheme is a powerful marketing tool — homeowners increasingly look for scheme membership as proof of competence and accountability.',
];

const faqs = [
  {
    question: 'Do I legally need to be in a competent person scheme to do electrical work?',
    answer:
      'No. There is no legal requirement to be a member of a competent person scheme to carry out electrical work in the UK. However, if you are not in a scheme, you (or the homeowner) must notify Building Control before starting any notifiable electrical work under Part P of the Building Regulations. This applies in England and Wales. Notifiable work includes new circuits, consumer unit changes, work in special locations (bathrooms, kitchens), and work in new builds. Building Control notification adds cost (typically 200 to 300 pounds per job) and delays. Most professional electricians join a scheme to avoid this.',
  },
  {
    question: 'What is the difference between NICEIC and NAPIT?',
    answer:
      'Both are government-authorised competent person scheme providers and allow you to self-certify the same types of electrical work. The main differences are: NICEIC is the older and more widely recognised brand — many homeowners specifically look for NICEIC-registered electricians. NAPIT is generally slightly cheaper in annual fees and some electricians find their assessment process less prescriptive. In terms of what you can legally do, there is no difference — both allow full self-certification under Part P. The choice often comes down to cost, brand recognition, and personal preference.',
  },
  {
    question: 'What qualifications do I need to join a competent person scheme?',
    answer:
      'The core requirements are: C&G 2382 (18th Edition Wiring Regulations), a practical qualification demonstrating installation competence (NVQ Level 3 in Electrotechnical Services, C&G 2357, C&G 2365, or equivalent), and C&G 2391 (Inspection and Testing) or C&G 2394/2395 (Initial Verification and Periodic Inspection). Most schemes also require evidence of public liability insurance and relevant work experience. Some schemes accept alternative qualifications — check with your chosen provider for their specific entry requirements.',
  },
  {
    question: 'How much does it cost to join NICEIC?',
    answer:
      'NICEIC fees depend on your business type and the level of registration. For a sole trader Domestic Installer, expect to pay approximately 500 to 700 pounds for the first year (which includes the initial assessment fee) and approximately 400 to 600 pounds per year thereafter. For larger companies with multiple operatives, fees are higher. NICEIC also offers an Approved Contractor scheme for commercial and industrial work, which is more expensive. Fees are reviewed annually — check the NICEIC website for current prices.',
  },
  {
    question: 'How often am I assessed?',
    answer:
      'All competent person schemes require at least one assessment visit per year. During the assessment, an assessor reviews a sample of your recent work — including the installation, testing, and certification. They check that your work complies with BS 7671 and that your documentation (EICs, EICRs, minor works certificates) is completed correctly. If issues are found, you are given time to correct them. Persistent non-compliance can result in suspension or removal from the scheme. The first assessment is the most thorough; annual assessments are typically shorter.',
  },
  {
    question: 'Can I join a competent person scheme as a sole trader?',
    answer:
      'Yes. All the main schemes (NICEIC, NAPIT, ELECSA, STROMA) accept sole traders and one-person businesses. The qualification requirements are the same as for larger companies. The fees are typically lower for sole traders than for companies with multiple electricians. You will need public liability insurance and must be able to demonstrate that you carry out notifiable electrical work regularly enough to justify scheme membership.',
  },
  {
    question: 'What happens if I fail the assessment?',
    answer:
      'If the assessor finds issues with your work, you are given an opportunity to correct them. Minor issues (documentation errors, missing labels) typically result in an action plan with a deadline for correction. More serious issues (unsafe installations, significant code violations) may result in a re-assessment visit at your expense. In extreme cases, persistent failure to meet standards can lead to suspension or removal from the scheme. Most electricians pass their assessments without major issues — the assessors are looking for competent work, not perfection.',
  },
  {
    question: 'Does competent person scheme membership cover Scotland and Northern Ireland?',
    answer:
      'Part P of the Building Regulations applies to England and Wales only. Scotland has its own Building Standards, and Northern Ireland has separate Building Regulations. However, the competent person schemes generally operate across the UK, and membership is still valuable in Scotland and Northern Ireland for credibility and marketing purposes. In Scotland, electrical installations in new dwellings must comply with the Building Standards, and scheme membership can simplify the compliance process.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/niceic-vs-napit-vs-elecsa-comparison',
    title: 'NICEIC vs NAPIT vs ELECSA',
    description: 'Detailed comparison of the three main competent person schemes.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2382-exam-guide',
    title: 'C&G 2382 Exam Guide',
    description: 'The 18th Edition exam — required for scheme membership.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/ecs-card-types-explained',
    title: 'ECS Card Types',
    description: 'How your ECS card relates to competent person scheme eligibility.',
    icon: CreditCard,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete your EICs on your phone — ready for your scheme assessment.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-form',
    title: 'EICR Form App',
    description: 'Complete EICRs on site with AI board scanning and voice test entry.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'The C&G 2391 — required for most competent person schemes.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What Is a Competent Person Scheme?',
    content: (
      <>
        <p>
          A Competent Person Scheme (CPS) is a government-authorised scheme that allows qualified
          tradespeople to self-certify that their work complies with the Building Regulations —
          without needing to involve Building Control.
        </p>
        <p>
          For electricians, this means you can carry out notifiable electrical work (new circuits,
          consumer unit replacements, work in bathrooms, etc.) and issue a Building Regulations
          Compliance Certificate directly to the homeowner, without them having to pay for a
          separate Building Control inspection.
        </p>
        <p>
          This is a significant commercial advantage. It saves your customers time and money, makes
          your quotes more competitive, and positions you as a professional who is accountable for
          the quality and compliance of their work.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P and Self-Certification',
    content: (
      <>
        <p>
          Part P of the Building Regulations (England and Wales) covers electrical safety in
          dwellings. It requires that certain types of electrical work are either:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">With CPS Membership</h3>
            <p className="text-white text-sm leading-relaxed">
              You self-certify the work. You issue a Building Regulations Compliance Certificate
              (Part P certificate) directly to the homeowner. The certificate is registered with the
              local authority through your scheme provider. No Building Control involvement needed.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Without CPS Membership</h3>
            <p className="text-white text-sm leading-relaxed">
              The homeowner (or you on their behalf) must notify Building Control before starting
              notifiable work. Building Control will inspect the work and issue a completion
              certificate. This costs the homeowner 200 to 300 pounds per job and adds delays.
            </p>
          </div>
        </div>
        <p>
          Notifiable work includes: installing a new circuit, replacing a consumer unit (fuse board),
          any electrical work in a bathroom or shower room, any electrical work in a kitchen within
          a new build, and any addition or alteration to existing circuits in special locations.
        </p>
      </>
    ),
  },
  {
    id: 'providers',
    heading: 'NICEIC, NAPIT, ELECSA, and STROMA',
    content: (
      <>
        <p>
          There are four main competent person scheme providers for electrical work in England and
          Wales:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">NICEIC</h4>
                <p className="text-white text-sm leading-relaxed">
                  The oldest and most widely recognised scheme. Offers Domestic Installer and
                  Approved Contractor levels. Strong brand recognition with homeowners. Generally
                  the most expensive option but the name carries significant credibility.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">NAPIT</h4>
                <p className="text-white text-sm leading-relaxed">
                  A well-established alternative to NICEIC. Generally slightly lower fees. Covers
                  electrical, plumbing, heating, and ventilation trades. Good support for smaller
                  businesses and sole traders. Growing brand recognition.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">ELECSA</h4>
                <p className="text-white text-sm leading-relaxed">
                  Part of the Certsure group (which also includes NICEIC). Offers a more
                  affordable entry point than NICEIC while providing the same self-certification
                  authority. Less well-known to homeowners but fully government-authorised.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">STROMA</h4>
                <p className="text-white text-sm leading-relaxed">
                  Originally focused on energy performance certificates, STROMA now offers electrical
                  competent person scheme membership. Competitive pricing. Less brand recognition
                  in the electrical sector but fully authorised for self-certification.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          For a detailed side-by-side comparison, see the{' '}
          <SEOInternalLink href="/guides/niceic-vs-napit-vs-elecsa-comparison">
            NICEIC vs NAPIT vs ELECSA comparison guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Costs and Fees',
    content: (
      <>
        <p>
          Competent person scheme costs include an initial registration fee, an annual subscription,
          and assessment fees. Here are approximate costs for 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
              <span className="text-white font-medium">NICEIC Domestic Installer</span>
              <span className="text-white">~550-700/year</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
              <span className="text-white font-medium">NAPIT Domestic Installer</span>
              <span className="text-white">~400-550/year</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10">
              <span className="text-white font-medium">ELECSA</span>
              <span className="text-white">~400-500/year</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10">
              <span className="text-white font-medium">STROMA</span>
              <span className="text-white">~350-450/year</span>
            </div>
          </div>
        </div>
        <p>
          The first year is typically more expensive because of the initial assessment fee. Ongoing
          annual costs cover the subscription and one assessment visit per year. Additional
          assessment visits (if required due to non-compliance) may incur extra charges.
        </p>
        <p>
          The cost is tax-deductible as a business expense. When you consider that each job where
          you self-certify saves the homeowner 200 to 300 pounds in Building Control fees (making
          your quote more competitive), the scheme membership pays for itself within a few jobs.
        </p>
      </>
    ),
  },
  {
    id: 'assessment',
    heading: 'Assessment Process',
    content: (
      <>
        <p>
          The initial assessment involves:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualification check</strong> — the assessor verifies your qualifications
                (2382, 2391, NVQ, etc.) and public liability insurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site inspection</strong> — the assessor visits one or more of your recent
                installations to check that the work complies with BS 7671. They look at cable
                routing, connections, consumer unit installation, earthing, bonding, labelling, and
                overall workmanship.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation review</strong> — the assessor reviews your certificates
                (EICs, minor works, EICRs) to check they are completed correctly, test results are
                recorded, and the documentation matches the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical discussion</strong> — the assessor may ask technical questions
                about your work, BS 7671 requirements, and your approach to design and testing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The assessment is not an exam — it is a review of your real work. If you are doing
          competent work and keeping good records, you will pass. The most common issues flagged
          are documentation errors (missing test results, incomplete schedules) rather than
          installation faults.
        </p>
      </>
    ),
  },
  {
    id: 'choosing',
    heading: 'Which Scheme Should You Choose?',
    content: (
      <>
        <p>
          All four schemes give you the same self-certification authority. The choice comes down to:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Brand recognition</strong> — NICEIC is the most recognised by homeowners. If
                marketing to domestic customers is important to you, the NICEIC name on your van and
                website carries weight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost</strong> — NAPIT and ELECSA are generally cheaper than NICEIC. STROMA
                is often the cheapest. If cost is your primary concern, compare current prices
                directly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial work</strong> — if you do commercial and industrial work as well
                as domestic, NICEIC's Approved Contractor scheme is the most recognised in the
                commercial sector. NAPIT also offers commercial-level registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assessment experience</strong> — ask other electricians about their
                experience with each scheme's assessors. Some electricians prefer NAPIT's assessment
                approach; others prefer NICEIC. This is subjective but worth considering.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ongoing',
    heading: 'Ongoing Obligations',
    content: (
      <>
        <p>
          Once you join a scheme, you have ongoing obligations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Annual assessment visit — the scheme will inspect your work once per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Notification of completed work — you must register each notifiable job through the
                scheme's online portal within 30 days of completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Maintain qualifications — keep your 2382 and other qualifications current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Maintain insurance — public liability insurance must remain in force.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Pay annual fees — keep your subscription current to maintain your registration.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Professional Certification Made Easy',
    content: (
      <>
        <p>
          Your competent person scheme assessment reviews your certificates and documentation. Make
          sure they are always up to standard.
        </p>
        <SEOAppBridge
          title="Professional certificates for your scheme assessment"
          description="Elec-Mate's EIC, EICR, and minor works certificate apps produce professional documentation that passes scheme assessments. AI board scanning, voice test entry, and instant PDF export. Be assessment-ready every time."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CompetentPersonSchemeGuidePage() {
  return (
    <GuideTemplate
      title="Competent Person Scheme Guide | NICEIC NAPIT ELECSA Part P UK"
      description="Complete guide to competent person schemes for UK electricians. NICEIC, NAPIT, ELECSA, STROMA — what they mean, costs, self-certification under Part P, assessment process, and which scheme to choose."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Competent Person Scheme Guide:{' '}
          <span className="text-yellow-400">Self-Certify Your Electrical Work</span>
        </>
      }
      heroSubtitle="Everything you need to know about competent person schemes for electricians. NICEIC, NAPIT, ELECSA, and STROMA — what they mean, what they cost, and which one to choose."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Competent Person Schemes"
      relatedPages={relatedPages}
      ctaHeading="Professional Certificates for Scheme Assessments"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EICs, EICRs, and minor works certificates. Professional documentation that passes every assessment. 7-day free trial."
    />
  );
}
