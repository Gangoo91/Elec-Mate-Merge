import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Brain,
  Zap,
  Cable,
  FileText,
  ShieldCheck,
  ListChecks,
  Bot,
  CircuitBoard,
  Plug,
  BookOpen,
  GraduationCap,
  Wrench,
  Search,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Wiring Instructions', href: '/tools/ai-wiring-instructions' },
];

const tocItems = [
  { id: 'what-is-wiring-instructions', label: 'What Is AI Wiring Instructions?' },
  { id: 'circuit-specific-guides', label: 'Circuit-Specific Guides' },
  { id: 'cable-routing', label: 'Cable Routing Guidance' },
  { id: 'connection-diagrams', label: 'Connection Diagrams' },
  { id: 'regulation-references', label: 'Regulation References' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Get step-by-step wiring instructions for any circuit type — lighting, ring finals, radials, cooker circuits, shower circuits, EV chargers, solar PV, and more.',
  'Cable routing guidance shows safe zones, fixing requirements, and the correct cable selection for each installation method and environment.',
  'Connection diagrams illustrate terminal arrangements, conductor identification, and the correct wiring configuration for switches, sockets, and specialist accessories.',
  'Every instruction references the specific BS 7671 regulation that applies, so you can verify the guidance and cite the standard on your documentation.',
  'Built specifically for UK electrical installations using UK cable types, UK accessories, and UK wiring practices — not generic international content.',
];

const faqs = [
  {
    question: 'What types of circuit does the AI provide wiring instructions for?',
    answer:
      'The AI provides wiring instructions for every circuit type found in UK domestic, commercial, and industrial installations. This includes: lighting circuits (loop-in, junction box, three-plate, two-way and intermediate switching, dimmer circuits, LED driver installations), ring final circuits (including spurred sockets, fused connection units, and outdoor sockets), radial circuits (20A and 32A configurations), cooker circuits (with and without cooker control units, including double oven installations), shower circuits (electric showers from 7.5 kW to 10.8 kW), immersion heater circuits, EV charger circuits (7 kW single-phase and 22 kW three-phase), solar PV connections (AC and DC side), battery storage systems, smoke and heat detector interconnected circuits, outdoor circuits (garden lighting, outbuilding supplies), and consumer unit wiring (including RCBO configuration and dual RCD split-load arrangements).',
  },
  {
    question: 'Does the AI explain the regulations behind each wiring instruction?',
    answer:
      'Yes. Every wiring instruction includes specific references to BS 7671:2018+A3:2024 regulations. For example, when the AI instructs you to run cables within the permitted safe zones in a wall, it cites Regulation 522.6.101 which defines those zones. When it specifies the cable size for a shower circuit, it references the relevant tables in Appendix 4 and the correction factors from Section 523. When it requires RCD protection for a socket outlet circuit, it cites Regulation 411.3.3. This is not just regulatory decoration — it allows you to verify every instruction against the published standard and ensures the guidance is always traceable to its source.',
  },
  {
    question: 'Can the AI help with two-way and intermediate switching wiring?',
    answer:
      'Yes. Two-way switching and intermediate switching are among the most commonly searched wiring topics, and the AI provides clear, step-by-step instructions for all configurations. For two-way switching, it covers the standard wiring using three-core and earth cable (or three singles in conduit), the older method using strappers and a common terminal, and the modern RCBO-protected arrangement. For intermediate switching (controlling a light from three or more positions), it explains the intermediate switch wiring with the correct conductor identification and terminal connections. The AI also covers more complex configurations such as two-way dimming (where only one dimmer is used with a standard two-way switch at the other position) and two-way switching with LED drivers.',
  },
  {
    question: 'Does it cover cable selection and installation methods?',
    answer:
      'Yes. For each circuit type, the AI specifies the appropriate cable type and size based on the installation method and environmental conditions. For domestic work, this typically means 6242Y (twin and earth flat cable) for surface or concealed runs in buildings, with the correct size selected based on the design current and applicable correction factors. For outdoor runs, it specifies SWA (steel wire armoured) cable with the correct gland termination. For fire-rated circuits (fire alarm, emergency lighting), it specifies FP200 or equivalent fire-resistant cable. For each cable type, the AI provides the correct installation method — fixing centres, bend radii, segregation requirements from non-electrical services, and fire stopping at compartment boundaries. It also covers cable containment options (trunking, conduit, cable tray, cable ladder) with selection guidance based on the environment and the number of cables to be accommodated.',
  },
  {
    question: 'Is this useful for apprentices learning to wire circuits?',
    answer:
      'Yes. The AI Wiring Instructions tool is extensively used by electrical apprentices alongside their college training. The step-by-step instructions with diagrams and regulation references reinforce what apprentices learn in the workshop and help them understand the "why" behind each step, not just the "how." For AM2 practical assessment preparation, the AI provides the specific wiring configurations that are tested in the assessment — consumer unit wiring, lighting circuits with two-way switching, ring final circuits, and radial circuits. Many training providers recommend Elec-Mate as a supplementary learning resource because the instructions are specific to UK practices and standards, unlike many online resources that cover American or other international wiring methods.',
  },
  {
    question: 'Can I get wiring instructions for EV charger and solar PV installations?',
    answer:
      'Yes. The AI provides comprehensive wiring instructions for EV charger installations covering both the supply circuit (from the consumer unit or distribution board to the charge point) and the charge point connections themselves. This includes the specific requirements for earthing (PME restrictions under Engineering Recommendation G12/4), RCD protection (Type A minimum, Type B where required for DC fault current protection), load management system wiring, and earth electrode installation for TT earthing arrangements. For solar PV, the AI covers both the DC side (string wiring, DC isolator, inverter connection) and the AC side (inverter to consumer unit or distribution board connection, generation meter, export limitation device). All instructions reference the IET Code of Practice for EV charging and the IET Code of Practice for grid-connected PV installations.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-circuit-designer',
    title: 'AI Circuit Designer',
    description:
      'Design complete electrical circuits with automatic cable sizing, protection device selection, and voltage drop verification.',
    icon: CircuitBoard,
    category: 'Tool',
  },
  {
    href: '/tools/ai-installation-specialist',
    title: 'AI Installation Specialist',
    description:
      'Step-by-step installation guidance for cable routing, containment, first fix, second fix, and testing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/tools/ai-diagram-builder',
    title: 'AI Diagram Builder',
    description:
      'Generate circuit diagrams, distribution board layouts, and cable routing diagrams for your installations.',
    icon: CircuitBoard,
    category: 'Tool',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate cable sizes using the full BS 7671 Appendix 4 method with all correction factors.',
    icon: Cable,
    category: 'Calculator',
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
    href: '/training/apprentice-training',
    title: 'Apprentice Training',
    description:
      'Level 2 and Level 3 electrical apprentice courses with interactive wiring exercises and AM2 preparation.',
    icon: GraduationCap,
    category: 'Training',
  },
];

const features = [
  {
    icon: Cable,
    title: 'Circuit-Specific Instructions',
    description:
      'Step-by-step wiring instructions for every UK circuit type — lighting, ring finals, radials, cookers, showers, EV chargers, solar PV, and more.',
  },
  {
    icon: Plug,
    title: 'Connection Diagrams',
    description:
      'Clear diagrams showing terminal arrangements, conductor identification, and the correct wiring configuration for every accessory and connection point.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671 References',
    description:
      'Every instruction references the specific BS 7671:2018+A3:2024 regulation that applies. Verify the guidance and cite the correct standard.',
  },
  {
    icon: ListChecks,
    title: 'Safe Zone Guidance',
    description:
      'Cable routing guidance including safe zones, fixing centres, bend radii, segregation requirements, and fire stopping at compartment boundaries.',
  },
  {
    icon: BookOpen,
    title: 'Apprentice Friendly',
    description:
      'Clear explanations with diagrams and regulation references. Used by apprentices for AM2 preparation and workshop practice alongside college training.',
  },
  {
    icon: Bot,
    title: 'Ask Follow-Up Questions',
    description:
      'Not sure about a specific connection? Ask the AI for clarification. It explains the reasoning behind every instruction in plain English.',
  },
];

const howToSteps = [
  {
    name: 'Describe the circuit',
    text: 'Enter the circuit type you need to wire — for example, "two-way lighting circuit with intermediate switch" or "32A radial for electric vehicle charger." Include any specific details about the installation.',
  },
  {
    name: 'Review the wiring instructions',
    text: 'The AI generates step-by-step wiring instructions with cable selection, routing guidance, connection diagrams, and regulation references for every step.',
  },
  {
    name: 'Follow the connection diagrams',
    text: 'Use the provided diagrams to make connections at each accessory and junction point. Conductor identification and terminal arrangements are clearly shown.',
  },
  {
    name: 'Check the regulation references',
    text: 'Each instruction cites the relevant BS 7671 regulation. Verify the guidance against the standard if you need to confirm any point.',
  },
  {
    name: 'Test and commission',
    text: 'The AI provides the testing requirements for the completed circuit, linking to the commissioning specialist for a full test sequence.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-wiring-instructions',
    heading: 'What Is the AI Wiring Instructions Tool?',
    content: (
      <>
        <p>
          The AI Wiring Instructions tool is part of the Elec-Mate platform, designed to provide
          electricians with clear, step-by-step wiring instructions for any circuit type found in UK
          electrical installations. Whether you are wiring a simple lighting circuit or a complex
          three-phase distribution board, the AI generates the specific instructions you need with
          connection diagrams, cable selection guidance, and BS 7671 regulation references.
        </p>
        <p>
          Even experienced electricians occasionally encounter circuit types they have not wired
          recently — an intermediate switching arrangement they have not done in years, a specific
          EV charger configuration they have not seen before, or a solar PV connection arrangement
          that differs from the last one they installed. The AI Wiring Instructions tool provides
          immediate, accurate guidance for these situations, eliminating the need to search through
          manuals or rely on potentially outdated internet resources.
        </p>
        <p>
          For apprentices, the tool serves as a comprehensive learning resource. It reinforces what
          is taught in college workshops by providing the same information in a different format,
          with clear explanations of why each step is done that way — not just the "how" but the
          "why" behind UK wiring practices. The tool covers all the circuit types assessed in the{' '}
          <SEOInternalLink href="/training/am2-exam-preparation">
            AM2 practical assessment
          </SEOInternalLink>{' '}
          and is widely used for revision and preparation.
        </p>
        <p>
          All instructions are specific to UK electrical installations using UK cable types (6242Y,
          6243Y, SWA, FP200, MICC), UK accessories (British Standard face plates and back boxes),
          and UK wiring practices as specified in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          . This is not generic international content — it is tailored and trained specifically for
          UK work.
        </p>
      </>
    ),
  },
  {
    id: 'circuit-specific-guides',
    heading: 'Circuit-Specific Wiring Guides',
    content: (
      <>
        <p>
          The AI provides detailed wiring guides for every circuit type. Each guide covers the
          complete wiring process from cable selection through to final connection and testing, with
          step-by-step instructions and regulation references at every stage.
        </p>
        <p>
          For lighting circuits, the guides cover the three main wiring methods used in UK domestic
          installations: the loop-in method (where the supply is looped from ceiling rose to ceiling
          rose), the junction box method (where each light is fed from a junction box on the main
          cable run), and the three-plate ceiling rose method. Each guide includes the conductor
          identification for brown (line), blue (neutral), and green/yellow (earth) conductors, plus
          the correct marking of switched conductors using brown sleeving. Two-way switching and
          intermediate switching guides show every connection at every point in the circuit.
        </p>
        <p>
          For power circuits, the guides cover 32A ring final circuits (including the testing
          requirements for continuity of ring conductors), 20A and 32A radial circuits, fused
          connection units, and outdoor socket installations. Each guide specifies the cable type
          and size, the protection device type and rating, and the maximum number of outlets or
          floor area served by the circuit.
        </p>
        <p>
          Specialist circuit guides cover cooker circuits (including dual oven installations with a
          cooker control unit), shower circuits (with cable sizing for 7.5 kW through to 10.8 kW
          units), immersion heaters, extractor fans (including timer and humidistat connections),
          and{' '}
          <SEOInternalLink href="/tools/ai-commissioning-specialist">
            smoke and heat detector circuits
          </SEOInternalLink>{' '}
          with interconnection wiring.
        </p>
        <SEOAppBridge
          title="Get wiring instructions for any circuit"
          description="Open the Wiring Instructions tool in Elec-Mate, describe the circuit, and get step-by-step guidance with diagrams and BS 7671 references. Works offline on site."
          icon={Cable}
        />
      </>
    ),
  },
  {
    id: 'cable-routing',
    heading: 'Cable Routing and Installation Guidance',
    content: (
      <>
        <p>
          Cable routing is one of the most important aspects of any electrical installation. Cables
          must be routed within the permitted safe zones defined by BS 7671 Regulation 522.6.101 to
          minimise the risk of damage from nails, screws, and drills in future. The AI provides
          clear guidance on safe zone dimensions, cable fixing requirements, and routing best
          practices for every installation scenario.
        </p>
        <p>
          The safe zones are: horizontally within 150 mm of the top of a wall or partition,
          horizontally within 150 mm of the ceiling, vertically within 150 mm of the corner of a
          wall or partition, and vertically or horizontally from an accessory or outlet box within a
          zone formed by drawing a line 150 mm from the edge of the box in each direction. Cables
          installed outside these zones must either be at a depth of not less than 50 mm, or be
          protected by earthed metallic covering or an RCD with a rated residual operating current
          not exceeding 30 mA.
        </p>
        <p>
          Beyond safe zones, the AI covers cable fixing requirements (maximum clip spacings for
          different cable types and orientations as specified in the IET On-Site Guide), bend radii
          (the minimum radius to which each cable type can be bent without damaging the conductors
          or insulation), segregation from non-electrical services (minimum separation distances
          from gas pipes, water pipes, and other services), and fire stopping requirements at
          penetrations through fire compartment boundaries.
        </p>
        <p>
          For specific installation methods, the AI provides guidance on surface clipping, cable in
          conduit (rigid PVC and flexible), cable in trunking (including trunking fill calculations
          using the{' '}
          <SEOInternalLink href="/tools/trunking-fill-calculator">
            trunking fill calculator
          </SEOInternalLink>
          ), cable in ceiling voids (avoiding thermal insulation or using appropriate derating
          factors), and underground cable installation (including depth requirements, warning tape,
          and sand or tile protection).
        </p>
      </>
    ),
  },
  {
    id: 'connection-diagrams',
    heading: 'Connection Diagrams and Terminal Arrangements',
    content: (
      <>
        <p>
          Clear connection diagrams are provided for every accessory and connection point in each
          circuit type. These diagrams show the terminal layout of the specific accessory, the
          conductor identification (colour and function), and the correct connection arrangement.
        </p>
        <p>
          For switches, the diagrams show the common terminal, L1 and L2 positions for two-way
          switches, and the correct wiring for one-gang, two-gang, and three-gang configurations.
          The AI explains the difference between plate switches and grid switches, and provides the
          wiring for dimmer switches (including the specific requirements when dimming LED lamps
          where a trailing-edge dimmer may be required).
        </p>
        <p>
          For socket outlets, the diagrams show the line, neutral, and earth terminal positions, the
          correct connection for ring circuit continuity (where the incoming and outgoing cable
          cores share each terminal), and the wiring for spurred sockets fed from a fused connection
          unit. The AI also covers USB socket outlets, switched socket outlets, and the specific
          wiring for shaver supply units in bathrooms.
        </p>
        <p>
          For consumer units and distribution boards, the AI provides comprehensive wiring diagrams
          showing the busbar arrangement, the connection of MCBs, RCBOs, and RCDs, the main switch
          connections, earth bar connections (including main earthing conductor and circuit
          protective conductors), and neutral bar connections. The{' '}
          <SEOInternalLink href="/tools/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> can
          generate full schematic diagrams of the completed installation that complement the wiring
          instructions.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-references',
    heading: 'BS 7671 Regulation References',
    content: (
      <>
        <p>
          Every wiring instruction in the AI tool is supported by specific references to{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          . This is a fundamental design principle of the tool — it does not just tell you how to
          wire a circuit, it tells you why each step is done that way by citing the regulation that
          requires it.
        </p>
        <p>
          For cable selection, the AI references Appendix 4 tables for current-carrying capacity and
          the correction factors from Section 523 (ambient temperature, grouping, thermal
          insulation). For cable routing, it references Regulation 522.6.101 (safe zones in walls)
          and Regulation 522.6.103 (cable depth requirements). For protection device selection, it
          references Regulations 411.3.3 (additional protection by RCD), 432.1 (overload
          protection), and 434.1 (fault current protection).
        </p>
        <p>
          Amendment 3:2024 is particularly relevant for modern circuit types. Regulation 530.3.201
          (bidirectional and unidirectional protective devices) affects the wiring of circuits with
          solar PV, battery storage, and other sources of reverse power flow. The AI includes these
          requirements in the wiring instructions for the relevant circuit types, ensuring your
          installations comply with the latest edition of the standard.
        </p>
        <p>
          The regulation references also help apprentices connect their practical work with the
          theory they learn in{' '}
          <SEOInternalLink href="/training/18th-edition-course">
            18th Edition course studies
          </SEOInternalLink>
          . Understanding why a cable must be in a safe zone (not just that it must) deepens their
          knowledge and helps them apply the principles to new situations they have not encountered
          before.
        </p>
        <SEOAppBridge
          title="Every instruction backed by BS 7671"
          description="Get wiring instructions with traceable regulation references for every step. Verify the guidance, cite the standard, and wire with confidence."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AIWiringInstructionsPage() {
  return (
    <ToolTemplate
      title="AI Wiring Instructions | Step-by-Step Guidance"
      description="Get step-by-step wiring instructions for any UK electrical circuit type. Circuit-specific guides, cable routing, connection diagrams, and BS 7671 regulation references. Built for UK electricians and apprentices."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Wiring Guidance"
      badgeIcon={Cable}
      heroTitle={
        <>
          AI Wiring Instructions:{' '}
          <span className="text-yellow-400">Step-by-Step for Every Circuit Type</span>
        </>
      }
      heroSubtitle="Get clear, step-by-step wiring instructions for any circuit type found in UK electrical installations. Cable selection, routing guidance, connection diagrams, and BS 7671 regulation references — all specific to UK wiring practices."
      heroFeaturePills={[
        { icon: Cable, label: 'Circuit Guides' },
        { icon: Plug, label: 'Connection Diagrams' },
        { icon: ShieldCheck, label: 'BS 7671 References' },
        { icon: BookOpen, label: 'Apprentice Friendly' },
      ]}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Wiring Instructions Features"
      featuresSubheading="Purpose-built for UK electricians and apprentices. Every feature ensures you wire circuits correctly to BS 7671."
      howToSteps={howToSteps}
      howToHeading="How to Use the AI Wiring Instructions Tool"
      howToDescription="Five steps from circuit description to completed and tested installation."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About AI Wiring Instructions"
      relatedPages={relatedPages}
      ctaHeading="Wire Every Circuit with Confidence"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Wiring Instructions. Step-by-step guidance, connection diagrams, and BS 7671 references. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-wiring-instructions"
    />
  );
}
