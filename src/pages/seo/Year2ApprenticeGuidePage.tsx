import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  Wrench,
  Zap,
  Brain,
  Award,
  FolderOpen,
  Target,
  CheckCircle,
  BarChart3,
  Shield,
  CircuitBoard,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Year 2 Guide', href: '/guides/year-2-electrical-apprentice' },
];

const tocItems = [
  { id: 'year2-overview', label: 'Year 2 Overview' },
  { id: 'more-responsibility', label: 'More Responsibility on Site' },
  { id: 'testing-skills', label: 'Introduction to Testing' },
  { id: 'circuit-installation', label: 'Circuit Installation Skills' },
  { id: 'level3-theory', label: 'Level 3 Theory' },
  { id: 'preparing-am2', label: 'Preparing for the AM2' },
  { id: 'portfolio-progress', label: 'Portfolio and OJT Progress' },
  { id: 'elecmate-year2', label: 'Elec-Mate for Year 2' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Year 2 marks a significant step up in responsibility and complexity. You will move from mainly assisting to carrying out tasks with increasing independence, including circuit installation, containment systems, and supervised testing.',
  'You will be introduced to formal electrical testing — continuity, insulation resistance, polarity, earth fault loop impedance, and RCD testing. Understanding test results and what they mean is a critical Year 2 skill.',
  'College work transitions to Level 3 theory, covering more advanced circuit design, fault finding, three-phase systems, and deeper study of BS 7671. The academic demands increase significantly.',
  'AM2 preparation begins in Year 2. Even though the AM2 assessment is typically taken at the end of Year 3 or in Year 4, building familiarity with the practical skills tested now gives you the best chance of passing first time.',
  'Elec-Mate supports Year 2 apprentices with the AM2 Simulator, mock exams, 46+ training courses covering Level 3 content, the EPA Simulator, and the portfolio builder to track your growing evidence base.',
];

const faqs = [
  {
    question: 'What changes between Year 1 and Year 2?',
    answer:
      'The biggest change is the level of independence and responsibility you are given on site. In Year 1, you were primarily assisting and watching. In Year 2, you will be expected to carry out tasks yourself — under supervision, but with less hand-holding. You will start wiring circuits independently, learning to terminate at consumer units, and being introduced to testing instruments. At college, the theory steps up to Level 3, which covers more advanced concepts like three-phase systems, fault current calculations, and detailed BS 7671 requirements. The volume of work increases, and the expectations rise. Year 2 is where most apprentices feel they start to become proper electricians.',
  },
  {
    question: 'Will I start testing in Year 2?',
    answer:
      'Yes. Year 2 is typically when formal electrical testing is introduced. You will learn to use a multifunction tester to perform continuity of protective conductors (R1+R2), insulation resistance testing, polarity checks, earth fault loop impedance (Zs), and RCD operation testing. At college, you will study the theory behind each test — why you do it, what the acceptable results are, and what a failed test indicates. On site, you will initially observe testing being carried out by qualified electricians and then progress to performing tests yourself under supervision. Understanding test results is critical for the AM2 assessment and for your career as a qualified electrician.',
  },
  {
    question: 'When should I start preparing for the AM2?',
    answer:
      'The AM2 assessment is typically sat at the end of Year 3 or during Year 4, but starting preparation in Year 2 gives you a significant advantage. The AM2 tests practical installation skills, fault finding, and safe isolation — all skills you are developing in Year 2. Use the Elec-Mate AM2 Simulator to familiarise yourself with the format and the types of tasks assessed. Practise safe isolation until it becomes second nature. Build speed and accuracy in circuit wiring. The more comfortable you are with these skills before Year 3, the less pressure you will feel when the AM2 date approaches.',
  },
  {
    question: 'How hard is the Level 3 theory?',
    answer:
      'Level 3 electrical theory is noticeably harder than Level 2. The concepts are more complex — three-phase power calculations, transformer theory, motor circuits, advanced fault current analysis, and detailed BS 7671 design requirements. The maths demands increase too, with more formula manipulation and multi-step calculations. However, it builds directly on what you learned in Level 2. If you kept up with the fundamentals in Year 1, Level 3 is a natural progression. If you have gaps from Year 1, address them early — use Elec-Mate training courses and flashcards to revise the basics before tackling the advanced content. Regular study of 30 to 60 minutes per day makes a huge difference.',
  },
  {
    question: 'What types of circuits will I install in Year 2?',
    answer:
      'In Year 2, you will progress from basic first-fix tasks to complete circuit installations. Typical circuits include lighting circuits (one-way, two-way, and intermediate switching), ring final circuits for socket outlets, radial circuits, fused spur connections, and cooker circuits. You may also be introduced to outdoor supplies, smoke alarm circuits, and basic three-phase distribution in commercial settings. Each circuit type teaches different skills — switching configurations, cable sizing, protection device selection, and containment methods. Record every circuit you install in your site diary and link it to your portfolio evidence.',
  },
  {
    question: 'How can Elec-Mate help me in Year 2?',
    answer:
      'Elec-Mate is particularly valuable in Year 2 because the academic and practical demands both increase significantly. The 46+ training courses cover all Level 3 theory topics with structured content and practice questions. The AM2 Simulator gives you realistic practice for the practical assessment. The EPA Simulator prepares you for the End Point Assessment format. Mock exams build your confidence for timed assessments. The flashcards tool helps you memorise formulae, cable ratings, and BS 7671 regulation numbers. The AI tutor can explain any concept you are struggling with. And your portfolio builder and OJT tracker ensure your evidence and off-the-job training hours stay on track throughout the year.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/year-1-electrical-apprentice',
    title: 'Year 1 Apprentice Guide',
    description: 'What to expect in your first year — the foundations of your apprenticeship.',
    icon: Calendar,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description: 'Everything you need to know about the AM2 practical assessment.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/epa-what-to-expect',
    title: 'EPA What to Expect',
    description: 'End Point Assessment components, grading, and preparation strategies.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/off-job-training-hours',
    title: 'Off-the-Job Training Hours',
    description: 'The 20% requirement — what counts and how to track your hours.',
    icon: Clock,
    category: 'Guide',
  },
  {
    href: '/guides/site-diary-apprentice',
    title: 'Site Diary for Apprentices',
    description: 'How to keep a daily log that supports your portfolio and OJT evidence.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-portfolio',
    title: 'Apprentice Portfolio Guide',
    description: 'Digital evidence tracking and AI-powered criteria mapping.',
    icon: FolderOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'year2-overview',
    heading: 'Year 2: Stepping Up',
    content: (
      <>
        <p>
          If Year 1 was about building foundations, Year 2 is about building on them. This is the
          year where most apprentices start to feel like they are becoming proper electricians. The
          tasks get more complex, the independence increases, the theory goes deeper, and the
          assessments become more demanding.
        </p>
        <p>
          On site, you will move from mainly assisting to carrying out installations with increasing
          autonomy. You will wire complete circuits, start learning to read and interpret drawings
          with more confidence, and be introduced to electrical testing instruments. At college, the
          syllabus transitions to Level 3, covering advanced theory topics that underpin the design
          and verification of electrical installations.
        </p>
        <p>
          Year 2 is also when many apprentices begin thinking seriously about the{' '}
          <SEOInternalLink href="/guides/am2-exam-preparation">AM2 assessment</SEOInternalLink> and
          the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">End Point Assessment</SEOInternalLink>.
          Both are still a year or more away, but the skills tested in those assessments are
          developed in Year 2. Starting preparation early gives you a significant advantage.
        </p>
      </>
    ),
  },
  {
    id: 'more-responsibility',
    heading: 'More Responsibility on Site',
    content: (
      <>
        <p>
          Year 2 brings a noticeable shift in what your employer expects from you. You will still be
          supervised, but you will be trusted to carry out tasks with less direct oversight. Here is
          what that looks like in practice:
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Zap className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Independent Circuit Wiring</h3>
              <p className="text-white text-sm leading-relaxed">
                You will be given a circuit to wire independently — a lighting circuit or ring
                circuit, for example. Your supervisor will check the work before it is energised,
                but the installation itself is your responsibility. This is a big step up from Year
                1 assist work.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CircuitBoard className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Consumer Unit Terminations</h3>
              <p className="text-white text-sm leading-relaxed">
                Terminating circuits at the consumer unit — connecting MCBs, RCBOs, busbars, and
                main switches. Understanding circuit identification, labelling, and the arrangement
                of protective devices. This is a core skill for the AM2 assessment.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Wrench className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Second Fix and Finishing</h3>
              <p className="text-white text-sm leading-relaxed">
                Fitting faceplates, connecting accessories, installing light fittings, and
                completing the finishing work that turns a first-fix installation into a working
                electrical system. Attention to detail and quality of workmanship become
                increasingly important.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Shield className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Safe Isolation Competence</h3>
              <p className="text-white text-sm leading-relaxed">
                By mid-Year 2, you should be carrying out{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>{' '}
                independently. This is a non-negotiable skill — you must be able to prove dead, lock
                off, and verify before working on any circuit. Practise it until it is automatic.
              </p>
            </div>
          </div>
        </div>
        <p>
          Record every new responsibility in your{' '}
          <SEOInternalLink href="/guides/site-diary-apprentice">site diary</SEOInternalLink>. Each
          step up in independence is portfolio evidence of your developing competence.
        </p>
      </>
    ),
  },
  {
    id: 'testing-skills',
    heading: 'Introduction to Electrical Testing',
    content: (
      <>
        <p>
          Electrical testing is one of the most important skills you will develop as an electrician.
          Year 2 is when you start learning to use a multifunction tester and interpret the results.
          The tests you will learn include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity of protective conductors (R1+R2):</strong> Verifying that the
                circuit protective conductor (CPC) is continuous from the consumer unit to every
                point on the circuit. This is a dead test performed with the supply isolated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/insulation-resistance-test">
                    Insulation resistance
                  </SEOInternalLink>
                  :
                </strong>{' '}
                Testing the insulation between live conductors and between live conductors and earth
                at 500V DC. Results must be at least 1 megohm for circuits rated up to 500V.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Polarity:</strong> Confirming that line and neutral conductors are correctly
                connected throughout the circuit. A polarity error can be dangerous — it could leave
                a switched-off appliance still live.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/earth-fault-loop-impedance-explained">
                    Earth fault loop impedance (Zs)
                  </SEOInternalLink>
                  :
                </strong>{' '}
                Measuring the impedance of the earth fault loop to confirm that protective devices
                will operate within the required disconnection time. This is a live test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/rcd-testing-guide">RCD operation</SEOInternalLink>:
                </strong>{' '}
                Testing that RCDs trip within the required time at the rated residual current. Both
                general RCDs and RCBOs are tested.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Understanding why each test is performed, what the results mean, and what to do when a
          result fails is just as important as learning how to operate the test instrument. College
          will cover the theory; site work provides the practical experience. Elec-Mate mock exams
          include testing questions that reinforce both the theory and the practical interpretation.
        </p>
        <SEOAppBridge
          title="Practise Testing Theory with Mock Exams"
          description="Elec-Mate mock exams cover every testing topic you will encounter in Year 2 — continuity, insulation resistance, Zs, polarity, and RCD testing. Timed practice with instant feedback and explanations."
          icon={Award}
        />
      </>
    ),
  },
  {
    id: 'circuit-installation',
    heading: 'Circuit Installation Skills',
    content: (
      <>
        <p>
          Year 2 is when you progress from basic first-fix work to complete circuit installations.
          You will learn to install, wire, and connect a range of circuit types:
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <Zap className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Lighting Circuits</h3>
              <p className="text-white text-sm leading-relaxed">
                One-way switching, two-way switching, and intermediate switching. Understanding
                loop-in wiring at ceiling roses, switch drops, and the correct connections for
                different switching arrangements. These are fundamental circuits tested in the AM2.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <CircuitBoard className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Ring Final Circuits</h3>
              <p className="text-white text-sm leading-relaxed">
                Installing a complete ring circuit for socket outlets — running the ring, connecting
                accessories, and verifying the ring using continuity testing. Understanding spurs,
                fused connection units, and the limitations of the ring circuit.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <Wrench className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Radial Circuits and Dedicated Supplies
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Radial circuits for specific loads — cooker circuits, shower circuits, immersion
                heater supplies, and outdoor socket feeds. Learning to size cables correctly for the
                load and select appropriate protective devices.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Shield className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Fire and Smoke Alarm Circuits</h3>
              <p className="text-white text-sm leading-relaxed">
                Installing mains-powered, interconnected smoke and heat alarm systems. Understanding
                the{' '}
                <SEOInternalLink href="/guides/smoke-alarm-regulations">
                  current regulations
                </SEOInternalLink>{' '}
                for domestic alarm systems and the requirements for new builds versus existing
                properties.
              </p>
            </div>
          </div>
        </div>
        <p>
          Every circuit you install is an opportunity to build your skills and gather portfolio
          evidence. Record the circuit type, the cable sizes used, the protective device selected,
          any regulations you referenced, and take a photograph of the completed work.
        </p>
      </>
    ),
  },
  {
    id: 'level3-theory',
    heading: 'Level 3 Theory',
    content: (
      <>
        <p>
          Level 3 electrical theory is a significant step up from Level 2. The concepts are more
          complex, the calculations more demanding, and the depth of knowledge required increases
          substantially. Key topics include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Advanced circuit design:</strong> Designing circuits from scratch —
                selecting cable sizes based on current-carrying capacity, applying correction
                factors, and verifying volt drop and earth fault loop impedance.{' '}
                <SEOInternalLink href="/guides/cable-sizing-guide-bs7671">
                  Cable sizing
                </SEOInternalLink>{' '}
                becomes a core skill.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase systems:</strong> Understanding three-phase power distribution,
                star and delta connections, line and phase voltages, and three-phase calculations.
                This is essential for commercial and industrial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding:</strong> Systematic approaches to diagnosing electrical
                faults. Understanding the relationship between symptoms and likely causes. Using
                test instruments to narrow down fault locations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 in depth:</strong> Detailed study of the{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  IET Wiring Regulations
                </SEOInternalLink>
                , including special locations (bathrooms, swimming pools, construction sites),
                protection against overcurrent and earth fault, and inspection and testing
                requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Regular study is essential to keep up with Level 3 content. Elec-Mate's training courses
          break down complex topics into manageable sections, and the flashcards tool helps you
          memorise formulae, cable ratings, and regulation numbers that come up repeatedly in
          assessments.
        </p>
      </>
    ),
  },
  {
    id: 'preparing-am2',
    heading: 'Preparing for the AM2',
    content: (
      <>
        <p>
          The <SEOInternalLink href="/guides/am2-exam-preparation">AM2</SEOInternalLink>{' '}
          (Achievement Measurement 2) is the practical assessment that demonstrates your competence
          as an installation electrician. It is typically sat at the end of Year 3 or during Year 4,
          but the skills it tests are developed throughout Years 2 and 3.
        </p>
        <p>
          <strong>What the AM2 tests:</strong> The AM2 is a practical assessment carried out at an
          approved test centre. It covers installation work (wiring circuits from a specification),
          fault finding (diagnosing and rectifying electrical faults), and safe isolation. The
          assessment takes a full day and is marked on accuracy, quality of workmanship, safety, and
          completion within the time limit.
        </p>
        <p>
          <strong>How to prepare in Year 2:</strong> The best preparation is to develop your
          practical skills systematically. Practise wiring lighting and power circuits until you can
          do them confidently and accurately. Develop your safe isolation procedure until it is
          automatic. Start building speed — the AM2 has a time limit, and working efficiently is
          important. Use the Elec-Mate AM2 Simulator to familiarise yourself with the assessment
          format and the types of tasks you will face.
        </p>
        <p>
          <strong>Do not leave it until Year 3:</strong> Apprentices who start AM2 preparation in
          Year 2 consistently perform better than those who leave it until the last few months. The
          skills tested in the AM2 are the same skills you are developing on site every day — treat
          every circuit installation as AM2 practice.
        </p>
        <SEOAppBridge
          title="AM2 Simulator: Practise Before the Real Thing"
          description="Elec-Mate's AM2 Simulator gives you realistic practice for the practical assessment. Work through installation tasks, fault-finding scenarios, and safe isolation procedures. Build confidence before your AM2 date."
          icon={Award}
        />
      </>
    ),
  },
  {
    id: 'portfolio-progress',
    heading: 'Portfolio and OJT Progress',
    content: (
      <>
        <p>
          By the end of Year 2, you should have a substantial body of evidence in your{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio">portfolio</SEOInternalLink> and be
          well on your way to meeting the{' '}
          <SEOInternalLink href="/guides/off-job-training-hours">
            off-the-job training hours
          </SEOInternalLink>{' '}
          requirement. Check these milestones:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>OJT hours:</strong> By the end of Year 2, you should have approximately 200
                of the 400 documented off-the-job training hours. If you are behind, increase your
                weekly study time on Elec-Mate — every on-platform session is logged automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portfolio criteria coverage:</strong> Your portfolio should have evidence
                against at least half of the apprenticeship standard criteria. Review which criteria
                are still missing and actively seek opportunities on site to address the gaps.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site diary:</strong> If you have been keeping your diary consistently, you
                will have hundreds of entries documenting your practical development. These entries
                feed directly into your portfolio evidence.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The gateway to the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">EPA</SEOInternalLink> requires
          confirmation that you have met the OTJ requirement and have a complete portfolio. Staying
          on track in Year 2 means you will not face a frantic catch-up in Year 3.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-year2',
    heading: 'Elec-Mate for Year 2 Apprentices',
    content: (
      <>
        <p>
          Year 2 is when Elec-Mate's full range of apprentice features comes into its own. The
          platform supports every aspect of your development:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">46+ Training Courses</h4>
                <p className="text-white text-sm leading-relaxed">
                  Level 3 content covering advanced circuit design, three-phase systems, fault
                  finding, testing procedures, and detailed BS 7671 study. Structured modules with
                  progress tracking and practice questions.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AM2 and EPA Simulators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Realistic practice for both the AM2 practical assessment and the End Point
                  Assessment. Work through scenarios, receive feedback, and build confidence before
                  the real assessments.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FolderOpen className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Portfolio Builder</h4>
                <p className="text-white text-sm leading-relaxed">
                  Track your evidence against every apprenticeship standard criterion. Site diary
                  entries, OJT records, and study evidence all feed in automatically. See which
                  criteria are covered and which still need evidence.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Tutor and Study Planner</h4>
                <p className="text-white text-sm leading-relaxed">
                  The AI tutor explains complex Level 3 concepts in plain language and works through
                  calculations step by step. The study planner helps you organise your revision time
                  and stay on track with college assignments.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Level Up in Year 2 with Elec-Mate"
          description="AM2 Simulator, EPA Simulator, 46+ training courses, mock exams, flashcards, AI tutor, portfolio builder, and OJT tracker. Everything Year 2 apprentices need in one platform. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Year2ApprenticeGuidePage() {
  return (
    <GuideTemplate
      title="Year 2 Electrical Apprentice | Skills & Progression"
      description="Complete guide to Year 2 of your electrical apprenticeship. More responsibility on site, introduction to testing, circuit installation, Level 3 theory, AM2 preparation, and how Elec-Mate supports your development."
      datePublished="2025-11-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={Calendar}
      heroTitle={
        <>
          Year 2 Electrical Apprentice:{' '}
          <span className="text-yellow-400">Skills and Progression</span>
        </>
      }
      heroSubtitle="Year 2 is when your apprenticeship shifts gear. More responsibility on site, introduction to electrical testing, Level 3 theory, and the start of AM2 preparation. This guide covers everything you need to know to make the most of your second year."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Year 2"
      relatedPages={relatedPages}
      ctaHeading="Step Up Your Year 2 with Elec-Mate"
      ctaSubheading="Join 430+ UK apprentices using Elec-Mate's apprentice hub. AM2 Simulator, 46+ courses, mock exams, portfolio builder, and OJT tracker. 7-day free trial, cancel anytime."
    />
  );
}
