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
    id: 'm4s1-what-is-diverter',
    question:
      'A PV diverter on a UK domestic install — what does it do, and where does it sit in the system?',
    options: [
      'A second inverter',
      'A device that diverts surplus PV generation (the excess above on-site consumption) to a local resistive or controllable load — typically immersion heater, EV charger, or underfloor heating — rather than exporting it to the grid. Sits in the AC infrastructure between the inverter and the consumer unit, with a current transformer (CT) on the grid tail measuring net export. When export &gt; 0, the diverter modulates power to the target load',
      'A grid filter',
      'A type of RCD',
    ],
    correctIndex: 1,
    explanation:
      'A PV diverter measures net grid export with a CT clamp on the incoming supply tail; when the array generates more than the property consumes, it modulates power to a chosen load (immersion heater is most common, EV charger / heat-pump / UFH are growing applications). Converts excess kWh that would otherwise be exported at the SEG rate (5-15 p/kWh typical) into self-consumed kWh worth ~28 p/kWh (the displaced grid-import cost). Significantly improves the financial case where SEG export rate is low and self-consumption is incomplete.',
  },
  {
    id: 'm4s1-economics',
    question:
      'A 5 kWp install generates ~5,000 kWh/year. Customer self-consumes ~30% without a diverter. SEG export rate 5 p/kWh; grid import rate 28 p/kWh. What\'s the economic case for a diverter?',
    options: [
      'No case',
      'Without diverter: 30% × 5,000 = 1,500 kWh self-consumed (saving 1,500 × 28p = £420); 3,500 kWh exported (earning 3,500 × 5p = £175). With diverter capturing ~40% more of surplus (say 50% total self-consumption): 2,500 kWh self-consumed (£700); 2,500 kWh exported (£125). Net annual gain ~£230. Typical diverter cost £400-£700 — payback ~2-3 years. Strong economic case where export rate &lt; 30-40% of import rate',
      'Diverter loses money',
      'Diverter only works for hot water',
    ],
    correctIndex: 1,
    explanation:
      'The diverter economic case is driven by the gap between import and export rates. UK 2025-2026 typical: export 5-15 p/kWh (SEG), import 25-35 p/kWh (off-peak / standard / peak blend). Every kWh diverted to self-consumption saves 13-30 p that would otherwise be lost. Payback 2-4 years typical for installs with significant surplus (large PV + low daytime occupancy). Where the customer has tight self-consumption already (e.g. EV charging during the day), the diverter may add little — the financial case must be evaluated against the customer\'s actual usage profile.',
  },
  {
    id: 'm4s1-ac-vs-dc-coupled',
    question:
      'Difference between AC-coupled and DC-coupled PV diverters?',
    options: [
      'Same thing',
      'AC-coupled diverter: separate AC-side device that measures net grid export with a CT and modulates power to a target AC load (immersion, EV, UFH). Inverter operates normally; diverter intercepts surplus AC. Most common UK domestic. DC-coupled diverter: integrated into the inverter or a DC-side device that diverts surplus DC directly to a target load — less common in residential, more common in commercial solar-thermal hybrid',
      'DC-coupled is cheaper',
      'AC is for water only',
    ],
    correctIndex: 1,
    explanation:
      'AC-coupled is the dominant UK domestic configuration. The diverter is an AC-side device — typically a wall-mounted unit (myenergi Eddi, Marlec Solar iBoost, Solar Edge HD-Wave with built-in diverter) — that uses a current transformer on the grid tail to measure net export. When net export &gt; 0, the diverter modulates power to its connected load. Multiple loads can be prioritised (immersion first, then EV charger, then heat pump). DC-coupled is rarer in residential — typically commercial scenarios with dedicated DC-loaded thermal storage. The decision depends on the load type, inverter compatibility, and installer experience.',
  },
  {
    id: 'm4s1-immersion-load',
    question:
      'A customer wants a PV diverter to heat their hot water cylinder. Their existing immersion heater is a standard 3 kW (13 A AC). Compatibility?',
    options: [
      'Always compatible',
      'Diverter must support phase-angle or burst-fire modulation of the resistive load. Standard 3 kW immersion is highly compatible — it\'s purely resistive (no inductive / electronic load), tolerates rapid power-level changes, and works at any continuous power below its rating. Diverters from Eddi / Solar iBoost / iSensor support immersion loads up to 3-3.6 kW typical. The hot water cylinder needs sufficient capacity to absorb the diverted energy without overheating — typical 150-300 L UK cylinder absorbs 5-10 kWh / day comfortably',
      'Customer needs a new cylinder',
      'Diverters can\'t do immersion',
    ],
    correctIndex: 1,
    explanation:
      'The immersion heater is the easiest diverter load — purely resistive, tolerates rapid modulation. Diverter modulates power by phase-angle control (chopping the AC waveform — produces RFI, may need filter on the diverter line) OR burst-fire control (turning the immersion on for full cycles every N cycles — cleaner electrically). Modern UK diverters typically use a combination. Standard UK cylinder 150-200 L absorbs ~7 kWh from cold to fully hot — well within typical daily PV surplus on a 5 kWp install. Where the cylinder fills before all surplus is captured, the diverter cascades to the next priority load (EV / UFH / heat pump).',
  },
  {
    id: 'm4s1-ev-charger',
    question:
      'PV diverter to an EV charger — how does it work, and what\'s the limitation?',
    options: [
      'Standard EV charger',
      'Requires a PV-aware EV charger (e.g. myenergi Zappi, Ohme, Andersen with solar mode, Pod Point Solo with smart features). The charger receives the diverter signal (or has its own CT clamp) and modulates charging current to match available PV surplus. Limitation: most EVs accept charging at a minimum 6 A (1.4 kW single-phase) — below that the charger can\'t maintain the charging session. So surplus &lt; 1.4 kW can\'t be captured by an EV charger alone',
      'Doesn\'t work',
      'Only with Tesla',
    ],
    correctIndex: 1,
    explanation:
      'PV-aware EV chargers (Zappi, Ohme, Andersen, Pod Point Solo, Hypervolt and others) modulate the EV charging current to match available PV surplus. Below the EV minimum charge current (~6 A = 1.4 kW single-phase, or 4 A = 1.0 kW for some EVs), the charger drops out of solar mode — surplus &lt; 1.4 kW falls through to the next priority load (immersion, UFH). The PV-aware charger is more expensive than a basic charger (~£800-£1,200 vs £500-£700) but the additional capture often pays back within 2 years on installs with significant daytime surplus and EV usage.',
  },
  {
    id: 'm4s1-ct-clamp',
    question:
      'Why does a PV diverter need a current transformer (CT) clamp on the incoming grid supply tail?',
    options: [
      'To turn on the inverter',
      'To measure net grid power flow in real time. When net export is positive (PV generating more than property consuming), the CT signal tells the diverter how much surplus is available to divert. When net export is zero or negative (load exceeds PV), the diverter stops diverting. The CT is a non-invasive current measurement around the live conductor of the incoming supply tail — typically located in the meter cabinet or main consumer unit area',
      'For grid synchronisation',
      'No reason',
    ],
    correctIndex: 1,
    explanation:
      'The CT clamp is the diverter\'s real-time feedback for net export. Without it the diverter can\'t know how much surplus is available. The CT is typically a split-core clamp around the live conductor of the incoming supply tail (usually the meter tail between the supply head and the consumer unit). Installer torques the clamp closed; the signal cable runs back to the diverter. CT installation requires safe access to the supply tail — careful work or DNO involvement may be needed where the cable is in a sealed meter cabinet. The cert evidence bundle records the CT location and the diverter setup parameters.',
  },
  {
    id: 'm4s1-isolation-design',
    question:
      'How does adding a PV diverter affect the BS 7671 design pack for the install?',
    options: [
      'No effect',
      'The diverter is an additional AC-side device that adds: (a) its own dedicated circuit from the consumer unit (RCBO sized to diverter rating, typically 16-32 A); (b) a CT measurement loop on the incoming supply tail; (c) labelling per Reg 712.514.101 (PV system notice updated to reflect the diverter); (d) updated single-line schematic. The diverter does NOT change the PV inverter design (Module 3) — it\'s downstream of the inverter\'s AC output, modulating loads on the property side of the grid connection',
      'Customer\'s problem only',
      'Replaces the inverter',
    ],
    correctIndex: 1,
    explanation:
      'PV diverters are downstream of the inverter — they don\'t change the Module 3 inverter / DC / AC design. But they DO add design-pack content: dedicated RCBO + circuit for the diverter (typical 32 A RCBO for an Eddi); CT clamp installation on the supply tail; updated single-line schematic showing the diverter, its CT, and the priority loads; updated labelling per Reg 712.514.101 to reflect the additional load points. The cert evidence bundle records the diverter manufacturer / model, CT serial number, target loads, and the priority-cascade configuration.',
  },
  {
    id: 'm4s1-cascade-priority',
    question:
      'A customer has PV + heat pump (SG-Ready) + EV charger + immersion. Which order should the diverter cascade them, and why?',
    options: [
      'Immersion first, EV last',
      'Heat pump FIRST (COP 3-4 — each PV kWh delivers 3-4 kWh of heat), EV SECOND (each diverted kWh displaces a grid-charge kWh worth ~28 p), immersion THIRD (COP 1 — baseline self-consumption), UFH FOURTH (slow load, lowest value per kWh). The cascade order is driven by value-per-diverted-kWh: heat pump multiplies by COP; EV displaces grid import at full retail rate; immersion is the baseline 1:1 conversion. Cert evidence bundle records the configured cascade order',
      'Whatever the customer prefers',
      'EV always first',
    ],
    correctIndex: 1,
    explanation:
      'Cascade priority follows the value-per-kWh hierarchy. Heat pump COP 3-4 means each PV kWh delivers 3-4 kWh of heat — far higher value than direct immersion heating. EV charging displaces a grid kWh at retail rate (~28 p); each diverted kWh saves the customer the import-export gap. Immersion is the 1:1 baseline. UFH (electric, where present) is slow thermal mass — captures the long-tail surplus. Modern diverters with multi-load support (myenergi Eddi + Zappi combination, Solar iBoost with extension modules) configure this cascade at commissioning. The cert evidence bundle records the cascade order and the rationale.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Customer with a 5 kWp install and 30% baseline self-consumption asks if a £500 diverter is worth it. SEG export rate 7.5 p/kWh; grid import 28 p/kWh; expected uplift from diverter ~30% additional self-consumption.',
    options: [
      'Not worth it',
      'Run the numbers: PV generation ~5,000 kWh/year; baseline 30% × 5,000 = 1,500 kWh self-consumed. Diverter captures additional ~30% × 3,500 = 1,050 kWh of surplus. Each diverted kWh saves (28 − 7.5) = 20.5 p (the import-export gap). Annual saving = 1,050 × 20.5 = £215. Payback period = £500 / £215 = 2.3 years. STRONG case for typical 25-year install life; expected NPV £4,500+ excluding inflation',
      'Customer cannot afford it',
      'Only worth it if export rate is zero',
    ],
    correctAnswer: 1,
    explanation:
      'PV diverter economic case is driven by the import-export rate gap. UK 2025-2026: SEG export 5-15 p/kWh; grid import 25-35 p/kWh — gap 10-30 p/kWh per displaced kWh. Diverter payback 2-4 years typical; install life 15-25 years; strongly positive NPV. The exception: customer already has high self-consumption (EV charging, heat pump, home office) — the marginal capture from a diverter may be smaller. The honest survey calculates the customer\'s baseline self-consumption, models the diverter\'s expected uplift, and presents the financial case transparently.',
  },
  {
    id: 2,
    question:
      'Existing 200 L hot water cylinder. Customer wants a diverter to heat it via the existing 3 kW immersion. Daily PV surplus ~12 kWh. Compatibility and limits?',
    options: [
      'No limits',
      'Compatibility good — 3 kW immersion is standard diverter load. But the cylinder thermal capacity caps absorption: 200 L from 10°C to 60°C absorbs ~12 kWh (200 × 4.18 × 50 / 3600). So daily PV surplus 12 kWh exactly fills the cylinder. Beyond that, the diverter cascades to next-priority load OR the surplus exports to grid at SEG rate. Practical sizing: typical UK 150-300 L cylinder absorbs 5-10 kWh/day comfortably; for larger surplus, add EV / heat-pump / UFH as cascade loads',
      'Need a bigger immersion',
      'Doesn\'t work',
    ],
    correctAnswer: 1,
    explanation:
      'Hot water cylinder thermal capacity: roughly (volume in L) × 4.18 × (target temp − inlet temp) / 3600 = kWh. For 200 L from 10°C inlet to 60°C target: 200 × 4.18 × 50 / 3600 = 11.6 kWh. So a 200 L cylinder absorbs ~12 kWh daily before reaching target. PV daily surplus often exceeds this in summer (5 kWp × 5 hours × 70% = ~17 kWh peak day) — so the cascade design captures the overflow on subsequent loads. The cert evidence bundle records the cylinder volume, target temperature, and the cascade configuration.',
  },
  {
    id: 3,
    question:
      'Installer fits a diverter to heat the immersion. Days later, customer reports DAB radio interference whenever the diverter is active. Diagnosis?',
    options: [
      'No issue',
      'Phase-angle modulation generates RFI (radio frequency interference) — the diverter chops the AC waveform mid-cycle, creating harmonics. The interference couples into nearby radio reception. Resolution: (a) install diverter manufacturer\'s recommended RFI filter on the diverter input; (b) check earthing / bonding to the radio (some radios have inadequate filtering); (c) consider relocating the diverter or its connecting cables further from the radio; (d) switch diverter mode to burst-fire (full-cycle on/off) if supported — burst-fire has less RFI but slower modulation. Modern diverters often use burst-fire by default',
      'Radio is faulty',
      'No fix possible',
    ],
    correctAnswer: 1,
    explanation:
      'Phase-angle modulation creates harmonics in the audio frequency range — couples into DAB radio reception. Fix: RFI filter on diverter input (manufacturer supplies); reroute cables; switch to burst-fire mode where supported. Modern UK diverters (Eddi, Solar iBoost) typically use burst-fire as the default for clean electrical performance. The cert evidence bundle records the modulation mode chosen and any RFI mitigation fitted.',
  },
  {
    id: 4,
    question:
      'Customer has an existing PV install and wants to add a diverter. What changes are needed to the EREC G98 notification?',
    options: [
      'New G98 needed',
      'No new G98 — the inverter and PV generation capacity have not changed. The diverter is an additional AC-side load device; it modulates existing load consumption, doesn\'t change generation. The DNO notification (G98 / G99) is about generation, not load; therefore no update required. However, the cert evidence bundle and the customer information pack should reflect the diverter addition for future EICR and ownership transfer',
      'Wait 6 weeks',
      'Customer dies',
    ],
    correctAnswer: 1,
    explanation:
      'EREC G98 / G99 / G100 governs PV generation connection to the public grid. A diverter is an additional load device (it modulates consumption of existing PV-generated AC) — not a generator. No DNO notification update required. The MCS certificate also doesn\'t need updating (the install kWp is unchanged). The cert evidence bundle DOES need updating: diverter manufacturer / model, CT location, target loads, priority cascade — this informs future EICR-style inspection and ownership transfer.',
  },
  {
    id: 5,
    question:
      'EV-aware diverter scenario: customer has 5 kWp PV + Zappi EV charger. PV surplus drops below the EV minimum (~1.4 kW single-phase). What does the system do?',
    options: [
      'EV continues charging from grid',
      'Charger drops out of solar / eco mode (continues from grid only if customer configured "grid + solar" mode). Cascade to next priority load (immersion, UFH) where configured. When surplus rises above 1.4 kW again, the charger resumes solar mode automatically. The behaviour is configurable in the charger app — customer can choose "eco" (pure solar; pause when below min) or "eco+" (boost from grid to reach minimum continuous charge)',
      'EV is damaged',
      'Charger explodes',
    ],
    correctAnswer: 1,
    explanation:
      'PV-aware EV chargers (Zappi, Ohme, Andersen, Pod Point Solo) modulate to track surplus. When surplus drops below the EV minimum (typically 6 A = 1.4 kW single-phase; some EVs accept 4 A = 1.0 kW), the charger handles it per its configured mode: (a) pure eco — pause until surplus rises; (b) eco+ — boost from grid to maintain min continuous; (c) timed — switch to scheduled grid charging. Customer-configured per app; cert evidence bundle records the chosen mode.',
  },
  {
    id: 6,
    question:
      'Survey reveals customer has a heat pump (8 kW) and PV (6 kWp). Diverter recommendation?',
    options: [
      'No diverter possible',
      'Modern heat pumps with smart-grid (SG-Ready) input can accept a diverter signal that modulates compressor speed to match PV surplus. The heat pump typically uses 1-3 kW under normal operation — well within the typical PV surplus range. Compatibility: check heat-pump SG-Ready spec; some heat pumps require boost-mode triggering at specific surplus thresholds. Where compatible, heat pump priority comes BEFORE immersion (heat pump COP 3-4 means each PV kWh delivers 3-4 kWh of heat — vs immersion COP = 1). Diverter cascade: heat pump first, then EV, then immersion',
      'Replace heat pump',
      'Buy a smaller PV',
    ],
    correctAnswer: 1,
    explanation:
      'Heat pumps with SG-Ready (Smart Grid Ready) input can be controlled by a diverter. Most modern UK domestic heat pumps (Vaillant Arotherm Plus, Mitsubishi Ecodan, Daikin Altherma, Samsung EHS, Bosch Compress) support SG-Ready. The COP advantage (3-4× output vs immersion 1×) means heat pump priority FIRST in the cascade. Typical cascade for a hybrid customer: heat pump (priority 1, COP 3-4) → EV charger (priority 2, displaced grid charge) → immersion (priority 3, baseline self-consumption). Cert evidence bundle records the cascade configuration.',
  },
  {
    id: 7,
    question:
      'A customer\'s diverter is consuming more grid power than expected on cloudy days. Investigation?',
    options: [
      'Normal',
      'Most likely a CT clamp issue: (a) CT installed backwards (reads load as generation); (b) CT loose on the cable (intermittent signal); (c) CT signal cable damaged or disconnected; (d) diverter configured incorrectly. Diagnose: check diverter app / display for net export reading vs measured grid power; physically inspect CT installation and cable; reset diverter to factory and reconfigure. The cert evidence bundle records the CT installation orientation and the commissioning test result',
      'Customer\'s fault',
      'PV diverter normal',
    ],
    correctAnswer: 1,
    explanation:
      'Diverter mis-operating is almost always a CT clamp issue — the most common diagnostic finding. CT installed backwards reverses the polarity (the diverter sees grid import as PV export); CT loose on the cable produces erratic signal; damaged signal cable interrupts feedback. The competent commission verifies the CT installation: orientation matches the manufacturer arrow on the clamp body (toward grid OR toward property depending on brand); cable secure; diverter app shows correct net-export reading with PV active and minimal load. The cert evidence bundle records the CT orientation and the commissioning measurement.',
  },
  {
    id: 8,
    question:
      'Existing PV install: customer added a diverter without informing the original installer. Three years later, EICR-style inspection. What\'s the inspection finding?',
    options: [
      'No finding',
      'The diverter installation needs to be verified against BS 7671 — diverter circuit RCBO sized correctly (typically 32 A for 3 kW immersion + diverter overhead); cable I_z adequate; CT installation and signal routing safe; labelling per Reg 712.514.101 reflecting the additional load points. If installed by a competent person to the manufacturer spec, no findings. If installed by an unqualified person (DIY install) — likely findings include: oversized OCPD, undersized cable, non-compliant CT routing, missing labels. EICR records findings; customer informed of any rectifications',
      'Pass automatically',
      'Customer fined',
    ],
    correctAnswer: 1,
    explanation:
      'Customer DIY diverter installation is common in the UK — manufacturers (Eddi, Solar iBoost) sell direct-to-customer with install guides. Competent self-install by an electrically aware customer can be compliant; non-electrical-trade self-install often has compliance issues. The EICR-style inspection verifies: dedicated RCBO sized to circuit + diverter + load; cable I_z; CT installation; Reg 712.514.101 labels reflecting the diverter; any post-install RCD tripping issues. Findings recorded per BS 7671 EICR coding. The cert evidence bundle is updated with the diverter retrofit details.',
  },
];

