import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { PenTool, BookOpen, FileCheck2, ShieldCheck } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Lighting Symbols', href: '/guides/electrical-lighting-symbols' },
  { label: 'Exit Sign', href: '/guides/exit-sign-symbol' },
];

const tocItems = [
  { id: 'the-symbol', label: 'The Symbol' },
  { id: 'what-it-represents', label: 'What It Represents' },
  { id: 'when-used', label: 'When + Where Used' },
  { id: 'related', label: 'Related Symbols' },
];

const sections = [
  {
    id: 'the-symbol',
    heading: 'Exit Sign — BS EN 60617 Symbol',
    content: (
      <>
        <SymbolGallery
          symbolIds={['exit-sign']}
          showCategoryHeadings={false}
          showImageObjectSchema={true}
        />
        <p className="text-sm text-white/70 mt-4">
          Right-click the symbol above to save the SVG, or use the{' '}
          <SEOInternalLink href="/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> to drop
          it into a working drawing.
        </p>
      </>
    ),
  },
  {
    id: 'what-it-represents',
    heading: 'What the Exit Sign Symbol Represents',
    content: (
      <>
        <p>
          A maintained or non-maintained emergency exit sign to BS EN 1838. Indicates the direction
          of escape; runs on battery during mains failure for at least 3 hours per BS 5266.
        </p>
      </>
    ),
  },
  {
    id: 'when-used',
    heading: 'When + Where the Exit Sign Symbol Is Used',
    content: (
      <>
        <p>Above doors on escape routes, change-of-direction points, top of staircases.</p>
        <p>
          For the full set of lighting symbols, see the{' '}
          <SEOInternalLink href="/guides/electrical-lighting-symbols">
            Lighting Symbols reference page
          </SEOInternalLink>{' '}
          — covering every related symbol with the same level of installation context.
        </p>
        <SEOAppBridge
          title="Drop this symbol into a circuit drawing"
          description="The Elec-Mate Diagram Builder gives you every BS EN 60617 symbol on a draggable canvas — perfect for EIC schedules, EICR observation diagrams…"
          ctaText="Open the Diagram Builder"
          ctaHref="/ai-diagram-builder"
        />
      </>
    ),
  },
  {
    id: 'related',
    heading: 'Related Lighting Symbols',
    content: (
      <>
        <p>Other lighting symbols you may need on the same drawing:</p>
        <SymbolGallery
          category="lighting"
          showCategoryHeadings={false}
          showImageObjectSchema={false}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrical-lighting-symbols',
    title: 'Lighting Symbols — Complete Reference',
    description: 'Every lighting symbol grouped together with installation context.',
    icon: 'PenTool',
    category: 'Reference',
  },
  {
    href: '/guides/electrical-symbols-chart',
    title: 'BS EN 60617 Master Symbol Library',
    description: 'All 114 UK electrical symbols across 11 categories — the master reference.',
    icon: 'BookOpen',
    category: 'Reference',
  },
  {
    href: '/guides/how-to-read-wiring-diagram',
    title: 'How to Read a Wiring Diagram',
    description: 'Apply BS EN 60617 symbols to interpret installation drawings.',
    icon: 'FileCheck2',
    category: 'Guide',
  },
  {
    href: '/ai-diagram-builder',
    title: 'AI Diagram Builder',
    description: 'Drag and drop the symbol library into a working circuit drawing.',
    icon: 'ShieldCheck',
    category: 'Tool',
  },
];

export default function ExitSignSymbolPage() {
  return (
    <GuideTemplate
      title="Exit Sign Symbol | BS EN 1838 + BS 5266 Reference"
      description="Exit Sign BS EN 60617 symbol — what it represents, when used in UK electrical drawings, and where it appears on EIC + EICR schedules."
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Exit Sign Symbol <span className="text-yellow-400">BS EN 60617 reference</span>
        </>
      }
      heroSubtitle="Emergency exit sign electrical symbol BS EN 60617 — what it represents, where it appears in UK electrical drawings, and how it relates to the rest of the symbol library."
      readingTime={4}
      keyTakeaways={[
        'A maintained or non-maintained emergency exit sign to BS EN 1838. Indicates the direction of escape; runs on battery during mains failure for at least 3 hours per BS 5266.',
        'Above doors on escape routes, change-of-direction points, top of staircases.',
        'Every Elec-Mate certificate + circuit diagram uses this symbol where applicable, drawn to BS EN 60617.',
      ]}
      sections={sections}
      faqs={[
        {
          question: 'What does the Exit Sign symbol mean?',
          answer:
            'A maintained or non-maintained emergency exit sign to BS EN 1838. Indicates the direction of escape; runs on battery during mains failure for at least 3 hours per BS 5266.',
        },
        {
          question: 'Where is the Exit Sign symbol used?',
          answer: 'Above doors on escape routes, change-of-direction points, top of staircases.',
        },
      ]}
      faqHeading="FAQ — Exit Sign Symbol"
      relatedPages={relatedPages}
      ctaHeading="Use this symbol in real drawings"
      ctaSubheading="Drag and drop BS EN 60617 symbols into circuit diagrams, EICR observation drawings, and EIC distribution schedules. 7-day free trial."
    />
  );
}
