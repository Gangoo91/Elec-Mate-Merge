import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SymbolGallery } from '@/components/seo/SymbolGallery';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ShieldCheck, BookOpen, FileCheck2, PenTool } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-symbols-chart' },
  { label: 'Distribution Board Symbols', href: '/guides/electrical-distribution-symbols' },
];

const tocItems = [
  { id: 'gallery', label: 'Symbol Gallery' },
  { id: 'about', label: 'About Distribution Board Symbols' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'MCB, RCBO, RCD and AFDD symbols on distribution board schedules differentiate protection types — important for EICR observations, fault diagnosis and Amendment 4 compliance.',
  'A modern consumer unit symbol shows main switch, individual RCBOs for each circuit (preferred over split-load RCD), SPD at origin, and AFDD where required by BS 7671.',
  'Type AC, Type A and Type F RCD symbols indicate the residual current waveform the device can detect — Type AC is being phased out for EV and modern equipment per A2:2022 and A4:2026.',
  'BS 7671 Section 443 requires a risk assessment for SPD provision on every new installation — Type 2 SPDs are typically installed at the consumer unit origin.',
  'Elec-Mate consumer unit schedules use correct BS EN 60617 symbols + show A4:2026 device-type requirements automatically.',
];

const faqs = [
  {
    question: 'What is the difference between MCB and RCBO symbols?',
    answer:
      'An MCB symbol shows the basic switch contact with an additional element representing the thermal/magnetic trip mechanism — typically a rectangle with a curved arrow. An RCBO symbol adds a residual current detection element — usually a transformer ring symbol — on top of the MCB symbol, indicating that the device provides both overcurrent and earth-fault protection in one. On distribution board schedules, RCBOs may be annotated with both the MCB current rating and the residual current rating (e.g. "B16 + 30 mA").',
  },
  {
    question: 'How is an SPD shown on a consumer unit schedule?',
    answer:
      'A Surge Protective Device (SPD) is drawn as a square or rectangular symbol with a variable-resistor element inside — representing the MOV (Metal Oxide Varistor) that absorbs surge current. It connects between live conductors and earth at the origin of the installation. The schedule should specify Type 1 (lightning current), Type 2 (transient overvoltage) or Type 1+2 combined, with the protection level (Up) in kV.',
  },
  {
    question: 'What is the symbol for a 30 mA RCD?',
    answer:
      'A 30 mA RCD symbol shows the switch-disconnector outline plus a torus (ring) symbol representing the summation transformer that detects residual current. The 30 mA rating is annotated next to the symbol — this is the additional protection threshold required by BS 7671 411.3.3 for socket outlets in domestic premises, bathrooms, and outdoor circuits.',
  },
  {
    question: 'Are AFDDs required by symbol convention now?',
    answer:
      'Amendment 2 (2022) recommended AFDDs in HMOs, care homes, student halls and houses of multiple occupation. Amendment 4 (2026) mandates them in those locations and adds further categories. The AFDD symbol is drawn similarly to an RCBO with an additional arc-detection element — typically a flame or zigzag symbol inside the device outline. Schedule annotation should include "AFDD" alongside the current rating.',
  },
  {
    question: 'What does the contactor symbol look like?',
    answer:
      'A contactor symbol shows three (or four) parallel switch contacts with a coil symbol — a small rectangle — indicating that the contacts are electromagnetically operated. The coil is typically supplied at a low voltage (24V AC, 230V AC) by a control circuit. Contactors are used to switch high-current loads remotely or repeatedly — immersion heaters on Economy-7 timers, large lighting banks, motors.',
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
    heading: 'Distribution Board Symbols — Complete Symbol Set',
    content: (
      <>
        <p>
          Below are every distribution board symbols on the Elec-Mate symbol library, drawn to BS EN
          60617. Right-click any symbol to save the SVG, or use the{' '}
          <SEOInternalLink href="/ai-diagram-builder">AI Diagram Builder</SEOInternalLink> to drag
          them directly into a circuit drawing.
        </p>
        <SymbolGallery category="distribution" showCategoryHeadings={false} />
      </>
    ),
  },
  {
    id: 'about',
    heading: 'About Distribution Board Symbols',
    content: (
      <>
        <p>
          Every distribution and protection device symbol — MCB, RCD, RCBO, SPD, contactor, ATS —
          drawn to BS EN 60617 with BS 7671 protection-device cross-references.
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

export default function ElectricalDistributionSymbolsPage() {
  return (
    <GuideTemplate
      title="Distribution Board Symbols | MCB, RCD, RCBO, SPD BS EN 60617"
      description="Consumer unit, distribution board, MCB, MCCB, RCD, RCBO, SPD, meter, contactor, isolator and changeover switch symbols to BS EN 60617 for UK electricians."
      datePublished="2026-05-18"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Symbol Reference"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Distribution Board Symbols:{' '}
          <span className="text-yellow-400">BS EN 60617 reference for UK electricians</span>
        </>
      }
      heroSubtitle="Every distribution and protection device symbol — MCB, RCD, RCBO, SPD, contactor, ATS — drawn to BS EN 60617 with BS 7671 protection-device cross-references."
      readingTime={6}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="FAQ — Distribution Board Symbols"
      relatedPages={relatedPages}
      ctaHeading="Use BS EN 60617 symbols in working drawings"
      ctaSubheading="Drag-and-drop circuit diagrams. EICR + EIC schedules with correct symbols. Built for UK electricians. 7-day free trial."
    />
  );
}
