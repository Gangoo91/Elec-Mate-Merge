import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ClipboardCheck,
  ShieldCheck,
  FileCheck,
  ListChecks,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Brain,
  Zap,
  Search,
} from 'lucide-react';

export default function AIInstallationVerificationPage() {
  return (
    <ToolTemplate
      title="AI Installation Verification | Quality Check Tool | Elec-Mate"
      description="Automated checking of electrical installations against BS 7671:2018+A3:2024. AI-powered verification checklists, compliance reporting, observation code assignment, and certificate-ready documentation for EIC and EICR."
      datePublished="2026-01-22"
      dateModified="2026-02-13"
      toolPath="/tools/ai-installation-verification"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'AI Installation Verification', href: '/tools/ai-installation-verification' },
      ]}
      tocItems={[
        { id: 'what-is-verification', label: 'What Is AI Installation Verification?' },
        { id: 'bs7671-compliance-checks', label: 'BS 7671 Compliance Checks' },
        { id: 'verification-checklists', label: 'Verification Checklists' },
        { id: 'observation-code-assignment', label: 'Observation Code Assignment' },
        { id: 'compliance-reporting', label: 'Compliance Reporting' },
        { id: 'how-to', label: 'How to Use It' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="BS 7671 Compliant"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          <span className="text-yellow-400">AI Installation Verification</span> — Automated Quality
          Checks to BS 7671
        </>
      }
      heroSubtitle="Check every aspect of an electrical installation against BS 7671:2018+A3:2024 automatically. AI-powered verification checklists, observation code assignment, compliance scoring, and certificate-ready reporting — so nothing gets missed during inspection or commissioning."
      heroFeaturePills={[
        { icon: ShieldCheck, label: 'BS 7671:2018+A3:2024' },
        { icon: ListChecks, label: 'Smart Checklists' },
        { icon: AlertTriangle, label: 'Defect Detection' },
        { icon: FileCheck, label: 'Compliance Reports' },
      ]}
      readingTime={11}
      keyTakeaways={[
        'The AI checks installation data against over 200 BS 7671 requirements automatically, flagging non-compliances with the specific regulation reference.',
        'Dynamic verification checklists adapt to the installation type — domestic, commercial, or industrial — and include only the checks relevant to that specific installation.',
        'Observation codes (C1, C2, C3, FI) are assigned automatically with supporting regulation references and professionally worded observation text for certificates.',
        'Compliance reports summarise the installation status with a clear pass/fail assessment and a prioritised list of any items requiring attention.',
        'Verification results feed directly into your EIC or EICR documentation, eliminating duplicate data entry between the inspection and the certificate.',
      ]}
      sections={[
        {
          id: 'what-is-verification',
          heading: 'What Is AI Installation Verification?',
          content: (
            <>
              <p>
                AI Installation Verification is a tool within Elec-Mate that automatically checks
                electrical installation data against the requirements of BS 7671:2018+A3:2024. It
                acts as an automated second pair of eyes — reviewing test results, circuit
                specifications, protection arrangements, and installation details to identify any
                non-compliances before you sign off the certificate.
              </p>
              <p>
                The tool addresses a real problem in the trade. During a busy EICR or commissioning
                session, it is easy to miss a detail. Perhaps the earth fault loop impedance on one
                circuit marginally exceeds the maximum permitted value for the installed protective
                device. Perhaps the voltage drop on a long lighting circuit is 3.2% when the maximum
                permitted is 3%. Perhaps an RCD protecting socket outlets has a rated residual
                operating current of 100mA when Regulation 411.3.3 requires 30mA. These are the
                kinds of non-compliances that can slip through during a manual review, especially on
                large installations with dozens of circuits.
              </p>
              <p>
                The AI Verification tool catches these issues by systematically checking every data
                point against the relevant regulation. It does not replace the electrician's
                judgement — it augments it by performing the tedious, repetitive cross-checking that
                humans are not good at doing under time pressure. The electrician still makes all
                the professional decisions; the AI simply ensures that no individual check is
                overlooked.
              </p>
              <p>
                This integrates with Elec-Mate's complete certification workflow, including the{' '}
                <SEOInternalLink href="/tools/ai-electrician">AI Board Scanner</SEOInternalLink> for
                data capture, the{' '}
                <SEOInternalLink href="/tools/ai-circuit-designer">
                  AI Circuit Designer
                </SEOInternalLink>{' '}
                for design verification, and the certificate forms for{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> and{' '}
                <SEOInternalLink href="/guides/eic-certificate">EIC</SEOInternalLink> documentation.
              </p>
            </>
          ),
          appBridge: {
            title: 'AI Installation Verification — Built Into Elec-Mate',
            description:
              'Automatic BS 7671 compliance checking for every circuit. Enter your test results and installation data, and the AI flags non-compliances with regulation references and recommended actions.',
            icon: ClipboardCheck,
          },
        },
        {
          id: 'bs7671-compliance-checks',
          heading: 'BS 7671 Compliance Checks',
          content: (
            <>
              <p>
                The verification engine checks installation data against a comprehensive library of
                BS 7671 requirements. These are not generic checklists — they are specific,
                measurable checks that compare actual values to the requirements of the standard.
                The checks cover every major area of BS 7671:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">
                    Protection against electric shock (Chapter 41)
                  </span>{' '}
                  — earth fault loop impedance values checked against Tables 41.2 to 41.6 for the
                  installed protective device type and rating. Disconnection times verified for
                  final circuits (0.4s) and distribution circuits (5s). RCD protection requirements
                  checked for socket outlets, cables in walls, and bathroom circuits per Regulation
                  411.3.3.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Protection against overcurrent (Chapter 43)
                  </span>{' '}
                  — protective device rating checked against cable current-carrying capacity.
                  Coordination between devices verified. Breaking capacity checked against
                  prospective fault current at the point of installation.
                </li>
                <li>
                  <span className="font-semibold text-white">Voltage drop (Appendix 12)</span> —
                  calculated voltage drop checked against the 3% limit for lighting and 5% for other
                  circuits, measured from the origin of the installation.
                </li>
                <li>
                  <span className="font-semibold text-white">Cable sizing (Appendix 4)</span> —
                  cable current-carrying capacity verified with all correction factors applied:
                  ambient temperature (Ca), grouping (Cg), thermal insulation (Ci), and
                  semi-enclosed fuse factor (Cc) where applicable.
                </li>
                <li>
                  <span className="font-semibold text-white">Surge protection (Section 443)</span> —
                  SPD requirement assessed based on the consequences of overvoltage and the type of
                  installation. Type and location of SPD verified against Regulation 443.4.
                </li>
                <li>
                  <span className="font-semibold text-white">Amendment 3:2024 requirements</span> —
                  Regulation 530.3.201 checked for installations with bidirectional power flow
                  (solar PV, battery storage). Correct protective device directionality verified.
                </li>
              </ul>
              <p>
                Each check that fails includes the specific regulation reference, the actual value
                found, the required value, and a recommended corrective action. This level of detail
                means you can address issues immediately rather than having to look up the
                regulation yourself.
              </p>
            </>
          ),
        },
        {
          id: 'verification-checklists',
          heading: 'Dynamic Verification Checklists',
          content: (
            <>
              <p>
                The verification checklists are not static documents — they adapt dynamically based
                on the type of installation you are inspecting or commissioning. When you specify
                the installation parameters (domestic, commercial, or industrial; earthing system;
                supply characteristics; special locations), the AI generates a checklist that
                includes only the checks relevant to that specific installation.
              </p>
              <p>
                For a standard domestic installation on a TN-C-S supply, the checklist focuses on
                consumer unit compliance, RCD protection arrangements, cable sizing for common
                domestic circuits, bonding requirements, and the specific checks required for
                domestic special locations (bathrooms, swimming pools, outdoor installations). For a
                commercial installation with a three-phase supply, the checklist expands to cover
                discrimination between protective devices, phase balance, submain calculations, and
                the additional requirements for commercial environments.
              </p>
              <p>
                Each checklist item links to the specific BS 7671 regulation that requires the
                check, so you can reference the standard directly if needed. The checklists also
                align with the inspection schedule format used in{' '}
                <SEOInternalLink href="/guides/how-to-fill-in-eicr">
                  EICR documentation
                </SEOInternalLink>
                , making it straightforward to transfer your findings to the certificate.
              </p>
              <p>
                Special location checklists are particularly valuable. BS 7671 Part 7 contains
                specific requirements for locations such as bathrooms (Section 701), swimming pools
                (Section 702), saunas (Section 703), construction sites (Section 704), agricultural
                premises (Section 705), and marinas (Section 709). The AI generates
                location-specific checklists that ensure you check every requirement in the relevant
                section, including zone definitions, IP ratings, supplementary bonding, and
                restricted equipment rules.
              </p>
            </>
          ),
        },
        {
          id: 'observation-code-assignment',
          heading: 'Automatic Observation Code Assignment',
          content: (
            <>
              <p>
                When the verification engine identifies a non-compliance, it assigns the appropriate
                observation code following the guidance in the IET Code of Practice for In-service
                Inspection and Testing of Electrical Equipment and Guidance Note 3: Inspection and
                Testing (9th Edition):
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">C1 — Danger present</span>: risk of
                  injury. Immediate remedial action required.
                </li>
                <li>
                  <span className="font-semibold text-white">C2 — Potentially dangerous</span>:
                  urgent remedial action required.
                </li>
                <li>
                  <span className="font-semibold text-white">C3 — Improvement recommended</span>:
                  the installation does not comply with the current edition of BS 7671 but did
                  comply at the time of installation.
                </li>
                <li>
                  <span className="font-semibold text-white">FI — Further investigation</span>:
                  further investigation required without delay. The inspection could not be
                  completed due to the extent of the non-compliance.
                </li>
              </ul>
              <p>
                The AI considers the context when assigning codes. A missing RCD on socket outlets
                in a 2024 installation is a C2 (it should have been installed under current
                regulations), but the same finding in a 1990 installation may be a C3 (it complied
                with the regulations in force at the time of installation). This contextual
                understanding is what makes the AI classification reliable for real-world
                inspections.
              </p>
              <p>
                Each observation includes a professionally worded description suitable for the
                certificate, citing the specific BS 7671 regulation contravened. This saves
                significant time during{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes">
                  EICR observation recording
                </SEOInternalLink>{' '}
                and ensures consistency in the language used across all your certificates.
              </p>
            </>
          ),
        },
        {
          id: 'compliance-reporting',
          heading: 'Compliance Reporting',
          content: (
            <>
              <p>
                The compliance report is the output document that summarises the verification
                results. It provides a clear, structured overview of the installation status — what
                passed, what failed, and what needs attention. The report includes:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Overall compliance score</span> — a
                  percentage score showing how many checks passed against the total number of
                  applicable checks. This gives you an at-a-glance assessment of the installation.
                </li>
                <li>
                  <span className="font-semibold text-white">Prioritised issue list</span> — all
                  non-compliances listed in priority order (C1 first, then C2, then C3, then FI),
                  with the regulation reference, actual value, required value, and recommended
                  corrective action for each.
                </li>
                <li>
                  <span className="font-semibold text-white">Circuit-by-circuit breakdown</span> —
                  the verification status for each circuit showing which checks passed and which
                  failed. This maps directly to the schedule of circuits in your EIC or EICR.
                </li>
                <li>
                  <span className="font-semibold text-white">Remedial cost estimate</span> — an
                  optional section that uses the{' '}
                  <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink>{' '}
                  to produce an indicative cost for addressing all identified non-compliances. This
                  is valuable when providing landlords or property managers with both the inspection
                  report and a remedial quotation.
                </li>
              </ul>
              <p>
                The report can be exported as a PDF for submission to clients, landlords, managing
                agents, or scheme providers. It includes your company branding and can be attached
                to the EIC or EICR as supporting documentation.
              </p>
              <SEOAppBridge
                title="From Inspection to Report in Minutes"
                description="Enter your test results and inspection findings, and the AI generates a complete compliance report with observation codes, regulation references, and optional remedial cost estimates. Export as a branded PDF."
                icon={FileCheck}
              />
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Enter installation details',
          text: 'Specify the installation type (domestic, commercial, industrial), earthing system, supply characteristics, and any special locations. This configures the verification engine to check only the relevant requirements.',
        },
        {
          name: 'Input test results and circuit data',
          text: 'Enter the schedule of test results and circuit specifications. If you used the AI Board Scanner, this data is already populated. Otherwise, enter the values manually or use voice input.',
        },
        {
          name: 'Run the verification',
          text: 'The AI checks every data point against the applicable BS 7671 requirements. This typically takes a few seconds, even for large installations with 50+ circuits.',
        },
        {
          name: 'Review flagged items',
          text: 'Review any non-compliances that the AI has identified. Each item shows the specific check that failed, the regulation reference, the actual and required values, the assigned observation code, and the recommended corrective action.',
        },
        {
          name: 'Generate the compliance report',
          text: 'Export the verification results as a compliance report. Attach it to your EIC or EICR, or send it to the client as a standalone document summarising the installation status.',
        },
      ]}
      howToHeading="How to Use AI Installation Verification"
      howToDescription="Verify any electrical installation against BS 7671 in five steps."
      features={[
        {
          icon: ShieldCheck,
          title: '200+ BS 7671 Checks',
          description:
            'Systematic verification against over 200 specific BS 7671 requirements covering protection, cable sizing, voltage drop, earthing, bonding, and special locations.',
        },
        {
          icon: ListChecks,
          title: 'Dynamic Checklists',
          description:
            'Checklists adapt to the installation type — domestic, commercial, industrial, and special locations. Only relevant checks are included for each specific installation.',
        },
        {
          icon: AlertTriangle,
          title: 'Auto Observation Codes',
          description:
            'Non-compliances are automatically classified as C1, C2, C3, or FI with the specific BS 7671 regulation reference and professionally worded observation text.',
        },
        {
          icon: FileCheck,
          title: 'Compliance Reports',
          description:
            'Clear, structured reports showing overall compliance score, prioritised issue list, circuit-by-circuit breakdown, and optional remedial cost estimates.',
        },
        {
          icon: CheckCircle2,
          title: 'Certificate Integration',
          description:
            'Verification results flow directly into your EIC or EICR forms. Observation codes, regulation references, and circuit data populate automatically.',
        },
        {
          icon: ClipboardCheck,
          title: 'Amendment 3:2024 Ready',
          description:
            'Includes checks for BS 7671 Amendment 3:2024 requirements including Regulation 530.3.201 for bidirectional and unidirectional protective devices.',
        },
      ]}
      featuresHeading="Verification Features"
      featuresSubheading="Comprehensive compliance checking that catches what manual review can miss."
      faqs={[
        {
          question: 'Does the AI replace the need for a qualified inspector?',
          answer:
            'No. The AI Installation Verification tool is designed to assist qualified electricians, not replace them. Electrical inspection requires hands-on visual examination, physical testing with calibrated instruments, and professional judgement that no AI system can provide. What the AI does is automate the data cross-checking part of the inspection process — comparing test results and circuit specifications against BS 7671 requirements. This is the tedious, error-prone part of inspection work where human reviewers are most likely to miss something, especially on large installations or under time pressure. The qualified inspector still carries out the physical inspection, takes the measurements, makes the professional judgements, and signs the certificate. The AI simply ensures that the data checks are thorough and consistent.',
        },
        {
          question:
            'How does the AI handle installations that were compliant when installed but not under current regulations?',
          answer:
            'This is one of the most important aspects of EICR inspections, and the AI handles it correctly. When you specify the approximate date of the installation (or the edition of BS 7671 that was current at the time), the AI adjusts its classification accordingly. Items that were compliant under earlier editions but do not meet current requirements are classified as C3 (improvement recommended) rather than C2 (potentially dangerous). For example, a lighting circuit without RCD protection in a pre-2008 installation is typically a C3 because RCD protection for lighting circuits was not required under the 16th Edition. The same finding in a post-2018 installation would be a C2 because it should comply with current requirements. This contextual classification follows the guidance in GN3: Inspection and Testing, 9th Edition.',
        },
        {
          question: 'Can I customise the verification checklists?',
          answer:
            'Yes. While the AI generates a comprehensive default checklist based on the installation type, you can add custom check items, skip checks that are not applicable to a specific situation, and save custom checklist templates for types of work you carry out regularly. For example, if you specialise in landlord EICRs for HMO properties, you can create a template that includes the additional checks required under the Housing Act 2004 and the Management of Houses in Multiple Occupation Regulations 2006, such as fire detection and emergency lighting verification. Custom templates save time on repeat work while ensuring consistency across your inspections.',
        },
        {
          question: 'What test instruments does the verification accept data from?',
          answer:
            'The AI Verification tool accepts test data entered manually, by voice, or imported from compatible test instruments. For manual entry, you type or dictate the values from your test instrument display. The system validates each entry against expected ranges — for example, if you enter an insulation resistance value of 0.5 ohms instead of 0.5 megohms, it queries the entry because the unit is likely wrong. The system works with test data from any calibrated instrument — Megger, Metrel, Fluke, Kewtech, or any other manufacturer. The important thing is the measured values, not the instrument brand.',
        },
        {
          question: 'Does the verification check prospective fault current?',
          answer:
            'Yes. The verification engine checks that the prospective fault current (Ipf) at the origin of the installation and at each distribution board does not exceed the rated breaking capacity of the installed protective devices. Under BS 7671 Regulation 432.1, every protective device must have a rated short-circuit breaking capacity not less than the prospective fault current at the point where the device is installed. The AI compares the measured or declared Ipf against the breaking capacity of each protective device. For example, if the Ipf at the main switch is 4.5 kA and a circuit is protected by an MCB with a breaking capacity of 6 kA, the check passes. If an MCB with a breaking capacity of only 3 kA were installed, the check would fail with a reference to Regulation 432.1.',
        },
        {
          question: 'Can it verify installations with solar PV or battery storage?',
          answer:
            'Yes. The verification engine includes specific checks for installations with distributed energy resources including solar PV, battery energy storage systems (BESS), wind turbines, and EV chargers with vehicle-to-grid (V2G) capability. These checks cover the requirements of BS 7671 Amendment 3:2024, particularly the new Regulation 530.3.201 regarding bidirectional and unidirectional protective devices. The AI verifies that the correct RCD type is installed (Type B for systems with DC fault current), that protective devices are suitable for bidirectional power flow, that the earthing arrangement is correct for the generation source, and that G98/G99 connection requirements are addressed. For solar PV installations, it also checks DC isolator provision and labelling requirements.',
        },
        {
          question: 'How does the verification handle special locations under BS 7671 Part 7?',
          answer:
            'When you specify that the installation includes a special location — bathroom, swimming pool, sauna, construction site, agricultural premises, marina, caravan park, or other Part 7 location — the AI adds the complete set of supplementary requirements from the relevant BS 7671 section. For a bathroom (Section 701), this includes zone classification checks, IP rating verification for equipment in each zone, RCD protection requirements, supplementary bonding assessment, and restrictions on socket outlets and switching devices in zones 0, 1, and 2. For a swimming pool (Section 702), the checks are more extensive, covering SELV supply requirements, additional zoning rules, and the prohibition of socket outlets in zone 1. Each special location has its own dedicated checklist derived from the specific section of BS 7671.',
        },
      ]}
      faqHeading="Installation Verification FAQs"
      relatedPages={[
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate Guide',
          description:
            'How to complete an Electrical Installation Condition Report correctly, including observations, classifications, and recommendations.',
          icon: FileCheck,
          category: 'Certificates',
        },
        {
          href: '/guides/eic-certificate',
          title: 'EIC Certificate Guide',
          description:
            'Complete guide to the Electrical Installation Certificate for new installations and alterations.',
          icon: FileCheck,
          category: 'Certificates',
        },
        {
          href: '/tools/ai-electrician',
          title: 'AI Board Scanner',
          description:
            'Photograph a consumer unit and extract circuit data automatically for verification and certification.',
          icon: Camera,
          category: 'AI Tools',
        },
        {
          href: '/tools/ai-circuit-designer',
          title: 'AI Circuit Designer',
          description:
            'Design complete circuits to BS 7671 with automatic cable sizing, protection selection, and verification.',
          icon: Zap,
          category: 'AI Tools',
        },
        {
          href: '/guides/ai-tools-for-electricians',
          title: 'AI Tools for Electricians 2026',
          description:
            'Complete guide to AI tools for UK electricians including board scanning, defect classification, and compliance checking.',
          icon: Brain,
          category: 'Guides',
        },
        {
          href: '/guides/bs7671-observation-codes',
          title: 'BS 7671 Observation Codes',
          description:
            'Understanding C1, C2, C3, and FI observation codes for EICR inspections, with examples and regulation references.',
          icon: Search,
          category: 'Guides',
        },
      ]}
      ctaHeading="Verify installations with confidence"
      ctaSubheading="Join 430+ UK electricians using AI-powered verification to catch non-compliances before they reach the certificate. 7-day free trial, cancel anytime."
    />
  );
}
