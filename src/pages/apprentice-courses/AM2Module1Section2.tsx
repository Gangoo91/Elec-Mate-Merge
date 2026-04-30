/**
 * Module 1 · Section 2 — Structure and timings of the AM2 assessment
 * AM2 day-prep — Assessment overview (purpose, structure, marking, common fails)
 * The five sections (A-E), how long you get for each and how to pace your day.
 */

import {
  Clock,
  CheckCircle,
  Target,
  Zap,
  FileText,
  Settings,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  SectionRule,
  TLDR,
  KeyTakeaways,
  FAQ,
  Scenario,
  CommonMistake,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Structure and Timings of the AM2 Assessment | AM2 Module 1.2 | Elec-Mate';
const DESCRIPTION =
  'How the AM2 day breaks down across Sections A to E, the time you get for each and the pacing that keeps you on track.';

const AM2Module1Section2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const assessmentStats = [
    {
      number: '5',
      label: 'Assessment Sections',
      description: 'Five main sections (A-E) testing different skills',
    },
    {
      number: '~16.5',
      label: 'Total Hours',
      description: 'Spread across 2.5 days',
    },
    {
      number: '8.5',
      label: 'Installation Hours',
      description: 'Largest section of the assessment',
    },
    {
      number: '45',
      label: 'Minutes for Isolation',
      description: 'Critical safety assessment',
    },
  ];

  const assessmentSections = [
    {
      section: 'A (A1-A5)',
      title: 'Composite Installation',
      duration: '8.5 hours',
      description:
        'Install and terminate circuits including ring finals, lighting, three-phase distribution, data cabling, protective bonding, and heating controls. Split into sub-tasks A1-A5 covering different installation elements.',
      icon: Settings,
      color: 'text-elec-yellow',
    },
    {
      section: 'B',
      title: 'Inspection, Testing & Certification',
      duration: '3.5 hours',
      description:
        'Complete testing suite: continuity, insulation resistance, polarity, earth fault loop impedance, RCD testing, and certification paperwork.',
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      section: 'C',
      title: 'Safe Isolation of Circuits',
      duration: '45 minutes',
      description:
        'Isolate different circuit types in specific scenarios - single-phase equipment, three-phase isolators, distribution board isolation.',
      icon: Zap,
      color: 'text-elec-yellow',
    },
    {
      section: 'D',
      title: 'Fault Diagnosis & Rectification',
      duration: '2 hours',
      description:
        'Find pre-programmed faults, identify fault types, explain corrections, and rectify with retesting. Logic over guessing.',
      icon: Target,
      color: 'text-elec-yellow',
    },
    {
      section: 'E',
      title: 'Assessment of Applied Knowledge',
      duration: '1 hour',
      description:
        'Online multiple-choice exam covering health & safety, BS 7671 Wiring Regulations, building regulations, and safe practices.',
      icon: BookOpen,
      color: 'text-indigo-500',
    },
  ];

  const timeManagementTips = [
    {
      title: 'Plan Before You Touch Anything',
      description: 'Spend five minutes mapping your work sequence. This saves hours later.',
      icon: Clock,
    },
    {
      title: "Don't Chase Speed",
      description: 'Assessors want safe, competent work. Rushing creates costly mistakes.',
      icon: Target,
    },
    {
      title: 'Prioritise Safety Steps',
      description: 'Failing isolation or forgetting lockout can mean immediate failure.',
      icon: AlertTriangle,
    },
    {
      title: 'Leave Time for Paperwork',
      description: 'Incomplete or incorrect test sheets will lose you marks.',
      icon: FileText,
    },
  ];

  const checklistItems = [
    'The AM2 is divided into five main sections (A-E), totalling about ~16.5 hours',
    'Installation is the largest part (8.5 hours) - plan carefully and pace yourself',
    'Safe isolation tasks are short but crucial; failure here is often automatic',
    "Testing and certification is 3.5 hours - don't underestimate paperwork time",
    'Fault diagnosis is about logic, not luck - work step by step',
    'The online knowledge test lasts 1 hour with multiple-choice questions',
    'Safety, accuracy, and neatness always score higher than speed',
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
            eyebrow="Module 1 · Section 2"
            title="Structure and Timings of the Assessment"
            description="One of the main challenges of the AM2 is not just completing the tasks but doing them within the strict time limits. Understanding the structure and timings before you walk in gives you a huge advantage."
            tone="yellow"
          />

          <TLDR
            points={[
              'AM2 has five sections (A–E) over roughly 16.5 hours spread across 2½ days.',
              'Section A (composite installation) eats 8.5 hours — that’s where time pressure hits hardest.',
              'Safe isolation is short (~45 minutes) but a critical fail here ends the assessment regardless of the rest.',
              'Plan your sequence in the first five minutes of every section — pace beats panic every time.',
            ]}
          />

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {assessmentStats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center"
              >
                <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">
                  {stat.number}
                </div>
                <div className="text-ios-footnote font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-ios-footnote text-white">{stat.description}</div>
              </div>
            ))}
          </div>

          <SectionRule />

          {/* Assessment Structure */}
          <ConceptBlock title="How the AM2 Is Structured">
            <p>
              The AM2 is divided into five main sections (A through E). Each section tests a
              different set of skills, but together they prove you are safe, competent, and ready
              for industry.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              {assessmentSections.map((section, index) => (
                <li key={index}>
                  <strong>
                    {section.section} – {section.title}
                  </strong>{' '}
                  <span className="text-elec-yellow">({section.duration})</span> —{' '}
                  {section.description}
                </li>
              ))}
            </ul>
          </ConceptBlock>

          <SectionRule />

          {/* Total Time */}
          <ConceptBlock title="Total Time">
            <p>
              The overall duration of the AM2 is around{' '}
              <span className="text-elec-yellow font-semibold">~16.5 hours</span>, normally spread
              across <span className="text-elec-yellow font-semibold">two and a half days</span>.
              Some centres allow short breaks between sections, but you should be prepared for long
              sessions of focused work.
            </p>
          </ConceptBlock>

          <SectionRule />

          {/* Time Management Tips */}
          <ConceptBlock title="Time Management Tips">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              {timeManagementTips.map((tip, index) => (
                <li key={index}>
                  <strong>{tip.title}.</strong> {tip.description}
                </li>
              ))}
            </ul>
          </ConceptBlock>

          <SectionRule />

          {/* Additional Time Management Strategies */}
          <ConceptBlock title="Additional Time Management Strategies">
            <p>
              <span className="text-elec-yellow font-semibold">Treat each section as a reset.</span>{' '}
              If one task doesn't go perfectly, don't carry the stress into the next. The AM2 is
              marked section by section, not on overall impression.
            </p>
            <p>
              <span className="text-elec-yellow font-semibold">Practice under time pressure.</span>{' '}
              During your preparation, time yourself on practice tasks to get used to working
              efficiently under pressure.
            </p>
            <p>
              <span className="text-elec-yellow font-semibold">Know your weak areas.</span> Spend
              extra time practicing the sections you find most challenging, but don't neglect the
              areas you're confident in.
            </p>
          </ConceptBlock>

          <SectionRule />

          {/* Assessment Day Schedule */}
          <ConceptBlock title="Typical Assessment Schedule">
            <p>
              <strong>Day 1 (6–7 hours):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Installation Work begins (6-7 hours)</li>
              <li>Break periods as centre allows</li>
            </ul>
            <p>
              <strong>Day 2 (6–7 hours):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Continue Installation Work (2.5-3.5 hours)</li>
              <li>Begin Testing &amp; Certification (3.5 hours)</li>
              <li>Complete paperwork</li>
            </ul>
            <p>
              <strong>Day 3 (3–4 hours):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Safe Isolation of Circuits (45 min)</li>
              <li>Fault Diagnosis (2 hours)</li>
              <li>Online Knowledge Test (1 hour)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          {/* Common Time Wasters */}
          <ConceptBlock title="Common Time Wasters to Avoid">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Poor Planning</strong> — Not reading the entire brief before starting work
              </li>
              <li>
                <strong>Tool Organisation</strong> — Wasting time looking for tools or components
              </li>
              <li>
                <strong>Measurement Errors</strong> — Having to re-run cables due to incorrect
                measurements
              </li>
              <li>
                <strong>Perfectionism</strong> — Spending too long on cosmetic improvements
              </li>
              <li>
                <strong>Test Equipment Issues</strong> — Not checking equipment functionality
                beforehand
              </li>
              <li>
                <strong>Paperwork Panic</strong> — Leaving insufficient time for test certificates
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          {/* Preparation Focus Areas */}
          <ConceptBlock title="How to Prepare for Time Management">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-elec-yellow text-ios-callout mb-2">
                  Practice with Realistic Timings
                </h4>
                <p className="text-ios-body text-white">
                  Set yourself challenges during training: "Can I complete this ring final in 45
                  minutes?" Time yourself regularly to build realistic expectations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow text-ios-callout mb-2">
                  Master Your Test Equipment
                </h4>
                <p className="text-ios-body text-white">
                  Know exactly which buttons to press and in what sequence. Practice until testing
                  procedures become automatic.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow text-ios-callout mb-2">
                  Memorise Key Calculations
                </h4>
                <p className="text-ios-body text-white">
                  Know cable length calculations, volt drop formulas, and certification requirements
                  by heart. No time to look these up during the assessment.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow text-ios-callout mb-2">
                  Develop Work Sequences
                </h4>
                <p className="text-ios-body text-white">
                  Create standard approaches for common tasks. Always do risk assessment, isolation,
                  installation, testing, and certification in that order.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <SectionRule />

          {/* Tips and Checklist */}
          <ConceptBlock title="Tips and Checklist">
            <div className="space-y-3">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-ios-body text-white">{item}</span>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="The first hour of Section A"
            situation={
              <>
                You’ve started Section A. The rig has conduit, trunking, an SWA run and a
                three-phase isolator to terminate. The candidate next to you has already started
                bending conduit and you can feel yourself wanting to do the same.
              </>
            }
            whatToDo={
              <>
                Stop. Read the spec end-to-end. Walk the rig once and check what cable, what
                fixings, what terminations are required. Sketch a rough sequence — installation
                order matters because some accessories block access to others. Five minutes of
                planning saves an hour of unpicking.
              </>
            }
            whyItMatters={
              <>
                Candidates who run out of time in Section A almost always rushed the first ten
                minutes. The clock starts when you start the planning, not when you pick up a tool.
              </>
            }
          />

          <CommonMistake
            title="Treating the 8.5-hour installation as one long block"
            whatHappens={
              <>
                You head down without sub-targets and look up at lunch on day one to realise you’re
                hours behind. By day two you’re cutting corners on terminations to claw time back —
                and that’s when the workmanship marks slip.
              </>
            }
            doInstead={
              <>
                Break Section A into A1–A5 sub-tasks and give each a target finish time. Tick them
                off as you go. If you’re behind on one sub-task, decide whether to fix it now or
                bank the lost time and work it into the next one.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'Do I get the timings on the day or know them in advance?',
                answer:
                  'You know the section timings in advance — they’re published by NET. The order can vary slightly by centre, but the durations don’t change.',
              },
              {
                question: 'Can I take breaks?',
                answer:
                  'Yes — there’s a scheduled lunch break each day, and you can take the loo or a brew break if you need to. The clock keeps running on the section, so factor that in when planning.',
              },
              {
                question: 'What if I finish a section early?',
                answer:
                  'Use the time to check your work. Re-walk the rig, double-check terminations, tidy your workspace. Don’t hand in early — the assessor scores neatness and finish, and an early hand-in often leaves marks on the table.',
              },
              {
                question: 'Is the inspection and testing time really 3.5 hours?',
                answer:
                  'Yes — and most candidates underestimate it. You have to do the full sequence (continuity, IR, polarity, Zs, RCD) and complete the certificate properly. Practise this end-to-end before the day.',
              },
              {
                question: 'How long is the online knowledge test?',
                answer:
                  'One hour, multiple-choice, sat at a workstation in the centre. It covers BS 7671:2018+A4:2026, health and safety law, and inspection and testing procedure. You can have your BS 7671 book open.',
              },
              {
                question: 'Can I run over time on a section?',
                answer:
                  'No — when the section closes, work stops. Anything unfinished is marked as it stands, which usually means a Not Yet Competent on that criterion. That’s why pacing is half the battle.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Five sections (A–E) totalling about 16.5 hours over 2½ days.',
              'Section A is 8.5 hours of installation — break it into A1–A5 sub-targets.',
              'Section B is 3.5 hours of inspection, testing and certification — don’t underestimate paperwork time.',
              'Section C is 45 minutes of safe isolation. Short but critical — a fail here ends the assessment.',
              'Section D is 2 hours of fault diagnosis. Logic, not luck. Work step by step.',
              'Section E is a 1-hour online knowledge test, BS 7671 open-book.',
              'Plan the first five minutes of every section. Pace beats speed every time.',
              'When the section clock stops, work stops — finish what you can to a clean standard.',
            ]}
          />

          {/* Navigation Footer */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module1/section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Purpose of AM2
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module1/section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Marking Criteria
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module1Section2;
