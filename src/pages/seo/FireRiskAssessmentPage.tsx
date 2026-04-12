import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Flame,
  Shield,
  ClipboardCheck,
  FileCheck2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

const PAGE_PATH = '/guides/fire-risk-assessment';

const breadcrumbs = [
  { label: 'Safety', href: '/guides/risk-assessment-electricians' },
  { label: 'Fire Risk Assessment', href: PAGE_PATH },
];

const tocItems = [
  { id: 'what-is-fire-risk-assessment', label: 'What Is a Fire Risk Assessment?' },
  { id: 'where-electricians-fit', label: 'Where Electricians Fit In' },
  { id: 'electrical-fire-hazards', label: 'Electrical Fire Hazards' },
  { id: 'documentation-actions', label: 'Documentation and Actions' },
  { id: 'improving-fire-safety', label: 'Improving Fire Safety' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A fire risk assessment identifies sources of ignition, fuel, and people at risk, then records the controls needed to reduce the chance of fire and help safe escape.',
  'Electricians are often not the person legally responsible for the whole fire risk assessment, but they are frequently responsible for the electrical findings and remedial actions flowing from it.',
  'Electrical defects such as overloaded circuits, damaged accessories, poor containment, missing emergency lighting, and non-compliant fire alarm interfaces are common assessment findings.',
  'A good fire risk assessment should lead directly to clear actions: inspection, testing, remedial work, emergency lighting upgrades, fire alarm corrections, and documented sign-off.',
  'Elec-Mate helps turn fire safety findings into practical action with certificates, quoting, RAMS, snagging, and on-site documentation in one workflow.',
];

const sections = [
  {
    id: 'what-is-fire-risk-assessment',
    heading: 'What Is a Fire Risk Assessment?',
    content: (
      <>
        <p>
          A fire risk assessment is a structured review of a building, its activities, and the
          people using it to identify how a fire could start, how it could spread, and whether
          people can escape safely. In the UK, the assessment is a core requirement under fire
          safety legislation for non-domestic premises and communal areas of many residential
          buildings.
        </p>
        <p>
          The assessment looks at three practical questions: what could ignite, what could burn,
          and who is at risk if a fire starts? It then records existing precautions and sets out
          further actions needed. For electricians, that often means checking the installation is
          not contributing to ignition risk and that life safety systems such as emergency lighting
          and fire alarms are properly installed, maintained, and documented.
        </p>
        <p>
          If you already produce general{' '}
          <SEOInternalLink href="/guides/risk-assessment-electricians">risk assessments</SEOInternalLink>{' '}
          for electrical work, think of a fire risk assessment as the fire-specific layer focused on
          ignition sources, escape routes, alarm/lighting provision, and ongoing maintenance.
        </p>
      </>
    ),
  },
  {
    id: 'where-electricians-fit',
    heading: 'Where Electricians Fit In',
    content: (
      <>
        <p>
          The responsible person, landlord, facilities manager, or fire consultant may own the
          overall assessment, but electricians are often the people who turn fire-risk findings into
          real actions on site. That can include verifying distribution boards, correcting damaged
          accessories, improving containment, upgrading emergency lighting, or evidencing that
          inspection and testing has been carried out.
        </p>
        <p>
          In practice, many fire risk assessments flag electrical actions such as "repair damaged
          socket front in escape route", "provide emergency lighting at final exit", or "test fire
          alarm interface to access control system". Those actions still need a competent person to
          inspect, rectify, certify, and report them properly.
        </p>
        <p>
          This is where clear documentation matters. If remedial work follows a fire risk
          assessment, use the right certificate, record limitations, and keep the inspection,
          testing, and remedial trail together so the client can show the issue was genuinely
          addressed.
        </p>
      </>
    ),
  },
  {
    id: 'electrical-fire-hazards',
    heading: 'Common Electrical Fire Hazards Found on Assessments',
    content: (
      <>
        <p>
          Electrical findings on fire risk assessments usually come down to ignition, spread, and
          escape. The goal is not just compliance language; it is reducing the chance that the
          electrical installation starts a fire or makes escape harder.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged accessories and overheating connections</strong> in escape routes,
                plant rooms, kitchens, and high-use communal areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded circuits and poor temporary supplies</strong> where extension
                leads or adaptors are being used instead of proper installation work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or defective emergency lighting</strong> on escape routes, stair
                cores, final exits, and high-risk areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm, door release, and access control interfaces</strong> that do not
                fail safe or are poorly maintained.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor containment and unsealed penetrations</strong> that can contribute to
                fire spread even where the electrical work itself still functions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When those issues are found, the follow-on work often crosses several Elec-Mate flows:
          snagging, quoting, test results, and certificates. For emergency-lighting-specific work,
          see the{' '}
          <SEOInternalLink href="/emergency-lighting-installation">
            emergency lighting installation guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'documentation-actions',
    heading: 'Documentation, Responsibility, and Follow-Up Actions',
    content: (
      <>
        <p>
          A fire risk assessment is only useful if the resulting actions are clear and traceable.
          Clients should be able to see what the issue was, what work was carried out, what remains
          outstanding, and what evidence supports the decision.
        </p>
        <p>
          For electricians, that usually means separating three things:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>The original fire-risk finding</strong> from the assessment or action list.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>The electrical remedial work</strong> actually completed and any testing
                carried out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>The sign-off position</strong> including who reviewed it, what limitations
                remain, and whether other contractors still need to complete fire-stopping or
                building works.
              </span>
            </li>
          </ul>
        </div>
        <p>
          That traceability is especially useful on commercial sites and communal properties where
          multiple contractors may be involved and the responsible person needs a clean audit trail.
        </p>
      </>
    ),
  },
  {
    id: 'improving-fire-safety',
    heading: 'How Electricians Can Improve Fire Safety Without Turning It Into Paperwork',
    content: (
      <>
        <p>
          The strongest electrical contractors treat fire-safety work as a workflow, not a pile of
          disconnected documents. Survey the issue, create the job, raise snags, quote the remedial
          work, complete the testing, and issue the right certificate while the details are still
          fresh.
        </p>
        <p>
          That is where software helps. Instead of a fire-risk action list sitting in an email for
          weeks, you can turn it into assigned tasks, evidence photos, certificates, and client
          updates. That improves response times, reduces missed actions, and gives the client more
          confidence that the findings have been dealt with properly.
        </p>
        <p>
          For higher-risk sites, pair the assessment workflow with{' '}
          <SEOInternalLink href="/guides/construction-site-safety">
            construction site safety
          </SEOInternalLink>{' '}
          controls and the correct{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation procedure</SEOInternalLink>{' '}
          before any electrical remedials start.
        </p>
      </>
    ),
  },
];

const howToSteps = [
  {
    name: 'Review the fire-risk action list',
    text: 'Identify which findings are genuinely electrical and which are building, management, or fire-stopping issues owned by someone else.',
  },
  {
    name: 'Inspect and verify on site',
    text: 'Check the live condition of the installation, escape-route lighting, accessories, containment, and any alarm/control interfaces before quoting remedial work.',
  },
  {
    name: 'Document the exact defect',
    text: 'Capture photos, location notes, and test data so the client can see exactly what was found and what needs to change.',
  },
  {
    name: 'Quote and complete the remedial work',
    text: 'Price the action properly, carry out the remedial work, and record any limitations or dependent actions that still sit with other trades.',
  },
  {
    name: 'Issue the right evidence',
    text: 'Provide the certificate, snag completion evidence, or follow-up notes needed so the responsible person can update the fire-risk record confidently.',
  },
];

const faqs = [
  {
    question: 'Is a fire risk assessment the same as an electrical risk assessment?',
    answer:
      'No. A fire risk assessment focuses on ignition sources, fire spread, warning systems, escape, and people at risk in the building. An electrical risk assessment focuses on electrical hazards associated with carrying out the work itself. The two overlap, but they are not the same document.',
  },
  {
    question: 'Do electricians carry out the whole fire risk assessment?',
    answer:
      'Sometimes, but not usually. The responsible person often appoints a fire consultant or competent assessor to complete the overall assessment. Electricians are more commonly involved in the electrical findings, remedial works, emergency lighting, alarm interfaces, and evidence of compliance.',
  },
  {
    question: 'What electrical items are usually checked in a fire risk assessment?',
    answer:
      'Typical checks include damaged accessories, overloaded circuits, temporary wiring, distribution board condition, escape-route emergency lighting, fire alarm interfaces, isolation arrangements, and whether electrical faults could contribute to ignition or unsafe escape.',
  },
  {
    question: 'Does a fire risk assessment replace an EICR?',
    answer:
      'No. A fire risk assessment may recommend inspection and testing, but it does not replace an EICR. The EICR is the electrical condition report for the fixed installation. The fire risk assessment is a broader fire-safety document.',
  },
  {
    question: 'How can Elec-Mate help with fire-safety actions?',
    answer:
      'Elec-Mate helps electricians turn fire-risk findings into practical work: raise snags, quote remedials, complete certificates, capture evidence, and keep the action trail together for the client and responsible person.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment for Electricians',
    description: 'General electrical risk assessment process, legal duties, and site-specific checks.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/emergency-lighting-installation',
    title: 'Emergency Lighting Installation',
    description: 'Design, installation, and compliance essentials for emergency-lighting work.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/guides/emergency-lighting-testing',
    title: 'Emergency Lighting Testing',
    description: 'Monthly and annual testing requirements, records, and common failures.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/fire-alarm-certificate-requirements',
    title: 'Fire Alarm Certificate Requirements',
    description: 'What to document, when certification is needed, and how to keep records clear.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/rams-generator',
    title: 'RAMS Generator',
    description: 'Create risk assessments and method statements with AI from a plain-English job description.',
    icon: Flame,
    category: 'Tool',
  },
];

export default function FireRiskAssessmentPage() {
  return (
    <GuideTemplate
      title="Fire Risk Assessment Guide for Electricians"
      description="Understand what a fire risk assessment covers, where electricians fit in, common electrical fire hazards, and how to turn findings into documented remedial action."
      datePublished="2026-04-12"
      dateModified="2026-04-12"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Flame}
      heroTitle={
        <>
          Fire Risk Assessment
          <span className="block text-yellow-400 mt-1">Guide for Electricians</span>
        </>
      }
      heroSubtitle="Fire risk assessments often create electrical actions, but many contractors still handle them with disconnected notes, quotes, and certificates. This guide explains where electricians fit in, what to check, and how to document the follow-up properly."
      readingTime={8}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How Electricians Should Handle Fire-Risk Actions"
      howToDescription="A practical workflow for turning a fire-risk finding into documented electrical action."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Handle Fire-Safety Actions Properly"
      ctaSubheading="Turn fire-risk findings into snags, quotes, certificates, and evidence in one Elec-Mate workflow. Start your free trial."
    />
  );
}
