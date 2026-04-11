import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  HardHat,
  CheckCircle2,
  Award,
  PoundSterling,
  Clock,
  FileCheck2,
  BookOpen,
  Target,
  ShieldCheck,
  CreditCard,
  AlertTriangle,
  Users,
  RefreshCw,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-training-courses-uk' },
  { label: 'SSSTS & SMSTS Guide', href: '/guides/sssts-smsts-site-supervisor-guide' },
];

const tocItems = [
  { id: 'overview', label: 'What Are SSSTS and SMSTS?' },
  { id: 'sssts', label: 'SSSTS — Site Supervisor' },
  { id: 'smsts', label: 'SMSTS — Site Manager' },
  { id: 'differences', label: 'SSSTS vs SMSTS Comparison' },
  { id: 'who-needs', label: 'Who Needs Which?' },
  { id: 'course-content', label: 'What the Courses Cover' },
  { id: 'costs', label: 'Costs and Duration' },
  { id: 'renewal', label: 'Renewal and Refresher Courses' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'SSSTS (Site Supervisors Safety Training Scheme) is a 2-day course for site supervisors and foremen. SMSTS (Site Management Safety Training Scheme) is a 5-day course for site managers and project managers. Both are run by CITB (Construction Industry Training Board).',
  'SSSTS is for anyone who supervises work on site — electricians who run small teams, foremen, and charge hands. SMSTS is for those with management responsibility for health and safety on site.',
  'Most major construction sites require at least one person with SMSTS on site at all times. Many main contractors require electricians in supervisory roles to hold SSSTS as a minimum.',
  'Both certificates are valid for 5 years. Renewal requires a shorter refresher course — 1 day for SSSTS-R and 2 days for SMSTS-R. Do not let your certificate lapse.',
  'The courses cover health and safety law, risk assessment, method statements, CDM Regulations, working at height, manual handling, and site-specific hazards. They are practical courses, not academic — focused on real-world site management.',
];

const faqs = [
  {
    question: 'What is the difference between SSSTS and SMSTS?',
    answer:
      'SSSTS (Site Supervisors Safety Training Scheme) is a 2-day course aimed at site supervisors and foremen — people who directly supervise work on site. SMSTS (Site Management Safety Training Scheme) is a 5-day course aimed at site managers and project managers — people with overall management responsibility for health and safety on a construction site. SMSTS goes deeper into health and safety law, CDM Regulations, and management responsibilities. If you supervise a small team, SSSTS is usually sufficient. If you manage projects or have overall site responsibility, you need SMSTS.',
  },
  {
    question: 'Do I need SSSTS or SMSTS as an electrician?',
    answer:
      'If you work on major construction sites, you will likely need one or the other. Main contractors increasingly require supervisors to hold SSSTS and managers to hold SMSTS. If you are a sole trader doing domestic work, you probably do not need either — but having SSSTS shows you take health and safety seriously and can help you win work on commercial sites. If you run a team or manage electrical projects on construction sites, SMSTS is the one to get.',
  },
  {
    question: 'How much does SSSTS cost?',
    answer:
      'SSSTS costs between 200 and 400 pounds depending on the training provider and location. The course runs over 2 days (usually consecutive). Some providers offer weekend courses for people who cannot take weekdays off work. The SSSTS refresher (SSSTS-R) for renewal typically costs 150 to 250 pounds and runs over 1 day. CITB-registered employers may be able to claim a grant towards the cost through the CITB levy scheme.',
  },
  {
    question: 'How much does SMSTS cost?',
    answer:
      'SMSTS costs between 400 and 700 pounds depending on the training provider and location. The course runs over 5 days (usually one full working week, Monday to Friday). The SMSTS refresher (SMSTS-R) for renewal typically costs 250 to 400 pounds and runs over 2 days. Again, CITB-registered employers may be eligible for grant funding. Given the SMSTS is a week-long course, factor in the cost of time off work as well.',
  },
  {
    question: 'How long are SSSTS and SMSTS certificates valid?',
    answer:
      'Both SSSTS and SMSTS certificates are valid for 5 years from the date of completion. To renew, you must complete a refresher course (SSSTS-R or SMSTS-R) before your certificate expires. If you let your certificate lapse, you cannot take the refresher — you must complete the full course again. Set a reminder at least 3 months before expiry to book your refresher.',
  },
  {
    question: 'Can I do SSSTS or SMSTS online?',
    answer:
      'Yes. Since the COVID-19 pandemic, CITB-approved training providers have been able to deliver SSSTS and SMSTS as virtual classroom courses (live online sessions with a tutor). The content and assessment are the same as the face-to-face courses. You need a computer with a webcam and microphone, and a stable internet connection. Some people prefer the classroom environment for networking and interaction, but the online option is convenient if you cannot attend in person.',
  },
  {
    question: 'Is SSSTS the same as a CSCS card?',
    answer:
      'No — they are different things. SSSTS is a health and safety training certificate. The CSCS card (or ECS card for electricians) is a skills and qualifications card that proves your trade competence. However, holding SSSTS or SMSTS can contribute to your CSCS/ECS card application. Some CSCS card types (such as the Supervisor card) require SSSTS or equivalent. The two are complementary — the SSSTS/SMSTS proves your health and safety competence, and the ECS card proves your electrical competence.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ecs-card-types-explained',
    title: 'ECS Card Types',
    description: 'How SSSTS/SMSTS relates to your ECS card and site access.',
    icon: CreditCard,
    category: 'Guide',
  },
  {
    href: '/guides/cscs-vs-ecs-card-comparison',
    title: 'CSCS vs ECS Card',
    description: 'Which card you need for site access alongside your SSSTS/SMSTS.',
    icon: CreditCard,
    category: 'Guide',
  },
  {
    href: '/guides/gold-card-requirements-electrician',
    title: 'Gold Card Requirements',
    description: 'Career progression for electricians in supervisory roles.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/competent-person-scheme-guide',
    title: 'Competent Person Schemes',
    description: 'NICEIC, NAPIT, ELECSA — self-certification for qualified electricians.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/jib-grading-explained',
    title: 'JIB Grading',
    description: 'How supervisor and management qualifications affect your JIB grade.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing',
    description: 'The C&G 2391 — another key qualification for site supervisors.',
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
    heading: 'What Are SSSTS and SMSTS?',
    content: (
      <>
        <p>
          SSSTS (Site Supervisors' Safety Training Scheme) and SMSTS (Site Management Safety
          Training Scheme) are health and safety qualifications run by CITB (Construction Industry
          Training Board). They are the industry-standard site safety qualifications for anyone in a
          supervisory or management role on a UK construction site.
        </p>
        <p>
          For electricians, these qualifications become relevant when you step beyond hands-on
          installation work into supervision, project management, or running your own team. Most
          major construction sites require anyone in a supervisory role to hold at least SSSTS, and
          site managers to hold SMSTS.
        </p>
        <p>
          These are not electrical qualifications — they cover general construction health and
          safety. But they are essential for electricians who work on or manage projects on
          construction sites.
        </p>
      </>
    ),
  },
  {
    id: 'sssts',
    heading: "SSSTS — Site Supervisors' Safety Training Scheme",
    content: (
      <>
        <p>
          SSSTS is designed for people who have, or are about to take on, supervisory
          responsibilities on a construction site. For electricians, this typically means:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Electricians who supervise one or more other workers on site</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Foremen and charge hands on electrical contracts</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Self-employed electricians who manage subcontractors</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Apprentices moving into their first supervisory role</span>
            </li>
          </ul>
        </div>
        <p>
          The course runs over 2 days and is assessed through a mix of group exercises, case
          studies, and a short written assessment. There is no formal exam — the assessment is
          continuous throughout the course. Most people who attend and participate pass.
        </p>
      </>
    ),
  },
  {
    id: 'smsts',
    heading: 'SMSTS — Site Management Safety Training Scheme',
    content: (
      <>
        <p>
          SMSTS is the higher-level qualification for people with management responsibility for
          health and safety on a construction site. For electricians, this means:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Project managers running electrical contracts</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Business owners managing teams of electricians</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Contracts managers with overall site safety responsibility</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Anyone named as Principal Contractor under CDM Regulations</span>
            </li>
          </ul>
        </div>
        <p>
          The course runs over 5 days (usually one full week) and goes deeper than SSSTS into health
          and safety legislation, CDM (Construction Design and Management) Regulations, risk
          management, and management responsibilities. Assessment is through group exercises, case
          studies, and a written assessment on the final day.
        </p>
      </>
    ),
  },
  {
    id: 'differences',
    heading: 'SSSTS vs SMSTS: Side-by-Side Comparison',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">SSSTS</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>2-day course</li>
              <li>For site supervisors and foremen</li>
              <li>Cost: 200-400 pounds</li>
              <li>Refresher: 1 day (SSSTS-R)</li>
              <li>Valid for 5 years</li>
              <li>Covers supervisor-level H&S duties</li>
              <li>Group exercises and continuous assessment</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">SMSTS</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>5-day course</li>
              <li>For site managers and project managers</li>
              <li>Cost: 400-700 pounds</li>
              <li>Refresher: 2 days (SMSTS-R)</li>
              <li>Valid for 5 years</li>
              <li>Covers management-level H&S duties and CDM</li>
              <li>Written assessment on final day</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'who-needs',
    heading: 'Who Needs Which?',
    content: (
      <>
        <p>Here is a practical guide:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sole trader doing domestic work:</strong> Neither is strictly required, but
                SSSTS is useful if you ever work on sites managed by a main contractor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician working on commercial sites:</strong> SSSTS if you supervise
                anyone (including apprentices). Not required if you are working under someone else's
                supervision, but increasingly expected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Running a small team (2 to 5 people):</strong> SSSTS as a minimum. SMSTS if
                you are the principal contractor on projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Managing projects or running a larger business:</strong> SMSTS. This is
                expected by clients, main contractors, and your insurers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'course-content',
    heading: 'What the Courses Cover',
    content: (
      <>
        <p>Both courses cover health and safety topics relevant to construction sites:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Health and Safety Law</h4>
                <p className="text-white text-sm leading-relaxed">
                  Health and Safety at Work Act 1974, Management of Health and Safety at Work
                  Regulations, and how they apply to construction. Your duties as a supervisor or
                  manager. Enforcement and penalties.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Risk Assessment and Method Statements</h4>
                <p className="text-white text-sm leading-relaxed">
                  How to carry out risk assessments, write method statements (RAMS), and implement
                  safe systems of work. Practical exercises in identifying hazards and determining
                  control measures.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <HardHat className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  CDM Regulations (SMSTS only — in depth)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Construction (Design and Management) Regulations 2015. Roles and responsibilities
                  of client, principal designer, principal contractor, contractors, and workers.
                  Construction phase plans and health and safety files.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Site-Specific Hazards</h4>
                <p className="text-white text-sm leading-relaxed">
                  Working at height, confined spaces, manual handling, asbestos, noise, vibration,
                  fire safety, and electrical safety (from a management perspective). How to manage
                  these risks on a live construction site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Costs and Duration',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
              <span className="text-white font-medium">SSSTS (full course)</span>
              <span className="text-white">2 days | 200-400 pounds</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
              <span className="text-white font-medium">SSSTS-R (refresher)</span>
              <span className="text-white">1 day | 150-250 pounds</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
              <span className="text-white font-medium">SMSTS (full course)</span>
              <span className="text-white">5 days | 400-700 pounds</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
              <span className="text-white font-medium">SMSTS-R (refresher)</span>
              <span className="text-white">2 days | 250-400 pounds</span>
            </div>
          </div>
        </div>
        <p>
          CITB-registered employers may be eligible for grant funding that covers a significant
          portion of the course cost. Check with CITB or your training provider about grant
          eligibility. The courses are also tax-deductible as a business expense for self-employed
          electricians.
        </p>
      </>
    ),
  },
  {
    id: 'renewal',
    heading: 'Renewal and Refresher Courses',
    content: (
      <>
        <p>
          Both SSSTS and SMSTS certificates are valid for 5 years. To renew, you must complete a
          refresher course before your certificate expires:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SSSTS-R:</strong> 1-day refresher course. Covers updates to health and
                safety legislation and refreshes the core content. Book at least 3 months before
                your certificate expires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SMSTS-R:</strong> 2-day refresher course. Covers legislative updates and
                revisits CDM Regulations and management responsibilities. Book at least 3 months
                before expiry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>If you let it lapse:</strong> If your certificate expires before you
                complete the refresher, you cannot take the refresher — you must complete the full
                course again (2 days for SSSTS, 5 days for SMSTS). Do not let this happen.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Manage Site Safety Professionally',
    content: (
      <>
        <p>
          Whether you hold SSSTS or SMSTS, you need professional tools to manage health and safety
          documentation on site.
        </p>
        <SEOAppBridge
          title="Health and safety documentation on your phone"
          description="Elec-Mate's AI health and safety tools help you create risk assessments, method statements, and site safety documentation. Professional RAMS generated in minutes, not hours."
          icon={HardHat}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SSSMTSGuidePage() {
  return (
    <GuideTemplate
      title="SSSTS vs SMSTS Guide | Site Supervisor Training for Electricians UK"
      description="Complete guide to SSSTS and SMSTS for UK electricians. Course content, costs, who needs which, renewal process, and how site safety qualifications boost your career. Updated 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Training Guide"
      badgeIcon={HardHat}
      heroTitle={
        <>
          SSSTS vs SMSTS:{' '}
          <span className="text-yellow-400">Site Safety Training for Electricians</span>
        </>
      }
      heroSubtitle="SSSTS and SMSTS are the industry-standard site safety qualifications. This guide covers which one you need, what the courses cover, costs, renewal, and how they fit into your electrical career."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About SSSTS and SMSTS"
      relatedPages={relatedPages}
      ctaHeading="Professional Site Safety Documentation"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for risk assessments, method statements, and site safety management. 7-day free trial, cancel anytime."
    />
  );
}
