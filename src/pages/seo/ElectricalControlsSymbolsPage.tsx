import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ShieldCheck, BookOpen, FileCheck2, PenTool } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Controls + BMS Symbols', href: '/guides/electrical-controls-symbols' },
];

const tocItems = [
  { id: 'gallery', label: 'Symbol Gallery' },
  { id: 'about', label: 'About Controls + BMS Symbols' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BMS controller symbols on building services drawings show the central or distributed control unit — BACnet, Modbus or proprietary protocols differentiate the network type.',
  'Lighting control module symbols (DALI gateway, KNX dimmer, Lutron QS module) indicate the protocol — DALI uses two-wire polarity-free bus to BS EN 62386.',
  'Sensor symbols differentiate by measurement type — temperature, occupancy, daylight, CO2, humidity — each with a distinct internal element.',
  'Smart lighting installations typically reduce energy consumption by 30-50% versus static switching — measurable in the buildings post-occupancy evaluation.',
  'BMS schematics show all sensor and actuator points wired back to the controller, with cabling annotated as belden (control), CAT 6 (IP) or DALI 2-wire bus.',
];

const faqs = [
  {
    question: 'What is the symbol for a BMS controller?',
    answer:
      'A BMS controller is drawn as a rectangular control panel symbol with terminal connections shown along the bottom or sides — typically labelled "BMS" with the make/model and IP network address. Distributed BMS modules at each plant area are drawn as smaller rectangles linked back to the central controller by a bus line (BACnet/IP, Modbus RS-485, etc.).',
  },
  {
    question: 'How is a DALI lighting system drawn?',
    answer:
      "A DALI lighting system is drawn with the DALI gateway as a rectangle (labelled with the make/model and short-address range), connected by a two-wire DALI bus (typically purple in schematic colour coding) to each DALI-controlled luminaire. Up to 64 short addresses per DALI bus segment per BS EN 62386. The bus is polarity-free — wiring errors don\\'t damage devices.",
  },
  {
    question: 'What sensor symbols are most common on BMS plans?',
    answer:
      'The most common BMS sensors are temperature (circle with "T" inside), occupancy/PIR (circle with motion lines), daylight (circle with sun symbol), CO2 (circle with "CO2"), and humidity (circle with "%RH" or wave symbol). Each sensor wires back to the BMS controller via 0-10V analogue, 4-20 mA, or digital bus.',
  },
  {
    question: 'What is the difference between KNX and DALI on a drawing?',
    answer:
      'KNX is a building automation bus (BS EN 50090) that controls lighting, HVAC, blinds, security and metering on one network — drawn with a green bus line. DALI (BS EN 62386) is purpose-built for lighting only — drawn with a purple/violet bus line. A KNX-DALI gateway translates between the two protocols where required. KNX is often the higher-level bus controlling DALI sub-buses for lighting.',
  },
  {
    question: 'How are smart lighting scenes shown?',
    answer:
      'Smart lighting scenes are typically shown in a schedule rather than on the drawing — the schedule lists each scene by name (e.g. "Meeting", "Presentation", "Cleaning") with the dim level for each addressable luminaire. The drawing itself just shows the luminaires with their addresses; the scene programming sits in a separate commissioning schedule document.',
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
    heading: 'Controls + BMS Symbols — Complete Symbol Set',
    content: (
      <>
        <p>
          Below are every controls + bms symbols on the Elec-Mate symbol library, drawn to BS EN
          60617. Right-click any symbol to save the SVG, or use the{' '}
          <SEOInternalLink href="/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> to drag
          them directly into a circuit drawing.
        </p>
        <SymbolGallery category="controls" showCategoryHeadings={false} />
      </>
    ),
  },
  {
    id: 'about',
    heading: 'About Controls + BMS Symbols',
    content: (
      <>
        <p>
          Every BMS, lighting control and sensor symbol — drawn to BS EN 60617 with BS EN 62386
          (DALI), KNX and Lutron protocol cross-references.
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

export default function ElectricalControlsSymbolsPage() {
  return (
    <GuideTemplate
      title="Controls + BMS Symbols | DALI, KNX, Sensor Reference"
      description="BMS controller, control panel, lighting control, sensor and humidity sensor symbols to BS EN 60617 for UK building management and smart lighting…"
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Controls + BMS Symbols:{' '}
          <span className="text-yellow-400">Building management + smart lighting references</span>
        </>
      }
      heroSubtitle="Every BMS, lighting control and sensor symbol — drawn to BS EN 60617 with BS EN 62386 (DALI), KNX and Lutron protocol cross-references."
      readingTime={6}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="FAQ — Controls + BMS Symbols"
      relatedPages={relatedPages}
      ctaHeading="Use BS EN 60617 symbols in working drawings"
      ctaSubheading="Drag-and-drop circuit diagrams. EICR + EIC schedules with correct symbols. Built for UK electricians. 7-day free trial."
    />
  );
}
