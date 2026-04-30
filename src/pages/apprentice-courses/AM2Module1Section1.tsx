/**
 * Module 1 · Section 1 — Purpose of the AM2 and who it's for
 * AM2 day-prep — Assessment overview (purpose, structure, marking, common fails)
 * Sets the scene: what the AM2 actually is, who sits it and why it matters for your card.
 */

import { CheckCircle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { AM2TestSequence } from '@/components/apprentice-courses/AM2TestSequence';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  SectionRule,
  VideoCard,
  TLDR,
  KeyTakeaways,
  FAQ,
  Scenario,
  CommonMistake,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = "Purpose of the AM2 and Who It's For | AM2 Module 1.1 | Elec-Mate";
const DESCRIPTION =
  'What the AM2 actually proves, who sits it and why this end-of-apprenticeship assessment is the gateway to your ECS Gold Card.';

const AM2Module1Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: 'What is the primary purpose of the AM2 assessment?',
      options: [
        'To teach new electrical skills',
        'To prove competence and readiness to work as a qualified electrician',
        'To catch out apprentices with trick questions',
        'To provide theoretical knowledge only',
      ],
      correctAnswer: 1,
      explanation:
        'The AM2 is designed to prove you are ready to work as a qualified electrician by demonstrating competence in practical skills.',
    },
    {
      id: 2,
      question: 'Who is the AM2 assessment primarily aimed at?',
      options: [
        'Complete beginners to electrical work',
        'Final-stage apprentices and experienced electricians seeking qualification',
        'Electrical engineers only',
        'DIY enthusiasts',
      ],
      correctAnswer: 1,
      explanation:
        'The AM2 is for apprentices at the end of their training or experienced electricians going through assessment routes like NVQ Level 3.',
    },
    {
      id: 3,
      question: 'What credential does passing the AM2 allow you to apply for?',
      options: [
        'City & Guilds certificate',
        'University degree',
        'ECS Gold Card',
        'Health and Safety certificate',
      ],
      correctAnswer: 2,
      explanation:
        'Passing the AM2 allows you to apply for an ECS Gold Card, which is your passport to working as a fully qualified electrician in the UK.',
    },
  ];

  const assessmentSteps = [
    {
      title: 'Section A1 - Risk Assessment & Initial Setup',
      description:
        'Risk assessment completion and hazard identification, safe working method statements, PPE selection and workspace preparation before installation begins.',
    },
    {
      title: 'Section A2-A5 - Composite Installation (8 hours 30 minutes) - Main Component',
      description:
        'Cable installation using various methods (conduit, trunking, clipping), SWA cable termination techniques, mechanical protection and support systems, accessory installation and final connections.',
    },
    {
      title: 'Section B - Inspection, Testing & Certification (3.5 hours)',
      description:
        'Complete sequence of electrical tests, earth fault loop impedance measurements, insulation resistance testing, RCD testing and verification, certificate completion.',
    },
    {
      title: 'Section C - Safe Isolation of Circuits (45 minutes)',
      description:
        'Three scenarios requiring safe isolation procedures covering single-phase equipment isolation, three-phase isolator procedures, and distribution board isolation.',
    },
    {
      title: 'Section D - Fault Diagnosis & Rectification (2 hours)',
      description:
        'Systematic fault diagnosis using test equipment, circuit analysis and problem identification, safe fault rectification procedures, verification testing after repairs.',
    },
    {
      title: 'Section E - Online Knowledge Test (1 hour)',
      description:
        'BS 7671 Wiring Regulations questions, cable calculations and protective device selection, health and safety requirements, inspection and testing procedures.',
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1"
            title="Understanding AM2 Assessment"
            description="Learn about the AM2 practical assessment - your pathway to becoming a qualified electrician."
            tone="yellow"
          />

          <TLDR
            points={[
              'AM2 is a 2½-day, ~16.5-hour practical end-test that proves you’re ready to work as a qualified electrician.',
              'You’ll be marked Competent or Not Yet Competent on each criterion — there’s no percentage score to chase.',
              'Pass it and you can apply for your ECS Gold Card. Fail it and you sit it again — it’s not an exam to wing.',
              'It tests installation, inspection and testing, safe isolation, fault finding and an online knowledge test.',
            ]}
          />

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">15,000+</div>
              <div className="text-ios-footnote text-white">Take AM2 annually</div>
            </div>
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">2½ Days</div>
              <div className="text-ios-footnote text-white">16.5 hours total</div>
            </div>
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">£8,000</div>
              <div className="text-ios-footnote text-white">Avg salary increase</div>
            </div>
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">NVQ 3</div>
              <div className="text-ios-footnote text-white">Qualification level</div>
            </div>
          </div>

          <SectionRule />

          {/* What is AM2? */}
          <ConceptBlock
            title="What is AM2?"
            plainEnglish="AM2 (Achievement Measurement 2) is a 2½-day practical assessment totalling 16.5 hours for electrical workers completing their NVQ Level 3. It proves your competency in electrical installation work and unlocks your ECS Gold Card."
          >
            <p>
              <strong className="text-elec-yellow">Important:</strong> This isn't just a test — it's
              your final step to becoming a fully qualified electrician. The assessment simulates
              real workplace conditions and you'll be evaluated on safety, technical skill, and
              professional standards.
            </p>
          </ConceptBlock>

          <SectionRule />

          {/* Assessment Breakdown */}
          <ConceptBlock title="AM2 Assessment Components">
            <p>
              The AM2 assessment comprises 6 distinct sections totalling ~16.5 hours over 2½ days.
              Most of your time is spent on installation work, while other sections test how you
              finish, check, and fix your work.
            </p>
            <AM2TestSequence steps={assessmentSteps} />
            <p>
              <strong className="text-elec-yellow">Important Note.</strong> These timings vary
              slightly by assessment centre, but the balance remains the same across all providers.
              The installation component always takes up the majority of your time.
            </p>
          </ConceptBlock>

          <SectionRule />

          {/* Assessment Criteria */}
          <ConceptBlock title="How You'll Be Assessed">
            <p>
              The AM2 uses competence-based assessment. Assessors judge each criterion as Competent
              or Not Yet Competent using objective Yes/No marking rather than percentage scores:
            </p>
            <p>
              <strong>Practical Skills</strong> — each task assessed as Competent / Not Yet
              Competent:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Installation techniques and cable management</li>
              <li>SWA termination and accessory connections</li>
              <li>Workmanship to professional standards</li>
            </ul>
            <p>
              <strong>Safe Working Practices</strong> — must demonstrate safe isolation and
              compliance throughout:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Risk assessment completion</li>
              <li>PPE usage and safe working methods</li>
              <li>Correct isolation and prove-dead procedures</li>
            </ul>
            <p>
              <strong>Testing &amp; Results</strong> — all test results must be within acceptable
              tolerances:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Correct testing sequence per GN3</li>
              <li>Accurate and complete test results</li>
              <li>Properly completed certification paperwork</li>
            </ul>
            <p>
              <strong>Professional Standards</strong> — work must meet BS 7671 requirements:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Compliance with wiring regulations</li>
              <li>Task completion within timeframes</li>
              <li>Planning, organisation and workmanlike finish</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <div className="my-6">
            <VideoCard
              url={videos.am2BookingRequirements.url}
              title={videos.am2BookingRequirements.title}
              channel={videos.am2BookingRequirements.channel}
              duration={videos.am2BookingRequirements.duration}
              topic="AM2 / AM2E booking — when and how"
              caption={
                <>
                  Craig walks through the booking criteria — what you need under your belt before
                  NET will let you sit AM2, and what's different about AM2E.
                </>
              }
            />
          </div>

          <InlineCheck
            id="am2-understanding"
            question="What does AM2 stand for?"
            options={[
              'Apprentice Module 2',
              'Achievement Measurement 2',
              'Advanced Maintenance 2',
              'Assessed Module 2',
            ]}
            correctIndex={1}
            explanation="AM2 stands for Achievement Measurement 2, which is the practical assessment for electrical installation workers."
          />

          <SectionRule />

          {/* Who is AM2 For? */}
          <ConceptBlock title="Who Takes AM2?">
            <p>
              AM2 is designed for electrical workers at the final stage of their training or those
              seeking formal recognition of their skills.
            </p>
            <p>
              <strong>Typical Candidates:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Final year electrical apprentices</li>
              <li>Experienced electricians needing formal qualification</li>
              <li>Career changers with electrical training</li>
              <li>International electricians seeking UK recognition</li>
            </ul>
            <p>
              <strong>Experience Level.</strong> Most candidates have 2-4 years of electrical
              installation experience and are working towards completing their NVQ Level 3
              qualification.
            </p>
            <p>
              <strong>Essential Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Level 3 Electrical Installation Diploma</li>
              <li>BS 7671:2018+A4:2026 Wiring Regulations</li>
              <li>Inspection &amp; Testing qualification</li>
              <li>Hands-on installation experience</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Before You Book.</strong> Ensure you're confident
              with practical installation work, testing procedures, and can work independently to
              professional standards.
            </p>
          </ConceptBlock>

          <SectionRule />

          {/* Preparation Guide */}
          <ConceptBlock title="How to Prepare">
            <p>
              Success in AM2 comes from thorough preparation. Here's your roadmap to assessment
              readiness:
            </p>
            <p>
              <strong>Technical Skills:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Practice conduit bending techniques</li>
              <li>Master SWA cable terminations</li>
              <li>Refresh cable calculation methods</li>
              <li>Practice testing sequences</li>
            </ul>
            <p>
              <strong>Knowledge Review:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Study BS 7671 key sections</li>
              <li>Review protective device selection</li>
              <li>Understand earthing systems</li>
              <li>Know inspection schedules</li>
            </ul>
            <p>
              <strong>Practical Prep:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete mock assessments</li>
              <li>Time yourself on installations</li>
              <li>Practice fault-finding scenarios</li>
              <li>Perfect your test procedures</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Recommended Preparation Time.</strong> Allow 3-6
              months of focused preparation, including 40-60 hours of additional practice beyond
              your regular work. Many training centres offer AM2 preparation courses which can
              significantly boost your confidence.
            </p>
          </ConceptBlock>

          <InlineCheck
            id="target-audience"
            question="Which qualification is a prerequisite for AM2?"
            options={[
              'Level 2 Electrical Installation',
              'BS 7671:2018+A4:2026 IET Wiring Regulations (current amendment)',
              'PAT Testing Certificate',
              'First Aid Certificate',
            ]}
            correctIndex={1}
            explanation="The IET Wiring Regulations qualification (currently BS 7671:2018+A4:2026) is essential before taking AM2."
          />

          <SectionRule />

          {/* Career Impact */}
          <ConceptBlock title="Why It Matters for Your Career">
            <p>
              Passing AM2 transforms your career prospects and opens doors that remain closed to
              unqualified electricians.
            </p>
            <p>
              <strong>Immediate Impact:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ECS Gold Card</strong> — access to construction sites nationwide
              </li>
              <li>
                <strong>JIB Recognition</strong> — industry-wide acceptance of your skills
              </li>
              <li>
                <strong>Insurance Benefits</strong> — lower rates for qualified tradespeople
              </li>
            </ul>
            <p>
              <strong>Long-term Opportunities:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Self-Employment</strong> — start your own electrical business
              </li>
              <li>
                <strong>Management Roles</strong> — progress to supervisory positions
              </li>
              <li>
                <strong>Specialist Sectors</strong> — access high-value commercial projects
              </li>
            </ul>
            <p>
              <strong>Salary Impact:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>£28-32k</strong> — Newly Qualified
              </li>
              <li>
                <strong>£35-42k</strong> — 3-5 Years Experience
              </li>
              <li>
                <strong>£45-55k</strong> — Senior/Specialist
              </li>
              <li>
                <strong>£60k+</strong> — Self-Employed
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          {/* Common Challenges */}
          <ConceptBlock title="Common Challenges & How to Overcome Them">
            <p>
              Understanding common pitfalls helps you prepare more effectively and avoid typical
              mistakes.
            </p>
            <p>
              <strong className="text-red-300">Time Management Issues.</strong> Many candidates
              struggle to complete all tasks within the allocated timeframe.{' '}
              <strong>Solution:</strong> Practice timed installations, create a personal checklist,
              and prioritise safety-critical tasks first.
            </p>
            <p>
              <strong className="text-elec-yellow">Testing Procedure Errors.</strong> Incorrect
              testing sequence or missed tests are common failure points. <strong>Solution:</strong>{' '}
              Memorise the BS 7671 testing sequence and practice until it becomes automatic.
            </p>
            <p>
              <strong className="text-elec-yellow">Documentation Quality.</strong> Poor handwriting,
              incomplete certificates, or calculation errors can cost marks.{' '}
              <strong>Solution:</strong> Practice certificate completion and double-check all
              calculations and entries.
            </p>
            <p>
              <strong className="text-elec-yellow">Success Tips:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Arrive early and familiarise yourself with the workspace</li>
              <li>Read all instructions thoroughly before starting</li>
              <li>Maintain consistent safety practices throughout</li>
              <li>Ask assessors for clarification if instructions are unclear</li>
              <li>Keep your workspace organised and tools maintained</li>
              <li>Leave time for final checks and documentation review</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="career-benefits"
            question="What is one immediate benefit of passing AM2?"
            options={[
              'Automatic salary increase',
              'ECS Gold Card eligibility',
              'Company vehicle provision',
              'Guaranteed job placement',
            ]}
            correctIndex={1}
            explanation="Passing AM2 makes you eligible for an ECS Gold Card, essential for working on construction sites."
          />

          <SectionRule />

          <Scenario
            title="Walking into the centre on day one"
            situation={
              <>
                You arrive at the AM2 centre. The assessor hands you a folder with a specification,
                a drawing pack and a blank certificate. Other candidates are unpacking tool bags
                around the rig. You’ve got two and a half days to prove you’re a qualified
                electrician.
              </>
            }
            whatToDo={
              <>
                Read the specification before you touch anything. Plan your sequence. Confirm what
                tools and PPE you need for each section. Treat day one as installation, day two as
                inspection and testing, and the half-day as fault finding and the knowledge test —
                that’s the rough shape every centre runs.
              </>
            }
            whyItMatters={
              <>
                The candidates who fail aren’t usually short on skill — they panic on the first hour
                and never recover the time. Understanding the structure before you walk in turns the
                day from scary to predictable.
              </>
            }
          />

          <CommonMistake
            title="Treating AM2 like a college exam"
            whatHappens={
              <>
                You revise theory, memorise reg numbers, and walk in expecting questions. AM2 is a
                practical competence assessment — the assessor watches you work and judges each task
                as Competent or Not Yet Competent.
              </>
            }
            doInstead={
              <>
                Practise the practical work. Time your installations. Run through safe isolation
                until it’s automatic. Get comfortable filling in a certificate under pressure.
                Theory only counts in the one-hour online knowledge test.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'Do I have to pass every single criterion to pass AM2?',
                answer:
                  'You can have a small number of "Not Yet Competent" criteria and still pass overall, but anything in the critical-fail list (live working, dangerous isolation, certificate forgery) is an automatic fail no matter what else you got right.',
              },
              {
                question: 'What happens if I fail one section?',
                answer:
                  'Most centres let you re-sit only the section you failed within a set window — usually 12 weeks. You don’t have to redo the full 2½ days. Costs vary by centre but expect a few hundred pounds.',
              },
              {
                question: 'Can I bring my own tools?',
                answer:
                  'Yes — bring your own hand tools and PPE. The centre provides the rig, materials, switchgear and test instruments. Check the centre’s pre-arrival list a week before so nothing is missed.',
              },
              {
                question: 'Is the BS 7671 book allowed in the assessment?',
                answer:
                  'Yes — you’re expected to use it. The assessment is open-book for the practical sections and the online knowledge test references it too. If you’re not fluent at finding things in it, you’ll waste time.',
              },
              {
                question: 'Do I need my Level 3 qualification before booking AM2?',
                answer:
                  'You need Level 3 Electrical Installation, the current edition of BS 7671 (2018+A4:2026) and an Inspection & Testing qualification. NET will not let you book without these in place.',
              },
              {
                question: 'How long does the result take?',
                answer:
                  'Most centres give you a provisional result on the day. The official NET pass certificate and ECS Gold Card eligibility typically arrive within two to four weeks.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'AM2 is the practical end-test for the Level 3 electrical apprenticeship — pass it and you’re a qualified electrician.',
              'It’s competence-based: each criterion is Competent or Not Yet Competent, no percentage score.',
              'The day is split into installation, inspection and testing, safe isolation, fault diagnosis and an online knowledge test.',
              'Critical fails (unsafe isolation, working live, certificate fraud) override everything else — one of these and you’re out.',
              'Practical preparation beats theory revision — practise the rig work, time yourself and rehearse certificate completion.',
              'Bring your own tools, PPE and BS 7671. The centre provides the rig and instruments.',
              'Failing a section means a re-sit of that section, not the whole assessment.',
            ]}
          />

          {/* Quiz Section */}
          <Quiz questions={quizQuestions} title="AM2 Understanding Quiz" />

          {/* Navigation Footer */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Back to Module
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module1/section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Continue to Section 2
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module1Section1;
