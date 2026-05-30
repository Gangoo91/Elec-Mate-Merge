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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm6s4-dedicated-circuit',
    question:
      'Reg 722.55 — what does it require for an EV charging point’s supply circuit?',
    options: [
      'Share circuit with garage lighting',
      'A dedicated final circuit. The wallbox does NOT share its circuit with other loads (no socket-outlets, no lighting, no other appliances on the same circuit). One way in the consumer unit, one cable to the wallbox, one RCBO',
      'Multiple loads acceptable if under 32 A',
      'No dedicated circuit needed',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.55 sets the dedicated final circuit requirement for an EV charging point. The wallbox cannot share its circuit with other loads — no socket-outlets, no lighting circuits, no garage door opener, no other appliances. Reasons: (1) the continuous 32 A draw of a 7 kW Mode 3 charge cycle doesn’t mix well with intermittent loads on the same circuit; (2) the Type B / Type A + RDC-DD architecture protects ONLY the wallbox circuit; (3) isolation discipline is clearer with a single load per circuit. Cert evidence bundle records the dedicated CU way assignment.',
  },
  {
    id: 'm6s4-cable-32A',
    question:
      'A 7.4 kW single-phase Mode 3 wallbox draws 32 A continuous. Reg 311.1 max demand sized; Reg 433 overload protection. What cable size is typical for a ~10 m run in conduit / trunking?',
    options: [
      '1.5 mm² T+E',
      '6 mm² T+E (or 4 mm² SWA in some routes) — 32 A continuous load needs adequate cable cross-section. 6 mm² in conduit with reasonable bunching gives ~32-41 A current-carrying capacity (table 4D5 / Method C); voltage drop on a ~10 m run at 32 A stays comfortably under 5%. Some installs use 4 mm² SWA outdoor; some 10 mm² for long runs',
      '2.5 mm² always',
      '25 mm² SWA',
    ],
    correctIndex: 1,
    explanation:
      '7.4 kW @ 230 V = 32.2 A continuous. BS 7671 cable sizing process: Iz ≥ In after applying derating factors (grouping, ambient, thermal insulation). Method C (clipped direct) 6 mm² T+E ~41 A; Method 102 (in conduit) ~32-34 A — close to In, often acceptable with margin checked. Voltage drop on ~10 m at 32 A through 6 mm²: ~1.5% — comfortable. Longer runs (20-30 m) typically upsize to 10 mm² for voltage-drop headroom. Some installs use SWA (4 mm² or 6 mm²) for the outdoor section. Final cable choice depends on the installation method, length, ambient and grouping per Appendix 4. Cert evidence bundle records the cable selection calculation.',
  },
  {
    id: 'm6s4-load-curtailment',
    question:
      'Reg 722.311.201 — what does it permit?',
    options: [
      'Nothing',
      'Load curtailment — automatic OR manual disconnection of loads — may be taken into account when determining the maximum demand of the installation or part thereof. This lets the designer recognise that a smart wallbox will throttle its draw down when the rest of the house is at peak load, reducing the effective max demand on the supply',
      'Diversity factors only',
      'Only for commercial',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.311.201 permits load curtailment (manual OR automatic disconnection of loads) to be considered when determining the installation’s maximum demand. Practical UK 2025-26 application: dynamic load management (DLM) in the wallbox reads the main-supply current and throttles the EV charge rate down when the rest of the house is drawing heavily. This means the EV circuit + the household circuits don’t both need to be sized for simultaneous peak — the DLM ensures they don’t actually coincide. Reg 722.311.201 makes this engineering reality legal in the max demand calc. Note: Reg 311.1 generally forbids using diversity as a means of load curtailment; Reg 722.311.201 is a specific carve-out for EV circuits where the curtailment is actively engineered (DLM hardware).',
  },
  {
    id: 'm6s4-isolation',
    question:
      'Isolation discipline at the consumer unit for an EV circuit — what should be in place?',
    options: [
      'Customer’s call',
      'A readily-accessible, clearly-identified means of isolation for the EV circuit, typically the dedicated RCBO in the consumer unit OR a separate isolator. Cert evidence bundle records the isolation point location, current rating, and labelling',
      'No isolator',
      'Only emergency switching',
    ],
    correctIndex: 1,
    explanation:
      'Standard BS 7671 isolation requirements apply to the EV circuit — Reg 462, Reg 514.x labelling. UK 2025-26 EV install typically uses the dedicated RCBO in the consumer unit as the means of isolation (toggle-down lockable). Some installers add a separate AC isolator near the wallbox for outdoor / external installs (Reg 537 maintenance isolation). Labelling: clear circuit ID at the CU + the same ID at the wallbox + the isolator. Cert evidence bundle records the isolation arrangement. For outdoor installs, ensure the isolator is accessible without going past the wallbox itself.',
  },
];

