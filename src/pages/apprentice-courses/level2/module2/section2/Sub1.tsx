/**
 * Module 2 · Section 2 · Sub 1 — Mass vs weight (AC 3.1)
 * City & Guilds 2365-02 → Unit 202 → LO3 → AC 3.1.
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
import { ForceVectorDiagram } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Mass vs weight — what is the difference? | Level 2 Module 2.2.1 | Elec-Mate';
const DESCRIPTION =
  'Mass is how much stuff is in something (kilograms). Weight is the pull of gravity on it (newtons). Sounds picky — but get it wrong on a lifting calc and someone gets hurt.';

/* ── Inline check questions ──────────────────────────────────────── */

const checks = [
  {
    id: 'mass-weight-units-check',
    question: 'A consumer unit has a mass of 8 kg. What is its weight on Earth (g = 9.81 m/s²)?',
    options: [
      '8 kg',
      '8 N',
      '0.82 N',
      '78.5 N',
    ],
    correctIndex: 3,
    explanation:
      'Weight = mass × g = 8 × 9.81 ≈ 78.5 N. Mass stays in kilograms; weight is always in newtons. Don’t mix the two — that’s the mistake the examiner is looking for.',
  },
  {
    id: 'moon-vs-earth-check',
    question: 'You take a 5 kg drill to the Moon, where g ≈ 1.6 m/s². What changes?',
    options: [
      'Mass stays 5 kg, weight drops from ≈49 N to ≈8 N',
      'Mass drops to 0.5 kg, weight stays the same',
      'Both mass and weight drop to about a sixth',
      'Nothing changes — kilograms are kilograms',
    ],
    correctIndex: 0,
    explanation:
      'Mass is fixed — it’s how much stuff is in the drill. Weight depends on local gravity, so it drops on the Moon. Same drill, lighter to lift, but just as hard to start swinging because that depends on mass, not weight.',
  },
  {
    id: 'lifting-limit-check',
    question:
      'HSE guidance suggests roughly 25 kg as a sensible single-person lifting cap at waist height for a fit adult male. Why is that figure given as a mass, not a weight in newtons?',
    options: [
      'A horizontal tube fixed to the standards running parallel to the building face',
      'It is unreasonable to work dead, reasonable to work live, and suitable precautions are taken',
      'The wearer must pass a qualitative or quantitative face-fit test for that specific make and model of RPE',
      'Because mass is what you can read off a label or a set of scales — weight depends on where you are',
    ],
    correctIndex: 3,
    explanation:
      'Bags of cement, drums of cable, consumer units — they’re all labelled in kilograms because that’s the property you can measure anywhere. Convert to weight (×9.81) when you need a force for a calculation.',
  },
];

