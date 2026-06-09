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
  { id: 'spd-types', label: 'SPD Types at a Glance' },
  { id: 'when-used', label: 'When + Where Used' },
  { id: 'conductor-sizing', label: 'Conductor Sizing' },
  { id: 'up-coordination', label: 'Voltage Protection Level' },
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
          The symbol denotes a Surge Protective Device to BS EN 61643-11 — a component that diverts
          transient overvoltages (from a lightning strike or supply switching) to earth before they
          reach equipment. Where it appears on a UK drawing it almost always sits at the origin of
          the installation, alongside the main switch and distribution.
        </p>
        <p className="mt-4">
          <strong>BS 7671 Reg 443.4.1 — when is SPD protection mandatory?</strong> Protection
          against transient overvoltages shall be provided where the consequence caused by the
          overvoltage could result in:
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-red-900/20 border border-red-700/40 p-4">
            <div className="text-xs font-mono text-red-300/80">Reg 443.4.1(a)</div>
            <p className="mt-1 text-sm text-white/85">
              Serious injury to, or loss of, human life
            </p>
          </div>
          <div className="rounded-2xl bg-red-900/20 border border-red-700/40 p-4">
            <div className="text-xs font-mono text-red-300/80">Reg 443.4.1(c)</div>
            <p className="mt-1 text-sm text-white/85">
              Significant financial or data loss
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-white/55">
          Limb (b) was deleted by the BS 7671:2018+A2:2022 Corrigendum (May 2023).
        </p>
        <div className="mt-4 rounded-2xl bg-amber-900/20 border border-amber-700/40 p-4">
          <p className="text-sm text-white/85">
            <strong className="text-amber-200">For all other cases</strong>, protection against
            transient overvoltages shall be provided unless the owner of the installation declares
            it is not required due to any loss or damage being tolerable and they accept the risk of
            damage to equipment and any consequential loss. Record the decision on the certificate.
          </p>
        </div>
        <p className="mt-4 text-sm text-white/60 italic">
          Section 534 (selection and erection of SPDs) was substantially revised in the BS
          7671:2018+A4:2026 amendment, including the voltage protection level (Up) selection
          criteria covered further down this page.
        </p>
      </>
    ),
  },
  {
    id: 'spd-types',
    heading: 'SPD Types 1, 2 and 3 — at a Glance',
    content: (
      <>
        <p>
          Three SPD types are positioned by the Lightning Protection Zone (LPZ) concept (Figure
          534.1). Each protects a different boundary, so a fully protected installation often uses
          more than one, coordinated together.
        </p>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="font-semibold text-blue-100">Type 1</h4>
              <span className="text-xs font-mono text-blue-300/80">LPZ 0/1 boundary</span>
            </div>
            <p className="mt-2 text-sm text-white/85">
              Handles partial <strong>direct lightning current</strong> (10/350&nbsp;µs waveform).
              Required at the origin where the structure has an external lightning protection system
              or otherwise needs protection against direct lightning. Bigger connecting conductors
              than a Type 2.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="font-semibold text-blue-100">Type 2</h4>
              <span className="text-xs font-mono text-blue-300/80">LPZ 1/2 boundary</span>
            </div>
            <p className="mt-2 text-sm text-white/85">
              Handles <strong>transient overvoltage</strong> (8/20&nbsp;µs waveform) at the consumer
              unit or main distribution board origin. The most common device on a UK domestic or
              light-commercial drawing.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="font-semibold text-blue-100">Type 3</h4>
              <span className="text-xs font-mono text-blue-300/80">point of use</span>
            </div>
            <p className="mt-2 text-sm text-white/85">
              Fine protection at, or close to, <strong>sensitive final equipment</strong>. Always
              installed downstream of, and coordinated with, a Type 1 and/or Type 2 device — never
              on its own.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/70">
          Type 2 or Type 3 SPDs may also be placed in sub-distribution boards or close to the
          equipment to be protected to achieve the required voltage protection level, coordinated
          with the device(s) at the origin (Reg 534.4.1.5; Figure 534.2).
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
          Once Section 443 has established that SPDs are required, Section 534 decides which type
          goes where. The trigger is whether the structure has external lightning protection:
        </p>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <div className="text-xs font-mono text-yellow-300/80">Reg 534.4.1.4</div>
            <p className="mt-1 text-sm text-white/85">
              <strong>No external lightning protection</strong> (or no need for direct-lightning
              protection): install <strong>Type 2 SPDs</strong> as close as possible to the origin
              of the installation — the consumer unit or main distribution board.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <div className="text-xs font-mono text-yellow-300/80">Reg 534.4.1.3</div>
            <p className="mt-1 text-sm text-white/85">
              <strong>External lightning protection fitted</strong> (or direct-lightning protection
              required): install <strong>Type 1 SPDs</strong> as close as possible to the origin, at
              the LPZ&nbsp;0/1 boundary on the incoming service.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/85">
          <strong>SPDs with RCDs (Reg 534.4.7):</strong> where an SPD sits on the load side of an
          RCD, that RCD shall have an immunity to surge currents of at least{' '}
          <strong>3&nbsp;kA&nbsp;8/20</strong> — a Type&nbsp;S time-delayed RCD satisfies this.
          Installing a Type&nbsp;1 SPD downstream of an RCD is not recommended.
        </p>
        <p className="mt-4">
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
    id: 'conductor-sizing',
    heading: 'SPD Connecting Conductor Sizing (Reg 534.4.10)',
    content: (
      <>
        <p>
          Reg 534.4.10 sets minimum cross-sectional areas for SPDs installed at or near the origin
          of the installation. The protective (earthing) connection and the live-side connection
          have separate minimums:
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-left text-white/70">
                <th className="p-3 font-medium">SPD type (at/near origin)</th>
                <th className="p-3 font-medium">PE / earthing conductor</th>
                <th className="p-3 font-medium">Live conductor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="bg-blue-900/20">
                <td className="p-3 font-medium text-white/90">Type 2</td>
                <td className="p-3 text-white/85">≥ 6&nbsp;mm² copper or equivalent</td>
                <td className="p-3 text-white/85">≥ 2.5&nbsp;mm² copper or equivalent</td>
              </tr>
              <tr className="bg-blue-900/30">
                <td className="p-3 font-medium text-white/90">Type 1</td>
                <td className="p-3 text-white/85">≥ 16&nbsp;mm² copper or equivalent</td>
                <td className="p-3 text-white/85">≥ 6&nbsp;mm² copper or equivalent</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-white/70">
          The live-side conductors connecting the SPD and its overcurrent protective device must
          also be rated to withstand the prospective short-circuit current expected at that point
          (Reg 534.4.10, referring to Reg 433.3.1(b)).
        </p>
        <div className="mt-4 rounded-2xl bg-white/[0.04] border border-white/10 p-4">
          <p className="text-sm text-white/85">
            <strong>Keep the leads short.</strong> Reg 534.4.8 requires all conductors and
            interconnections between the SPD, the line to be protected and any external overcurrent
            device to be kept as short and straight as possible, with unnecessary loops avoided.
            Long leads add inductive voltage drop that raises the effective let-through at the
            equipment.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'up-coordination',
    heading: 'Voltage Protection Level (Up) and Coordination',
    content: (
      <>
        <p>
          The voltage protection level (Up) is the let-through voltage an SPD allows to pass. Reg
          534.4.4.2 requires Up to be selected against impulse withstand voltage Category II of
          Table 443.2 and, in no case, to exceed the equipment's required rated impulse voltage. For
          a standard <strong>230/400&nbsp;V</strong> installation the installed SPD assembly's
          voltage protection level shall not exceed <strong>2.5&nbsp;kV</strong>.
        </p>
        <p className="mt-4 text-sm text-white/70">
          The 2.5&nbsp;kV ceiling lines up with the Category&nbsp;II rated impulse voltage for a
          230/400&nbsp;V system in Table&nbsp;443.2:
        </p>
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-left text-white/70">
                <th className="p-3 font-medium">Overvoltage category</th>
                <th className="p-3 font-medium">Example equipment</th>
                <th className="p-3 font-medium">Rated impulse voltage (Uw)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="p-3 font-medium text-white/90">Category IV</td>
                <td className="p-3 text-white/85">Origin of installation, energy meter</td>
                <td className="p-3 text-white/85">6&nbsp;kV</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-white/90">Category III</td>
                <td className="p-3 text-white/85">Distribution boards, fixed wiring</td>
                <td className="p-3 text-white/85">4&nbsp;kV</td>
              </tr>
              <tr className="bg-blue-900/30">
                <td className="p-3 font-medium text-white/90">Category II</td>
                <td className="p-3 text-white/85">Appliances, tools (SPD target)</td>
                <td className="p-3 text-white/85">2.5&nbsp;kV</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-white/90">Category I</td>
                <td className="p-3 text-white/85">Sensitive electronic equipment</td>
                <td className="p-3 text-white/85">1.5&nbsp;kV</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-white/55">
          Values for a 230/400&nbsp;V nominal installation, Table 443.2.
        </p>
        <div className="mt-4 rounded-2xl bg-amber-900/20 border border-amber-700/40 p-4">
          <p className="text-sm text-white/85">
            <strong className="text-amber-200">Protective distance &gt; 10&nbsp;m.</strong> If the
            distance between the SPD and the equipment it protects exceeds 10&nbsp;m, oscillation can
            raise the voltage at the equipment terminals to as much as twice the SPD's voltage
            protection level. Add a further coordinated SPD closer to the equipment, or select a
            device with a lower Up (Reg 534.4.4.2).
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'related',
    heading: 'Related Distribution Symbols',
    content: (
      <>
        <p>
          Other distribution symbols you may need on the same drawing — and see{' '}
          <SEOInternalLink href="/guides/how-to-read-wiring-diagram">
            how to read a wiring diagram
          </SEOInternalLink>{' '}
          for putting them together into a working installation drawing:
        </p>
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
      dateModified="2026-06-09"
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
      readingTime={5}
      answerBox={{
        question: 'What is the SPD symbol in electrical drawings?',
        answer:
          'The SPD symbol represents a Surge Protective Device to BS EN 61643-11 — a component that diverts transient overvoltages from lightning or supply switching safely to earth. On UK drawings it appears at the origin of the installation. BS 7671 defines three types by Lightning Protection Zone: Type 1 (incoming service), Type 2 (consumer unit/distribution board) and Type 3 (sensitive final equipment).',
      }}
      keyTakeaways={[
        'Surge Protective Device to BS EN 61643-11. Types placed by LPZ zone: Type 1 at incoming service (LPZ 0/1, direct lightning), Type 2 at consumer unit/distribution board origin (LPZ 1/2), Type 3 at final equipment.',
'BS 7671 Reg 443.4.1: SPD protection is mandatory where a transient overvoltage could result in serious injury to, or loss of, human life (a), or significant financial or data loss (c). Limb (b) was deleted by the A2:2022 Corrigendum (May 2023). For all other cases protection shall be provided unless the owner of the installation declares it is not required because any loss or damage is tolerable and accepts the risk.',
        'Where Section 443 requires SPDs and no external lightning protection system is fitted, Reg 534.4.1.4 requires Type 2 SPDs as close as possible to the installation origin. PE connecting-conductor minimums (Reg 534.4.10): 6 mm² Cu for Type 2, 16 mm² Cu for Type 1.',
        'Voltage protection level (Up): for a 230/400 V installation the installed SPD assembly Up shall not exceed 2.5 kV (Reg 534.4.4.2 / Table 443.2 Category II). An SPD on the load side of an RCD needs an RCD with 3 kA 8/20 surge immunity (Reg 534.4.7).',
        'Section 534 (selection and erection of SPDs) was substantially revised in BS 7671:2018+A4:2026 — apply the current requirements.',
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
            'BS 7671 Reg 443.4.1 makes SPD protection mandatory where a transient overvoltage could result in serious injury to, or loss of, human life (443.4.1(a)), or significant financial or data loss (443.4.1(c)). Limb (b) was deleted by the BS 7671:2018+A2:2022 Corrigendum (May 2023). For all other cases protection shall be provided unless the owner of the installation declares it is not required because any loss or damage is tolerable and they accept the risk of damage to equipment and any consequential loss.',
        },
        {
          question: 'What conductor size is needed for an SPD connection?',
          answer:
            'Reg 534.4.10 sets mandatory minimums for the conductor between the SPD and the main earthing terminal or protective conductor: not less than 6 mm² copper for a Type 2 SPD installed at or near the installation origin; not less than 16 mm² copper for a Type 1 SPD at or near the origin. Conductors to live conductors must also withstand the prospective short-circuit current (Reg 433.3.1(b)).',
        },
        {
          question: 'What is the maximum SPD voltage protection level (Up) for a UK installation?',
          answer:
            'For a 230/400 V installation, the installed SPD assembly voltage protection level (Up) shall not exceed 2.5 kV (Reg 534.4.4.2). This matches the Category II required rated impulse voltage for a 230/400 V system in Table 443.2. Up must never exceed the equipment\'s own required rated impulse voltage, and where the SPD is more than 10 m from the equipment a further coordinated SPD may be needed because oscillation can roughly double the terminal voltage.',
        },
      ]}
      faqHeading="FAQ — SPD (Surge Protection Device) Symbol"
      relatedPages={relatedPages}
      ctaHeading="Use this symbol in real drawings"
      ctaSubheading="Drag and drop BS EN 60617 symbols into circuit diagrams, EICR observation drawings, and EIC distribution schedules. 7-day free trial."
    />
  );
}
