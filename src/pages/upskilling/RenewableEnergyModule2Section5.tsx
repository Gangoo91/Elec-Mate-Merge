import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm2s5-string-inverter',
    question:
      'The string inverter topology — what is it?',
    options: [
      'An inverter per cell',
      'A single central inverter for a whole PV string (or multiple parallel strings via the inverter\'s MPPT inputs). The DC string runs from the modules to the inverter input; the inverter performs MPPT, DC-AC conversion, and grid synchronisation. The dominant topology on UK residential PV by volume',
      'A passive transformer',
      'A mechanical sun-tracking device',
    ],
    correctIndex: 1,
    explanation:
      'String inverters are the dominant topology on UK residential PV — a single central inverter (or hybrid inverter on PV+BESS installs) handles MPPT, DC-AC conversion and grid-synchronisation for one or more PV strings. Cheap per W, well-understood, straightforward to install. Trade-offs: string mismatch losses (Section 2.3) on multi-orientation or partial-shade arrays; single point of failure (one inverter, whole array offline if it fails); DC-side cable runs from modules to inverter location.',
  },
  {
    id: 'm2s5-microinverter',
    question:
      'The microinverter topology — what is it?',
    options: [
      'A miniature string inverter',
      'One inverter per PV module — each module has its own AC-output microinverter attached to the rear, performing MPPT and DC-AC conversion at the module level. The AC outputs daisy-chain along the array; no central inverter required. Module-level MPPT eliminates string mismatch entirely',
      'A spare inverter in case the main fails',
      'A controller for the bypass diode',
    ],
    correctIndex: 1,
    explanation:
      'Microinverters put one inverter per module (typically rated 250–400 W AC output depending on the module). MPPT happens at each module independently. The modules connect via AC trunk cable rather than DC string cable, with each microinverter\'s AC output added to the trunk. Benefits: module-level MPPT (no string mismatch), no high-voltage DC on the roof, single-module fault doesn\'t take down the array. Costs: per-module hardware (~£100–150 each on UK pricing), higher install labour, more components to fail across the array life.',
  },
  {
    id: 'm2s5-power-optimiser',
    question:
      'The power optimiser topology — what is it?',
    options: [
      'Identical to microinverter',
      'A DC-DC power optimiser per module (attached to the rear, like a microinverter) — performing module-level MPPT but outputting DC, which then runs as a fixed-voltage string to a central optimised-string inverter for DC-AC conversion. Hybrid between string inverter (one central inverter) and microinverter (module-level MPPT)',
      'A current source',
      'An MPPT controller for off-grid',
    ],
    correctIndex: 1,
    explanation:
      'Power optimisers (the standard product is the SolarEdge ecosystem; alternatives exist) put a DC-DC converter per module, performing module-level MPPT. The optimised string runs at a fixed DC voltage (typically ~370–400 V on residential installs) to a central inverter that handles only the DC-AC conversion (the central inverter does not do MPPT — that\'s been done at module level). Benefits: module-level MPPT (no string mismatch), simpler than microinverters (only DC on the string), per-module monitoring and rapid shutdown. Costs: per-module optimiser (~£40–80 each), system depends on the central inverter — if it fails, the array is offline.',
  },
  {
    id: 'm2s5-hybrid-inverter',
    question:
      'The hybrid inverter topology — what does it integrate?',
    options: [
      'Two PV strings only',
      'PV input(s), battery input(s) and grid connection in one product — performing PV-side MPPT, battery charge / discharge control, and grid synchronisation. The dominant topology for residential PV+BESS installs from 2022 onwards, combining what would otherwise be a string inverter + separate battery inverter into a single unit',
      'PV and EV charging in one box',
      'PV and heat pump in one box',
    ],
    correctIndex: 1,
    explanation:
      'Hybrid inverters combine PV-side functions (MPPT, DC-AC conversion for export) AND battery-side functions (battery charge from PV, battery discharge to AC, battery management) AND grid functions (synchronisation, anti-islanding) in one product. The dominant topology for residential PV+BESS hybrid installs from 2022 onwards. The internal architecture typically: PV string → DC-DC stage with MPPT → common DC bus → battery DC-DC stage with battery management → DC-AC inverter stage → grid AC output. Often called &ldquo;all-in-one&rdquo; or &ldquo;single-box&rdquo; inverters on product datasheets. Section 2.7 covers the DC-coupled hybrid architecture in detail.',
  },
  {
    id: 'm2s5-bs-en-62109',
    question:
      'BS 7671 references a specific product standard for inverters. Which?',
    options: [
      'BS 7671 Section 712 only',
      'BS EN 62109-1 (general safety requirements) and BS EN 62109-2 (particular requirements for inverters). Inverters used in BS 7671 installations shall conform to the relevant clauses of these standards — evidenced by manufacturer declarations of conformity, test reports, or certification',
      'BS EN 50549-1 only',
      'No specific product standard',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 62109-1 sets general safety requirements for power conversion equipment used in PV applications. BS EN 62109-2 is the particular-requirements complement covering inverter specifics. BS 7671 picks up these as the relevant electrical equipment standards for inverters — installer must verify conformity before connection. The manufacturer\'s declaration of conformity is the audit evidence; the cert evidence bundle includes the inverter datasheet showing the BS EN 62109-1 / -2 conformity statement.',
  },
  {
    id: 'm2s5-rcd-type-b',
    question:
      'Reg 531.3.3 sets a rule on RCD type for circuits with DC-component sources. For a PV inverter, what is the actual selection logic?',
    options: [
      'Type AC RCD is always acceptable',
      'Type AC is NOT appropriate. Type B RCD (in accordance with BS EN 62423 or BS EN 60947-2) shall be selected UNLESS one of three exceptions applies: (a) the PCE provides at least simple separation between AC and DC sides internally; (b) a transformer with separate windings provides the simple separation externally; (c) the PCE manufacturer states Type B is not required (with documentation retained as evidence)',
      'No RCD required',
      'Type AC only',
    ],
    correctIndex: 1,
    explanation:
      'The actual rule is more nuanced than &ldquo;transformerless = Type B&rdquo;. Type B is the default for any PCE (Power Conversion Equipment) where DC residual currents can occur — UNLESS one of three exceptions applies: PCE has internal simple separation; an external transformer provides the separation; or the manufacturer explicitly states Type B is not required (with documented evidence retained by the installer). Reg 531.3.3 rules out Type AC; Type A / F is appropriate for circuits with pulsating DC only. Type B (per BS EN 62423 or BS EN 60947-2) is required where the three exceptions do not apply.',
  },
  {
    id: 'm2s5-topology-selection',
    question:
      'A customer with a south-facing single-pitch roof, no shading, 12 matched modules, and a £6,000 budget. Which inverter topology is most cost-effective?',
    options: [
      'Microinverters at £100 each — £1,200 of microinverter hardware',
      'String inverter with single MPPT — single £900–1,100 inverter, total install cost lower than module-level topologies, no mismatch losses to recover (single orientation, no shade, matched modules). Module-level optimisation costs would not pay back in this scenario',
      'Power optimisers — £50 each plus central inverter — only useful if mismatch matters',
      'Hybrid inverter even without battery — over-specified for PV-only install',
    ],
    correctIndex: 1,
    explanation:
      'For a clean single-orientation no-shade matched-modules install, string inverter is the right choice. The premium for module-level MPPT (microinverters or power optimisers) pays back only when there\'s mismatch to recover — multi-orientation, partial shade, mixed module age. On a clean single-orientation array, the additional cost of module-level hardware is wasted. The installer\'s job at survey is to identify which topology matches the array geometry — not to default to the highest-spec option on every quote.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 5 kWp PV install on a multi-pitch roof (south and east) with two parallel strings of mismatched module count (10 south + 4 east). Which inverter topology is best matched?',
    options: [
      'Single-MPPT string inverter',
      'Dual-MPPT hybrid inverter (or dual-MPPT string inverter if no battery) — each string into its own MPPT, eliminating orientation mismatch. If the customer also wants BESS now or in future, hybrid inverter is the natural choice',
      'Microinverters on all modules',
      'Power optimisers on the east string only',
    ],
    correctAnswer: 1,
    explanation:
      'The two-orientation geometry needs two independent MPPTs. Dual-MPPT inverter is the standard answer. Whether to choose a PV-only dual-MPPT string inverter or a dual-MPPT hybrid inverter depends on the BESS plan — if battery is on the install now or planned in the next few years, hybrid is the natural choice (you avoid having to add a separate battery inverter later). Microinverters or power optimisers per module would also work but at higher cost than necessary for this geometry — the dual-MPPT inverter alone resolves the mismatch.',
  },
  {
    id: 2,
    question:
      'A complex roof with heavy partial shading from a neighbouring tree and a chimney — multiple modules will be partially shaded for different portions of the day. Which inverter topology is best matched?',
    options: [
      'Single-MPPT string inverter',
      'Module-level optimisation — microinverters OR power optimisers + central inverter. Each module operates at its own MPP regardless of conditions on other modules. The cost premium pays back through the recovered yield that would otherwise be lost to string-level mismatch from the shading',
      'Just remove the shading sources',
      'Smaller array to avoid shaded modules',
    ],
    correctAnswer: 1,
    explanation:
      'Heavy partial shading is the strongest case for module-level optimisation. String-level architectures (single or multi-MPPT) cannot recover from shading-driven sub-string bypasses without losing the bypassed sub-string\'s power entirely. Module-level MPPT (microinverters or power optimisers) operates each module at its own MPP, capturing what each module can generate independent of shade conditions on other modules. The per-module hardware cost is paid back through the recovered yield. On heavily-shaded arrays, the difference can be 20–40% annual yield.',
  },
  {
    id: 3,
    question:
      'BS 7671 references BS EN 62109-1 and BS EN 62109-2 as the relevant electrical equipment standards for inverters. What does this mean for the installer?',
    options: [
      'Nothing — standards are for designers',
      'The installer verifies inverter conformity before connection — checking manufacturer documentation, markings, and certification. The cert evidence bundle includes evidence of conformity (manufacturer declarations of conformity, test reports, or certification). Specifying an inverter without BS EN 62109-1/-2 conformity is a BS 7671 contravention',
      'Only the customer needs to know',
      'Only DNO concerns the standards',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 makes the installer responsible for verifying inverter conformity to BS EN 62109-1 and BS EN 62109-2 (and any other relevant product standards) before connection. The verification is documentary — manufacturer declarations of conformity, test reports, certification marks. The cert evidence bundle retains the verification record. For an MCS-registered installer, the MCS Product List also requires BS EN 62109 conformity as part of the inverter product approval.',
  },
  {
    id: 4,
    question:
      'A PV inverter on a TT-earthed installation needs RCD protection. What RCD type is specified?',
    options: [
      'Type AC',
      'Type A as a minimum (or Type F where higher-frequency components present); Type B is required where the inverter can produce smooth DC residual currents. The inverter datasheet specifies the required RCD type. Type AC is NOT appropriate because it does not detect DC residual components',
      'No RCD needed',
      'Type B always',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 531.3.3 in BS 7671 rules out Type AC for circuits with DC-component sources like PV inverters. The minimum is Type A (which detects pulsating DC residual currents); Type F adds higher-frequency component detection; Type B detects smooth DC residual currents and is required for transformerless inverters that can produce such currents. The inverter datasheet specifies the required RCD type — Type A for many residential inverters, Type B for some transformerless designs. The selection is the inverter\'s product specification, not the installer\'s discretion.',
  },
  {
    id: 5,
    question:
      'Reg 551.7.1(d) (added in A4:2026) sets a prohibition relevant to inverter connection. What is it?',
    options: [
      'No connection to mains',
      'Prohibition on connecting a source to the load side of an RCD under certain conditions. The practical implication: the PV inverter output should typically connect upstream of the consumer unit\'s main RCD (or with dedicated compatible protection), NOT downstream where it shares the RCD with general load circuits',
      'No connection to TT supplies',
      'No three-phase connection',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 added Reg 551.7.1(d) — prohibiting connection of a source to the load side of an RCD under certain conditions. The motivation: when an inverter is downstream of an RCD shared with general loads, the inverter\'s leakage current contribution can cause nuisance tripping AND the RCD may not provide the intended protection on a fault upstream of the inverter. The standard arrangement: connect the inverter output to a dedicated circuit at the consumer unit, with appropriate RCD type per Reg 531.3.3. The cert evidence bundle records the connection arrangement.',
  },
  {
    id: 6,
    question:
      'A customer install requires no battery now but the customer indicates BESS may be added within 3 years. What inverter specification choice matters most?',
    options: [
      'Whatever is cheapest',
      'Specify a hybrid-capable inverter now (even though battery isn\'t installed yet) OR specify the PV-only inverter knowing a separate battery inverter will be added later for an AC-coupled configuration. Both are valid; the hybrid-capable choice avoids the cost of replacing the PV inverter when the battery is added',
      'Pick the smallest inverter',
      'Pick the largest available',
    ],
    correctAnswer: 1,
    explanation:
      'The hybrid-now-vs-later decision affects total cost and architecture. A hybrid inverter installed now (even without battery initially) lets the customer add a DC-coupled BESS later by connecting to the battery port — no PV inverter replacement, lower overall labour, the system architecture is consistent. The alternative — install a PV-only string inverter now, add an AC-coupled BESS with separate battery inverter later — also works (Section 2.7 covers AC coupling). The choice affects long-term economics and is a survey-stage conversation, not an install-stage decision.',
  },
  {
    id: 7,
    question:
      'Microinverters vs power optimisers — both deliver module-level MPPT. What\'s the key architectural difference between them?',
    options: [
      'No difference',
      'Microinverters output AC at each module (no central inverter; modules daisy-chain on AC trunk cable). Power optimisers output DC at each module (string runs as fixed-voltage DC to a central inverter for DC-AC conversion). Microinverters eliminate the central inverter as a single point of failure; power optimisers retain it but simplify the per-module hardware',
      'Microinverters are larger',
      'Power optimisers only work on commercial systems',
    ],
    correctAnswer: 1,
    explanation:
      'The architectural distinction: microinverters take MPPT + DC-AC conversion to module level (the AC trunk daisy-chains the modules\' AC outputs); power optimisers take MPPT to module level but retain the central inverter for DC-AC conversion (the string runs DC at a fixed optimised voltage). Microinverters eliminate the central-inverter single-point-of-failure but multiply the hardware count (300+ microinverters on a commercial install). Power optimisers retain the single inverter (which can fail) but simplify the per-module hardware and the install (DC string is the familiar architecture). Both achieve module-level MPPT; the choice depends on cost, fault-tolerance and install preference.',
  },
  {
    id: 8,
    question:
      'An installer specifies a transformerless PV inverter (the dominant residential type in 2026). What additional design check is triggered?',
    options: [
      'No additional check',
      'RCD type selection — transformerless inverters can produce smooth DC residual currents requiring Type B RCD protection (per Reg 531.3.3). The inverter datasheet specifies the required RCD type. Type B RCDs are materially more expensive than Type A, and the cost differential affects the BoM',
      'Higher cable size',
      'Manual switching',
    ],
    correctAnswer: 1,
    explanation:
      'Transformerless inverters are the dominant residential PV inverter type from ~2018 onwards — they\'re smaller, lighter, more efficient than transformer-isolated alternatives. The trade-off: they can produce smooth DC residual currents under fault conditions, which Type AC and Type A RCDs cannot detect. Type B RCDs are specified. The inverter datasheet should state explicitly whether Type B is required (some transformerless inverters include internal DC residual current monitoring, allowing Type A external RCD); read the datasheet, don\'t assume. The Type B requirement adds £150–300 to the consumer unit BoM compared to Type A; it\'s a routine line item in 2026 PV installs.',
  },
];

const faqs = [
  {
    question:
      'How do I choose between string, microinverter, power optimiser and hybrid topologies?',
    answer:
      'Four-question survey. (1) Is there a battery now or planned? If yes, hybrid inverter is the natural choice. (2) Is there meaningful mismatch — multi-orientation, partial shade, mixed module age? If yes, module-level optimisation (microinverter or power optimiser) pays back. (3) Is single-point-of-failure tolerance important — commercial install, customer demand? Microinverter eliminates the central inverter as a SPOF; power optimiser does not. (4) Is the install cost-driven? String inverter is the cheapest per W; specify it for clean single-orientation no-shade arrays where module-level optimisation would not pay back.',
  },
  {
    question:
      'What\'s the typical UK pricing for the four topologies per W of array?',
    answer:
      'Approximate 2026 UK residential pricing for the inverter / module-level hardware: string inverter ~£200–280 per kW of array. Power optimiser ecosystem ~£400–500 per kW (central inverter + per-module optimisers). Microinverter system ~£500–650 per kW (one microinverter per module). Hybrid inverter (PV+BESS-capable, no battery yet) ~£350–450 per kW. Hybrid inverter with installed battery ~£800–1,200 per kW depending on battery capacity. These are inverter / power-electronics costs alone; modules, mounting, install labour are separate.',
  },
  {
    question:
      'BS EN 62109-1 and BS EN 62109-2 — what do they actually cover?',
    answer:
      'BS EN 62109-1 (general safety) covers the safety design of all power conversion equipment used in PV systems — protection against electric shock, fire, mechanical hazards, isolation requirements, marking, documentation, and the underlying construction and component requirements. BS EN 62109-2 (particular requirements for inverters) adds inverter-specific requirements — output isolation, anti-islanding, DC residual current monitoring (where applicable), and the inverter-specific test methodology. Conformity to both is the standard expectation for grid-tied PV inverters sold in the UK.',
  },
  {
    question:
      'What is "rapid shutdown" and when is it required?',
    answer:
      'Rapid shutdown is a function that brings the array\'s DC voltage below a safe threshold (typically 30 V or 80 V depending on the local code) within a defined time (typically 30 seconds) of a manual command or fire-alarm signal. It exists primarily to protect firefighters approaching a building with active PV — without rapid shutdown, the DC string remains at full V_oc whenever sunlight hits the modules, regardless of the inverter being switched off. Microinverters and power optimisers provide rapid shutdown natively (no high-voltage DC at the module level once power is removed). String inverter installs require separate rapid-shutdown devices. The function is mandatory in the US under NEC 690.12; in the UK it is not mandatory but is emerging as best practice for commercial / large-roof installs.',
  },
  {
    question:
      'How does anti-islanding work in PV inverters?',
    answer:
      'Anti-islanding is the function that detects loss of the public supply and disconnects the inverter\'s output before it can back-feed a "dead" network (covered as Reg 551.7.4 in Section 1.5 and Module 1 Section 5). The inverter monitors the grid voltage and frequency continuously; when either deviates from declared values (per ESQCR-defined tolerances), the inverter disconnects within a defined time (typically &lt; 0.2 seconds). Active anti-islanding methods inject a small voltage / frequency perturbation and measure the grid\'s response — an off-grid network responds differently to a grid-connected one. BS EN 62109-2 and BS EN 50549-1 specify the test methodology.',
  },
  {
    question:
      'What does the inverter\'s "European efficiency" rating actually measure?',
    answer:
      'European efficiency (Euro efficiency, η_EU) is a weighted average of the inverter\'s DC-AC conversion efficiency at six operating load points (5%, 10%, 20%, 30%, 50%, 100% of rated power), with weighting that reflects typical European solar conditions (more time at part-load than at full power). It is a better predictor of real-world annual energy capture than the peak efficiency figure (which is the inverter\'s best-case point, often around 50% load). Modern residential inverters achieve 96–98% Euro efficiency. The remaining 2–4% loss is the cost of the DC-AC conversion stage.',
  },
  {
    question:
      'How does Reg 551.7.1(d) practically affect where I connect the PV inverter?',
    answer:
      'A4:2026 added Reg 551.7.1(d) prohibiting connection of a source to the load side of an RCD under certain conditions. The practical arrangement: connect the inverter output to a dedicated circuit at the consumer unit, with the inverter\'s output protective device (RCBO or MCB+RCD of the inverter-datasheet-specified RCD type) located in the consumer unit. The inverter\'s leakage current and fault current characteristics drive the protective device type — typically Type A or Type B RCD per the inverter datasheet. Connecting the inverter downstream of a general-purpose RCD shared with other loads creates the conditions Reg 551.7.1(d) prohibits.',
  },
  {
    question:
      'How long do PV inverters last vs PV modules?',
    answer:
      'Modules typically deliver 25–35 years of useful life in UK conditions (Section 2.2 FAQ). Inverters typically have a shorter design life — 10–15 years for string inverters, 15–25 years for microinverters and power optimisers (the per-module hardware ages with the module). Most string-inverter installs will need one inverter replacement over the array\'s lifetime; microinverter and power-optimiser installs may not. The replacement cost should be modelled in the lifetime cost-benefit when comparing topologies — a one-time inverter replacement at year 10–15 changes the per-W cost picture meaningfully.',
  },
  {
    question:
      'Are G83/1 and G59/1 still the DNO connection requirements for PV inverters in 2026?',
    answer:
      'No — G83 and G59 have been replaced by the current Engineering Recommendations G98 and G99 (covered in Module 1 Section 5). G98 governs fit-and-notify for ≤ 16 A per phase generation; G99 governs apply-and-wait for &gt; 16 A per phase. G100 (also covered in 1.5) is the export-limitation scheme. Older references to G83 / G59 are stale CPD; always cite the current G98 / G99 / G100 framework. Modern inverter datasheets list G98 / G99 compliance explicitly; the cert evidence bundle includes the EREC compliance reference.',
  },
];

export default function RenewableEnergyModule2Section5() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Inverter topologies | Renewable Energy 2.5 | Elec-Mate',
    description:
      'String, microinverter, power optimiser and hybrid inverter topologies — how each works, where each wins, the cost-yield-reliability trade-offs, and the BS 7671 / BS EN 62109 / Reg 551.7.1(d) / Reg 531.3.3 framing that applies to inverter selection and connection.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · BS 7671:2018+A4:2026"
            title="Inverter topologies"
            description="String, microinverter, power optimiser and hybrid inverters — how each works, where each wins, the cost-yield-reliability trade-offs, and the BS 7671 / BS EN 62109 framing that applies to inverter selection and connection."
            tone="yellow"
          />

          <TLDR
            points={[
              'Four inverter topologies dominate UK PV: string inverter (single central inverter for the whole string — cheapest, dominant by volume); microinverter (one inverter per module — module-level MPPT, AC trunk); power optimiser (DC-DC per module + central inverter — module-level MPPT, DC string); hybrid inverter (PV + BESS + grid in one product — dominant for PV+BESS installs).',
              'BS 7671 requires inverters to conform to the relevant electrical equipment standards — BS EN 62109-1 (general safety) and BS EN 62109-2 (particular requirements for inverters). Installer verification of conformity before connection is mandatory.',
              'A4:2026 added Reg 551.7.1(d) — prohibiting connection of a source to the load side of an RCD under certain conditions. Practical implication: dedicated inverter circuit at the consumer unit with appropriate RCD type, not downstream of a general-purpose RCD.',
              'Reg 531.3.3 rules out Type AC RCDs for circuits with DC-component sources including PV inverters. Type A as a minimum; Type B (full DC-sensitive) required for transformerless inverters that can produce smooth DC residual currents.',
              'Topology selection is driven by the array geometry: clean single-orientation → string inverter; multi-orientation → multi-MPPT string or hybrid; partial shade / complex roof → module-level optimisation; PV+BESS install → hybrid inverter.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish the four inverter topologies (string, microinverter, power optimiser, hybrid) by architecture and use case.',
              'Apply the four-question selection framework to specify the right topology for a given install — battery present? mismatch present? SPOF tolerance? cost-driven?',
              'Verify inverter conformity to BS EN 62109-1 and BS EN 62109-2 before connection, as part of the cert evidence bundle.',
              'Apply Reg 551.7.1(d) — connect the inverter output to a dedicated circuit at the consumer unit, not downstream of a general-purpose RCD.',
              'Specify RCD type per Reg 531.3.3 and the inverter datasheet — Type A minimum for inverters with internal DC monitoring, Type B for transformerless inverters that can produce smooth DC residual currents.',
              'Anticipate the topology-driven cost differences (string ~£200–280/kW, power optimiser ~£400–500/kW, microinverter ~£500–650/kW, hybrid ~£350–450/kW PV-only) and the yield differences that justify them on appropriate arrays.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>String for simplicity. Microinverter for module-level optimisation. Hybrid for PV plus battery.</Pullquote>

          <ContentEyebrow>The four inverter topologies — and what each does</ContentEyebrow>

          <ConceptBlock
            title="String inverter — the dominant residential topology"
            plainEnglish="A string inverter is a single central inverter handling MPPT, DC-AC conversion and grid synchronisation for one or more PV strings. The dominant UK residential topology by volume."
            onSite="String inverter installs are the most familiar architecture. DC string from modules to inverter; AC output from inverter to consumer unit. The simplicity is the strength: one inverter to install, one to maintain, one to replace at end of life."
          >
            <p>String inverter characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Architecture</strong> — DC string from
                modules → DC isolator → inverter input. MPPT performed by the inverter.
                DC-AC conversion in the inverter. AC output to grid via dedicated
                consumer unit circuit
              </li>
              <li>
                <strong className="text-white">MPPT inputs</strong> — typically 1, 2 or 3
                independent MPPTs on a single inverter (Section 2.4 covers multi-MPPT)
              </li>
              <li>
                <strong className="text-white">Typical residential cost</strong> — £200–280
                per kW of array
              </li>
              <li>
                <strong className="text-white">Wins on</strong> — clean single-orientation
                arrays, matched-module strings, cost-sensitive customers, simple roof
                geometries
              </li>
              <li>
                <strong className="text-white">Loses on</strong> — multi-orientation
                arrays (mismatch losses without enough MPPT inputs), heavy partial shade,
                installs where module-level monitoring is required
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Microinverter — module-level MPPT with AC trunk"
            plainEnglish="A microinverter is one inverter per module — performing MPPT and DC-AC conversion at the module level. The modules connect via AC trunk cable rather than DC string."
            onSite="Microinverters eliminate the high-voltage DC string on the roof entirely. Each module has its own ~250–400 W AC-output unit mounted on the rear; the AC outputs daisy-chain along the array via standard MC4-equivalent AC connectors and a trunk cable to the consumer unit."
          >
            <p>Microinverter characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Architecture</strong> — Module + dedicated
                microinverter on rear → AC daisy-chain to next module → ... → AC trunk
                cable → consumer unit
              </li>
              <li>
                <strong className="text-white">Module-level MPPT</strong> — each module
                operates at its own MPP independent of all other modules. Eliminates
                string-level mismatch losses entirely
              </li>
              <li>
                <strong className="text-white">No high-voltage DC on the roof</strong> —
                the AC trunk operates at 230 V AC; if a module is to be removed, isolating
                the AC trunk and disconnecting the relevant connectors is straightforward
              </li>
              <li>
                <strong className="text-white">Typical residential cost</strong> — £500–650
                per kW of array (significantly higher than string inverter)
              </li>
              <li>
                <strong className="text-white">Wins on</strong> — heavily-shaded arrays,
                multi-orientation arrays, BIPV / complex roof geometries, installs where
                module-level monitoring and rapid shutdown are required, installs where
                eliminating the central-inverter single point of failure matters
              </li>
              <li>
                <strong className="text-white">Loses on</strong> — cost-sensitive installs,
                arrays where mismatch is minimal (no payback for the per-module hardware),
                installs in extreme climate (microinverter reliability degrades at
                sustained high temperatures)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Power optimiser — module-level MPPT with DC string"
            plainEnglish="A power optimiser is a DC-DC converter per module performing module-level MPPT but outputting DC, with a central inverter handling DC-AC conversion. Hybrid between string inverter and microinverter."
            onSite="The SolarEdge ecosystem is the dominant power optimiser product in the UK; alternatives exist (Tigo, Huawei optimisers). The string runs DC at a fixed optimised voltage (~370–400 V residential) to the central inverter."
          >
            <p>Power optimiser characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Architecture</strong> — Module + power
                optimiser on rear → DC string at fixed optimised voltage → central
                inverter → AC output. Optimiser does MPPT; central inverter does only
                DC-AC conversion (no MPPT)
              </li>
              <li>
                <strong className="text-white">Module-level MPPT</strong> — each module
                operates at its own MPP via its dedicated DC-DC stage. Eliminates
                string-level mismatch (like microinverters)
              </li>
              <li>
                <strong className="text-white">Per-module monitoring and rapid shutdown</strong>
                {' '}— the optimiser communicates with the central inverter, providing
                per-module power data and the ability to bring the array to rapid-
                shutdown voltage on command
              </li>
              <li>
                <strong className="text-white">DC string retained</strong> — the
                familiar string-inverter installation pattern; the central inverter
                still exists (and can still fail, taking down the array)
              </li>
              <li>
                <strong className="text-white">Typical residential cost</strong> — £400–500
                per kW of array (between string and microinverter)
              </li>
              <li>
                <strong className="text-white">Wins on</strong> — partial-shade arrays
                where module-level MPPT is wanted but a string inverter architecture is
                preferred; installs requiring per-module monitoring; installs requiring
                rapid shutdown without going to microinverters
              </li>
              <li>
                <strong className="text-white">Loses on</strong> — clean arrays where
                mismatch is minimal (no payback); installs where central-inverter SPOF
                must be eliminated (microinverter wins those)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Hybrid inverter — PV + BESS + grid in one product"
            plainEnglish="A hybrid inverter combines PV-side functions (MPPT, DC-AC conversion for export) AND battery-side functions (charge from PV, discharge to AC, battery management) AND grid functions (synchronisation, anti-islanding) in one product."
            onSite="The dominant topology for residential PV+BESS installs from 2022 onwards. Avoids the cost and complexity of installing a separate PV string inverter plus a separate battery inverter — both functions combined into a single all-in-one product."
          >
            <p>Hybrid inverter characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Architecture</strong> — PV string(s) → DC-DC
                stage with MPPT → common DC bus → battery DC-DC stage with battery
                management → DC-AC inverter stage → grid AC output. Backup port (where
                fitted) provides AC supply to dedicated loads during a grid outage
              </li>
              <li>
                <strong className="text-white">Combines two products into one</strong> —
                replaces a separate PV inverter + separate battery inverter, lower
                hardware cost overall, fewer components to fail
              </li>
              <li>
                <strong className="text-white">DC-coupled architecture</strong> — energy
                from PV to battery stays on the DC side, avoiding the DC→AC→DC conversion
                losses of an AC-coupled BESS retrofit (Section 2.7 covers this in
                detail)
              </li>
              <li>
                <strong className="text-white">Typical residential cost</strong> — PV-only
                hybrid ~£350–450 per kW; hybrid + battery ~£800–1,200 per kW depending
                on battery capacity
              </li>
              <li>
                <strong className="text-white">Wins on</strong> — PV+BESS installs (the
                natural choice); future-proofing for BESS retrofit (install hybrid now,
                add battery later); installs requiring backup-power capability during
                grid outages
              </li>
              <li>
                <strong className="text-white">Loses on</strong> — PV-only installs where
                no battery is planned (slight cost premium over PV-only string inverter);
                AC-coupled retrofit installs (where the existing PV inverter is being
                kept and only the battery is being added)
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="Four inverter topologies side-by-side — block diagrams of: (1) string inverter (modules → DC string → DC isolator → string inverter → AC consumer unit); (2) microinverter (modules with rear-mounted microinverters → AC trunk → consumer unit); (3) power optimiser (modules with rear-mounted optimisers → fixed-voltage DC string → central inverter → AC consumer unit); (4) hybrid inverter (PV string + battery → hybrid inverter → AC consumer unit + backup port)."
            filename="renewable/m2s5-inverter-topologies.png"
          />

          <DiagramPlaceholder
            caption="Engineering Mindset video — &lsquo;String inverter vs microinverter&rsquo; or &lsquo;How solar inverters work&rsquo;. Animated walk-through of the four topologies and their use cases. Recommended companion to this section."
            filename="renewable/m2s5-engineering-mindset-inverter-video.placeholder"
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 framing — BS EN 62109, Reg 531.3.3, Reg 551.7.1(d)</ContentEyebrow>

          <Pullquote>Inverters must conform to BS EN 62109-1 and BS EN 62109-2.</Pullquote>

          <ConceptBlock
            title="Inverter product safety — BS EN 62109-1 and BS EN 62109-2"
            plainEnglish="BS 7671 picks up the inverter product safety standards as a regulatory requirement. The installer verifies conformity before connection."
            onSite="Read the inverter datasheet. Look for the BS EN 62109-1 and BS EN 62109-2 conformity statement (or the manufacturer\'s declaration of conformity). Verify the inverter is on the MCS Product List for any funded install. Retain both records in the cert evidence bundle."
          >
            <p>The BS 7671 inverter product safety regime:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">BS EN 62109-1</strong> — general safety
                requirements for power conversion equipment used in PV systems.
                Construction, isolation, marking, documentation, mechanical / thermal /
                electrical hazards.
              </li>
              <li>
                <strong className="text-white">BS EN 62109-2</strong> — particular
                requirements for inverters. Output isolation, anti-islanding (links to
                Section 551), DC residual current monitoring where applicable, inverter-
                specific test methodology.
              </li>
              <li>
                <strong className="text-white">Installer verification</strong> — checking
                manufacturer documentation, markings, and certification before
                connection. The verification is documentary; the cert evidence bundle
                retains the verification record.
              </li>
              <li>
                <strong className="text-white">MCS Product List</strong> — also requires
                BS EN 62109 conformity as part of the inverter product approval; for
                funded installs the MCS Product List entry is the second layer of
                verification
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Inverter conformity to product safety standards"
            clause="Inverters shall comply with the requirements of the relevant electrical equipment standard. The relevant electrical equipment standards include BS EN 62109-1 (general safety requirements for power conversion equipment in PV power systems) and BS EN 62109-2 (particular requirements for inverters). Where this regulation requires inverter conformity, evidence such as manufacturer declarations of conformity, test reports or certification shall be provided."
            meaning="BS 7671 makes the installer responsible for verifying inverter conformity before connection. The verification is documentary — manufacturer declarations, test reports, certification marks. The cert evidence bundle retains the records. The MCS Product List provides a second verification layer for funded installs."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>RCD type selection for inverter circuits</ContentEyebrow>

          <Pullquote>Type AC is not appropriate for inverter circuits. Type A minimum; Type B for transformerless.</Pullquote>

          <ConceptBlock
            title="Reg 531.3.3 — RCD types for circuits with DC residual currents"
            plainEnglish="Modern PV inverters (and other power-electronic equipment) can produce DC components in residual current. Type AC RCDs do not detect smooth DC residual currents and fail to operate during such a fault. Type A minimum; Type B for transformerless inverters that can produce smooth DC residual currents."
            onSite="Read the inverter datasheet for the RCD type requirement. Type A residential RCDs are typical for inverters with internal DC residual current monitoring. Type B RCDs are required for transformerless inverters that can produce smooth DC residual currents above the Type A detection threshold."
          >
            <p>The four RCD types relevant to inverter circuits:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Type AC</strong> — detects sinusoidal AC
                residual currents only. NOT appropriate for circuits with DC-component
                sources per Reg 531.3.3.
              </li>
              <li>
                <strong className="text-white">Type A</strong> — detects sinusoidal AC
                and pulsating DC residual currents (up to a defined threshold). Acceptable
                where smooth DC residual currents cannot occur.
              </li>
              <li>
                <strong className="text-white">Type F</strong> — Type A plus detection of
                composite high-frequency residual currents from variable-frequency drives.
                Useful where mixed power-electronics on the same circuit.
              </li>
              <li>
                <strong className="text-white">Type B</strong> — full DC-sensitive
                detection including smooth DC residual currents. In accordance with
                BS EN 62423 or BS EN 60947-2. Required for PV inverters by default,
                except where one of the three exceptions applies.
              </li>
            </ul>
            <p>The three exceptions to the Type B requirement:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Exception (a) — Internal simple
                separation</strong>. The PCE (Power Conversion Equipment / inverter)
                provides at least simple separation between the AC and DC sides
                internally. Where this is documented by the manufacturer, Type B is not
                required.
              </li>
              <li>
                <strong className="text-white">Exception (b) — External transformer
                separation</strong>. A transformer with separate windings provides the
                simple separation externally. The PV inverter feeds a dedicated
                isolating transformer; the RCD downstream may be other than Type B.
              </li>
              <li>
                <strong className="text-white">Exception (c) — Manufacturer
                declaration</strong>. The PCE manufacturer explicitly states Type B is
                not required for the specific product. The manufacturer\'s statement /
                documentation must be obtained and retained as evidence to justify the
                non-Type-B selection.
              </li>
            </ul>
            <p>The selection process:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Read the inverter datasheet for the required RCD type and any exception statements</li>
              <li>
                Modern transformerless PV inverters typically include internal DC
                residual current monitoring (an RDC-DD — Residual Direct Current
                Detecting Device), which often qualifies for Exception (c) — &ldquo;Type
                A acceptable, Type B not required&rdquo; per manufacturer documentation
              </li>
              <li>
                Where none of the three exceptions applies, Type B is mandatory per BS EN
                62423 or BS EN 60947-2
              </li>
              <li>
                Type B RCDs cost £150–300 more than Type A on a residential consumer
                unit — the manufacturer declaration that allows Type A is a material BoM
                saving where applicable
              </li>
              <li>
                Cert evidence bundle retains the manufacturer\'s statement justifying any
                non-Type-B selection
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 531.3.3 — RCD type for circuits with DC components"
            clause="RCD Type AC shall only be used to serve fixed equipment where it is known that the load current contains no DC components. For PV inverters, EV chargers, LED drivers and other power electronic equipment, Type AC is not appropriate. Type B RCD (in accordance with BS EN 62423 or BS EN 60947-2) is required where DC residual currents can occur — except where (a) the PCE provides at least simple separation between AC and DC sides internally, (b) a transformer with separate windings provides simple separation externally, or (c) the PCE manufacturer states Type B is not required."
            meaning="The Type B requirement is the default for PV inverters but has three documented exceptions. The inverter datasheet specifies the required type and any exception that applies. The cert evidence bundle retains any manufacturer statement justifying a non-Type-B selection."
          />

          <ConceptBlock
            title="Reg 551.7.1(d) — connecting the inverter at the consumer unit"
            plainEnglish="A4:2026 added Reg 551.7.1(d) — prohibiting connection of a source to the load side of an RCD under certain conditions. The practical arrangement: dedicated inverter circuit at the consumer unit, not downstream of a general-purpose RCD."
            onSite="Specify a dedicated circuit for the inverter output at the consumer unit. Use an RCBO (combined MCB and RCD) of the inverter-datasheet-specified RCD type. Do not connect the inverter downstream of a general-purpose RCD shared with other loads."
          >
            <p>Why Reg 551.7.1(d) matters for inverter connection:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Leakage interaction</strong> — an inverter
                connected downstream of a general RCD shares the RCD\'s 30 mA threshold
                with other loads, potentially causing nuisance tripping from cumulative
                leakage
              </li>
              <li>
                <strong className="text-white">Protection coordination</strong> — on a
                fault upstream of the inverter, the shared RCD may not provide the
                intended protection because the inverter\'s fault current behaviour is
                different from a passive load\'s
              </li>
              <li>
                <strong className="text-white">DNO interface</strong> — the inverter is a
                generating set under Section 551 (Reg 551.1.1(d) — covered in Section
                2.1); its output protection arrangement must satisfy Section 551 rules,
                not just general consumer-unit RCD rules
              </li>
            </ul>
            <p>The standard arrangement on a residential consumer unit:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Dedicated inverter circuit on its own RCBO (Type A or Type B per inverter datasheet)</li>
              <li>RCBO sized to the inverter\'s maximum AC output current (with appropriate margin)</li>
              <li>Lockable / labelled isolator at the inverter location for safe-isolation during maintenance</li>
              <li>Cert evidence bundle records the RCBO type, the inverter datasheet RCD specification, and the dedicated-circuit arrangement</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A customer with 4 kWp PV, single south-facing roof, no shade, considering a battery in 18 months"
            situation="A customer wants 4 kWp PV now (single string of 10 × 400 W modules on south-facing main roof) with a clear plan to add a 10 kWh battery within 18 months when household budget allows. Three inverter topology options at quote stage: PV-only string inverter (cheapest now, but requires AC-coupled battery later); hybrid inverter without battery (PV-only operation now, DC-coupled battery added later); hybrid inverter with battery (full install now)."
            whatToDo="Specify the hybrid inverter now, even though battery isn\'t installed yet. The hybrid inverter handles PV-only operation cleanly today; adding the DC-coupled battery in 18 months is a battery-and-cabling job, not an inverter replacement. Compare with the PV-only string inverter path: adding battery later would require either replacing the string inverter (sunk cost) or adding a separate AC-coupled battery inverter (more complex architecture, additional conversion losses, two inverters in the house instead of one). The £200–300 premium on the hybrid inverter pays back many times over when the battery upgrade happens. The cert evidence bundle records the hybrid-inverter specification AND the planned battery upgrade pathway."
            whyItMatters="Topology decisions made at survey stage are difficult to reverse. The customer\'s 18-month battery plan dictates the inverter choice now. Specifying a string inverter now &ldquo;to save money&rdquo; locks in a more expensive battery install later. The honest survey conversation includes the future state of the install, not just the day-one state."
          />

          <Scenario
            title="A complex roof with chimney shadow and east-west split"
            situation="A customer with a complex roof geometry — main south-facing pitch with a chimney casting shadow across two modules during peak afternoon; east-facing extension roof for additional modules. 12 modules total, mixed orientations, chimney shadow on 2 modules for ~2 hours per day. Considering topology options: dual-MPPT string inverter; string inverter + power optimisers; microinverters."
            whatToDo="Module-level optimisation is the right answer. The chimney shadow on 2 modules combined with the orientation mismatch makes string-level architecture (even multi-MPPT) lossy. Two options: (1) Microinverters on all 12 modules — eliminates both mismatch sources, no central inverter SPOF, per-module monitoring. (2) String inverter + power optimisers on all 12 modules — module-level MPPT via the optimisers, central inverter handles DC-AC conversion, retains the central-inverter SPOF but at lower cost than microinverters. Cost comparison at this scale: microinverters add ~£1,200–1,800 over string inverter; power optimisers add ~£800–1,200. Yield recovery from module-level MPPT in this scenario: ~10–20% annually, worth ~£200–400/year. Both options pay back within 5–10 years. The choice between them depends on whether the central-inverter SPOF matters and whether the per-module hardware count concerns the customer."
            whyItMatters="Module-level optimisation pays back on shaded / multi-orientation arrays. The cost premium is real but recovered through yield. The PWI common-mistakes list flags &ldquo;ignoring shading from nearby objects&rdquo; as a routine design error — surveys that don\'t catch shading drive customers into string-inverter installs that disappoint on yield. Identifying shade at survey and recommending the right topology is the competent contractor\'s differentiator."
          />

          <CommonMistake
            title="Specifying Type AC RCD on a PV inverter circuit"
            whatHappens="An installer uses a standard Type AC RCBO from the consumer unit stock to protect the PV inverter circuit. The inverter is a modern transformerless residential unit. The Type AC RCD does not detect smooth DC residual currents the inverter could produce under fault. A latent fault remains undetected indefinitely; the inverter could energise exposed-conductive-parts under the right fault conditions. The EICR at 5 years flags the protective device type as a C2 observation."
            doInstead="Read the inverter datasheet. Specify the required RCD type — typically Type A or Type B per the manufacturer\'s spec. Transformerless inverters typically require Type B unless they include integral DC residual current monitoring that allows Type A. The cert evidence bundle records the RCD type specification and the inverter datasheet reference. Type AC RCBOs from general consumer unit stock are NOT appropriate for inverter circuits under Reg 531.3.3."
          />

          <CommonMistake
            title="Connecting the inverter downstream of the consumer unit RCD"
            whatHappens="An installer connects the inverter\'s AC output via a spare MCB-protected way on an existing consumer unit RCD bank. The inverter shares the 30 mA RCD threshold with other loads. The cumulative leakage from the inverter plus the other loads occasionally exceeds 30 mA, causing nuisance trips. The customer reports intermittent system disconnections that are difficult to localise. The fix requires re-routing the inverter to a dedicated RCBO."
            doInstead="Dedicated inverter circuit on its own RCBO of the correct type — Reg 551.7.1(d) prohibits the source connection downstream of a general RCD under certain conditions, and the practical implementation is the dedicated-circuit arrangement. The RCBO type matches the inverter datasheet (Type A or Type B). The dedicated circuit avoids the leakage interaction with other loads and provides the protection coordination Section 551 requires."
          />

          <CommonMistake
            title="Defaulting to microinverters on every install &ldquo;to future-proof&rdquo;"
            whatHappens="An installer specifies microinverters on all installs regardless of array geometry — &ldquo;to future-proof against shading&rdquo; or because the marketing material recommends them. On a clean single-orientation no-shade matched-module install, the microinverter cost premium (~£1,500–2,500 over string inverter on a 4 kWp install) does not pay back. The customer pays the premium without receiving the benefit; the installer\'s competitor wins the next quote on price."
            doInstead="Match the topology to the array. Microinverters and power optimisers pay back where mismatch is recoverable — multi-orientation, partial shade, mixed module age. On clean single-orientation arrays the string inverter is the cost-effective choice. The four-question survey framework (battery? mismatch? SPOF tolerance? cost-driven?) drives the topology selection. The competent contractor doesn\'t default to one topology; they specify the topology that matches the install\'s geometry."
          />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Four inverter topologies on the UK PV market: string inverter (dominant by volume), microinverter (module-level AC), power optimiser (module-level DC + central inverter), hybrid inverter (PV+BESS combined).',
              'BS 7671 requires inverter conformity to BS EN 62109-1 (general safety) and BS EN 62109-2 (particular requirements). Installer verification before connection is mandatory.',
              'A4:2026 Reg 551.7.1(d) prohibits source connection to the load side of an RCD under certain conditions — practical effect: dedicated inverter circuit at the consumer unit, not downstream of a general-purpose RCD.',
              'Reg 531.3.3 rules out Type AC for circuits with DC-component sources. Type A minimum; Type B for transformerless inverters that can produce smooth DC residual currents. The inverter datasheet specifies the required type.',
              'Topology selection driven by four questions: battery present (hybrid)? mismatch present (module-level)? SPOF tolerance (microinverter eliminates, power optimiser does not)? cost-driven (string inverter is cheapest)?',
              'Typical 2026 UK pricing: string ~£200–280 per kW, power optimiser ~£400–500 per kW, microinverter ~£500–650 per kW, PV-only hybrid ~£350–450 per kW, hybrid with battery £800–1,200 per kW.',
              'EREC G98 / G99 / G100 are the current DNO connection requirements (replacing the older G83 / G59). Inverter datasheets reference the current framework; older G83 / G59 references are stale CPD.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-4')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2.4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                MPPT
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.6 PV system architectures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
