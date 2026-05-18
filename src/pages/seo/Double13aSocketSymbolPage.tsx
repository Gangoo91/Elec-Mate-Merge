import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { PenTool, BookOpen, FileCheck2, ShieldCheck } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Socket Outlet Symbols', href: '/guides/electrical-socket-symbols' },
  { label: 'Double 13A Socket Outlet', href: '/guides/double-13a-socket-symbol' },
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
    heading: 'Double 13A Socket Outlet — BS EN 60617 Symbol',
    content: (
      <>
        <SymbolGallery
          symbolIds={['double-13a-socket']}
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
    heading: 'What the Double 13A Socket Outlet Symbol Represents',
    content: (
      <>
        <p>
          A twin 13A switched socket — two outlets on one back box. Drawn as two semicircles
          back-to-back. Standard outlet for living spaces, bedrooms and offices.
        </p>
      </>
    ),
  },
  {
    id: 'when-used',
    heading: 'When + Where the Double 13A Socket Outlet Symbol Is Used',
    content: (
      <>
        <p>
          Bedrooms (typically 2-4 doubles), living rooms, kitchens, offices — the workhorse outlet.
        </p>
        <p>
          For the full set of socket outlet symbols, see the{' '}
          <SEOInternalLink href="/guides/electrical-socket-symbols">
            Socket Outlet Symbols reference page
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
    heading: 'Related Socket Outlet Symbols',
    content: (
      <>
        <p>Other socket outlet symbols you may need on the same drawing:</p>
        <SymbolGallery
          category="socket"
          showCategoryHeadings={false}
          showImageObjectSchema={false}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrical-socket-symbols',
    title: 'Socket Outlet Symbols — Complete Reference',
    description: 'Every socket outlet symbol grouped together with installation context.',
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

export default function Double13aSocketSymbolPage() {
  return (
    <GuideTemplate
      title="Double 13A Socket Symbol | BS 1363 Drawing Reference"
      description="Double 13A Socket Outlet BS EN 60617 symbol — what it represents, when used in UK electrical drawings, and where it appears on EIC + EICR schedules."
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Double 13A Socket Outlet Symbol{' '}
          <span className="text-yellow-400">BS EN 60617 reference</span>
        </>
      }
      heroSubtitle="Double 13A switched socket outlet electrical symbol BS EN 60617 — what it represents, where it appears in UK electrical drawings, and how it relates to the rest of the symbol library."
      readingTime={4}
      keyTakeaways={[
        'A twin 13A switched socket — two outlets on one back box. Drawn as two semicircles back-to-back. Standard outlet for living spaces, bedrooms and offices.',
        'Bedrooms (typically 2-4 doubles), living rooms, kitchens, offices — the workhorse outlet.',
        'Every Elec-Mate certificate + circuit diagram uses this symbol where applicable, drawn to BS EN 60617.',
      ]}
      sections={sections}
      faqs={[
        {
          question: 'What does the Double 13A Socket Outlet symbol mean?',
          answer:
            'A twin 13A switched socket — two outlets on one back box. Drawn as two semicircles back-to-back. Standard outlet for living spaces, bedrooms and offices.',
        },
        {
          question: 'Where is the Double 13A Socket Outlet symbol used?',
          answer:
            'Bedrooms (typically 2-4 doubles), living rooms, kitchens, offices — the workhorse outlet.',
        },
      ]}
      faqHeading="FAQ — Double 13A Socket Outlet Symbol"
      relatedPages={relatedPages}
      ctaHeading="Use this symbol in real drawings"
      ctaSubheading="Drag and drop BS EN 60617 symbols into circuit diagrams, EICR observation drawings, and EIC distribution schedules. 7-day free trial."
    />
  );
}