const faqs = [
  {
    question: 'Which UK PV diverter brands are most common?',
    answer:
      'myenergi Eddi (immersion-only or immersion + 1 additional load, supports up to 3.6 kW immersion); myenergi Zappi (EV-aware charger with built-in diverter functionality); Marlec Solar iBoost+ (immersion-focused, OEM-installer popular); iSensor (similar to Eddi, slightly older market); Solar Edge HD-Wave inverters with built-in diverter (DC-side option for SolarEdge installs); Tesla Powerwall with Gateway can perform diverter-like functions through load management. Choice depends on inverter compatibility, target loads, and customer preference for app / monitoring.',
  },
  {
    question: 'Can a PV diverter export-limit the install per EREC G100?',
    answer:
      'A diverter is not strictly an export-control device — its job is to divert surplus to a target load, not to limit total grid export. However, where the diverter\'s load matches or exceeds typical PV surplus, the net effect is similar to export limitation — surplus is consumed locally rather than exported. For formal G100 export limitation, a dedicated export-limit device (e.g. SolarEdge inverter built-in, GivEnergy hybrid inverter built-in, or external Reactive Power Devices) is used, with verification testing per EREC G100. Diverters and G100 devices can coexist: diverter handles diversion to specific loads; G100 device handles formal grid-export cap.',
  },
  {
    question: 'How does a diverter interact with octopus Agile / time-of-use tariffs?',
    answer:
      'Octopus Agile (half-hourly variable export) and similar smart tariffs change the economic calculation: during periods of HIGH export rate (sometimes 20-30 p/kWh), exporting may beat diverting (which displaces ~28 p/kWh import). Smart diverters can read the customer\'s tariff schedule and pause diversion during high-export windows. Most current UK diverters don\'t have this directly — but smart home integration (Home Assistant, OpenEnergyMonitor) can implement the logic. The customer\'s tariff and consumption profile determine the optimal diverter behaviour.',
  },
  {
    question: 'Does the diverter need a separate RCD?',
    answer:
      'The diverter\'s circuit needs the same RCD discipline as any AC circuit per BS 7671 — typically dedicated RCBO at the consumer unit (matching the AC inverter circuit discipline per Reg 712.531.3.5.1 + Reg 551.7.1(d) where applicable). The diverter\'s connected load (immersion, EV, UFH) sits behind its own AC circuit, which has its own RCBO. So the diverter typically has TWO RCBOs in the chain: one for the diverter itself, one for each target load. The MCS MIS 3002 design pack records the circuit arrangement.',
  },
  {
    question: 'What if the customer doesn\'t use enough hot water — does the diverter overheat the cylinder?',
    answer:
      'Cylinder overheating is a real concern with diverters. Mitigations: (a) cylinder thermostat (typical 65°C set-point) limits the immersion-element top-end temperature; (b) diverter timing limits (e.g. heat the cylinder only between 10am-4pm); (c) thermal cut-out (60-90°C, manual reset) as backup safety. Modern diverters include configurable temperature monitoring and shutoff. Cert evidence bundle records the cylinder thermostat, the diverter timing config, and the safety device specs.',
  },
  {
    question: 'Are there any losses in the diverter conversion?',
    answer:
      'Modern diverter conversion losses are small. Phase-angle modulation: efficiency ~98-99% (the chopper has switching losses, but the immersion-heater load is purely resistive). Burst-fire modulation: efficiency ~99% (the relay-based switching has negligible losses). Solid-state vs relay-based diverters: similar efficiency, but solid-state has longer life (no mechanical contacts). The diverter is essentially a controlled load with minimal energy overhead — well below the inverter conversion efficiency (96-98% typical).',
  },
  {
    question: 'How does the diverter affect the MCS MIS 3002 design pack?',
    answer:
      'The diverter is an additional AC-side device that adds to the design pack: (1) component schedule entry — diverter manufacturer / model / rating / supported load types; (2) updated single-line schematic showing the diverter, CT location, target loads, and priority cascade; (3) updated labels per Reg 712.514.101 reflecting the additional load points; (4) updated commissioning records showing the diverter test (CT polarity verification, target-load activation, cascade behaviour). The original PV inverter design pack content (Module 3) is unchanged.',
  },
  {
    question: 'Can a diverter operate with multiple PV inverters?',
    answer:
      'Yes — the CT clamp on the incoming supply tail measures NET grid export, agnostic to the number of PV inverters. So a property with multiple inverters (e.g. east-west split with two single-MPPT inverters, or commercial multi-string installs) is fully compatible with a single diverter on the incoming tail. The diverter modulates surplus regardless of which inverter produced it.',
  },
  {
    question: 'How does a diverter compare to BESS (battery storage) economically?',
    answer:
      'Different solutions for the same problem (capture PV surplus). Diverter: low cost (£400-£700), captures surplus to specific loads (hot water / EV / UFH), payback 2-4 years, no degradation. BESS: high cost (£5,000-£12,000 typical), captures surplus to general electrical load (anything in the property), payback 7-12 years, degradation 1-3%/year. Diverter wins on payback for installs with hot water / EV / heat pump load that can absorb the surplus; BESS wins for installs that want to time-shift PV to evening / overnight consumption. Many UK installs use BOTH for layered surplus capture.',
  },
];

