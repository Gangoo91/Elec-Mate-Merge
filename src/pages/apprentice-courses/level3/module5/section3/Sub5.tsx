/**
 * Module 5 · Section 3 · Subsection 5 — Polarity verification (Reg 643.6)
 * Maps to C&G 2365-03 / Unit 304 / LO5 / AC 5.6, 5.7
 *   AC 5.6 — "explain why it is necessary to verify polarity"
 *   AC 5.7 — "state the procedures for verifying polarity"
 * Layered: 2357 ELTK06 / polarity verification
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

const TITLE = 'Polarity verification — switching in the line | Level 3 Module 5.3.5 | Elec-Mate';
const DESCRIPTION =
  'Polarity testing per BS 7671 Reg 643.6 — verifying that single-pole devices interrupt the line conductor only (Reg 132.14), centre contact of screw lampholders to line, and conductor identification at every accessory. Method, instruments, and what reverse polarity means for safety.';

const checks = [
  {
    id: 'm5-s3-sub5-why-polarity',
    question: 'Per Reg 643.6, polarity must be verified to confirm:',
    options: [
      'Single-pole switches and protective devices are connected in the line conductor only (Reg 132.14), and the centre contact of screw-type (E14, E27) lampholders is connected to the line conductor. Verifying polarity prevents the apparent "off" position of a switch from leaving exposed metalwork live.',
      'The plan must rely entirely on self-rescue and on-site assisted rescue by trained personnel with rescue equipment, a satellite communication device should be provided, and the nearest emergency services response time must be factored into planning',
      'The landlord (within 28 days of the inspection), the existing tenants (within 28 days), any new tenants before they move in (with the EICR), the local authority on request (within 7 days), and the inspector retains a copy. The PRS Regs set explicit recipient and timescale requirements that are separate from the inspection itself.',
      'Planned maintenance compliance (percentage of scheduled PMs completed on time), reactive-to-planned work ratio, mean time between failures (MTBF), mean time to repair (MTTR), and maintenance cost as a percentage of asset replacement value',
    ],
    correctIndex: 0,
    explanation:
      'Reg 132.14 (the design rule) requires single-pole devices in the line conductor; Reg 643.6 (the verification rule) requires the test that confirms this. Reverse polarity at a switch means flipping it "off" only breaks the neutral — line voltage is still present at the switched terminal, lampholder contacts, or appliance casing. A user touching the metal lamp body or switching out a bulb expects the circuit to be dead and finds it live. Polarity verification catches this before energisation.',
  },
  {
    id: 'm5-s3-sub5-method',
    question: 'The standard method for verifying polarity during dead testing on a final circuit:',
    options: [
      'A continuity test combined with visual confirmation. With the circuit isolated and the L of the circuit disconnected from the protective device at the CU, link the disconnected L to the CPC at the CU end. At each accessory in turn, measure continuity between L and CPC at the accessory — should read low (the link path). Confirms the line conductor at the accessory IS the line conductor at the CU. Combined with visual confirmation of correct conductor colours at every termination.',
      'Five-bag setup, all clearly labelled: (1) WEEE — failed devices, scorched accessories, electronic components. (2) BATTERIES — taped terminals, separate from metalwork. (3) HAZARDOUS — fluorescent tubes (intact, in tube tube), CFLs, mercury switches. (4) COPPER SCRAP — cable offcuts (insulation on, never stripped by burning), bare copper offcuts. (5) GENERAL — packaging, plastic offcuts, non-recyclable. Each bag goes to its correct route at the next wholesaler trip OR firm scrap collection. The five-bag system makes compliance routine, not a special effort.',
      'A director\\\\\\\'s loan account (DLA) is the running record of money flowing between a director and the Ltd company — money the director lends to the company (positive DLA balance for the director) or money the director takes out of the company beyond declared salary and dividends (negative / overdrawn DLA, which is a director\\\\\\\'s loan from the company). Overdrawn DLAs above £10,000 attract benefit-in-kind tax; long-term overdrawn DLAs attract Section 455 tax (32.5% on the loan).',
      'PEA is activated by hope, compassion, and vision of the ideal self — it opens neural pathways for learning and change. NEA is activated by fear, anxiety, and focus on problems — it triggers defensiveness and closes learning pathways. EI development is more sustainable when driven by PEA ("I want to become a better leader") than NEA ("I must fix my weaknesses or I will fail")',
    ],
    correctIndex: 0,
    explanation:
      'The dead-test polarity method exploits the same temporary L-CPC link used for R1+R2. With L linked to CPC at the CU and you measuring L-CPC at the accessory, a low reading confirms that the conductor you are calling "line" at the accessory really is connected to the line of the circuit at the CU. Combined with visual inspection of conductor colours at every terminal — brown for line, blue for neutral, green/yellow for CPC — and the polarity of the circuit is verified at every point.',
  },
  {
    id: 'm5-s3-sub5-lampholder',
    question: 'BS 7671 requires that the centre contact of an E14 / E27 screw-type lampholder is connected to:',
    options: [
      'Ensure the commissioning records are filed as baseline data for future maintenance, establish the preventive maintenance schedule based on manufacturer\\\\\\\'s recommendations and commissioning findings, and monitor early-life performance for any issues',
      'The line conductor. The exposed screw thread of the lampholder must be connected to neutral so it is at near-zero potential when accessible (e.g. when changing a bulb). The deeper centre contact, less easily touched, is connected to line. Reverse polarity at a screw lampholder means a user changing a bulb can touch a live screw thread.',
      'Plan at year-start: (1) BS 7671 amendment refresher if amendment landed; (2) annual scheme update event (NICEIC Connect or NAPIT equivalent); (3) one specialist training event per active specialism (PV, EV, BAFE, CompEx); (4) quarterly online learning hours (IET Academy, Elec-Mate, scheme portal); (5) at least one trade event for networking and tech updates (ECA Live, etc.). Total: 30-50 CPD hours/year with mix of formal and informal.',
      'A loose termination at one end has oxidised over the three years — surface oxide film grows when contact pressure is insufficient, contact resistance climbs, the cable resistance hasn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t changed but the joint has degraded. Investigate, identify the bad terminal, re-make the joint, retest.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 + IET GN3 Section concerning polarity: the centre contact of screw-type lampholders is connected to line, the screw thread to neutral. The reasoning is access-based — when changing a bulb, the user inevitably touches the threaded shell as they unscrew the bulb. Threaded shell at neutral means ~0 V to earth (under normal conditions); threaded shell at line means 230 V to earth. Bayonet (B22) lampholders have no exposed contact during normal use so the polarity rule is mainly about consistency and switch operation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A single-pole switch on a lighting circuit has reverse polarity (the switch is in the neutral). Practical consequence:',
    options: [
      'Avoid working at height where reasonably practicable. Where it can\\\\\\\'t be avoided, use work equipment or other measures to PREVENT a fall. Where the risk of a fall remains, use work equipment or other measures to MINIMISE the distance and consequences of a fall. The hierarchy is in the Reg explicitly — avoid, prevent, minimise.',
      'The light still works — but the switched-off light fitting still has line voltage present at the lampholder. A user changing a bulb (with the switch off) can be electrocuted by the live screw thread or terminal. The switch interrupts the neutral instead of the line, leaving the load energised when "off".',
      'Consistently demonstrating reliability, integrity, accountability, respect for others, commitment to safety, and a positive approach to work — behaving in a way that upholds the standards of the engineering profession',
      'LFP has a more stable thermal runaway threshold (around 270 °C) and tends to vent rather than ignite, while NMC has a lower runaway threshold (around 200 °C) and a higher risk of self-sustaining fire. LFP is typically heavier per kWh but is the safer chemistry for in-home storage.',
    ],
    correctAnswer: 1,
    explanation:
      'The light works in either polarity because the load only cares that current flows. Reverse polarity becomes a safety issue when the user expects "off" to mean "dead". With the switch in neutral, flipping it off opens the neutral path but leaves the line connected to the lampholder. Touch the screw thread when changing a bulb = full line voltage to earth via the user. This is why polarity verification is mandatory.',
  },
  {
    id: 2,
    question: 'Per GN3, polarity must be verified at:',
    options: [
      'Theft, accidental damage, fire and loss of tools across various circumstances — on site, in transit, from vehicles. Check policy exclusions carefully: many exclude \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'theft from unattended vehicle overnight\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' unless specifically extended; many limit cover per item.',
      'With safe isolation confirmed and the circuit\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s L disconnected from the protective device, link L to CPC at the CU end. At each accessory, measure continuity between L and CPC at the accessory — a low reading confirms the local "line" terminal really is the same conductor as the CU\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s line. Confirms polarity at every accessory.',
      'Every point on every circuit. Conductors can be crossed at intermediate junctions, back-boxes, junction boxes — verifying only at the CU and the first accessory misses errors deeper in the circuit. Test at every accessory, every JB, every termination point.',
      'Specify lower-embodied-carbon materials, prefab where possible, optimise van routes to cut transport, source materials from local merchants, and segregate waste for recycling not landfill',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 explicitly: "Polarity checks are required at all points on a circuit to ensure that conductors have not been crossed at intermediate connection points such as junction boxes." A correctly polarised CU termination tells you nothing about whether someone swapped L and N at a back-box halfway down the circuit. The cost of testing at every accessory is small; the cost of missing a swap can be electrocution.',
  },
  {
    id: 3,
    question: 'Polarity verification using the L-CPC link method on a radial circuit:',
    options: [
      'Separating the person from their past behaviour and responding to their current human experience with genuine compassion. Advanced empathy recognises that difficult people are often struggling, that past conflict does not negate present humanity, and that showing empathy in this moment may transform the entire working relationship — whilst still maintaining appropriate professional boundaries',
      'Coded as FI with a recommended investigation route, recorded under Limitations on the EICR, and brought to the duty holder\\\\\\\\\\\\\\\'s attention in the handover so they can commission the investigation as a separate work item. The EICR cannot certify what cannot be inspected.',
      'ASHP delivers 3–4 kWh of heat per 1 kWh electrical input (high efficiency) but works best in well-insulated dwellings with low flow temperatures (~45 °C); a poorly insulated house with high-temperature radiators can negate the running-cost advantage',
      'With safe isolation confirmed and the circuit\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s L disconnected from the protective device, link L to CPC at the CU end. At each accessory, measure continuity between L and CPC at the accessory — a low reading confirms the local "line" terminal really is the same conductor as the CU\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s line. Confirms polarity at every accessory.',
    ],
    correctAnswer: 3,
    explanation:
      'The dead-test polarity method using the L-CPC temporary link. The link makes L and CPC into one continuous loop. At any accessory, measuring continuity between the conductor designated "line" and the local CPC should give a low reading because both ends of the test path are joined at the CU via the link. If the reading is OL, the local "line" is actually neutral and someone has swapped them at the back-box. The same temporary link is used for the R1+R2 measurement — efficient combined test.',
  },
  {
    id: 4,
    question: 'After dead-test polarity verification, you also need to:',
    options: [
      'Verify polarity LIVE during the energised testing in Section 4 — confirm at the supply origin that L and N are correctly identified per the supply provider, and verify single-pole switches at every accessory really do interrupt the line as designed. The dead test catches static wiring errors; the live test catches errors at the supply or hidden swaps further upstream.',
      'Acknowledge that self-harm is currently helping them cope, validate their emotional pain, explore whether they would be open to learning alternative coping strategies over time, and gently encourage them to speak to a professional such as a counsellor when they feel ready',
      'Capability to handle the 10/350 microsecond impulse waveform — partial direct-lightning current. Required at the installation origin where the building has an external lightning protection system (LPS) per BS EN 62305-3 or where direct-strike risk to the supply exists. Higher Iimp rating, higher Up than Type 2 / 3.',
      'Remove the cross-connection at the CU, re-land the line and neutral conductors into their correct terminals on the protective device, double-check polarity by visual inspection of the terminations, then proceed to insulation resistance testing (Sub 3) before energising.',
    ],
    correctAnswer: 0,
    explanation:
      'Polarity is verified twice in BS 7671 — once as a dead test (Reg 643.6, this Sub) and once as a live test as part of energised verification (Reg 643.7.1, see Section 4 Sub 1). The dead test confirms internal wiring polarity; the live test confirms incoming supply polarity (which the dead test cannot do — there is no reference) and verifies switches operate correctly under power. Both are required for sign-off.',
  },
  {
    id: 5,
    question: 'Conductor colour identification for low voltage AC per BS 7671 Table 51:',
    options: [
      'Loss of supply to lighting, heating, refrigeration, medical equipment, computers and security systems. Brief the occupier in advance, plan timing around their needs, provide temporary lighting if needed, and minimise duration.',
      'Brown for line (single-phase) or brown / black / grey for L1 / L2 / L3 (three-phase). Blue for neutral. Green-and-yellow exclusively for protective conductors. The pre-2004 colour code (red, yellow, blue) is now legacy — modern installations use the harmonised European colours.',
      'Add specific details about what was learned, how it felt to overcome challenging concepts, analyse why RCD selection was previously a weakness, and create a concrete action plan with measurable steps',
      'Comparing maintenance KPIs (PM compliance, planned ratio, MTBF, MTTR, maintenance cost as % of RAV, availability) against industry standards, similar organisations, and the organisation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s own historical trends to identify improvement opportunities',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Table 51 (harmonised colours, in force from 2004): brown = single-phase line; brown/black/grey = L1/L2/L3 three-phase; blue = neutral; green-and-yellow = protective conductors EXCLUSIVELY. GN3 reinforces: "the bi-colour combination green-and-yellow is only to be used for protective conductors." On older installations you may still find red (line) and black (neutral) — flag the mixed colours on the EICR and ensure any altered or extended sections use harmonised colours throughout.',
  },
  {
    id: 6,
    question: 'GN3 notes that polarity testing of lighting circuits with multiple lampholders requires:',
    options: [
      'All exposed and extraneous-conductive-parts that could be touched by livestock connected to a supplementary equipotential bonding network — to prevent dangerous voltage differences across livestock body length (livestock is more sensitive than humans).',
      'L3 carries personal s.7 duty + EAWR Reg 16 competence duty + CDM Reg 15 worker duty + MHSWR Reg 14 employee duty. Multiple parallel personal duties; same conclusion — refuse unsafe instruction, escalate. Plus emerging contributory role to the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s Reg 9 contractor duties.',
      'Removing all lamps from the circuit before testing — other lamps in the circuit can provide a conductive path between L and N (via their filaments / drivers) which would let an incorrectly connected lampholder show false continuity / pass polarity check. Test with lamps out, verify each holder, then refit.',
      'Gateway 1 — at planning, considers fire safety and access. Gateway 2 — before construction, the BSR reviews the design and construction control plan; no construction can start without approval. Gateway 3 — before occupation, the BSR signs off the as-built building against the approved design and the golden thread; no occupation without approval.',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 explicit: "Other lamps on the same circuit may provide a conductive path between line and neutral which would permit an incorrectly connected lampholder to indicate continuity; therefore remove them before polarity testing." Filament lamps have a low cold resistance, and LED drivers contain capacitors that conduct momentarily — both can mask a polarity error. Remove all lamps, test each lampholder, refit. The 5 minutes saved by testing with lamps in can hide a fault that bites a future user.',
  },
  {
    id: 7,
    question: 'On a circuit feeding a bayonet (B22) lampholder, why is polarity still important even though there is no exposed centre contact?',
    options: [
      'Table 41.3 max Zs values in A4:2026 are now published with the Cmin factor (0.95) already applied — you don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t multiply by 0.95 yourself. Use the table value directly, then apply the 0.8 measured-vs-calculated correction (e.g. B32 max Zs = 1.37 Ω → 1.10 Ω corrected).',
      'Investigate the common failure mode using RCA techniques, check whether the contactor rating is adequate for the application, review the operating environment and duty cycle, and propose a design improvement or alternative component to prevent recurrence across the plant',
      'Empathy involves understanding and sharing another person\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s feelings from their perspective, while sympathy involves feeling pity or sorrow for someone\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s situation from your own perspective — empathy says "I feel with you," sympathy says "I feel for you"',
      'Because the single-pole switch on the circuit must still interrupt the LINE conductor — reverse polarity means the switch interrupts neutral, leaving the lampholder live when "off". Bayonet holders do not have the screw-thread access hazard of E14/E27, but the switch behaviour is still a safety issue. Polarity verified at every accessory regardless of holder type.',
    ],
    correctAnswer: 3,
    explanation:
      'Polarity matters for ANY accessory served by a single-pole switch. The bayonet holder might not have an obvious exposed-contact hazard like the screw thread, but the switch behaviour is the issue. Switch off, expect dead = touch live. Reg 132.14 + 643.6 are about ensuring "off" really means "dead". Verify at every lampholder, every switch, every appliance termination — not just the screw-type ones.',
  },
  {
    id: 8,
    question: 'After completing dead polarity testing, before energising for live polarity verification you should:',
    options: [
      'Re-make every disconnected termination, double-check via visual inspection that each conductor goes back to its correct terminal (brown to line, blue to neutral, green/yellow to CPC), refit all lamps and accessories, complete any remaining dead tests (e.g. earth electrode), then energise per the live test sequence in Section 4 — starting with Ze, PFC, then Zs and RCD/AFDD operation.',
      'Because recycling preserves the material value (the metal, the polymer, the glass) for re-use in new manufacturing, whereas energy recovery destroys the material and recovers only the chemical energy. Under the waste hierarchy, keeping materials in productive use is preferred over extracting one-time energy from them. Energy from waste sits above landfill because at least some value (electricity / heat) is recovered, but it sits below recycling because the material is lost.',
      'Explain the BS 7671 special-location zones (Section 701) for rooms containing a bath or shower — socket outlets are prohibited within zones, with very limited exceptions (BS EN 61558-2-5 shaver sockets) — and offer the compliant alternatives. Customer education is part of the job.',
      'No fixed maximum — assessed by load × frequency × posture × environment × individual capability. HSE filter values give "guideline weights" that depend on lift zone (close to body, near floor, above shoulder etc); typical guideline ~25kg lift from waist by an adult male in close hold.',
    ],
    correctAnswer: 0,
    explanation:
      'The transition from dead to live testing is itself a verification step. Re-make every disconnected conductor in its correct terminal — double check by visual colour ID. Refit lamps, switches, accessory front plates. Complete any remaining dead tests. Only then energise for the live sequence. Live polarity verification at the origin (Reg 643.7.1) confirms incoming supply polarity. Live verification at outlets confirms the dead-test polarity work was correctly re-made after the test.',
  },
];

const faqs = [
  {
    question: 'Can I rely on visual inspection of conductor colours alone?',
    answer:
      'Visual inspection is necessary but not sufficient. Conductors get sleeved, cores get re-identified at junctions, and on older installations you may have mixed colour codes. Visual confirmation of conductor identification PLUS instrument-based continuity verification (the L-CPC link method) catches both labelling errors and physical wiring swaps. Reg 643.6 + GN3 require the instrument test as well as visual.',
  },
  {
    question: 'How do I verify polarity on a three-phase circuit?',
    answer:
      'Same dead-test principle: identify each phase at the CU, link each in turn to CPC, verify continuity at each accessory. Plus a phase rotation check during live verification — connect a phase rotation meter at the supply origin and confirm L1, L2, L3 sequence as expected. For three-phase motor circuits, phase sequence matters for motor direction; for general distribution it matters less but is still verified per Reg 643.10.',
  },
  {
    question: 'What about polarity at a fused connection unit feeding a fixed appliance?',
    answer:
      'Verify the FCU itself: the fuse and switch must be in the line conductor (Reg 132.14). The downstream connection to the appliance follows the same rule — line into the line terminal of the appliance, neutral into neutral. Fixed appliances often have an internal indication (a label by the terminal block); verify against that. Some appliances are polarity-sensitive electronically (older washing machines with electronic controls); reverse polarity can damage them on first energisation.',
  },
  {
    question: 'How do I test polarity at a ceiling rose with multiple cables in?',
    answer:
      'Loop-in ceiling roses can have three or four cables present (incoming feed, outgoing feed to the next rose, switch drop, and possibly a flex to the lampholder). Verify polarity at the lampholder terminal (the switched line should connect to the centre contact of an E27/E14 holder). Visual confirmation of the loop-in terminal block — the unswitched line, neutral, switched line, and CPC all in their correct designated terminals. Test continuity between the switched line at the holder and the line at the CU (with the switch closed for the test) to confirm the switch routes correctly.',
  },
  {
    question: 'What if I find reverse polarity at one accessory on an otherwise-correct circuit?',
    answer:
      "Investigate at that accessory — open the back-box and check the wiring. Most reverse polarity findings are at a single termination where someone swapped L and N at install. Correct the wiring (move conductors to their correct terminals), verify visually, retest. Document on the EICR / EIC: location of the original error, corrective action, retest result. Don't sign off until the retest passes at every accessory.",
  },
  {
    question: 'Does polarity testing apply to FELV / SELV circuits?',
    answer:
      'Polarity in the BS 7671 sense (single-pole devices in the line) applies to LV circuits where a "line" exists. SELV is by definition not earth-referenced for safety reasons, so the live conductors are identified rather than designated as "line". Some SELV applications (DC supplies) do have a defined polarity (positive / negative) for equipment compatibility — verify against the equipment manufacturer\'s instructions rather than BS 7671 polarity rules. FELV is treated as LV for safety purposes — verify polarity per the LV rules.',
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 5"
            title="Polarity verification — switching in the line"
            description="Polarity testing per Reg 643.6. Confirming single-pole devices interrupt the line conductor (Reg 132.14), screw lampholder centre contacts to line, conductor identification at every accessory. Method, lamp removal requirement, and what reverse polarity means for safety."
            tone="emerald"
          />

          <TLDR
            points={[
              'Reg 643.6 verification confirms compliance with Reg 132.14 (single-pole devices in the line conductor) and Reg 132.13 (correct conductor identification per Table 51).',
              'Standard dead-test method: link L to CPC at the CU, measure continuity at every accessory between local L and CPC. Low reading = correct polarity at that point.',
              'Test at EVERY accessory, not just sample. Conductors can be crossed at intermediate JBs and back-boxes that the CU termination would not reveal.',
              'Remove lamps before polarity testing — filaments and LED drivers can mask a polarity error by providing parallel L-N paths.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why polarity must be verified — what happens with reverse polarity at a single-pole switch (AC 5.6).',
              'Describe the dead-test polarity method — L-CPC link at CU, continuity test at every accessory, combined visual conductor identification (AC 5.7).',
              'Cite Reg 132.14 (single-pole device in line) and Reg 643.6 (polarity verification) as the design and verification pair.',
              'Recognise the requirement to remove lamps from lighting circuits before polarity testing (GN3).',
              'Identify correct conductor colours per BS 7671 Table 51 — brown line, blue neutral, green/yellow CPC.',
              'Verify polarity at fused connection units, lampholders (E14/E27 centre contact = line), switches and appliance terminals.',
              'Plan the transition from dead polarity test to live polarity test (Section 4) including re-termination and visual verification before energisation.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Why polarity matters — what reverse polarity does</ContentEyebrow>

          <ConceptBlock
            title="Single-pole devices must interrupt the line conductor only"
            plainEnglish="A single-pole switch or fuse only opens one conductor. The convention — codified in Reg 132.14 — is that the conductor it opens must be the line. Switch off = line disconnected = downstream load is dead. Reverse polarity means the switch opens the neutral instead. Switch off = neutral disconnected = downstream load is energised but not flowing. The user expects 'off' to mean 'dead' and finds it isn't."
            onSite="Picture a wall switch wired in the neutral. The bedroom light is off. The user changes the bulb. Their fingers touch the screw thread of the lampholder as they unscrew the dead bulb. 230 V to earth via their hand. The 'off' switch did exactly nothing to make the lampholder dead because it was the wrong conductor."
          >
            <p>The two regulatory rules that polarity verification supports:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 132.14 — Single-pole switching and protection.</strong> Single-pole
                control and protective devices shall be connected in the line conductor only.
                This is the design rule.
              </li>
              <li>
                <strong>Reg 132.13 — Identification of conductors.</strong> Conductors shall be
                identified per Table 51 (brown line, blue neutral, green/yellow CPC). This is the
                installation rule.
              </li>
              <li>
                <strong>Reg 643.6 — Verification of polarity.</strong> A test for polarity shall
                be made to verify that single-pole devices are connected in the line conductor
                only and that the centre contact of E14/E27 lampholders is connected to the
                line conductor. This is the verification rule.
              </li>
            </ul>
            <p>
              Reg 132.14 and 132.13 are what the designer / installer must do. Reg 643.6 is
              your test that confirms they did it correctly. The dead-test polarity check is
              the principal verification method during initial verification.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulations 132.14.1 (Single-pole devices in line conductor) and 132.14.2 (linked switches in an earthed neutral); Regulation 643.6 (polarity verification)"
            clause="Reg 132.14.1: A single-pole fuse, switch or circuit-breaker shall be inserted in the line conductor only. Reg 132.14.2: No switch or circuit-breaker, except where linked, or fuse, shall be inserted in an earthed neutral conductor. Any linked switch or linked circuit-breaker inserted in an earthed neutral conductor shall be arranged to break all the related line conductors."
            meaning={
              <>
                Reg 132.14.1 mandates single-pole devices in the line. Reg 132.14.2 prohibits
                single-pole interruption of an earthed neutral and requires linked switches in
                the neutral to break all related line conductors. Polarity verification (Reg
                643.6) is the dead test that confirms compliance with both — it is not optional
                or 'best practice', it is a regulatory requirement for every initial verification
                and every periodic inspection.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulations 132.14.1, 132.14.2 and 643.6."
          />

          <SectionRule />

          <ContentEyebrow>The dead-test polarity method</ContentEyebrow>

          <ConceptBlock
            title="Link L to CPC at the CU, verify continuity at every accessory"
            plainEnglish="The standard dead-test polarity method exploits the same temporary L-CPC link used for R1+R2 testing. With L joined to CPC at the CU end, a continuity test between the local 'line' terminal and the local 'CPC' terminal at any accessory should give a low reading — proving that the conductor labelled 'line' at the accessory really is connected to the line of the circuit at the CU."
            onSite="Combine with visual identification at every termination — brown to line, blue to neutral, green/yellow to CPC. The instrument test catches physical swaps; the visual catches labelling errors."
          >
            <p>Step-by-step dead polarity test:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Verify safe isolation per the prove-test-prove ritual.</li>
              <li>
                At the CU, disconnect the line of the circuit under test from the protective
                device. Disconnect the CPC from the earth bar.
              </li>
              <li>
                Bridge L and CPC together at the CU end with a low-resistance jumper (the same
                link used for R1+R2 measurement).
              </li>
              <li>
                Null the MFT continuity leads (touch probes together, press null).
              </li>
              <li>
                Walk the circuit. At each accessory in turn:
                <ul className="space-y-1 list-disc pl-5 marker:text-white/40 mt-1">
                  <li>Visually identify each conductor by colour at the terminal block.</li>
                  <li>
                    Connect MFT probes to the conductor labelled 'line' and the local CPC.
                  </li>
                  <li>
                    Press TEST. Reading should be low (typically below 1 Ω, similar to your
                    R1+R2 reading) — confirms the local 'line' is the same conductor as the CU
                    line.
                  </li>
                </ul>
              </li>
              <li>
                <strong>For switches:</strong> with the switch closed, test continuity between
                the line terminal of the supply side and the switched line terminal — should be
                low. With switch open, should be OL.
              </li>
              <li>
                <strong>For screw lampholders:</strong> verify the centre contact connects to
                line (continuity to the L-CPC link) and the screw thread connects to neutral.
              </li>
              <li>
                Document polarity confirmation per circuit on the Schedule of Test Results (a
                tick or pass mark in the polarity column).
              </li>
            </ol>
            <p>
              <strong>Failures and their causes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>OL between local L and local CPC:</strong> the conductor you call 'line'
                at the accessory is actually neutral — they have been swapped at the back-box.
                Investigate, correct the wiring, retest.
              </li>
              <li>
                <strong>Switch reads continuity in BOTH positions:</strong> the switch is
                bridged, faulty, or wired wrong. Investigate.
              </li>
              <li>
                <strong>Lampholder centre contact reads OL to L-CPC link:</strong> centre
                contact wired to neutral instead of line. Hazardous — the user touches a live
                screw thread when changing a bulb.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET GN3 9th Ed:2022 — Section concerning polarity verification (extracts)"
            clause="A test for polarity is necessary to ensure that all fuses and single-pole control and protective devices are connected in the line conductor. Polarity can be verified either by instrument measurement (low-resistance ohmmeter) or by visual checking of core colours at terminations. Whatever method is used, polarity checks are required at all points on a circuit to ensure that conductors have not been crossed at intermediate connection points such as junction boxes. Other lamps on the same circuit may provide a conductive path between line and neutral which would permit an incorrectly connected lampholder to indicate continuity; therefore remove them before polarity testing. The centre contact of screw-type lampholders shall be connected to the line conductor."
            meaning={
              <>
                GN3 codifies the practical method and the gotchas. Verify at every accessory
                (not just sample). Remove lamps before testing (filament / driver paths can
                mask a polarity error). Centre contact of screw lampholders to line — this is
                the safety-critical case for E14/E27 holders. Visual + instrument together.
              </>
            }
            cite="Source: IET Guidance Note 3, 9th Edition (2022, A4 corrected), polarity verification section."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Conductor identification — Table 51 colours</ContentEyebrow>

          <ConceptBlock
            title="Brown line, blue neutral, green/yellow CPC — and nothing else for protective"
            plainEnglish="BS 7671 Table 51 sets the harmonised European conductor colours that have been mandatory since 2004. Brown is the only colour for single-phase line; brown / black / grey for three-phase L1 / L2 / L3. Blue for neutral. Green-and-yellow EXCLUSIVELY for protective conductors — that bi-colour combination must never be used for anything else."
            onSite="Pre-2004 installations used red (line) and black (neutral). On a refurb you may find both colour codes mixed in the same building. Flag clearly on the certificate, ensure new work uses harmonised colours, and add over-sleeves at junction points where conductors of different colour codes connect to each other."
          >
            <p>BS 7671 Table 51 colour identification (single-phase / three-phase AC):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Brown</strong> — single-phase line, or L1 of a three-phase circuit
              </li>
              <li>
                <strong>Black</strong> — L2 of a three-phase circuit
              </li>
              <li>
                <strong>Grey</strong> — L3 of a three-phase circuit
              </li>
              <li>
                <strong>Blue</strong> — neutral
              </li>
              <li>
                <strong>Green-and-yellow</strong> — protective conductor (CPC, bonding,
                equipotential bonding) — exclusive use, never anything else
              </li>
            </ul>
            <p>
              Pre-2004 (legacy) colours you will still see on older installations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Red</strong> — line (single-phase) — now sleeve over with brown when
                identifying or when extending into a modern installation.
              </li>
              <li>
                <strong>Yellow / blue / red</strong> — three-phase legacy. Sleeve over with
                brown / black / grey at terminations into modern equipment.
              </li>
              <li>
                <strong>Black</strong> — was neutral pre-2004; now reused as L2 in three-phase.
                A common confusion point on mixed installations.
              </li>
            </ul>
            <p>
              <strong>Visual polarity confirmation</strong> at every termination is part of the
              polarity test. The instrument test confirms the conductor identity electrically;
              the visual confirms the labelling matches. Mismatch = label error or terminal
              swap; investigate and correct.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Lampholders and switches — the access points where polarity matters most</ContentEyebrow>

          <ConceptBlock
            title="Centre contact of E14/E27 to line; switches break the line"
            plainEnglish="The two highest-stakes polarity verification points are screw-type lampholders (where a user touches the screw thread when changing a bulb) and switches (where a user expects 'off' to mean 'dead'). Get these wrong and the user pays."
            onSite="Old chandelier style ceiling pendants frequently have polarity errors at the lampholder — the wires get crossed during installation and the next person to change a bulb finds out. Always verify at the lampholder, every lampholder, every time."
          >
            <p>Screw-type (E14, E27) lampholder polarity rule:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Centre contact = line.</strong> The deeper, harder-to-touch contact at
                the bottom of the lampholder cup. Carries line voltage to the bulb.
              </li>
              <li>
                <strong>Screw thread = neutral.</strong> The exposed thread the user touches
                when unscrewing a bulb. At ~0 V to earth under normal conditions.
              </li>
              <li>
                <strong>Why this way:</strong> the user can touch the screw thread during normal
                bulb-change operations. Neutral on the thread = safe. Line on the thread =
                potentially fatal shock.
              </li>
            </ul>
            <p>Bayonet (B22) lampholders:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Less critical — no exposed contact during normal use. But polarity still matters
                because the switch on the circuit must interrupt the line.
              </li>
              <li>
                Verify by tracing the switched line conductor from the switch through to the
                lampholder terminal it connects to.
              </li>
            </ul>
            <p>Switch polarity verification:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Identify which terminal of the switch is the supply side (incoming line) and
                which is the load side (switched line going to the lampholder / appliance).
              </li>
              <li>
                With the L-CPC link in place at the CU, test continuity from the supply side of
                the switch to the local CPC. Should be low — supply side is the live line.
              </li>
              <li>
                Close the switch. Test continuity from the load side of the switch to the local
                CPC. Should also be low — switch closed = continuity through to the load.
              </li>
              <li>
                Open the switch. Re-test load side to CPC. Should be OL — switch open = no
                continuity to the load. Confirms the switch IS in the line.
              </li>
              <li>
                If the test reads low with the switch open, the switch is bridging or faulty.
                Investigate.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Three-phase polarity — phase rotation as well as identity"
            plainEnglish="On a three-phase circuit polarity verification has two parts. First the per-conductor identity check (line conductors L1 / L2 / L3 vs neutral and CPC) — same logic as single-phase, just three line conductors instead of one. Second the phase rotation check — the order in which the three phases reach the load. Reverse rotation runs three-phase motors backwards, sometimes destructively, and confuses VSDs and three-phase metering."
            onSite="Use a phase rotation indicator at every three-phase outlet, every supply origin and at every motor terminal box. The instrument shows L1-L2-L3 sequence (correct, sometimes labelled 'positive' or 'right') or L1-L3-L2 (reversed). Reversed rotation needs swapping any two line conductors at the load (or upstream at the rotation indicator point). Record the rotation result on the EIC alongside the polarity columns. On commissioning a motor, jog-test under no-load to verify rotation matches the load's required direction before allowing the load to be coupled."
          >
            <p>
              Three-phase polarity test points and what to check:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply origin / DB busbars</strong> — visual brown / black / grey
                colour identification, plus rotation indicator confirming L1-L2-L3.
              </li>
              <li>
                <strong>Sub-main / sub-DB</strong> — repeat at the sub-DB. Phases should
                carry through; if the sub-main was lifted and reterminated, rotation can
                flip.
              </li>
              <li>
                <strong>Three-phase outlets and isolators</strong> — rotation indicator
                socket; any 16 A / 32 A / 63 A three-phase commando and CEEform outlets.
              </li>
              <li>
                <strong>Motor terminal box</strong> — pre-coupling, jog the motor and
                verify direction. Many motors are reversible by swapping two phases at
                the local isolator; some (single-direction pumps, conveyors with one-way
                bearings) need rotation right first time.
              </li>
              <li>
                <strong>VSDs and inverter loads</strong> — most modern VSDs are
                rotation-tolerant on the AC input but tag the input rotation on the
                terminal cover so anyone re-terminating preserves it.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Switched-neutral installs — historical hazard, occasional finding"
            plainEnglish="Some pre-1966 UK installations used switched-neutral wiring — the switch broke the neutral conductor instead of the line. Touching the switched live (still energised) at the lampholder gave a shock even with the switch off. Modern wiring has prohibited this for decades, but periodic inspection of older properties still occasionally uncovers a switched-neutral pendant that nobody has touched since the original install. Spotting one is a polarity-test win."
            onSite="The L-CPC link polarity test catches switched-neutral. With the switch closed and the L-CPC link in at the CU, the load side of the switch reads continuity to CPC (through the load and the linked L) — that part looks normal. With the switch open, the load side STILL reads continuity to CPC because the load is now connected to the line via the unbroken line conductor — only the neutral is broken. Investigate every 'switch open but load side reads low' result; switched-neutral is the second most likely cause after a faulty switch."
          >
            <p>
              Recognising and rectifying switched-neutral findings:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Polarity test signature</strong> — load-side continuity to CPC
                with the switch open. The single-pole switch is in the wrong conductor.
              </li>
              <li>
                <strong>Visual signature</strong> — black conductor (legacy neutral)
                running into the switch and back, with the red (legacy line) running
                straight through to the lampholder.
              </li>
              <li>
                <strong>Code on the EICR</strong> — typically C2 (potentially dangerous);
                the lamp at the affected fitting is energised at switch-off.
              </li>
              <li>
                <strong>Remediation</strong> — re-wire the switch into the line, or
                replace the affected light circuit. Document on the rectification
                certificate (MEIWC).
              </li>
              <li>
                <strong>Customer brief</strong> — explain the historic safety risk in
                plain terms; customer often appreciates the inspection picked it up.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Live polarity verification at the supply origin"
            plainEnglish="The dead test confirms the install's internal polarity is consistent with the CU termination. It cannot tell you whether the CU termination itself is correct relative to the incoming supply (because there's no live reference). That confirmation comes from the live polarity test at energisation, covered in Section 4."
            onSite="Distribution Network Operator polarity errors at the supply intake are rare but they happen — typically after a fault repair where the supplier's team reinstated the cable with L and N swapped. Live polarity verification at the origin catches this."
          >
            <p>The two-stage polarity verification across initial verification:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dead test (this Sub, Reg 643.6).</strong> Verify the install's internal
                polarity is consistent at every accessory using the L-CPC link method. Catches
                wiring errors within the installation.
              </li>
              <li>
                <strong>Live test (Section 4 Sub 1, Reg 643.7.1).</strong> At energisation, use
                a voltage indicator or live polarity tester at the supply origin and at
                representative outlets. Confirms incoming supply polarity matches the install,
                and that switches operate correctly under load.
              </li>
            </ol>
            <p>
              Documentation: tick or pass mark in the polarity column on the STR per circuit.
              For a periodic inspection (EICR), polarity is one of the inspection items —
              recorded as observed pass / fail with any defects noted in the schedule of items
              inspected.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Skipping polarity verification at intermediate accessories"
            whatHappens={
              <>
                You test polarity at the CU outgoing terminals and the first socket. Both pass.
                You sign off the circuit. Three months later the customer rings: the metal lamp
                in the back bedroom has tingled the kid changing the bulb. Investigation: at
                the back-box of the bedroom switch, L and N were swapped during the install.
                The CU and first socket polarity were correct, but the swap at the bedroom
                switch put line on the screw thread of the lampholder when the switch was
                'off'. A polarity test at every accessory would have caught it.
              </>
            }
            doInstead={
              <>
                Test polarity at every accessory on every circuit. The L-CPC link method makes
                the test fast — typically 10-15 seconds per accessory once the link is set up at
                the CU. The cost of testing every accessory is small; the cost of missing a
                swap can be electrocution. Document on the STR — a tick per circuit if all
                accessories pass, or a note of any failures and the corrective action taken.
              </>
            }
          />

          <Scenario
            title="Polarity testing a small flat refurbishment lighting circuit"
            situation={
              <>
                Two-bedroom flat in Liverpool. Refurbishment includes new lighting circuit:
                living room (1-gang switch, 4 GU10 LED downlights), hallway (2-way switching
                between front door and bedroom doors, single E27 pendant), main bedroom
                (1-gang switch, 1 E27 pendant), spare bedroom (1-gang switch, 1 BC22 pendant).
                Wired in 1.5/1.0 mm² flat T&E. The continuity and IR tests have passed; now to
                polarity using the L-CPC link method on a Megger MFT1741+.
              </>
            }
            whatToDo={
              <>
                Safe isolation, lock off the lighting MCB. Lift L and CPC of the lighting
                circuit at the CU. Bridge them with a 4 mm² ferruled jumper. Null the MFT leads.
                Remove all bulbs from the circuit (filament / LED driver paths would mask
                polarity errors). Walk the circuit. At each switch: confirm visual identification
                (brown supply, brown switched, green/yellow CPC, blue neutral routed through if
                loop-in). Test continuity from the supply terminal to local CPC — low (~0.4 Ω,
                consistent with R1+R2 for the cable run). Close the switch — test continuity
                from the switched terminal to local CPC, also low. Open the switch — switched
                terminal to CPC reads OL. Confirms switch in line. At each E27 pendant: verify
                the centre contact lead (brown core) connects to line — low continuity from
                centre contact to local CPC. Verify the screw thread lead (blue core) connects
                to neutral — OL from thread to local CPC (because neutral is not in the L-CPC
                link). At the BC22 pendant: similar trace, switch operation as before. At the
                hallway 2-way switching: verify both ends of the strappers are isolated when
                appropriate, and that the line through to the lampholder routes correctly via
                whichever switch is operated. All accessories pass. Document polarity tick per
                circuit on the STR. Remove L-CPC jumper, re-land L into the MCB, CPC into the
                earth bar, refit all bulbs, prepare for live polarity verification during the
                live test sequence.
              </>
            }
            whyItMatters={
              <>
                Lighting circuits are where polarity errors most often hurt the user — bulb
                changes are routine, screw lampholders give exposed access to the centre /
                thread contacts. The dead test at every accessory catches wiring errors before
                the customer or another tradesperson finds them the hard way. Combined with
                visual conductor identification, the polarity verification provides the
                evidence chain that supports the EIC sign-off — and gives the next inspector
                ten years from now the confidence to test the same circuit and see consistent
                results.
              </>
            }
          />

          <ConceptBlock
            title="Polarity at the supply origin — TN-S, TN-C-S (PNB) and TT differences"
            plainEnglish="The polarity test at the supply origin behaves slightly differently for each earthing arrangement. On TN-S the line and the separate earth come from the DNO; the neutral is derived at the supply terminal. On TN-C-S (the new A4:2026 term for protective neutral bonding, PNB) the combined PEN comes from the DNO and is split locally into N and PE — neutral and earth are bonded at the cut-out. On TT the line and neutral come from the DNO; the earth is the customer's own electrode. Each arrangement changes what the polarity verification actually proves."
            onSite="At the cut-out, identify which conductor is which from the DNO label or single-line diagram, then verify with a voltage indicator (live tests during energisation) — line-to-neutral 230 V, line-to-earth 230 V, neutral-to-earth near 0 V on TN-C-S / TN-S. On TT you may see a small standing voltage between neutral and earth (the difference between the customer's electrode potential and the DNO neutral). Anything significantly above zero on TN systems suggests a swapped supply or a high-resistance neutral."
          >
            <p>
              Per-system polarity verification at energisation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-S</strong> — separate neutral and earth from the DNO. Live
                polarity at the cut-out: brown line, blue neutral, green-and-yellow
                earth (DNO sheath). Cross-check at the consumer unit MET.
              </li>
              <li>
                <strong>TN-C-S (PNB)</strong> — combined PEN from the DNO, split at the
                cut-out into N and PE. Polarity check verifies the N tail and the PE
                are correctly bonded at the cut-out and not swapped at the consumer
                unit terminals.
              </li>
              <li>
                <strong>TT</strong> — DNO supplies L and N only; customer's own earth
                electrode supplies the PE. Polarity check confirms the earth electrode
                conductor is connected to the MET, the electrode is in good condition,
                and Ze (Ra in TT terms) is within design.
              </li>
              <li>
                <strong>Live polarity tester</strong> — purpose-built tools like the
                Martindale VIPDLOK and the Megger LRCD are safer than a multimeter for
                sustained live work at the cut-out. GS38-compliant test leads with
                fused tips throughout.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.5.1 (TT earth electrode arrangement)"
            clause={
              <>
                Every exposed-conductive-part which is to be protected by a single protective
                device shall be connected, via the main earthing terminal, to a common earth
                electrode. However, if two or more protective devices are in series, the
                exposed-conductive-parts may be connected to separate earth electrodes
                corresponding to each protective device.
              </>
            }
            meaning={
              <>
                Earth electrode resistance is the input variable that decides whether the TT
                installation can satisfy 411.5.3 (Ra × IΔn ≤ 50 V). The electrode test
                measures Ra; the RCD rating provides IΔn. Both are needed for the
                fault-protection calculation. A high electrode resistance can be tolerated only
                if the RCD trip current is low enough to keep the product under 50 V.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 411.5.1 — full text from published amendment."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 132.14 (single-pole devices in line), Reg 132.13 (conductor identification per Table 51) and Reg 643.6 (polarity verification) interlock — design rule, installation rule, verification rule.',
              'Standard dead-test method: link L to CPC at the CU, measure continuity between local L and local CPC at every accessory. Low reading = polarity correct.',
              'Test at EVERY accessory, not just sample. Conductors can be crossed at intermediate JBs and back-boxes that the CU termination would not reveal.',
              'Remove all lamps from lighting circuits before polarity testing — filaments and LED drivers can mask polarity errors via parallel L-N paths.',
              'BS 7671 Table 51 colours: brown line, brown/black/grey for three-phase L1/L2/L3, blue neutral, green/yellow EXCLUSIVELY for protective conductors.',
              'Centre contact of E14/E27 screw lampholders MUST connect to line. The exposed screw thread connects to neutral so it is safe to touch when changing a bulb.',
              'Switch polarity: continuity from supply terminal to CPC (via L-CPC link) low; switched terminal to CPC low when closed, OL when open. Confirms switch is in line.',
              'Dead polarity test (Reg 643.6) is followed by live polarity test at energisation (Reg 643.7.1) to confirm incoming supply polarity matches the verified install.',
            ]}
          />

          <Quiz title="Polarity verification — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.4 Insulation resistance
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.6 Earth electrode resistance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
