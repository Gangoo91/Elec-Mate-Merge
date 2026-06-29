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
import { OpenPenOutdoorLct } from '@/components/study-centre/diagrams/renewableM12';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm12s4-pen-fault-mechanism',
    question:
      'What is a "PEN fault" + why is it especially dangerous for outdoor LCT?',
    options: [
      'An open circuit in the PME PEN conductor that can raise exposed-conductive-parts toward line voltage',
      'A short between line and neutral that the supply fuse clears almost immediately on occurrence',
      'An RCD nuisance trip caused by accumulated standing earth-leakage current over time',
      'A fault confined to the DC side of the PV array that cannot reach exposed metalwork at all',
    ],
    correctIndex: 0,
    explanation:
      'PEN fault mechanism: (1) TN-C-S (PME) supply combines protective + neutral functions in a single PEN conductor from the transformer to the customer. The PEN is normally bonded at the customer side to the MET + via main equipotential bonding to extraneous-conductive-parts (gas + water + structural metalwork). (2) When the PEN opens (broken connection at street level, transformer end, customer service head): the customer-side earth reference is lost. (3) Load current that should return via the PEN now finds an alternative return path — often through customer earthing arrangements (electrode + bonded metalwork) — making everything bonded sit at a voltage above true earth. (4) In severe cases: exposed-conductive-parts can rise to almost line voltage (~230 V) relative to remote true earth. (5) Customer touching exposed-conductive-part while standing on wet ground (or touching a separately-earthed extraneous-conductive-part) = current path through them = potentially lethal shock. (6) Outdoor LCT vulnerability: EV charging point + outdoor PV inverter + ASHP outdoor unit + outdoor BESS are exposed to wider extraneous-conductive-parts (pavement, parked vehicle metalwork, wet ground, fences, drainage). The risk vector is wider than indoor installs. (7) BS 7671 response: Reg 722.411.4 restricts PME on EV outdoors; the open-PEN methods under it are the voltage-detection device (OPDD, indent (c), measuring CPC-to-Earth voltage + disconnecting) and the earth-electrode resistance condition (indent (b), TT-style). RDC-DD (residual DC detection) is a separate matter — it sits under the Reg 722.531.3.101 RCD architecture, not the open-PEN methods.',
  },
  {
    id: 'm12s4-722-411-4',
    question:
      'What does Reg 722.411.4 say about PME on EV charging points + outdoor use?',
    options: [
      'PME may be used freely as the earth for any outdoor EV charging point',
      'The regulation applies to indoor charging points only, never to outdoor ones',
      'PME is permitted outdoors provided a 30 mA Type A RCD is fitted, with no further measure',
      'PME must not earth an outdoor charging point unless a method in (b)-(e) is used',
    ],
    correctIndex: 3,
    explanation:
      'Reg 722.411.4.1 (BS 7671:2018+A4:2026 wording): A PME earthing facility shall not be used as the means of earthing for the protective conductor contact of a charging point located outdoors or that might reasonably be expected to be used to charge a vehicle outdoors UNLESS one of the methods listed in (b) to (e) is used. The acceptable methods (paraphrased): (b) the charging point is connected via a separate earthing arrangement — a condition on the sum of the earth-electrode + protective-conductor resistance (TT-style local earthing) + RCD architecture; (c) an OPDD that measures the voltage between the CPC of the EV charging equipment and Earth, disconnecting all live conductors of the affected circuit on detection of an open-PEN condition; (d) and (e) further specified methods, with the protective device operating per Reg 543.3.3.101(b) and selected per Table 537.4. The A4:2026 changes were the deletion of the former indent (a), redraft of the indent (c) voltage-monitoring device, and an added indent — so the valid methods are now lettered (b) to (e). The "might reasonably be expected to be used to charge a vehicle outdoors" wording is the retained scope trigger (it defines when the reg bites), not a deleted exception. (3) Practical implementation: most modern EV chargers (Zappi, Ohme, Hypervolt, Easee, Pod Point) include integrated OPDD as standard — verify the manufacturer DoC + BS EN compliance + functional test at install. (4) Verification at IV: OPDD presence, manufacturer DoC, functional test (simulated open-PEN if manufacturer permits), connection to disconnect path. (5) Cert evidence bundle records: OPDD make + model + DoC + functional test result + verified Reg 722.411.4 compliance.',
  },
  {
    id: 'm12s4-rdc-dd-vs-rcd',
    question:
      'What is an RDC-DD + how does it differ from a standard RCD?',
    options: [
      'It is identical to a standard Type A RCD in every respect and detects the same currents',
      'It is a surge protective device that diverts transient overvoltages to earth on a strike',
      'It detects smooth DC fault current (typically 6 mA) that a Type A or AC RCD may not see',
      'It is just another name for a Type AC RCD with no functional difference at all',
    ],
    correctIndex: 2,
    explanation:
      'RDC-DD vs RCD types: (1) Standard RCD types: Type AC detects AC residual current; Type A detects AC + pulsating DC (most common modern type); Type F detects AC + pulsating DC + composite waveforms; Type B detects AC + pulsating DC + smooth DC. (2) Smooth DC fault current problem: EV charger + PV inverter + BESS + heat pump VSD + EV vehicle electronics produce smooth DC fault currents under fault conditions. Type AC + Type A may not reliably detect smooth DC residual. (3) RDC-DD = Residual Direct Current Detecting Device — typically a separate device or integrated function that detects smooth DC residual at the 6 mA DC threshold (lower than Type B\'s typical trip threshold). On detection: (a) disconnects directly OR (b) trips the upstream RCD by injecting a residual signal it can detect. (4) Section 722 EV: Reg 722.531.3.101 (paraphrased) requires either Type B RCD OR Type A RCD + RDC-DD. Many modern EV chargers include integrated RDC-DD with a Type A upstream RCD — cheaper than full Type B for the application. (5) Verification: RDC-DD presence + manufacturer DoC + BS EN 62752 (where applicable) + functional test (some manufacturers permit injection test). (6) Cert evidence bundle: RDC-DD make + model + DoC + functional test result + Reg 722.531 compliance.',
  },
  {
    id: 'm12s4-shared-outdoor-lct-risk',
    question:
      'Why is open-PEN risk a SHARED concern across outdoor LCT (EV + outdoor PV + ASHP + outdoor BESS)?',
    options: [
      'Only EV charging points carry any open-PEN risk; other outdoor LCT is exempt',
      'PME plus an open PEN can raise exposed-conductive-parts toward line voltage on any outdoor LCT',
      'Only Class II double-insulated outdoor equipment carries the risk, since it has no earth',
      'Open-PEN risk only ever applies to indoor equipment, never to outdoor installations',
    ],
    correctIndex: 1,
    explanation:
      'Shared open-PEN risk across outdoor LCT: (1) Section 722 EV has the explicit reg (Reg 722.411.4) because EV charging points are typically outdoor + exposed to vehicles + people simultaneously touching multiple paths to earth (vehicle body + ground + charging cable + fence + drainage). (2) Outdoor PV inverter — typically wall-mounted on garage / outbuilding exterior; exposed to similar extraneous-conductive-parts; same open-PEN exposure. Section 712 doesn\'t have the explicit Reg 722.411.4-equivalent but the protective logic is the same. (3) ASHP outdoor unit — typically ground-mounted or wall-mounted outdoor; metal casing; exposed to ground / pavement / pet contact / hand contact during maintenance. M8 covered ASHP install. (4) Outdoor BESS — increasingly common (Tesla Powerwall outdoor, GivEnergy IP-rated outdoor); metal casing on ground or wall. (5) UK 2025-26 best practice: apply Reg 722.411.4 logic across outdoor LCT — OPDD or TT alternative architecture; manufacturer DoC confirms protection. (6) DNO position: some DNOs strongly recommend TT for outdoor LCT (local earth electrode + RCD); others accept PME with OPDD. (7) Verification: at IV, regardless of technology, confirm the protective architecture is consistent + verified per the manufacturer + relevant Section / Chapter regs. Cert evidence bundle records the architecture choice + verification.',
  },
];

