import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  CreditCard,
  CheckCircle2,
  Award,
  HardHat,
  PoundSterling,
  Scale,
  FileCheck2,
  BookOpen,
  Target,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-training-courses-uk' },
  { label: 'CSCS vs ECS Card', href: '/guides/cscs-vs-ecs-card-comparison' },
];

const tocItems = [
  { id: 'overview', label: 'Why This Comparison Matters' },
  { id: 'cscs', label: 'What Is the CSCS Card?' },
  { id: 'ecs', label: 'What Is the ECS Card?' },
  { id: 'comparison', label: 'Side-by-Side Comparison' },
  { id: 'site-acceptance', label: 'Which Sites Accept Which?' },
  { id: 'how-to-get', label: 'How to Get Each Card' },
  { id: 'costs', label: 'Costs and Renewal' },
  { id: 'which-need', label: 'Which Do You Need?' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The CSCS card (Construction Skills Certification Scheme) is the general construction industry card that covers all trades. The ECS card (Electrotechnical Certification Scheme) is the sector-specific card for electricians, managed by the JIB.',
  'The ECS card is part of the CSCS family and is accepted on any site that requires a CSCS card. You do not need both — the ECS card covers you on all construction sites.',
  'As an electrician, you should get the ECS card, not a generic CSCS card. The ECS card shows your specific electrical qualifications and JIB grade, which is more meaningful than a generic construction card.',
  'Both cards require a health and safety test and must be renewed every 5 years. The ECS card also verifies your electrical qualifications (NVQ Level 3, C&G 2382, AM2, etc.).',
  'The CSCS card is obtained through CSCS directly and requires the CITB Health, Safety and Environment Test. The ECS card is obtained through the JIB and requires the ECS Health, Safety and Environmental Assessment.',
];

const faqs = [
  {
    question: 'Do I need a CSCS card if I have an ECS card?',
    answer:
      'No. The ECS card is part of the CSCS partnership scheme and is accepted on any construction site that requires a CSCS card. The ECS card has a CSCS-affiliated hologram and is listed on the CSCS smart check system. When a site manager checks your card, it appears in the CSCS system as a valid card. You do not need both — the ECS card is all you need as an electrician.',
  },
  {
    question: 'Can I get a CSCS card instead of an ECS card?',
    answer:
      'Technically, yes — you could apply for a generic CSCS Skilled Worker card using your electrical qualifications. However, this is not recommended. The ECS card is specifically designed for the electrotechnical sector and shows your exact electrical qualifications, JIB grade, and specialist skills. A generic CSCS card does not provide this detail. Employers, site managers, and clients in the electrical sector expect to see an ECS card, not a generic CSCS card. Getting a CSCS card instead would actually look less professional.',
  },
  {
    question: 'What is the health and safety test for each card?',
    answer:
      'For the CSCS card, you need to pass the CITB Health, Safety and Environment Test — a computer-based multiple-choice test with 50 questions. For the ECS card, you need to pass the ECS Health, Safety and Environmental Assessment — also a computer-based test with 50 questions, but focused on the electrotechnical sector. The ECS test includes questions specific to electrical safety that are not in the generic CITB test. Both tests have a pass mark of approximately 80% and are available at test centres nationwide. The tests are not the same — do not prepare for the wrong one.',
  },
  {
    question: 'How much does each card cost?',
    answer:
      'The ECS card application fee is approximately 36 to 40 pounds. The ECS Health, Safety and Environmental Assessment costs approximately 21 to 25 pounds at a test centre. The CSCS card costs approximately 36 pounds for the application and approximately 21 to 25 pounds for the CITB Health, Safety and Environment Test. Total costs are similar for both cards — approximately 60 to 65 pounds including the health and safety test. However, the ECS card is the correct card for electricians and shows your trade-specific qualifications.',
  },
  {
    question: 'How long does each card last?',
    answer:
      'Both the CSCS card and the ECS card are valid for 5 years from the date of issue. Renewal requires a current health and safety test and up-to-date qualifications. For the ECS card, your electrical qualifications (including the C&G 2382) must be current at the time of renewal. Both cards send renewal reminders before expiry. Do not let your card lapse — working on site with an expired card can result in being turned away.',
  },
  {
    question: 'My employer asked for a CSCS card — can I show my ECS card instead?',
    answer:
      'Yes. The ECS card is accepted everywhere a CSCS card is accepted. If your employer or site manager specifically asks for a CSCS card, your ECS card fulfils the requirement. You can verify this through the CSCS Smart Check app, where your ECS card details appear just as a CSCS card would. If anyone queries it, explain that the ECS card is the electrical sector card within the CSCS partnership scheme. In practice, most people in construction are familiar with both cards.',
  },
  {
    question: 'What if I do other construction work besides electrical?',
    answer:
      'The ECS card covers you for electrical work on construction sites. If you also do other construction trades (for example, general building work or plumbing), you would technically need a separate CSCS card for those trades. However, in practice, many electricians who do occasional non-electrical work on site use their ECS card without issues. If non-electrical construction work is a significant part of your business, consider whether you need a separate CSCS card for that trade. For purely electrical work — even if it is on a general construction site — the ECS card is sufficient.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ecs-card-types-explained',
    title: 'ECS Card Types Explained',
    description: 'Detailed breakdown of every ECS card type and how to get each one.',
    icon: CreditCard,
    category: 'Guide',
  },
  {
    href: '/guides/jib-grading-explained',
    title: 'JIB Grading Explained',
    description: 'How your ECS card grade determines your JIB pay rate.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/gold-card-requirements-electrician',
    title: 'Gold Card Requirements',
    description: 'The highest ECS card — qualifications needed and benefits.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/sssts-smsts-site-supervisor-guide',
    title: 'SSSTS & SMSTS Guide',
    description: 'Site safety qualifications that complement your ECS card.',
    icon: HardHat,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2382-exam-guide',
    title: 'C&G 2382 Exam Guide',
    description: 'The 18th Edition exam — required for most ECS card types.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/competent-person-scheme-guide',
    title: 'Competent Person Schemes',
    description: 'NICEIC, NAPIT, ELECSA — the next step after getting your card.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why This Comparison Matters',
    content: (
      <>
        <p>
          If you are an electrician starting out on construction sites, you will hear about both
          CSCS cards and ECS cards. It can be confusing — do you need one, the other, or both?
        </p>
        <p>
          The short answer: as an electrician, you need the ECS card. It is accepted everywhere a
          CSCS card would be, and it shows your specific electrical qualifications. But
          understanding the relationship between the two helps you navigate site requirements and
          avoid unnecessary costs.
        </p>
      </>
    ),
  },
  {
    id: 'cscs',
    heading: 'What Is the CSCS Card?',
    content: (
      <>
        <p>
          The CSCS (Construction Skills Certification Scheme) card is the construction industry's
          standard proof of qualification and competence. It covers all construction trades —
          bricklayers, plumbers, carpenters, painters, labourers, managers, and more.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Managed by:</strong> CSCS Ltd, supported by CITB (Construction Industry
                Training Board) and the major construction federations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and safety test:</strong> CITB Health, Safety and Environment Test
                (general construction focus, 50 questions, ~80% pass mark).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Card types:</strong> Labourer (green), Skilled Worker (blue), Advanced Craft
                (gold), Supervisor (gold), Manager (black), and others.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Validity:</strong> 5 years from date of issue.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ecs',
    heading: 'What Is the ECS Card?',
    content: (
      <>
        <p>
          The ECS (Electrotechnical Certification Scheme) card is the sector-specific card for
          electrical workers. It is managed by the JIB (Joint Industry Board) and is part of the
          CSCS partnership scheme.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Managed by:</strong> JIB (Joint Industry Board for the Electrical
                Contracting Industry).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and safety test:</strong> ECS Health, Safety and Environmental
                Assessment (electrotechnical sector focus, 50 questions, ~80% pass mark).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Card types:</strong> Apprentice (white), Provisional (yellow), Installation
                Electrician (blue), Maintenance Electrician (blue), Gold Card (gold). See the{' '}
                <SEOInternalLink href="/guides/ecs-card-types-explained">
                  full ECS card types guide
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Validity:</strong> 5 years from date of issue.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>CSCS compatible:</strong> Accepted on all sites that require CSCS cards.
                Appears on the CSCS Smart Check system.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'comparison',
    heading: 'Side-by-Side Comparison',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-sm font-bold text-white border-b border-white/10 pb-3">
              <div>Feature</div>
              <div>CSCS</div>
              <div>ECS</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm text-white">
              <div>Managed by</div>
              <div>CSCS Ltd / CITB</div>
              <div>JIB</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm text-white">
              <div>Covers</div>
              <div>All construction trades</div>
              <div>Electrical sector only</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm text-white">
              <div>H&S test</div>
              <div>CITB HS&E Test</div>
              <div>ECS HS&E Assessment</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm text-white">
              <div>Shows qualifications</div>
              <div>Generic trade level</div>
              <div>Specific electrical quals</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm text-white">
              <div>JIB grade</div>
              <div>No</div>
              <div>Yes</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm text-white">
              <div>Site acceptance</div>
              <div>All construction sites</div>
              <div>All construction sites</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm text-white">
              <div>Card cost</div>
              <div>~36 pounds</div>
              <div>~36-40 pounds</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm text-white">
              <div>Validity</div>
              <div>5 years</div>
              <div>5 years</div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'site-acceptance',
    heading: 'Which Sites Accept Which?',
    content: (
      <>
        <p>
          The simple answer: the ECS card is accepted on every site that requires a CSCS card. You
          do not need both.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Major construction sites</strong> — ECS card accepted. Part of CSCS
                partnership scheme. Verified through CSCS Smart Check.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial fit-out sites</strong> — ECS card accepted. Often preferred over
                generic CSCS for electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial sites</strong> — ECS card accepted. Many industrial clients
                specifically require ECS cards for electrical workers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic work</strong> — neither card is required for domestic work, but
                having the ECS card demonstrates professionalism.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-get',
    heading: 'How to Get Each Card',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Getting a CSCS Card</h3>
            <ol className="space-y-2 text-white text-sm list-decimal list-inside">
              <li>Pass the CITB Health, Safety and Environment Test</li>
              <li>Hold an NVQ or recognised qualification for your trade</li>
              <li>Apply online through the CSCS website</li>
              <li>Upload qualification certificates and photo</li>
              <li>Pay the application fee (~36 pounds)</li>
              <li>Receive your card within 2 to 4 weeks</li>
            </ol>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Getting an ECS Card</h3>
            <ol className="space-y-2 text-white text-sm list-decimal list-inside">
              <li>Pass the ECS Health, Safety and Environmental Assessment</li>
              <li>Hold NVQ Level 3, C&G 2382, and AM2 (for blue card)</li>
              <li>Apply online through the JIB/ECS website</li>
              <li>Upload qualification certificates and photo</li>
              <li>Pay the application fee (~36-40 pounds)</li>
              <li>Receive your card within 2 to 4 weeks</li>
            </ol>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Costs and Renewal',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.04]">
              <span className="text-white font-medium">CSCS card application</span>
              <span className="text-white">~36 pounds</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.04]">
              <span className="text-white font-medium">CITB H&S test</span>
              <span className="text-white">~21-25 pounds</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
              <span className="text-white font-medium">ECS card application</span>
              <span className="text-white">~36-40 pounds</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
              <span className="text-white font-medium">ECS H&S assessment</span>
              <span className="text-white">~21-25 pounds</span>
            </div>
          </div>
        </div>
        <p>
          Both cards are valid for 5 years. Renewal requires a current health and safety test and
          up-to-date qualifications. Set a reminder 3 months before your card expires to ensure you
          renew in time — working on site with an expired card will result in being refused access.
        </p>
      </>
    ),
  },
  {
    id: 'which-need',
    heading: 'Which Do You Need?',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If you are an electrician:</strong> Get the ECS card. It covers all sites
                and shows your specific electrical qualifications. This is the only card you need.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If you are a general builder who does some electrical work:</strong> You may
                need a CSCS card for your primary trade and an ECS card for your electrical work —
                but check whether your electrical qualifications are sufficient for an ECS card
                first.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If you are an electrical apprentice:</strong> Apply for the ECS Apprentice
                card (white card). This is your first ECS card and provides site access during your
                apprenticeship.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If you only do domestic work:</strong> Neither card is legally required, but
                the ECS card demonstrates professionalism and may become important if you take on
                commercial work in the future.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Build Your Professional Profile',
    content: (
      <>
        <p>
          Your ECS card proves your competence on site. Your certificates prove the quality of your
          work. Make sure both are always up to standard.
        </p>
        <SEOAppBridge
          title="Professional certificates and qualification tracking"
          description="Elec-Mate helps you track your qualifications, card expiry dates, and CPD records in one place. Plus professional EIC, EICR, and minor works certificates from your phone. 7-day free trial."
          icon={CreditCard}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CSCSvsECSCardPage() {
  return (
    <GuideTemplate
      title="CSCS vs ECS Card | Which Card Do Electricians Need? UK 2026"
      description="CSCS vs ECS card comparison for UK electricians. Which sites accept which, how to get each card, costs, renewal, and which one you actually need. Clear guidance for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Scale}
      heroTitle={
        <>
          CSCS vs ECS Card: <span className="text-yellow-400">Which Card Do You Need?</span>
        </>
      }
      heroSubtitle="Electricians hear about both CSCS and ECS cards — but which one do you actually need? This guide explains the difference, site acceptance, costs, and the clear answer for electricians."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About CSCS and ECS Cards"
      relatedPages={relatedPages}
      ctaHeading="Track Your Cards and Qualifications"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for qualification tracking, professional certificates, and career development. 7-day free trial, cancel anytime."
    />
  );
}
