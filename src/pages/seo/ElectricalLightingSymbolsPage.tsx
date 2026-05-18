import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ShieldCheck, BookOpen, FileCheck2, PenTool } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Lighting Symbols', href: '/guides/electrical-lighting-symbols' },
];

const tocItems = [
  { id: 'gallery', label: 'Symbol Gallery' },
  { id: 'about', label: 'About Lighting Symbols' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Lighting symbols on UK drawings indicate fitting type, mounting (surface, recessed, suspended) and connection point — typically labelled with circuit reference and switch designation.',
  'Emergency light symbols differentiate maintained (lit in normal use) from non-maintained (illuminates only on mains failure). BS 5266-1 requires monthly function tests + annual 3-hour duration tests.',
  'Exit sign symbols to BS EN 1838 indicate the direction of escape — always mounted above doors on escape routes and at every change of direction.',
  'Fire-rated downlight symbols are required where the downlight breaches a fire-rated ceiling, such as flats, loft conversions, and ceilings between dwellings.',
  'Elec-Mate generates correct BS EN 60617 lighting symbols on every circuit drawing, emergency lighting layout and certificate.',
];

const faqs = [
  {
    question: 'What is the symbol for a downlight?',
    answer:
      'A downlight is drawn as a small circle representing the lamp aperture, often with an inner dot for the lamp itself. Recessed downlights may include a dashed outline showing the recess box. Fire-rated downlights are typically shown with an "F" or "FR" annotation inside the circle to confirm 30/60/90 minute fire integrity rating.',
  },
  {
    question: 'How do I show emergency lighting on a plan?',
    answer:
      'Emergency lights are drawn using the standard luminaire symbol with an additional "E" or "EM" annotation, plus a battery symbol or filled triangle indicating the emergency-rated fitting. Non-maintained emergency lights have hollow markings; maintained (always-on) lights use solid fill. Test switches are shown as a separate symbol.',
  },
  {
    question: 'What is the difference between maintained and non-maintained emergency lighting?',
    answer:
      'Maintained emergency lighting stays illuminated all the time — on mains failure it continues to run from the internal battery. Non-maintained emergency lighting is OFF in normal use, only switching on when the mains fails. Maintained is used where the emergency lighting is also part of normal illumination (e.g. exit signs). Non-maintained is used where the location is normally lit by other means (e.g. escape stairwells).',
  },
  {
    question: 'When are exit signs required?',
    answer:
      'Exit signs are required by BS 5266-1 in every place where the public or employees may be present and would need to find an exit in an emergency — offices, shops, schools, places of assembly, HMOs, hotels, hospitals. They must be sited above every exit door on the escape route, at every change of direction, and at the top of every staircase descending to an exit. Mounting height is typically 2.0-2.4 m, with maximum viewing distance of 24 m for internally illuminated signs.',
  },
  {
    question: 'How are LED strip lights drawn on a plan?',
    answer:
      'LED strip lights are drawn as a thick dashed line along the run, with a separate symbol for the LED driver. The driver location is critical — typically within 2 m of the strip for voltage drop reasons. Specify constant-voltage (CV) drivers for standard LED tape (12V or 24V DC) and constant-current (CC) for high-output COB strips.',
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
    heading: 'Lighting Symbols — Complete Symbol Set',
    content: (
      <>
        <p>
          Below are every lighting symbols on the Elec-Mate symbol library, drawn to BS EN 60617.
          Right-click any symbol to save the SVG, or use the{' '}
          <SEOInternalLink href="/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> to drag
          them directly into a circuit drawing.
        </p>
        <SymbolGallery category="lighting" showCategoryHeadings={false} />
      </>
    ),
  },
  {
    id: 'about',
    heading: 'About Lighting Symbols',
    content: (
      <>
        <p>
          Every lighting symbol used on UK electrical drawings — pendant to high bay, plus emergency
          lighting and exit signs to BS 5266 and BS EN 1838 — drawn to BS EN 60617.
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

export default function ElectricalLightingSymbolsPage() {
  return (
    <GuideTemplate
      title="Lighting Symbols | BS EN 60617 Light Fitting Reference"
      description="Pendant, ceiling, downlight, wall, bulkhead, high bay, fluorescent, LED strip, emergency light…"
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Lighting Symbols:{' '}
          <span className="text-yellow-400">BS EN 60617 reference for UK electricians</span>
        </>
      }
      heroSubtitle="Every lighting symbol used on UK electrical drawings — pendant to high bay, plus emergency lighting and exit signs to BS 5266 and BS EN 1838 — drawn to BS EN 60617."
      readingTime={6}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="FAQ — Lighting Symbols"
      relatedPages={relatedPages}
      ctaHeading="Use BS EN 60617 symbols in working drawings"
      ctaSubheading="Drag-and-drop circuit diagrams. EICR + EIC schedules with correct symbols. Built for UK electricians. 7-day free trial."
    />
  );
}
