/**
 * Module 6 · Section 2 — Core topics covered (regs, science, safety)
 * AM2 day-prep — AM2 Phase E (online knowledge tests)
 * The three pillars the online test pulls from — BS 7671 regs, electrical science and safety.
 */

import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Calculator,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Lightbulb,
  Shield,
  Zap,
} from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { Link } from 'react-router-dom';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  TLDR,
  RegsCallout,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Core Topics — Regs, Science, Safety | AM2 Module 6.2 | Elec-Mate';
const DESCRIPTION =
  'The three pillars the AM2 online test draws from — BS 7671 regulations, electrical science and safety law — and what to revise for each.';

const AM2Module6Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const learningOutcomes = [
    'Identify the three main categories of knowledge assessed: regulations, science, and safety',
    'Explain the specific regulation topics most likely to appear',
    'Recall key scientific principles relevant to electrical installation',
    'Understand the safety requirements that form the backbone of AM2 knowledge',
    "Prioritise revision effectively based on NET's published expectations",
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'insulation-resistance',
      question: 'What is the minimum acceptable insulation resistance for a circuit in AM2?',
      options: [
        '0.5 MO',
        '5 MO',
        '2 MO',
        '1 MO',
      ],
      correctIndex: 3,
      explanation:
        'The minimum acceptable insulation resistance for a circuit is 1 MO according to BS 7671.',
    },
    {
      id: 'safe-isolation-regulation',
      question: 'Which regulation makes safe isolation a legal requirement?',
      options: [
        'Electricity at Work Regulations 1989',
        'Glaser method (BS EN ISO 13788)',
        'Allows current to flow in one direction only.',
        'Public Interest Disclosure Act 1998',
      ],
      correctIndex: 0,
      explanation:
        'The Electricity at Work Regulations 1989 make safe isolation a legal duty for all electrical work.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the minimum acceptable insulation resistance value?",
      options: [
        '0.5 MO',
        '1 MO',
        '2 MO',
        '5 MO',
      ],
      correctAnswer: 1,
      explanation: '1 MO is the minimum acceptable insulation resistance value for circuits.',
    },
    {
      id: 2,
      question: 'Which of these is NOT a key regulation topic tested in AM2?',
      options: [
        'Bathroom zones',
        'Maximum Zs values',
        'Cable colour codes',
        'RCD requirements',
      ],
      correctAnswer: 2,
      explanation:
        'Cable colour codes are not a key regulation topic in AM2 - focus on Zs values, RCDs, and zones.',
    },
    {
      id: 3,
      question: "State Ohm's law in formula form:",
      options: [
        'P = I squared R',
        'P = VI',
        'I = V/R',
        'V = IR',
      ],
      correctAnswer: 3,
      explanation: "Ohm's law states that Voltage = Current x Resistance (V = IR).",
    },
    {
      id: 4,
      question: 'A 2 kW heater on 230 V supply draws how many amps?',
      options: [
        '8.7 A',
        '6.7 A',
        '10.2 A',
        '12.5 A',
      ],
      correctAnswer: 0,
      explanation: 'Using P = VI, therefore I = P/V = 2000/230 = 8.7 A approximately.',
    },
    {
      id: 5,
      question: "What's the maximum disconnection time for a socket circuit?",
      options: [
        '0.2 seconds',
        '0.4 seconds',
        'No requirement',
        '5 seconds',
      ],
      correctAnswer: 1,
      explanation: 'Socket circuits require disconnection within 0.4 seconds under BS 7671.',
    },
    {
      id: 6,
      question: 'Which regulation makes safe isolation a legal duty?',
      options: [
        'BS 7671',
        'CDM 2015',
        'EAWR 1989',
        'HASAWA 1974',
      ],
      correctAnswer: 2,
      explanation:
        'The Electricity at Work Regulations 1989 make safe isolation legally mandatory.',
    },
    {
      id: 7,
      question: 'What is the difference between line and phase voltage in three-phase?',
      options: [
        'Line is twice phase',
        'Phase is 1.732 times line',
        'They are equal',
        'Line is 1.732 times phase',
      ],
      correctAnswer: 3,
      explanation: 'In three-phase systems, line voltage is 1.732 times the phase voltage.',
    },
    {
      id: 8,
      question: 'Which TWO are examples of PPE relevant to electrical work?',
      options: [
        'Safety boots and hard hat',
        'Isolation locks and tags',
        'Risk assessment forms',
        'Voltage detector and multimeter',
      ],
      correctAnswer: 0,
      explanation:
        'Safety boots and hard hats are Personal Protective Equipment (PPE) for electrical work.',
    },
    {
      id: 9,
      question: 'True or false: The AM2 knowledge test is open book.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        'False - the AM2 knowledge test is closed book, you cannot use BS 7671 during the exam.',
    },
    {
      id: 10,
      question: 'What are the three core categories of questions in the online test?',
      options: [
        'Theory, practical, safety',
        'Design, install, inspect',
        'Regulations, science, safety',
        'Installation, testing, maintenance',
      ],
      correctAnswer: 2,
      explanation:
        'The three core categories are regulations (BS 7671), electrical science, and safety.',
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <Link
            to="/study-centre/apprentice/am2/module6"
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          {/* Hero Section */}
          <PageHero
            eyebrow="Module 6 • Section 2"
            title="Core Topics Covered (Regs, Science, Safety)"
            description="The AM2 online knowledge test checks whether you can apply electrical theory, regulations, and safety knowledge to real-world practice. It's not just memory - questions are designed to see if you understand principles and can use BS 7671, science, and safety rules in practical contexts. Knowing the core subject areas makes revision focused and efficient."
            tone="yellow"
          />

          <TLDR
            points={[
              'Three core areas: BS 7671 regulations (~30%), electrical science (~25%), safety/EAWR (~25%), with applied scenarios cutting across (~20%).',
              'Memorise key values: max Zs (1.37 Ω for 32A Type B in A4:2026), RCD trip times (300 ms ×1, 40 ms ×5), bathroom zones, IR minimums (1 MΩ).',
              'Closed book for most papers. The BS 7671 reference paper may be open book — but only if you actually know how to navigate the index, not flip pages randomly.',
            ]}
          />

          {/* Critical Warning */}
          <CommonMistake
            title="Focus Your Revision"
            whatHappens={
              <>
                <p className="text-ios-callout text-white mb-2">
                  The AM2 knowledge test covers three specific areas. Trying to revise everything
                  will waste time and reduce your chances of success.
                </p>
                <p className="text-ios-callout text-white font-medium">
                  Focus on these core topics: Regulations (BS 7671), Electrical Science, and Safety.
                  These form 100% of the test content.
                </p>
              </>
            }
            doInstead={<>Treat this as a hard rule on AM2 day — there are no exceptions.</>}
          />

          {/* Learning Outcomes */}
          <section className="space-y-3">
            <LearningOutcomes outcomes={learningOutcomes} />
          </section>

          {/* Regulations Section */}
          <section className="space-y-3">
            <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              1. Regulations (BS 7671 Knowledge)
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p className="text-white">
                The test includes questions from the IET Wiring Regulations. You don't have the book
                in the exam, so you need to recall core principles and specific values from memory.
              </p>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">
                Key Regulation Areas:
              </h3>
              <ul className="space-y-2 ml-4 text-white">
                <li>
                  -{' '}
                  <strong className="text-white">Maximum Zs values for protective devices:</strong>{' '}
                  Know the specific values for different MCB types and RCBOs
                </li>
                <li>
                  - <strong className="text-white">RCD requirements:</strong> Where they must be
                  fitted, trip times (30mA/0.3s), and applications
                </li>
                <li>
                  - <strong className="text-white">Bathroom zones and IP ratings:</strong> Zone 0,
                  1, 2 boundaries and required IP protection levels
                </li>
                <li>
                  - <strong className="text-white">Cable sizing principles:</strong> Volt drop
                  limitations, current carrying capacity, and grouping factors
                </li>
                <li>
                  - <strong className="text-white">Earthing and bonding requirements:</strong> Main
                  equipotential bonding, supplementary bonding, and conductor sizes
                </li>
                <li>
                  - <strong className="text-white">Inspection & testing sequence:</strong> GN3 order
                  and specific test procedures
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">
                Common Regulation Question Types:
              </h3>
              <ul className="space-y-2 ml-4 text-white">
                <li>
                  - <strong className="text-white">"What is the maximum Zs value for..."</strong> -
                  Direct recall of tabulated values
                </li>
                <li>
                  - <strong className="text-white">"Where must RCDs be fitted?"</strong> -
                  Application requirements from Part 7
                </li>
                <li>
                  - <strong className="text-white">"What IP rating is required in..."</strong> -
                  Special location requirements
                </li>
                <li>
                  -{' '}
                  <strong className="text-white">"What is the maximum volt drop permitted?"</strong>{' '}
                  - Design criteria from Appendix 4
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">
                Essential Values to Memorise:
              </h3>
              <ul className="space-y-2 ml-4 text-white">
                <li>
                  - <strong className="text-white">Maximum Zs values:</strong> 7.28O (6A Type B),
                  2.73O (16A Type B), 1.37O (32A Type B)
                </li>
                <li>
                  - <strong className="text-white">Bathroom zones:</strong> Zone 0 (inside bath),
                  Zone 1 (above bath to 2.25m), Zone 2 (0.6m from Zone 1)
                </li>
                <li>
                  - <strong className="text-white">Volt drop limits:</strong> 3% (lighting), 5%
                  (other uses), from origin of installation
                </li>
                <li>
                  - <strong className="text-white">RCD ratings:</strong> 30mA for socket outlets,
                  0.3s maximum disconnection time
                </li>
                <li>
                  - <strong className="text-white">Insulation resistance:</strong> Minimum 1MO
                  between live conductors and earth
                </li>
              </ul>
            </div>
          </section>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <RegsCallout
            source="BS 7671 — Regulation 132.13 + Table 41.x (key values to memorise)"
            clause="Every electrical installation shall be inspected and tested. Maximum Zs values shall not be exceeded for the protective device installed. (132.13 — every installation; Table 41.x — maximum values.)"
            meaning={
              <>
                On the BS 7671 paper, you'll see questions on key values you should know cold:
                maximum Zs for protective devices (e.g. <strong>1.37 Ω for 32A Type B MCB</strong>{' '}
                in A4:2026), bathroom zone boundaries, IR test voltages (500 V DC), minimum IR (1
                MΩ), disconnection times (0.4 s for socket circuits up to 32 A on TN systems). If
                the paper is open book, you can look these up — but only if you can navigate the
                index quickly. Memorise the headline numbers anyway.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 — Reg 132.13, Table 41.x, Table 64"
          />

          {/* Electrical Science Section */}
          <section className="space-y-3">
            <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              2. Electrical Science
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p className="text-white">
                Science questions test whether you understand the fundamental principles behind
                electrical behaviour. These aren't advanced calculations but core concepts that
                underpin all electrical work.
              </p>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">
                Essential Scientific Principles:
              </h3>
              <ul className="space-y-2 ml-4 text-white">
                <li>
                  - <strong className="text-white">Ohm's Law (V = IR):</strong> The fundamental
                  relationship between voltage, current, and resistance
                </li>
                <li>
                  - <strong className="text-white">Power calculations:</strong> P = VI (apparent
                  power), P = I squared R (power loss in resistance)
                </li>
                <li>
                  - <strong className="text-white">Resistance combinations:</strong> Series (R1 + R2
                  + R3), Parallel (1/R = 1/R1 + 1/R2 + 1/R3)
                </li>
                <li>
                  - <strong className="text-white">Effects of current:</strong> Heating effect (I
                  squared Rt), magnetic effect (motor action)
                </li>
                <li>
                  - <strong className="text-white">Units and conversions:</strong> Amps, volts,
                  watts, ohms, kilowatts, kilowatt-hours
                </li>
                <li>
                  - <strong className="text-white">Three-phase fundamentals:</strong> Line voltage =
                  1.732 x phase voltage (400V/230V relationship)
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">
                Typical Science Questions:
              </h3>
              <ul className="space-y-2 ml-4 text-white">
                <li>
                  -{' '}
                  <strong className="text-white">
                    "A 3kW heater operates at 230V. What current does it draw?"
                  </strong>{' '}
                  Answer: I = P/V = 3000/230 = 13A
                </li>
                <li>
                  -{' '}
                  <strong className="text-white">
                    "What is the total resistance of 4O and 6O in parallel?"
                  </strong>{' '}
                  Answer: 1/R = 1/4 + 1/6 = 2.4O
                </li>
                <li>
                  -{' '}
                  <strong className="text-white">
                    "If voltage doubles and resistance stays constant, what happens to power?"
                  </strong>{' '}
                  Answer: Power increases 4 times (P = V squared/R)
                </li>
                <li>
                  - <strong className="text-white">"Convert 2.5kW to watts"</strong> Answer: 2500W
                  (multiply by 1000)
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">
                Key Formulas to Know by Heart:
              </h3>
              <ul className="space-y-2 ml-4 text-white">
                <li>
                  - <strong className="text-white">Ohm's Law:</strong> V = IR, I = V/R, R = V/I
                </li>
                <li>
                  - <strong className="text-white">Power:</strong> P = VI, P = I squared R, P = V
                  squared/R
                </li>
                <li>
                  - <strong className="text-white">Energy:</strong> E = Pt (Energy = Power x time in
                  hours = kWh)
                </li>
                <li>
                  - <strong className="text-white">Three-phase:</strong> Line voltage = 1.732 x
                  Phase voltage (1.732 x 230V = 400V)
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">
                Calculation Tips:
              </h3>
              <ul className="space-y-2 ml-4 text-white">
                <li>
                  - <strong className="text-white">No calculator allowed:</strong> Practice mental
                  arithmetic and use round numbers for estimates
                </li>
                <li>
                  - <strong className="text-white">Check your units:</strong> Ensure answers make
                  practical sense (e.g., domestic current rarely exceeds 50A)
                </li>
                <li>
                  - <strong className="text-white">Use elimination:</strong> Obviously wrong answers
                  help narrow down correct options
                </li>
                <li>
                  - <strong className="text-white">Know common values:</strong> 13A for 3kW at 230V,
                  2.5mm squared cable = 27A current capacity
                </li>
              </ul>
            </div>
          </section>

          {/* Health & Safety Section */}
          <section className="space-y-3">
            <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              3. Health & Safety
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p className="text-white">
                The knowledge test checks your understanding of legal and safe working practices.
                Safety questions are not just about knowing procedures but understanding why they
                exist and when they apply.
              </p>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">
                Key Safety Legislation:
              </h3>
              <ul className="space-y-2 ml-4 text-white">
                <li>
                  -{' '}
                  <strong className="text-white">
                    Electricity at Work Regulations (EAWR) 1989:
                  </strong>{' '}
                  Legal framework for electrical safety
                </li>
                <li>
                  -{' '}
                  <strong className="text-white">
                    Risk assessments and method statements (RAMS):
                  </strong>{' '}
                  Required planning for all electrical work
                </li>
                <li>
                  - <strong className="text-white">Safe isolation procedures:</strong> The 10-step
                  sequence for making installations safe
                </li>
                <li>
                  - <strong className="text-white">PPE requirements:</strong> Selection and use of
                  appropriate personal protective equipment
                </li>
                <li>
                  - <strong className="text-white">Manual handling:</strong> Safe lifting and moving
                  of electrical equipment
                </li>
                <li>
                  - <strong className="text-white">Working at height and confined spaces:</strong>{' '}
                  Additional safety requirements for special environments
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">
                EAWR 1989 Key Regulations:
              </h3>
              <ul className="space-y-2 ml-4 text-white">
                <li>
                  - <strong className="text-white">Regulation 4:</strong> Systems, work activities
                  and protective equipment must be constructed, maintained and used to prevent
                  danger
                </li>
                <li>
                  - <strong className="text-white">Regulation 12:</strong> Adequate precautions must
                  be taken to prevent electrical equipment becoming electrically charged
                </li>
                <li>
                  - <strong className="text-white">Regulation 13:</strong> Adequate precautions must
                  be taken to prevent danger from work on or near live conductors
                </li>
                <li>
                  - <strong className="text-white">Regulation 14:</strong> No work on live equipment
                  except where safe to do so and reasonably practicable
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">
                Safe Isolation Sequence:
              </h3>
              <ol className="space-y-2 ml-4 text-white list-decimal list-inside">
                <li>Identify circuit to be worked on</li>
                <li>Identify means of isolation</li>
                <li>Isolate the circuit</li>
                <li>Secure isolation (lock/tag)</li>
                <li>Test voltage indicator on known live supply</li>
                <li>Test voltage indicator on circuit to be worked</li>
                <li>Test voltage indicator on known live supply again</li>
                <li>Begin work only if tests confirm dead circuit</li>
                <li>Complete work safely</li>
                <li>Remove isolation and restore supply</li>
              </ol>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">
                Essential PPE for Electrical Work:
              </h3>
              <ul className="space-y-2 ml-4 text-white">
                <li>
                  - <strong className="text-white">Safety footwear:</strong> Insulated boots/shoes
                  to prevent electric shock
                </li>
                <li>
                  - <strong className="text-white">Hard hat:</strong> Protection from falling
                  objects and head impact
                </li>
                <li>
                  - <strong className="text-white">Safety glasses:</strong> Eye protection from
                  arcing and debris
                </li>
                <li>
                  - <strong className="text-white">Insulated tools:</strong> Tools rated for
                  electrical work (1000V rating)
                </li>
                <li>
                  - <strong className="text-white">Voltage indicator:</strong> Properly maintained
                  and tested proving unit
                </li>
                <li>
                  - <strong className="text-white">High-visibility clothing:</strong> When working
                  in areas with vehicle movement
                </li>
              </ul>
            </div>
          </section>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <Scenario
            title="An applied scenario question — read it like an electrician, not a student"
            situation={
              <>
                Question on the test: "An apprentice is asked to install a socket outlet in zone 2
                of a bathroom. Which of the following is the correct minimum IP rating for the
                accessory?" Options: A) IPX4, B) IP44, C) IP54, D) IP66.
              </>
            }
            whatToDo={
              <>
                Don't just match memory. Think it through like an electrician:
                <ul className="space-y-1 list-disc pl-5 mt-2">
                  <li>
                    Zone 2 = the area extending 0.6 m horizontally beyond the bath/shower up to 2.25
                    m high
                  </li>
                  <li>
                    Zone 2 minimum IP rating per BS 7671 Section 701: <strong>IPX4</strong>
                  </li>
                  <li>
                    IP44, IP54, IP66 are all higher than required — they'd be acceptable but not the
                    MINIMUM
                  </li>
                  <li>Answer: A) IPX4</li>
                </ul>
                The question says MINIMUM, not "what's commonly used". Watch the keyword.
              </>
            }
            whyItMatters={
              <>
                Applied scenarios are 35–40% of the test and trap candidates who memorise without
                understanding. Reading carefully — picking up the word MINIMUM versus "what fits"
                versus "what's required" — is what separates pass from fail. On the day, slow down
                on questions like this. Re-read before you click.
              </>
            }
          />

          {/* Question Style Examples */}
          <ConceptBlock title="4. Question Style Examples in Core Topics">
            <p>
              <strong className="text-elec-yellow">Regulations Example</strong>
            </p>
            <p>
              <strong>Question:</strong> "What is the maximum disconnection time for a socket
              circuit under BS 7671?"
            </p>
            <p>
              <strong>Answer:</strong> 0.4 seconds (for TN systems)
            </p>

            <p>
              <strong className="text-elec-yellow">Science Example</strong>
            </p>
            <p>
              <strong>Question:</strong> "If a heater is rated at 2 kW on a 230 V supply, what
              current will it draw?"
            </p>
            <p>
              <strong>Calculation:</strong> I = P/V = 2000/230 = 8.7A
            </p>

            <p>
              <strong className="text-elec-yellow">Safety Example</strong>
            </p>
            <p>
              <strong>Question:</strong> "Which document sets out your duty to carry out a risk
              assessment?"
            </p>
            <p>
              <strong>Answer:</strong> The Management of Health and Safety at Work Regulations 1999
            </p>
          </ConceptBlock>

          {/* Practical Guidance */}
          <ConceptBlock title="Practical Guidance">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Make revision checklists:</strong> Create separate lists for each category
                to track your progress
              </li>
              <li>
                <strong>Practice science problems:</strong> Calculate quickly without a calculator
                until it becomes automatic
              </li>
              <li>
                <strong>Memorise critical values:</strong> Zs values, RCD times, bathroom zones must
                be recalled instantly
              </li>
              <li>
                <strong>Revise safety regulations:</strong> EAWR questions appear frequently and are
                high-scoring
              </li>
              <li>
                <strong>Use mock questions:</strong> Build confidence under exam conditions with
                timed practice tests
              </li>
            </ul>
          </ConceptBlock>

          {/* Real-world Examples */}
          <ConceptBlock title="Real-world Examples">
            <p>
              <strong className="text-elec-yellow">Example 1: Weak Science Knowledge</strong>
            </p>
            <p>
              Candidate didn't revise science, failed questions on resistance and Ohm's law - missed
              pass mark by 3%.
            </p>

            <p>
              <strong className="text-elec-yellow">Example 2: Smart Memorisation</strong>
            </p>
            <p>
              Candidate memorised Zs tables from BS 7671, passed regulation-based questions easily
              and built confidence for other areas.
            </p>

            <p>
              <strong className="text-elec-yellow">Example 3: Safety Knowledge Gap</strong>
            </p>
            <p>
              Candidate confused safe isolation steps, answered incorrectly, lost valuable safety
              marks that could have secured a pass.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Memorising regs without understanding what they mean"
            whatHappens={
              <>
                You learned that Zs maximum for 32A Type B is 1.37 Ω. Test asks: "An installer
                measures Zs of 1.50 Ω on a circuit protected by a 32A Type B MCB. What is the
                correct course of action?" You panic — you know the number but you're not sure how
                to apply it.
              </>
            }
            doInstead={
              <>
                Learn each value with its meaning. 1.37 Ω is the MAXIMUM permitted — readings above
                it mean the disconnection time can't be guaranteed and the circuit doesn't comply
                with BS 7671. The action: investigate the cause (high resistance joint, undersized
                CPC), rectify, re-test. Same value, but now you know what to DO with it. That's the
                level of understanding that wins applied-scenario marks.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'Do I need to memorise all of BS 7671?',
                answer:
                  "No — and you couldn't anyway, it's hundreds of pages. Focus on the high-frequency stuff: max Zs values (Type B MCBs), RCD trip times, bathroom zones, IR minimum, disconnection times for TN/TT systems, special locations (bathroom, kitchen, garden). These come up most.",
              },
              {
                question: 'Are science questions advanced maths?',
                answer:
                  "No — Ohm's law (V=IR), power (P=VI, P=I²R), basic three-phase (line = 1.732 × phase), resistance combinations (series add, parallel reciprocals). No calculator allowed, so practice mental arithmetic with round numbers (e.g. 3 kW at 230 V is 13 A — you should know that without thinking).",
              },
              {
                question: 'How much of the paper is safety?',
                answer:
                  'Around 10–15% directly, but safety underpins many applied scenarios. Know EAWR 1989 key regulations (4, 12, 13, 14), the safe isolation sequence, PPE requirements, and which document covers risk assessment (Management of Health and Safety at Work Regulations 1999).',
              },
              {
                question: 'Is the BS 7671 paper open book?',
                answer:
                  "Some NET centres run it as open book, others closed. CONFIRM with your test centre on the day. Even if open, you need to know how to navigate BS 7671 quickly — the book has 4 parts and 17 appendices. Practice index lookups so you're not flipping pages while the clock ticks.",
              },
              {
                question: 'Will there be trick questions?',
                answer:
                  'Not deliberately tricky, but several questions test understanding versus memory. Watch for keywords: MINIMUM (lowest acceptable), MAXIMUM (highest acceptable), MUST (legal requirement), SHOULD (recommendation), NOT (reverses meaning). Misread one and you click the opposite of the right answer.',
              },
              {
                question: "What's the most undervalued revision topic?",
                answer:
                  "Calculations and units. Most candidates know regs cold but lose marks confusing kW with W, or s with ms, or amperes with milliamperes. Dedicate evening sessions to dimensional analysis: every value, what's the unit, what's the conversion factor? That alone shifts you from 65% to 75%.",
              },
            ]}
          />

          {/* Summary */}
          <ConceptBlock title="Summary">
            <p>The AM2 knowledge test focuses on three main areas:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Regulations:</strong> Zs, RCDs, bathroom zones, cable sizes,
                earthing/bonding, test sequences
              </li>
              <li>
                <strong>Science:</strong> Ohm's law, power, resistance, units, three-phase basics
              </li>
              <li>
                <strong>Safety:</strong> EAWR 1989, RAMS, safe isolation, PPE, site safety
              </li>
            </ul>
            <p>
              Strong preparation in these areas means you can answer confidently and reach the pass
              mark.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'Three core areas: BS 7671 regulations (~30%), electrical science (~25%), safety/EAWR (~25%), with applied scenarios cutting through (~20%).',
              'Headline values to memorise: max Zs 1.37 Ω (32A Type B), RCD trip times (300 ms ×1, 40 ms ×5), IR minimum 1 MΩ at 500 V DC, disconnection 0.4 s for socket circuits.',
              "Memorise WITH meaning, not just numbers. Understanding 'what does max Zs mean and what do I do if exceeded' beats raw recall.",
              'Calculations: practice mental arithmetic with no calculator. 3 kW at 230 V = 13 A. 2 kW at 230 V ≈ 8.7 A. Round numbers are your friend.',
              'Safety = EAWR Reg 4 (work dead default), Reg 13/14 (live work exceptions), Reg 16 (technical knowledge). These come up in applied questions, not just direct recall.',
              "Confirm BS 7671 open vs closed book with your test centre on the day. Open book still requires fast index navigation — don't flip pages while clock ticks.",
            ]}
          />

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="10-Question Quiz" />

          {/* Navigation Footer */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              to="/study-centre/apprentice/am2/module6/section1"
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">Test Format</div>
            </Link>
            <Link
              to="/study-centre/apprentice/am2/module6/section3"
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Time Management
              </div>
            </Link>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module6Section2;