const quizQuestions = [
  {
    question:
      'A 7.4 kW wallbox is being installed on a customer’s consumer unit that currently has 95 A peak draw measured over 7 days (electric shower, kettle, oven, lighting). DNO main supply is 100 A. Will the wallbox push the install over capacity?',
    options: [
      'Yes — refuse the install',
      'Naively: 95 A + 32 A = 127 A — would exceed the 100 A supply. But Reg 722.311.201 permits load curtailment (manual or automatic) to be considered. Solution: install the wallbox with DLM (dynamic load management) that throttles EV charge rate when household draw is high — the DLM-enabled max demand becomes 95 A peak (EV throttled to fit). Cert evidence bundle records the DLM configuration and Reg 722.311.201 rationale',
      'Just upgrade to a 3-phase supply',
      'Install the wallbox at 22 kW for more capacity',
    ],
    correctAnswer: 1,
    explanation:
      'Common UK 2025-26 install scenario: 100 A single-phase supply with high household peak load + wanting to add a 32 A EV charger. Reg 722.311.201 is the regulatory route — DLM (dynamic load management) hardware reads the main-supply current and throttles the EV charge rate down when household demand is high. The EV charges at full 32 A overnight when household is low; throttled to perhaps 6-13 A during evening peak. Cert evidence bundle records the DLM configuration, the calculated max demand under DLM, and the Reg 722.311.201 reference. Standard wallbox brands with DLM: MyEnergi Zappi, Wallbox Pulsar Plus, Hypervolt Home 3 Pro.',
  },
  {
    question:
      'A customer wants a 7 kW wallbox installed on the same circuit as their existing garage lighting and one socket-outlet. The customer argues this saves cable cost. What does the installer say?',
    options: [
      'OK if customer signs a waiver',
      'No — Reg 722.55 requires a dedicated final circuit. The wallbox cannot share its circuit with lighting or socket-outlets. The 32 A continuous EV charge cycle would: (1) stress the shared circuit with prolonged sustained current; (2) the Type A/B + RDC-DD protective architecture is specified for the wallbox alone; (3) isolation discipline gets confused when the customer expects to be able to use the socket while the EV is charging. Quote the dedicated circuit; explain the regulatory requirement',
      'Yes — saves cable',
      'Yes if under 16 A total',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 722.55 — dedicated final circuit, full stop. Sharing the EV circuit with lighting and a socket-outlet would: (1) put intermittent ~10 A loads onto a circuit designed for 32 A continuous EV draw; (2) confuse the RDC-DD / Type B protection logic (the smooth-DC fault detection is meaningful only for the EV load); (3) muddy the isolation point (customer can’t isolate the EV without isolating their garage lighting). Cost difference of running a second cable is small (~£20-40 of additional T+E + RCBO) — far less than the regulatory non-compliance cost. Cert evidence bundle records the dedicated circuit assignment.',
  },
  {
    question:
      'For a 7.4 kW Mode 3 wallbox at ~15 m cable run from the CU to the wallbox, what is the typical cable size and method?',
    options: [
      '1 mm² in cavity',
      '6 mm² or 10 mm² T+E (depending on installation method and grouping). 32 A continuous + voltage-drop limit (< 5% on the final circuit) + the installation method per Appendix 4. 6 mm² typical for ~10 m clipped direct; 10 mm² for longer runs or where the cable shares conduit with other circuits. SWA (4 mm² or 6 mm²) common for outdoor sections',
      '25 mm² always',
      '0.75 mm² flex',
    ],
    correctAnswer: 1,
    explanation:
      '32 A continuous load + voltage-drop limit drives the cable size. 6 mm² T+E clipped direct (Method C in Appendix 4 Table 4D5) gives ~41 A current carrying capacity — adequate for 32 A with margin. Voltage drop on 6 mm² over 15 m at 32 A: ~2.2% on T+E — well within the 5% final-circuit limit. Longer runs (20-30 m) often upsize to 10 mm² for headroom; runs through cavity insulation derate per Appendix 4. Outdoor section frequently uses 6 mm² SWA for mechanical protection + UV resistance. Cert evidence bundle records the cable calculation including installation method, grouping, ambient, and voltage drop.',
  },
  {
    question:
      'A customer’s consumer unit has no spare ways and no space for a sub-distribution board. They want a 7 kW wallbox. What is the install approach?',
    options: [
      'Refuse — impossible',
      'Replace or upgrade the consumer unit to one with spare ways, OR install a sub-board fed from a Henley block on the meter tails. The new way then provides the dedicated EV final circuit per Reg 722.55. Cert evidence bundle records the CU upgrade or sub-board addition + the EV circuit assignment',
      'Share an existing way',
      'Run from the meter directly',
    ],
    correctAnswer: 1,
    explanation:
      'Two common UK 2025-26 routes when the CU is full: (1) replace the CU with a higher-way unit that includes spare capacity (and modern Type A/B RCD protection on the existing circuits as part of the upgrade — often a sales opportunity); (2) install a sub-DB from a Henley block on the meter tails, with the EV circuit on the sub-DB. Both routes provide a dedicated final circuit per Reg 722.55. Cert evidence bundle records: the chosen route, the consequent EICR-level changes to the existing installation (if CU replaced), the Henley block specification if route 2. Don’t share an existing way (Reg 722.55 violation); don’t run direct from the meter (no protective device upstream).',
  },
  {
    question:
      'Reg 722.311.201 vs Reg 311.1 — what is the relationship for EV circuit sizing?',
    options: [
      'Same thing',
      'Reg 311.1 generally requires max demand to be determined and forbids using diversity as a means of load curtailment. Reg 722.311.201 is a specific EV-circuit carve-out that permits load curtailment (automatic OR manual disconnection) to be considered in max demand for the installation or part thereof. The carve-out recognises that DLM hardware actively engineers the curtailment — it’s not a paper diversity assumption',
      'Reg 311.1 only for industrial',
      '722.311.201 replaces 311.1',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 311.1 is the general max-demand regulation. It permits diversity as a calculation aid but explicitly forbids using diversity as a means of load curtailment. Reg 722.311.201 is the EV-specific carve-out — permits load curtailment (manual or automatic disconnection) to be considered in max demand. The distinction: diversity = paper assumption about peak coincidence; load curtailment = active hardware enforcement of non-coincidence. DLM hardware (in the wallbox or as a separate clamp meter + contactor) is the actuator that makes Reg 722.311.201 honest. Cert evidence bundle records the DLM configuration as the regulatory underpinning.',
  },
  {
    question:
      'A 7 kW Mode 3 wallbox cable runs grouped in shared trunking with five other final circuits to the kitchen / utility area. What does the cable sizing need to account for?',
    options: [
      'Nothing — bunching is already in the table',
      'Cable grouping derating per Appendix 4 Table 4C1 — 6 grouped cables derates the current-carrying capacity (factor ~0.57). 6 mm² T+E Method 102 baseline ~32-34 A × 0.57 = ~18-19 A — INADEQUATE for 32 A continuous. Upsize to 10 mm² (~46 A × 0.57 = ~26 A — still tight) or route the EV cable on its own (clipped direct / separate conduit) to avoid the grouping derating. Cert evidence bundle records the grouping calculation',
      'Use 1.5 mm²',
      'Ignore the other circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Cable grouping (multiple cables in shared conduit / trunking) derates the cable’s current-carrying capacity per Appendix 4 Table 4C1. Six grouped cables: factor ~0.57. 6 mm² T+E Method 102 baseline ~32-34 A × 0.57 = ~18-19 A — INADEQUATE for 32 A continuous. Either upsize to 10 mm² (better but still close to In after grouping) or route the EV cable independently (clipped direct or its own conduit) so the grouping factor doesn’t apply. This is a common UK 2025-26 EV install mistake — engineer sizes cable from the Method C baseline without checking the actual installation method + grouping on site. Cert evidence bundle records the cable sizing with the grouping factor explicitly applied.',
  },
];

const faqs = [
  {
    question: 'Can the EV circuit be on a 32 A MCB without an RCD/RCBO?',
    answer:
      'No — Reg 722.531 requires the RCD architecture (Type B OR Type A + RDC-DD). Standalone MCB without residual current detection is non-compliant. UK 2025-26 install: Type A RCBO on the dedicated EV way is the standard (with the wallbox’s integrated RDC-DD covering smooth DC). Type B RCBO where the wallbox doesn’t include RDC-DD. Cert evidence bundle records the device type and BS EN reference.',
  },
  {
    question: 'What about cable bunching with other final circuits in the CU?',
    answer:
      'Cable bunching derates the cable’s current-carrying capacity per Appendix 4. Where the EV circuit cable runs alongside other final circuits in shared conduit or trunking, the grouping factor reduces the rated capacity — may require upsizing the cable. Typical: 6 mm² T+E in conduit with 5 other circuits derates to ~28-32 A per Table 4D5 + grouping factor 0.7-0.8. Upsize to 10 mm² in that scenario for the 32 A EV continuous draw. Cert evidence bundle records the cable calc with grouping factor.',
  },
  {
    question: 'How does DLM (Dynamic Load Management) actually work?',
    answer:
      'DLM = the wallbox monitors the household main-supply current (via a CT clamp on the incoming tails, or via smart-meter integration in some advanced wallboxes) and throttles the EV charge rate to keep the total household + EV draw under a configured limit. Example: 100 A supply limit, household drawing 70 A, wallbox set to limit total to 95 A → wallbox throttles EV charge to (95 - 70) = 25 A. Household later drops to 30 A → wallbox ramps EV back to 32 A maximum. The wallbox’s contactor handles the modulation; the CP signalling tells the vehicle the new current limit. Cert evidence bundle records the DLM setup, CT location, configured limits.',
  },
  {
    question: 'Does the EV circuit count toward the consumer unit’s diversified max demand?',
    answer:
      'Yes — Reg 311.1 and Reg 722.311.201 together. Without DLM: full 32 A counted as the EV circuit’s contribution to max demand. With DLM: the curtailed value (e.g. 13 A typical evening; 32 A overnight) can be used in the max demand calc per Reg 722.311.201. The DNO supply capacity (typically 80-100 A on UK domestic) is the binding constraint; the cert evidence bundle records the max demand calc and shows how the EV fits within the supply.',
  },
  {
    question: 'What\'s in a typical UK 2025-26 EV install material spec?',
    answer:
      'Cable: 6 mm² (or 10 mm² for long runs / grouped) T+E for internal runs; 6 mm² SWA for outdoor sections. RCBO: Type A 32 A 30 mA for the dedicated CU way (or Type B if wallbox lacks RDC-DD). Isolator: dedicated DP 32 A isolator near the wallbox for outdoor installs. Wallbox: 7 kW Mode 3 from a UK reputable brand with integrated RDC-DD + OPDD + DLM + BS EN 61851 + BS EN IEC 62196-2 conformity. CU labelling per Reg 514.x. Total kit cost ~£600-900 + installation labour.',
  },
];

export default function RenewableEnergyModule6Section4() {
  const navigate = useNavigate();

  useSEO({
    title: 'Cable, RCBO & dedicated final circuit | Renewable Energy 6.4 | Elec-Mate',
    description:
      'Cable sizing for 7 kW single-phase EV install (32 A continuous), Reg 722.55 dedicated final circuit, Reg 311.1 + Reg 722.311.201 max demand and load curtailment / DLM, RCBO selection per Reg 722.531, isolation per Reg 462, BS EN 62208 enclosures.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 4 · BS 7671:2018+A4:2026 · Reg 722.55 + 311.1 + 722.311.201"
            title="Cable, RCBO & dedicated final circuit"
            description="Single-phase 7 kW Mode 3 wallbox circuit: 32 A continuous load, Reg 722.55 dedicated final circuit, cable sizing per Appendix 4, Reg 311.1 max demand with Reg 722.311.201 load curtailment (DLM), Type A / Type B RCBO selection, isolation discipline."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 722.55 — the EV charging point shall be supplied from a DEDICATED final circuit. No socket-outlets, no lighting, no other appliances on the same circuit. One way in CU, one cable, one RCBO, one wallbox.',
              '7.4 kW single-phase Mode 3 wallbox = 32 A continuous load at 230 V. Cable size: 6 mm² T+E typical for ~10 m clipped direct; 10 mm² for longer runs or grouped circuits. Voltage drop on the EV final circuit < 5% per Appendix 4.',
              'Reg 311.1 — max demand of the installation determined by calculation, measurement, enquiry or inspection. EV circuit’s 32 A contribution counts toward the diversified max demand against the DNO supply capacity (typically 80-100 A single-phase).',
              'Reg 722.311.201 — load curtailment (automatic OR manual disconnection) may be considered when determining max demand. The EV-specific carve-out from Reg 311.1’s general prohibition on using diversity as a curtailment mechanism.',
              'DLM (Dynamic Load Management) is the hardware that makes Reg 722.311.201 honest. CT clamp on incoming tails monitors household draw; wallbox throttles EV charge rate via the CP signalling current limit announcement.',
              'RCBO selection per Reg 722.531: Type A 32 A 30 mA on the dedicated EV way where the wallbox includes integrated RDC-DD; Type B 32 A 30 mA where the wallbox doesn’t.',
              'Isolation: dedicated RCBO in CU + clearly-labelled circuit + optional external AC isolator near the wallbox for outdoor installs. Reg 462 + Reg 514.x labelling.',
              'Where the CU has no spare ways: upgrade the CU or fit a sub-DB from a Henley block. Both routes provide a dedicated final circuit per Reg 722.55. Cert evidence bundle records the route and the consequent install changes.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 722.55 — dedicated final circuit for an EV charging point. No shared loads.',
              'Calculate cable size for 32 A continuous Mode 3 wallbox: current carrying capacity per Appendix 4 with grouping / ambient / installation method factors; voltage drop within 5% on the final circuit.',
              'Apply Reg 311.1 to determine max demand of the installation including the EV circuit contribution.',
              'Apply Reg 722.311.201 — permit load curtailment (manual or automatic) in max demand calc. Document the DLM (Dynamic Load Management) hardware as the curtailment mechanism.',
              'Select the RCBO per Reg 722.531: Type A where wallbox includes integrated RDC-DD; Type B where it doesn’t.',
              'Apply Reg 462 + Reg 514.x labelling for the isolation point and circuit identification.',
              'Handle the no-spare-ways CU scenario via CU upgrade or sub-DB from Henley block; record consequential changes to the existing installation.',
              'Document the cable + RCBO + circuit assignment + max demand calc + DLM configuration in the cert evidence bundle.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Dedicated final circuit. Right-sized cable. Right RCBO. DLM where capacity is tight. The 7 kW install is a pattern, not a puzzle.
          </Pullquote>

          <ContentEyebrow>Dedicated final circuit per Reg 722.55</ContentEyebrow>

          <ConceptBlock
            title="Why a dedicated final circuit, not a shared one"
            plainEnglish="Reg 722.55 requires the EV charging point to be supplied from a dedicated final circuit. The wallbox does NOT share its circuit with other loads. This is structural in the install, not a customer preference."
            onSite="One way in the consumer unit, labelled for the EV charging circuit. One cable to the wallbox. One RCBO at the appropriate type (Type A or Type B per Reg 722.531). The dedicated arrangement makes the smart-charging logic (DLM, CP signalling), the protection logic (RDC-DD, OPDD) and the isolation discipline (single point of disconnection) all coherent."
          >
            <p>Reasons for the dedicated final circuit:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Continuous high current</strong> —
                32 A for hours during a charging cycle. Mixing with intermittent
                household loads stresses the shared circuit thermally and
                triggers nuisance overload protection
              </li>
              <li>
                <strong className="text-white">Protective architecture
                  specificity</strong> — the Type B / Type A + RDC-DD
                architecture is calibrated for the wallbox’s fault profile;
                adding other loads to the same circuit may put other devices
                outside the protective intent
              </li>
              <li>
                <strong className="text-white">Isolation clarity</strong> — a
                single dedicated isolation point lets the customer / next
                electrician disconnect the EV without touching any other circuit.
                Critical for emergency response and routine maintenance
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle
                  alignment</strong> — each Section 722 layer (earthing-tree,
                RCD architecture, BS EN 61851 conformance) maps to one circuit
                with one wallbox. Shared circuits muddy the documentation
              </li>
              <li>
                <strong className="text-white">Reg 722.55 is binding</strong>
                — the wording uses "shall" — dedicated final circuit is a
                mandatory requirement, not guidance
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.55 — Dedicated final circuit for EV charging"
            clause="Each charging point shall be supplied by an individual final circuit dedicated to its supply, protected by an overcurrent protective device complying with the appropriate Standard."
            meaning="Reg 722.55 mandates a dedicated final circuit per EV charging point. The wallbox cannot share its circuit with any other load. Each charging point has its own way in the consumer unit, its own cable, its own RCBO. Where multiple wallboxes are installed at the same property, each has its own dedicated circuit. The OCPD complies with the relevant standard (BS EN 61009 RCBO, BS EN 60898 MCB, BS EN 62423 Type B RCBO, etc.) at the rating matched to the wallbox’s rated current — typically 32 A for a 7 kW single-phase install. Cert evidence bundle records the dedicated CU way assignment + the OCPD selection."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Cable sizing for 32 A continuous</ContentEyebrow>

          <Pullquote>
            32 A continuous changes the cable sizing math. Voltage drop and grouping derating bite earlier than on intermittent loads.
          </Pullquote>

          <ConceptBlock
            title="Cable size for 7 kW single-phase Mode 3 — 32 A continuous"
            plainEnglish="A 7.4 kW Mode 3 wallbox draws 32 A continuously during a charging cycle. The cable must be sized per Appendix 4 of BS 7671 to handle the continuous load AND stay within the voltage-drop limit on the final circuit (5% for general final circuits per Appendix 4 Tables 4Ab onwards)."
            onSite="6 mm² T+E is the typical UK 2025-26 default for ~10 m clipped-direct runs. 10 mm² for longer runs (20-30 m) or where grouping derating bites. 6 mm² SWA common for outdoor sections requiring mechanical protection. The cable selection is calculated per Appendix 4 with installation method, grouping, ambient, and voltage drop factors — recorded in the cert evidence bundle."
          >
            <p>Cable sizing factors:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Current carrying capacity</strong>
                — Appendix 4 Tables 4D5 (T+E) / 4D4 (SWA). 6 mm² T+E Method C
                (clipped direct): ~41 A; Method 102 (in conduit): ~32-34 A. 10
                mm² T+E Method C: ~57 A; Method 102: ~46 A
              </li>
              <li>
                <strong className="text-white">Grouping derating</strong> —
                cables bunched in conduit or trunking derate per Appendix 4
                Table 4C1. 6 cables grouped: factor 0.57; 4 cables grouped:
                factor 0.65; 2 cables grouped: factor 0.80
              </li>
              <li>
                <strong className="text-white">Ambient derating</strong> —
                cables in warm environments (loft, near hot water tanks, in
                insulated walls) derate per Appendix 4. UK garage / outdoor:
                ambient typically 25-30°C, derating modest
              </li>
              <li>
                <strong className="text-white">Voltage drop</strong> — 5% on the
                final circuit per Appendix 4 (excluding any drop on the
                distribution circuit upstream). 6 mm² T+E over 15 m at 32 A:
                ~2.2% drop. 10 mm² same conditions: ~1.3% drop. Voltage drop
                rarely binding on typical UK domestic runs; current-carrying
                capacity usually is
              </li>
              <li>
                <strong className="text-white">Outdoor cable</strong> — 6 mm²
                SWA is the typical UK 2025-26 outdoor choice. Mechanical
                protection, UV resistance, glanding into IP-rated enclosures.
                Section 6.5 covers outdoor installation in depth
              </li>
              <li>
                <strong className="text-white">Sizing calculation
                  template</strong> — Iz ≥ In after derating; voltage drop ≤
                limit; protective device characteristics satisfied (Zs ≤ table
                41.3 value etc.). Cert evidence bundle records the calc with
                each input
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Max demand and load curtailment — Reg 311.1 + Reg 722.311.201</ContentEyebrow>

          <ConceptBlock
            title="Reg 311.1 — determining max demand including the EV"
            plainEnglish="Reg 311.1 requires the installation’s max demand to be determined for economic and reliable design within thermal limits and admissible voltage drop. The EV circuit’s 32 A continuous contribution counts toward the diversified max demand against the DNO supply capacity (typically 80-100 A single-phase UK domestic)."
            onSite="Survey the existing installation’s max demand: smart-meter half-hourly data over 7+ days; visual inspection of existing circuits; calculation per Reg 311.1. Add the EV circuit’s contribution. Compare against the DNO supply. If the total exceeds supply: invoke Reg 722.311.201 load curtailment (DLM) OR upgrade the DNO supply."
          >
            <p>Max demand factors:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Survey method</strong> — smart-
                meter half-hourly data + visual inspection of circuits. 7-day
                survey typical
              </li>
              <li>
                <strong className="text-white">Diversity</strong> — Reg 311.1
                permits diversity in the calculation (e.g. electric shower +
                cooker rarely simultaneous). Diversity factors per On-Site
                Guide tables or engineering judgement
              </li>
              <li>
                <strong className="text-white">Diversity is NOT
                  curtailment</strong> — Reg 311.1 forbids diversity from being
                used as a means of load curtailment. Diversity is a paper
                calculation aid; curtailment is active hardware enforcement
              </li>
              <li>
                <strong className="text-white">EV circuit
                  contribution</strong> — full 32 A without DLM; curtailed
                value with DLM per Reg 722.311.201
              </li>
              <li>
                <strong className="text-white">DNO supply capacity</strong>
                — typically 80-100 A single-phase UK domestic. Some new builds
                have lower (60 A); some old / large properties higher
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.311.201 — Load curtailment in EV max demand"
            clause="Load curtailment, including load reduction or disconnection, either automatically or manually, may be taken into account when determining the maximum demand of the installation or part thereof."
            meaning="Reg 722.311.201 is the EV-specific carve-out from Reg 311.1’s general prohibition on using diversity as curtailment. Where load curtailment is ACTIVELY ENGINEERED (DLM hardware, smart-meter-coordinated tariffs, manual switching policies), the curtailed max demand can be used in the calc. UK 2025-26 dominant pattern: DLM in the wallbox monitors household draw via CT clamp; throttles EV charge rate to keep total under DNO supply limit. The DLM hardware is the regulatory underpinning of the carve-out — paper assumptions about coincidence don’t qualify. Cert evidence bundle records the DLM configuration, CT location, current limits."
          />

          <ConceptBlock
            title="DLM (Dynamic Load Management) in practice"
            plainEnglish="DLM = hardware that monitors the household main-supply current and modulates the EV wallbox’s charge rate to keep total household + EV draw under a configured ceiling. The wallbox’s CP signalling tells the vehicle the current limit; the vehicle complies by drawing less."
            onSite="Most UK 2025-26 smart wallboxes (MyEnergi Zappi, Wallbox Pulsar Plus, Hypervolt Home 3 Pro, EO Mini Pro 3) include DLM as standard or as a low-cost add-on. CT clamp installation around the incoming tails takes 15-30 minutes; wallbox configuration via the smart app sets the household supply limit. Cert evidence bundle records the CT clamp position, the configured limit, and the DLM-enabled max demand calc."
          >
            <p>DLM operating sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CT clamp around incoming
                  tails</strong> — measures household total current draw at
                the meter / consumer unit
              </li>
              <li>
                <strong className="text-white">Wallbox reads the CT
                  signal</strong> — typically via a wired connection (CT to
                wallbox terminals); some wallboxes use a smart-meter
                integration alternative
              </li>
              <li>
                <strong className="text-white">Wallbox calculates available
                  current</strong> — supply limit (e.g. 95 A) minus household
                draw (e.g. 70 A) = available for EV (25 A in this example)
              </li>
              <li>
                <strong className="text-white">CP signalling to
                  vehicle</strong> — wallbox announces the current limit to
                the vehicle via the Control Pilot PWM duty cycle. Vehicle
                complies by drawing at or below that limit
              </li>
              <li>
                <strong className="text-white">Dynamic response</strong> —
                household draw rises (electric shower starts) → wallbox
                throttles EV down. Household draw falls (shower stops) →
                wallbox ramps EV back up. Response in seconds
              </li>
              <li>
                <strong className="text-white">Minimum charge
                  rate</strong> — manufacturer-defined; typically 6 A (the
                lowest Mode 3 charge rate per BS EN 61851). If household
                load is so high the wallbox would need to drop below 6 A,
                the wallbox pauses charging entirely
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong>
                — records: CT clamp location and orientation; supply limit
                configured; DLM-enabled max demand calc; commissioning
                test result (verify DLM throttles correctly under simulated
                load)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>RCBO selection and isolation</ContentEyebrow>

          <ConceptBlock
            title="RCBO selection per Reg 722.531 and Reg 411"
            plainEnglish="The dedicated EV final circuit needs an RCBO (Residual Current Circuit Breaker with Overcurrent protection) — one device combining overcurrent (MCB) and residual current (RCD) detection. Type per Reg 722.531: Type A where wallbox includes integrated RDC-DD; Type B where wallbox doesn’t."
            onSite="32 A Type A RCBO is the typical UK 2025-26 selection (~£25-40). Manufacturer brands: MK, Hager, Schneider, Wylex. Verify the RCBO rating, type, and Reg 411 ADS compatibility (Zs ≤ Table 41.3 value for the device characteristic + rating)."
          >
            <p>RCBO selection criteria:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Current rating</strong> — In =
                32 A for a 7 kW single-phase wallbox. Match to the wallbox’s
                rated current
              </li>
              <li>
                <strong className="text-white">Residual current
                  threshold</strong> — 30 mA for additional protection per
                Section 415. Standard on all RCBOs used for socket /
                EV-charging contexts
              </li>
              <li>
                <strong className="text-white">RCD type</strong> — Type A (BS
                EN 61009) where wallbox has integrated RDC-DD; Type B (BS EN
                62423) where it doesn’t. Section 6.3 covers this
              </li>
              <li>
                <strong className="text-white">Characteristic</strong> —
                typically B-curve for general final circuits; C-curve if
                inrush considerations from the wallbox’s power electronics
                trigger nuisance trips on B (rare in 2025-26 — most
                wallboxes have soft-start)
              </li>
              <li>
                <strong className="text-white">Zs compatibility</strong> —
                measured Zs at the wallbox must be ≤ the Table 41.3 value for
                the RCBO’s type and rating. Type A 32 A B-curve: Zs ≤ 1.37
                Ω per Table 41.3(a). Type B RCBO: similar but consult Table
                41.3(b) for C-curve, etc.
              </li>
              <li>
                <strong className="text-white">Site limit</strong> — apply the
                GN3 0.80 factor for cold-measured site values. 1.37 Ω × 0.80
                = 1.10 Ω site limit for the Type A 32 A B-curve example
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> —
                records: RCBO manufacturer + model + rating + type + BS EN
                reference; Zs measured at wallbox; ADS calc against Table
                41.3
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Isolation discipline"
            plainEnglish="Standard BS 7671 isolation requirements apply. The dedicated RCBO in the CU is the primary isolation point; some installs add a separate AC isolator near the wallbox (especially for outdoor installs) per Reg 537. Clear labelling per Reg 514.x at both ends."
            onSite="Label the dedicated CU way clearly (e.g. “EV CHARGER — Garage Drive”). Mark the wallbox AC supply side with the same circuit ID. If a separate isolator is fitted, label it consistently. Customer education at handover: where the isolator is, how to use it in emergency."
          >
            <p>Isolation arrangement details:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Primary isolation</strong> —
                dedicated RCBO in the CU. Toggle-down lockable for
                lock-off / tag-out work. Padlock-compatible isolation point
              </li>
              <li>
                <strong className="text-white">Secondary isolation
                  (optional)</strong> — separate AC isolator near the
                wallbox. Common for outdoor installs where the CU is far
                from the wallbox. Per Reg 537 maintenance isolation
              </li>
              <li>
                <strong className="text-white">Labelling</strong> — circuit
                ID at CU + wallbox AC terminal + isolator (if fitted) all
                match. Reg 514.x requires clear, durable labelling
              </li>
              <li>
                <strong className="text-white">Outdoor isolator
                  considerations</strong> — IP65 minimum, weather-
                resistant, lockable. BS EN 60669-2-4 isolator standard
              </li>
              <li>
                <strong className="text-white">Customer handover</strong>
                — explain the isolation point, demonstrate operation, note
                that the customer can use the CU RCBO for routine isolation
                (e.g. while replacing a tethered cable end)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="UK suburban customer — straightforward 7 kW install"
            situation="Midlands semi-detached, 100 A single-phase supply, household max demand ~70 A measured peak. CU has 3 spare ways. Customer wants a 7 kW wallbox on the integral garage wall, ~5 m cable run from the CU."
            whatToDo="Cable: 6 mm² T+E clipped direct from CU to wallbox (5 m run, no significant grouping, Method C ~41 A capacity vs 32 A continuous load = comfortable). Voltage drop: ~0.7% — well under 5%. RCBO: Type A 32 A 30 mA B-curve in the dedicated CU way (wallbox is MyEnergi Zappi with integrated RDC-DD). Max demand: 70 A measured + 32 A EV = 102 A peak — slightly over 100 A supply. Apply Reg 722.311.201 with DLM: Zappi CT clamp on incoming tails; supply limit 95 A; throttled max demand = 95 A. Reg 311.1 + 722.311.201 compliance recorded in cert evidence bundle. Isolation: dedicated RCBO in CU + clearly labelled. Total install: ~3 hours including DLM commissioning and verification."
            whyItMatters="This is the dominant UK 2025-26 install — straightforward 7 kW Mode 3 wallbox with DLM. The Reg 722.311.201 carve-out makes the 100 A supply work without DNO upgrade (which can cost £1,000s and take months). DLM commissioning is part of the install workflow; verify throttle behaviour under a simulated household load (turn on the kettle while charging — confirm Zappi reduces EV current via the app)."
          />

          <Scenario
            title="No-spare-ways CU — sub-DB from Henley block"
            situation="Customer’s consumer unit is a 1990s 10-way unit with 6 circuits, no spares. CU is too small to add a new way; customer doesn’t want a full CU replacement. Wants a 7 kW wallbox added."
            whatToDo="Install a sub-DB from a Henley block on the meter tails. Sub-DB is a small 2-way enclosure with: 100 A main isolator + Type A 32 A 30 mA RCBO for the EV circuit + space for one additional future way. The Henley block taps the meter tails BEFORE the existing CU; sub-DB is a parallel supply to the existing installation. Cable run: 6 mm² T+E from sub-DB to wallbox; sub-DB labelled, locked, accessible. Reg 722.55 dedicated final circuit satisfied (EV is on its own way in the sub-DB). Max demand: as before, with DLM if needed. Cert evidence bundle: Henley block specification + sub-DB schedule + EV circuit assignment + existing-installation impact (none — the existing CU and its circuits are untouched). Total install: ~4-5 hours including the sub-DB fit-up."
            whyItMatters="The no-spare-ways scenario is common on older UK domestic properties. The sub-DB route avoids the cost and disruption of a full CU replacement (which would also typically involve upgrading the existing circuits’ RCD protection per current standards — a big EICR-level exercise). The sub-DB is a clean, lower-cost route that adds the EV circuit without touching the existing installation. Cert evidence bundle records the boundary clearly."
          />

          <CommonMistake
            title="Sharing the EV circuit with garage lighting / a socket-outlet"
            whatHappens="Installer reuses an existing 32 A radial circuit in the garage to feed the new wallbox AND the garage lighting + one socket-outlet. Customer is pleased with the cost saving. EICR at year 5 codes the install as C2 — Reg 722.55 violation, mixed-load circuit. Customer pays for the dedicated circuit retrofit + makes good the garage lighting + restores the socket on a separate circuit."
            doInstead="Dedicated final circuit per Reg 722.55, always. Cost of running a new 6 mm² T+E + RCBO ~£60-100 — far less than the EICR remediation cost two years later. Customer education at quote stage: explain why the dedicated circuit is mandatory, not optional. Cert evidence bundle records the dedicated circuit + circuit ID."
          />

          <CommonMistake
            title="Sizing the EV cable for 32 A intermittent instead of 32 A continuous"
            whatHappens="Installer pulls a 2.5 mm² T+E thinking “the wallbox draws 32 A, but typical UK domestic load is intermittent — 2.5 mm² handles up to 27 A clipped direct so we’re close”. The cable runs at sustained 32 A during a charge cycle. Cable thermal rating exceeded; cable insulation degrades; over time, the cable’s insulation breaks down. Could lead to thermal damage or fault."
            doInstead="EV charge cycle = SUSTAINED 32 A for hours. Not intermittent. Cable must be sized per Appendix 4 with the FULL 32 A continuous current as Iz target. 2.5 mm² is too small. 6 mm² (clipped direct) is the typical answer; 10 mm² where grouping or long runs derate the 6 mm² below 32 A. Cert evidence bundle records the cable calc — clearly show the continuous load assumption."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 722.55 — dedicated final circuit per EV charging point. No shared loads. One way in CU, one cable, one RCBO, one wallbox.',
              '7.4 kW single-phase wallbox = 32 A continuous load. Cable sized per Appendix 4 with continuous-load assumption: typically 6 mm² T+E for ~10 m clipped direct; 10 mm² for longer / grouped; 6 mm² SWA for outdoor sections.',
              'Voltage drop ≤ 5% on the final circuit. 6 mm² T+E over 15 m at 32 A: ~2.2% — comfortable. Current-carrying capacity usually more binding than voltage drop on typical UK domestic runs.',
              'Reg 311.1 max demand determined for the installation; EV circuit’s 32 A contribution adds to the diversified peak.',
              'Reg 722.311.201 EV-specific carve-out — permits load curtailment (manual or automatic disconnection) to be considered in max demand. DLM hardware is the regulatory underpinning.',
              'DLM (Dynamic Load Management) — CT clamp on incoming tails reads household current; wallbox throttles EV charge rate via CP signalling to keep total under supply limit. Standard on most UK 2025-26 smart wallboxes.',
              'RCBO selection per Reg 722.531: Type A 32 A 30 mA where wallbox includes integrated RDC-DD; Type B 32 A 30 mA where it doesn’t. Section 6.3 covers this in depth.',
              'Zs measured at wallbox ≤ Table 41.3 value for the RCBO’s type and characteristic. Type A 32 A B-curve: Zs ≤ 1.37 Ω (1.10 Ω site limit per GN3 0.80).',
              'Isolation: dedicated RCBO in CU + optional external AC isolator (Reg 537) for outdoor installs. Clear labelling per Reg 514.x at both ends.',
              'No-spare-ways CU: upgrade CU OR fit sub-DB from Henley block. Both provide the dedicated final circuit per Reg 722.55.',
              'Cert evidence bundle: cable sizing calc, RCBO selection, max demand calc with DLM, isolation points, Reg 411 ADS verification.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-6-section-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                RCD architecture & RDC-DD
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-6-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.5 Outdoor install — IP, location, mounting
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
