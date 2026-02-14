import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wrench,
  Cable,
  Brain,
  ShieldCheck,
  FileText,
  Lightbulb,
  GraduationCap,
  Search,
  ClipboardCheck,
  Bot,
  Layers,
  TestTube,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Installation Specialist', href: '/tools/ai-installation-specialist' },
];

const tocItems = [
  { id: 'what-is-installation-specialist', label: 'What Is the AI Installation Specialist?' },
  { id: 'cable-routing', label: 'Cable Routing Guidance' },
  { id: 'containment-systems', label: 'Containment Systems' },
  { id: 'first-second-fix', label: 'First Fix and Second Fix' },
  { id: 'testing-procedures', label: 'Testing Procedures' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Get step-by-step installation guidance for any electrical task, from consumer unit upgrades to full rewires, with BS 7671 references at every step.',
  'Cable routing guidance covers safe zones, depth requirements, notching and drilling rules for joists, and fire stopping at compartment boundaries.',
  'Containment system selection including trunking fill calculations, conduit sizing, cable tray load ratings, and appropriate fixings for each application.',
  'First fix and second fix checklists with the correct sequence of operations and inspection points to avoid costly rework.',
  'Testing procedure guidance follows GN3 (Guidance Note 3: Inspection and Testing, 9th Edition) with the correct test sequence and expected results.',
];

const faqs = [
  {
    question: 'What kind of installation guidance does the AI provide?',
    answer:
      'The AI Installation Specialist provides step-by-step guidance for any electrical installation task. This includes consumer unit upgrades and replacements, full and partial rewires, additional circuit installations (ring finals, radials, lighting, cooker, shower, EV charger), cable routing and containment selection, distribution board installations for commercial premises, outdoor installations and garden supplies, fire alarm and emergency lighting systems, and solar PV and battery storage installations. For each task, the AI provides a detailed sequence of operations with BS 7671 regulation references, material specifications, testing requirements, and common pitfalls to avoid. The guidance adapts to the specific context you describe — a consumer unit upgrade in a 1960s terraced house gets different advice from a new-build detached house.',
  },
  {
    question: 'How does the cable routing guidance work?',
    answer:
      'When you describe a cable installation, the AI provides routing guidance based on BS 7671 Chapter 52 and the IET On-Site Guide. This includes the safe zone rules (Regulation 522.6.100 to 522.6.103) — where cables can be installed within walls and partitions without additional mechanical protection, and where they require protection or must be installed at specific depths. The AI covers notching and drilling rules for floor and ceiling joists (the structural limits from Building Regulations Approved Document A), the requirements for fire stopping at compartment boundaries (Building Regulations Approved Document B), and the derating factors that apply when cables are grouped together, pass through thermal insulation, or are installed in high ambient temperatures. It also advises on the practical aspects — the most efficient routing for a given building layout, where to position junction boxes for accessibility, and how to manage cable bends to avoid exceeding minimum bend radii.',
  },
  {
    question: 'Does it cover containment system selection and sizing?',
    answer:
      'Yes. The AI helps you select the appropriate containment system for your installation and verify that it is correctly sized. For trunking, it calculates the fill factor using the cable factor method from the IET On-Site Guide — ensuring that the total cable factors of all cables in the trunking do not exceed 45% of the trunking internal cross-sectional area. For conduit, it uses the conduit factor tables to determine the correct conduit size for the number and size of cables. For cable tray, it considers the load rating, the support spacing, and whether the cables will be clipped to the tray (clipped direct) or laid on the tray (touching). The AI also advises on the fixings appropriate to each containment type and wall construction — different fixings for masonry, plasterboard, steel framing, and timber framing.',
  },
  {
    question: 'Can it guide me through a complete consumer unit upgrade?',
    answer:
      'Yes. The AI provides a complete step-by-step guide for a consumer unit upgrade, covering: pre-work assessment (checking the existing installation, identifying the earthing system, assessing the condition of existing cables), notification requirements under Part P of the Building Regulations, safe isolation of the supply, removal of the existing consumer unit, preparation for the new unit (main switch sizing, circuit allocation, SPD requirements under Section 443), cable connection and termination (correct torque settings, conductor identification, circuit labelling), testing in the correct sequence (continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, prospective fault current, RCD operation), and certification (producing the Electrical Installation Certificate with schedule of inspections and schedule of test results). Each step includes the relevant BS 7671 regulation references.',
  },
  {
    question: 'Does the testing guidance follow GN3?',
    answer:
      'Yes. The testing procedure guidance follows the sequence specified in IET Guidance Note 3: Inspection and Testing (9th Edition, aligned with the 18th Edition). The correct test sequence is: continuity of protective conductors (including main protective bonding conductors and circuit protective conductors), continuity of ring final circuit conductors (the figure-of-eight test for rings), insulation resistance (at 500V DC for circuits up to 500V), secure isolation (SELV and PELV circuits), basic protection (barrier and enclosure testing), polarity, earth fault loop impedance (measured or calculated), prospective fault current, functional testing (including RCD testing at rated current, 5x rated current, and ramp test). For each test, the AI specifies the instrument to use, the connections to make, the expected pass values, and what to do if the result is outside limits.',
  },
  {
    question: 'Is the guidance suitable for apprentices or just experienced electricians?',
    answer:
      'The AI Installation Specialist adapts its guidance to your level. If you ask a broad question like "How do I install a ring final circuit?", it provides comprehensive step-by-step guidance from first principles, including cable selection, routing, connection, and testing. If you ask a specific question like "What is the minimum depth for a concealed cable in a solid wall without RCD protection?", it gives a direct answer (50mm from any surface of the wall, per Regulation 522.6.101). Apprentices find it valuable as a mentor-like resource that explains the "why" behind each step, not just the "what." Experienced electricians use it as a quick reference for tasks they do less frequently — for example, a domestic electrician taking on their first commercial distribution board installation, or an electrician encountering a TT earthing system for the first time.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-fault-diagnosis',
    title: 'AI Fault Diagnosis',
    description:
      'Describe fault symptoms and get a ranked diagnosis with test sequences and BS 7671 references.',
    icon: Brain,
    category: 'Tool',
  },
  {
    href: '/tools/ai-regulations-lookup',
    title: 'AI Regulations Lookup',
    description:
      'Search BS 7671 in plain English. Get the specific regulation number, text, and practical guidance.',
    icon: Search,
    category: 'Tool',
  },
  {
    href: '/tools/ai-tutor',
    title: 'AI Tutor for Electricians',
    description:
      'Study assistant for exam preparation and regulation explanations. Practice questions for C&G 2391.',
    icon: GraduationCap,
    category: 'Tool',
  },
  {
    href: '/guides/how-to-size-cables',
    title: 'How to Size Cables',
    description:
      'Step-by-step cable sizing guide using BS 7671 Appendix 4 with all correction factors explained.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description:
      'The correct test sequence for initial verification and periodic inspection as per GN3.',
    icon: TestTube,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Regulation 421.1.201 requirements for non-combustible consumer units and AMD3 compliance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

const features = [
  {
    icon: Cable,
    title: 'Cable Routing Guidance',
    description:
      'Safe zone rules, depth requirements, notching and drilling limits for joists, fire stopping requirements, and derating factors for grouped cables.',
  },
  {
    icon: Layers,
    title: 'Containment Selection',
    description:
      'Trunking fill calculations, conduit sizing, cable tray selection, and appropriate fixings for masonry, plasterboard, steel, and timber.',
  },
  {
    icon: Wrench,
    title: 'First Fix and Second Fix',
    description:
      'Complete checklists for first fix (back boxes, containment, cable installation) and second fix (accessories, termination, labelling) with inspection points.',
  },
  {
    icon: TestTube,
    title: 'Testing Procedures',
    description:
      'GN3-compliant test sequences with instrument selection, connection diagrams, expected values, and guidance on what to do when results are outside limits.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671 at Every Step',
    description:
      'Every instruction includes the specific regulation reference so you can verify compliance and document your work correctly.',
  },
  {
    icon: Bot,
    title: 'Works Offline on Site',
    description:
      'Access installation guidance without signal. Ideal for new-build sites, basements, and plant rooms where connectivity is unreliable.',
  },
];

const howToSteps = [
  {
    name: 'Describe the installation task',
    text: 'Tell the AI what you are installing — for example, "I need to install a 7.4 kW EV charger in a detached garage 15 metres from the consumer unit. TN-C-S supply, cable route through the loft and along the garage wall."',
  },
  {
    name: 'Get the step-by-step guidance',
    text: 'The AI provides a complete sequence of operations: cable sizing, protection device selection, routing requirements, containment specification, termination details, testing procedures, and certification requirements.',
  },
  {
    name: 'Ask for more detail on any step',
    text: 'Drill into specific steps. "What derating factor applies for the cable in the loft insulation?" or "What Zs value should I expect at the charger?" The AI provides precise answers with regulation references.',
  },
  {
    name: 'Complete the installation with confidence',
    text: 'Follow the guidance through the physical installation, testing, and certification. The AI covers the full lifecycle from design through to handover documentation.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-installation-specialist',
    heading: 'What Is the AI Installation Specialist?',
    content: (
      <>
        <p>
          The AI Installation Specialist is one of eight specialist Elec-AI agents in the Elec-Mate
          platform. It provides step-by-step installation guidance for any electrical task, from
          simple accessory changes to complete rewires and complex commercial installations. Every
          instruction includes the relevant{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          regulation reference, so you can verify compliance at each step.
        </p>
        <p>
          The agent is designed for two primary use cases. First, as a reference tool for
          experienced electricians who need quick guidance on tasks they perform less frequently —
          for example, a domestic electrician taking on a commercial project, or an electrician
          installing a solar PV system for the first time. Second, as a learning tool for
          apprentices and less experienced electricians who need detailed, step-by-step guidance
          with explanations of the reasoning behind each step.
        </p>
        <p>
          The AI understands the full range of UK electrical installation work. It covers domestic
          installations (consumer units, rewires, additional circuits, bathroom and kitchen
          installations, garden offices, EV chargers), commercial installations (distribution
          boards, submains, three-phase systems, lighting controls, fire alarms, emergency
          lighting), and specialist installations (solar PV, battery storage, data cabling,{' '}
          <SEOInternalLink href="/tools/ev-charger-certificate">
            EV charging infrastructure
          </SEOInternalLink>
          ).
        </p>
        <p>
          Every response is tailored to the specific context you describe. If you say the cable
          route passes through a loft with thermal insulation, the AI applies the correct insulation
          derating factor. If you say the property has a TT earthing system, the AI adjusts its
          guidance on earth fault loop impedance and RCD protection accordingly.
        </p>
      </>
    ),
  },
  {
    id: 'cable-routing',
    heading: 'Cable Routing Guidance to BS 7671',
    content: (
      <>
        <p>
          Cable routing is one of the areas where mistakes are most costly — both in terms of
          non-compliance and in terms of rework if cables need to be repositioned. The AI
          Installation Specialist provides comprehensive routing guidance based on BS 7671 Chapter
          52 and the IET On-Site Guide.
        </p>
        <p>
          The safe zone rules (Regulations 522.6.100 to 522.6.103) specify where cables can be
          installed within walls and partitions without additional mechanical protection. The AI
          explains these rules for each specific situation: solid walls, stud walls, walls with
          metal fixings, and horizontal cable runs. It also covers the circumstances where cables
          outside safe zones require additional protection — either by RCD protection, earthed
          metallic covering, or installation at a depth of 50mm or more.
        </p>
        <p>
          For cable runs through structural elements, the AI provides guidance on notching and
          drilling rules for floor and ceiling joists. These are derived from Building Regulations
          Approved Document A and specify the permitted positions and sizes of notches and holes in
          joists without structural engineering approval. The AI explains the rules clearly: notches
          in the top of joists between 0.07 and 0.25 of the span, up to a depth of 0.125 of the
          joist depth; holes at mid-depth, between 0.25 and 0.4 of the span, up to a diameter of
          0.25 of the joist depth, and at least 3 hole diameters apart.
        </p>
        <p>
          Fire stopping at compartment boundaries is another critical requirement. The AI identifies
          when cables pass through fire-rated walls, floors, or ceilings, and specifies the
          appropriate fire stopping method — intumescent sealant, fire-rated compound, fire sleeves,
          or proprietary fire stopping systems — in accordance with Building Regulations Approved
          Document B and the specific fire rating of the compartment boundary.
        </p>
        <SEOAppBridge
          title="Get cable routing guidance for your next job"
          description="Describe the cable route and the AI provides safe zone compliance, joist drilling rules, fire stopping requirements, and derating factors. All with BS 7671 references."
          icon={Cable}
        />
      </>
    ),
  },
  {
    id: 'containment-systems',
    heading: 'Containment System Selection and Sizing',
    content: (
      <>
        <p>
          The correct selection and sizing of cable containment is essential for both compliance and
          practical installation. The AI Installation Specialist helps you choose the right
          containment system and verify that it is correctly sized for the cables it will carry.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Trunking</h4>
            <p className="text-white text-sm leading-relaxed">
              The AI calculates trunking fill using the cable factor method from the IET On-Site
              Guide. Each cable has a cable factor based on its overall diameter, and the total of
              all cable factors must not exceed 45% of the trunking internal cross-sectional area.
              The AI selects the smallest standard{' '}
              <SEOInternalLink href="/calculators/trunking-fill">trunking size</SEOInternalLink>{' '}
              that satisfies this requirement and specifies the appropriate fixing method and
              spacing.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Conduit</h4>
            <p className="text-white text-sm leading-relaxed">
              For conduit installations, the AI uses the{' '}
              <SEOInternalLink href="/calculators/conduit-fill">
                conduit factor tables
              </SEOInternalLink>{' '}
              to determine the correct conduit size based on the number and size of cables and the
              number of bends in the run. It accounts for the increased difficulty of drawing cables
              through conduit runs with multiple bends and recommends draw-in boxes where necessary.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Cable Tray and Basket</h4>
            <p className="text-white text-sm leading-relaxed">
              For cable tray and basket installations, the AI considers the load rating of the tray,
              the support bracket spacing, the method of cable installation (clipped to the tray or
              laid on the tray), and the grouping derating factors that apply. It also advises on
              the arrangement of cables on the tray — single layer versus stacked — and the impact
              on current-carrying capacity.
            </p>
          </div>
        </div>
        <p>
          The AI also advises on the transition between containment types (for example, where
          trunking transitions to conduit or where cables leave containment to enter accessories),
          the requirements for segregation of different circuit categories within containment, and
          the earthing requirements for metallic containment systems.
        </p>
      </>
    ),
  },
  {
    id: 'first-second-fix',
    heading: 'First Fix and Second Fix Guidance',
    content: (
      <>
        <p>
          The AI provides structured checklists for both first fix and second fix stages of an
          electrical installation. These checklists ensure that nothing is missed and that work is
          carried out in the most efficient sequence to avoid rework.
        </p>
        <p>
          <strong>First fix</strong> covers all work done before plastering and decoration. The AI
          guidance includes: back box installation (correct depth for the accessory type, secure
          fixing to the substrate), containment installation (trunking, conduit, tray — correctly
          sized and fixed), cable installation (correct cable type, correct route following safe
          zone rules, correct derating for grouping and insulation, sufficient length left at each
          termination point), earth bonding (main protective bonding conductors to incoming
          services, supplementary bonding where required), and fire stopping at all compartment
          boundary penetrations.
        </p>
        <p>
          <strong>Second fix</strong> covers all work done after plastering and decoration. The AI
          guidance includes: accessory installation (correct termination, torque settings for screw
          terminals, conductor identification with coloured sleeving where required), consumer unit
          or distribution board final connections, circuit labelling and identification (Regulation
          514.9.1), and the complete initial verification test sequence. The AI also covers the
          documentation requirements — producing the Electrical Installation Certificate (EIC) with
          Schedule of Inspections and Schedule of Test Results, or Minor Works Certificate as
          appropriate.
        </p>
        <p>
          For each stage, the AI identifies inspection points — moments where you should stop and
          verify your work before moving on. These are based on the Schedule of Inspections in BS
          7671, covering items like correct polarity, connection integrity, presence of fire
          barriers, and appropriateness of cable selection.
        </p>
      </>
    ),
  },
  {
    id: 'testing-procedures',
    heading: 'Testing Procedures Following GN3',
    content: (
      <>
        <p>
          The AI Installation Specialist provides testing guidance that follows the sequence
          specified in IET{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            Guidance Note 3: Inspection and Testing
          </SEOInternalLink>{' '}
          (9th Edition). The correct test sequence for initial verification is critical — tests must
          be carried out in the specified order because each test depends on the results of the
          previous one.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TestTube className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity of protective conductors:</strong> Testing R1+R2 and main bonding
                conductors using a low-resistance ohmmeter. Expected values and what abnormal
                readings indicate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TestTube className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity of ring final circuits:</strong> The step-by-step method for the
                figure-of-eight test, including how to identify broken rings, cross-connections, and
                interconnected rings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TestTube className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/how-to-test-insulation-resistance">
                    Insulation resistance
                  </SEOInternalLink>
                  :
                </strong>{' '}
                Test voltage selection (500V for circuits up to 500V), minimum acceptable values
                (1.0 megohm minimum, new installation should be much higher), and what low readings
                indicate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TestTube className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance:</strong> Zs measurement or calculation using Zs
                = Ze + (R1+R2), comparison against maximum values from BS 7671 Tables 41.2-41.6, and
                the 80% rule for comparing measured values.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TestTube className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing:</strong> Test at rated residual operating current (should trip
                within 300ms), at 5x rated current (should trip within 40ms), and ramp test to
                verify actual trip current.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For each test, the AI specifies the correct instrument, the connections to make, the
          expected results for a compliant installation, and what to do if results are outside
          limits. This guidance is invaluable for electricians who test frequently but also for
          apprentices learning the test sequence for the first time.
        </p>
        <SEOAppBridge
          title="Get testing guidance on your phone"
          description="The AI Installation Specialist walks you through the GN3 test sequence step by step. Instrument selection, connections, expected values, and what to do when results are outside limits."
          icon={TestTube}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AIInstallationSpecialistPage() {
  return (
    <ToolTemplate
      title="AI Installation Specialist | Guidance Tool"
      description="Step-by-step electrical installation guidance from AI trained for UK work. Cable routing, containment sizing, first and second fix checklists, and GN3 testing procedures. All with BS 7671 references."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Installation Agent"
      badgeIcon={Wrench}
      heroTitle={
        <>
          AI Installation Specialist:{' '}
          <span className="text-yellow-400">Step-by-Step Guidance for Every Task</span>
        </>
      }
      heroSubtitle="Get step-by-step installation guidance for any electrical task. Cable routing with safe zone compliance, containment sizing, first fix and second fix checklists, and GN3 testing procedures. Every instruction includes the BS 7671 regulation reference."
      heroFeaturePills={[
        { icon: Cable, label: 'Cable Routing' },
        { icon: Layers, label: 'Containment Sizing' },
        { icon: Wrench, label: 'First & Second Fix' },
        { icon: TestTube, label: 'Testing Procedures' },
      ]}
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Installation Specialist Features"
      featuresSubheading="Your on-site installation reference. Every feature is designed to guide you through the job correctly and efficiently."
      howToSteps={howToSteps}
      howToHeading="How to Use the AI Installation Specialist"
      howToDescription="Four steps from task description to complete installation guidance with testing procedures."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the AI Installation Specialist"
      relatedPages={relatedPages}
      ctaHeading="Get Expert Installation Guidance"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Installation Specialist for step-by-step guidance on every task. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-installation-specialist"
    />
  );
}
