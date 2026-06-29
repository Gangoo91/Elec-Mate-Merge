/**
 * Module 6 · Section 5 · Subsection 4 — TT systems and earth electrode design
 * Maps to C&G 2365-03 / Unit 305 / LO5 / AC 5.4
 *   AC 5.4 — "Design a TT system installation including earth electrode resistance,
 *            applying Regulation 411.5 acceptance criterion RA × IΔn ≤ 50 V"
 * Layered: 2366-03 Unit 304 / AC 5.4; 5393-03 Unit 104 / AC 5.4
 *
 * The TT system end to end. When you must design TT (no DNO earth, rural
 * properties, agricultural and outdoor caravan / camping installs).
 * Earth electrode types and installation, soil resistance, the Reg 411.5
 * acceptance criterion RA × IΔn ≤ 50 V, RCD selection for TT, the new Reg
 * 542.2.8 earth electrode requirements added in BS 7671 A4:2026, and the
 * verification routine.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import { EarthingSystemDiagram } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'TT systems & earth electrode design (5.4) | Level 3 Module 6.5.4 | Elec-Mate';
const DESCRIPTION =
  'TT system design end to end. Earth electrode types and installation, the Reg 411.5 acceptance criterion RA × IΔn ≤ 50 V, RCD selection for TT, the new Reg 542.2.8 earth electrode requirements in BS 7671 A4:2026, and verification.';

const checks = [
  {
    id: 'ra-criterion',
    question:
      'A rural cottage on a TT system has an earth electrode resistance of 180 Ω. The protective device for the installation is a 100 mA Type A RCD at the supply side. Does this satisfy Reg 411.5?',
    options: [
      'Yes — RA × IΔn = 180 × 0.1 = 18 V, which is comfortably below the 50 V touch-voltage limit. The criterion passes.',
      'No — RA × IΔn = 180 × 0.1 = 18 V exceeds the 25 V agricultural touch-voltage limit, so a more sensitive RCD is required.',
      'No — the electrode resistance alone of 180 Ω is above the 100 Ω maximum that BS 7671 sets for any TT earth electrode.',
      'Yes — but only because the 100 mA RCD also satisfies the 0.2 s disconnection time, not because of the touch-voltage product.',
    ],
    correctIndex: 0,
    explanation:
      'Reg 411.5 acceptance for TT systems: RA × IΔn ≤ 50 V, where RA is the sum of the earth electrode resistance and the protective conductor resistance, and IΔn is the rated residual operating current of the RCD. 180 × 0.1 = 18 V; below the 50 V limit. Passes. Note this is the touch-voltage criterion — the RCD must operate at or below its rated trip current to prevent the touch voltage rising above 50 V (the conventional safe AC limit) during a fault.',
  },
  {
    id: 'electrode-types',
    question:
      'Which of the following is NOT recognised by BS 7671 Chapter 54 as a permitted earth electrode type for general TT installations?',
    options: [
      'Plate electrode (typically 600 mm × 600 mm copper or stainless steel buried at depth).',
      'A length of metal water-supply pipe entering the property.',
      'Earth tape or strip electrode buried horizontally.',
      'Driven copper-bonded earth rod (the standard 5/8" or 16 mm rod, typically 1.2 m, 1.5 m or 2.4 m long).',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 explicitly excludes metallic water-supply pipes from being used as earth electrodes — the supply pipe’s earth contact is uncontrolled (often replaced with plastic during repairs), the bond can be broken without anyone knowing, and the water company strongly objects to electrical earthing currents flowing through their distribution system. Permitted electrode types include driven rods, plates, tapes and strips, foundation earth electrodes, and structural metalwork in deliberate contact with the earth (e.g. piling). The water pipe is bonded as an extraneous-conductive-part for equipotential bonding, not used as an electrode.',
  },
  {
    id: 'rcd-tt',
    question:
      'A TT installation with measured RA = 100 Ω and 30 mA Type A RCD on every final circuit. What is the worst-case touch voltage during a fault, and does the install satisfy Reg 411.5?',
    options: [
      '30 V (RA × IΔn = 100 × 0.3 = 30 V) — passes, but only just within the 50 V limit.',
      '50 V (RA × IΔn = 100 × 0.5 = 50 V) — exactly at the limit, no margin.',
      '3 V (RA × IΔn = 100 × 0.03 = 3 V) — passes comfortably.',
      '10 V (RA × IΔn = 100 × 0.1 = 10 V) — passes, assuming a 100 mA RCD.',
    ],
    correctIndex: 2,
    explanation:
      'RA × IΔn = 100 × 0.03 = 3 V. Comfortably below the 50 V limit. Passes. With 30 mA RCDs on every final circuit, the TT system has very forgiving acceptance — even a 1000 Ω electrode would pass (1000 × 0.03 = 30 V). The 30 mA additional protection requirement on socket circuits and luminaires (Reg 411.3.3 and 411.3.4) makes 30 mA RCDs the standard answer on most TT installs.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'When must you design a TT installation rather than TN-S or TN-C-S?',
    options: [
      'When the DNO provides no earth terminal at the supply (rural overhead, some old underground, specialist arrangements) — the supply sets the earthing, not choice.',
      'Whenever the measured Ze on a TN-C-S supply rises above 0.35 Ω, at which point the designer must convert the installation to TT.',
      'When the installation includes an EV charger, because Section 722 always mandates a dedicated TT island regardless of the incoming supply type.',
      'Whenever the prospective fault current is too high for the available protective devices, so a local electrode is used to reduce it.',
    ],
    correctAnswer: 0,
    explanation:
      'The earthing arrangement is determined by the DNO supply, not by the designer’s preference. If the DNO provides an earth terminal at the cut-out (TN-C-S typically, TN-S occasionally), you use that. If the DNO does not provide an earth terminal — common on rural overhead supplies and older agricultural feeds — you must design TT, using your own earth electrode at the property as the means of earthing. Special-location requirements (Section 705 for agricultural, 708 for caravan parks) may add further constraints, but the fundamental earthing arrangement is set by the supply.',
  },
  {
    id: 2,
    question: 'What is the structural difference between TT and TN earthing?',
    options: [
      'In TN the consumer earth runs back to the source via the line conductor, whereas in TT it runs back via the neutral conductor; both rely on MCB-based ADS.',
      'In TN the installation has no earth electrode at all, while in TT the only earth path is the combined PEN conductor shared with the DNO.',
      'In TN the earth ties back to the source via the DNO supply (low Ze, MCB ADS); in TT it is a local soil electrode (high Ze, RCD ADS).',
      'There is no structural difference; TT and TN differ only in the colour of the meter tails and the wording of the cut-out label.',
    ],
    correctAnswer: 2,
    explanation:
      'TN systems share an earth path back to the source via the DNO supply (PEN in TN-C-S, separate PE in TN-S) — the resulting Ze is low (typically 0.35–0.8 Ω) and fault currents are high enough for MCB-based ADS to clear in time. TT systems have a local earth electrode at the consumer in soil — Ze is dominated by the soil resistance (typically 50–500 Ω depending on conditions) and fault currents are too small for an MCB to operate. RCD-based ADS is the only way to clear faults reliably on TT.',
  },
  {
    id: 3,
    question:
      'The TT acceptance criterion in BS 7671 Reg 411.5 is:',
    options: [
      'RA × IΔn ≤ 25 V, where RA is the earth electrode resistance alone and IΔn is the rated residual operating current of the protective RCD.',
      'Zs × IΔn ≤ 230 V, where Zs is the full earth fault loop impedance and IΔn is the rated residual operating current of the RCD.',
      'RA + IΔn ≤ 50 Ω, where RA is the electrode resistance and IΔn is the rated residual operating current of the RCD added directly to it.',
      'RA × IΔn ≤ 50 V, where RA is the sum of earth electrode resistance and protective conductor resistance, IΔn is the rated residual operating current of the protective RCD.',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 411.5 acceptance for TT systems is RA × IΔn ≤ 50 V. The 50 V is the conventional safe AC touch voltage (UL); higher voltages cause harmful current to flow through the body. The product RA × IΔn is the worst-case touch voltage that would appear on exposed-conductive-parts during a fault before the RCD trips. Keeping that product below 50 V keeps the touch voltage safe even if the RCD takes its full rated time to operate.',
  },
  {
    id: 4,
    question:
      'Why is an RCD essential on a TT system, where it might be optional on a TN system?',
    options: [
      'Because the high electrode resistance limits fault current to a few amps, far below MCB or fuse operation — only an RCD can disconnect it.',
      'Because TT systems have no main earthing terminal, so the RCD physically replaces the MET as the only earth reference point in the installation.',
      'Because the local soil electrode generates a dangerous standing voltage that only an RCD can continuously suppress during normal operation.',
      'Because BS 7671 prohibits MCBs entirely on TT systems, requiring every protective device to be an RCD by regulation.',
    ],
    correctAnswer: 0,
    explanation:
      'A TT fault current of (e.g.) 230 / 200 = 1.15 A is hundreds of times below the magnetic instantaneous trip of any MCB. Without an RCD the fault would never clear; the touch voltage on the exposed-conductive-part would persist indefinitely; eventually a person touching the part would be shocked or killed. The RCD detects the residual current to earth (the difference between line and neutral currents) and trips at much lower currents (typically 30 mA for additional protection, 100 mA for general). RCDs are essential on TT, optional but recommended on TN.',
  },
  {
    id: 5,
    question:
      'A TT installation is being designed for a rural property. The soil is a damp clay loam. What is a realistic expected RA for a single 1.2 m driven rod in this soil?',
    options: [
      'Under 1 Ω — a single 1.2 m rod in any UK soil behaves like a TN-S supply earth and rarely exceeds 1 Ω.',
      '50–150 Ω — typical for a 1.2 m rod in damp clay loam; rocky or dry soils run higher (200–500+ Ω) and need longer or multiple rods.',
      'Around 1500–2000 Ω — clay loam is one of the most resistive UK soils, so even a 1.2 m rod gives very high readings.',
      'Exactly 200 Ω — BS 7671 fixes the design resistance of a single 1.2 m rod at 200 Ω regardless of soil type.',
    ],
    correctAnswer: 1,
    explanation:
      'Soil resistivity is the dominant factor. Damp clay loam is roughly 30–50 Ω·m and a single 1.2 m rod typically gives 50–150 Ω. Sandy / chalky / rocky soils can be 200–1000 Ω·m and need longer rods (2.4 m) or multiple rods in parallel (typically two rods at 4 m spacing in series or three rods in a triangle). The actual electrode resistance must be measured after install — soil resistivity is too variable to predict precisely.',
  },
  {
    id: 6,
    question:
      'BS 7671 A4:2026 introduced Reg 542.2.8 concerning earth electrodes. What is the practical effect on the designer?',
    options: [
      'It abolishes the RA × IΔn ≤ 50 V criterion for TT systems and replaces it with a fixed 100 Ω electrode resistance limit.',
      'It removes the requirement for an earth electrode on TT systems where a 30 mA RCD is fitted on every final circuit, deeming the RCD sufficient.',
      'It adds requirements on earth electrodes in Chapter 54 — designers must consult the full A4:2026 text of Reg 542.2.8 for the obligations.',
      'It mandates that all earth electrodes be of the chemical (Bentonite-filled) type for new installations from 2026 onwards.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 A4:2026 introduced Reg 542.2.8 as a new provision concerning earth electrodes within Chapter 54. The exact wording of the requirement is in the published amendment text — designers should consult Reg 542.2.8 directly when planning, installing or certifying earth electrodes under A4:2026. The introduction of this regulation reflects the increased importance of earthing as more installations move to TT (where DNO supply changes have been made) and as outdoor / agricultural / EV / heat pump installs proliferate.',
  },
  {
    id: 7,
    question:
      'A TT installation has measured RA = 250 Ω at handover, with a 100 mA Type A RCD protecting the installation. Does the install satisfy Reg 411.5?',
    options: [
      'No — touch voltage = 250 × 0.1 = 25 V, and any TT install above 100 Ω electrode resistance automatically fails Reg 411.5 regardless of the product.',
      'No — touch voltage = 250 × 0.1 = 25 V, which exceeds the 12 V limit that applies to all TT systems under Reg 411.5.',
      'Yes — but only marginally; touch voltage = 250 × 0.1 = 49 V, leaving almost no headroom below the 50 V limit.',
      'Yes — touch voltage = 250 × 0.1 = 25 V, comfortably below the 50 V limit, so the install passes Reg 411.5 (though 250 Ω is high).',
    ],
    correctAnswer: 3,
    explanation:
      'Mathematically the install passes (250 × 0.1 = 25 V ≤ 50 V). But 250 Ω is on the high side and may rise further during dry summer weather (soil resistivity goes up as soil dries) or if the rod is in marginal contact with the soil. Best practice is to aim for RA below 100 Ω at install so there is headroom for seasonal variation. Improving the electrode (driving a second rod in parallel at 4 m spacing typically halves the resistance, going from 1.2 m to 2.4 m halves it again, etc.) is cheap insurance.',
  },
  {
    id: 8,
    question:
      'On a TT verification you measure the earth electrode resistance using a "stake-out" three-electrode method and get 180 Ω. The 30 mA RCD on the consumer board trips at 27 ms. What records do you put on the EIC schedule of test results?',
    options: [
      'Record Ze (= electrode resistance) = 180 Ω, the RCD trip at 30 mA / 27 ms, RA × IΔn = 5.4 V (passes), and the instrument and calibration date.',
      'Record only the RCD trip time of 27 ms; the electrode resistance and touch-voltage product are not required on the schedule of test results for TT.',
      'Record the electrode resistance as the declared Ze of 0.35 Ω, since all schedules of test results assume a TN-C-S supply value.',
      'Record RA × IΔn = 180 × 0.3 = 54 V and note it as a fail, then omit the RCD trip time because the touch-voltage product already proves non-compliance.',
    ],
    correctAnswer: 0,
    explanation:
      'TT verification records on the EIC schedule of test results: (1) Ze, which for TT is the electrode resistance measured by the three-electrode stake-out or equivalent method; (2) RCD test results — operating time at IΔn (must be ≤ 300 ms for general use or ≤ 40 ms at 1×IΔn for additional protection); (3) the calculated touch voltage RA × IΔn against the 50 V limit; (4) test instrument serial number and last calibration date. The complete record proves the install satisfies Reg 411.5 and gives the periodic inspector a baseline to compare against in 5 years.',
  },
];

const faqs = [
  {
    question: 'Can I add an electrode to a TN-C-S install to "improve" the earthing?',
    answer:
      'BS 7671 Reg 411.4.2 actually recommends an additional connection to Earth via an earth electrode (in accordance with Chapter 54) at the main earthing terminal of TN-C-S installations — not strictly required, but recommended as a safety improvement. The reasoning is that if the DNO supply PEN breaks (a real failure mode), the local electrode provides a fallback earth path. Note that the additional electrode does not change the TN-C-S earthing arrangement to TT — the supply earth is still the primary, and the local electrode is supplementary. The 411.4.2 wording is "shall be made", so this is a Reg 411.4.2 obligation in modern practice for TN-C-S, particularly for installations with EV charging or other safety-critical loads.',
  },
  {
    question: 'How do I measure the earth electrode resistance on a TT install?',
    answer:
      'The classical method is the "fall of potential" three-electrode stake-out: drive two auxiliary electrodes in a straight line from the test electrode at typically 25 m and 12.5 m (or 30/15) and measure the voltage drop between them as test current flows through the test electrode. Modern test instruments (Megger DET 2/2, Fluke 1623, Kewtech etc.) automate the calculation and provide a direct resistance reading. A simpler method that works for TT verification is the "loop test" using the same multifunction tester used for Zs — it gives Ze (= electrode resistance for TT) directly, with the same accuracy as Zs measurement. Either way, document the measured value and the test method on the schedule of test results.',
  },
  {
    question: 'What if I cannot get the electrode resistance below 200 Ω on a difficult site?',
    answer:
      'You have several options before resorting to "TT does not work here". (1) Drive a longer rod — going from 1.2 m to 2.4 m typically halves the resistance because the deeper soil layers are damper. (2) Drive multiple rods in parallel at 4 m or more spacing — two rods at 4 m typically halve the resistance again. (3) Use a plate electrode buried at depth in damper soil. (4) Add a chemical electrode (Bentonite-filled) which lowers resistance significantly in difficult soils. (5) Apply the Reg 411.5 RA × IΔn calculation — even 500 Ω passes the criterion with a 30 mA RCD (500 × 0.03 = 15 V ≤ 50 V). Most "impossible" TT sites resolve to "we need two rods and a 30 mA RCD".',
  },
  {
    question: 'What testing does the periodic inspector look for on a TT install?',
    answer:
      'On a TT EICR the inspector confirms: (1) the supply is still TT (sometimes the DNO has upgraded the supply to TN-C-S in the intervening years, in which case the install needs to be reviewed); (2) the earth electrode is still in place, accessible, labelled, and the connection is mechanically sound and corrosion-free per Reg 542.3.2; (3) the measured earth electrode resistance Ze is reasonable and the RA × IΔn calculation still passes Reg 411.5; (4) all RCDs operate within their published times at IΔn and 1×IΔn; (5) any specific A4:2026 requirements per Reg 542.2.8 are met; (6) the labelling at the MET still identifies the earthing arrangement clearly. A TT install that passes these gates remains compliant for the next inspection cycle.',
  },
  {
    question: 'Do I need to bond every metal pipe and structure on a TT install the same way as TN?',
    answer:
      'Yes — main protective bonding to extraneous-conductive-parts per Reg 411.3.1.2 applies on TT systems just as it does on TN. Water mains, gas mains and structural metalwork that could introduce a dangerous potential difference must be bonded back to the MET with a 6 mm² (or 10 mm² in some cases) copper bonding conductor per Table 54.8. The supplementary bonding requirements in special locations (bathrooms, swimming pools, agricultural per Section 705) also apply. The TT-specific addition is the electrode itself plus the RCD-based ADS scheme — the bonding obligations are not relaxed.',
  },
  {
    question: 'Why is RCD selection for TT different from TN — what type and rating do I use?',
    answer:
      'For TT installations the supply-side device must be an RCD because no MCB will operate at the low fault currents. Rating: typically 100 mA Type A or 300 mA Type S (S-type provides delayed operation for discrimination with downstream 30 mA RCDs). For final circuits subject to additional protection (sockets up to 32 A per Reg 411.3.3, luminaires per Reg 411.3.4 in dwellings), a 30 mA Type A RCD is required regardless of TT vs TN — and on TT this 30 mA RCD also provides the ADS function for the circuit. Modern domestic TT installs typically use 30 mA RCBOs on every final circuit (which provides both ADS and additional protection on the same device) backed by a 100 mA or 300 mA upstream device for fault containment.',
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5 · Subsection 4"
            title="TT systems and earth electrode design"
            description="The TT system end to end. When the DNO supply forces TT, earth electrode types and installation, the Reg 411.5 acceptance criterion RA × IΔn ≤ 50 V, RCD-based ADS on TT, the new Reg 542.2.8 earth electrode requirements in BS 7671 A4:2026, and the verification routine that confirms compliance at handover."
            tone="amber"
          />

          <TLDR
            points={[
              'TT is the earthing arrangement when the DNO does not provide an earth terminal at the supply — common on rural overhead supplies, some old underground feeds, and certain industrial and specialist supplies. The earthing arrangement is determined by the supply, not by designer choice.',
              'On TT the earth path is a local electrode in soil with a resistance typically 50–500 Ω, far higher than the 0.35–0.8 Ω of a TN supply. Fault currents are too small for MCBs to operate; an RCD is essential for ADS, not optional.',
              'The Reg 411.5 acceptance criterion is RA × IΔn ≤ 50 V — the worst-case touch voltage during a fault must stay below the conventional safe AC touch voltage limit. With a 30 mA RCD, even a 1500 Ω electrode passes (1500 × 0.03 = 45 V); the criterion is generous, but the install still benefits from a low-resistance electrode for resilience to seasonal soil drying.',
              'BS 7671 A4:2026 introduced Reg 542.2.8 as a new provision concerning earth electrodes — designers must consult the full text of the regulation in the published amendment to determine the obligations.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify when TT must be designed (DNO supply does not provide an earth terminal) and when TN-C-S or TN-S applies instead.',
              'Apply the Reg 411.5 acceptance criterion RA × IΔn ≤ 50 V to a TT design and verification, demonstrating compliance for any combination of electrode resistance and RCD rating.',
              'Select earth electrode type, length and number for the soil conditions present, recognising the rough resistance ranges for typical UK soils (clay loam 50–150 Ω for a 1.2 m rod; sandy / rocky 200–500+ Ω).',
              'Specify RCD type and rating for the TT installation — 100 mA or 300 mA S-type at the supply for general fault clearance, 30 mA Type A on final circuits for additional protection per Reg 411.3.3 and 411.3.4.',
              'Recognise the requirements introduced by BS 7671 A4:2026 Reg 542.2.8 concerning earth electrodes, and consult the published amendment for full obligations.',
              'Verify a TT install at handover by measuring electrode resistance (three-electrode stake-out or no-trip loop method), confirming RCD operation at IΔn and 1×IΔn, and recording the touch-voltage calculation on the schedule of test results.',
              'Apply the additional earth electrode recommendation of Reg 411.4.2 to TN-C-S installations as a fallback safety improvement.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="When TT is the answer — supply determines earthing"
            plainEnglish="The earthing arrangement is determined by the DNO supply, not by the designer. If the DNO provides an earth terminal at the cut-out, you use it (TN-S or TN-C-S). If the DNO does not, you must design TT, using your own earth electrode at the property as the means of earthing."
            onSite="Most rural cottages on overhead supplies are TT. Most agricultural installs are TT. Most temporary site supplies and certain caravan-park feeds are TT. Always confirm the supply arrangement at survey by reading the DNO cut-out label and, if uncertain, calling the DNO."
          >
            <p>
              The three earthing arrangements you encounter in UK practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-C-S (PME / PNB)</strong> — the dominant UK domestic supply. The DNO
                supplies a combined PEN conductor at the cut-out; the installer separates PEN
                into PE and N at the consumer’s main earthing terminal (MET). Declared Ze is
                typically 0.35 Ω. Fault currents are high. MCB-based ADS is the norm; RCDs are
                additional protection.
              </li>
              <li>
                <strong>TN-S</strong> — older urban supplies (sometimes called "earthed
                concentric" or "earthed lead sheath"). The DNO provides a separate earth (often
                via the supply cable’s lead sheath) and a separate neutral. Declared Ze is
                typically 0.8 Ω. Fault currents lower than TN-C-S but still high enough for MCB
                ADS. Increasingly rare as DNOs replace lead-sheath cables.
              </li>
              <li>
                <strong>TT</strong> — the DNO does not provide an earth terminal. Common on rural
                overhead supplies (the DNO will not reliably ground the neutral at the pole-top
                transformer). The installer provides their own earth electrode at the property,
                creating a local earth path through the soil. Earth electrode resistance Ze is
                typically 50–500 Ω, depending on soil and electrode design. Fault currents are
                too small for MCB-based ADS; RCDs are essential.
              </li>
            </ul>
            <p>
              The arrangement is announced at the cut-out: TN-C-S or PME on the cut-out label
              means TN-C-S; the absence of an earth terminal at the cut-out means TT (no
              alternative). Always verify by reading the cut-out label and, if uncertain or
              the cut-out is unmarked, calling the DNO with the property MPAN to confirm.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.5.3 (TT systems — protection by ADS using RCDs)"
            clause={`Where an RCD is used for fault protection, the following conditions shall be fulfilled:
(a) the disconnection time shall be that required by Regulation 411.3.2.2 or 411.3.2.4; and
(b) RA × IΔn ≤ 50 V

where:
RA is the sum of the resistances of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms)
IΔn is the rated residual operating current of the RCD.

The requirements of this regulation are met if the earth fault loop impedance of the circuit protected by the RCD meets the requirements of Table 41.5.`}
            meaning={
              <>
                Reg 411.5.3 is the TT system acceptance criterion. The 50 V is the conventional
                safe AC touch voltage (UL); higher voltages cause harmful current to flow through
                the body. The product RA × IΔn is the worst-case touch voltage that would appear
                on exposed-conductive-parts during a fault before the RCD trips. Practical effect:
                even a high earth electrode resistance can satisfy the criterion if combined with
                a sufficiently sensitive RCD — 1500 Ω × 30 mA = 45 V passes; 1000 Ω × 100 mA = 100
                V fails. Table 41.5 publishes the equivalent maximum Zs values directly for
                non-delayed and 'S' type RCDs at U₀ = 230 V.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.5.3 and Table 41.5."
          />

          <EarthingSystemDiagram />

          <SectionRule />

          <ContentEyebrow>The TT acceptance criterion in detail</ContentEyebrow>

          <ConceptBlock
            title="RA × IΔn ≤ 50 V — the maths and what it protects against"
            plainEnglish="Imagine a fault in a TT installation. Line current escapes through a damaged appliance to its metal casing, which is connected to the local electrode. The current flows into the soil, back to the source via the surrounding ground, and the voltage on the casing during this fault is RA × If. If a person touches the casing during the fault, that voltage drives current through their body. Reg 411.5 limits this touch voltage to 50 V."
          >
            <p>
              The maths is simple. During a fault, the fault current flowing through the earth
              electrode is roughly:
            </p>
            <p>
              If = U0 / (Ze + Zsource), where Ze is the electrode resistance plus protective
              conductor resistance (RA) and Zsource is the source-side impedance.
            </p>
            <p>
              On a TT system, RA is much larger than Zsource (RA is hundreds of ohms; Zsource is
              fractions of an ohm), so:
            </p>
            <p>
              If ≈ U0 / RA
            </p>
            <p>
              The voltage on the exposed-conductive-part during the fault is the voltage drop
              across RA (since the source-side impedance is negligible):
            </p>
            <p>
              Vfault = If × RA = (U0 / RA) × RA = U0
            </p>
            <p>
              Wait — that suggests the touch voltage is the full supply voltage. It is, in
              principle, until the RCD trips. The RCD trips when the residual current exceeds
              IΔn. The current that flows from the appliance casing to the local soil and back
              to the source is the residual current — it is the imbalance between line and
              neutral. So the RCD trip threshold sets a ceiling on how long the touch voltage
              persists, but the formula relevant to the 50 V criterion is different:
            </p>
            <p>
              The "deemed safe" arrangement in Reg 411.5 says: the touch voltage that the RCD
              will tolerate before tripping is RA × IΔn. If that product is at most 50 V, the
              touch voltage during the fault stays below the conventional safe AC limit — the
              person touching the casing is exposed to at most 50 V briefly before the RCD
              clears. Above 50 V the touch voltage becomes harmful.
            </p>
            <p>
              Examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>RA = 100 Ω, IΔn = 30 mA: 100 × 0.03 = 3 V — comfortably safe.</li>
              <li>RA = 200 Ω, IΔn = 100 mA: 200 × 0.1 = 20 V — safe.</li>
              <li>RA = 500 Ω, IΔn = 100 mA: 500 × 0.1 = 50 V — at the limit; pass but no margin.</li>
              <li>RA = 600 Ω, IΔn = 100 mA: 600 × 0.1 = 60 V — fail; either improve electrode or move to a 30 mA RCD.</li>
              <li>RA = 1500 Ω, IΔn = 30 mA: 1500 × 0.03 = 45 V — pass.</li>
              <li>RA = 1700 Ω, IΔn = 30 mA: 1700 × 0.03 = 51 V — fail; improve electrode.</li>
            </ul>
            <p>
              30 mA RCDs (the standard "additional protection" device) make the criterion very
              forgiving — even high electrode resistances pass. 100 mA and 300 mA (S-type)
              upstream devices used for general fault clearance and discrimination are tighter
              and the electrode resistance must be controlled.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Earth electrode types and design</ContentEyebrow>

          <ConceptBlock
            title="Choosing an electrode — type, length, number, geometry"
            plainEnglish="The earth electrode is the path from your installation’s metalwork into the soil. The resistance depends mostly on the soil resistivity (ohm-metres) and the electrode geometry (length, number, spacing). UK practice is dominated by driven copper-bonded rods, with plates and tapes for special cases."
          >
            <p>
              BS 7671 Chapter 54 recognises the following earth electrode types:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Driven rods</strong> — the most common UK choice. Standard sizes 5/8" (16
                mm) diameter copper-bonded steel core, supplied in 1.2 m, 1.5 m or 2.4 m
                sections that screw together for deeper installs. Driven vertically with a sledge
                hammer or pneumatic driver. Connected to the MET via an earthing conductor in
                green/yellow PVC, typically 16 mm² for domestic, 25 mm² or larger for commercial.
              </li>
              <li>
                <strong>Plate electrodes</strong> — typically 600 mm × 600 mm copper or
                galvanised steel plate buried at depth (1.5 m or more). Higher contact area than
                a single rod, but expensive to install and inflexible. Used in difficult-rod soil
                where rocks prevent driving.
              </li>
              <li>
                <strong>Tape and strip electrodes</strong> — buried horizontally, typically 25
                mm × 4 mm copper tape, in a 0.5–1 m deep trench. Used as foundation earths or
                where rod-driving is impractical (e.g. rocky surface with thinner topsoil).
              </li>
              <li>
                <strong>Foundation earth electrodes</strong> — galvanised steel mesh or rebar in
                concrete foundations, deliberately bonded to the building’s MET. Common in
                modern commercial construction, increasingly in domestic new-build.
              </li>
              <li>
                <strong>Structural metalwork</strong> — large structural steel members (e.g.
                piling, columns) in deliberate earth contact. Used in industrial and
                infrastructure projects.
              </li>
              <li>
                <strong>Chemical electrodes (electrolytic)</strong> — copper rod in a Bentonite-
                or other-electrolyte-filled enclosure. Significantly lowers resistance in
                difficult soils. More expensive than a simple rod but transformative on dry /
                rocky / sandy sites.
              </li>
            </ul>
            <p>
              <strong>Not permitted</strong> as electrodes: metallic water-supply pipes (uncontrolled
              earth contact, easily broken without notice, water company objects to electrical
              currents), gas pipes (explosive risk, gas company prohibition), and any other pipework
              outside the installer’s control.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Soil resistivity and rule-of-thumb resistance figures"
            plainEnglish="UK soils vary widely in resistivity. Damp clay loam and peat are low (good for earthing); sandy, chalky, rocky and dry soils are high (poor for earthing). The actual electrode resistance depends on soil resistivity and electrode geometry."
            onSite="Always measure the actual electrode resistance after install — soil resistivity is too variable to predict precisely. The rule-of-thumb figures below are starting points for estimating; the test instrument is the source of truth."
          >
            <p>
              Approximate UK soil resistivity ranges (consult specialist sources for site-specific
              figures):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Peat / marsh:</strong> 5–30 Ω·m. Excellent for earthing.</li>
              <li><strong>Damp clay loam:</strong> 30–80 Ω·m. Good.</li>
              <li><strong>Sandy clay:</strong> 80–200 Ω·m. Moderate.</li>
              <li><strong>Sand / gravel:</strong> 200–500 Ω·m. Poor; needs longer / multiple rods.</li>
              <li><strong>Chalk / limestone:</strong> 200–1000+ Ω·m. Often poor; chemical electrodes help.</li>
              <li><strong>Granite / hard rock:</strong> 1000–10000 Ω·m. Very poor; specialist solutions needed.</li>
            </ul>
            <p>
              Approximate single 1.2 m rod resistance (R ≈ ρ × ln(L/d) / (2π × L), where ρ is soil
              resistivity, L is rod length, d is rod diameter):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>30 Ω·m clay loam: ~30 Ω.</li>
              <li>50 Ω·m clay loam: ~50 Ω.</li>
              <li>100 Ω·m sandy clay: ~100 Ω.</li>
              <li>200 Ω·m gravel: ~200 Ω.</li>
              <li>500 Ω·m chalk: ~500 Ω.</li>
            </ul>
            <p>
              Doubling the rod length (1.2 m → 2.4 m) typically halves the resistance because the
              deeper soil layers are damper (below the seasonal drying zone). Adding a second
              parallel rod at 4 m spacing typically halves again. Three rods in a triangle at 4
              m spacing reduce further. For very high resistivity sites, a chemical electrode or
              a deeper plate is often the most cost-effective solution.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 542.2.8 (Earth electrodes — new in A4:2026)"
            clause="Regulation 542.2.8 of BS 7671:2018+A4:2026 was introduced as a new provision concerning earth electrodes within Part 5, Chapter 54. The regulation contains additional requirements concerning earth electrodes for installations under A4:2026. Designers shall consult the full text of Regulation 542.2.8 in the published amendment to determine the specific obligations, exceptions, numerical limits, or required testing for earth electrodes installed under A4:2026."
            meaning={
              <>
                A4:2026 introduced Reg 542.2.8 as a new earth electrode provision. The fragment
                in publicly available extracts is index-style ("542.2.8 have been introduced
                concerning earth electrodes") and does not include the full normative wording.
                Designers, installers and inspectors working on TT installations or any
                installation involving earth electrodes must obtain and read the full A4:2026
                text of Reg 542.2.8 before specifying, installing or certifying electrodes.
                Treat this regulation as a pointer to the published amendment for the
                authoritative requirements.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 54, Regulation 542.2.8 (new in A4:2026)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 542.3.2 (Connection of earthing conductor to electrode)"
            clause="The connection of an earthing conductor to an earth electrode or other means of earthing shall be soundly made and electrically and mechanically satisfactory, suitably protected against corrosion, and labelled in accordance with Regulation 514.13.1(a)."
            meaning={
              <>
                Reg 542.3.2 sets the four "shall" requirements for the earth electrode connection:
                soundly made, electrically and mechanically satisfactory, corrosion-protected,
                and labelled. Practical implementation: use a proprietary clamp (not a hose clip)
                rated for the conductor size; install a cover or junction box (e.g. a "carrot top")
                over the rod top to protect from mechanical damage and corrosion; add the
                "Safety Electrical Connection — Do Not Remove" label per Reg 514.13.1(a).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 54, Regulation 542.3.2; Reg 514.13.1(a) for labelling."
          />

          <SectionRule />

          <ContentEyebrow>RCD selection for TT</ContentEyebrow>

          <ConceptBlock
            title="The RCD scheme — supply-side fault clearance plus per-circuit additional protection"
            plainEnglish="A typical modern domestic TT install has a 100 mA Type S (delayed) RCD as the supply-side fault-clearance device, with 30 mA Type A RCBOs on every final circuit for additional protection. The S-type delays operation by ~50 ms so the downstream 30 mA can clear local faults first, leaving the supply RCD as the backup for unhandled faults."
            onSite="Type AC RCDs are no longer suitable for most domestic circuits — modern loads (PV inverters, EV chargers, electronics) introduce DC-side residual current that paralyses Type AC. Type A is the modern default; Type B is required for EV charging on TN-C-S (Section 722) and may be needed in some industrial cases."
          >
            <p>
              The scheme:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply-side RCD</strong> — typically 100 mA or 300 mA Type S (selective /
                time-delayed). The S-type delays operation by ~50 ms so downstream 30 mA RCDs can
                clear local final-circuit faults first. The supply-side device handles
                installation-wide earth faults that for any reason were not cleared downstream
                (e.g. a fault in the meter tails or main board itself), and it limits the
                worst-case touch voltage during such a fault per Reg 411.5.
              </li>
              <li>
                <strong>Final-circuit RCDs</strong> — 30 mA Type A on every final circuit, normally
                supplied by RCBOs (combined RCD + MCB) so each circuit has its own residual
                current protection without nuisance-tripping other circuits. Type A handles AC
                and pulsed DC residual currents (the modern default); Type AC handles only AC
                and is increasingly inadequate for modern loads.
              </li>
              <li>
                <strong>Special-circuit RCDs</strong> — Type B RCDs are required on EV charger
                circuits per Section 722 (or Type A combined with DC-residual monitoring inside
                the EV unit). PV inverter circuits typically need Type A or B per Section 712 and
                the inverter manufacturer’s spec.
              </li>
            </ul>
            <p>
              Discrimination (selectivity) between the upstream S-type and downstream 30 mA
              ensures that local faults trip only the affected circuit, while still providing
              full RCD coverage at the installation level. This is a significant advance over
              older schemes where all circuits were on a single 30 mA RCD and any one fault
              dropped the whole install.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>TN-C-S supplementary electrode under Reg 411.4.2</ContentEyebrow>

          <ConceptBlock
            title="A4:2026 reinforced the recommendation for a local electrode on TN-C-S"
            plainEnglish="BS 7671 Reg 411.4.2 recommends an additional connection to Earth, by means of an earth electrode in accordance with Chapter 54, at the main earthing terminal of TN-C-S installations. The reasoning: if the DNO supply PEN conductor breaks (a real failure mode) the local electrode provides a fallback earth path. The recommendation is particularly relevant for properties with EV charging, heat pumps and high-current loads where an open-PEN event would otherwise lift the chassis voltage of every bonded metal item to full phase voltage."
            onSite="Practical L3 implementation on a TN-C-S property with a planned EV charger or heat pump: drive a 1.2 m or 2.4 m copper-bonded earth rod within reach of the MET, terminate via a proprietary clamp on a carrot-top cover, run a 16 mm² green-yellow earthing conductor from rod to MET, label per Reg 514.13.1 ('Safety Electrical Connection — Do Not Remove'), measure the resistance and record on the EIC. The supplementary electrode does not change the earthing arrangement to TT — supply earth remains the primary."
          >
            <p>
              When the supplementary electrode is most worthwhile:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EV charger installations</strong> — Section 722 already requires
                open-PEN protection (built-in detection per IEC 61851-1, dedicated TT
                electrode, or external open-PEN device); the supplementary electrode
                supports the open-PEN detection scheme on properties where the EV chassis
                exposure during a fault is the lead concern.
              </li>
              <li>
                <strong>Heat pumps and outdoor metalwork</strong> — outdoor units sit at
                ground potential through their fixings; an open-PEN event lifts the
                chassis to phase voltage and creates a touch-shock hazard for anyone
                approaching the unit.
              </li>
              <li>
                <strong>Older overhead supplies</strong> — rural and semi-rural TN-C-S
                where the DNO PEN integrity is statistically less reliable; the local
                electrode is cheap insurance.
              </li>
              <li>
                <strong>Properties with extensive bonded extraneous-conductive-parts</strong>
                — large kitchens with stainless steel, swimming pools, agricultural sheds
                with bonded metal frames; the supplementary electrode reduces the touch
                voltage on the bonded metal during an open-PEN event.
              </li>
              <li>
                <strong>Documentation</strong> — the EIC notes that the installation is
                TN-C-S with a supplementary electrode at the MET per Reg 411.4.2. Record
                measured electrode resistance for the next inspector to compare against.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RCD selection on TT — Type matters</ContentEyebrow>

          <ConceptBlock
            title="Why Type AC is no longer the right answer on TT for modern loads"
            plainEnglish="Type AC RCDs detect alternating current residual currents only — they were the standard answer when domestic loads were resistive (heating elements, incandescent lamps) and inductive (motors). Modern loads inject DC residual currents into the earth path: PV inverters, EV chargers, heat pump variable-speed drives, LED drivers, induction hobs. A DC residual current paralyses a Type AC RCD — it sits there refusing to trip on what it cannot see. Type A RCDs detect both AC and pulsed DC; Type B detects all forms including smooth DC."
            onSite="On a TT install with PV, EV charger, heat pump or any significant electronic load, Type A is the modern default for additional protection at 30 mA. Type B is required on EV charger circuits per Reg 722.531.3.101 (or Type A combined with a 6 mA DC-residual monitor inside the EV unit). Type S (selective / time-delayed) at 100 mA upstream provides discrimination with downstream 30 mA devices and handles installation-wide earth faults."
          >
            <p>
              The TT RCD selection logic in plain L3 terms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply-side device</strong> — 100 mA Type S Type A RCD typically.
                S-type delays operation by ~50 ms so downstream 30 mA devices clear local
                faults first. Handles installation-wide earth faults the downstream
                devices missed.
              </li>
              <li>
                <strong>Final-circuit devices</strong> — 30 mA Type A RCBO per circuit.
                Each circuit has its own residual current protection without
                nuisance-tripping other circuits. Type A handles the AC and pulsed DC
                residual currents that modern loads produce.
              </li>
              <li>
                <strong>EV charger circuits</strong> — Reg 722.531.3.101 requires 30 mA
                RCD per connecting point with DC fault current protection in addition.
                Type B RCBO, or Type A plus the EV's built-in 6 mA DC residual monitor.
                The DC fault current protection cannot be omitted on grounds of
                expense — the regulation is explicit.
              </li>
              <li>
                <strong>PV inverter circuits</strong> — Type A or Type B per Section 712
                and the inverter manufacturer's stated requirement. Type AC is not
                acceptable on a modern PV inverter circuit.
              </li>
              <li>
                <strong>Heat pump supplies</strong> — Type A at 30 mA on the dedicated
                circuit. Variable-speed drives in heat pumps inject pulsed DC residuals
                that Type AC misses.
              </li>
              <li>
                <strong>Verification per A4:2026 Reg 643.7</strong> — single AC test at
                1×IΔn, regardless of RCD type. Operating time recorded against BS EN 61008
                / 61009 limits.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Verification — measuring and recording for TT</ContentEyebrow>

          <ConceptBlock
            title="The TT verification routine — what to measure, what to record"
            plainEnglish="At handover the install must be tested to prove Reg 411.5 compliance. Measure the electrode resistance, test every RCD at IΔn and 1×IΔn, calculate RA × IΔn, and record everything on the schedule of test results."
          >
            <p>
              The TT verification sequence:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Measure earth electrode resistance.</strong> Use a "fall of potential"
                three-electrode stake-out method, or the no-trip Zs function on a multifunction
                tester (which measures Ze, equal to electrode resistance for TT). For a single
                rod expect 50–500 Ω depending on soil; for a multi-rod array proportionally less.
                Document the measured value and the test method on the schedule.
              </li>
              <li>
                <strong>Test every RCD at IΔn.</strong> Operating time at the rated residual
                current must be ≤ 300 ms for general use, ≤ 40 ms at 1×IΔn for additional
                protection. Document the operating times on the schedule.
              </li>
              <li>
                <strong>Calculate RA × IΔn.</strong> For each RCD-protected circuit, multiply the
                measured RA by the RCD’s rated IΔn and verify ≤ 50 V. Document the calculation
                and pass result.
              </li>
              <li>
                <strong>Verify all main protective bonding.</strong> Continuity test from MET to
                each extraneous-conductive-part (water, gas, structural metalwork). Document
                the pass result.
              </li>
              <li>
                <strong>Verify electrode connection per Reg 542.3.2.</strong> Check that the
                connection is sound, mechanically secure, corrosion-protected, and labelled per
                Reg 514.13.1(a). Document the visual inspection.
              </li>
              <li>
                <strong>Confirm A4:2026 Reg 542.2.8 requirements.</strong> Check the published
                amendment text and verify any specific obligations introduced by this new
                regulation.
              </li>
              <li>
                <strong>Issue EIC plus schedule of test results plus schedule of inspections.</strong>{' '}
                The TT-specific entries (Ze = electrode resistance, RA × IΔn calculation, RCD
                trip times) provide the periodic inspector with a baseline for comparison in 5
                years.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="Rural cottage — TT install for a converted barn"
            situation={
              <>
                A converted barn 25 m from the road has a single-phase overhead supply from a
                pole-mounted DNO transformer 200 m away. The cut-out has no earth terminal — TT
                is the only option. The site is clay loam soil; you have driven a single 2.4 m
                copper-bonded rod 5 m from the consumer unit, connected to the MET via 16 mm²
                green/yellow earthing conductor with a proprietary clamp on a "carrot top"
                rod-cover.
              </>
            }
            whatToDo={
              <>
                Measure the electrode resistance: 75 Ω (typical for clay loam with a 2.4 m rod).
                Specify the consumer unit as a 100 mA Type S supply-side RCD with 30 mA Type A
                RCBOs on every final circuit. Verify Reg 411.5 acceptance: for the supply RCD,
                RA × IΔn = 75 × 0.1 = 7.5 V (passes); for the per-circuit 30 mA RCBOs,
                RA × IΔn = 75 × 0.03 = 2.25 V (passes comfortably). Test every RCD at IΔn and
                1×IΔn — operating times within 300 ms and 40 ms respectively. Confirm the
                Reg 542.3.2 connection requirements (clamp sound, label fitted, cover protecting
                from mechanical damage and corrosion). Confirm Reg 411.3.1.2 main protective
                bonding to extraneous-conductive-parts (water main, oil-fired boiler return).
                Issue EIC with schedule of test results recording all measurements and pass
                criteria, and a clear note on the design pack that the install is TT and the
                electrode resistance was 75 Ω at handover.
              </>
            }
            whyItMatters={
              <>
                TT installs are normal practice in rural Britain. The Reg 411.5 acceptance
                criterion is generous if you fit 30 mA RCBOs on every final circuit, but the
                install must still be properly tested, documented and labelled. The next
                inspector in 5 years will compare their measurements to your handover figures
                and flag any deterioration — soil drying, rod corrosion, connection failure.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Treating a TT install like a TN install — fitting MCBs without RCDs"
            whatHappens={
              <>
                The apprentice arrives at a rural site, sees a normal-looking consumer unit, fits
                MCBs on every way without RCDs, and signs the EIC. The TT system has fault
                currents in single-digit amps; the MCBs will never operate on an earth fault. A
                fault in any appliance will sit there forever, the touch voltage on the appliance
                casing will be at supply voltage, and someone will eventually be killed.
              </>
            }
            doInstead={
              <>
                Always identify the supply earthing arrangement before designing. Read the cut-out
                label or call the DNO. If the supply is TT, fit RCDs on every circuit (either as
                RCBOs on a per-circuit basis, or as RCDs grouping circuits) and verify Reg 411.5
                acceptance with measured RA. Document the supply arrangement clearly on the EIC
                and on the consumer unit label. Never assume "it’s domestic, it’s TN-C-S" — rural
                domestic supplies are routinely TT.
              </>
            }
          />

          <CommonMistake
            title="Bonding a metallic water pipe and calling it the earth electrode"
            whatHappens={
              <>
                The apprentice bonds the water main to the MET with a 6 mm² bonding conductor and
                ticks "earth electrode" on the EIC. The water company replaces a section of the
                supply pipe with plastic during a routine repair. The "earth electrode" no
                longer has any earth contact. The TT install loses its earth path silently. A
                fault occurs months later and the touch voltage on appliances reaches supply
                voltage with no clearing.
              </>
            }
            doInstead={
              <>
                The water main is bonded as an extraneous-conductive-part for equipotential
                bonding (Reg 411.3.1.2), not used as an earth electrode. Earth electrodes must
                be dedicated, installer-controlled rods / plates / tapes installed per Reg 542
                and Chapter 54. Never rely on a service pipe (water, gas) for the earth electrode
                function. Install a proper rod, measure its resistance, and document it as the
                earth electrode on the EIC.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'TT is the earthing arrangement when the DNO does not provide an earth terminal at the supply — common on rural overhead supplies, agricultural feeds, and certain industrial supplies. The arrangement is determined by the supply, not by designer choice.',
              'Reg 411.5 acceptance criterion: RA × IΔn ≤ 50 V, where RA is the sum of earth electrode resistance and protective conductor resistance, and IΔn is the rated residual operating current of the protective RCD.',
              'On TT, RCDs are essential — high earth electrode resistance limits fault current to a few amps, far below MCB operating thresholds. Modern domestic TT typically uses 100 mA Type S supply-side RCD with 30 mA Type A RCBOs on every final circuit.',
              'Earth electrode types: driven rods (the UK default), plate electrodes, tape / strip electrodes, foundation earth electrodes, structural metalwork in deliberate earth contact, chemical electrodes for difficult soils. Water and gas supply pipes are explicitly NOT permitted as earth electrodes.',
              'Soil resistivity ranges: peat/marsh 5–30 Ω·m (excellent), clay loam 30–80 Ω·m (good), sandy clay 80–200 Ω·m (moderate), sand/gravel 200–500 Ω·m (poor), chalk 200–1000 Ω·m (poor), granite 1000+ Ω·m (very poor). Single 1.2 m rod resistance roughly equals soil resistivity in Ω·m.',
              'BS 7671 A4:2026 introduced Reg 542.2.8 as a new provision concerning earth electrodes — designers must consult the full A4:2026 text for the specific obligations.',
              'Reg 542.3.2 sets the connection requirements for the earthing conductor at the electrode: soundly made, electrically and mechanically satisfactory, corrosion-protected, and labelled per Reg 514.13.1(a).',
              'Reg 411.4.2 recommends an additional earth electrode at the MET for TN-C-S installations as a fallback safety improvement — particularly relevant for installations with EV charging or other safety-critical loads.',
              'TT verification: measure electrode resistance (three-electrode stake-out or no-trip loop method), test all RCDs at IΔn and 1×IΔn, calculate RA × IΔn against 50 V limit, confirm Reg 542.3.2 connection requirements, document all on the schedule of test results.',
            ]}
          />

          <Quiz title="TT systems &amp; earth electrode design — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section5-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.3 Max Zs vs measured Zs
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Section landing <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5 — EFLI &amp; ADS
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
