import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ShieldCheck, BookOpen, FileCheck2, PenTool } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Architectural Symbols', href: '/guides/electrical-architectural-symbols' },
];

const tocItems = [
  { id: 'gallery', label: 'Symbol Gallery' },
  { id: 'about', label: 'About Architectural Symbols' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Door swing symbols (left-hinged, right-hinged, double-leaf) tell the installer which side of the door switches and accessories should be placed.',
  'Window symbols on electrical drawings indicate the position of external walls — important for daylight-harvesting lighting plans and solar PV mounting.',
  'Stairs symbols show tread direction — the textbook BS 7671 use case for two-way switching at top and bottom of the staircase.',
  'North arrow symbols are critical on solar PV drawings (orientation determines annual yield), CCTV plans (sun glare avoidance) and external lighting plans.',
  'Combining architectural context with the electrical symbols enables the installer to position accessories correctly without ambiguity.',
];

const faqs = [
  {
    question: 'Why are doors drawn on electrical plans?',
    answer:
      'Door swing direction tells the installer which side of the door to place wall switches, alarm panels, and emergency call-points. A switch on the wrong side of a door swing is unusable — you would need to step into the dark room to find it. The architectural door symbol is therefore essential context for the electrical layout. Double doors and emergency exits also influence the placement of access control and fire alarm devices.',
  },
  {
    question: 'What is the north arrow used for?',
    answer:
      'On solar PV installation drawings, the north arrow is essential — panel orientation determines the annual yield. South-facing arrays in the UK produce up to 950 kWh/kWp/year; east or west reduces yield by 15-20%; north can drop below 700 kWh/kWp/year and is rarely viable. CCTV plans use the north arrow to ensure cameras are not pointed directly into the rising or setting sun (which causes lens flare and washout).',
  },
  {
    question: 'Are window symbols required on electrical drawings?',
    answer:
      'They are not always present, but they are useful for several reasons. Windows define the daylit zones that determine daylight-harvesting lighting scheme parameters. They are obstacles to be avoided when planning cable routes through walls. And they affect security camera placement — cameras inside looking out through a window are subject to reflection issues during the day.',
  },
  {
    question: 'How do stairs appear on a switch layout?',
    answer:
      'Stairs are drawn as a series of parallel lines with an arrow indicating "UP" direction. Two-way switches are then drawn at the top and bottom of the stairs, often labelled with their strapper connections (e.g. "L1" and "L2"). Intermediate switches appear at any mid-landing. The stair symbol orients the installer so the switches go in the right place — and the lighting layout uses this to position the stair lights at landings and treads.',
  },
  {
    question: 'Should I draw architectural features at the same level of detail as electrical?',
    answer:
      'No — architectural features are drawn as simple outlines for context only. The electrical installer is not building the walls or fitting the doors. The level of architectural detail should be just enough to position electrical accessories unambiguously. Over-detailed architectural drawings on an electrical plan create clutter and make the actual electrical content harder to read.',
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
    heading: 'Architectural Symbols — Complete Symbol Set',
    content: (
      <>
        <p>
          Below are every architectural symbols on the Elec-Mate symbol library, drawn to BS EN
          60617. Right-click any symbol to save the SVG, or use the{' '}
          <SEOInternalLink href="/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> to drag
          them directly into a circuit drawing.
        </p>
        <SymbolGallery category="architectural" showCategoryHeadings={false} />
      </>
    ),
  },
  {
    id: 'about',
    heading: 'About Architectural Symbols',
    content: (
      <>
        <p>
          The architectural symbols you find alongside electrical accessories on UK installation
          drawings — door swing, window, stairs, north arrow — drawn to standard convention.
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

export default function ElectricalArchitecturalSymbolsPage() {
  return (
    <GuideTemplate
      title="Architectural Symbols on Electrical Drawings | UK Reference"
      description="Door, window, stairs and north arrow architectural symbols used on UK electrical installation drawings — context for switch placement…"
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Architectural Symbols:{' '}
          <span className="text-yellow-400">Door, window, stairs + north arrow references</span>
        </>
      }
      heroSubtitle="The architectural symbols you find alongside electrical accessories on UK installation drawings — door swing, window, stairs, north arrow — drawn to standard convention."
      readingTime={6}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="FAQ — Architectural Symbols"
      relatedPages={relatedPages}
      ctaHeading="Use BS EN 60617 symbols in working drawings"
      ctaSubheading="Drag-and-drop circuit diagrams. EICR + EIC schedules with correct symbols. Built for UK electricians. 7-day free trial."
    />
  );
}
