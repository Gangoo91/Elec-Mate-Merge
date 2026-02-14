import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Brain,
  Zap,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  ListChecks,
  CheckCircle2,
  Bot,
  Gauge,
  Wrench,
  GraduationCap,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Commissioning Specialist', href: '/tools/ai-commissioning-specialist' },
];

const tocItems = [
  { id: 'what-is-commissioning', label: 'What Is AI Commissioning?' },
  { id: 'checklist-generation', label: 'Checklist Generation' },
  { id: 'functional-testing', label: 'Functional Test Guidance' },
  { id: 'documentation', label: 'Documentation Support' },
  { id: 'bs7671-compliance', label: 'BS 7671 Compliance' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Generate complete commissioning checklists tailored to specific installation types — domestic consumer unit upgrades, commercial distribution boards, EV charger installations, and more.',
  'Get step-by-step functional test guidance for every circuit type, with expected readings, pass/fail criteria, and BS 7671 regulation references.',
  'Produce professional commissioning documentation that feeds directly into your EIC, EICR, or minor works certificate.',
  'The AI understands BS 7671:2018+A3:2024 test sequences and follows the correct order of initial verification as specified in GN3.',
  'Built specifically for UK electrical installations — covers TN-S, TN-C-S, and TT earthing systems with the correct commissioning procedures for each.',
];

const faqs = [
  {
    question: 'What does the AI Commissioning Specialist actually do?',
    answer:
      'The AI Commissioning Specialist generates tailored commissioning checklists, provides step-by-step functional test guidance, and helps produce the documentation required when handing over an electrical installation. You describe the installation — for example, "new 18-way consumer unit with 12 RCBOs, TN-C-S supply, domestic dwelling with EV charger and solar PV" — and the AI generates a complete commissioning checklist covering every test and verification step required by BS 7671 and GN3. For each step, it provides the expected readings, the instruments to use, and the pass/fail criteria. It also produces a structured commissioning record that maps directly onto the schedule of test results section of an EIC.',
  },
  {
    question: 'Does the commissioning checklist follow BS 7671 test sequences?',
    answer:
      'Yes. The AI follows the correct initial verification test sequence as specified in BS 7671 Chapter 64 and IET Guidance Note 3 (9th Edition). Tests are generated in the correct order: continuity of protective conductors (including main and supplementary bonding), continuity of ring final circuit conductors, insulation resistance, secure isolation verification, polarity, earth electrode resistance (for TT systems), earth fault loop impedance, prospective fault current, and RCD operation. The AI understands that performing tests out of sequence can give misleading results — for example, testing earth fault loop impedance before verifying insulation resistance could damage the test instrument or give incorrect readings on a faulty circuit.',
  },
  {
    question: 'Can the AI generate commissioning checklists for EV charger installations?',
    answer:
      'Yes. EV charger commissioning has specific requirements beyond a standard final circuit. The AI generates a checklist that includes: verification of the earthing arrangement (PME earthing restrictions may apply under Engineering Recommendation G12/4), RCD type verification (Type A minimum, Type B where the charger manufacturer specifies it for DC fault current protection), load management system testing (if fitted), OCPP communication verification (for networked chargers), time-of-use tariff configuration testing, and functional testing of the charge point including emergency stop operation and cable retention mechanisms. The checklist also covers the specific IET Code of Practice for Electric Vehicle Charging Equipment Installation requirements.',
  },
  {
    question: 'How does the documentation support work?',
    answer:
      'The AI Commissioning Specialist produces structured documentation that maps directly onto the standard electrical certification forms. After you complete commissioning, the AI helps you populate the schedule of test results with your recorded readings, generates a commissioning summary report, and produces handover documentation for the client. The documentation includes a clear record of what was tested, the results obtained, any remedial work identified during commissioning, and confirmation that the installation meets the design specification. This documentation can be exported as a PDF or transferred directly into the Elec-Mate certification system for EIC, EICR, or minor works certificates.',
  },
  {
    question: 'Does the AI cover three-phase commissioning procedures?',
    answer:
      'Yes. For three-phase installations, the AI generates additional commissioning steps including: phase rotation verification (critical for motor installations where incorrect rotation can cause damage), phase balance measurement across all three phases and neutral, voltage measurement between all phase combinations (L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N), and three-phase RCD operation testing. For commercial distribution boards, the commissioning checklist includes busbar connection torque verification, metering system calibration checks, power factor correction equipment testing, and automatic changeover switch operation where standby generation is installed.',
  },
  {
    question: 'Can I customise the commissioning checklist for specific installation types?',
    answer:
      'Yes. The AI adapts the commissioning checklist to the specific installation you describe. A simple domestic consumer unit upgrade generates a focused checklist covering the essential initial verification tests and functional checks. A commercial distribution board installation generates a more comprehensive checklist that includes additional items such as discrimination verification between protective devices, busbar connection integrity, metering accuracy, and emergency lighting functional tests. You can also add custom checklist items for site-specific requirements — for example, if the principal contractor requires specific commissioning steps or if the client specification includes non-standard tests.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-installation-specialist',
    title: 'AI Installation Specialist',
    description:
      'Step-by-step installation guidance for cable routing, containment, first fix, second fix, and testing procedures.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/tools/ai-fault-diagnosis',
    title: 'AI Fault Diagnosis',
    description:
      'Diagnose electrical faults by describing symptoms in plain English. Ranked probable causes with test sequences.',
    icon: Search,
    category: 'Tool',
  },
  {
    href: '/tools/ai-circuit-designer',
    title: 'AI Circuit Designer',
    description:
      'Design complete electrical circuits with automatic cable sizing, protection device selection, and voltage drop verification.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the 18th Edition of the IET Wiring Regulations including Amendment 3:2024.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with structured training covering all testing procedures and commissioning requirements.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate',
    description:
      'Complete Electrical Installation Condition Reports digitally with auto-populated schedules of test results.',
    icon: ClipboardCheck,
    category: 'Tool',
  },
];

const features = [
  {
    icon: ClipboardCheck,
    title: 'Tailored Checklists',
    description:
      'Generate commissioning checklists specific to your installation type. Domestic, commercial, industrial, EV chargers, solar PV — each gets the correct test sequence.',
  },
  {
    icon: Gauge,
    title: 'Functional Test Guidance',
    description:
      'Step-by-step instructions for every functional test with expected readings, pass/fail criteria, and the correct instrument to use for each measurement.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671 Test Sequences',
    description:
      'Tests generated in the correct order as specified in BS 7671 Chapter 64 and GN3. No risk of incorrect sequencing giving misleading results.',
  },
  {
    icon: FileText,
    title: 'Documentation Generation',
    description:
      'Produce commissioning records that map directly onto the EIC schedule of test results. Export as PDF or transfer into the Elec-Mate certification system.',
  },
  {
    icon: Bot,
    title: 'Conversational Follow-Up',
    description:
      'Ask the AI about unexpected readings, borderline results, or specific regulation requirements during commissioning. Get immediate, contextual answers.',
  },
  {
    icon: Brain,
    title: 'Installation-Specific Knowledge',
    description:
      'Understands EV charger commissioning, solar PV systems, battery storage, three-phase installations, and emergency lighting — each with their specific test requirements.',
  },
];

const howToSteps = [
  {
    name: 'Describe the installation',
    text: 'Enter a description of the installation to be commissioned — the type of property, the consumer unit or distribution board specification, the circuits installed, and the earthing system.',
  },
  {
    name: 'Review the commissioning checklist',
    text: 'The AI generates a complete commissioning checklist in the correct BS 7671 test sequence. Review each step and confirm it matches the installation.',
  },
  {
    name: 'Follow the functional test guidance',
    text: 'Work through each test step with the AI providing expected readings, instrument settings, and pass/fail criteria for every measurement.',
  },
  {
    name: 'Record your results',
    text: 'Enter your test results as you go. The AI flags any readings that are outside expected parameters and suggests remedial actions.',
  },
  {
    name: 'Generate commissioning documentation',
    text: 'Export the completed commissioning record as a PDF or transfer the results directly into your EIC, EICR, or minor works certificate.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-commissioning',
    heading: 'What Is the AI Commissioning Specialist?',
    content: (
      <>
        <p>
          The AI Commissioning Specialist is one of eight specialist Elec-AI agents built into the
          Elec-Mate platform. It is designed to guide electricians through the complete
          commissioning process for any electrical installation, from a simple domestic consumer
          unit upgrade to a complex three-phase commercial distribution system.
        </p>
        <p>
          Commissioning is the critical final stage of any electrical installation. It is the
          process of verifying that every circuit has been installed correctly, that all protective
          devices operate within their specified parameters, and that the installation as a whole is
          safe to energise and hand over to the client. Poor commissioning leads to unsafe
          installations, failed inspections, and costly return visits. The AI Commissioning
          Specialist eliminates these problems by ensuring you follow a systematic,
          standards-compliant commissioning process every time.
        </p>
        <p>
          Unlike a generic checklist template, this AI agent understands the specific requirements
          of each installation type. An{' '}
          <SEOInternalLink href="/tools/ai-circuit-designer">AI-designed circuit</SEOInternalLink>{' '}
          with an EV charger has different commissioning requirements than a standard domestic
          rewire. A three-phase commercial distribution board requires phase rotation verification
          and load balance checks that are not relevant to single-phase domestic work. The AI adapts
          the checklist and guidance to match exactly what you have installed.
        </p>
        <p>
          The Commissioning Specialist works alongside the other Elec-AI agents. Circuit designs
          from the{' '}
          <SEOInternalLink href="/tools/ai-circuit-designer">Circuit Designer</SEOInternalLink> can
          be fed directly into the Commissioning Specialist, which then generates a commissioning
          plan that matches the design specification exactly. Completed commissioning results flow
          into the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">certification system</SEOInternalLink>{' '}
          without re-entering data.
        </p>
      </>
    ),
  },
  {
    id: 'checklist-generation',
    heading: 'Commissioning Checklist Generation',
    content: (
      <>
        <p>
          The core capability of the AI Commissioning Specialist is generating tailored
          commissioning checklists. You describe the installation, and the AI produces a
          comprehensive checklist covering every verification step, functional test, and
          documentation requirement.
        </p>
        <p>
          The checklist follows the initial verification test sequence specified in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Chapter 64 and IET Guidance Note 3. This means tests are listed in the correct order:
          continuity of protective conductors first, then ring final circuit continuity, insulation
          resistance, polarity, earth electrode resistance (for TT systems), earth fault loop
          impedance, prospective fault current, and finally RCD operation. The AI also includes
          pre-commissioning checks such as visual inspection of connections, torque verification on
          terminals, and confirmation that all circuit identifications are correct.
        </p>
        <p>
          For specialist installations, the checklist extends beyond the standard initial
          verification tests. EV charger installations include RCD type verification, load
          management system testing, and charge point functional testing. Solar PV installations
          include inverter commissioning, DC string voltage verification, and G98/G99 compliance
          checks. Emergency lighting installations include duration testing, lux level measurement,
          and central battery system verification. Fire alarm installations include zone testing,
          sounder output measurement, and cause-and-effect verification.
        </p>
        <SEOAppBridge
          title="Generate your commissioning checklist"
          description="Open the Commissioning Specialist in Elec-Mate, describe the installation, and get a tailored commissioning checklist in seconds. Every test in the correct BS 7671 sequence."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'functional-testing',
    heading: 'Functional Test Guidance',
    content: (
      <>
        <p>
          Beyond the initial verification tests, the Commissioning Specialist provides detailed
          functional test guidance for every type of equipment in the installation. Functional
          testing confirms that the installation not only passes the electrical safety tests but
          actually operates as intended.
        </p>
        <p>
          For each functional test, the AI provides: the purpose of the test, the method (step by
          step), the instrument or procedure required, the expected result for a correctly installed
          system, and the action to take if the result is outside the expected range. This is
          particularly valuable for less common installation types where the electrician may not
          commission that specific equipment regularly.
        </p>
        <p>
          The AI covers functional testing for consumer units and distribution boards (MCB and RCBO
          operation, main switch operation, SPD indicator verification), RCD protection (30 mA trip
          time testing at 1x, 5x, and ramp test), EV charging equipment (charge initiation, load
          management, earth monitoring), fire alarm systems (zone identification, sounder operation,
          cause and effect), emergency lighting (changeover testing, duration testing, lux level
          verification), and{' '}
          <SEOInternalLink href="/tools/ai-installation-specialist">
            specialist installations
          </SEOInternalLink>{' '}
          such as data cabling, access control, and CCTV systems.
        </p>
        <p>
          The guidance references the correct{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 regulations
          </SEOInternalLink>{' '}
          for each test, so you can verify the AI's recommendations against the standard and cite
          the regulation on your certification documents.
        </p>
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Commissioning Documentation Support',
    content: (
      <>
        <p>
          Proper commissioning documentation is essential for demonstrating compliance and providing
          a clear record of what was tested and what results were obtained. The AI Commissioning
          Specialist helps you produce professional commissioning documentation that meets the
          requirements of BS 7671 and feeds directly into your certification.
        </p>
        <p>
          The documentation includes a commissioning summary report (listing all tests performed,
          results obtained, and any observations or remedial items), a schedule of test results
          formatted to match the EIC or EICR schedule, and a handover pack for the client including
          operating instructions, maintenance guidance, and a record of the as-installed
          configuration.
        </p>
        <p>
          For commercial installations, the documentation extends to include commissioning
          certificates for specialist systems (fire alarm, emergency lighting, access control),
          discrimination verification records (confirming that protective devices are coordinated to
          disconnect the correct circuit in a fault condition), and compliance matrices showing how
          the installation meets the client specification and the relevant British Standards.
        </p>
        <p>
          The <SEOInternalLink href="/tools/ai-report-writer">AI Report Writer</SEOInternalLink> can
          take the commissioning data and produce a professional summary report for the client,
          translating the technical test results into clear, non-technical language that explains
          what was tested and confirms that the installation is safe and compliant.
        </p>
        <SEOAppBridge
          title="Professional commissioning records in minutes"
          description="Complete your commissioning in the app and export professional documentation instantly. Test results flow directly into your EIC or EICR — no double data entry."
          icon={FileText}
        />
      </>
    ),
  },
  {
    id: 'bs7671-compliance',
    heading: 'BS 7671 Compliance in Commissioning',
    content: (
      <>
        <p>
          Every aspect of the AI Commissioning Specialist is aligned with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and IET Guidance Note 3 (Inspection and Testing, 9th Edition). The AI references specific
          regulations throughout the commissioning process so you can verify every recommendation
          against the published standard.
        </p>
        <p>
          Chapter 64 of BS 7671 sets out the requirements for initial verification, which is the
          commissioning process for new installations and alterations. Regulation 641.1 requires
          that every installation shall, during erection and on completion before being put into
          service, be inspected and tested to verify that the requirements of the Regulations have
          been met. The AI ensures that your commissioning process covers all the requirements of
          Chapter 64.
        </p>
        <p>
          Amendment 3:2024 adds Regulation 530.3.201 covering bidirectional and unidirectional
          protective devices. For installations with solar PV, battery storage, or other sources of
          reverse power flow, the Commissioning Specialist includes verification steps to confirm
          that the installed protective devices are suitable for the direction of energy flow — a
          critical safety check that older commissioning procedures may not include.
        </p>
        <p>
          The AI also references the{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
            GN3 test procedures
          </SEOInternalLink>{' '}
          and the IET On-Site Guide for practical guidance on test methods, instrument settings, and
          result interpretation. Every commissioning step includes the relevant regulation number so
          you can cite it on your certification documentation.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AICommissioningSpecialistPage() {
  return (
    <ToolTemplate
      title="AI Commissioning Specialist | Electrical Guidance"
      description="Commission electrical installations with AI tailored for UK work. Generates tailored commissioning checklists, functional test guidance, and documentation to BS 7671:2018+A3:2024. Part of 8 specialist Elec-AI agents."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Commissioning Agent"
      badgeIcon={Brain}
      heroTitle={
        <>
          AI Commissioning Specialist:{' '}
          <span className="text-yellow-400">Systematic Commissioning, Every Time</span>
        </>
      }
      heroSubtitle="Generate tailored commissioning checklists, follow step-by-step functional test guidance, and produce professional commissioning documentation — all aligned with BS 7671:2018+A3:2024 and GN3 test sequences."
      heroFeaturePills={[
        { icon: ClipboardCheck, label: 'Tailored Checklists' },
        { icon: Gauge, label: 'Functional Testing' },
        { icon: FileText, label: 'Documentation' },
        { icon: ShieldCheck, label: 'BS 7671 Compliant' },
      ]}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Commissioning Features"
      featuresSubheading="Purpose-built for UK electricians. Every feature ensures your commissioning process is thorough, systematic, and standards-compliant."
      howToSteps={howToSteps}
      howToHeading="How to Use the AI Commissioning Specialist"
      howToDescription="Five steps from installation description to completed commissioning documentation."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About AI Commissioning"
      relatedPages={relatedPages}
      ctaHeading="Commission Installations with Confidence"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Commissioning Specialist. Tailored checklists, functional test guidance, and professional documentation. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-commissioning-specialist"
    />
  );
}
