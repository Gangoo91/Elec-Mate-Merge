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
    id: 'fam5-s4-colour',
    question:
      'BS 5839-1:2025 §16 (Cabling, labelling and identification) clarifies what colour the fire alarm cable AND the LV mains supply to the panel should be. What does it say?',
    options: [
      'Any colour, just labelled.',
      'All fire alarm cables AND the LV mains supply to the fire alarm system should be of a single common colour, with RED preferred. The 2025 revision settles a long-running technical-helpline question — the 2017 revision required fire-resistant cable but did not specify a colour. From 2025, red is the preferred single common colour for the fire alarm wiring AND the dedicated mains feed to the CIE.',
      'Red for fire, white for mains.',
      'Black throughout.',
    ],
    correctIndex: 1,
    explanation:
      'The 2025 §16 clarification: a single common colour (red preferred) for fire alarm cables AND the LV mains supply to the fire alarm system. This recognises the mains feed as part of the integrated fire installation and removes ambiguity. The "preferred" wording allows existing schemes in other colours where rip-and-replace would be disproportionate, but new work should be red.',
  },
  {
    id: 'fam5-s4-fe-pink',
    question:
      'Per BS 7671 A2:2022 (IEC 60445:2021) and reflected in BS 5839-1:2025 §16, what is the identification of the FUNCTIONAL EARTH (FE) conductor?',
    options: [
      'Cream, marked "FE".',
      'PINK in colour, or marked with the alphanumeric designation "FE". The change from cream (the previous IEC 60445 / BS 7671 designation) to pink came in BS 7671 Amendment 2:2022 and is reflected in BS 5839-1:2025. Cream caused confusion with bare-copper or beige sleeving; pink is unambiguous.',
      'Green-and-yellow, same as protective earth.',
      'Blue.',
    ],
    correctIndex: 1,
    explanation:
      'IEC 60445:2021 / BS 7671 A2:2022 changed FE identification from cream to pink. BS 5839-1:2025 §16 explicitly references this. Important on fire alarm work because addressable loop screens are typically functional earths (one-end termination), not protective earths — they need the new pink ID, not cream and not green-and-yellow.',
  },
  {
    id: 'fam5-s4-screen-end',
    question:
      'A 2-core fire-resistant cable with overall screen runs round an addressable loop. At how many ends should the screen be terminated?',
    options: [
      'Both ends, always.',
      'ONE end only, typically at the panel — to drain induced noise to the panel functional earth without creating an earth loop. Terminating both ends would create a circulating current path between any potential difference between the two earth references, injecting noise rather than draining it. Manufacturer guidance is the controlling document; some panels specify a different convention. The screen termination is recorded on the as-installed drawing.',
      'Neither end — leave floating.',
      'Wherever convenient.',
    ],
    correctIndex: 1,
    explanation:
      'Single-end screen termination is the dominant convention for addressable fire alarm loops. Both-ends invites earth loops and circulating noise; floating loses the noise-drain function. The screen is terminated to the panel functional earth (PINK conductor under BS 7671 A2:2022) at one end, isolated and safely cut back at the other. Record on the as-installed drawing.',
  },
  {
    id: 'fam5-s4-ir-disconnect',
    question:
      'You are about to insulation-resistance test a freshly wired addressable loop before energising the panel for the first time. Devices are already fitted to the loop. What do you do?',
    options: [
      'Run the test at 500 V dc as wired.',
      "DISCONNECT the loop devices first, OR use the panel manufacturer's prescribed alternative method — applying 500 V dc to electronic loop devices will destroy the SLC drivers, isolators, and detector front ends. The standard pre-energisation IR test verifies cable integrity; cable integrity is tested with devices removed (or with one end of the loop disconnected from the panel, devices unplugged from bases). Some manufacturers permit a low-voltage continuity check with devices in place; consult the panel manual.",
      'Reduce to 250 V dc and test as wired.',
      'Skip IR — devices test it for you.',
    ],
    correctIndex: 1,
    explanation:
      'A 500 V dc IR shot through electronic loop devices is a destructive test. The cable is the test subject; remove devices first, or use the manufacturer-specified method. Many panel manufacturers provide a loop "health" diagnostic that runs after energisation — that is not a substitute for the pre-energisation IR test, which proves the wiring is fit to be energised. Always check before plugging anything in.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Per BS 5839-1:2025 §16, what is the recommended colour convention for fire alarm cables and the LV mains supply to the panel?',
    options: [
      'Black for both.',
      'A single, common colour with RED preferred for both the fire alarm cables AND the LV mains supply to the fire alarm system. The 2025 revision settles the 2017 ambiguity (which specified fire-resistant cable but not colour). Red is the preferred single common colour; the mains feed to the CIE is treated as part of the fire alarm installation, not a separate general-circuit feed.',
      'Red for fire, grey for mains.',
      'Whatever the contractor stocks.',
    ],
    correctAnswer: 1,
    explanation:
      'Red is now the preferred single common colour for the fire alarm cables AND the dedicated LV mains feed to the CIE under BS 5839-1:2025 §16. The 2017 revision was silent on colour; this caused recurring helpline queries. New work should be red throughout.',
  },
  {
    id: 2,
    question:
      'Under IEC 60445:2021 / BS 7671 A2:2022, the functional earth conductor is now identified by which colour?',
    options: [
      'Cream.',
      'PINK, or by the alphanumeric designation "FE". The change from cream (previous identification) to pink came with IEC 60445:2021 / BS 7671 A2:2022 and is reflected in BS 5839-1:2025 §16. Pink is unambiguous; cream was confused with bare copper, beige sleeving, and natural insulation tones.',
      'Green-and-yellow.',
      'Black.',
    ],
    correctAnswer: 1,
    explanation:
      'Pink is the new FE colour under IEC 60445:2021. BS 7671 A2:2022 adopted it. BS 5839-1:2025 §16 references it. Loop screens (functional earths in fire alarm work) and any FE conductors at the panel must use pink (or "FE" mark) — not cream, not green-and-yellow.',
  },
  {
    id: 3,
    question:
      'Class A and Class B fire alarm circuits differ in their topology and fault tolerance. What is the defining difference?',
    options: [
      'Class A is faster; Class B is slower.',
      'Class A circuits are wired as a CLOSED LOOP (out from the panel and back to the panel) with isolators distributed around the loop. A single open-circuit fault on a Class A loop is contained by isolators on either side; the rest of the loop continues to function via panel-end re-feed. Class B circuits are open-ended SPURS — a single open-circuit at the panel end of a spur disables every device beyond the break. Class A gives single-fault tolerance; Class B does not.',
      'Class A is wireless; Class B is wired.',
      'Class A is cheaper.',
    ],
    correctAnswer: 1,
    explanation:
      'Class A = closed-loop with isolators, single-fault tolerant. Class B = open-ended spurs, no fault tolerance. Category L1 / L2 systems and most addressable systems use Class A loops; Class B is acceptable for some smaller / less critical installations subject to design. The fault-tolerance difference is the load-bearing reason to choose Class A.',
  },
  {
    id: 4,
    question: 'Why is screen termination on an addressable loop typically done at ONE end only?',
    options: [
      'Saves wire.',
      'Single-end termination drains induced noise to the panel functional earth without creating an earth loop. Both-end termination creates a circulating current path between any potential difference between the two earth references, injecting noise into the loop instead of draining it. Floating (no termination) loses the noise-drain function entirely. The single-end convention puts the screen reference at the panel.',
      'Both ends would short the loop.',
      'Manufacturer preference only.',
    ],
    correctAnswer: 1,
    explanation:
      'Single-end is the noise-drain optimum. Both ends creates a ground loop and injects noise; floating gives no drain. The screen terminates at the panel FE, is cut back and isolated at the far end. Always check the panel manual — some manufacturers specify a different scheme.',
  },
  {
    id: 5,
    question:
      'A fire alarm cable runs vertically up a riser shaft for 9 m before turning into the ceiling void. What support interval applies on the vertical run?',
    options: [
      'No support needed on vertical runs.',
      'Support intervals follow the cable manufacturer instruction and the chosen containment system, with vertical runs typically requiring fixings at intervals not exceeding 1 m (cable cleats / saddles), and additional support at every floor level penetration. Vertical drops in conduit / trunking follow the containment fixing schedule. Cable supports are fire-rated where the cable is fire-rated — there is no point installing a 30-minute cable on plastic-bodied saddles that drop the cable in 5 minutes.',
      '5 m intervals.',
      'No fixings — gravity does the work.',
    ],
    correctAnswer: 1,
    explanation:
      "Vertical runs typically need ~1 m fixing intervals plus support at floor penetrations. Fixings must match the cable's fire rating; plastic saddles defeat fire-rated cable. The exact figure is from the cable manufacturer + the containment system instruction, but 1 m is a workable on-site default.",
  },
  {
    id: 6,
    question:
      'A jointing junction box is unavoidable on a fire alarm loop because of an existing bulkhead. What requirements apply?',
    options: [
      'Any plastic JB will do.',
      'Joint boxes on fire alarm circuits should be AVOIDED where possible, and where unavoidable, must be: (a) FIRE-RATED to match the cable rating, (b) ACCESSIBLE for inspection and maintenance, (c) clearly labelled "FIRE ALARM" or with the agreed identification, (d) recorded on the as-installed drawing. A plastic JB hidden above a permanent ceiling defeats the cable rating, hides a maintenance liability, and produces a maintenance fault that is invisible until something fails.',
      'Any junction box, anywhere.',
      'Only metal junction boxes.',
    ],
    correctAnswer: 1,
    explanation:
      'JBs are a known weak point in fire alarm wiring. Avoid where possible (route the cable around the obstruction); when unavoidable, fire-rated, accessible, labelled and recorded. Hidden or under-rated JBs are a recurring service-life finding.',
  },
  {
    id: 7,
    question:
      'What is the correct procedure for an insulation-resistance test on an addressable loop with devices already fitted?',
    options: [
      'Test at 500 V dc as wired.',
      'DISCONNECT the loop devices (or one end of the loop from the panel, with bases unplugged from heads), then apply 500 V dc between the loop conductors and earth (or between conductors). Re-fit the devices ONLY after the cable IR is verified. Applying 500 V dc to electronic loop devices destroys SLC drivers, isolators and detector electronics. Some manufacturers offer a low-voltage diagnostic in lieu — consult the panel manual.',
      'Test at 250 V dc with devices in place.',
      'Skip the test.',
    ],
    correctAnswer: 1,
    explanation:
      'IR is a cable test, not a device test. Disconnect devices first. The 500 V dc shot through electronic loop devices is destructive. Re-fit only after IR passes. Manufacturer-specified alternatives (e.g. low-voltage continuity diagnostics) may substitute, but the cable IR before energisation is the load-bearing pre-commissioning check.',
  },
  {
    id: 8,
    question:
      'BS 5839-1:2025 §19 brings the recommendations for ISOLATION of mains power to the fire alarm system into a single clause. Which best describes that requirement?',
    options: [
      'Mains via a 13 A plug — anyone can isolate.',
      'A dedicated, clearly labelled mains isolator for the fire alarm system, accessible to authorised persons, with the recommendations on its provision and use consolidated into a single clause in the 2025 revision (replacing split coverage in 2017 clauses 25 and 29). The isolator is for service / maintenance use under controlled conditions; it is not for routine occupant access. Lockable or tagged.',
      'No isolator — fire alarms are always live.',
      'Multiple isolators around the building.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 revision consolidates the mains isolation recommendations from two 2017 clauses (25 and 29) into a single §19 clause. Dedicated, labelled, accessible to authorised persons (typically with a lock or tag), used under controlled conditions for service. Routine occupant access is explicitly NOT the design intent.',
  },
  {
    id: 9,
    question:
      'A fire alarm panel battery has been installed during second-fix. What labelling does BS 5839-1:2025 §16 acknowledge as long-standing custom and practice?',
    options: [
      'No label needed.',
      'A label fixed to the battery showing the DATE OF INSTALLATION, by permanent marker. The 2025 revision acknowledges the long-standing custom-and-practice of marking the install date directly on the battery — needed because batteries are replaced at end-of-service-life and the install date drives the replacement schedule. The label survives the service intervals; loose paperwork in the panel often does not.',
      'Battery brand only.',
      'Voltage rating only.',
    ],
    correctAnswer: 1,
    explanation:
      'Date-of-installation marking on the battery is now explicitly acknowledged in BS 5839-1:2025 §16. Permanent marker is sufficient. The label is there at every service visit and drives the replacement decision; service personnel do not depend on retrieving original installation paperwork.',
  },
  {
    id: 10,
    question:
      'A specification calls for fire alarm cables to be run in steel conduit shared with a 230 V emergency lighting circuit. Is this acceptable?',
    options: [
      'Yes — both fire-rated cables, no issue.',
      'No — fire alarm cables should NOT share containment with circuits that carry conflicting voltage references or that compromise the integrity of the fire alarm wiring. The fire alarm system requires dedicated containment to keep the wiring identifiable, to prevent interference and to preserve the integrity of the protection. Sharing with even another life-safety system (emergency lighting) is not the design intent. Each life-safety system gets its own containment and its own labelling.',
      'Yes if the conduit is metal.',
      'Only if both circuits are RCD-protected.',
    ],
    correctAnswer: 1,
    explanation:
      'Dedicated containment for the fire alarm wiring is the design baseline. Sharing with emergency lighting (or any other circuit) blurs the identification, invites interference, and complicates fault-finding. Each life-safety system gets its own containment.',
  },
];

