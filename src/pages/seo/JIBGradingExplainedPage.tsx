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
  PoundSterling,
  ArrowUpRight,
  FileCheck2,
  BookOpen,
  Target,
  Users,
  Briefcase,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-training-courses-uk' },
  { label: 'JIB Grading', href: '/guides/jib-grading-explained' },
];

const tocItems = [
  { id: 'overview', label: 'What Is the JIB?' },
  { id: 'grade-structure', label: 'JIB Grade Structure' },
  { id: 'pay-rates', label: 'Pay Rates by Grade' },
  { id: 'progression', label: 'Progression Pathway' },
  { id: 'how-to-apply', label: 'How to Apply for Grading' },
  { id: 'benefits', label: 'Benefits of JIB Grading' },
  { id: 'for-employers', label: 'For Employers' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The JIB (Joint Industry Board for the Electrical Contracting Industry) sets the standard grading and pay structure for electricians in the UK. JIB grades link directly to ECS card types and determine minimum pay rates on JIB-graded contracts.',
  'The main grades are: Electrical Labourer, Electrician (Installation or Maintenance), Approved Electrician, and Technician. Each grade requires progressively higher qualifications and experience.',
  'JIB pay rates are updated annually (usually in January). The 2026 Electrician rate is approximately 18.21 pounds per hour, with Approved Electricians and Technicians earning more. London weighting adds approximately 1.67 pounds per hour.',
  'Progression from Electrician to Approved Electrician to Technician requires additional qualifications — inspection and testing (2391), design (2396), and relevant experience. Each step up increases your earning potential.',
  'JIB grading is not mandatory, but it is the industry standard. Most major electrical contractors operate under JIB terms, and many clients specify JIB-graded electricians in their contracts.',
];

const faqs = [
  {
    question: 'What is the current JIB electrician pay rate?',
    answer:
      'The 2026 JIB national standard rate for an Electrician is approximately 18.21 pounds per hour (this is the base rate and is updated annually, usually in January). London-weighted rates are higher — approximately 19.88 pounds per hour. Approved Electricians earn more (approximately 19.67 per hour nationally, 21.34 in London), and Technicians earn the highest standard rate (approximately 21.13 per hour nationally, 22.80 in London). These rates are minimums — many employers pay above JIB rates, especially for specialist work or overtime.',
  },
  {
    question: 'Do all electrical employers have to pay JIB rates?',
    answer:
      'No. JIB rates are not legally binding — they are agreed rates between the JIB (which represents both the electrical contracting employers association and the Unite trade union). Employers who are members of the ECA (Electrical Contractors Association) or who operate under JIB terms agree to pay at least the JIB rates. However, many smaller employers and non-JIB companies set their own pay rates, which may be higher or lower than JIB rates. On major construction projects, the main contractor often specifies that electrical subcontractors must operate under JIB terms.',
  },
  {
    question: 'What is the difference between an Electrician and an Approved Electrician?',
    answer:
      'An Electrician (JIB grade) holds the standard qualifications: NVQ Level 3, C&G 2382 (18th Edition), and AM2. An Approved Electrician holds additional qualifications — typically C&G 2391 (Inspection and Testing) — which means they can inspect and test installations and issue EICRs (Electrical Installation Condition Reports). The Approved Electrician grade is the minimum grade usually required for an electrician to sign off their own work on site. The pay rate for an Approved Electrician is approximately 1.50 pounds per hour more than a standard Electrician.',
  },
  {
    question: 'How do I move from Electrician grade to Approved Electrician?',
    answer:
      'To move from Electrician to Approved Electrician, you need to pass the C&G 2391 (Inspection and Testing) qualification. Once you have the 2391 certificate, apply to the JIB for regrading. You will need to provide your 2391 certificate and your existing ECS card details. The JIB will verify your qualifications and issue an updated ECS card reflecting your new grade. The whole process typically takes 2 to 4 weeks from application.',
  },
  {
    question: 'What qualifications do I need for JIB Technician grade?',
    answer:
      'The Technician grade requires the qualifications for Approved Electrician (NVQ Level 3, C&G 2382, AM2, C&G 2391) PLUS a design qualification — typically the C&G 2396 (Electrical Installation Design). Some Technician applications may also accept a Level 4 qualification or HNC in Electrical Installation. The Technician grade recognises electricians who can design, install, inspect, and test — the full range of electrical competence. It corresponds to the ECS Gold Card.',
  },
  {
    question: 'Is JIB grading the same as ECS card types?',
    answer:
      'JIB grades and ECS card types are closely linked but not identical. The ECS card is the physical card that proves your qualifications. The JIB grade determines your pay rate and employment terms. In practice, the Installation Electrician ECS card (blue) corresponds to JIB Electrician grade. The Gold Card corresponds to JIB Technician or Approved Electrician grade (depending on qualifications). When you apply for an ECS card, the JIB assigns your grade based on your qualifications.',
  },
  {
    question: 'What benefits do JIB-graded employees get besides pay rates?',
    answer:
      'JIB terms include more than just pay rates. They cover annual leave entitlement (typically 21 days plus bank holidays), sick pay, travel time and fare allowances, tool and clothing allowances, death-in-service benefit, and the JIB pension scheme. The exact benefits depend on the employer JIB agreement and grade level. These benefits make JIB terms attractive compared to non-JIB employment, especially the pension scheme and death-in-service benefit.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ecs-card-types-explained',
    title: 'ECS Card Types Explained',
    description: 'Detailed breakdown of every ECS card type and the qualifications needed.',
    icon: CreditCard,
    category: 'Guide',
  },
  {
    href: '/guides/gold-card-requirements-electrician',
    title: 'Gold Card Requirements',
    description:
      'The qualifications needed for the ECS Gold Card — the Technician grade equivalent.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2382-exam-guide',
    title: 'C&G 2382 Exam Guide',
    description: 'The 18th Edition exam — required for all JIB electrician grades.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2396-design-course',
    title: 'C&G 2396 Design Course',
    description: 'The design qualification needed for Technician grade and Gold Card.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'The C&G 2391 — required for Approved Electrician grade.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/competent-person-scheme-guide',
    title: 'Competent Person Schemes',
    description: 'NICEIC, NAPIT, ELECSA — self-certification for qualified electricians.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What Is the JIB?',
    content: (
      <>
        <p>
          The JIB (Joint Industry Board for the Electrical Contracting Industry) is the body that
          sets the standard terms and conditions for electricians in the UK. It was established
          jointly by the ECA (Electrical Contractors' Association — representing employers) and
          Unite the Union (representing electricians).
        </p>
        <p>
          The JIB does several things: it manages the{' '}
          <SEOInternalLink href="/guides/ecs-card-types-explained">ECS card scheme</SEOInternalLink>
          , sets national pay rates by grade, defines employment terms and conditions, and provides
          a welfare benefits scheme for JIB-graded electricians. For many electricians, the JIB
          grade they hold determines their career trajectory, their pay, and the projects they can
          work on.
        </p>
        <p>
          While JIB grading is not mandatory, it is the de facto industry standard. Major electrical
          contractors operate under JIB terms, and clients on large projects frequently specify that
          the electrical contractor must employ JIB-graded electricians.
        </p>
      </>
    ),
  },
  {
    id: 'grade-structure',
    heading: 'JIB Grade Structure',
    content: (
      <>
        <p>
          The JIB grade structure reflects the progression from trainee to fully qualified
          electrician with additional specialisms:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-white mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Electrical Labourer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Entry-level grade for electrical workers who are not yet qualified. Assists
                  qualified electricians on site. No formal electrical qualifications required
                  beyond health and safety.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Electrician (Installation or Maintenance)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The standard qualified electrician grade. Requires NVQ Level 3, C&G 2382 (18th
                  Edition), and the AM2 assessment. Can work unsupervised on installation or
                  maintenance work. Corresponds to the ECS blue card.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Approved Electrician</h4>
                <p className="text-white text-sm leading-relaxed">
                  Electrician plus C&G 2391 (Inspection and Testing). Can inspect and test
                  installations and issue EICRs. This is the minimum grade for signing off work on
                  most JIB sites.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Technician</h4>
                <p className="text-white text-sm leading-relaxed">
                  The highest standard JIB grade. Requires all Approved Electrician qualifications
                  plus a design qualification (C&G 2396 or equivalent). Can design, install,
                  inspect, and test. Corresponds to the ECS Gold Card. Highest standard pay rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pay-rates',
    heading: 'Pay Rates by Grade (2026)',
    content: (
      <>
        <p>
          JIB pay rates are updated annually, typically in January. Here are the approximate 2026
          national standard rates and London-weighted rates:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.04]">
              <span className="text-white font-medium">Electrical Labourer</span>
              <span className="text-white">~13.50/hr (national) | ~15.17/hr (London)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
              <span className="text-white font-medium">Electrician</span>
              <span className="text-white">~18.21/hr (national) | ~19.88/hr (London)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
              <span className="text-white font-medium">Approved Electrician</span>
              <span className="text-white">~19.67/hr (national) | ~21.34/hr (London)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
              <span className="text-white font-medium">Technician</span>
              <span className="text-white">~21.13/hr (national) | ~22.80/hr (London)</span>
            </div>
          </div>
        </div>
        <p>
          These are minimum rates — many employers pay above JIB standard, especially for specialist
          work, overtime, or in regions where electricians are in high demand. Self-employed
          electricians typically charge higher day rates, but do not receive JIB benefits (pension,
          sick pay, travel allowances).
        </p>
        <p>
          The difference between Electrician and Technician grade is approximately 2.92 pounds per
          hour nationally. Over a standard 37.5-hour week, that is 109.50 pounds more per week, or
          roughly 5,694 pounds more per year. The investment in additional qualifications pays for
          itself many times over.
        </p>
      </>
    ),
  },
  {
    id: 'progression',
    heading: 'Progression Pathway',
    content: (
      <>
        <p>Here is the typical career progression through JIB grades:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprentice to Electrician (3 to 4 years):</strong> Complete your
                apprenticeship, pass the NVQ Level 3, take the{' '}
                <SEOInternalLink href="/guides/city-guilds-2382-exam-guide">
                  C&G 2382
                </SEOInternalLink>
                , and pass the{' '}
                <SEOInternalLink href="/guides/am2-exam-tips">AM2 assessment</SEOInternalLink>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician to Approved Electrician (1 to 2 years):</strong> Take and pass
                the C&G 2391 (Inspection and Testing). Gain experience in inspection and testing
                work. Apply for regrading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Electrician to Technician (1 to 2 years):</strong> Take and pass
                the{' '}
                <SEOInternalLink href="/guides/city-guilds-2396-design-course">
                  C&G 2396
                </SEOInternalLink>{' '}
                (Electrical Design). Gain experience in design work. Apply for regrading and the{' '}
                <SEOInternalLink href="/guides/gold-card-requirements-electrician">
                  Gold Card
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
        <p>
          From Technician, the progression routes are typically into supervision (site supervisor,
          contracts manager), design and consulting, or running your own business. Each step
          increases your earning potential and the range of work you can take on.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-apply',
    heading: 'How to Apply for JIB Grading',
    content: (
      <>
        <p>
          JIB grading is managed through the ECS card application process. When you apply for or
          renew your ECS card, the JIB assesses your qualifications and assigns your grade.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New applicants:</strong> Apply for your ECS card through the JIB website.
                Submit your qualification certificates. The JIB will verify them and assign the
                appropriate grade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regrading:</strong> If you have gained additional qualifications (for
                example, passing the 2391 to move from Electrician to Approved Electrician), apply
                for regrading through the JIB. Submit your new certificates and your existing ECS
                card details.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Processing time:</strong> Typically 2 to 4 weeks from application to
                receiving your new or updated ECS card.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'benefits',
    heading: 'Benefits of JIB Grading',
    content: (
      <>
        <p>JIB grading provides more than just a pay rate:</p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Guaranteed minimum pay</strong> — your employer must pay at least the JIB
                rate for your grade. This protects against underpayment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual leave</strong> — 21 days plus bank holidays under JIB terms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pension scheme</strong> — the JIB pension scheme provides employer
                contributions on top of your pay.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Travel and tool allowances</strong> — JIB terms include provisions for
                travel time, travel fares, and tool maintenance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Death-in-service benefit</strong> — financial protection for your family.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-employers',
    heading: 'For Employers',
    content: (
      <>
        <p>
          If you are an electrical contractor, operating under JIB terms has several advantages: it
          helps you recruit and retain quality electricians (who prefer JIB terms), it demonstrates
          professionalism to clients (many specify JIB compliance in contracts), and it provides a
          clear framework for pay and progression that reduces disputes.
        </p>
        <SEOAppBridge
          title="Manage your team with Elec-Mate"
          description="Track your team's qualifications, ECS card expiry dates, and training needs. Elec-Mate helps electrical contractors stay compliant and plan upskilling for their workforce."
          icon={Users}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function JIBGradingExplainedPage() {
  return (
    <GuideTemplate
      title="JIB Grading Explained | Electrician Pay Rates & Grades UK 2026"
      description="Complete guide to JIB grading for UK electricians. ECS grades, 2026 pay rates by grade, progression pathway from Electrician to Technician, how to apply, and benefits of JIB grading."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={TrendingUp}
      heroTitle={
        <>
          JIB Grading Explained:{' '}
          <span className="text-yellow-400">Pay Rates, Grades, and Progression</span>
        </>
      }
      heroSubtitle="Understand JIB grades, 2026 pay rates, and how to progress from Electrician to Approved Electrician to Technician. Your roadmap to higher earnings and career growth."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About JIB Grading"
      relatedPages={relatedPages}
      ctaHeading="Progress Your Electrical Career With Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for training, qualification tracking, and career development. 7-day free trial, cancel anytime."
    />
  );
}
