import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ShieldCheck, BookOpen, FileCheck2, PenTool } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Cable Containment Symbols', href: '/guides/electrical-containment-symbols' },
];

const tocItems = [
  { id: 'gallery', label: 'Symbol Gallery' },
  { id: 'about', label: 'About Cable Containment Symbols' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Conduit symbols are single lines on installation drawings; the line type (solid, dashed, dot-dash) often differentiates surface, buried, or concealed installation.',
  'Trunking symbols are rectangular outlines along the run; compartmented trunking shows internal dividers separating power and data conductors.',
  'Busbar trunking (BS EN 61439-6) is drawn as a thick line with tap-off symbols at each branch — used for large-current main distribution in commercial and industrial premises.',
  'Cable tray symbols are drawn as a single line or rectangle along the route, with a directional indicator for drops between levels.',
  'Containment fill calculations to BS 7671 Appendix 5 / IET guidance determine the minimum size for the cables specified — Elec-Mate includes a containment fill calculator.',
];

const faqs = [
  {
    question: 'How is conduit drawn on an installation drawing?',
    answer:
      'Conduit is drawn as a single line along the route between accessories, with the size annotated (e.g. "20mm" or "20") at intervals. The line style indicates the installation method — solid for surface, dashed for concealed in walls/ceilings, dot-dash for buried in floors or external. Junction boxes are shown as filled circles where conduits meet.',
  },
  {
    question: 'What is the symbol for cable tray?',
    answer:
      'Cable tray is drawn as either a single thick line (on small-scale drawings) or a rectangular outline showing the tray width (on larger plans). The route is followed in plan and elevation, with riser drops shown by directional arrows. Tray supports are typically not drawn explicitly but spacing is specified in the design notes (typically 1.5-2 m intervals for medium-duty tray).',
  },
  {
    question: 'How do I show busbar trunking vs cable trunking?',
    answer:
      'Busbar trunking is drawn as a thick filled rectangle along the run, with tap-off boxes shown as smaller filled squares at branch points. Standard cable trunking is drawn as a hollow rectangular outline. Busbar trunking carries higher current and is typically used for risers in tall buildings and main distribution in factories — cable trunking carries individual cables that must be drawn-in.',
  },
  {
    question: 'Is conduit on a drawing always surface-mounted?',
    answer:
      'Not necessarily. The line style indicates the mounting — solid for surface, dashed for concealed (in walls or chases), dot-dash for buried (in floors or external). Always check the drawing legend. Galvanised steel conduit is preferred for surface and exposed locations; PVC conduit (BS EN 61386-21) is common in commercial wiring and acceptable concealed in walls.',
  },
  {
    question: 'What is underfloor trunking used for?',
    answer:
      'Underfloor trunking is a system cast into a concrete floor screed with periodic outlet boxes (typically at 1.5-3 m centres). It allows power, data, audio and video to be delivered to any point on the floor — essential in open-plan offices and conference rooms where furniture layouts change. Floor boxes are drawn as squares at the outlet positions; the trunking runs are shown as solid lines connecting them.',
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
    heading: 'Cable Containment Symbols — Complete Symbol Set',
    content: (
      <>
        <p>
          Below are every cable containment symbols on the Elec-Mate symbol library, drawn to BS EN
          60617. Right-click any symbol to save the SVG, or use the{' '}
          <SEOInternalLink href="/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> to drag
          them directly into a circuit drawing.
        </p>
        <SymbolGallery category="containment" showCategoryHeadings={false} />
      </>
    ),
  },
  {
    id: 'about',
    heading: 'About Cable Containment Symbols',
    content: (
      <>
        <p>
          Every cable containment symbol — conduit through busbar trunking to underfloor systems —
          drawn to BS EN 60617 with BS EN 61386 and BS EN 50085 cross-references.
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

export default function ElectricalContainmentSymbolsPage() {
  return (
    <GuideTemplate
      title="Cable Containment Symbols | Conduit, Trunking, Tray BS EN"
      description="Conduit, trunking, busbar trunking, cable tray, floor trunking, underfloor trunking…"
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Cable Containment Symbols:{' '}
          <span className="text-yellow-400">Conduit, trunking + cable tray references</span>
        </>
      }
      heroSubtitle="Every cable containment symbol — conduit through busbar trunking to underfloor systems — drawn to BS EN 60617 with BS EN 61386 and BS EN 50085 cross-references."
      readingTime={6}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="FAQ — Cable Containment Symbols"
      relatedPages={relatedPages}
      ctaHeading="Use BS EN 60617 symbols in working drawings"
      ctaSubheading="Drag-and-drop circuit diagrams. EICR + EIC schedules with correct symbols. Built for UK electricians. 7-day free trial."
    />
  );
}
