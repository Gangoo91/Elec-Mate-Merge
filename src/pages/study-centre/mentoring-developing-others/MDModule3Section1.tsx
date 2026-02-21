import {
  ArrowLeft,
  Building2,
  CheckCircle,
  GraduationCap,
  Users,
  Award,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'jib-stage3',
    question:
      'At which stage of the JIB apprenticeship framework does an apprentice begin preparing for the AM2 assessment?',
    options: [
      'Stage 1 — basic hand skills and safe working',
      'Stage 2 — developing technical competence',
      'Stage 3 — advanced skills and AM2 preparation',
      'Stage 4 — EPA and portfolio completion only',
    ],
    correctIndex: 2,
    explanation:
      'Stage 3 (typically Year 3) is when apprentices begin working on advanced skills, complex installations, and actively preparing for the AM2 assessment. Stage 4 then focuses on EPA preparation and final portfolio completion, but the groundwork for AM2 readiness starts in Stage 3.',
  },
  {
    id: 'ecs-approved',
    question:
      'What is the key difference between a JIB Core Electrician and an Approved Electrician in the ECS grade system?',
    options: [
      'Core Electricians earn more money than Approved Electricians',
      'Approved Electricians can inspect and test their own work and certify installations',
      'Core Electricians can work unsupervised, Approved cannot',
      'There is no practical difference between the two grades',
    ],
    correctIndex: 1,
    explanation:
      'An Approved Electrician has demonstrated additional competence beyond Core level, including the ability to inspect and test their own work and sign off electrical installations. This is a significant step up in responsibility and typically requires passing the City & Guilds 2391 or equivalent inspection and testing qualification.',
  },
  {
    id: 'am2-components',
    question: 'Which three areas does the AM2 assessment test?',
    options: [
      'Health and safety theory, first aid, and site induction',
      'Practical installation, inspection and testing, and fault diagnosis',
      'Cable calculation, circuit design, and documentation',
      'Customer service, time management, and cost estimation',
    ],
    correctIndex: 1,
    explanation:
      'The AM2 assessment tests three core areas: practical installation (wiring a consumer unit, circuits, and containment), inspection and testing (using instruments to verify the installation meets BS 7671), and fault diagnosis (finding and rectifying faults in a pre-wired installation). All three must be passed to achieve the AM2.',
  },
];

