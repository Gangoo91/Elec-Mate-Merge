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
    id: 'm6s2-pme-outdoor-prohibition',
    question:
      'Reg 722.411.4 — what does it prohibit for outdoor EV charging points on a PME (TN-C-S) supply?',
    options: [
      'Nothing — PME is fine for all installs',
      'A PME earthing facility shall NOT be used as the means of earthing for the protective conductor contact(s) of a charging point located outdoors (or that might reasonably be expected to be used to charge a vehicle outdoors), unless one of the alternative methods listed in Regulation 722.411.4 (b) to (e) is used',
      'PME is prohibited for indoor charging',
      'PME is prohibited only for three-phase installs',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.411.4 is the most safety-critical EV regulation. The PME (Protective Multiple Earthing) facility — standard on most UK TN-C-S supplies — combines neutral and earth in the supply cable. If the supply PEN conductor opens (broken neutral in the cable, supply transformer fault, lightning damage), the property’s earth rises toward L-N voltage. Outdoors, the EV becomes an exposed-conductive-part connected back to that broken supply earth via the car’s body — a fatality hazard. Reg 722.411.4 prohibits PME-on-EV outdoors UNLESS one of the alternative protective methods (b)-(e) is used.',
  },
  {
    id: 'm6s2-pen-in-tn',
    question:
      'Reg 722.312.2.1 — what does it specifically prohibit on an EV charging circuit?',
    options: [
      'Any RCD',
      'A circuit supplying charging equipment for electric vehicles in a TN system shall not include a PEN conductor. The combined PEN (neutral + earth in one conductor) is forbidden on the dedicated EV circuit; separate L, N and PE conductors required throughout',
      'Type 2 connectors',
      'Tethered cables',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.312.2.1 — "A circuit supplying charging equipment for electric vehicles in a TN system shall not include a PEN conductor". Even where the upstream supply is PME (PEN conductor combined), the DEDICATED EV CIRCUIT downstream must use separate L, N and PE conductors. The Henley block / consumer unit becomes the split point: PEN enters, separate N and PE leave to the EV circuit. This is the structural fix in the install — the lost-PEN hazard from §6.2 still has to be addressed by one of the Reg 722.411.4 (b)-(e) alternatives.',
  },
  {
    id: 'm6s2-opdd-function',
    question:
      'OPDD (Open PEN Detection Device) — what does it do?',
    options: [
      'Detects open windows',
      'Continuously monitors L-N voltage and L-N-PE voltage relationships; on detecting an open PEN condition (voltage anomaly indicating the supply earth has been lost), the OPDD opens contactors to disconnect both L and N from the EV charging equipment, isolating the vehicle from the hazardous earth before fault current can flow',
      'Counts how often the wallbox opens',
      'A type of RCD',
    ],
    correctIndex: 1,
    explanation:
      'OPDD = Open PEN Detection Device. A specialised electronic monitor that watches the L-N voltage and the L-N-PE relationship in real time. On a healthy supply, L-N ≈ 230 V and the PE potential stays close to neutral. If the supply PEN opens, the property’s earth potential rises (depending on local loads). The OPDD detects this anomaly within milliseconds and operates internal contactors to disconnect BOTH L and N from the wallbox (and hence from the vehicle). Many UK 2025-26 wallbox brands include OPDD as standard (MyEnergi Zappi, Hypervolt, Andersen, some Wallbox models). Reg 722.411.4(d) is the regulatory basis for the OPDD route.',
  },
  {
    id: 'm6s2-tt-electrode',
    question:
      'A customer’s PME supply means the standard wallbox install would invoke Reg 722.411.4. The installer chooses to install a dedicated TT earth electrode for the EV circuit. What does this involve?',
    options: [
      'Use the PME earth electrode',
      'Drive a dedicated earth electrode at the wallbox location, separate from the PME supply earth. The EV circuit’s PE conductor connects to this dedicated electrode (NOT to the PME earth). RCD protection on the EV circuit ensures ADS works against the TT electrode’s impedance. The PME earth and the TT electrode must be electrically separated to prevent voltage transfer in a fault scenario',
      'Connect the chassis to a buried iron pipe',
      'Use the same earth as the consumer unit',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.411.4(c) — TT system route. A dedicated earth electrode is driven at the wallbox location (typically 1.2-2.4 m earth rod or array of rods to reach the manufacturer-specified Ra value). The EV circuit’s PE wire connects to this electrode and NOT to the PME earth at the consumer unit. RCD protection on the EV circuit ensures ADS works against the TT electrode’s ground resistance. Critical: PME earth and TT electrode must be electrically isolated — typically by separating the EV circuit’s PE conductor from the main installation’s MET. Cert evidence bundle records the electrode location, Ra measurement, and the isolation arrangement.',
  },
];

const quizQuestions = [
  {
    question:
      'A standard UK domestic PME (TN-C-S) supply. Customer wants a 7 kW outdoor wallbox on the driveway. The installer cannot use PME directly per Reg 722.411.4. Which alternative routes are available?',
    options: [
      'No alternative — refuse the job',
      'Reg 722.411.4 lists alternatives (b) to (e): (b) install on a TN-S system (where available — rare in UK 2025-26); (c) install on a TT system with dedicated earth electrode at the wallbox; (d) install using an OPDD (Open PEN Detection Device) — the dominant UK 2025-26 wallbox approach since OPDD is now standard in many wallboxes; (e) another method that provides equivalent protection. (d) is the dominant choice for new domestic installs; (c) for sites where OPDD-equipped kit isn’t practical',
      'Use any RCD',
      'Switch to Mode 2',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 722.411.4 (b)-(e) are the four routes. (b) TN-S is rare in UK 2025-26 (most domestic supplies are TN-C-S / PME). (c) TT with dedicated electrode is a legitimate route — installer drives a rod, configures the EV circuit as TT, separated from the PME at the MET. (d) OPDD route — wallbox includes Open PEN Detection Device that disconnects on lost PEN; this is the dominant UK 2025-26 approach since many wallboxes (MyEnergi Zappi, Hypervolt, Andersen, etc.) include OPDD as standard. (e) is the safety net for novel arrangements with equivalent protection. The OPDD route is preferred because it doesn’t require a separate earth rod (saving install time and customer cost) and provides automatic disconnection on the actual lost-PEN event.',
  },
  {
    question:
      'A site has TN-S supply (the supply cable has a separate earth conductor back to the supply transformer). Why is TN-S not subject to the same PME hazard as TN-C-S?',
    options: [
      'TN-S is the same as TN-C-S',
      'TN-S has a SEPARATE earth conductor from the supply transformer to the property’s MET. The neutral and earth are separate throughout the supply. There is no combined PEN that can open and propagate a lost-PEN fault to the property’s earth. The EV install on a TN-S supply uses the supply earth directly without the Reg 722.411.4 alternative — the hazard the regulation addresses simply doesn’t apply',
      'TN-S has more current',
      'TN-S uses TT',
    ],
    correctAnswer: 1,
    explanation:
      'TN-S = separate neutral and earth from the supply transformer back to the property. No combined PEN conductor exists in the supply cable. The "lost PEN" hazard that Reg 722.411.4 addresses cannot occur — there’s no PEN to lose. EV install on TN-S uses the standard supply earth directly. UK 2025-26 reality: TN-S is rare on modern domestic supplies (most are TN-C-S / PME); some older urban sites and selected new builds retain it. Where TN-S is genuinely present, Reg 722.411.4(b) applies directly. Always confirm with the DNO that the supply is TN-S, not TN-C-S labelled as TN-S — common misidentification at older sites.',
  },
  {
    question:
      'An installer fits a wallbox to a customer’s outdoor garage wall on a TN-C-S (PME) supply WITHOUT invoking any of the Reg 722.411.4 (b)-(e) alternatives — just connects the wallbox PE to the consumer unit PEN-derived earth. What is the EICR code at next inspection?',
    options: [
      'Pass',
      'C1 — DANGER PRESENT. The "lost PEN" fault hazard is real, demonstrable, and immediately puts the customer at risk of a fatal shock if a supply PEN failure occurs. The install must be remediated urgently before the wallbox is energised again. This is the most serious code an EV install can attract',
      'C3 — improvement recommended',
      'C2 — potential danger',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 722.411.4 PME-on-EV outdoor without alternative protection is a Code C1 — danger present. The "lost PEN" failure mode is not theoretical — it has caused UK deaths; supply PEN failures happen (transformer faults, supply cable damage during groundworks, lightning damage). With a vehicle plugged in outdoors and an open PEN, the vehicle body can rise to L-N voltage; anyone touching the vehicle simultaneous with a true earth (wet ground, garden tap) experiences a 230 V shock through their body. The OPDD route (or TT electrode, or TN-S) is the safety case. C1 = immediate remediation; the wallbox is isolated until fixed. EICR for this finding is unsatisfactory.',
  },
  {
    question:
      'OPDD vs dedicated TT electrode — what is the practical UK 2025-26 install decision usually based on?',
    options: [
      'Random choice',
      'OPDD is the dominant UK 2025-26 choice because: (i) the wallbox itself ships with OPDD integrated (no extra kit cost), (ii) no earth rod to drive (saves install time + groundworks cost), (iii) no need to dig up driveway for electrode, (iv) Reg 722.411.4(d) compliance documented via manufacturer DoC. Dedicated TT electrode (route c) appears when the wallbox model doesn’t include OPDD, or where the site has specific earth-electrode constraints making OPDD unsuitable',
      'Cost of the customer’s vehicle',
      'Weather forecast',
    ],
    correctAnswer: 1,
    explanation:
      'OPDD route (Reg 722.411.4(d)) wins on practical grounds for the typical UK 2025-26 domestic install: integrated into the wallbox kit (no separate device to buy), no earth electrode to drive (no groundworks, no Ra measurement), no electrode separation worry. Many UK wallbox brands (MyEnergi Zappi, Hypervolt, Andersen, certain Wallbox / EO Charging models) include OPDD as standard. The TT route (722.411.4(c)) appears when: customer’s preferred wallbox model doesn’t include OPDD; site has very low PEN failure tolerance (e.g. rural area with intermittent PEN issues); or customer prefers the TT electrode for reasons of their own. Cert evidence bundle records the chosen route and the rationale.',
  },
  {
    question:
      'Why does Reg 722.411.4 specifically target OUTDOOR charging points (and those that "might reasonably be expected to be used to charge a vehicle outdoors")?',
    options: [
      'No reason',
      'The lost-PEN hazard requires three conditions: (1) PEN opens upstream; (2) property earth rises toward L-N voltage; (3) someone touches BOTH the vehicle AND a true earth simultaneously. Condition (3) is much more likely outdoors — wet ground, garden tap, neighbouring metalwork, all give a path to true earth that an indoor garage floor (timber, dry concrete) usually does not. Indoor charging points still face the underlying PME risk but the fatality pathway is less probable',
      'The regulation hates outdoor things',
      'Outdoor is dryer',
    ],
    correctAnswer: 1,
    explanation:
      'The "outdoor" focus in Reg 722.411.4 reflects the physical reality that a person touching an EV outdoors is much more likely to ALSO be in contact with true earth — wet driveway, garden tap, surrounding metalwork. The lost-PEN voltage that the vehicle body rises to can drive shock current through that person’s body to true earth. Indoors, the floor is typically isolated from true earth (timber, dry concrete, carpet), so the fatality pathway is less probable — but the underlying hazard still exists, just with lower probability of injury. The regulation’s wording "or that might reasonably be expected to be used to charge a vehicle outdoors" catches the garage wallbox that the customer also uses with a long cable to charge their car on the drive — practical reality outweighs the indoor/outdoor label on the wallbox location.',
  },
  {
    question:
      'A site survey discovers the supply is TN-C-S (PME). The customer has an integral garage with brick walls and concrete floor (no external doors used for vehicle access — separate driveway). The wallbox is in the integral garage. Reg 722.411.4 still applies if the wallbox "might reasonably be expected to be used to charge a vehicle outdoors". How does the installer make this judgement?',
    options: [
      'Always assume indoor only',
      'Survey-stage assessment: does the customer have a cable that reaches the driveway? Does the integral garage have a door that can be left open with the cable extending out to a parked car on the drive? Most installs answer YES to one or both — so Reg 722.411.4 applies and one of (b)-(e) alternatives is needed. When in doubt, treat as outdoor / invoke 722.411.4 — the upside of compliance is small cost; the downside of mis-treatment is C1 finding + fatality risk',
      'Customer’s call',
      'Ask the supply DNO',
    ],
    correctAnswer: 1,
    explanation:
      'The "reasonably be expected to be used to charge a vehicle outdoors" wording catches the common scenario where the wallbox is mounted in an integral garage but the customer’s cable reaches out to the driveway. UK 2025-26 reality: most customers DO charge on the driveway sometimes (visiting cars, multi-car households, second vehicle). The conservative install treats the wallbox as outdoor and invokes Reg 722.411.4 by default. The cost difference between OPDD-equipped wallbox and non-OPDD is negligible in 2025-26 — most reputable wallbox brands include OPDD as standard or in the same SKU. The judgement is: invoke 722.411.4 unless the installer is certain the wallbox cannot be used outdoors (e.g. wallbox in a basement with no possible cable route out — very rare).',
  },
];

const faqs = [
  {
    question: 'What is the actual fatality mechanism in a "lost PEN" event?',
    answer:
      'The PEN conductor in a TN-C-S (PME) supply carries both neutral current and earth current combined. If the PEN opens (broken cable, supply transformer fault, lightning damage), the property side of the break loses its earth reference. Local loads continue to draw current; the L-N voltage redistributes across the un-broken side; the property’s "earth" (now disconnected from the supply earth) drifts toward L-N voltage. Anything connected to that local earth — including a charging EV via its PE wire — rises to ~115-230 V above true earth. Outdoors, where the customer can be simultaneously in contact with the EV and true earth (wet ground, garden tap, metalwork), the path through their body completes the circuit. Shock current is limited only by the customer’s body resistance and the local earth path — typically 50-200 mA, well above the fatal threshold. RCDs upstream may not detect the fault because the local earth is no longer a reference — the RCD is blind to the imbalance. The OPDD route works because the OPDD watches the L-N-PE voltage relationships and disconnects before the customer can experience the hazard.',
  },
  {
    question: 'How does the installer determine the supply earthing arrangement (TN-S vs TN-C-S / PME)?',
    answer:
      'Step 1: visual inspection at the supply intake / Henley block. PME / TN-C-S typically has a label "Protective Multiple Earthing" or "PME" on the supply head. TN-S has a separate earth conductor from the supply head terminating at the MET. Step 2: confirm with the DNO if uncertain — they have records. Step 3: measure with appropriate test equipment per Section 6 of On-Site Guide. Caution: some installations are labelled "TN-S" but are actually TN-C-S that has been mis-recorded; if the customer’s property dates from before ~1990 in an urban area, this misidentification is common. The conservative install assumes TN-C-S unless DNO + visual + test all agree it’s TN-S — invoke Reg 722.411.4 by default.',
  },
  {
    question: 'Why doesn\'t the standard 30 mA RCD on the EV circuit catch the lost-PEN fault?',
    answer:
      'A 30 mA RCD detects current imbalance between L and N — i.e. earth fault current flowing OUT through some path other than the N conductor. In a lost-PEN event, the local L-N current path is still intact; the imbalance the RCD looks for is not produced. The customer takes the shock from the rising local earth through their body to true earth, but the RCD’s measurement point (in the consumer unit) sees no L-N imbalance because the body current isn’t closing back through the supply N. RCD blind. This is why Reg 722.411.4 specifically requires one of (b)-(e) alternatives — RCD protection alone is not the answer. OPDD / TT / TN-S all address the lost-PEN scenario directly.',
  },
  {
    question: 'Can the customer have multiple wallboxes on the same install? How does Reg 722.411.4 scale?',
    answer:
      'Multiple wallboxes — each circuit is separately compliant with Reg 722.411.4. Common UK 2025-26 patterns: (1) two single-phase wallboxes on a multi-EV household — each on its own dedicated final circuit with its own OPDD; (2) two wallboxes sharing a dedicated TT electrode — possible but requires care that the TT electrode’s Ra and the protective device coordination still meet Reg 411 disconnection times for the combined load. (3) DLM (Dynamic Load Management) across two wallboxes — covered in §6.6. Each wallbox is its own Section 722 circuit; the earthing-tree decision applies separately to each.',
  },
  {
    question: 'When does TN-S become a relevant choice (vs PME with OPDD or TT)?',
    answer:
      'TN-S becomes the default when the site is GENUINELY TN-S — supply transformer has a separate earth back to the property. Confirmed via DNO records + visual. Don’t assume TN-S from an old "TN-S" label — many UK supplies labelled TN-S over the decades have actually been TN-C-S since various upgrades. For TRUE TN-S, the EV install proceeds without Reg 722.411.4 alternatives — the underlying PEN hazard doesn’t exist. UK 2025-26 reality: TN-S is rare on modern domestic supplies; most are TN-C-S (PME). When you do find a TN-S site, it’s usually older urban / inner-city or specific new-build estates where the developer specified TN-S — cert evidence bundle should record the supply type confirmation with DNO involvement.',
  },
];

export default function RenewableEnergyModule6Section2() {
  const navigate = useNavigate();

  useSEO({
    title: 'Earthing tree — PME-on-EV, TN-S, TT, OPDD | Renewable Energy 6.2 | Elec-Mate',
    description:
      'The most safety-critical EV install topic: Reg 722.411.4 PME-on-EV outdoor prohibition, Reg 722.312.2.1 no PEN on EV circuit, the four alternative routes (TN-S, TT, OPDD, equivalent), the lost-PEN fatality mechanism, and how the OPDD route dominates UK 2025-26 domestic install.',
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
            eyebrow="Module 6 · Section 2 · BS 7671:2018+A4:2026 · Reg 722.312.2.1 + 722.411.4"
            title="Earthing tree — PME-on-EV, TN-S, TT, OPDD"
            description="The most safety-critical EV install topic. Reg 722.411.4 prohibits PME-on-EV outdoors unless one of four alternatives (TN-S / TT / OPDD / equivalent) is used. Reg 722.312.2.1 forbids PEN on the EV circuit. The lost-PEN fatality mechanism, and why OPDD dominates UK 2025-26 domestic install."
            tone="yellow"
          />

          <TLDR
            points={[
              'Most UK 2025-26 domestic supplies are TN-C-S (PME) — the supply cable combines neutral and earth in a single PEN conductor. PME = Protective Multiple Earthing.',
              'PME has a fatality failure mode: if the supply PEN opens (broken cable, transformer fault, lightning damage), the property’s earth rises toward L-N voltage. Outdoors, where a person can touch both the EV and true earth, this drives shock current through their body.',
              'Reg 722.411.4 — PME earthing facility shall NOT be used as the means of earthing for the protective conductor contact(s) of an outdoor charging point UNLESS one of the alternative methods (b)-(e) is used.',
              'Reg 722.312.2.1 — a circuit supplying EV charging equipment in a TN system shall NOT include a PEN conductor. The dedicated EV circuit uses separate L, N and PE conductors throughout.',
              'The four alternatives in Reg 722.411.4: (b) TN-S supply (rare in UK 2025-26); (c) dedicated TT earth electrode at the wallbox; (d) OPDD — Open PEN Detection Device; (e) other method providing equivalent protection.',
              'OPDD is the dominant UK 2025-26 choice — many wallboxes (MyEnergi Zappi, Hypervolt, Andersen, certain Wallbox / EO Charging models) include OPDD as standard. Continuously monitors L-N-PE relationships; disconnects on lost-PEN.',
              'TT electrode (route c) is a legitimate alternative — drive a dedicated earth rod at the wallbox, separate the EV circuit’s PE from the PME MET. Requires Ra measurement + RCD ADS coordination.',
              'PME-on-EV outdoor without one of (b)-(e) = Code C1 EICR finding (immediate danger). The lost-PEN hazard is demonstrable and has caused UK fatalities — this is not a theoretical regulation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 722.411.4 to identify when the PME-on-EV prohibition is triggered (outdoor charging point, or might reasonably be expected to charge a vehicle outdoors).',
              'Apply Reg 722.312.2.1 to ensure no PEN conductor is present on the dedicated EV circuit — separate L, N, PE throughout.',
              'Choose the right alternative from (b)-(e): TN-S where supply is genuinely TN-S; OPDD for the typical UK 2025-26 domestic install; dedicated TT electrode where OPDD-equipped kit unsuitable.',
              'Verify the supply earthing arrangement via DNO records + visual inspection + appropriate testing — never assume from labels alone.',
              'Explain the lost-PEN fatality mechanism: open PEN → local earth rises toward L-N voltage → outdoor person touching vehicle and true earth completes shock circuit.',
              'Apply OPDD design: confirm the wallbox includes OPDD in its DoC; the OPDD operates internal contactors disconnecting both L and N from the EV equipment on lost-PEN detection.',
              'Apply dedicated TT electrode design: drive electrode, measure Ra, coordinate with RCD for ADS, electrically isolate from PME MET.',
              'Code EICR findings: PME-on-EV outdoor without alternative = Code C1 immediate danger; missing earthing-tree documentation = C3 / FI.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Get the earthing tree right or the customer might pay with their life. This is the section where regulation meets reality.
          </Pullquote>

          <ContentEyebrow>The PME hazard and why outdoor EV makes it acute</ContentEyebrow>

          <ConceptBlock
            title="What PME is and why it has a failure mode"
            plainEnglish="PME (Protective Multiple Earthing) is the supply arrangement on most UK 2025-26 domestic properties. The DNO’s supply cable carries L, N and PE — but the N and PE are COMBINED into a single PEN conductor for most of the supply route, separating into N and PE only at the property’s service head. This is efficient (one less conductor per pole on the network) and the supply transformer’s earth is robust. The hazard appears when that single combined PEN conductor fails."
            onSite="Lost-PEN events are rare per property but not theoretical — UK has documented fatalities from this exact failure mode on outdoor charging EVs. The DNO’s engineering reduces the per-supply probability; Reg 722.411.4 reduces the consequence at the install side."
          >
            <p>The lost-PEN fault sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">1. PEN opens upstream</strong> — broken
                supply cable (groundworks damage, road repair, age-related cable failure),
                supply transformer fault, lightning damage to overhead cable, vandalism.
                Rare but real
              </li>
              <li>
                <strong className="text-white">2. Property loses earth reference</strong>
                — the property side of the open PEN is no longer connected to the
                supply transformer earth. The local loads continue to draw current; the
                neutral can no longer return to the transformer
              </li>
              <li>
                <strong className="text-white">3. Earth potential rises</strong> — the
                property’s "earth" rises toward L-N voltage (typically 50-230 V
                above true earth, depending on local load distribution and any leakage
                paths)
              </li>
              <li>
                <strong className="text-white">4. EV body rises with the local
                  earth</strong> — the EV’s PE wire connects vehicle body to local
                earth, which now sits at hazardous voltage. The vehicle is electrically
                "live" relative to true earth
              </li>
              <li>
                <strong className="text-white">5. Person completes the circuit</strong>
                — outdoors, the customer / passer-by touches the vehicle and is also in
                contact with true earth (wet ground, garden tap, surrounding
                metalwork). Shock current flows through their body, typically 50-200
                mA — well above the fatal threshold
              </li>
              <li>
                <strong className="text-white">RCD blind</strong> — the standard 30 mA
                RCD on the circuit looks for L-N imbalance. The shock-current path
                doesn’t close back through the property’s N — it closes through
                true earth. The RCD sees no imbalance and does not operate
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.411.4 — PME earthing facility prohibition outdoors"
            clause="A PME earthing facility shall not be used as the means of earthing for the protective conductor contact(s) of a charging point located outdoors or that might reasonably be expected to be used to charge a vehicle outdoors unless one of the alternative methods listed in Regulation 722.411.4 (b) to (e) is used."
            meaning="Reg 722.411.4 is the central safety regulation in domestic EV install. The PME-on-EV outdoor prohibition is absolute — PME cannot supply the protective conductor contact of an outdoor charging point unless one of the four alternatives is in place. The wording “might reasonably be expected to be used to charge a vehicle outdoors” catches the common scenario where the wallbox is in an integral garage but the customer’s cable reaches out to the driveway. Conservative practice: invoke 722.411.4 by default unless the installer is certain the wallbox can never be used outdoors. Cert evidence bundle records the chosen alternative + the rationale."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The four alternative routes — (b) TN-S, (c) TT, (d) OPDD, (e) equivalent</ContentEyebrow>

          <Pullquote>
            (d) OPDD dominates UK 2025-26 domestic install. (c) TT is the no-OPDD fallback. (b) TN-S is rare. (e) is novel.
          </Pullquote>

          <ConceptBlock
            title="(b) TN-S supply — where it exists, use it"
            plainEnglish="TN-S = the supply transformer’s neutral and earth are SEPARATE all the way back from the property’s service head to the transformer. No combined PEN conductor exists in the supply. The lost-PEN hazard that Reg 722.411.4 addresses cannot occur on a TN-S supply because there is no PEN to lose."
            onSite="Confirm the supply is TRULY TN-S — DNO records + visual at the service head + appropriate testing. Common UK 2025-26 misidentification: older properties labelled TN-S but actually TN-C-S after various network upgrades. Don’t trust the label alone."
          >
            <p>How TN-S is identified:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Visual at service head</strong> —
                separate earth conductor coming from the supply cable’s armouring
                or a separate dedicated earth wire; no "PME" label
              </li>
              <li>
                <strong className="text-white">DNO confirmation</strong> — the DNO
                holds records of the supply’s earthing arrangement; phone or web
                portal for the local DNO confirms
              </li>
              <li>
                <strong className="text-white">Testing</strong> — appropriate
                supply-side testing per OSG Section 6; confirms the supply earth is
                separate from neutral throughout
              </li>
              <li>
                <strong className="text-white">UK 2025-26 reality</strong> — TN-S is
                rare; most domestic supplies are TN-C-S (PME). When TN-S is
                genuinely present, EV install proceeds with the standard supply
                earth — Reg 722.411.4 doesn’t apply because the PEN hazard
                doesn’t exist
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — records
                the supply type confirmation, ideally with DNO reference
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="(c) TT system — dedicated earth electrode at the wallbox"
            plainEnglish="Route (c) creates a dedicated TT (Terre-Terre / earth-earth) system specifically for the EV circuit. A dedicated earth electrode is driven at the wallbox location; the EV circuit’s PE conductor connects to that electrode, NOT to the PME-derived MET. Separation between PME earth and the TT electrode ensures the lost-PEN hazard cannot propagate to the EV."
            onSite="Drive the rod, measure Ra, configure the EV circuit’s PE wire to the electrode, ensure the MET-to-electrode separation is electrically robust. Reg 411 ADS via the RCD on the EV circuit; the RCD’s 30 mA threshold against the electrode’s Ra determines the disconnection time."
          >
            <p>TT electrode design considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Electrode</strong> — typically 1.2 m
                to 2.4 m earth rod, driven into native soil. Multiple rods in
                parallel where single rod can’t achieve the manufacturer’s
                Ra target. Earth mat as alternative on rocky / paved sites
              </li>
              <li>
                <strong className="text-white">Ra measurement</strong> — measured at
                install + recorded; typical UK 2025-26 target Ra ≤ 200 Ω for a 30
                mA RCD to achieve adequate ADS. Wallbox manufacturer may specify a
                tighter target
              </li>
              <li>
                <strong className="text-white">Separation from PME</strong> — the
                TT electrode must be electrically isolated from the property’s
                MET. Practical separation: at least 1-2 m physical distance from
                buried PME services; the EV circuit’s PE wire does NOT bond
                back to the MET
              </li>
              <li>
                <strong className="text-white">RCD ADS coordination</strong> — the
                EV circuit’s 30 mA RCD must operate within the Reg 411
                disconnection time against the electrode’s Ra. With Ra ≤ 200
                Ω and 30 mA RCD, the touch voltage is limited and ADS is met
              </li>
              <li>
                <strong className="text-white">When to choose</strong> — wallbox
                model doesn’t include OPDD; customer’s preferred kit
                doesn’t support OPDD; site has specific earth-electrode
                advantages (e.g. existing electrode for other circuits); customer
                preference for the visible electrode approach
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="(d) OPDD — Open PEN Detection Device (UK 2025-26 dominant route)"
            plainEnglish="OPDD = electronic monitor inside the wallbox that continuously watches L-N voltage and L-N-PE voltage relationships. On detecting an anomaly indicating an open PEN condition, the OPDD disconnects both L and N from the EV charging equipment within milliseconds — isolating the vehicle before fault current can flow."
            onSite="Many UK 2025-26 wallbox models include OPDD as standard or as a software-enabled feature. Cost-effective compared to TT electrode (no rod, no Ra test, no groundworks). Verify in manufacturer DoC that OPDD conforms to Reg 722.411.4(d) — most reputable brands declare this explicitly."
          >
            <p>OPDD operating principle:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Continuous monitoring</strong> — OPDD
                measures L-N voltage and the L-PE / N-PE voltage relationships
                multiple times per second. Healthy supply: L-N ≈ 230 V, L-PE ≈ 230
                V, N-PE ≈ 0 V
              </li>
              <li>
                <strong className="text-white">Lost-PEN detection</strong> — on open
                PEN, the local "earth" drifts; the N-PE voltage rises (or L-PE
                voltage falls). OPDD detects the anomaly within milliseconds
              </li>
              <li>
                <strong className="text-white">Disconnect both L and N</strong> — on
                detection, the OPDD operates internal contactors to disconnect both
                L and N from the wallbox output. The vehicle is electrically
                isolated from the now-hazardous local earth
              </li>
              <li>
                <strong className="text-white">Auto-reset</strong> — most OPDD
                designs auto-reset when supply integrity is restored; some require
                manual reset. Manufacturer-specific
              </li>
              <li>
                <strong className="text-white">Brand examples (UK 2025-26)</strong> —
                OPDD as standard in MyEnergi Zappi, Hypervolt, Andersen,
                certain Wallbox and EO Charging models. Confirm via manufacturer
                DoC + datasheet
              </li>
              <li>
                <strong className="text-white">Cost advantage over TT</strong> — no
                earth rod to drive (saves £100-300 in groundworks), no Ra test, no
                separate electrode coordination. The OPDD is integrated into the
                wallbox cost
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="(e) — other method providing equivalent protection"
            plainEnglish="Route (e) is the safety-net clause: any other method that provides equivalent protection to the named alternatives. This is for novel arrangements that achieve the safety case via routes not anticipated when the regulation was written."
            onSite="Rarely invoked. Any (e) route would need detailed safety-case documentation explaining how the chosen arrangement provides equivalent protection to TN-S / TT / OPDD. Manufacturer DoC + technical evidence + engineering judgement. Cert evidence bundle records the (e) rationale in depth — this isn’t the route to choose lightly."
          >
            <p>Where (e) might appear:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Novel topologies</strong> — e.g.
                isolating transformer arrangements that don’t fit (c) or (d)
                neatly; specific marina / camping site contexts addressed by
                Section 709
              </li>
              <li>
                <strong className="text-white">Future-proofing</strong> — Reg
                722.411.4(e) is a deliberate safety net for arrangements not
                anticipated in the 2026 text
              </li>
              <li>
                <strong className="text-white">Documentation burden</strong> — (e)
                requires a detailed safety case in the cert evidence bundle. Most
                installers default to (b), (c) or (d) where any fit the site
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="Decision tree for the earthing tree. Top: confirm supply type via DNO + visual + test. If TN-S, use route (b). If TN-C-S (PME): check wallbox model. If wallbox includes OPDD, use route (d). If wallbox doesn’t include OPDD, evaluate dedicated TT electrode for route (c). If neither practical, evaluate (e) with engineering safety case. Annotations: lost-PEN hazard is REAL, RCD is blind to it, OPDD route is preferred for cost and install simplicity."
            filename="renewable/m6s2-earthing-decision-tree.png"
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Cert evidence bundle and EICR coding</ContentEyebrow>

          <ConceptBlock
            title="Cert evidence bundle entries for the earthing tree"
            plainEnglish="The earthing-tree decision is one of the install’s most important documented items. The cert evidence bundle records: the supply type confirmed (TN-S vs TN-C-S / PME) with DNO reference; the route chosen from 722.411.4 (b)-(e); the manufacturer DoC for OPDD if route (d); the Ra measurement and electrode location if route (c); the supply-type test results."
            onSite="Photographs at handover: the service head with supply type label, the wallbox installation showing the chosen earthing arrangement, any earth electrode if route (c). The next inspector at year 5 can reconstruct the earthing-tree decision from the bundle without surveys."
          >
            <p>What to record:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Supply type</strong> — TN-S, TN-C-S
                (PME), or TT — confirmed via DNO + visual + test
              </li>
              <li>
                <strong className="text-white">Chosen alternative</strong> — (b), (c),
                (d) or (e) per Reg 722.411.4
              </li>
              <li>
                <strong className="text-white">Route (d) OPDD evidence</strong> —
                wallbox manufacturer DoC citing OPDD conformity to Reg 722.411.4(d);
                datasheet with OPDD spec
              </li>
              <li>
                <strong className="text-white">Route (c) TT evidence</strong> — earth
                electrode type and location, Ra measurement with date and
                instrument, separation from PME MET, RCD ADS calculation
              </li>
              <li>
                <strong className="text-white">Route (b) TN-S evidence</strong> — DNO
                confirmation of TN-S supply, visual inspection report, supply test
                results
              </li>
              <li>
                <strong className="text-white">Route (e) equivalent evidence</strong>
                — detailed safety case explaining how the arrangement provides
                equivalent protection
              </li>
              <li>
                <strong className="text-white">Photographs</strong> — service head,
                wallbox install, electrode if (c). Reduces future EICR reconstruction
                burden
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.312.2.1 — No PEN on EV circuit"
            clause="A circuit supplying charging equipment for electric vehicles in a TN system shall not include a PEN conductor."
            meaning="Even on a TN-C-S supply where the combined PEN conductor comes into the property, the dedicated EV circuit downstream of the consumer unit cannot include a PEN. Separate L, N and PE conductors are required throughout the EV circuit. The split happens at the CU / Henley block: PEN enters, separate N and PE leave to the EV way. This is the structural fix in the install — the lost-PEN hazard is then addressed separately by one of the Reg 722.411.4 (b)-(e) alternatives. Cert evidence bundle records that the EV circuit uses separate L, N, PE."
          />

          <Scenario
            title="UK suburban customer — PME supply, OPDD-equipped wallbox"
            situation="Midlands semi-detached 2024 build. DNO supply confirmed PME (TN-C-S). Customer wants a 7 kW wallbox on the driveway. Wallbox chosen: MyEnergi Zappi — includes OPDD as standard. Customer signed off the quote without additional earth-rod work."
            whatToDo="Install per Reg 722.411.4(d) OPDD route. Wallbox connection: separate L, N, PE from the dedicated CU way (Reg 722.312.2.1 — no PEN on the EV circuit). Wallbox’s OPDD continuously monitors supply integrity; on lost-PEN, internal contactors disconnect both L and N from the EV equipment. Verify OPDD function during commissioning (manufacturer-defined test sequence; some wallboxes have a "PEN open test" mode that simulates lost-PEN to confirm OPDD operation). Cert evidence bundle: supply type confirmed PME + DNO reference; route (d) OPDD chosen + Zappi DoC citing 722.411.4(d) conformity; commissioning OPDD test result recorded. No earth rod; no electrode Ra measurement. Total earthing-tree work: 30 minutes of paperwork + commissioning verification."
            whyItMatters="The OPDD route is the UK 2025-26 default for good reason: it provides Reg 722.411.4 compliance without the install-time cost of a TT electrode. Most reputable wallbox brands include OPDD; customers don’t need to choose a more expensive electrode-based install. Cert evidence bundle is lean: DoC + commissioning test + photographs."
          />

          <Scenario
            title="Rural customer — PME supply, wallbox model without OPDD"
            situation="Rural customer with PME supply. Customer wants a specific older wallbox model (still available but no OPDD). The installer has to invoke route (c) dedicated TT electrode instead."
            whatToDo="Install per Reg 722.411.4(c) TT electrode route. Drive a 1.2 m earth rod at the wallbox location (rural site, native soil, single rod usually achieves the target Ra). Measure Ra: 145 Ω with the manufacturer’s preferred test method (4-point fall-of-potential or 3-point as appropriate). Configure the EV circuit’s PE to the dedicated electrode, NOT bonded to the MET. Verify RCD ADS: 30 mA RCD against 145 Ω Ra gives touch voltage ≈ 4.4 V well below the 50 V touch limit; disconnection time well within Reg 411 limits. Cert evidence bundle: supply type confirmed PME + DNO reference; route (c) TT chosen + electrode location + Ra 145 Ω + RCD ADS calculation + photographs of electrode and wallbox PE wiring. Total earthing-tree work: 90 minutes including rod-driving, Ra measurement, paperwork."
            whyItMatters="Route (c) is the no-OPDD fallback. Slightly more install time and cost than OPDD route, but technically equivalent in safety case. Customer choice of older wallbox model is respected; cert evidence bundle records the rationale (route c chosen because wallbox model doesn’t include OPDD). Some customers prefer the visible electrode because they understand it; UK 2025-26 install practice respects this preference where it doesn’t add risk."
          />

          <CommonMistake
            title="Connecting the EV wallbox PE to the consumer unit’s PME-derived earth without invoking 722.411.4 alternatives"
            whatHappens="Installer treats the EV install as a standard 32 A circuit — wires L, N, PE from the consumer unit’s standard terminals to the wallbox’s standard terminals. The wallbox’s PE is now connected to the PME-derived earth. Customer drives car onto the driveway and plugs in. Six months later, a JCB on the street damages the PEN conductor during groundworks. The PEN opens. The customer’s "earth" rises to 180 V. The customer walks across the wet driveway to disconnect their car; one hand on the door handle, other foot on the puddle to the garden tap. Shock current flows through the customer’s body — fatal."
            doInstead="Invoke Reg 722.411.4 by default for any UK 2025-26 outdoor or possibly-outdoor wallbox install. Choose one of (b)-(e). Default (d) OPDD route is the cheapest and fastest where the wallbox supports it. Default (c) TT electrode route where the wallbox doesn’t support OPDD. Never connect the EV wallbox PE to PME-derived earth without one of the alternatives — this is a Code C1 EICR finding and a documented UK fatality mechanism. Cert evidence bundle is the legal record that the install met the regulation."
          />

          <CommonMistake
            title="Assuming the supply is TN-S because the older property label says TN-S"
            whatHappens="Pre-1990 urban property has a "TN-S" label at the supply head — the install team takes this at face value and proceeds with the EV install on the assumption that Reg 722.411.4 doesn’t apply (because TN-S has no PEN). In reality, the supply was upgraded to TN-C-S (PME) 15 years ago without the label being changed. The customer is left with a Reg 722.411.4 non-compliant install."
            doInstead="Don’t trust supply-head labels alone on older properties. Confirm via DNO records (phone or web portal) AND visual inspection of the actual supply head AND appropriate testing per OSG Section 6. UK 2025-26 reality: many older urban supplies labelled TN-S were actually upgraded to TN-C-S over time without label changes. Conservative install assumes TN-C-S unless all three confirmations agree TN-S. Cert evidence bundle records the supply type confirmation from each source — multiple sources of agreement reduce future EICR uncertainty."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Most UK 2025-26 domestic supplies are TN-C-S (PME). The combined PEN conductor has a failure mode: if the PEN opens, the property’s earth rises toward L-N voltage.',
              'Lost-PEN failure mode is real and has caused UK fatalities — outdoor EV charging puts the customer at risk of completing a fatal shock circuit through the vehicle to true earth.',
              'Reg 722.411.4 prohibits PME-on-EV for outdoor charging points (or those reasonably expected to be used outdoors) UNLESS one of alternatives (b)-(e) is used.',
              'Reg 722.312.2.1 prohibits PEN conductor on the dedicated EV circuit — separate L, N, PE throughout.',
              'Standard 30 mA RCD is BLIND to the lost-PEN fault — the imbalance the RCD looks for is not produced. RCD protection alone is NOT a Reg 722.411.4 alternative.',
              'Four alternatives in 722.411.4: (b) TN-S supply (rare); (c) dedicated TT electrode + Ra ≤ 200 Ω + RCD ADS; (d) OPDD — Open PEN Detection Device (dominant UK 2025-26 choice); (e) other method with equivalent protection.',
              'OPDD continuously monitors L-N-PE voltage relationships; disconnects both L and N within milliseconds of lost-PEN detection. Many UK wallboxes (MyEnergi Zappi, Hypervolt, Andersen, others) include OPDD as standard.',
              'TT electrode (route c) drives a dedicated earth rod at the wallbox; EV circuit PE connects to the electrode NOT to the PME MET; electrode separation from PME ensures the lost-PEN hazard cannot propagate.',
              'PME-on-EV outdoor without one of (b)-(e) = Code C1 EICR finding — immediate danger present, remediation urgent, install isolated until fixed.',
              'Confirm supply type via DNO records + visual + appropriate testing. Don’t trust labels alone on older properties — common UK 2025-26 misidentification of TN-C-S as TN-S on labels that were never updated after network upgrades.',
              'Cert evidence bundle records: supply type confirmation, chosen Reg 722.411.4 alternative, manufacturer DoC (route d) or electrode Ra (route c), commissioning OPDD test result, photographs.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-6-section-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 722 & the Mode 1–4 landscape
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-6-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 RCD architecture & RDC-DD
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
