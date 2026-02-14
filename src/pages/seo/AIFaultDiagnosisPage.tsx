import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Brain,
  Zap,
  Search,
  Wrench,
  ListChecks,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Bot,
  Lightbulb,
  Cable,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Fault Diagnosis', href: '/tools/ai-fault-diagnosis' },
];

const tocItems = [
  { id: 'what-is-fault-diagnosis', label: 'What Is AI Fault Diagnosis?' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'pattern-recognition', label: 'Pattern Recognition' },
  { id: 'bs7671-references', label: 'BS 7671 References' },
  { id: 'real-world-scenarios', label: 'Real-World Scenarios' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Describe any electrical fault in plain English and get a ranked list of probable causes with suggested test sequences to confirm each one.',
  'Every diagnosis includes specific BS 7671 regulation references so you can verify the reasoning and cite the correct standard.',
  'The AI suggests the exact test instruments and measurements needed to confirm or rule out each potential cause, following GN3 test sequences.',
  'Wiring diagram analysis lets you photograph or describe circuit configurations, and the AI identifies potential fault paths and weak points.',
  'Built specifically for UK electrical installations — the AI understands TN-S, TN-C-S, and TT earthing systems, UK cable types, and British Standards.',
];

const faqs = [
  {
    question: 'How does the AI Fault Diagnosis tool work?',
    answer:
      'You describe the fault symptoms in plain English — for example, "RCD trips when the immersion heater is turned on but only when it has been running for about 20 minutes" — and the AI analyses the symptoms against its knowledge of electrical fault patterns. It produces a ranked list of probable causes (in this example: degraded immersion heater element insulation that breaks down when hot, moisture ingress into the element connections, or a failing thermostat causing overheating and insulation breakdown). For each probable cause, the AI suggests the specific tests to confirm or rule it out, including the test instrument to use, the expected readings for a healthy circuit, and the readings that would confirm the fault.',
  },
  {
    question: 'Is the AI trained on UK electrical installations specifically?',
    answer:
      'Yes. The Fault Diagnosis AI is trained specifically on UK electrical installations, UK cable types (6242Y, 6243Y, SWA, MICC, FP200), UK earthing systems (TN-S, TN-C-S, TT), UK protective device types (BS EN 60898 MCBs, BS EN 61009 RCBOs, BS EN 61008 RCDs), and UK wiring practices. It understands the specific fault patterns that occur in UK domestic, commercial, and industrial installations, including common issues with PME earthing, the particular failure modes of rewireable fuses, and the characteristic problems of older wiring systems such as lead-sheathed cables and rubber-insulated conductors. All regulation references are to BS 7671:2018+A3:2024.',
  },
  {
    question: 'Can the AI diagnose intermittent faults?',
    answer:
      'Yes, and intermittent faults are where the AI is most valuable. Intermittent faults — such as an RCD that trips occasionally, a circuit breaker that trips under certain load conditions, or lights that flicker at specific times of day — are notoriously difficult to diagnose because the fault may not be present when you are testing. The AI considers factors such as thermal effects (faults that appear only when conductors are warm and resistance increases), moisture ingress (faults that appear in wet weather or after rain), load-dependent faults (problems that only manifest at full load), and time-dependent deterioration (insulation breakdown that worsens gradually). It suggests targeted test strategies such as timed insulation resistance monitoring, load testing to replicate fault conditions, and thermal imaging to identify hotspots.',
  },
  {
    question: 'Does it suggest a test sequence or just a list of possible causes?',
    answer:
      'It provides both. The AI produces a ranked list of probable causes ordered by likelihood based on the symptoms described, and for each cause it provides a specific test sequence. The test sequence follows a logical diagnostic progression — starting with the simplest, quickest, and least invasive test that will confirm or rule out the most likely cause, then working through to more involved tests for less likely causes. Each test specifies the instrument to use (insulation resistance tester, earth fault loop impedance tester, RCD tester, multimeter, thermal imaging camera, etc.), the measurement to take, the expected value for a healthy circuit, and the value that would indicate the suspected fault. This mirrors the systematic approach taught on C&G 2391 inspection and testing courses.',
  },
  {
    question: 'Can I use it for three-phase fault diagnosis?',
    answer:
      'Yes. The Fault Diagnosis AI handles single-phase and three-phase fault diagnosis. For three-phase systems, it understands phase imbalance faults, neutral conductor failures (which can cause dangerous overvoltage on lightly loaded phases), phase rotation errors, harmonic distortion issues from non-linear loads, and the specific fault patterns associated with star and delta configurations. It also covers faults in three-phase motors including winding insulation breakdown, bearing failure causing increased current draw, and supply-side issues such as single-phasing due to a blown fuse on one phase. For commercial and industrial installations, it accounts for the more complex protection schemes involving MCCBs, ACBs, and discrimination requirements.',
  },
  {
    question: 'How is this different from just searching the internet for fault causes?',
    answer:
      'A web search gives you generic information that may or may not apply to your specific situation. The Fault Diagnosis AI analyses the specific combination of symptoms you describe and cross-references them against known fault patterns in UK electrical installations. It considers multiple interacting factors — the type of circuit, the earthing system, the age of the installation, the specific symptoms and their timing — to produce a diagnosis tailored to your exact situation. It also provides test sequences in the correct order of priority, which a generic web page cannot do because it does not know your specific circumstances. Additionally, every diagnosis includes specific BS 7671 regulation references, so you are not relying on forum posts or unverified advice.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-regulations-lookup',
    title: 'AI Regulations Lookup',
    description:
      'Search BS 7671 in plain English. Get the specific regulation number, text, and practical guidance for any electrical question.',
    icon: Search,
    category: 'Tool',
  },
  {
    href: '/tools/ai-tutor',
    title: 'AI Tutor for Electricians',
    description:
      'Get any regulation or concept explained in plain English. Practice questions and exam preparation for C&G 2391 and 18th Edition.',
    icon: GraduationCap,
    category: 'Tool',
  },
  {
    href: '/tools/ai-installation-specialist',
    title: 'AI Installation Specialist',
    description:
      'Step-by-step installation guidance for cable routing, containment, first fix, second fix, and testing procedures.',
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
      'Study for C&G 2391 with structured training courses covering all testing procedures and fault-finding techniques.',
    icon: GraduationCap,
    category: 'Training',
  },
];

const features = [
  {
    icon: Brain,
    title: 'AI Pattern Recognition',
    description:
      'The AI cross-references your symptom description against thousands of documented fault patterns in UK electrical installations to identify the most probable causes.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671 Regulation References',
    description:
      'Every diagnosis includes specific regulation references from BS 7671:2018+A3:2024 so you can verify the reasoning and cite the correct standard on your report.',
  },
  {
    icon: ListChecks,
    title: 'Suggested Test Sequence',
    description:
      'For each probable cause, the AI provides a step-by-step test sequence specifying the instrument, measurement, expected values, and fault-confirming readings.',
  },
  {
    icon: Cable,
    title: 'Wiring Diagram Analysis',
    description:
      'Describe or photograph the circuit configuration and the AI identifies potential fault paths, weak points, and areas that require focused investigation.',
  },
  {
    icon: Zap,
    title: 'Intermittent Fault Strategies',
    description:
      'Purpose-built diagnostic approaches for intermittent faults including thermal effects, moisture ingress, load-dependent failures, and time-dependent deterioration.',
  },
  {
    icon: Bot,
    title: 'Conversational Follow-Up',
    description:
      'After the initial diagnosis, continue the conversation. Report your test results and the AI refines the diagnosis, narrowing down causes based on real measurements.',
  },
];

const howToSteps = [
  {
    name: 'Describe the fault symptoms',
    text: 'Enter a plain-English description of the fault. Include the symptoms, when they occur, which circuits are affected, and any relevant details about the installation such as the earthing system and age of the wiring.',
  },
  {
    name: 'Review the ranked diagnosis',
    text: 'The AI returns a ranked list of probable causes ordered by likelihood. Each cause includes an explanation of why it matches the symptoms and the relevant BS 7671 regulation references.',
  },
  {
    name: 'Follow the test sequence',
    text: 'For the most likely cause, follow the suggested test sequence using the specified instruments. The AI tells you what readings to expect if the diagnosis is correct.',
  },
  {
    name: 'Report results and refine',
    text: 'Enter your test results back into the conversation. The AI confirms or refines the diagnosis based on your actual measurements, then suggests the next test if needed.',
  },
  {
    name: 'Get the fix recommendation',
    text: 'Once the fault is confirmed, the AI provides a recommended fix with materials, BS 7671 compliance requirements, and testing procedures to verify the repair.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-fault-diagnosis',
    heading: 'What Is AI Fault Diagnosis for Electricians?',
    content: (
      <>
        <p>
          The AI Fault Diagnosis tool is one of eight specialist Elec-AI agents built into the
          Elec-Mate platform. It is trained specifically for UK electrical installations and
          designed to help electricians diagnose faults faster and more systematically. You describe
          the fault symptoms in plain English, and the AI analyses the description against its
          knowledge of electrical fault patterns to produce a ranked list of probable causes with
          suggested test sequences for each.
        </p>
        <p>
          Fault diagnosis is one of the most skill-intensive parts of electrical work. An
          experienced electrician draws on years of pattern recognition — they have seen similar
          symptoms before and know which tests to run first. A less experienced electrician, or one
          encountering an unusual fault for the first time, may spend hours working through
          possibilities systematically. The AI Fault Diagnosis tool gives every electrician access
          to that pattern recognition capability, drawing on a comprehensive database of fault
          scenarios across domestic, commercial, and industrial{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          compliant installations.
        </p>
        <p>
          Unlike a generic chatbot or web search, this tool understands the specific characteristics
          of UK electrical installations. It knows the difference between TN-S, TN-C-S, and TT
          earthing systems and how each affects fault behaviour. It understands the failure modes of
          specific UK cable types like 6242Y twin and earth, SWA armoured cable, and MICC mineral
          insulated cable. It knows the operating characteristics of BS EN 60898 MCBs, BS EN 61009
          RCBOs, and BS EN 61008 RCDs, and how their behaviour relates to different fault types.
        </p>
        <p>
          The tool is not a replacement for the electrician's skill and judgement — it is a force
          multiplier. It helps you consider causes you might not have thought of, suggests tests in
          the most efficient order, and provides{' '}
          <SEOInternalLink href="/tools/ai-regulations-lookup">
            regulation references
          </SEOInternalLink>{' '}
          that support your professional conclusions.
        </p>
      </>
    ),
  },
  {
    id: 'how-it-works',
    heading: 'How the AI Fault Diagnosis Tool Works',
    content: (
      <>
        <p>
          The diagnostic process follows a structured approach that mirrors the systematic
          fault-finding methodology taught on{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
            C&G 2391 inspection and testing courses
          </SEOInternalLink>
          . You provide the symptoms, the AI generates hypotheses, and then guides you through the
          testing process to confirm the diagnosis.
        </p>
        <p>
          When you describe a fault, the AI extracts key diagnostic indicators from your
          description: which circuits are affected, when the fault occurs (constantly,
          intermittently, under specific load conditions, in certain weather, at certain times),
          what the symptoms are (tripping, overheating, voltage anomalies, physical damage), and
          what is known about the installation (age, earthing system, cable types, previous work).
          It then cross-references these indicators against its database of fault patterns to
          produce a differential diagnosis — a ranked list of possible causes ordered by
          probability.
        </p>
        <p>
          For each possible cause, the AI provides: a clear explanation of why it matches the
          reported symptoms, the specific BS 7671 regulations that are relevant, the test or
          measurement that would confirm it, the instrument required (insulation resistance tester,
          loop impedance tester, RCD tester, clamp meter, thermal camera, etc.), and the expected
          results for both a healthy circuit and the suspected fault condition.
        </p>
        <SEOAppBridge
          title="Diagnose your next fault in minutes"
          description="Open the Fault Diagnosis agent in Elec-Mate, describe the symptoms, and get a ranked diagnosis with test sequences. Works offline on site — no signal needed."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'pattern-recognition',
    heading: 'AI Pattern Recognition for Electrical Faults',
    content: (
      <>
        <p>
          The AI draws on a comprehensive library of electrical fault patterns specific to UK
          installations. These patterns are categorised by fault type, circuit type, earthing
          system, and installation age — allowing the AI to weight its diagnosis based on the
          specific context of your installation.
        </p>
        <p>
          Common fault patterns the AI recognises include: insulation resistance degradation in
          ageing cables (particularly rubber-insulated wiring from pre-1970 installations and early
          PVC cables), nuisance RCD tripping caused by cumulative earth leakage across multiple
          circuits, high earth fault loop impedance on long cable runs in TT earthing systems,
          neutral-earth faults in{' '}
          <SEOInternalLink href="/guides/earthing-arrangements-uk">
            TN-C-S (PME) systems
          </SEOInternalLink>{' '}
          causing voltage on exposed metalwork, and overloaded circuits where diversity assumptions
          have been exceeded.
        </p>
        <p>
          For intermittent faults — the most challenging category — the AI applies specific
          diagnostic strategies. It considers thermal cycling effects (faults that appear when
          conductors warm up under load and disappear when they cool), moisture-related faults
          (problems that correlate with rainfall, humidity, or condensation cycles), vibration-
          induced faults (loose connections that fail intermittently), and degradation faults
          (issues that gradually worsen over time, such as corroding connections or slowly failing
          insulation).
        </p>
        <p>
          The AI also understands the interaction between different parts of the installation. A
          fault on one circuit can affect other circuits — for example, a neutral conductor fault in
          a shared neutral arrangement can cause overvoltage on connected equipment, or a high-
          resistance earth connection can cause multiple RCDs to trip simultaneously. The AI
          considers these systemic interactions when building its diagnosis.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-references',
    heading: 'BS 7671 References in Every Diagnosis',
    content: (
      <>
        <p>
          Every diagnosis from the AI Fault Diagnosis tool includes specific references to{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          . This is not decorative — it serves three practical purposes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verification:</strong> You can check the AI's reasoning against the actual
                regulation text. If the AI says an installation does not comply with Regulation
                411.3.3 (additional protection by RCD), you can look up that regulation and confirm
                it applies to your situation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation:</strong> When you record the fault on an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  EICR or inspection report
                </SEOInternalLink>
                , you need to cite the relevant regulation. The AI provides the correct regulation
                number for each observation, making report writing faster and more accurate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Client communication:</strong> When explaining a fault to a client or
                landlord, citing the specific regulation adds authority to your recommendation. The{' '}
                <SEOInternalLink href="/tools/ai-client-explainer">
                  AI Client Explainer
                </SEOInternalLink>{' '}
                can then translate the technical finding into plain English for the customer.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The AI references the complete BS 7671:2018+A3:2024 including Amendment 3 (issued July
          2024), which adds Regulation 530.3.201 for bidirectional and unidirectional protective
          devices. It also references GN3 (Guidance Note 3: Inspection and Testing, 9th Edition) for
          test procedures and the IET On-Site Guide for practical installation guidance.
        </p>
      </>
    ),
  },
  {
    id: 'real-world-scenarios',
    heading: 'Real-World Fault Diagnosis Scenarios',
    content: (
      <>
        <p>
          To illustrate how the AI Fault Diagnosis tool works in practice, here are three common
          scenarios that electricians encounter regularly.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Scenario 1: RCD Tripping When Shower Is Used
            </h4>
            <p className="text-white text-sm leading-relaxed">
              The customer reports that the RCD trips whenever the electric shower has been running
              for about 15-20 minutes. The AI identifies the most likely cause as degraded heating
              element insulation that breaks down when hot — the insulation resistance falls below
              the threshold as the element heats up, causing earth leakage current that exceeds the
              30 mA RCD trip threshold. Suggested test: insulation resistance test on the shower
              circuit with the element disconnected (should exceed 1 megohm), then reconnected. If
              the IR is marginal at ambient temperature, run the shower and re-test while warm.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Scenario 2: Flickering Lights on One Circuit
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Lights on a single circuit flicker intermittently, worse when the central heating
              boiler is running. The AI considers: loose neutral connection at the consumer unit
              (most likely, especially if the flicker correlates with other loads switching), high-
              resistance connection in the lighting circuit (loose terminal), or neutral conductor
              damage in the cable. Suggested first test: voltage measurement at the light fitting
              while the fault is occurring — voltage fluctuation confirms a high-resistance
              connection in the circuit. Then systematic continuity testing of the neutral
              conductor.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Scenario 3: MCB Tripping Under Load</h4>
            <p className="text-white text-sm leading-relaxed">
              A 32A Type B MCB protecting a ring final circuit trips when multiple appliances are
              used simultaneously. The AI considers: overloaded circuit exceeding the MCB rating
              (most likely — check diversity calculation against actual connected load), broken ring
              (circuit running as two radials with reduced capacity), or a developing fault causing
              increased current draw. Suggested first test: ring circuit continuity test (R1, Rn,
              R2) to verify the ring is complete, then clamp meter measurement of actual load
              current.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Try it with your current fault"
          description="Got a tricky fault right now? Open the Fault Diagnosis agent and describe the symptoms. The AI will produce a diagnosis with test sequences in under 30 seconds."
          icon={Lightbulb}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AIFaultDiagnosisPage() {
  return (
    <ToolTemplate
      title="AI Fault Diagnosis Tool | Electrical Troubleshooting"
      description="Diagnose electrical faults with AI trained for UK installations. Describe symptoms in plain English, get ranked probable causes with BS 7671 references, suggested test sequences, and recommended fixes."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Diagnostic Agent"
      badgeIcon={Brain}
      heroTitle={
        <>
          AI Fault Diagnosis:{' '}
          <span className="text-yellow-400">Describe the Symptoms, Get the Diagnosis</span>
        </>
      }
      heroSubtitle="Describe any electrical fault in plain English. The AI analyses the symptoms against thousands of documented fault patterns in UK installations, returns a ranked list of probable causes with BS 7671 references, and guides you through the test sequence to confirm the diagnosis."
      heroFeaturePills={[
        { icon: Brain, label: 'Pattern Recognition' },
        { icon: ShieldCheck, label: 'BS 7671 References' },
        { icon: ListChecks, label: 'Test Sequences' },
        { icon: Cable, label: 'Wiring Analysis' },
      ]}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Fault Diagnosis Features"
      featuresSubheading="Purpose-built for UK electricians. Every feature is designed to help you find faults faster and diagnose them correctly."
      howToSteps={howToSteps}
      howToHeading="How to Use the AI Fault Diagnosis Tool"
      howToDescription="Five steps from fault symptoms to confirmed diagnosis and recommended fix."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About AI Fault Diagnosis"
      relatedPages={relatedPages}
      ctaHeading="Diagnose Faults Faster with AI"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Fault Diagnosis agent. Describe symptoms, get a ranked diagnosis with test sequences. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-fault-diagnosis"
    />
  );
}