const faqs = [
  {
    question: 'What happens if an apprentice fails the AM2 assessment?',
    answer:
      'An apprentice who fails the AM2 can resit, but there is a waiting period before the next attempt (typically a minimum of 30 days). The mentor should use this time constructively — reviewing the feedback from the assessment centre, identifying the specific areas that caused the failure, and creating a structured remediation plan. Common failure areas include incorrect terminations, inadequate inspection and testing technique, and time management. The mentor should arrange additional supervised practice on these specific areas before the resit. It is also worth considering whether the apprentice was genuinely ready, or whether they were entered prematurely under pressure to meet a completion deadline.',
  },
  {
    question: 'How does the 20% off-the-job training requirement work in practice?',
    answer:
      "The 20% off-the-job training requirement means that at least one day per week (or equivalent) of an apprentice's paid working hours must be dedicated to learning that is directly relevant to the apprenticeship standard but takes place outside normal productive work. This includes college attendance, formal training courses, online learning, mentoring sessions, study time, and practice activities. It does not include progress reviews, English and maths (unless part of the standard), or training in duties unrelated to the apprenticeship. The employer and training provider share responsibility for planning and logging this time. The mentor plays a key role in identifying and recording off-the-job training opportunities on site.",
  },
  {
    question: 'Can an apprentice skip stages in the JIB framework if they are progressing quickly?',
    answer:
      "The JIB apprenticeship framework is designed as a progressive four-stage structure, and stages cannot simply be skipped. However, the pace of development within each stage can be accelerated for particularly capable apprentices. An apprentice who demonstrates competence ahead of schedule may be able to take their AM2 assessment earlier than the standard timeline, but they must still meet all the evidence requirements for their NVQ portfolio and satisfy the minimum duration requirements of their apprenticeship standard. The mentor should discuss accelerated progression with both the employer and the training provider to ensure alignment and avoid gaps in the apprentice's development.",
  },
  {
    question: "What is the mentor's specific role in the three-way relationship?",
    answer:
      "The mentor acts as the bridge between the employer (providing work-based learning), the training provider (delivering off-the-job training at college), and the apprentice. Specifically, the mentor coordinates with the college to understand what the apprentice is learning in theory and finds opportunities to apply that theory on site. When an apprentice struggles with a topic at college (for example, three-phase distribution), the mentor can reinforce it through practical site experience. The mentor also attends progress reviews, contributes to the apprentice's training plan, identifies and logs evidence opportunities, and communicates any concerns about the apprentice's development to both the employer and the training provider. Without an active mentor fulfilling this bridging role, theory and practice often remain disconnected.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'How many stages make up the JIB electrical apprenticeship framework?',
    options: [
      '2 stages — foundation and completion',
      '3 stages — basic, intermediate, and advanced',
      '4 stages — progressing from basic skills to EPA completion',
      '5 stages — including a probationary period',
    ],
    correctAnswer: 2,
    explanation:
      'The JIB electrical apprenticeship framework consists of 4 stages, typically spanning 4 years. Stage 1 covers basic hand skills, Stage 2 develops technical competence, Stage 3 focuses on advanced skills and AM2 preparation, and Stage 4 covers EPA preparation and portfolio completion.',
  },
  {
    id: 2,
    question:
      'During Stage 1 of the JIB apprenticeship, what level of supervision does an apprentice typically require?',
    options: [
      'No supervision — they should be able to work independently from day one',
      'Close supervision at all times with direct oversight of every task',
      'Moderate supervision — checking in every few hours',
      'Remote supervision via phone or radio contact only',
    ],
    correctAnswer: 1,
    explanation:
      'Stage 1 apprentices are at the beginning of their journey and require close supervision at all times. They are developing basic hand skills, learning safe working practices, and need direct oversight to ensure safety and correct technique. The level of independence increases gradually through subsequent stages.',
  },
  {
    id: 3,
    question:
      'In the ECS grade progression system, what is the correct order of grades from entry to highest?',
    options: [
      'Core Electrician → Apprentice → Approved Electrician → Technician',
      'Apprentice → Core Electrician → Approved Electrician → Technician',
      'Apprentice → Approved Electrician → Core Electrician → Technician',
      'Apprentice → Technician → Core Electrician → Approved Electrician',
    ],
    correctAnswer: 1,
    explanation:
      'The correct ECS grade progression is: Apprentice (in training) → Core Electrician (qualified, can work independently) → Approved Electrician (can inspect, test, and certify) → Technician (highest level of technical competence). Each grade represents an increase in competence, responsibility, and the scope of work that can be undertaken.',
  },
  {
    id: 4,
    question:
      'What is the minimum percentage of paid working hours that must be spent on off-the-job training during an apprenticeship?',
    options: [
      '10% — roughly half a day per week',
      '15% — just under one day per week',
      '20% — equivalent to one day per week',
      '25% — more than one day per week',
    ],
    correctAnswer: 2,
    explanation:
      "The minimum off-the-job training requirement is 20% of the apprentice's paid working hours. This equates to approximately one day per week and includes college attendance, formal training, study time, mentoring sessions, and practice activities that are directly relevant to the apprenticeship standard.",
  },
  {
    id: 5,
    question:
      'Which of the following is NOT one of the three components tested in the AM2 assessment?',
    options: [
      'Practical installation of circuits and containment',
      'Inspection and testing using appropriate instruments',
      'Customer communication and quotation skills',
      'Fault diagnosis in a pre-wired installation',
    ],
    correctAnswer: 2,
    explanation:
      'The AM2 assessment tests three specific areas: practical installation (wiring circuits, containment, consumer units), inspection and testing (using instruments to verify BS 7671 compliance), and fault diagnosis (finding and rectifying faults). Customer communication and quotation skills, while important in practice, are not assessed in the AM2.',
  },
  {
    id: 6,
    question:
      'In the three-way apprenticeship relationship, who typically acts as the bridge between college theory and site practice?',
    options: [
      'The college tutor, who visits site regularly',
      'The apprentice themselves, who must make the connections independently',
      'The site mentor, who coordinates between employer and training provider',
      'The JIB regional officer, who oversees all apprenticeships in the area',
    ],
    correctAnswer: 2,
    explanation:
      'The site mentor acts as the bridge between the employer (work-based learning) and the training provider (college-based theory). The mentor understands what the apprentice is learning at college and finds opportunities to apply that theory on site. This coordination role is essential for connecting theoretical knowledge with practical application.',
  },
  {
    id: 7,
    question: 'What is the most common reason apprentices fail the AM2 assessment?',
    options: [
      'They are too nervous to perform on the day',
      'Incorrect terminations, poor I&T technique, and time management issues',
      'They have never seen the assessment format before',
      'The assessment is designed to have a high failure rate',
    ],
    correctAnswer: 1,
    explanation:
      'The most common AM2 failure areas are incorrect terminations (loose connections, wrong conductor identification), inadequate inspection and testing technique (incorrect instrument use, failure to follow the correct sequence), and poor time management (running out of time on the practical installation). Mentors should focus preparation on these specific areas.',
  },
  {
    id: 8,
    question:
      'A mentor notices their Stage 2 apprentice is struggling with three-phase theory at college. What is the best course of action?',
    options: [
      'Tell the apprentice to pay more attention in class and study harder',
      'Contact the college to complain about the quality of teaching',
      'Arrange practical three-phase experience on site and coordinate with the college tutor to reinforce the theory',
      'Wait until Stage 3 when the apprentice will cover it again',
    ],
    correctAnswer: 2,
    explanation:
      "The best approach is to use the three-way relationship effectively — arrange practical three-phase experience on site (such as working on a commercial distribution board) and coordinate with the college tutor to reinforce the theory from a practical perspective. This bridges the gap between theory and practice, which is the mentor's primary coordination role.",
  },
];

