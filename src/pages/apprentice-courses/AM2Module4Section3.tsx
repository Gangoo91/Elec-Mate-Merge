/**
 * Module 4 · Section 3 — Recording test results on certification
 * AM2 day-prep — AM2 Phase C (inspection, testing, certification)
 * Real measured values in the right units, on the right form — neat enough to defend to an assessor.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Recording Test Results on Certification | AM2 Module 4.3 | Elec-Mate';
const DESCRIPTION =
  'Recording AM2 test results properly — measured values, right units, right boxes — and paperwork that stands up to scrutiny.';

const AM2Module4Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const learningOutcomes = [
    'Correctly complete test certificates used in AM2',
    'Record results in the correct units (Ω, MΩ, V, A)',
    'Avoid "book answers" and instead write realistic, measured values',
    'Understand what assessors are looking for when they inspect your paperwork',
    'Apply practical strategies to complete paperwork neatly under time pressure',
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'certificate-type',
      question: 'Which certificate is used to hand over completed installation results in AM2?',
      options: [
        'Public Interest Disclosure Act 1998',
        'Actual metered energy consumption',
        'Wastewater from basins, showers, and baths',
        'Electrical Installation Certificate (EIC)',
      ],
      correctIndex: 3,
      explanation:
        'The Electrical Installation Certificate (EIC) is the primary document used to hand over completed installation results and demonstrate compliance with BS 7671.',
    },
    {
      id: 'realistic-values',
      question: "Why is writing '0.00 Ω' for Zs wrong?",
      options: [
        "Unrealistic reading - assessor knows it's a 'book answer'",
        "To identify at-risk behaviours and reinforce safe practices",
        "Water, gas, oil, air conditioning and structural steelwork",
        "Use proper stripping tools to avoid nicking the conductor",
      ],
      correctIndex: 0,
      explanation:
        "0.00 Ω for earth fault loop impedance is unrealistic. All circuits have some impedance, and assessors recognise this as a copied 'book answer' rather than a genuine measurement.",
    },
    {
      id: 'recording-timing',
      question: 'When should you record test results in AM2?',
      options: [
        'Fail for non-compliance with specification',
        'Immediately as you test, not afterwards',
        'Self-certify notifiable electrical work',
        'Burn marks or discolouration',
      ],
      correctIndex: 1,
      explanation:
        'Results should be recorded immediately as you test to ensure accuracy and prevent rushed completion at the end which leads to errors and illegible writing.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What certificate must you complete for AM2 test results?',
      options: [
        'The Managers and Professionals test',
        'Electrical Installation Certificate (EIC)',
        'Remove fuses, inform occupants, and post notices',
        'Circuit will not function as intended',
      ],
      correctAnswer: 1,
      explanation:
        'The Electrical Installation Certificate (EIC) is the primary certificate required for AM2 new installation work, accompanied by test schedules.',
    },
    {
      id: 2,
      question: 'Why must you avoid leaving blanks on paperwork?',
      options: [
        'Labels, handover notes, and record books/logs',
        'Refractive index difference at glass-air interface',
        'You lose marks and paperwork is incomplete',
        'You own the van at the end of the agreement',
      ],
      correctAnswer: 2,
      explanation:
        'Leaving blanks results in lost marks as the paperwork is considered incomplete. All applicable sections must be filled in.',
    },
    {
      id: 3,
      question: "What's wrong with writing '∞' for insulation resistance?",
      options: [
        'It sets targets for 2025 requiring homes to be zero-carbon ready',
        'Knowledge, skills, and behaviours required for the occupation',
        'Misreading questions and careless errors',
        'Should record meter limit (e.g. >200 MΩ) not infinity',
      ],
      correctAnswer: 3,
      explanation:
        "Instead of infinity symbols, record the actual meter limit reading such as '>200 MΩ' to show the measured value.",
    },
    {
      id: 4,
      question: 'Which unit is used for earth fault loop impedance?',
      options: [
        'Ω (ohms)',
        'MΩ',
        'V',
        'A',
      ],
      correctAnswer: 0,
      explanation:
        'Earth fault loop impedance (Zs) is measured and recorded in ohms (Ω), typically as decimal values.',
    },
    {
      id: 5,
      question: 'What result would you expect for continuity of CPCs?',
      options: [
        'It causes shadows and glare',
        'Small values (fractions of an ohm)',
        'Health and safety management',
        'Safety - to prevent dangerous potentials',
      ],
      correctAnswer: 1,
      explanation:
        'Continuity of Circuit Protective Conductors should show small values, typically fractions of an ohm, indicating good continuity.',
    },
    {
      id: 6,
      question:
        "What's the correct way to record an insulation resistance result above the meter limit?",
      options: [
        "Elimination of the electrical hazard",
        "Ipsc = U₀ ÷ (Ze + circuit impedance)",
        "Write '>200 MΩ' or meter limit",
        "The same through all components",
      ],
      correctAnswer: 2,
      explanation:
        "Record the actual meter limit reading (e.g. '>200 MΩ') rather than infinity symbols or vague descriptions.",
    },
    {
      id: 7,
      question: 'When should you record test results — during testing or at the end?',
      options: [
        'At the end of all testing',
        'When assessor asks',
        'During breaks only',
        'During testing as you go',
      ],
      correctAnswer: 3,
      explanation:
        'Record results immediately as you test to ensure accuracy and prevent errors from trying to remember multiple readings.',
    },
    {
      id: 8,
      question: "Why is '0.00 Ω' as a Zs result marked wrong?",
      options: [
        'Unrealistic - all circuits have some impedance',
        'Adjusting PID parameters for optimal performance',
        'In the pocket of the person doing the work',
        'Periodically as part of maintenance schedule',
      ],
      correctAnswer: 0,
      explanation:
        "0.00 Ω is unrealistic as all electrical circuits have some impedance. This is recognised as a 'book answer' rather than a genuine measurement.",
    },
    {
      id: 9,
      question: 'What happens if paperwork is illegible?',
      options: [
        'Assessor will ask you to explain',
        'You lose marks',
        'Nothing happens',
        'You can rewrite it later',
      ],
      correctAnswer: 1,
      explanation:
        'Illegible handwriting results in lost marks as the assessor cannot verify the recorded values are correct.',
    },
    {
      id: 10,
      question: 'Give one strategy to ensure paperwork is completed correctly in AM2.',
      options: [
        'Rush at the end to save time',
        'Leave difficult sections blank',
        'Record results as you test and write clearly',
        'Copy from reference books',
      ],
      correctAnswer: 2,
      explanation:
        'Recording results immediately as you test and maintaining clear handwriting ensures accuracy and completeness under time pressure.',
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3"
            title="Recording Test Results on Certification"
            description="Testing in AM2 isn't finished until the results are recorded on the correct certificates. Assessors expect you to fill in documentation clearly, accurately, and in full."
            tone="yellow"
          />

          <TLDR
            points={[
              'Three documents to fill on AM2: Electrical Installation Certificate (EIC), Schedule of Inspections, Schedule of Test Results — never just one.',
              'Record realistic measured values, not "book answers". 0.00 Ω for Zs and ∞ for IR are dead giveaways the assessor flags as copied.',
              'Units matter — Ω for continuity / Zs, MΩ for IR, ms for RCD trip times, V/kA for voltage / PFC. Wrong unit = wrong answer.',
              'Record as you test, circuit-by-circuit. Leaving paperwork to the end produces blanks, scribbles and lost marks.',
              'Reg 644.4 says the designer/constructor/inspector signs off the EIC — three signatures on a typical AM2 rig (or one if you take all three roles).',
            ]}
          />

          <CommonMistake
            title="Poor Documentation = AM2 Failure"
            whatHappens={
              <>
                Poor, incomplete, or fake entries are one of the most common reasons candidates fail
                the testing stage. Many candidates fail this section not from lack of testing skill,
                but from poor recording habits and rushed paperwork completion.
              </>
            }
            doInstead={
              <>
                Professional paperwork completion is essential for AM2 success. Record as you test,
                use correct units, write clearly, and never leave required fields blank.
              </>
            }
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          <ContentEyebrow>Paperwork You'll Complete in AM2</ContentEyebrow>

          <ConceptBlock
            title="1. Paperwork You'll Complete in AM2"
            plainEnglish="The EIC, schedule of test results and schedule of inspections — the three documents that turn your testing work into a recognised certification."
          >
            <p>
              <strong>Primary Certificates:</strong> Electrical Installation Certificate (EIC).
              Schedule of test results (for each circuit). Schedule of inspections.
            </p>
            <p>
              <strong>Test Results Required:</strong> Continuity, insulation, polarity. Zs,
              PSC/PSCC, RCD results. Risk Assessment / Method Statement (RAMS).
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 644.4"
            clause="The person or persons responsible for the design, construction and verification of the installation shall issue the Certificate, which takes account of their respective responsibilities, to the person ordering the work, together with the records mentioned in Regulation 644.3. The recommendation for the interval between initial verification and the first periodic inspection shall be recorded on the Certificate."
            meaning={
              <>
                The EIC has separate signature boxes for designer, constructor and inspector. On a
                live job those are often three people. On AM2 day, you've taken all three roles
                yourself — sign all three boxes, with the same name and date, and don't leave any
                blank. Reg 644.4 also requires you to record the recommended interval until the
                first periodic inspection (typically 5 years for domestic, less for harsher
                environments) — that field on the EIC is part of the certificate, not optional.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 644.3 / 644.4"
          />

          <div className="my-6">
            <VideoCard
              url={videos.scheduleOfInspections.url}
              title={videos.scheduleOfInspections.title}
              channel={videos.scheduleOfInspections.channel}
              duration={videos.scheduleOfInspections.duration}
              topic="EIC Schedule of Inspections walkthrough · AM2 paperwork"
              caption={
                <>
                  Craig Wiltshire walks the Schedule of Inspections row by row. AM2 expects every
                  line ticked or marked N/A — never blank, never crossed through. Watch how he
                  reasons each tick against what was actually inspected on a typical assessment
                  installation.
                </>
              }
            />
          </div>

          <ConceptBlock
            title="2. What Assessors Look For in Certification"
            plainEnglish="Two filters: did you fill it in completely with the right units, and does it look professional? Both have to pass."
          >
            <p>
              <strong>Essential Requirements:</strong> All sections filled in — no blanks. Units
              written correctly (Ω, MΩ, V, ms). Results realistic and consistent with installation.
              Neat, legible handwriting.
            </p>
            <p>
              <strong>Professional Standards:</strong> No corrections by scribbling. Use one clear
              strike-through if needed. Consistent formatting throughout. Professional presentation
              quality.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 514.9.1"
            clause="A diagram, chart or table or equivalent form of information shall be provided indicating in particular: (a) the type and composition of each circuit (points of utilization served, number and size of conductors, type of wiring); and (b) the method used for compliance with Regulation 410.3.2; and (c) the information necessary for the identification of each device performing the functions of protection, isolation and switching."
            meaning={
              <>
                The Schedule of Test Results IS the diagram/chart for AM2 — every circuit gets a row
                with conductor sizes, OCPD type and rating, wiring method. A4:2026 added an
                exception for domestic dwellings (514.9.1 now contains an exception for households),
                but on the AM2 rig you complete the full schedule. Don't leave the conductor size,
                the cable reference method, or the protective device columns blank — they are part
                of the "diagram, chart or table" the reg requires.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 514.9.1"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 514.12.1"
            clause="An instruction notice of such durable material as to be likely to remain easily legible throughout the life of the installation shall be fixed in a prominent position at or near the relevant distribution board... 'Important — This installation should be periodically inspected and tested and a report on its condition obtained, as prescribed in BS 7671 Requirements for Electrical Installations. Date of last inspection... Recommended date of next inspection...'"
            meaning={
              <>
                The periodic inspection notice. Date of last inspection on AM2 day = today. Date of
                next inspection = the interval you wrote on the EIC under Reg 644.4. The two have to
                match — assessors check. Mark the notice "AT DB" or note it on the EIC and confirm
                you'd fix one to the rig at handover.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 514.12.1"
          />

          <CommonMistake
            title="3. Common Mistakes Candidates Make (NET Guidance)"
            whatHappens={
              <>
                <strong>Documentation Errors:</strong> Leaving results blank. Writing "N/A" where a
                test was required. Using wrong units or missing units entirely. Rushing paperwork at
                the end. <strong>Unrealistic Values:</strong> Recording unrealistic numbers (e.g.
                0.00 Ω for Zs). Writing "infinite" instead of &gt;200 MΩ. Mixing up insulation
                resistance vs continuity values. Using obvious "book answers" from reference
                materials.
              </>
            }
            doInstead={
              <>
                Record measured values as you test. Use correct units (Ω, MΩ, V, ms). State the
                meter limit (e.g. "&gt;200 MΩ") instead of infinity. Sense-check every figure
                against the installation it came from.
              </>
            }
          />

          <CommonMistake
            title="Citing the wrong amendment on the EIC header"
            whatHappens={
              <>
                The EIC has a "Standard installation conforms to BS 7671:..." line. You write "BS
                7671:2018+A2:2022" out of habit — that was the previous amendment. Or worse, "18th
                Edition" with no amendment at all. Assessor reads the header and sees a certificate
                based on the wrong rulebook. Easy mark gone, and it questions whether the test
                values you wrote (Zsmax, RCD routine) are even from the right edition.
              </>
            }
            doInstead={
              <>
                The current standard is <strong>BS 7671:2018+A4:2026</strong>. Write that exactly.
                The figures you cite follow: B32 Zsmax = 1.37 Ω (NOT 1.44), RCD verification at
                1×IΔn (NOT 5×IΔn), documentation reference Reg 132.13 (NOT 132.12). Set the standard
                reference at the top of the certificate first — every other figure has to match it.
              </>
            }
          />

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <SectionRule />

          <ConceptBlock
            title="Advanced Certificate Completion Techniques"
            plainEnglish="The detail behind each box on the EIC + STR, and the documentation standards that turn neat paperwork into professional paperwork."
          >
            <p>
              <strong>
                Detailed Certificate Requirements — Electrical Installation Certificate (EIC):
              </strong>{' '}
              Designer, Constructor, Inspector details. Installation description and location.
              Earthing and bonding arrangements. Supply characteristics (TN-S, TN-C-S, TT).
            </p>
            <p>
              <strong>Schedule of Test Results:</strong> Circuit designation and description.
              Continuity of protective conductors. Insulation resistance values. Earth fault loop
              impedance (Zs).
            </p>
            <p>
              <strong>Professional Documentation Standards — Handwriting Quality:</strong> Use block
              capitals for important details. Maintain consistent letter sizing. Use appropriate pen
              (blue or black ink).
            </p>
            <p>
              <strong>Error Correction:</strong> Single line through error, initial change. Never
              use correction fluid or tape. Date and initial significant corrections.
            </p>
            <p>
              <strong>Data Integrity:</strong> Record actual measured values only. Never estimate or
              interpolate results. Note any limitations or deviations.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="4. Recording Realistic Values"
            plainEnglish="Each test gives a different shape of number. Continuity values are tiny ohms, IR values are big megohms, Zs is decimal ohms, RCD trip times are milliseconds. Mismatched units = the assessor knows you copied the answer."
          >
            <p>
              <strong>Continuity Tests — Continuity of CPC:</strong> Expect small values (fractions
              of an ohm). Ring circuit continuity: Typically 0.05-0.5 Ω. Units: Always in Ω (ohms).
            </p>
            <p>
              <strong>Insulation Resistance — Typical readings:</strong> Should be very high (often
              &gt;200 MΩ). Record meter limit: Write "&gt;200 MΩ" not "∞". Minimum acceptable: 1 MΩ
              for most circuits.
            </p>
            <p>
              <strong>Earth Fault Loop Impedance (Zs) — Realistic range:</strong> Typically 0.2-2.0
              Ω for most circuits. Must align with max permitted for protective device. Check BS
              7671:2018+A4:2026 Table 41.3 for maximum values (B32 = 1.37 Ω).
            </p>
            <p>
              <strong>RCD Testing — Trip time:</strong> Record at 1×IΔn in milliseconds (ms) —
              A4:2026 deleted the 5×IΔn test. General-purpose RCD: &lt;300ms at 1×IΔn (Type S:
              &lt;200ms; Type AC/A in dwellings: ≤40ms reaffirmed for additional protection per Reg
              415.1.1). Polarity: Tick "satisfactory" at each accessory.
            </p>
            <p>
              <strong>PSC/PSCC (Short Circuit Current):</strong> Record measured value in kA or A.
              Typical domestic installations: 1-6 kA. Commercial installations may be higher. Always
              record the actual measured value, not estimated or calculated figures.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="5. Strategies for AM2 Success"
            plainEnglish="Record as you test, write clearly, sense-check against expected ranges, and leave time for a final review pass."
          >
            <p>
              <strong>During Testing:</strong> Record results as you test — don't leave until the
              end. Write clearly — if assessor can't read it, you lose marks. Check units — always
              write Ω, MΩ, V, ms.
            </p>
            <p>
              <strong>Quality Control:</strong> Double-check results against expected ranges.
              Compare with GN3 and BS 7671 guidance. Keep paperwork tidy — no scribbles or rushed
              writing.
            </p>
            <p>
              <strong>Time Management:</strong> Allocate 10-15 minutes for paperwork completion.
              Don't rush — accuracy is more important than speed. Review all sections before
              submitting.
            </p>
            <p>
              <strong>Error Prevention:</strong> Use a systematic approach — same order every time.
              Cross-reference readings with test sequence. Have a colleague check your work if
              possible.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <ConceptBlock
            title="Real-World Examples"
            plainEnglish="Two failures and one success showing what assessors mark down and what earns top marks."
          >
            <p>
              <strong>Example 1: Infinity Symbol Error.</strong> Candidate recorded all insulation
              resistance results as "∞." Assessor marked incorrect — failed paperwork section.
              Lesson: Always record meter limit readings like "&gt;200 MΩ" instead of infinity
              symbols.
            </p>
            <p>
              <strong>Example 2: Incomplete Documentation.</strong> Candidate left several boxes
              blank, assuming assessor wouldn't check. Lost easy marks. Lesson: Every applicable
              section must be completed. Blanks = lost marks.
            </p>
            <p>
              <strong>Example 3: Professional Excellence.</strong> Candidate completed paperwork
              neatly, with realistic results matching the installation. Passed smoothly. Lesson:
              Professional presentation and realistic values demonstrate competence and earn full
              marks.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section Summary — Key Takeaways"
            plainEnglish="Five things to walk away with from this section."
          >
            <p>Paperwork is part of the test — not an afterthought.</p>
            <p>Complete all sections of EIC and test schedules with realistic, measured results.</p>
            <p>Record results in correct units (Ω, MΩ, V, ms) as you test.</p>
            <p>Write clearly and neatly — illegible handwriting loses marks.</p>
            <p>Many candidates fail from poor recording habits, not lack of testing skill.</p>
            <p>
              <strong>Next Steps:</strong> You're now ready to move on to Section 4, where we'll
              cover functional and operational testing procedures.
            </p>
          </ConceptBlock>

          <Scenario
            title="Mid-test, three readings on a B16 lighting circuit don't match the installation"
            situation={
              <>
                B16 lighting circuit on the AM2 rig. You measure: R1+R2 = 0.42 Ω, IR L-E = greater
                than the meter's 200 MΩ ceiling, Zs at the furthest point = 0.00 Ω. The 0.00 Ω
                reading is what came up on the meter — but you know every circuit has some
                impedance.
              </>
            }
            whatToDo={
              <>
                Don't write 0.00 Ω. Re-test — that reading is wrong. Common causes: probes touching
                the same terminal, MFT on the wrong range, or the test leads not zeroed. Re-prove
                the leads, set the loop function, take the reading at the actual furthest socket.
                You should land somewhere between Ze (about 0.3 Ω on a typical TN-C-S rig) plus the
                R1+R2 you measured (0.42 Ω) — so a sensible Zs is around 0.7-0.9 Ω. Write the new
                figure. For IR, write "&gt;200 MΩ" (or whatever the meter ceiling is) — never the
                infinity symbol.
              </>
            }
            whyItMatters={
              <>
                "0.00 Ω" and "∞" are the two figures assessors flag fastest. Both prove the
                candidate copied a textbook answer instead of taking a measurement. Real readings
                have noise, real meters have ceilings, real cables have impedance — the EIC has to
                show that.
              </>
            }
          />

          <SectionRule />

          <FAQ
            items={[
              {
                question:
                  'Three EIC signature boxes — designer, constructor, inspector. What goes where on AM2 day?',
                answer:
                  "Reg 644.4 says whoever did each role signs that box. On AM2 you take all three roles, so all three boxes get your signature, name and date. If a box was genuinely done by someone else (which it isn't on AM2), you'd write their name there — but never sign someone else's box. Three boxes blank on a single-person job = paperwork mark gone.",
              },
              {
                question: "Where does the 'next inspection' date come from?",
                answer:
                  'Reg 644.4 requires it on the EIC, and Table 3.2 in IET Guidance Note 3 gives the typical intervals: domestic dwellings 10 years (or change of occupancy), commercial 5 years, industrial 3 years, construction sites 3 months. AM2 rigs are usually treated as domestic-equivalent — write 10 years (or 5 if your centre says so) and put the same figure on the periodic inspection notice (Reg 514.12.1).',
              },
              {
                question:
                  "Do I write '>200 MΩ' or the actual meter reading if it's pegged at the ceiling?",
                answer:
                  "Write the meter ceiling. If your MFT pegs at >200 MΩ, write \"&gt;200 MΩ\". If it goes to >999 MΩ, write that. Never write '∞' — that's not a measurement, it's a symbol. The reading you record has to be one a third party could compare against the same meter at the same circuit later. Infinity isn't comparable; the meter ceiling is.",
              },
              {
                question: 'Pen colour — does it actually matter?',
                answer:
                  "BS 7671 doesn't specify, but professional practice (and most NET centres) require blue or black ink — pencil isn't acceptable on a final EIC because it can be erased. Some centres want all three signatures and dates in the same colour. Use a decent biro that won't smudge on a damp rig. Block capitals for names so the assessor can read them without guessing.",
              },
              {
                question: 'If I get a result wrong and want to correct it on the certificate?',
                answer:
                  "Single line through the wrong figure (so the original is still visible), write the correct figure next to or above it, initial and date the change. Never use Tipp-Ex / correction fluid — it looks like you're hiding something. Never scribble it out — same problem. One clean strikethrough plus initials is professional and traceable.",
              },
              {
                question:
                  "What's the difference between an EIC and a Minor Works Certificate on AM2?",
                answer:
                  "Reg 644.4.201 — Minor Works is for an addition or alteration to a circuit, NOT for a new circuit or new DB. AM2 is a complete new installation, so the EIC is the right form (per Reg 644.4 / Appendix 6 Form 1). Don't accidentally pick up a Minor Works pad on AM2 day — it doesn't have the right test schedule columns and the assessor will mark you down for using the wrong certificate.",
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Three documents per AM2 install: EIC + Schedule of Inspections + Schedule of Test Results.',
              'Standard reference: BS 7671:2018+A4:2026 — write that exactly on the EIC header.',
              'Realistic measured values only. Never 0.00 Ω for Zs, never ∞ for IR — write the meter ceiling like ">200 MΩ".',
              'Units lock down each test: Ω (continuity, Zs), MΩ (IR), ms (RCD trip), V (voltage), kA/A (PFC).',
              'Reg 644.4: designer / constructor / inspector signatures + recommended interval to first periodic inspection.',
              'Reg 514.12.1: periodic inspection notice at the DB. Date of last = today, date of next = the interval on the EIC.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Recording Test Results on Certification" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4/section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Safe Use of Test Instruments
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4/section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Functional Testing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module4Section3;
