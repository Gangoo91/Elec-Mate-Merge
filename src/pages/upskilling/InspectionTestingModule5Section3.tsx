import { ArrowLeft, ChevronLeft, ChevronRight, Home } from 'lucide-react';
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
  VideoCard,
  SectionRule,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'mod5-s3-route',
    question:
      'Reg 313.1 lets you determine Ze by four routes. On a five-year periodic inspection of an existing TN-C-S installation, which route is the default?',
    options: [
      'Enquiry to the DNO — they hold the canonical declared value for the feeder',
      'Measurement at the origin — the supply is live in front of you, so it is the evidence',
      'Calculation from the supply cable size and length back to the substation',
      'Inspection of the cut-out label and supplier earthing declaration only',
    ],
    correctIndex: 1,
    explanation:
      'Reg 313.1 lists calculation, measurement, enquiry or inspection. Enquiry is the design-stage answer when no installation exists yet. On a periodic inspection the installation is live and present — measurement is the verification gold standard. The DNO declared value belongs alongside the measured number as a cross-check.',
  },
  {
    id: 'mod5-s3-bands',
    question:
      'A measured Ze of 0.27 Ω with no further information about the supply most strongly suggests which earthing arrangement?',
    options: [
      'TT — typical single-electrode resistance for a domestic rod',
      'TN-C-S (PME) — typical band 0.20–0.35 Ω from the parallel PEN return',
      'TN-S — typical band 0.35–0.8 Ω via a separate earth conductor',
      'IT — a deliberately high-impedance, earth-isolated source',
    ],
    correctIndex: 1,
    explanation:
      'TN-C-S sits in 0.20–0.35 Ω because the PEN runs in parallel with the line conductor across the LV distribution. TN-S is typically 0.35–0.8 Ω, TT is well above 1 Ω (usually 20–200 Ω). 0.27 Ω is squarely in the PME band; confirm with the cut-out label and the supplier earthing declaration before recording.',
  },
  {
    id: 'mod5-s3-parallel-paths',
    question:
      'You measure Ze without lifting the main earthing conductor and read 0.11 Ω on a TN-C-S supply where the declared maximum is 0.35 Ω. The Method A reading (earthing conductor lifted) is 0.21 Ω. Which is the true Ze?',
    options: [
      '0.11 Ω — the lower reading is always the more accurate of the two',
      '0.21 Ω — the Method A reading; the 0.11 Ω is the bonded parallel combination, not Ze',
      'The average of the two readings, 0.16 Ω, splits the difference fairly',
      'Either reading is acceptable to record on the certificate as Ze',
    ],
    correctIndex: 1,
    explanation:
      'Ze is "the earth fault loop impedance external to the installation" (Part 2 definition). With the earthing conductor in place, the meter sees Ze in parallel with bonded gas/water/structural metalwork — the parallel combination is always lower than the true external impedance. Method A or a no-disconnect mode that removes parallel paths electronically gives the certificate-worthy Ze.',
  },
  {
    id: 'mod5-s3-tt-ze',
    question:
      'A TT installation reads Ze = 95 Ω, with a 30 mA RCD providing fault protection. Apply Reg 411.5.3 (Ra × IΔn ≤ 50 V) and Table 41.5 (max Zs for 30 mA RCD = 1667 Ω). Verdict?',
    options: [
      'Fail — Ze must always be below 1 Ω on a TT installation',
      'Pass — 95 × 0.030 = 2.85 V (< 50 V) and 95 Ω is far below 1667 Ω',
      'Pass only if a second earth electrode is driven in parallel',
      'Reg 411.5.3 does not apply to TT systems at all',
    ],
    correctIndex: 1,
    explanation:
      'TT compliance is RCD-driven, not overcurrent-driven. Reg 411.5.3 sets the touch-voltage limit (Ra × IΔn ≤ 50 V); Table 41.5 caps Zs at 1667 Ω for a 30 mA RCD at Uo = 230 V. 95 Ω satisfies both with comfortable margin. Applying TN-style 0.35 / 0.8 Ω bands to a TT installation either fails it spuriously or pushes electrode work that adds no real safety.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 313.1 lists Ze as one of the supply characteristics that must be ascertained for an external supply. By what methods does the regulation permit Ze to be determined?',
    options: [
      'Measurement only',
      'Calculation only',
      'Calculation, measurement, enquiry or inspection',
      'Enquiry to the DNO only — measurement is informative',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 313.1 reads: "the earth fault loop impedance of that part of the system external to the installation, Ze, shall be determined by calculation, measurement, enquiry or inspection". On an existing installation we typically measure it; the DNO declared value is the enquiry route used at design stage when no installation exists yet.',
  },
  {
    id: 2,
    question:
      'Where between the meter and the consumer unit do you take the Ze probes for a measurement-method Ze test?',
    options: [
      'Between L at the consumer unit incomer and the means of earthing (intake earth terminal / earthing conductor at the MET) — with the installation main earthing conductor disconnected from the MET, or using the meter no-disconnect mode',
      'Between L at the meter tails and N at the meter tails',
      'Between L at the consumer unit incomer and any bonded extraneous-conductive-part',
      'Between L and the circuit protective conductor of any final circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Ze is the external earth fault loop impedance only — that is the L conductor through the supply and back via the means of earthing. To measure it, the installation must be electrically removed from the loop, either physically by disconnecting the earthing conductor at the MET (with the supply isolated for the brief moment that requires) or, on modern testers, by using a no-disconnect / supply-side mode that achieves the same isolation electronically.',
  },
  {
    id: 3,
    question:
      'You are about to physically disconnect the main earthing conductor at the MET to take a Ze reading. Reg 643 requires the rest of the installation to be in what state during that disconnection?',
    options: [
      'Energised throughout — Ze must always be measured on a live installation',
      'Energised but with every RCD tripped before the earthing conductor is lifted',
      'There is no requirement — the earthing conductor can be lifted at any time',
      'Isolated and proved dead at the consumer unit before the earthing conductor leaves the MET',
    ],
    correctAnswer: 3,
    explanation:
      'A live installation with the earthing conductor lifted is a touch-voltage trap. Isolate the consumer unit main switch, prove dead, and only then break the earthing conductor at the MET. Reconnect the earthing conductor before re-energising. Modern multifunction testers with a no-disconnect Ze mode bypass the physical break entirely — that is the safer default.',
  },
  {
    id: 4,
    question:
      'A supply at the origin reads Ze = 0.27 Ω. Which earthing arrangement is the most likely match without further information?',
    options: [
      'TT — earth electrode return path',
      'TN-S — separate earth conductor from the substation',
      'TN-C-S (PME) — combined PEN return path',
      'IT — isolated source',
    ],
    correctAnswer: 2,
    explanation:
      'Typical TN-C-S (PME) Ze sits in the 0.20–0.35 Ω band because the PEN conductor doubles as the earth return and runs in parallel with the line conductor for the entire LV distribution. TN-S is typically 0.35–0.8 Ω, TT is normally well above 1 Ω and depends entirely on the installation electrode resistance.',
  },
  {
    id: 5,
    question: 'On a TT supply, why does a measured Ze of 80 Ω not, on its own, indicate a fault?',
    options: [
      'Because the loop returns through the installation electrode, so compliance is judged on RCD operation, not TN-style Ze bands',
      'Because the value of Ze on a TT installation is irrelevant to disconnection compliance',
      'Because TT supplies do not form a continuous earth fault loop back to source at all',
      'Because Ze on a TT installation is always calculated from rod length, never measured',
    ],
    correctAnswer: 0,
    explanation:
      'On TT, the earth fault current loop includes the earth return path through the installation electrode and the general mass of earth. The 80 Ω is the electrode-plus-earth resistance — high by TN standards, normal for a domestic rod. Disconnection on TT relies on the RCD, and Reg 411.5.3 / Table 41.5 set the loop impedance limits the RCD must operate within.',
  },
  {
    id: 6,
    question:
      'You measure Ze with the main earthing conductor disconnected and read 0.18 Ω. You reconnect the earthing conductor and re-measure between L and the MET — the reading is 0.11 Ω. What does the difference reveal?',
    options: [
      'The meter is faulty and both readings should be discarded and retaken with new leads',
      'Either reading is valid — record the lower of the two as the more favourable Ze',
      'The 0.18 Ω is the parallel path and the 0.11 Ω is the true external Ze to record',
      'The 0.11 Ω is the parallel-path reading; the 0.18 Ω is the true Ze for verification',
    ],
    correctAnswer: 3,
    explanation:
      'With the earthing conductor reconnected, the bonded extraneous parts (gas, water, structural steel) sit in parallel with the supply earth. That parallel combination always reads lower than the true external impedance. A genuine Ze for design and verification is the value with parallel paths electrically removed — disconnected method or no-disconnect tester mode.',
  },
  {
    id: 7,
    question:
      'You ring the DNO and they declare a maximum Ze of 0.35 Ω for the TN-C-S supply. You measure 0.42 Ω. What is the right next step?',
    options: [
      'Use 0.35 Ω because the DNO declared figure is the contractual source of truth',
      'Use the lower of the two readings as the more favourable value for design',
      'Investigate — a measurement above the declared maximum points to a degraded supply earth; raise with the DNO and record the measured value',
      'Ignore the discrepancy — 0.07 Ω is well within normal EFLI meter tolerance',
    ],
    correctAnswer: 2,
    explanation:
      'A measured Ze above the DNO declared maximum is a flag, not a tolerance issue. The DNO maximum is a contractual commitment about supply earth quality. An above-max reading either means the supply earth has degraded since installation or the declared figure is wrong for that feeder. Either way the conversation is with the DNO before the certificate is signed.',
  },
  {
    id: 8,
    question:
      'Reg 313.1 requires Ze to be recorded. Where on the A4:2026 model forms does that recorded Ze appear?',
    options: [
      'Electrical Installation Certificate (or EICR) — Supply Characteristics box, with PSCC and the type/rating of the origin protective device',
      'Schedule of Test Results, in the R1+R2 column',
      'Schedule of Inspections only',
      'Nowhere — Ze is informative and is not recorded',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 313.1 lists Ze alongside nominal voltage, nature of current/frequency, prospective short-circuit current, suitability for maximum demand, and the type and rating of the origin protective device. All of these are entered in the Supply Characteristics block at the top of the EIC / EICR. Circuit-level Zs goes on the Schedule of Test Results — Ze is the supply-level record.',
  },
  {
    id: 9,
    question:
      'A no-disconnect Ze test on a multifunction tester gives a reading. What is the meter actually doing internally that lets it measure Ze without your having to lift the earthing conductor?',
    options: [
      'Drawing a heavy fault current to earth and measuring the resulting voltage drop across the loop',
      'Physically disconnecting the earthing conductor electronically via a relay inside the meter body',
      'Measuring resistance only on a dead, isolated circuit — there is no live test involved at all',
      'Comparing two precise loop measurements and subtracting the installation contribution, using accurate voltage sensing',
    ],
    correctAnswer: 3,
    explanation:
      "No-disconnect / hi-current / Confirm-style Ze modes work by combining two precisely sequenced loop measurements and using the meter's voltage reference to back-calculate Ze without the operator manually breaking the earthing conductor. The advantage is safety; the user never has the installation live with no installation earth. Always read the manufacturer guidance for the specific mode, because the disconnection assumption (parallel paths) still applies.",
  },
  {
    id: 10,
    question:
      'After taking a measurement-method Ze, you forget to reconnect the main earthing conductor before re-energising the consumer unit. What is the worst-case outcome and what is the procedural fix?',
    options: [
      'Nothing — the main bonding still provides an adequate return path to source',
      'The MET is left floating, so a fault may not disconnect in time; fix by making earth-reconnect a tick-box pre-energisation step',
      'The RCD compensates for the missing earth and disconnects on the next fault anyway',
      'Bonding alone disconnects the supply on a fault, so the lifted earth is harmless',
    ],
    correctAnswer: 1,
    explanation:
      'Leaving the earthing conductor lifted is the classic Ze-test failure mode. Bonding ties extraneous metalwork to the MET, but with no return to source the MET is not at earth potential during a fault. The procedural mitigation is twofold: a high-visibility tag on the lifted conductor end, and earth-reconnect as a tick-box step on the test record before any breaker is closed. Better still, default to no-disconnect Ze mode on the tester.',
  },
];

const InspectionTestingModule5Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Ze testing at origin | I&T Module 5.3 | Elec-Mate',
    description:
      'Reg 313.1: external earth fault loop impedance at the supply origin. The disconnect vs no-disconnect method, typical TN-S / TN-C-S / TT bands, DNO declared values vs measured, and the Supply Characteristics record on A4:2026 model forms.',
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
            eyebrow="Module 5 · Section 3"
            title="Ze testing at origin"
            description="The external earth fault loop impedance, measured at the supply intake. The disconnect-and-measure method, the no-disconnect alternative, and what each typical band tells you about the supply you are working on."
            tone="yellow"
          />

          <TLDR
            points={[
              'Ze is the impedance of the earth fault loop external to the installation — L through the supply transformer and back via the means of earthing. It must be determined by calculation, measurement, enquiry or inspection (Reg 313.1) and recorded in the Supply Characteristics block of the EIC / EICR.',
              'Measurement is taken at the supply origin between L (at the consumer unit incomer or meter tails) and the means of earthing (intake earth terminal on TN-S / TN-C-S, or installation electrode on TT) — with the main earthing conductor temporarily disconnected from the MET, or with the meter in no-disconnect / supply-side Ze mode.',
              'Typical bands: TN-S 0.35–0.8 Ω, TN-C-S (PME) 0.20–0.35 Ω, TT > 1 Ω (usually 20–200 Ω, dominated by the installation electrode resistance). A reading well outside the band for the declared system is a flag — investigate before recording.',
              'Disconnect-method Ze: isolate the consumer unit, prove dead, lift the earthing conductor at the MET, measure, refit. No-disconnect Ze: meter does the isolation electronically, faster and safer for routine work — but read the manufacturer guidance for the parallel-path assumption.',
              'On TT, Ze on its own does not prove disconnection. Compliance is judged against RCD operation: Ra × IΔn ≤ 50 V (Reg 411.5.3) and Table 41.5 max Zs values for the RCD rating.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State exactly what Ze is, where Reg 313.1 puts it in the supply-characteristics duty, and how it relates to Zs',
              'Describe both the disconnect-method and the no-disconnect-method Ze test, including the safety steps that make each one routine',
              'Read a Ze value against the typical band for TN-S, TN-C-S and TT — and identify the most common reasons a supply reads outside its band',
              'Reconcile a measured Ze with the DNO declared value, and decide when the discrepancy is meter tolerance and when it is a real defect',
              'Record Ze correctly in the Supply Characteristics block of the A4:2026 EIC / EICR, alongside PSCC and the type/rating of the origin protective device',
              'Recognise where parallel earth paths bias a Ze measurement low and how to design the test to remove that bias',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 313.1 — the supply characteristics duty"
            plainEnglish="Before any installation work is verified or signed off, the supply has to be characterised. Reg 313.1 lists the things that must be ascertained — Ze is one of them. The regulation does not specify how, only that the value must be determined by calculation, measurement, enquiry or inspection."
            onSite="Treat Reg 313.1 as a checklist at the start of every EIC and EICR. The Supply Characteristics block at the top of the certificate is the regulation rendered as a form. If a box on that block is empty, you have not finished the duty."
          >
            <p>
              Reg 313.1 in BS&nbsp;7671:2018+A4:2026 sets out the supply characteristics that must
              be ascertained for an external supply (and determined for a private source) before
              design and verification: nominal voltage, nature of current and frequency, prospective
              short-circuit current, the external earth fault loop impedance Ze, suitability for the
              maximum demand, and the type and rating of the origin protective device. Ze is one of
              six items on that list — a peer of nominal voltage, not an afterthought.
            </p>
            <p>
              The regulation deliberately offers four routes to determining Ze: calculation,
              measurement, enquiry or inspection. At design stage on an installation that does not
              yet exist physically, enquiry to the Distribution Network Operator gives a declared
              maximum value to design against. On an existing installation undergoing periodic
              inspection or alteration, measurement at the origin is the default — the declared
              value goes on the certificate as a cross-check, not as the primary record.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 313.1"
            clause={
              <>
                The earth fault loop impedance of that part of the system external to the
                installation, Ze, shall be determined by calculation, measurement, enquiry or
                inspection.
              </>
            }
            meaning="Ze is a deliverable, not an opinion. The regulation lists four valid routes — pick the one appropriate to the stage and the evidence available, and record the value on the certificate. Measurement is the verification gold standard for an existing installation; the DNO declared value is the design-stage answer."
          />

          <ConceptBlock
            title="Where Ze sits in the loop"
            plainEnglish="Earth fault loop impedance is the round-trip resistance a fault current sees from L, through the protective device, through the cable to the fault, through the protective conductor back to the MET, through the earthing conductor to the means of earthing, and back to source. Ze is everything outside the installation — the bit you do not own."
            onSite="Drawing the loop on the back of a job sheet for the apprentice is the clearest way to teach what Ze is. The full loop is Zs; the bit before the meter and the bit after the meter on the source side is Ze; the bit inside the installation is R1 + R2. They add: Zs ≈ Ze + R1 + R2."
          >
            <p>
              Inside the installation, the loop comprises the line conductor of the circuit (R1) and
              the protective conductor of the circuit (R2). At the MET, the loop continues into the
              earthing conductor and out of the installation. Everything from the MET outward — the
              supply cable, the substation transformer winding, and the earth / neutral / PEN return
              path back to source — is the external earth fault loop, with impedance Ze.
            </p>
            <p>
              The point of measuring Ze is twofold. First, it is the supply-characteristic record
              required by Reg&nbsp;313.1 and forms part of the certificate. Second, it is the term
              you add to R1+R2 (corrected to operating temperature) to predict Zs for any circuit on
              the installation: <strong>Zs ≈ Ze + R1 + R2</strong>. That predicted Zs is then the
              figure you compare against the Table&nbsp;41 / A4 max-permitted-Zs limit — which
              Section&nbsp;5.4 covers in detail.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The two methods, side by side</ContentEyebrow>

          <ConceptBlock
            title="Method A — disconnect the main earthing conductor and measure"
            plainEnglish="Isolate the consumer unit. Prove dead. Disconnect the main earthing conductor at the MET. Connect the meter between L (at the consumer unit incomer or meter tails) and the now-disconnected earthing conductor end (which still goes to the means of earthing). Energise. Take the loop reading. Re-isolate. Refit the earthing conductor. Re-energise."
            onSite="Method A is the bedrock procedure that all the others descend from. Use it when the meter does not have a no-disconnect mode, when you want a known-good baseline, or when you suspect parallel earth paths and need to remove them physically."
          >
            <p>The full Method&nbsp;A workflow is:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Isolate the consumer unit at the main switch and lock off. Prove dead at the
                outgoing side of the main switch.
              </li>
              <li>
                With the installation dead, disconnect the main earthing conductor at the MET. Tag
                the lifted end with a high-visibility marker so it cannot be accidentally left
                adrift after the test.
              </li>
              <li>
                Connect the EFLI tester between L (consumer unit incomer or meter tails) and the end
                of the earthing conductor that still goes out to the means of earthing — the intake
                earth terminal on TN-S / TN-C-S, or the installation electrode on TT.
              </li>
              <li>
                Re-energise the supply (the consumer unit main switch can stay off — the test only
                needs the source side live). Take the Ze reading. Most testers integrate the result
                over a few cycles; allow the meter to settle before recording.
              </li>
              <li>
                De-energise / isolate again. Refit the earthing conductor at the MET. Confirm the
                connection is mechanically sound and electrically continuous (continuity check from
                MET to incoming earthing conductor). Remove the high-visibility tag only after the
                conductor is back home.
              </li>
              <li>
                Re-energise normally. Record the Ze value on the certificate Supply Characteristics
                block.
              </li>
            </ol>
            <p>
              The reason the regulation requires the earthing conductor to be lifted is to
              electrically remove the installation from the loop. With the conductor in place, the
              meter sees Ze in parallel with every bonded extraneous part — gas, water, structural
              steel — and reads a value lower than the true external impedance. A parallel-paths
              reading is fine as a sanity check, but it is not Ze.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Definition (Part 2)"
            clause={
              <>
                Ze is defined here as &lsquo;the earth fault loop impedance of that part of the
                system external to the installation&rsquo;. Regulation 313.1 requires Ze to be
                determined for the external supply as part of supply characteristic assessment.
              </>
            }
            meaning="The clue is in the definition. External to the installation. Anything inside the installation — line conductors, CPCs, supplementary bonds, parallel earth paths via bonded metalwork — is not Ze and must be removed from the loop before the value you record can be called Ze."
          />

          <ConceptBlock
            title="Method B — no-disconnect / supply-side mode on a modern multifunction tester"
            plainEnglish="Modern multifunction testers (Megger MFT, Fluke 1664/1665, Metrel MI 3155 / EurotestXC, Kewtech KT70, Martindale TPL series, etc.) include a Ze mode that does not require the earthing conductor to be lifted. The meter performs two precisely sequenced loop measurements internally and back-calculates Ze using its voltage-sensing reference. The result is a measurement-method Ze without the safety hazard of working on a live installation with the earth lifted."
            onSite="Use no-disconnect Ze as the default for routine work. Use Method A when the no-disconnect mode is unavailable, when you suspect parallel paths and want to remove them physically, or when you are commissioning a new origin and want a baseline that no firmware quirk can challenge."
          >
            <p>
              The mechanism behind no-disconnect Ze varies by manufacturer, but all modern
              implementations share the same principle: the meter takes one loop measurement with
              one current path active and a second with another, using a precise low-current
              comparison and the meter&rsquo;s sense leads to subtract the installation
              contribution. The user-facing experience is a single button press that yields a Ze
              reading without breaking the earthing conductor.
            </p>
            <p>
              Two cautions apply. First, the parallel-path assumption is still alive. If the
              installation has very low-impedance bonding to a large structural earth or to a shared
              external mass (e.g. multiple installations bonded together via a common service
              trench), the no-disconnect mode may not fully isolate the installation contribution
              and the reading can sit slightly low. Second, no-disconnect modes are calibrated for
              clean sinusoidal supplies; on supplies with heavy harmonic distortion or significant
              DC content (rare but possible behind some inverters), the algorithm can misread. When
              in doubt, fall back to Method&nbsp;A and compare.
            </p>
          </ConceptBlock>

          {videos.zeTest && (
            <div className="my-6">
              <VideoCard
                {...videos.zeTest}
                topic="A real Ze measurement walked end-to-end on a single-phase domestic supply"
                caption="Craig Wiltshire works through a Ze test at the origin: where the probes go, what to do with the main earthing conductor, what a typical TN-C-S reading looks like, and how the value feeds the certificate."
              />
            </div>
          )}

          {/* Ze test setup diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Ze test at origin — meter probes, isolation point, typical reading bands
            </h4>
            <svg
              viewBox="0 0 800 420"
              className="w-full h-auto"
              role="img"
              aria-label="Ze test setup at origin. The earthing conductor is disconnected at the MET. The EFLI tester is connected between L at the consumer unit incomer and the means of earthing. The diagram shows typical reading bands by supply type."
            >
              {/* DNO supply box */}
              <rect
                x="30"
                y="30"
                width="160"
                height="120"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="110"
                y="52"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="11"
                fontWeight="bold"
              >
                DNO SUPPLY
              </text>
              <text x="110" y="68" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (transformer + service cable)
              </text>
              <line
                x1="110"
                y1="80"
                x2="110"
                y2="105"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
                strokeDasharray="3,2"
              />
              <text x="110" y="125" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                External loop ≈ Ze
              </text>

              {/* Cut-out + meter */}
              <rect
                x="220"
                y="40"
                width="120"
                height="50"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="280"
                y="60"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="10"
                fontWeight="bold"
              >
                Cut-out / fuse
              </text>
              <text x="280" y="75" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                + meter
              </text>

              {/* Consumer unit / MET */}
              <rect
                x="380"
                y="30"
                width="180"
                height="180"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="470"
                y="52"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="11"
                fontWeight="bold"
              >
                CU / MET
              </text>
              <text x="470" y="68" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (main switch OFF, locked)
              </text>

              {/* L incomer */}
              <rect
                x="395"
                y="90"
                width="40"
                height="22"
                rx="4"
                fill="rgba(239,68,68,0.1)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="415"
                y="105"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                L
              </text>
              {/* MET earth bar */}
              <rect
                x="395"
                y="160"
                width="120"
                height="22"
                rx="4"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="455"
                y="175"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                MET (earth bar)
              </text>

              {/* Earthing conductor — shown lifted */}
              <line x1="335" y1="170" x2="395" y2="170" stroke="#22C55E" strokeWidth="2" />
              <text
                x="305"
                y="160"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                ⚠ DISCONNECTED
              </text>
              <text x="305" y="190" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                main earthing conductor
              </text>
              <line x1="335" y1="170" x2="328" y2="165" stroke="#FBBF24" strokeWidth="1.5" />
              <line x1="335" y1="170" x2="328" y2="175" stroke="#FBBF24" strokeWidth="1.5" />

              {/* Means of earthing */}
              <rect
                x="220"
                y="160"
                width="80"
                height="40"
                rx="6"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />
              <text
                x="260"
                y="178"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                Means of
              </text>
              <text
                x="260"
                y="192"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                earthing
              </text>

              {/* EFLI tester below */}
              <rect
                x="380"
                y="270"
                width="180"
                height="80"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="470"
                y="295"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                EFLI TESTER
              </text>
              <text x="470" y="312" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Reading = Ze
              </text>
              <text x="470" y="328" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (no-disconnect mode optional)
              </text>

              {/* Probe — L */}
              <line x1="415" y1="112" x2="415" y2="270" stroke="#EF4444" strokeWidth="2" />
              <circle cx="415" cy="270" r="4" fill="#EF4444" />
              <text x="380" y="245" textAnchor="end" fill="#EF4444" fontSize="9" fontWeight="bold">
                probe → L
              </text>

              {/* Probe — earth */}
              <line x1="525" y1="182" x2="525" y2="270" stroke="#22C55E" strokeWidth="2" />
              <circle cx="525" cy="270" r="4" fill="#22C55E" />
              <text
                x="540"
                y="245"
                textAnchor="start"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                probe → MET
              </text>

              {/* Bands box */}
              <rect
                x="600"
                y="30"
                width="180"
                height="320"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
              <text
                x="690"
                y="52"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="11"
                fontWeight="bold"
              >
                TYPICAL Ze BANDS
              </text>

              <rect
                x="615"
                y="80"
                width="150"
                height="60"
                rx="6"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1"
              />
              <text
                x="690"
                y="100"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                TN-C-S (PME)
              </text>
              <text x="690" y="118" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11">
                0.20 – 0.35 Ω
              </text>
              <text x="690" y="133" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                PEN return path
              </text>

              <rect
                x="615"
                y="155"
                width="150"
                height="60"
                rx="6"
                fill="rgba(59,130,246,0.08)"
                stroke="#3B82F6"
                strokeWidth="1"
              />
              <text
                x="690"
                y="175"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="11"
                fontWeight="bold"
              >
                TN-S
              </text>
              <text x="690" y="193" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11">
                0.35 – 0.8 Ω
              </text>
              <text x="690" y="208" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                separate earth conductor
              </text>

              <rect
                x="615"
                y="230"
                width="150"
                height="80"
                rx="6"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1"
              />
              <text
                x="690"
                y="250"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                TT
              </text>
              <text x="690" y="268" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11">
                &gt; 1 Ω (typ. 20–200 Ω)
              </text>
              <text x="690" y="283" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                installation electrode
              </text>
              <text x="690" y="298" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                + general mass of earth
              </text>

              {/* Footer note */}
              <rect
                x="30"
                y="370"
                width="750"
                height="40"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="405" y="388" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Reg 313.1 — record Ze in the Supply Characteristics block of the EIC / EICR
              </text>
              <text
                x="405"
                y="403"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Zs ≈ Ze + R1 + R2 (carry the value into circuit Zs verification)
              </text>
            </svg>
          </div>

          <Scenario
            title="A typical TN-C-S domestic — measured 0.21 Ω, declared 0.35 Ω"
            situation="Single-phase TN-C-S supply, 100 A cut-out, modern domestic consumer unit. DNO declared Ze maximum is 0.35 Ω. You take a no-disconnect Ze reading at the consumer unit incomer and read 0.21 Ω. The reading is well inside the typical band and well inside the declared maximum."
            whatToDo="Record 0.21 Ω in the Supply Characteristics block alongside the declared 0.35 Ω. The cross-check tells the next inspector both numbers — useful when periodic testing in three or five years shows drift. Move on to PSCC and the type/rating of the origin protective device, then to circuit-level testing."
            whyItMatters="A clean Ze on a TN-C-S supply is the start of the certificate, not the end. The declared maximum is a contractual ceiling; the measured value is the today reading. Recording both gives you a baseline if the supply ever degrades and an inspector calls you back two years later asking why a circuit Zs has crept up."
          />

          <Scenario
            title="A TN-S supply that reads 1.4 Ω"
            situation="Old terraced house, paper-insulated lead-sheathed (PILC) service cable to a wiped lead joint at the cut-out. The supplier states it is a TN-S supply. You take a Method A Ze reading and get 1.4 Ω. That is well outside the typical 0.35–0.8 Ω TN-S band."
            whatToDo="Stop. Do not sign off the certificate against this Ze. Likely causes: degraded lead sheath / paper-insulated service cable, corroded wiped joint at the cut-out, broken bond at a substation neutral-earth point, or the supply has been silently re-categorised. Raise it with the DNO and ask for a service inspection. In the meantime, the measured Ze is what you record — do not write the declared value over a measured fail."
            whyItMatters="A high TN-S Ze means a degraded supply earth, and on a TN system the supply earth is the protective measure. The next L–earth fault on this installation may not disconnect within 0.4 s because the loop impedance has already eaten the headroom. The DNO call is not optional."
          />

          <Scenario
            title="A TT supply with a 95 Ω measured Ze"
            situation="Rural property on a TT supply with a single rod electrode in dry chalk soil. You measure Ze and read 95 Ω. The 30 mA RCD trip-tests passed. You are about to sign off."
            whatToDo="On TT, the disconnection compliance question is RCD-driven, not overcurrent-driven. Apply the Reg 411.5.3 / Table 41.5 test: at IΔn = 30 mA, the maximum permitted Zs from Table 41.5 is 1667 Ω. 95 Ω comfortably meets that. Also confirm Ra × IΔn ≤ 50 V — at Ra ≈ 95 Ω and IΔn = 0.03 A, the touch voltage figure is 2.85 V, well below 50 V. Both compliance routes pass; record 95 Ω in Supply Characteristics."
            whyItMatters="High Ze on TT is normal. Applying the TN compliance lens to a TT installation either fails it spuriously or, worse, prompts a designer to chase Ze down with electrode work that has no real safety benefit. Read the system before reading the value."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The four supply types and what their Ze tells you</ContentEyebrow>

          <ConceptBlock
            title="TN-S — separate metallic earth conductor from the substation"
            plainEnglish="The supply provides a dedicated metallic earth conductor (typically the lead sheath of an older PILC service cable, or a separate conductor in a modern service cable) bonded to the star point at the substation. Ze is dominated by the impedance of that earth path back to source."
          >
            <p>
              Typical TN-S Ze sits in the 0.35–0.8&nbsp;Ω band. The lower end is a short modern
              service cable to a substation a few hundred metres away; the upper end is a long run
              with an older cable. The OSG and GN3 traditionally cite 0.8&nbsp;Ω as the assumed
              typical maximum for design purposes — that is the value behind the
              maximum-circuit-length tables (e.g. OSG Table 7.1(ii)) when a designer chooses to size
              circuits without explicit Zs calculation.
            </p>
            <p>
              When the measured TN-S Ze exceeds the typical band, the suspect chain is: degraded
              lead sheath (PILC corrosion), broken or corroded joint at the cut-out, faulty
              substation neutral-earth bond, or — increasingly common — a TN-S supply that has been
              silently re-presented as TN-C-S after substation refurbishment but still looks like
              TN-S to the customer. Confirm with the DNO before recording.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="TN-C-S (PME / PNB) — combined neutral-and-earth on the supply side"
            plainEnglish="The supply provides a single combined neutral-and-earth conductor (PEN) on the LV distribution. Inside the cut-out, the PEN splits into the consumer&rsquo;s separate N and PE. The PEN runs in parallel with the line conductor for the entire LV distribution, which gives a very low loop impedance."
          >
            <p>
              Typical TN-C-S Ze sits in the 0.20–0.35&nbsp;Ω band — the 0.35&nbsp;Ω figure is the
              conventional declared maximum used in OSG Table&nbsp;7.1(ii) for TN-C-S without
              calculation. Most modern PME supplies in built-up areas read 0.15–0.25&nbsp;Ω in
              service.
            </p>
            <p>
              The A4:2026 amendment adds an explicit prohibition that no switching or isolating
              device shall be inserted in a PEN conductor (Reg&nbsp;411.4.3 addition). That is not a
              Ze test issue per se, but it is worth flagging during a PME Ze test: anything that
              looks like a switch or fuse on the PEN side of the cut-out is a non-compliance that
              the DNO needs to know about.
            </p>
            <p>
              When TN-C-S Ze drifts upward, the suspect chain is similar to TN-S — corroded joints
              in the service cable, a high-resistance crimp at the cut-out — plus the PME-specific
              risk of a broken PEN conductor in the LV network. A broken PEN can produce a Ze that
              drifts wildly with neighbouring load (because the meter sees return current via every
              other consumer&rsquo;s earthing system), and is the technical reason for the PME
              hazard warnings around EV charging supplies and caravan / boat installations.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="TT — installation earth electrode, no metallic earth from the DNO"
            plainEnglish="The DNO does not provide a means of earthing. The installation has its own earth electrode (typically a rod in soil) and Ze is dominated by the resistance of that electrode plus the general mass of earth. Disconnection on a TT installation cannot rely on overcurrent devices — Reg 411.4 / Table 41 limits are unachievable — so RCDs do the work, and Reg 411.5 / Table 41.5 set the loop impedance limits."
          >
            <p>
              Typical TT Ze: more than 1&nbsp;Ω, usually 20–200&nbsp;Ω depending on rod length, soil
              composition, and moisture. Compliance is judged not against the TN-style 0.35 /
              0.8&nbsp;Ω bands but against two parallel tests:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Ra × IΔn ≤ 50&nbsp;V</strong> (Reg&nbsp;411.5.3) — where Ra is the
                resistance of the earth electrode plus the protective conductor connecting it to the
                exposed-conductive-parts, and IΔn is the rated residual operating current of the
                RCD. For a 30&nbsp;mA RCD, this allows Ra up to ≈&nbsp;1666&nbsp;Ω, a limit no
                domestic electrode in the UK fails.
              </li>
              <li>
                <strong>Zs ≤ Table&nbsp;41.5 maximum for the RCD rating</strong> — Table&nbsp;41.5
                lists the loop impedance ceilings: 30&nbsp;mA → 1667&nbsp;Ω, 100&nbsp;mA →
                500&nbsp;Ω, 300&nbsp;mA → 167&nbsp;Ω, 500&nbsp;mA → 100&nbsp;Ω.
              </li>
            </ul>
            <p>
              In practice, both tests pass on essentially every domestic TT installation with a
              functioning electrode, because the RCD limits are very generous. The reason TT Ze gets
              rejected is electrode degradation: a rusted clamp, a buried connection gone
              open-circuit, or a rod driven into hardcore that never made proper soil contact in the
              first place.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.5.3 (TT and RCDs)"
            clause={
              <>
                Where an RCD is used for fault protection, the following conditions shall be
                fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2
                or 411.3.2.4; and (b) Ra × IΔn ≤ 50 V where Ra is the sum of the resistances of the
                earth electrode and the protective conductor connecting it to the
                exposed-conductive-parts (in ohms) and IΔn is the rated residual operating current
                of the RCD. The circuit meets the regulation if Zs meets Table 41.5 requirements.
              </>
            }
            meaning="On TT, Ze on its own is not the compliance answer. Two parallel routes — Ra × IΔn ≤ 50 V, or Zs ≤ Table 41.5 — establish whether the RCD will operate to disconnect within the required time. A high TT Ze that satisfies either route is a compliant system, not a defect."
          />

          <ConceptBlock
            title="IT — isolated source, no direct connection to earth"
            plainEnglish="IT systems are rare in UK general installations and almost exclusively appear in medical and industrial special locations. There is no intentional connection between live parts and earth; the system relies on insulation monitoring and a controlled second-fault response. Ze is not the relevant parameter — insulation monitor calibration is."
          >
            <p>
              For completeness: on IT systems the earth fault current loop includes the earth return
              path via electrodes, but a first earth fault does not produce significant fault
              current because the source is isolated. Reg&nbsp;411.6 governs IT systems; Ze appears
              in the supply characteristics block but does not drive disconnection compliance the
              way it does on TN. If you are commissioning a medical IT system (Reg&nbsp;710), the
              relevant tests are insulation monitor function, isolation transformer compliance, and
              the second-fault limits — not a TN-style Ze read.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>DNO declared values vs measured</ContentEyebrow>

          <ConceptBlock
            title="The two numbers and what each one is for"
            plainEnglish="At design stage, you ring the DNO (or look up the published declared value for the area) and design against that. At verification, you measure. The two numbers do different jobs and both belong on the certificate."
            onSite="The declared value is a guarantee the DNO makes about the supply — the worst case under normal operating conditions. The measured value is the today reading. They will rarely agree to two decimal places, and that is fine: declared ≥ measured is the normal compliant case."
          >
            <p>
              Declared values come in two flavours. The DNO publishes typical maxima for each
              earthing arrangement in their area (for example, &ldquo;TN-C-S supplies in this
              network are declared at 0.35&nbsp;Ω maximum&rdquo;), and on enquiry will provide the
              specific declared maximum for a feeder or service. At design stage on a new
              installation, the declared value is the input to circuit-length and Zs design
              calculations — you do not have an installation to measure yet.
            </p>
            <p>
              At verification, the measured value is what you put in the Supply Characteristics
              block. Best practice is to also note the declared value alongside, either in the same
              field with a slash (e.g. <em>0.21 / 0.35 Ω</em>) or in the comments. That gives the
              next inspector both numbers — invaluable for spotting drift over a five-year periodic
              interval.
            </p>
            <p>Three rules of thumb for reconciling the two numbers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Measured ≤ declared:</strong> normal. The declared is a worst-case ceiling;
                in service the supply usually has more headroom than that. Record both, move on.
              </li>
              <li>
                <strong>Measured slightly above declared (within meter tolerance):</strong> meter
                tolerance plus genuine network drift. EFLI testers commonly have an accuracy spec
                around ±5&nbsp;% + a few digits. A 0.36&nbsp;Ω measurement against a 0.35&nbsp;Ω
                declared on a typical meter is within tolerance.
              </li>
              <li>
                <strong>Measured significantly above declared:</strong> investigation flag. Either
                the supply has degraded since installation or the declared figure is wrong for that
                feeder. Raise with the DNO; record the measured value; annotate the certificate.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Recording the declared value over the measured value"
            whatHappens="You measure 0.42 Ω on a TN-C-S supply, the declared maximum is 0.35 Ω, and you write 0.35 Ω on the certificate because &lsquo;that is what the DNO said&rsquo;. The defect is now invisible to the next inspector. Two years later, a circuit Zs comes back high and nobody has the data to say whether the supply has degraded or the original install was always marginal."
            doInstead="Always record the measured value. The declared value is a cross-check, not a substitute. If the measured exceeds the declared, that is the certificate&rsquo;s job to flag — not yours to bury. Note the discrepancy in the comments and raise it with the DNO before sign-off; the certificate is your contemporaneous record of supply condition."
          />

          <CommonMistake
            title="Leaving the main earthing conductor lifted while the installation is energised"
            whatHappens="You finish the Ze reading, get distracted, and re-energise the consumer unit before refitting the earthing conductor. The MET is now floating. A line-to-exposed-conductive-part fault elsewhere in the installation no longer has a low-impedance return path; the protective device may not operate within Reg 411.3.2 disconnection times, and exposed metalwork can sit at supply voltage. Bonding alone does not save you — bonding without earthing only equalises potential between extraneous parts; it does not provide a return to source."
            doInstead="Two layers of mitigation. (1) Default to a no-disconnect Ze mode on the meter; the conductor never leaves the MET. (2) When Method A is unavoidable, write earthing-conductor-reconnect into the test record as a discrete pre-energisation tick-box, and tag the lifted end with a high-visibility marker that has to be physically removed before the conductor is refitted."
          />

          <CommonMistake
            title="Reading parallel-paths Ze and treating it as the real value"
            whatHappens="You forget to disconnect the earthing conductor and take a Ze reading with the installation fully connected. The meter reads 0.11 Ω on a TN-C-S supply where the declared is 0.35 Ω. The number looks excellent. It is the parallel combination of the true Ze and every bonded extraneous part — gas, water, structural steel — and it bears no relation to the supply earth quality. Record it and the certificate is wrong; use it to verify a tight Zs design and you have under-counted the loop impedance."
            doInstead="If the meter has a no-disconnect Ze mode, use it — it does the parallel-path removal electronically. If not, lift the earthing conductor at the MET (with the consumer unit isolated and dead) and measure with the installation electrically removed from the loop. A Ze reading without that isolation is a bonded-loop reading, not a Ze."
          />

          <SectionRule />

          <ContentEyebrow>The meter, the operator, and the safety chain</ContentEyebrow>

          <ConceptBlock
            title="Choosing and using the EFLI tester"
            plainEnglish="The instrument is named in GN3 as the EFLI (earth fault loop impedance) tester — usually the loop-impedance function of a multifunction tester. Its measurement currents are higher than a continuity tester (so the readings are valid under realistic fault-style conditions) but lower than a fault. Read the manufacturer manual for the specific Ze mode you are about to use; not all are equivalent."
          >
            <p>
              GN3 Reg 4.5 and the OSG identify the EFLI tester as the instrument for Ze. The key
              specifications to check on a meter you have not used before:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Accuracy at the low end:</strong> on a TN-C-S supply you are reading
                0.20&nbsp;Ω. A meter spec of <em>±5&nbsp;% + 3 digits</em> on a 0.03&nbsp;Ω reading
                could give a result anywhere from 0 to 0.06&nbsp;Ω. For Ze on a modern PME supply,
                you want a meter that resolves to 0.01&nbsp;Ω with sub-percent accuracy in that
                range.
              </li>
              <li>
                <strong>Test current and RCD interaction:</strong> high-current loop tests can trip
                30&nbsp;mA RCDs and even some sensitive 6&nbsp;A Type&nbsp;B MCBs. Most modern
                meters have a low-current or no-trip Ze mode that resolves this; make sure it is
                selected on RCD-protected origins.
              </li>
              <li>
                <strong>Calibration date:</strong> EFLI testers should be calibrated to the
                manufacturer&rsquo;s recommended interval (typically annual). An out-of-cal meter is
                the start of every &ldquo;why does my Ze not match the next inspector&rsquo;s
                reading&rdquo; investigation.
              </li>
              <li>
                <strong>Mains lead condition:</strong> the meter leads are a common source of error.
                Worn fingers, broken probes, scuffed insulation around the prod tip — replace before
                testing. Lead resistance does not enter the Ze reading the way it enters a
                low-resistance ohms reading, but a poor probe contact does.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The safety chain — isolation, prove dead, lock off, test, restore"
            plainEnglish="A Ze test is one of the few routine I&T procedures that requires the operator to handle live conductors at the supply origin. The safety chain is non-negotiable. Treat the meter as the last layer; the procedural steps are what keep you alive."
          >
            <p>The chain, applied to Method A:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Isolate</strong> the consumer unit at the main switch. Lock off; key in
                pocket.
              </li>
              <li>
                <strong>Prove dead</strong> at the outgoing side of the main switch with a GS38
                voltage indicator — ideally a two-pole tester proven against a known live source
                before and after the dead test (the JIB nine-step procedure).
              </li>
              <li>
                <strong>Disconnect</strong> the main earthing conductor at the MET. Tag the lifted
                end.
              </li>
              <li>
                <strong>Connect</strong> the EFLI tester between L (incomer / meter tails) and the
                lifted earthing conductor end. Probe contact firm.
              </li>
              <li>
                <strong>Test</strong>. Read. Record.
              </li>
              <li>
                <strong>Disconnect</strong> the meter. <strong>Refit</strong> the earthing
                conductor. Continuity-check the refit. Remove the tag <em>only</em> after refit is
                confirmed.
              </li>
              <li>
                <strong>Restore</strong> the main switch and re-energise. Confirm normal supply
                indication.
              </li>
            </ol>
            <p>
              For Method B (no-disconnect Ze), steps 3 and 6 collapse — the conductor never leaves
              the MET — but steps 1, 2 and 7 still apply. The operator&rsquo;s responsibility for
              safe isolation does not change because the meter is doing cleverer things internally.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 EIC / EICR</ContentEyebrow>

          <ConceptBlock
            title="Where Ze goes on the certificate, and what goes with it"
            plainEnglish="Ze is a supply characteristic, so it lives in the Supply Characteristics block at the top of the EIC or EICR — not on the Schedule of Test Results. Reg 313.1 names the other items that share that block: nominal voltage, nature of current and frequency, prospective short-circuit current, suitability for maximum demand, and the type and rating of the origin protective device."
          >
            <p>
              The A4:2026 model forms tightened the Supply Characteristics block to make those
              entries explicit. Three things to get right every time:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Ze (measured):</strong> the value you read at the origin, in ohms, two
                decimal places. If the no-disconnect mode was used, note that in the comments — it
                tells the next inspector you removed parallel paths electronically, not physically.
              </li>
              <li>
                <strong>Ze (declared):</strong> the DNO&rsquo;s declared maximum for the supply
                arrangement. Where the form gives a single Ze field, conventional practice is to
                enter measured / declared with a slash, or measured in the field and declared in the
                comments.
              </li>
              <li>
                <strong>Earthing arrangement:</strong> tick the appropriate box (TN-S, TN-C-S, TT,
                IT). The Ze value, the earthing arrangement, and the bonding declaration are read
                together — a Ze of 95&nbsp;Ω on a TN-C-S box is an obvious inconsistency and an
                audit flag.
              </li>
            </ul>
            <p>
              Reg&nbsp;132.2(c)(v) (with the A4:2026 documentation amendments) underlines the
              record-keeping duty: the documentation shall include external earth fault loop
              impedance. The Supply Characteristics block on the certificate is that duty expressed
              as a form. Empty the box, and the certificate is incomplete on its face.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 313.1 (supply characteristics)"
            clause={
              <>
                The characteristics listed (nominal voltage, nature of current/frequency,
                prospective short-circuit current, Ze, suitability including maximum demand, and
                type/rating of origin protective devices) shall be ascertained for an external
                supply and shall be determined for a private source. The obligation covers supplies
                from whatever source.
              </>
            }
            meaning="Ze is one item on a list of six. Treat the Supply Characteristics block on the certificate as that list rendered as a form — every box has to be filled before the rest of the verification has a foundation. A Ze recorded without PSCC, or PSCC without the type/rating of the origin protective device, is half the duty."
          />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Ze = the earth fault loop impedance external to the installation. Reg 313.1 mandates determination by calculation, measurement, enquiry or inspection, and recording in the Supply Characteristics block.',
              'Method A: isolate, prove dead, lift the main earthing conductor at the MET, measure between L and the means of earthing, refit. Method B: use a no-disconnect Ze mode on a modern multifunction tester.',
              'Typical TN-S Ze: 0.35–0.8 Ω. Typical TN-C-S (PME): 0.20–0.35 Ω. Typical TT: > 1 Ω, usually 20–200 Ω. Outside-band readings are flags, not data points.',
              'On TT, Ze does not drive overcurrent disconnection. Reg 411.5.3 / Table 41.5 + Ra × IΔn ≤ 50 V are the compliance routes via the RCD.',
              'A measured Ze above the DNO declared maximum is an investigation, not a tolerance. Raise it with the DNO and record the measured value, not the declared.',
              'Parallel paths bias Ze low. Either physically lift the earthing conductor or use a no-disconnect mode that removes parallel paths electronically. A bonded-loop reading is not a Ze.',
              'Never re-energise with the main earthing conductor lifted. Tag the lifted end. Reconnect-as-tick-box on the test record.',
              'Ze (measured) and Ze (declared) both belong on the certificate — the next inspector needs both numbers to spot drift.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Do I have to measure Ze on every job, or can I just use the DNO declared value?',
                answer:
                  'On an existing installation undergoing initial verification, periodic inspection, or any addition or alteration that touches the supply, measure. Reg 313.1 permits enquiry as one of four routes, but the measured value is the today reading and is what evidence the certificate. The declared value is a cross-check that belongs alongside the measured number, not in place of it.',
              },
              {
                question:
                  'Can I use the no-disconnect Ze mode on every meter, or are there situations where Method A is mandatory?',
                answer:
                  'No-disconnect mode is the routine default on every modern multifunction tester from Megger, Fluke, Metrel, Kewtech, Martindale, etc. Method A becomes the right tool when (a) the meter does not have a no-disconnect Ze function, (b) you suspect parallel earth paths and want to remove them physically rather than electronically, or (c) you are commissioning a brand-new origin and want a baseline reading no firmware quirk can challenge. Both methods produce values fit for the certificate.',
              },
              {
                question:
                  'My measured Ze is 0.42 Ω, the DNO declared is 0.35 Ω. Do I fail the certificate?',
                answer:
                  'No — but you investigate before signing off. Confirm the measurement (re-test with leads checked, ideally with the no-disconnect mode and Method A both for a cross-check). If both methods give 0.42 Ω, raise it with the DNO. The declared maximum is a contractual ceiling; an above-ceiling measurement points to a degraded supply earth (corroded service joint, broken substation bond, re-categorised supply). Record the measured value on the certificate, annotate the discrepancy in the comments, and chase the DNO. Do not write 0.35 over the top of 0.42.',
              },
              {
                question:
                  'What is the typical Ze for an EV charging supply on TN-C-S — is it different from a normal domestic?',
                answer:
                  'Same supply, same Ze — typically 0.20–0.35 Ω. The EV-specific concern with TN-C-S is not the Ze value but the broken-PEN risk on PME supplies, which is why Reg 722 and the IET Code of Practice for EV Charging require either a PEN-fault-detection EVCP, an earth electrode at the EVCP, or conversion to a TT supply for the EV circuit. The Ze test itself is the same — record it normally; the broken-PEN mitigation is a separate design step in Section 5 of this module on supply types and onward in the EV-specific course.',
              },
              {
                question:
                  'How does Ze on a private generator or UPS supply differ from a DNO supply?',
                answer:
                  'Reg 313.1 says Ze "shall be ascertained for an external supply and shall be determined for a private source" — the duty applies whatever the source. On a private generator (standby, prime, or hybrid), the loop impedance is dominated by the generator winding plus the local earthing arrangement. There is no DNO declared value to cross-check against; you are the source of truth, and the Ze must be measured (or calculated from generator data) at each operating mode the supply runs in. Document the measurement conditions explicitly — single-set Ze, parallel-set Ze, mains-side Ze — because each is a different number.',
              },
              {
                question:
                  'I am working on a TT installation and the RCD has just been replaced. Do I need to re-measure Ze?',
                answer:
                  'Replacing the RCD does not change Ze (the electrode and the soil are unchanged). It does change the disconnection compliance: the new RCD has its own IΔn and operating time, so re-confirm Ra × IΔn ≤ 50 V and Zs ≤ Table 41.5 for the new IΔn. The Ze record on the certificate stays at the measured value; the entry in the protective devices block on the Schedule of Circuit Details is what changes.',
              },
              {
                question:
                  'My EFLI tester just gave me an unstable Ze reading that bounces between 0.18 and 0.31 Ω. What is happening?',
                answer:
                  'Three usual suspects. (1) Probe contact — clean the prod tips, especially on aged terminals at the cut-out. (2) Heavy load on the supply during the test — a large motor cycling on a neighbouring property, an EV charger pulling a chunk of current, an electric heating element switching. Take the reading at a quieter time and compare. (3) A genuine intermittent fault in the supply — a corroded joint that opens and re-makes under thermal cycling. If the bounce persists with clean probes and quiet load, it is the supply, not your meter — DNO call.',
              },
              {
                question: 'Where on the EIC does the Ze go, exactly?',
                answer:
                  "In the Supply Characteristics block at the top of the certificate. The A4:2026 model form has dedicated fields for nominal voltage, nature of current and frequency, prospective short-circuit current, Ze, the type and rating of the origin protective device, and the earthing and bonding declaration. The block is the form expression of Reg 313.1's six-item supply-characteristics list.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Ze testing at origin — Module 5.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-5')}
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
                navigate('/electrician/upskilling/inspection-testing/module-5/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 Maximum Zs values (BS 7671 tables)
              </div>
            </button>
          </div>

          <div className="hidden">
            <Home />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule5Section3;
