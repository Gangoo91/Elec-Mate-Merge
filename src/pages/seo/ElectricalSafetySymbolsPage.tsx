import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ShieldCheck, BookOpen, FileCheck2, PenTool } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Safety, Fire + Security Symbols', href: '/guides/electrical-safety-symbols' },
];

const tocItems = [
  { id: 'gallery', label: 'Symbol Gallery' },
  { id: 'about', label: 'About Safety, Fire + Security Symbols' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Fire alarm symbols on UK drawings follow BS 5839-1 (commercial), BS 5839-6 (domestic) and BS EN 54 component standards.',
  'Smoke detector, heat detector, CO detector and aspirating detector symbols differentiate by internal element — circle with smoke streaks, circle with heat element, etc.',
  'BS EN 14604 covers single-station domestic smoke detectors required under the Smoke + CO Alarm Regs 2022 (England) — separate from BS 5839-1 commercial systems.',
  'Manual call points (break-glass) to BS EN 54-11 are required at every escape exit and on escape routes — symbol is a small square with a diagonal line representing the breakable element.',
  'Disabled toilet emergency call point symbols (BS 8300) include the pull-cord activator, reset button and exterior indicator/sounder.',
];

const faqs = [
  {
    question: 'What is the symbol for a smoke detector on a fire alarm drawing?',
    answer:
      'A smoke detector is drawn as a circle with three or four short lines emerging from the circumference, representing smoke entering the chamber. Optical (photoelectric) detectors and ionisation detectors share the same symbol — the technology is annotated separately. Single-station domestic detectors to BS EN 14604 use the same symbol as BS 5839-1 system detectors.',
  },
  {
    question: 'How is a manual call point drawn?',
    answer:
      'A manual call point (MCP) to BS EN 54-11 is drawn as a small square with a single diagonal line — the diagonal represents the break-glass element. Some symbols show the square with a smaller inner square representing the protective cover or hinged front plate. MCPs are required at every fire exit, on every escape route at intervals not exceeding 45 m, and at every change of level on escape stairs.',
  },
  {
    question: 'What is a sounder + beacon symbol?',
    answer:
      'A combined sounder and beacon device to BS EN 54-23 is drawn as a triangle (sounder) overlapping a star or starburst (visual beacon). The visual element is required for the hearing impaired, in high-noise environments, and at disabled refuge points where audible signals alone may be insufficient. Locations include WCs, plant rooms, factories, schools and swimming pools.',
  },
  {
    question: 'Are CCTV cameras drawn differently from access control?',
    answer:
      'Yes. A CCTV camera is drawn as a small rectangle with an extending lens cone — like a wedge of pie. Access control readers (card/fob/biometric) are drawn as a small rectangle with a card-slot symbol or a wave indicating proximity reading. CCTV systems are typically PoE-powered over Cat 6; access control runs on its own RS-485 or IP bus back to a central controller.',
  },
  {
    question: 'What is a disabled refuge alarm?',
    answer:
      'A disabled refuge alarm (BS 5839-9) provides two-way voice communication between a person in a refuge (typically a stairwell landing) and the main control room. The refuge handset symbol shows a microphone + speaker icon; the master station is drawn as a console with multiple call indicators. Refuges are required in every multi-storey commercial building under Building Regs Part B.',
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
    heading: 'Safety, Fire + Security Symbols — Complete Symbol Set',
    content: (
      <>
        <p>
          Below are every safety, fire + security symbols on the Elec-Mate symbol library, drawn to
          BS EN 60617. Right-click any symbol to save the SVG, or use the{' '}
          <SEOInternalLink href="/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> to drag
          them directly into a circuit drawing.
        </p>
        <SymbolGallery category="safety" showCategoryHeadings={false} />
      </>
    ),
  },
  {
    id: 'about',
    heading: 'About Safety, Fire + Security Symbols',
    content: (
      <>
        <p>
          Every life-safety and security symbol — fire detection to access control — drawn to BS EN
          60617 with BS 5839, BS EN 54 and BS 8300 cross-references.
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

export default function ElectricalSafetySymbolsPage() {
  return (
    <GuideTemplate
      title="Fire Alarm + Security Symbols | BS 5839 Detection Diagrams"
      description="Smoke detector, heat detector, CO detector, fire alarm sounder, manual call point, CCTV, access control…"
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Safety, Fire + Security Symbols:{' '}
          <span className="text-yellow-400">BS EN 60617 + BS 5839 reference</span>
        </>
      }
      heroSubtitle="Every life-safety and security symbol — fire detection to access control — drawn to BS EN 60617 with BS 5839, BS EN 54 and BS 8300 cross-references."
      readingTime={6}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="FAQ — Safety, Fire + Security Symbols"
      relatedPages={relatedPages}
      ctaHeading="Use BS EN 60617 symbols in working drawings"
      ctaSubheading="Drag-and-drop circuit diagrams. EICR + EIC schedules with correct symbols. Built for UK electricians. 7-day free trial."
    />
  );
}
