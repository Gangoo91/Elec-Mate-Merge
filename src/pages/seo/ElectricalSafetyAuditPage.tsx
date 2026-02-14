import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Shield,
  ClipboardCheck,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Scale,
  Brain,
  BookOpen,
  HardHat,
  ShieldCheck,
  Zap,
  Search,
} from 'lucide-react';

export default function ElectricalSafetyAuditPage() {
  return (
    <GuideTemplate
      title="Electrical Safety Audit | Workplace Compliance Guide"
      description="Complete guide to electrical safety audits in UK workplaces. Covers the difference between audits and inspections, regulatory requirements under the Electricity at Work Regulations 1989, documentation review, corrective actions, reporting, and how to maintain ongoing compliance."
      datePublished="2026-01-20"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Safety', href: '/guides/safety' },
        { label: 'Safety Audit', href: '/guides/electrical-safety-audit' },
      ]}
      tocItems={[
        { id: 'what-is-safety-audit', label: 'What Is an Electrical Safety Audit?' },
        { id: 'audit-vs-inspection', label: 'Audit vs Inspection' },
        { id: 'regulatory-requirements', label: 'Regulatory Requirements' },
        { id: 'documentation-review', label: 'Documentation Review' },
        { id: 'conducting-the-audit', label: 'Conducting the Audit' },
        { id: 'corrective-actions', label: 'Corrective Actions' },
        { id: 'reporting', label: 'Audit Reporting' },
        { id: 'ongoing-compliance', label: 'Ongoing Compliance' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Safety Hub"
      badgeIcon={Shield}
      heroTitle={
        <>
          Electrical Safety Audit:{' '}
          <span className="text-yellow-400">Workplace Compliance Guide</span>
        </>
      }
      heroSubtitle="A thorough electrical safety audit protects workers, satisfies regulators, and prevents costly incidents. This guide covers every stage of the process, from understanding the legal framework to delivering corrective actions and maintaining ongoing compliance across UK workplaces."
      readingTime={12}
      keyTakeaways={[
        "An electrical safety audit is a systematic review of an organisation's electrical safety management system, policies, procedures, records, and physical installations against legal requirements and best practice standards.",
        'Audits and inspections are different: an inspection examines the physical condition of the installation, while an audit evaluates the management system that ensures the installation remains safe over time.',
        'The Electricity at Work Regulations 1989 place a legal duty on employers to maintain electrical systems in a safe condition, and a safety audit is the accepted way to verify compliance with this duty.',
        'Documentation review is the backbone of any audit: maintenance logs, test certificates, EICR history, PAT testing records, training records, and risk assessments must all be current and complete.',
        'Elec-Mate stores all certificates, test results, and inspection records digitally, making audit preparation straightforward and ensuring nothing is lost or out of date.',
      ]}
      sections={[
        {
          id: 'what-is-safety-audit',
          heading: 'What Is an Electrical Safety Audit?',
          content: (
            <>
              <p>
                An electrical safety audit is a formal, systematic examination of an organisation's
                approach to managing electrical safety. It goes beyond simply checking whether the
                wiring is in good condition. The audit reviews the entire management system:
                policies, procedures, risk assessments, training records, maintenance schedules,
                test certificates, and physical installations are all examined against legal
                requirements and industry best practice.
              </p>
              <p>
                The purpose is to identify gaps between what the organisation should be doing and
                what it is actually doing. These gaps represent risk, and the audit produces a
                prioritised list of corrective actions to close them. A well-conducted audit
                provides a clear snapshot of the organisation's electrical safety position and a
                roadmap for improvement.
              </p>
              <p>
                Electrical safety audits are typically carried out annually or biennially, depending
                on the size and complexity of the organisation. They may be conducted internally by
                a competent person within the organisation, or externally by a specialist consultant
                or auditor. External audits carry more weight with regulators and insurers because
                they are independent.
              </p>
              <p>
                For electricians, understanding the audit process is important because you may be
                asked to support an audit by providing{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR certificates</SEOInternalLink>
                , test records, and information about the installations you maintain. Knowing what
                auditors look for helps you keep your documentation in order and your clients
                compliant.
              </p>
            </>
          ),
        },
        {
          id: 'audit-vs-inspection',
          heading: 'Audit vs Inspection: What Is the Difference?',
          content: (
            <>
              <p>
                The terms "audit" and "inspection" are often used interchangeably, but they mean
                different things. Understanding the difference is essential for anyone involved in
                workplace electrical safety.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 mt-6">
                <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Inspection</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    An inspection examines the physical condition of the electrical installation. An
                    EICR (Electrical Installation Condition Report) is an inspection: the
                    electrician visually inspects and tests the installation, identifies defects,
                    and reports on its condition. The focus is on the hardware — cables, boards,
                    protective devices, earthing, bonding, accessories, and fixed equipment.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Audit</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    An audit examines the management system that ensures the installation stays
                    safe. It asks: are inspections being done on time? Are the results being acted
                    on? Are maintenance records complete? Are staff trained? Are risk assessments
                    current? Are policies documented? The focus is on the system, not the hardware.
                  </p>
                </div>
              </div>
              <p className="mt-6">
                Both are necessary. An inspection without an audit misses systemic failures. An
                audit without inspections has no physical evidence to verify against. Together, they
                provide a complete picture of electrical safety.
              </p>
              <SEOAppBridge
                title="All your certificates and records in one place"
                description="Elec-Mate stores EICRs, EICs, minor works, PAT records, and test results digitally. When the auditor arrives, pull up everything instantly instead of searching through filing cabinets."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
        {
          id: 'regulatory-requirements',
          heading: 'Regulatory Requirements',
          content: (
            <>
              <p>
                The legal framework for electrical safety in UK workplaces is built on several
                pieces of legislation, each placing specific duties on employers, building owners,
                and duty holders. A safety audit checks compliance against all of them.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
                <h3 className="font-bold text-white text-lg mb-4">Key Legislation</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Electricity at Work Regulations 1989
                      </strong>{' '}
                      — The primary legislation. Regulation 4(2) requires all electrical systems to
                      be maintained so as to prevent danger. The audit verifies that a maintenance
                      regime exists and is being followed.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Health and Safety at Work Act 1974
                      </strong>{' '}
                      — Sections 2 and 3 impose general duties on employers to ensure the health and
                      safety of employees and others. Electrical safety falls squarely within this
                      duty.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Management of Health and Safety at Work Regulations 1999
                      </strong>{' '}
                      — Regulation 3 requires suitable and sufficient risk assessments, including
                      those for electrical hazards.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">BS 7671:2018+A2:2022</strong> — While not
                      legislation, it is the national standard for electrical installations.
                      Compliance with{' '}
                      <SEOInternalLink href="/guides/bs7671-18th-edition">BS 7671</SEOInternalLink>{' '}
                      is generally accepted as evidence of meeting the legal requirements.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Regulatory Reform (Fire Safety) Order 2005
                      </strong>{' '}
                      — Requires the responsible person to carry out a fire risk assessment, which
                      must include electrical sources of ignition.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The HSE does not prescribe exactly how an electrical safety audit should be
                conducted, but its guidance (HSG85, INDG231) sets out the principles that auditors
                follow. Failure to maintain electrical systems in a safe condition is a criminal
                offence that can result in prosecution, unlimited fines, and imprisonment.
              </p>
            </>
          ),
        },
        {
          id: 'documentation-review',
          heading: 'Documentation Review',
          content: (
            <>
              <p>
                The documentation review is the most time-consuming part of an electrical safety
                audit, and it is where most non-compliances are found. The auditor will request and
                review every piece of documentation related to electrical safety management.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
                <h3 className="font-bold text-white text-lg mb-3">
                  Documents the Auditor Will Request
                </h3>
                <ul className="space-y-2 text-white text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      Electrical safety policy (written, signed, dated, reviewed annually)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <SEOInternalLink href="/guides/eicr-certificate">
                        EICR reports
                      </SEOInternalLink>{' '}
                      for all installations, current and within recommended re-inspection dates
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <SEOInternalLink href="/guides/eic-certificate">
                        EIC certificates
                      </SEOInternalLink>{' '}
                      for all new installations and alterations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <SEOInternalLink href="/guides/pat-testing">PAT testing</SEOInternalLink>{' '}
                      records for all portable appliances
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      Maintenance logs showing planned and reactive maintenance activities
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      Electrical risk assessments (current and reviewed within the last 12 months)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      Training records proving competence of staff who work on electrical systems
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <SEOInternalLink href="/guides/safe-isolation-procedure">
                        Safe isolation
                      </SEOInternalLink>{' '}
                      procedures and lock-off/tag-out policies
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      Emergency procedures and incident reports involving electrical events
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      Contractor management records (competency checks, insurance verification)
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Missing or incomplete documentation is the single most common audit finding. Many
                organisations have good electrical installations but poor record keeping. The
                installation may be safe today, but without records there is no evidence of
                systematic management and no way to demonstrate compliance if challenged.
              </p>
              <SEOAppBridge
                title="Digital certificate storage that auditors trust"
                description="Elec-Mate generates BS 7671 compliant certificates and stores them securely with full audit trails. Every certificate is timestamped, versioned, and instantly retrievable. No more missing paperwork."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'conducting-the-audit',
          heading: 'Conducting the Audit',
          content: (
            <>
              <p>
                A thorough electrical safety audit follows a structured methodology. Whether
                conducted internally or by an external auditor, the process typically includes four
                stages: planning, document review, site verification, and reporting.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Planning</h3>
              <p>
                The auditor defines the scope (which buildings, which systems, which aspects of the
                management system), gathers background information, and schedules the audit
                activities. For multi-site organisations, a sampling strategy determines which sites
                are audited in each cycle.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Document Review</h3>
              <p>
                All documentation listed above is reviewed against the requirements. The auditor
                checks for completeness, currency, and consistency. Are EICRs within their
                recommended re-inspection period? Have C2 (potentially dangerous) observations been
                actioned? Are PAT records complete? Do training records match the personnel who
                actually carry out electrical work?
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Site Verification</h3>
              <p>
                The auditor walks the site to verify that what is documented matches reality. Are
                consumer units labelled and accessible? Are cable routes in good condition? Are
                isolation points clearly identified? Is there evidence of unauthorised
                modifications? Are portable appliances displaying current PAT labels? This is not a
                full EICR — it is a visual check to confirm that the management system is working in
                practice.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Interviews</h3>
              <p>
                The auditor may interview staff to check awareness of electrical safety procedures,
                emergency actions, and reporting processes. Maintenance staff, site managers, and
                contractors may all be asked about their understanding of the organisation's
                electrical safety requirements.
              </p>
            </>
          ),
        },
        {
          id: 'corrective-actions',
          heading: 'Corrective Actions',
          content: (
            <>
              <p>
                The audit findings are categorised by severity and urgency, and each finding
                requires a corrective action with a defined responsible person and target completion
                date.
              </p>
              <div className="space-y-4 mt-6">
                <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <h3 className="font-bold text-white text-lg">Critical (Immediate Action)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Issues that present an immediate risk to life or serious injury. Examples:
                    exposed live conductors, missing protective devices, no safe isolation
                    procedures in place, equipment operating without mandatory safety checks. These
                    must be addressed before the auditor leaves site, even if it means isolating
                    equipment or restricting access.
                  </p>
                </div>
                <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Major (Urgent Action)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Significant non-compliances that do not present an immediate danger but must be
                    resolved promptly. Examples: overdue EICRs, un-actioned C2 observations, expired
                    training certificates, missing risk assessments for specific areas. Typical
                    target: 30 days.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Minor (Improvement Opportunity)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Areas where compliance exists but could be improved. Examples: labelling
                    inconsistencies, PAT records using informal formats, training scheduled but not
                    yet completed, policies due for annual review. Typical target: 90 days.
                  </p>
                </div>
              </div>
              <p className="mt-6">
                Every corrective action must be tracked to closure. The audit report becomes a live
                document that is reviewed at management meetings until all actions are complete.
                Unresolved audit findings are a significant red flag for HSE inspectors and
                insurers.
              </p>
            </>
          ),
        },
        {
          id: 'reporting',
          heading: 'Audit Reporting',
          content: (
            <>
              <p>
                The audit report is the primary output of the process. A well-written report
                presents findings clearly, links each finding to a specific legal or best practice
                requirement, and provides actionable recommendations that the organisation can
                implement.
              </p>
              <p>
                The report typically includes an executive summary for senior management, a detailed
                findings section with evidence references, a corrective action tracker with
                responsibilities and deadlines, and a comparison with previous audit findings to
                show trends. Positive findings (areas of good practice) should also be reported to
                recognise good work and maintain engagement.
              </p>
              <p>
                The report should be presented to a senior manager with authority to allocate
                resources for corrective actions. An audit report that sits in a drawer achieves
                nothing. The corrective action tracker should be a standing item on the
                organisation's health and safety committee agenda until all actions are closed.
              </p>
              <p>
                For electricians who maintain the installation, the audit report is valuable because
                it identifies the client's priorities and budget allocation for electrical work. If
                the audit has flagged overdue EICRs or un-actioned{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes">
                  observation codes
                </SEOInternalLink>
                , the client is likely to commission that work promptly. Understanding the audit
                cycle helps you anticipate work and plan resources.
              </p>
            </>
          ),
        },
        {
          id: 'ongoing-compliance',
          heading: 'Ongoing Compliance',
          content: (
            <>
              <p>
                An audit is a snapshot. To maintain compliance between audits, organisations need an
                ongoing management system that includes scheduled inspections and testing, planned
                maintenance, training refreshers, document control, and incident reporting and
                investigation.
              </p>
              <p>
                The most common approach is a rolling programme of{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICRs</SEOInternalLink> covering a
                proportion of the installation each year, combined with annual{' '}
                <SEOInternalLink href="/guides/pat-testing">PAT testing</SEOInternalLink>, quarterly
                visual inspections of distribution boards and cable routes, and monthly checks of
                emergency lighting and fire alarm systems.
              </p>
              <p>
                Digital record-keeping tools like Elec-Mate make ongoing compliance easier by
                providing automatic reminders when certificates are due for renewal, maintaining a
                complete history of every installation you manage, and generating professional
                reports that satisfy auditors and regulators.
              </p>
              <SEOAppBridge
                title="Never miss a re-inspection date again"
                description="Elec-Mate tracks every certificate expiry and EICR re-inspection date across all your clients. Automatic reminders ensure nothing slips through the cracks. Your clients stay compliant and you stay in work."
                icon={Shield}
              />
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Define the audit scope',
          text: 'Identify which buildings, systems, and management processes will be covered. Gather background documents including previous audit reports, EICRs, PAT records, maintenance logs, training records, and the electrical safety policy.',
        },
        {
          name: 'Review all documentation',
          text: 'Check every document for completeness, currency, and consistency. Verify that EICRs are within re-inspection dates, that C2 observations have been actioned, that training certificates are valid, and that risk assessments have been reviewed in the last 12 months.',
        },
        {
          name: 'Conduct the site walkthrough',
          text: 'Walk the site to verify that documentation matches reality. Check labelling, access to distribution boards, cable route condition, PAT labels, isolation points, and evidence of unauthorised modifications.',
        },
        {
          name: 'Interview key personnel',
          text: 'Ask maintenance staff, site managers, and contractors about their understanding of electrical safety procedures, emergency actions, and reporting processes.',
        },
        {
          name: 'Compile the report and corrective actions',
          text: 'Categorise findings by severity (critical, major, minor), link each to a specific legal or best practice requirement, assign responsibilities and deadlines, and present the report to senior management with authority to allocate resources.',
        },
      ]}
      howToHeading="How to Conduct an Electrical Safety Audit"
      howToDescription="A step-by-step process for conducting a thorough electrical safety audit in a UK workplace, from scoping through to reporting."
      faqs={[
        {
          question: 'What is the difference between an electrical safety audit and an EICR?',
          answer:
            'An EICR (Electrical Installation Condition Report) is a physical inspection and test of the electrical installation itself. It examines cables, protective devices, earthing, bonding, and accessories to determine whether they are in a satisfactory condition. An electrical safety audit is a review of the entire management system that ensures the installation remains safe. It examines policies, procedures, documentation, training, maintenance records, and risk assessments. The EICR tells you what condition the installation is in today. The audit tells you whether the organisation has a system in place to keep it safe tomorrow. Both are necessary for comprehensive electrical safety management.',
        },
        {
          question: 'How often should an electrical safety audit be conducted?',
          answer:
            'There is no fixed legal requirement for audit frequency, but industry best practice recommends annual audits for high-risk environments (hospitals, schools, manufacturing, construction) and at least biennial audits for lower-risk workplaces (offices, retail). Some organisations conduct rolling audits where different aspects of the management system are reviewed each quarter, building up to a complete audit over the year. The frequency should be based on risk: the higher the consequence of electrical failure, the more frequent the audit. Changes in the organisation (new buildings, major refurbishments, changes in use) should trigger an interim audit to ensure the management system has adapted.',
        },
        {
          question: 'Who is qualified to conduct an electrical safety audit?',
          answer:
            'The auditor must be competent in both electrical safety and audit methodology. For internal audits, this is typically a senior electrical engineer, facilities manager, or health and safety professional with specific electrical knowledge. For external audits, specialist consultants with qualifications such as IEng or CEng in an electrical discipline, combined with auditing qualifications (ISO 19011 or equivalent), are appropriate. The key requirement is independence: the auditor must not be responsible for the systems they are auditing, as this creates a conflict of interest. External auditors carry more weight with regulators and insurers because they are truly independent.',
        },
        {
          question: 'What are the most common findings in electrical safety audits?',
          answer:
            'The most common findings are: overdue EICRs (installations that have passed their recommended re-inspection date without being retested), un-actioned C2 observations from previous EICRs (potentially dangerous defects that have been identified but not remedied), incomplete or missing PAT testing records, out-of-date risk assessments, expired training certificates for staff who carry out electrical work, lack of a written electrical safety policy, no safe isolation procedures documented, and poor labelling of distribution boards and circuits. Documentation failures are more common than physical installation defects, which is why many organisations that have a perfectly safe installation still fail audits.',
        },
        {
          question: 'How does Elec-Mate help with electrical safety audit preparation?',
          answer:
            'Elec-Mate helps with audit preparation in several ways. All certificates (EICRs, EICs, minor works certificates) are generated digitally in BS 7671 compliant formats and stored securely with full audit trails. Certificate expiry dates and recommended re-inspection dates are tracked automatically with reminders sent before they lapse. Test results from the schedule of tests are stored alongside each certificate, providing complete traceability. The AI Health and Safety agent generates risk assessments and method statements that satisfy auditor requirements. All records are searchable and can be retrieved instantly during an audit, eliminating the common problem of missing paperwork. The system also provides a complete history of every installation, showing trends over time that auditors value.',
        },
        {
          question: 'What happens if an electrical safety audit identifies non-compliance?',
          answer:
            'Non-compliance findings are categorised by severity. Critical findings (immediate risk to life) must be addressed before the auditor leaves site, which may mean isolating equipment or restricting access. Major findings (significant non-compliance without immediate danger) typically have a 30-day target for resolution. Minor findings (improvement opportunities) are usually given 90 days. Each finding must have a named responsible person and a completion date. The corrective action tracker should be reviewed regularly at management level until all actions are closed. Unresolved audit findings are a major concern for HSE inspectors because they demonstrate that the organisation is aware of the risk but has not acted on it, which removes any defence of reasonable practicability.',
        },
        {
          question: 'Is an electrical safety audit a legal requirement?',
          answer:
            'There is no specific UK regulation that mandates an electrical safety audit by name. However, the Electricity at Work Regulations 1989 require electrical systems to be maintained to prevent danger, and the Management of Health and Safety at Work Regulations 1999 require suitable and sufficient risk assessments and monitoring of control measures. An audit is the accepted method of verifying that these legal duties are being met. In practice, the HSE expects employers to be able to demonstrate a systematic approach to electrical safety management, and an audit is the most effective way to do this. Many insurance policies and client contracts also require regular electrical safety audits as a condition of coverage or engagement.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate Guide',
          description:
            'Complete guide to Electrical Installation Condition Reports including when required and observation codes.',
          icon: FileText,
          category: 'Guide',
        },
        {
          href: '/guides/pat-testing',
          title: 'PAT Testing Guide',
          description:
            'Portable appliance testing requirements, frequencies, and record keeping for UK workplaces.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/guides/safe-isolation-procedure',
          title: 'Safe Isolation Procedure',
          description: 'GS 38 prove-test-prove method, lock-off, and safe working practices.',
          icon: ShieldCheck,
          category: 'Guide',
        },
        {
          href: '/guides/eicr-observation-codes',
          title: 'EICR Observation Codes',
          description: 'Understanding C1, C2, C3, and FI observation codes and required actions.',
          icon: BookOpen,
          category: 'Guide',
        },
        {
          href: '/guides/bs7671-18th-edition',
          title: 'BS 7671 18th Edition Guide',
          description: 'The national standard for electrical installations in the UK.',
          icon: Scale,
          category: 'Guide',
        },
        {
          href: '/tools/ai-health-safety-agent',
          title: 'AI Health and Safety Agent',
          description:
            'Generate risk assessments, method statements, and safety documentation with AI.',
          icon: Brain,
          category: 'Tool',
        },
      ]}
      ctaHeading="Stay Audit-Ready With Elec-Mate"
      ctaSubheading="Digital certificates, automatic re-inspection reminders, full audit trails, and AI-powered safety documentation. Join 430+ UK electricians who never worry about missing paperwork. 7-day free trial."
    />
  );
}
