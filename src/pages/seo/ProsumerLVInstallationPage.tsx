import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { Battery, FileCheck2, BookOpen, ShieldCheck } from 'lucide-react';

// -------------------------------------------------------------------
// Grounded in BS 7671:2018+A4:2026: Chapter 82 (Prosumer's low-voltage
// electrical installations), Reg 110.1.2(d) (scope — PEI external to
// buildings), Reg 826.1.1.4 (isolation of the installation), Reg 514.15.1
// (warning notice: alternative or additional supplies), Reg 712.531.3.5.1
// (Type B RCD for PV AC supply circuit), Section 825 (EEMS), Section 712
// (Solar PV). G98/G99 are ENA Engineering Recommendations, not BS 7671.
// -------------------------------------------------------------------

const published = '2026-05-17';
const modified = '2026-06-09';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Prosumer LV Installation', href: '/guides/prosumer-low-voltage-electrical-installation' },
];

const tocItems = [
  { id: 'what-is-a-prosumer', label: 'What is a prosumer' },
  { id: 'sources', label: 'Prosumer sources' },
  { id: 'why-chapter-82', label: 'Why Chapter 82' },
  { id: 'what-to-check', label: 'What to check' },
  { id: 'rcd-types', label: 'RCD type selection' },
  { id: 'isolation-labelling', label: 'Isolation & labelling' },
  { id: 'g98-vs-g99', label: 'G98 vs G99' },
  { id: 'typical-defects', label: 'Typical defects' },
  { id: 'documentation', label: 'Documentation' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related pages' },
];

const answerBox = {
  question: 'What is a prosumer low voltage electrical installation under BS 7671?',
  answer:
    "A prosumer's low voltage electrical installation (PEI) both consumes energy from the supply and produces energy that may be exported or stored — combining the traditional consumer and generator roles. BS 7671:2018+A4:2026 governs these installations under the new Chapter 82. Typical UK examples are solar PV, battery storage, small wind, micro-CHP and EV vehicle-to-grid.",
};

const keyTakeaways = [
  'A "prosumer" installation BOTH consumes energy from the supply AND produces energy that may be exported or used on-site — a combination of the traditional "consumer" and "generator" roles.',
  'Typical UK prosumer sources: photovoltaic (PV) generators, battery energy storage systems (BESS), small wind turbines, micro-CHP units, and EV vehicle-to-grid (V2G) arrangements where the EV exports back to the grid.',
  'Chapter 82 (Part 8 — Functional Requirements) of BS 7671:2018+A4:2026 is the regulatory home for prosumer’s electrical installations (PEIs), covering the design, erection and verification of low-voltage installations that include local production and/or storage of energy.',
  'Reg 110.1.2(d) explicitly brings prosumer’s low voltage electrical installations (PEI) — including those located external to buildings — within the scope of BS 7671, so roof-mounted and ground-mounted PV arrays both fall within scope.',
  'Prosumer-specific points: bidirectional power flow, isolation per Reg 826.1.1.4 (a main switch suitable for isolation per source plus a durable warning notice or interlock), warning notices per Reg 514.15.1, earthing co-ordination, and RCD type selection (Reg 712.531.3.5.1 for the PV AC supply circuit).',
  'Section 825 sets requirements for the electrical energy management system (EEMS) in prosumer’s installations; Section 712 (Solar PV) and the IET Code of Practice for Electrical Energy Storage Systems carry the supporting detailed requirements.',
];

const faqs = [
  {
    question: 'My customer has solar PV but no battery — does Chapter 82 still apply?',
    answer:
      'Yes. Solar PV alone makes the installation a prosumer — it both consumes from the grid (when PV output is insufficient) and produces (exporting surplus). Chapter 82 applies, the G98/G99 notification is still required, and the same inspection points (anti-islanding, RCD type, isolation per Reg 826.1.1.4, labelling per Reg 514.15.1) apply. A battery makes the inspection more involved but is not necessary for prosumer classification under BS 7671.',
  },
  {
    question: 'What’s the difference between "anti-islanding" and just disconnecting the inverter?',
    answer:
      'Anti-islanding specifically refers to the inverter detecting that the grid has failed (the grid is no longer present at the inverter’s output terminals) and ceasing to export within the time window required by the applicable ENA Engineering Recommendation (G98 or G99). A "live island" is a dangerous scenario where the inverter continues to energise the local network as if it were the grid, exposing utility workers to live conductors on what they believe is an isolated section. Anti-islanding protection is verified during type-testing of the inverter and confirmed as part of the G98/G99 compliance check. The specific disconnection time threshold is defined by the ENA Engineering Recommendations, not by BS 7671 directly.',
  },
  {
    question: 'Can I install a battery storage system without notifying the DNO?',
    answer:
      'A battery storage system that does NOT export to the grid (used only for self-consumption and never feeding power back to the network) typically does not require G98/G99 notification — but the inverter still requires the appropriate G98/G99 type approval if it has the technical capability to export, even if export is disabled by configuration. Most modern hybrid inverters CAN export, so the conservative practice is to notify under G98 regardless of the intended export mode. Verify with the DNO and the inverter manufacturer.',
  },
  {
    question: 'Does Chapter 82 apply to a standalone (off-grid) solar installation?',
    answer:
      'Strictly, no — a fully off-grid installation is not a prosumer installation because it does not consume from or produce to the public network. However, the technical requirements that Chapter 82 encapsulates (RCD type selection, isolation arrangements, labelling, earthing co-ordination) still matter for off-grid safety and should be addressed via the relevant general sections. The IET Code of Practice for Off-Grid Solar PV Systems provides additional guidance.',
  },
  {
    question: 'Does an EICR inspection of an existing PV installation include Chapter 82 checks?',
    answer:
      'Yes — the prosumer-specific requirements apply to verification of existing prosumer installations as well as new work. The prosumer-specific inspection points (anti-islanding, RCD type per Reg 712.531.3.5.1, isolation per Reg 826.1.1.4, labelling per Reg 514.15.1) must be considered, and the prosumer results recorded clearly within the report. On the Schedule of Inspections, relevant areas include the presence of an alternative or additional source of supply, protective measures, additional protection, and identification and notices. Issues raised may result in C1 / C2 / C3 observations depending on the specific defect found.',
  },
];

const relatedPages = [
  {
    href: '/guides/bs-7671-a4-2026-eic-model-form',
    title: 'A4:2026 EIC Model Form Changes',
    description: 'A4:2026 EIC model form changes including prosumer inspection under Chapter 82.',
    icon: FileCheck2,
    category: 'Guide' as const,
  },
  {
    href: '/guides/bs-7671-a4-2026-summary',
    title: 'BS 7671 A4:2026 Summary',
    description: 'Master index of every A4:2026 change including the new prosumer term.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/solar-pv-certificate',
    title: 'Solar PV Certificate',
    description: 'Digital certificate for the AC side of a solar PV prosumer installation.',
    icon: FileCheck2,
    category: 'Tool' as const,
  },
  {
    href: '/guides/section-712-solar-pv',
    title: 'BS 7671 Section 712 Solar PV',
    description: 'The DC-side and array-side requirements that complement the AC prosumer inspection.',
    icon: ShieldCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
    title: 'A4:2026 Luminaire RCD Protection',
    description: 'How RCD type selection matters across the whole installation, including prosumer circuits.',
    icon: ShieldCheck,
    category: 'Guide' as const,
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate Tool',
    description: 'Digital A4:2026 EIC with Chapter 82 prosumer inspection workflow built in.',
    icon: FileCheck2,
    category: 'Tool' as const,
  },
];

// -------------------------------------------------------------------
// Small presentational helpers (match cable-colour-codes-uk card style)
// -------------------------------------------------------------------

const prosumerSources = [
  {
    name: 'Photovoltaic (PV) generators',
    note: 'The most common UK prosumer source. The grid supplies what the PV cannot; the system exports surplus.',
    tint: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    name: 'Battery energy storage (BESS)',
    note: 'Stores PV or off-peak grid energy for later use; may also export in V2G or ancillary-service roles.',
    tint: 'bg-blue-900/30 border-blue-700/40',
  },
  {
    name: 'Small wind turbines',
    note: 'Uncommon at domestic scale in the UK, but a recognised prosumer source where present.',
    tint: 'bg-white/[0.04] border-white/10',
  },
  {
    name: 'Micro-CHP units',
    note: 'Combined heat and power with grid synchronisation; increasingly seen in district heating schemes.',
    tint: 'bg-white/[0.04] border-white/10',
  },
  {
    name: 'EV vehicle-to-grid (V2G)',
    note: 'The EV battery exports back to the grid during peak hours. Growing under DNO V2G trials.',
    tint: 'bg-green-900/30 border-green-700/40',
  },
];

const rcdTypes = [
  { type: 'Type AC', detects: 'AC residual current only', prosumer: 'Generally NOT suitable where DC fault paths exist', bad: true },
  { type: 'Type A', detects: 'AC + pulsating DC', prosumer: 'Permitted by some inverter manufacturers; check the manual', bad: false },
  { type: 'Type F', detects: 'AC + pulsating DC + limited smooth DC', prosumer: 'Used for specific frequency-controlled loads', bad: false },
  { type: 'Type B', detects: 'AC + pulsating DC + smooth DC up to specified levels', prosumer: 'Required for the PV AC supply circuit unless an exception in Reg 712.531.3.5.1 applies', bad: false },
];

const labelLocations = [
  { id: '(a)', text: 'At the origin of the installation' },
  { id: '(b)', text: 'At the meter position, if remote from the origin' },
  { id: '(c)', text: 'At the consumer unit or distribution board to which the alternative or additional sources are connected' },
  { id: '(d)', text: 'At all points of isolation of all sources of supply' },
];

const defects = [
  {
    title: 'Missing G98 notification or G99 approval',
    code: 'C2',
    codeTint: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
    detail: 'The inverter is installed but the DNO was never informed — the network may not be designed for the export capacity.',
  },
  {
    title: 'Inappropriate RCD type',
    code: 'C2',
    codeTint: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
    detail: 'A Type AC RCD on a circuit with PV/battery DC fault current paths may not detect DC components, leaving the circuit effectively unprotected.',
  },
  {
    title: 'Anti-islanding test failure (still exporting)',
    code: 'C1',
    codeTint: 'bg-red-500/10 border-red-500/20 text-red-300',
    detail: 'If the inverter continues to energise the network on simulated grid failure this is a live-island hazard. C2 if it disconnects but slower than required.',
  },
  {
    title: 'Inadequate isolation arrangements',
    code: 'C2',
    codeTint: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
    detail: 'No DC isolator between PV string and inverter, or no AC isolator separate from the main consumer unit.',
  },
  {
    title: 'Missing or incorrect labelling',
    code: 'C2 / C3',
    codeTint: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
    detail: 'No warning notice indicating PV/battery presence per Reg 514.15.1. Severity depends on whether other warning provisions exist.',
  },
  {
    title: 'Earthing conflicts (earth loop)',
    code: 'C3',
    codeTint: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
    detail: 'PV DC string earthed both at the inverter and at the array. C2/C1 only if symptoms of fault current circulation are present.',
  },
  {
    title: 'Battery installed without ventilation provision',
    code: 'C2',
    codeTint: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
    detail: "Manufacturer's ventilation provision omitted — overheating and thermal-runaway risk.",
  },
];

// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-a-prosumer',
    heading: 'What is a Prosumer Installation?',
    content: (
      <>
        <p>
          The word "prosumer" combines <strong>producer</strong> and <strong>consumer</strong> — an
          installation that does both. Traditionally, BS 7671 treated electrical installations as
          either consumers (drawing power from the grid) or generators (feeding power to the grid).
          BS 7671:2018+A4:2026 formally recognises that modern UK installations increasingly do both
          — and need their own treatment under the new Chapter 82 (Part 8 — Functional
          Requirements).
        </p>
        <p>
          Regulation 110.1.2(d) explicitly brings prosumer&rsquo;s low voltage electrical
          installations (PEI) within the scope of BS 7671, including those located external to
          buildings — so roof-mounted PV arrays, ground-mounted solar fields, and externally sited
          BESS enclosures all fall within scope. The defined term in Part 2 is unambiguous: a
          prosumer is an "entity or party which can be both a producer and a consumer of electrical
          energy".
        </p>
        <div className="rounded-2xl bg-blue-900/20 border border-blue-700/30 p-5 my-6">
          <h3 className="font-bold text-white mb-2">Consumer vs generator vs prosumer</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <p className="text-yellow-400 font-bold mb-1">Consumer</p>
              <p className="text-white text-sm">Draws power from the supply only.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <p className="text-yellow-400 font-bold mb-1">Generator</p>
              <p className="text-white text-sm">Feeds power to the supply only.</p>
            </div>
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-yellow-400 font-bold mb-1">Prosumer (PEI)</p>
              <p className="text-white text-sm">Does both — consumes and produces / stores.</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'sources',
    heading: 'Typical UK Prosumer Sources',
    content: (
      <>
        <p>
          A prosumer installation can be built around any source that lets the premises produce or
          store its own energy alongside the grid connection. The most common UK sources are below.
          The DC-side and array-side requirements for solar are covered in detail in our{' '}
          <SEOInternalLink href="/guides/section-712-solar-pv">
            Section 712 Solar PV guide
          </SEOInternalLink>
          .
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          {prosumerSources.map((s) => (
            <div key={s.name} className={`p-5 rounded-2xl border ${s.tint}`}>
              <p className="text-white font-bold mb-1">{s.name}</p>
              <p className="text-white/90 text-sm leading-relaxed">{s.note}</p>
            </div>
          ))}
        </div>
        <p>
          Whichever source is present, the classification under BS 7671 is the same: once an
          installation can both consume and produce, it is a prosumer&rsquo;s electrical installation
          and Chapter 82 applies.
        </p>
      </>
    ),
  },
  {
    id: 'why-chapter-82',
    heading: 'Why Chapter 82 Added Dedicated Prosumer Requirements',
    content: (
      <>
        <p>
          Before A4:2026, prosumer installations were inspected under the general electrical
          installation rules with some cross-references to Section 712 (Solar PV) and the IET Code of
          Practice. A4:2026 introduced Chapter 82 because prosumer installations have specific
          failure modes that do not exist in traditional consumer-only installations:
        </p>
        <div className="space-y-3 my-6">
          {[
            ['Bidirectional power flow', 'Protective devices and bonding must accommodate fault current flowing in either direction. In island mode the short-circuit current has a different magnitude from connected mode (Reg 826.1.2.1).'],
            ['Isolation arrangements (Reg 826.1.1.4)', '"Switched off" at the consumer unit no longer means "isolated from generation" if PV or a battery can back-feed the busbar. A main switch suitable for isolation is required per source, plus a durable warning notice — or a suitable interlock.'],
            ['Labelling (Reg 514.15.1)', 'The responsible person, future electricians and emergency services need clear warning notices at the origin, the meter position, the consumer unit and every point of isolation.'],
            ['Earthing co-ordination', "Solar PV DC strings, battery storage and the AC distribution system must share an earthing strategy that doesn't create earth loops or compromise protective device operation."],
            ['Energy management (Section 825)', 'Where an electrical energy management system (EEMS) controls energy flow, its type and characteristics must be selected for compatibility with the sources used; Section 825 sets the requirements for EEMS in prosumer installations.'],
          ].map(([title, body]) => (
            <div key={title} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <p className="text-white font-bold mb-1">{title}</p>
              <p className="text-white/90 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-blue-300 mb-2">Chapter 82 makes prosumer compliance explicit</h3>
          <p className="text-white leading-relaxed">
            Before A4:2026, an inspector could complete an EIC without explicitly addressing prosumer
            equipment — any non-compliances surfaced as general observations. Chapter 82 makes
            prosumer-specific inspection a clearly identified part of the design, erection and
            verification process for any installation with local production or storage of energy.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-check',
    heading: 'What Prosumer Inspection Actually Covers',
    content: (
      <>
        <p>
          When confirming prosumer compliance, you are verifying the prosumer-specific items below
          are all in order. Several of these reference standards <em>outside</em> BS 7671 (the ENA
          Engineering Recommendations and the IET Codes of Practice) — they still form part of the
          overall compliance picture even though BS 7671 does not set their numeric thresholds.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <div className="space-y-3">
            {[
              ['G98 / G99 compliance', "The inverter's grid-connection compliance with ENA Engineering Recommendation G98 (small-scale generation) or G99 (larger systems), with DNO notification or approval where required. An ENA requirement, not a BS 7671 one."],
              ['Anti-islanding protection', 'The inverter automatically disconnects from the grid on grid failure within the time specified by the applicable ENA Engineering Recommendation. The threshold is set by the ENA, not BS 7671.'],
              ['RCD type selection', 'For the PV AC supply circuit, Reg 712.531.3.5.1 requires a Type B RCD unless one of its listed exceptions applies (e.g. the inverter provides at least simple separation, or the manufacturer states a Type B is not required).'],
              ['Earthing arrangement', "The AC-side earthing system and the DC-side earthing strategy are co-ordinated and don't create harmful earth loops. For battery storage, follow the manufacturer's requirements and the IET Code of Practice for Electrical Energy Storage Systems."],
              ['Isolation and switching (Reg 826.1.1.4)', 'A main switch suitable for isolation per source of supply, with a durable warning notice (or interlock) so anyone operating one switch is warned to operate all of them to achieve isolation.'],
              ['Labelling (Reg 514.15.1)', 'Durable warning notices at the origin, the meter position (if remote), the consumer unit/board, and all points of isolation of all sources.'],
              ['Surge protection', "SPDs on the DC PV side per Section 712 and the manufacturer's requirements."],
              ['Energy storage specifics', 'Battery cell thermal monitoring, ventilation and fire-rated enclosure where required by the manufacturer or the IET Code of Practice.'],
            ].map(([title, body]) => (
              <div key={title} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-900/10 border border-emerald-700/20">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">&#10003;</span>
                <span className="text-white text-sm leading-relaxed">
                  <strong className="text-white">{title}</strong> — {body}
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-types',
    heading: 'RCD Type Selection for Prosumer Circuits',
    content: (
      <>
        <p>
          PV strings and battery storage create DC fault current paths that a basic Type AC RCD will
          not reliably detect. BS 7671 is specific about the PV AC supply circuit: Regulation
          712.531.3.5.1 requires that where an RCD is used for protection of the PV AC supply circuit
          it shall be of Type B (to BS EN 62423 or BS EN 60947-2), unless one of the listed
          exceptions applies — for example where the inverter or installation provides at least
          simple separation between the AC and DC sides, or the inverter manufacturer states a Type B
          is not required.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6 overflow-x-auto">
          <h3 className="font-bold text-white text-lg mb-4">RCD types and what they detect</h3>
          <div className="space-y-3">
            {rcdTypes.map((r) => (
              <div
                key={r.type}
                className={`p-4 rounded-xl border ${
                  r.bad ? 'bg-red-900/20 border-red-700/40' : 'bg-white/[0.04] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="text-yellow-400 font-bold">{r.type}</span>
                  <span className="text-white/70 text-xs text-right">{r.detects}</span>
                </div>
                <p className="text-white text-sm leading-relaxed">{r.prosumer}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/80 text-sm">
          The minimum acceptable type for any given circuit ultimately depends on the inverter
          topology and the manufacturer&rsquo;s instructions — always consult the inverter&rsquo;s
          installation manual alongside Reg 712.531.3.5.1.
        </p>
      </>
    ),
  },
  {
    id: 'isolation-labelling',
    heading: 'Isolation and Warning Notices',
    content: (
      <>
        <p>
          The single most important behavioural difference for a prosumer installation is that
          turning off the consumer-unit main switch no longer guarantees the busbar is dead — a PV
          inverter or battery can back-feed it. Regulation 826.1.1.4 therefore requires a main switch
          suitable for isolation (for example a switch-disconnector) for <strong>each</strong> source
          of supply, plus a durable warning notice positioned so that anyone operating one switch is
          warned to operate all of them to achieve isolation. Alternatively, a suitable interlock
          system is provided.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Where warning notices must be affixed (Reg 514.15.1)
          </h3>
          <div className="space-y-3">
            {labelLocations.map((l) => (
              <div
                key={l.id}
                className="flex items-start gap-3 p-4 rounded-xl bg-amber-900/20 border border-amber-700/40"
              >
                <span className="text-yellow-400 font-bold shrink-0">{l.id}</span>
                <span className="text-white text-sm leading-relaxed">{l.text}</span>
              </div>
            ))}
          </div>
          <p className="text-white/70 text-xs mt-4">
            Reg 514.15.1 requires the warning notice to be durably marked and to identify the
            relevant point(s) of isolation. An example notice is given at Figure 11E of Appendix 11.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'g98-vs-g99',
    heading: 'G98 vs G99 — Grid Connection Engineering Recommendations',
    content: (
      <>
        <p>
          The Energy Networks Association (ENA) Engineering Recommendations G98 and G99 govern how UK
          prosumer installations connect to the public distribution network — these are{' '}
          <strong>ENA</strong> documents, not part of BS 7671. The installer&rsquo;s job is to verify
          G98/G99 compliance and complete the DNO notification or application.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-emerald-900/20 border border-emerald-700/40">
            <p className="text-yellow-400 font-bold text-lg mb-2">ENA G98 — "Notify"</p>
            <ul className="space-y-2 text-white text-sm">
              <li>Small-scale generation.</li>
              <li>Inverter must be type-approved per the G98 product specification.</li>
              <li>The DNO is informed after commissioning, within the period specified in G98.</li>
              <li>Thresholds and notification windows are set by the ENA, not by BS 7671.</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-blue-900/30 border border-blue-700/40">
            <p className="text-yellow-400 font-bold text-lg mb-2">ENA G99 — "Apply"</p>
            <ul className="space-y-2 text-white text-sm">
              <li>Larger generation.</li>
              <li>DNO approval required BEFORE installation.</li>
              <li>May include capacity studies on the local network.</li>
              <li>A fast-track pathway exists for type-approved equipment within agreed capacity envelopes, but DNO communication is still required.</li>
            </ul>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-yellow-300 mb-2">Check the type-approval database first</h3>
          <p className="text-white leading-relaxed">
            The ENA maintains a published list of type-approved G98/G99 inverters. Confirm the
            installed equipment is on the list before signing off the prosumer inspection.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'typical-defects',
    heading: 'Typical Prosumer Inspection Defects',
    content: (
      <>
        <p>
          During EICR inspection of existing prosumer installations, the following defects are
          commonly found and become coded observations. The C1 / C2 / C3 classifications below are
          the inspector&rsquo;s typical coding for each scenario — always classify against the actual
          risk found on site.
        </p>
        <div className="space-y-3 my-6">
          {defects.map((d) => (
            <div
              key={d.title}
              className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/10"
            >
              <span
                className={`shrink-0 px-2.5 py-1 rounded-lg border font-bold text-sm ${d.codeTint}`}
              >
                {d.code}
              </span>
              <div>
                <p className="text-white font-bold">{d.title}</p>
                <p className="text-white/85 text-sm leading-relaxed">{d.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-white/80 text-sm">
          See our{' '}
          <SEOInternalLink href="/guides/bs-7671-a4-2026-luminaire-rcd-protection">
            RCD type selection guide
          </SEOInternalLink>{' '}
          for more on why Type AC is the most frequent prosumer coding issue.
        </p>
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Documentation You Need',
    content: (
      <>
        <p>
          A compliant prosumer installation has a paper trail beyond the EIC itself. Capture all of
          the following and keep them with the certification:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          {[
            ['EIC (BS 7671) for the AC installation', 'Covers the consumer-side circuits including the prosumer interface.'],
            ['MCS certificate (where applicable)', 'Microgeneration Certification Scheme certificate for the PV / battery / heat pump. Required for the Smart Export Guarantee (and legacy feed-in tariffs).'],
            ['G98 notification or G99 approval', 'DNO confirmation of grid-connection compliance.'],
            ["Manufacturer's commissioning certificate", "The inverter and battery manufacturer's certificate showing the equipment was correctly set up."],
            ['Circuit diagrams and labelling schedule', 'Typically required by the IET Code of Practice for Electrical Energy Storage Systems above a threshold.'],
            ['Battery storage risk assessment', 'Fire and thermal-runaway considerations, especially for installations in occupied buildings.'],
          ].map(([title, body]) => (
            <div key={title} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <p className="text-white font-bold mb-1">{title}</p>
              <p className="text-white/90 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <h3 className="font-bold text-red-300 mb-2">Record prosumer results clearly</h3>
          <p className="text-white leading-relaxed">
            Prosumer inspection items should be recorded clearly within the electrical installation
            report rather than buried in the general schedule, so the next person can see at a glance
            that the alternative or additional source of supply was inspected. Our{' '}
            <SEOInternalLink href="/eic-certificate">digital EIC</SEOInternalLink> includes a
            dedicated prosumer workflow so this is captured automatically.
          </p>
        </div>
      </>
    ),
  },
];

export default function ProsumerLVInstallationPage() {
  return (
    <GuideTemplate
      title="Prosumer's Low Voltage Electrical Installation (BS 7671 A4:2026 Chapter 82) | Elec-Mate"
      description='A "prosumer" installation both consumes and produces electricity — solar PV, battery storage, EV V2G, wind, CHP. How BS 7671:2018+A4:2026 Chapter 82 governs design, isolation, RCD type and labelling.'
      datePublished={published}
      dateModified={modified}
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="A4:2026 New Term"
      badgeIcon={Battery}
      heroTitle={
        <>
          Prosumer&rsquo;s Low Voltage{' '}
          <span className="text-yellow-400">Electrical Installation</span> (BS 7671 Chapter 82)
        </>
      }
      heroSubtitle='BS 7671:2018+A4:2026 introduced "Prosumer&rsquo;s low voltage electrical installation(s)" as a distinct installation type governed by the new Chapter 82 (Part 8 — Functional Requirements). This guide explains what counts as a prosumer installation, why Chapter 82 adds dedicated requirements, and what UK electricians must check on every installation that both consumes and produces electricity.'
      readingTime={11}
      answerBox={answerBox}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Inspect prosumer installations with confidence"
      ctaSubheading="Elec-Mate's digital A4:2026 EIC includes a Chapter 82 prosumer workflow — G98/G99 compliance check, anti-islanding test recording, RCD type verification, and a labelling audit against Reg 514.15.1. 7-day free trial."
    />
  );
}
