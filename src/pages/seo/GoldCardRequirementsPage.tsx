import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  CreditCard,
  CheckCircle2,
  Award,
  TrendingUp,
  ArrowUpRight,
  FileCheck2,
  BookOpen,
  Target,
  ShieldCheck,
  Star,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-training-courses-uk' },
  { label: 'Gold Card Requirements', href: '/guides/gold-card-requirements-electrician' },
];

const tocItems = [
  { id: 'overview', label: 'What Is the ECS Gold Card?' },
  { id: 'qualifications', label: 'Qualifications Needed' },
  { id: 'am2', label: 'The AM2 Assessment' },
  { id: 'experience', label: 'Experience Requirements' },
  { id: 'application', label: 'How to Apply' },
  { id: 'benefits', label: 'Benefits of the Gold Card' },
  { id: 'common-questions', label: 'Common Pitfalls' },
  { id: 'for-electricians', label: 'Your Path to Gold' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The ECS Gold Card is the highest standard card in the Electrotechnical Certification Scheme. It recognises electricians who can design, install, inspect, and test electrical installations — the full range of competence.',
  'To qualify, you need: NVQ Level 3 in Electrotechnical Services, C&G 2382 (18th Edition), AM2 assessment, C&G 2391 (Inspection and Testing), AND a design qualification — typically C&G 2396 (Electrical Installation Design).',
  'The Gold Card corresponds to the JIB Technician grade, which commands the highest standard pay rate. In 2026, this is approximately 21.13 pounds per hour nationally, 22.80 in London.',
  'Many Gold Card holders progress to supervisory roles, start their own businesses, or move into consulting. The card is a credibility marker that distinguishes you from other electricians.',
  'You also need the ECS Health, Safety and Environmental Assessment and your card must be renewed every 5 years with current qualifications.',
  'GN3 (9th Edition, aligned to A4:2026) states that competence for inspection and testing is best shown by holding a recognised I&T qualification AND a current level 3 BS 7671 certificate — both the 2391 and a current 2382 are needed, not just one or the other.',
];

const faqs = [
  {
    question: 'What qualifications do I need for the ECS Gold Card?',
    answer:
      'You need all of the following: NVQ Level 3 in Electrotechnical Services (or equivalent such as C&G 2357/2365), C&G 2382 (18th Edition Wiring Regulations — current version 2382-22), AM2 practical assessment, C&G 2391 (Inspection and Testing), a design qualification such as C&G 2396 (Electrical Installation Design), and the ECS Health, Safety and Environmental Assessment. All qualifications must be current — if your 2382 is based on an older edition, you may need to update it.',
  },
  {
    question: 'Can I get a Gold Card without the C&G 2396?',
    answer:
      'The JIB requires a design qualification for the Gold Card. The C&G 2396 is the most common route, but it is not the only one. A Level 4 qualification in Electrical Installation (such as the C&G 2396 or equivalent), an HNC or HND in Electrical Engineering, or a degree in Electrical Engineering can also satisfy the design requirement. Check with the JIB directly if you hold an alternative qualification — they assess each application individually.',
  },
  {
    question: 'How long does it take to get from blue card to Gold Card?',
    answer:
      'From a standard Installation Electrician blue card, you need to pass the C&G 2391 (Inspection and Testing) and the C&G 2396 (Electrical Installation Design). If you study for both alongside your day job, expect 1 to 2 years. The 2391 course is typically 2 weeks of classroom study plus exam preparation. The 2396 course is typically 1 week of classroom study plus a design project. With focused study, you could complete both within 6 to 12 months.',
  },
  {
    question: 'Is the Gold Card worth it financially?',
    answer:
      'Yes. The JIB Technician rate (Gold Card grade) is approximately 2.92 pounds per hour more than the standard Electrician rate. Over a full year (based on a 37.5-hour week, 46 working weeks), that is approximately 5,037 pounds more per year at minimum rates. Many Gold Card holders earn well above JIB minimums. The total cost of the 2391 and 2396 courses is typically 1,200 to 1,800 pounds — so the investment pays for itself within the first year.',
  },
  {
    question: 'Do I need the Gold Card to do inspection and testing work?',
    answer:
      'No — you need the C&G 2391 qualification to carry out inspection and testing, but you do not need the Gold Card specifically. The Approved Electrician grade (which requires the 2391 but not a design qualification) is sufficient for inspection and testing work. The Gold Card adds the design qualification on top. However, having the Gold Card enhances your credibility with clients and employers for inspection and testing work.',
  },
  {
    question: 'Can I get the Gold Card through experience alone?',
    answer:
      'No. The JIB requires specific qualifications — experience alone is not sufficient for the Gold Card. You must hold the 2382, 2391, 2396 (or equivalent), and the AM2. There are no exemptions based on experience for these qualifications. If you are a very experienced electrician without formal qualifications beyond the basics, you will need to study for and pass the additional qualifications. Many experienced electricians find the courses straightforward because they already have the practical knowledge — the courses teach the theory and calculation methods to support what they already know from practice.',
  },
  {
    question: 'What is the renewal process for the Gold Card?',
    answer:
      'The Gold Card is valid for 5 years. To renew, you must hold a current ECS Health, Safety and Environmental Assessment and your electrical qualifications must be up to date. If a new edition of the Wiring Regulations has been published since your last 2382, you may need to update. The JIB sends renewal reminders approximately 3 months before expiry. Apply for renewal online through the JIB/ECS website.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ecs-card-types-explained',
    title: 'ECS Card Types Explained',
    description: 'Overview of all ECS card types — from Apprentice to Gold.',
    icon: CreditCard,
    category: 'Guide',
  },
  {
    href: '/guides/jib-grading-explained',
    title: 'JIB Grading Explained',
    description:
      'Understand JIB grades, pay rates, and how the Gold Card fits into the grade structure.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2382-exam-guide',
    title: 'C&G 2382 Exam Guide',
    description: 'The 18th Edition exam — one of the Gold Card prerequisites.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2396-design-course',
    title: 'C&G 2396 Design Course',
    description: 'The design qualification needed for the Gold Card.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/competent-person-scheme-guide',
    title: 'Competent Person Schemes',
    description: 'NICEIC, NAPIT, ELECSA — the natural complement to a Gold Card.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description: 'The practical assessment needed for the Gold Card.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What Is the ECS Gold Card?',
    content: (
      <>
        <p>
          The ECS Gold Card is the most prestigious card in the{' '}
          <SEOInternalLink href="/guides/ecs-card-types-explained">
            Electrotechnical Certification Scheme
          </SEOInternalLink>
          . It proves that you hold qualifications in design, installation, inspection, and testing
          — the complete set of electrical competences.
        </p>
        <p>
          In{' '}
          <SEOInternalLink href="/guides/jib-grading-explained">JIB grading terms</SEOInternalLink>,
          the Gold Card corresponds to the Technician grade — the highest standard grade with the
          highest minimum pay rate. It is the card that employers, clients, and site managers
          associate with the most experienced and qualified electricians.
        </p>
        <p>
          Getting the Gold Card requires commitment — you need qualifications beyond the standard
          blue card. But the investment in additional training pays for itself through higher
          earnings, greater career flexibility, and enhanced professional credibility.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: 'Qualifications Needed for the Gold Card',
    content: (
      <>
        <p>Here is the full list of qualifications required:</p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>NVQ Level 3</strong> in Electrotechnical Services (or equivalent — C&G 2357,
                C&G 2365, or equivalent overseas qualification assessed by the JIB).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/city-guilds-2382-exam-guide">
                    C&G 2382
                  </SEOInternalLink>
                </strong>{' '}
                — 18th Edition Wiring Regulations (current version: 2382-22, covering BS
                7671:2018+A4:2026).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>AM2 Assessment</strong> — the practical assessment of electrical
                installation competence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>C&G 2391</strong> — Inspection and Testing of Electrical Installations. This
                qualifies you to inspect, test, and certify installations.
              </span>
            </li>
          </ul>
          <div className="mt-4 rounded-xl bg-white/[0.04] border border-white/10 p-4">
            <p className="text-amber-300 text-sm font-semibold mb-2">
              What does the 2391 actually test?
            </p>
            <p className="text-white/70 text-xs mb-3">
              The C&G 2391 is assessed against BS 7671 Part 6 (Chapter 64 — Inspection and Testing).
              Candidates must demonstrate competence across the full verification sequence:
            </p>
            <ul className="space-y-1 text-white/80 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Continuity of protective conductors</strong> — ring finals and protective
                  conductors (Reg 643.2)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Insulation resistance</strong> — live conductors to earth and between live
                  conductors (Reg 643.3)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Polarity</strong> — correct connections throughout (Reg 643.6)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Earth fault loop impedance (Zs/EFLI)</strong> — protection by automatic
                  disconnection of supply (Reg 643.7)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>
                  <strong>RCD operating times</strong> — additional protection tests at I&Delta;n
                  and 5×I&Delta;n (Reg 643.8)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Functional testing</strong> — switchgear, controls, interlocks, AFDD
                  indication (Reg 643.10)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Verification of voltage drop</strong> — compliance with installation
                  design criteria (Chapter 64)
                </span>
              </li>
            </ul>
          </div>
          <ul className="space-y-4 text-white mt-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/city-guilds-2396-design-course">
                    C&G 2396
                  </SEOInternalLink>
                </strong>{' '}
                — Electrical Installation Design (or equivalent design qualification — HNC, HND, or
                degree in Electrical Engineering).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Health, Safety and Environmental Assessment</strong> — the health and
                safety test required for all ECS card types.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'am2',
    heading: 'The AM2 Assessment',
    content: (
      <>
        <p>
          The AM2 is the practical assessment that proves you can carry out electrical installation
          work to a competent standard. It is a hands-on test that takes place at a NET (National
          Electrotechnical Training) centre over one to two days.
        </p>
        <p>
          The assessment covers consumer unit installation, wiring circuits (ring final, radial,
          lighting), safe isolation, testing, and fault finding. You must demonstrate competence in
          all areas to pass. If you have already passed the AM2 for your blue card, you do not need
          to take it again for the Gold Card.
        </p>
        <p>
          For detailed preparation advice, see the{' '}
          <SEOInternalLink href="/guides/am2-exam-tips">AM2 exam tips guide</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'experience',
    heading: 'Experience Requirements',
    content: (
      <>
        <p>
          While the JIB does not specify a minimum number of years of experience for the Gold Card,
          the qualification requirements naturally imply significant experience. You cannot
          realistically hold an NVQ Level 3, C&G 2382, AM2, C&G 2391, and C&G 2396 without several
          years of training and work experience.
        </p>
        <p>
          Most Gold Card holders have at least 5 to 7 years of experience by the time they apply.
          The typical path is: 3 to 4 years apprenticeship, 1 to 2 years as a qualified electrician,
          then 1 to 2 years gaining additional qualifications (2391 and 2396). Some achieve it
          faster by studying alongside their day job.
        </p>
      </>
    ),
  },
  {
    id: 'application',
    heading: 'How to Apply for the Gold Card',
    content: (
      <>
        <p>The application process is the same as for any ECS card:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1:</strong> Ensure you hold all required qualifications. Gather your
                certificates — NVQ Level 3, C&G 2382, AM2, C&G 2391, C&G 2396, and ECS Health and
                Safety Assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2:</strong> Apply online through the JIB/ECS website. If you already
                have an ECS card (blue or other), apply for regrading rather than a new card.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3:</strong> Upload scanned copies of all certificates, provide a
                passport-style photo, and pay the application fee (approximately 36 to 40 pounds).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4:</strong> The JIB verifies your qualifications and issues your Gold
                Card. Processing typically takes 2 to 4 weeks.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'benefits',
    heading: 'Benefits of the Gold Card',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher pay</strong> — Technician grade commands the highest JIB rate.
                Approximately 5,000 pounds more per year than the standard Electrician rate at
                minimum JIB rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full competence range</strong> — you can design, install, inspect, and test.
                This makes you more versatile and valuable to employers and clients.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional credibility</strong> — the Gold Card is instantly recognised
                across the industry. It signals to clients and main contractors that you are at the
                top of your trade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Career flexibility</strong> — Gold Card holders are well-positioned for
                supervisory roles, project management, consulting, or running their own business.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competitive advantage</strong> — if you are self-employed, the Gold Card
                differentiates you from competitors when quoting for work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-questions',
    heading: 'Common Pitfalls When Applying',
    content: (
      <>
        <p>A few things that trip up Gold Card applicants:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdated 2382:</strong> If your 2382 was based on the 17th Edition or
                earlier, you need the current version (2382-22) before applying. Importantly, this
                also applies to earlier 18th Edition versions — BS 7671:2018 has been amended four
                times (A1:2020, A2:2022, A3:2024, A4:2026). The current consolidated edition is{' '}
                <strong>BS 7671:2018+A4:2026</strong>. If your certificate covers only Amendment 1,
                2, or 3, check with the JIB whether an update is required — the current 2382-22 exam
                covers A4:2026.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing health and safety test:</strong> The ECS Health, Safety and
                Environmental Assessment is required even if you hold SSSTS or SMSTS. Check with the
                JIB whether your existing safety qualification is accepted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certificate copies:</strong> Keep clear scanned copies of all certificates.
                If you have lost a certificate, contact the awarding body (City & Guilds, etc.) for
                a replacement before applying.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Your Path to Gold',
    content: (
      <>
        <p>
          The Gold Card is achievable for any electrician who is willing to invest in their
          professional development. The additional qualifications (2391 and 2396) are challenging
          but manageable alongside full-time work. The financial and career benefits make it one of
          the best investments you can make in your electrical career.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <p className="text-amber-300 font-semibold mb-3">
            Key A4:2026 changes Gold Card holders need to know
          </p>
          <ul className="space-y-2 text-white text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>AFDD requirement (Reg 421.1.7):</strong> Arc Fault Detection Devices are now
                recommended for certain final circuits supplying socket-outlets. Gold Card holders
                carrying out design and inspection work must apply this regulation and confirm AFDD
                operational indication at completion (Regs 421.1.7, 532.6, 651.2(e)).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consolidated edition:</strong> All assessment, certification, and design
                work must now reference BS 7671:2018+A4:2026. Pre-A4 copies reference regulation
                numbers that no longer exist in the consolidated text.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <p className="text-sm text-white/80 italic">
            "Competence [for inspection and testing] is best shown by holding recognised inspection
            and testing qualifications and a current level 3 BS 7671 certificate."
          </p>
          <p className="text-xs text-white/50 mt-2">
            — GN3 (9th Edition, aligned to BS 7671:2018+A4:2026), Chapter 1, Reg 1.1
          </p>
        </div>
        <SEOAppBridge
          title="18th Edition Amendment 4 Release Date 2026"
          description="18th Edition Amendment 4:2026 is now live. Learn the compliance deadline, cable sizing changes, and installation updates you need to know."
          icon={Award}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GoldCardRequirementsPage() {
  return (
    <GuideTemplate
      title="ECS Gold Card: How to Apply (UK Electrician 2026)"
      description="ECS Gold Card for UK electricians 2026: NVQ Level 3 + AM2 + 18th Edition + ECS H&S, application steps, cost, renewal cycle, what it unlocks on site."
      datePublished="2026-03-27"
      dateModified="2026-05-23"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Award}
      heroTitle={
        <>
          ECS Gold Card Requirements:{' '}
          <span className="text-yellow-400">Your Roadmap to the Top</span>
        </>
      }
      heroSubtitle="The Gold Card is the highest standard ECS card for UK electricians. This guide covers every qualification you need, how to apply, the benefits, and how long the journey takes."
      readingTime={11}
      answerBox={{
        question: 'How do you get an ECS Gold Card?',
        answer:
          'The ECS Gold Card (Installation or Maintenance Electrician) requires a recognised Level 3 electrotechnical qualification — typically an NVQ Level 3 (such as the 2346 or 5357) plus the AM2, or the equivalent apprenticeship — together with the current 18th Edition (C&G 2382) and a pass in the ECS Health, Safety & Environmental Assessment. Once you hold these, you apply through the ECS with proof of qualifications.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the ECS Gold Card"
      relatedPages={relatedPages}
      ctaHeading="Start Your Path to Gold Card"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for training, exam preparation, and career development. 7-day free trial, cancel anytime."
    />
  );
}
