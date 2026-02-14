import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Brain,
  Zap,
  FileText,
  ShieldCheck,
  PenTool,
  ClipboardCheck,
  Bot,
  Send,
  BookOpen,
  GraduationCap,
  Wrench,
  Search,
  Users,
  ListChecks,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Report Writer', href: '/tools/ai-report-writer' },
];

const tocItems = [
  { id: 'what-is-report-writer', label: 'What Is AI Report Writer?' },
  { id: 'inspection-summaries', label: 'Inspection Summaries' },
  { id: 'condition-reports', label: 'Condition Reports' },
  { id: 'client-proposals', label: 'Client Proposals' },
  { id: 'remedial-recommendations', label: 'Remedial Recommendations' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Generate professional inspection summary reports that translate technical EICR findings into clear, non-technical language clients and landlords can understand.',
  'Produce comprehensive condition reports with photographic evidence, prioritised recommendations, and cost indications for remedial work.',
  'Create client proposals that combine scope of work, methodology, timelines, and pricing into a professional, branded document.',
  'Remedial recommendation reports explain each observation code (C1, C2, C3, FI) in plain English with specific actions and approximate costs.',
  'All reports are formatted professionally with your company branding, ready to send to clients as PDF or shared via a secure link.',
];

const faqs = [
  {
    question: 'What types of report can the AI generate?',
    answer:
      'The AI Report Writer generates five main types of report for electricians. First, inspection summary reports that translate the technical findings from an EICR or periodic inspection into plain English for the client or landlord. Second, condition reports that provide a comprehensive assessment of an electrical installation with prioritised recommendations. Third, client proposals that combine a description of proposed work, methodology, timeline, and pricing. Fourth, remedial recommendation reports that explain each deficiency found during an inspection and the recommended corrective action. Fifth, completion reports that document what work was carried out, the results of testing and commissioning, and confirmation of compliance. Each report type has a professional layout with your company branding.',
  },
  {
    question: 'How does the AI turn EICR observations into plain English?',
    answer:
      'When you complete an EICR in Elec-Mate, the schedule of observations records the technical details — the observation code (C1, C2, C3, or FI), the item number, and the technical description. The AI Report Writer takes these observations and generates a summary report that explains each finding in language the client can understand. For example, a C2 observation of "Lack of earthing to extraneous-conductive-parts in bathroom" becomes "The metal pipework in the bathroom is not connected to the electrical earthing system. This means that if an electrical fault occurred, the metal pipes could become live and present a shock risk to anyone touching them. This is classified as a C2 observation (potentially dangerous) and should be corrected as a matter of urgency." The AI adds context, explains the risk, and provides a recommended action for each observation.',
  },
  {
    question: 'Can the AI generate reports from my EICR data automatically?',
    answer:
      'Yes. When you complete an EICR in the Elec-Mate certification system, the Report Writer can pull the data directly from your inspection — the schedule of observations, the test results, the overall assessment, and any limitations. It then generates a summary report without you having to re-enter any information. This saves significant time compared to writing a covering letter or summary report manually after each inspection. For landlords and property managers who receive multiple EICRs, the AI can also generate a portfolio summary showing the overall condition across multiple properties with a prioritised remedial action plan.',
  },
  {
    question: 'How does the client proposal generation work?',
    answer:
      'You describe the proposed work in plain English — for example, "Full rewire of three-bedroom semi-detached house, customer living in during the work, include EV charger installation in the garage" — and the AI generates a professional proposal document. The proposal includes: a description of the current condition (if an EICR is available), the scope of proposed work broken down by area or phase, the methodology (how the work will be carried out, including the sequence and coordination with other trades), an estimated timeline with key milestones, the price (from the AI Cost Engineer if used, or manually entered), payment terms, warranty information, and your standard terms and conditions. The proposal is branded with your company details and formatted as a professional PDF.',
  },
  {
    question: 'Can I edit the reports before sending them to clients?',
    answer:
      'Yes. The AI generates a draft that you can review and edit before finalising. You have full control over the content — you can add observations that only you know (such as access limitations during the inspection, or verbal information from the client), modify the language to match your preferred style, adjust recommendations based on your professional judgement, and add or remove sections. The AI provides the structure and initial content; you provide the professional oversight and final approval. Most electricians find they need to make only minor adjustments to the AI-generated content, saving hours compared to writing reports from scratch.',
  },
  {
    question: 'Does the Report Writer support branded company documents?',
    answer:
      'Yes. You set up your company profile once in Elec-Mate — your company name, address, telephone number, email, registration numbers (NICEIC, NAPIT, etc.), and company logo. All reports generated by the AI are automatically branded with these details, producing documents that look professional and match your existing business identity. The reports include a header with your logo and company name, a footer with your contact details and registration numbers, and consistent formatting throughout. Clients receive reports that look like they came from an established professional business, which builds confidence and trust.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate',
    description:
      'Complete Electrical Installation Condition Reports digitally with auto-populated schedules and observation codes.',
    icon: ClipboardCheck,
    category: 'Tool',
  },
  {
    href: '/tools/ai-cost-engineer',
    title: 'AI Cost Engineer',
    description:
      'Get accurate job cost estimates with itemised materials, labour rates, and regional pricing for UK electrical work.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/ai-maintenance-specialist',
    title: 'AI Maintenance Specialist',
    description:
      'Plan maintenance programmes with intelligent scheduling, fault prediction, and compliance tracking.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'C1, C2, C3, and FI classification codes with real examples and guidance on correct classification.',
    icon: ListChecks,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Everything landlords need to know about electrical safety inspections and their legal obligations.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with structured training covering all inspection and reporting procedures.',
    icon: GraduationCap,
    category: 'Training',
  },
];

const features = [
  {
    icon: PenTool,
    title: 'Professional Report Generation',
    description:
      'Generate polished, branded reports in seconds. Inspection summaries, condition reports, proposals, and completion reports — all formatted for client presentation.',
  },
  {
    icon: FileText,
    title: 'EICR Summary Reports',
    description:
      'Translate technical EICR observations into plain English that clients and landlords can understand. Every C1, C2, C3, and FI code explained clearly.',
  },
  {
    icon: Send,
    title: 'Client-Ready Proposals',
    description:
      'Generate professional proposals with scope of work, methodology, timeline, and pricing. Branded PDF documents ready to send to prospective clients.',
  },
  {
    icon: ShieldCheck,
    title: 'Remedial Recommendations',
    description:
      'Prioritised remedial action plans with plain-English explanations, recommended actions, approximate costs, and urgency classification for each item.',
  },
  {
    icon: BookOpen,
    title: 'Company Branding',
    description:
      'All reports include your company logo, name, contact details, and registration numbers. Professional documents that build client confidence.',
  },
  {
    icon: Bot,
    title: 'Edit and Customise',
    description:
      'Full editorial control over every report. Review, edit, and approve before sending. The AI provides the structure; you provide the professional judgement.',
  },
];

const howToSteps = [
  {
    name: 'Select the report type',
    text: 'Choose from inspection summary, condition report, client proposal, remedial recommendation, or completion report. The AI adapts the format and content to the report type.',
  },
  {
    name: 'Provide the source data',
    text: 'For EICR-based reports, the AI pulls data directly from your completed inspection. For proposals, describe the job. For condition reports, describe the installation and your findings.',
  },
  {
    name: 'Review the draft',
    text: 'The AI generates a complete draft report. Review the content, make any edits or additions based on your professional judgement, and adjust the language to your preferred style.',
  },
  {
    name: 'Approve and brand',
    text: 'Confirm the final content. The report is automatically branded with your company details, logo, and registration numbers.',
  },
  {
    name: 'Send to the client',
    text: 'Export the report as a professional PDF or share it via a secure link. The client can view the report on any device without needing to install software.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-report-writer',
    heading: 'What Is the AI Report Writer?',
    content: (
      <>
        <p>
          The AI Report Writer is part of the Elec-Mate platform, designed to help electricians
          produce professional written reports and documents without spending hours on paperwork. It
          generates inspection summaries, condition reports, client proposals, remedial
          recommendation reports, and completion reports — all branded with your company details and
          formatted for client presentation.
        </p>
        <p>
          Report writing is one of the most time-consuming aspects of professional electrical work.
          After completing an{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR inspection</SEOInternalLink>, you
          need to explain the findings to the client in language they can understand. After
          surveying a potential job, you need to produce a professional proposal that wins the work.
          After completing a project, you need to document what was done and hand over the records.
          The AI Report Writer handles all of these tasks, producing professional documents in
          seconds instead of the hours that manual report writing typically takes.
        </p>
        <p>
          The tool integrates directly with the Elec-Mate certification system. When you complete an
          EICR, the observations, test results, and overall assessment flow automatically into the
          Report Writer, which generates a client-facing summary without any re-entry of data. The{' '}
          <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink> can
          price remedial work identified in the report, and the{' '}
          <SEOInternalLink href="/tools/ai-project-manager">AI Project Manager</SEOInternalLink> can
          schedule it — creating a seamless workflow from inspection to quotation to completion.
        </p>
        <p>
          All reports are written in clear, professional UK English. Technical terminology is used
          where appropriate (in the technical sections) and translated into plain language where
          necessary (in the client-facing summaries). The result is documentation that demonstrates
          your professionalism to clients while communicating effectively with non-technical
          readers.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-summaries',
    heading: 'Inspection Summary Reports',
    content: (
      <>
        <p>
          After completing an EICR or periodic inspection, the formal certificate and schedules
          contain the technical information required by BS 7671 — but they are not designed to be
          understood by non-electricians. Landlords, property managers, building owners, and tenants
          need a summary that explains what was found, what it means, and what needs to be done.
        </p>
        <p>
          The AI generates an inspection summary report that translates each{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation code
          </SEOInternalLink>{' '}
          into plain English. A C1 observation (danger present) is explained with the specific risk,
          the recommended immediate action, and the urgency. A C2 observation (potentially
          dangerous) is explained with the potential risk, the recommended corrective action, and a
          realistic timeframe. A C3 observation (improvement recommended) is explained as a
          recommendation rather than a requirement, with the benefit of the improvement clearly
          stated. FI observations (further investigation required) are explained with what
          additional testing or inspection is needed and why.
        </p>
        <p>
          The summary report includes an overall assessment in plain language — whether the
          installation is satisfactory or unsatisfactory, what this means for the client, and a
          clear list of actions required in priority order. For{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">landlords</SEOInternalLink>, the report
          includes specific guidance on their legal obligations under the Electrical Safety
          Standards in the Private Rented Sector (England) Regulations 2020 and the timeframes for
          completing remedial work.
        </p>
        <SEOAppBridge
          title="Generate EICR summary reports instantly"
          description="Complete your EICR in Elec-Mate and the Report Writer produces a professional client summary automatically. No re-entering data, no manual report writing."
          icon={FileText}
        />
      </>
    ),
  },
  {
    id: 'condition-reports',
    heading: 'Condition Reports for Electrical Installations',
    content: (
      <>
        <p>
          A condition report goes beyond the standard EICR format to provide a comprehensive
          narrative assessment of an electrical installation. It is typically used for pre-purchase
          surveys (advising a buyer on the condition of the electrical installation before they
          complete a property purchase), insurance assessments, and building condition surveys where
          a detailed written report is required.
        </p>
        <p>
          The AI generates condition reports that cover: the overall condition and estimated
          remaining life of the installation, the condition of each major component (consumer unit,
          distribution boards, cabling, accessories, earthing and bonding), photographs with
          annotations highlighting areas of concern, a prioritised schedule of recommended work with
          approximate costs, and a maintenance plan for the ongoing care of the installation.
        </p>
        <p>
          For property transactions, the condition report gives the buyer a clear picture of what
          they are inheriting and what expenditure to expect. For insurance assessments, it provides
          the evidence needed to satisfy underwriters. For building owners, it serves as a baseline
          assessment from which to plan future maintenance and investment.
        </p>
        <p>
          The AI draws on the test results and observations from your inspection to produce accurate
          assessments. It does not exaggerate issues to generate more work — it provides a balanced,
          professional assessment that builds your reputation as a trustworthy and knowledgeable
          electrician. The{' '}
          <SEOInternalLink href="/tools/ai-maintenance-specialist">
            AI Maintenance Specialist
          </SEOInternalLink>{' '}
          can take the condition report findings and generate an ongoing maintenance schedule for
          the installation.
        </p>
      </>
    ),
  },
  {
    id: 'client-proposals',
    heading: 'Professional Client Proposals',
    content: (
      <>
        <p>
          Winning work in a competitive market requires professional proposals that give the client
          confidence in your ability to deliver. A handwritten quote on the back of a compliment
          slip does not convey the same professionalism as a branded, structured proposal document.
          The AI Report Writer generates proposals that look professional and contain all the
          information a client needs to make an informed decision.
        </p>
        <p>
          You describe the proposed work, and the AI generates a complete proposal including: an
          introduction and description of the current situation (drawing on EICR data if available),
          the scope of proposed work broken down by area or phase, the methodology (how the work
          will be carried out, the sequence, the expected disruption), an estimated timeline with
          milestones, the price (which can be pulled from the{' '}
          <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink> or
          entered manually), payment terms, warranty information, relevant qualifications and
          accreditations, and your standard terms and conditions.
        </p>
        <p>
          The proposal can be customised for different client types. For domestic clients, the
          language is kept straightforward and jargon-free. For commercial clients and facilities
          managers, the proposal includes more technical detail, compliance references, and
          professional terminology. For{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">landlord clients</SEOInternalLink>, the
          proposal references their legal obligations and the benefits of proactive maintenance.
        </p>
        <p>
          The AI also generates follow-up email templates for quotes that have been sent but not yet
          accepted, helping you maintain professional client communication without spending time
          composing emails.
        </p>
      </>
    ),
  },
  {
    id: 'remedial-recommendations',
    heading: 'Remedial Recommendation Reports',
    content: (
      <>
        <p>
          When an EICR identifies deficiencies, the client needs to understand what needs to be
          done, how urgently it needs to be done, and approximately how much it will cost. The
          remedial recommendation report provides all of this in a clear, prioritised format.
        </p>
        <p>
          For each observation, the report includes: the observation code and its meaning (C1 =
          danger present, C2 = potentially dangerous, C3 = improvement recommended, FI = further
          investigation required), a plain-English explanation of the deficiency and the risk it
          presents, the recommended corrective action described in terms the client can understand,
          an approximate cost range for the remedial work (drawing on UK market data from the{' '}
          <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink>
          ), and a recommended timeframe for completion based on the urgency of the observation.
        </p>
        <p>
          The recommendations are presented in priority order: C1 observations first (requiring
          immediate action), then C2 observations (to be corrected as soon as possible), then FI
          observations (requiring further investigation to determine the extent of the issue), and
          finally C3 observations (desirable improvements that enhance safety but are not
          mandatory). This prioritisation helps the client understand where to focus their budget
          and attention.
        </p>
        <p>
          For landlords subject to the Electrical Safety Standards in the Private Rented Sector
          (England) Regulations 2020, the report includes specific guidance on the legal requirement
          to complete C1 and C2 remedial work within 28 days (or as specified by the inspector) and
          to provide evidence of completion to the local authority if required.
        </p>
        <SEOAppBridge
          title="Turn observations into action plans"
          description="The Report Writer converts your EICR observations into a prioritised remedial recommendation report with plain-English explanations and approximate costs. Professional documents your clients will understand."
          icon={ListChecks}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AIReportWriterPage() {
  return (
    <ToolTemplate
      title="AI Report Writer | Electrical Reports & Proposals"
      description="Generate professional electrical reports and proposals with AI. Inspection summaries, condition reports, client proposals, and remedial recommendations — all branded with your company details."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Report Agent"
      badgeIcon={PenTool}
      heroTitle={
        <>
          AI Report Writer: <span className="text-yellow-400">Professional Reports in Seconds</span>
        </>
      }
      heroSubtitle="Generate professional inspection summaries, condition reports, client proposals, and remedial recommendations — all branded with your company details and formatted for client presentation. Stop spending hours on paperwork."
      heroFeaturePills={[
        { icon: FileText, label: 'Inspection Reports' },
        { icon: Send, label: 'Client Proposals' },
        { icon: ListChecks, label: 'Remedial Plans' },
        { icon: PenTool, label: 'Company Branded' },
      ]}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Report Writer Features"
      featuresSubheading="Purpose-built for UK electricians. Professional reports and proposals that win work and build client confidence."
      howToSteps={howToSteps}
      howToHeading="How to Use the AI Report Writer"
      howToDescription="Five steps from source data to a professional, branded report ready to send to the client."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About AI Report Writing"
      relatedPages={relatedPages}
      ctaHeading="Stop Spending Hours on Reports"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Report Writer. Professional reports and proposals in seconds, not hours. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-report-writer"
    />
  );
}
