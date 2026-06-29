/**
 * Module 4 · Section 3 · Sub 5 — Terminate wiring systems
 * City & Guilds 2365-02 → Unit 204 → LO3 → AC 3.5
 *   AC 3.5 — "Terminate wiring systems"
 *
 * Conductor prep, strip length, ferrules for stranded, torque settings,
 * crimp lugs for incomers, soldered joints (rare). Reg 526.1, 526.5, 526.9.
 * Worked example: terminating 6 mm² T&E into a 32 A RCBO in a Hager DB.
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
  'Terminate wiring systems (3.5) | Level 2 Module 4.3.5 | Elec-Mate';
const DESCRIPTION =
  'Conductor preparation, strip length, ferrules, torque settings, crimp lugs and the BS 7671 526.1 / 526.5 / 526.9 termination regulations. The skill that makes the difference between a circuit that works for thirty years and one that fails its first IR test.';

const checks = [
  {
    id: 'strip-length',
    question:
      'You are terminating 2.5 mm² T&E into the screw terminal of a 13 A socket. Strip length per the manufacturer (MK, Hager, Schneider) typical instruction is approximately:',
    options: [
      '8-12 mm — full terminal grip on the conductor.',
      '2-3 mm — just enough copper to make electrical contact.',
      '20-25 mm — a long tail gives a more secure connection.',
      'Strip length does not matter as long as some copper enters the terminal.',
    ],
    correctIndex: 0,
    explanation:
      '8-12 mm is the typical strip length for screw terminals on standard accessories. Stripped too short and the screw bites partly into insulation (poor contact, IR fail). Stripped too long and bare conductor projects beyond the terminal (shock risk, EICR observation, cable identification fail). Each manufacturer gives the exact figure in the data sheet — Reg 526.1 / 526.5 reference.',
  },
  {
    id: 'torque-discipline',
    question:
      'Hager NDN132A RCBO terminal torque per the manufacturer&rsquo;s data sheet is 1.2 Nm. You over-tighten "by feel" with a screwdriver. What is the most likely failure mode?',
    options: [
      'Crushed conductor strands → reduced effective CSA → high-resistance joint → eventual loop test fail or thermal damage.',
      'The terminal screw thread strips, so the conductor immediately falls out of the device.',
      'The RCBO trips instantly the first time the circuit is energised.',
      'Nothing — a tighter terminal always gives a better, lower-resistance connection.',
    ],
    correctIndex: 0,
    explanation:
      'Over-torquing crushes the conductor under the terminal. The crushed strands have higher resistance than uncompressed copper, the joint runs hot under load, the local heating accelerates oxidation, and the joint progressively fails. By the next periodic inspection the loop impedance test catches it. The fix is a torque screwdriver set to the manufacturer&rsquo;s figure — typically 1.0-1.5 Nm for circuit-side terminals on a domestic RCBO, 3.5-4.0 Nm for incomer terminals.',
  },
  {
    id: 'ferrule-when',
    question:
      'You are terminating a 4 mm² fine-stranded flex (CL5 or CL6) into a cage-clamp / push-in terminal of a control panel. What termination preparation is mandatory?',
    options: [
      'Tin the stripped strands with solder before inserting into the terminal.',
      'Twist the strands tightly and double them back on themselves before insertion.',
      'Fit a heat-shrink sleeve over the strands to hold them together.',
      'Crimp a ferrule (bootlace ferrule, sometimes called a "wire end") onto the stripped conductor before insertion.',
    ],
    correctIndex: 3,
    explanation:
      'Ferrules are mandatory for fine-stranded conductors (CL5/CL6 — flex grades) entering cage-clamp or push-in terminals. The ferrule is a metal sleeve crimped onto the strands; the cage-clamp then grips the ferrule, not the loose strands. Without a ferrule, individual strands escape the terminal grip, the effective CSA reduces, and you get a high-resistance joint. Tinning with solder is now considered worse practice (the solder creeps under load and the joint loosens) — ferrules are the modern correct answer.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 526.1 (BS 7671) requires every termination to provide:',
    options: [
      'A minimum insulation resistance of 1 MΩ measured across the joint.',
      'Durable electrical continuity, adequate mechanical strength and protection.',
      'A disconnection time of no more than 0.4 seconds under fault conditions.',
      'A green/yellow sleeve over every conductor entering the terminal.',
    ],
    correctAnswer: 1,
    explanation:
      'Verbatim from Reg 526.1 — "Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection." Three requirements: continuity (will conduct), strength (will not pull apart), protection (insulation, enclosure, against vibration etc.). Every other termination regulation builds on these three.',
  },
  {
    id: 2,
    question:
      'You are terminating into a manufacturer-specified terminal, but the data sheet is missing. Best practice torque value for a domestic RCBO circuit terminal:',
    options: [
      'Approximately 0.2-0.4 Nm — barely more than finger-tight to avoid crushing the conductor strands.',
      'Approximately 8-12 Nm — matching a sub-main MCCB terminal for mechanical security.',
      'Approximately 1.0-1.5 Nm — typical for cage-clamp / screw terminals on small CSAs in domestic RCBOs.',
      'Approximately 5-6 Nm — the universal default applied across all consumer-unit terminals.',
    ],
    correctAnswer: 2,
    explanation:
      'Domestic-scale RCBO/MCB circuit terminals typically take 1.0-1.5 Nm. Larger devices and incomer terminals (40-100 A) take 3.5-4.5 Nm. Sub-main and three-phase distribution terminals can go to 8-12 Nm. The manufacturer data sheet is the source of truth — use a torque screwdriver, set to the spec, and confirm in writing on the test certificate.',
  },
  {
    id: 3,
    question:
      'A "loop in, loop out" termination at a 13 A socket means:',
    options: [
      'A single cable enters and a single cable leaves through opposite knockouts of the same back-box.',
      'The line conductor loops straight through while the neutral and CPC terminate at the socket only.',
      'The cable is looped back on itself within the terminal to double the effective contact area.',
      'Two cables — one in from the previous socket, one out to the next — land in the same terminal.',
    ],
    correctAnswer: 3,
    explanation:
      'On a ring final, every socket has two cables landing — one from each direction of the ring. Both line conductors share the line terminal, both neutrals the neutral terminal, both CPCs the earth terminal. Reg 526.9 (A4:2026) requires one terminal one conductor unless the terminal is designed for multiple — most modern accessory terminals are designed for two T&E conductors, three is pushing it.',
  },
  {
    id: 4,
    question:
      'Reg 526.9 (A4:2026 update) requires:',
    options: [
      'One terminal, one conductor — unless the terminal is specifically designed and approved for multiple conductors.',
      'Every terminal must accept a minimum of three conductors to allow for future spurs.',
      'All conductors at a single point must be soldered together before terminating.',
      'Conductors of different CSA may always be combined in any screw terminal.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 526.9 (with A4:2026 strengthening) defaults to one terminal one conductor. Common-or-garden screw terminals on consumer-unit busbars and DIN-rail terminals are typically designed for one conductor. Looped accessory terminals (sockets, switches) accept two by design. For three or more conductors at one point, use a Wago-style lever terminal block (designed for multiples) — never force a third conductor into a two-rated terminal.',
  },
  {
    id: 5,
    question:
      'Crimped lugs (compression terminations) are typically used for:',
    options: [
      'Lighting circuits below 1.5 mm² where ordinary screw terminals would crush the small conductor.',
      'Heavy CSA conductors (25 mm² and above) and any cable terminating onto a stud, where screw terminals are impractical.',
      'Any flexible cord on a portable appliance, fitted in place of a moulded plug top.',
      'Final ring-circuit sockets, where the loop terminals are unable to grip two conductors.',
    ],
    correctAnswer: 1,
    explanation:
      'Crimped lugs (also called compression lugs or sometimes "Burndy" after the brand) are the standard for 25 mm² and larger conductors landing on bus-bar studs, transformer terminals, switchgear bolted joints. Use a hex-die hydraulic crimper sized for the lug; the resulting termination is a single solid mass with full conductor contact. Below 25 mm² screw terminals work fine; above 25 mm² they are impractical and a crimp is the answer.',
  },
  {
    id: 6,
    question:
      'A nicked conductor (the strip cut went too deep and removed a few strands) should be:',
    options: [
      'Tinned with solder to bridge the missing strands before terminating.',
      'Terminated as-is, since a few missing strands make no practical difference.',
      'Cut back to the undamaged conductor and re-stripped at the new length.',
      'Wrapped with extra insulation tape to compensate for the lost copper.',
    ],
    correctAnswer: 2,
    explanation:
      'Nicked conductors lose effective CSA at the nick — the cable is then under-rated for its design current at that point, runs hotter, and can fail. Reg 526.1 requires durable electrical continuity. The fix is always to cut back to clean copper and re-strip. A few extra millimetres of cable lost is nothing compared to a callback for a heat-damaged termination.',
  },
  {
    id: 7,
    question:
      'BS 7671 Reg 526.5 requires every termination to be made:',
    options: [
      'At least 150 mm from any other cable to prevent electromagnetic interference.',
      'Only by a person holding a current 18th Edition qualification certificate.',
      'Using copper conductors only — aluminium terminations are prohibited indoors.',
      'Within a suitable accessory, an equipment enclosure, or an enclosure partially formed of non-combustible material — i.e. NOT dangling in free air or in a cable bundle.',
    ],
    correctAnswer: 3,
    explanation:
      'Verbatim Reg 526.5 — terminations must be inside a suitable accessory (socket back-box, FCU, switch), an equipment enclosure (consumer unit, JB), or an enclosure formed of non-combustible material. The free-floating "joint in the loft" with insulation tape and chocolate block is a 526.5 fail. Use a maintenance-free Wago JB or an Ashley/Hager screwed JB instead.',
  },
  {
    id: 8,
    question:
      'You are terminating a 25 mm² SWA into a switch fuse. The cable has steel wire armour, three line conductors and a CPC. The correct termination sequence is:',
    options: [
      'Bond the armour at the gland with a banjo washer for earth continuity, then strip, ferrule and terminate the cores to spec.',
      'Strip and terminate the cores at the device first, then cut the armour flush and leave it unbonded inside the enclosure.',
      'Terminate all four conductors into the line terminals and bond the steel armour across to the neutral bar.',
      'Cut the steel armour back to the outer sheath and rely on the cores alone for both supply and earth.',
    ],
    correctAnswer: 0,
    explanation:
      'SWA termination is a sequence — gland (with banjo washer if required), armour clamp inside the gland for earth continuity, strip outer sheath inside the gland, prepare individual conductor ends (strip + ferrule for fine-stranded; bare conductor for solid), terminate to device, torque per spec. The armour bonding is what makes the SWA armour the CPC for the cable — without it, the armour is floating metal at potentially dangerous voltage during a fault.',
  },
];

const faqs = [
  {
    question: 'What torque should I use if the manufacturer data sheet is not available?',
    answer:
      'Most domestic RCBO/MCB circuit terminals are 1.0-1.5 Nm. Larger device terminals (40-100 A devices) are 3.5-4.5 Nm. Sub-main and three-phase distribution can go to 8-12 Nm. ALWAYS try to find the data sheet first — manufacturers vary, and the spec is on the data sheet, the side of the device, or the installation manual. As a last resort, the IET On-Site Guide and Hager / Schneider / Wylex generic torque tables are an acceptable fallback. Record the torque value used on your test certificate.',
  },
  {
    question: 'Do I always need a ferrule on stranded conductors?',
    answer:
      'On fine-stranded conductors (CL5 or CL6 — flex grades) entering cage-clamp or push-in terminals — yes, mandatory. On coarse-stranded conductors (CL2 — typical for SWA cores and some control cable), screw terminals grip them well without a ferrule, although a ferrule still tidies the termination and is good practice. On solid conductors (T&E line/neutral, single-core building wire) ferrules are unnecessary — the solid conductor is mechanically rigid by itself.',
  },
  {
    question: 'How do I terminate two cables in one socket terminal?',
    answer:
      'For a "loop in, loop out" termination on a ring final or daisy-chained radial, the socket terminal is designed to accept two T&E line/neutral conductors side by side. Strip both to 8-12 mm, twist them together so the two conductors form a single tight bundle, insert into the terminal, tighten the screw to the manufacturer spec. The screw clamps both conductors together for a single solid joint. Reg 526.9 (one terminal one conductor) accepts this because the terminal is specifically designed for two — check the data sheet.',
  },
  {
    question: 'Can I solder a conductor termination?',
    answer:
      'Soldered terminations are now rare in modern installations. The classic exception was the old-school CPC-to-copper-pipe bond using a soldered crimp — and that is now usually replaced by a clamp-style earth bond. Some specialised terminations (RF / data, specific manufacturer requirements) may still call for solder. For mains-voltage work, solder has largely been replaced by crimp lugs and screw terminals because solder can creep under sustained load and the joint loosens over time.',
  },
  {
    question: 'What is the right torque screwdriver to buy for everyday work?',
    answer:
      'A good 1.0-5.0 Nm torque screwdriver covers most domestic and light commercial work — Wera, Wiha and Knipex all make decent ones. For heavier work (40-100 A device terminals, sub-main switchgear) a separate 5-25 Nm torque wrench is the next step up. The torque screwdriver gets calibrated periodically (annually for paid work) and you record the cal date on your tools. Not having a torque screwdriver and tightening "by feel" used to be acceptable; in 2026 it is a documentation and quality fail.',
  },
  {
    question: 'Why does Reg 526.9 limit one conductor per terminal?',
    answer:
      'Two conductors of different CSA in one terminal mean the screw clamps the larger conductor first and may not properly grip the smaller one. Three or more conductors in a non-rated terminal mean uneven clamping force, individual conductors slip, and the connection fails progressively. The A4:2026 strengthening of 526.9 makes this clearer — terminals designed for one conductor take one conductor; for multiples, use a designed-for-multiples terminal (Wago lever block, dedicated busbar, looped-terminal accessory). The cost of the right terminal is trivial compared to the cost of a failed joint.',
  },
];

export default function Sub5() {
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
            eyebrow="Module 4 · Section 3 · Subsection 5"
            title="Terminate wiring systems"
            description="Conductor preparation, strip length, ferrules, torque, crimp lugs, the differences between accessory / device / panel terminations. The skill that makes the difference between a circuit that works for thirty years and one that fails its first IR test."
            tone="emerald"
          />

          <TLDR
            points={[
              'Reg 526.1 — every connection must provide durable electrical continuity, adequate mechanical strength and protection. Three requirements, no shortcuts.',
              'Strip length matches the terminal (typical 8-12 mm for accessory screw terminals); ferrule fine-stranded flex into cage-clamp / push-in terminals; never solder under modern practice.',
              'Torque to the manufacturer data sheet (typical 1.0-1.5 Nm domestic RCBO circuit terminals, 3.5+ Nm incomers). A torque screwdriver is now standard kit, not a luxury.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Terminate wiring systems — verbatim AC 3.5 from City & Guilds 2365-02 Unit 204.',
              'Prepare a conductor for termination — strip to the manufacturer-specified length, no nicks on the copper, insulation back to the terminal entry.',
              'Apply ferrules to fine-stranded conductors entering cage-clamp / push-in terminals; identify when ferrules are mandatory vs optional.',
              'Torque every screw / cage-clamp termination to the manufacturer data sheet using a calibrated torque screwdriver, recording the value on test documentation.',
              'Crimp compression lugs onto large CSA conductors (25 mm² and above) using a correctly sized hex die.',
              'Apply BS 7671 termination regulations — 526.1 (durable continuity, mechanical strength, protection), 526.5 (terminations within enclosures), 526.9 (one terminal one conductor unless designed otherwise — A4:2026 update).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The three foundation regulations — 526.1, 526.5, 526.9</ContentEyebrow>

          <ConceptBlock
            title="Reg 526.1 — durable continuity, mechanical strength, protection"
            plainEnglish="Reg 526.1 sets out three requirements for every termination. Durable electrical continuity — it must conduct properly, indefinitely, under load and under fault. Adequate mechanical strength — it must not pull apart under cable weight or vibration. Adequate protection — the termination must be enclosed and the conductor properly insulated. Three requirements, every termination, no exceptions."
          >
            <p>
              The three requirements drive every termination decision:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Durable electrical continuity</strong> — the joint conducts properly
                forever. Implies clean strip, correct strip length, correct torque, correct
                terminal type for the conductor. A nicked conductor or a loose terminal
                fails this.
              </li>
              <li>
                <strong>Adequate mechanical strength</strong> — the joint does not pull
                apart. Implies cable supported back from the termination (Reg 522.8.5),
                proper terminal grip, no strain on the connection. A cable hanging from
                its terminal fails this.
              </li>
              <li>
                <strong>Adequate protection</strong> — the joint is enclosed and the live
                conductor is not exposed. Implies the termination is inside an accessory,
                an equipment enclosure, or a non-combustible enclosure (Reg 526.5). A
                joint floating in a loft on chocolate block fails this.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1 (Electrical connections)"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection. The selection of the means of connection shall take account of, as appropriate: (a) the material of the conductor and its insulation; (b) the conductor class, the number and shape of the wires forming the conductor; (c) the cross-sectional area of the conductor; (d) the number of conductors to be connected together; (e) the temperature attained at the terminals in normal service; (f) the provision of adequate locking arrangements in situations subject to vibration."
            meaning={
              <>
                Reg 526.1 is the headline termination regulation. Read items (a) through (f)
                — they are the design considerations every termination decision must respect.
                Item (b) covers the ferrule-on-flex requirement (fine-stranded CL5/CL6 needs
                ferrules for cage-clamp terminals); item (e) covers the torque-by-spec
                requirement (over-torque heats the terminal in service); item (f) covers
                vibration applications where spring washers or thread-locking compounds
                may be needed (motor terminations, vehicle electrics).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 526.1 (verbatim — first paragraph and selection criteria)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.5 (Termination location)"
            clause="Every termination and joint in a live conductor or a PEN conductor shall be made within one of the following or a combination thereof: (a) a suitable accessory complying with the appropriate product standard; (b) an equipment enclosure complying with the appropriate product standard; (c) an enclosure partially formed or completed with building material which is non-combustible when tested to BS 476-4."
            meaning={
              <>
                Reg 526.5 is the regulation that bans the floating loft join. Every
                termination in live conductors must live inside a suitable accessory
                (socket back-box, FCU, switch enclosure), inside equipment (consumer unit,
                isolator, switch fuse, motor terminal box), OR inside an enclosure made of
                non-combustible material (a metal JB, a Wago Click-Pro maintenance-free
                connector inside a JB, a fire-rated cement-bound enclosure for permanent
                joints). The era of "twist and tape" or "chocolate block in the loft" is
                long over — these have been 526.5 fails for two decades. Modern equivalent:
                Wago lever blocks inside an Ashley or Hager metal JB.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 526.5 (verbatim)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.9 (One terminal, one conductor — A4:2026 update)"
            clause="(Paraphrased from the regulation as updated in A4:2026.) Where a terminal is intended for the connection of one conductor only, only one conductor shall be terminated in that terminal. Where multiple conductors are required to be terminated at a single point, a terminal designed and rated for that number of conductors shall be used."
            meaning={
              <>
                Reg 526.9 was clarified in A4:2026 to make explicit what was previously implied.
                Common-or-garden screw terminals on busbars and DIN-rail terminals are designed
                for one conductor. Looped accessory terminals on sockets and switches are
                designed for two T&E conductors side by side. For three or more conductors at
                one electrical node, use a Wago lever block (designed for multiples), a
                dedicated bus terminal, or a heavy stud-and-nut termination with multiple
                lugs. NEVER force a third conductor into a two-rated terminal — the screw
                bites only on the largest, the others slip, and the joint is a 526.1 fail.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 526.9 (paraphrased; updated A4:2026)."
          />

          <SectionRule />

          <ContentEyebrow>Conductor preparation — strip, no nicks, length</ContentEyebrow>

          <ConceptBlock
            title="Strip length — match the terminal"
            plainEnglish="Each terminal type has an ideal strip length. Stripped too short and the screw clamps onto insulation; stripped too long and bare conductor projects beyond the terminal. The right length is on the manufacturer data sheet — typically 8-12 mm for screw terminals on accessories, 6-10 mm for cage-clamp on RCBOs, 8-15 mm for crimp ferrules on flex."
            onSite="Most accessories have a strip-length gauge moulded into the back face — line up the cable, mark the strip point on the insulation, strip with side cutters or a quality wire stripper. Avoid the temptation to strip 'about right' — the gauge is on the back of the accessory for a reason."
          >
            <p>
              The technique:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Outer sheath</strong> on T&E — cut along the seam with a sharp blade
                (Stanley, hooked T&E knife, or proper T&E sheath stripper). Pull the
                sheath back; never pull the conductors out and re-sheath.
              </li>
                <li>
                  <strong>Inner insulation</strong> — use a wire stripper sized for the conductor
                  CSA. Set the gauge to the manufacturer strip length. Strip without
                  nicking the copper.
                </li>
              <li>
                <strong>Inspect the copper</strong> — bright, undamaged, no missing strands.
                Any nick or missing strand reduces the effective CSA at the termination
                and is a 526.1 fail. Cut back and re-strip.
              </li>
              <li>
                <strong>Ferrule (if applicable)</strong> — slide a ferrule sized for the
                conductor over the strip, crimp with a ferrule-crimper.
              </li>
              <li>
                <strong>Insert into terminal</strong> — full strip length into the terminal,
                insulation right up to the terminal entry, no bare copper projecting beyond.
              </li>
              <li>
                <strong>Torque</strong> — to the manufacturer spec, with a torque screwdriver.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="No nicks — the apprentice trap"
            plainEnglish="A nick on the conductor (a missing strand or a cut into the copper from over-aggressive stripping) reduces the effective CSA at that point. The cable is then under-rated for the design current at the nick, runs hotter, and over time fails. Apprentices nick conductors when they strip with side cutters set too tight, or with a Stanley knife at too steep an angle. The fix is always to cut back to clean copper and re-strip."
            onSite="A 2.5 mm² T&E with three strands missing at the termination is effectively a ~2.0 mm² conductor at that point. Under load, the resistance is 25 % higher, the heating is 25 % higher, and the local hot spot accelerates oxidation. The IR test passes because the conductor is intact electrically; the loop test passes because the path is complete; but the joint is degrading from day one and will eventually show up as a thermal hot spot on a thermography survey."
          >
            <p>
              The cure: a quality wire stripper (automatic or hand-set), the right gauge for
              the conductor, and the discipline to inspect every strip. Cheap "cable knife"
              type strippers are the worst offenders for nicking. A Knipex or Wiha automatic
              stripper costs ~£40 and pays back in zero nicked conductors over its lifetime.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Stranded conductors — ferrules</ContentEyebrow>

          <ConceptBlock
            title="Ferrules on fine-stranded flex into cage-clamp terminals"
            plainEnglish="Fine-stranded flex (CL5 or CL6 — flex grades like H07RN-F rubber flex, panel wire) has dozens or hundreds of tiny copper strands. Pushing those strands into a cage-clamp or push-in terminal lets individual strands escape the terminal grip; the effective contact area shrinks and the joint runs hot. A bootlace ferrule — a metal sleeve crimped onto the strands — gives the cage-clamp a single solid surface to grip. Mandatory for fine-stranded conductors, optional for coarse-stranded, never on solid."
          >
            <p>
              The ferrule sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Strip the flex to ~12 mm (or the ferrule-recommended length, usually printed on the ferrule packet).</li>
              <li>Twist the strands lightly between thumb and finger to gather them into a single bundle.</li>
              <li>Slide the ferrule over the strands — full ferrule length engaged with the conductor.</li>
              <li>Crimp the ferrule with a ferrule-specific crimping tool (square or hex jaws, sized for the ferrule). Tube ferrules need a square crimp; cup ferrules need a specific cup-die.</li>
              <li>Inspect — the crimped ferrule should be tightly bonded to the conductor with no individual strands projecting from the rear collar.</li>
              <li>Insert ferruled conductor into the cage-clamp terminal, full ferrule length engaged.</li>
              <li>Tighten / actuate the terminal per the device manufacturer spec.</li>
            </ul>
            <p>
              Ferrule colours follow IEC 60228 — yellow for 1.0 mm², red for 1.5 mm², blue
              for 2.5 mm², grey for 4 mm², black for 6 mm², and so on. The colour matches
              the conductor CSA so you can verify at a glance that the right ferrule went on.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Torque — the discipline that catches everyone</ContentEyebrow>

          <ConceptBlock
            title="Torque to the manufacturer data sheet — every termination, every time"
            plainEnglish="Every screw and cage-clamp terminal has a torque value specified by the device manufacturer. Under-torque and the terminal grip is loose; the joint runs hot and eventually fails. Over-torque and the conductor is crushed; effective CSA reduces, the joint runs hot, eventually fails. Either way, the failure mode is hot terminal, eventual loop or IR test fail. The cure is a torque screwdriver set to the spec — every termination, every time."
            onSite="Tightening 'by feel' was acceptable for two generations of electricians. In 2026 it is a quality and documentation fail. NICEIC and NAPIT both expect torque values to be recorded on test certificates for new installations. A torque screwdriver is now mandatory kit, not a nice-to-have."
          >
            <p>
              Typical torque ranges (always verify with the data sheet):
            </p>
            <div className="space-y-2.5 sm:hidden">
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Domestic RCBO circuit terminal (Hager NDN, Schneider Resi9, Wylex NHX)</div>
                <p className="text-[13px] text-white/85 mt-1">~1.0 - 1.5 Nm</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Consumer-unit incomer / main switch terminal</div>
                <p className="text-[13px] text-white/85 mt-1">~3.5 - 4.5 Nm</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Sub-main / 3-phase MCCB terminal</div>
                <p className="text-[13px] text-white/85 mt-1">~8 - 12 Nm</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">13 A socket terminal (BS 1363 standard)</div>
                <p className="text-[13px] text-white/85 mt-1">~0.6 - 0.8 Nm</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Light switch terminal (BS EN 60669)</div>
                <p className="text-[13px] text-white/85 mt-1">~0.5 - 0.7 Nm</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">M5 / M6 stud termination (transformer / switchgear)</div>
                <p className="text-[13px] text-white/85 mt-1">~3 - 5 Nm / ~6 - 9 Nm</p>
              </div>
            </div>
            <ul className="hidden sm:block space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Domestic RCBO circuit terminal</strong> — ~1.0-1.5 Nm.</li>
              <li><strong>Consumer-unit incomer / main switch</strong> — ~3.5-4.5 Nm.</li>
              <li><strong>Sub-main / 3-phase MCCB terminal</strong> — ~8-12 Nm.</li>
              <li><strong>13 A socket terminal (BS 1363)</strong> — ~0.6-0.8 Nm.</li>
              <li><strong>Light switch terminal (BS EN 60669)</strong> — ~0.5-0.7 Nm.</li>
              <li><strong>M5 / M6 stud termination</strong> — ~3-5 Nm / ~6-9 Nm.</li>
            </ul>
            <p>
              Buy a torque screwdriver in the 1-5 Nm range (covers most domestic and light
              commercial); add a 5-25 Nm wrench for heavier work. Get them calibrated
              annually for paid work. Record the torque value on the test certificate where
              required.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <ConceptBlock
            title="Torque tooling — Wera, Wiha, Knipex preset drivers and calibration"
            plainEnglish="A torque screwdriver is now standard kit, not a luxury. The right tool for everyday domestic / light commercial work is a 1.0-5.0 Nm preset or click-style torque screwdriver. For incomer terminals and sub-main work add a 5-25 Nm torque wrench. Both need calibration on a published interval — the click is only meaningful if the tool is in calibration."
            onSite="Wera Klick-Plus, Wiha TorqueVario-S and Knipex 98 35 are the common picks for the 1-5 Nm range — all click-style with audible / tactile feedback at the set torque. Battery / electronic torque drivers (Atlas Copco, Stanley) are also available but overkill for domestic. Whichever you buy, store it horizontally with the torque dialled DOWN to the lowest setting (extends spring life)."
          >
            <p>
              Tooling and calibration essentials:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Range</strong> — 1.0-5.0 Nm covers most domestic and light
                commercial work. Add a 5-25 Nm wrench for incomers, sub-main, MCCB and
                stud terminations.
              </li>
              <li>
                <strong>Mechanism</strong> — preset (set once, click at value) or adjustable
                (dial in the value, click at value). Preset is faster on repetitive
                terminations of the same value; adjustable is more flexible across mixed
                work.
              </li>
              <li>
                <strong>Bit holder</strong> — 1/4&quot; hex insert standard. Carry a set of
                quality insulated bits — slot, Pozi, Phillips, Torx — sized for the
                terminals you are working on.
              </li>
              <li>
                <strong>Calibration interval</strong> — annually for paid work is the
                widely-accepted standard (NICEIC and NAPIT both expect this). Industrial /
                heavy commercial may demand 6-monthly. Keep the calibration certificate
                with the tool.
              </li>
              <li>
                <strong>Storage</strong> — torque DIALLED DOWN to lowest setting after use.
                Storing a click driver at high torque overnight loads the internal spring
                and shifts the calibration.
              </li>
              <li>
                <strong>Field check</strong> — periodic spot-check against a calibrated
                reference torque (a beam-style wrench or a calibrated transducer) is good
                practice between formal calibrations. Cheap to do, catches drift early.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Inspecting your termination after torque — visible cues"
            plainEnglish="The click of the torque driver is not the end of the termination — visual inspection confirms the joint is correct. Run through the same five checks on every termination and you catch failures before they go live."
            onSite="A 30-second visual check after every torque saves an hour of fault-finding three months later. Make it a habit on every cage-clamp, every screw terminal, every cocoon-style RCBO connection."
          >
            <p>
              The five visible cues:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conductor fully home</strong> — the strip length matches the
                terminal depth; no insulation pinched in the terminal jaws; no bare
                copper projecting beyond the terminal entry.
              </li>
              <li>
                <strong>Insulation right up to the terminal</strong> — no gap of bare
                conductor exposed between terminal entry and inner sheath / outer sleeve.
                Gap = shock risk + identification fail.
              </li>
              <li>
                <strong>Tug test</strong> — gentle pull on the conductor in the direction
                it leaves the terminal, confirm zero movement. Movement means the strip
                was wrong (insulation in the terminal) or the torque was wrong / set too
                low. Re-strip and re-torque.
              </li>
              <li>
                <strong>Conductor not crushed</strong> — over-torque is hidden by a screw
                that visibly bites into the conductor through to the underside. If the
                conductor looks flattened or the strands are escaping past the terminal
                under-surface, the torque was too high. Cut back, re-strip, re-torque
                using the calibrated tool at spec.
              </li>
              <li>
                <strong>Sleeving / colour identification correct</strong> — CPC sleeved
                green/yellow along its full length inside the enclosure (Reg 514.4.2);
                neutral conductor used as a switch line sleeved brown; phase identifiers
                where required for three-phase. The right colour at every termination
                is part of "durable continuity" because the next person needs to read
                it correctly.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Crimp lugs and large-CSA terminations</ContentEyebrow>

          <ConceptBlock
            title="Crimp lugs for 25 mm² and above"
            plainEnglish="Above 25 mm² CSA, screw terminals are impractical and crimp compression lugs are the standard. The lug is sized for the conductor CSA, the bolt diameter and the terminal type (ring, fork, pin). A hex-die hydraulic crimper compresses the lug onto the conductor with the right force; the resulting termination is a single solid mass with full conductor contact."
          >
            <p>
              Crimp lug sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Strip the conductor to the lug barrel length (usually printed on the lug).</li>
              <li>Slide the lug barrel over the stripped conductor — full barrel engagement, no gap at the rear.</li>
              <li>Position the lug in the correct hex-die size on the crimper.</li>
              <li>Crimp — typically two crimps per lug for larger sizes (one near the rear, one near the front of the barrel).</li>
              <li>Inspect — visible hex shape on the crimped barrel, no projecting strands, no cracks in the lug.</li>
              <li>Heat-shrink sleeve over the lug barrel for insulation continuity.</li>
              <li>Bolt to the terminal with the correct torque (e.g. M10 stud → ~14-20 Nm).</li>
            </ul>
            <p>
              For even larger conductors (95 mm² and up) hydraulic crimpers are essential —
              the manual long-arm crimpers cannot generate enough force for a reliable crimp
              above ~50 mm². Hire or buy a battery-electric hydraulic crimper for the job.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Worked example — terminating 6 mm² T&E into a 32 A RCBO</ContentEyebrow>

          <Scenario
            title="6 mm² T&E into a Hager NDN132A RCBO in a 14-way Hager domestic CU"
            situation={
              <>
                You are second-fixing a kitchen rewire. The cooker circuit is 6 mm² T&E
                running ~12 m from a Hager 14-way Design 30 CU to the cooker isolator.
                The CU device is a Hager NDN132A 32 A Type B RCBO Type A. The CU has been
                installed (back box screwed to wall, dual-pole isolator confirmed locked
                off). The cable is in the CU, ~250 mm of tail at the device end.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1.</strong> Confirm safe isolation — incomer locked off, MCB
                main switch locked off, voltage indicator proved against a known supply,
                tested at the device terminal. (Sub 7 details the JIB 9-step procedure.)
                <br /><br />
                <strong>Step 2.</strong> Strip the T&E outer sheath back ~150 mm, expose
                the line, neutral and CPC conductors. CPC sleeve with green/yellow PVC
                sleeving along its full length inside the CU (Reg 514.4.2 — colour
                identification).
                <br /><br />
                <strong>Step 3.</strong> Cut the conductors to the right length so they
                land cleanly at the RCBO without strain. Allow ~80 mm spare in the CU
                bus-bar gutter for future rework.
                <br /><br />
                <strong>Step 4.</strong> Strip 8 mm of inner insulation off each conductor
                (Hager spec for the NDN132A cage-clamp terminal — verify on the device or
                the data sheet). Wire stripper set to 6 mm² gauge. Inspect each strip — no
                nicks, no missing strands, bright copper.
                <br /><br />
                <strong>Step 5.</strong> Insert line into the bottom right terminal of the
                NDN132A (line-circuit-out). Insert neutral into the bottom left terminal
                (neutral-circuit-out). Insert CPC into the earth bar of the CU at a free
                terminal way.
                <br /><br />
                <strong>Step 6.</strong> Torque each terminal to 1.2 Nm using a calibrated
                torque screwdriver (Wera Klick-Plus or equivalent). Confirm "click" on
                each terminal. NEVER over-torque "by feel" — 1.2 Nm is the spec.
                <br /><br />
                <strong>Step 7.</strong> Tug-test each conductor — gentle pull on the
                conductor in the direction it leaves the terminal, confirm no movement.
                A loose conductor on tug-test means the strip was wrong (insulation in
                the terminal) or the torque was wrong. Re-strip and re-torque if needed.
                <br /><br />
                <strong>Step 8.</strong> Visually inspect — line and neutral fully home in
                the terminals, no bare copper projecting beyond, no insulation pinched
                under the cage-clamp, CPC fully sleeved with green/yellow up to the earth
                bar terminal.
                <br /><br />
                <strong>Step 9.</strong> Snap the RCBO module onto the bus-bar (verify the
                bus-bar comb is positioned correctly and the device clicks home). Confirm
                the bus-bar links to the device line-input terminal.
                <br /><br />
                <strong>Step 10.</strong> Record on the test certificate — torque value
                (1.2 Nm), conductor CSA (6 mm²), device (Hager NDN132A 32 A Type A
                Type B), termination type (cage-clamp), date, technician initials.
              </>
            }
            whyItMatters={
              <>
                A bad termination at a CU is the most common single cause of failed
                periodic inspections in domestic installations. The fix is procedural —
                strip to spec, torque to spec, document. Two minutes of discipline per
                termination beats two hours of remedial work in three years. Reg 526.1
                says it has to be durable; this sequence is what durable looks like.
              </>
            }
          />

          <CommonMistake
            title="Over-torquing a 1.2 Nm RCBO terminal 'by feel' with a screwdriver"
            whatHappens={
              <>
                You snug the screw down hard, "to make sure it is tight". Stranded copper
                under the terminal crushes flat — effective CSA reduces by 20-30 %. The
                joint resistance goes up. Under load, the local heating goes up. Six
                months later the terminal is visibly discoloured (heat browning), and
                a thermography survey shows a hot spot at the device. The next periodic
                inspection catches it as a C2 observation; the customer is in the works.
              </>
            }
            doInstead={
              <>
                Use a torque screwdriver, set to the manufacturer spec, every time. A
                Wera Klick-Plus 1-5 Nm torque screwdriver is ~£80 and lasts a decade.
                It clicks audibly when the spec torque is reached and prevents
                over-tightening even if you keep going. Record the torque value on the
                test certificate where required (NICEIC and NAPIT both expect this on
                new domestic installations from 2026 onwards). The discipline is small;
                the failure-mode reduction is enormous.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 526.1 — every termination must provide durable electrical continuity, adequate mechanical strength and protection. Three requirements, every termination.',
              'Reg 526.5 — terminations live inside accessories, equipment enclosures, or non-combustible enclosures. Floating loft joints with chocolate block are a 526.5 fail.',
              'Reg 526.9 (A4:2026 update) — one terminal, one conductor unless the terminal is designed for multiples. Use Wago lever blocks for 3+ at one node.',
              'Strip length to manufacturer spec (typical 8-12 mm screw, 6-10 mm cage-clamp). No nicks on the copper — re-strip if you damage the conductor.',
              'Ferrules on fine-stranded flex (CL5/CL6) into cage-clamp / push-in terminals — mandatory. Optional on coarse-stranded; never on solid.',
              'Torque to the manufacturer data sheet — typical 1.0-1.5 Nm domestic RCBO circuits, 3.5+ Nm incomers, 8-12 Nm sub-main. Calibrated torque screwdriver is now standard kit.',
              'Crimp lugs for 25 mm² and above — hex-die crimper, full barrel engagement, two crimps per lug for larger sizes, heat-shrink sleeve over the barrel.',
              'Record torque values on test certificates for new installations — NICEIC / NAPIT expectation from 2026.',
            ]}
          />

          <Quiz title="Terminating wiring systems — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.4 Installing wiring systems and supports
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.6 Maintain safe working practices
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
