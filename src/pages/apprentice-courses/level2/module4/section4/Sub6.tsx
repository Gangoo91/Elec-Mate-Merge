/**
 * Module 4 · Section 4 · Sub 6 — Bonding scenarios across services
 * Supplementary subsection — synthesises bonding rules across gas / water /
 * oil / structural steel / lightning protection / PV / battery / pools.
 *
 * Frame: Reg 411.3.1.2 + 544.1.2 give the general rule. Each service has
 * its own quirks — DSEAR for gas, plastic for modern incoming pipes,
 * BS EN 62305 for lightning, Section 712 for PV, special-location sections
 * for pools and agricultural. Walk the building, identify each
 * extraneous-conductive-part, bond accordingly.
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

const TITLE = 'Bonding scenarios across services | Level 2 Module 4.4.6 | Elec-Mate';
const DESCRIPTION =
  'Bonding gas, water, oil, structural steel, lightning protection, PV arrays, battery storage and special-location services — the per-service quirks behind the general Reg 411.3.1.2 + 544.1.2 framework, plus DSEAR, BS EN 62305 and Section 712 cross-references.';

const checks = [
  {
    id: 'm4-s4-sub6-plastic-gas',
    question:
      'A modern domestic install has a plastic (PE) gas service pipe up to the meter. Inside the building, the consumer-side gas pipework is steel. Where does main bonding go?',
    options: [
      'Coded as FI with a recommended investigation route, recorded under Limitations on the EICR, and brought to the duty holder\\\\\\\\\\\\\\\'s attention in the handover so they can commission the investigation as a separate work item. The EICR cannot certify what cannot be inspected.',
      'The voltage factor minimum — accounts for the fact that the supply voltage at the fault point during a heavy fault may be lower than the declared U0 of 230 V due to supply tolerance and source impedance, so the design uses U0 × Cmin = 230 × 0.95 = 218.5 V as the available driving voltage for the fault current.',
      'On the metal consumer-side pipework, within 600 mm of the meter outlet union per Reg 544.1.2. Plastic pipe is not an extraneous-conductive-part by definition (Part 2 — must be made of conductive material), so it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t need bonding. The metal consumer pipework downstream of the meter still does.',
      'Sample sufficiently to give a representative picture of the installation condition; expand the sample if defects are found at higher than expected rates; record the sampling rate and any expansion on the report; agree the sampling approach with the customer in writing in advance.',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Part 2 — extraneous-conductive-part is "a conductive part liable to introduce a potential, generally earth potential, and not forming part of the electrical installation." Plastic doesn\'t conduct → can\'t introduce a potential → not an extraneous-conductive-part → no bonding required. The metal consumer-side pipework downstream is still extraneous and gets bonded normally.',
  },
  {
    id: 'm4-s4-sub6-structural-steel',
    question:
      'A commercial unit has a structural steel frame, steel roof trusses, and steel cladding. The frame is bolted into a concrete slab with a separate earth electrode. How is the structural steel bonded?',
    options: [
      'At least one person in the firm must hold a QS qualification (typically C&G 2391-52 Inspection and Testing, or equivalent) and that person is named on the scheme registration as the firm\\\\\\\'s QS. The QS doesn\\\\\\\'t have to do every job personally but is responsible for the standard of work and for signing off certification. For a sole trader the QS is normally the sole trader themselves.',
      'Per Reg 643.7.2 (paraphrased): "If any test indicates a failure to comply, that test and any preceding test, the results of which may have been influenced by the fault indicated, shall be repeated after the fault has been rectified." So: repeat IR on the rectified circuit; also repeat continuity on that circuit (which preceded IR and could have been influenced by the same fault). Document corrected reading on the STR.',
      'Continuity of the bonding conductor from the metallic PV structures to the chosen suitable earthing terminal shall be demonstrable. The acceptance criterion is a continuity test showing low resistance and a secure, permanent connection to the earthing terminal. Where continuity cannot be demonstrated, the installation is non-compliant.',
      'Per Reg 411.3.1.2, structural steel that introduces a potential is an extraneous-conductive-part and must be bonded to the MET. Typically multiple bond connection points to the steel frame at accessible locations, all routed back to the MET. BS EN 50522 also applies for high-voltage installations and bigger commercial earthing systems.',
    ],
    correctIndex: 3,
    explanation:
      'Reg 411.3.1.2 — extraneous-conductive-parts liable to introduce a potential shall be bonded to the MET. Large structural steel frameworks definitely qualify. Multiple bond connections at accessible points (typically at columns near the meter cabinet, plus at strategic structural junctions) ensure equipotential reference across the frame. BS EN 50522 covers earthing of HV installations and complements BS 7671 for large commercial.',
  },
  {
    id: 'm4-s4-sub6-pv-bonding',
    question:
      'A domestic rooftop PV array has aluminium-framed panels mounted on metal mounting rails. The DC isolator is roof-side; the inverter is in the loft. What bonding is required?',
    options: [
      'Part 1 = scope, object, fundamental principles. Part 2 = definitions. Part 3 = assessment of general characteristics. Part 4 = protection for safety. Part 5 = selection and erection. Part 6 = inspection and testing. Part 7 = special installations or locations. Part 8 = functional requirements (energy efficiency, prosumer\\\\\\\'s installations).',
      'No. Socket testers are first-pass verification only. They confirm basic polarity and earth presence (L-N-E in the correct positions) but they do NOT detect borrowed neutrals, reversed polarity at the supply, undersized or shared earths, high-impedance earths, or RCD failure. A socket tester showing \\\\\\\'wiring correct\\\\\\\' is a starting point — the full verification needs an MFT for R1+R2, IR, Zs, RCD operating time, and polarity at every accessory.',
      'Per Section 712 of BS 7671 + manufacturer instructions, the metal frame of the array (rails + panel frames) typically requires equipotential bonding back to the inverter or to a dedicated earthing terminal — sized per the PV system designer\\\\\\\\\\\\\\\'s requirements (often 6 mm² or 10 mm² Cu). The bond addresses fault-current paths in the DC system AND lightning-induced surges. Cross-reference Section 712 (PV systems) and BS EN 62305 (lightning protection).',
      'Written communication carries emotional tone even without non-verbal cues. EI in writing means: considering how the reader will feel when they read it, choosing words that are clear and respectful, avoiding language that could be interpreted as blame or aggression, and re-reading messages before sending to check for unintended emotional impact — especially important when conveying criticism or bad news',
    ],
    correctIndex: 2,
    explanation:
      'Section 712 of BS 7671 covers PV systems specifically. Modern PV installs bond the array frame and rails for two reasons: (1) protective bonding for DC fault scenarios; (2) limiting induced surge voltages from nearby lightning strikes. Sizing per the system designer + Section 712 + manufacturer instructions. Independent of AC-side main bonding which still applies to the building.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'For a steel gas service pipe entering a domestic property, the BS 951 clamp must:',
    options: [
      'Apply SLAM: stop the current activity, look for the source of the smell, assess whether it indicates a new hazard (overheating, insulation failure), and manage by withdrawing if necessary, de-energising the panel if safe to do so, and reporting the finding',
      'Comply with BS 951 AND be specifically rated for gas — typically incorporating an insulating insert at the contact face per DSEAR (Dangerous Substances and Explosive Atmospheres Regulations) and gas industry guidance (e.g. IGEM/G/5).',
      'Inadequate training on motor maintenance, failure to follow lubrication procedures, incorrect torque applied during installation, or fatigue causing errors during commissioning',
      'Make safe before leaving — typically isolate the circuit, lock off, label, and brief the duty holder verbally and in writing. The continuing duty under EAWR Reg 4 attaches to you as the person who identified the danger; leaving a known C1 unmitigated is potentially a criminal breach.',
    ],
    correctAnswer: 1,
    explanation:
      'Gas-rated BS 951 clamps have an insulating insert that limits contact area to the deliberate bond connection point only, complying with DSEAR. Standard non-gas BS 951 brass clamps are for water, oil, structural steel — not gas. Always check the data label.',
  },
  {
    id: 2,
    question:
      'A lightning protection system (LPS) on a commercial building has down-conductors running from the roof-mounted air terminals to ground rods. How does the LPS interact with the building\'s electrical bonding?',
    options: [
      'The electrical contractor\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s Foreman or Charge-hand at the morning brief — they translate the day\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s programme into specific tasks for each pair of hands. The Approved Electrician you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re paired with then directs your work at the face. Big-picture decisions (programme changes, design queries) escalate up via the Foreman to the Project Engineer or Contracts Manager.',
      'Because in a broken-PEN fault on PME, the entire installation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s neutral return current can flow back to ground via the bonding to extraneous-conductive-parts (gas, water, structural steel). Sizing against the PEN ensures the bonding conductor doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t melt before it is reset.',
      'Per BS EN 62305 and BS 7671 Reg 411.3.1.2, the LPS earth electrode network is typically bonded to the building\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s MET — either directly or via a spark gap (isolating SPD) depending on the LPS class and system designer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s arrangement. This prevents large potential differences between the LPS earth and the electrical earth during a strike.',
      'The line conductor is not easily accessible at the CU end (e.g. busbar trunking systems), the circuit is part of a complex distribution network where you want to isolate the CPC verification, or the wander lead is more practical on a large commercial site (one person at the MET, radio contact with the tester at the accessory).',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 62305 (lightning protection) and BS 7671 (electrical) interface at the MET. The LPS earth and the electrical earth are equalised — either directly bonded for "non-isolated" LPS or coupled via a surge protective spark gap for "isolated" LPS. Without this equipotential bond, a lightning strike can produce kV-range potential differences between the two earth systems, causing flashover, equipment damage and shock risk.',
  },
  {
    id: 3,
    question:
      'In a swimming pool installation, what additional supplementary bonding requirements apply over and above the BS 7671 Section 415.2 / Reg 411.3.1.2 framework?',
    options: [
      'A coordination check run in tools like Navisworks or Revit\\\\\\\'s built-in clash detection that finds geometric collisions between disciplines — e.g. a cable tray running through a structural beam, an HVAC duct passing through a fire compartment without a fire-stop, electrical conduit crossing a sprinkler pipe at the same height.',
      'You don\\\\\\\'t have to break the circuit — the clamp meter senses the magnetic field around the conductor and reads the current without electrical contact. Faster, safer (no need to disconnect), and possible on energised circuits without isolation. Standard for measuring load currents at distribution boards, on submains, on motor circuits, and for energy auditing. Most modern clamp meters also have voltage and continuity functions, making them effectively a multimeter + clamp in one.',
      'To co-operate with the client, principal designer, principal contractor, contractor and any other person performing a duty under CDM, AND to report to the principal contractor (or contractor where there is no principal contractor) anything that they consider is likely to endanger their own or another person\\\\\\\'s health or safety, AND to comply with the requirements of CDM.',
      'Section 702 of BS 7671 — extensive supplementary bonding inside Zone 0, 1 and 2 around the pool (between the pool liner reinforcement, surrounding metalwork, ladders, lighting frames etc.) and tighter restrictions on equipment in each zone. Supplementary bonding generally cannot be omitted in pool zones — the wet skin / immersed body risk is far higher than a domestic bathroom.',
    ],
    correctAnswer: 3,
    explanation:
      'Section 702 covers swimming pools and other basins. Zones 0/1/2 around the pool have additional supplementary bonding requirements that go beyond a normal bathroom. The omission permission of Reg 701.415.2 does NOT extend to pool zones — supplementary bonding is essentially mandatory inside Zone 1 in particular. Always read Section 702 for any pool work.',
  },
  {
    id: 4,
    question:
      'An oil-fuelled domestic central heating boiler has a 22 mm steel oil supply pipe entering the building from an external storage tank. What\'s the bonding requirement?',
    options: [
      'Bonding required per Reg 411.3.1.2 — the metal oil supply pipe is an extraneous-conductive-part liable to introduce a potential. Bond per Reg 544.1.2 — consumer side, before any branch, within 600 mm of point of entry where practicable. Use a BS 951 clamp suitable for oil application (similar specification to gas — DSEAR considerations apply).',
      'Take time to familiarise yourself with the equipment, ask the assessor for clarification about its operation if needed, and apply your transferable skills and knowledge systematically — the assessor assesses your approach and reasoning, not just equipment-specific knowledge',
      '(1) Stop work; ensure no-one disturbs further. (2) Photograph and document. (3) Phone the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s contracts manager / H&S manager immediately. (4) Inform the dutyholder (building owner / managing agent). (5) Do NOT proceed without confirmation that the material is non-asbestos OR that licensed contractor has taken over disturbance work. Document everything in writing.',
      'Standard MCB ratings (6, 10, 16, 20, 25, 32, 40 A) with Type B or C overcurrent characteristic, combined with 30 mA Type A or Type AC residual current protection (Type B / F variants becoming available). Same form factor as a standard RCBO; same cascade and breaking-capacity specifications.',
    ],
    correctAnswer: 0,
    explanation:
      'Metal oil supply pipework is extraneous-conductive — bond per the same rules as gas. DSEAR considerations apply (oil/diesel is flammable so the clamp design needs to limit sparking risk in the unlikely event of leak + fault). Treat oil installation per gas convention: gas-spec or oil-spec BS 951 clamp, consumer side, before any branch.',
  },
  {
    id: 5,
    question:
      'A property has battery energy storage (e.g. Tesla Powerwall, GivEnergy) installed alongside a PV array. What additional bonding considerations apply?',
    options: [
      'Yes — EIC provides hardship grants to anyone working in the UK electrical / energy industry including apprentices. Application process via electricalcharity.org. Grants typically cover specific need (rent arrears, urgent medical equipment, transport during illness, childcare during family crisis). Grant amount varies by need; typically £200-2,500 range. Confidential.',
      'Per BS 7671 Section 712 (PV) and Section 426 (electrical equipment for safety services) plus the manufacturer\\\\\\\\\\\\\\\'s installation instructions — typically the battery enclosure needs equipotential bonding back to the system earth, the DC busbars require fault-current path provisions, and the AC-coupled inverter must comply with the standard ADS framework. Battery installs add complexity over straight PV.',
      'Multiple sources accepted by CPS schemes: scheme-organised events (NICEIC Connect, NAPIT events, ELECSA training), accredited training providers (JTL, NET, IET Academy, Elec-Mate), trade events (ECA Live, Electric Vehicles Show), online platforms (IET Academy, scheme portals), manufacturer training (sometimes counts), reading and self-study (some schemes accept evidence). Keep a CPD log with date, topic, time, source.',
      'Some MFTs have multiple Zs measurement ranges (e.g. low range 0-2 Omega, high range 0-200 Omega). If you\\\\\\\\\\\\\\\'re testing a TT installation with expected Zs of 80-200 Omega and the meter is set to the low range, the reading will saturate or read inaccurately. GN3 wants you to consciously check the range matches the expected reading before pressing TEST — a failed test or wildly wrong reading wastes time and may damage the instrument if test current exceeds the range capacity.',
    ],
    correctAnswer: 1,
    explanation:
      'Battery storage alongside PV requires bonding of the battery enclosure, the DC switchgear and the inverter as part of the integrated system earth. Manufacturer instructions are normative (Reg 510.3 and 134.1 — manufacturer instructions are part of the install standard). Always read the system designer\'s and the battery manufacturer\'s installation manual alongside BS 7671.',
  },
  {
    id: 6,
    question:
      'A commercial building has structural steel framework and a TT supply (no PME). The earth electrode is a single 2.4 m driven copper rod giving Ze = 35 ohm. The structural steel frame is bonded to the MET. In a fault scenario, what is the role of the structural steel bonding?',
    options: [
      'Provides a parallel earth path that lowers Zs.',
      'Equalises the steel frame potential with the MET during a fault. Without this bonding, a fault on a circuit would raise the CPC to fault potential while the steel frame stayed at ground potential via its concrete-encased base — touch voltage between the two could be lethal. With bonding, both rise together — touch voltage between any two points on the bonded system is minimised.',
      'Decorative only.',
      'Both b) and c) — equalises potential AND can act as a parallel earth path for fault current return.',
    ],
    correctAnswer: 2,
    explanation:
      'Both. Primary purpose: equipotential bonding (b). Secondary effect: structural steel buried in concrete with extensive ground contact often acts as a substantial parallel earth path, effectively lowering Ze for the installation as a whole (c). On TT installations particularly, the structural steel can be the dominant earth path — much lower resistance than a single rod.',
  },
  {
    id: 7,
    question:
      'A Galvanised steel (GS) gas service has been replaced by a polyethylene (PE) plastic supply at the property boundary. The internal consumer-side pipework remains steel. The original main bond clamp is on the GS pipe just inside the meter cabinet. What change is needed?',
    options: [
      'Regulation 9 applies to all designers individually, while Regulation 11 gives the principal designer additional coordination, planning, and management duties across the design team',
      'Because maintenance technicians are uniquely positioned to identify and implement energy efficiency improvements during routine work, contributing to organisational sustainability and cost reduction',
      'Where a specific risk assessment demonstrates that the particular task, equipment, and location are suitable for the actual conditions — for example, an enclosed MEWP in a sheltered courtyard',
      'Verify the bond clamp is still on consumer-side metal pipework (post-meter, before any branch). If yes, no change needed. The PE supply doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t need bonding (not extraneous-conductive); the consumer steel pipework still does and gets bonded as before.',
    ],
    correctAnswer: 3,
    explanation:
      'PE supply replacement is increasingly common as DNOs upgrade old GS services. The change to plastic on the supply side doesn\'t affect the consumer-side bonding — main bond stays on consumer steel pipework. Re-test continuity after the gas company has finished work to confirm the bond is still electrically sound (sometimes the bond gets disturbed during the supply replacement).',
  },
  {
    id: 8,
    question:
      'A commercial unit with structural steel frame + steel roof + gas + water + lightning protection — design the bonding scheme. What\'s the principle?',
    options: [
      'Bond each extraneous service (gas, water) separately back to the MET per Reg 544.1.2 (within 600 mm of intake). Bond the structural steel frame at multiple accessible points back to the MET. Bond the LPS earth network to the MET via direct bond or spark gap per BS EN 62305. Each system has its own dedicated bonding cable to the MET — no daisy-chaining. The MET is the single common reference for the entire integrated earth and bonding network.',
      'The Schedule of Accessories is a design document — every accessory by location, type, IP rating and circuit reference, used for install QC and as-installed verification. The BOM is a procurement document — totals by part number for ordering. The schedule drives the BOM, but the schedule survives long after the BOM is closed.',
      'Report to the JIB ECS team immediately and request a replacement (small admin fee, typically £15-20). Get a temporary letter of confirmation from JIB or your employer to maintain site access while the new card is in production (typically 5-10 working days). Most sites will accept an ECS register printout temporarily; some won\\\\\\\'t, in which case you can\\\\\\\'t work until the new card arrives.',
      'Clamping around BOTH conductors (L AND N together) when measuring LOAD current. The clamp reads imbalance — for load current you want one conductor only (L OR N, not both). Reading shows zero or near-zero, apprentice assumes \\\\\\\'no load\\\\\\\', misses the actual current. Conversely, when measuring earth leakage, you DO clamp L AND N together (the imbalance IS the leakage). The two use cases are mutually exclusive — load = one conductor, leakage = both conductors. Apprentices learn this in week one and re-learn it every time they pick up a clamp.',
    ],
    correctAnswer: 0,
    explanation:
      'Multiple independent bonds, all converging at the MET. This is the protective bonding principle scaled up to commercial: each extraneous service has its own dedicated cable back to the MET (gas, water bonded per Reg 544.1.2; structural steel at multiple points; LPS via BS EN 62305 arrangement). Daisy-chaining is wrong — a break anywhere in a daisy-chain breaks the bond on every downstream service. Independent paths give independent fault tolerance.',
  },
];

const faqs = [
  {
    question: 'Why does a plastic gas service mean no bonding?',
    answer:
      'BS 7671 Part 2 defines extraneous-conductive-part as "a conductive part liable to introduce a potential, generally earth potential, and not forming part of the electrical installation". Plastic doesn\'t conduct — it can\'t introduce a potential. So a plastic supply pipe isn\'t extraneous-conductive and the bonding requirement of Reg 411.3.1.2 doesn\'t apply to it. The metal consumer-side pipework downstream is still conductive and is still extraneous, so it still gets bonded.',
  },
  {
    question: 'How is bonding handled on a TT installation in a commercial unit with a structural steel frame?',
    answer:
      'The structural steel frame typically becomes a substantial parallel earth path because it\'s mechanically and electrically bonded to its concrete foundation, which has extensive ground contact. On a TT install where the local rod electrode might be 35 ohm or higher, the structural steel can drop the effective combined Ze dramatically — sometimes by an order of magnitude. The frame is bonded to the MET per Reg 411.3.1.2, the rod electrode is the formal earthing per Reg 542, and together they form the installation\'s earth reference. Always measure Ze with the bonding complete to capture the real-world value.',
  },
  {
    question: 'Where does BS EN 62305 come in for lightning protection bonding?',
    answer:
      'BS EN 62305 is the British/European standard for lightning protection. It defines the LPS class (I-IV) based on building risk assessment, and sets out the earthing arrangements for the down-conductor system. The LPS earth and the BS 7671 electrical earth are typically bonded together — either directly (non-isolated LPS) or via a spark gap / isolating SPD (isolated LPS where direct bonding might transmit lightning energy into the electrical install). The lightning protection designer specifies which arrangement applies; the electrician implements at the MET.',
  },
  {
    question: 'What about a domestic with a TN-S supply that\'s been converted to TN-C-S (PME) by the DNO?',
    answer:
      'The bonding sizing changes. Original TN-S install would have been sized per Reg 544.11 first half (half earthing, 6 mm² floor, 25 mm² cap). PME installs use Reg 544.11 second half (Table 54.8, indexed by PEN). After conversion, the bonding may need upgrading — typical scenario is a 6 mm² bond on the original TN-S being insufficient for the new PME requirement (which mandates 10 mm² minimum for typical domestic PEN sizes). Always check the bonding meets the current supply system, not the historical one.',
  },
  {
    question: 'Does bonding apply to small-diameter incoming services like a single 15 mm copper water pipe?',
    answer:
      'If the pipe is metal and enters the building from outside, yes — it\'s extraneous-conductive and gets bonded per Reg 411.3.1.2. The diameter doesn\'t change the requirement. The cable size for the bond comes from Reg 544.11 / Table 54.8 (PME) — same 10 mm² Cu minimum on a typical domestic regardless of whether the pipe is 15 mm, 22 mm or 28 mm. The clamp gets sized for the pipe diameter.',
  },
  {
    question: 'A modern fire suppression system has metal sprinkler pipes throughout the building. Do they need bonding?',
    answer:
      'If the sprinkler pipework is connected to a metal incoming water service that\'s already bonded at the building intake, the sprinkler system is typically bonded automatically by metallic continuity. If the sprinkler system has its own separate water source (e.g. dedicated tank, separate incoming feed) then yes, that\'s a separate extraneous-conductive-part and needs its own bond per Reg 411.3.1.2. Always trace the metallic continuity from the sprinkler pipework back to known bonded pipework — if there\'s a plastic break in between, you may need to add bonding on the sprinkler side.',
  },
];

export default function Sub6() {
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
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 6"
            title="Bonding scenarios across services"
            description="Gas, water, oil, structural steel, lightning protection, PV arrays, battery storage, swimming pools — the per-service quirks behind the general Reg 411.3.1.2 + 544.1.2 framework, plus DSEAR, BS EN 62305 and Section 712 cross-references."
            tone="emerald"
          />

          <TLDR
            points={[
              'General rule: any extraneous-conductive-part that enters the building gets bonded to the MET per Reg 411.3.1.2 + Reg 544.1.2 (consumer side, before branch, within 600 mm where practicable).',
              'Per-service quirks: gas needs DSEAR-rated BS 951 clamp; oil similar; plastic supply pipes don\'t need bonding (not extraneous-conductive); structural steel often bonded at multiple points; LPS earth bonded to MET per BS EN 62305.',
              'Special locations (swimming pools 702, agricultural 705, exhibitions 711) and modern systems (PV 712, battery storage) have additional rules in their own BS 7671 sections plus separate standards like BS EN 62305.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Supplementary content — extends LO4 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding of bonding scenarios across services (gas, water, oil, structural steel, lightning protection, PV, battery storage, special locations).',
              'Identify the bonding requirements for gas, water, oil and structural steel services using BS 7671 Reg 411.3.1.2 + 544.1.2.',
              'Recognise when an incoming service does NOT need bonding (plastic supply pipework — not extraneous-conductive).',
              'Cross-reference BS EN 62305 (lightning protection) and Section 712 (PV systems) for non-standard bonding scenarios.',
              'Apply special-location overlays (Section 701 bathroom, 702 swimming pool, 705 agricultural) where they modify the standard bonding rules.',
              'Design a multi-service bonding scheme for a commercial building with structural steel, multiple incoming services and lightning protection — every service independently bonded to the MET.',
              'Identify the changes required when a DNO converts a TN-S supply to TN-C-S (PME) — bonding sizing must be re-verified against Table 54.8.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Gas — DSEAR matters</ContentEyebrow>

          <ConceptBlock
            title="Gas services — BS 951 clamp with insulating insert, consumer side, within 600 mm"
            plainEnglish="Same Reg 544.1.2 position rules as water. Different clamp specification — gas-rated BS 951 has an insulating insert at the back of the jaw to limit any sparking risk to the controlled bond connection point only."
            onSite={`On every domestic install with a gas service. Steel pipe usually, sometimes copper for run-in from external meters. Look for "DSEAR compliant" or "complies with IGEM/G/5" on the clamp data label. If the label only says BS 951 with no gas mention, treat as water-only.`}
          >
            <p>The gas-specific considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DSEAR compliance.</strong> Dangerous Substances and Explosive Atmospheres
                Regulations require any equipment in a potentially flammable atmosphere to not
                act as an ignition source. Gas-rated BS 951 clamps incorporate an insulating
                insert (typically a thin polymer ring at the back of the clamp jaw) that limits
                metallic contact to the deliberate bond connection point only.
              </li>
              <li>
                <strong>IGEM/G/5.</strong> Institution of Gas Engineers and Managers guidance
                document for bonding to gas installations. Cross-references BS 7671 Reg 411.3.1.2
                and 544.1.2 with gas-industry-specific application notes.
              </li>
              <li>
                <strong>Plastic supply pipes.</strong> Modern domestic gas services are increasingly
                polyethylene (PE) up to the meter for corrosion resistance. PE is not extraneous-
                conductive — no bond on the plastic. The consumer-side pipework (typically still
                steel or copper) is still extraneous and gets bonded normally.
              </li>
              <li>
                <strong>Position.</strong> Per Reg 544.1.2 — consumer side of meter, before any
                branch, within 600 mm of meter outlet union. External meter — bond at point of
                entry of pipework into the building.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Water — standard brass BS 951, same 600 mm rule"
            plainEnglish="Water is the simpler case. Standard brass BS 951 clamp on the consumer-side metal pipework, before any branch, within 600 mm of the stop-tap or point of entry."
          >
            <p>
              Water service bonding is the most common bond install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Bond the metal incoming water pipe — copper or galvanised steel typically.
              </li>
              <li>
                On consumer side of the main stop-tap, before any branch (the cold-water tank
                feed, hot-water cylinder feed, etc.).
              </li>
              <li>
                Within 600 mm of the stop-tap or point of entry to the building (where the pipe
                comes through the wall or floor).
              </li>
              <li>
                Standard brass BS 951 — no DSEAR insulating insert needed. Sized for the pipe
                diameter (usually 15-28 mm in domestic).
              </li>
              <li>
                Plastic incoming water supply (modern blue MDPE pipe) doesn\'t need bonding.
                Bond the consumer-side metal pipework only.
              </li>
            </ul>
            <p>
              On a TT installation, the buried water main can sometimes provide a useful
              parallel earth path back to the local water board\'s buried network — but BS 7671
              specifically does NOT permit using a water main as the only or primary earth
              electrode (Reg 542.2.5 and the IET Wiring Regulations historically restricted this
              after PE upgrades elsewhere broke the assumption). Bond it for protection, but
              install a proper local rod electrode for the actual TT earth.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.2 (Protective equipotential bonding)"
            clause="In each consumer's installation within a building, extraneous-conductive-parts liable to introduce a dangerous potential difference shall be connected to the main earthing terminal by protective bonding conductors complying with Chapter 54."
            meaning={
              <>
                The headline regulation. Every extraneous-conductive-part liable to introduce a
                potential gets bonded to the MET. "Extraneous-conductive-part" is defined in
                Part 2 as a conductive part liable to introduce a potential (generally earth
                potential) and not forming part of the electrical installation. This covers
                gas, water, oil, structural steel, lightning protection earth, and any other
                metallic services. Plastic incoming pipes are not conductive → not extraneous
                → no bond required.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.2."
          />

          <SectionRule />

          <ContentEyebrow>Oil and other fuel services</ContentEyebrow>

          <ConceptBlock
            title="Oil-fuelled boilers — bond per gas convention"
            plainEnglish="Oil supply pipework (steel) entering the building gets bonded per the same rules as gas — DSEAR considerations apply because oil/diesel is flammable."
          >
            <p>
              Oil-fired domestic central heating and commercial oil-fed boilers typically have
              a steel oil supply pipe running from an external storage tank to the boiler.
              That pipework is extraneous-conductive (steel, enters the building from outside)
              and is bonded per Reg 411.3.1.2.
            </p>
            <p>The bond install:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                BS 951 clamp suitable for oil — similar specification to gas (DSEAR
                considerations apply because oil vapour is flammable). Many BS 951 clamps marked
                "suitable for gas" are also suitable for oil.
              </li>
              <li>
                Position per Reg 544.1.2 — consumer side of any external isolator/valve, before
                any branch, within 600 mm of point of entry to the building where practicable.
              </li>
              <li>
                Sized per Reg 544.11 — same as gas/water main bonding (typically 10 mm² Cu on
                domestic PME, 16 mm² on bigger PEN).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Structural steel — multiple bonds, big buildings</ContentEyebrow>

          <ConceptBlock
            title="Commercial steel-framed buildings — bond at multiple points"
            plainEnglish="A commercial steel frame is one massive extraneous-conductive-part. Bond it at multiple accessible points around the building back to the MET. Multiple bonds give multiple parallel paths and ensure equipotential reference across the whole frame."
            onSite="Typical commercial install: bond the nearest column to the meter cabinet with a 25 mm² Cu cable to the MET. Bond additional accessible columns or beams at strategic points (corners of the building, near plant rooms, etc.) — all routed back to the MET, all with their own dedicated cables. No daisy-chaining."
          >
            <p>
              Structural steel framework characteristics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Mechanically continuous across the building via welded/bolted connections.
              </li>
              <li>
                Often has substantial ground contact via concrete-encased foundations — this
                acts as a parallel earth electrode and can dominate the installation\'s earth
                impedance.
              </li>
              <li>
                Large surface area exposed throughout the building — anyone touching a steel
                column is touching the same conductor as everyone else touching any other column.
                Equipotential reference is critical.
              </li>
            </ul>
            <p>
              The bonding strategy:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Multiple bond points</strong> — typically 2-4+ depending on building
                size. Each bond independent, each routed back to the MET.
              </li>
              <li>
                <strong>Sized per Reg 544.11</strong> — large commercial PEN often requires
                25 mm² or 35 mm² Cu bonding per Table 54.8.
              </li>
              <li>
                <strong>Cross-reference BS EN 50522</strong> for HV installations and bigger
                commercial earthing arrangements where the BS 7671 framework needs supplementing.
              </li>
              <li>
                <strong>Document on the EIC</strong> — list every bond point, location, cable
                size, continuity reading.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Lightning protection — BS EN 62305</ContentEyebrow>

          <ConceptBlock
            title="LPS earth network — bonded to MET per BS EN 62305"
            plainEnglish="A lightning protection system has its own earth electrode network (down-conductors to ground rods at the building perimeter). That network is bonded to the building\'s electrical MET to prevent large potential differences during a strike."
            onSite="On commercial/industrial buildings with a Type I, II, III or IV LPS per BS EN 62305 — the lightning designer specifies the bonding arrangement (direct bond or via spark gap / isolating SPD). The electrician implements the connection to the MET."
          >
            <p>
              BS EN 62305 (lightning protection) and BS 7671 (electrical) work together via
              the equipotential bonding system. The two main configurations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Non-isolated LPS</strong> — the LPS earth is directly bonded to the
                building\'s electrical MET. Simplest, common on most commercial buildings.
                Works because the electrical and lightning earth networks reach the same
                potential during a strike — no flashover, no equipment damage.
              </li>
              <li>
                <strong>Isolated LPS</strong> — the LPS down-conductors are kept electrically
                isolated from the electrical system, with bonding only via a controlled spark
                gap (isolating SPD) at the MET. Used where direct bonding could transmit
                lightning energy into sensitive electronic equipment (e.g. data centres,
                broadcast towers). The spark gap conducts only when potential difference
                reaches the gap\'s breakdown voltage.
              </li>
            </ul>
            <p>
              Without an LPS-to-MET bond (in either configuration), a lightning strike can
              produce kV-range potential differences between the LPS earth and the electrical
              earth — causing flashover across air gaps inside the building, equipment damage,
              and shock hazards to anyone touching electrical equipment during the strike.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>PV arrays, battery storage and special locations</ContentEyebrow>

          <ConceptBlock
            title="PV arrays — Section 712 plus manufacturer instructions"
            plainEnglish="The aluminium frame of a PV array is bonded back to the inverter or to a dedicated earthing terminal — protective bonding for DC fault scenarios plus surge mitigation for nearby lightning."
            onSite="Domestic rooftop PV is increasingly common. Section 712 of BS 7671 covers PV systems specifically; the manufacturer\'s installation manual is normative per Reg 134.1. The frame bonding is independent of the AC-side main bonding which still applies to the building."
          >
            <p>
              PV system bonding considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DC-side frame bonding</strong> — aluminium panel frames and steel
                mounting rails bonded together and back to the inverter or to a dedicated PV
                earthing terminal. Sized per the system designer\'s specification (often 6 mm²
                or 10 mm² Cu).
              </li>
              <li>
                <strong>AC-side bonding</strong> — the inverter\'s AC output is part of the
                building\'s normal electrical install and is governed by standard BS 7671
                bonding (Reg 411.3.1.2 etc.) and main bonding at the MET.
              </li>
              <li>
                <strong>Surge protection</strong> — surge protective devices (SPDs) on both DC
                and AC sides limit lightning-induced surges from coupling into the PV system.
              </li>
              <li>
                <strong>BS 7909 + the IET Code of Practice for Grid-Connected Solar Photovoltaic
                Systems</strong> provide additional industry guidance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Battery energy storage — Section 712 + Section 426 + manufacturer"
            plainEnglish="Battery enclosures get bonded back to the system earth. The DC busbars need fault-current path provisions. Manufacturer instructions are normative — read them alongside BS 7671."
          >
            <p>
              Battery energy storage systems (Tesla Powerwall, GivEnergy, Solax, Sonnen, etc.)
              add complexity beyond straight PV:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Battery enclosure exposed-conductive-parts bonded back to system earth.
              </li>
              <li>
                DC switchgear and isolators rated for the battery\'s short-circuit current.
              </li>
              <li>
                AC-coupled inverter complies with the standard AC ADS framework (Reg 411.3.2
                disconnection times, Reg 415.1.1 RCD additional protection).
              </li>
              <li>
                Manufacturer installation instructions are normative per Reg 134.1 — always
                read alongside BS 7671 Section 712.
              </li>
              <li>
                G98/G99 commissioning paperwork to the DNO if grid-connected.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Swimming pools, agricultural, caravan parks — Section 7XX rules"
            plainEnglish="Each special location has its own BS 7671 section with overlay bonding requirements that go beyond the general Reg 411.3.1.2 framework."
          >
            <p>The main special-location sections that affect bonding:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 701 — bath/shower rooms.</strong> Supplementary bonding rules
                with the Reg 701.415.2 omission permission (covered in Sub 5).
              </li>
              <li>
                <strong>Section 702 — swimming pools and other basins.</strong> Extensive
                supplementary bonding inside Zones 0/1/2 around the pool. Omission permission
                does NOT apply in pool zones.
              </li>
              <li>
                <strong>Section 703 — rooms containing sauna heaters.</strong> Special equipment
                rules in Zones 1/2 around the heater.
              </li>
              <li>
                <strong>Section 705 — agricultural and horticultural premises.</strong>
                Supplementary bonding required between accessible exposed and extraneous parts,
                particularly in livestock areas where touch-voltage thresholds are lower for
                animals.
              </li>
              <li>
                <strong>Section 708 — caravan and camping parks.</strong> TT installation rules
                with specific bonding for the caravan supply.
              </li>
              <li>
                <strong>Section 711 — exhibitions, shows and stands.</strong> Temporary install
                rules with TT supply considerations.
              </li>
              <li>
                <strong>Section 712 — PV systems</strong> (covered above).
              </li>
            </ul>
            <p>
              When working in any special location, ALWAYS read the relevant Section in
              addition to the general Chapter 41 / Chapter 54 rules. The Section overrides or
              supplements the general framework.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 544.1.2 (Connection of main protective bonding conductors)"
            clause="The main protective bonding connection to any extraneous-conductive-part such as gas, water or other metallic pipework or service shall be made as near as practicable to the point of entry of that part into the premises. Where there is a meter, isolation point or union, the connection shall be made to the consumer's hard metal pipework and before any branch pipework. Where practicable the connection shall be made within 600 mm of the meter outlet union or at the point of entry to the building if the meter is external."
            meaning={
              <>
                The "such as gas, water or other metallic pipework or service" language is
                deliberately broad — it covers oil pipework, structural steel framing, district
                heating mains, fire suppression supplies, and any other metallic service that
                enters the building. The 600 mm / consumer side / before branch position rules
                apply to all of them. Each service gets its own independent bond cable back to
                the MET.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 544.1.2 — paraphrased. See also Note 1."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where multi-service bonding goes wrong</ContentEyebrow>

          <CommonMistake
            title="Bonding plastic-bodied gas pipe on a modern domestic"
            whatHappens={
              <>
                The DNO has replaced the old galvanised steel gas service with a modern
                polyethylene (PE) supply that runs in plastic right up to the meter. You see
                the visible exposed PE pipe and reflexively fit a BS 951 clamp on it,
                terminating a 10 mm² G/Y bond back to the MET. The bond does nothing
                electrically (plastic doesn\'t conduct, no current can flow through it), but
                the install passes visual inspection because the cable looks correct. Six
                months later an EICR engineer codes it as an observation — not C1 or C2
                because there\'s no danger created, but the install includes a non-functional
                bond that suggests the electrician didn\'t understand the requirement.
              </>
            }
            doInstead={
              <>
                Identify whether the incoming pipe is metal or plastic before fitting any bond.
                BS 7671 Part 2 — extraneous-conductive-part requires conductive material. Plastic
                doesn\'t qualify. The metal CONSUMER-SIDE pipework downstream of the meter
                still does (typically the steel or copper internal pipework). Bond there per
                the standard 600 mm / before branch / consumer side rules. On modern installs
                where everything is plastic until well inside the building, the bond goes wherever
                the first metal pipework appears — could be at the boiler, could be at a
                branch — provided it\'s before any further branch.
              </>
            }
          />

          <Scenario
            title="Commercial unit — structural steel + steel roof + gas + water + LPS — full bonding scheme"
            situation={
              <>
                You\'re commissioning a new commercial unit (warehouse with attached office).
                Steel-frame structure, steel-clad roof and walls, gas service for the office
                heating, water service for office and warehouse washroom, lightning protection
                system per BS EN 62305 Class III on the roof, TN-C-S supply with 95 mm² PEN.
                Design the multi-service bonding scheme.
              </>
            }
            whatToDo={
              <>
                (1) MET location: typically inside the main electrical intake panel, near the
                supply head and meter. (2) Earthing conductor from MET to the supplier PEN
                block — sized per Table 54.8 against the 95 mm² PEN = 25 mm² Cu minimum.
                (3) Main bonding to gas service: 25 mm² G/Y (Table 54.8 against 95 mm² PEN),
                gas-rated BS 951 clamp on consumer-side steel pipework before any branch,
                within 600 mm of meter outlet, dedicated cable back to the MET. (4) Main
                bonding to water service: 25 mm² G/Y, standard brass BS 951 clamp on consumer-
                side metal pipework before any branch, within 600 mm of stop-tap, dedicated
                cable back to MET. (5) Structural steel bonding: identify accessible bonding
                points on the steel frame — typically the nearest column to the MET, plus 2-3
                additional accessible columns/beams at strategic points around the building.
                25 mm² G/Y from each bond point back to the MET (no daisy-chain). BS 951
                clamps suited to the steel section (purpose-made structural bonding clamps for
                large sections). (6) LPS bonding: per BS EN 62305 designer\'s spec — Class III
                LPS is typically non-isolated, so direct bond from the LPS earth electrode
                network to the MET. 25 mm² Cu cable. (7) Document on the EIC: every bond point,
                cable size, continuity reading, photo of the install. (8) Continuity test every
                bond from MET to the connection point per Sub 4. (9) Sign off when every bond
                tests under 0.05 ohm and warning labels are fitted at every clamp.
              </>
            }
            whyItMatters={
              <>
                A multi-service commercial bonding scheme is the most complex application of
                Reg 411.3.1.2 + 544.1.2 + Table 54.8 + BS EN 62305 you\'ll encounter on a
                routine commercial install. The principle is simple: every extraneous-
                conductive-part gets its own dedicated cable back to the MET. The complexity
                is in the count — typically 6-12 bond points on a small commercial unit, more
                on larger sites. Each one tested, each one documented, each one labelled.
                Multi-service buildings live or die on bonding quality during a fault.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'General rule: every extraneous-conductive-part entering the building gets bonded to the MET per Reg 411.3.1.2 + Reg 544.1.2 (consumer side, before branch, within 600 mm).',
              'Gas services need DSEAR-rated BS 951 clamps with insulating insert. Water uses standard brass BS 951. Oil follows gas convention.',
              'Plastic incoming services (PE gas, blue MDPE water) don\'t need bonding — not extraneous-conductive. The metal consumer-side pipework downstream still does.',
              'Structural steel framing on commercial buildings is bonded at multiple accessible points back to the MET — independent dedicated cables, no daisy-chain.',
              'Lightning protection systems per BS EN 62305 are bonded to the MET — directly (non-isolated LPS) or via a spark gap (isolated LPS).',
              'PV arrays bond the aluminium frame back to the inverter or PV earthing terminal per Section 712 + manufacturer instructions. Battery storage adds enclosure bonding plus DC switchgear considerations.',
              'Special locations (Section 702 swimming pools, 705 agricultural, 708 caravan parks, 711 exhibitions) have additional supplementary bonding rules — read the relevant Section.',
              'When the DNO converts a TN-S supply to TN-C-S (PME), bonding sizing must be re-verified against Table 54.8 — the original TN-S bonds may now be undersized.',
            ]}
          />

          <Quiz title="Bonding scenarios — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Main vs supplementary
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section5/5-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Inspecting a dead installation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
