/**
 * Module 4 · Section 4 · Sub 3 — Connect bonding clamps
 * Maps to City & Guilds 2365-02 / Unit 204 / LO4 / AC 4.3
 *   AC 4.3 — "Connect bonding clamps"
 *
 * Frame: BS 951 clamp on the consumer side, within 600 mm of the meter,
 * pipe cleaned to bare metal, jointing paste applied, label fitted.
 * Different clamp for gas vs water (DSEAR — gas needs insulating insert).
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

const TITLE = 'Connect bonding clamps | Level 2 Module 4.4.3 | Elec-Mate';
const DESCRIPTION =
  'BS 951 earth clamps onto gas, water, oil and structural steel — clamp selection, position (within 600 mm of the meter on the consumer side), pipe preparation, jointing paste, torque and the mandatory warning label per BS 7671 Reg 514.13.1.';

const checks = [
  {
    id: 'm4-s4-sub3-600mm',
    question:
      'Where, in relation to the gas meter on a domestic install, should the main protective bonding clamp be fitted?',
    options: [
      'On the supply side of the meter, on the incoming service pipe, as close to the street as possible.',
      'On the consumer side, on hard metal pipework before any branch, within 600 mm of the meter outlet.',
      'Directly onto the brass body of the gas meter itself, the most accessible metal point available.',
      'On the first appliance feed downstream of the meter, just after the consumer isolation valve.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 544.1.2 — connection on the consumer side of the meter, on consumer\'s hard metal pipework, before any branch, within 600 mm of the meter outlet union (or the point of entry to the building if the meter is external) where practicable. The 600 mm limit makes the bond find-able on inspection and ensures the bond connection is on installation pipework rather than DNO/supplier equipment.',
  },
  {
    id: 'm4-s4-sub3-gas-clamp',
    question:
      'You are connecting a main bonding clamp to a steel gas pipe in a meter cabinet. Which type of BS 951 clamp do you fit?',
    options: [
      'Any standard brass BS 951 clamp — clamp type makes no difference on gas pipework.',
      'A plastic-bodied clamp, because metal clamps are not permitted on gas services.',
      'A gas-rated BS 951 clamp with an insulating insert at the contact face, for DSEAR compliance.',
      'A galvanised steel clamp, matched to the steel gas pipe to avoid galvanic action.',
    ],
    correctIndex: 2,
    explanation:
      'Gas service connections need a BS 951 clamp specifically rated for gas — typically with an insulating insert at the back of the clamp jaw to limit the contact area to the bond connection point. Brass body acceptable but the design must comply with the gas industry DSEAR (Dangerous Substances and Explosive Atmospheres Regulations) and the gas distributor\'s specification. Standard non-insulated brass clamps are normally only used on water.',
  },
  {
    id: 'm4-s4-sub3-warning-label',
    question:
      'BS 7671 Reg 514.13.1 requires a warning notice at every bonding connection point. What does it say?',
    options: [
      '"DANGER LIVE WIRES INSIDE"',
      '"BONDING CONDUCTOR INSTALLED"',
      '"SAFETY ELECTRICAL CONNECTION — DO NOT REMOVE"',
      '"GAS METER ACCESS REQUIRED"',
    ],
    correctIndex: 2,
    explanation:
      'Reg 514.13.1 — "A warning notice clearly and durably marked with the words \'Safety Electrical Connection — Do Not Remove\' shall be securely fixed in a visible position at or near (a) the point of connection of every earthing conductor to an earth electrode; and (b) the point of connection of every bonding conductor to an extraneous-conductive-part; and (c) the main earthing terminal, where separate from main switchgear." The yellow plastic label that comes with most BS 951 clamps is exactly this.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A standard BS 951 earth clamp is rated for what minimum cross-sectional area of conductor termination?',
    options: [
      'A single fixed rating of 6 mm², the same for every BS 951 clamp model under the standard.',
      'It depends on the model — clamps come in ratings to suit 6, 10, 16 and 25 mm² conductors.',
      'A single fixed rating of 25 mm², which all BS 951 clamps must meet under the standard.',
      'BS 951 clamps are not rated by conductor size — any conductor fits any clamp regardless.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 951 covers earth clamps for service pipes, with different ratings for different conductor sizes. Always select a clamp rated to match (or exceed) the bonding conductor CSA. Pick a clamp with a screw aperture that suits the conductor or the lug you have terminated. Typical domestic bonding uses a 10-16 mm² rated clamp.',
  },
  {
    id: 2,
    question:
      'Why must the pipe be cleaned to bright bare metal before the BS 951 clamp is tightened on?',
    options: [
      'To give the jointing paste a smoother surface to adhere to before the clamp is fitted.',
      'To make the pipe look tidy and professional for the customer and any future inspector.',
      'To remove paint, oxide, scale and coatings that would create a high-resistance joint at the clamp.',
      'To thin the pipe wall slightly so the clamp grips more tightly when the screws are tightened.',
    ],
    correctAnswer: 2,
    explanation:
      'Bond clamp to pipe is a metal-to-metal contact joint, and Reg 526.1 requires durable electrical continuity. Anything between (paint, copper oxide film, mineral scale, tape residue) is a resistance and a failure. File or wire-wool the pipe to bright bare metal in a band slightly wider than the clamp jaw width before fitting.',
  },
  {
    id: 3,
    question:
      'After cleaning the pipe and fitting the BS 951 clamp, what is the role of jointing paste (e.g. CuPro, Penetrox, conductive grease)?',
    options: [
      'Acts as an adhesive to hold the clamp permanently in position so it cannot work loose over time.',
      'Lubricates the clamp threads so the pipe-clamping screw can be tightened to a higher torque.',
      'Insulates the joint to prevent stray current flowing between the clamp and the pipe surface.',
      'Fills micro-voids at the clamp-to-pipe contact, displaces moisture and air, and inhibits corrosion.',
    ],
    correctAnswer: 3,
    explanation:
      'Conductive jointing paste (CuPro for copper joints, Penetrox A for aluminium, similar branded products) displaces air and moisture, fills surface voids, and inhibits dissimilar-metal corrosion. Apply a thin film between the clamp jaw and the cleaned pipe surface before tightening. Mandatory on outdoor/damp installations; good practice on all bonds.',
  },
  {
    id: 4,
    question:
      'You are bonding a galvanised steel water pipe entering a 1970s commercial building. The pipe is heavily corroded at the planned bond location. What do you do?',
    options: [
      'Move the bond to a clean section of the same consumer-side pipe before any branch, then clean, paste and clamp.',
      'Fit the clamp straight over the corroded section — the clamp screw will bite through the corrosion to clean metal.',
      'Skip the bond on this pipe and rely on the bonding fitted to the adjacent gas service pipe instead.',
      'Wrap the corroded section in self-amalgamating tape, then fit the clamp over the protective tape.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 544.1.2 says "as near as practicable" — the regulation acknowledges site reality. If the pipe at the meter outlet is unfit for a bond connection (corroded, wet, painted), find the next clean section of consumer-side pipework before the first branch — still within 600 mm of the point of entry where practicable. Clean it, paste it, clamp it. Document the position deviation in the EIC.',
  },
  {
    id: 5,
    question:
      'On a modern domestic install where the gas service pipe is plastic (PE) up to the meter and only the consumer-side outlet is metal, where does main bonding go?',
    options: [
      'No bonding is needed at all, because the plastic supply pipe breaks the path to earth.',
      'On the metal consumer-side pipe, within 600 mm of the meter outlet union per Reg 544.1.2.',
      'On the plastic supply pipe itself, using a clamp designed to grip and bite plastic pipework.',
      'Bond both the plastic supply pipe and the metal consumer pipe with separate dedicated clamps.',
    ],
    correctAnswer: 1,
    explanation:
      'A plastic gas service is not an extraneous-conductive-part by definition (Part 2 — extraneous-conductive-parts must be conductive material). The metal pipework on the consumer side of the meter still is, so it gets bonded. Sub 6 of this Section covers the plastic-pipe scenario in detail.',
  },
  {
    id: 6,
    question:
      'You are doing an EICR and find a BS 951 clamp on a water pipe with no warning label. What do you do?',
    options: [
      'Code C1 (danger present) and recommend the supply be isolated immediately until a label is fitted.',
      'Ignore it — a warning label is good practice but is not a BS 7671 requirement at all.',
      'Code C3 (improvement recommended) — the bond is functional but the Reg 514.13.1 label is missing.',
      'Code C2 (potentially dangerous) — a missing label means the bond cannot be relied upon electrically.',
    ],
    correctAnswer: 2,
    explanation:
      'A C3 finding for a missing label per Reg 514.13.1 — improvement recommended. The bond is electrically intact and functional; the absence of the label doesn\'t directly endanger anyone, but it raises the risk of inadvertent removal during gas/water work. Fit a new label and the issue is resolved.',
  },
  {
    id: 7,
    question:
      'What is the function of the "as near as practicable" qualifier in Reg 544.1.2?',
    options: [
      'It allows the bond to be fitted on the supply side of the meter if no consumer pipework is reachable.',
      'It allows the 600 mm figure to be ignored entirely, so the bond can go anywhere on the pipework.',
      'It allows the bond to be omitted altogether if fitting one within 600 mm proves impractical.',
      'It lets you bond at the nearest accessible consumer-side point where the strict 600 mm cannot be met.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 recognises real-world constraints. A meter cabinet may have the meter outlet inside a tight space with no clean pipework within 600 mm. The "as near as practicable" allows you to position the bond at the next accessible, clean section of consumer pipework before any branch. The 600 mm is a target, not a hard limit, BUT the supply-side / consumer-side / before-branch requirements remain hard limits.',
  },
  {
    id: 8,
    question:
      'You have fitted a BS 951 clamp on the gas service and are about to leave site. What is the final visual check?',
    options: [
      'Confirm the full set: correct position, clean pasted bare metal, torqued screws, label, secure labelled conductor.',
      'Confirm only that the clamp screw is tight — every other detail is checked at the next EICR, not now.',
      'Confirm only that the warning label is fitted — the label is the sole regulatory requirement for the bond.',
      'Confirm only that the conductor is the correct green/yellow colour and leave the rest to the inspector.',
    ],
    correctAnswer: 0,
    explanation:
      'A complete bond install has every step demonstrably satisfied: (1) clamp on consumer side, on hard metal pipework before any branch; (2) within 600 mm of the meter outlet union where practicable; (3) pipe cleaned to bare metal under the clamp jaw; (4) jointing paste applied; (5) clamp screw torqued to manufacturer spec; (6) "Safety Electrical Connection — Do Not Remove" label fitted; (7) conductor secure and labelled at the MET end. On a real job, photograph the finished bond from two angles for the EIC record — it evidences the install five years later when an EICR engineer checks for compliance.',
  },
];

const faqs = [
  {
    question: 'Why brass for water but insulated brass for gas?',
    answer:
      'Water clamps just need durable electrical contact and corrosion resistance — standard brass BS 951 fits the bill. Gas clamps must additionally meet DSEAR (Dangerous Substances and Explosive Atmospheres Regulations) — the clamp must not act as a potential ignition source in the rare event of a gas leak. The insulating insert on a gas-rated BS 951 limits the clamp\'s contact area to the bond connection point only, reducing the risk of a sparking joint elsewhere on the clamp body. Always check the BS 951 manufacturer datasheet — it will state "suitable for gas" or "water only".',
  },
  {
    question: 'Can I daisy-chain bonding clamps from gas to water with a single conductor?',
    answer:
      'Strongly discouraged. The Reg 544.1 sizing rules size each bonding conductor to handle the worst-case fault current — daisy-chaining means the conductor between gas clamp and water clamp carries fault current from both services through one cable. A break or loose joint at the gas clamp lifts the bond on the water service too. The right approach: dedicated 10 mm² (or 16 mm²) G/Y from MET to gas clamp, separate dedicated 10 mm² (or 16 mm²) G/Y from MET to water clamp. Two cables, two clamps, two independent paths back to the MET.',
  },
  {
    question: 'What torque do I tighten a BS 951 clamp screw to?',
    answer:
      'Read the manufacturer instruction sheet that comes with the clamp. Typical values for domestic 10-16 mm² rated BS 951 clamps are 4 to 6 Nm on the pipe-clamping screw and 4 to 6 Nm on the conductor-clamping screw. Use a torque screwdriver. Over-tightening can crack the brass clamp body; under-tightening leaves a high-resistance joint. The manufacturer spec is the authority.',
  },
  {
    question: 'Do I bond the gas meter body itself?',
    answer:
      'No. The gas meter is supplier equipment, not consumer pipework. Reg 544.1.2 requires bonding "on the consumer side of the meter, on the consumer\'s hard metal pipework". Bonding the meter directly is wrong on two counts: (a) you\'d be touching DNO/supplier kit you have no jurisdiction over, and (b) the bond would be on the wrong side of the meter for fault-protection purposes. Always bond on consumer-side pipework downstream of the meter.',
  },
  {
    question: 'What if the gas service is internal but the water service is external (buried)?',
    answer:
      'Bond each at its point of entry to the building. Gas service on the consumer side of the internal meter, within 600 mm. Water service at the point where the buried supply enters the building (usually inside a meter pit or at the internal stop-tap), within 600 mm of that entry, before any branch. Same regulation, applied separately to each service. If the water meter is external (buried in a pit at the property boundary), you bond at the point of entry to the building — not at the external meter pit.',
  },
  {
    question: 'How do I know if the BS 951 clamp is "the right kind" for the application?',
    answer:
      'Read the data label on the clamp. BS 951 is a standard, but individual clamp models cover different scopes — some are water-only, some are gas-rated (DSEAR-compliant), some are for specific pipe diameters, some for round vs flat conductors. The label tells you the model number, the conductor size range, the pipe size range, and the application (water/gas/oil). If the clamp doesn\'t carry an obvious data label, don\'t fit it — go back to the wholesaler for a clearly identified clamp.',
  },
];

export default function Sub3() {
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
            eyebrow="Module 4 · Section 4 · Subsection 3"
            title="Connect bonding clamps"
            description="BS 951 earth clamps onto gas, water, oil and structural steel — consumer side of the meter, within 600 mm where practicable, on cleaned bare-metal pipework, with jointing paste, torqued to spec, labelled per Reg 514.13.1."
            tone="emerald"
          />

          <TLDR
            points={[
              'BS 951 earth clamp on the consumer side of the meter, on consumer\'s hard metal pipework, before any branch, within 600 mm of the meter outlet union where practicable — per Reg 544.1.2.',
              'Pipe cleaned to bright bare metal under the clamp jaw, jointing paste applied, clamp torqued to manufacturer spec.',
              'Mandatory yellow warning label "SAFETY ELECTRICAL CONNECTION — DO NOT REMOVE" per Reg 514.13.1. Different clamp design for gas (DSEAR-rated, insulating insert) vs water (standard brass).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify BS 951 earth clamp models suitable for gas, water and oil service connections.',
              'Cite Reg 544.1.2 and apply the consumer-side / before-branch / within-600 mm rule on real pipework.',
              'Prepare the pipe surface (clean to bare metal, apply jointing paste) before fitting the clamp.',
              'Tighten the clamp screws to manufacturer torque specification.',
              'Cite Reg 514.13.1 and fit the mandatory "Safety Electrical Connection — Do Not Remove" warning label.',
              'Identify when a service does not need bonding (plastic incoming pipe — not extraneous-conductive-part).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The clamp itself — BS 951</ContentEyebrow>

          <ConceptBlock
            title="BS 951 earth clamps — the standard for service-pipe bonding"
            plainEnglish="A small brass clamp with a U-bolt or strap that wraps around the pipe and a screw terminal for the bonding cable. Designed specifically for low-resistance, durable connection to a metal service pipe."
            onSite="Standard product, sold at every electrical wholesaler. Common manufacturers: Furse, MK, Niglon, CED. Check the data label for: model number, conductor size range, pipe diameter range, suitability (gas/water/oil)."
          >
            <p>
              BS 951 ("Specification for clamps for earthing and bonding purposes") is the British
              Standard for earth and bonding clamps. A compliant clamp gives you a known, rated,
              durable connection between a bonding conductor and a service pipe.
            </p>
            <p>Typical features of a BS 951 clamp:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Brass body</strong> — corrosion-resistant, copper-compatible (no galvanic
                action with copper pipe).
              </li>
              <li>
                <strong>U-bolt or strap</strong> — wraps around the pipe and tightens with two
                nuts to a saddle that grips the pipe between the U-bolt and the clamp body.
              </li>
              <li>
                <strong>Conductor terminal</strong> — a screw or bolt aperture rated to accept the
                bonding cable directly (small clamps) or a compression lug (larger clamps).
              </li>
              <li>
                <strong>Yellow plastic warning label</strong> — clips around the bonding cable at
                the clamp end, pre-printed with "Safety Electrical Connection — Do Not Remove".
              </li>
              <li>
                <strong>Data label</strong> — moulded into the body or stuck on the bag, giving
                model number, conductor size range, pipe diameter range, and gas/water/oil
                suitability.
              </li>
            </ul>
            <p>
              Clamps come in size bands: small (6-22 mm pipe, 4-10 mm² conductor), medium
              (22-54 mm pipe, 10-16 mm² conductor), large (54-150 mm pipe, 16-25 mm² conductor)
              and bigger. Pick the band that comfortably accepts both the pipe diameter and the
              bonding conductor — never force a clamp onto an undersized or oversized pipe.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Gas vs water — different clamp specifications"
            plainEnglish="Water clamps are standard brass. Gas clamps additionally must satisfy DSEAR — typically a brass clamp with an insulating insert at the back of the jaw to prevent the clamp acting as a sparking joint anywhere except the controlled bond connection."
            onSite={`Read the clamp data label or wholesaler description carefully. "Suitable for gas" or "DSEAR compliant" or "complies with IGEM/G/5" all flag a gas-rated clamp. If the label only says "BS 951" with no gas mention, treat as water-only.`}
          >
            <p>
              The Dangerous Substances and Explosive Atmospheres Regulations (DSEAR) require any
              equipment in a potentially flammable atmosphere to not act as an ignition source.
              The Institution of Gas Engineers and Managers (IGEM) publishes guidance (IGEM/G/5)
              on bonding to gas installations that the trade follows.
            </p>
            <p>
              The practical effect: gas-rated BS 951 clamps incorporate features that limit any
              risk of a sparking metal-to-metal contact along the clamp body — typically an
              insulating sleeve or insert at the back of the clamp jaw, leaving only the
              deliberate bond contact face exposed. This contains any potential arcing to the one
              controlled location.
            </p>
            <p>
              Standard non-gas BS 951 clamps are entirely fine for water, oil and structural
              steel. Don\'t fit a gas-rated clamp on water (waste of money) and never fit a
              water-only clamp on gas (DSEAR breach plus potentially Code C2 on the next EICR).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 544.1.2 (Connection of main protective bonding conductors to extraneous-conductive-parts)"
            clause="The main protective bonding connection to any extraneous-conductive-part such as gas, water or other metallic pipework or service shall be made as near as practicable to the point of entry of that part into the premises. Where there is a meter, isolation point or union, the connection shall be made to the consumer's hard metal pipework and before any branch pipework. Where practicable the connection shall be made within 600 mm of the meter outlet union or at the point of entry to the building if the meter is external."
            meaning={
              <>
                Three hard requirements: (1) consumer side of the meter; (2) on the consumer's
                hard metal pipework, before any branch; (3) within 600 mm of the meter outlet
                union where practicable. Plus a softer "as near as practicable to the point of
                entry of that part into the premises" — the regulation acknowledges site reality
                where the strict 600 mm can't be met, but the consumer-side / before-branch rules
                are absolute.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 544.1.2 — paraphrased. See also Note 1."
          />

          <SectionRule />

          <ContentEyebrow>Position the clamp — get the location right</ContentEyebrow>

          <ConceptBlock
            title="Consumer side of the meter, before any branch, within 600 mm"
            plainEnglish="Find the meter. Find the consumer-side outlet. Trace the consumer pipework. Bond before any branch (T-piece, isolation valve, appliance feed). Within 600 mm of the meter outlet if you can."
            onSite="Easy on a domestic gas meter — take the bond off the steel rising pipe in the meter cabinet within reach of the meter. Easy on water — bond at the consumer side of the stop-tap before the cold-water tank or hot-water cylinder branches. Trickier on commercial where pipework runs are long and branched within metres of the meter."
          >
            <p>The position rule has three parts you must satisfy and one you should aim for:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HARD: Consumer side of the meter</strong> — never bond on supplier
                pipework (the bit feeding the meter from the street). The meter is the boundary;
                everything downstream is consumer pipework, everything upstream is the supplier.
              </li>
              <li>
                <strong>HARD: On consumer's hard metal pipework</strong> — copper, steel, lead.
                Plastic doesn\'t qualify (it\'s not extraneous-conductive). Painted-over pipe still
                qualifies (you clean the paint off at the bond point) but a flexible plastic
                isolation hose breaks the metal continuity and changes the bonding requirement.
              </li>
              <li>
                <strong>HARD: Before any branch pipework</strong> — bond before the first T-piece,
                stop-tap, isolator. After a branch you might bond only a single appliance circuit
                rather than the whole metal service.
              </li>
              <li>
                <strong>SOFT: Within 600 mm of the meter outlet union</strong> — aim for this. If
                site conditions don\'t allow (no clean pipework, no clearance, fixtures in the way)
                the regulation lets you go further. Document the deviation in the EIC.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="External meter — bond at the point of entry to the building"
            plainEnglish="If the meter is in an external meter cabinet, the 600 mm reference point becomes the point where the consumer pipework enters the building, not the meter itself."
            onSite="Common on newer-build homes where the gas meter sits in an external box on the side of the house. The supply pipe runs from the meter through the wall into the house. Bond on the inside-the-house metal pipework within 600 mm of where the pipe enters the building."
          >
            <p>
              Reg 544.1.2 explicitly handles the external-meter case: "...within 600 mm of the
              meter outlet union or at the point of entry to the building if the meter is
              external." On a typical new-build with a gas meter in an outside cabinet:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The supply pipe enters the building through the wall — usually a sealed gland or
                duct.
              </li>
              <li>
                Inside the building, the pipe is consumer-side, hard metal (typically steel or
                copper).
              </li>
              <li>
                Fit the BS 951 clamp on this internal pipework, within 600 mm of where the pipe
                emerges from the wall, before any branch.
              </li>
              <li>
                Run the bonding conductor back to the MET (typically located in the consumer unit
                cupboard or meter cabinet on the same wall).
              </li>
            </ul>
            <p>
              The point: don\'t try to fit the BS 951 inside the external meter cabinet (that\'s
              supplier territory and likely sealed) — work from the inside of the building.
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

          <ContentEyebrow>Pipe preparation — bare metal, jointing paste</ContentEyebrow>

          <ConceptBlock
            title="Clean the pipe to bright bare metal under the clamp jaw"
            plainEnglish="File or wire-wool a band of pipe slightly wider than the clamp jaw down to bright bare metal. No paint, no oxide, no scale, no tape residue. The clamp grips clean conductive metal."
            onSite="Standard kit: a fine-cut file (Bahco, Stanley) for steel pipe, fine wire wool or emery paper for copper. Clean a 30-50 mm band around the pipe at the bond position. Wipe with a clean cloth before fitting the clamp."
          >
            <p>The cleaning sequence:</p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Identify the clamp position — consumer side of meter, before any branch, within
                600 mm if possible.
              </li>
              <li>
                Mark the pipe with a permanent marker — a ring around the pipe at each end of the
                band you'll clean. The clamp jaw width is typically 25-40 mm; clean a band 10 mm
                wider on each side.
              </li>
              <li>
                File or abrade the pipe surface in the marked band. Steel pipe — fine-cut file in
                circular strokes around the pipe, then perpendicular file marks for grip. Copper
                pipe — fine wire wool or 240-grit emery paper. Aluminium pipe (rare on services) —
                emery, then immediately apply paste before re-oxidation.
              </li>
              <li>
                Wipe the cleaned band with a clean dry cloth to remove all filings and dust. Do
                NOT wipe with anything oily.
              </li>
              <li>
                Inspect — the pipe should be bright bare metal across the full clamp jaw width.
                Any remaining paint, oxide or contamination — clean again.
              </li>
              <li>
                Apply a thin film of jointing paste (CuPro for copper, Penetrox for aluminium,
                conductive grease for steel) across the cleaned area immediately before fitting
                the clamp.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Jointing paste — fills voids, displaces moisture, prevents corrosion"
            plainEnglish="Conductive paste smeared on the cleaned pipe before clamping. Fills micro-voids in the metal surface, keeps water out, prevents galvanic corrosion at the dissimilar-metal joint."
          >
            <p>
              Even a freshly-filed pipe has a microscopically rough surface. When the clamp jaw
              contacts the pipe, only the high points actually touch — the rest of the contact
              area has air or moisture in the gaps. Conductive jointing paste fills these voids,
              massively increasing the effective contact area and preventing the air/moisture in
              the gaps from corroding the joint over years.
            </p>
            <p>Common products:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CuPro / Cuprosolv</strong> — proprietary copper-loaded grease, standard
                for copper pipe to brass clamp joints.
              </li>
              <li>
                <strong>Penetrox A</strong> — Burndy proprietary aluminium-rated paste, used on
                aluminium and copper joints.
              </li>
              <li>
                <strong>Petroleum jelly / Vaseline</strong> — lower-grade alternative on
                short-term jobs; not officially conductive but seals out moisture. Better than
                nothing if you have nothing else, but proper jointing paste should be in the van.
              </li>
            </ul>
            <p>
              Apply a thin film on the cleaned pipe and on the inside of the clamp jaw. Don\'t
              over-apply — the paste should coat the contact surfaces, not pool around the clamp.
              Wipe excess paste off the outside of the clamp after tightening.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.13.1 (Warning notice — earthing and bonding)"
            clause="A warning notice clearly and durably marked with the words 'Safety Electrical Connection — Do Not Remove' shall be securely fixed in a visible position at or near: (a) the point of connection of every earthing conductor to an earth electrode; and (b) the point of connection of every bonding conductor to an extraneous-conductive-part; and (c) the main earthing terminal, where separate from main switchgear. The warning notice may be provided on the clamp according to BS 951 or on the warning label provided with it. NOTE: An example of a suitable warning notice is provided in Figure 11C of Appendix 11."
            meaning={
              <>
                Mandatory warning notice at three places: every earth electrode connection, every
                main bonding connection to an extraneous-conductive-part, and the MET (where
                separate from main switchgear). The standard yellow plastic label that comes with
                every BS 951 clamp satisfies the requirement — clip it onto the bonding cable at
                the clamp end and the bond is compliant.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 514.13.1."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Tighten and label — finishing the bond</ContentEyebrow>

          <ConceptBlock
            title="Tighten clamp screws to manufacturer torque spec"
            plainEnglish="Use a torque screwdriver or torque wrench. Read the value from the clamp data sheet. Click once. Don\'t over-tighten (cracks the brass), don\'t under-tighten (loose joint, high resistance)."
            onSite="Typical values for domestic 10-16 mm² rated BS 951 clamps: 4 to 6 Nm on the pipe-clamping nuts/screws, 4 to 6 Nm on the conductor-clamping screw. Bigger commercial clamps may go up to 10 Nm. Always read the spec sheet — every manufacturer is slightly different."
          >
            <p>
              Tightening sequence:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Position the clamp on the cleaned and pasted pipe. Clamp body on top, U-bolt/strap
                under the pipe (or vice versa per the manufacturer drawing).
              </li>
              <li>
                Hand-tighten the pipe-clamping nuts evenly — alternate sides to draw the clamp
                onto the pipe square, not skewed.
              </li>
              <li>
                Torque the pipe-clamping nuts to the manufacturer spec, alternating between sides
                in 1 Nm increments until you hit the final value.
              </li>
              <li>
                Land the bonding conductor (or compression lug) into the conductor terminal.
                Ferrule the strands first if it\'s a screw-clamp aperture.
              </li>
              <li>
                Tighten the conductor-clamping screw to the manufacturer spec.
              </li>
              <li>
                Tug-test the bonding conductor at the clamp — it should not move under firm hand
                pull.
              </li>
              <li>
                Wipe excess jointing paste off the outside of the clamp.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Fit the warning label — Reg 514.13.1"
            plainEnglish="The yellow plastic label that comes with the BS 951 clamp says 'Safety Electrical Connection — Do Not Remove'. Clip it around the bonding cable at the clamp end. Mandatory."
          >
            <p>
              Every bonding clamp comes with a pre-printed warning label — usually a yellow
              plastic clip that snaps around the bonding cable at the clamp end, marked with the
              required text. Fit it as you finish the bond. Reg 514.13.1 also requires the
              warning notice at the MET if the MET is separate from the main switchgear (i.e.
              housed in its own enclosure rather than inside the consumer unit) — same text,
              fitted at the MET enclosure or terminal.
            </p>
            <p>
              The label\'s purpose: stop a future trade (plumber, gas engineer, or DIY-er) from
              cutting the bonding cable thinking it\'s an unused old wire. Without the label,
              bonds get inadvertently removed during pipework changes, and the next person
              doesn\'t notice the protection has been broken.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Pipe surface preparation — wire wool, file, jointing paste types"
            plainEnglish="Different metal needs different prep. Copper takes wire wool or 240-grit emery. Galvanised steel needs a half-round file. Stainless steel and aluminium need fresh-prep then immediate paste because they re-oxidise within minutes. The paste choice depends on what's joining what — CuPro for copper-to-brass, Penetrox for aluminium-to-anything."
            onSite="In the bonding pouch on the van: a fine-cut Bahco file, a roll of fine wire wool (000 grade), a sleeve of 240-grit emery, a small pot of CuPro and a small pot of Penetrox A. That covers every pipe and every clamp combo you'll meet in a domestic or routine commercial job."
          >
            <p>
              The metal-to-metal contact between the BS 951 clamp jaw and the cleaned pipe is
              the entire bond. If that joint is anything less than bright bare metal pressed
              tight together with conductive paste filling the micro-voids, you have a
              high-resistance joint with a slow-failure clock running. Different pipe metals
              need different prep:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Copper pipe (water, internal gas runs, central heating).</strong> 000-grade
                wire wool or 240-grit emery cloth in a 30-50 mm band around the pipe. Wipe with
                a clean dry cloth. Apply CuPro paste — proprietary copper-loaded grease that's
                compatible with brass clamp on copper pipe. The CuPro displaces air, fills surface
                voids and prevents galvanic creep at the dissimilar-metal joint.
              </li>
              <li>
                <strong>Galvanised steel pipe (older gas service rises, structural steel,
                external water).</strong> Fine-cut half-round file in a 30-50 mm band. File until
                the bright steel is visible through the zinc coating — you want the clamp jaw
                contacting steel, not zinc. Wipe clean. Apply a generic non-acidic conductive
                grease (Cuprosolv, electrical jointing paste from MK or Marshall-Tufflex). Refit
                the clamp; the zinc coating around the cleaned band continues to give corrosion
                protection to the rest of the pipe.
              </li>
              <li>
                <strong>Aluminium pipe (rare on services but you'll see it on solar PV mounting
                rails and some commercial chillers).</strong> Emery cloth in a tight band, then
                IMMEDIATELY apply Penetrox A or similar aluminium-rated paste — bare aluminium
                re-oxidises within minutes of being abraded and the paste has to seal the cleaned
                surface before that re-oxide layer forms. Penetrox is loaded with zinc particles
                that bite through any thin oxide and maintain conductive contact.
              </li>
              <li>
                <strong>Stainless steel (pharmaceutical, food processing, marine).</strong>
                240-grit emery, then conductive grease — Penetrox or Burndy Penetrox A both work.
                Stainless oxide is invisible but tenacious; the paste plus a tight clamp jaw is
                what makes the joint reliable.
              </li>
            </ul>
            <p>
              The trade-off everyone makes: jointing paste is messy. Fitters often skip it on
              "clean" indoor copper bonds because the joint reads under 0.05 ohm at the initial
              continuity test and looks fine. Five years on, the joint that wasn't pasted is the
              one that has crept up to 0.5 ohm on the next EICR. Five seconds of paste is hours
              of saved investigation work later. Always paste; wipe the excess off the outside
              of the clamp.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Inspection of an existing bonding installation — what to check, what to flag for replacement"
            plainEnglish="On every EICR you'll inspect existing bonds. The visual check is fast — clamp present, label present, conductor intact, run accessible. The decision-making is what to do with what you find: an old missing-label bond is a C3, an oxidised-clamp bond is a C2, a missing-bond-on-an-extraneous-service is potentially a C1 or C2 depending on the system."
            onSite="Open the meter cabinet first. Check the MET — every cable in a labelled terminal? Then trace each bonding conductor to its clamp. Note clamp condition, label presence, conductor identification, accessibility. Take photos of every bond for the EICR record."
          >
            <p>
              The standard EICR inspection checklist for the bonding system:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MET visible and accessible?</strong> If the MET is buried behind plaster
                or sealed inside an enclosure with no access, that's a C3 (improvement
                recommended) — Reg 514.13 wants the MET identifiable and Reg 543.3.2 wants the
                connections accessible.
              </li>
              <li>
                <strong>Each bonding conductor labelled at the MET end?</strong> Missing labels
                are a C3 — the bond is functional but harder to inspect on the next round.
                Carry a roll of self-laminating cable labels and a marker to fix on the spot
                where the customer agrees.
              </li>
              <li>
                <strong>Conductor CSA correct for the supply?</strong> Read the supplier head —
                PME with PEN ≤ 35 mm² wants 10 mm² Cu minimum bonding. A 6 mm² Cu bond on a
                modern PME supply (common on 1980s installs that pre-date the current Table 54.8
                values) is a C2 — undersized for a broken-PEN fault.
              </li>
              <li>
                <strong>Clamp present, on consumer side, before any branch, within 600 mm where
                practicable?</strong> A bond on the supply side of the meter is wrong location
                (not necessarily a code, but flag for relocation). A bond on the wrong side of a
                branch (the bonded section of pipe is no longer the only path to the rest of
                the metal pipework) is a C2 — the bonding doesn't actually equalise the
                downstream metalwork.
              </li>
              <li>
                <strong>Pipe surface clean, paste applied, jointing visible?</strong> An
                oxidised or painted-over clamp face is a C2 if the visible-paint or visible-rust
                evidence suggests the joint has poor electrical continuity. Confirm with a
                continuity test — if R reads above 0.10 ohm, code C2 and re-make.
              </li>
              <li>
                <strong>Warning label fitted?</strong> Reg 514.13.1 — missing label is a C3.
                Yellow plastic clip-on labels cost pence; fit one before leaving site if the
                customer agrees.
              </li>
              <li>
                <strong>Accessibility for inspection.</strong> A bond clamp behind a plumbed-in
                kitchen unit with no removable panel — flag for relocation, code C3. A bond
                cable disappearing into a wall void (mid-run joint hidden) — C2 per Reg 543.3.2.
              </li>
              <li>
                <strong>What's missing.</strong> An installation with metal incoming services
                and NO main bonding to one or more of them — that's where the code escalates.
                On a TT or PME supply with no bonding to gas or water, the broken-PEN /
                broken-electrode fault scenario can put the entire metalwork at line potential.
                Typically C2 (potentially dangerous) — fit the missing bond, retest, document.
              </li>
            </ul>
            <p>
              Replacement criteria. Replace a clamp if the brass body is cracked, the U-bolt is
              corroded through, or the conductor terminal is stripped. Replace a conductor if the
              insulation is damaged, the strands are visibly damaged on inspection, or the
              continuity reading is anomalously high after re-making the terminations. The
              clamp is cheap; the labour to refit is the cost — quote the labour and replace
              wherever there's any doubt about long-term reliability.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where bonds go wrong on real jobs</ContentEyebrow>

          <CommonMistake
            title="Fitting the BS 951 clamp directly over painted pipe without cleaning"
            whatHappens={
              <>
                Time is tight, the gas pipe is painted gloss white, and the clamp grips the
                paint when you tighten the nuts. Continuity test reads 0.05 ohm — looks fine.
                Six months later the paint slowly creeps under continued thermal cycling and
                vibration, the contact resistance climbs into the ohms, the bond is now
                effectively open. A subsequent EICR Zs reading is anomalously high, the engineer
                investigates, finds the painted-pipe bond, codes it C2.
              </>
            }
            doInstead={
              <>
                Always clean the pipe to bright bare metal under the clamp jaw before fitting.
                Even a bond that initially passes a continuity test will fail over months/years
                if the contact face is paint, oxide, scale or tape residue. Five minutes with a
                file or wire wool now saves an hour\'s rework when the EICR comes round. Apply
                jointing paste afterwards. Tighten to torque spec. Photograph the finished bond
                for the EIC.
              </>
            }
          />

          <Scenario
            title="Bonding a 22 mm copper cold-water service entering a domestic at the kitchen stop-tap"
            situation={
              <>
                You are doing a kitchen refurb and need to upgrade the main bonding to the cold
                water service. The supply enters the building through the floor under the
                kitchen sink, rises 200 mm, hits the main internal stop-tap, then branches to
                feed the cold mains tap and a downstream hot-water cylinder. The pipe is 22 mm
                copper. The MET is in the meter cabinet 4 m away in the under-stairs cupboard.
                Walk the bond install end-to-end.
              </>
            }
            whatToDo={
              <>
                (1) Verify the pipe is consumer-side: yes — the supply has come into the building
                from the meter outside, this is internal pipework. (2) Verify before any branch:
                position the bond between the floor entry and the stop-tap, before the cold-tap
                feed branches off. (3) Check 600 mm rule: floor entry to stop-tap is only 200 mm,
                comfortable to bond within that band. (4) Select clamp: medium BS 951 brass for
                copper pipe, rated for 10 mm² conductor, water-rated (no need for gas-DSEAR
                features). (5) Mark the pipe at the proposed clamp position, clean a 50 mm band
                with fine wire wool to bright copper, wipe clean. (6) Apply CuPro paste in a thin
                film to the cleaned band. (7) Position clamp body on top, U-bolt under, hand-snug
                the nuts evenly. (8) Torque pipe-clamping nuts to manufacturer spec (typically 4
                Nm). (9) Strip 12 mm of 10 mm² G/Y, fit ivory ferrule, hex-die crimp.
                (10) Insert ferrule into the clamp\'s conductor terminal, torque the screw (4 Nm).
                (11) Clip the yellow "Safety Electrical Connection — Do Not Remove" label around
                the cable at the clamp end. (12) Run the 10 mm² G/Y back to the MET via the most
                accessible route (through the cupboard wall, into the meter cabinet, up to the
                MET busbar). (13) Land at the MET as covered in Sub 2 — strip, ferrule, torque,
                label "WATER SERVICE". (14) Continuity test from MET to clamp follows in Sub 4.
              </>
            }
            whyItMatters={
              <>
                A textbook water bond done in under 30 minutes once you have the kit assembled.
                Each step satisfies a specific BS 7671 requirement — clamp position (Reg 544.1.2),
                clean contact (Reg 526.1), torque (Reg 526.1(f) locking arrangements), label
                (Reg 514.13.1), conductor identification at MET (Section 514). The same 14-step
                sequence applies on every water bond you ever do; only the specific values change.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 544.1.2 governs bond clamp position: consumer side of the meter, on consumer\'s hard metal pipework, before any branch, within 600 mm of the meter outlet union (or point of entry to the building if meter is external) where practicable.',
              'BS 951 is the British Standard for earth/bonding clamps. Different specifications for gas (DSEAR-rated, insulating insert) vs water (standard brass).',
              'Pipe must be cleaned to bright bare metal under the clamp jaw — file or wire wool a 30-50 mm band wider than the clamp.',
              'Conductive jointing paste (CuPro for copper, Penetrox for aluminium) fills micro-voids and prevents galvanic corrosion at the dissimilar-metal joint.',
              'Torque pipe-clamping and conductor-clamping screws to manufacturer specification (typically 4-6 Nm for domestic clamps).',
              'Reg 514.13.1 mandates the "Safety Electrical Connection — Do Not Remove" warning label at every bonding clamp, every earth electrode and every separately-housed MET.',
              'Plastic incoming gas service: bond the consumer-side metal pipework, not the plastic supply (plastic is not extraneous-conductive).',
              'Don\'t daisy-chain bonds. Each service gets its own dedicated cable from the MET — independent paths, independent fault tolerance.',
            ]}
          />

          <Quiz title="Connect bonding clamps — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Terminate cables
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Test continuity
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
