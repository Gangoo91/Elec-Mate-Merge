import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ShieldCheck, BookOpen, FileCheck2, PenTool } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Solar PV + Renewables Symbols', href: '/guides/electrical-renewables-symbols' },
];

const tocItems = [
  { id: 'gallery', label: 'Symbol Gallery' },
  { id: 'about', label: 'About Solar PV + Renewables Symbols' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Solar PV panel symbols on schematics show the array configuration — series strings within each MPPT, plus parallel string connections at the combiner box.',
  'PV inverter symbols differentiate single-phase (G98, up to 3.68 kW) from three-phase (G99, above 3.68 kW) — DNO notification requirements differ.',
  'Battery energy storage system (BESS) symbols include the inverter, battery modules and battery management system (BMS) — typically AC-coupled or DC-coupled to the PV array.',
  'EV distribution board symbols are dedicated DBs serving one or more EV chargers per BS 7671 Section 722 — with load management, dynamic balancing, and Type A RCD or RDC-DD protection per 722.531.',
  'Standby generator symbols include the generator (G in a circle), the automatic transfer switch (ATS), and the fuel/gas supply indicator.',
];

const faqs = [
  {
    question: 'How is a solar PV system drawn on a schematic?',
    answer:
      'A solar PV schematic shows the panels grouped in series strings (each string drawn as a single rectangle with annotations for panel count and Vmp), feeding into the inverter (rectangle labelled "INV" with kW rating). DC isolators are drawn between the array and inverter; AC isolators between inverter and consumer unit. Generation meter (if required by SEG) and grid connection point complete the schematic.',
  },
  {
    question: 'What is the symbol for a battery storage system?',
    answer:
      'A battery storage system (BESS) is drawn as a rectangle containing battery modules (each shown as two horizontal lines representing cells), an inverter (rectangle labelled "INV"), and a Battery Management System (BMS) module. AC-coupled systems show the BESS connecting to the AC bus; DC-coupled systems show the BESS sharing the inverter DC bus with the PV array.',
  },
  {
    question: 'When do I need G98 vs G99 connection?',
    answer:
      'G98 covers single-phase grid-connected generators up to 3.68 kW per phase (16 A) — fit-and-inform basis, no DNO approval required before commissioning. G99 covers larger systems and all three-phase connections — DNO approval is required before installation, and a witness commissioning test is mandatory. Most domestic single-phase solar PV systems fall under G98; commercial and large domestic three-phase systems need G99.',
  },
  {
    question: 'Does an EV charger need its own RCD?',
    answer:
      "Yes. BS 7671 Section 722.531 requires either a Type A RCD plus a Residual Direct Current Detecting Device (RDC-DD) embedded in the charger, OR a Type B RCD on the supply circuit. Most modern EV chargers include the RDC-DD as standard — saving the cost of a Type B RCD which can exceed £200. Always confirm the charger\\'s data sheet states it has an internal RDC-DD before specifying a Type A on the supply.",
  },
  {
    question: 'How is a standby generator drawn?',
    answer:
      'A standby generator is drawn as a circle with "G" inside, fed by a fuel supply (annotated as diesel, gas or biogas). The output goes to an Automatic Transfer Switch (ATS) — drawn as a switch with two source positions (mains, generator) and one load output. The generator schematic should also show the starter battery, control panel, and any exhaust silencer for noise compliance.',
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
    heading: 'Solar PV + Renewables Symbols — Complete Symbol Set',
    content: (
      <>
        <p>
          Below are every solar pv + renewables symbols on the Elec-Mate symbol library, drawn to BS
          EN 60617. Right-click any symbol to save the SVG, or use the{' '}
          <SEOInternalLink href="/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> to drag
          them directly into a circuit drawing.
        </p>
        <SymbolGallery category="renewables" showCategoryHeadings={false} />
      </>
    ),
  },
  {
    id: 'about',
    heading: 'About Solar PV + Renewables Symbols',
    content: (
      <>
        <p>
          Every solar PV, battery storage and renewable energy symbol — drawn to BS EN 60617 with BS
          7671 Section 712 (prosumer) and MCS cross-references.
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

export default function ElectricalRenewablesSymbolsPage() {
  return (
    <GuideTemplate
      title="Solar PV + Renewables Symbols | BS 7671 Section 712"
      description="Solar PV panel, inverter, battery storage, generator and EV distribution symbols to BS EN 60617 for BS 7671 Section 712 prosumer installations."
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Solar PV + Renewables Symbols:{' '}
          <span className="text-yellow-400">BS 7671 Section 712 references</span>
        </>
      }
      heroSubtitle="Every solar PV, battery storage and renewable energy symbol — drawn to BS EN 60617 with BS 7671 Section 712 (prosumer) and MCS cross-references."
      readingTime={6}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="FAQ — Solar PV + Renewables Symbols"
      relatedPages={relatedPages}
      ctaHeading="Use BS EN 60617 symbols in working drawings"
      ctaSubheading="Drag-and-drop circuit diagrams. EICR + EIC schedules with correct symbols. Built for UK electricians. 7-day free trial."
    />
  );
}
