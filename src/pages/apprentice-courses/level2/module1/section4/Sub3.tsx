/**
 * Level 2 · Module 1 · Section 4.3 — GS38: Test Instruments and Leads
 *
 * AC mapping:
 *   - Unit 201 LO3 AC 3.4 — identify appropriate PPE for electrical work tasks
 *   - Unit 201 LO3 AC 3.7 — describe safe practices when using equipment
 *
 * Cross-refs:
 *   - §4.2 (insulated PPE — gloves and tools)
 *   - §1.2 (EAWR Reg 4 / Reg 14 — working dead is the default)
 *   - §2.1 (electric shock thresholds — why shrouded probes matter)
 *   - Forward to §5.1 (safe isolation — needs GS38 kit)
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

const TITLE = 'GS38 — test instruments and leads | Level 2 Module 1.4.3 | Elec-Mate';
const DESCRIPTION =
  'HSE Guidance Note GS38 — what makes a voltage indicator, lead and probe safe for live work. Probes, fuses, finger guards, prove-test-prove.';

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'gs38-probe-tip-check',
    question: 'GS38 says the exposed metal tip of a test probe should be no more than:',
    options: [
      '50 mm — for good contact',
      '4 mm — measured from the tip of the finger guard',
      '19 mm',
      'Whatever the manufacturer specifies',
    ],
    correctIndex: 1,
    explanation:
      "GS38 (4th edition) recommends max 4 mm of exposed tip — and lots of UK industry now uses 2 mm or spring-loaded retractable tips. The whole point: short enough that you can’t accidentally bridge two phases or short to earth with a slip.",
  },
  {
    id: 'prove-test-prove-check',
    question: 'You’ve used a voltage indicator to confirm a circuit is dead. Are you done?',
    options: [
      'Yes — the reading was 0 V',
      'No — you also need to PROVE the indicator was working before AND after the test',
      'No — you need to wait 5 minutes for capacitance to discharge',
      'Yes, as long as the breaker’s locked off',
    ],
    correctIndex: 1,
    explanation:
      "Prove → test → prove. Use a known live source (proving unit OR a confirmed live circuit) BEFORE the test and AFTER. If the indicator was broken / the battery was flat / a fuse blew during your test, the second prove is what catches it. A ‘dead’ reading from a broken instrument looks identical to a real dead circuit.",
  },
  {
    id: 'voltmeter-vs-vi-check',
    question: 'Why is a voltage indicator (VI) generally preferred over a multimeter for proving dead?',
    options: [
      'Multimeters cost more',
      'A VI doesn’t rely on selecting the correct range, has integral fused leads and shrouded probes, and can’t give a misleading reading from a wrong setting',
      'Multimeters are too accurate',
      'VIs measure faster',
    ],
    correctIndex: 1,
    explanation:
      "A VI is a SINGLE-PURPOSE instrument: dead vs. live, no range to select, no maths to do, no possibility of leaving it on milliamps and bridging the line conductor. GS38 strongly favours dedicated VIs over multimeters for proving dead — a wrongly-set multimeter has been the root cause of multiple UK electrical fatalities.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What does GS38 stand for?',
    options: [
      'General Standard 38',
      'HSE Guidance Note GS38 — Electrical test equipment for use on low voltage electrical systems',
      'British Standard EN 38',
      'IET Code of Practice 38',
    ],
    correctAnswer: 1,
    explanation:
      "HSE Guidance Note GS38, currently in its 4th edition. Not a regulation in itself, but recognised by HSE as the way to comply with EAWR 1989 Reg 4(4) — that any equipment used in work on or near live conductors must be suitable.",
  },
  {
    id: 2,
    question: 'GS38 sets the maximum exposed metal at the tip of a test probe at:',
    options: ['19 mm', '12 mm', '4 mm or less (with finger guards)', '25 mm'],
    correctAnswer: 2,
    explanation:
      "Maximum 4 mm of exposed tip, with finger guards. Many modern probes use 2 mm or spring-loaded retractable tips. Long fully-exposed probes (the old screwdriver-style) are NOT GS38-compliant and will get you a hard stop on a competent site.",
  },
  {
    id: 3,
    question: 'The fuses inside GS38-compliant test leads are there to:',
    options: [
      "Limit the current the leads can carry — so a fault doesn’t turn the lead into a glowing wire",
      "Trip the test instrument if you measure too long",
      "Replace the consumer-unit fuse",
      "Match the colour of the test leads",
    ],
    correctAnswer: 0,
    explanation:
      "HRC (high-rupturing-capacity) fuses inside the lead — typically 500 mA. If you accidentally short L-N or L-E across an LV system, the fuse blows almost instantly, limiting the prospective fault current and stopping the lead from melting / causing an arc. Without internal fusing, a leadshort can produce a serious arc flash at the user’s hands.",
  },
  {
    id: 4,
    question: 'A "proving unit" is used to:',
    options: [
      'Test the insulation resistance of a circuit',
      'Generate a known voltage to prove that a voltage indicator is working before and after a dead-test',
      'Earth the circuit while you’re working on it',
      'Replace the consumer unit',
    ],
    correctAnswer: 1,
    explanation:
      "A handheld unit that produces a known voltage (typically 230 V or 400 V AC depending on model). You touch your VI probes to it before testing the circuit dead, and AGAIN after — if the indicator lights up both times, you know it was working throughout the test. Prove → test → prove.",
  },
  {
    id: 5,
    question: 'You proved the VI on the proving unit, tested the circuit, got 0 V. Then you tried to prove again — and the VI didn’t light up. What does this mean?',
    options: [
      'The proving unit is broken — the circuit is genuinely dead',
      "The VI failed sometime during your test — your ‘0 V’ reading is unreliable, treat the circuit as POTENTIALLY LIVE until proven otherwise",
      "The proving unit needs a battery change",
      "Doesn’t matter — first reading was correct",
    ],
    correctAnswer: 1,
    explanation:
      "Classic prove-test-prove failure scenario. Maybe the VI’s internal fuse blew during the test, the battery died, the leads broke. Whatever — the ‘0 V’ reading is now unreliable. Treat the circuit as live, retest with a confirmed-working instrument BEFORE touching it.",
  },
  {
    id: 6,
    question: 'GS38 says test leads should have:',
    options: [
      'Bare metal banana plugs at the instrument end',
      'Insulated lead-to-instrument connections (no exposed metal at the plug), shrouded probes, finger guards, fused tips, and CAT-rated insulation',
      'Three colours minimum',
      "A 1 m minimum length",
    ],
    correctAnswer: 1,
    explanation:
      "All five together. Insulated plugs, shrouded probes, finger guards, internal HRC fuses, and CAT III / CAT IV insulation rated for the system voltage. The complete set is what makes the lead GS38-compliant — leaving any one off is a non-compliance.",
  },
  {
    id: 7,
    question: 'Which is the SAFEST instrument for proving dead on a 230 V circuit?',
    options: [
      "A two-pole voltage indicator (VI) — single function, GS38 leads, prove-test-prove",
      "A neon screwdriver",
      "A digital multimeter on AUTO range",
      "A non-contact ‘pen’ tester",
    ],
    correctAnswer: 0,
    explanation:
      "Two-pole VI is the GS38-recommended tool. Neon screwdrivers rely on body capacitance, give false negatives, and are explicitly NOT GS38 compliant — banned on most UK sites. ‘Pen’ non-contact testers can give false negatives near shielded cables. Multimeters work but the wrong-range risk makes a dedicated VI safer.",
  },
  {
    id: 8,
    question: "The CAT rating on a multimeter (e.g. CAT III 600 V) tells you:",
    options: [
      "How loud the beep is",
      "What category of electrical environment the meter is rated to use safely on, and the max voltage in that category",
      "The age of the meter",
      "How accurate it is",
    ],
    correctAnswer: 1,
    explanation:
      "CAT II = appliance-side circuits (cord-connected). CAT III = fixed installation final circuits + DBs (most electrician work). CAT IV = origin of installation, supply side of main fuse. The voltage is the max line-to-earth in that category. Using a CAT II meter at the origin of an installation = transient overvoltage could blow it up in your hand.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: 'My company gave me a multimeter, not a VI. Can I just use that?',
    answer:
      "You CAN, if it has GS38-compliant leads and you’re properly trained on it. But for proving dead, a dedicated two-pole VI is genuinely safer — no range to select, no possibility of leaving it on amps and shorting the supply. UK industry guidance (HSE GS38, IET Wiring Matters) leans hard toward VIs for proving dead. If you can carry both, do — VI for proving dead, multimeter for actual measurements.",
  },
  {
    question: 'Why are neon screwdrivers banned?',
    answer:
      "They use your body as the return path for a tiny current to light the neon — so if anything between you and earth has decent resistance (rubber-soled boots, dry surface), it gives a FALSE NEGATIVE. People have been killed mistaking a glowing neon for ‘safely off’ when the circuit was live. They’re not GS38-compliant and most UK sites will treat them as a fail-and-disposal item.",
  },
  {
    question: 'Do I need to prove the indicator if I’m only doing a quick test?',
    answer:
      "Yes. Every time. The whole reason for prove-test-prove is that an indicator can fail SILENTLY — battery, fuse, broken lead. ‘Quick test’ is exactly when complacency kills. The proving unit is in your tool bag; it takes 4 seconds to use. No exception is worth a shock.",
  },
  {
    question: "What if I haven’t got a proving unit on me?",
    answer:
      "You can prove on a known live source — e.g. an adjacent socket on a different circuit you’ve already confirmed is live. But that means you have to find one that’s genuinely live, which on a partly-isolated install isn’t always easy — and you’re relying on someone else’s prior test. A pocket-size proving unit is £30 and lives on your tool belt for years. Get one. Use it.",
  },
  {
    question: "What’s the difference between CAT III and CAT IV?",
    answer:
      "Different points in the installation. CAT II = appliance-side (cord-connected). CAT III = fixed installation final circuits and DBs — most apprentice work. CAT IV = the supply origin (main fuse, meter tails, service head). The higher the CAT number, the more energy is potentially available in a fault, so the instrument needs more robust insulation. Working on the cut-out side of the meter with a CAT III meter is asking for trouble — buy CAT IV-rated kit if you’ll work that far up the supply.",
  },
  {
    question: 'Do GS38 rules apply to MY OWN tester I bought online?',
    answer:
      "Yes. EAWR 1989 Reg 4(4) says any test equipment must be suitable for the work and properly maintained — applies whoever owns it. If your supervisor-issued kit is unsuitable, your apprentice-bought kit is ALSO unsuitable. ‘Personal’ test gear must still be GS38-compliant, properly fused, CAT-rated, and ideally calibrated. Cheap unmarked stuff online is often none of those.",
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
            eyebrow="Module 1 · Section 4 · Subsection 3"
            title="GS38 — test instruments and leads"
            description="The HSE guidance that defines what makes a tester safe for live work. Probes, fuses, finger guards, CAT ratings, and the prove-test-prove rule that catches a broken indicator before it kills you."
            tone="emerald"
          />

          <TLDR
            points={[
              "GS38 = HSE Guidance Note for test equipment on LV systems. Covers probes, leads, fuses, indicators. Recognised method of complying with EAWR Reg 4(4).",
              "Probes: max 4 mm exposed tip, finger guards, shrouded plugs, internal HRC fuses, CAT-rated insulation. Neon screwdrivers are NOT compliant.",
              "Always PROVE → TEST → PROVE on a known live source (proving unit). A broken VI gives 0 V on a live circuit — the second prove catches it.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain what GS38 is and how it relates to EAWR 1989 Reg 4(4) (AC 3.4 + 3.7).",
              "Identify a GS38-compliant probe set (probe tip, finger guard, shroud, fuse, CAT rating).",
              "Choose between a voltage indicator (VI), multimeter, and proving unit — and explain why a VI is preferred for proving dead.",
              "Carry out the prove-test-prove procedure on a real LV circuit and explain why the second prove is non-negotiable.",
              "Read and apply CAT II / III / IV ratings to the right point in an installation.",
              "Spot non-compliant test gear (neon screwdrivers, non-fused leads, exposed probe tips) and refuse to use it.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What GS38 actually is</ContentEyebrow>

          <ConceptBlock
            title="HSE Guidance Note GS38 — the rulebook for electrician test gear"
            plainEnglish="GS38 is HSE’s detailed advice on what makes a test instrument and its leads safe for live work. Not a law on its own — but treated as THE recognised way to meet EAWR Reg 4(4). Following it = compliant. Ignoring it = HSE will ask why."
            onSite="When your supervisor hands you a multimeter or VI, the first thing to check is whether the probes, leads and instrument all meet GS38. The GS38 booklet itself is on the HSE website, free to download — worth keeping a PDF on your phone."
          >
            <p>
              GS38 is currently in its 4th edition, last updated 2015. It’s aimed
              specifically at electrical test equipment used on systems up to 1000 V AC
              (Low Voltage). It covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The construction of test probes (tips, finger guards, shrouds)</li>
              <li>The construction of test leads (insulation, internal fuses, plugs)</li>
              <li>Voltage indicators vs multimeters vs neon testers</li>
              <li>The prove-test-prove principle</li>
              <li>Periodic inspection and care of test equipment</li>
            </ul>
            <p>
              It exists because, historically, a lot of "easy" jobs went wrong because the
              test gear itself was the cause — a non-fused lead shorted, a long screwdriver
              probe bridged two phases, a neon tester gave a false negative. GS38 is the
              accumulated lesson from those incidents.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="EAWR 1989 — Regulation 4(4)"
            clause="Any equipment provided under these Regulations for the purpose of protecting persons at work on or near electrical equipment shall be suitable for the use for which it is provided, be maintained in a condition suitable for that use, and be properly used."
            meaning={
              <>
                Test equipment counts as "equipment for protecting persons" under Reg 4(4).
                It has to be <strong>suitable</strong>, <strong>maintained</strong>, and
                <strong> properly used</strong>. GS38 is HSE’s detailed view of what
                "suitable" means in practice. A non-GS38 setup IS a Reg 4(4) breach if
                someone gets hurt.
              </>
            }
            cite="Reference: HSE GS38 (4th ed.) — Electrical test equipment for use on low voltage electrical systems"
          />

          <SectionRule />

          <ContentEyebrow>The probe</ContentEyebrow>

          <ConceptBlock
            title="GS38-compliant probes — short tips, finger guards, fused leads"
            onSite="Pull a probe out of your tool bag. The metal tip should be barely there — 4 mm max, often 2 mm. Behind that, a moulded finger guard you can’t accidentally slide your hand past. Behind that, a fully insulated body. If any of that is missing, the probe is not GS38."
          >
            <p>The GS38-recommended construction has five mandatory features:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Maximum 4 mm exposed metal tip.</strong> Many modern probes use
                2 mm or spring-loaded retractable tips. The whole point: short enough that
                you can’t bridge two adjacent terminals with one slip.
              </li>
              <li>
                <strong>Finger guard / barrier.</strong> A moulded ring or flange that stops
                your finger sliding forward onto the live tip. Compulsory under GS38.
              </li>
              <li>
                <strong>Fully insulated body.</strong> No exposed metal anywhere except the
                tip itself. Insulation rated for the system voltage with appropriate CAT
                category.
              </li>
              <li>
                <strong>Internal HRC fuse in the lead.</strong> Typically 500 mA. If you
                accidentally short L-N or L-E, the fuse blows in milliseconds — limits the
                prospective fault current, prevents the lead becoming a fuse itself.
              </li>
              <li>
                <strong>Shrouded plug at the instrument end.</strong> No exposed banana-plug
                metal where the lead joins the meter. Insulated up to the actual contact.
              </li>
            </ol>
            <p>
              Old-school probes that had a long fully-exposed metal pin (essentially a
              screwdriver shaft as the tip) are <strong>explicitly non-compliant</strong>.
              Same for unfused leads. They’ll get a hard stop on any competent UK site, and
              if used in an incident, they’re what the HSE inspector will look at first.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE GS38 (4th edition, 2015) — Section 4 (Test Probes) (paraphrased)"
            clause="Probes should be designed and constructed so as to limit the exposed metal tip to a maximum of 4 mm. Where probes are likely to come into contact with live parts that could give rise to short-circuit currents in excess of approximately 1 kA, additional protection should be provided to the user, e.g. by means of finger guards or barriers."
            meaning={
              <>
                4 mm max tip, finger guards mandatory whenever the prospective short-circuit
                current is high (which is essentially every fixed installation in a UK
                building). Read straight off the document — this isn’t opinion, it’s the
                published HSE recommendation.
              </>
            }
            cite="Verbatim wording paraphrased — see HSE GS38 (4th ed.) Section 4 and Annex A for the full text."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The instrument</ContentEyebrow>

          <ConceptBlock
            title="Voltage indicator (VI) vs multimeter vs neon tester"
            plainEnglish="A VI does ONE job: shows live or dead. A multimeter measures lots of things if you set it right. A neon tester relies on you and is essentially banned. For proving dead, the VI is what you want."
            onSite="Two-pole VIs (Martindale, Drummond, Fluke T-series, Megger 1731) are the standard UK kit. They show LEDs or a series of bars at common voltages — 12, 50, 120, 230, 400, 690 V. No range knob, no display you can misread, no chance of the wrong setting."
          >
            <p>The three options, side by side:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Two-pole voltage indicator (VI).</strong> Single-purpose. Probes
                wired directly into the unit. LED or LCD shows step voltages. GS38-preferred
                for proving dead. Doesn’t need batteries for the basic indicator function on
                most models — driven by the measured voltage itself. <em>What you should
                use.</em>
              </li>
              <li>
                <strong>Digital multimeter (DMM).</strong> Versatile. CAT III or IV rated,
                GS38-compliant leads, internal HRC fuses on the current ranges. Useful for
                actual measurements (voltage, current, resistance, continuity). Risk:
                wrong-range error — set to amps, touched across L-N, becomes a dead short
                with a small fuse. Used widely but the wrong-range risk makes it the second
                choice for proving dead.
              </li>
              <li>
                <strong>Neon screwdriver / non-contact ‘pen’ tester.</strong>{' '}
                <strong>Banned in practice.</strong> Neon types use your body as a return
                path — false negative if you’re well-insulated from earth. Pen testers can
                miss shielded cables. NEITHER is GS38-compliant. Toss them.
              </li>
            </ul>
            <p>
              GS38 doesn’t formally outlaw multimeters or pen testers — but it makes clear
              that the VI is the safest dedicated tool for confirming dead state. Best
              practice on most UK competent sites: VI for prove-test-prove, multimeter for
              everything else.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The CAT rating — and why it matters where on the install you’re working"
            plainEnglish="The CAT number = how high up the supply chain the meter is safe to use. Higher CAT = more potential energy in a fault = more robust insulation needed inside the meter."
          >
            <p>Defined in IEC/EN 61010-1, you’ll see CAT II, III or IV on every quality meter:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CAT II</strong> — appliance-side. Cord-connected loads (kettles,
                lamps, AV gear). Generally avoided on fixed installation work.
              </li>
              <li>
                <strong>CAT III</strong> — fixed installation final circuits, distribution
                boards, ring finals, hard-wired motors. <strong>The standard
                ‘electrician-everyday’ rating.</strong> Most electrician multimeters and VIs are CAT
                III 600 V or 1000 V.
              </li>
              <li>
                <strong>CAT IV</strong> — origin of installation. Service head, meter tails,
                main switch. Higher transient overvoltages possible from lightning / network
                faults. Required for any work upstream of the consumer unit. CAT IV 600 V
                kit is more expensive but essential if you’ll touch the cut-out side.
              </li>
            </ul>
            <p>
              The number after CAT (e.g. 600 V, 1000 V) is the max line-to-earth voltage in
              that category. Using a CAT II 600 V meter on a CAT IV environment isn’t just
              ‘not ideal’ — it can literally blow the meter up in your hand if a transient
              hits during your test.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE GS38 (4th edition, 2015) — Section 5 (Test Instruments) (paraphrased)"
            clause="Where the test or measurement requires a meter that can have current flow through the leads (e.g. for measurement of low resistance, current measurement, etc.), the leads should incorporate a high-rupturing-capacity (HRC) fuse with a current rating not exceeding 500 mA, or a current-limiting resistor."
            meaning={
              <>
                The 500 mA HRC fuse in the test lead is what stops your meter becoming a
                small bomb when you accidentally touch line-to-earth on the amps range.
                Lead-mounted, NOT on the instrument — so even if you swap a probe between
                two meters, the fuse goes with the lead. Buy GS38 leads, check the fuse
                rating, replace fuses with the same HRC type (NOT random fuses from a
                drawer).
              </>
            }
            cite="Verbatim wording paraphrased — see HSE GS38 (4th ed.) Section 5 for the full text."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The procedure that catches the failure</ContentEyebrow>

          <ConceptBlock
            title="Prove → test → prove (the bit that saves you)"
            plainEnglish="Use a known live source to confirm the indicator works BEFORE you test the circuit. Then test the circuit. Then go back to the known live source and confirm the indicator STILL works."
            onSite="Order on the bench: VI in one hand, proving unit in the other. Touch probes to PU, see all the bars/LEDs light. Walk to the circuit, touch probes to the test point, confirm 0 V (dead). Walk back to PU, touch probes again, see all the bars/LEDs light. NOW you can trust the dead reading. Takes 30 seconds."
          >
            <p>
              The reason the second prove is non-negotiable: if the indicator failed
              silently DURING your test (battery died, fuse blew, lead got pulled out
              internally), the second prove will fail too. Without the second prove, you
              can’t tell a real dead reading apart from a broken instrument reading.
            </p>
            <p>
              Documented UK fatalities have come from exactly this — electrician proves the VI,
              tests the supposedly-isolated cable, gets 0 V, removes the cable termination,
              gets a fatal shock. Post-incident: the VI’s internal lead had broken open
              between the proving and the test. The second prove would have shown that and
              the death would have been a very different outcome.
            </p>
            <p>
              <strong>What counts as a ‘known live source’?</strong> Best: a dedicated
              proving unit (PU). Acceptable: another circuit on the same install that you’ve
              already independently confirmed is energised (e.g. a known-live socket).
              <strong> Not acceptable:</strong> a battery, an ELV signal, or anything that
              tests at a voltage well below your circuit voltage — a VI working at 12 V is
              no proof it’ll work at 230 V.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE GS38 (4th edition, 2015) — Section 6 (Test procedures) (paraphrased)"
            clause="Before and after the test, the operation of the test instrument should be checked using a proving unit or other known live source. This ‘prove-test-prove’ procedure is essential to confirm that the indicator was functioning correctly during the test."
            meaning={
              <>
                Plain-English HSE guidance. The two proves are <em>essential</em> — not
                "recommended", not "best practice" — essential. If you can’t prove the VI
                worked both before AND after the test, you cannot rely on the dead reading.
                Treat the circuit as live until proved otherwise with confirmed-working
                equipment.
              </>
            }
            cite="Verbatim wording paraphrased — see HSE GS38 (4th ed.) Section 6 and the IET Code of Practice for Electrical Safety Management for the full text."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Inspection + maintenance</ContentEyebrow>

          <ConceptBlock title="Looking after the test gear">
            <p>
              EAWR Reg 4(4) requires test equipment to be MAINTAINED in a suitable
              condition. In practice, that means:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-use visual check</strong> — every time. Cracks in the moulding,
                damaged probe tips, frayed leads, missing finger guards, swollen battery
                compartment, water ingress.
              </li>
              <li>
                <strong>Function check before each test session</strong> — prove the VI on
                the PU. If it doesn’t prove, don’t use it.
              </li>
              <li>
                <strong>Periodic calibration</strong> for measurement instruments —
                multimeters, MFTs, clamp meters. Annual is the typical interval. Check the
                calibration cert sticker on the instrument; if it’s out of date, the
                readings can’t be trusted for certification work.
              </li>
              <li>
                <strong>Replace the lead fuse with the EXACT specified type.</strong> Not "a
                500 mA fuse from a drawer". HRC fuses with the right interrupting rating —
                anything less can fail-open under fault and let the arc through.
              </li>
              <li>
                <strong>Out-of-service the instrument and its leads</strong> if any defect is
                found. Report it. Get a replacement. Don’t patch and continue.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Skipping prove-test-prove because ‘the breaker is off’"
            whatHappens={
              <>
                You isolate the circuit at the breaker, lock it off, get to the test point.
                The VI shows 0 V. ‘Job done — start working.’ Halfway through removing the
                terminations, the screwdriver bridges line-CPC and the world flashes white.
                Post-incident analysis: the VI’s internal lead had a hairline break, you
                were testing a live circuit and the indicator just couldn’t show it. The
                second prove would have told you straight away.
              </>
            }
            doInstead={
              <>
                EVERY test, EVERY time: PROVE the indicator on a known live source → TEST
                the circuit → PROVE the indicator AGAIN. The fact that the breaker is off
                isn’t evidence the conductor is dead — wrong breaker, mis-labelled DB,
                somebody else energising elsewhere. The indicator IS the evidence. The
                indicator only works if it’s actually working. Hence the prove-test-prove.
              </>
            }
          />

          <CommonMistake
            title="Using a multimeter set to the wrong range to ‘prove dead’"
            whatHappens={
              <>
                Multimeter accidentally left on the 10 A current range from a previous test.
                You touch the probes across L-N expecting a voltage reading, instead create
                a near-dead-short across the supply. Best case: the meter’s internal HRC
                fuse blows immediately, no harm done. Worst case: the fuse is wrong-rated or
                missing, the supply prospective fault current is 6 kA, the meter and your
                hand find out together how arc-flash works.
              </>
            }
            doInstead={
              <>
                Use a dedicated voltage indicator for proving dead — no range to set, no
                possibility of being on the wrong setting. If you must use a multimeter,
                CHECK the dial before every probe-touch. AND make sure the leads have
                GS38-compliant 500 mA HRC fuses — they’re what stops you finding out the
                hard way.
              </>
            }
          />

          <Scenario
            title="The first time prove-test-prove saves you"
            situation={
              <>
                Cap-off on a small distribution board to add a new circuit. You isolate the
                whole board, lock it off, walk back to the bench, prove your VI on the
                proving unit (LEDs all light), walk back, touch probes to the incoming tail
                terminals — 0 V. You start to relax. But you remember the routine: walk
                back to the proving unit, touch the probes to it, expecting the LEDs again…
                and nothing. No light. No voltage reading.
              </>
            }
            whatToDo={
              <>
                STOP. The VI failed sometime between the first prove and now. Your ‘0 V’
                reading on the tails is unreliable — the tails could still be live and the
                indicator just isn’t telling you. Don’t touch the conductors. Get a
                different VI (or borrow your supervisor’s), prove that one on the PU, retest
                the tails. If those are dead too — proceed, but bin the failed VI and
                report the incident. If the second VI shows live — you’ve just discovered a
                wrong-breaker isolation and the prove-test-prove rule has saved your life.
              </>
            }
            whyItMatters={
              <>
                This isn’t a hypothetical — exactly this scenario plays out across the UK
                multiple times a year. The investigation reports list "test instrument
                failure" as a contributing cause again and again. The single thing that
                turns it from an injury into a near-miss is the discipline of proving the
                indicator after the test. Build it into your hands so you do it without
                thinking.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>How GS38 connects to everything else</ContentEyebrow>

          <ConceptBlock
            title="GS38 + insulated PPE + safe isolation = the layered defence"
            plainEnglish="GS38 makes sure your test gear isn’t the cause of the incident. Insulated PPE protects you if something else goes wrong. Safe isolation removes the live state in the first place. All three together = the safety system."
          >
            <p>
              Looking at the bigger picture of Section 4: §4.1 told you PPE is the LAST
              line of defence. §4.2 listed the specific PPE for electricians. This subsection is
              about making sure the TEST INSTRUMENT itself isn’t a source of risk — because
              you’ll spend more of your career holding test gear than holding insulated
              tools, and a non-GS38 setup turns a routine dead-test into the incident.
            </p>
            <p>
              §5 (next section) will cover the formal safe isolation procedure that uses
              all of this together: lock-off the supply, post warning notices, use
              GS38-compliant kit to PROVE dead state, then work. Each step is dependent on
              the next. GS38 underpins the whole thing.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "GS38 = HSE Guidance Note for LV test equipment. Recognised method of meeting EAWR Reg 4(4).",
              "Probes: max 4 mm exposed tip, finger guards, shrouded plugs, internal HRC fuses (500 mA), CAT-rated insulation.",
              "Voltage indicators (VIs) are GS38-preferred for proving dead — single-purpose, no range to set, no wrong-setting risk.",
              "Neon screwdrivers + non-contact pens = NOT GS38, banned on competent sites. Bin them.",
              "PROVE → TEST → PROVE on a known live source EVERY time. The second prove is what catches a silently failed indicator.",
              "CAT III for fixed-installation final circuits + DBs (most electrician work). CAT IV needed upstream of the consumer unit.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="GS38 knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section4/4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                PPE for electrical work
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section4/4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Safe working practices on site
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