export default function RenewableEnergyModule4Section1() {
  const navigate = useNavigate();

  useSEO({
    title:
      'PV diverters & solar surplus diversion | Renewable Energy 4.1 | Elec-Mate',
    description:
      'PV diverters in detail — Eddi / Solar iBoost / Zappi; AC-coupled vs DC-coupled; immersion / EV / heat-pump / UFH loads; the import-export rate gap that drives the financial case; CT clamp installation and BS 7671 design-pack additions.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · BS 7671:2018+A4:2026"
            title="PV diverters & solar surplus diversion"
            description="The diverter ecosystem — Eddi / Solar iBoost / Zappi; AC-coupled vs DC-coupled; immersion / EV / heat-pump / UFH loads; the import-export rate gap that drives the financial case; CT clamp installation and BS 7671 design-pack additions."
            tone="yellow"
          />

          <TLDR
            points={[
              'A PV diverter measures net grid export via a CT clamp on the incoming supply tail and modulates surplus to a target AC load (immersion / EV / UFH / heat pump). Converts kWh that would otherwise export at SEG rate (~5-15 p) into self-consumed kWh worth ~28 p — the import-export gap is the diverter\'s economic engine.',
              'AC-coupled diverters (Eddi, Solar iBoost, iSensor) are dominant in UK domestic — installed downstream of the inverter, modulating power to one or more cascade-priority loads. DC-coupled diverters are rarer in residential — more common in commercial solar-thermal hybrids.',
              'Immersion is the easiest diverter load (purely resistive, tolerates rapid modulation). Modulation by phase-angle (creates RFI, may need filter) or burst-fire (cleaner electrically). Modern diverters default to burst-fire.',
              'EV-aware diverters (Zappi, Ohme, Andersen, Pod Point Solo) modulate EV charging current to track surplus. Minimum EV charge current ~6 A (1.4 kW single-phase); surplus below that cascades to next-priority load.',
              'Heat pumps with SG-Ready input get diverter priority FIRST (COP 3-4× means each PV kWh delivers 3-4 kWh heat — vs immersion 1×). Typical cascade: heat pump → EV → immersion → UFH.',
              'Diverter adds to design pack: dedicated RCBO, CT installation, single-line schematic update, labelling per Reg 712.514.101. The diverter itself doesn\'t need EREC G98 / G99 update (it\'s a load device, not generation).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain what a PV diverter does, how it measures net export via a CT clamp, and how it modulates power to cascade-priority loads.',
              'Run the financial case for a diverter: import-export rate gap × additional captured surplus = annual saving; calculate payback against typical install life.',
              'Select the appropriate diverter for the customer\'s load profile (immersion / EV / heat pump / UFH) and inverter compatibility.',
              'Specify the cascade-priority configuration (heat pump → EV → immersion → UFH) based on COP economics.',
              'Install the CT clamp safely and verify polarity at commissioning.',
              'Update the MCS MIS 3002 design pack and cert evidence bundle to reflect the diverter retrofit.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Diverter converts SEG export (~7 p) into self-consumption (~28 p). The gap is the case.</Pullquote>

          <ContentEyebrow>What a diverter does — and why customers want one</ContentEyebrow>

          <ConceptBlock
            title="The economic engine — import vs export rate gap"
            plainEnglish="UK 2025-2026 typical rates: SEG export 5-15 p/kWh; grid import 25-35 p/kWh. Every kWh of PV surplus that\'s exported instead of self-consumed costs the customer ~20 p in lost value. The diverter recovers most of that gap."
            onSite="The diverter\'s job: when the property is producing more than it\'s consuming, intercept the surplus AC and direct it to a controllable load (immersion, EV, UFH) BEFORE it exports. The CT clamp on the incoming supply tail provides real-time feedback on net export."
          >
            <p>Worked economic example — typical UK 5 kWp install:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>PV generation: ~5,000 kWh/year (1,000 kWh/kWp midlands typical)</li>
              <li>Baseline self-consumption (no diverter): ~30% × 5,000 = 1,500 kWh self-consumed</li>
              <li>Baseline export: 70% × 5,000 = 3,500 kWh exported at 7.5 p/kWh SEG = £262/year export earnings</li>
              <li>Baseline import-displacement: 1,500 × 28 p = £420/year saved</li>
              <li>Diverter uplift: ~30% additional surplus captured = 1,050 kWh diverted</li>
              <li>Each diverted kWh saves (28 − 7.5) = 20.5 p (the gap)</li>
              <li>Annual diverter saving: 1,050 × 20.5 p = £215/year</li>
              <li>Diverter cost: £500-£700 (hardware + install)</li>
              <li>Payback: 2.3-3.3 years</li>
              <li>25-year NPV (excluding inflation): ~£4,800-£5,000</li>
            </ul>
            <p>
              The diverter case strengthens with: lower SEG export rate; higher
              grid import rate; larger PV install (more surplus to capture); load
              types that match diverter modulation (immersion, EV, heat pump).
              The case weakens where the customer already self-consumes most PV
              (large daytime load, EV charging during day, existing heat pump).
            </p>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="PV diverter ecosystem — single-line schematic. PV inverter feeds AC bus; CT clamp on incoming supply tail measures net export; diverter (between AC bus and target loads) modulates power to cascade-priority loads (heat pump → EV → immersion → UFH). Annotated with current flow direction and the import / export decision logic."
            filename="renewable/m4s1-diverter-ecosystem.png"
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>AC-coupled vs DC-coupled diverters</ContentEyebrow>

          <Pullquote>AC-coupled dominates UK residential. DC-coupled rarer, mostly commercial solar-thermal hybrid.</Pullquote>

          <ConceptBlock
            title="AC-coupled diverters — the UK domestic standard"
            plainEnglish="The diverter is a separate AC-side device downstream of the inverter. It measures net grid export with a CT clamp on the incoming supply tail. When net export &gt; 0, it modulates power to one or more cascade-priority loads (immersion, EV, UFH, heat pump)."
            onSite="UK domestic dominant pattern: myenergi Eddi, Marlec Solar iBoost+, iSensor (legacy), Zappi (EV-aware variant). Installed as a wall-mounted unit near the consumer unit. CT clamp routes back via signal cable. Dedicated RCBO from the CU. Connected to target loads with their own RCBOs."
          >
            <p>AC-coupled architecture details:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Power flow</strong> — PV inverter generates AC at the inverter\'s AC output; AC flows through the CU and incoming supply tail. The CT clamp measures NET flow on the incoming tail (positive = import, negative = export). When net &lt; 0 (export), diverter modulates power to target loads</li>
              <li><strong className="text-white">Phase-angle modulation</strong> — chops the AC waveform mid-cycle (e.g. fires the triac at 90° instead of 0°), reducing average power to the load. Creates harmonics → RFI risk → may need filter</li>
              <li><strong className="text-white">Burst-fire modulation</strong> — turns the load on for full AC cycles every N cycles (e.g. 10 cycles ON, 10 cycles OFF for 50% power). Cleaner electrically, slower modulation, less RFI</li>
              <li><strong className="text-white">Cascade-priority loads</strong> — diverter\'s logic decides which load receives current at any moment based on configured priority order. Higher-COP loads (heat pump COP 3-4) prioritised over lower-COP loads (immersion COP 1)</li>
              <li><strong className="text-white">Customer monitoring</strong> — modern diverters have apps showing live divert, daily / monthly totals, cascade history, energy saved</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="DC-coupled diverters — niche but valid"
            plainEnglish="The diverter is integrated with the inverter on the DC side, or is a DC-side device that diverts surplus DC directly to a DC-coupled load (typically resistive heating or thermal storage)."
            onSite="Less common in UK domestic. Used in: commercial solar-thermal hybrid installs (PV array + immersion + thermal store all on a shared DC bus); some commercial process-heat applications. SolarEdge HD-Wave inverters with built-in diverter functionality are the main residential exception — they intercept DC before AC conversion, reducing one stage of conversion loss."
          >
            <p>DC-coupled trade-offs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Efficiency advantage</strong> — single conversion stage (DC → DC) vs AC-coupled\'s two stages (DC → AC → DC for resistive load). Typical efficiency gain: 2-5% on diverted energy</li>
              <li><strong className="text-white">Load flexibility disadvantage</strong> — limited to DC-coupled loads (typically resistive immersion / electric heater); can\'t drive standard AC loads (EV charger, UFH controller, heat pump compressor) without an additional AC inverter stage</li>
              <li><strong className="text-white">Inverter compatibility</strong> — works only with specific inverter brands that support DC-coupled diverter functionality (SolarEdge HD-Wave; some commercial inverters)</li>
              <li><strong className="text-white">Commercial niche</strong> — used in commercial solar-thermal hybrids, process heating, and large agricultural installs where the load profile suits DC-coupled simplicity</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Target loads — immersion, EV, heat pump, UFH</ContentEyebrow>

          <Pullquote>Heat pump first (COP 3-4). EV second (charge displacement). Immersion third (baseline). UFH fourth (slow load).</Pullquote>

          <ConceptBlock
            title="Immersion heater — the diverter classic"
            plainEnglish="Standard UK immersion: 3 kW resistive element in a hot water cylinder. Easy diverter load — purely resistive, tolerates rapid modulation, well-matched to the diverter\'s modulation range."
            onSite="Compatibility: virtually all UK diverters support immersion loads up to 3-3.6 kW typical. Cylinder thermal capacity: ~12 kWh for a 200 L cylinder from 10°C inlet to 60°C target. Beyond that, surplus cascades to next priority. Cylinder thermostat (typically 65°C set-point) + thermal cut-out (60-90°C manual reset) provide safety against overheating."
          >
            <p>Immersion-specific design considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Thermal capacity</strong> — typical UK cylinder 150-300 L absorbs 5-15 kWh comfortably</li>
              <li><strong className="text-white">Cylinder thermostat</strong> — typically 65°C set-point; diverter respects this and stops diverting when target reached</li>
              <li><strong className="text-white">Thermal cut-out (TCO)</strong> — 60-90°C manual reset; backup safety against thermostat failure</li>
              <li><strong className="text-white">Existing immersion circuit</strong> — typically standalone 16 A or 32 A circuit; diverter intercepts via its CT and modulates the immersion power</li>
              <li><strong className="text-white">Single vs dual immersion</strong> — some cylinders have dual immersion (top + bottom); diverter typically connects to the bottom element for full-cylinder heating</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EV charger — the high-value cascade load"
            plainEnglish="PV-aware EV chargers (Zappi, Ohme, Andersen, Pod Point Solo, Hypervolt) modulate charging current to match PV surplus. Each kWh diverted to EV charging displaces a grid-charge kWh worth ~28 p (or off-peak ~7-10 p depending on tariff)."
            onSite="EV minimum charge current: 6 A single-phase (1.4 kW) for most EVs; some accept 4 A (1.0 kW). Below the minimum, the charger drops out of solar mode. Customer-configured behaviour: pure eco (pause when below min), eco+ (boost from grid to maintain min continuous), timed (switch to scheduled grid charging)."
          >
            <p>EV-aware diverter considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">PV-aware vs standard EV charger</strong> — PV-aware (Zappi, Ohme, Andersen) £800-£1,200; standard (Pod Point Solo, BG SyncEV) £500-£700. PV-aware premium pays back via increased solar capture</li>
              <li><strong className="text-white">Minimum charge current</strong> — typically 6 A (1.4 kW single-phase) per OCPP / J1772 standards; some EVs accept 4 A (1.0 kW)</li>
              <li><strong className="text-white">Three-phase EV charging</strong> — three-phase chargers (11 kW or 22 kW) can match larger surplus; require three-phase customer supply</li>
              <li><strong className="text-white">Customer configuration</strong> — eco mode (pure solar tracking), eco+ mode (grid-boost to maintain min charge), boost mode (full grid override for emergency charging)</li>
              <li><strong className="text-white">Integration with cascade</strong> — EV-aware charger reports its draw to the diverter, allowing the diverter to cascade remaining surplus to other loads (immersion, UFH)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Heat pump — top-priority cascade for COP economics"
            plainEnglish="Modern heat pumps with SG-Ready input deliver 3-4 kWh of heat per 1 kWh of electrical input. Diverting PV surplus to the heat pump is 3-4× more valuable than diverting to a 1× COP immersion."
            onSite="UK heat-pump brands with SG-Ready: Vaillant Arotherm Plus, Mitsubishi Ecodan, Daikin Altherma, Samsung EHS, Bosch Compress, Worcester Bosch Greenstore. The SG-Ready interface typically uses 2 dry contacts: contact-closed-state activates boost mode (compressor runs at higher speed); contact-open-state runs normal modulation."
          >
            <p>Heat pump cascade integration:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">SG-Ready dry contacts</strong> — diverter triggers boost mode when PV surplus available; heat pump runs faster, drawing more PV-generated electricity</li>
              <li><strong className="text-white">Variable compressor</strong> — modern inverter-driven heat pumps modulate compressor speed; diverter signal can drive intermediate boost levels (not just on/off)</li>
              <li><strong className="text-white">COP advantage</strong> — heat pump COP 3-4× means each diverted PV kWh delivers 3-4 kWh of heat to the cylinder / room. Vs immersion COP 1× (each kWh = 1 kWh heat)</li>
              <li><strong className="text-white">Priority FIRST in cascade</strong> — for combined heat pump + immersion installs, divert to heat pump FIRST (higher value); cascade to immersion AFTER heat pump is satisfied</li>
              <li><strong className="text-white">Manufacturer integration</strong> — some heat pumps have native PV-divert support (Mitsubishi Ecodan with myenergi integration); others use generic SG-Ready</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Underfloor heating (UFH) — slow load for fine-tuning the cascade"
            plainEnglish="Electric UFH (resistive mats or cables) absorbs slow, steady power over hours. Good cascade load for the slowest-priority slot — captures the surplus that\'s too small or too brief for higher-priority loads."
            onSite="Wet UFH (water-based, fed from heat pump or boiler) is NOT a direct diverter load — but the upstream heat pump (covered above) effectively diverts to it. Electric UFH (typically 100-200 W/m²) is a direct diverter load — slow thermal mass, tolerant of long modulation."
          >
            <p>UFH considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Electric vs wet UFH</strong> — only electric UFH is a direct diverter load; wet UFH is driven by upstream heat pump (and thus benefits via heat-pump diversion)</li>
              <li><strong className="text-white">Thermal mass</strong> — concrete-screed UFH has high thermal mass; absorbs PV surplus over hours and releases heat over more hours. Smooths out the diverter modulation</li>
              <li><strong className="text-white">Cascade position</strong> — UFH typically LAST in cascade priority (lowest value per kWh: heating space rather than displacing immersion or grid)</li>
              <li><strong className="text-white">Floor temperature limits</strong> — UFH must respect floor surface temperature limits (typically 27°C for habitable rooms); diverter setup includes thermostat / time / setpoint constraints</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>The CT clamp — diverter\'s feedback signal</ContentEyebrow>

          <Pullquote>CT on the incoming supply tail. Direction matters. Verify at commissioning.</Pullquote>

          <ConceptBlock
            title="CT clamp installation"
            plainEnglish="The CT clamp is a split-core current transformer that clips around the live conductor of the incoming supply tail. It outputs a signal proportional to the AC current in the conductor; the diverter reads this signal to determine net import / export."
            onSite="Installation: identify the live conductor of the incoming supply tail (NOT the neutral, NOT the earth); open the CT clamp; clip around the conductor; close the clamp; ensure the direction arrow on the clamp matches the manufacturer\'s spec (typically pointing TOWARD the property OR TOWARD the grid depending on brand). Route the signal cable back to the diverter via a safe route."
          >
            <p>CT installation steps:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Identify the live conductor</strong> — on a UK single-phase supply, this is the brown (or red) conductor in the supply tail between the cut-out / meter and the consumer unit. Common location: meter cabinet, or main isolator</li>
              <li><strong className="text-white">DNO involvement</strong> — where the supply tail is sealed by the DNO (between supply head and meter), the DNO\'s involvement may be required to break the seal. For tail after the meter (between meter and CU), no DNO involvement needed</li>
              <li><strong className="text-white">Open and close the CT</strong> — most modern PV diverter CTs are split-core (clip-around design) — no need to break the conductor</li>
              <li><strong className="text-white">Direction arrow</strong> — manufacturer-specified direction; typical Eddi / iBoost arrow points TOWARD the load (property side); reversed CT reads polarity inverted, leading to mis-operation</li>
              <li><strong className="text-white">Signal cable routing</strong> — typically a low-voltage signal cable (e.g. Cat5e for digital CTs, or twisted pair for analog) running back to the diverter via the safest route. Avoid running alongside high-current cables for EMI immunity</li>
              <li><strong className="text-white">Commissioning verification</strong> — with PV active and minimal load, the diverter app should show positive surplus / negative net flow. Reversed CT reading inverts the polarity — re-install if needed</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records CT manufacturer / model / serial; location; orientation; commissioning measurement</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Design pack and BS 7671 implications</ContentEyebrow>

          <Pullquote>Diverter doesn\'t change PV generation. It adds AC-side circuits and updated labels.</Pullquote>

          <ConceptBlock
            title="MCS MIS 3002 design-pack updates for diverter retrofit"
            plainEnglish="Adding a diverter to an existing PV install doesn\'t change the inverter / DC / AC generation design (Module 3 content). It adds AC-side components: diverter unit, CT, target-load circuits, updated labels."
            onSite="The design pack updates: (1) component schedule — diverter manufacturer / model / load type; (2) single-line schematic — diverter, CT, target loads, priority cascade; (3) updated labels per Reg 712.514.101 reflecting the additional load points; (4) updated commissioning records — CT polarity, divert verification."
          >
            <p>Specific BS 7671 considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Diverter circuit</strong> — dedicated RCBO from the CU, sized to the diverter\'s rated continuous current (typically 16 A or 32 A); per Reg 712.531.3.5.1 the RCD type follows the upstream inverter\'s spec (default Type B for transformerless installs)</li>
              <li><strong className="text-white">Target-load circuits</strong> — immersion, EV, UFH circuits sized normally per BS 7671; the diverter\'s modulation doesn\'t change the OCPD or cable sizing</li>
              <li><strong className="text-white">CT installation</strong> — non-invasive split-core CT; safe to install on energised conductor following the manufacturer\'s safe-work spec. The diverter\'s CT signal cable is low-voltage signal, not high-voltage</li>
              <li><strong className="text-white">Updated labelling per Reg 712.514.101</strong> — the existing "PV system" instruction notice at origin / metering / CU should be augmented to indicate the diverter and its connected loads — informs future maintenance and EICR</li>
              <li><strong className="text-white">EREC G98 / G99 — no update needed</strong> — diverter is a load device, not generation. The DNO notification (G98 fit-and-notify or G99 application) is about generation only</li>
              <li><strong className="text-white">MCS certificate — no update needed</strong> — install kWp unchanged</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="Customer with 6 kWp + 8 kW heat pump — design the cascade for maximum value"
            situation="Customer has a 6 kWp south-facing PV install (~6,000 kWh/year), 8 kW heat pump for heating and DHW, 200 L hot water cylinder, and is interested in adding an EV charger. They want to maximise PV self-consumption. Diverter recommendation?"
            whatToDo="Recommend a Zappi (PV-aware EV charger + diverter functionality) plus a separate Eddi for cylinder backup. Cascade configuration: PRIORITY 1 — heat pump (SG-Ready triggered by diverter; COP 3-4× highest value); PRIORITY 2 — EV charging via Zappi (when EV present); PRIORITY 3 — Eddi to immersion (cylinder backup when heat pump not running heating); PRIORITY 4 — overflow to grid export at SEG rate. Expected outcomes: baseline self-consumption rises from ~35% to ~70-75% with this cascade; annual saving £600-£800 above non-diverter baseline; payback ~3 years on the combined Zappi + Eddi cost (~£2,000-£2,500). The cert evidence bundle records the cascade configuration, CT location, and commissioning test results."
            whyItMatters="The cascade design is where the diverter\'s value lives. Heat-pump priority + EV priority + immersion priority captures the most kWh at the highest value. A naive single-load diverter (e.g. Eddi-to-immersion only) captures ~30% additional self-consumption; a competently-designed cascade captures 50-60% additional. The honest survey models the customer\'s consumption profile against PV generation and proposes the optimal cascade."
          />

          <Scenario
            title="DIY-installed diverter reveals compliance issues at EICR"
            situation="An EICR-style review of a customer\'s diverter (DIY-installed 3 years ago after they self-installed an Eddi) reveals: diverter circuit on a 16 A RCBO (correct); CT clamp installed backwards (the diverter shows constant negative reading despite working); no Reg 712.514.101 label update reflecting the diverter; CT signal cable run alongside the main supply tail (potential EMI)."
            whatToDo="Rectifications: (1) reverse the CT clamp orientation per manufacturer spec; (2) reroute the CT signal cable away from the main supply tail (minimum 100 mm separation); (3) add Reg 712.514.101 labelling at the consumer unit indicating the diverter circuit and its load (immersion); (4) update the cert evidence bundle to reflect the as-installed configuration. Customer informed about the findings and the rectifications. The diverter\'s economic case (previously delivering wrong results due to inverted CT) restored to expected level."
            whyItMatters="DIY diverter installation is common in the UK — manufacturers sell direct-to-customer with install guides. The competent EICR-style inspection catches the compliance gaps and restores the install to BS 7671 standard. The CT polarity issue alone can cost a customer 50-100% of the diverter\'s expected economic value — finding and fixing it is high-impact."
          />

          <CommonMistake
            title="Specifying a diverter without modelling the customer\'s self-consumption baseline"
            whatHappens="An installer recommends a diverter to every PV customer as a default. Customer has heavy daytime electricity use (home office, EV charging at midday, heat pump heating throughout the day) — baseline self-consumption is already 65%. The diverter captures only 5-10% additional surplus; annual saving £50-£100; payback &gt;7 years. Customer dissatisfied with the unrealistic financial projection."
            doInstead="Model the customer\'s self-consumption BEFORE recommending the diverter. Ask for the customer\'s smart-meter half-hourly data or estimate from typical UK consumption patterns. Calculate the realistic captureable surplus and the import-export gap. Present the financial case transparently. Where baseline self-consumption is already high, the diverter case is weak — recommend battery storage (BESS) instead OR recommend not adding any surplus-capture device. The competent surveyor sells the right solution, not the default solution."
          />

          <CommonMistake
            title="CT clamp installed backwards — diverter works but reads polarity inverted"
            whatHappens="The installer fits the CT clamp without checking the manufacturer\'s direction arrow. The diverter operates but mis-reads polarity: it diverts when there\'s actually grid IMPORT (waste — discharging from grid), and exports when there\'s actually surplus (the opposite of intended). Customer\'s energy bills increase rather than decrease. Investigation reveals the inverted CT after weeks of mis-operation."
            doInstead="Always check the CT manufacturer\'s direction arrow before clipping. Most manufacturers print an arrow on the CT body indicating the expected current flow direction. Reversing the CT inverts the polarity completely. Commissioning verification: with PV active and minimal load (e.g. fridge only), the diverter app should show POSITIVE surplus. If it shows negative, the CT is reversed. Open and re-install in the correct orientation. The cert evidence bundle records the CT orientation."
          />

          <CommonMistake
            title="Skipping the Reg 712.514.101 labelling update after diverter retrofit"
            whatHappens="An installer fits a diverter to an existing PV install but doesn\'t update the Reg 712.514.101 PV system notice at the consumer unit / metering point / origin. Future EICR / fault investigation: the inspector / electrician doesn\'t know about the diverter\'s additional load points and the cascade behaviour. Misdiagnoses an immersion mis-trip as a thermal issue when it\'s actually the diverter cascade behaviour."
            doInstead="Always update the Reg 712.514.101 notice after a diverter retrofit. The notice should indicate: PV system present + the diverter\'s connected loads (immersion, EV, UFH, heat pump) + the diverter manufacturer / model. Future inspectors / electricians can then understand the install\'s behaviour and diagnose issues correctly. The cert evidence bundle records the updated labelling."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'PV diverter captures surplus that would otherwise export at SEG rate (5-15 p/kWh) and redirects it to self-consumption (worth 25-35 p/kWh). The import-export gap is the economic engine.',
              'AC-coupled diverters dominate UK domestic (Eddi, Solar iBoost, Zappi). DC-coupled is rarer — commercial solar-thermal hybrid and specific inverter brands (SolarEdge HD-Wave).',
              'CT clamp on the incoming supply tail measures net export. Direction matters — reversed CT inverts polarity and defeats the diverter. Verify at commissioning.',
              'Cascade priority by load value (COP): heat pump (COP 3-4) first, EV (displacement of grid charge) second, immersion (1× COP baseline) third, UFH (slow load) fourth.',
              'Modulation by phase-angle (creates RFI, may need filter) or burst-fire (cleaner, slower). Modern diverters default to burst-fire.',
              'Design pack updates: dedicated RCBO for diverter, CT installation, single-line schematic, labels per Reg 712.514.101. No EREC G98 / G99 update (load device not generator).',
              'Improper CT orientation is the #1 commissioning fault — verify polarity with PV active + minimal load. DIY diverter installs often have compliance gaps caught at EICR.',
              'Economic case strongest where SEG export rate &lt;= 30% of import rate AND customer has compatible cascade loads. Weakest where customer already has high baseline self-consumption.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 Off-grid PV fundamentals
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
