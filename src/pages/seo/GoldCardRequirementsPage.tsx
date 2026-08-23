import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  CreditCard,
  Award,
  TrendingUp,
  ArrowUpRight,
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
  { label: 'Training', href: '/training' },
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
  'To qualify, you need: NVQ Level 3 in Electrotechnical Services, C&G 2382 covering the current Wiring Regulations (BS 7671:2018+A4:2026), AM2 assessment, C&G 2391 (Inspection and Testing), AND a design qualification — typically C&G 2396 (Electrical Installation Design).',
  'The Gold Card corresponds to the JIB Technician grade — the highest graded rate. From 5 January 2026 that is £22.70 an hour nationally and £25.47 in the London Zone (transport-provided rates), against £18.38 and £20.58 for an Electrician.',
  'Many Gold Card holders progress to supervisory roles, start their own businesses, or move into consulting. The card is a credibility marker that distinguishes you from other electricians.',
  'You also need the ECS Health, Safety and Environmental Assessment and your card must be renewed every 5 years with current qualifications.',
  'GN3 (9th Edition, aligned to A4:2026) says competence for inspection and testing is best shown by holding a recognised I&T qualification together with a current level 3 BS 7671 certificate — the 2391 and a current 2382 as a pair, rather than either on its own.',
];

const faqs = [
  {
    question: 'What qualifications do I need for the ECS Gold Card?',
    answer:
      'You need all of the following: NVQ Level 3 in Electrotechnical Services (or equivalent such as C&G 2357/2365), C&G 2382 covering the current Wiring Regulations, AM2 practical assessment, C&G 2391 (Inspection and Testing), a design qualification such as C&G 2396 (Electrical Installation Design), and the ECS Health, Safety and Environmental Assessment. All qualifications must be current — the current edition is BS 7671:2018+A4:2026, and the A2+A3 edition is withdrawn on 15 October 2026, so an older 2382 may need updating.',
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
      'Yes. From 5 January 2026 the JIB Technician rate (£22.70 an hour, transport provided) is £4.32 an hour above the Electrician rate of £18.38. That is about £162 a week on a 37.5-hour week, or roughly £7,450 over 46 paid working weeks. Many Gold Card holders earn well above JIB minimums. Course fees for the 2391 and 2396 vary by provider and are typically quoted in the low four figures — on those rates the investment pays for itself well inside the first year.',
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
          the Gold Card corresponds to the Technician grade — the highest graded rate. It is the
          card that employers, clients, and site managers associate with the most experienced and
          qualified electricians.
        </p>

        <h3 className="mt-6 mb-2 text-base font-semibold tracking-tight text-white">
          What the grade is worth
        </h3>
        <p>
          JIB National Standard hourly rates, effective Monday 5 January 2026. These are minimums —
          most Gold Card holders earn above them.
        </p>
        <div className="-mx-4 my-4 overflow-x-auto border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
          <table className="w-full min-w-[520px] border-collapse text-sm text-white">
            <thead>
              <tr className="border-b border-white/[0.14]">
                <th className="p-3 text-left font-semibold text-white">JIB grade</th>
                <th className="p-3 text-right font-semibold text-white">Transport provided</th>
                <th className="p-3 text-right font-semibold text-white">Own transport</th>
                <th className="p-3 text-right font-semibold text-white">London Zone (TP)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-elec-yellow">Technician (Gold Card grade)</td>
                <td className="p-3 text-right font-semibold text-elec-yellow">£22.70</td>
                <td className="p-3 text-right font-semibold text-elec-yellow">£23.87</td>
                <td className="p-3 text-right font-semibold text-elec-yellow">£25.47</td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 text-white">Approved Electrician</td>
                <td className="p-3 text-right text-white">£20.08</td>
                <td className="p-3 text-right text-white">£21.19</td>
                <td className="p-3 text-right text-white">£22.48</td>
              </tr>
              <tr>
                <td className="p-3 text-white">Electrician (incl. domestic)</td>
                <td className="p-3 text-right text-white">£18.38</td>
                <td className="p-3 text-right text-white">£19.54</td>
                <td className="p-3 text-right text-white">£20.58</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The step from Electrician to Technician is £4.32 an hour — about £162 a week on a
          37.5-hour week. Getting there means qualifications beyond the standard blue card, but the
          additional training pays for itself through higher earnings, greater career flexibility,
          and enhanced professional credibility.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: 'Qualifications Needed for the Gold Card',
    content: (
      <>
        <p>Six things, all of which must be current when you apply:</p>
        <div className="-mx-4 my-4 overflow-x-auto border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
          <table className="w-full min-w-[560px] border-collapse text-sm text-white">
            <thead>
              <tr className="border-b border-white/[0.14]">
                <th className="p-3 text-left font-semibold text-white">Requirement</th>
                <th className="p-3 text-left font-semibold text-white">What it proves</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-white">NVQ Level 3</td>
                <td className="p-3 text-white">
                  Electrotechnical Services — or an equivalent such as C&amp;G 2357 or 2365, or an
                  overseas qualification assessed by the JIB.
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-white">
                  <SEOInternalLink href="/guides/city-guilds-2382-exam-guide">
                    C&amp;G 2382
                  </SEOInternalLink>
                </td>
                <td className="p-3 text-white">
                  The Wiring Regulations exam. It must cover the edition that is current when you
                  apply — BS 7671:2018+A4:2026.
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-white">AM2</td>
                <td className="p-3 text-white">
                  Practical assessment of installation, safe isolation, testing and fault finding.
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-white">C&amp;G 2391</td>
                <td className="p-3 text-white">
                  Inspection and testing — qualifies you to inspect, test and certify installations.
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-white">
                  <SEOInternalLink href="/guides/city-guilds-2396-design-course">
                    C&amp;G 2396
                  </SEOInternalLink>
                </td>
                <td className="p-3 text-white">
                  Electrical installation design — or an equivalent HNC, HND or degree in electrical
                  engineering.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">
                  ECS Health, Safety and Environmental
                </td>
                <td className="p-3 text-white">
                  The assessment required for every ECS card type, whatever the grade.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 mb-2 text-base font-semibold tracking-tight text-white">
          What the 2391 actually tests
        </h3>
        <p>
          The 2391 is assessed against BS 7671 Part 6, Inspection and Testing — Chapter 64 covers
          initial verification. Regulation 643.1 sets the order: the tests of Regulations 643.2 to
          643.6 are carried out in that order before the installation is energised, and the
          remainder once it is live.
        </p>
        <div className="-mx-4 my-4 overflow-x-auto border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
          <table className="w-full min-w-[600px] border-collapse text-sm text-white">
            <thead>
              <tr className="border-b border-white/[0.14]">
                <th className="p-3 text-left font-semibold text-white">Reg</th>
                <th className="p-3 text-left font-semibold text-white">Test</th>
                <th className="p-3 text-left font-semibold text-white">What you have to show</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-elec-yellow">643.2</td>
                <td className="p-3 font-semibold text-white">Continuity of conductors</td>
                <td className="p-3 text-white">
                  Protective and bonding conductors, plus live conductors on ring final circuits.
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-elec-yellow">643.3</td>
                <td className="p-3 font-semibold text-white">Insulation resistance</td>
                <td className="p-3 text-white">
                  Live conductors to earth and between live conductors. A4 added a second stage at
                  643.3.3 — a 250 V DC test after equipment is connected, minimum 1 M&Omega;.
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-elec-yellow">643.4</td>
                <td className="p-3 font-semibold text-white">
                  SELV, PELV or electrical separation
                </td>
                <td className="p-3 text-white">
                  Separation of circuits confirmed by insulation resistance measurement to Table 64.
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-elec-yellow">643.5</td>
                <td className="p-3 font-semibold text-white">Resistance of floors and walls</td>
                <td className="p-3 text-white">
                  Only where Regulation 418.1, non-conducting location, is relied on — at least
                  three measurements per relevant surface.
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-elec-yellow">643.6</td>
                <td className="p-3 font-semibold text-white">Polarity</td>
                <td className="p-3 text-white">Correct connections throughout.</td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-elec-yellow">643.7</td>
                <td className="p-3 font-semibold text-white">Automatic disconnection of supply</td>
                <td className="p-3 text-white">
                  Earth fault loop impedance measured and compared with Chapter 41; prospective
                  fault current determined under 643.7.3.201.
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-elec-yellow">643.8</td>
                <td className="p-3 font-semibold text-white">Additional protection</td>
                <td className="p-3 text-white">
                  RCD effectiveness verified with equipment to BS EN 61557-6. The note is explicit:
                  regardless of RCD type, an alternating current test at rated residual operating
                  current (I&Delta;n), with a general non-delay type disconnecting in 300 ms
                  maximum.
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-elec-yellow">643.9</td>
                <td className="p-3 font-semibold text-white">Check of phase sequence</td>
                <td className="p-3 text-white">
                  Phase sequence maintained at all relevant points on polyphase circuits.
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="p-3 font-semibold text-elec-yellow">643.10</td>
                <td className="p-3 font-semibold text-white">Functional testing</td>
                <td className="p-3 text-white">
                  Switchgear and controlgear, drives, controls and interlocks, emergency switching
                  off and stopping, insulation monitoring — plus the RCD test facility and, where an
                  AFDD is fitted, its manual test facility.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-elec-yellow">643.11</td>
                <td className="p-3 font-semibold text-white">Verification of voltage drop</td>
                <td className="p-3 text-white">
                  Evaluated by measurement or calculation where needed to show compliance with
                  Chapter 52. The note says it is not normally required at initial verification.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Amendment 4 deleted Table 3A, so the old half-rated-current and five-times-rated-current
          RCD sequence is no longer an installation requirement in BS 7671. The 40 ms at 5&times;
          figure people still quote comes from the BS EN 61008 and 61009 product standards, not from
          Chapter 64. If your course notes predate A4, check this one before the exam.
        </p>
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
        <div className="-mx-4 my-4 border-y border-white/[0.14] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6 bg-white/[0.04]">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-elec-yellow mt-0.5 shrink-0" />
              <span>
                <strong>Step 1:</strong> Ensure you hold all required qualifications. Gather your
                certificates — NVQ Level 3, C&G 2382, AM2, C&G 2391, C&G 2396, and ECS Health and
                Safety Assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-elec-yellow mt-0.5 shrink-0" />
              <span>
                <strong>Step 2:</strong> Apply online through the JIB/ECS website. If you already
                have an ECS card (blue or other), apply for regrading rather than a new card.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-elec-yellow mt-0.5 shrink-0" />
              <span>
                <strong>Step 3:</strong> Upload scanned copies of all certificates, provide a
                passport-style photo, and pay the application fee (approximately 36 to 40 pounds).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-elec-yellow mt-0.5 shrink-0" />
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
        <div className="-mx-4 my-4 border-y border-green-500/20 bg-green-500/10 p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher pay</strong> — Technician grade commands the highest JIB rate. At the
                2026 minimums that is £4.32 an hour above the Electrician rate, roughly £7,450 a
                year over 46 paid working weeks.
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
        <div className="-mx-4 my-4 border-y border-white/[0.14] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6 bg-white/[0.04]">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-elec-yellow mt-0.5 shrink-0" />
              <span>
                <strong>Outdated 2382:</strong> If your 2382 was based on the 17th Edition or
                earlier, you need a current one before applying. The same applies to earlier 18th
                Edition versions — BS 7671:2018 has been amended four times (A1:2020, A2:2022,
                A3:2024, A4:2026), and the current consolidated edition is{' '}
                <strong>BS 7671:2018+A4:2026</strong>. The A2 + Corrigendum + A3 edition is
                withdrawn on 15 October 2026, so if your certificate covers only Amendment 1, 2 or
                3, check with the JIB whether an update is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-elec-yellow mt-0.5 shrink-0" />
              <span>
                <strong>Missing health and safety test:</strong> The ECS Health, Safety and
                Environmental Assessment is required even if you hold SSSTS or SMSTS. Check with the
                JIB whether your existing safety qualification is accepted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-elec-yellow mt-0.5 shrink-0" />
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
        <div className="-mx-4 my-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
          <h3 className="mb-3 text-base font-semibold tracking-tight text-white">
            Key A4:2026 changes Gold Card holders need to know
          </h3>
          <ul className="space-y-3 text-sm text-white">
            <li>
              <strong>AFDDs are no longer just a recommendation (Reg 421.1.7).</strong> Arc fault
              detection devices to BS EN 62606 <em>shall</em> be provided for single-phase AC final
              circuits supplying socket-outlets rated up to 32 A in high rise residential buildings,
              houses in multiple occupation, purpose-built student accommodation and care homes. In
              all other premises they remain recommended for the same circuits. Where used, they go
              at the origin of the circuit protected (Reg 532.6), and the periodic inspection
              schedule asks for confirmation that AFDD indication shows the devices are operational
              (Regs 421.1.7, 532.6, 651.2(e)).
            </li>
            <li>
              <strong>Insulation resistance gained a second stage (Reg 643.3.3).</strong> Where
              connected equipment would influence or be damaged by the test, test to Table 64 before
              connecting it — then, once connected, apply a 250 V DC test between live conductors
              and the protective conductor, with a minimum of 1 M&Omega;.
            </li>
            <li>
              <strong>Consolidated edition.</strong> A4:2026 was issued on 15 April 2026 and may be
              implemented immediately. The A2:2022 + Corrigendum + A3:2024 edition remains current
              but is withdrawn on 15 October 2026 — after that date, assessment, certification and
              design work references BS 7671:2018+A4:2026.
            </li>
          </ul>
        </div>
        <div className="-mx-4 my-4 border-y border-white/[0.14] bg-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
          <p className="text-sm italic text-white">
            "Competence [for inspection and testing] is best shown by holding recognised inspection
            and testing qualifications and a current level 3 BS 7671 certificate."
          </p>
          <p className="mt-2 text-xs text-white">
            — GN3 (9th Edition, aligned to BS 7671:2018+A4:2026), Chapter 1, Section 1.1
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
      title="ECS Gold Card Requirements: How to Apply 2026"
      description="ECS Gold Card for UK electricians 2026: NVQ Level 3 + AM2 + 18th Edition + ECS H&S, application steps, cost, renewal cycle, what it unlocks on site."
      datePublished="2026-03-27"
      dateModified="2026-06-10"
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
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate for training, exam preparation, and career development. 7-day free trial, cancel anytime."
    />
  );
}
