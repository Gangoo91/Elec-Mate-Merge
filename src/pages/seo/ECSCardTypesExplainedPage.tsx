import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  CreditCard,
  CheckCircle2,
  Award,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  FileCheck2,
  BookOpen,
  Target,
  HardHat,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-training-courses-uk' },
  { label: 'ECS Card Types', href: '/guides/ecs-card-types-explained' },
];

const tocItems = [
  { id: 'overview', label: 'What Is the ECS Card?' },
  { id: 'card-types', label: 'ECS Card Types' },
  { id: 'apprentice-card', label: 'Apprentice Card' },
  { id: 'provisional-card', label: 'Provisional Card' },
  { id: 'installation-card', label: 'Installation Electrician Card' },
  { id: 'maintenance-card', label: 'Maintenance Electrician Card' },
  { id: 'gold-card', label: 'Gold Card' },
  { id: 'how-to-apply', label: 'How to Apply' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The ECS (Electrotechnical Certification Scheme) card is the industry-standard identification card for electricians and electrical workers in the UK. It is managed by the JIB (Joint Industry Board) and is required for site access on most commercial and industrial projects.',
  'There are multiple card types: Apprentice (white), Provisional (yellow), Installation Electrician (blue), Maintenance Electrician (blue), and Gold Card (gold). Each requires different qualifications and experience.',
  'The Installation Electrician card (blue card) is the most common and requires Level 3 NVQ, C&G 2382 (18th Edition), and the AM2 assessment. This is the standard card for a fully qualified electrician.',
  'The Gold Card requires additional qualifications above the blue card — typically C&G 2391 (Inspection and Testing) plus a design qualification (C&G 2396) or equivalent.',
  'All ECS cards require a valid health and safety qualification and must be renewed every 5 years. You must keep your qualifications up to date to renew.',
];

const faqs = [
  {
    question: 'Do I need an ECS card to work as an electrician?',
    answer:
      'There is no legal requirement to hold an ECS card to work as an electrician in the UK. However, it is a practical requirement for most commercial and industrial work — main contractors and site managers require it for site access. It is part of the Construction Skills Certification Scheme (CSCS) family and is accepted on all major construction sites. For domestic work only, you may not need one, but having it demonstrates your competence and professionalism to customers.',
  },
  {
    question: 'What is the difference between an ECS card and a CSCS card?',
    answer:
      'The ECS card is the electrical sector equivalent of the CSCS card. CSCS (Construction Skills Certification Scheme) covers all construction trades. The ECS is specifically for the electrotechnical sector and is managed by the JIB. An ECS card is accepted anywhere a CSCS card would be — they are part of the same scheme. You do not need both — the ECS card covers you. If you are an electrician, apply for the ECS card rather than a generic CSCS card.',
  },
  {
    question: 'How long does an ECS card last?',
    answer:
      'All ECS cards are valid for 5 years from the date of issue. To renew, you must hold a current health and safety qualification and demonstrate that your electrical qualifications are up to date. If your 18th Edition qualification has expired or been superseded, you will need to update it before renewal. The JIB sends renewal reminders before your card expires. Do not let your card lapse — working on site with an expired card can result in being turned away.',
  },
  {
    question: 'How much does an ECS card cost?',
    answer:
      'The ECS card costs approximately 36 to 40 pounds for a new application and a similar amount for renewal (prices as of 2026). There may be additional costs for the health and safety test (the ECS Health, Safety and Environmental Assessment) if you have not already passed it. These costs are modest compared to the value of being able to work on any commercial or industrial site in the UK.',
  },
  {
    question: 'Can I get an ECS card without the AM2?',
    answer:
      'You can get certain ECS cards without the AM2. The Apprentice card and Provisional card do not require the AM2. However, the full Installation Electrician card (blue card) requires the AM2 assessment. If you are a time-served electrician who qualified before the AM2 was introduced, there may be alternative routes — check with the JIB directly, as they assess experienced worker applications on a case-by-case basis.',
  },
  {
    question: 'What health and safety qualification do I need for an ECS card?',
    answer:
      'You need the ECS Health, Safety and Environmental Assessment (often called the ECS health and safety test). This is a computer-based test with 50 multiple-choice questions covering health and safety legislation, risk assessment, working at height, electrical safety, fire safety, and manual handling. The pass mark is 80% (40 out of 50). The test is valid for the duration of your ECS card (5 years). Alternatively, an SSSTS or SMSTS certificate may be accepted — check with the JIB.',
  },
  {
    question: 'I qualified abroad — can I get a UK ECS card?',
    answer:
      'Yes, but your qualifications must be assessed for UK equivalency. The JIB has a process for assessing overseas qualifications. You will typically need to provide certified translations of your qualifications, evidence of your training and experience, and you may need to take the C&G 2382 (18th Edition) to demonstrate knowledge of UK Wiring Regulations. Contact the JIB directly for guidance on your specific qualifications — the process varies depending on which country you trained in.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/gold-card-requirements-electrician',
    title: 'Gold Card Requirements',
    description: 'Detailed breakdown of the qualifications and experience needed for the ECS Gold Card.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/jib-grading-explained',
    title: 'JIB Grading Explained',
    description: 'Understand JIB grades, pay rates, and how they link to ECS card types.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/cscs-vs-ecs-card-comparison',
    title: 'CSCS vs ECS Card',
    description: 'Which card do you need? Detailed comparison of CSCS and ECS cards.',
    icon: CreditCard,
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
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description: 'Prepare for the AM2 practical assessment — required for the full blue card.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/competent-person-scheme-guide',
    title: 'Competent Person Schemes',
    description: 'NICEIC, NAPIT, ELECSA — the next step after getting your ECS card.',
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
    heading: 'What Is the ECS Card?',
    content: (
      <>
        <p>
          The ECS (Electrotechnical Certification Scheme) card is your proof of qualification and
          competence as an electrical worker in the UK. It is managed by the JIB (Joint Industry
          Board for the Electrical Contracting Industry) and is recognised on every major
          construction site in the country.
        </p>
        <p>
          Think of it as your electrician's passport. Without it, you cannot get onto most
          commercial and industrial sites. It tells site managers, main contractors, and clients
          exactly what level of qualification you hold and what type of work you are competent to
          carry out.
        </p>
        <p>
          The ECS card is part of the wider CSCS (Construction Skills Certification Scheme) family,
          which means it is accepted anywhere a CSCS card would be. If you are an electrician, the
          ECS card is the correct card for you — not a generic CSCS card.
        </p>
      </>
    ),
  },
  {
    id: 'card-types',
    heading: 'ECS Card Types at a Glance',
    content: (
      <>
        <p>
          There are several ECS card types, each corresponding to a different level of qualification
          and experience. Here is an overview before we go into detail on each:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Apprentice (White)</h3>
            <p className="text-white text-sm">For electrical apprentices currently in training.</p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Provisional (Yellow)</h3>
            <p className="text-white text-sm">For qualified electricians who have not yet passed the AM2.</p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Installation Electrician (Blue)</h3>
            <p className="text-white text-sm">Fully qualified electrician with NVQ3 + 2382 + AM2.</p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Gold Card</h3>
            <p className="text-white text-sm">Senior electrician with additional design and testing qualifications.</p>
          </div>
        </div>
        <p>
          There are also specialist cards for maintenance electricians, highway electrical operatives,
          and other specific roles, but the four above are the most common.
        </p>
      </>
    ),
  },
  {
    id: 'apprentice-card',
    heading: 'Apprentice Card (White)',
    content: (
      <>
        <p>
          The Apprentice card is for people who are currently enrolled on an electrical
          apprenticeship programme. It confirms that you are training to become an electrician and
          allows you site access while you are learning.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requirements:</strong> You must be registered on a recognised electrical
                apprenticeship programme (typically Level 3 Electrotechnical or Level 2 Electrical
                Installation) and have passed the ECS Health, Safety and Environmental Assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Validity:</strong> Valid for the duration of your apprenticeship, up to a
                maximum of 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On site:</strong> You must work under the supervision of a qualified
                electrician at all times. The Apprentice card does not authorise you to work
                unsupervised.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'provisional-card',
    heading: 'Provisional Card (Yellow)',
    content: (
      <>
        <p>
          The Provisional card is a stepping stone for electricians who have completed their
          qualifications but have not yet passed the AM2 assessment.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requirements:</strong> Level 3 NVQ in Electrotechnical Services (or
                equivalent), C&G 2382 (18th Edition), and the ECS Health, Safety and Environmental
                Assessment. The AM2 is NOT required for this card.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Validity:</strong> 5 years, but you should aim to pass the AM2 and upgrade
                to the full blue card as soon as possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limitations:</strong> Some main contractors and sites distinguish between
                provisional and full cardholders. Having only the provisional card may limit your
                earning potential and the projects you can work on.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-card',
    heading: 'Installation Electrician Card (Blue)',
    content: (
      <>
        <p>
          The Installation Electrician card is the standard card for a fully qualified electrician.
          This is the card that most employers and site managers expect to see.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requirements:</strong> Level 3 NVQ in Electrotechnical Services (or
                equivalent), C&G 2382 (18th Edition), AM2 assessment, and the ECS Health, Safety
                and Environmental Assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What it proves:</strong> That you are a fully qualified installation
                electrician who can work unsupervised on electrical installation projects. You have
                demonstrated both theoretical knowledge and practical competence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB grade:</strong> Corresponds to JIB Electrician grade, which determines
                your minimum pay rate under JIB terms.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The blue card is the goal for most apprentices and trainees. Once you have it, you are
          recognised as a fully qualified electrician across the entire UK construction industry.
        </p>
      </>
    ),
  },
  {
    id: 'maintenance-card',
    heading: 'Maintenance Electrician Card (Blue)',
    content: (
      <>
        <p>
          The Maintenance Electrician card is for electricians who specialise in maintaining
          existing electrical installations rather than installing new ones.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requirements:</strong> Level 3 NVQ in Electrotechnical Services (Maintenance
                pathway), C&G 2382 (18th Edition), and the ECS Health, Safety and Environmental
                Assessment. The AM2 may be required depending on the specific pathway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical roles:</strong> Building maintenance electricians, facilities
                management, industrial maintenance, and planned preventive maintenance (PPM)
                programmes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'gold-card',
    heading: 'Gold Card',
    content: (
      <>
        <p>
          The ECS Gold Card is the highest standard ECS card and recognises electricians with
          qualifications and experience above the standard installation or maintenance level.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requirements:</strong> Everything needed for the blue card PLUS additional
                qualifications. Typically this means{' '}
                <SEOInternalLink href="/guides/city-guilds-2382-exam-guide">C&G 2382</SEOInternalLink>
                , C&G 2391 (Inspection and Testing), and a design qualification such as the{' '}
                <SEOInternalLink href="/guides/city-guilds-2396-design-course">C&G 2396</SEOInternalLink>
                . See the{' '}
                <SEOInternalLink href="/guides/gold-card-requirements-electrician">
                  full Gold Card requirements guide
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>What it proves:</strong> That you are qualified to design, install, inspect,
                and test electrical installations. It is the most comprehensive ECS card and
                demonstrates the highest level of competence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Benefits:</strong> Higher{' '}
                <SEOInternalLink href="/guides/jib-grading-explained">JIB grading</SEOInternalLink>
                {' '}and pay rates, credibility with clients and main contractors, and career
                progression to supervisory and management roles.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-apply',
    heading: 'How to Apply for an ECS Card',
    content: (
      <>
        <p>
          Applying for an ECS card is straightforward:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1:</strong> Pass the ECS Health, Safety and Environmental Assessment if
                you have not already. This is a computer-based test available at test centres
                nationwide.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2:</strong> Gather your qualification certificates — NVQ Level 3,
                C&G 2382, AM2 certificate, and any additional qualifications for Gold Card.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3:</strong> Apply online through the JIB/ECS website. Upload scanned
                copies of your certificates, provide a passport-style photo, and pay the application
                fee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4:</strong> Your application will be verified by the JIB. If everything
                is in order, your card will be posted to you within 2 to 4 weeks.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Track your qualifications with Elec-Mate"
          description="Keep all your certificates, card expiry dates, and CPD records in one place. Elec-Mate reminds you when renewals are due so you never work with an expired card."
          icon={CreditCard}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ECSCardTypesExplainedPage() {
  return (
    <GuideTemplate
      title="ECS Card Types Explained | Electrician Card Guide UK 2026"
      description="Complete guide to ECS card types for UK electricians. Apprentice, Provisional, Installation Electrician, Maintenance, and Gold Card — requirements, how to apply, costs, and renewal. Updated 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={CreditCard}
      heroTitle={
        <>
          ECS Card Types Explained:{' '}
          <span className="text-yellow-400">Which Card Do You Need?</span>
        </>
      }
      heroSubtitle="The ECS card is your electrician's passport to UK construction sites. This guide explains every card type — Apprentice, Provisional, Installation, Maintenance, and Gold — with the qualifications needed for each."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About ECS Cards"
      relatedPages={relatedPages}
      ctaHeading="Build Your Electrical Career With Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for training, certification, and career development. 7-day free trial, cancel anytime."
    />
  );
}
