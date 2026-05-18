import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { PenTool, BookOpen, FileCheck2, ShieldCheck } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Distribution Symbols', href: '/guides/electrical-distribution-symbols' },
  { label: 'SPD (Surge Protection Device)', href: '/guides/spd-symbol' },
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
    heading: 'SPD (Surge Protection Device) — BS EN 60617 Symbol',
    content: (
      <>
        <SymbolGallery
          symbolIds={['spd']}
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
    heading: 'What the SPD (Surge Protection Device) Symbol Represents',
    content: (
      <>
        <p>
          A Surge Protective Device to BS EN 61643-11. Type 1 (lightning current), Type 2 (transient
          overvoltage), Type 3 (point of use). BS 7671 443.4 risk assessment usually requires Type 2
          at origin.
        </p>
      </>
    ),
  },
  {
    id: 'when-used',
    heading: 'When + Where the SPD (Surge Protection Device) Symbol Is Used',
    content: (
      <>
        <p>
          New installations + rewires — Type 2 at consumer unit origin; Type 1 where lightning
          protection is fitted.
        </p>
        <p>
          For the full set of distribution symbols, see the{' '}
          <SEOInternalLink href="/guides/electrical-distribution-symbols">
            Distribution Symbols reference page
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
    heading: 'Related Distribution Symbols',
    content: (
      <>
        <p>Other distribution symbols you may need on the same drawing:</p>
        <SymbolGallery
          category="distribution"
          showCategoryHeadings={false}
          showImageObjectSchema={false}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrical-distribution-symbols',
    title: 'Distribution Symbols — Complete Reference',
    description: 'Every distribution symbol grouped together with installation context.',
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

export default function SpdSymbolPage() {
  return (
    <GuideTemplate
      title="SPD Symbol | BS EN 61643-11 Surge Protection Drawing"
      description="SPD (Surge Protection Device) BS EN 60617 symbol — what it represents, when used in UK electrical drawings, and where it appears on EIC + EICR schedules."
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          SPD (Surge Protection Device) Symbol{' '}
          <span className="text-yellow-400">BS EN 60617 reference</span>
        </>
      }
      heroSubtitle="SPD surge protection device electrical symbol BS EN 60617 — what it represents, where it appears in UK electrical drawings, and how it relates to the rest of the symbol library."
      readingTime={4}
      keyTakeaways={[
        'A Surge Protective Device to BS EN 61643-11. Type 1 (lightning current), Type 2 (transient overvoltage), Type 3 (point of use). BS 7671 443.4 risk assessment usually requires Type 2 at origin.',
        'New installations + rewires — Type 2 at consumer unit origin; Type 1 where lightning protection is fitted.',
        'Every Elec-Mate certificate + circuit diagram uses this symbol where applicable, drawn to BS EN 60617.',
      ]}
      sections={sections}
      faqs={[
        {
          question: 'What does the SPD (Surge Protection Device) symbol mean?',
          answer:
            'A Surge Protective Device to BS EN 61643-11. Type 1 (lightning current), Type 2 (transient overvoltage), Type 3 (point of use). BS 7671 443.4 risk assessment usually requires Type 2 at origin.',
        },
        {
          question: 'Where is the SPD (Surge Protection Device) symbol used?',
          answer:
            'New installations + rewires — Type 2 at consumer unit origin; Type 1 where lightning protection is fitted.',
        },
      ]}
      faqHeading="FAQ — SPD (Surge Protection Device) Symbol"
      relatedPages={relatedPages}
      ctaHeading="Use this symbol in real drawings"
      ctaSubheading="Drag and drop BS EN 60617 symbols into circuit diagrams, EICR observation drawings, and EIC distribution schedules. 7-day free trial."
    />
  );
}
