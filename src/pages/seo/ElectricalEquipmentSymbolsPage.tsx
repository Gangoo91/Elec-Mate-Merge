import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ShieldCheck, BookOpen, FileCheck2, PenTool } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Equipment Symbols', href: '/guides/electrical-equipment-symbols' },
];

const tocItems = [
  { id: 'gallery', label: 'Symbol Gallery' },
  { id: 'about', label: 'About Equipment Symbols' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The motor symbol is a circle with "M" inside — three-phase induction motors are the most common; symbol may show phase (single-phase, three-phase) and synchronous vs induction.',
  'Transformer symbols show two coupled coils — step-up or step-down by turns ratio. Isolating transformers (BS EN 61558-2-6) show no electrical link between primary and secondary.',
  'UPS symbols differentiate online (always inverting) from line-interactive (passes mains through except on failure) — annotated separately on the schedule.',
  'AHU (air handling unit) symbols include the fan, filter, heating/cooling coil and damper elements — each motor and heater electrically supplied separately.',
  'Lift drives need dedicated three-phase circuits with locked isolators in the motor room per BS 7671 Section 530 — the lift symbol shows car + counterweight + drive motor.',
];

const faqs = [
  {
    question: 'What is the symbol for an electric motor?',
    answer:
      'An electric motor is drawn as a circle with "M" inside the circle. Annotations next to the symbol specify the phase (single-phase, three-phase), rated power (kW), rated voltage (230V, 400V), and starter type (DOL — Direct On Line, S/D — star-delta, soft starter, VFD — variable frequency drive). Three-phase motors are the workhorse of industrial installations.',
  },
  {
    question: 'How is a transformer drawn?',
    answer:
      'A transformer is drawn as two adjacent coupled coils — typically two parallel zigzag lines or two parallel hatched rectangles. The number of windings, turns ratio and voltage on each side are annotated. An isolating transformer to BS EN 61558 shows two coils with no electrical or magnetic interconnection symbol, emphasising galvanic isolation between primary and secondary.',
  },
  {
    question: 'What does the UPS symbol show?',
    answer:
      'A UPS (Uninterruptible Power Supply) is drawn as a rectangle containing the rectifier symbol (AC-to-DC converter), battery symbol (two horizontal lines representing cells), and inverter symbol (DC-to-AC converter with a square wave or sine wave inside). Single-line schematic UPS symbols show the input and output sides clearly with the battery on the DC bus.',
  },
  {
    question: 'How are AHU electrical connections shown?',
    answer:
      'An AHU (Air Handling Unit) is drawn as a rectangle containing the fan, filter, heating coil and cooling coil symbols. The electrical supply is shown to each component separately — the fan motor (three-phase circle with M), the heating coil (resistive element with electrical termination), and any pump motors on the chilled water or hot water circuits. AHUs typically need a dedicated three-phase supply and BMS control wiring.',
  },
  {
    question: 'Where does the lift drive supply come from?',
    answer:
      'A lift drive must be supplied from a dedicated three-phase circuit, terminating in a lockable main switch inside the lift motor room per BS 7671 Section 530. The lift symbol on the schematic shows the drive motor (three-phase circle), the car, the counterweight, and the supply cable feeding into the motor room isolator. Emergency lighting in the motor room is also drawn explicitly.',
  },
];

const relatedPages = [
  {
    href: '/guides/electrical-symbols-chart',
    title: 'Electrical Symbols Chart (Full Library)',
    description: 'All 114 BS EN 60617 symbols grouped by category — the master reference.',
    icon: 'PenTool',
    category: 'Reference',
  },
  {
    href: '/guides/how-to-read-wiring-diagram',
    title: 'How to Read a Wiring Diagram',
    description: 'Apply BS EN 60617 symbols to interpret installation drawings.',
    icon: 'BookOpen',
    category: 'Guide',
  },
  {
    href: '/guides/how-to-read-electrical-drawings',
    title: 'How to Read Electrical Drawings',
    description:
      'Layout drawings, schematics, single-line diagrams — every drawing type explained.',
    icon: 'FileCheck2',
    category: 'Guide',
  },
  {
    href: '/ai-diagram-builder',
    title: 'AI Diagram Builder',
    description: 'Drag-and-drop BS EN 60617 symbols into a working circuit drawing.',
    icon: 'ShieldCheck',
    category: 'Tool',
  },
];

const sections = [
  {
    id: 'gallery',
    heading: 'Equipment Symbols — Complete Symbol Set',
    content: (
      <>
        <p>
          Below are every equipment symbols on the Elec-Mate symbol library, drawn to BS EN 60617.
          Right-click any symbol to save the SVG, or use the{' '}
          <SEOInternalLink href="/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> to drag
          them directly into a circuit drawing.
        </p>
        <SymbolGallery category="equipment" showCategoryHeadings={false} />
      </>
    ),
  },
  {
    id: 'about',
    heading: 'About Equipment Symbols',
    content: (
      <>
        <p>
          Every plant + equipment symbol — motors to UPS, transformers to MCCs — drawn to BS EN
          60617 for UK installation, design and maintenance drawings.
        </p>
        <p>
          Each symbol is drawn to <strong>BS EN 60617</strong> — the UK adoption of the
          international IEC 60617 standard for graphical symbols on electrical diagrams. The same
          symbols appear on{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR forms</SEOInternalLink>,
          distribution board schedules, single-line schematics and installation layout drawings.
        </p>
        <p>
          Looking for symbols in a different category? See the full{' '}
          <SEOInternalLink href="/guides/electrical-symbols-chart">
            BS EN 60617 symbol library
          </SEOInternalLink>{' '}
          covering switches, sockets, lighting, distribution, safety, containment, equipment,
          mechanical, renewables, controls and architectural symbols.
        </p>
        <SEOAppBridge
          title="Use these symbols in real drawings"
          description="The Elec-Mate AI Diagram Builder gives you every BS EN 60617 symbol on a draggable canvas — perfect for circuit diagrams, certificate schedules…"
          ctaText="Open the Diagram Builder"
          ctaHref="/ai-diagram-builder"
        />
      </>
    ),
  },
];

export default function ElectricalEquipmentSymbolsPage() {
  return (
    <GuideTemplate
      title="Electrical Equipment Symbols | Motor, Transformer, UPS, AHU"
      description="Motor, transformer, UPS, generator, fan, pump, AHU, lift and motor control centre symbols to BS EN 60617 for UK electrical installation drawings."
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Equipment Symbols:{' '}
          <span className="text-yellow-400">Motor, transformer + plant references</span>
        </>
      }
      heroSubtitle="Every plant + equipment symbol — motors to UPS, transformers to MCCs — drawn to BS EN 60617 for UK installation, design and maintenance drawings."
      readingTime={6}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="FAQ — Equipment Symbols"
      relatedPages={relatedPages}
      ctaHeading="Use BS EN 60617 symbols in working drawings"
      ctaSubheading="Drag-and-drop circuit diagrams. EICR + EIC schedules with correct symbols. Built for UK electricians. 7-day free trial."
    />
  );
}