const FireAlarmModule5Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Wiring and terminations | Fire Alarm Module 5.4 | Elec-Mate',
    description:
      'BS 5839-1:2025 §16, §19 and supporting clauses on fire alarm wiring: cable colour (red preferred for cables AND LV mains), FE pink per IEC 60445:2021 / BS 7671 A2:2022, single-end screen termination, Class A vs Class B topology, support intervals, joint boxes, voids, pre-energisation IR with devices removed, and battery labelling.',
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
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4"
            title="Wiring and terminations"
            description="Cable colour, FE identification, screen termination, loop topology, supports, joint boxes, voids, batteries and the pre-energisation IR test. The 2025 revision settles colour ambiguity (red preferred), aligns FE with BS 7671 A2:2022 (pink), consolidates mains isolation into §19, and tightens documentation around variations and as-installed records."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 5839-1:2025 §16 — fire alarm cables AND the LV mains supply to the fire alarm system are a single, common colour with RED preferred. New from 2025 — settles 2017 ambiguity.',
              'Functional Earth (FE) conductor identified PINK (or marked "FE") under IEC 60445:2021 / BS 7671 A2:2022 — was cream, changed in 2022 and reflected in BS 5839-1:2025.',
              'Loop screen termination: ONE end only (typically at the panel functional earth). Both ends creates a ground loop; floating loses the noise-drain function.',
              'Class A loop = closed loop with isolators, single-fault tolerant. Class B = open-ended spurs, no fault tolerance. L1 / L2 typically use Class A.',
              'Support intervals: vertical runs typically ≤1 m fixings + support at floor penetrations. Fixings must match cable fire rating — plastic saddles defeat fire-rated cable.',
              'Joint boxes AVOIDED where possible; if used, fire-rated, accessible, labelled, recorded on as-installed drawing.',
              'Voids: cable containment continues into the void, detectors mounted per the 2025 void-depth Figure (1.25 m / 1.5 m / >1.5 m bands).',
              'Batteries: date-of-installation label per §16 (acknowledged custom and practice), earthing per BS 7671:2018+A4:2026 §560.',
              'Pre-energisation IR: devices DISCONNECTED, 500 V dc cable test, ≥1 MΩ acceptance per BS 7671 (cable). Never IR with devices in place — destroys electronics.',
              'Mains isolation per §19 (NEW consolidated clause 2025 — replaces split 2017 clauses 25 and 29): dedicated, labelled, accessible to authorised persons, lockable or tagged.',
              'ALL variations from the standard must be recorded (NEW 2025 — was "major variations only" in 2017). Some variations now declared UNACCEPTABLE — see §6 of this module.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply BS 5839-1:2025 §16 cable colour: single common colour with red preferred for fire alarm cables AND the LV mains supply',
              'Identify the functional earth conductor by pink colour (or "FE" mark) per IEC 60445:2021 / BS 7671 A2:2022',
              'Terminate the loop screen at ONE end only (typically panel FE) and document the screen termination on the as-installed drawing',
              'Select Class A (closed loop with isolators, fault-tolerant) versus Class B (open-ended spurs) circuit topology per the design specification and category',
              'Apply support intervals appropriate to vertical, horizontal and ceiling-void runs, with fixings matched to the cable fire rating',
              'Avoid joint boxes where possible; where unavoidable, use fire-rated, accessible, labelled and as-installed-drawing-recorded JBs',
              'Carry out a pre-energisation insulation resistance test at 500 V dc with loop devices DISCONNECTED, accept ≥1 MΩ cable IR per BS 7671',
              'Install standby batteries with the §16-recognised date-of-installation label and earth them per BS 7671:2018+A4:2026 §560',
              'Provide the mains isolation arrangement per the §19 consolidated 2025 clause — dedicated, labelled, accessible to authorised persons',
              'Record ALL variations (NEW 2025 — not just "major" as in 2017) on the system documentation, including the colour scheme used if not red',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Cable colour, identification and the 2025 §16 changes</ContentEyebrow>

          <ConceptBlock
            title="Red preferred — fire alarm cables AND the LV mains supply"
            plainEnglish="One of the most-asked questions on the FIA technical helpline under the 2017 revision was: what colour should the mains cable to the fire alarm panel be? The 2017 revision required fire-resistant cable but said nothing about colour. The 2025 revision settles it. All fire alarm cables AND the LV mains supply to the fire alarm system should be a single, common colour, with RED preferred. The mains feed to the CIE is treated as part of the integrated fire installation — not as a general-circuit feed that happens to terminate at a fire panel."
            onSite="Spec writers and contractors, take note. New work: red throughout — fire alarm wiring, sounder circuits, MCP wiring AND the dedicated mains feed from the building distribution to the CIE. The phrase 'red preferred' allows existing schemes in other colours to remain (rip-and-replace would be disproportionate), but new installations should be red."
          >
            <p>The §16 wording — paraphrased:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Single common colour.</strong> The fire alarm wiring is identified as a
                family by being a single colour throughout. Mixing colours within the system blurs
                identification.
              </li>
              <li>
                <strong>Red preferred.</strong> The recommended common colour is red. Other colours
                (e.g. white, orange) are not banned, but new work should default to red unless
                project-specific reasoning is recorded as a variation.
              </li>
              <li>
                <strong>LV mains supply included.</strong> The mains feed from the building&apos;s
                final distribution board to the CIE is part of the fire alarm installation — same
                colour as the rest of the fire alarm wiring (red preferred).
              </li>
              <li>
                <strong>Existing systems.</strong> Not retrospective. A 2018-installed system with
                white-jacketed fire-resistant cable is not non-compliant on the cable colour ground;
                the 2025 wording applies to new work.
              </li>
            </ul>
            <p>
              The change reflects two industry realities. First, the integration argument — the LV
              mains feed to the panel is a fire safety circuit in everything but designation;
              treating it as a general-circuit feed in green / brown / black blurs that. Second, the
              inspection argument — visual identification of the fire alarm wiring is faster and
              more reliable when one colour identifies the whole installation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 26.2 / §16 of the FIA Guide (Cabling, labelling and identification)"
            clause={
              <>
                All fire alarm cables, and the low voltage mains supply to the fire detection and
                fire alarm system, should be of a single, common colour, with the colour red being
                preferred. Where another colour has to be used, this should be recorded as a
                variation in the system documentation.
              </>
            }
            meaning="The 2025 revision settles the long-standing helpline question. Red preferred, single common colour, mains feed included. Where another colour is used (e.g. specification-driven), it is recorded as a variation — and ALL variations are now recorded under the 2025 §6 changes."
          />

          <ConceptBlock
            title="Functional Earth — pink, not cream"
            plainEnglish="The functional earth (FE) conductor is the one that drains noise to a reference (panel, screen, instrument chassis) without being a fault-current path. It is NOT the protective earth (the green-and-yellow CPC). Until BS 7671 Amendment 2:2022, the IEC 60445 designation for FE was CREAM. From IEC 60445:2021, the designation changed to PINK, or alphanumeric designation 'FE'. BS 7671 A2:2022 adopted pink. BS 5839-1:2025 §16 reflects the new identification."
            onSite="On a fire alarm job in 2026 onwards: any FE conductor — panel reference, screen drain at the loop end, instrument earth — is identified PINK (or 'FE' mark). Cream is the OLD designation. Confusing FE with PE (green-and-yellow) is a serious error — PE is for fault current, FE is for noise drainage; the two have entirely different roles."
          >
            <p>The identification matrix on a fire alarm job:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Protective Earth (PE) / CPC.</strong> Green-and-yellow striped, BS 7671
                §514. The fault-current path. On the panel mains feed, on metal casework that
                requires bonding.
              </li>
              <li>
                <strong>Functional Earth (FE).</strong> PINK (or alphanumeric &quot;FE&quot;) per
                IEC 60445:2021. Reflected in BS 5839-1:2025 §16. The noise-drain reference. On
                addressable loop screens at the panel end. NOT a fault-current path.
              </li>
              <li>
                <strong>Live conductors.</strong> Brown (line), blue (neutral) per BS 7671 §514 /
                IEC 60446 — for the LV mains feed. Loop conductors on a fire alarm system are
                identified by the cable colour scheme (red overall jacket, internal cores follow
                manufacturer convention).
              </li>
              <li>
                <strong>SELV / non-SELV separation.</strong> Where the cable contains both LV mains
                and SELV cores, separation requirements per BS 7671 §528 apply — but on a dedicated
                fire alarm cable, this rarely arises.
              </li>
            </ul>
            <p>
              The cream → pink change is one of the under-publicised effects of BS 7671 A2:2022. It
              catches inspectors looking for cream FE who do not find it (and conclude wrongly that
              no FE is provided) and contractors using leftover cream stock who do not realise it is
              now non-compliant on new work. The 2025 BS 5839-1 reference makes the change explicit
              on fire alarm work.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IEC 60445:2021 · BS 7671 Amendment 2:2022 · Reflected in BS 5839-1:2025 §16"
            clause={
              <>
                The functional earth conductor should be identified by the colour pink, or marked
                with the alphanumeric designation &quot;FE&quot;. In previous editions of BS 7671
                and IEC 60445, the functional earth conductor was identified by the colour cream.
                This change is now reflected in BS 5839-1:2025.
              </>
            }
            meaning="The cream → pink change came in 2022 (BS 7671 A2). BS 5839-1:2025 §16 adopts the new identification on fire alarm work. Cream is now the OLD designation; pink (or 'FE' mark) is the new. Loop screens at the panel functional earth — pink. Cream stock should be used up only on existing work matching existing identification, never on new installations."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Loop topology — Class A versus Class B</ContentEyebrow>

          <ConceptBlock
            title="The fault-tolerance difference"
            plainEnglish="Fire alarm circuits are described as Class A or Class B based on how they tolerate a single open-circuit fault. Class A is a closed loop — the cable goes out from the panel, around all devices, and back to the panel — with isolators distributed around the loop. A single open-circuit anywhere on the loop is contained by the two adjacent isolators; the panel re-feeds from both ends and the rest of the loop continues to function. Class B is an open-ended spur — the cable goes out from the panel and ends at the last device. A single open-circuit at the panel end of a spur disables every device beyond the break. Class A tolerates one fault; Class B does not."
            onSite="Read the design before pulling cable. Loop systems on Cat L1 / L2 are nearly always Class A. Spur systems on small Cat M / P installations may be Class B. The cabling is physically different: Class A returns to the panel; Class B does not. Pulling Class B cable on what should be a Class A loop is a complete-replacement defect, not a re-terminate."
          >
            <p>The two topologies in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Class A — closed loop with isolators.</strong> Two-core fire-resistant cable
                leaves the panel SLC OUT terminals, runs around the loop fitting bases for detectors
                and modules, and returns to the panel SLC RETURN terminals. Isolators are
                distributed around the loop — typically one per zone, one per floor, or one per ~32
                devices. A single open-circuit fault opens the loop into two short-circuit fault
                current paths, isolators on either side of the fault open, and the panel re-feeds
                the two unbroken legs from both ends. All devices except those immediately either
                side of the fault continue to function.
              </li>
              <li>
                <strong>Class B — open-ended spur.</strong> Two-core fire-resistant cable leaves the
                panel and ends at the last device. No return. No isolators (typically). A single
                open-circuit at the panel end disables every device beyond the break. A
                short-circuit anywhere on the spur disables the whole spur until cleared.
              </li>
              <li>
                <strong>Selection.</strong> Class A is the design default for category L1, L2, L3
                and most addressable systems. Class B is acceptable for some smaller / less critical
                installations where the design risk-assessment justifies it. Manufacturer datasheets
                for the panel and the cable specify the maximum loop length and device count for
                each topology.
              </li>
              <li>
                <strong>Hybrid.</strong> Some panels mix Class A loops with Class B spurs feeding to
                a Class A backbone. The drawing must clearly identify which segments are Class A and
                which are Class B; the as-installed record matches.
              </li>
            </ul>
            <p>
              On site, the Class A / Class B difference shows up at the panel: Class A occupies two
              terminal sets (OUT and RETURN); Class B occupies one. Mis-wiring a Class A loop as a
              single-ended spur (returning the &quot;return&quot; cable to the wrong terminal or
              omitting the return) produces a partially functional system that LOOKS correct on
              first power-up but fails the cause-and-effect test under simulated fault conditions
              during commissioning.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Class A loop with the return cable terminated to the SLC OUT instead of SLC RETURN"
            whatHappens="Two-core fire-resistant cable runs from the panel out to the loop, around all devices, and back to the panel. The technician terminates both ends to the SLC OUT terminals (because the labels look similar and the manual was not consulted). On power-up, the panel sees devices on the loop and reports normal. But the loop is now a parallel-fed open-ended spur, not a closed loop with return. A single open-circuit fault midway along the loop disables every device beyond the break — Class B behaviour on what should be Class A topology."
            doInstead="Read the panel manual, identify the SLC OUT and SLC RETURN terminal sets, terminate the OUT cable to OUT and the RETURN cable to RETURN. Verify with the panel diagnostic tool — most addressable panels report the loop length, device count and fault-tolerance status. A correctly wired Class A loop reports as a closed loop. Test the fault tolerance during commissioning by simulating an open-circuit at a midway point — devices either side of the break should remain online, isolators adjacent to the break should latch."
          />

          {/* Class A vs Class B topology diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Class A loop (with isolators) versus Class B spur
            </h4>
            <svg
              viewBox="0 0 820 460"
              className="w-full h-auto"
              role="img"
              aria-label="Class A closed loop versus Class B open spur. Class A: panel OUT and RETURN terminals connect via a loop with isolators distributed around it; an open-circuit fault is contained by adjacent isolators. Class B: panel OUT terminal feeds a single-ended spur; an open-circuit disables all devices beyond the break."
            >
              <text x="20" y="30" fill="#FBBF24" fontSize="13" fontWeight="bold">
                Class A — closed loop with isolators (single-fault tolerant)
              </text>
              <rect
                x="40"
                y="50"
                width="80"
                height="60"
                rx="6"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="80"
                y="78"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                PANEL
              </text>
              <text x="80" y="94" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                OUT RETURN
              </text>

              <line x1="120" y1="65" x2="700" y2="65" stroke="#EF4444" strokeWidth="2" />
              <line x1="120" y1="100" x2="700" y2="100" stroke="#EF4444" strokeWidth="2" />
              <line x1="700" y1="65" x2="740" y2="65" stroke="#EF4444" strokeWidth="2" />
              <line x1="700" y1="100" x2="740" y2="100" stroke="#EF4444" strokeWidth="2" />
              <line x1="740" y1="65" x2="740" y2="100" stroke="#EF4444" strokeWidth="2" />

              <circle
                cx="200"
                cy="65"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="320"
                cy="65"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="440"
                cy="65"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="560"
                cy="65"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="680"
                cy="65"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />

              <circle
                cx="240"
                cy="100"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="380"
                cy="100"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="520"
                cy="100"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="640"
                cy="100"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />

              <rect
                x="265"
                y="58"
                width="14"
                height="14"
                fill="rgba(168,85,247,0.3)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <rect
                x="490"
                y="58"
                width="14"
                height="14"
                fill="rgba(168,85,247,0.3)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <rect
                x="295"
                y="93"
                width="14"
                height="14"
                fill="rgba(168,85,247,0.3)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <rect
                x="465"
                y="93"
                width="14"
                height="14"
                fill="rgba(168,85,247,0.3)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />

              <line
                x1="375"
                y1="55"
                x2="395"
                y2="75"
                stroke="#EF4444"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="395"
                y1="55"
                x2="375"
                y2="75"
                stroke="#EF4444"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text
                x="385"
                y="48"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                OPEN
              </text>

              <text x="60" y="140" fill="rgba(255,255,255,0.7)" fontSize="10">
                ○ device · ▭ isolator · ✗ fault — devices on either side stay online via panel
                re-feed
              </text>

              <text x="20" y="200" fill="#FBBF24" fontSize="13" fontWeight="bold">
                Class B — open-ended spur (no fault tolerance)
              </text>
              <rect
                x="40"
                y="220"
                width="80"
                height="60"
                rx="6"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="80"
                y="248"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                PANEL
              </text>
              <text x="80" y="264" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                SPUR OUT
              </text>

              <line x1="120" y1="250" x2="700" y2="250" stroke="#EF4444" strokeWidth="2" />

              <circle
                cx="200"
                cy="250"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="300"
                cy="250"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="400"
                cy="250"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="500"
                cy="250"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="600"
                cy="250"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <circle
                cx="700"
                cy="250"
                r="7"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />

              <line x1="715" y1="240" x2="715" y2="260" stroke="#EF4444" strokeWidth="3" />

              <line
                x1="240"
                y1="240"
                x2="260"
                y2="260"
                stroke="#EF4444"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="260"
                y1="240"
                x2="240"
                y2="260"
                stroke="#EF4444"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text
                x="250"
                y="234"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                OPEN
              </text>

              <text x="350" y="290" textAnchor="middle" fill="rgba(239,68,68,0.85)" fontSize="10">
                ⚠ all devices BEYOND fault are LOST until cleared
              </text>

              <line
                x1="280"
                y1="278"
                x2="710"
                y2="278"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />

              <rect
                x="40"
                y="330"
                width="700"
                height="106"
                rx="8"
                fill="rgba(34,211,238,0.06)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1.4"
              />
              <text x="60" y="354" fill="#22D3EE" fontSize="11" fontWeight="bold">
                Selection — when each is used
              </text>
              <text x="60" y="374" fill="rgba(255,255,255,0.75)" fontSize="10">
                Class A — design default for L1 / L2 / L3 and most addressable systems. Single-fault
                tolerant.
              </text>
              <text x="60" y="390" fill="rgba(255,255,255,0.75)" fontSize="10">
                Class B — acceptable for some smaller / less critical installations where the design
                risk-assessment justifies.
              </text>
              <text x="60" y="406" fill="rgba(255,255,255,0.75)" fontSize="10">
                Both topologies — terminate per panel manual; verify Class A as a closed loop in
                panel diagnostic at commissioning.
              </text>
              <text x="60" y="422" fill="rgba(255,255,255,0.75)" fontSize="10">
                Drawing — clearly identify which loop / spur is Class A and which is Class B;
                as-installed matches the design.
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Screen termination — single end, panel FE</ContentEyebrow>

          <ConceptBlock
            title="Why one end, not two — and not floating"
            plainEnglish="Addressable loop cables typically include an overall braid or foil screen surrounding the two loop conductors. The screen drains induced electromagnetic noise (mains hum, RF interference, ground-fault transients) to a low-impedance reference. The reference is the panel functional earth. Termination at one end (the panel) drains noise without creating an earth loop. Termination at both ends creates a circulating current path between the panel functional earth and the device-end functional earth — any potential difference between the two pumps current through the screen, injecting noise instead of draining it. Floating (no termination at either end) gives no drain at all."
            onSite="Standard practice: terminate the screen at the PANEL end to the panel functional earth (PINK conductor under BS 7671 A2:2022). At the FAR end, cut the screen back, sleeve it, and isolate it from any conductive part. Document on the as-installed drawing: 'Loop X screen: panel FE one-end termination' so the next service engineer knows the convention. Some panel manufacturers prescribe a different scheme (very rare); the manual is the controlling document."
          >
            <p>The reasoning step-by-step:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The noise source.</strong> External electromagnetic fields (50 Hz mains hum
                from adjacent cable trays, RF from radio transmitters, switching transients from
                variable-speed drives) couple into the loop conductors. Without a screen, this noise
                appears as differential-mode signal on the loop; the panel can misinterpret it as
                device communication.
              </li>
              <li>
                <strong>The screen function.</strong> The screen surrounds the loop conductors and
                provides a low-impedance path to a reference. Currents induced in the screen create
                a counter-field that cancels the noise field at the loop conductors. The
                cancellation works because the screen is referenced to a stable potential.
              </li>
              <li>
                <strong>One-end termination.</strong> The screen is connected to the panel
                functional earth at one end. Induced noise flows along the screen to the panel FE
                and is drained. No second connection means no return path, so no circulating
                current.
              </li>
              <li>
                <strong>Two-end termination.</strong> The screen is connected to functional earth at
                BOTH ends. Any potential difference between the two earth references (and there
                always is one) drives a current along the screen. The screen is now a noise SOURCE,
                not a noise drain.
              </li>
              <li>
                <strong>Floating.</strong> The screen is isolated at both ends. No drain path. No
                cancellation. Equivalent to not having a screen.
              </li>
              <li>
                <strong>Manufacturer override.</strong> Some panels specify both-end termination
                because their internal screen-current sense circuit relies on it. Always check the
                panel manual; deviation from the standard convention is a recorded variation.
              </li>
            </ol>
            <p>
              The screen termination is one of the small details that separates a fast-commissioned
              fire alarm system from a system that limps through commissioning with random comm
              faults that the engineer cannot pin down. Get it right at first-fix.
            </p>
          </ConceptBlock>

          {/* Loop polarity and screen termination diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Loop polarity and screen termination — single-end at panel FE
            </h4>
            <svg
              viewBox="0 0 820 380"
              className="w-full h-auto"
              role="img"
              aria-label="Two-core fire-resistant cable with overall screen runs from panel SLC out, through detector bases, back to panel SLC return. Polarity (+) and (−) maintained throughout. Screen terminated to panel functional earth at the PANEL end only; sleeved and isolated at the far end."
            >
              <rect
                x="40"
                y="120"
                width="120"
                height="160"
                rx="8"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="100"
                y="148"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                CIE / PANEL
              </text>
              <text x="100" y="166" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                addressable loop
              </text>

              <circle cx="160" cy="180" r="4" fill="#EF4444" />
              <text x="155" y="184" textAnchor="end" fill="#EF4444" fontSize="9">
                SLC + OUT
              </text>
              <circle cx="160" cy="200" r="4" fill="#3B82F6" />
              <text x="155" y="204" textAnchor="end" fill="#3B82F6" fontSize="9">
                SLC − OUT
              </text>
              <circle cx="160" cy="230" r="4" fill="#EF4444" />
              <text x="155" y="234" textAnchor="end" fill="#EF4444" fontSize="9">
                SLC + RTN
              </text>
              <circle cx="160" cy="250" r="4" fill="#3B82F6" />
              <text x="155" y="254" textAnchor="end" fill="#3B82F6" fontSize="9">
                SLC − RTN
              </text>
              <circle cx="160" cy="265" r="4" fill="#EC4899" />
              <text x="155" y="269" textAnchor="end" fill="#EC4899" fontSize="9" fontWeight="bold">
                FE (PINK)
              </text>

              <line x1="160" y1="180" x2="700" y2="180" stroke="#EF4444" strokeWidth="2" />
              <line x1="160" y1="200" x2="700" y2="200" stroke="#3B82F6" strokeWidth="2" />
              <line
                x1="160"
                y1="190"
                x2="700"
                y2="190"
                stroke="rgba(168,85,247,0.7)"
                strokeWidth="1.5"
                strokeDasharray="3,2"
              />
              <line x1="160" y1="230" x2="700" y2="230" stroke="#EF4444" strokeWidth="2" />
              <line x1="160" y1="250" x2="700" y2="250" stroke="#3B82F6" strokeWidth="2" />
              <line
                x1="160"
                y1="240"
                x2="700"
                y2="240"
                stroke="rgba(168,85,247,0.7)"
                strokeWidth="1.5"
                strokeDasharray="3,2"
              />

              <line x1="700" y1="180" x2="740" y2="180" stroke="#EF4444" strokeWidth="2" />
              <line x1="700" y1="200" x2="740" y2="200" stroke="#3B82F6" strokeWidth="2" />
              <line x1="700" y1="230" x2="740" y2="230" stroke="#EF4444" strokeWidth="2" />
              <line x1="700" y1="250" x2="740" y2="250" stroke="#3B82F6" strokeWidth="2" />
              <line x1="740" y1="180" x2="740" y2="230" stroke="#EF4444" strokeWidth="2" />
              <line x1="740" y1="200" x2="740" y2="250" stroke="#3B82F6" strokeWidth="2" />

              <circle
                cx="280"
                cy="190"
                r="9"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text x="280" y="172" textAnchor="middle" fill="#22D3EE" fontSize="9">
                D01
              </text>
              <circle
                cx="420"
                cy="190"
                r="9"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text x="420" y="172" textAnchor="middle" fill="#22D3EE" fontSize="9">
                D02
              </text>
              <circle
                cx="560"
                cy="190"
                r="9"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text x="560" y="172" textAnchor="middle" fill="#22D3EE" fontSize="9">
                D03
              </text>

              <circle
                cx="350"
                cy="240"
                r="9"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text x="350" y="262" textAnchor="middle" fill="#22D3EE" fontSize="9">
                D04
              </text>
              <circle
                cx="490"
                cy="240"
                r="9"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text x="490" y="262" textAnchor="middle" fill="#22D3EE" fontSize="9">
                D05
              </text>
              <circle
                cx="630"
                cy="240"
                r="9"
                fill="rgba(34,211,238,0.2)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text x="630" y="262" textAnchor="middle" fill="#22D3EE" fontSize="9">
                D06
              </text>

              <line x1="160" y1="190" x2="160" y2="265" stroke="#EC4899" strokeWidth="2" />
              <line x1="160" y1="240" x2="160" y2="265" stroke="#EC4899" strokeWidth="2" />
              <text x="155" y="290" textAnchor="end" fill="#EC4899" fontSize="9" fontWeight="bold">
                screen → FE
              </text>
              <text x="155" y="302" textAnchor="end" fill="rgba(236,72,153,0.7)" fontSize="8.5">
                single-end ✓
              </text>

              <line
                x1="740"
                y1="190"
                x2="740"
                y2="240"
                stroke="rgba(168,85,247,0.7)"
                strokeWidth="1.5"
                strokeDasharray="3,2"
              />
              <circle
                cx="755"
                cy="215"
                r="6"
                fill="none"
                stroke="rgba(168,85,247,0.7)"
                strokeWidth="1.5"
              />
              <text x="770" y="218" fill="rgba(168,85,247,0.85)" fontSize="9">
                cut back
              </text>
              <text x="770" y="230" fill="rgba(168,85,247,0.7)" fontSize="8.5">
                + sleeved
              </text>
              <text x="770" y="242" fill="rgba(239,68,68,0.85)" fontSize="9" fontWeight="bold">
                ✗ no FE
              </text>

              <rect
                x="200"
                y="80"
                width="500"
                height="32"
                rx="6"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.4"
              />
              <text
                x="450"
                y="100"
                textAnchor="middle"
                fill="rgba(239,68,68,0.95)"
                fontSize="11"
                fontWeight="bold"
              >
                ⚠ Polarity must be maintained at every base — (+) red continuous, (−) blue
                continuous
              </text>

              <rect
                x="40"
                y="320"
                width="700"
                height="50"
                rx="6"
                fill="rgba(34,211,238,0.06)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1.4"
              />
              <text x="60" y="338" fill="#22D3EE" fontSize="10" fontWeight="bold">
                Two-core fire-resistant cable + overall screen
              </text>
              <text x="60" y="354" fill="rgba(255,255,255,0.75)" fontSize="9.5">
                Polarity (+/−) maintained — every base, every isolator, every interface module
              </text>
            </svg>
          </div>

          <RegsCallout
            source="BS 5839-1:2025 · Clauses on cable selection, fixing and identification (FIA Guide §16)"
            clause={
              <>
                Cables for fire alarm systems should be of fire-resistant type appropriate to the
                category of system, run on dedicated containment, supported at intervals appropriate
                to the cable and containment, identified throughout the installation in a single
                common colour (red preferred) and labelled at intervals to identify the system to
                which they belong. Joint boxes should be avoided where possible and, where used,
                should be fire-rated, accessible and recorded on the as-installed drawing.
              </>
            }
            meaning="Dedicated containment, single common colour (red preferred), labelled, JBs avoided / fire-rated / accessible / recorded. The 2025 changes from 2017 are colour clarity (red preferred) and the explicit inclusion of the LV mains feed in the fire alarm cable identification scheme."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cable routing, supports, voids and joint boxes</ContentEyebrow>

          <ConceptBlock
            title="Cable routing per planned containment"
            plainEnglish="Fire alarm cable runs follow a planned route on dedicated containment — conduit, basket, tray or trunking — that is sized, located and supported to keep the cable identifiable, mechanically protected and in a known position for future maintenance. Routing is decided at design / first-fix, not improvised at second-fix. The route avoids damp areas, high-temperature areas, and proximity to high-voltage / high-noise circuits. Penetrations through fire-rated walls and floors are fire-stopped to maintain the compartment rating."
            onSite="Pull the cable on the planned route. If the planned route is impractical (a structural surprise, a clash with another service), STOP, agree a variation with the designer, and record the variation on the as-installed drawing. Improvising a route around a clash without recording it leaves the next service engineer hunting cable that does not match the drawing."
          >
            <p>The routing rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Dedicated containment.</strong> Fire alarm cables run on containment that is
                specific to the fire alarm system. Sharing with general circuits, IT cabling or
                other life-safety systems is the design exception, not the rule. Where sharing is
                unavoidable, segregation is per BS 7671 §528 and the containment has clear
                identification.
              </li>
              <li>
                <strong>Support intervals — vertical.</strong> Vertical drops typically supported at
                intervals not exceeding 1 m (cable cleat / saddle), with additional support at every
                floor penetration and at every change of direction. Fixings are fire-rated — plastic
                saddles defeat fire-rated cable.
              </li>
              <li>
                <strong>Support intervals — horizontal.</strong> Horizontal runs supported per the
                containment system instruction. Cable basket spans up to 1.5 m typical; wider spans
                require strut or trapeze. The cable must not sag under self-weight or under the
                weight of subsequent cables on the same containment.
              </li>
              <li>
                <strong>Penetrations.</strong> Wall and floor penetrations through fire-rated
                construction are sleeved, fire-stopped and labelled. The fire-stop rating matches or
                exceeds the wall / floor rating. A cable run through an unstopped penetration
                breaches the compartment regardless of cable rating.
              </li>
              <li>
                <strong>Bend radius.</strong> Cable manufacturer-specified minimum bend radius
                respected. Tight bends fracture fire-resistant insulation in a slow ageing process;
                the cable passes IR at install and fails IR at the first service.
              </li>
              <li>
                <strong>Avoid damp / heat / interference.</strong> Routing avoids permanently damp
                areas (causes screen corrosion and IR drop over time), areas above rated ambient
                temperature (causes insulation degradation), and areas of high electromagnetic
                interference (variable-speed drives, large transformers, RF transmitters).
              </li>
            </ul>
            <p>
              The mantra: planned route, dedicated containment, fire-rated supports, fire-stopped
              penetrations, bend radius respected, identified throughout. Anything else is
              opportunity for a service-life failure.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Voids — containment continues, detectors mounted per the 2025 Figure"
            plainEnglish="Where the fire alarm system protects a void (above a suspended ceiling, below a raised floor), the cable containment continues into the void on the same dedicated route. Detectors in the void are mounted at the position prescribed by the 2025 BS 5839-1 Figure (the new void-depth diagram from §18 of the FIA Guide): voids ≤1.25 m deep — top 125 mm of void; voids >1.25 m and ≤1.5 m deep — top 10% of void depth; voids >1.5 m deep — treated as a normal-height room with the standard 25-600 mm (smoke) / 25-150 mm (heat) ceiling rule. Access to the detectors via removable ceiling tiles or void-access hatches sited per the design."
            onSite="If you are pulling cable into a ceiling void, the containment continues into the void; do not strip back to single-cable runs. The detectors in the void are accessible from the room below (lift-and-shift ceiling tiles) or from a dedicated access hatch. The detector position in the void is per the 2025 Figure — re-read Module 5 §1 for the depth bands."
          >
            <p>The void rules — combined with §18 in this module:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable containment.</strong> Continues into the void on the planned route.
                Same fire rating, same identification, same support intervals.
              </li>
              <li>
                <strong>Detector mounting position.</strong> Per the 2025 Figure: ≤1.25 m → top 125
                mm; 1.25-1.5 m → top 10%; &gt;1.5 m → treated as normal room with 25-600 mm / 25-150
                mm rule.
              </li>
              <li>
                <strong>Access provision.</strong> Detector heads are accessible for service without
                dismantling permanent construction. Lift-and-shift ceiling tiles are acceptable;
                sealed boards are not.
              </li>
              <li>
                <strong>Identification at the access point.</strong> Each detector position is
                identified on the as-installed drawing by zone and address; access tiles in
                suspended ceilings are commonly marked to identify which detector is above.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Joint boxes — avoided, and when used, fire-rated and accessible"
            plainEnglish="Joint boxes (JBs) are points where the cable is broken to terminate, change direction, or transition between containment systems. They are mechanical and electrical weak points: the joint is a higher-impedance connection than the cable itself, the JB is a place where moisture can ingress, and a hidden JB is a maintenance liability that is invisible until something fails. BS 5839-1:2025 reinforces the existing position: AVOID joint boxes where possible (route the cable around the obstruction). Where joint boxes are unavoidable, they must be FIRE-RATED to match the cable, ACCESSIBLE for inspection and maintenance, LABELLED so they are identifiable, and RECORDED on the as-installed drawing."
            onSite="If you are running cable and you hit a structural obstacle, your first reflex should be to re-route. Only when re-routing is genuinely impossible should you consider a JB. If you must JB, document it: fire-rated body, accessible location (not above a permanent ceiling, not behind a permanently fitted item), 'FIRE ALARM' label or agreed identifier, and a mark on the as-installed drawing showing the JB position and the agreed reason for it."
          >
            <p>The joint box discipline:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Avoid where possible.</strong> Re-route the cable around the obstacle. A 100
                mm cable diversion is a far smaller compromise than a JB.
              </li>
              <li>
                <strong>Fire-rated.</strong> Where a JB is unavoidable, body and gland system rated
                to match the cable rating. A 60-minute cable in a 0-minute JB is a 60-minute cable
                rated 0 minutes.
              </li>
              <li>
                <strong>Accessible.</strong> Inspectable and maintainable without dismantling
                permanent construction. Hidden above a permanently sealed ceiling = inaccessible =
                compliance failure.
              </li>
              <li>
                <strong>Labelled.</strong> &quot;FIRE ALARM&quot; identifier or the agreed project
                label so the JB is identified in service. Unlabelled JBs get torn out by future
                trades who do not know what they are.
              </li>
              <li>
                <strong>Recorded.</strong> Position, reason and date on the as-installed drawing.
                Future service engineers find the JB on the drawing before they open the building
                up.
              </li>
            </ul>
            <p>
              The four words: AVOIDED, FIRE-RATED, ACCESSIBLE, RECORDED. JBs that fail any of the
              four are non-compliant and a service-life liability.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="JB hidden above a permanent ceiling, no label, not on the drawing"
            whatHappens="During second-fix, the cable hits a structural beam and the technician fits a non-fire-rated plastic JB above the suspended ceiling to redirect. No label, no drawing update. Two years later, an intermittent loop fault is reported. The service engineer reads the as-installed drawing — no JB shown. The engineer pulls the loop apart end-to-end, finally finds the hidden JB, finds the joint corroded by long-term condensation in the ceiling void, and finds the JB body has zero fire rating. Major rework, major down-time, and a now-recorded variation that should never have been done."
            doInstead="Avoid the JB by re-routing. If genuinely unavoidable: fire-rated JB, fire-rated glands, accessible position (NOT hidden above a permanent ceiling — use a removable tile or an access panel), 'FIRE ALARM' label fitted, drawing updated with position and reason. Take 30 minutes more on the day; save 30 hours later."
          />

          <Scenario
            title="Class A loop running through a riser shaft"
            situation="A 12-storey office building has a 2 m × 2 m riser shaft on each floor that drops cleanly to the basement plant room. The fire alarm Class A loop drops down this shaft. Your design specifies vertical fire alarm cabling on dedicated cable basket, with isolators distributed at every floor and a fire-rated penetration at every floor slab."
            whatToDo="Run the cable on dedicated fire-rated basket fixed to the shaft wall with fire-rated cleats / saddles. Support intervals: not exceeding 1 m vertical. Provide an additional support on each side of every floor penetration (the cable should not be carrying the weight of itself across the penetration). Penetrations: sleeved and fire-stopped per the floor's fire rating. Isolators at every floor base on the loop, recorded on the as-installed drawing. Identification: red overall jacket, red sleeving on internal cores, FE conductor pink (or marked 'FE'). Final continuous run to the panel on the same colour and rating throughout. Pre-energisation IR with all loop devices removed."
            whyItMatters="The shaft is a fire-spread risk; under the 2025 §17 changes (flue-like structures), the shaft itself is detector-monitored at the top. The cable run within the shaft must not compromise the compartmentation; fire-rated supports, fire-rated penetrations and a single planned route make the cable a passive part of the compartment, not a path for fire spread. A single un-fire-rated cleat between two fire-stopped penetrations reduces the cable rating to zero at that point."
          />

          <SectionRule />

          <ContentEyebrow>Termination — bases, MCPs, sounders, panel</ContentEyebrow>

          <ConceptBlock
            title="The four termination points"
            plainEnglish="Fire alarm cable terminates at four kinds of point: detector bases, manual call points, sounders / VADs, and the panel. Each has a specific termination method, polarity convention and address (for addressable systems). Termination correctness matters because the loop is a polarity-sensitive serial communication path; a single back-to-front device blocks all communication beyond it."
            onSite="Read the device datasheet before terminating. The datasheet shows the terminal layout, polarity (+/−), and address-setting method (DIP switch or panel-led auto-address). Match the as-installed drawing. Photograph the inside of every base before fitting the head — useful for service-life troubleshooting if the same base needs to be diagnosed years later."
          >
            <p>The four termination points:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Detector base.</strong> Two-screw or push-fit terminations for loop IN and
                loop OUT (passing through the base — the loop continues to the next device via the
                base). Polarity must be maintained: (+) IN to (+) OUT, (−) IN to (−) OUT. Bases
                support a head only at second-fix, after the cable is verified. Pre-second-fix, dust
                caps fitted.
              </li>
              <li>
                <strong>Manual call point (MCP).</strong> Loop pass-through wired the same way as a
                detector base. Polarity maintained. The MCP cover (transparent under the 2025 §10
                recommendation) clips on after termination.
              </li>
              <li>
                <strong>Sounder / VAD.</strong> Polarity-sensitive supply terminals for sounder
                circuit (typically 24 V dc with end-of-line resistor or addressable module-driven).
                Addressable sounders draw from the loop and are wired pass-through; conventional
                sounders are spurred from a sounder zone. Polarity is critical — reversed polarity
                often means &quot;does not operate&quot; rather than damage, but the symptom is
                identical.
              </li>
              <li>
                <strong>Panel.</strong> Loop OUT, loop RETURN, sounder zones, mains supply, FE, ARC
                interface (if fitted), repeater interface (if fitted), and battery. The panel manual
                is the controlling document for the terminal layout. Photograph the panel internals
                after termination — useful for both first-commissioning and future service.
              </li>
            </ul>
            <p>
              For addressable devices, set the address per the design schedule BEFORE fitting the
              head to the base. Wrong address = device communicates but is reported by the panel at
              the wrong location = false-alarm investigation goes to the wrong place. The address
              schedule is in the as-installed drawing; the address on each device matches.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Polarity, addresses and the pre-energisation walk-through"
            plainEnglish="Before energising the panel for the first time, walk the loop. At every base, verify polarity (cable IN to IN terminal, cable OUT to OUT terminal, (+) and (−) consistent throughout). At every device with a hard-set address, verify the address matches the schedule. At every junction, verify the cable identification and rating are consistent. The walk-through finds the back-to-front device, the swapped address, the missing dust cap, the un-isolated screen — all before the panel is asked to find them by diagnostic."
            onSite="The walk-through is 30 minutes well-spent on a 100-device loop. The alternative is energising, finding 12 missing or back-to-front devices, having to walk the loop anyway to find them, and having a longer first-power-up window. Walk first, energise second."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Insulation resistance test — pre-energisation</ContentEyebrow>

          <ConceptBlock
            title="The cable IR test — devices removed"
            plainEnglish="Before energising the panel for the first time, the cable wiring undergoes an insulation resistance (IR) test to verify it is fit to be energised. The test applies 500 V dc between the loop conductors and earth (and between conductors), and measures the resistance. The cable IR acceptance is at least 1 MΩ per BS 7671 §643.3 — the same rule used for any LV wiring. CRITICAL: loop devices must be DISCONNECTED before the test. A 500 V dc shot through addressable detector electronics, isolators and interface modules will destroy them. The cable is the test subject; remove devices first, IR-test the cable, re-fit devices only after the cable IR passes."
            onSite="The pre-energisation IR is a non-negotiable check. Procedure: at every base, lift the head OR pull the cable from one set of base terminals; at every MCP, remove the MCP from the back-box; at the panel, disconnect the loop from the SLC terminals. Now you have a cable with no electronics on it. Apply 500 V dc, read the IR. Each conductor to earth: ≥1 MΩ. Conductor to conductor: ≥1 MΩ. Re-connect devices ONLY after the IR passes."
          >
            <p>The IR test methodology:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Disconnect devices.</strong> Remove all addressable detectors from bases.
                Remove MCPs from back-boxes. Remove sounders / VADs from loop terminals. Disconnect
                the loop from the panel SLC terminals.
              </li>
              <li>
                <strong>Verify isolation.</strong> Confirm panel is OFF, batteries disconnected, no
                incoming voltage on the loop. The loop is now an isolated cable.
              </li>
              <li>
                <strong>IR conductor-to-earth.</strong> 500 V dc between (+) loop conductor and
                earth. Read; ≥1 MΩ acceptance per BS 7671 §643.3. Repeat for (−) loop conductor to
                earth.
              </li>
              <li>
                <strong>IR conductor-to-conductor.</strong> 500 V dc between (+) and (−) loop
                conductors. Read; ≥1 MΩ acceptance.
              </li>
              <li>
                <strong>IR screen-to-earth.</strong> 500 V dc between the screen and earth (with
                screen disconnected from FE for the test). Read; ≥1 MΩ acceptance. Re-terminate
                screen to FE after the test.
              </li>
              <li>
                <strong>Record.</strong> All readings on the commissioning record. Failures
                investigated and rectified before re-test. Each conductor and each path tested.
              </li>
              <li>
                <strong>Re-fit devices.</strong> After the cable IR passes, re-fit detectors, MCPs,
                sounders to their bases / boxes. Re-connect loop to panel SLC. Now the system is
                ready for first power-up.
              </li>
            </ol>
            <p>
              Some panel manufacturers offer a low-voltage diagnostic that runs after first
              energisation — this is NOT a substitute for the pre-energisation cable IR. The cable
              IR proves the wiring is fit to be energised; the panel diagnostic proves the loop
              communication works. The two checks are different and both required.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Running 500 V dc IR through a fully populated loop"
            whatHappens="Eager apprentice on first day of commissioning. Loop is wired, all devices fitted, panel awaiting power-up. Apprentice is told to 'do the IR test' and applies 500 V dc to the loop with all devices in place. Within 60 seconds, half the loop electronics are smoked: SLC drivers in the panel, six addressable isolators, twelve detector loop interfaces. The cable test would have taken 20 minutes; the rectification takes a week and the bill is several thousand pounds in replacement devices."
            doInstead="DISCONNECT devices first. Cable IR is a CABLE test, not a device test. Pull heads, lift bases out, disconnect loop from panel, then 500 V dc. Re-fit only after the cable IR passes. The 'IR test with everything connected' instinct comes from socket-circuit testing where 500 V into an unloaded socket is harmless — fire alarm loops are full of electronics that will not survive 500 V dc."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §643.3 (Insulation resistance) · Applied to fire alarm wiring per BS 5839-1:2025"
            clause={
              <>
                The insulation resistance between live conductors, and between live conductors and
                the protective conductor connected to the earthing arrangement, shall be measured at
                a test voltage of 500 V dc. The minimum acceptable value is 1 MΩ. For the purpose of
                this test, electronic devices connected to the circuit should be disconnected.
              </>
            }
            meaning="The 500 V / 1 MΩ rule from BS 7671 §643.3 applies to fire alarm cable. Critically, the same clause specifies that electronic devices connected to the circuit should be disconnected for the test. The rule is in BS 7671; it applies on every LV circuit including fire alarm loops. Devices in place + 500 V dc = destroyed devices."
          />

          <SectionRule />

          <ContentEyebrow>
            Batteries, mains isolation and the §16 / §19 clarifications
          </ContentEyebrow>

          <ConceptBlock
            title="Standby batteries — date label, earthing, and care during install"
            plainEnglish="The fire alarm panel's standby batteries provide power during mains failure, sized to support the system in quiescent state for the design autonomy period (typically 24 h or 72 h depending on the system) plus a defined alarm period at the end. Batteries are sealed lead-acid (most common) or lithium-iron-phosphate (newer panels). They are installed during second-fix, connected to the panel under panel-supervised charge regime, and labelled with the date of installation. The 2025 §16 wording acknowledges the long-standing custom-and-practice of labelling the battery with the install date by permanent marker — this is now explicit in the standard."
            onSite="When you install batteries: (1) date-of-install label by permanent marker on each battery, (2) connect under panel charge supervision (panel detects under-voltage or open circuit and reports as a battery fault), (3) earthing per BS 7671:2018+A4:2026 §560 — life-safety circuit earthing, (4) verify the panel reads the correct battery voltage during commissioning, (5) record the battery type, capacity, install date and location in the O&M manual. The label drives the replacement schedule — typically 4-5 years for sealed lead-acid."
          >
            <p>The battery rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Date of installation label.</strong> Permanent marker on each battery
                showing the install date. Acknowledged in BS 5839-1:2025 §16 as long-standing
                custom-and-practice. The label survives the service intervals; loose paperwork does
                not.
              </li>
              <li>
                <strong>Earthing per BS 7671:2018+A4:2026 §560.</strong> Section 560 deals with
                Safety Services. Fire alarm power supplies are safety services; their earthing is
                per §560. The panel mains feed CPC terminates at the panel earth bar; the battery
                negative terminal is panel-internal and follows the panel manufacturer's arrangement
                (typically isolated from earth, with the earth bar providing the reference for the
                LV mains side only).
              </li>
              <li>
                <strong>Capacity / autonomy.</strong> Battery capacity is sized to give the design
                quiescent autonomy plus the alarm period at end. Common targets: 24 h quiescent + 30
                min alarm, or 72 h quiescent + 30 min alarm. The capacity calculation is in the
                design documentation; the installed batteries match.
              </li>
              <li>
                <strong>Charge regime.</strong> The panel monitors charge voltage and battery
                impedance / load test capability. Battery faults are reported on the CIE.
                Replacement is triggered by service-life (typically 4-5 years sealed lead-acid) or
                by a service finding (low voltage, high impedance, capacity test fail).
              </li>
              <li>
                <strong>Care during install.</strong> Batteries are charged at delivery — handle
                with insulated tools, avoid short-circuit between terminals. Wear eye protection —
                sealed lead-acid can vent under abuse. Dispose of old batteries via a licensed
                waste-stream operator under the Batteries and Accumulators Regulations 2009.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mains isolation — the §19 consolidated clause"
            plainEnglish="The 2017 revision of BS 5839-1 had recommendations for isolation of the mains power to the fire alarm system split between two clauses (25 and 29). The 2025 revision consolidates these into a single new §19. The recommendation: a dedicated mains isolator for the fire alarm system, clearly labelled, accessible to authorised persons, used under controlled conditions for service. Routine occupant access is NOT the design intent — the isolator is for service / maintenance staff under documented procedure."
            onSite="Provide a labelled, dedicated mains isolator for the fire alarm system on the dedicated supply. Label: 'FIRE ALARM SYSTEM — MAINS ISOLATOR — DO NOT SWITCH OFF'. Lockable or tagged. Accessible to authorised persons only. Position: at the LV distribution serving the panel, OR at the panel itself, depending on the design. Document the position on the as-installed drawing and in the O&M manual."
          >
            <p>The §19 requirements — paraphrased:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Dedicated.</strong> A mains isolator specific to the fire alarm system, NOT
                shared with general circuits. Operating it does not affect any other installation.
              </li>
              <li>
                <strong>Labelled.</strong> Identification clearly stating the function. Format
                varies by project; typical wording &quot;FIRE ALARM SYSTEM — MAINS ISOLATOR — DO NOT
                SWITCH OFF&quot;.
              </li>
              <li>
                <strong>Accessible to authorised persons.</strong> The isolator is reachable for
                service staff. Routine occupant access is not the design intent — it is typically
                locked or tagged.
              </li>
              <li>
                <strong>Used under controlled conditions.</strong> Operation of the isolator follows
                a documented procedure (typically: notify ARC, inform building management, perform
                planned isolation, restore, verify). Unplanned operation is a recordable incident.
              </li>
              <li>
                <strong>Documented position.</strong> On the as-installed drawing and in the O&M
                manual. Service staff find the isolator on the documentation, not by guessing.
              </li>
            </ul>
            <p>
              The 2025 consolidation of the two 2017 clauses into a single §19 is a structural
              improvement, not a substantive change. The same recommendations apply, in one place,
              with clearer language.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 25 / §19 of FIA Guide (Power supplies — mains isolation, consolidated)"
            clause={
              <>
                The recommendations for the isolation of the mains power to the fire detection and
                fire alarm system, previously split between clauses 25 and 29 of the 2017 edition,
                have been consolidated into a single clause in the 2025 edition. A dedicated,
                clearly labelled mains isolator, accessible to authorised persons and used under
                controlled conditions, should be provided for the fire alarm system.
              </>
            }
            meaning="One clause now (was two in 2017). Dedicated, labelled, accessible to authorised persons, controlled-conditions use. The structural change improves clarity; the substance carries forward from 2017."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS 5839-1:2025 §16 — fire alarm cables AND the LV mains supply: single common colour, RED preferred (NEW from 2025 — settles 2017 ambiguity).',
              'Functional Earth (FE) is PINK or marked "FE" per IEC 60445:2021 / BS 7671 A2:2022. Not cream. Not green-and-yellow.',
              'Loop screen termination: ONE end (panel FE), cut back and isolated at the far end. Both ends = ground loop. Floating = no drain.',
              'Class A loop = closed loop with isolators, single-fault tolerant. Class B = open-ended spur, no fault tolerance. Most addressable systems are Class A.',
              'Support intervals: vertical ≤1 m + supports at floor penetrations. Fixings fire-rated to match cable rating.',
              'Joint boxes AVOIDED. If used: fire-rated, accessible, labelled, recorded on as-installed drawing.',
              'Voids: containment continues into void; detectors mounted per the 2025 Figure (≤1.25 m / 1.25-1.5 m / >1.5 m bands).',
              'Polarity maintained at every base, every MCP, every sounder. (+) IN to (+) OUT, (−) IN to (−) OUT. Walk the loop pre-energisation.',
              'Pre-energisation IR: devices DISCONNECTED, 500 V dc, ≥1 MΩ acceptance per BS 7671 §643.3. Never IR with devices in place.',
              'Batteries: date-of-install label by permanent marker (BS 5839-1:2025 §16 acknowledged custom and practice). Earthing per BS 7671:2018+A4:2026 §560.',
              'Mains isolation per §19 (NEW consolidated 2025 clause): dedicated, labelled, accessible to authorised persons, lockable / tagged.',
              'ALL variations recorded (NEW 2025 — was "major" only in 2017). Cable colour deviation from red, JB use, screen scheme deviation — all recorded.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'BS 5839-1:2025 says "red preferred" for the cables and the mains feed. What do I do on a re-fit where the existing cabling is white?',
                answer:
                  '"Red preferred" allows existing schemes in other colours to remain. For a re-fit / extension into a system with white cables, continue the existing colour and document the variation. Replacing the entire cable scheme to comply with the colour preference would be disproportionate. New installations on new sites should default to red unless project-specific reasoning justifies otherwise — and that reasoning is recorded as a variation.',
              },
              {
                question: 'Cream FE conductor on a 2018 install — is it now non-compliant?',
                answer:
                  'Not retrospectively non-compliant. The cream → pink change came in BS 7671 A2:2022; existing installations to the previous identification remain in service. New work, additions and modifications use the new pink identification. If the cream FE is still in service, do not touch it; if you are modifying, the new conductor is pink. Document the legacy cream FE in the as-installed drawing for the next service engineer.',
              },
              {
                question: 'Why is the loop screen terminated at one end only and not at both?',
                answer:
                  'Single-end termination drains induced noise to the panel functional earth without creating an earth loop. Both-end termination creates a circulating current path between the two earth references; any potential difference drives current along the screen and INJECTS noise into the loop. Floating gives no drain. The single-end convention is the noise-drain optimum. Some panels specify a different scheme — always check the panel manual.',
              },
              {
                question: 'Class A or Class B for a small Cat M / P installation?',
                answer:
                  'Class B is acceptable for small / less critical installations where the design risk-assessment justifies it. Class A is the design default for L1 / L2 / L3 and most addressable systems. The selection is a design decision based on the category, the panel capability, the fault-tolerance target and the size of the installation. The design specifies the topology; the as-installed matches.',
              },
              {
                question:
                  'Can I use plastic cable cleats on fire-resistant cable? They are cheaper.',
                answer:
                  'No. The cable rating is only as good as its supports. A 60-minute cable on plastic cleats that fail at 5 minutes is a 5-minute cable. Use fire-rated cleats / saddles / fixings appropriate to the cable rating. The expense is small compared with the consequence of a cable that drops out of its supports during a fire.',
              },
              {
                question: 'Pre-energisation IR test — at what voltage and what acceptance?',
                answer:
                  '500 V dc, ≥1 MΩ acceptance per BS 7671 §643.3 (the rule for any LV wiring). Loop devices DISCONNECTED before the test — 500 V dc through addressable electronics destroys them. Test conductor-to-earth, conductor-to-conductor, screen-to-earth. Re-fit devices only after IR passes.',
              },
              {
                question:
                  'Battery date label — is the FIA Guide saying I must use a printed sticker or is permanent marker acceptable?',
                answer:
                  'Permanent marker is acknowledged as long-standing custom and practice in BS 5839-1:2025 §16. Format is not specified beyond "label fixed to the battery showing the date of installation". A permanent-marker entry directly on the battery casing is acceptable; a printed adhesive label is also acceptable. The label must survive the service intervals (4-5 years lead-acid typical), so the marker / label must be non-fading and adhere to the casing surface.',
              },
              {
                question: 'Joint box on a fire alarm cable — when is it acceptable?',
                answer:
                  'Only when re-routing is genuinely impossible. The four conditions: (a) FIRE-RATED to match the cable rating, (b) ACCESSIBLE for inspection without dismantling permanent construction, (c) LABELLED "FIRE ALARM" or with the agreed identifier, (d) RECORDED on the as-installed drawing with position and reason. JBs that fail any of the four are non-compliant. Avoid where possible; the design intent is no JBs.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Wiring and terminations — Module 5.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-5/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 Commissioning procedures
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

export default FireAlarmModule5Section4;
