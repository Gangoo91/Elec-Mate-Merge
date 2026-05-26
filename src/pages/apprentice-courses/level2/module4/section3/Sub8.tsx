/**
 * Module 4 · Section 3 · Sub 8 — Wiring system selection deep dive
 * Synthesis / supplementary Sub.
 *
 * T&E vs SWA vs MICC vs FP vs LSF/LSZH. Decision matrix by environment, fire
 * risk, mechanical risk, route type. A4:2026 escape-route cable selection
 * (Reg 422.2 + 422.3). Worked example: lighting circuit serving the escape
 * stairwell of a 6-storey HMO.
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
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Wiring system selection deep dive (3.8) | Level 2 Module 4.3.8 | Elec-Mate';
const DESCRIPTION =
  'T&E vs SWA vs MICC vs FP vs LSF/LSZH. Selection by environment, fire risk, mechanical risk, route type. A4:2026 escape-route cable selection. Worked example on a 6-storey HMO escape stairwell.';

const checks = [
  {
    id: 'escape-route-cable',
    question:
      'A new lighting circuit feeds an emergency luminaire on the escape stairwell of a 4-storey block of flats. The cable type required by BS 7671 A4:2026 is:',
    options: [
      'Verify that a voltage indicator/two-pole tester is functioning correctly before and after testing for dead, without exposing the user to a live source',
      'Platform height is the height of the working platform; working height is typically platform height plus approximately 2 metres (average reach)',
      'A fire-resistant cable (FP200, FP400, MICC) classified to BS EN 50200 (PH30/PH60/PH120 depending on duration), with non-combustible supports.',
      'Regularly, and whenever there is a significant change in the work activity, equipment, or following an incident',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Reg 422.3 (introduced/strengthened in A4:2026) requires fire-resistant cables on circuits feeding emergency lighting and fire-detection equipment serving escape routes. The cable must continue to function for the rated period (PH30 = 30 minutes minimum, PH60 / PH90 / PH120 for longer-duration requirements). FP200 and FP400 are the modern choice; MICC ("Pyro") is the heritage choice. Standard PVC cables fail within minutes in a fire and would not maintain the emergency-lighting circuit during evacuation.',
  },
  {
    id: 'underground-cable',
    question:
      'A 3-phase sub-main runs underground from a meter cabinet to an outbuilding 35 m away. Direct-buried installation. The right cable choice is:',
    options: [
      'Specific questions: which lights, when did it start, is it constant or intermittent, does it happen at particular times, have any other electrical issues been noticed nearby?',
      'An injury that results in the worker being incapacitated for more than 7 consecutive days, not counting the day of the injury',
      'Steel-Wire-Armoured (SWA) cable, direct buried with sand bedding, cable tile and warning tape per BS 7671 522.8 / 522.6 and IET guidance.',
      'Repeat support calls, warranty disputes, and a Building Control or scheme audit failure if certs are missing',
    ],
    correctIndex: 2,
    explanation:
      'SWA is the correct choice for direct-buried installation. The steel armour provides mechanical protection from spades, diggers, ground movement and rodents. Standard practice is sand bed (50 mm) under the cable, sand cover (50 mm) above, then cable tile, then warning tape ~150 mm above the tile, then backfill. Depth ≥600 mm typically (deeper for vehicular crossings). PVC T&E direct buried is a non-starter — no mechanical protection.',
  },
  {
    id: 'lszh-where',
    question:
      'A new cable installation in a school is required to be Low Smoke Zero Halogen (LSZH). The reason is:',
    options: [
      'In a fire, LSZH cables produce dramatically less toxic smoke and no halogen acid gases — critical in densely-populated public buildings where smoke inhalation during evacuation is a major risk.',
      'Providing scalable data storage, analytics, machine learning, dashboarding, and remote access for industrial data collected from edge devices',
      'A business name that\\\\\\\\\\\\\\\'s different from your personal name (sole trader) or registered company name (limited company). Allows trading under a more professional or memorable brand. Must appear on business documents alongside your legal name.',
      'Recognise HRRB sites; understand the gateway regime and PAP role; verify CPP integrates with golden thread; produce digital cert records (not paper-only); cooperate with PAP / AP requests for information.',
    ],
    correctIndex: 0,
    explanation:
      'LSZH cables are specified for buildings where smoke from a fire would seriously affect evacuation — schools, hospitals, transport hubs, public buildings, theatres, large commercial. Standard PVC cables release dense black smoke and hydrogen chloride gas when burned; LSZH cables release minimal smoke and no acid gases. The decision is driven by the building&rsquo;s fire risk assessment and BS 9999 / BS 5266 / BS 5839 — not by cost (LSZH is typically 30-50 % more than PVC).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'PVC twin and earth (T&E, 6242Y) is the most common UK domestic cable. Its primary limitations are:',
    options: [
      'Because IR pushes 500 V DC into the circuit; if the CPC is not continuous, the test current may take an unintended path and the IR result is meaningless.',
      'No mechanical protection (vulnerable to chasing in masonry without capping); standard PVC sheath fails in fire within minutes; not fire-resistant for emergency / escape route circuits.',
      'C2 — potentially dangerous. The RCD provides additional protection but the high electrode resistance compromises the disconnection-of-supply protection. The combination is unreliable in fault conditions.',
      'The instrument may be used only for non-critical measurements or reference purposes because it does not meet the full accuracy specification',
    ],
    correctAnswer: 1,
    explanation:
      'T&E is cheap, easy to terminate and ideal for concealed runs in domestic walls, lofts and floors. Limitations: no inherent mechanical protection (needs capping in masonry chases, conduit in industrial environments); standard PVC sheath fails in fire within ~10 minutes; not classified as fire-resistant so cannot be used for emergency lighting or fire alarm circuits in escape routes. For those uses, MICC, FP200, FP400 or other fire-resistant alternatives are required.',
  },
  {
    id: 2,
    question:
      'Steel-Wire-Armoured (SWA) cable comprises:',
    options: [
      'An SWA stripping tool or rotary cable cutter designed for armoured cable, which cuts through the armour wires without damaging the inner insulation',
      'Set to the temperature recommended by the joint kit manufacturer and applied evenly, working from the centre outward to expel air and moisture',
      'Inner conductors with insulation, an inner PVC sheath, a layer of galvanised steel wire armour, and an outer PVC (or LSZH) sheath. Available in 2, 3, 4 or 5 cores from 1.5 mm² up to 400 mm² CSA.',
      'Cutting the mica insulation between commutator segments to below the copper surface to prevent the mica from protruding as the copper wears',
    ],
    correctAnswer: 2,
    explanation:
      'SWA construction: stranded copper conductors (or aluminium for very large CSAs), individual conductor insulation (XLPE for thermosetting / 90 °C, or PVC for 70 °C), inner sheath / bedding layer, galvanised steel wire armour (the SWA), outer sheath PVC or LSZH. The armour acts as the CPC AND mechanical protection. Used for sub-mains, distribution, direct burial, suspension cable runs.',
  },
  {
    id: 3,
    question:
      'MICC (Mineral Insulated Copper Cable, "Pyro") consists of:',
    options: [
      'Create a private, safe environment, express what you have observed factually, reassure confidentiality within safety limits, and leave the door open for future conversations',
      'EIC, schedule of test results, schedule of inspections, manufacturer instructions for installed kit (CU, AFDDs, smoke alarms, EV charger if any), and user instructions',
      'Ensure that temporary works (such as formwork, falsework, and temporary propping) are designed, erected, and dismantled safely, with appropriate checks and supervision',
      'A solid copper sheath enclosing copper conductors separated by compressed magnesium oxide mineral powder. Naturally fire-resistant (operates at ~1000 °C briefly), waterproof when terminated with proper glands.',
    ],
    correctAnswer: 3,
    explanation:
      'MICC has a copper outer sheath and copper conductors separated by tightly-compressed magnesium oxide (MgO) powder. The mineral insulation is naturally fire-resistant — MICC can operate at ~1000 °C briefly without circuit failure. Used for the highest-integrity fire-safety circuits (oil rig fire pumps, nuclear plant essential systems, heritage fire alarm). Modern equivalents (FP200, FP400) achieve similar fire performance with easier termination and lower cost.',
  },
  {
    id: 4,
    question:
      'FP200 and FP400 are:',
    options: [
      'Modern fire-resistant cables — silicone-rubber or insulating-tape construction with a stainless-steel screen. Easier to install than MICC, lower cost, BS 5839 compliant for fire alarm and emergency lighting circuits.',
      'Stays outside the space; maintains communication with entrant; monitors entrant condition; initiates rescue if entrant becomes unresponsive or atmosphere deteriorates; cannot enter the space themselves (risk of becoming second casualty).',
      'A single conductor only (line or neutral) — clamping around both line and neutral together would give a reading of approximately zero because the currents flow in opposite directions and their magnetic fields cancel',
      'Because they contain decomposing organic matter producing toxic gases such as hydrogen sulphide, methane, and carbon dioxide, with oxygen depletion and risk of sudden flooding',
    ],
    correctAnswer: 0,
    explanation:
      'FP200 (Prysmian, formerly Pirelli) and FP400 (higher fire-rating variant) use a stainless-steel screen wrap over silicone-rubber or insulating-tape insulated conductors. The insulation chars in a fire but maintains mechanical and electrical integrity for the rated time (PH30, PH60, PH90, PH120 per BS EN 50200). Easier and faster to install than MICC, with PVC-style flexibility. The standard modern choice for fire alarm (BS 5839) and emergency lighting circuits in commercial buildings.',
  },
  {
    id: 5,
    question:
      'A sub-main runs in a service riser shared with sprinkler and fire-alarm services in a hospital. The cable specification is most likely:',
    options: [
      'To prove the cpc has a low-resistance path so that under fault the disconnection device operates within the required time (and to prove main and supplementary bonding continuity)',
      'LSZH-sheathed XLPE-insulated SWA — combines mechanical protection (SWA), thermal performance (XLPE 90 °C operation), and low-smoke-zero-halogen sheath for the public-building environment.',
      'The energy efficiency rating of a building on a scale from A (most efficient) to G (least efficient), along with recommendations for improvement',
      'You must maintain unwavering faith that you will prevail in the end, AND at the same time, confront the most brutal facts of your current reality — holding both truths simultaneously',
    ],
    correctAnswer: 1,
    explanation:
      'Hospital and public-building service risers commonly specify LSZH-sheathed XLPE/SWA — the combination of mechanical robustness (steel armour), thermal headroom (XLPE handles 90 °C continuous), and low-toxic-smoke / zero-halogen sheathing addresses the environment, the loads, AND the smoke-toxicity concern in densely-occupied buildings. Standard PVC sheath in a hospital fire would generate dense toxic smoke that would prevent safe evacuation.',
  },
  {
    id: 6,
    question:
      'BS 7671 A4:2026 Reg 422.3 introduced new requirements for cables on:',
    options: [
      'Identification of foreseeable emergencies, procedures for spill containment, fire response, evacuation routes, communication systems, and roles/responsibilities',
      'Within escape routes, under stairs in a single-staircase building, in habitable rooms (where avoidable), in roof spaces (where heat/cold extremes apply) or close to gas meters',
      'Circuits supplying emergency lighting, fire detection and other safety services on escape routes — fire-resistant cable + non-combustible supports for the rated duration.',
      'Consider replacing the oversized motors with correctly sized alternatives, or fitting VSDs to match motor speed to the actual load requirement, reducing energy consumption and improving the power factor',
    ],
    correctAnswer: 2,
    explanation:
      'A4:2026 introduced separate requirements for escape routes (deleting the old BD2/BD3/BD4 condition references). Reg 422.3 covers cable selection in escape routes — fire-resistant cable, non-combustible supports, both for the duration required by the building&rsquo;s fire safety strategy (typically 30, 60, 90 or 120 minutes for a building with phased evacuation). This is a significant tightening from previous editions and changes the cable take-off on every commercial / HMO / public-building project.',
  },
  {
    id: 7,
    question:
      'A 4-bedroom domestic dwelling. The lighting circuit serves the upstairs bedrooms via T&E in the floor void. The supply to a smoke alarm chain (BS 5839-6) on the same lighting circuit must be:',
    options: [
      'Investigate the task, review the risk assessment, consider the symptoms as a potential early sign of a WRULD, and refer the worker for occupational health assessment',
      'Maximise £4,000 Lifetime ISA (if under 40 and saving for first home), contribute £10,000 to pension (gaining higher-rate tax relief), keep £1,000 accessible',
      'For TN: measured Zs at every furthest point gives a fault current (U0/Zs) that operates the OCPD within the required disconnection time per Reg 411.3.2; OR a 30mA RCD is fitted',
      'A separate fire-resistant cable (or supported by non-combustible support throughout the route, depending on BS 5839-6 grade requirements).',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5839-6 (domestic and similar fire detection) sets cable requirements for the smoke alarm chain. For Grade D systems (mains-powered with backup) the cable can typically be standard PVC IF the support method is non-combustible throughout (Reg 521.10.202 from A4:2026). For higher Grade C systems (in HMOs and larger dwellings) fire-resistant cable may be required. Always check the building&rsquo;s grade requirement against BS 5839-6 before specifying.',
  },
  {
    id: 8,
    question:
      'Cable selection for an outdoor garden lighting installation (running across a lawn, exposed to UV and rain) is most likely:',
    options: [
      'SWA, possibly LSZH-sheathed, for mechanical protection and UV resistance, with IP-rated terminations and weatherproof glanding.',
      'A covered walkway (fan or tunnel) must be provided to protect pedestrians from falling objects',
      'Refer to the spec/drawings/BS 7671 — the standards arbitrate; if still unclear, raise an RFI to the designer',
      'Forced ventilation should be maintained or increased to improve the atmosphere for both the casualty and the rescue team',
    ],
    correctAnswer: 0,
    explanation:
      'Outdoor garden installations need mechanical protection (lawnmowers, garden tools, frost heave) and UV-resistant outer sheath. SWA is the standard choice — direct-buried or surface-clipped to a fence with stainless P-clips. LSZH sheath for premises near densely-occupied buildings. Glands and terminations IP66 minimum. Standard PVC T&E will degrade in sunlight within months and has no mechanical protection.',
  },
];

const faqs = [
  {
    question: 'When do I have to use fire-resistant cable, in plain English?',
    answer:
      'Three main scenarios. (1) Emergency lighting circuits — luminaires that must keep working during a fire to illuminate escape routes (BS 5266). (2) Fire detection and alarm circuits — smoke detectors, manual call points, sounders, control panel feeds (BS 5839-1 commercial, BS 5839-6 domestic). (3) Other safety systems that must operate during a fire — fire pumps, smoke ventilation, fire-fighting lifts, voice alarms in transport hubs. The cable must be classified PH30 / PH60 / PH90 / PH120 per BS EN 50200 for the duration the system needs to function during the fire.',
  },
  {
    question: 'FP200 vs FP400 — what is the difference?',
    answer:
      'Both are Prysmian (formerly Pirelli) fire-resistant cable ranges. FP200 — the original modern fire-resistant cable, PH30 / PH60 classified, used for the majority of commercial fire alarm and emergency lighting circuits. FP400 — newer / enhanced range with higher fire performance, larger CSAs available, used for sub-main fire-resistant feeds. There are now many other manufacturers (Draka, Nexans, Huber+Suhner) with equivalent ranges (Firetuf, FireSense, etc.). Selection depends on the project specification and the circuit duration requirement.',
  },
  {
    question: 'Why is MICC ("Pyro") still used at all if FP200 is easier?',
    answer:
      'Three reasons MICC persists. (1) Heritage installations — there is a huge installed base of MICC in older commercial buildings, and replacements / extensions are sometimes specified to match. (2) Highest fire-performance applications — MICC handles ~1000 °C briefly, exceeding most modern alternatives. Critical infrastructure (oil rigs, nuclear plant) sometimes specifies it for that reason. (3) Specific environments where MICC&rsquo;s naturally-waterproof construction is an advantage. For new commercial fire-alarm / emergency-lighting work, FP200 / FP400 has largely replaced MICC due to lower install cost.',
  },
  {
    question: 'Can I use SWA in domestic installations?',
    answer:
      'Yes, and it is increasingly common. EV charger feeds from the CU to an external charger position are often 10 or 16 mm² SWA — direct buried or clipped to the wall. Garden buildings (sheds, summer-houses, garden offices) typically fed by SWA from the house CU. Sub-mains within larger domestic properties (annexe to main house, garage with workshop) often use SWA. SWA is overkill for internal final-circuit work — T&E is faster and easier — but it is the right cable wherever you need mechanical protection and the install would otherwise need conduit.',
  },
  {
    question: 'What about XLPE — when would I specify it?',
    answer:
      'XLPE (cross-linked polyethylene) is the conductor insulation used in most modern SWA. It allows 90 °C continuous operation (vs 70 °C for PVC), giving higher current ratings for the same CSA. Standard practice on commercial / industrial sub-mains. The outer sheath can be PVC or LSZH depending on the building. For high-load circuits (motor feeds, heavy-machinery distribution), XLPE-insulated SWA gives noticeable headroom over PVC equivalents. The trade-off — XLPE is harder to terminate (stiffer, less easy to flex into glands).',
  },
  {
    question: 'How do I know what cable spec the design requires?',
    answer:
      'Read the cable schedule (Sub 1) carefully. Standard rows specify CSA and cable type. For fire-rated cables the spec usually names the type and the BS classification (e.g. "FP200 Gold 1.5 mm² 2-core, PH30") — both must match. For LSZH the spec may name "LSZH sheath" as a column, or use a manufacturer part number that implies it. When in doubt — RFI to the designer. Substituting a PVC cable on an emergency lighting circuit is a fire-safety failure that may be detected only at periodic inspection or, worse, at the next fire.',
  },
];

export default function Sub8() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 8"
            title="Wiring system selection deep dive"
            description="T&E vs SWA vs MICC vs FP vs LSZH. The cable family decision matrix — by environment, fire risk, mechanical risk, route type. A4:2026 escape-route cable selection (Reg 422.2 + 422.3). The supplementary Sub that covers what a cable schedule abbreviates."
            tone="emerald"
          />

          <TLDR
            points={[
              'Cable selection is a four-factor decision — environment (indoor / outdoor / buried / hot), mechanical protection needed, fire-safety classification needed, sheath toxicity for the building type.',
              'T&E = domestic concealed; SWA = mechanical protection + sub-main + buried; MICC = highest fire performance (heritage); FP200/FP400 = modern fire-resistant; LSZH = public buildings where smoke matters.',
              'A4:2026 Reg 422.2 + 422.3 introduced new requirements for cables on escape routes — fire-resistant cable + non-combustible supports for the rated duration.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Supplementary content — extends LO3 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding of cable family selection by environment, fire risk, mechanical risk and sheath-toxicity requirements.',
              'Identify the strengths and limitations of PVC T&E, PVC singles, SWA, MICC, FP200/FP400, XLPE, LSZH variants and other modern fire-resistant cable families.',
              'Apply the BS 7671 A4:2026 fire-resistant cable requirements (Reg 422.2 + 422.3) on escape routes and other safety-critical circuits.',
              'Apply BS 5839-1 / BS 5839-6 cable requirements for fire detection and alarm systems in commercial and domestic premises.',
              'Specify the right cable for direct-burial, outdoor, hot-environment, public-building and high-mechanical-risk installations.',
              'Read a cable schedule and identify when a substitution would be acceptable, when it would not, and when an RFI is required.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The cable family map</ContentEyebrow>

          <ConceptBlock
            title="Five families, five use cases"
            plainEnglish="Most UK installation work uses one of five cable families. PVC twin-and-earth for concealed domestic work. PVC singles in conduit for industrial / commercial protected runs. Steel-Wire-Armoured for sub-mains, buried and mechanical-risk routes. Mineral-insulated copper (MICC / Pyro) and modern fire-performance cables (FP200, FP400) for fire-safety circuits. LSZH variants for public-building applications where smoke toxicity matters. Each family has a clear use case; using the wrong one is either a regulation breach or a future failure."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PVC twin-and-earth (6242Y, 6243Y, 6492X)</strong> — Two or three
                insulated copper conductors plus a bare CPC, all under a single PVC outer
                sheath. The standard for domestic / light commercial concealed wiring,
                clipped direct, in trunking, in conduit. Cheap, easy to terminate, no
                mechanical protection.
              </li>
              <li>
                <strong>PVC singles (6491X)</strong> — Individual insulated conductors,
                each under its own PVC sleeve, drawn through conduit or trunking that
                provides the mechanical protection. Used in industrial and commercial
                where conduit/trunking is the install method. Allows future cable
                additions through the same containment.
              </li>
              <li>
                <strong>Steel-Wire-Armoured (SWA)</strong> — Multi-core cable with steel
                wire armour layer giving mechanical protection and earth continuity. Used
                for sub-mains, direct-buried distribution, exterior runs, suspended
                feeds. Available with PVC or LSZH sheath, PVC or XLPE insulation, copper
                or aluminium conductors.
              </li>
              <li>
                <strong>Mineral-insulated copper (MICC / "Pyro")</strong> — Copper outer
                sheath, copper conductors, magnesium oxide mineral insulation. Naturally
                fire-resistant (~1000 °C briefly), waterproof when properly terminated.
                The heritage choice for highest-integrity fire-safety circuits.
              </li>
              <li>
                <strong>Modern fire-resistant (FP200, FP400, Firetuf, Lifeline)</strong> —
                Stainless-steel screen over silicone-rubber or insulating-tape insulated
                conductors. PH30 / PH60 / PH90 / PH120 classified to BS EN 50200. Easier
                and cheaper than MICC for new-build fire alarm, emergency lighting and
                voice alarm circuits.
              </li>
              <li>
                <strong>LSZH variants</strong> — Same construction as PVC variants but with
                low-smoke-zero-halogen outer sheath. Used in schools, hospitals,
                transport hubs, public buildings, basements with limited ventilation —
                anywhere smoke toxicity during a fire would seriously affect evacuation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The four-factor selection matrix"
            plainEnglish="Cable choice for any given route depends on four factors: the environment (indoor / outdoor / buried / wet / hot), the mechanical protection needed (concealed safe or exposed to damage), the fire-safety classification (escape route / safety circuit / general), and the sheath toxicity (general building or densely-occupied public). Walk through these four factors and the right cable usually selects itself."
          >
            <p>
              The decision flow:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Factor 1 — Environment</strong>: Concealed indoor (low temperature,
                dry) → PVC T&E or singles. Outdoor (UV, weather) → SWA or UV-rated. Buried
                (mechanical risk, ground movement) → SWA. Hot environment (boiler room,
                plant) → XLPE-insulated cable or higher-rated alternatives.
              </li>
              <li>
                <strong>Factor 2 — Mechanical protection</strong>: Inside a wall, joist
                void, conduit or trunking → no extra protection needed. Exposed surface
                run on a wall → consider conduit or SWA. Direct buried → SWA. High-impact
                area (workshop, agricultural, plant room) → SWA or steel conduit.
              </li>
              <li>
                <strong>Factor 3 — Fire-safety classification</strong>: General final
                circuit → standard PVC. Smoke alarm chain (domestic) → standard PVC IF
                supports are non-combustible (Reg 521.10.202). Emergency lighting on
                escape route → fire-resistant (FP200/FP400 or MICC) per Reg 422.3.
                Fire alarm circuit (commercial) → fire-resistant per BS 5839-1.
              </li>
              <li>
                <strong>Factor 4 — Sheath toxicity</strong>: Domestic / small commercial →
                standard PVC sheath. Public building, school, hospital, transport, large
                commercial → LSZH sheath. Cost premium 30-50 % but justified by the
                evacuation-safety impact.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>PVC T&E and PVC singles — the everyday cables</ContentEyebrow>

          <ConceptBlock
            title="PVC T&E (6242Y, 6243Y) — UK domestic standard"
            plainEnglish="PVC twin-and-earth is the cable inside the walls of nearly every UK home. Two or three insulated conductors plus a bare CPC, all under a single PVC outer sheath. CSAs from 1.0 mm² (lighting) up to 16 mm² (heavy domestic feeders). Cheap, easy, fast to install. No mechanical protection — needs capping in chases, sheath relies on the wall fabric for protection."
          >
            <p>
              The common variants:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>6242Y</strong> — Standard 2-core PVC T&E (line, neutral, bare
                CPC). Lighting and socket circuits. CSAs 1.0 / 1.5 / 2.5 / 4 / 6 / 10 /
                16 mm².
              </li>
              <li>
                <strong>6243Y</strong> — 3-core PVC T&E (line, neutral, intermediate, bare
                CPC). Two-way / intermediate switching for lighting. Same CSA range.
              </li>
              <li>
                <strong>6491X</strong> — Single-core PVC insulated, no sheath. Drawn
                through conduit or trunking which provides protection. Used in industrial.
              </li>
              <li>
                <strong>6492X</strong> — Single-core with separate CPC, twin-and-earth
                style but in singles form. Less common.
              </li>
            </ul>
            <p>
              Limitations of PVC T&E:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No mechanical protection — needs cover in masonry chases, conduit if exposed.</li>
              <li>PVC sheath fails in fire within ~10 minutes — not for emergency lighting / fire alarm.</li>
              <li>PVC sheath releases dense black smoke and HCl gas in fire — not suitable for densely-occupied public buildings.</li>
              <li>UV degrades PVC over years — not for outdoor exposed runs.</li>
              <li>Limited temperature range (70 °C standard PVC) — not for hot environments.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>SWA — mechanical protection + sub-mains</ContentEyebrow>

          <ConceptBlock
            title="SWA — the workhorse for everything T&E cannot do"
            plainEnglish="Steel-Wire-Armoured cable. Multi-core construction with a layer of galvanised steel wire armour over an inner PVC sheath, then an outer PVC or LSZH sheath. The armour gives mechanical protection AND acts as the CPC for the cable. Used wherever T&E would be vulnerable — buried, outdoor, sub-mains, industrial, agricultural, exposed runs."
          >
            <p>
              SWA construction:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Stranded copper conductors (CL2 typically), aluminium for very large CSAs.
              </li>
              <li>
                Conductor insulation — PVC for 70 °C operation, XLPE for 90 °C operation
                (higher current rating for same CSA).
              </li>
              <li>
                Inner sheath / bedding layer — separates conductors from armour.
              </li>
              <li>
                Galvanised steel wire armour — the "SWA" itself, gives mechanical
                protection and earth continuity.
              </li>
              <li>
                Outer sheath — PVC standard, LSZH for public buildings, polyolefin for
                some applications.
              </li>
              <li>
                Common cores: 2-core (single phase + N), 3-core (3-phase no N), 4-core
                (3-phase + N), 5-core (3-phase + N + separate CPC for TN-S).
              </li>
              <li>
                Common CSAs: 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185,
                240, 300, 400 mm².
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="SWA termination — gland, banjo, ferrule, terminate"
            plainEnglish="SWA termination is a sequence — strip the outer sheath inside the gland, the gland clamps onto the steel armour to give earth continuity, terminate the inner conductors per the device. The earth bond from the armour to the gland to the metal enclosure makes the SWA armour the CPC for the circuit. Get this wrong and the armour is just floating metal at potentially dangerous voltage during a fault."
            onSite="A correctly-terminated SWA gland gives a low-resistance earth path from cable to enclosure that an MFT continuity test confirms (typically &lt;0.05 Ω end to end). A bad termination — armour not properly clamped, banjo washer missing, locknut loose — fails this test and the armour does not function as a CPC."
          >
            <p>
              The SWA termination sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cut the cable to the right length (allow tail for the gland and termination).</li>
              <li>Mark and remove the outer sheath at the strip length specified by the gland manufacturer.</li>
              <li>Comb out the steel armour wires evenly so they will fold back over the cone of the gland.</li>
              <li>Slide the gland body, lock-nut and banjo washer onto the cable.</li>
              <li>Position the cable so the armour wires sit over the gland cone.</li>
              <li>Tighten the gland — the cone clamps the armour wires for earth continuity.</li>
              <li>Push the gland through the enclosure entry, banjo washer outside, lock-nut inside (or vice versa per the design).</li>
              <li>Tighten the lock-nut to clamp the gland to the enclosure.</li>
              <li>Strip and ferrule the inner conductors as needed for the device terminal.</li>
              <li>Terminate to the device with the correct torque.</li>
              <li>Test continuity from armour to enclosure — &lt;0.05 Ω confirms earth bond.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>MICC and modern fire-resistant cables</ContentEyebrow>

          <ConceptBlock
            title="MICC ('Pyro') — heritage fire-safety standard"
            plainEnglish="Mineral-insulated copper cable (MICC, often called by the original brand name Pyro). Copper outer sheath, copper conductors, magnesium oxide (MgO) mineral powder as insulation. Naturally fire-resistant (~1000 °C briefly), waterproof when terminated correctly with the proper compression glands and pots. Used for the highest-integrity fire-safety circuits — fire pumps, oil rig systems, nuclear plant essential services, heritage commercial fire alarm."
          >
            <p>
              MICC characteristics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Construction</strong> — copper sheath, copper conductors,
                compressed MgO mineral powder insulation. No organic / polymer
                insulation to burn.
              </li>
              <li>
                <strong>Fire performance</strong> — operates at ~1000 °C for short
                periods, exceeding most modern fire-resistant cable ratings.
              </li>
              <li>
                <strong>Water sensitivity</strong> — MgO is hygroscopic. The cable must
                be properly terminated with compression pots and seals to keep moisture
                out; otherwise the insulation resistance falls dramatically.
              </li>
              <li>
                <strong>Termination</strong> — specialised compression pot, gland and
                seal. Slower and more expensive than modern alternatives.
              </li>
              <li>
                <strong>Cost</strong> — cable cost ~5-8× modern equivalents; install cost
                significantly higher due to termination time.
              </li>
              <li>
                <strong>Where still used</strong> — heritage installations matching
                existing, highest-integrity fire-safety applications, environments where
                the natural waterproofness is an advantage (some marine, some industrial).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="FP200 / FP400 — the modern fire-resistant standard"
            plainEnglish="FP200 and FP400 (Prysmian, formerly Pirelli) and equivalent ranges (Firetuf, FireSense, Lifeline) are the modern fire-resistant cable families. Stainless-steel screen wrap over silicone-rubber or insulating-tape insulated conductors. PH30 / PH60 / PH90 / PH120 classifications per BS EN 50200. Easier to install than MICC, lower cost, the standard choice for new-build commercial fire alarm and emergency lighting circuits."
          >
            <p>
              FP-family characteristics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Insulation</strong> — silicone rubber or insulating tape that chars
                in fire to leave a non-conductive ash layer; conductors remain electrically
                separated for the rated duration.
              </li>
              <li>
                <strong>Screen</strong> — stainless steel braid or wrap that maintains
                mechanical integrity through fire.
              </li>
              <li>
                <strong>Outer sheath</strong> — PVC or LSZH variant; LSZH is standard for
                fire-safety circuits in occupied buildings.
              </li>
              <li>
                <strong>Classification</strong> — PH30 (30 minutes circuit integrity in
                fire), PH60 (60 min), PH90 (90 min), PH120 (120 min). Higher class for
                buildings with longer evacuation times (high-rise, hospitals, transport).
              </li>
              <li>
                <strong>Standard CSAs</strong> — 1.0, 1.5, 2.5, 4, 6 mm² for typical fire
                alarm and emergency lighting circuits; larger CSAs available for sub-main
                fire-resistant feeds.
              </li>
              <li>
                <strong>Termination</strong> — similar to standard PVC cable, with
                appropriate ferruling for fine-stranded conductors.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 422.2 + 422.3 (Conditions likely to cause fire — escape routes)"
            clause="(Paraphrased from the regulation as introduced in A4:2026.) Where wiring systems pass through escape routes (or supply equipment in escape routes), the cable shall be selected and installed to maintain circuit integrity for the duration required by the building&rsquo;s fire safety strategy. Cables shall be of fire-resistant construction (BS EN 50200 PH30 / PH60 / PH90 / PH120 as required) and supported by non-combustible means (Reg 521.10.202)."
            meaning={
              <>
                A4:2026 introduced separate requirements for escape routes (Reg 422.2 + 422.3),
                deleting the older condition-code references (BD2/BD3/BD4) and replacing them
                with explicit cable-selection rules. Cables on escape routes must be fire-resistant
                (FP200/FP400/MICC) AND supported non-combustibly. The rated duration depends on
                the building — 30 min for simple two-storey, 60-90 min for taller / more complex,
                120 min for the highest-risk evacuation scenarios. This is a significant
                tightening — many older HMOs and commercial buildings now have non-compliant
                escape route cabling that needs upgrading.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 42, Regulations 422.2 and 422.3 (paraphrased — introduced/strengthened A4:2026)."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>LSZH — public buildings, transport, schools, hospitals</ContentEyebrow>

          <ConceptBlock
            title="LSZH — same cable, safer sheath"
            plainEnglish="LSZH (Low Smoke Zero Halogen) cables have the same conductor and insulation construction as their PVC equivalents but use a different outer sheath material. The LSZH sheath releases dramatically less smoke when burned and produces no halogen acid gases (HCl, HBr) that PVC cables emit. Used in buildings where smoke from a fire would seriously hinder evacuation — schools, hospitals, transport hubs, public buildings, theatres, large commercial."
          >
            <p>
              LSZH applications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Schools and educational buildings.</li>
              <li>Hospitals, care homes, healthcare premises.</li>
              <li>Transport hubs (railway stations, airports, bus stations, underground).</li>
              <li>Public buildings (libraries, civic buildings, theatres, cinemas).</li>
              <li>Large commercial offices, particularly multi-tenanted.</li>
              <li>Basements and below-ground areas with limited ventilation.</li>
              <li>HMOs and care facilities (alongside fire-resistant for safety circuits).</li>
            </ul>
            <p>
              LSZH variants are available for almost every cable family — PVC T&E (LSF
              / LSOH equivalents), SWA (LSZH-sheathed XLPE/SWA), FP200 (FP200 Gold has
              LSZH sheath as standard), MICC (typically PVC-sheathed copper, but
              naturally low-smoke when burned). The premium is 30-50 % over PVC
              equivalents — usually justified by the evacuation-safety impact in the
              building type.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Worked example — escape stairwell of a 6-storey HMO</ContentEyebrow>

          <Scenario
            title="Lighting + emergency lighting circuits serving the central escape stairwell of a 6-storey HMO"
            situation={
              <>
                A 6-storey HMO conversion (former office building, now 24 single bedrooms
                + shared facilities). Central staircase serves all floors, escape route
                for all occupants. Three circuits to install on this stair core: (1)
                normal stairwell lighting (LED downlights at each landing, controlled by
                PIR motion sensors), (2) emergency lighting (BS 5266 — 3-hour duration,
                LED bulkheads at each landing and exit), (3) fire alarm (BS 5839-1
                Cat L1 — manual call points, smoke detectors, sounders at every floor).
                Building fire strategy: 90-minute total evacuation time.
              </>
            }
            whatToDo={
              <>
                <strong>Cable 1 — Normal stairwell lighting.</strong> Standard PVC T&E
                1.5 mm² is acceptable for the lighting circuit itself BUT (1) supports
                must be non-combustible throughout per Reg 521.10.202 (A4:2026), and
                (2) consider LSZH variant for the sheath because this is an HMO with
                multi-occupancy evacuation. Run on metal P-clips at OSG Table 4.5
                intervals.
                <br /><br />
                <strong>Cable 2 — Emergency lighting.</strong> Reg 422.3 (A4:2026)
                applies — fire-resistant cable required for the emergency lighting on
                this escape route. Building strategy 90 min evacuation = PH90 minimum
                rating. Specify FP200 Gold 1.5 mm² 2-core with LSZH sheath, supported on
                metal P-clips. Each emergency luminaire has its own self-contained
                battery for 3-hour duration; the cable feeds the constant-charge supply.
                <br /><br />
                <strong>Cable 3 — Fire alarm circuit.</strong> BS 5839-1 Cat L1 system
                requires standard fire-resistant cable (PH30 minimum on detection
                circuits, PH60 on sounder circuits if the building strategy requires).
                Specify FP200 Gold 1.5 mm² 2-core fire-resistant for both detection and
                sounders. Same LSZH sheath. Same metal P-clip support throughout.
                <br /><br />
                <strong>Containment and routing.</strong> All three circuits routed in
                a dedicated metal trunking run up the stair core, separated from any
                non-fire-rated cables by a barrier inside the trunking. The trunking
                and supports are themselves non-combustible, contributing to the fire
                strategy. Penetrations through floor slabs at each landing fire-stopped
                with intumescent putty + collar.
                <br /><br />
                <strong>Documentation.</strong> Cable specs, fire ratings, compliance
                with Reg 422.2 / 422.3 / 521.10.202 / BS 5839-1 / BS 5266 all logged on
                the test certificate. Building fire-safety strategy referenced as the
                source for the 90-minute evacuation requirement that drives the PH90
                cable choice.
              </>
            }
            whyItMatters={
              <>
                A 6-storey HMO is a higher-risk building under BS 9999 and a stark
                example of where cable selection becomes a life-safety decision. Specify
                standard PVC T&E for the emergency lighting and the cable fails within
                10 minutes of a fire starting — leaving 24 occupants and any visitors
                evacuating in pitch darkness on an unfamiliar staircase. The fire-resistant
                spec costs ~30-40 % more in materials but saves lives in the scenario it
                is designed for. A4:2026 made these requirements explicit — earlier
                editions had condition-code language that was easily missed.
              </>
            }
          />

          <CommonMistake
            title="Substituting standard PVC T&E for fire-resistant cable on an emergency lighting circuit"
            whatHappens={
              <>
                The cable schedule says "FP200 Gold 1.5 mm²" for the emergency lighting
                circuits in a commercial fit-out. The wholesaler is out of FP200 and
                offers standard PVC T&E "as a like-for-like". You accept the substitution
                to avoid stopping site. Six months later there is a fire in the building.
                The PVC cable burns through within 10 minutes; the emergency luminaires
                lose their constant-charge supply; the escape route goes dark mid-evacuation.
                Multiple casualties; coroner&rsquo;s inquiry traces the cable substitution
                as the root cause.
              </>
            }
            doInstead={
              <>
                NEVER substitute standard PVC for fire-resistant cable, no matter what
                the wholesaler offers. The names are similar (both are 1.5 mm² 2-core
                cable) but the construction and fire performance are entirely different.
                If the spec calls for FP200 / FP400 / MICC, you wait for the right cable
                or you go to a different wholesaler. The cost of stopping site for half
                a day is trivial compared to the cost of a fire-safety failure. Document
                any substitution that does happen (with the designer&rsquo;s explicit written
                approval) on the test certificate and the as-built drawings.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 521 (Selection and erection of wiring systems)"
            clause="(Paraphrased — section overview.) Wiring systems shall be selected and erected having regard to the type and condition of the supply, the type of load, the type of conductor and insulation, the wiring system in use, the conditions of installation (mechanical, environmental, fire), and any external influences. Selection shall comply with the relevant clauses of Section 521-525 inclusive."
            meaning={
              <>
                Section 521 is the BS 7671 chapter that governs cable selection. It
                requires the designer to consider every relevant factor — supply type,
                load type, conductor type, insulation, install conditions, external
                influences — when choosing cable. The five cable families covered in
                this Sub each suit different combinations of those factors. Cable
                selection is not arbitrary; the decision is driven by Section 521 and
                its sub-clauses, the relevant product standards (BS 5467, BS 6724,
                BS EN 50200, BS 6500), and the building&rsquo;s fire-safety strategy.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Section 521 (paraphrased section overview)."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Five main cable families — PVC T&E, PVC singles, SWA, MICC, modern fire-resistant (FP200/FP400). Each has a clear use case; using the wrong one is either a regulation breach or a future failure.',
              'Selection driven by four factors — environment, mechanical protection, fire-safety classification, sheath toxicity. Walk through each factor and the right cable usually selects itself.',
              'PVC T&E for domestic concealed; PVC singles in conduit for industrial protected runs; SWA for sub-mains, buried, outdoor, mechanical risk.',
              'MICC for highest fire performance (heritage); FP200 / FP400 for modern fire-alarm and emergency lighting (BS 5839-1, BS 5266).',
              'LSZH sheath for public buildings (schools, hospitals, transport, large commercial) — premium cost justified by smoke-toxicity reduction during evacuation.',
              'A4:2026 Reg 422.2 + 422.3 introduced new escape-route cable requirements — fire-resistant cable AND non-combustible supports for the duration required by the fire-safety strategy.',
              'NEVER substitute standard PVC for fire-resistant cable. The names look similar (1.5 mm² 2-core); the fire performance is fundamentally different.',
              'Cable selection is driven by Section 521 of BS 7671, the relevant product standards, and the building&rsquo;s fire-safety strategy. Always cross-check the design before ordering.',
            ]}
          />

          <Quiz title="Wiring system selection — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.7 JIB safe isolation procedures
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-9')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.9 Cable pulling and dressing techniques
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
