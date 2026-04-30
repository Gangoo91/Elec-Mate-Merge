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
    id: 'mod1-s3-61557-equivalence',
    question:
      'A colleague hands you a "general-purpose multimeter on the lowest ohm range" to take a Reg 643.2 continuity reading because the dedicated low-Ω ohmmeter is in the van. Defensible under Reg 643.1?',
    options: [
      'Yes — any instrument that resolves below 0.1 Ω is acceptable.',
      'No. Reg 643.1 requires instruments selected per BS EN 61557 or demonstrably equivalent. BS EN 61557-4 sets the test current (≥ 200 mA) and resolution required for continuity. A multimeter does not meet 643.1 — and "I used a multimeter on the lowest ohm range" is not equivalence in court.',
      'Yes — provided the multimeter has a CE mark.',
      'Yes — provided you note the instrument used in the comments column.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 61557-4 specifies low-resistance ohmmeters with a minimum test current of 200 mA. That current is what reveals high-resistance joints — a multimeter pushes microamps and will read low on a partial connection that fails under load. Reg 643.1 selection is on the user; the escape clause is "no lesser degree of performance and safety", not "no instrument to hand".',
  },
  {
    id: 'mod1-s3-cat-arrangement',
    question:
      'You have a CAT IV 600 V multifunction tester. You grab a pair of CAT III 1000 V leads from the case for an origin Ze test on a single-phase domestic supply. What is the equivalent overvoltage category of the test arrangement?',
    options: [
      'CAT IV — the meter is the dominant rating.',
      'CAT III — GN3 Ch 1 Reg 1.1 says the equivalent overvoltage category equals the lowest of any item in the arrangement (instrument, lead, probe or connector). The CAT III leads downgrade the whole arrangement.',
      'CAT IV / 1000 V — combine the two ratings.',
      'CAT II — voltage rating is what counts.',
    ],
    correctIndex: 1,
    explanation:
      'GN3 Ch 1 Reg 1.1 is unambiguous: weakest link sets the rating. Origin tests need CAT IV throughout. The 1000 V on the leads is the working voltage, not the transient withstand — that is set by the CAT category. CAT III leads on a CAT IV mains origin are the failure mode the categorisation system was built to prevent.',
  },
  {
    id: 'mod1-s3-thermocouple-emf',
    question:
      'You take a continuity reading at a brass-to-copper joint on a heated busbar. The reading is 0.18 Ω with red probe on the brass. You reverse the probes and read 0.10 Ω. Which value do you record, and why?',
    options: [
      '0.18 Ω — the higher value is more conservative.',
      '0.10 Ω — the lower value is the true resistance.',
      '0.14 Ω — the average. GN3 Reg 4.8 names this as the countermeasure for thermocouple EMF in mixed-metal joints at differing temperatures: a small EMF appears in series with the test current, biases one direction up and the other down — averaging cancels it.',
      'Re-test with a different instrument.',
    ],
    correctIndex: 2,
    explanation:
      "Dissimilar metals at differing temperatures generate a Seebeck (thermocouple) EMF. In one probe orientation it adds to the meter's test signal; reversed, it subtracts. The arithmetic mean is the corrected reading — and is the countermeasure GN3 Ch 4 Reg 4.8 specifically calls out for low-resistance work on mixed-metal joints.",
  },
  {
    id: 'mod1-s3-drop-recheck',
    question:
      'Your loop tester drops from waist height onto concrete on a Tuesday morning. It powers up; gives a sensible reading on a known reference circuit. UKAS calibration is not due for another six months. What does GN3 Reg 4.8 require?',
    options: [
      'Continue using it — the known-circuit check confirms it is in spec.',
      'Quarantine the instrument, label it "do not use", and send it for recheck before the next test session. GN3 Reg 4.8 expressly requires the accuracy of any damaged or repaired instrument to be re-established before further use — mechanical impact is in the same category as repair.',
      'Run the on-board self-test and accept the result if it passes.',
      'Open the case and inspect the internal PCB.',
    ],
    correctIndex: 1,
    explanation:
      'A meter that reads correctly at one impedance can still be 30 % out across the rest of its range — drop damage typically affects measurement linearity, not the headline reading. "Looks fine on a known circuit" is not a defensible test record after an incident. The asymmetric risk (cost of recheck vs. cost of an unreferenced fatal-incident certificate) is the reason GN3 phrases this as a hard duty.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.1 places a single overarching duty on the choice of test instruments. What is it?',
    options: [
      'Instruments shall be UKAS-calibrated annually',
      'Instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557, or other equipment providing no lesser degree of performance and safety',
      'Instruments shall be CAT IV rated',
      'Instruments shall be of UK manufacture',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.1 ties instrument selection to BS EN 61557 — the multi-part standard covering low-resistance, insulation, loop, RCD and earth-electrode testers. The "no lesser degree of performance and safety" clause is the gate for any instrument that is not directly badged to BS EN 61557, not a free pass.',
  },
  {
    id: 2,
    question:
      'GN3 Ch 1 defines the equivalent overvoltage category of a test arrangement. How is it determined?',
    options: [
      'It equals the rating of the meter alone',
      'It equals the highest overvoltage category of any equipment in the arrangement',
      'It equals the lowest overvoltage category of any equipment, including instruments, leads, probes and connectors',
      'It is set by BS 7671 Reg 443',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 Ch 1 Reg 1.1 (Safety) is explicit: the equivalent overvoltage category of the test arrangement is the lowest of any item connected — instrument, lead, probe or connector. CAT IV leads paired with a CAT III meter give a CAT III arrangement. The weakest link sets the rating.',
  },
  {
    id: 3,
    question:
      'You are testing at the origin of a single-phase domestic supply (incoming meter tails to the consumer unit cut-out). What overvoltage category should the meter and accessories be rated for?',
    options: ['CAT II', 'CAT III', 'CAT IV', 'Any rating provided fused leads are used'],
    correctAnswer: 2,
    explanation:
      'GN3 Ch 1 defines CAT IV as CAT III plus equipment installed at or near the origin of the supply, between the building entrance and the primary distribution board — meters and primary overcurrent devices. Tests at the origin (Ze, PSCC) are CAT IV territory. CAT III is for circuits downstream of the consumer unit.',
  },
  {
    id: 4,
    question:
      'GN3 Reg 4.1 cross-references HSE GS38 for instrument accessories. Which of the following is NOT a GS38 requirement for test probes used in live testing?',
    options: [
      'Finger barriers and a maximum of 4 mm exposed metal at the tip',
      'Insulation up to the tip with shrouded plug ends',
      'High-rupturing-capacity (HBC) fuses in the leads, sized appropriately for the test',
      'A minimum lead length of 1.5 m to keep the operator at distance',
    ],
    correctAnswer: 3,
    explanation:
      'GS38 sets out finger barriers, exposed-tip limits (commonly cited as no more than 4 mm), shrouded connectors and fused / current-limited leads — all to limit the energy released if a probe shorts to earth. There is no minimum-lead-length rule. Excess lead can in fact be a hazard if it lets a probe drop into a board.',
  },
  {
    id: 5,
    question:
      'Why does GN3 require all instruments, leads, probes and accessories to follow GS38, regardless of the instrument built-in protection?',
    options: [
      'GS38 is part of BS 7671',
      'Because the safety boundary at the point of contact (probe tip and lead) is what limits the energy released into the operator if a slip causes a phase-to-earth fault — internal meter protection cannot help if the fault is at the probe',
      'GS38 is mandatory under EAWR Reg 14',
      'It applies only to insulation testing',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 Ch 4 Reg 4.1 makes this explicit. The internal HBC protection inside the meter does nothing for a tip-to-earth slip on the probe end. The GS38 finger barriers, exposed-tip limit and lead fusing exist to attenuate the energy at the failure point itself — that is why "without exception" appears in the GN3 text.',
  },
  {
    id: 6,
    question:
      'GN3 Reg 4.8 deals with calibration. What is the regulation position on calibration intervals?',
    options: [
      'Calibration shall be every 12 months',
      'Calibration shall be every 24 months',
      'Calibration intervals and methods shall be as recommended by the instrument manufacturer',
      'Calibration is not required if the instrument has a self-test function',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 Reg 4.8 says calibration or checking procedures shall follow the manufacturer recommendations — there is no fixed numeric interval mandated by GN3 or BS 7671. Most manufacturers recommend annual full calibration plus regular in-service checks against a known reference. UKAS-accredited labs are the recommended route for the full calibration cycle.',
  },
  {
    id: 7,
    question:
      'You take a low-resistance ohmmeter out of the case in the morning. What is the correct in-service check before the first reading of the day?',
    options: [
      'Touch the probes together and confirm a near-zero reading; null / zero the leads; check battery condition; visually inspect leads, probes and finger barriers for damage',
      'Re-calibrate the instrument against a 1 Ω resistor',
      'Send it back to the manufacturer for verification',
      'Measure the resistance of a known socket-outlet earth and compare to last month',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 Reg 4.8 requires that lead and battery condition is inspected and that lead resistance is nulled or measured-and-subtracted before measurement. The morning short-and-zero check, the battery check and the lead / probe visual are the standard in-service routine — they do not replace UKAS calibration but they catch the failures most likely between calibrations.',
  },
  {
    id: 8,
    question:
      'A modern multifunction tester gives an insulation reading of 999 MΩ on a circuit. The same instrument reads 0.8 MΩ a week later on the same circuit at the same test voltage. What does this most likely indicate, before suspecting the instrument?',
    options: [
      'Calibration drift on the meter',
      'Damp ingress, contamination or insulation deterioration on the circuit between the two tests — environmental and load-state factors must be ruled out before suspecting the instrument',
      'The meter battery is low',
      'The first reading was a software fault',
    ],
    correctAnswer: 1,
    explanation:
      'Insulation resistance is hugely sensitive to humidity, surface contamination at terminations and whether connected loads (electronics, MOVs in surge devices) are still attached. GN3 Ch 4 emphasises ruling out these field effects before challenging the instrument. Calibration drift is a small-percentage effect; a hundred-fold change is the installation, not the meter.',
  },
  {
    id: 9,
    question:
      'GN3 lists field effects that contribute to errors in low-resistance measurement. Which one is removed by reversing the test probes and averaging the two readings?',
    options: [
      'Test lead resistance',
      'Probe contact resistance',
      'AC interference from nearby live circuits',
      'Thermocouple EMF effects in mixed-metal joints',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 Reg 4.8 names this technique. Where dissimilar metals meet at a joint and there is a small temperature difference, a thermocouple EMF appears in series with the test current and biases the reading. Reversing the probes reverses the bias — averaging the two cancels it. Lead resistance is removed by nulling, not reversal.',
  },
  {
    id: 10,
    question:
      'You drop your loop-impedance tester from the back of the van onto concrete. The case has a hairline crack but the meter powers up and gives a sensible reading on a known circuit. What does GN3 require, and what is the procedural fix?',
    options: [
      'If the readings look right, continue using it and book a calibration at the next scheduled review',
      'Treat the impact as a calibration-affecting event. GN3 Reg 4.8 requires the accuracy of any instrument that has been damaged or repaired to be re-established before further use. Quarantine the meter, label it out of service, and return it for a full check or re-calibration before the next test session',
      'Open the case and inspect the internal PCB',
      'Run the self-test and accept the result if it passes',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 Reg 4.8 explicitly addresses new or repaired instruments — the accuracy must be re-established. Mechanical impact falls in the same category as repair: the calibration baseline can no longer be relied on. The defensible procedure is quarantine and re-check, not "looks fine on a known circuit". A meter that reads correctly at one impedance can still be 30 % out at another.',
  },
];

const InspectionTestingModule1Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Test equipment and calibration | I&T Module 1.3 | Elec-Mate',
    description:
      'Reg 643.1 + GN3 Ch 1 & Ch 4: BS EN 61557 instrument selection, GS38 probe and lead requirements, CAT III / CAT IV overvoltage categories for the whole test arrangement, calibration intervals, and the in-service checks that catch what calibration cannot.',
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
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 3"
            title="Test equipment and calibration"
            description="Choosing the right instrument under Reg 643.1, the GS38 rules for probes and leads, what CAT III and CAT IV actually mean for your test arrangement, and the calibration cycle that keeps your readings legally defensible."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.1 ties instrument selection to BS EN 61557 — the multi-part product standard for low-resistance, insulation, loop, RCD and earth-electrode testers. Anything else has to be demonstrably "no lesser degree of performance and safety".',
              'GN3 Ch 4 Reg 4.1 makes HSE GS38 mandatory for all instruments, leads, probes and accessories — without exception. Finger barriers, limited exposed tip, shrouded connectors and fused / current-limited leads are how you survive a slip.',
              'GN3 Ch 1 Reg 1.1 (Safety): the equivalent overvoltage category of the test arrangement equals the lowest overvoltage category of any item in it. CAT IV leads on a CAT III meter buys you nothing.',
              'CAT IV is the origin of supply (cut-out / meter / primary distribution). CAT III is everything inside the consumer unit downstream of the main switch. Test at the origin, work in CAT IV.',
              'GN3 Reg 4.8: calibration intervals follow the manufacturer recommendation, not a fixed BS 7671 number. The defensible practice is annual UKAS calibration plus daily in-service checks (short-and-zero, battery, lead and probe inspection).',
              'In-service errors named by GN3 — lead resistance, probe contact, AC interference, thermocouple EMF — each have a specific countermeasure. Reverse-and-average for thermocouple EMF; null for lead resistance; visual check for probe contact.',
              'Drop the meter, repair the meter, or have any reason to doubt it: GN3 Reg 4.8 requires accuracy to be re-established before further use. "Looks fine" is not a legal defence at a coroner court.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the regulatory chain that ties instrument selection to BS EN 61557 — and identify which part of the standard applies to which test',
              'Apply GS38 to a real test arrangement: probes, leads, fused leads, finger barriers, shrouded connectors, exposed-tip limit',
              'Determine the CAT rating required for a given test point (origin / submain / final circuit) and assess the equivalent CAT of the whole arrangement',
              'Build an in-service check routine that catches what UKAS calibration cannot — daily zero, battery, visual, reverse-and-average',
              'Decide when an instrument is no longer fit for use under GN3 Reg 4.8 (impact, repair, suspect drift) and execute the quarantine-and-recheck procedure',
              'Record the right things on the certificate to make instrument provenance defensible: serial number, last calibration date, accuracy class, GS38 compliance of leads',
              'Recognise where A4:2026 has tightened the schedule columns that record instrument data — and what that means for the test record you generate',
            ]}
          />

          <ContentEyebrow>The regulation that selects your instrument</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.1 — the single duty on instrument selection"
            plainEnglish="Before any test under Reg 643.2 to 643.11 is carried out, the instrument has to be the right one. Reg 643.1 says: chosen in accordance with the relevant parts of BS EN 61557. If the instrument is not BS EN 61557 badged, it has to provide no lesser degree of performance and safety."
            onSite="In practice this means: a multifunction tester from a known UK / EU manufacturer carrying a BS EN 61557 mark for each test function. A general-purpose multimeter is not a BS 7671 test instrument — it does not meet 643.1 for any of the tests in the 643.2 to 643.11 sequence."
          >
            <p>
              Reg 643.1 is the gateway clause for the whole of Chapter 64. Before you do any test
              under Reg 643.2 (continuity), Reg 643.3 (insulation resistance), Reg 643.7
              (earth-fault loop impedance), Reg 643.8 (RCD) or any of the others, the instrument has
              to be chosen in accordance with BS&nbsp;EN&nbsp;61557. The standard runs to multiple
              parts and each part covers a specific test function:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                BS EN 61557-1 — general requirements that apply to every instrument in the series
              </li>
              <li>BS EN 61557-2 — insulation-resistance measuring equipment</li>
              <li>BS EN 61557-3 — earth-fault loop impedance measuring equipment</li>
              <li>BS EN 61557-4 — low-resistance / continuity measuring equipment</li>
              <li>BS EN 61557-5 — earth-electrode resistance measuring equipment</li>
              <li>BS EN 61557-6 — residual current devices (testers)</li>
              <li>BS EN 61557-7 — phase-rotation indicators</li>
              <li>BS EN 61557-8 — insulation monitoring devices for IT systems</li>
              <li>BS EN 61557-9 — insulation fault-location systems for IT systems</li>
              <li>BS EN 61557-10 — combined / multifunction instruments</li>
            </ul>
            <p>
              The &ldquo;no lesser degree of performance and safety&rdquo; escape clause is
              sometimes treated as a free pass. It is not. The duty is on the user to demonstrate
              equivalence — the accuracy class, the test current or voltage, the safety architecture
              and the overvoltage rating all have to be at least equivalent to the relevant
              BS&nbsp;EN&nbsp;61557 part. In a court or insurer dispute, &ldquo;I used a multimeter
              on the lowest ohm range&rdquo; is not equivalence.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.1"
            clause={
              <>
                The tests of Regulations 643.2 to 643.11, where relevant, shall be carried out and
                the results compared with relevant criteria. Measuring instruments and monitoring
                equipment and methods shall be chosen in accordance with the relevant parts of
                BS&nbsp;EN&nbsp;61557. If other measuring equipment is used, it shall provide no
                lesser degree of performance and safety.
              </>
            }
            meaning="Two duties in one paragraph: do the tests in 643.2 to 643.11, and use instruments selected per BS EN 61557. The clause is silent on calibration intervals and accuracy classes — those come from GN3 Ch 4 and the manufacturer data — but the selection duty is on the user, every time."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The instruments — what each one does and why</ContentEyebrow>

          <ConceptBlock
            title="The five core instruments for a BS 7671 test sequence"
            plainEnglish="A modern multifunction tester combines all of these into one unit. The duties they discharge are still individual — knowing which test you are doing, and which BS EN 61557 part is in play, matters when something looks wrong."
          >
            <ol className="list-decimal pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Low-resistance ohmmeter (BS EN 61557-4).</strong> Discharges Reg 643.2.1
                continuity. Test current of at least 200&nbsp;mA into resistances up to about
                2&nbsp;Ω, resolution to 0.01&nbsp;Ω. Multimeters do not meet this. A buzzer
                absolutely does not — it will beep on a high-resistance joint that is electrically
                dangerous.
              </li>
              <li>
                <strong>Insulation-resistance tester (BS EN 61557-2).</strong> Discharges Reg 643.3.
                Test voltages of 250&nbsp;V&nbsp;DC, 500&nbsp;V&nbsp;DC and 1000&nbsp;V&nbsp;DC,
                with the meter capable of holding the voltage under load and reading megohms or
                higher. The 250&nbsp;V test appears specifically for live-to-PE checks where SELV /
                PELV or sensitive electronics are connected — see Reg 643.3.3.
              </li>
              <li>
                <strong>Earth-fault loop impedance tester (BS EN 61557-3).</strong> Discharges Reg
                643.7. Two distinct functions: a high-current Ze test at the origin (which trips
                upstream RCDs unless the meter has no-trip / 6&nbsp;mA mode), and a Zs test at any
                point on the circuit. Modern testers offer a no-trip mode that injects a small
                current over many cycles to compute loop impedance without tripping a 30&nbsp;mA
                RCD.
              </li>
              <li>
                <strong>RCD tester (BS EN 61557-6).</strong> Discharges Reg 643.8. Injects a
                calibrated half-cycle or multiple-cycle current at I&Delta;n / 5, I&Delta;n,
                2&times;I&Delta;n, 5&times;I&Delta;n and the ramp test. The standard sets the
                accuracy class of the test current and the resolution of the time measurement —
                without it, the trip-time figures on the schedule are not legally robust.
              </li>
              <li>
                <strong>Earth-electrode resistance tester (BS EN 61557-5).</strong> Discharges Reg
                643.6 / earth-electrode tests for TT installations. A dedicated 3-spike or 4-spike
                test is the conventional method; a stakeless clamp meter is acceptable for some
                installations but its reading is the parallel impedance of the electrode and any
                bonded metalwork — read carefully.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="GN3 9th Ed:2022 (A4) · Chapter 4 · Reg 4.1"
            clause={
              <>
                The safety measures and procedures set out in HSE GS38 shall be observed for all
                instruments, leads, probes and accessories without exception.
              </>
            }
            meaning="&lsquo;Without exception&rsquo; is the operative phrase. GS38 is not just a recommendation for live testing — it covers every instrument, every lead, every probe and every accessory you connect during inspection and testing, including dead tests where a slip could re-energise the circuit you thought was off."
          />

          <SectionRule />

          <ContentEyebrow>GS38 — the rules at the probe end</ContentEyebrow>

          <ConceptBlock
            title="HSE GS38: what it actually requires"
            plainEnglish="GS38 is HSE Guidance Note GS38, 'Electrical test equipment for use on low-voltage electrical systems'. It sets out the safety architecture for the part of the test arrangement that is in the electrician's hand — probes, leads, clips and accessories. GN3 Ch 4 Reg 4.1 makes it mandatory."
            onSite="The GS38 features are visible. If your probes do not have finger barriers, if the metal tip is more than ~4 mm exposed, if your leads have alligator clips with no shrouding, or if your leads are not fused — they are not GS38 compliant. Replace before the next live test."
          >
            <p>
              The GS38 requirements for test probes and leads cover three failure modes: hand-slip,
              probe-tip-to-earth fault, and lead damage in service.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Probes:</strong> finger barriers between the operator hand and the metal
                tip. Maximum exposed metal at the tip commonly cited as 4&nbsp;mm — long enough to
                make contact, short enough that a probe falling sideways onto a busbar cannot bridge
                phase-to-phase.
              </li>
              <li>
                <strong>Leads:</strong> insulated up to the connectors at both ends. Where the lead
                carries a fuse, the fuse-holder is shrouded so a fault cannot bypass the fuse via
                finger contact. Lead colour-coding (red / black for L / N, green for E) is industry
                practice though not strictly mandated.
              </li>
              <li>
                <strong>Fuses in leads:</strong> high-rupturing-capacity (HBC) fuses sized to the
                expected fault current of the test point. The fuse limits the energy released into
                the operator hand and the surrounding equipment if the probe tip slips. Without a
                fused lead, a phase-to-earth slip at the origin can deliver the full prospective
                short-circuit current — kiloamps — through the test arrangement.
              </li>
              <li>
                <strong>Connectors:</strong> shrouded plug ends at the meter side. A bare 4&nbsp;mm
                plug protruding from the meter is a hand-shock hazard if the lead is live and the
                operator brushes the connector.
              </li>
              <li>
                <strong>Accessories:</strong> crocodile clips with insulated jaws, retractable
                shrouds where used, and clearly marked CAT ratings on the lead.
              </li>
            </ul>
            <p>
              GN3 Reg 1.1 adds a complementary duty: test equipment and leads shall incorporate
              suitable safety measures (such as HBC fuses or current limiting) to reduce the risk of
              arcing under fault conditions. The &ldquo;or&rdquo; matters — current limiting in the
              instrument itself is a valid alternative to lead fusing for some test functions, but
              it has to be present somewhere in the path.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating the meter rating as the system rating"
            whatHappens="The instrument is a CAT IV 600 V multifunction tester. The leads in the case are CAT III 1000 V — common, because the manufacturer ships a generic lead set. The operator does an origin Ze test on a single-phase domestic supply, treating the arrangement as CAT IV. It is in fact CAT III. A spike or transient on the supply that the CAT IV instrument was selected to survive arrives via the leads — which now flash over."
            doInstead="GN3 Ch 1 Reg 1.1 is unambiguous: the equivalent overvoltage category of the arrangement equals the lowest of any item in it. Buy CAT IV-rated leads for CAT IV work. Mark them. Keep CAT III leads for downstream work where the rating is sufficient. Do not let the case become a mixed bag."
          />

          <SectionRule />

          <ContentEyebrow>Overvoltage categories — CAT II, CAT III, CAT IV</ContentEyebrow>

          <ConceptBlock
            title="What the categories mean — and where each one applies"
            plainEnglish="The overvoltage category is a measure of how dirty the supply is at the test point — how big a transient spike the equipment has to survive. The closer to the origin of supply, the higher the category, because a transient on the incoming network has not been attenuated by the installation own impedance and protection."
            onSite="One sentence to remember on the van: CAT IV at the cut-out, CAT III at the consumer unit, CAT II at the socket-outlet. Match the lowest item in the arrangement to the category at the test point — or step back."
          >
            <p>
              The categories follow BS 7671 Section 443 (which defines them for equipment selection)
              and GN3 Ch 1 Reg 1.1 (which applies them to test instruments and arrangements):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>CAT I:</strong> protected electronic circuits. Not applicable to general
                installation testing.
              </li>
              <li>
                <strong>CAT II:</strong> single-phase appliances and the final circuits supplying
                them — the socket-outlet end. A meter rated CAT II 300&nbsp;V is fine for testing
                inside a portable appliance, not for installation work.
              </li>
              <li>
                <strong>CAT III:</strong> distribution circuits, the consumer unit and downstream
                fixed wiring. This is where most BS 7671 testing happens — Reg 643.2 continuity,
                643.3 insulation, 643.7 Zs at a final-circuit point.
              </li>
              <li>
                <strong>CAT IV:</strong> the origin of the supply. The cut-out, the meter tails, the
                primary distribution board. Testing Ze at the origin or PSCC at the cut-out is CAT
                IV territory because a network-side transient hits there first.
              </li>
            </ul>
            <p>
              The voltage rating that follows the CAT designation (CAT III 600&nbsp;V, CAT IV
              600&nbsp;V, CAT IV 1000&nbsp;V) is the working voltage of the equipment, not the
              transient withstand. The transient withstand is set by Section 443 / Table 443.2 — for
              example, a CAT IV test arrangement at 230/400&nbsp;V nominal must withstand a
              6&nbsp;kV impulse without flashover.
            </p>
          </ConceptBlock>

          <Scenario
            title="Origin Ze on a TN-S supply with mixed leads"
            situation="You are about to measure Ze at the origin of a single-phase TN-S domestic supply. Your meter is CAT IV 600 V. The lead set in your case includes one pair of CAT IV 600 V leads (rated to BS EN 61010-031) and one pair of CAT III 1000 V leads. You grab the second pair because they are on top."
            whatToDo="Stop. The arrangement is now CAT III, not CAT IV. The Ze measurement is at the origin (CAT IV). Either swap to the CAT IV leads, or step back and reorganise the case. Per GN3 Ch 1 Reg 1.1, the lowest-rated item sets the equivalent category — and you have just downgraded your protection at the highest-risk test point on the property."
            whyItMatters="Origin Ze is one of the few legitimate live tests left in BS 7671 (the others are live polarity at the origin, Zs and RCD timing). Network-side transients arrive there with the least attenuation. A flash-over at a CAT III lead inside a CAT IV environment is exactly the failure mode the categorisation system was built to prevent. Insurers and HSE both look at lead provenance after an incident — 'I used what was in the case' is not a defensible answer."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Calibration — what GN3 actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 4.8: calibration intervals and the manufacturer recommendation"
            plainEnglish="GN3 Ch 4 Reg 4.8 does not state a fixed calibration interval. It says calibration intervals and methods shall be as recommended by the instrument manufacturer. In practice, every credible manufacturer recommends annual full calibration — and the certification schemes (NAPIT, NICEIC, ELECSA, Stroma) all require it as a condition of registration."
            onSite="Treat 'recommended by the manufacturer' as 'at least annual' for every multifunction tester in the field. The certificate of calibration is what makes your test report defensible — without it, every reading you take is unreferenced."
          >
            <p>
              The calibration cycle has three layers, each of which discharges a different duty:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Annual UKAS calibration.</strong> A full traceable calibration to national
                standards at a UKAS-accredited laboratory (GN3 Reg 4.8 references the UKAS list at
                www.ukas.com). The certificate states the as-found readings, the as-left readings
                after adjustment, and the measurement uncertainty for each test function. It is this
                certificate that ties your readings to a national reference chain.
              </li>
              <li>
                <strong>In-service checks.</strong> Daily and per-job checks: short-the-leads zero
                on continuity, battery condition, visual inspection of leads and probes for damage,
                a known-circuit reference test if the meter has been in transit. These do not
                replace UKAS calibration — they catch the failures most likely between cycles.
              </li>
              <li>
                <strong>Recheck after damage or repair.</strong> GN3 Reg 4.8 specifically requires
                that the accuracy of new or repaired instruments shall be established. A drop, a
                liquid spill, a service repair or any reason to suspect drift triggers a return to
                the lab before the next test. Quarantine the instrument with a &ldquo;do not
                use&rdquo; tag.
              </li>
            </ul>
            <p>
              Note that GN3 also references certificates of conformity as an alternative for new
              instruments — a manufacturer certificate that the instrument as shipped meets the
              relevant BS&nbsp;EN&nbsp;61557 part. This is fine for the first year of an instrument
              life. After that, ongoing UKAS calibration is the defensible path.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 9th Ed:2022 (A4) · Chapter 4 · Reg 4.8"
            clause={
              <>
                Instruments shall be periodically calibrated. Calibration or checking procedures
                shall follow the manufacturer&rsquo;s recommendations and procedures. Test and
                calibration intervals and methods shall be as recommended by the instrument
                manufacturer.
              </>
            }
            meaning="Two duties: instruments shall be periodically calibrated, and the schedule and method follows the manufacturer. The reg is silent on a numeric interval because instruments differ — but every modern multifunction tester ships with an annual recommendation, and that is the defensible default."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>In-service errors — and the GN3 countermeasure for each</ContentEyebrow>

          <ConceptBlock
            title="The four field effects GN3 Reg 4.8 names — and how to neutralise each"
            plainEnglish="GN3 Ch 4 lists the field effects that contribute to in-service errors in low-resistance and other tests: probe / clip contact resistance, test lead resistance, AC interference, and thermocouple effects in mixed-metal joints. Each has a specific countermeasure. Knowing which countermeasure to apply when is what separates a defensible reading from a guess."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Field effect</th>
                    <th className="text-left text-white/80 py-2">Symptom</th>
                    <th className="text-left text-elec-yellow py-2">Countermeasure</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">Test lead resistance</td>
                    <td className="py-2 align-top">
                      Every continuity reading inflated by 0.10 – 0.30 Ω.
                    </td>
                    <td className="py-2 align-top text-emerald-300">
                      Null / zero the leads at the start of every session, or measure-and-subtract.
                      GN3 Reg 4.8 expressly permits both.
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">Probe / clip contact resistance</td>
                    <td className="py-2 align-top">
                      Unstable reading; result jumps when the probe is pressed harder.
                    </td>
                    <td className="py-2 align-top text-emerald-300">
                      Inspect probe tips and clip jaws for oxidation. Press firmly, ensure clean
                      contact metal. Repeat until reading is stable for 2 – 3 seconds.
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">AC interference</td>
                    <td className="py-2 align-top">
                      Reading wanders, especially near live cables; meter may flag interference.
                    </td>
                    <td className="py-2 align-top text-emerald-300">
                      Move test leads away from parallel live runs. Use the meter
                      interference-rejection mode. If unavoidable, repeat the test and average.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 align-top">Thermocouple EMF (mixed metals)</td>
                    <td className="py-2 align-top">
                      Reading differs in two probe orientations on the same joint.
                    </td>
                    <td className="py-2 align-top text-emerald-300">
                      Reverse the probes and take a second reading. Average the two — that is the
                      thermocouple-corrected resistance per GN3 Reg 4.8.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              These are not academic edge cases. On a working domestic continuity test the lead
              resistance alone can inflate a 0.30 Ω genuine R1+R2 to 0.55 Ω — enough to fail the
              circuit on its calculated value. Skipping the null is the most common cause of false
              fails in practice.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Skipping the morning short-and-zero"
            whatHappens="The first reading of the day is taken without nulling the leads. Lead resistance (typically 0.20 Ω) is added to every continuity reading for the rest of the session. A 0.45 Ω genuine R1+R2 reads as 0.65 Ω. The circuit either fails on its calculated R1+R2 (waste of an hour investigating) or — worse — the inflated value is recorded on the schedule and feeds an inflated Zs that disagrees with the live test by an unexplained amount."
            doInstead="Five-minute morning routine, every day: meter on, short the probes, confirm reading drops to within 0.02 Ω of zero, hit the null / zero button, confirm meter shows 0.00 Ω. Repeat for each lead set used. Do this in the van before the first job — not at the consumer unit."
          />

          <CommonMistake
            title="Trusting the meter self-test as a substitute for calibration"
            whatHappens="Modern multifunction testers run an internal self-test on power-up: battery, LCD, internal reference. The user assumes this is enough. It is not — the self-test verifies internal electronics function, not that the test current is calibrated to 200 mA, that the 500 V insulation test holds 500 V under load, or that the loop tester impedance reading is within 5 % of the true value. Eighteen months later the meter is reading 30 % low on insulation and the user has not noticed."
            doInstead="Annual UKAS calibration is non-negotiable. The certificate is what ties every reading you record to a national reference. Self-test catches some failures — undercharged battery, broken LCD — but it cannot catch drift in the instrument own measurement chain."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Recording instrument data on the certificate</ContentEyebrow>

          <ConceptBlock
            title="What goes on the schedule of test results — and what A4:2026 changed"
            plainEnglish="The certificate captures the instrument used so that, years later, an inspector can verify the readings are referenced. A4:2026 tightened the column structure and added explicit fields for instrument provenance on the model forms."
            onSite="Three things go in the instruments-used box on the test schedule: instrument make / model, serial number, and last calibration date. Do not skip the calibration date — it is the field that ties your readings to UKAS traceability."
          >
            <p>
              Per the A4:2026 model forms, a modern Schedule of Test Results expects the following
              for each instrument used during the test session:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Make and model (e.g. &ldquo;Megger MFT1741+&rdquo;) — identifies the
                BS&nbsp;EN&nbsp;61557 part(s) that apply.
              </li>
              <li>
                Serial number — uniquely identifies the unit. If a calibration certificate is
                requested in a dispute, this is the field that retrieves it.
              </li>
              <li>
                Date of last calibration — the start date of the period during which this instrument
                readings are referenced. If this date is more than 12 months ago (for most
                instruments), the readings are no longer defensible.
              </li>
              <li>
                Optional: accuracy class for each function used, GS38 compliance of leads, CAT
                rating. The model forms do not require these but they are good practice in an EICR
                for industrial or insured installations.
              </li>
            </ul>
            <p>
              A4:2026 did not change the BS&nbsp;EN&nbsp;61557 selection rule. What it did change
              was the column structure on the schedule of test results — additional columns to
              record values that were previously buried in comments. The instrument provenance
              fields sit alongside the per-circuit columns now, not in a free-text afterthought.
            </p>
          </ConceptBlock>

          <Scenario
            title="An EICR challenged in court three years after the test"
            situation="A landlord faces a claim after a fatal electrical fire. The EICR you issued three years ago shows the installation as 'satisfactory'. The claimant expert challenges the readings on the schedule of test results. The court asks for evidence that the instrument was calibrated and within accuracy spec at the time of the test."
            whatToDo="If the schedule recorded the instrument make / model, serial number and calibration date, and you can produce the corresponding UKAS calibration certificate from your records, the readings are defensible. If any of those fields are blank — or if the calibration date on the schedule predates the calibration certificate you can produce — the readings are not robust. Insurers and HSE both look at this chain."
            whyItMatters="The certificate is your professional evidence years after the work. The fields on the schedule that record instrument provenance are the audit trail. Skipping them because 'the meter was the same one I always use' is the procedural failure that converts a defensible report into an indefensible one."
          />

          <SectionRule />

          <ContentEyebrow>
            The decision tree — instrument fitness before every test session
          </ContentEyebrow>

          <ConceptBlock
            title="Pre-test fitness check — five questions before the first reading"
            plainEnglish="Five quick checks before the meter goes near a circuit. Any 'no' means stop and resolve before testing."
          >
            <ol className="list-decimal pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Is the calibration current?</strong> Check the calibration label on the
                meter. If it has expired or is within a month of expiry, replace the meter from the
                spare or send it in. Do not test with an expired-cal meter and &ldquo;intend
                to&rdquo; send it later.
              </li>
              <li>
                <strong>Is the GS38 lead set the right one for the test point?</strong> CAT III for
                downstream of the consumer unit, CAT IV for at the origin. Inspect leads for damage,
                exposed metal, broken finger barriers, missing fuses.
              </li>
              <li>
                <strong>Does the meter pass its in-service checks?</strong> Battery &gt; 50 %.
                Short-and-zero gives near-zero on continuity. Insulation test gives expected reading
                on a known reference (500 V into 100 MΩ block, or similar). LCD shows all segments.
              </li>
              <li>
                <strong>Has anything happened to the meter since the last test session?</strong>{' '}
                Drop, spill, repair, long transit in cold or hot? If yes, GN3 Reg 4.8 says accuracy
                must be re-established — quarantine and recheck.
              </li>
              <li>
                <strong>
                  Is the meter and lead overvoltage rating right for the lowest CAT in the test
                  arrangement?
                </strong>{' '}
                Run through every item: meter, leads, probes, clips, connectors. Lowest item sets
                the arrangement category.
              </li>
            </ol>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.1 is the gateway: instruments selected per BS EN 61557 — or demonstrably equivalent. Multimeters and continuity buzzers are not BS 7671 test instruments.',
              'GN3 Reg 4.1 makes GS38 mandatory without exception for every instrument, lead, probe and accessory.',
              'GS38 features to look for: finger barriers on probes, ~4 mm exposed tip max, shrouded connectors, fused or current-limited leads, insulated clip jaws.',
              'CAT IV at the origin (cut-out / meter), CAT III at the consumer unit and downstream fixed wiring, CAT II at appliance level.',
              'The whole arrangement is rated to the LOWEST CAT of any item in it. CAT III leads on a CAT IV meter give a CAT III arrangement.',
              'GN3 Reg 4.8: calibration intervals follow the manufacturer (annual UKAS in practice), plus daily in-service checks (zero, battery, visual).',
              'Field errors GN3 names — lead resistance (null), probe contact (clean / press firmly), AC interference (move leads / repeat), thermocouple EMF (reverse and average).',
              'After any drop, spill, repair or reason to doubt — quarantine and recheck. "Looks fine" is not a defensible test record.',
              'A4:2026 model forms expect instrument make / model, serial number and last calibration date on the schedule. These fields are your audit trail years later.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Is BS EN 61557 calibration mandatory by law, or is it a registration scheme requirement?',
                answer:
                  'BS EN 61557 is the product standard for test instruments — it sets the design and performance criteria. Reg 643.1 makes selection per BS EN 61557 a regulatory requirement under BS 7671, and BS 7671 is referenced as the recognised standard by the Building Regulations and the EAWR 1989. Calibration intervals come via GN3 Reg 4.8 (manufacturer recommendation) and via certification scheme conditions (NAPIT, NICEIC, ELECSA, Stroma all require annual calibration as a registration condition). In practice the answer is: yes, it is mandatory — under Building Regs, EAWR competence, and your certification scheme, all of which point at the same calibration discipline.',
              },
              {
                question:
                  'My multifunction tester has a self-test feature. Does that satisfy the calibration duty?',
                answer:
                  'No. Self-test verifies internal electronics — the LCD, processor, battery, internal reference. It does not verify that the 200 mA continuity test current is in spec, that the 500 V insulation test voltage holds under load, or that the loop tester reads correctly across its range. Drift in the measurement chain itself is exactly what UKAS calibration catches and self-test cannot. Self-test is a useful daily check; UKAS calibration is the annual reference baseline.',
              },
              {
                question:
                  'What is the difference between calibration accuracy and measurement uncertainty, and which one matters on a borderline reading?',
                answer:
                  'Calibration accuracy is the instrument declared spec (e.g. ±2 % +0.05 Ω on continuity). Measurement uncertainty is the as-tested band stated on the UKAS certificate, including instrument accuracy, environmental factors and the calibration laboratory own uncertainty. On a borderline reading — say a Zs of 1.36 Ω against a 1.37 Ω limit — the measurement uncertainty matters. If the certificate states ±5 % on loop, your true Zs could be 1.43 Ω and the circuit fails. Most testers handle this by adding margin on the displayed limit, but it is good practice to check the certificate when readings sit within 10 % of a limit.',
              },
              {
                question:
                  'I have CAT III 1000 V leads. Can I use them at the origin of a 230 V single-phase domestic supply?',
                answer:
                  'No — not for tests at the origin. The voltage rating (1000 V) is the working voltage, not the transient withstand. The transient withstand is set by the CAT category. CAT III is for distribution circuits downstream of the origin; CAT IV is for the origin itself. A network-side transient on 230 V mains can spike to 6 kV (per BS 7671 Table 443.2 for CAT IV at 230 / 400 V). CAT III leads will flash over before CAT IV leads — that is precisely what the categorisation system is built to prevent. Use CAT IV-rated leads at the origin.',
              },
              {
                question:
                  'My meter dropped from waist height onto carpet. It powers up and reads sensibly on a known circuit. Do I really have to send it for calibration?',
                answer:
                  'Yes, GN3 Reg 4.8 is explicit: the accuracy of any new or repaired instrument shall be established. Mechanical impact falls in the same category as repair — you cannot rely on the previous calibration baseline. The risk is asymmetric: the cost of a recheck is a few days and a fee; the cost of issuing a satisfactory EICR off a drift-affected meter is potentially a fatality and a coroner referral. Quarantine the meter, label it out of service, send it in. Use the spare in the meantime.',
              },
              {
                question:
                  'I have an unbranded multifunction tester from an online seller. It claims BS EN 61557 compliance. Is that enough?',
                answer:
                  'Reg 643.1 requires selection per BS EN 61557 or "no lesser degree of performance and safety". A claim on the box is not the same as conformity. Look for: (a) a manufacturer declaration of conformity for each BS EN 61557 part claimed, (b) a CE / UKCA mark, (c) traceable calibration capability — most reputable instruments have a UK service network. If you cannot produce these and a UKAS calibration certificate, the readings on your test report are unreferenced. In practice, stick to known UK / EU manufacturers (Megger, Fluke, Kewtech, Metrel, Seaward, Martindale) where the BS EN 61557 chain is documented and the service network exists.',
              },
              {
                question:
                  'Does the GS38 fused lead requirement apply to dead tests, or only to live tests?',
                answer:
                  'Both. GN3 Reg 4.1 says GS38 applies to all instruments, leads, probes and accessories — without exception. The reason: an isolation can fail. A neutral that should be dead can be live (mis-wired SPN MCB on a different phase, backfeed from a UPS, neighbouring property cross-bonding). The fused lead is what limits the energy released if the dead test turns out not to be dead. Treating GS38 as "live tests only" is one of the field practices that gets people hurt.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Test equipment and calibration — Module 1.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-1/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 Safety during testing
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

export default InspectionTestingModule1Section3;
