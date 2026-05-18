import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { PenTool, BookOpen, FileCheck2, ShieldCheck } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Safety + Security Symbols', href: '/guides/electrical-safety-symbols' },
  { label: 'Manual Call Point (Break Glass)', href: '/guides/break-glass-symbol' },
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
    heading: 'Manual Call Point (Break Glass) — BS EN 60617 Symbol',
    content: (
      <>
        <SymbolGallery
          symbolIds={['break-glass']}
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
    heading: 'What the Manual Call Point (Break Glass) Symbol Represents',
    content: (
      <>
        <p>
          A manual call point to BS EN 54-11. The break-glass/press-glass element used to manually
          trigger the fire alarm system. Sited near exits and on escape routes.
        </p>
      </>
    ),
  },
  {
    id: 'when-used',
    heading: 'When + Where the Manual Call Point (Break Glass) Symbol Is Used',
    content: (
      <>
        <p>Every fire-alarm system; on escape routes, at exits, at landing levels.</p>
        <p>
          For the full set of safety + security symbols, see the{' '}
          <SEOInternalLink href="/guides/electrical-safety-symbols">
            Safety + Security Symbols reference page
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
    heading: 'Related Safety + Security Symbols',
    content: (
      <>
        <p>Other safety + security symbols you may need on the same drawing:</p>
        <SymbolGallery
          category="safety"
          showCategoryHeadings={false}
          showImageObjectSchema={false}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrical-safety-symbols',
    title: 'Safety + Security Symbols — Complete Reference',
    description: 'Every safety + security symbol grouped together with installation context.',
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

export default function BreakGlassSymbolPage() {
  return (
    <GuideTemplate
      title="Break Glass Call Point Symbol | BS EN 54-11"
      description="Manual Call Point (Break Glass) BS EN 60617 symbol — what it represents, when used in UK electrical drawings…"
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Manual Call Point (Break Glass) Symbol{' '}
          <span className="text-yellow-400">BS EN 60617 reference</span>
        </>
      }
      heroSubtitle="Manual call point break glass fire alarm electrical symbol BS EN 60617 — what it represents, where it appears in UK electrical drawings, and how it relates to the rest of the symbol library."
      readingTime={4}
      keyTakeaways={[
        'A manual call point to BS EN 54-11. The break-glass/press-glass element used to manually trigger the fire alarm system. Sited near exits and on escape routes.',
        'Every fire-alarm system; on escape routes, at exits, at landing levels.',
        'Every Elec-Mate certificate + circuit diagram uses this symbol where applicable, drawn to BS EN 60617.',
      ]}
      sections={sections}
      faqs={[
        {
          question: 'What does the Manual Call Point (Break Glass) symbol mean?',
          answer:
            'A manual call point to BS EN 54-11. The break-glass/press-glass element used to manually trigger the fire alarm system. Sited near exits and on escape routes.',
        },
        {
          question: 'Where is the Manual Call Point (Break Glass) symbol used?',
          answer: 'Every fire-alarm system; on escape routes, at exits, at landing levels.',
        },
      ]}
      faqHeading="FAQ — Manual Call Point (Break Glass) Symbol"
      relatedPages={relatedPages}
      ctaHeading="Use this symbol in real drawings"
      ctaSubheading="Drag and drop BS EN 60617 symbols into circuit diagrams, EICR observation drawings, and EIC distribution schedules. 7-day free trial."
    />
  );
}
