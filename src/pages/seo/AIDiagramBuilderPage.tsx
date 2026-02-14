import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Brain,
  Zap,
  CircuitBoard,
  FileText,
  ShieldCheck,
  ListChecks,
  Bot,
  Cable,
  PenTool,
  Layers,
  Download,
  Wrench,
  GraduationCap,
  Search,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Diagram Builder', href: '/tools/ai-diagram-builder' },
];

const tocItems = [
  { id: 'what-is-diagram-builder', label: 'What Is AI Diagram Builder?' },
  { id: 'circuit-diagrams', label: 'Circuit Diagrams' },
  { id: 'distribution-board-layouts', label: 'Distribution Board Layouts' },
  { id: 'cable-routing-diagrams', label: 'Cable Routing Diagrams' },
  { id: 'as-built-drawings', label: 'As-Built Drawings' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Generate circuit diagrams from a plain-English description of the installation — the AI produces schematic diagrams showing every circuit, protective device, and connection.',
  'Distribution board layout diagrams show the physical arrangement of devices, busbar connections, and circuit identification for consumer units and distribution boards.',
  'Cable routing diagrams illustrate cable paths through the building with containment types, cable sizes, and route lengths marked clearly.',
  'As-built drawings document the completed installation for handover, showing the actual installed configuration rather than the original design.',
  'All diagrams use standard UK electrical symbols to BS EN 60617 and can be exported as PDF, PNG, or SVG for inclusion in certification documentation.',
];

const faqs = [
  {
    question: 'What types of diagram can the AI generate?',
    answer:
      'The AI Diagram Builder generates four main types of electrical diagram. First, circuit schematic diagrams that show the electrical connections between components using standard symbols — these are the diagrams you would include in a circuit design or reference when fault-finding. Second, distribution board layout diagrams that show the physical arrangement of protective devices in a consumer unit or distribution board. Third, cable routing diagrams that show the paths cables take through the building, including containment types, cable sizes, and route lengths. Fourth, as-built drawings that document the actual installed configuration of the complete electrical installation for handover to the client. Each diagram type uses standard UK electrical symbols to BS EN 60617.',
  },
  {
    question: 'Can the AI generate a diagram from a text description?',
    answer:
      'Yes. You describe the installation in plain English — for example, "18-way consumer unit with dual 80A Type A RCDs, SPD, 10 RCBOs for lighting and socket circuits, 40A MCB for cooker, 32A RCBO for EV charger, 50A MCB for shower" — and the AI generates the corresponding diagrams. For circuit schematics, it produces a diagram showing the connections between the supply, the consumer unit, and each final circuit with the correct symbols for each protective device, cable type, and accessory. For distribution board layouts, it produces a visual representation of the physical arrangement of devices on the DIN rail. You can then edit the diagrams if adjustments are needed.',
  },
  {
    question: 'Do the diagrams use standard UK electrical symbols?',
    answer:
      'Yes. All diagrams use the standard electrical symbols specified in BS EN 60617 (Graphical symbols for diagrams). This includes the correct symbols for MCBs, RCBOs, RCDs, isolators, switches, socket outlets, lighting points, fused connection units, junction boxes, and all other common components. Using standardised symbols means the diagrams are universally understood by other electricians, building inspectors, and anyone else who needs to read them. The symbols are the same ones used in IET publications, training materials, and examination papers, so they are immediately familiar to any UK-qualified electrician.',
  },
  {
    question: 'Can I include the diagrams in my certification documents?',
    answer:
      'Yes. The diagrams can be exported as PDF, PNG, or SVG files for inclusion in certification documentation. BS 7671 Regulation 514.9.1 requires that a legible durable schematic diagram or chart is provided for every installation, showing the type and composition of each circuit, the method used for compliance with Chapter 41 (protection against electric shock), the information needed for identification of each device performing the functions of protection, isolation, and switching, and the number and size of conductors and type of wiring. The AI Diagram Builder produces diagrams that meet all of these requirements and can be attached to your EIC or included in the handover documentation.',
  },
  {
    question: 'How do the cable routing diagrams work?',
    answer:
      'Cable routing diagrams show the physical paths that cables take through the building. You describe the cable routes (or the AI generates them based on the circuit design), and the diagram shows each cable run with the cable type and size, the containment method (surface clips, conduit, trunking, cable tray), the route length, and any key reference points (distribution boards, junction boxes, accessory positions). For complex installations, the routing diagrams can be overlaid on floor plans if you upload a building plan. The routing diagrams are particularly useful for commercial installations where multiple cable routes share common containment runs and for any installation where documentation of the as-installed cable routes is needed for future maintenance or alteration work.',
  },
  {
    question: 'Can the AI produce three-phase distribution board diagrams?',
    answer:
      'Yes. The AI handles single-phase and three-phase distribution board diagrams. For three-phase systems, the diagram shows the three-phase busbar arrangement, the phase allocation for each outgoing circuit (which phase each circuit is connected to), the neutral bar and earth bar arrangements, the main switch or MCCB, any metering connections, and the SPD installation. The diagram also shows the load balance across the three phases, helping you verify that the installation design achieves reasonable phase balance. For submain fed distribution boards, the diagram includes the incoming supply cable details, the isolator, and the connection arrangement. Three-phase diagrams are essential for commercial and industrial installations where they form a key part of the design documentation and handover package.',
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
    href: '/tools/ai-wiring-instructions',
    title: 'AI Wiring Instructions',
    description:
      'Step-by-step wiring instructions for every UK circuit type with connection diagrams and BS 7671 references.',
    icon: Cable,
    category: 'Tool',
  },
  {
    href: '/tools/ai-report-writer',
    title: 'AI Report Writer',
    description:
      'Generate professional inspection reports, condition reports, and client proposals with your company branding.',
    icon: FileText,
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
      'Level 2 and Level 3 electrical apprentice courses with circuit diagram reading and drawing exercises.',
    icon: GraduationCap,
    category: 'Training',
  },
];

const features = [
  {
    icon: CircuitBoard,
    title: 'Circuit Schematic Diagrams',
    description:
      'Generate circuit schematics from a text description. Every protective device, cable, and connection shown with standard BS EN 60617 symbols.',
  },
  {
    icon: Layers,
    title: 'Distribution Board Layouts',
    description:
      'Produce consumer unit and distribution board layout diagrams showing the physical arrangement of devices, busbar connections, and circuit identification.',
  },
  {
    icon: Cable,
    title: 'Cable Routing Diagrams',
    description:
      'Illustrate cable paths through the building with containment types, cable sizes, route lengths, and key reference points clearly marked.',
  },
  {
    icon: PenTool,
    title: 'As-Built Drawings',
    description:
      'Document the completed installation with as-built drawings showing the actual installed configuration. Essential for handover and future maintenance.',
  },
  {
    icon: Download,
    title: 'Export as PDF, PNG, or SVG',
    description:
      'Export diagrams in multiple formats for inclusion in certification documents, client handover packs, or digital record-keeping systems.',
  },
  {
    icon: Bot,
    title: 'Edit and Customise',
    description:
      'Full editing capability on all generated diagrams. Add annotations, adjust layouts, and customise to match the specific requirements of each installation.',
  },
];

const howToSteps = [
  {
    name: 'Describe the installation',
    text: 'Enter a plain-English description of the installation — the circuits, protective devices, cable types, and layout. Or import a design from the AI Circuit Designer.',
  },
  {
    name: 'Select the diagram type',
    text: 'Choose from circuit schematic, distribution board layout, cable routing diagram, or as-built drawing. The AI generates the appropriate diagram type.',
  },
  {
    name: 'Review the generated diagram',
    text: 'The AI produces a complete diagram using standard BS EN 60617 symbols. Review the layout, connections, and annotations for accuracy.',
  },
  {
    name: 'Edit and annotate',
    text: 'Make any adjustments needed — add annotations, modify layouts, or customise labels to match the specific installation. The AI handles the formatting.',
  },
  {
    name: 'Export and include in documentation',
    text: 'Export the diagram as PDF, PNG, or SVG. Include it in your EIC, handover pack, or client documentation. Share via a link or print.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-diagram-builder',
    heading: 'What Is the AI Diagram Builder?',
    content: (
      <>
        <p>
          The AI Diagram Builder is part of the Elec-Mate platform, designed to help electricians
          create professional electrical diagrams without specialist CAD software or draughting
          skills. You describe the installation in plain English, and the AI generates circuit
          schematics, distribution board layouts, cable routing diagrams, and as-built drawings
          using standard UK electrical symbols.
        </p>
        <p>
          BS 7671 Regulation 514.9.1 requires that a durable schematic diagram or chart be provided
          for every electrical installation. In practice, many electricians find producing these
          diagrams time-consuming and resort to hand-drawn sketches that, while technically
          sufficient, do not convey the same level of professionalism as properly formatted
          diagrams. The AI Diagram Builder produces professional-quality diagrams in seconds,
          raising the standard of your documentation without adding to your workload.
        </p>
        <p>
          The tool integrates with other Elec-Mate agents. Circuit designs from the{' '}
          <SEOInternalLink href="/tools/ai-circuit-designer">AI Circuit Designer</SEOInternalLink>{' '}
          can be imported directly to generate diagrams that match the design specification. The{' '}
          <SEOInternalLink href="/tools/ai-wiring-instructions">
            Wiring Instructions tool
          </SEOInternalLink>{' '}
          references the diagrams when explaining connection arrangements. And the{' '}
          <SEOInternalLink href="/tools/ai-report-writer">Report Writer</SEOInternalLink> can
          include the diagrams in client-facing documentation.
        </p>
        <p>
          All diagrams use the standard electrical symbols specified in BS EN 60617, ensuring they
          are universally understood by other electricians, inspectors, and building professionals.
          Diagrams can be exported as PDF, PNG, or SVG for inclusion in any documentation format.
        </p>
      </>
    ),
  },
  {
    id: 'circuit-diagrams',
    heading: 'Circuit Schematic Diagrams',
    content: (
      <>
        <p>
          Circuit schematic diagrams show the electrical connections between components using
          standardised symbols. They are the fundamental documentation tool for electrical
          installations, used for design verification, installation guidance, fault-finding, and
          future alteration work.
        </p>
        <p>
          The AI generates circuit schematics that show: the supply arrangement (single-phase or
          three-phase, earthing system), the main switch and isolators, the distribution arrangement
          (consumer unit, distribution board, or sub-distribution board hierarchy), each protective
          device with its type and rating (MCB, RCBO, RCD, MCCB), each circuit with its cable type,
          size, and route length, and the final circuit accessories and loads. The diagram includes
          the correct BS EN 60617 symbols for every component.
        </p>
        <p>
          For domestic installations, a typical schematic shows the consumer unit with all its
          outgoing circuits — lighting circuits, ring final circuits, radial circuits, cooker
          circuit, shower circuit, and any specialist circuits such as EV charger or solar PV
          connections. For commercial installations, the schematic may show a hierarchy of
          distribution boards fed from a main switchboard, with sub-distribution boards for
          different floors or areas.
        </p>
        <p>
          The schematics comply with the documentation requirements of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          Regulation 514.9.1, which specifies that the diagram must show the type and composition of
          each circuit, the method used for compliance with Chapter 41, the information needed for
          identification of each device, and the number and size of conductors. For installations
          with solar PV or battery storage, the schematics include the DC side connections and the
          bidirectional protective devices required by Amendment 3:2024.
        </p>
        <SEOAppBridge
          title="Generate circuit diagrams in seconds"
          description="Describe the installation and the AI produces a professional circuit schematic with standard BS EN 60617 symbols. Export as PDF for your EIC documentation."
          icon={CircuitBoard}
        />
      </>
    ),
  },
  {
    id: 'distribution-board-layouts',
    heading: 'Distribution Board Layout Diagrams',
    content: (
      <>
        <p>
          Distribution board layout diagrams show the physical arrangement of protective devices
          within a consumer unit or distribution board. Unlike circuit schematics (which show
          electrical connections), layout diagrams show the physical positions of devices on the DIN
          rail or busbar, making them essential for installation, verification, and future
          maintenance.
        </p>
        <p>
          The AI generates layout diagrams that show: the main switch position and rating, the RCD
          positions and ratings (for split-load or dual RCD configurations), the position of each
          MCB or RCBO on the DIN rail, the circuit number and description for each device, the
          device type and rating, and the SPD position. For modern domestic consumer units with RCBO
          configuration (where every circuit has individual RCD protection via an RCBO), the layout
          shows the arrangement of RCBOs with their type designation (Type A, Type AC).
        </p>
        <p>
          For three-phase distribution boards, the layout shows the three-phase busbar arrangement,
          which phase each outgoing device is connected to, the neutral and earth bar positions, and
          the metering arrangement if applicable. The AI ensures that the phase allocation achieves
          reasonable load balance and flags any potential issues.
        </p>
        <p>
          The layout diagrams are particularly useful for the door card — the paper label fitted
          inside the consumer unit or distribution board door that identifies each circuit. The AI
          generates a door card layout that matches the physical arrangement of devices, making it
          easy to identify which device protects which circuit. This meets the requirement of
          Regulation 514.9.1 and provides a clear reference for anyone who needs to identify or
          isolate a specific circuit in the future, including during{' '}
          <SEOInternalLink href="/tools/ai-commissioning-specialist">commissioning</SEOInternalLink>{' '}
          and periodic inspection.
        </p>
      </>
    ),
  },
  {
    id: 'cable-routing-diagrams',
    heading: 'Cable Routing Diagrams',
    content: (
      <>
        <p>
          Cable routing diagrams show the physical paths that cables take through the building. They
          are essential for planning cable installations, verifying that cables are routed within
          the permitted safe zones, and documenting the as-installed routes for future reference.
        </p>
        <p>
          The AI generates routing diagrams that show: each cable run from distribution board to
          final point, the cable type and size for each run, the containment method (surface clips,
          conduit, trunking, cable tray, cable ladder), route lengths, and key reference points such
          as junction boxes, draw points, and fire stops. Where cables share common containment
          routes, the diagram shows the containment sizing and the cables it contains, linking to
          the{' '}
          <SEOInternalLink href="/tools/trunking-fill-calculator">
            trunking fill calculator
          </SEOInternalLink>{' '}
          or{' '}
          <SEOInternalLink href="/tools/conduit-fill-calculator">
            conduit fill calculator
          </SEOInternalLink>{' '}
          for capacity verification.
        </p>
        <p>
          For domestic installations, cable routing diagrams typically show the main cable routes
          from the consumer unit to each area of the property, with the cable type and size
          annotated. For commercial installations, the routing diagrams can become complex, showing
          cable tray and ladder runs through risers and ceiling voids, with containment sizing,
          support spacings, and fire stop positions all documented.
        </p>
        <p>
          Cable routing diagrams are particularly valuable for alteration and extension work. When a
          future electrician needs to run additional cables through an existing building, the
          routing diagram shows where the existing cables are, what containment is available, and
          where there is capacity for additional cables. Without this documentation, the only option
          is to trace cables manually, which is time-consuming and can lead to accidental damage.
        </p>
      </>
    ),
  },
  {
    id: 'as-built-drawings',
    heading: 'As-Built Drawings for Handover',
    content: (
      <>
        <p>
          As-built drawings document the electrical installation as it was actually installed, which
          may differ from the original design due to site conditions, client changes, or practical
          installation constraints. They are a critical part of the handover documentation and
          provide the definitive record of the installation for future maintenance, alteration, and
          periodic inspection.
        </p>
        <p>
          The AI generates as-built drawings by combining the original design information with any
          modifications recorded during installation. If the cable route was changed to avoid an
          obstruction, the as-built drawing reflects the actual route. If an additional circuit was
          added during the installation, it appears on the as-built drawing with all the relevant
          specifications.
        </p>
        <p>
          The as-built documentation package typically includes: a circuit schematic showing all
          circuits as installed, a distribution board layout showing the actual device arrangement,
          cable routing diagrams showing actual cable routes and containment, a schedule of circuits
          matching the consumer unit or distribution board door card, and a specification showing
          cable types, sizes, and installation methods for each circuit.
        </p>
        <p>
          For commercial projects, as-built drawings are often a contractual deliverable — the
          client specification requires the contractor to produce accurate as-built documentation as
          part of the handover process. For domestic work, although not usually a contractual
          requirement, providing as-built documentation demonstrates professionalism and gives the
          homeowner a valuable record of their electrical installation. The{' '}
          <SEOInternalLink href="/tools/ai-report-writer">AI Report Writer</SEOInternalLink> can
          combine the as-built drawings with a commissioning report and operating instructions to
          produce a comprehensive handover pack.
        </p>
        <SEOAppBridge
          title="Professional as-built drawings for every job"
          description="Document every installation with professional as-built drawings. The AI generates diagrams that meet BS 7671 requirements and impress clients at handover."
          icon={PenTool}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AIDiagramBuilderPage() {
  return (
    <ToolTemplate
      title="AI Diagram Builder | Circuit & Wiring Diagrams"
      description="Generate professional electrical diagrams with AI. Circuit schematics, distribution board layouts, cable routing diagrams, and as-built drawings using standard BS EN 60617 symbols. Built for UK electricians."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Diagram Tool"
      badgeIcon={CircuitBoard}
      heroTitle={
        <>
          AI Diagram Builder:{' '}
          <span className="text-yellow-400">Professional Diagrams from Plain English</span>
        </>
      }
      heroSubtitle="Generate circuit schematics, distribution board layouts, cable routing diagrams, and as-built drawings by describing the installation in plain English. Standard BS EN 60617 symbols, export as PDF, PNG, or SVG."
      heroFeaturePills={[
        { icon: CircuitBoard, label: 'Circuit Schematics' },
        { icon: Layers, label: 'Board Layouts' },
        { icon: Cable, label: 'Cable Routing' },
        { icon: PenTool, label: 'As-Built Drawings' },
      ]}
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Diagram Builder Features"
      featuresSubheading="Purpose-built for UK electricians. Professional diagrams that meet BS 7671 documentation requirements."
      howToSteps={howToSteps}
      howToHeading="How to Use the AI Diagram Builder"
      howToDescription="Five steps from installation description to professional, exportable diagrams."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About AI Diagram Building"
      relatedPages={relatedPages}
      ctaHeading="Create Professional Diagrams in Seconds"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Diagram Builder. Circuit schematics, board layouts, and as-built drawings from plain English descriptions. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-diagram-builder"
    />
  );
}