/* ── End-of-page Quiz ────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What is mass?',
    options: [
      'The pull of gravity on an object',
      'The amount of matter (stuff) in an object',
      'The volume an object takes up',
      'The energy stored in an object',
    ],
    correctAnswer: 1,
    explanation:
      'Mass is how much stuff is in something. It doesn’t care about where you are or what gravity is doing. SI unit: kilogram (kg).',
  },
  {
    id: 2,
    question: 'What is weight?',
    options: [
      'Test voltage, temperature, humidity, and surface contamination',
      'Washing out concrete chutes or cement mixers into a surface water drain',
      'The force gravity puts on an object — measured in newtons',
      'Use revision clouds, updated revision table, and maintain drawing history',
    ],
    correctAnswer: 2,
    explanation:
      'Weight is a force, not an amount of stuff. It’s what gravity pulls on the mass. SI unit: newton (N). On Earth, W = m × g, with g ≈ 9.81 m/s².',
  },
  {
    id: 3,
    question: 'Which formula links mass and weight?',
    options: [
      'm = W × g',
      'W = m ÷ g',
      'g = m × W',
      'W = m × g',
    ],
    correctAnswer: 3,
    explanation:
      'Weight = mass × gravity. On Earth use g = 9.81 m/s² for proper answers, or 10 m/s² for quick mental sums (call out which one you used).',
  },
  {
    id: 4,
    question: 'A 20 kg consumer unit needs lifting onto a wall. What is its weight on Earth?',
    options: [
      '196.2 N',
      '2 N',
      '20 N',
      '981 N',
    ],
    correctAnswer: 0,
    explanation:
      'W = 20 × 9.81 = 196.2 N. That’s the force the bracket and your arms have to hold up against gravity. Mass = 20 kg either way.',
  },
  {
    id: 5,
    question: 'Astronauts feel "weightless" in orbit. Has their MASS changed?',
    options: [
      'Yes — they’ve lost mass',
      'No — only their weight has changed',
      'It depends on what they ate that morning',
      'Yes — both mass and weight drop to zero',
    ],
    correctAnswer: 1,
    explanation:
      'Free-fall around Earth makes the apparent weight zero — but the mass is exactly what it was on the launch pad. Push a "weightless" astronaut and they still resist, because resistance to push depends on mass, not weight.',
  },
  {
    id: 6,
    question:
      'Why is the SI unit of force (and therefore weight) the newton, not the kilogram?',
    options: [
      'Questions shift the other person from defensive mode to thinking mode, re-engaging their rational brain',
      'Whether the learners enjoyed the training and found it relevant',
      'Because the kilogram is the unit of mass; weight is a force, and force has its own unit',
      'Stop work in the affected area immediately and seek advice from a qualified ecologist',
    ],
    correctAnswer: 2,
    explanation:
      '1 N is the force needed to accelerate 1 kg at 1 m/s². Mass and force are different physical quantities, so they get different units. Mixing them up is the classic Level 2 exam trap.',
  },
  {
    id: 7,
    question:
      'A site supervisor labels a heavy isolator switch "Weight: 12 kg" on the lift plan. What should you say?',
    options: [
      'Open secondary = no secondary current = uncontrolled flux → very high voltage induced (kV) → insulation failure',
      'To monitor and control building services for comfort and efficiency',
      'Filtering facepieces, half/full face masks, powered respirators, breathing apparatus',
      'Strictly that’s mass (12 kg). The weight is about 118 N. Either way, plan the lift safely',
    ],
    correctAnswer: 3,
    explanation:
      'Day-to-day, people say "weight" when they mean mass — and you won’t correct your supervisor on a Friday afternoon. But for an exam, a calc, or a lift plan involving force loads on brackets, get the language right.',
  },
  {
    id: 8,
    question:
      'You’re estimating the weight of a 25 kg cable drum to size a hoist. Quick mental check?',
    options: [
      'About 250 N (using g ≈ 10 for a quick estimate)',
      'Chilled water for cooling systems',
      'It provides structured data for facilities management systems',
      'It reduces energy waste through automated control',
    ],
    correctAnswer: 0,
    explanation:
      'Site shortcut: g ≈ 10 m/s² for quick estimates → mass × 10. So 25 kg ≈ 250 N. The proper figure with g = 9.81 is 245 N. Close enough to size kit; not close enough for a final calculation in your portfolio.',
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question:
      'Why does anyone care about the difference? People say "weight" all the time when they mean mass.',
    answer:
      'Day-to-day, nobody’s going to die because someone says "this drum weighs 30 kilos". But the moment you start sizing brackets, calculating loads on a beam, or doing an exam paper, the two have to be treated separately. Mass tells you how much stuff is there. Weight tells you how hard gravity is pulling on that stuff. Different jobs, different units.',
  },
  {
    question: 'Quick way to convert mass into weight in my head?',
    answer:
      'On Earth, multiply mass (kg) by 10 for a rough force in newtons. So a 30 kg drum is about 300 N. The proper number is 294 N (using g = 9.81), but the ×10 trick gets you within 2% — fine for sizing kit and sense-checking. Use 9.81 for any number that ends up in a portfolio or an exam answer.',
  },
  {
    question: 'Does mass change if I’m soaking wet, or carrying my tools?',
    answer:
      'Yes — your body mass goes up by however much water and tools you’re carrying. That extra mass means extra weight on the ladder, extra weight on the rung, extra weight on the bracket. It’s why ladder ratings include the user PLUS tools and materials. Don’t kid yourself about how much you weigh on a working day.',
  },
  {
    question: 'Why is g = 9.81 m/s² and not just 10?',
    answer:
      'Earth’s gravity actually varies a tiny bit by location — stronger near the poles, weaker near the equator. 9.81 m/s² is the standard average used in UK physics and in BS EN/ISO testing. For mental maths on site, ×10 is fine. For exam answers, use 9.81 unless the question tells you otherwise.',
  },
  {
    question: 'What about pounds and stones — do I need those?',
    answer:
      'Not for any electrical exam in the UK. The UK trade is all metric: mass in kilograms, weight in newtons. Old-timers will still talk in stones and pounds for body weight, but every spec sheet, lift plan, RAMS and ladder rating you’ll meet is in kg/N. Stick with metric.',
  },
  {
    question: 'Where does this come up in a Level 2 exam?',
    answer:
      'Two ways. First, a definition question — "what is mass and what is weight?" — and you have to give the units. Second, a calculation: "find the weight of a 15 kg motor" — that’s W = m × g. The trap is answering "15 kg" or "15 N". Show the working, give the right unit, and the mark is yours.',
  },
];

export default function Sub1() {
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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 1"
            title="Mass vs weight — what’s the difference?"
            description="Mass is the amount of stuff in an object. Weight is the force gravity pulls on it. Mix the two up and you’ll lose marks in the exam — and pick the wrong-rated bracket on site."
            tone="emerald"
          />

          <TLDR
            points={[
              'Mass = how much stuff is in an object. Measured in kilograms (kg). Stays the same wherever you go.',
              'Weight = the force gravity puts on that mass. Measured in newtons (N). Changes depending on where you are.',
              'On Earth: weight = mass × 9.81. Quick site estimate: weight ≈ mass × 10.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define mass and give its SI unit (kilogram).',
              'Define weight as a force and give its SI unit (newton).',
              'Use W = m × g to calculate the weight of a load on Earth.',
              'Explain why mass stays constant but weight changes with location.',
              'Spot when a question or a label is mixing the two terms up.',
              'Estimate weights mentally on site using the g ≈ 10 m/s² shortcut.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why an electrician needs to know this</ContentEyebrow>

          <ConceptBlock
            title="It matters the moment you lift, fix or carry anything"
            plainEnglish="Mass tells you how much stuff is there. Weight tells you how hard you’ll be working to lift it."
            onSite="Every cable drum, every consumer unit, every transformer is labelled in kilograms — that’s mass. The force on the bracket holding it up is in newtons — that’s weight. Two different jobs, two different numbers."
          >
            <p>
              You’ll spend half your career lifting things — drums of T+E, switchgear, conduit
              bundles, tool bags up a ladder. Every one of those moments is a mechanics problem.
              Mass and weight are the two words you need to get straight before any of it makes
              sense.
            </p>
            <p>
              The exam tests this in the first ten minutes of the paper. The on-site version tests
              it the first time you fit a fixing into plasterboard with a 25 kg unit hanging off it.
              Both versions punish you for mixing the units up.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The two definitions</ContentEyebrow>

          <ConceptBlock
            title="Mass — the amount of stuff"
            plainEnglish="Mass = matter. How much physical stuff is in an object. It doesn’t care where you are."
          >
            <p>
              Mass is a measure of how much matter an object is made of — the atoms, basically. A
              brick has more mass than a feather because there’s more stuff packed into it. The SI
              unit is the <strong>kilogram (kg)</strong>.
            </p>
            <p>
              The key thing about mass: it’s a property of the object itself. Take a 5 kg drill to
              the top of Snowdon, into a basement, into orbit, onto the Moon — it’s still 5 kg.
              That’s why labels and spec sheets use kilograms: they’re true everywhere.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Weight — the force gravity puts on that mass"
            plainEnglish="Weight = a force. Specifically, the pull of gravity on the mass."
            onSite="When you say a consumer unit is heavy, you actually mean its WEIGHT is high — gravity is pulling on the mass with a lot of force, and your arms have to push back with the same force to hold it up."
          >
            <p>
              Weight is a force. Specifically, it’s the force that gravity pulls down on a mass
              with. Because it’s a force, it’s measured in <strong>newtons (N)</strong>, not in
              kilograms.
            </p>
            <p>The link between the two is one short formula:</p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              W = m × g
            </p>
            <p>
              Where W is weight in newtons, m is mass in kilograms, and g is the local
              gravitational field strength in metres per second squared (m/s²). On Earth, g is taken
              as <strong>9.81 m/s²</strong> for proper work. For a quick site estimate, ×10 is
              close enough.
            </p>
          </ConceptBlock>

          <ForceVectorDiagram
            eyebrow="Weight on a body — W = mg"
            caption="Gravity pulls every object straight down with a force equal to its mass times g. The ground (or a fixing) pushes back up with an equal force — that’s the normal force, N."
          />

          <RegsCallout
            source="BIPM — The International System of Units (SI), 9th edition (2019)"
            clause="The kilogram, symbol kg, is the SI unit of mass. The newton, symbol N, is the SI unit of force, defined as the force needed to give a mass of one kilogram an acceleration of one metre per second squared (1 N = 1 kg·m/s²)."
            meaning={
              <>
                Two different physical quantities, two different units. <strong>Mass in kg.</strong>{' '}
                <strong>Force (and so weight) in N.</strong> Every BS EN standard, every spec
                sheet, every lift plan you’ll meet uses these. Get the unit wrong on an exam answer
                and you lose the mark.
              </>
            }
            cite="Source: BIPM SI Brochure, 9th edition; National Physical Laboratory (NPL) UK"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Worked example — a tin of paint</ContentEyebrow>

          <ConceptBlock
            title="The classic 5-litre tin"
            onSite="If a question gives you the mass and asks for the weight, you’re multiplying. If it gives you a weight in newtons and asks for the mass, you’re dividing. That’s the whole trick."
          >
            <p>
              A 5-litre tin of trade emulsion has a mass of about 5 kg (water-based paint is roughly
              the same density as water). Three places, three weights:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>On Earth (g = 9.81):</strong> W = 5 × 9.81 ≈ <strong>49 N</strong>. That’s
                what your arm feels.
              </li>
              <li>
                <strong>On the Moon (g ≈ 1.6):</strong> W = 5 × 1.6 = <strong>8 N</strong>. Same
                tin, six times lighter to lift.
              </li>
              <li>
                <strong>In orbit (free-fall, apparent g = 0):</strong> W ≈ <strong>0 N</strong>.
                Floats. But the tin is still 5 kg of stuff — push it and you still need force to get
                it moving.
              </li>
            </ul>
            <p>
              Mass: 5 kg in all three places. Weight: 49 N, 8 N, 0 N. Different word, different
              property, different unit.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it bites on site</ContentEyebrow>

          <ConceptBlock
            title="Lifting kit, brackets and your back"
            plainEnglish="Manual handling rules, ladder ratings and bracket specs are all written in kilograms — but the FORCE on the kit is in newtons. Both numbers matter."
          >
            <p>
              The HSE guideline figure for a single-person waist-height lift is around 25 kg for a
              fit adult male and 16 kg for a fit adult female. That’s a mass — what a set of scales
              would show. The force on your spine when you actually lift it is mass × g, so you’re
              fighting roughly 245 N (or 157 N) every time. Lift it badly and the stress
              concentrates on a tiny part of your lower back.
            </p>
            <p>
              Brackets and fixings work the other way round. The spec sheet for a wall plug might
              say "rated to 50 kg per fixing" — that’s really shorthand for "rated to a downward
              force of about 490 N". When BS EN test labs verify those ratings, they apply the
              force in newtons.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE INDG143 — Manual Handling Operations Regulations 1992 (rev3)"
            clause="There is no specific weight limit imposed by the regulations. The MAC tool and risk filter use guideline figures of 25 kg for a man lifting close to the body at waist height, dropping to 5 kg at full reach above shoulders. For women, the figures are roughly two-thirds of those values."
            meaning={
              <>
                Notice the figures are quoted in <strong>kilograms (mass)</strong> — that’s what you
                can read off a label or a set of scales. The force on you is mass × g, in newtons.
                Both numbers are useful: kg for the lift plan, N for any structural calc.
              </>
            }
            cite="Verbatim wording paraphrased — see HSE INDG143 (rev3) Manual Handling at Work and the MAC tool at hse.gov.uk/msd/manual-handling for the full guidance. Statutory basis: Manual Handling Operations Regulations 1992 (MHOR), Regulation 4."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The g ≈ 10 site shortcut</ContentEyebrow>

          <ConceptBlock
            title="When a quick estimate is good enough — and when it isn’t"
            onSite="Sizing a hoist, sense-checking whether a fixing is in the right ballpark, deciding if a job needs two people — ×10 is fine. Writing it up in your portfolio or doing an exam paper — use 9.81."
          >
            <p>
              Real gravity is 9.81 m/s² in the UK. The shortcut of 10 makes you off by about 2%,
              which is well inside the safety factors built into any rated kit. So:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>20 kg consumer unit:</strong> rough weight ≈ 200 N (proper: 196.2 N).
              </li>
              <li>
                <strong>30 kg cable drum:</strong> rough weight ≈ 300 N (proper: 294.3 N).
              </li>
              <li>
                <strong>5 kg drill + bag:</strong> rough weight ≈ 50 N (proper: 49.05 N).
              </li>
            </ul>
            <p>
              Use the shortcut to think on your feet. Use 9.81 for paperwork. Always say which one
              you used in an exam answer — examiners credit either, as long as you’re consistent.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Writing a weight as 20 kg in an exam answer"
            whatHappens={
              <>
                The question says "calculate the weight of a 20 kg motor". You write "20 kg".
                Examiner crosses it out. The unit kg is for mass — you needed newtons. Whole mark
                gone, even though you understood the question.
              </>
            }
            doInstead={
              <>
                Write the formula (W = m × g), put the numbers in, give the answer in{' '}
                <strong>newtons</strong> (W = 20 × 9.81 = 196.2 N). Show the working — even if you
                slip on the arithmetic, you’ll usually pick up a method mark.
              </>
            }
          />

          <Scenario
            title="The lift plan says 28 kg — and it’s a one-person job"
            situation={
              <>
                You’re sent to swap a small distribution board. The despatch note lists it as 28 kg.
                The job sheet says one electrician. HSE’s guideline for a waist-height lift close to
                the body is around 25 kg.
              </>
            }
            whatToDo={
              <>
                Stop and think. 28 kg is a mass — the force on you when you lift is roughly 275 N.
                That’s above the single-person guideline. Get a second pair of hands, or use a
                trolley or a small lift. Note the change on the RAMS so the next person doesn’t make
                the same call you didn’t.
              </>
            }
            whyItMatters={
              <>
                MHOR Reg 4 puts the duty on the boss to avoid hazardous manual handling so far as
                reasonably practicable — but s.7 of HASAWA puts the duty on YOU not to crack on
                with a lift you know is over the line. "It was only 3 kg over" is a poor opening
                line in a back injury claim.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>One last word — inertia</ContentEyebrow>

          <ConceptBlock
            title="Mass also tells you how hard something is to start moving"
            plainEnglish="Weight = how heavy something is to lift. Mass = how hard it is to push, stop or change direction."
          >
            <p>
              Mass shows up again in the next subsection (Newton’s laws). When a force is applied to
              an object, the heavier the mass, the slower it accelerates. That’s why a 25 kg cable
              drum is hard to push along the floor even on castors — gravity isn’t involved
              sideways, but you’re still fighting the mass.
            </p>
            <p>
              Same idea in space — astronauts feel weightless but a heavy module is still hard to
              shove around. Mass is the universal "how much stuff" number. Weight is just one of the
              things that mass causes when gravity is around.
            </p>
          </ConceptBlock>

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
              'Mass = how much stuff is in an object. Unit: kilogram (kg). Stays the same anywhere in the universe.',
              'Weight = the force gravity puts on that mass. Unit: newton (N). Changes if gravity changes.',
              'On Earth: W = m × g, with g = 9.81 m/s² for exam answers, ≈ 10 for quick site estimates.',
              'Lifting limits, ladder ratings and load specs are quoted in kg because that’s what you can measure with scales — but the structural force is in N.',
              'In an exam, writing kg when the question asks for weight is the classic mark-loser. Use newtons for any force.',
              'Mass also controls how hard something is to push or stop, not just to lift. That’s why a heavy drum is awkward even on a flat floor.',
            ]}
          />

          {/* ── Quiz ────────────────────────────────────────────── */}

          <Quiz title="Mass vs weight knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section1/1-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1 · 1.5
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2/2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Force and Newton’s basics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