export default function MDModule3Section1() {
  useSEO({
    title: 'The JIB Apprenticeship Framework | Mentoring Module 3.1',
    description:
      'JIB 4-stage apprenticeship structure, ECS grade progression, the three-way relationship, AM2 assessment, and off-the-job training requirements for mentors.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Building2 className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The JIB Apprenticeship Framework
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the four-stage structure, ECS grade progression, the three-way
            relationship, and how to prepare apprentices for the AM2 assessment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Structure:</strong> 4 stages over 4 years, basic skills to EPA
              </li>
              <li>
                <strong>Grades:</strong> Apprentice &rarr; Core &rarr; Approved &rarr; Technician
              </li>
              <li>
                <strong>Training:</strong> Minimum 20% off-the-job (1 day/week)
              </li>
              <li>
                <strong>Assessment:</strong> AM2 tests installation, I&amp;T, fault diagnosis
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Mentors</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Your role:</strong> Bridge between employer, college, and apprentice
              </li>
              <li>
                <strong>Supervision:</strong> Decreases as competence increases through stages
              </li>
              <li>
                <strong>AM2 prep:</strong> Start structured preparation in Stage 3
              </li>
              <li>
                <strong>Key duty:</strong> Log off-the-job training and evidence opportunities
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Describe the four stages of the JIB electrical apprenticeship framework and the key milestones at each stage',
              'Explain the ECS grade progression from Apprentice through to Technician and what each grade means in practice',
              "Outline the three-way relationship between employer, training provider, and apprentice and the mentor's coordination role",
              'Identify the minimum off-the-job training requirements and what activities count towards the 20% threshold',
              'Describe the three components of the AM2 assessment and common reasons for failure',
              'Create a structured AM2 preparation plan that addresses the most common failure areas',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: JIB 4-Stage Apprenticeship Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            JIB 4-Stage Apprenticeship Structure
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Joint Industry Board (JIB) apprenticeship framework provides a{' '}
                <strong>structured four-stage pathway</strong> for developing electrical apprentices
                from complete beginners to competent, qualified electricians. Each stage builds on
                the previous one, with increasing technical complexity and decreasing supervision
                requirements.
              </p>

              <p>
                Understanding this structure is essential for mentors because it determines{' '}
                <strong>what an apprentice should be capable of at each point</strong> in their
                development, what level of supervision they need, and what milestones they should be
                working towards.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-3">
                  The Four Stages at a Glance
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Stage 1 (Year 1) &mdash; Foundation
                    </p>
                    <p className="text-sm text-white">
                      Basic hand skills, safe working practices, tool identification and use, cable
                      stripping and termination, basic containment. Close supervision required at
                      all times. The apprentice is learning fundamentals and developing safe working
                      habits that will last their entire career.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Stage 2 (Year 2) &mdash; Development
                    </p>
                    <p className="text-sm text-white">
                      Developing technical skills, wiring circuits, reading drawings, understanding
                      BS 7671 basics. Increasing independence with regular checks. The apprentice
                      begins to take ownership of straightforward tasks under moderate supervision.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Stage 3 (Year 3) &mdash; Advanced</p>
                    <p className="text-sm text-white">
                      Advanced skills, complex installations, three-phase work, distribution boards,
                      preparing for AM2 assessment. The apprentice works with greater autonomy and
                      begins to demonstrate competence across the full range of electrical work.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Stage 4 (Year 4) &mdash; Completion
                    </p>
                    <p className="text-sm text-white">
                      End-point assessment (EPA) preparation, NVQ portfolio completion, AM2
                      assessment. The apprentice operates with minimal supervision and is
                      demonstrating the competence required to achieve qualified electrician status.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Each stage has clear{' '}
                <strong>expectations for both the apprentice and the mentor</strong>. A Stage 1
                apprentice should not be left alone to wire a consumer unit. Equally, a Stage 3
                apprentice should not still be shadowing without any independent responsibility. The
                mentor must continuously calibrate the level of challenge and support to match the
                apprentice&rsquo;s current stage of development.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Construction Example</p>
                </div>
                <p className="text-sm text-white">
                  Consider a domestic rewire project. A <strong>Stage 1 apprentice</strong> might
                  assist with lifting floorboards, pulling cables, and learning to strip and
                  terminate under direct supervision. By <strong>Stage 2</strong>, they could be
                  running cables independently and wiring accessories. At <strong>Stage 3</strong>,
                  they might wire the consumer unit and carry out initial testing under observation.
                  By <strong>Stage 4</strong>, they would complete the full installation, carry out
                  inspection and testing, and complete the documentation &mdash; with the mentor
                  reviewing rather than supervising.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Point for Mentors</p>
                <p className="text-sm text-white">
                  The four-stage structure is not just about the apprentice gaining skills &mdash;
                  it is about the mentor <strong>progressively releasing control</strong>. Your role
                  shifts from instructor (Stage 1) to coach (Stage 2&ndash;3) to quality checker
                  (Stage 4). If you are still doing everything for a Stage 3 apprentice, you are
                  hindering their development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: ECS Grade Progression */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            ECS Grade Progression
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Electrotechnical Certification Scheme (ECS) managed by the JIB provides a{' '}
                <strong>clear grade progression pathway</strong> that maps directly to an
                electrician&rsquo;s competence and responsibilities. Understanding this pathway
                helps mentors set appropriate expectations and support apprentices in their
                long-term career development.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-3">ECS Grade Pathway</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Apprentice</p>
                      <p className="text-sm text-white">
                        In training. Working towards qualifications under supervision. Cannot work
                        independently on electrical installations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Core Electrician</p>
                      <p className="text-sm text-white">
                        Qualified and competent to carry out electrical installation work
                        independently. Holds AM2, NVQ Level 3, and relevant technical
                        qualifications. Can install but requires an Approved or Technician grade to
                        certify work.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Approved Electrician</p>
                      <p className="text-sm text-white">
                        Can inspect, test, and certify electrical installations. Holds City &amp;
                        Guilds 2391 (or equivalent) in addition to Core qualifications.
                        Significantly greater responsibility &mdash; signing off that work is safe
                        and compliant with BS 7671.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Technician</p>
                      <p className="text-sm text-white">
                        Highest level of technical competence. Holds additional qualifications such
                        as City &amp; Guilds 2396 (Design and Verification). Can design, install,
                        inspect, test, and certify. May also hold specialist qualifications in areas
                        such as hazardous areas or high-voltage work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The mentor&rsquo;s role is to help the apprentice understand{' '}
                <strong>where they are on this pathway and what they need to do next</strong>. Many
                apprentices complete their apprenticeship and achieve Core Electrician status
                without ever thinking about what comes after. A good mentor plants the seed early
                &mdash; encouraging the apprentice to think about Approved status and beyond.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Mentor Support at Each Grade</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Apprentice to Core:</strong> Focus on completing NVQ evidence, passing
                      AM2, developing consistent good practice across all installation work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Core to Approved:</strong> Encourage enrolment on 2391 inspection and
                      testing course, provide supervised I&amp;T practice opportunities, develop
                      understanding of certification requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Approved to Technician:</strong> Support design and verification
                      qualification (2396), provide exposure to complex design projects, develop
                      ability to specify and verify complete installations
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Three-Way Relationship */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Three-Way Relationship
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every apprenticeship involves a <strong>three-way relationship</strong> between the
                employer (who provides work-based learning), the training provider or college (who
                delivers off-the-job training), and the apprentice (who is doing the learning). The
                mentor sits at the centre of this relationship, acting as the{' '}
                <strong>critical bridge between site practice and college theory</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-3">
                  The Three Parties and Their Responsibilities
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Employer</p>
                    <p className="text-sm text-white">
                      Provides meaningful work-based learning, employs the apprentice on appropriate
                      terms, releases the apprentice for college, ensures safe working environment,
                      supports the mentor in their role
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Training Provider</p>
                    <p className="text-sm text-white">
                      Delivers off-the-job training (typically at college), assesses knowledge and
                      understanding, tracks qualification progress, conducts progress reviews,
                      provides feedback on academic performance
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Apprentice</p>
                    <p className="text-sm text-white">
                      Attends college, completes assignments, engages with work-based learning,
                      builds NVQ portfolio, communicates difficulties, takes responsibility for
                      their own development
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The <strong>mentor&rsquo;s coordination role</strong> is what makes the three-way
                relationship work in practice. Without active coordination, the employer just sees
                an extra pair of hands, the college delivers theory in isolation, and the apprentice
                struggles to connect the two. The mentor prevents this disconnect by deliberately
                aligning site work with college learning.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Off-the-Job Training: The 20% Rule
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Apprenticeship funding rules require a minimum of{' '}
                  <strong>20% of paid working hours</strong> to be spent on off-the-job training.
                  This equates to approximately one day per week. The following activities count:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>College attendance and classroom learning</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Formal training courses and workshops</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Structured mentoring sessions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Online learning and study time</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Practice activities (not productive work)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Industry visits and manufacturer training</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Construction Example</p>
                </div>
                <p className="text-sm text-white">
                  Your Stage 2 apprentice is struggling with three-phase theory at college. The
                  college tutor has flagged this in the last progress review. As the mentor, you
                  arrange for the apprentice to shadow a commercial installation where a three-phase
                  distribution board is being wired. You walk them through the supply arrangement,
                  explain line-to-line and line-to-neutral voltages, and let them help with
                  terminations under supervision. Back at college, the apprentice now has{' '}
                  <strong>practical context</strong> for the theory &mdash; they have seen and
                  touched a three-phase installation, not just read about one in a textbook. This is
                  the mentor acting as the bridge.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Remember</p>
                <p className="text-sm text-white">
                  Progress reviews are not just an administrative requirement &mdash; they are your
                  opportunity to hear directly from the college about how the apprentice is
                  performing academically, and to feed back what you are seeing on site. Attend
                  every progress review if possible. If you cannot attend in person, ask for a
                  written summary and respond with your own observations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: AM2 Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            AM2 Assessment
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The AM2 is the <strong>end-point practical assessment</strong> that determines
                whether an apprentice has the hands-on competence to work as a qualified
                electrician. It is a rigorous, time-pressured assessment conducted at a JIB-approved
                assessment centre. The mentor&rsquo;s role in preparing the apprentice for the AM2
                cannot be overstated &mdash; the apprentices who pass first time are almost always
                those with{' '}
                <strong>structured, deliberate preparation guided by an experienced mentor</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-3">The Three AM2 Components</p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">1. Practical Installation</p>
                    <p className="text-sm text-white">
                      The apprentice must wire a consumer unit, install various circuits (lighting,
                      power, cooker, shower), run containment, and make all terminations to a
                      professional standard. The installation must comply with BS 7671 and be
                      completed within the allocated time. Neatness, accuracy, and compliance are
                      all assessed.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">2. Inspection and Testing</p>
                    <p className="text-sm text-white">
                      Using appropriate test instruments, the apprentice must carry out a full
                      initial verification of their installation. This includes continuity of
                      protective conductors, insulation resistance, polarity, earth fault loop
                      impedance, and RCD testing. Results must be recorded accurately on the correct
                      forms. Instrument use must follow the correct sequence and methodology.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">3. Fault Diagnosis</p>
                    <p className="text-sm text-white">
                      A pre-wired installation with deliberate faults is provided. The apprentice
                      must systematically identify and rectify the faults using logical diagnostic
                      techniques and appropriate test instruments. This tests the ability to think
                      under pressure, apply fault-finding methodology, and demonstrate safe working
                      practices during diagnosis.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                <strong>Common failure points</strong> include incorrect terminations (loose
                connections, wrong conductor identification), inadequate inspection and testing
                technique (incorrect instrument use, failure to follow the correct test sequence),
                and poor time management (spending too long on the installation and running out of
                time for testing). The mentor should focus AM2 preparation specifically on these
                areas.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Mentor Readiness Assessment</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Before entering an apprentice for the AM2, the mentor should be satisfied that the
                  apprentice can consistently demonstrate the following:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Wire a consumer unit correctly, neatly, and within a reasonable time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Carry out all required initial verification tests in the correct sequence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Use test instruments correctly and interpret results accurately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Complete electrical installation certificates and schedules of test results
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Apply systematic fault-finding methodology under time pressure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Work safely and demonstrate awareness of isolation procedures throughout
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: AM2 Preparation Plan
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A structured 12-week AM2 preparation plan might look like this:
                </p>
                <div className="text-sm text-white space-y-2">
                  <p>
                    <strong>Weeks 1&ndash;4:</strong> Consumer unit wiring practice. Time the
                    apprentice on each attempt. Identify and correct recurring errors. Aim for
                    consistent quality within the time limit by the end of week 4.
                  </p>
                  <p>
                    <strong>Weeks 5&ndash;8:</strong> Inspection and testing practice. Work through
                    the full test sequence on completed installations. Focus on instrument
                    technique, recording results, and interpreting readings. Introduce deliberate
                    errors for the apprentice to find.
                  </p>
                  <p>
                    <strong>Weeks 9&ndash;12:</strong> Mock AM2 conditions. Set up a full
                    installation, I&amp;T, and fault diagnosis exercise under timed conditions.
                    Review performance, identify remaining weaknesses, and carry out targeted
                    practice on specific areas.
                  </p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Point</p>
                <p className="text-sm text-white">
                  Never enter an apprentice for the AM2 just because they have reached the end of
                  their apprenticeship timeline. The AM2 should only be attempted when the
                  apprentice is <strong>genuinely ready</strong>. A premature failure is
                  demoralising, expensive, and delays qualification further than waiting until the
                  apprentice is properly prepared.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-3-section-2">
              Next: NVQ Evidence &amp; Portfolio Building
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
