import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'mod3-s4-r-limit-calc',
    question:
      'A supplementary bond protects a circuit on a 20 A B-curve MCB. From the Reg 415.2.2 formula, what is the maximum permitted bond resistance R?',
    options: [
      '50 / 20 = 2.50 Ω',
      'Ia at 5 s for a 20 A B-curve ≈ 100 A. R ≤ 50/100 = 0.50 Ω.',
      '50 / 0.030 = 1666 Ω (using IΔn).',
      'No fixed limit — supplementary bonding has no acceptance criterion.',
    ],
    correctIndex: 1,
    explanation:
      'For an overcurrent device Reg 415.2.2 uses the 5 s operating current, not the rated In. A 20 A B-curve MCB trips on the magnetic threshold at roughly 5×In ≈ 100 A. 50 V / 100 A = 0.50 Ω. Using IΔn for the RCD instead would give a far looser limit and would not protect against overcurrent faults that do not trip the RCD.',
  },
  {
    id: 'mod3-s4-omission-conditions',
    question:
      'A bathroom is on a TN-C-S supply. The CU has RCBOs (30 mA) on every circuit serving the bathroom. Main bonding to gas and water is in place. The Zs reading on one of the bathroom circuits is 0.18 Ω above the Table 41.1 limit for the device. May supplementary bonding be omitted under Reg 701.415.2?',
    options: [
      'Yes — RCBOs alone satisfy the omission rule.',
      'No — Reg 701.415.2 requires ALL of (d), (e) and (f). Condition (d) requires every final circuit to comply with Reg 411.3.2 disconnection times — the Zs failure breaks that condition. Supplementary bonding remains a requirement until the Zs issue is resolved.',
      'Yes, with a recorded departure for the Zs.',
      'Yes, because RCBOs cover both ADS and additional protection.',
    ],
    correctIndex: 1,
    explanation:
      'The omission rule is conjunctive. Two of three is a fail. Until the Zs is brought within Reg 411.3.2 limits, condition (d) is not met and supplementary bonding remains required. Document the Zs failure as the reason supplementary bonding is being retained, and remediate the Zs issue if the customer wants the supplementary bonding removed later.',
  },
  {
    id: 'mod3-s4-not-extraneous',
    question:
      'You probe between a chrome-plated radiator (served by plastic-bodied TRVs and plastic pipe) and the MET. Insulation tester reads 38 kΩ at 500 V. Per the GN3 / industry threshold, what is the correct action?',
    options: [
      'Bond it — every metal item in a bathroom must be bonded.',
      'Do NOT bond it — 38 kΩ ≥ 22 kΩ threshold means the radiator is not an extraneous-conductive-part. Bonding it would import earth potential into the bathroom and increase risk, not reduce it.',
      'Bond it only on TT supplies.',
      'Re-test using a buzzer.',
    ],
    correctIndex: 1,
    explanation:
      'Part 2 defines an extraneous-conductive-part by its ability to introduce a potential. ≥ 22 kΩ to MET means the radiator is electrically isolated and is not extraneous. Bonding it would actively connect a previously-isolated conductive part to the bonding network — exporting earth potential into the location during a fault. Document the test result on the certificate.',
  },
  {
    id: 'mod3-s4-undersized-bond',
    question:
      'On an EICR you find a 2.5 mm² unsheathed supplementary bonding conductor clipped along a wall. There is no mechanical protection. Reg 544.2.2 applies. Code?',
    options: [
      'C3 — improvement recommended only.',
      'No code — supplementary bonding is informative.',
      'C2 — Reg 544.2.2 requires CSA ≥ 4 mm² where mechanical protection is not provided. 2.5 mm² unprotected is non-compliant and the conductor is liable to mechanical damage that could break the bond. Standard BPG 4 coding for that defect is C2.',
      'C1 — danger present, immediate action.',
    ],
    correctIndex: 2,
    explanation:
      'Reg 544.2.2 sets 4 mm² as the unprotected minimum. 2.5 mm² unprotected is both undersized and physically vulnerable. The danger materialises only under fault, so it is not C1, but the existing arrangement is non-compliant and needs remediation — BPG 4 standard coding is C2.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 415.2.2 sets the acceptance criterion for supplementary bonding. What is the formula and what does each term mean?',
    options: [
      'R ≤ 230/Ia, where Ia is the rated current of the protective device',
      'R ≤ 50/Ia in AC systems, where Ia is the operating current of the protective device — for an RCD that is IΔn, for an overcurrent device the 5 s operating current',
      'R ≤ 0.05 Ω regardless of device',
      'R ≤ Ze/2',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 415.2.2 states R < 50V/Ia in AC systems (R < 120V/Ia in DC). Ia is defined explicitly: for RCDs it is IΔn (the rated residual operating current); for overcurrent devices it is the 5 s operating current read from the time-current curve. The 50 V derives from the conventional touch voltage limit.',
  },
  {
    id: 2,
    question:
      'A bathroom is in a building with a properly executed Reg 411.3.1.2 main protective bonding system. Reg 701.415.2 permits supplementary bonding to be omitted. What three conditions must ALL be met?',
    options: [
      'All circuits have RCBOs, all metalwork is plastic, and the bath is non-conductive',
      '(d) all final circuits comply with Reg 411.3.2 disconnection times, (e) all final circuits have additional protection by a 30 mA RCD per Reg 415.1.1, and (f) all extraneous-conductive-parts of the location are effectively connected to the protective equipotential bonding per Reg 411.3.1.2',
      'Two of the three are sufficient if the third is recorded as a departure',
      'Only conditions (d) and (e) — (f) is informative',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 701.415.2 lists conditions (d), (e) and (f) and says "all of the following conditions are met". Miss any one and supplementary bonding is required. The note adds that effectiveness of the extraneous-conductive-part connection may be assessed using Reg 415.2.2 — i.e. the same R ≤ 50/Ia criterion.',
  },
  {
    id: 3,
    question:
      'You are continuity-testing a supplementary bond between a steel bath and a copper hot pipe. Your low-resistance ohmmeter reads 0.42 Ω. The bond is downstream of a 32 A B-curve MCB protecting the local circuit. What is the verdict?',
    options: [
      'Pass — under 1 Ω is always acceptable',
      'Fail — calculate Ia at 5 s for a 32 A B-curve (≈160 A), so R limit = 50/160 = 0.31 Ω → 0.42 Ω fails. Investigate the joint',
      'Pass — the criterion only applies in medical locations',
      'Fail — supplementary bonding must always read below 0.05 Ω',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 415.2.2: R ≤ 50/Ia. For a 32 A B-curve MCB the 5 s operating current is the magnetic threshold (3–5×In), so Ia ≈ 160 A. 50/160 = 0.31 Ω. A reading of 0.42 Ω exceeds the criterion — the bond does not limit touch voltage to 50 V under fault conditions for that device. Investigate the termination, not the meter.',
  },
  {
    id: 4,
    question:
      'A bathroom has a chrome-plated radiator served by plastic-bodied TRVs and copper pipework that disappears into the wall in plastic conduit before joining a soldered copper run downstream. Is the radiator an extraneous-conductive-part?',
    options: [
      'Yes — anything metallic in the bathroom is extraneous',
      'Not necessarily — by definition an extraneous-conductive-part is liable to introduce a potential, generally Earth potential. Plastic isolation interrupts that path. Test the resistance to MET; if it is high (≥ 22 kΩ at 500 V), the part is not extraneous and does not need bonding',
      'Yes, because it is in a special location',
      'It depends on whether the bathroom has a window',
    ],
    correctAnswer: 1,
    explanation:
      'Part 2 defines an extraneous-conductive-part by what it does — introduces a potential, generally Earth potential, into the installation. The GN3 / industry method is to measure resistance to the MET; the commonly cited threshold is ≥ 22 kΩ at 500 V (giving < 50 V touch voltage with realistic body impedance). If the radiator is genuinely isolated from earth by the plastic break, it is not extraneous. Bonding it would actually import a potential into the bathroom.',
  },
  {
    id: 5,
    question:
      'Reg 415.2.1 lists what supplementary bonding must include. Which option below correctly states the duty?',
    options: [
      'All metal in the room',
      'All simultaneously accessible exposed-conductive-parts of fixed equipment AND extraneous-conductive-parts, including (where practicable) the main metallic reinforcement of constructional reinforced concrete; plus connection to the protective conductors of all equipment including socket-outlets',
      'Only sockets and switches',
      'Only the bath, basin and shower tray',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 415.2.1 is explicit: simultaneously accessible exposed-conductive-parts of fixed equipment AND extraneous-conductive-parts, including reinforced concrete reinforcement where practicable, AND the supplementary bonding system shall be connected to the protective conductors of all equipment including those of socket-outlets. Forgetting the socket-outlet CPC connection is a common defect.',
  },
  {
    id: 6,
    question:
      'You are inspecting a 1990s bathroom. Supplementary bonding is in place between the bath, taps and pipework. The installation is on a TN-S supply with main bonding to the gas and water at the meter. Two of the three Reg 701.415.2 omission conditions are met but the bathroom circuit has no 30 mA RCD. Can you remove the supplementary bonding?',
    options: [
      'Yes — main bonding alone is sufficient',
      'No — Reg 701.415.2 requires ALL three conditions (d), (e) and (f) to be met. Missing (e) means supplementary bonding remains a requirement. Leave it in place and verify it',
      'Only if the customer signs a waiver',
      'Yes, but record a C2 on the EICR',
    ],
    correctAnswer: 1,
    explanation:
      'The omission conditions are conjunctive — all three must be met. Without 30 mA RCD additional protection on the bathroom final circuits (condition e), supplementary bonding stays. Removing it would create a Reg 415.2 non-compliance and exposes you to a clear professional negligence claim if a fault later causes injury.',
  },
  {
    id: 7,
    question:
      'On a periodic inspection you find a supplementary bonding conductor of 2.5 mm² unprotected single (no sheath) clipped along a wall. Reg 544.2.2 limits apply. Code?',
    options: [
      'C3 — improvement recommended',
      'C2 — potentially dangerous. Reg 544.2.2 requires a CSA ≥ 4 mm² where mechanical protection is not provided. 2.5 mm² unprotected is non-compliant and the conductor is liable to mechanical damage',
      'C1 — danger present',
      'No code — not in scope',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 544.2.2: where mechanical protection is not provided, the supplementary bonding conductor connecting an exposed-conductive-part to an extraneous-conductive-part shall have a cross-sectional area not less than 4 mm². 2.5 mm² unprotected is non-compliant and physically vulnerable to damage that could break the bond — a C2 is the standard coding for that situation.',
  },
  {
    id: 8,
    question:
      'GN3 Ch 5 framing for special locations: the supplementary bonding verification is composed of two activities. Which option correctly names them?',
    options: [
      'Visual + Zs measurement',
      'Visual inspection of the bond (presence, route, terminations, CSA, mechanical protection) AND a continuity test by resistance measurement using a low-resistance ohmmeter to confirm a low-resistance bond and acceptance against R ≤ 50/Ia',
      'Insulation resistance + earth electrode test',
      'RCD test + polarity test',
    ],
    correctAnswer: 1,
    explanation:
      'The bond is verified by both inspection and test. The visual confirms the bond exists, is correctly sized, mechanically protected if needed, and lands at the right places. The continuity test by low-resistance ohmmeter confirms the bond is electrically effective. Either alone is insufficient — a present-but-loose bond can fail Reg 415.2.2 silently.',
  },
  {
    id: 9,
    question:
      'In the Reg 415.2.2 calculation, you see two values for Ia depending on the protective device. Why?',
    options: [
      'The values are arbitrary',
      'For an RCD, disconnection happens at the rated residual operating current (IΔn) — typically 30 mA for additional protection. For an overcurrent device, disconnection happens at the magnetic trip current, conventionally taken at 5 s for the supplementary bonding criterion. Different mechanisms, different currents',
      'RCDs have higher Ia values than MCBs',
      'They are interchangeable',
    ],
    correctAnswer: 1,
    explanation:
      'The criterion is touch-voltage based: U = R × Ia. For an RCD the 30 mA rated residual operating current is what disconnects supply, so Ia = IΔn. For overcurrent devices the magnetic trip current at 5 s is used (conservative — gives the highest Ia, hence the tightest R). Reg 415.2.2 makes this explicit in the definition of Ia.',
  },
  {
    id: 10,
    question:
      'You find a kitchen with a metal sink, copper pipework and metal-cased Class I appliances. The kitchen is NOT a special location under Part 7. The customer asks why there is no supplementary bonding. What is the correct, brief professional response?',
    options: [
      'Kitchens always need supplementary bonding',
      'Supplementary bonding is required by Reg 415.2 only where the protective measure of automatic disconnection of supply (ADS) cannot be relied upon to disconnect within the required time, or where Part 7 imposes it. Kitchens outside the bath/shower zones are not a Part 7 special location, and a properly executed main bonding + ADS satisfies basic protection. Bonding the sink is not a default duty',
      'It used to be required but was deleted in 2008',
      'It is required only on TT systems',
    ],
    correctAnswer: 1,
    explanation:
      'Supplementary bonding is not a blanket duty across all kitchens. It is mandated by Reg 415.2 where ADS is unreliable for the disconnection time, or by Part 7 for specified special locations (701, 702, 706, 710, etc.). A kitchen on a properly bonded TN-C-S installation with compliant circuits does not need supplementary bonding. Conflating "metal in the room" with "must be bonded" is a Pre-17th Edition reflex that A4:2026 still does not endorse.',
  },
];

const InspectionTestingModule3Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Supplementary bonding verification | I&T Module 3.4 | Elec-Mate',
    description:
      'Reg 415.2 + Reg 701.415.2 + GN3 Ch 5: how to verify supplementary equipotential bonding by inspection and test, the R ≤ 50/Ia acceptance criterion, when omission is permitted in bath/shower locations, and what to code on an EICR.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4"
            title="Supplementary bonding verification"
            description="Reg 415.2 sets a measurable acceptance criterion — R ≤ 50/Ia — and Reg 701.415.2 carves out the bathroom omission rule. This section is how you verify the bond, judge the reading, and code the result."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 415.2.1 says supplementary bonding shall include all simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts, and shall be connected to the protective conductors of all equipment including socket-outlets.',
              'Reg 415.2.2 sets the acceptance criterion: R ≤ 50/Ia in AC systems, where Ia is the operating current of the protective device — IΔn for an RCD, the 5 s operating current for an overcurrent device. This is the formula your meter reading is judged against.',
              'Reg 701.415.2 permits supplementary bonding in a bath/shower location to be omitted only if all three conditions are met: (d) every final circuit complies with Reg 411.3.2 disconnection, (e) every final circuit has 30 mA RCD additional protection per Reg 415.1.1, and (f) all extraneous-conductive-parts in the location are effectively bonded to the MET via the main protective bonding system per Reg 411.3.1.2.',
              'Verification is an inspection AND a test. Visual confirms presence, route, CSA, mechanical protection and termination. Low-resistance ohmmeter measurement confirms the bond is electrically effective and meets the R ≤ 50/Ia criterion.',
              'Reg 544.2.2: a supplementary bonding conductor without mechanical protection shall have CSA ≥ 4 mm². 2.5 mm² unprotected on a bond is a C2 in periodic inspection — non-compliant and physically vulnerable.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State exactly what Reg 415.2.1 requires of a supplementary bonding system, including the often-forgotten connection to socket-outlet CPCs',
              'Apply the Reg 415.2.2 acceptance criterion R ≤ 50/Ia for any combination of overcurrent device or RCD as the protective device',
              'Decide whether supplementary bonding may be omitted in a bath/shower location under Reg 701.415.2 by checking all three conditions (d), (e) and (f) — and recognise that "two out of three" fails the test',
              'Identify an extraneous-conductive-part correctly using the resistance-to-MET method, and recognise when a metallic part is NOT extraneous',
              'Verify a supplementary bond by inspection and by low-resistance continuity test, and judge the reading against the calculated R ≤ 50/Ia limit',
              'Code supplementary-bonding defects on an EICR using the Best-Practice Guide 4 framing — undersized conductor, missing bond, high-resistance termination, redundant bond on a non-extraneous part',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 415.2.1 — what supplementary bonding must include"
            plainEnglish="Supplementary bonding shall include every simultaneously accessible exposed-conductive-part of fixed equipment AND every extraneous-conductive-part, plus (where practicable) the main metallic reinforcement of reinforced concrete. The bonding system shall also be connected to the protective conductors of every piece of equipment served — including those of socket-outlets."
            onSite="Walk the location with a tape and a torch. Anything you can touch at the same time as another conductive part is in scope. Then check that the bonding loop lands at the CPC of every accessory in the location, not just at the metalwork itself."
          >
            <p>
              Reg 415.2.1 is the duty-stating regulation. It tells you what is in the bonding net.
              The wording &ldquo;simultaneously accessible&rdquo; is the boundary: parts you cannot
              touch at the same time are out of scope. The 2.50 m horizontal-reach yardstick from
              Reg 417.3.1 is a useful default — anything within that distance of an
              exposed-conductive-part is treated as simultaneously accessible.
            </p>
            <p>
              The often-forgotten clause is the last sentence: the bonding system &ldquo;shall be
              connected to the protective conductors of all equipment including those of
              socket-outlets&rdquo;. This is why a bond that links a bath to a copper pipe but
              terminates nowhere near the local circuit CPC is non-compliant — even if the bath and
              the pipe are at the same potential, neither is reliably tied to the earthing system if
              the local CPC is broken.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 415.2.1"
            clause={
              <>
                Supplementary protective equipotential bonding shall include all simultaneously
                accessible exposed-conductive-parts of fixed equipment and
                extraneous-conductive-parts including where practicable the main metallic
                reinforcement of constructional reinforced concrete. The supplementary protective
                equipotential bonding system shall be connected to the protective conductors of all
                equipment including those of socket-outlets.
              </>
            }
            meaning="Three duties in one regulation: (1) bond all simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts in scope, (2) include reinforced concrete reinforcement where practicable, (3) connect the bonding network to every CPC in the location — including the CPC of every socket-outlet."
          />

          <ConceptBlock
            title="Reg 415.2.2 — the measurable acceptance criterion"
            plainEnglish="Reg 415.2.2 turns Reg 415.2.1 into a number you can verify with a meter. The bond must satisfy R ≤ 50/Ia in AC systems (R ≤ 120/Ia in DC). Ia is the operating current of the protective device. For an RCD, Ia = IΔn (typically 30 mA for additional protection). For an overcurrent device, Ia is the 5 s operating current."
            onSite="Calculate Ia from the device protecting the circuit, then divide 50 V by it to get the maximum permitted bond resistance. Compare your low-resistance ohmmeter reading. The 50 V is the conventional touch voltage limit — it is the basis for the entire formula."
          >
            <p>
              The derivation is direct: under fault conditions a current Ia flows through the
              bonding resistance R, lifting the touch voltage by (R × Ia) volts. To keep the touch
              voltage at or below the conventional 50 V limit, R must satisfy R ≤ 50/Ia. The
              criterion is always tighter for an overcurrent device than for an RCD, because the
              overcurrent device&rsquo;s 5 s operating current is much higher than 30 mA. A radial
              protected by a 32 A B-curve MCB has Ia ≈ 160 A and an R limit of 0.31 Ω. The same bond
              on a 30 mA RCD has Ia = 0.030 A and R limit of 1666 Ω — which is why we never argue
              acceptance from the RCD alone.
            </p>
            <p>
              Worked Ia values for common B-curve / C-curve MCBs at 5 s (from time-current curves):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Device</th>
                    <th className="text-center text-white/80 py-2">Ia at 5 s (A)</th>
                    <th className="text-center text-elec-yellow py-2">R ≤ 50/Ia (Ω)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">6 A B-curve MCB</td>
                    <td className="text-center">30</td>
                    <td className="text-center text-elec-yellow">1.67</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">16 A B-curve MCB</td>
                    <td className="text-center">80</td>
                    <td className="text-center text-elec-yellow">0.63</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">20 A B-curve MCB</td>
                    <td className="text-center">100</td>
                    <td className="text-center text-elec-yellow">0.50</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">32 A B-curve MCB</td>
                    <td className="text-center">160</td>
                    <td className="text-center text-elec-yellow">0.31</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">16 A C-curve MCB</td>
                    <td className="text-center">160</td>
                    <td className="text-center text-elec-yellow">0.31</td>
                  </tr>
                  <tr>
                    <td className="py-2">32 A C-curve MCB</td>
                    <td className="text-center">320</td>
                    <td className="text-center text-elec-yellow">0.16</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Memorise the order of magnitude: a domestic 32 A B-curve gives roughly a 0.30 Ω
              ceiling. Any bond reading materially above that, on that circuit, fails Reg 415.2.2
              regardless of how good the joint looks.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 415.2.2"
            clause={
              <>
                The resistance R between simultaneously accessible exposed-conductive-parts and
                extraneous-conductive-parts shall fulfil the following condition:
                <br />
                R ≤ 50V/Ia in AC systems
                <br />
                R ≤ 120V/Ia in DC systems
                <br />
                where Ia is the operating current in amperes (A) of the protective device or: (a)
                for RCDs, IΔn; (b) for overcurrent devices, the 5 s operating current.
              </>
            }
            meaning="The 50 V (AC) and 120 V (DC) constants are the conventional touch voltage limits. Ia is whichever current actually disconnects supply on a fault — IΔn for RCDs, magnetic trip at 5 s for MCBs / fuses. The acceptance reading is judged per circuit, not per location."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The bathroom case — Reg 701.415.2</ContentEyebrow>

          <ConceptBlock
            title="The historical default — supplementary bonding in every bath/shower location"
            plainEnglish="Up to and including the 17th Edition, every location containing a bath or shower had to have supplementary bonding linking metallic pipework, structural metalwork and the CPCs of accessories. The point was to keep touch voltage between any two simultaneously accessible parts at or below 50 V even during a fault."
          >
            <p>
              Reg 701.415.2 still describes the bonding network for the bath/shower location — it
              connects the protective conductor of each circuit supplying Class I and Class II
              equipment to the accessible extraneous-conductive-parts in the room: metallic service
              pipes (water, gas), metallic waste pipes, central heating and air-conditioning pipes,
              and accessible metallic structural parts of the building. Door architraves and window
              frames are not extraneous-conductive-parts unless they are themselves connected to
              metallic structural parts of the building.
            </p>
            <p>
              The bonding may be located inside or outside the room, preferably close to where the
              extraneous-conductive-parts enter the location. That practical positioning matters for
              periodic inspection: the bond is often hidden behind a panel or in an airing cupboard
              adjacent to the bathroom, not under the bath itself.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 701.415.2"
            clause={
              <>
                Local supplementary protective equipotential bonding according to Regulation 415.2
                shall be established connecting together the terminals of the protective conductor
                of each circuit supplying Class I and Class II equipment to the accessible
                extraneous-conductive-parts, within a room containing a bath or shower, including:
                metallic pipes supplying services and metallic waste pipes (for example, water,
                gas); metallic central heating pipes and air conditioning systems; accessible
                metallic structural parts of the building.
                <br />
                <br />
                Where the location containing a bath or shower is in a building with a protective
                equipotential bonding system in accordance with Regulation 411.3.1.2, supplementary
                protective equipotential bonding may be omitted where all of the following
                conditions are met: (d) all final circuits of the location comply with the
                requirements for automatic disconnection according to Regulation 411.3.2; (e) all
                final circuits of the location have additional protection by means of an RCD in
                accordance with Regulation 415.1.1; (f) all extraneous-conductive-parts of the
                location are effectively connected to the protective equipotential bonding according
                to Regulation 411.3.1.2.
              </>
            }
            meaning="Two parts to read in sequence. First, what supplementary bonding includes inside the bath/shower location. Second, the strict three-condition gate for omitting it: every circuit complies with disconnection times, every circuit has 30 mA RCD additional protection, and every extraneous-conductive-part in the location is effectively connected to the MET via the main protective bonding system."
          />

          <ConceptBlock
            title="Reg 701.415.2 omission — three conditions, all required"
            plainEnglish="Conditions (d), (e) and (f) are conjunctive. Miss any one and supplementary bonding stays. Two out of three is not a partial pass."
            onSite="Run the three checks methodically: (d) confirm Zs on every final circuit serving the bathroom is within the Reg 411.3.2 limit. (e) confirm every final circuit has 30 mA RCD additional protection — RCBO, AFDD-RCBO, or upstream RCD. (f) confirm the gas, water and any structural metalwork is bonded back to the MET with continuity to MET tested and recorded."
          >
            <p>
              Each condition has a verification method. Condition (d) is verified by Zs measurement
              + comparison to Table 41.1 disconnection limits (covered in Module 4 of this CPD).
              Condition (e) is verified by inspecting the protective device on every circuit
              entering the location and confirming additional protection by an RCD with IΔn ≤ 30 mA.
              Condition (f) is verified by main protective bonding inspection and continuity test
              back to the MET — and by establishing the resistance-to-MET of the
              extraneous-conductive-part.
            </p>
            <p>
              The note appended to Reg 701.415.2 is important: &ldquo;The effectiveness of the
              connection of extraneous-conductive-parts in the location to the main earthing
              terminal may be assessed, where necessary, by the application of Regulation
              415.2.2.&rdquo; In other words, the same R ≤ 50/Ia formula is used to judge whether
              the extraneous-conductive-part is effectively bonded — it is not a different criterion
              for the omission case.
            </p>
          </ConceptBlock>

          <Scenario
            title="2003-built flat, fully refurbished bathroom — can the supplementary bonding be removed?"
            situation="The flat is on a TN-C-S supply. The CU is recently rewired with RCBOs on every circuit (IΔn = 30 mA). Main bonding is in place to the gas and water at the meter, both 10 mm² conductors continuous to the MET. The bathroom contains a bath, basin, shower over the bath, and a heated towel rail. All copper pipework runs in plastic conduit before joining the soldered run downstream. You are asked whether the supplementary bonds inside the bathroom can be removed during a refit."
            whatToDo="Run Reg 701.415.2 conditions: (d) Zs on every bathroom final circuit measured and within Table 41.1 limits — pass. (e) every final circuit serving the bathroom has 30 mA additional protection via the RCBO — pass. (f) all extraneous-conductive-parts effectively connected to the protective equipotential bonding per Reg 411.3.1.2 — assessed by Reg 415.2.2: continuity test from the local pipework to the MET. Test reads 0.18 Ω; for the 32 A RCBO covering the circuit feeding the bathroom, R limit = 50/160 = 0.31 Ω → pass. All three conditions met. Supplementary bonding may be omitted, but document the verification on the certificate."
            whyItMatters="The omission is conditional on continuing compliance. If a future occupier replaces a bonded copper pipe with a plastic-bodied stop-cock, condition (f) breaks and the omission justification falls. Add a comment on the certificate: 'Supplementary bonding omitted under Reg 701.415.2 — re-assess if main protective bonding scheme is altered.'"
          />

          {/* Bathroom supplementary bonding diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Bathroom supplementary bonding — bond points and the R ≤ 50/Ia continuity test
            </h4>
            <svg
              viewBox="0 0 800 420"
              className="w-full h-auto"
              role="img"
              aria-label="Bathroom supplementary bonding diagram showing bath, basin taps, radiator, copper pipework and accessory CPCs all linked by a common bonding conductor. A low-resistance ohmmeter is shown probing between two simultaneously accessible parts. The pass criterion R ≤ 50/Ia is annotated."
            >
              {/* Room outline */}
              <rect
                x="40"
                y="40"
                width="720"
                height="280"
                rx="10"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
                strokeDasharray="6,3"
              />
              <text x="60" y="62" fill="rgba(255,255,255,0.55)" fontSize="11" fontWeight="bold">
                ROOM CONTAINING A BATH OR SHOWER (701)
              </text>

              {/* Bath */}
              <rect
                x="80"
                y="200"
                width="180"
                height="80"
                rx="8"
                fill="rgba(96,165,250,0.08)"
                stroke="#60A5FA"
                strokeWidth="1.6"
              />
              <text
                x="170"
                y="235"
                textAnchor="middle"
                fill="#60A5FA"
                fontSize="11"
                fontWeight="bold"
              >
                BATH (steel)
              </text>
              <text x="170" y="252" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                exposed/extraneous
              </text>
              <circle cx="100" cy="215" r="4" fill="#FBBF24" />

              {/* Basin / taps */}
              <rect
                x="310"
                y="200"
                width="120"
                height="50"
                rx="6"
                fill="rgba(96,165,250,0.08)"
                stroke="#60A5FA"
                strokeWidth="1.4"
              />
              <text
                x="370"
                y="222"
                textAnchor="middle"
                fill="#60A5FA"
                fontSize="10"
                fontWeight="bold"
              >
                BASIN TAPS
              </text>
              <text x="370" y="237" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                copper pipework
              </text>
              <circle cx="318" cy="207" r="4" fill="#FBBF24" />

              {/* Towel radiator */}
              <rect
                x="470"
                y="100"
                width="80"
                height="160"
                rx="6"
                fill="rgba(248,113,113,0.08)"
                stroke="#F87171"
                strokeWidth="1.4"
              />
              <text
                x="510"
                y="135"
                textAnchor="middle"
                fill="#F87171"
                fontSize="10"
                fontWeight="bold"
              >
                TOWEL
              </text>
              <text
                x="510"
                y="150"
                textAnchor="middle"
                fill="#F87171"
                fontSize="10"
                fontWeight="bold"
              >
                RADIATOR
              </text>
              <text x="510" y="170" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                CH pipework
              </text>
              <circle cx="478" cy="108" r="4" fill="#FBBF24" />

              {/* Socket / accessory CPC */}
              <rect
                x="600"
                y="200"
                width="120"
                height="50"
                rx="6"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="660"
                y="222"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                SHAVER / FCU
              </text>
              <text x="660" y="237" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                CPC of circuit
              </text>
              <circle cx="608" cy="207" r="4" fill="#FBBF24" />

              {/* Bonding loop connecting all four bond points */}
              <path
                d="M100,215 L318,207 L478,108 L608,207"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <text
                x="400"
                y="80"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Supplementary bonding loop (Reg 415.2.1) — connects all bond points + every CPC
              </text>

              {/* Ohmmeter probing bath ↔ taps */}
              <rect
                x="160"
                y="330"
                width="160"
                height="70"
                rx="10"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="240"
                y="354"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                LOW-Ω OHMMETER
              </text>
              <text x="240" y="372" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Probing bath ↔ taps
              </text>
              <text
                x="240"
                y="388"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                Reading: 0.18 Ω
              </text>

              {/* Probe lines */}
              <line
                x1="180"
                y1="330"
                x2="100"
                y2="220"
                stroke="#22C55E"
                strokeWidth="1.6"
                strokeDasharray="4,3"
              />
              <line
                x1="300"
                y1="330"
                x2="318"
                y2="212"
                stroke="#22C55E"
                strokeWidth="1.6"
                strokeDasharray="4,3"
              />

              {/* Acceptance band */}
              <rect
                x="370"
                y="335"
                width="380"
                height="55"
                rx="8"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.3)"
                strokeWidth="1"
              />
              <text x="560" y="356" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Reg 415.2.2 acceptance: R ≤ 50 / Ia
              </text>
              <text
                x="560"
                y="374"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                32 A B-curve MCB → Ia ≈ 160 A → R ≤ 0.31 Ω → 0.18 Ω passes
              </text>
            </svg>
          </div>

          <CommonMistake
            title="Treating the 30 mA RCD as the only Ia value"
            whatHappens="The inspector applies R ≤ 50/Ia using IΔn = 30 mA, gets a generous 1666 Ω limit, and signs off readings of 5 Ω or 10 Ω as compliant. The bond is only effective during a residual-current fault — for an overcurrent fault that does not generate enough imbalance to trip the RCD, the bond is too high and touch voltage exceeds 50 V."
            doInstead="Always use the WORST-CASE Ia for the protective devices in the path. Where both an RCD AND an overcurrent device protect the circuit, use the overcurrent device&rsquo;s 5 s Ia — it gives the tightest R limit. The RCD is a backstop, not the design basis for the bond."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The verification — inspection plus test</ContentEyebrow>

          <ConceptBlock
            title="The visual inspection — what you are confirming"
            plainEnglish="The visual is not a tick-box. Six things to confirm on every supplementary bond: presence, route, CSA, mechanical protection, termination quality, and identification."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Presence.</strong> Each simultaneously accessible exposed-conductive-part
                and extraneous-conductive-part is in the bonding network. Pipes, radiators,
                structural metalwork — eyes-on each one.
              </li>
              <li>
                <strong>Route.</strong> The bonding conductor follows a sensible, accessible route.
                Loops back through inaccessible voids are flagged because they cannot be re-tested
                in the future.
              </li>
              <li>
                <strong>CSA.</strong> The conductor cross-section satisfies Reg 544.2.1 (sheathed)
                or Reg 544.2.2 (unsheathed, 4 mm² minimum). 2.5 mm² unsheathed is a defect.
              </li>
              <li>
                <strong>Mechanical protection.</strong> Where the conductor is in a position liable
                to mechanical damage and is not 4 mm², it shall be sheathed or otherwise protected —
                Reg 544.2 series.
              </li>
              <li>
                <strong>Termination quality.</strong> Earth clamps to BS 951 on round pipework,
                clean metal under the clamp, no paint or insulation lacquer, and the warning label
                &ldquo;Safety Electrical Connection — Do Not Remove&rdquo; per Reg 514.13.1.
              </li>
              <li>
                <strong>Identification.</strong> Green-and-yellow throughout, including any
                continuation through accessory back-boxes.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The continuity test — low-resistance ohmmeter procedure"
            plainEnglish="The test is a Method 1-style continuity measurement between the two simultaneously accessible parts you are interested in. Null the leads. Place one probe on each part. Read the resistance. Compare to R ≤ 50/Ia for the device protecting the circuit."
            onSite="Always probe through the cleanest metal you can reach. Do not measure across a paint film or a chrome-plated surface that may have an insulating layer — scratch through to base metal or use a sharp earth tag clipped behind a fitting."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Isolate any circuit that would energise the location during testing — though the
                continuity test itself is a dead test, working in a wet location demands the supply
                locked off.
              </li>
              <li>
                Null the test leads on the low-resistance ohmmeter. Lead resistance of 0.1–0.3 Ω is
                significant against a typical R limit of 0.31 Ω.
              </li>
              <li>
                Place one probe on the first simultaneously accessible part (e.g. bath rim, on clean
                metal). Place the other probe on the second (e.g. taps, on clean metal).
              </li>
              <li>
                Read the resistance. Stable reading? Record it. Drifting reading? The probe is on a
                surface coating — re-position.
              </li>
              <li>
                Repeat for every pair of simultaneously accessible parts in scope. The bond passes
                if every pair-wise reading satisfies R ≤ 50/Ia for the worst-case Ia in the path.
              </li>
            </ol>
            <p>
              GN3 Ch 5 (special locations) frames the supplementary bonding test exactly this way:
              an inspection AND a low-resistance continuity measurement, with acceptance referred to
              Reg 415.2.2. Either activity alone is insufficient — a present bond can fail
              electrically; a passing reading does not prove correct CSA or mechanical protection.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.2.1"
            clause={
              <>
                The continuity of conductors and connections to exposed-conductive-parts and
                extraneous-conductive-parts, including the main and supplementary bonding, shall be
                verified by a measurement of resistance.
              </>
            }
            meaning="The duty in Reg 643.2.1 is explicit on supplementary bonding — every supplementary bonding conductor is verified by a measurement of resistance, not by buzzer continuity, not by visual presence alone."
          />

          <SectionRule />

          <ContentEyebrow>Identifying extraneous-conductive-parts</ContentEyebrow>

          <ConceptBlock
            title="The resistance-to-MET test — is it really extraneous?"
            plainEnglish="An extraneous-conductive-part, by definition in Part 2, is liable to introduce a potential, generally Earth potential, into the installation. A piece of metal that is electrically isolated from earth is NOT extraneous. The test is a resistance measurement between the part and the MET."
            onSite="Use an insulation tester or low-resistance ohmmeter set on a high range. Probe between the suspect part and a known earth (the MET, or a reliably bonded extraneous-conductive-part)."
          >
            <p>The convention in UK practice — drawn from GN3 Ch 5 and the BSI guidance — is:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>≥ 22 kΩ</strong>: not extraneous. Touch voltage under fault would not exceed
                50 V given conventional human body impedance assumptions. Bonding is not required
                and may even be actively unhelpful — bonding such a part connects an otherwise
                isolated piece of metal into the bonding network, importing potential rather than
                equalising it.
              </li>
              <li>
                <strong>&lt; 22 kΩ</strong>: extraneous. The part is sufficiently coupled to earth
                that a fault elsewhere could raise it above 50 V. Bonding is required.
              </li>
            </ul>
            <p>
              This decision rule resolves the perennial argument about chrome-plated radiators on
              plastic pipework, modern stainless steel sinks with composite waste pipes, and
              suspended metal ceiling grids. The test answers the question definitively per part,
              per location.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 2024 refurbishment with all-plastic pipework — what gets bonded?"
            situation="A bathroom refit replaced all copper pipework with plastic, including the cold feed, hot feed and waste. The towel radiator is fed by plastic-bodied valves through plastic pipe. The bath is a steel-framed unit. There is a metal-cased shaver socket on a SELV transformer. The customer wants to know what supplementary bonds, if any, are needed."
            whatToDo="Test each metallic part to MET with an insulation tester at 500 V. Plastic-fed copper that is electrically isolated will read in the megohms. Where you read ≥ 22 kΩ to MET, the part is not extraneous — no bonding required. The steel bath frame is exposed metalwork but is supplied by no electrical circuit, so it is not an exposed-conductive-part of fixed equipment either; if it tests as not extraneous, no bond. The shaver socket on SELV does not require bonding (SELV exposed-conductive-parts shall not be connected to protective bonding conductors per Reg 414.4.4). Most likely outcome: no supplementary bonding needed in the refurbished location at all. Document each test reading on the certificate."
            whyItMatters="The reflex to bond every piece of metal in a bathroom is from the 16th Edition mindset. A4:2026 (and indeed every edition since 17th) is explicit: bond what is extraneous, bond what is exposed-conductive-and-simultaneously-accessible, and stop. Bonding a chrome-plated radiator that is electrically isolated by plastic pipework actively imports earth potential into a part that previously had none — that increases risk, not reduces it."
          />

          <CommonMistake
            title="Bonding a metallic part that is not extraneous"
            whatHappens="The inspector applies a default 'bond every metal pipe' rule and bonds a chrome radiator served by plastic-bodied TRVs. The radiator was previously isolated from earth (resistance to MET in the megohms). Post-bonding, it sits at MET potential — which during a fault elsewhere on the installation can rise above ground. The bonded radiator now exports the fault potential into the bathroom, where the occupant is wet and barefoot."
            doInstead="Apply the resistance-to-MET test before bonding. Reg 415.2 demands bonding of extraneous-conductive-parts — by definition parts that ARE electrically connected to earth. Parts that test ≥ 22 kΩ to MET are not extraneous and shall not be brought into the bonding network."
          />

          <CommonMistake
            title="Recording a 'passed' bond without checking R against Ia"
            whatHappens="The schedule of test results says '0.45 Ω — pass'. The inspector did not calculate Ia for the protective device. The circuit is on a 32 A B-curve MCB (Ia ≈ 160 A, R limit 0.31 Ω). The reading is actually a fail. The bond does not limit touch voltage. A subsequent claim turns up the schedule and the 'pass' annotation as evidence of a competent verification — and the inspector, not the original installer, becomes the named defendant."
            doInstead="On every bond reading: write the device, write Ia, write R limit, write the measured value, then PASS or FAIL. Four numbers, every time. The Schedule of Test Results form has a Comments column — use it."
          />

          <CommonMistake
            title="Forgetting the socket-outlet CPC connection"
            whatHappens="The supplementary bonding loop runs from bath to taps to radiator pipework — but never connects to the protective conductor of the bathroom shaver socket / FCU. Reg 415.2.1 explicitly requires connection to the protective conductors of all equipment INCLUDING those of socket-outlets. Visually the bond looks compliant; on test the metalwork is at MET potential; but if the local CPC fails, no current path exists from the bonding network back to the source via the CPC, so a fault cannot operate the protective device."
            doInstead="Add a continuity check from each bond point to the local accessory CPC as part of the inspection sequence. The reading should be a fraction of an ohm (CPC + bond conductor). If it is not, you have either a missing connection or a CPC defect."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EICR coding for supplementary bonding defects</ContentEyebrow>

          <ConceptBlock
            title="Coding common defects — Best-Practice Guide 4 framing"
            plainEnglish="EICR codes for supplementary bonding defects follow BPG 4. C1 is rare — supplementary bonding defects are usually C2 (potentially dangerous, requiring action) because the danger materialises only under fault conditions, not in normal service."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-red-300">C1 — Danger present.</strong> A supplementary
                bonding conductor is acting as a current-carrying conductor (e.g. a broken neutral
                returning via the bonding network) → danger present, immediate action.
              </li>
              <li>
                <strong className="text-amber-300">C2 — Potentially dangerous.</strong> Most
                supplementary bonding defects: missing bond on an extraneous-conductive-part, bond
                resistance exceeding R ≤ 50/Ia, undersized conductor (e.g. 2.5 mm² unprotected),
                broken termination, paint between clamp and pipe.
              </li>
              <li>
                <strong className="text-amber-300">C3 — Improvement recommended.</strong> Bond
                exists, terminates correctly, passes R ≤ 50/Ia, but lacks the BS 951 warning label
                (Reg 514.13.1) or is run in a way that complicates future testing without creating
                immediate risk.
              </li>
              <li>
                <strong className="text-blue-300">FI — Further investigation.</strong> Reading is
                marginal, or the protective device&rsquo;s Ia cannot be confirmed (e.g. non-standard
                breaker without published trip curve).
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 415.2.1: bond all simultaneously accessible exposed and extraneous parts, AND connect to every CPC including socket-outlet CPCs.',
              'Reg 415.2.2: R ≤ 50/Ia in AC. For an RCD, Ia = IΔn (30 mA). For an overcurrent device, Ia is the 5 s operating current. Use the WORST-CASE (tightest) Ia in the path.',
              'Reg 701.415.2: bath/shower locations need supplementary bonding UNLESS all three conditions (d), (e) AND (f) are met. Two out of three is a fail.',
              'Verify by inspection AND test. The visual covers presence, CSA, route, mechanical protection, terminations, identification. The test is a low-resistance continuity measurement against the calculated R limit.',
              'Identify extraneous-conductive-parts by resistance to MET. ≥ 22 kΩ → not extraneous, do not bond. < 22 kΩ → extraneous, must bond.',
              'Reg 544.2.2: unsheathed supplementary bonding conductor shall be ≥ 4 mm². 2.5 mm² unprotected is a C2.',
              'Record on the schedule with the device, Ia, R limit and measured value. Four numbers per bond, every time.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Does Reg 415.2.2 apply per circuit, per location, or per pair of simultaneously accessible parts?',
                answer:
                  'Per pair of simultaneously accessible parts, with Ia drawn from the protective device of the circuit involved. The criterion is a touch voltage limit between two parts — so it is intrinsically pair-wise. Where multiple circuits are involved, use the worst-case Ia (largest 5 s operating current = tightest R-limit, which is the conservative engineering choice).',
              },
              {
                question:
                  'Can supplementary bonding ever be used as the sole protective measure if ADS times cannot be met?',
                answer:
                  'Yes — Reg 415.2 is the protective measure called "additional protection by supplementary protective equipotential bonding", and it is one of the formally recognised protective measures in Chapter 41. It is uncommon as a primary measure in modern UK domestic / commercial work, but in industrial situations where disconnection times cannot be met (e.g. some IT systems or motor circuits with long Zs), it remains valid. The verification is the same R ≤ 50/Ia test, just applied with more weight.',
              },
              {
                question:
                  'In a bathroom omitting supplementary bonding under Reg 701.415.2, do I still need to test the main protective bonding back to the gas/water pipes?',
                answer:
                  'Absolutely. Condition (f) of Reg 701.415.2 requires that all extraneous-conductive-parts of the location are effectively connected to the protective equipotential bonding per Reg 411.3.1.2. "Effectively connected" is verified by continuity test from the local pipework back to the MET, with the result judged against R ≤ 50/Ia per the note on Reg 701.415.2. Skipping that test breaks the omission justification.',
              },
              {
                question:
                  'How do I treat a bathroom on a TT system for the Reg 701.415.2 omission rule?',
                answer:
                  'TT systems make condition (d) — disconnection per Reg 411.3.2 — much harder, because Ze is typically large and Zs is dominated by the earth electrode. Most TT installations rely on a 30 mA RCD as the primary disconnection device, which works for condition (e) but does not always satisfy condition (d) for overcurrent fault disconnection. Where condition (d) cannot be demonstrated by Zs measurement, supplementary bonding stays. In practice, most TT bathrooms keep supplementary bonding regardless.',
              },
              {
                question:
                  'Reg 544.2.1 talks about "conductance not less than that of the smaller protective conductor". What does that mean numerically?',
                answer:
                  'Conductance is the inverse of resistance, but for sizing purposes you can read Reg 544.2.1 as a CSA equivalence rule: a sheathed supplementary bonding conductor between two exposed-conductive-parts shall have CSA ≥ the smaller of the two CPCs feeding those parts. So if the bath is fed by a 2.5/1.5 mm² T&E radial and the shaver socket is fed by a 1.5/1.0 mm² lighting radial, the smallest CPC is 1.0 mm² and the bond CSA shall be at least equivalent to 1.0 mm² Cu. In practice, supplementary bonds are usually 4 mm² or 6 mm² because mechanical protection is rarely provided and the unsheathed minimum (Reg 544.2.2) is 4 mm².',
              },
              {
                question:
                  'If I find supplementary bonding in a 1980s bathroom that has since been refurbished with all-plastic pipework, do I leave it in place or remove it?',
                answer:
                  'Test first. If every metallic part in the bathroom now reads ≥ 22 kΩ to MET, none of them is extraneous, and the bonding loop is dangling — connecting nothing of any electrical significance. It is not unsafe per se but it is non-functional. The professional answer: remove it during the refurbishment so the next inspector does not have to investigate why a 4 mm² conductor is clamped to a chrome-plated radiator that has no path to earth. Document the reasoning on the certificate.',
              },
              {
                question:
                  'How does the Reg 415.2.2 criterion change in special locations like swimming pools (702) or medical locations (710)?',
                answer:
                  'Tighter. Reg 702.415.2 imposes supplementary bonding for ALL extraneous-conductive-parts in zones 0, 1 and 2 of swimming pool locations regardless of system earthing. Reg 710.415.2.2 modifies the formula for medical locations: R < 25V/Ia in AC (half of the 50 V limit) reflecting the lower body impedance assumption for sedated patients. Reg 710.415.2.102 imposes an additional absolute ceiling: bonding resistance ≤ 0.2 Ω in group 1 and group 2 medical locations. None of these are negotiable.',
              },
              {
                question:
                  'What about the "simultaneously accessible" rule — how strict is the 2.50 m yardstick?',
                answer:
                  'Reg 417.3.1 and its note state that for the "out of arm\'s reach" rule, two parts are deemed simultaneously accessible if they are not more than 2.50 m apart. That is a useful default but not a hard limit on supplementary bonding scope — Reg 415.2.1 just says "simultaneously accessible". In bathrooms most parts are within reach of each other anyway. The 2.50 m yardstick is your defensible position when arguing whether a remote pipe-run is in scope; in a courtroom, a tape measure and a photograph from the bath rim is hard to argue with.',
              },
            ]}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Supplementary bonding verification — Module 3.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-3/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Low resistance measurement techniques
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule3Section4;
