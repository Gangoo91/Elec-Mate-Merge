/**
 * Module 4 · Section 4 · Sub 2 — Terminate bonding cables
 * Maps to City & Guilds 2365-02 / Unit 204 / LO4 / AC 4.2
 *   AC 4.2 — "Terminate cables"
 *
 * Frame: A bonding conductor is only as good as its terminations. Strip,
 * sleeve, ferrule, land. No joints. Continuous run from MET to clamp. Done
 * to spec, accessible for inspection, signed off on the EIC.
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

const TITLE = 'Terminate bonding cables | Level 2 Module 4.4.2 | Elec-Mate';
const DESCRIPTION =
  'Stripping, sleeving, ferruling and landing main protective bonding conductors at the MET and at the BS 951 clamp — durable connections, no mid-run joints, accessible for inspection.';

const checks = [
  {
    id: 'm4-s4-sub2-strip-length',
    question:
      'You are landing a 10 mm² G/Y main bonding conductor into a brass MET busbar with a 12 mm cage clamp. The screw clamps directly onto the bare conductor. What is the right strip length?',
    options: [
      'Strip 30 mm so plenty of conductor is in the terminal.',
      'Strip just enough that the bare conductor fully fills the clamp depth (about 12 mm) and no bare conductor protrudes outside the terminal — typically strip 12 to 15 mm and trim flush after tightening.',
      'Strip 5 mm — minimum contact is best.',
      'Do not strip at all — modern terminals self-strip.',
    ],
    correctIndex: 1,
    explanation:
      'Strip the conductor to match the terminal depth. Bare conductor outside the terminal is exposed (insulation breach risk) and inside the terminal it should fill the clamp without leaving stranded wires waving free. 12-15 mm is a typical guide — always check the manufacturer instructions for the specific terminal block.',
  },
  {
    id: 'm4-s4-sub2-ferrule',
    question:
      'Why fit a bootlace ferrule on the end of a stranded 10 mm² G/Y conductor before landing into a screw-clamp earth bar?',
    options: [
      'For decoration.',
      'To gather the strands together so the screw clamps a single solid pin rather than 49 individual strands — improves contact pressure, prevents stray strands escaping the terminal and reduces the risk of damage to the strands when tightened.',
      'To make the conductor smaller.',
      'Because BS 7671 mandates ferrules on every termination.',
    ],
    correctIndex: 1,
    explanation:
      'Cage-clamp and screw-clamp terminals are designed to compress a single solid pin. Crushing 49 stranded wires individually leads to broken strands, partial contact, and Reg 526.1 non-compliance for "durable electrical continuity". A bootlace ferrule (crimped with a hex die, not a square die — a square crush damages the conductor) presents a clean pin into the terminal.',
  },
  {
    id: 'm4-s4-sub2-no-joints',
    question:
      'You are running a 10 mm² G/Y main bonding from the MET in the meter cabinet to the gas service in the kitchen, but the cable is 1.5 m short. The customer asks if you can splice it with a junction box hidden inside the kitchen wall void to save another trip. What do you do?',
    options: [
      'Splice it — junction boxes are fine.',
      'Refuse. Reg 543.3.2 requires every connection or joint in a protective conductor to be accessible for inspection, testing and maintenance. A junction box buried in a wall void is not accessible. The right answer is to fit a continuous run by going back to the wholesaler for a longer length, or by terminating both ends at an accessible MJB inside the meter cabinet.',
      'Solder the joint and tape it.',
      'Use a Wagobox in the void since they are inspection-rated.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 543.3.2 — "Every connection and joint shall be accessible for inspection, testing and maintenance except as provided by Regulation 526.3." A wall-void junction is not on the 526.3 exception list (those are buried-in-ground, encapsulated, in-equipment by manufacturer, and a few similar). Main bonding should be a single continuous run from MET to clamp. If you absolutely cannot avoid a joint, it goes inside the meter cabinet where it can be lifted and inspected.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS 7671 regulation sets the general requirements for every connection between conductors — durable continuity, mechanical strength, protection?',
    options: ['Reg 411.3.1.2', 'Reg 526.1', 'Reg 643.2.1', 'Reg 514.4.2'],
    correctAnswer: 1,
    explanation:
      'Reg 526.1 — "Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection." It also lists factors to take account of when selecting the means of connection: conductor material, class, CSA, number of conductors, terminal temperature, vibration. Sub 2 hangs everything off this reg.',
  },
  {
    id: 2,
    question:
      'A bonding conductor termination must be accessible for inspection, testing and maintenance. Which BS 7671 reg states this for protective conductor connections?',
    options: ['Reg 543.3.2', 'Reg 514.13.1', 'Reg 411.5.3', 'Reg 543.4.1'],
    correctAnswer: 0,
    explanation:
      'Reg 543.3.2 — "Every connection and joint shall be accessible for inspection, testing and maintenance except as provided by Regulation 526.3." 526.3 lists the narrow exceptions: buried-in-ground, encapsulated, manufacturer-sealed equipment, etc. Wall-void junction boxes do not qualify.',
  },
  {
    id: 3,
    question:
      'You are stripping the outer insulation off a 10 mm² G/Y single-core conductor with a sharp knife. Which technique avoids damaging the conductor strands?',
    options: [
      'Score the insulation in a straight cut along its length and pull the insulation back.',
      'Ring-cut the insulation around the conductor at the strip length, scoring only partway through to avoid touching the strands, then snap and pull off.',
      'Strip with cable cutters by squeezing them on the cable.',
      'Burn the insulation off with a lighter.',
    ],
    correctAnswer: 1,
    explanation:
      'Ring-cut technique: rotate the knife around the conductor scoring the insulation only halfway through, then bend the insulation past the cut to snap it cleanly, then slide the insulation off. Lengthwise scoring almost always nicks the strands. Cable cutters squeezed on the conductor crush the strands. Always inspect the bare conductor after stripping — any nicked, snapped or kinked strands and you cut back and start again.',
  },
  {
    id: 4,
    question:
      'When crimping a bootlace ferrule onto a 10 mm² stranded conductor, what crimper jaw profile must you use?',
    options: [
      'Square jaw — crushes the ferrule symmetrically.',
      'Hex jaw — gives equal compression around the ferrule, maintains the round profile and the conductor cross-section.',
      'Pliers — any jaw profile is fine.',
      'Trapezoidal — half-square half-hex.',
    ],
    correctAnswer: 1,
    explanation:
      'Hex (six-sided) crimp die. Square dies deform the ferrule and conductor unevenly, leaving voids and reducing contact area. Manufacturer-specified ratchet crimpers with hex dies (Knipex, Klauke, Phoenix Contact, etc.) are the trade standard. The crimp should be tight enough to grip the ferrule firmly without flaring the brass tube.',
  },
  {
    id: 5,
    question:
      'You are terminating a 16 mm² G/Y bonding conductor at a BS 951 earth clamp using a copper compression lug. Which tool is correct?',
    options: [
      'Hand pliers.',
      'A ratchet hydraulic crimper with the correct hex die for the lug barrel size — applies the manufacturer-specified compression force, releases only at full crimp.',
      'A vice with a hammer.',
      'A self-locking spanner.',
    ],
    correctAnswer: 1,
    explanation:
      'Ratchet crimpers (mechanical for up to about 16 mm², hydraulic for larger) with the correct hex die. The ratchet only releases once full compression force has been reached — guarantees a consistent crimp regardless of operator strength. Hand pliers cannot generate the force needed for a gas-tight crimp. Crimping with the wrong die size leaves a void around the conductor and a high-resistance joint.',
  },
  {
    id: 6,
    question:
      'You are landing a bonding conductor at a screw-terminal MET in a meter cabinet that is exposed to occasional moisture (external cabinet, condensation visible on metalwork). What additional measure should you take?',
    options: [
      'Nothing — terminals are sealed by design.',
      'Apply petroleum jelly or non-acidic grease to the prepared conductor and the terminal threads to inhibit corrosion. Heatshrink the joint if there is any risk of dripping water reaching it. Tighten to the manufacturer torque spec.',
      'Spray PVC into the terminal.',
      'Solder the conductor into the terminal.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 522 covers external influences. Where moisture is a factor, anti-corrosion grease on the conductor and terminal threads is the trade response. Heatshrink over the termination keeps water off entirely. Soldering is not a recommended termination method for protective conductors (Reg 526.2 has restrictions). Tightening to torque spec is mandatory regardless of environment.',
  },
  {
    id: 7,
    question:
      'A bonding cable termination at an MET is not torqued to the manufacturer spec — the screw is hand-tight only. Three months later the cable lifts out under its own weight. What was the underlying failure mode?',
    options: [
      'The cable was the wrong size.',
      'A loose terminal was not gas-tight, oxidisation built up at the contact face over weeks, contact resistance climbed, the joint heated under any current draw, the heat softened the terminal screw and conductor, and the connection failed mechanically. Reg 526.1 (durable electrical continuity and adequate mechanical strength) failure.',
      'The MET busbar is the wrong material.',
      'The cable insulation is the wrong colour.',
    ],
    correctAnswer: 1,
    explanation:
      'Loose joint to oxide film growth to contact resistance rise to I-squared-R heat at the joint under any current to thermal cycling weakens the metalwork to eventual mechanical failure. The classic loose-terminal failure cascade. Always torque to the manufacturer specification — most domestic terminals on G/Y bonding cable are 2.5 to 4.0 Nm depending on the terminal design. Buy a torque screwdriver, set it once, use it every time.',
  },
  {
    id: 8,
    question:
      'Why must the bonding conductor entering an MET busbar be insulated G/Y rather than bare strap, except inside an enclosure-as-CPC?',
    options: [
      'For colour matching.',
      'Reg 543.3.201 — protective conductors up to and including 6 mm² shall be protected throughout by a covering at least equivalent to a single-core non-sheathed cable of voltage rating 450/750 V. The same insulation requirement extends to bonding conductors. Bare strap is only allowed where it forms part of a metallic conduit/enclosure used as the protective conductor itself.',
      'Bare conductor would short to live.',
      'Insulation prevents corrosion.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 543.3.201 sets the insulation requirement. Bare protective conductors in open routing are a fault risk (can touch live conductors during a disturbance, can be damaged mechanically). The standard G/Y single-core sleeved cable sold for bonding meets the 450/750 V cover requirement. Bare bonding strap is only seen inside metallic enclosures that are themselves the protective conductor (rare in modern domestic).',
  },
];

const faqs = [
  {
    question: 'Why is "no joints in main bonding" so often quoted?',
    answer:
      'Because Reg 543.3.2 requires every protective conductor joint to be accessible for inspection, and a hidden mid-run splice in a wall void or above a ceiling fails that test. The pragmatic interpretation: run the bonding cable as one continuous length from the MET to the BS 951 clamp on the service. If you absolutely have to join (cable was short, route is complicated), do it inside the meter cabinet where the joint can be lifted, tested and seen.',
  },
  {
    question: 'Should I always fit a ferrule on stranded bonding cable?',
    answer:
      'On any cage-clamp or screw-clamp terminal that is designed for solid conductor, yes. The ferrule presents a single pin, the clamp grips evenly, contact pressure is uniform. On terminals specifically designed for stranded conductor (rare on bonding terminals, common on switchgear feed terminals) the manufacturer instructions govern. When in doubt, ferrule. The cost is pence and the joint quality is dramatically improved.',
  },
  {
    question: 'What is the right torque for a bonding cable into an MET screw terminal?',
    answer:
      'Read the manufacturer specification on the MET or terminal. Typical values for domestic 10 mm² and 16 mm² G/Y into a brass MET busbar are 2.5 to 4.0 Nm. Buy a calibrated torque screwdriver, set it to the spec, click once. Never guess or "just feel right" — under-torque leads to loose joints, over-torque damages the screw thread or shears the terminal. Document the torque value in the EIC where the cabinet is custom commercial gear.',
  },
  {
    question: 'Can I solder a bonding conductor termination?',
    answer:
      'Reg 526.2 puts restrictions on soldered connections in protective conductors — they must be designed to take account of creep, mechanical stress and temperature rise under fault conditions. In practice, solder is rarely used on bonding terminations because (a) it cannot be inspected non-destructively, (b) creep under thermal cycling weakens the joint over years, and (c) crimped lugs and screw clamps do the job faster and more reliably. If you are tempted to solder a bonding joint, fit a crimped lug instead.',
  },
  {
    question: 'What about heat-shrink at terminations — required or optional?',
    answer:
      'Optional but good practice on terminations exposed to moisture, condensation or mechanical disturbance. A short length of heat-shrink over the BS 951 clamp jaw and the conductor entry seals out water and stops anyone snagging the conductor when working in the cupboard. Inside a dry meter cabinet the bare clamp is fine. Outside cabinets, exposed runs and any termination near a water source — heat-shrink is cheap insurance.',
  },
  {
    question: 'How do I identify bonding terminations on the EIC schedule of inspection?',
    answer:
      'Schedule of Inspection — under "Earthing and bonding arrangements" you tick off the presence of main bonding to extraneous-conductive-parts, the integrity of MET connections, and warning notices. Schedule of Test Results captures the continuity reading from each bond back to the MET (Sub 4 of this Section covers the test). Photos of every termination on completion are good practice — they evidence the install if anyone ever queries it later.',
  },
];

export default function Sub2() {
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
            eyebrow="Module 4 · Section 4 · Subsection 2"
            title="Terminate bonding cables"
            description="Stripping, sleeving, ferruling and landing the bonding conductor at the MET and the BS 951 clamp. Continuous run, no mid-run joints, every termination accessible for inspection per Reg 543.3.2."
            tone="emerald"
          />

          <TLDR
            points={[
              'A bonding conductor is only as good as its terminations. Reg 526.1 — "durable electrical continuity and adequate mechanical strength and protection".',
              'Cage-clamp and screw-clamp terminals: ferrule the stranded conductor first (hex die crimp). Screw-on lugs: ratchet crimp with the correct hex die. Always torque to manufacturer spec.',
              'No mid-run joints. Reg 543.3.2 — every connection accessible for inspection. Run continuous from MET to BS 951 clamp; if you must join, do it inside the meter cabinet where it can be inspected.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Strip 10 mm² and 16 mm² G/Y conductors cleanly using ring-cut technique without nicking the strands.',
              'Fit bootlace ferrules and compression lugs with the correct ratchet crimper and hex die.',
              'Land bonding conductors into MET busbars and BS 951 earth clamps to manufacturer torque specification.',
              'Cite Reg 526.1 (durable continuity, mechanical strength) and Reg 543.3.2 (accessibility of joints) and apply them on site.',
              'Identify when heat-shrink, anti-corrosion grease or other environmental protection is required at a termination.',
              'Recognise the failure mode of a loose, oxidised or mechanically weak termination and prevent it through correct preparation and torque.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why termination quality is the whole game</ContentEyebrow>

          <ConceptBlock
            title="A correctly sized bonding conductor with a bad termination is a failed bond"
            plainEnglish="The cable is the easy bit. The termination is where 90% of bonding failures originate — loose screws, crushed strands, hidden joints, oxidised contacts. Get the termination right and the cable does its job for the life of the installation."
            onSite="Walk into any 1980s domestic meter cupboard and you will see what a generation of poor terminations looks like — green-and-yellow strap floating loose under a rusty screw, no ferrule, no torque, no labelling. Every one of those is a Code C2 on the next EICR."
          >
            <p>
              The bonding conductor's purpose is to maintain a low-impedance path from the
              extraneous-conductive-part (gas pipe, water service, structural steel) back to the
              MET — at all times, including under the worst-case fault current the supply can
              deliver. The cable itself, sized per Reg 544.11 / Table 54.8 (covered in Sub 1), can
              easily handle that current. What kills bonds is the joints at each end:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Loose terminals</strong> — screws not torqued, vibration loosens further
                over years, oxide film builds at the contact face, resistance climbs, joint heats
                under any current, eventual mechanical failure.
              </li>
              <li>
                <strong>Damaged strands</strong> — knife-strip nicks half the strands, only the
                surviving strands carry current, fault current overloads them and they part.
              </li>
              <li>
                <strong>Stranded conductor in solid-conductor terminal</strong> — clamp crushes
                strands unevenly, partial contact, point heating under fault current.
              </li>
              <li>
                <strong>Hidden joints</strong> — junction boxes in wall voids, joints inside
                ceiling roses, splices behind kitchen units. Inaccessible for inspection,
                degraded over time, fail silently.
              </li>
              <li>
                <strong>Wrong material at the contact</strong> — bare copper conductor onto a
                galvanised steel pipe with no inhibitor leads to dissimilar-metal corrosion at the
                joint within months.
              </li>
            </ul>
            <p>
              Every bullet on that list is preventable with correct technique and the right kit.
              Reg 526.1 requires "durable electrical continuity and adequate mechanical strength
              and protection" — the rest of this Sub is how that gets achieved on site.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connection between conductors)"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection. The selection of the means of connection shall take account of, as appropriate: (a) the material of the conductor and its insulation; (b) the conductor class, the number and shape of the wires forming the conductor; (c) the cross-sectional area of the conductor; (d) the number of conductors to be connected together; (e) the temperature attained at the terminals in normal service such that the effectiveness of the insulation of the conductors connected to them is not impaired; (f) the provision of adequate locking arrangements in situations subject to vibration or thermal cycling. Where a soldered connection is used the design shall take account of creep, mechanical stress and temperature rise under fault conditions."
            meaning={
              <>
                Two requirements — electrical continuity and mechanical strength — and a checklist
                of what to think about when selecting the connection method. Bonding conductors
                are stranded copper, multiple strands, heavy CSA. The factors that matter for them
                are material (copper to brass clamp, fine; copper bare onto steel pipe, needs
                inhibitor), strand count (ferrule before cage-clamp), CSA (right die for the
                crimper), terminal temperature (correct torque to keep contact tight), and locking
                in vibration (apply Loctite or use serrated washers on industrial gear).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 526.1."
          />

          <SectionRule />

          <ContentEyebrow>Conductor preparation — strip, sleeve, ferrule</ContentEyebrow>

          <ConceptBlock
            title="Strip the insulation cleanly — ring-cut technique"
            plainEnglish="Score the insulation around the conductor only partway through, snap it past the score, slide it off. Inspect the bare strands — any nicks, kinks or broken wires and you cut back and start again."
            onSite="A sharp knife or a dedicated stripping tool. Never use cutters squeezed shut on the conductor — that crushes the strands. Strip length matches the terminal depth, typically 12–15 mm for a 10 mm² conductor into a domestic MET cage clamp."
          >
            <p>The right sequence for a hand-stripped 10 mm² G/Y conductor:</p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Hold the cable steady. Pick a strip length that matches the terminal depth (read
                the terminal spec — usually 12 to 15 mm for a 10 mm² into a 12 mm cage clamp).
              </li>
              <li>
                Place a sharp knife perpendicular to the cable at the strip length. Rotate the
                cable while applying light pressure — score the insulation only halfway through.
                Stop. Do NOT cut through to the conductor.
              </li>
              <li>
                Bend the cable past the score line. The insulation snaps cleanly along the score.
                Slide the insulation off with thumb and finger.
              </li>
              <li>
                Inspect the bare strands. Every strand should be bright copper, full diameter, no
                nicks or kinks. If even one strand is damaged, cut back 30 mm and start again. A
                nicked strand is a hot-spot waiting to happen under fault current.
              </li>
              <li>
                Bend the strands gently to confirm they are loose and undamaged. Any stiff strands
                indicate cold-work damage from over-tight insulation pliers.
              </li>
            </ol>
            <p>
              Dedicated cable stripping tools (Knipex MultiStrip, Klein, Jokari) speed this up on
              big jobs but the principle is the same — score, snap, slide. Avoid the rotating
              tools that "auto-strip" by squeezing closed on the conductor; they almost always
              nick the strands of stranded G/Y. The hand technique is faster and cleaner once
              practiced.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Bootlace ferrules — present a single pin into the terminal"
            plainEnglish="A small brass tube with an insulated funnel on the back. Slide it over the bare strands, crimp with a hex die. The strands become one solid pin that the terminal screw can clamp evenly."
            onSite="Knipex Twin-Crimp or similar self-adjusting ratchet crimper, with hex jaws sized for 10 mm² ferrules. Strip length should match the ferrule barrel length (usually 12 mm). Check the ferrule colour code — 10 mm² ferrules are typically ivory/white."
          >
            <p>
              Bootlace ferrules (also called "wire-end ferrules" or "cord-end terminals") are
              short brass tubes with a coloured plastic insulation funnel on the unloaded end.
              Standard sizes match standard cable CSAs and the colour code is BS standard:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1.0 mm²</strong> — yellow funnel.
              </li>
              <li>
                <strong>1.5 mm²</strong> — black funnel.
              </li>
              <li>
                <strong>2.5 mm²</strong> — blue funnel.
              </li>
              <li>
                <strong>4 mm²</strong> — grey funnel.
              </li>
              <li>
                <strong>6 mm²</strong> — yellow (lighter shade) funnel.
              </li>
              <li>
                <strong>10 mm²</strong> — red or ivory funnel.
              </li>
              <li>
                <strong>16 mm²</strong> — blue or ivory funnel.
              </li>
            </ul>
            <p>
              Crimp with a hex jaw die (six-sided) that matches the ferrule CSA. Square dies
              deform the ferrule and conductor, leaving voids in the contact area. The ratchet
              should be a calibrated mechanical or hydraulic crimper — manufacturers like Knipex,
              Klauke, Phoenix Contact, Weidmüller all sell trade-grade tools. After crimping,
              tug-test the ferrule. It should not pull off under firm hand pressure.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Compression lugs — for ring or fork termination at BS 951 clamps"
            plainEnglish="A brass barrel with a hole at one end. Strip the cable, slide the conductor into the barrel, crimp with a hex die, bolt the ring through the BS 951 clamp screw."
            onSite="Larger bonding cables (16 mm² and up) terminating onto a BS 951 earth clamp screw use a copper compression lug. The lug barrel size must match the conductor CSA exactly — under-size and the conductor doesn't fit; over-size and the crimp leaves a void."
          >
            <p>
              Steps for a 16 mm² G/Y to BS 951 clamp termination:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Strip the cable to match the lug barrel length (usually 18-22 mm for a 16 mm²
                lug).
              </li>
              <li>
                Slide the lug onto the conductor. The conductor end should sit flush with the
                back of the barrel, with no strands sticking out beyond.
              </li>
              <li>
                Position the lug in the ratchet crimper using the correct hex die for the lug
                barrel size. Squeeze the ratchet through to its full release point — the ratchet
                won't release until full compression force is reached.
              </li>
              <li>
                Inspect the crimp. The barrel should be visibly compressed into a hex shape, no
                flaring at the ends, no escaped strands. Tug-test the lug — it should not move
                under firm pull.
              </li>
              <li>
                Apply a small amount of anti-corrosion grease (e.g. Cuprosolv, petroleum jelly,
                Vaseline) to the lug ring and the BS 951 clamp screw thread. This prevents
                galvanic corrosion at the dissimilar-metal joint over years of service.
              </li>
              <li>
                Bolt the lug through the BS 951 clamp screw, washer between, tighten to the BS 951
                manufacturer torque spec (typically 4-6 Nm for a 10 mm² to 16 mm² clamp).
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Landing the conductor — MET and clamp</ContentEyebrow>

          <ConceptBlock
            title="At the MET — single common terminal, every conductor labelled"
            plainEnglish="The MET is the brass busbar inside the meter cabinet (or in a dedicated MET enclosure). Every CPC, the earthing conductor and every main bonding conductor lands here. Each one in its own terminal hole, each one labelled at the conductor end."
            onSite="On a domestic install you typically see a 6-way or 8-way MET busbar. Earthing conductor in one hole, bonding to gas in another, bonding to water in a third, CPCs from each circuit in their own. Never daisy-chain — each conductor has its own dedicated terminal."
          >
            <p>Termination procedure at the MET:</p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Identify a free terminal hole on the MET busbar. If the busbar is full, fit an
                additional MET extension or a larger busbar. Never double-up two conductors in
                one hole — that creates a poor-contact joint and fails Reg 526.1.
              </li>
              <li>Strip the conductor to terminal depth, ferrule the strands.</li>
              <li>
                Insert the ferrule into the terminal hole. The ferrule should sit fully inside —
                no bare conductor visible outside the terminal body. If it's a screw-clamp, check
                the screw is fully backed off so the terminal jaws are open.
              </li>
              <li>
                Tighten the terminal screw to the manufacturer torque spec (typically 2.5 to
                4.0 Nm for domestic MET busbars). Use a calibrated torque screwdriver — never
                eyeball it.
              </li>
              <li>Tug-test the conductor. It should not move under firm hand pull.</li>
              <li>
                Apply a permanent label at the conductor entry to identify what the bond goes to
                ("Gas service", "Water service", "Structural steel", etc.). Cable-tie label or
                heat-shrink label sleeve, both acceptable.
              </li>
            </ol>
            <p>
              The labelling is what makes the MET inspectable five years later when somebody else
              opens the cabinet to do an EICR. Without labels, every conductor has to be traced to
              source — wastes time, raises the risk of mis-identification.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="At the BS 951 clamp — clean pipe, correct clamp, conductor through the lug"
            plainEnglish="Clean the pipe to bare metal at the clamp position. Wrap the BS 951 jaw around the pipe. Land the lug into the clamp screw. Tighten. Apply the warning label."
            onSite="Sub 3 covers BS 951 clamp selection and pipe prep in detail. From a termination perspective: the conductor end at the clamp is either bolted via a compression lug (preferred for 16 mm² and up) or directly bare into a screw-clamp on the BS 951 (acceptable for 10 mm² with a cage-clamp BS 951 design)."
          >
            <p>The two common termination methods at the clamp end:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Compression lug method (preferred for 16 mm² and above)</strong> — strip
                18-22 mm, fit copper lug, hex-die crimp, bolt through BS 951 clamp screw with
                washer and anti-corrosion grease. Most reliable for larger conductors.
              </li>
              <li>
                <strong>Direct screw-clamp method (10 mm² in cage-clamp BS 951)</strong> — strip
                12-15 mm, ferrule the strands, insert into the clamp screw aperture, tighten the
                screw. Faster but only suitable for smaller conductors and only on BS 951 clamps
                designed for this. Read the clamp manufacturer instructions.
              </li>
            </ul>
            <p>
              Either way, the warning label "SAFETY ELECTRICAL CONNECTION — DO NOT REMOVE" goes
              on the clamp body or on the conductor at the clamp end. Reg 514.13.1 makes this
              mandatory and the BS 951 clamp typically comes with a yellow plastic label that
              clips around the cable. Sub 3 covers the labelling requirements in detail.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 543.3.2 (Accessibility of protective conductor connections)"
            clause="Every connection and joint shall be accessible for inspection, testing and maintenance except as provided by Regulation 526.3."
            meaning={
              <>
                Every protective conductor connection must be inspectable. The MET inside a meter
                cabinet (cabinet door opens, all terminations visible) — accessible. A BS 951
                clamp on a gas pipe under a kitchen sink (cupboard door opens, clamp visible) —
                accessible. A junction box buried in a wall void (would need plaster removed to
                inspect) — NOT accessible. Reg 526.3 lists narrow exceptions (buried-in-ground,
                encapsulated, in-equipment manufacturer joints) — wall-void splices do not
                qualify.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 54, Regulation 543.3.2."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Crimp lug selection — hex die vs hammer-on, when each"
            plainEnglish="Hex-die crimp lugs (Burndy, ABB, Klauke) are the trade standard for bonding terminations 16 mm² and up — gas-tight, repeatable, certified. Hammer-on lugs are an emergency-fix tool, not a primary install option, and you avoid them on bonding."
            onSite="The crimper on the van is a Klauke K05 or similar manual ratchet for up to 50 mm², or a battery-hydraulic Klauke EK50 for bigger conductors. Lugs come from the same family — Burndy YA10C-2N for 10 mm², Klauke 102R for 16 mm², matched to the die in the crimper."
          >
            <p>
              The hex-die crimp lug is the universal trade choice for landing a bonding conductor
              into a screw or bolt terminal. The two halves of the die compress the brass barrel
              of the lug onto the conductor in a six-sided crush — even pressure all the way
              round, no voids, gas-tight contact between conductor strands and lug barrel. Once
              crimped, the joint is mechanically and electrically permanent for the life of the
              install. The major manufacturers all certify their lug + die + crimper combinations
              to specific BS / IEC standards — typical reference is BS 4579-1 for compression
              joints in copper conductors.
            </p>
            <p>The lug families you'll see most on UK bonding work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Burndy YA-series</strong> — long-barrel copper compression lugs, hex die,
                colour-coded by CSA. The YA10C-2N is a 10 mm² lug with two M8 stud holes — common
                for MET busbars.
              </li>
              <li>
                <strong>ABB / Thomas &amp; Betts (T&amp;B) Sta-Kon</strong> — short-barrel
                tinned-copper lugs in 10, 16, 25 mm² ranges with M6/M8/M10 stud sizes. Trade
                standard for switchgear earth bars.
              </li>
              <li>
                <strong>Klauke 100R-series</strong> — German-made hex-die lugs widely stocked at
                UK wholesalers, paired with the Klauke K05 manual or EK60 hydraulic crimper.
              </li>
              <li>
                <strong>Cembre A-series</strong> — Italian equivalent, very common on commercial
                jobs where Cembre crimping kit is on the van.
              </li>
            </ul>
            <p>
              Hammer-on (sometimes "anvil") lugs are an emergency fix only — you put the lug on
              the conductor, place it on a steel anvil, hit it with a hammer to crush the barrel.
              The crimp is uneven, not gas-tight, and not certified for any specific BS standard.
              Acceptable to get an install live in a genuine emergency (you're at a remote site,
              the crimper has failed, the customer's freezer is dripping); not acceptable as a
              primary termination method on a bonding job. Always replace a hammer-on lug with
              a proper hex-die crimp at the next opportunity.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Heatshrink termination prep for outdoor / damp environments"
            plainEnglish="Adhesive-lined heatshrink slid over the termination, shrunk down with a hot air gun, seals out water at the boundary between the conductor entry and the lug or terminal body. Cheap, fast, prevents 90% of corrosion failures on outdoor bonds."
            onSite="On every external bond — meter cabinet on the side of the house, BS 951 clamp on a buried-then-exposed water service, garage / outbuilding tails — fit heatshrink. Standard kit: 4-to-1 ratio adhesive-lined heatshrink in a few diameters (HellermannTyton TA37, 3M ITCSN, RS Pro own-brand)."
          >
            <p>
              The boundary between an exposed bonding conductor and its termination is a magnet
              for corrosion. Water creeps along the strands inside the insulation, sits in the
              lug barrel or terminal cavity, and oxidises the copper. Two years on, what was a
              0.04 ohm bond is reading 0.5 ohm on the next EICR. Heatshrink seals this boundary
              before the install goes live and keeps it sealed for the life of the cable.
            </p>
            <p>The technique:</p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Cut a piece of adhesive-lined heatshrink long enough to cover the lug barrel
                plus 25-40 mm of insulated conductor on either side. Diameter — pick the one that
                slides over the lug just snug.
              </li>
              <li>
                Slide the heatshrink onto the conductor BEFORE you crimp the lug. (You will
                forget. Fit a second piece on the next conductor as a reminder for next time.)
              </li>
              <li>
                Crimp the lug. Bolt it into the terminal. Tighten to torque spec.
              </li>
              <li>
                Slide the heatshrink up over the lug barrel. Centre it so it covers the lug,
                the conductor entry and a band of insulation either side.
              </li>
              <li>
                Apply heat with a hot air gun (Steinel, DeWalt, or any 1500W+ trade heat gun).
                Start at the centre, work outwards in both directions. The shrink ratio is
                typically 4:1 — the tube collapses tight onto the lug and conductor. Adhesive
                lining melts and flows out at the ends, sealing the cable entry.
              </li>
              <li>
                Let it cool before disturbing. Check for any gaps in the seal — if you see
                them, fit a second layer over the top.
              </li>
            </ol>
            <p>
              On bonding clamps in external meter cabinets, also fit heatshrink over the BS 951
              clamp body and conductor entry. Same product, same technique. The cost is pence
              per bond; the saved time on the next EICR investigation is hours.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where terminations fail in real life</ContentEyebrow>

          <CommonMistake
            title="Splicing main bonding inside a wall void with a screw connector"
            whatHappens={
              <>
                You ran out of 10 mm² G/Y on a kitchen first-fix and were one metre short to
                reach the gas service. Rather than going back to the wholesaler, you spliced the
                cable inside the wall void using a brown screw connector, sleeved it with PVC
                tape, and plastered over. The bond passed initial verification because continuity
                was fine. Two years later the customer sells the house, the buyer's surveyor
                flags it as "no visible main bonding terminations to inspect" and the EICR comes
                back with a Code C2 against Reg 543.3.2. The wall has to be opened, the joint
                ripped out, the cable replaced.
              </>
            }
            doInstead={
              <>
                Run the bonding conductor as one continuous length from MET to BS 951 clamp.
                Always. If the cable is short, drive to the wholesaler. If you are mid-job and
                stuck, terminate the existing length into the MET, fit a junction terminal block
                INSIDE THE METER CABINET (where it is accessible), and run a fresh length from
                the JB out to the clamp. The joint sits inside the cabinet, behind the door,
                visible whenever the cabinet is opened — Reg 543.3.2 satisfied. Never bury a
                bonding joint where it cannot be seen.
              </>
            }
          />

          <Scenario
            title="MET termination of a 10 mm² bond on a domestic PME refurbishment"
            situation={
              <>
                You are upgrading the bonding on a 1990s domestic — original install had no main
                bonding to the gas service. New 10 mm² G/Y single-core, run from the MET in the
                meter cabinet under the stairs to a BS 951 clamp on the consumer side of the gas
                meter in the kitchen, total length 4.2 m. You are at the MET end ready to land
                the conductor.
              </>
            }
            whatToDo={
              <>
                (1) Cut the cable to length leaving 200 mm of slack at the MET end for service
                loop. (2) Strip 12 mm of insulation using the ring-cut technique — score, snap,
                slide. (3) Inspect strands: bright copper, no nicks. (4) Slide a 10 mm² ivory
                bootlace ferrule over the bare strands and crimp with a hex-die ratchet crimper.
                Tug-test the ferrule. (5) Identify a free terminal hole on the brass MET busbar.
                Back the screw fully off. (6) Insert the ferrule into the terminal — bare
                conductor not visible outside the terminal body. (7) Tighten the screw to the
                manufacturer's torque spec (typically 2.5-3.0 Nm) using a calibrated torque
                screwdriver. (8) Tug-test the conductor at the terminal — no movement. (9) Fit
                a heat-shrink "GAS SERVICE" label sleeve at the MET end. (10) Photograph the
                termination for the EIC record. (11) Continuity test from this end to the clamp
                end follows in Sub 4 of this Section.
              </>
            }
            whyItMatters={
              <>
                A textbook MET termination is what every inspection looks for. Every step on
                that list satisfies a specific BS 7671 requirement: strip technique to no damaged
                strands per Reg 526.1; ferrule to "number and shape of wires forming the
                conductor" per Reg 526.1(b); torqued to spec to "adequate locking arrangements"
                per Reg 526.1(f); labelled to identification per Section 514; accessible inside
                cabinet to Reg 543.3.2. Missing any one of those steps degrades the termination
                from a 25-year asset to a future EICR finding.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 526.1 governs every termination — durable electrical continuity, mechanical strength and protection. The whole Sub hangs off this reg.',
              'Reg 543.3.2 requires every protective conductor joint to be accessible for inspection. No buried mid-run splices. Run continuous from MET to BS 951 clamp.',
              'Strip cleanly using ring-cut technique. Inspect strands. Damaged strands = cut back and start again.',
              'Ferrule stranded conductors before landing in cage-clamp or screw-clamp terminals. Hex-die ratchet crimper, never square dies, never pliers.',
              'Compression lugs for ring/fork terminations at BS 951 clamps and switchgear. Hex-die ratchet crimper sized to the lug barrel.',
              'Torque every termination to manufacturer specification with a calibrated torque screwdriver. Loose joints are the number-one cause of long-term bond failures.',
              'Label every bonding conductor at the MET end identifying the service it bonds. Saves hours on every future inspection.',
              'Where terminations are exposed to moisture, apply anti-corrosion grease and consider heat-shrink sealing the joint.',
            ]}
          />

          <Quiz title="Terminate cables — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Identify cable sizes
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Connect bonding clamps
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
