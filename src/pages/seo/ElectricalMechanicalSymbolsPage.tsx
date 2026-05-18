import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ShieldCheck, BookOpen, FileCheck2, PenTool } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Mechanical + HVAC Symbols', href: '/guides/electrical-mechanical-symbols' },
];

const tocItems = [
  { id: 'gallery', label: 'Symbol Gallery' },
  { id: 'about', label: 'About Mechanical + HVAC Symbols' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Boiler symbols on electrical drawings show the supply termination (usually a switched fused spur near the boiler) rather than the boiler internals — gas/oil boilers need 230 V for pumps, controls and ignition.',
  'Electric water heaters / immersions need a dedicated 16-20 A radial circuit; storage tank immersions in airing cupboards typically run on Economy-7 contactor switching.',
  'Towel rail symbols specify the rating (typically 100-600 W) and the fused spur location — must be outside the bathroom or in zone 3 with IPX4 rating.',
  'Air conditioning split-system symbols show the indoor unit and outdoor condenser separately — supply is normally to the condenser, which then powers the indoor head.',
  'Hand dryer symbols are common in commercial WC drawings — typically 1.5-2.5 kW with a dedicated switched fused spur and local isolation.',
];

const faqs = [
  {
    question: 'How is a boiler supply shown on a drawing?',
    answer:
      'A boiler is drawn as a rectangle (representing the boiler casing) with a switched fused spur symbol immediately adjacent — the spur is the local electrical isolation point. The supply cable to the boiler is shown from the spur into the boiler, typically as 1.0mm² or 1.5mm² flex. Gas and oil boilers need only 230 V for controls and pumps (~150 W); electric boilers need a much heavier circuit (typically 6-12 kW on a dedicated radial).',
  },
  {
    question: 'What size circuit does an immersion heater need?',
    answer:
      'A standard 3 kW immersion heater needs a dedicated 16 A radial circuit on 2.5 mm² cable, supplied via a 20 A double-pole switch (often labelled "Water Heater"). Off-peak/Economy 7 immersions add a contactor controlled by a time switch. Twin-element immersions (top + bottom) typically have separate switching for boost and overnight heat.',
  },
  {
    question: 'Where does a towel rail go on a bathroom plan?',
    answer:
      'A towel rail is drawn on the wall where it is to be installed, with the supply termination point clearly shown. The fused spur supplying the towel rail must be outside the bathroom or in zone 3 (BS 7671 Section 701). The cable run from the spur to the towel rail is shown as a dashed line if buried in the wall. IPX4 rating minimum for the towel rail itself.',
  },
  {
    question: 'How is air conditioning drawn on a plan?',
    answer:
      'A split-system air conditioner is drawn as two separate symbols — the indoor unit (a rectangle on the wall or ceiling representing the head) and the outdoor unit (a rectangle outside the building representing the condenser). The interconnecting cable (typically 1.5mm² or 2.5mm² four-core) is shown as a dashed line between them. The electrical supply is normally to the outdoor unit, which powers the indoor head via the interconnect.',
  },
  {
    question: 'Do hand dryers need an isolator?',
    answer:
      'Yes. A commercial hand dryer (1.5-2.5 kW) should be supplied via a switched fused spur with the fuse rated for the dryer load (typically 13 A). The spur acts as the local isolator for maintenance — required by BS 7671 537.3.2 for any fixed appliance needing periodic servicing. Place the spur outside the WC if possible, or accessible above the dryer.',
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
    heading: 'Mechanical + HVAC Symbols — Complete Symbol Set',
    content: (
      <>
        <p>
          Below are every mechanical + hvac symbols on the Elec-Mate symbol library, drawn to BS EN
          60617. Right-click any symbol to save the SVG, or use the{' '}
          <SEOInternalLink href="/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> to drag
          them directly into a circuit drawing.
        </p>
        <SymbolGallery category="mechanical" showCategoryHeadings={false} />
      </>
    ),
  },
  {
    id: 'about',
    heading: 'About Mechanical + HVAC Symbols',
    content: (
      <>
        <p>
          Every heating, hot water and air conditioning electrical termination symbol — drawn to BS
          EN 60617 with BS 7671 supply requirements for each appliance.
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

export default function ElectricalMechanicalSymbolsPage() {
  return (
    <GuideTemplate
      title="Mechanical + HVAC Symbols | Boilers, Heaters, AC Drawings"
      description="Boiler, water heater, panel heater, air conditioning, fan coil unit, towel rail…"
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Mechanical + HVAC Symbols:{' '}
          <span className="text-yellow-400">Heating, hot water + AC references</span>
        </>
      }
      heroSubtitle="Every heating, hot water and air conditioning electrical termination symbol — drawn to BS EN 60617 with BS 7671 supply requirements for each appliance."
      readingTime={6}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="FAQ — Mechanical + HVAC Symbols"
      relatedPages={relatedPages}
      ctaHeading="Use BS EN 60617 symbols in working drawings"
      ctaSubheading="Drag-and-drop circuit diagrams. EICR + EIC schedules with correct symbols. Built for UK electricians. 7-day free trial."
    />
  );
}