const quizQuestions = [
  {
    question:
      'Domestic outdoor EV charger install on TN-C-S PME supply. What architecture options satisfy Reg 722.411.4?',
    options: [
      'Simply connect the charger to the PME earth directly with no additional protective measures',
      'Fit only a Type AC RCD on the charging circuit and rely on the PME earth for the contact',
      'Either method (c), an OPDD-equipped charger, or method (b), a TT-style local earth electrode',
      'No earth-fault protection of any kind is required on a domestic EV charging circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 722.411.4 architecture options for outdoor domestic EV (valid methods lettered (b) to (e)): (1) Method (c) OPDD-integrated charger: most modern chargers (Zappi V2.1+, Ohme ePod, Hypervolt 3, Easee Home, Pod Point Solo 3) include an integrated OPDD — a device measuring CPC-to-Earth voltage that disconnects on open-PEN — as a standard manufacturer feature. Manufacturer DoC declares the OPDD compliance + Reg 722.411.4 satisfaction. Verification: inspect presence; functional test per manufacturer (some permit injection simulation; others rely on manufacturer factory test + DoC). (2) Method (b) TT-style alternative: local earth electrode (driven rod or buried plate) dedicated to the EV charging point meeting the earth-electrode + protective-conductor resistance condition; the protective conductor on the EV charger circuit connects to this local earth NOT the PME / MET; main equipotential bonding still serves the installation; RCD on the EV circuit (Type B or Type A + RDC-DD per Section 722.531). Used where the customer / installer / DNO prefers physical separation from PME risk. (3) Methods (d) / (e) other specified methods: per Section 722 + manufacturer DoC (protective device per Reg 543.3.3.101(b), selected per Table 537.4). Note: the former indent (a) was deleted in A4:2026. (4) Section 722.531: RCD type + sensitivity for EV: 30 mA + Type B OR Type A + RDC-DD. (5) Verification documentation: EIC + Schedule of Test Results + manufacturer DoC + OPDD or TT architecture choice rationale + functional test results. (6) UK 2025-26 typical: OPDD-integrated charger is dominant choice; TT alternative used where DNO prefers OR existing supply has known PEN issues.',
  },
  {
    question:
      'A customer\'s outdoor PV inverter on the garage exterior, TN-C-S PME supply. Does open-PEN protection apply?',
    options: [
      'No — open-PEN protection only ever applies to dedicated EV charging points',
      'No — the inverter’s Reg 712.421.101 insulation monitoring device already covers the open-PEN case',
      'No — an outdoor PV inverter needs no open-PEN protection of any kind',
      'Yes — the same open-PEN risk applies; consider an OPDD or TT alternative for the inverter',
    ],
    correctAnswer: 3,
    explanation:
      'Outdoor PV inverter + open-PEN risk: (1) Risk vector same as outdoor EV — wall-mounted on garage exterior; metal casing; exposed-conductive-parts; PME earthing + open-PEN scenario = casing rises toward line voltage. (2) Section 712 specifics: Reg 712.421.101 IMD provides DC-side insulation monitoring (not direct open-PEN detection); Reg 712.514 warning notices required. No explicit Reg 722.411.4-equivalent in Section 712. (3) Best practice / DNO + manufacturer guidance: apply open-PEN logic. Options: (a) OPDD on the inverter\'s AC supply circuit — increasingly available as separate device or integrated in some new inverters; (b) TT alternative — local earth electrode for the inverter circuit + RCD architecture; (c) install the inverter indoors / in conditioned space where practical — eliminates outdoor open-PEN risk vector. (4) Reality 2025-26: many existing outdoor PV inverter installs rely on PME + IMD + Type B RCD; emerging consensus that explicit OPDD or TT is better. (5) DNO inspection — some DNOs raise this at PV install inspection (especially commercial); others accept current installer convention. (6) Cert evidence bundle: architecture choice + rationale + manufacturer DoC + verification. (7) Future-proofing: A4:2026 trend is toward tightening outdoor LCT protection; the next BS 7671 amendment may extend Reg 722.411.4-equivalent to outdoor PV explicitly.',
  },
  {
    question:
      'Standard Type A 30 mA RCD on an EV circuit — what fault scenario does it MISS?',
    options: [
      'Smooth DC fault current — needing Type B, or Type A plus RDC-DD, on the EV circuit',
      'It misses no fault scenario at all; a Type A RCD reliably covers every fault current an EV can produce',
      'It misses high-frequency residual currents above 1 kHz generated by the charger power electronics',
      'It misses pulsating DC residual current, which in fact only a Type AC RCD is able to detect',
    ],
    correctAnswer: 0,
    explanation:
      'Type A RCD smooth-DC blind spot: (1) Type A definition (BS EN 61008 + BS EN 61009): detects AC residual currents + pulsating DC residual currents. NOT smooth DC. (2) EV vehicle scenario: the EV battery + onboard charger + DC-DC converter under fault conditions can produce smooth DC residual current — flowing from the vehicle through any fault path to earth. Type A RCD\'s internal current transformer is designed for AC + pulsating DC; smooth DC may saturate the CT or pass unseen. (3) Consequence: smooth DC fault → Type A RCD doesn\'t trip → fault current continues → may damage equipment, persist as hazard, eventually detected by other means (over-current, isolation monitoring, ground fault). (4) Mitigation per Reg 722.531.3.101: (a) Type B RCD — detects AC + pulsating DC + smooth DC across its operating range; built for the scenario; more expensive (~£100-200 vs ~£30-50 for Type A). (b) Type A RCD + RDC-DD — RDC-DD is the separate device or integrated function that detects smooth DC residual at 6 mA threshold + signals upstream RCD or disconnects directly. Cheaper combined cost (~£60-100) than Type B; the dominant approach in modern domestic EV chargers (manufacturer integrates RDC-DD; customer installer uses standard Type A upstream). (5) Verification: at IV check the RCD type + RDC-DD presence + manufacturer DoC + Reg 722.531 compliance.',
  },
  {
    question:
      'OPDD functional test at IV — how is it verified?',
    options: [
      'There is no way to verify an OPDD at inspection once it is installed and energised',
      'By measuring the loop impedance at the charging point and confirming it is below the OPDD threshold',
      'By a manufacturer self-test where available, or the factory test and DoC, recording the result',
      'By disconnecting the main earth and confirming the charger still energises normally',
    ],
    correctAnswer: 2,
    explanation:
      'OPDD verification options: (1) Manufacturer self-test (most common) — modern integrated OPDD includes a self-test triggered via commissioning interface (touch screen / app / installer button sequence). The OPDD simulates internal open-PEN signal + verifies the disconnect path; records pass / fail in the device log. (2) Factory test + DoC — some manufacturers rely on factory testing + the BS EN compliance DoC + visual inspection at install (verify the device is the right model + correctly connected + power applied). No additional install-time test required per their DoC. (3) Simulated open-PEN at install — physically opening the PEN conductor at a controlled point (e.g. between the meter + the CU) + verifying the OPDD detects + disconnects. Potentially hazardous if not done with full understanding + DNO permission + manufacturer authorisation. (4) DNO-witnessed test — some commercial installs have DNO witness the open-PEN test. (5) Reg 722.411.4 doesn\'t specify the test method — it specifies the requirement (OPDD or alternative architecture). The verification method per manufacturer DoC + Section 722 + industry good practice. (6) Cert evidence bundle records: OPDD make + model + manufacturer DoC + BS EN compliance + test method used + result + Reg 722.411.4 architecture confirmation. (7) Periodic review at EICR-equivalent: re-run OPDD self-test where available.',
  },
  {
    question:
      'Multi-source LCT site with TN-C-S PME — outdoor EV + outdoor PV inverter + ASHP. How is open-PEN risk addressed across all three?',
    options: [
      'Fit the same single Type AC RCD to all three outdoor circuits and rely on the PME earth',
      'Protect only the EV circuit, since Reg 722.411.4 names EV explicitly and the other two are exempt',
      'Leave all three outdoor sources without any open-PEN protection, as the supply already provides it',
      'Per-source OPDD or TT alternative on each, optionally one TT electrode serving all',
    ],
    correctAnswer: 3,
    explanation:
      'Multi-source outdoor LCT open-PEN coordination: (1) Per-source approach — each source has its own architecture choice. EV uses OPDD-integrated; PV uses OPDD or TT; ASHP per manufacturer + good practice. (2) Coordinated TT approach — install one local earth electrode serving all outdoor LCT circuits; the EV + PV + ASHP all connect protective conductors to the local earth electrode (not PME); main equipotential bonding still services the rest of the installation per BS 7671. Requires careful design + earth electrode resistance verification (Reg 542 + Reg 644). (3) Hybrid approach — EV uses OPDD-integrated (per Reg 722.411.4); PV + ASHP use the existing PME with manufacturer-DoC-acceptable architecture. (4) DNO position — some DNOs prefer coordinated TT for outdoor LCT; others accept OPDD-per-source; verify at design stage. (5) Reg 551.4.2 multi-source RCD effectiveness — across the combinations of sources operating, RCD effectiveness must be maintained. With TT alternative architecture, RCD protection on each outdoor circuit operates independently of PME. (6) Documentation — cert evidence bundle records: architecture choice rationale + per-source verification + multi-source RCD test matrix + manufacturer DoCs. (7) UK 2025-26 trend: increasing use of OPDD-integrated equipment + DNO acceptance of OPDD as alternative to mandatory TT — but TT remains the conservative robust choice for outdoor LCT.',
  },
  {
    question:
      'Periodic EICR-equivalent on outdoor LCT — what open-PEN architecture verification applies?',
    options: [
      'No open-PEN verification applies at an EICR-equivalent once the install has been signed off',
      'Visual and self-test of the OPDD, architecture-continuity, RCD tests, plus TT electrode re-test',
      'Only a visual check of the OPDD indicator light, with no functional testing of any protective device',
      'Only the Reg 722 EV charger is reviewed at the periodic; no other outdoor LCT source is checked',
    ],
    correctAnswer: 1,
    explanation:
      'EICR-equivalent open-PEN architecture verification: (1) Visual inspection — confirm OPDD device present, status indicators normal, no fault flags raised in event log, no obvious physical damage. (2) Self-test — where manufacturer supports, trigger OPDD self-test sequence + verify pass; record in cert evidence bundle. (3) Architecture continuity — confirm the architecture hasn\'t changed since install: no additional EV chargers added without OPDD; no modifications to earthing arrangement; no new equipment that compromises the protection. (4) RDC-DD verification (EV) — functional test per manufacturer; some chargers include scheduled self-test + log. (5) TT alternative — periodic earth electrode resistance test per Reg 643.7.3.1 + Reg 651-653; trend against commissioning baseline; growing resistance indicates electrode degradation / corrosion + may need replacement. (6) RCD periodic test — BS EN 61557-6 + manufacturer + Type-specific test current + time; confirm sensitivity 30 mA + trip time ≤300 ms per Reg 415.1 effectiveness. (7) Cert evidence bundle update — current architecture + per-test results + manufacturer correspondence + any changes since previous periodic. (8) Customer education — annual touchpoint reinforces that the protection should not be defeated + any changes (new outdoor equipment) should involve the installer.',
  },
];

const faqs = [
  {
    question: 'What changed in Reg 722.411.4 in A4:2026?',
    answer:
      'The genuine A4:2026 changes were: the former indent (a) of Reg 722.411.4.1 was deleted; the indent (c) voltage-monitoring device (the OPDD that measures CPC-to-Earth voltage) was redrafted; and a further indent was added — so the valid methods are now lettered (b) to (e). The core requirement is unchanged in principle: a PME earthing facility must not be relied on for the protective-conductor contact of an outdoor EV charging point unless one of the (b)–(e) methods is used. The "might reasonably be expected to be used to charge a vehicle outdoors" wording is the retained scope trigger, not a deleted exception. Cert evidence bundle records the architecture choice per current reg.',
  },
  {
    question: 'Does an OPDD need its own dedicated CU way?',
    answer:
      'Depends on integration: most modern EV chargers include OPDD as an integrated function — the OPDD operates within the charger unit + the upstream CU way is a standard MCB / RCBO. Separate OPDD devices (for circuits not natively equipped) connect upstream of the protected circuit + may share a CU way with the supply. Manufacturer DoC governs; cert evidence bundle records the configuration.',
  },
  {
    question: 'Can a TT alternative serve multiple outdoor LCT circuits?',
    answer:
      'Yes — a single dedicated local earth electrode (rod or plate) of sufficient cross-section + verified resistance can serve EV + PV inverter + ASHP outdoor unit + outdoor BESS protective conductors. Design considerations: earth electrode resistance verified per Reg 643.7.3.1 + Reg 542; main equipotential bonding still serves the rest of the install per BS 7671; cert evidence bundle records the coordinated architecture.',
  },
  {
    question: 'What if a property already has TT supply (no PME)?',
    answer:
      'TT supply — local earth electrode at the customer side, no PEN combined conductor from the DNO — eliminates the PEN-fault scenario at the supply level. Outdoor LCT install is more straightforward: existing TT earth electrode serves the protective conductor (subject to resistance verification + RCD architecture); no Reg 722.411.4 OPDD requirement (the reg targets PME specifically). Cert evidence bundle records the TT supply + the verified architecture.',
  },
  {
    question: 'Does open-PEN protection apply to indoor LCT?',
    answer:
      'Reg 722.411.4 specifically targets outdoor EV charging. Indoor EV charging on PME is permitted without explicit OPDD (the risk vector is reduced — indoor environment, smaller extraneous-conductive-part exposure). Similarly indoor PV / BESS / heat pump on PME doesn\'t trigger explicit OPDD requirement. The risk vector + protective architecture remains a design + verification consideration; cert evidence bundle records the choices.',
  },
];

export default function RenewableEnergyModule12Section4() {
  const navigate = useNavigate();

  useSEO({
    title: 'PEN faults + open-PEN protection for outdoor LCT | Renewable Energy 12.4 | Elec-Mate',
    description:
      'PEN faults + open-PEN protection for outdoor LCT. Reg 722.411.4 PME-on-EV restrictions. Outdoor PV inverter, ASHP outdoor unit, outdoor BESS — shared risk profile. OPDD + RDC-DD + TT alternative architectures. A4:2026 changes to outdoor EV protection (former indent (a) deleted; methods now (b)–(e)).',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-12')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 12
          </button>

          <PageHero
            eyebrow="Module 12 · Section 4 · BS 7671:2018+A4:2026 · Reg 722.411.4 + Section 712 + outdoor LCT"
            title="PEN faults + open-PEN protection for outdoor LCT"
            description="The PEN-fault risk vector for outdoor LCT — EV charging point, outdoor PV inverter, ASHP outdoor unit, outdoor BESS. Reg 722.411.4 EV outdoor PME restriction, with A4:2026 changes (former indent (a) deleted; methods now (b)–(e)). OPDD (Open-PEN Detection Device) + RDC-DD (Residual DC Detection) + TT alternative architectures. Shared protective logic across outdoor LCT."
            tone="yellow"
          />

          <TLDR
            points={[
              'PEN fault = open-circuit in the PEN conductor (TN-C-S / PME); customer-side earth reference lost; exposed-conductive-parts may rise toward line voltage; shock risk.',
              'Outdoor LCT (EV, outdoor PV inverter, ASHP outdoor unit, outdoor BESS) exposed to wider extraneous-conductive-parts → wider risk vector than indoor.',
              'Reg 722.411.4: PME shall not be used for an outdoor EV charging point unless one of the methods (b) to (e) is used (e.g. OPDD voltage-detection device, or TT-style local earth-electrode condition). A4:2026 deleted the former indent (a), so methods are now lettered (b) to (e).',
              'OPDD = Open-PEN Detection Device — detects open-PEN condition + disconnects on detection. Most modern domestic EV chargers integrate OPDD as standard.',
              'RDC-DD = Residual Direct Current Detecting Device — detects smooth DC fault current at 6 mA threshold; standard Type A RCDs may miss smooth DC.',
              'Reg 722.531: EV circuits require Type B RCD OR Type A RCD + RDC-DD; most modern chargers include integrated RDC-DD with standard Type A upstream.',
              'TT alternative: local earth electrode dedicated to outdoor LCT circuit(s); avoids PME on the outdoor protective conductor; physical earth separation.',
              'Shared logic across outdoor LCT: same risk vector → same protective architecture options (OPDD / TT / coordinated approach); cert evidence bundle records the choice.',
              'Periodic EICR-equivalent: OPDD functional test where available; TT earth electrode resistance re-test; RCD time + sensitivity test; architecture continuity verification.',
              'Indoor LCT not subject to explicit Reg 722.411.4 (reduced risk vector); architecture still a design consideration.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the PEN-fault mechanism + why outdoor LCT amplifies the risk vector.',
              'Apply Reg 722.411.4 to outdoor EV install on TN-C-S PME supply.',
              'Select between OPDD, TT alternative, and other architectures per Reg 722.411.4 + manufacturer DoC.',
              'Distinguish RDC-DD from standard RCD types + when each is required per Section 722.531.',
              'Extend open-PEN protective logic from EV to outdoor PV inverter + ASHP + outdoor BESS.',
              'Verify OPDD functional + RCD time + earth electrode resistance at IV + periodic EICR-equivalent.',
              'Coordinate multi-source outdoor LCT under a single architecture (OPDD or coordinated TT).',
              'Document the open-PEN architecture choice + verification in cert evidence bundle.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Open-PEN on outdoor EV is a real risk — that\'s why Reg 722.411.4 bars relying on PME for the outdoor charging-point earth unless one of methods (b) to (e) is used. The same logic applies to outdoor PV + ASHP + outdoor BESS even where the reg doesn\'t explicitly say so.
          </Pullquote>

          <ContentEyebrow>PEN-fault mechanism + outdoor LCT risk vector</ContentEyebrow>

          <ConceptBlock
            title="What happens when the PEN opens"
            plainEnglish="TN-C-S (PME) supply combines protective + neutral functions in one PEN conductor from the DNO transformer to the customer. The PEN is bonded at the customer side to the MET + via main equipotential bonding to extraneous-conductive-parts (gas + water + structural metalwork). When the PEN opens (broken connection): the customer-side earth reference is lost. Load current finds alternative return paths through customer earthing arrangements. Exposed-conductive-parts may rise toward line voltage relative to true earth."
            onSite="UK PEN-fault incidents are rare but real. Open-PEN occurs at the transformer end, the street-level joint, or the service head; most commonly during DNO work or third-party damage to the cable. With outdoor LCT, the customer touching the equipment + simultaneously contacting other earthed metalwork (parked vehicle, fence, ground) creates the shock path."
          >
            <p>PEN-fault sequence + risk vector:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Normal
                  PME operation</strong> — PEN combines neutral + protective conductor;
                customer-side bonding to MET + extraneous-conductive-parts; load
                current returns via PEN to transformer; earth reference stable
              </li>
              <li>
                <strong className="text-white">PEN open
                  scenario</strong> — broken connection between transformer + customer
                MET (transformer end, street joint, service head); customer-side earth
                reference lost
              </li>
              <li>
                <strong className="text-white">Current
                  redirection</strong> — load current that should return via PEN finds
                alternative path: customer earthing electrode (if TT-supplementary) +
                bonded metalwork (gas + water + structural) + adjacent property\'s
                earthing
              </li>
              <li>
                <strong className="text-white">Voltage rise</strong>
                — exposed-conductive-parts bonded to the MET sit at the voltage of
                the load returns; can rise to almost line voltage (~230 V) relative
                to remote true earth
              </li>
              <li>
                <strong className="text-white">Shock scenario</strong>
                — customer touches an exposed-conductive-part (EV charging point,
                outdoor PV inverter, ASHP outdoor unit) while standing on wet ground
                or touching another earthed item (parked vehicle, fence, drain) =
                current path through them
              </li>
              <li>
                <strong className="text-white">Indoor vs
                  outdoor</strong> — indoor: bonded metalwork + flooring + footwear =
                reduced risk vector; outdoor: wet ground, vehicle contact, pavement,
                bare feet potentially = wider risk vector
              </li>
              <li>
                <strong className="text-white">EV-specific
                  amplification</strong> — vehicle metalwork is large + customer + cable
                + ground simultaneously contacted during plug-in
              </li>
              <li>
                <strong className="text-white">Detection +
                  mitigation</strong> — OPDD detects the open-PEN voltage anomaly +
                disconnects; TT alternative removes PME from the outdoor circuit
                entirely
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 722.411.4 (A4:2026) outdoor EV PME restriction"
            plainEnglish={`Reg 722.411.4.1: A PME earthing facility shall not be used as the means of earthing for the protective conductor contact of a charging point located outdoors or that might reasonably be expected to be used to charge a vehicle outdoors unless one of the methods (b) to (e) is used. In A4:2026 the former indent (a) was deleted, so the valid methods are now lettered (b) to (e); the "might reasonably be expected to be used outdoors" wording is the scope trigger, not an exception.`}
            onSite="Most modern domestic EV chargers (Zappi, Ohme, Hypervolt, Easee, Pod Point) include integrated OPDD as a standard manufacturer feature. The installer verifies the OPDD presence + manufacturer DoC + BS EN compliance + functional test; cert evidence bundle records."
          >
            <p>Reg 722.411.4 acceptable methods:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">(b) Separate
                  earthing (TT-style)</strong> — local earth electrode dedicated to the
                charging point, meeting the earth-electrode + protective-conductor
                resistance condition; PME not relied on for the protective contact;
                RCD architecture per Section 722.531
              </li>
              <li>
                <strong className="text-white">(c) OPDD
                  method</strong> — a device that measures the voltage between the CPC of
                the EV charging equipment and Earth and disconnects all live
                conductors of the affected circuit on detection of an open-PEN
                condition. Modern integrated EV charger feature
              </li>
              <li>
                <strong className="text-white">(d) / (e) Other
                  specified methods</strong> — per the section; protective device per
                Reg 543.3.3.101(b), selected per Table 537.4; manufacturer + DoC +
                BS EN compliance
              </li>
              <li>
                <strong className="text-white">A4:2026
                  change</strong> — the former indent (a) was deleted + the indent (c)
                voltage-monitoring device redrafted + an indent added; valid methods
                are now lettered (b) to (e)
              </li>
              <li>
                <strong className="text-white">Indoor EV
                  exception</strong> — Reg 722.411.4 targets outdoor charging point; an
                indoor EV charger on PME is permitted without explicit OPDD (subject
                to standard Section 722 RCD architecture)
              </li>
              <li>
                <strong className="text-white">"Reasonably
                  expected to be used outdoors"</strong> — a charging point physically
                located inside (e.g. garage) but with a cable that reaches a vehicle
                parked outside requires consideration; verify manufacturer DoC + DNO
                position
              </li>
              <li>
                <strong className="text-white">DNO
                  position</strong> — some DNOs strongly recommend TT alternative for
                outdoor EV; others accept OPDD-integrated equipment; cert evidence
                bundle records the chosen architecture + DNO position where relevant
              </li>
              <li>
                <strong className="text-white">Verification</strong>
                — at IV: OPDD presence + manufacturer DoC + BS EN compliance +
                functional test; OR TT earth electrode resistance + RCD architecture
                verified
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.411.4 — PME on EV outdoor"
            clause={`A PME earthing facility shall not be used as the means of earthing for the protective conductor contact(s) of a charging point located outdoors or that might reasonably be expected to be used to charge a vehicle outdoors unless one of the methods listed in Reg 722.411.4 (b) to (e) is used. [In A4:2026 the former indent (a) was deleted, the indent (c) voltage-monitoring device was redrafted, and an indent added; Section 722 changes also cover external influences, RCDs, socket-outlets and connectors]`}
            meaning={`Reg 722.411.4 restricts using a PME earthing facility for the outdoor EV charging-point protective contact. The installer must select one of the methods (b) to (e). The "might reasonably be expected to be used to charge a vehicle outdoors" wording is the scope trigger that defines when the reg applies — it is not an exception. Practical implementation: (1) Most modern domestic EV chargers include integrated OPDD as a standard manufacturer feature — verify manufacturer DoC + BS EN compliance + functional test at IV. (2) TT alternative: local earth electrode (rod or plate) dedicated to the EV charging point; PME not used for the protective conductor contact; resistance verified per Reg 643.7.3 + RCD architecture per Section 722.531. (3) Coordinated outdoor LCT TT: single dedicated earth electrode serving EV + outdoor PV + ASHP + outdoor BESS protective conductors. (4) Verification documentation: cert evidence bundle records architecture choice (OPDD or TT or other) + manufacturer DoC + BS EN compliance + functional test result + Reg 722.411.4 compliance confirmation. (5) Periodic EICR-equivalent: re-verify architecture continuity + functional + earth electrode resistance trend.`}
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>OPDD + RDC-DD + RCD architecture</ContentEyebrow>

          <Pullquote>
            OPDD catches the open-PEN. RDC-DD catches the smooth-DC fault. Type B RCD does both. Pick the right architecture per source + per location.
          </Pullquote>

          <ConceptBlock
            title="OPDD operation + verification"
            plainEnglish="OPDD = Open-PEN Detection Device — monitors the voltage relationship between line + neutral + protective conductor; detects the anomaly that occurs when the PEN opens; disconnects within a specified time. Typically integrated in modern domestic EV chargers; available as separate devices for retrofit + non-integrated equipment."
            onSite="The OPDD verification at IV: inspect presence (integrated or separate); confirm manufacturer DoC + BS EN compliance + Reg 722.411.4 stated compliance; trigger self-test where manufacturer-supported + record result; functional test method per manufacturer DoC."
          >
            <p>OPDD elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Operating
                  principle</strong> — monitors voltage relationships in the circuit;
                identifies anomalous shift when PEN opens; triggers disconnect
              </li>
              <li>
                <strong className="text-white">Disconnect
                  time</strong> — typically within 100-500 ms per manufacturer; well
                within Reg 411.3.2 maximum disconnection times
              </li>
              <li>
                <strong className="text-white">Integration
                  in modern EV chargers</strong> — Zappi V2.1+, Ohme ePod, Hypervolt 3,
                Easee Home, Pod Point Solo 3 all include integrated OPDD as standard
              </li>
              <li>
                <strong className="text-white">Separate OPDD
                  devices</strong> — for non-integrated equipment + retrofit applications;
                installed in the upstream supply circuit
              </li>
              <li>
                <strong className="text-white">Self-test
                  features</strong> — modern OPDDs include self-test triggered via
                commissioning interface; some run scheduled background self-tests +
                log results
              </li>
              <li>
                <strong className="text-white">Verification
                  at IV</strong> — inspect presence; manufacturer DoC reference;
                BS EN compliance (varies per product); functional test method per
                DoC; record in cert evidence bundle
              </li>
              <li>
                <strong className="text-white">Periodic
                  verification at EICR-equivalent</strong> — re-trigger self-test where
                available; visual inspection of status indicators; check event log for
                any prior trips
              </li>
              <li>
                <strong className="text-white">Failure
                  mode</strong> — OPDD failure = the disconnect path may not operate;
                modern designs default to safe state (charger disabled if OPDD reports
                fault) + alarm raised
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="RDC-DD + RCD type selection per Section 722"
            plainEnglish="RDC-DD = Residual Direct Current Detecting Device — detects smooth DC residual current at 6 mA threshold. Reg 722.531.3.101 (paraphrased): EV circuits require Type B RCD OR Type A RCD + RDC-DD. Most modern domestic EV chargers include integrated RDC-DD with the upstream RCD being standard Type A."
            onSite="The RCD type decision is driven by EV vehicle electronics — vehicle\'s onboard charger + DC-DC converter can produce smooth DC residual under fault, which standard Type A doesn\'t reliably see. RDC-DD or Type B covers the gap. Manufacturer DoC declares which configuration."
          >
            <p>RCD architecture for EV circuits:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Type AC</strong>
                — AC residual only. NOT permitted for EV circuits per Reg 722.531 +
                manufacturer DoC + Reg 531.3.3 update (Type AC for fixed equipment
                with no DC components only)
              </li>
              <li>
                <strong className="text-white">Type A</strong>
                — AC + pulsating DC. Permitted for EV only with RDC-DD upstream or
                integrated. Modern domestic EV chargers typically include integrated
                RDC-DD; the upstream is then standard Type A 30 mA
              </li>
              <li>
                <strong className="text-white">Type F</strong>
                — AC + pulsating DC + composite waveforms; rarely used for EV
              </li>
              <li>
                <strong className="text-white">Type B</strong>
                — AC + pulsating DC + smooth DC across operating range. Built-in
                RDC-DD capability + smooth-DC detection. More expensive (~£100-200)
                + larger physical footprint. Used where RDC-DD not integrated in
                downstream equipment
              </li>
              <li>
                <strong className="text-white">RDC-DD
                  6 mA threshold</strong> — typical smooth-DC detection threshold; lower
                than Type B\'s 30 mA AC threshold; designed for the smooth-DC fault
                scenario
              </li>
              <li>
                <strong className="text-white">Reg 415.1
                  30 mA</strong> — additional protection 30 mA RCD remains the umbrella
                requirement
              </li>
              <li>
                <strong className="text-white">Manufacturer
                  DoC governs</strong> — each EV charger\'s manufacturer DoC declares the
                upstream RCD type required + integrated RDC-DD presence; verify per
                product
              </li>
              <li>
                <strong className="text-white">Verification</strong>
                — RCD type per BS EN 61557-6 test (trip current + time); RDC-DD
                presence + manufacturer DoC + functional test where supported; record
                in cert evidence bundle
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 531.3.3 — RCD Type AC restriction"
            clause="RCD Type AC shall only be used to serve fixed equipment, where it is known that the load current contains no DC components."
            meaning="Reg 531.3.3 codifies the categorical restriction on Type AC RCDs: only for fixed equipment where load current contains no DC components. For LCT this is critical: PV inverter + BESS + EV charging + heat pump VSD all involve power electronics that can produce DC residual current under fault. Type AC is therefore NOT appropriate for the new LCT circuits. The Type A + RDC-DD or Type B selection per source + per equipment manufacturer DoC. The update reflects the proliferation of power-electronics in modern installations + the safety case for matched RCD types. Verification at IV: identify the RCD type per circuit + verify against manufacturer DoC + Section 722 / Chapter 57 / Section 712 source-specific requirements. Existing-installation alterations (Reg 641.5): adding LCT to an installation with only Type AC RCDs typically triggers RCD upgrade — record in cert evidence bundle with the addition / alteration verification. Periodic EICR-equivalent: confirm RCD types remain appropriate + functional + within calibration."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Shared outdoor LCT logic + coordinated architecture</ContentEyebrow>

          <ConceptBlock
            title="Open-PEN logic extended to outdoor PV + ASHP + outdoor BESS"
            plainEnglish="Reg 722.411.4 explicitly addresses outdoor EV. The same protective logic applies to other outdoor LCT — outdoor PV inverter (wall-mounted on garage exterior), ASHP outdoor unit, outdoor BESS (Tesla Powerwall outdoor, GivEnergy IP-rated outdoor). The risk vector is the same; the protective architecture options are the same; only the explicit reg coverage differs."
            onSite="UK 2025-26 best practice: apply Reg 722.411.4 logic across outdoor LCT — OPDD on the supply circuit OR TT alternative architecture. DNO + manufacturer + verifier alignment on the approach. The cert evidence bundle records the per-source architecture choice + rationale."
          >
            <p>Per-outdoor-LCT considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Outdoor PV
                  inverter</strong> — wall-mounted on garage exterior; metal casing;
                exposed to extraneous-conductive-parts. Best practice: OPDD on AC
                supply circuit OR TT alternative; Reg 712.421.101 IMD for DC side
              </li>
              <li>
                <strong className="text-white">ASHP outdoor
                  unit</strong> — ground or wall-mounted; metal casing; condensate
                drainage to ground; customer + pet contact during maintenance.
                Protective conductor architecture per manufacturer + outdoor LCT good
                practice
              </li>
              <li>
                <strong className="text-white">Outdoor BESS</strong>
                — Tesla Powerwall outdoor variant + GivEnergy outdoor-rated + others;
                metal casing + grounded; outdoor exposure. Apply Reg 722.411.4 logic
              </li>
              <li>
                <strong className="text-white">Outdoor wind
                  turbine</strong> — small wind / vertical-axis on customer property;
                Section 551 + outdoor exposure; OPDD or TT alternative for the AC
                supply circuit
              </li>
              <li>
                <strong className="text-white">Solar thermal
                  outdoor controls</strong> — circulation pumps + sensors typically
                indoor (boiler room) but external pump on some pressurised systems;
                consider outdoor exposure
              </li>
              <li>
                <strong className="text-white">Micro-CHP
                  outdoor unit</strong> — typically indoor (utility room or external
                building with conditioned space); occasionally outdoor on some
                commercial installs
              </li>
              <li>
                <strong className="text-white">Micro-hydro
                  turbine + controls</strong> — outdoor by definition (water source);
                Section 551 + outdoor LCT good practice; TT alternative common
              </li>
              <li>
                <strong className="text-white">DNO + verifier
                  alignment</strong> — verify the chosen architecture is acceptable to
                the DNO for the supply + records the position
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Coordinated outdoor LCT TT alternative"
            plainEnglish="For sites with multiple outdoor LCT (EV + outdoor PV + ASHP + outdoor BESS), a coordinated TT architecture provides a single dedicated local earth electrode serving all outdoor LCT protective conductors. PME serves the rest of the installation per BS 7671 standard practice; outdoor LCT uses physical-separated TT earth."
            onSite="Design choice: increased install complexity + earth electrode resistance + verification; reduced risk surface from PME open-PEN scenarios. Compare with per-source OPDD-integrated equipment which is simpler at install but relies on each OPDD device working correctly over time."
          >
            <p>Coordinated TT architecture elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Dedicated local
                  earth electrode</strong> — rod (typically 1-2 m driven) or plate (buried
                horizontally); cross-section per Reg 542; resistance verified per
                Reg 643.7.3 + Reg 644
              </li>
              <li>
                <strong className="text-white">Resistance
                  threshold</strong> — TT system: total Ra × IΔn ≤ 50 V (Reg 411.5.3);
                for 30 mA RCD: Ra ≤ 1666 Ω; in practice aim ≤ 200 Ω for headroom
              </li>
              <li>
                <strong className="text-white">Protective
                  conductor routing</strong> — outdoor LCT circuits CPC routed to the
                local earth electrode; physical separation from the PME main earthing
                terminal
              </li>
              <li>
                <strong className="text-white">Main
                  equipotential bonding</strong> — still serves the rest of the install
                per BS 7671 standard; gas + water + structural metalwork bonded to
                MET via PME as normal
              </li>
              <li>
                <strong className="text-white">RCD
                  architecture</strong> — Type B 30 mA OR Type A + RDC-DD per outdoor
                LCT circuit; Reg 415.1 effectiveness verified
              </li>
              <li>
                <strong className="text-white">Multi-source
                  coordination</strong> — Reg 551.4.2 RCD effectiveness across source
                combinations verified at IV
              </li>
              <li>
                <strong className="text-white">Periodic
                  re-test</strong> — earth electrode resistance trend at EICR-equivalent;
                growing resistance indicates electrode corrosion + may need
                replacement / addition
              </li>
              <li>
                <strong className="text-white">Documentation</strong>
                — cert evidence bundle: earth electrode resistance + RCD architecture
                + verification matrix + DNO acceptance + manufacturer DoC
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.5.3 — TT earth electrode requirement"
            clause="TT systems: where an RCD is used for fault protection, the following condition shall be fulfilled: Ra × IΔn ≤ 50 V, where Ra is the sum of resistances of the earth electrode and the protective conductor of the exposed-conductive-parts."
            meaning="Reg 411.5.3 sets the TT earth-electrode threshold based on RCD sensitivity. For 30 mA RCD (Reg 415.1 additional protection): Ra × 0.030 ≤ 50 → Ra ≤ 1666 Ω. In practice this is generous; a typical driven earth rod achieves 50-200 Ω in average UK soil + the design aims well below the threshold for headroom + reliability. For coordinated outdoor LCT TT alternative: the local earth electrode resistance verified at install (initial verification) + retested periodically (EICR-equivalent). Growing resistance over the EICR cycle indicates electrode corrosion / soil drying / surrounding modifications + may require replacement or addition of a second electrode. The TT alternative complements OPDD-integrated equipment; in some sites the choice is per-source; in others coordinated TT serves all outdoor LCT. Cert evidence bundle records: electrode design (rod / plate / multiple electrodes) + resistance at IV + resistance at periodic + trend + RCD architecture per Reg 415.1 + Reg 411.5.3 verification."
          />

          <InlineCheck {...inlineChecks[3]} />

          <OpenPenOutdoorLct
            caption="Open-PEN risk + outdoor LCT protective architectures diagram. Top: TN-C-S (PME) supply normal operation — PEN combines neutral + protective conductor from transformer to customer MET; bonded metalwork at MET potential. Middle: PEN-open scenario — broken connection; customer-side earth reference lost; exposed-conductive-parts rise toward line voltage; outdoor LCT (EV, outdoor PV, ASHP, outdoor BESS) exposed to wider extraneous-conductive-parts → shock risk. Bottom-left: OPDD architecture — detects voltage anomaly + disconnects; integrated in modern EV chargers + available as separate devices. Bottom-right: TT alternative architecture — local earth electrode dedicated to outdoor LCT circuits; PME serves rest of install; RCD architecture per Section 722.531 + Reg 415.1. Section 722 EV explicit; Section 712 PV + ASHP + outdoor BESS implicit good practice; coordinated TT for multi-source outdoor LCT."
          />

          <SectionRule />

          <Scenario
            title="Outdoor EV install on TN-C-S PME — Reg 722.411.4 compliance"
            situation="Mr Chen, semi-detached property, TN-C-S PME supply, wants 7 kW outdoor EV charger on the front driveway. Standard install configuration; charger to be Zappi V2.1 (integrated OPDD + RDC-DD)."
            whatToDo="(1) Pre-install Reg 642 inspection — outdoor location confirmed + outdoor-rated charger selected; existing CU has spare ways; supply cable routing per Section 522. (2) Reg 722.411.4 architecture choice: Zappi V2.1 has integrated OPDD; manufacturer DoC declares Reg 722.411.4.1(c) compliance. Verify DoC + BS EN compliance + record. No TT alternative needed for this install. (3) RCD architecture per Section 722.531: Zappi V2.1 has integrated RDC-DD; upstream RCD = standard Type A 30 mA RCBO. Verify Type A 30 mA per BS EN 61009. (4) Reg 643 testing on the EV circuit: continuity (R1+R2, R2); IR at 500 V; polarity; loop impedance at the EV charging point; RCD operation (Type A trip current + time per BS EN 61557-6); PFC. (5) Reg 722.411.4 OPDD functional test: trigger Zappi self-test via the manufacturer commissioning interface; verify OPDD detects simulated open-PEN + disconnects within specified time; record result. (6) Reg 722 RDC-DD functional test: per manufacturer; some Zappis include scheduled self-test in firmware + log results. (7) Reg 551.7.5 anti-islanding: not applicable (EV is load, not generating source — unless V2G capability enabled; check vehicle + charger compatibility). (8) Functional verification: test charge cycle via vehicle or test load; verify charge rate + cable lock + safety circuits + communication with vehicle. (9) Documentation: EIC + Schedule of Test Results + manufacturer DoC + OPDD + RDC-DD verification + Reg 722.411.4 compliance record + cert evidence bundle. (10) Customer handover: charger operation + emergency stop + fault response + contacts."
            whyItMatters="UK 2025-26 outdoor domestic EV install is the most common LCT addition. Reg 722.411.4 (with the integrated OPDD voltage-detection device satisfying indent (c)) makes the integrated OPDD + standard Type A architecture the dominant choice — simpler at install than the TT-style alternative + leverages manufacturer integration. Cert evidence bundle records the architecture choice + verification — supports warranty + insurance + future EICR-equivalent + DNO submission. The discipline applied per install protects the customer + the installer + the wider electrical safety case for EV adoption."
          />

          <Scenario
            title="Multi-source rural outdoor LCT — coordinated TT alternative"
            situation="Mr + Mrs Rowe, rural smallholding, existing TN-C-S PME supply, plans for: 12 kWp PV array (roof, outdoor inverter on barn external wall); 20 kWh outdoor BESS (IP-rated, ground-mount); ASHP outdoor unit (existing CH replacement); 22 kW EV charger on the driveway. Discussion at design stage: per-source OPDD + integrated devices vs coordinated TT alternative."
            whatToDo="(1) Design discussion: customer + installer + DNO local representative consider architecture. Decision factors: rural site has some history of PEN-fault concerns in the area; ground conditions suitable for earth electrode (clay loam, average soil resistivity); customer values robust protection. Choice: coordinated TT alternative for all outdoor LCT. (2) Earth electrode design: 2 × 2 m driven earth rods, ~5 m apart, bonded together; estimated resistance ~30-50 Ω in this soil; well below Reg 411.5.3 threshold for 30 mA RCD. (3) Architecture: protective conductors for outdoor PV inverter circuit + outdoor BESS circuit + ASHP outdoor unit circuit + EV charger circuit all routed to the local earth electrode bus bar; physical separation from PME MET; main equipotential bonding for gas + water + structural metalwork still served by PME. (4) RCD architecture per source: PV inverter circuit Type B 30 mA (inverter electronics produce DC fault leakage); BESS circuit Type B 30 mA; ASHP circuit Type A 30 mA (VSD compressor manufacturer DoC permits Type A); EV circuit Type A 30 mA with integrated RDC-DD in charger. Reg 551.4.2 effectiveness verified across combinations. (5) IV: Reg 642 inspection + Reg 643 testing + earth electrode resistance test per Reg 643.7.3 + per-source manufacturer commissioning + Reg 551.7.5 anti-islanding (PV + BESS) + Reg 551.4.2 multi-source RCD effectiveness matrix. (6) DNO sign-off: outdoor LCT TT alternative architecture documented + DNO acceptance recorded; EREC G99 application for the PV + BESS combined export. (7) Documentation: EIC covering the works + Schedule of Inspections + Schedule of Test Results + per-source manufacturer DoC + MCS PV + EREC G99 reference + DNO correspondence + cert evidence bundle assembled. (8) Customer handover: comprehensive operating guide + portal access + annual touchpoint scheduled."
            whyItMatters="Multi-source outdoor LCT site is high-end of the modern UK 2025-26 install. Coordinated TT alternative reduces the PME open-PEN risk surface across all four outdoor sources at the cost of additional install complexity (earth electrode + protective conductor routing + resistance verification). The choice reflects site-specific factors (rural PEN-fault history, ground conditions) + customer + DNO position. Cert evidence bundle is comprehensive — supports the lifecycle of the install + warranty + insurance + future EICR-equivalents + DNO records. The skilled-person + multi-trade discipline + manufacturer engagement all in evidence."
          />

          <CommonMistake
            title="Assuming Reg 722.411.4 doesn\'t apply to indoor charging points reaching outdoor vehicles"
            whatHappens={`Installer fits a wall-mounted EV charger inside the garage, with a 10 m cable reaching the driveway where the customer parks. Assumes "indoor" install → Reg 722.411.4 doesn't apply → connects to PME with standard Type A RCD + no OPDD. Reg 722.411.4 actually covers "a charging point located outdoors or that might reasonably be expected to be used to charge a vehicle outdoors" — the second clause catches the indoor-charger-outdoor-cable scenario.`}
            doInstead="Read Reg 722.411.4 carefully: covers outdoor charging point OR charging point reasonably expected to charge a vehicle outdoors. If the cable from the indoor charger reaches an outdoor vehicle parking position, the reg applies. Choose: integrated OPDD charger (most modern chargers compliant regardless); OR TT alternative architecture; OR locate the charger such that the cable physically cannot reach outdoor parking. Cert evidence bundle records the architecture choice + the position reasoning."
          />

          <CommonMistake
            title="Treating Type B RCD as the only solution"
            whatHappens={`Installer specifies Type B 30 mA RCD for every outdoor LCT circuit + every BESS + every PV — at substantial cost (~£100-200 per Type B vs ~£30-50 per Type A). Customer quote inflated; project cost rises without commensurate safety benefit. The customer's integrated chargers + inverters already include RDC-DD; the upstream Type A + RDC-DD architecture would have sufficed.`}
            doInstead="RCD type per manufacturer DoC + Section 722.531 + Chapter 57 + Section 712. Most modern domestic EV chargers + PV inverters + BESS include integrated RDC-DD or equivalent — the upstream RCD can be standard Type A 30 mA. Type B is required where: no integrated RDC-DD in the downstream equipment; commercial / non-domestic + manufacturer DoC mandates; or design choice for additional headroom. Verify per equipment + per manufacturer; cert evidence bundle records the rationale. Avoid Type-B-everywhere as a default — it inflates cost without reflecting the actual protection requirement."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'PEN fault = open-circuit in the PEN conductor (TN-C-S / PME); customer earth reference lost; exposed-conductive-parts rise toward line voltage; shock risk.',
              'Outdoor LCT amplifies the risk vector via wider exposure to extraneous-conductive-parts (pavement, ground, vehicles, fences).',
              'Reg 722.411.4 (A4:2026): PME shall not be relied on for an outdoor EV charging-point protective contact unless one of methods (b) to (e) is used — (c) OPDD voltage-detection device, (b) TT-style local earth-electrode condition, or (d)/(e) other specified methods. Former indent (a) deleted.',
              'OPDD = Open-PEN Detection Device — integrated in modern domestic EV chargers; detects open-PEN voltage anomaly + disconnects within specified time.',
              'RDC-DD = Residual DC Detection Device — detects smooth DC residual at 6 mA threshold; required where Type A RCD used + smooth-DC fault scenario possible.',
              'Reg 722.531: EV circuits require Type B RCD OR Type A RCD + RDC-DD. Most modern chargers integrate RDC-DD with Type A upstream.',
              'Reg 531.3.3: Type AC only for fixed equipment with no DC components — not appropriate for LCT circuits.',
              'TT alternative architecture: local earth electrode dedicated to outdoor LCT circuits; physical separation from PME; Reg 411.5.3 + Reg 542 + Reg 643.7.3 verification.',
              'Shared logic: open-PEN risk applies across outdoor LCT (EV explicit per Reg 722.411.4; outdoor PV + ASHP + outdoor BESS implicit good practice).',
              'Coordinated TT for multi-source outdoor LCT: single dedicated earth electrode serving all outdoor LCT protective conductors.',
              'Periodic EICR-equivalent: OPDD functional re-test + earth electrode resistance trend + RCD test per BS EN 61557-6 + architecture continuity.',
              'Cert evidence bundle records architecture choice + rationale + per-source verification + DNO position.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                12.3 BESS health monitoring
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                12.5 EICR cycle + per-tech specifics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
