import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Award,
  BookOpen,
  Brain,
  GraduationCap,
  FileCheck2,
  Target,
  Lightbulb,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/how-to-become-electrician-uk' },
  { label: 'ECS Card Types', href: '/guides/ecs-card-types' },
];

const tocItems = [
  { id: 'what-are-ecs-cards', label: 'What Are ECS Cards?' },
  { id: 'card-types', label: 'ECS Card Types Explained' },
  { id: 'which-card', label: 'Which Card Do You Need?' },
  { id: 'how-to-apply', label: 'How to Apply' },
  { id: 'renewal', label: 'Renewal Process' },
  { id: 'cscs-link', label: 'ECS and CSCS' },
  { id: 'career-progression', label: 'Career Progression Through Cards' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The ECS (Electrotechnical Certification Scheme) card is the industry-recognised identity card for electricians and electrical workers in the UK.',
  'There are multiple card types: Apprentice, Provisional, Installation Electrician (gold card), Technician, and more — each requires different qualifications.',
  'The gold Installation Electrician card requires the AM2 practical assessment, C&G 2382 (18th Edition), C&G 2391, and an NVQ Level 3.',
  'ECS cards must be renewed every 3 to 5 years and require evidence of ongoing CPD (Continuing Professional Development).',
  'Elec-Mate helps you prepare for every qualification you need for your ECS card — 46+ training courses, flashcards, mock exams, and the AM2 simulator.',
];

const faqs = [
  {
    question: 'What is the difference between an ECS card and a CSCS card?',
    answer:
      'The ECS (Electrotechnical Certification Scheme) card is the specific card for the electrical sector, managed by the JIB (Joint Industry Board) and NET (formerly the ECA and SELECT). The CSCS (Construction Skills Certification Scheme) is the broader construction industry card. ECS cards are recognised as equivalent to CSCS cards — if you hold an ECS card, you do not need a separate CSCS card to access construction sites. Your ECS card has the CSCS logo on it to confirm this. The key difference is that the ECS scheme is tailored to electrotechnical occupations and recognises electrical qualifications specifically, whereas the CSCS scheme covers all construction trades. For electricians, the ECS card is the correct card to hold. Other trades (plumbers, bricklayers, carpenters) hold CSCS cards relevant to their own sector schemes.',
  },
  {
    question: 'How long does it take to get an ECS card?',
    answer:
      "Once you submit your application with all required evidence (qualifications, photo, health and safety test result), processing typically takes 2 to 4 weeks. The card is posted to your home address. If your application is straightforward and all documents are in order, it can be quicker. Delays usually occur when qualification evidence is missing or when the JIB needs to verify qualifications with the awarding body. You can apply online through the JIB/ECS website, which is faster than paper applications. If you need a card urgently for site access, some employers can arrange a temporary visitor pass while your ECS card is being processed, but this is at the site contractor's discretion.",
  },
  {
    question: 'Do I need an ECS card to work as an electrician?',
    answer:
      'Legally, there is no law that requires you to hold an ECS card to carry out electrical work. However, in practice, an ECS card is essential. Almost all commercial and industrial construction sites require workers to hold a valid ECS or CSCS card for site access — it is a standard condition in contracts and site rules. Many domestic electrical employers also expect their electricians to hold the card. Registration with competent person schemes (NICEIC, NAPIT, ELECSA) does not require an ECS card, but the qualifications needed for scheme registration (18th Edition, 2391, NVQ) are the same qualifications that qualify you for the ECS card. In summary: you can technically work without one, but you will find it very difficult to access sites, gain employment with reputable companies, or demonstrate your credentials to customers.',
  },
  {
    question: 'What qualifications do I need for the gold ECS card?',
    answer:
      'The gold Installation Electrician card (the most widely held ECS card for qualified electricians) requires: (1) An NVQ Level 3 in Electrotechnical Services (or the older NVQ Level 3 in Installing Electrotechnical Systems and Equipment). (2) The AM2 (or AM2S) practical assessment — a hands-on assessment of your installation and testing skills, typically taken at a JIB-approved assessment centre. (3) C&G 2382 (18th Edition IET Wiring Regulations) or equivalent. (4) C&G 2391 or equivalent inspection and testing qualification. (5) A current Health, Safety and Environment (HS&E) test pass from the CSCS/JIB testing system. Some of these requirements may be embedded within your NVQ — check with the JIB. The AM2 is often the final hurdle, as it is a practical assessment that must be taken at a specialist centre.',
  },
  {
    question: 'Can I upgrade my ECS card?',
    answer:
      'Yes, you can upgrade your ECS card as you gain additional qualifications. For example, if you currently hold a Provisional card and then complete your NVQ Level 3 and pass the AM2, you can apply for the gold Installation Electrician card. If you hold the Installation Electrician card and later gain an HNC/HND or degree in electrical engineering, you can upgrade to the Technician card. The process is straightforward: submit a new application through the JIB/ECS website with evidence of your additional qualifications. You will receive a new card reflecting your upgraded status. Your old card should be returned or destroyed. There is an application fee for each new card.',
  },
  {
    question: 'How much does an ECS card cost?',
    answer:
      'The ECS card application fee is typically £36 to £40 for a standard card, valid for 3 to 5 years depending on the card type. Renewal costs a similar amount. You will also need to pay for the HS&E test (approximately £21) if you have not already passed it. These costs are separate from the costs of obtaining the qualifications themselves (NVQ, AM2, 18th Edition, 2391). Some employers will cover the ECS card application fee as part of your employment or apprenticeship. Check with your employer or training provider. The JIB/ECS website has the most up-to-date fee schedule.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-to-become-electrician-uk',
    title: 'How to Become an Electrician',
    description:
      'Complete pathway from school leaver to qualified electrician, including all qualifications needed.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/guides/nvq-level-3-electrical',
    title: 'NVQ Level 3 Electrical',
    description: 'What is involved in the NVQ Level 3 and how to build your portfolio of evidence.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description:
      'Preparation guide for the AM2 practical assessment — the final step to the gold card.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/18th-edition-exam-tips',
    title: '18th Edition Exam Tips',
    description:
      'How to pass the C&G 2382 exam — format, regulations, book tabs, and time management.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Electrical Qualifications Pathway',
    description: 'The full map of electrical qualifications from Level 2 to Level 4 and beyond.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description: 'How to meet the CPD requirements for ECS card renewal and scheme registration.',
    icon: Award,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-are-ecs-cards',
    heading: 'What Are ECS Cards and Why Do They Matter?',
    content: (
      <>
        <p>
          The Electrotechnical Certification Scheme (ECS) is the industry card scheme for
          electricians and electrical workers in the UK. Managed by the JIB (Joint Industry Board),
          the ECS card is your proof of qualifications, competence, and identity on site. It is the
          electrical trade's equivalent of a passport — without it, you cannot access most
          commercial and industrial construction sites.
        </p>
        <p>
          The ECS card carries the CSCS logo, which means it is recognised across the entire
          construction industry — not just by electrical contractors. Main contractors, site
          managers, and health and safety officers all recognise the ECS card as valid proof that
          you are qualified to carry out electrotechnical work.
        </p>
        <p>
          There are several types of ECS card, each corresponding to a different level of
          qualification and experience. The card you hold tells employers and clients exactly what
          level of work you are qualified to carry out. As you gain qualifications and experience,
          you can upgrade your card to reflect your progression through the trade.
        </p>
      </>
    ),
  },
  {
    id: 'card-types',
    heading: 'ECS Card Types Explained',
    content: (
      <>
        <p>
          The ECS scheme offers several card types. Here are the most common ones for electricians:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Apprentice Card (red)</h4>
                <p className="text-white text-sm leading-relaxed">
                  For registered{' '}
                  <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
                    electrical apprentices
                  </SEOInternalLink>{' '}
                  currently working towards their qualifications. Requires enrolment on a recognised
                  apprenticeship programme and a current HS&E test pass. Valid for the duration of
                  the apprenticeship (typically 3 to 4 years). This card allows site access for
                  apprentices working under supervision.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Provisional Card (blue)</h4>
                <p className="text-white text-sm leading-relaxed">
                  For individuals who have completed their academic qualifications (such as the
                  Diploma in Electrical Installation) but have not yet completed the NVQ Level 3 or
                  passed the AM2. The Provisional card recognises that you have the theoretical
                  knowledge but are still building the practical evidence for your NVQ portfolio.
                  Valid for up to 3 years, during which time you should be working towards
                  completing the NVQ and AM2.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Installation Electrician Card (gold)</h4>
                <p className="text-white text-sm leading-relaxed">
                  The gold card is the standard card for fully qualified Installation Electricians.
                  Requires: NVQ Level 3, AM2 pass,{' '}
                  <SEOInternalLink href="/guides/18th-edition-exam-tips">
                    C&G 2382 (18th Edition)
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/2391-exam-tips">
                    C&G 2391 (Inspection and Testing)
                  </SEOInternalLink>
                  , and a current HS&E test pass. This is the card most electricians are working
                  towards. It confirms you are qualified to design, install, inspect, and test
                  electrical installations. Valid for 5 years.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Technician Card (black)</h4>
                <p className="text-white text-sm leading-relaxed">
                  For electricians with additional higher-level qualifications — typically an
                  HNC/HND or foundation degree in electrical/electronic engineering, on top of the
                  standard Installation Electrician requirements. The Technician card recognises a
                  higher level of technical knowledge and is often held by engineers, designers, and
                  senior technical staff.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-white mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Other Card Types</h4>
                <p className="text-white text-sm leading-relaxed">
                  The ECS scheme also issues cards for: Maintenance Electricians, Electrical
                  Improvers (experienced but without formal NVQ), Highway Electrical operatives,
                  Fire and Security engineers, Data and Communications engineers, and Building
                  Management Systems (BMS) engineers. Each has specific qualification requirements.
                  Check the JIB/ECS website for the full list.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'which-card',
    heading: 'Which ECS Card Do You Need?',
    content: (
      <>
        <p>
          The ECS card you need depends on where you are in your career and what qualifications you
          hold. Here is a quick guide:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Starting an apprenticeship?</strong> You need the Apprentice card (red).
                Your employer or training provider should arrange this as part of your
                apprenticeship registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Finished your academic qualifications but not yet completed the NVQ or AM2?
                </strong>{' '}
                Apply for the Provisional card (blue). This gives you site access while you work
                towards your full qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fully qualified with NVQ Level 3, AM2, 18th Edition, and 2391?</strong>{' '}
                Apply for the Installation Electrician card (gold). This is the standard card for
                qualified electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Hold an HNC/HND or degree on top of your installation qualifications?
                </strong>{' '}
                Apply for the Technician card (black).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experienced electrician without formal NVQ?</strong> Check the Experienced
                Worker assessment route — the JIB offers a pathway for experienced workers to gain
                formal recognition without going back to college.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Prepare for every qualification with Elec-Mate"
          description="Whether you are studying for the 18th Edition, 2391, NVQ, or preparing for the AM2, Elec-Mate has you covered. 46+ training courses, flashcards, mock exams, AM2 simulator, and progress tracking. Start your 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'how-to-apply',
    heading: 'How to Apply for Your ECS Card',
    content: (
      <>
        <p>
          Applying for an ECS card is done through the JIB/ECS website. The process is
          straightforward:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Pass the HS&E test.</strong> Before you can apply for any ECS card, you must
              pass the Health, Safety and Environment test. This is a computer-based test taken at a
              Pearson VUE centre. It covers general health and safety knowledge relevant to
              construction sites. The test costs approximately £21 and is valid for 2 years.
            </li>
            <li>
              <strong>Gather your qualification evidence.</strong> You will need copies of your
              qualification certificates — the specific ones depend on which card you are applying
              for. For the gold Installation Electrician card: NVQ Level 3 certificate, AM2 pass
              certificate, C&G 2382 certificate, and C&G 2391 certificate.
            </li>
            <li>
              <strong>Create an account on the JIB/ECS website.</strong> Register and complete the
              online application form. Upload your qualification evidence and a passport-style
              photo.
            </li>
            <li>
              <strong>Pay the application fee.</strong> The fee is typically £36 to £40, payable
              online by card.
            </li>
            <li>
              <strong>Wait for processing.</strong> The JIB will verify your qualifications and
              process your application. This usually takes 2 to 4 weeks. Your card will be posted to
              your home address.
            </li>
          </ol>
        </div>
        <p>
          If you are an apprentice, your employer or training provider usually handles the
          application on your behalf. For all other card types, you apply directly.
        </p>
      </>
    ),
  },
  {
    id: 'renewal',
    heading: 'ECS Card Renewal: What You Need',
    content: (
      <>
        <p>
          ECS cards are not permanent — they must be renewed. The renewal process ensures that
          cardholders are keeping their knowledge and skills up to date.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Validity period:</strong> Most ECS cards are valid for 5 years. Apprentice
                cards are valid for the duration of the apprenticeship. Provisional cards are
                typically valid for 3 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CPD requirement:</strong> To renew your card, you must demonstrate that you
                have completed{' '}
                <SEOInternalLink href="/guides/cpd-for-electricians">
                  Continuing Professional Development (CPD)
                </SEOInternalLink>{' '}
                during the card's validity period. The JIB requires evidence of relevant learning
                activities — courses, training, seminars, or structured self-study.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current qualifications:</strong> Your qualifications must still be current
                at renewal. If a new edition of a qualification has been introduced (for example, a
                new edition of the Wiring Regulations), you may need to update to the current
                version before renewal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HS&E test:</strong> You may need a current HS&E test pass at renewal. The
                test is valid for 2 years, so you may need to retake it during your card's validity
                period.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The JIB sends renewal reminders before your card expires. Do not let your card lapse —
          turning up to site with an expired card is the same as turning up with no card. Apply for
          renewal at least 4 to 6 weeks before the expiry date.
        </p>
      </>
    ),
  },
  {
    id: 'cscs-link',
    heading: 'ECS Cards and the CSCS Scheme',
    content: (
      <>
        <p>
          The ECS scheme is a partner scheme of the CSCS (Construction Skills Certification Scheme).
          This means your ECS card carries the CSCS logo and is recognised on all CSCS-controlled
          sites. You do not need a separate CSCS card if you hold a valid ECS card.
        </p>
        <p>
          When you arrive at a construction site and the gateman asks for your CSCS card, your ECS
          card serves the same purpose. The card has a colour coding system that tells the site
          manager your occupation and qualification level at a glance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Red = Apprentice.</strong> Working towards qualifications, must work under
                supervision.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Blue = Provisional.</strong> Academically qualified, building practical
                experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gold = Installation Electrician.</strong> Fully qualified, can work
                independently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Black = Technician.</strong> Higher-level qualification holder.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The CSCS scheme periodically reviews its partner schemes to ensure standards are
          maintained. The ECS scheme has consistently met these standards, making it one of the most
          respected sector card schemes in UK construction.
        </p>
      </>
    ),
  },
  {
    id: 'career-progression',
    heading: 'Career Progression Through ECS Cards',
    content: (
      <>
        <p>
          Your ECS card tells a story of your career progression. Most electricians follow this
          path:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Apprentice card (red)</strong> — start your apprenticeship, study{' '}
              <SEOInternalLink href="/guides/level-2-electrical">Level 2</SEOInternalLink> and{' '}
              <SEOInternalLink href="/guides/nvq-level-3-electrical">Level 3</SEOInternalLink> at
              college while gaining on-site experience.
            </li>
            <li>
              <strong>Provisional card (blue)</strong> — finish your college qualifications,
              continue building your NVQ portfolio and preparing for the AM2.
            </li>
            <li>
              <strong>Installation Electrician card (gold)</strong> — pass the AM2, complete the NVQ
              Level 3, and hold the 18th Edition and 2391. You are now fully qualified.
            </li>
            <li>
              <strong>Technician card (black)</strong> — gain higher-level qualifications (HNC/HND
              or degree) while continuing to work in the trade. Optional but opens doors to
              engineering and design roles.
            </li>
          </ol>
        </div>
        <p>
          Each step up requires additional study and assessment. Elec-Mate supports every stage of
          this journey with tailored training courses, from{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            apprentice-level content
          </SEOInternalLink>{' '}
          through to advanced inspection and testing preparation.
        </p>
        <SEOAppBridge
          title="Track your qualification progress with Elec-Mate"
          description="Elec-Mate's progress tracking shows you exactly where you are on the path to your gold card. Complete courses, flashcard sets, and mock exams are all tracked — so you know what you have covered and what is left to do."
          icon={Award}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ECSCardTypesPage() {
  return (
    <GuideTemplate
      title="ECS Card Types | Which Card Do You Need?"
      description="Complete guide to ECS card types for electricians in the UK. Covers Apprentice, Provisional, Installation Electrician (gold), and Technician cards. How to apply, renewal, CSCS link, and career progression."
      datePublished="2025-05-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Award}
      heroTitle={
        <>
          ECS Card Types: <span className="text-yellow-400">Which Card Do You Need?</span>
        </>
      }
      heroSubtitle="The ECS card is your proof of qualifications and your passport to UK construction sites. There are different cards for different career stages — Apprentice, Provisional, Installation Electrician (gold), and Technician. This guide explains each type, what qualifications you need, how to apply, and how to renew."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About ECS Cards"
      relatedPages={relatedPages}
      ctaHeading="Prepare for Your Gold Card with Elec-Mate"
      ctaSubheading="46+ training courses covering the 18th Edition, 2391, NVQ, and AM2. Flashcards, mock exams, AM2 simulator, and progress tracking. 7-day free trial, cancel anytime."
    />
  );
}
