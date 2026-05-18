import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ShieldCheck, BookOpen, FileCheck2, PenTool } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Socket Outlet Symbols', href: '/guides/electrical-socket-symbols' },
];

const tocItems = [
  { id: 'gallery', label: 'Symbol Gallery' },
  { id: 'about', label: 'About Socket Outlet Symbols' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'UK socket symbols use a semicircle shape — single = one semicircle, double = two semicircles back-to-back. A line through the symbol indicates the socket is switched.',
  'A Fused Connection Unit (FCU / fused spur) symbol shows the basic socket outline with an integral fuse holder — used to provide local protection for fixed appliances like boilers and extractor fans.',
  'Shaver sockets are the only socket type permitted inside bathroom zone 2 — the integral isolating transformer (BS EN 61558-2-5) galvanically separates the user from earth.',
  'EV charger outlet symbols indicate a dedicated BS 7671 Section 722 circuit — must include a Type A RCD or RDC-DD per Regulation 722.531.',
  'Outdoor IP66 socket symbols specify weatherproof, RCD-protected outlets suitable for garden tools, EV charging from a standard socket, and exterior power.',
];

const faqs = [
  {
    question: 'What is the symbol for a double 13A socket?',
    answer:
      'A double 13A socket is drawn as two semicircles connected back-to-back, sharing a common base line representing the back box. A short line crossing the symbol indicates that the socket is switched. The symbol applies to standard BS 1363 double sockets — the workhorse of every UK domestic and commercial installation.',
  },
  {
    question: 'How do I draw a fused spur on a wiring diagram?',
    answer:
      'A Fused Connection Unit (FCU / fused spur) is drawn as a small rectangle (representing the spur outlet plate) with an integral fuse holder symbol — a small open rectangle with the fuse current rating inside. Add a switch symbol on top for a switched fused spur, or omit it for an unswitched spur. Always label the spur with what it feeds and the fuse rating (typically 3A or 13A).',
  },
  {
    question: 'Why does a shaver socket have a different symbol?',
    answer:
      'A shaver socket has a different symbol because it includes an isolating transformer — drawn as two adjacent coils with no electrical connection. The transformer galvanically isolates the shaver from the supply, which is why shaver sockets are the only socket type permitted in bathroom zone 2 (BS 7671 Section 701). The output is a non-earth-referenced LV supply.',
  },
  {
    question: 'What rating is a cooker outlet supplied at?',
    answer:
      'A cooker outlet (BS 1363 cooker connection unit) is typically supplied via a 32A or 40A radial circuit. The cooker control unit is a 45A double-pole switch — sometimes with an integral 13A socket above the worktop. Older installations may use 6mm² T+E on a 32A MCB; modern range cookers may need 10mm² and a 40A MCB.',
  },
  {
    question: 'What is the difference between switched and unswitched fused spurs?',
    answer:
      'A switched fused spur has an integral rocker switch and neon indicator, allowing the appliance to be isolated without going to the consumer unit. An unswitched fused spur has only the fuse — to isolate the appliance you need to remove the fuse carrier or operate the upstream MCB. Switched is preferred for towel rails, immersion heaters, and any appliance that benefits from local isolation. Unswitched suits hard-wired appliances like extractor fans where local switching is undesirable.',
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
    heading: 'Socket Outlet Symbols — Complete Symbol Set',
    content: (
      <>
        <p>
          Below are every socket outlet symbols on the Elec-Mate symbol library, drawn to BS EN
          60617. Right-click any symbol to save the SVG, or use the{' '}
          <SEOInternalLink href="/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> to drag
          them directly into a circuit drawing.
        </p>
        <SymbolGallery category="socket" showCategoryHeadings={false} />
      </>
    ),
  },
  {
    id: 'about',
    heading: 'About Socket Outlet Symbols',
    content: (
      <>
        <p>
          Every socket outlet symbol used on UK installation drawings — single 13A through to EV
          chargers and outdoor IP66 — drawn to BS EN 60617 with BS 7671 context.
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

export default function ElectricalSocketSymbolsPage() {
  return (
    <GuideTemplate
      title="Electrical Socket Symbols | BS EN 60617 Outlet Reference"
      description="Single 13A, double 13A, fused spur, cooker, shaver, USB, data RJ45, telephone, TV, EV charger and outdoor IP66 socket outlet symbols to BS EN 60617."
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Socket Outlet Symbols:{' '}
          <span className="text-yellow-400">BS EN 60617 reference for UK electricians</span>
        </>
      }
      heroSubtitle="Every socket outlet symbol used on UK installation drawings — single 13A through to EV chargers and outdoor IP66 — drawn to BS EN 60617 with BS 7671 context."
      readingTime={6}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="FAQ — Socket Outlet Symbols"
      relatedPages={relatedPages}
      ctaHeading="Use BS EN 60617 symbols in working drawings"
      ctaSubheading="Drag-and-drop circuit diagrams. EICR + EIC schedules with correct symbols. Built for UK electricians. 7-day free trial."
    />
  );
}
