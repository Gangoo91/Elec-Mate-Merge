import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Award,
  ClipboardCheck,
  Zap,
  PoundSterling,
  FileCheck2,
  Target,
  Wrench,
  Calendar,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-qualifications-pathway' },
  { label: 'C&G 2365', href: '/guides/city-guilds-2365-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'What is City & Guilds 2365?' },
  { id: 'level-2-vs-3', label: 'Level 2 vs Level 3' },
  { id: 'course-structure', label: 'Course Structure' },
  { id: 'exam-format', label: 'Exam Format' },
  { id: 'practical-assessments', label: 'Practical Assessments' },
  { id: 'apprenticeship-link', label: 'How 2365 Relates to Apprenticeship' },
  { id: 'entry-requirements', label: 'Entry Requirements' },
  { id: 'cost-private', label: 'Cost of Studying Privately' },
  { id: 'vs-2330', label: '2365 vs 2330 (Superseded)' },
  { id: 'for-students', label: 'Tips for Success' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The City & Guilds 2365 is the technical knowledge qualification for electrical installations — it covers the theory of how and why installations work, tested through exams and practical assessments.',
  'Level 2 covers the fundamentals: health and safety, electrical science, installation methods, and wiring regulations basics. Level 3 builds on this with design, inspection and testing, fault diagnosis, and special locations.',
  'The 2365 is the knowledge component — it does not make you a qualified electrician on its own. You also need the NVQ (competence in the workplace) and the AM2 (practical assessment) to complete the full apprenticeship.',
  'If you are studying privately (not through an employer-funded apprenticeship), expect to pay £3,000 to £6,000 for the full Level 2 and Level 3 programme depending on the training provider.',
  'The 2365 replaced the older 2330 qualification (Certificate in Electrotechnical Technology) and is the current standard for new apprentices and adult learners entering the electrical trade.',
];

const faqs = [
  {
    question: 'What is the difference between the 2365 and the 2357?',
    answer:
      'The City & Guilds 2365 is the technical knowledge qualification — it tests your understanding of electrical theory, regulations, and principles through written exams and college-based practical assessments. The 2357 (NVQ Diploma in Electrotechnical Services) is the competence qualification — it tests your ability to do the work in a real workplace through portfolio evidence and assessor observations. Together, the 2365 and the 2357 form the knowledge and competence components of the Level 3 Electrotechnical Apprenticeship. You need both (plus the AM2 and EPA) to become a qualified electrician. Some people refer to the 2365 as "the college qualification" and the 2357 as "the work qualification".',
  },
  {
    question: 'Can I do the 2365 without an apprenticeship?',
    answer:
      'Yes. The 2365 is available as a standalone qualification through private training providers and some colleges. Adult learners who want to retrain as electricians often take the 2365 Level 2 and Level 3 privately, then seek an employer for the NVQ (workplace competence) component. However, the 2365 alone does not make you a qualified electrician — you still need the NVQ and AM2. Some adult learners complete the 2365 privately, then find an employer willing to put them through the NVQ as a mature apprentice. Others complete the 2365 and then work as a "mate" (labourer) to gain experience while pursuing the NVQ through an assessment centre.',
  },
  {
    question: 'How long does the 2365 take to complete?',
    answer:
      'Through an apprenticeship, Level 2 is typically covered in years 1 and 2, and Level 3 in years 3 and 4, with one day per week at college. For full-time private study, Level 2 can be completed in 16 to 24 weeks, and Level 3 in a further 20 to 30 weeks. Some intensive courses compress the timeline further, but you need time to absorb the material — particularly the electrical science and design content. Evening courses are also available, spreading the content over a longer period (typically 1 to 2 years per level) with one or two evenings per week. The right pace depends on your learning style, work commitments, and prior electrical knowledge.',
  },
  {
    question: 'What exams are in the 2365?',
    answer:
      'The 2365 Level 2 includes written exams covering health and safety, electrical science principles, installation methods and practices, and an understanding of the Wiring Regulations. The 2365 Level 3 includes exams on electrical design, inspection and testing principles, fault diagnosis, and special locations (Part 7 of BS 7671). Exams are a mix of multiple-choice and short-answer questions. Some units also include practical assessments carried out in the college workshop. The exact number and format of exams depends on the specific units your training provider delivers, but expect 4 to 6 exams per level. Most exams have a pass mark of 60% to 65%.',
  },
  {
    question: 'Is the 2365 harder than the old 2330?',
    answer:
      'The 2365 covers broadly the same content as the 2330 but is structured differently. The 2365 is aligned with the current apprenticeship standards and BS 7671:2018+A3:2024, so the content is more up to date. Some students find the 2365 more demanding because it includes more emphasis on design and inspection and testing at Level 3. The practical assessments are also more rigorous. However, if you engage with the material and put in the study time, the 2365 is very achievable. Pass rates are high for students who attend regularly and revise consistently.',
  },
  {
    question: 'Do I need the 2365 to become an electrician?',
    answer:
      'If you are on a Level 3 Electrotechnical Apprenticeship, you will complete the 2365 (or the equivalent 5357 Diploma) as the knowledge component of your apprenticeship. If you are retraining as an adult, the 2365 is the standard route for gaining the technical knowledge required. Alternative routes exist — some assessment centres offer accelerated programmes for experienced workers — but for most people, the 2365 is the recognised and recommended path. Without a technical knowledge qualification like the 2365, you cannot demonstrate the theoretical understanding needed for the NVQ, AM2, and EPA.',
  },
  {
    question: 'What practical skills do I learn on the 2365?',
    answer:
      'The 2365 includes practical units assessed in college workshops. At Level 2, practical work covers installing wiring systems (conduit, trunking, cables), terminating accessories, and basic testing using a multifunction tester. At Level 3, practical work includes more complex installations, inspection and testing procedures, and fault diagnosis exercises. These practical assessments are carried out under controlled conditions with an assessor present. They complement the workplace practical experience you gain through the NVQ. The college practical sessions are particularly valuable for practising skills in a safe environment before applying them on site.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Apprenticeship Guide',
    description:
      'Complete overview of the electrical apprenticeship pathway including all qualifications.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/year-3-electrical-apprentice',
    title: 'Year 3 Apprentice Guide',
    description:
      'What to expect in year 3 — where Level 3 content gets demanding.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-science-revision',
    title: 'Electrical Science Revision',
    description:
      'Revise the science content covered in 2365 Level 2 and Level 3 units.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: '18th Edition Guide',
    description:
      'BS 7671 is central to the 2365 — understand the Wiring Regulations in depth.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description:
      'The practical assessment you take after completing the 2365 and NVQ.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/nvq-level-2-electrical-portfolio',
    title: 'NVQ Portfolio Guide',
    description:
      'The NVQ runs alongside the 2365 — learn how to build your workplace evidence portfolio.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What is City & Guilds 2365?',
    content: (
      <>
        <p>
          The City & Guilds 2365 (Diploma in Electrical Installations) is the technical knowledge
          qualification for anyone training to become an electrician in the UK. It covers the theory
          behind electrical installations: why we earth circuits, how to size cables, what the Wiring
          Regulations require, and the science that makes it all work.
        </p>
        <p>
          The 2365 is one of three components needed to become a qualified electrician. The other
          two are the NVQ (proving you can do the work in a real workplace) and the AM2 (a
          practical assessment of your installation, testing, and fault diagnosis skills). Together,
          these three components — plus the End-Point Assessment — form the Level 3
          Electrotechnical Apprenticeship.
        </p>
        <p>
          If you are starting an apprenticeship, you will study the 2365 at college (typically one
          day per week). If you are retraining as an adult, you can study the 2365 privately through
          a training provider — either full-time, part-time, or as evening classes.
        </p>
        <p>
          This guide covers the 2365 in detail: Level 2 vs Level 3 content, course structure, exam
          format, practical assessments, how it relates to the apprenticeship, entry requirements,
          costs, and how it differs from the older 2330 qualification.
        </p>
      </>
    ),
  },
  {
    id: 'level-2-vs-3',
    heading: 'Level 2 vs Level 3: What is the Difference?',
    content: (
      <>
        <p>
          The 2365 is delivered in two stages: Level 2 (foundation) and Level 3 (advanced). Most
          apprentices complete Level 2 in years 1 and 2, then Level 3 in years 3 and 4.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Level 2 — Foundation</h3>
            <p className="text-white text-sm leading-relaxed">
              Health and safety in electrical installations. Electrical science fundamentals (Ohm's
              law, power calculations, series and parallel circuits, magnetism). Understanding
              electrical wiring regulations (BS 7671 overview). Installation methods (clipped direct,
              in conduit, in trunking, on tray). Cable types and selection. Terminating and
              connecting conductors. Using hand and power tools safely. Basic inspection and testing
              principles.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Level 3 — Advanced</h3>
            <p className="text-white text-sm leading-relaxed">
              Electrical installation design (maximum demand, diversity, cable sizing using Appendix
              4, correction factors, disconnection times). Inspection and testing principles (testing
              sequence, acceptable values, interpreting results, certificate completion). Fault
              diagnosis and rectification (systematic fault finding, safe isolation, live testing
              where permitted). Special locations (Part 7 of BS 7671). Advanced electrical science
              (three-phase, power factor, impedance, transformers). Earthing arrangements in detail.
            </p>
          </div>
        </div>
        <p>
          Level 2 gives you the foundation to work safely on site. Level 3 gives you the knowledge
          to design, test, and certify installations. Both are essential — you cannot skip Level 2
          and go straight to Level 3.
        </p>
      </>
    ),
  },
  {
    id: 'course-structure',
    heading: 'Course Structure',
    content: (
      <>
        <p>
          The 2365 is divided into units, each covering a specific area of knowledge. The exact
          unit titles and numbers may vary slightly between training providers, but the core content
          is standardised by City & Guilds.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprenticeship route</strong> — one day per week at college over 4 years.
                Level 2 units in years 1 and 2, Level 3 units in years 3 and 4. The remaining 4
                days are spent on site with your employer, building the practical experience for
                your NVQ portfolio.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full-time private study</strong> — typically 16 to 24 weeks for Level 2 and
                20 to 30 weeks for Level 3. Full-time courses run 4 to 5 days per week and include
                both theory and practical workshop sessions. This is the fastest route but requires
                being out of work for the duration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part-time and evening classes</strong> — one or two sessions per week,
                typically taking 1 to 2 years per level. This suits people who need to work
                alongside their studies. The slower pace can actually be beneficial for absorbing
                complex topics like design and AC theory.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each unit combines classroom theory, textbook study, and practical workshop sessions. The
          practical sessions give you hands-on experience with installation methods, terminations,
          and test equipment before you encounter them on site.
        </p>
      </>
    ),
  },
  {
    id: 'exam-format',
    heading: 'Exam Format',
    content: (
      <>
        <p>
          The 2365 is assessed through a combination of written exams and practical assessments. The
          format varies by unit, but here is what to expect:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple-choice exams</strong> — timed written exams with multiple-choice
                questions. Typically 40 to 60 questions per exam, with a time limit of 1 to 2
                hours. Pass mark is usually 60% to 65%. These test your theoretical knowledge of
                regulations, science, and installation principles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Short-answer exams</strong> — some units include short-answer questions
                where you write a brief response rather than selecting from options. These test your
                ability to explain concepts, describe procedures, and show working for calculations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical assessments</strong> — assessed in the college workshop by your
                tutor or an internal assessor. You complete a practical task (for example, wiring an
                installation, carrying out tests, or diagnosing a fault) within a time limit and are
                assessed on safety, quality, accuracy, and completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Online vs paper exams</strong> — many centres now deliver exams online. The
                format is the same, but you answer on a computer instead of a paper answer sheet.
                Results are often available immediately for online exams.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Exam technique matters. Read the question carefully, eliminate obviously wrong answers,
          manage your time, and do not spend too long on any single question. For calculation
          questions, show your working — even if your final answer is wrong, partial marks may be
          available.
        </p>
      </>
    ),
  },
  {
    id: 'practical-assessments',
    heading: 'Practical Assessments',
    content: (
      <>
        <p>
          The practical assessments in the 2365 are carried out in your college or training provider
          workshop. They test your ability to apply the theory in a controlled environment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 2 practicals</strong> — installing wiring systems using different
                methods (conduit bending and fitting, trunking installation, clipped direct cabling),
                terminating cables at accessories and distribution boards, and basic testing
                (continuity, insulation resistance, polarity) using a multifunction tester.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 3 practicals</strong> — more complex installations including consumer
                unit wiring, full testing sequences, completing electrical certificates, and fault
                diagnosis exercises where you identify and rectify pre-set faults in a test rig.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assessment criteria</strong> — you are assessed on safe working practices,
                correct use of tools and equipment, quality of installation work, accuracy of test
                results, and completion within the time limit. Safety is paramount — unsafe practices
                can result in an automatic fail regardless of the quality of the work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The practical assessments are excellent preparation for the AM2. Treat every college
          practical session as a practice run — work neatly, follow procedures, and manage your
          time. The habits you build in college carry directly over to the AM2 assessment.
        </p>
      </>
    ),
  },
  {
    id: 'apprenticeship-link',
    heading: 'How the 2365 Relates to the Apprenticeship',
    content: (
      <>
        <p>
          The Level 3 Electrotechnical Apprenticeship has three main components, and the 2365 is
          one of them:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2365 Diploma (or 5357 equivalent)</strong> — the technical knowledge
                qualification. Studied at college, assessed through exams and practical assessments.
                This is the "theory" component.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2357 NVQ Diploma (or equivalent)</strong> — the workplace competence
                qualification. Assessed through{' '}
                <SEOInternalLink href="/guides/nvq-level-2-electrical-portfolio">
                  portfolio evidence
                </SEOInternalLink>{' '}
                gathered from your employer. This is the "practical" component.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AM2</strong> — the practical assessment at a JIB-approved centre. This is
                the "test" that proves you can install, test, and diagnose faults to a competent
                standard.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All three must be completed to pass through the EPA gateway and complete the
          apprenticeship. The 2365 teaches you the theory, the NVQ proves you can apply it in the
          workplace, and the AM2 tests it all under controlled conditions. They are designed to work
          together — what you learn in college should directly relate to what you do on site.
        </p>
      </>
    ),
  },
  {
    id: 'entry-requirements',
    heading: 'Entry Requirements',
    content: (
      <>
        <p>
          Entry requirements vary by training provider, but the typical requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>For apprentices (Level 2 entry)</strong> — GCSEs in maths and English at
                grade 4/C or above (or equivalent functional skills). No prior electrical experience
                required. A genuine interest in the electrical trade and a willingness to learn.
                Some employers may have additional requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>For adult learners (private study)</strong> — the same academic requirements
                apply. If you do not have GCSEs in maths and English, you can take functional skills
                qualifications alongside the 2365. Some providers offer initial assessments to
                determine your starting level.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>For Level 3 entry</strong> — you must have completed the 2365 Level 2 (or
                equivalent) before starting Level 3. Some providers may accept relevant prior
                learning if you can demonstrate equivalent knowledge.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your maths is rusty, brush up before starting. The electrical science and design units
          require comfortable working with algebra, fractions, and basic trigonometry. There is no
          shame in doing a maths refresher course first — it will make the 2365 significantly
          easier.
        </p>
      </>
    ),
  },
  {
    id: 'cost-private',
    heading: 'Cost of Studying Privately',
    content: (
      <>
        <p>
          If you are studying the 2365 outside an employer-funded apprenticeship, you will need to
          pay course fees. Costs vary significantly by provider, location, and study mode:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 2 (full-time)</strong> — £1,500 to £3,000 depending on the provider.
                This typically includes tuition, workshop access, course materials, and exam fees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 3 (full-time)</strong> — £2,000 to £4,000. Level 3 is longer and more
                demanding, which is reflected in the higher fees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combined Level 2 and 3</strong> — some providers offer a combined package
                for £3,000 to £6,000, which can be cheaper than paying separately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional costs</strong> — textbooks (BS 7671 and the On-Site Guide cost
                approximately £80 together), PPE, hand tools for practical sessions, and travel to
                the training centre. Some providers include these; others do not.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Funding options</strong> — Advanced Learner Loans are available for adults
                aged 19+ studying Level 3 qualifications. Some local authorities offer grants or
                bursaries for career changers. Check with your local college or training provider
                for available funding.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Compare at least three training providers before committing. Check their pass rates, the
          quality of their workshops, and what support they offer for students who are struggling.
          The cheapest course is not always the best value — poor teaching leads to failed exams and
          resit fees.
        </p>
      </>
    ),
  },
  {
    id: 'vs-2330',
    heading: 'City & Guilds 2365 vs 2330: What Changed?',
    content: (
      <>
        <p>
          The 2365 replaced the older 2330 (Certificate in Electrotechnical Technology) as the
          standard knowledge qualification for electrical installations. If you hear older
          electricians refer to "the 2330", they are talking about the predecessor to the
          qualification you are studying.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">What Stayed the Same</h3>
            <p className="text-white text-sm leading-relaxed">
              The core content is broadly similar: electrical science, health and safety, installation
              methods, the Wiring Regulations, and inspection and testing principles. The fundamental
              knowledge required to be a competent electrician has not changed dramatically — the
              laws of physics remain the same.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">What Changed</h3>
            <p className="text-white text-sm leading-relaxed">
              The 2365 is aligned with current apprenticeship standards and the latest edition of BS
              7671. It places more emphasis on design, inspection and testing, and fault diagnosis at
              Level 3. The assessment methods are updated — more practical assessments, online
              exams, and portfolio-style evidence. The unit structure is reorganised to better map to
              the apprenticeship standard. The 2330 is no longer available for new registrations.
            </p>
          </div>
        </div>
        <p>
          If you have an older 2330 qualification, it is still valid — you do not need to redo the
          2365. However, if you are starting fresh or retraining, the 2365 is the current and
          recommended qualification.
        </p>
      </>
    ),
  },
  {
    id: 'for-students',
    heading: 'Tips for Success on the 2365',
    content: (
      <>
        <p>
          The 2365 is demanding but achievable. Here is how to give yourself the best chance of
          success:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Attend Every Session</h4>
                <p className="text-white text-sm leading-relaxed">
                  College sessions build on each other. Missing a session means missing content that
                  the next session assumes you know. If you do miss a session, get notes from a
                  classmate and catch up before the next one. Attendance is also tracked and may
                  affect your eligibility to sit exams.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Study Between Sessions</h4>
                <p className="text-white text-sm leading-relaxed">
                  One day a week at college is not enough to absorb the material. Spend 2 to 3
                  hours per week revising between sessions. Re-read your notes, work through
                  practice questions, and use the{' '}
                  <SEOInternalLink href="/guides/electrical-science-revision">
                    electrical science revision guide
                  </SEOInternalLink>{' '}
                  for the theory topics. Consistent revision beats last-minute cramming every time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <HelpCircle className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Ask Questions</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you do not understand something, ask. Your tutor is there to teach you. Other
                  students in your class will have the same question — you are not the only one who
                  finds some topics difficult. Electrical design and AC theory are genuinely hard
                  concepts that take time to understand. No one expects you to get them immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The 2365 is the foundation of your career. The knowledge you gain here will support
          everything you do as an electrician — from sizing cables on a domestic rewire to designing
          a commercial distribution system. Invest the time and effort now, and it pays dividends
          for the rest of your working life.
        </p>
        <SEOAppBridge
          title="Support your 2365 studies with Elec-Mate"
          description="Mock exams, flashcards, and AI tutoring for every topic in the City & Guilds 2365. Revise electrical science, BS 7671, and design calculations at your own pace. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CityGuilds2365GuidePage() {
  return (
    <GuideTemplate
      title="City & Guilds 2365 | Electrical Installation Course Guide"
      description="Complete guide to the City & Guilds 2365 Diploma in Electrical Installations. Level 2 vs Level 3, course structure, exam format, practical assessments, entry requirements, costs, and how it relates to the apprenticeship."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Course Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          City & Guilds 2365:{' '}
          <span className="text-yellow-400">Electrical Installation Course Guide</span>
        </>
      }
      heroSubtitle="The 2365 is the knowledge qualification every electrician needs. This guide covers Level 2 and Level 3 content, exam format, practical assessments, costs, and how it fits into the apprenticeship pathway."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the City & Guilds 2365"
      relatedPages={relatedPages}
      ctaHeading="Study for the 2365 with Elec-Mate"
      ctaSubheading="Mock exams, revision flashcards, and AI tutoring for the City & Guilds 2365. Cover every topic from electrical science to BS 7671 with structured learning and progress tracking. 7-day free trial."
    />
  );
}
