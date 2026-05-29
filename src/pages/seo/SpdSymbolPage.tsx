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
          A Surge Protective Device to BS EN 61643-11. Types 1, 2 and 3 are placed according to the
          Lightning Protection Zone (LPZ) concept (Figure 534.1): Type 1 at the LPZ&nbsp;0/1
          boundary (direct lightning current — incoming service where an external lightning
          protection system is fitted), Type 2 at the LPZ&nbsp;1/2 boundary (transient overvoltage —
          distribution board or consumer unit origin), and Type 3 at final sub-circuit equipment
          (point of use). Coordination, per OSG 3.7.4, ensures each downstream device's voltage
          protection level (Up) is lower than the upstream device's let-through.
        </p>
        <p className="mt-3">
          <strong>BS 7671 Reg 443.4 — when is SPD protection mandatory?</strong> Protection is
          mandatory without further assessment where a transient overvoltage could result in:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>serious injury to, or loss of, human life (Reg 443.4(a))</li>
          <li>interruption of public services or damage to cultural heritage (Reg 443.4(b))</li>
          <li>interruption of commercial or industrial activity (Reg 443.4(c))</li>
          <li>a large number of co-located individuals being affected (Reg 443.4(d))</li>
        </ul>
        <p className="mt-3">
          For all other cases a risk assessment is required to determine whether SPDs are necessary
          (Reg 443.4 final paragraph). There is also an exception for single dwelling units in
          certain specified situations — the installer shall confirm whether it applies before
          omitting protection.
        </p>
        <p className="mt-3 text-sm text-white/60 italic">
          Note: Section 534 was completely revised in the A4:2026 amendment. The revision updates
          requirements for the selection and erection of SPDs, including a significant technical
          change to the SPD voltage protection level (Up) selection criteria (Reg 527.1.3 note).
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
          Where Section 443 requires SPDs and no external lightning protection system is fitted (or
          the structure does not require protection against direct lightning), Reg 534.4.1.4
          mandates Type 2 SPDs installed as close as possible to the origin of the installation
          (consumer unit or main distribution board). Where an external lightning protection system
          is present, a Type 1 SPD is required at the LPZ&nbsp;0/1 boundary (incoming service).
        </p>
        <p className="mt-3">
          <strong>Conductor sizing — Reg 534.4.10</strong> (connecting conductors between the SPD
          and the main earthing terminal or protective conductor):
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            Type 2 SPD at or near the origin: protective conductor not less than{' '}
            <strong>6&nbsp;mm² copper</strong> (live conductor not less than 2.5&nbsp;mm²)
          </li>
          <li>
            Type 1 SPD at or near the origin: protective conductor not less than{' '}
            <strong>16&nbsp;mm² copper</strong> (live conductor not less than 6&nbsp;mm²)
          </li>
        </ul>
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
        'Surge Protective Device to BS EN 61643-11. Types placed by LPZ zone: Type 1 at incoming service (LPZ 0/1, direct lightning), Type 2 at consumer unit/distribution board origin (LPZ 1/2), Type 3 at final equipment.',
        'BS 7671 Reg 443.4: SPD protection is mandatory (no risk assessment needed) where a transient overvoltage could cause loss of life, disrupt public services, interrupt commercial activity, or affect large numbers of people. All other cases require a risk assessment. Single dwelling units have a specific exception.',
        'Where Section 443 requires SPDs and no external lightning protection system is fitted, Reg 534.4.1.4 requires Type 2 SPDs as close as possible to the installation origin. Connecting conductor minimums (Reg 534.4.10): 6 mm² Cu for Type 2, 16 mm² Cu for Type 1.',
        'Section 534 was completely revised in A4:2026 — apply the updated selection and erection requirements, including the revised voltage protection level (Up) criteria.',
        'Every Elec-Mate certificate + circuit diagram uses this symbol where applicable, drawn to BS EN 60617.',
      ]}
      sections={sections}
      faqs={[
        {
          question: 'What does the SPD (Surge Protection Device) symbol mean?',
          answer:
            'A Surge Protective Device to BS EN 61643-11. Three types are defined by the Lightning Protection Zone (LPZ) concept: Type 1 at the LPZ 0/1 boundary (lightning current, incoming service where an external lightning protection system is fitted), Type 2 at the LPZ 1/2 boundary (transient overvoltage, consumer unit or distribution board origin), and Type 3 at final sub-circuit equipment (point of use).',
        },
        {
          question: 'When does BS 7671 require an SPD?',
          answer:
            'BS 7671 Reg 443.4 makes SPD protection mandatory — without needing a further risk assessment — where a transient overvoltage could result in loss of human life (443.4(a)), interruption of public services or damage to cultural heritage (443.4(b)), interruption of commercial or industrial activity (443.4(c)), or a large number of co-located individuals being affected (443.4(d)). For all other cases a risk assessment is required. A specific exception exists for single dwelling units in certain situations.',
        },
        {
          question: 'What conductor size is needed for an SPD connection?',
          answer:
            'Reg 534.4.10 sets mandatory minimums for the conductor between the SPD and the main earthing terminal or protective conductor: not less than 6 mm² copper for a Type 2 SPD installed at or near the installation origin; not less than 16 mm² copper for a Type 1 SPD at or near the origin. Conductors to live conductors must also withstand the prospective short-circuit current (Reg 433.3.1(b)).',
        },
      ]}
      faqHeading="FAQ — SPD (Surge Protection Device) Symbol"
      relatedPages={relatedPages}
      ctaHeading="Use this symbol in real drawings"
      ctaSubheading="Drag and drop BS EN 60617 symbols into circuit diagrams, EICR observation drawings, and EIC distribution schedules. 7-day free trial."
    />
  );
}
