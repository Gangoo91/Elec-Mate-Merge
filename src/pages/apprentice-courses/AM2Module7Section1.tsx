/**
 * Module 7 · Section 1 — Knowledge test practice
 * AM2 day-prep — Cross-cutting exam strategy
 * Mock-paper practice that mirrors AM2 wording: working through questions systematically, no rushing.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  SectionRule,
  LearningOutcomes,
  TLDR,
  KeyTakeaways,
  FAQ,
  Scenario,
  CommonMistake,
  RegsCallout,
} from '@/components/study-centre/learning';

const TITLE = 'Knowledge Test Practice | AM2 Module 7.1 | Elec-Mate';
const DESCRIPTION =
  'Mock-paper AM2 practice that mirrors real test wording — work through each question systematically without burning the clock.';

const AM2Module7Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'time-allocation',
      question: 'How should you allocate your time for the AM2 knowledge test?',
      options: [
        'Spend equal time on each question',
        'Rush through easy questions first',
        'Work systematically through each question in order',
        'Skip difficult questions and return later',
      ],
      correctIndex: 2,
      explanation:
        "Work systematically through each question in order. Don't get stuck on difficult questions - mark for review and return if time permits. Rushing leads to careless errors.",
    },
    {
      id: 'question-types',
      question: 'Which AM2 knowledge test format requires the most careful attention?',
      options: [
        'True/False questions',
        'Multiple choice with similar answers',
        'Calculation questions',
        'Diagram interpretation',
      ],
      correctIndex: 1,
      explanation:
        'Multiple choice questions with similar answers require careful reading and understanding of subtle differences. These questions are designed to test precise knowledge.',
    },
    {
      id: 'feedback-usage',
      question: 'How should you use practice test feedback effectively?',
      options: [
        'Only review incorrect answers',
        'Focus on percentage scores achieved',
        'Review all explanations and identify knowledge gaps',
        'Repeat tests until you get 100%',
      ],
      correctIndex: 2,
      explanation:
        'Review all explanations, even for correct answers, to reinforce learning and identify any knowledge gaps or areas of uncertainty that need attention.',
    },
    {
      id: 'exam-strategy',
      question: "What's the best strategy when unsure about an answer?",
      options: [
        'Always guess the longest answer',
        'Use elimination to narrow down options',
        "Choose 'C' - it's most often correct",
        'Skip the question entirely',
      ],
      correctIndex: 1,
      explanation:
        "Use elimination to rule out obviously incorrect answers, then make an educated guess from remaining options. Don't leave questions blank unless penalised for wrong answers.",
    },
    {
      id: 'knowledge-gaps',
      question: 'How do you identify knowledge gaps effectively?',
      options: [
        'Count how many questions you get wrong',
        'Note which topics you consistently struggle with',
        'Focus only on calculation errors',
        'Review only the hardest questions',
      ],
      correctIndex: 1,
      explanation:
        'Track which specific topics or regulation areas you consistently struggle with, then target these areas for focused study and additional practice.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What percentage do you typically need to pass the AM2 knowledge test?',
      options: ['60%', '65%', '70%', '75%'],
      correctAnswer: 1,
      explanation:
        'Most AM2 knowledge tests require 65% to pass, though this can vary by provider. Check specific requirements with your assessment centre.',
    },
    {
      id: 2,
      question: 'How long do you typically have for the AM2 knowledge test?',
      options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes'],
      correctAnswer: 2,
      explanation:
        'The AM2 knowledge test is typically 60 minutes for around 50-60 questions, averaging about 1 minute per question.',
    },
    {
      id: 3,
      question:
        'Section 4 of the AM2 online test is open-book BS 7671. Which regulation requires that exposed-conductive-parts are connected to a protective conductor and that a circuit protective conductor is run to and terminated at each point in wiring?',
      options: [
        'Regulation 131.2.1',
        'Regulation 416.2.1',
        'Regulation 411.3.1.1',
        'Regulation 522.6.1',
      ],
      correctAnswer: 2,
      explanation:
        'Regulation 411.3.1.1 (Protective earthing) states: "Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6 ... A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point." Memorise where this lives in the regs — you will need to find it under time pressure on AM2 day.',
    },
    {
      id: 4,
      question:
        "What's the maximum measured Zs for a 32A Type B MCB under BS 7671:2018+A4:2026 (corrected for conductor temperature)?",
      options: ['1.44Ω', '1.37Ω', '0.87Ω', '2.3Ω'],
      correctAnswer: 1,
      explanation:
        'Under A4:2026, the maximum measured Zs for a B32 is 1.37Ω. The older 1.44Ω figure was the tabulated value before the 0.95 temperature correction was rolled into the table — make sure you use the current A4 values on AM2 day.',
    },
    {
      id: 5,
      question: 'Which test should be carried out first on a new installation?',
      options: [
        'Insulation resistance',
        'Earth fault loop impedance',
        'Continuity of protective conductors',
        'Polarity',
      ],
      correctAnswer: 2,
      explanation:
        'Continuity of protective conductors should be tested first to ensure safety before proceeding with other tests.',
    },
    {
      id: 6,
      question: "What's the minimum insulation resistance for a 230V circuit?",
      options: ['0.5MΩ', '1.0MΩ', '1.5MΩ', '2.0MΩ'],
      correctAnswer: 1,
      explanation:
        'Minimum insulation resistance for circuits up to 500V is 1.0MΩ, as specified in BS 7671.',
    },
    {
      id: 7,
      question: 'Which cable type requires an earth wire to be run separately?',
      options: ['Twin and earth', '3-core and earth', 'Single core cables in conduit', 'SWA cable'],
      correctAnswer: 2,
      explanation:
        "Single core cables in metallic conduit require a separate earth wire as the individual cables don't include an earth conductor.",
    },
    {
      id: 8,
      question: 'What does RCD stand for?',
      options: [
        'Residual Current Device',
        'Resistant Current Detector',
        'Reliable Circuit Detector',
        'Remote Control Device',
      ],
      correctAnswer: 0,
      explanation:
        'RCD stands for Residual Current Device - essential protection against electric shock commonly tested in AM2.',
    },
    {
      id: 9,
      question: 'Which Part of BS 7671 covers inspection and testing?',
      options: ['Part 6', 'Part 7', 'Part 5', 'Part 4'],
      correctAnswer: 1,
      explanation:
        'Part 7 of BS 7671 covers inspection and testing requirements - crucial for AM2 practical assessment understanding.',
    },
    {
      id: 10,
      question:
        "What's the standard test voltage for insulation resistance testing of 230V circuits?",
      options: ['250V DC', '500V DC', '1000V DC', '230V AC'],
      correctAnswer: 1,
      explanation:
        'Standard test voltage for insulation resistance of 230V circuits is 500V DC as specified in BS 7671.',
    },
  ];

  const learningOutcomes = [
    'Apply effective test-taking strategies and time management techniques',
    'Navigate different question types with confidence and accuracy',
    'Identify and address personal knowledge gaps through targeted practice',
    'Use feedback effectively to improve performance and understanding',
    'Demonstrate comprehensive knowledge of key BS 7671 regulations and testing procedures',
    'Build confidence through systematic practice and mock test experience',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1"
            title="Knowledge Test Practice"
            description="The knowledge test is typically the first component of AM2 assessment and sets the tone for your entire assessment. Mastering knowledge test strategies, practice questions, mock tests and exam techniques is essential for AM2 assessment success."
            tone="yellow"
          />

          <TLDR
            points={[
              'The online knowledge test is one hour, multiple-choice, BS 7671 open-book.',
              'It covers BS 7671:2018+A4:2026, H&S law, inspection and testing, and basic calculation.',
              'It’s pass/fail like every other section — but you can re-sit just this section if needed.',
              'Practice with timed mocks, not just reading the regs. Speed of lookup is half the battle.',
            ]}
          />

          <ConceptBlock title="Critical Assessment Component">
            <p>
              <strong className="text-red-300">Critical.</strong> The knowledge test is typically
              the first component of AM2 assessment and sets the tone for your entire assessment.
              Poor performance here can affect confidence and momentum. You must demonstrate
              thorough understanding of BS 7671, testing procedures, and safety requirements.
              Inadequate preparation or test-taking strategy will impact your overall AM2 success.
            </p>
          </ConceptBlock>

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="Multiple-Choice Question Banks">
            <p>
              <strong>Coverage Areas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS 7671 regulations and requirements</li>
              <li>Testing procedures and sequences</li>
              <li>Health and safety legislation</li>
              <li>Cable selection and installation methods</li>
              <li>Protection and control systems</li>
            </ul>
            <p>
              <strong>Practice Strategy:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Start with topic-specific question banks</li>
              <li>Progress to mixed topic practice</li>
              <li>Focus on areas of weakness identified</li>
              <li>Review explanations for all questions</li>
            </ul>
            <p>
              <strong className="text-amber-400">Key Point:</strong> Question banks should mirror
              the AM2 knowledge test format with similar difficulty levels and question styles.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <ConceptBlock title="Timed Mock Tests">
            <p>
              <strong>Test Conditions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>60 minutes for 50-60 questions</li>
              <li>No reference materials allowed</li>
              <li>Simulated exam environment</li>
              <li>Immediate scoring and feedback</li>
            </ul>
            <p>
              <strong>Benefits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Experience time pressure of real test</li>
              <li>Identify pacing issues early</li>
              <li>Build confidence through practice</li>
              <li>Assess readiness for actual assessment</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <ConceptBlock title="Feedback and Explanations">
            <p>
              <strong>Comprehensive Analysis:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Detailed explanations for correct answers</li>
              <li>Common misconceptions highlighted</li>
              <li>Reference to specific BS 7671 regulations</li>
              <li>Links to additional learning resources</li>
            </ul>
            <p>
              <strong>Performance Tracking:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Topic-by-topic performance analysis</li>
              <li>Progress tracking over time</li>
              <li>Identification of improvement areas</li>
              <li>Personalised study recommendations</li>
            </ul>
            <p>
              <strong className="text-green-400">Best Practice:</strong> Review explanations even
              for questions answered correctly to reinforce understanding and identify any gaps.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <ConceptBlock title="Identifying Knowledge Gaps">
            <p>
              <strong>Self-Assessment Techniques:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Topic-specific mini tests</li>
              <li>Confidence rating for each answer</li>
              <li>Error pattern analysis</li>
              <li>Peer discussion and comparison</li>
            </ul>
            <p>
              <strong>Common Weak Areas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maximum demand calculations</li>
              <li>Protective device coordination</li>
              <li>Testing sequence requirements</li>
              <li>Special location regulations</li>
            </ul>
            <p>
              <strong>Targeted Study Plan:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Focus 70% effort on identified weak areas</li>
              <li>Maintain 30% revision of strong areas</li>
              <li>Use spaced repetition for retention</li>
              <li>Regular reassessment and adjustment</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[3].id}
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          <ConceptBlock title="Exam Techniques and Strategies">
            <p>
              <strong>Time Management:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Allocate roughly 1 minute per question</li>
              <li>Flag difficult questions for review</li>
              <li>Don't spend too long on any single question</li>
              <li>Save 5-10 minutes for final review</li>
            </ul>
            <p>
              <strong>Question Approach:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Read questions carefully and completely</li>
              <li>Identify key words and qualifiers</li>
              <li>Use elimination for uncertain answers</li>
              <li>Trust your first instinct if genuinely unsure</li>
            </ul>
            <p>
              <strong>Common Pitfalls:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Misreading question requirements</li>
              <li>Changing correct answers unnecessarily</li>
              <li>Running out of time on difficult questions</li>
              <li>Not using process of elimination</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Strategy:</strong> Aim for 65-70% to comfortably
              pass. Perfect scores aren't necessary — focus on consistent accuracy.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[4].id}
            question={quickCheckQuestions[4].question}
            options={quickCheckQuestions[4].options}
            correctIndex={quickCheckQuestions[4].correctIndex}
            explanation={quickCheckQuestions[4].explanation}
          />

          <ConceptBlock title="Summary">
            <p>
              Effective knowledge test preparation requires a systematic approach combining
              theoretical study with practical test-taking experience. Success depends on
              identifying and addressing knowledge gaps while developing confidence through repeated
              practice under exam conditions.
            </p>
            <p>
              <strong className="text-green-400">Key Success Factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Regular practice with mock tests</li>
              <li>Detailed review of all explanations</li>
              <li>Systematic approach to weak areas</li>
              <li>Effective time management strategies</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Common Failures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Inadequate practice under time pressure</li>
              <li>Focusing only on preferred topics</li>
              <li>Poor exam technique and time management</li>
              <li>Insufficient review of incorrect answers</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Open-Book Regs You Need Verbatim">
            <p>
              Section 4 of the AM2 online test is <strong>open-book BS 7671</strong>, but you only
              have a few minutes per question. You don't get marks for paraphrasing — you get marks
              for finding and quoting the right clause. Drill these four until you can locate them
              in your regs book in under 30 seconds.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 131.2.1"
            clause="Persons and livestock shall be protected against dangers that may arise from contact with live parts of the installation. This protection can be achieved by one of the following methods: (a) preventing a current from passing through the body of any person or any livestock; (b) limiting the current which can pass through a body to a non-hazardous value."
            meaning={
              <>
                This is the headline statement of basic protection — what stops you touching a live
                busbar in the first place. On AM2 day it underpins every question about insulation,
                barriers, enclosures and IP ratings.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 131.2.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.1"
            clause="Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively. Conductors for protective earthing shall comply with Chapter 54. A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point."
            meaning={
              <>
                This is why you sleeve every CPC and land it at every box, even on a lighting
                circuit where the accessory is plastic. It's also the reg that justifies bonding
                metal backboxes and fittings to the same earthing system.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 411.3.1.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 416.2.1"
            clause="Live parts shall be inside enclosures or behind barriers providing at least the degree of protection IPXXB or IP2X except that, where larger openings occur during the replacement of parts, such as certain lampholders or fuses, or where larger openings are necessary to allow the proper functioning of equipment according to the relevant requirements for the equipment: (a) suitable precautions shall be taken to prevent persons or livestock from unintentionally touching live parts; and (b) as far as is reasonably practicable, persons will be aware that live parts can be touched through the opening and should not be touched intentionally; and (c) the opening shall be as small as is consistent with the requirement for proper functioning and for replacement of a part."
            meaning={
              <>
                IP2X / IPXXB is the minimum on the front of any consumer unit, accessory or piece of
                fixed gear you fit on AM2 day. If you can poke a finger to a live part, you've
                failed this reg — and the assessor will mark it.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 416.2.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 522.6.1"
            clause="Wiring systems shall be selected and erected so as to minimize the damage arising from mechanical stress, for example, by impact, abrasion, penetration, tension or compression during installation, use or maintenance."
            meaning={
              <>
                This is the headline reg behind cable supports, capping, grommets, safe zones and
                protecting cables where they pass through metalwork. It's the one to quote whenever
                an AM2 question asks why a cable needs extra protection.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 522.6.1."
          />

          <SectionRule />

          <Scenario
            title="Stuck on a question with twelve minutes left"
            situation={
              <>
                You’re forty minutes into the one-hour knowledge test. You’ve answered most
                questions confidently but you’re stuck on a complex Zs calculation. The question
                carries the same weight as every other one. The clock is ticking.
              </>
            }
            whatToDo={
              <>
                Flag the question (most platforms allow this), move on, and finish the rest of the
                paper. Come back to it with whatever time is left. Never let one hard question burn
                ten minutes you needed for the easy ones at the end. If you genuinely don’t know
                with two minutes left, eliminate the obviously-wrong options and pick the most
                likely from what’s left — blank answers score zero, guesses sometimes score full.
              </>
            }
            whyItMatters={
              <>
                Multiple-choice tests reward pace and pattern. Candidates who fail the knowledge
                test usually fail because they ran out of time, not because they didn’t know the
                material.
              </>
            }
          />

          <CommonMistake
            title="Trying to memorise BS 7671 instead of practising lookup"
            whatHappens={
              <>
                You spend evenings flicking through the brown book trying to remember reg numbers.
                On the day, the test asks you to find specific values from Appendix 3 or Table 41.1,
                and you waste minutes hunting because you’ve never timed yourself doing it.
              </>
            }
            doInstead={
              <>
                Practise lookup with a stopwatch. Tab the appendices and the most-used tables. Aim
                to find any specific value (cable rating, disconnection time, RCD type) in under
                thirty seconds. Speed of lookup beats memorisation every time.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'How many questions are there?',
                answer:
                  'Typically 30–40 multiple-choice questions in 60 minutes — that’s under two minutes per question. Centres vary slightly; check your candidate brief.',
              },
              {
                question: 'Is BS 7671 the only book I can use?',
                answer:
                  'BS 7671 is the main reference. Some centres allow the IET On-Site Guide and your own notes. The candidate brief lists what’s permitted — bring nothing extra.',
              },
              {
                question: 'Do I need a calculator?',
                answer:
                  'Yes. There are calculation questions on Zs, voltage drop, current rating and basic earth fault loop. Bring a non-programmable calculator. Most centres also have one available.',
              },
              {
                question: 'What if I fail the knowledge test but pass everything else?',
                answer:
                  'You re-sit just the knowledge test. NET allows targeted re-sits — you don’t redo the whole AM2.',
              },
              {
                question: 'Are the questions the same as the IET sample papers?',
                answer:
                  'No — but the style and difficulty are similar. Use IET sample questions, mock tests from approved providers, and any practice materials your training centre offers.',
              },
              {
                question: 'Can I tab my BS 7671 book?',
                answer:
                  'Yes. Tabs and highlighter marks are allowed. Handwritten notes inside the book are usually not — check the candidate brief. Most candidates tab the major chapters and key appendices.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Knowledge test = one hour, multiple-choice, BS 7671 open-book.',
              '~30–40 questions in 60 minutes — pace yourself at under two minutes per question.',
              'Practise lookup with a stopwatch. Tab the appendices and key tables.',
              'Bring a non-programmable calculator and your tabbed BS 7671.',
              'Flag and move on if you’re stuck — never burn ten minutes on one hard question.',
              'Failing the knowledge test means re-sitting only the knowledge test, not the whole AM2.',
              'Speed of lookup matters more than memorising reg numbers.',
              'Every blank answer scores zero. Educated guesses sometimes score. Never leave fields empty.',
            ]}
          />

          <Quiz title="Knowledge Check Quiz" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module6/section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module 6 Section 4
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module7/section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Coping with Nerves
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module7Section1;
