import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { PenTool, BookOpen, FileCheck2, ShieldCheck } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Safety + Security Symbols', href: '/guides/electrical-safety-symbols' },
  { label: 'Fire Alarm Sounder', href: '/guides/fire-alarm-symbol' },
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
    heading: 'Fire Alarm Sounder — BS EN 60617 Symbol',
    content: (
      <>
        <SymbolGallery
          symbolIds={['fire-alarm']}
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
    heading: 'What the Fire Alarm Sounder Symbol Represents',
    content: (
      <>
        <p>
          A fire alarm sounder to BS EN 54-3. Produces minimum 65 dB at the bedhead per BS 5839-1,
          with the fire-alarm tone defined in BS 5839 Annex E.
        </p>
      </>
    ),
  },
  {
    id: 'when-used',
    heading: 'When + Where the Fire Alarm Sounder Symbol Is Used',
    content: (
      <>
        <p>Commercial premises, HMOs, places of assembly; covered by fire risk assessment.</p>
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

export default function FireAlarmSymbolPage() {
  return (
    <GuideTemplate
      title="Fire Alarm Sounder Symbol | BS EN 54-3 Reference"
      description="Fire Alarm Sounder BS EN 60617 symbol — what it represents, when used in UK electrical drawings, and where it appears on EIC + EICR schedules."
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Fire Alarm Sounder Symbol <span className="text-yellow-400">BS EN 60617 reference</span>
        </>
      }
      heroSubtitle="Fire alarm sounder electrical symbol BS EN 60617 — what it represents, where it appears in UK electrical drawings, and how it relates to the rest of the symbol library."
      readingTime={4}
      keyTakeaways={[
        'A fire alarm sounder to BS EN 54-3. Produces minimum 65 dB at the bedhead per BS 5839-1, with the fire-alarm tone defined in BS 5839 Annex E.',
        'Commercial premises, HMOs, places of assembly; covered by fire risk assessment.',
        'Every Elec-Mate certificate + circuit diagram uses this symbol where applicable, drawn to BS EN 60617.',
      ]}
      sections={sections}
      faqs={[
        {
          question: 'What does the Fire Alarm Sounder symbol mean?',
          answer:
            'A fire alarm sounder to BS EN 54-3. Produces minimum 65 dB at the bedhead per BS 5839-1, with the fire-alarm tone defined in BS 5839 Annex E.',
        },
        {
          question: 'Where is the Fire Alarm Sounder symbol used?',
          answer: 'Commercial premises, HMOs, places of assembly; covered by fire risk assessment.',
        },
      ]}
      faqHeading="FAQ — Fire Alarm Sounder Symbol"
      relatedPages={relatedPages}
      ctaHeading="Use this symbol in real drawings"
      ctaSubheading="Drag and drop BS EN 60617 symbols into circuit diagrams, EICR observation drawings, and EIC distribution schedules. 7-day free trial."
    />
  );
}
