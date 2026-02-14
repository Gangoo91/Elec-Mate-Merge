import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Wrench,
  ShieldCheck,
  Award,
  Zap,
  Calculator,
  Brain,
  FileCheck2,
  PoundSterling,
  TrendingUp,
  Clock,
  Users,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'How to Become an Electrician', href: '/guides/how-to-become-an-electrician' },
];

const tocItems = [
  { id: 'routes-into-trade', label: 'Routes into the Trade' },
  { id: 'apprenticeship-route', label: 'Apprenticeship Route' },
  { id: 'adult-retraining', label: 'Adult Retraining' },
  { id: 'qualifications-needed', label: 'Qualifications Needed' },
  { id: 'am2-assessment', label: 'The AM2 Assessment' },
  { id: 'competent-person-schemes', label: 'Competent Person Schemes' },
  { id: 'timeline-and-costs', label: 'Timeline and Costs' },
  { id: 'day-to-day-work', label: 'What the Work Involves' },
  { id: 'after-qualifying', label: 'After Qualifying' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'There are two main routes to becoming a qualified electrician in the UK: a 3-4 year apprenticeship (the traditional route) or a 1-2 year adult retraining programme (the fast-track route for career changers).',
  'The core qualifications are the Level 3 Diploma in Electrical Installations (or equivalent), the 18th Edition BS 7671 Wiring Regulations, and the AM2 practical assessment.',
  'You must join a competent person scheme (NICEIC, NAPIT, or ELECSA) to self-certify notifiable electrical work without involving building control.',
  'The total cost of qualifying through the adult retraining route is approximately £8,000-£15,000, while apprenticeships are funded by the employer and you earn while you learn.',
  'Once qualified, electricians have access to strong earning potential (£32,000-£75,000+) and multiple career paths including specialisation, self-employment, and management.',
];

const faqs = [
  {
    question: 'How long does it take to become a qualified electrician in the UK?',
    answer:
      'The timeline depends on the route you take. A traditional apprenticeship takes 3-4 years and combines on-the-job training with college-based learning (typically one day per week or block release). You earn a wage throughout and gain extensive practical experience across a wide range of installations. The adult retraining route is faster, typically taking 1-2 years, but requires more intensive study and self-funded practical experience. This route usually involves completing a Level 2 and Level 3 Diploma in Electrical Installations at a college or private training provider, followed by the AM2 practical assessment and the 18th Edition qualification. Some accelerated courses advertise completion in as little as 6-12 months, but be cautious — you still need to accumulate enough practical experience to pass the AM2 and to work competently and safely on real installations.',
  },
  {
    question: 'Can I become an electrician without an apprenticeship?',
    answer:
      'Yes, absolutely. The adult retraining route (sometimes called the "mature candidate" route) allows people to qualify as electricians without a formal apprenticeship. You complete the same qualifications — Level 2 and Level 3 Diploma in Electrical Installations, 18th Edition BS 7671, and the AM2 assessment — but you do so through a college or private training provider rather than through an employer-led apprenticeship. The key challenge is gaining enough practical experience. Apprentices get 3-4 years of supervised on-site work; adult retrainees need to find ways to build their practical skills, whether through work placements, working alongside a qualified electrician, or through the practical components of their training course. Many career changers work as an electrical mate or labourer while studying to gain site experience. The qualifications are identical regardless of the route, and once you hold them, there is no distinction in the eyes of employers or competent person schemes.',
  },
  {
    question: 'What qualifications do I need to become an electrician?',
    answer:
      'The core qualifications for a qualified electrician in the UK are: (1) Level 2 Diploma in Electrical Installations (C&G 2365 or equivalent), covering the fundamentals of electrical science, health and safety, and basic installation skills; (2) Level 3 Diploma in Electrical Installations (C&G 2365 or 2357, or the newer Level 3 Electrotechnical qualification), covering advanced installation, inspection, testing, fault diagnosis, and design; (3) 18th Edition IET Wiring Regulations (C&G 2382), the qualification that covers BS 7671:2018+A3:2024 — the standard all electrical work must comply with; (4) AM2 Assessment, a practical end-point assessment run by NET (National Electrotechnical Training) that tests your ability to install, inspect, and test an electrical installation to a competent standard. You may also want the C&G 2391 (Inspection and Testing) qualification if you intend to carry out periodic inspection and testing (EICRs), which is a separate but highly valuable qualification.',
  },
  {
    question:
      'How much does it cost to train as an electrician through the adult retraining route?',
    answer:
      'The total cost of qualifying through the adult retraining route typically ranges from £8,000 to £15,000, depending on the training provider and location. This breaks down roughly as follows: Level 2 Diploma in Electrical Installations (£2,000-£4,000), Level 3 Diploma in Electrical Installations (£3,000-£6,000), 18th Edition BS 7671 course (£250-£500), AM2 Assessment fee (£885 from April 2026 for the standard AM2, or £965 for AM2S/AM2E), tools and test equipment (£1,000-£3,000 for a basic professional kit), and textbooks and study materials (£100-£300). Some training providers offer package deals covering Level 2, Level 3, and 18th Edition together for £6,000-£10,000. Government funding may be available through Advanced Learner Loans for adults aged 19 and over, which can significantly reduce upfront costs. If you are studying at a college rather than a private provider, fees are often lower but the course may take longer. Be wary of providers advertising very low prices — check their pass rates, the quality of their practical facilities, and whether their qualifications are recognised by JIB and the competent person schemes.',
  },
  {
    question: 'What is the AM2 assessment and how do I prepare for it?',
    answer:
      'The AM2 (Achievement Measurement 2) is a practical assessment run by NET (National Electrotechnical Training) at their assessment centres across the UK. It is the final hurdle to becoming a qualified electrician and is required for JIB Approved Electrician grading. There are three versions: the standard AM2 (approximately 8.5 hours of practical work), AM2S (for apprentices on the Installation and Maintenance standard — approximately 16.5 hours over 2.5 days, including additional conduit tasks), and AM2E (for apprentices on the Electrotechnical standard from September 2023). All versions test your ability to install, inspect, and test an electrical installation to a competent standard. You are given a scenario involving a small installation with a consumer unit, ring circuit, lighting circuit (including two-way switching), and must complete the installation, carry out initial verification testing (including continuity, insulation resistance, polarity, earth fault loop impedance, and RCD testing), complete the relevant certification, and diagnose faults on a pre-wired circuit. The assessment is marked on safety, workmanship, compliance with BS 7671, accuracy of test results, and completion of paperwork. The current fee is £885 for the standard AM2 or £965 for AM2S/AM2E (from April 2026). To prepare, practise your installation skills extensively, revise the testing procedures and acceptable values, and familiarise yourself with the certification forms. Elec-Mate includes an AM2 simulator that replicates the assessment scenarios and marking criteria.',
  },
  {
    question: 'What is a competent person scheme and do I need to join one?',
    answer:
      'A competent person scheme is a government-authorised scheme that allows qualified electricians to self-certify that their electrical work complies with Part P of the Building Regulations (in England and Wales) without needing to involve the local authority building control department. The main schemes for electricians are NICEIC (National Inspection Council for Electrical Installation Contracting), NAPIT (National Association of Professional Inspectors and Testers), and ELECSA. You do not legally need to be a member to carry out electrical work, but without membership you must notify your local building control department before starting any notifiable work (such as new circuits, consumer unit changes, or work in bathrooms and kitchens), pay their inspection fee (typically £200-£400 per job), and wait for their inspection. This makes each job more expensive and slower. Most self-employed electricians and small contractors join a scheme because it allows them to self-certify work, gives clients confidence, and is often required by insurers. Membership costs typically £400-£800 per year and requires an initial assessment of your qualifications, insurance, and a sample of your work.',
  },
  {
    question: 'Is it worth becoming an electrician in 2026?',
    answer:
      'Yes, becoming an electrician in 2026 is an excellent career choice for several reasons. First, demand for electricians continues to outstrip supply — the construction industry, renewable energy sector (EV chargers, solar PV, battery storage), and the ongoing need for inspection, testing, and maintenance of existing installations all create strong, sustained demand. Second, the earning potential is strong: qualified electricians earn £32,000-£45,000 employed and £40,000-£75,000+ self-employed, with specialist areas commanding even higher rates. Third, the trade offers genuine career flexibility — you can work for a large contractor, a small firm, or yourself; you can specialise in domestic, commercial, industrial, or renewable energy work; and you can progress into project management, contracts management, or running your own business with employees. Fourth, unlike many careers that are threatened by automation, electrical work requires hands-on skill, problem-solving in varied physical environments, and compliance knowledge that cannot easily be replaced by technology. The investment of time and money to qualify is significant, but the return on that investment is strong and the trade provides lifelong employability.',
  },
];

const sections = [
  {
    id: 'routes-into-trade',
    heading: 'Routes into the Electrical Trade',
    content: (
      <>
        <p>
          There are two main routes to becoming a qualified electrician in the UK: the
          apprenticeship route and the adult retraining route. Both lead to the same qualifications
          and the same career opportunities — the difference is in how you get there.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">The Two Main Routes</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h4 className="font-bold text-white">Apprenticeship (3-4 years)</h4>
                <p className="text-white text-sm leading-relaxed mt-1">
                  The traditional route. You work for an employer full-time while attending college
                  one day per week or on block release. Your employer pays your wages and funds your
                  training. You gain extensive on-the-job experience across a wide range of
                  installations. This is the route most electricians take if they enter the trade at
                  16-18 years old.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold text-white">Adult Retraining (1-2 years)</h4>
                <p className="text-white text-sm leading-relaxed mt-1">
                  The fast-track route for career changers. You study at a college or private
                  training provider, often self-funded or through Advanced Learner Loans. The
                  qualifications are identical to the apprenticeship route. The main challenge is
                  gaining sufficient practical experience outside of the classroom.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          There is also a third, less common route: a full-time college course without an
          apprenticeship employer. Some colleges offer full-time Level 2 and Level 3 electrical
          programmes, but these generally take longer (2-3 years) and still require you to find work
          experience independently. The apprenticeship route is generally considered the gold
          standard because it combines formal education with real-world experience under
          supervision.
        </p>
      </>
    ),
  },
  {
    id: 'apprenticeship-route',
    heading: 'The Apprenticeship Route',
    content: (
      <>
        <p>
          An electrical apprenticeship is the most common and most respected route into the trade.
          You are employed by an electrical contractor from Day 1 and split your time between
          working on site and attending college or a training centre. The typical structure is 4
          days on site and 1 day at college, or block release periods of several weeks at college
          followed by extended time on site.
        </p>
        <p>
          Apprenticeships are typically 3-4 years in duration. During this time, you work through
          the Level 2 and Level 3 Diplomas in Electrical Installations, complete the 18th Edition
          qualification, gain extensive practical experience across domestic, commercial, and
          possibly industrial installations, and prepare for the AM2 practical assessment at the
          end.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            What to Expect During an Apprenticeship
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Year 1:</strong> Learning the basics — health and safety, tool use, basic
                wiring, conduit and trunking, cable types, regulations fundamentals. Mostly
                assisting qualified electricians on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Year 2:</strong> Completing Level 2 Diploma. First fix installation work
                (chasing, cabling, back boxes), circuit theory, earthing and bonding, basic fault
                finding. Starting to work more independently under supervision.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Year 3:</strong> Level 3 Diploma. Second fix, consumer unit installation,
                testing and inspection, three-phase systems, more complex fault diagnosis. 18th
                Edition qualification usually taken during this year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Year 4:</strong> Completing Level 3, final portfolio, preparation for AM2
                assessment, End-Point Assessment (EPA) for those on the new apprenticeship standard.
                Working at near-qualified level on site.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Pay during an apprenticeship starts at around £14,000-£18,000 in Year 1 and rises each
          year. By Year 4, apprentices typically earn £22,000-£28,000. For a detailed pay breakdown,
          see our{' '}
          <SEOInternalLink href="/guides/electrician-salary-uk">
            electrician salary guide
          </SEOInternalLink>
          .
        </p>
        <SEOAppBridge
          title="Apprentice Training Hub"
          description="Elec-Mate supports apprentices from Day 1 to qualification. Flashcards for Level 2 and Level 3 theory, mock exams that replicate the real papers, an EPA simulator, AM2 practice scenarios, on-the-job training (OJT) tracking, site diary for recording daily learning, and a portfolio builder for gathering evidence. Everything your college and employer expect, on your phone."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'adult-retraining',
    heading: 'The Adult Retraining Route',
    content: (
      <>
        <p>
          If you are over 18 and looking to change careers, the adult retraining route lets you
          qualify as an electrician without a traditional apprenticeship. This route has become
          increasingly popular, with thousands of career changers entering the trade each year from
          backgrounds as diverse as office work, retail, the military, and other trades.
        </p>
        <p>
          The adult retraining route involves completing the same qualifications as the
          apprenticeship route — Level 2 and Level 3 Diplomas in Electrical Installations, the 18th
          Edition BS 7671, and the AM2 assessment — but you do so through a college or private
          training provider rather than through an employer. You typically self-fund the training,
          although government-backed Advanced Learner Loans are available for adults aged 19 and
          over.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Adult Retraining: Step by Step</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Step 1:</strong> Enrol on a Level 2 Diploma in Electrical Installations at a
                college or training provider (3-6 months full-time, or 6-12 months part-time)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Step 2:</strong> Progress to the Level 3 Diploma (6-12 months full-time, or
                12-18 months part-time)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Step 3:</strong> Complete the 18th Edition BS 7671 qualification (typically
                a 3-5 day course + exam)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Step 4:</strong> Gain practical experience — work as an electrical mate,
                volunteer on projects, or arrange supervised work placements
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Step 5:</strong> Pass the AM2 practical assessment at a NET assessment
                centre
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Step 6:</strong> Apply for JIB Approved Electrician grading and join a
                competent person scheme
              </span>
            </li>
          </ul>
        </div>
        <p>
          The biggest challenge with the adult retraining route is gaining enough practical
          experience. Apprentices spend 3-4 years working on real installations under supervision —
          adult retrainees need to find their own way to build these skills. The most successful
          approach is to work as an electrical mate or labourer for a qualified electrician while
          studying, which gives you paid work experience alongside your training.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications-needed',
    heading: 'Qualifications Needed to Become an Electrician',
    content: (
      <>
        <p>
          The UK electrical industry has a clear qualification pathway. While exact qualification
          names and numbers have changed over the years, the current structure (as of 2026) is
          well-defined. Here are the qualifications you need, in order.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Core Qualifications</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>
                  Level 2 Diploma in Electrical Installations (C&G 2365-02 or equivalent):
                </strong>{' '}
                Covers electrical science fundamentals, health and safety, installation methods,
                wiring systems, and basic circuit theory. This is the foundation qualification and
                typically the first formal qualification apprentices or adult trainees achieve.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>
                  Level 3 Diploma in Electrical Installations (C&G 2365-03, 2357, or the newer
                  Electrotechnical qualification):
                </strong>{' '}
                The main qualification that makes you a qualified electrician. Covers advanced
                installation techniques, inspection and testing, fault diagnosis, design,
                three-phase systems, fire alarm and emergency lighting basics, and BS 7671
                compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>18th Edition IET Wiring Regulations (C&G 2382-22):</strong> The
                qualification covering BS 7671:2018+A3:2024, the standard that all electrical
                installation work in the UK must comply with. A 3-5 day intensive course followed by
                an online exam. Must be kept current as amendments are issued.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>AM2 Assessment:</strong> The practical end-point assessment that
                demonstrates you can install, inspect, test, and certify an electrical installation
                to a competent standard. Required for JIB Approved Electrician grading.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Additional Valuable Qualifications</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>C&G 2391 — Inspection and Testing:</strong> Essential if you want to carry
                out periodic inspection and testing (EICRs). Opens up a highly profitable
                specialism. Most competent person schemes require this for members who carry out
                periodic testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>ECS/CSCS Card:</strong> The Electrotechnical Certification Scheme (ECS)
                card, often called the "gold card," is the industry-standard ID card for
                electricians. Required for most commercial and industrial sites. Issued by the JIB
                based on your qualifications and grading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>
                  EV Charger Installation, Solar PV, Fire Alarm (BS 5839), Emergency Lighting (BS
                  5266):
                </strong>{' '}
                Specialist qualifications that open up higher-paying niches. See our salary guide
                for the earning premium these qualifications command.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Flashcards and Mock Exams"
          description="Study for every qualification on the pathway — Level 2, Level 3, 18th Edition, C&G 2391 — with Elec-Mate's flashcard decks and timed mock exams. AI-powered explanations break down every question you get wrong. Pass first time."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'am2-assessment',
    heading: 'The AM2 Practical Assessment',
    content: (
      <>
        <p>
          The AM2 (Achievement Measurement 2) is the practical assessment that separates qualified
          electricians from trainees. Run by NET (National Electrotechnical Training) at assessment
          centres across the UK, it is the final step to achieving JIB Approved Electrician status.
        </p>
        <p>
          There are three versions of the AM2. The standard <strong>AM2</strong> is for candidates
          who hold a Level 3 NVQ and involves approximately 8.5 hours of practical work.{' '}
          <strong>AM2S</strong> is the version for apprentices on the Installation and Maintenance
          apprenticeship standard — it includes additional containment tasks (steel and PVC conduit
          installation) and takes approximately 16.5 hours over 2.5 days. <strong>AM2E</strong> is
          for apprentices on the newer Electrotechnical apprenticeship standard (from September 2023
          onwards). All three versions are carried out under exam conditions at a NET assessment
          centre. You are given a realistic installation scenario and must complete the work to a
          competent standard, including installation, testing, and certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">What the AM2 Assessment Covers</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Installation:</strong> Wiring a small installation including a consumer
                unit, ring final circuit, radial circuit, lighting circuit (often two-way
                switching), and a high-current circuit (shower or cooker). You must install
                containment, cables, and accessories to a workmanlike standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Safe isolation:</strong> Demonstrating the correct safe isolation procedure
                before working on the installation. Failure to safely isolate is an automatic fail.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Initial verification testing:</strong> Continuity of protective conductors
                (R1+R2), continuity of ring final circuit conductors, insulation resistance,
                polarity, earth fault loop impedance (Zs), prospective fault current (PFC), and RCD
                operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Certification:</strong> Completing an Electrical Installation Certificate
                (EIC) or Minor Works Certificate with accurate test results, circuit details, and
                design information.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Fault finding:</strong> Diagnosing and rectifying a fault that has been
                introduced into a pre-wired installation. Common faults include reversed polarity,
                broken conductors, and incorrect connections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A significant number of candidates do not pass on their first attempt. The most common
          reasons for failure are poor safe isolation procedure, inaccurate test results, incomplete
          certification, time management, and poor workmanship (loose connections, untidy cable
          runs, incorrect gland sizes). NET's own data shows that 54% of candidates who failed said
          they were less than fully prepared, with fault finding and inspection/testing being the
          most challenging areas. Practice is the key to passing — the more installations you
          complete before the assessment, the more confident and efficient you will be on the day.
        </p>
        <SEOAppBridge
          title="AM2 Simulator"
          description="Elec-Mate's AM2 simulator replicates the assessment scenarios and marking criteria. Practice the installation sequence, work through the testing procedures, complete the certification forms, and check your answers against the marking scheme — all on your phone. Walk into the assessment centre knowing exactly what to expect."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'competent-person-schemes',
    heading: 'Competent Person Schemes: NICEIC, NAPIT, ELECSA',
    content: (
      <>
        <p>
          Once you are qualified, one of your first decisions will be whether to join a competent
          person scheme. These are government-authorised schemes that allow electricians to
          self-certify that their work complies with Part P of the Building Regulations in England
          and Wales.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">The Main Schemes</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>
                  NICEIC (National Inspection Council for Electrical Installation Contracting):
                </strong>{' '}
                The largest and most widely recognised scheme. Offers Approved Contractor and
                Domestic Installer categories. Annual fee approximately £500-£800 depending on
                membership level. Known for rigorous initial assessment and regular inspections of
                your work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>
                  NAPIT (National Association of Professional Inspectors and Testers):
                </strong>{' '}
                A well-respected alternative to NICEIC. Offers similar membership categories at
                competitive prices. Annual fee approximately £400-£650. Many electricians prefer
                NAPIT for its slightly lower costs and responsive customer service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>ELECSA:</strong> Part of the Certsure group (which also includes NICEIC).
                Offers a Registered Electrician category at lower cost. A good option for sole
                traders and smaller businesses looking for scheme membership without the higher fees
                of NICEIC Approved Contractor status.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Without competent person scheme membership, you must notify your local building control
          department before starting any notifiable electrical work and pay for their inspection
          (typically £200-£400 per job). For most self-employed electricians and small businesses,
          scheme membership pays for itself within the first few jobs of the year. The scheme also
          provides marketing benefits — many consumers specifically look for NICEIC or NAPIT
          registered electricians, and most insurers require scheme membership.
        </p>
      </>
    ),
  },
  {
    id: 'timeline-and-costs',
    heading: 'Timeline and Costs',
    content: (
      <>
        <p>
          The time and money required to become a qualified electrician varies significantly
          depending on the route you choose. Here is a direct comparison.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Apprenticeship Route</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>Duration:</strong> 3-4 years
              </li>
              <li>
                <strong>Cost to you:</strong> £0 (employer-funded)
              </li>
              <li>
                <strong>Earnings during training:</strong> £14,000-£28,000/year (increasing
                annually)
              </li>
              <li>
                <strong>Practical experience:</strong> Extensive (3-4 years on-site)
              </li>
              <li>
                <strong>Best for:</strong> School leavers, those who can afford the lower starting
                wage
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Adult Retraining Route</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>Duration:</strong> 1-2 years
              </li>
              <li>
                <strong>Cost to you:</strong> £8,000-£15,000 (may be loan-funded)
              </li>
              <li>
                <strong>Earnings during training:</strong> £0 (unless working as a mate alongside)
              </li>
              <li>
                <strong>Practical experience:</strong> Must be sought independently
              </li>
              <li>
                <strong>Best for:</strong> Career changers, those with savings or access to loans
              </li>
            </ul>
          </div>
        </div>
        <p>
          Regardless of route, you will also need to budget for tools and test equipment. A basic
          professional toolkit costs £500-£1,500, and a calibrated multifunction tester (such as a
          Megger MFT1741 or Fluke 1664FC) costs £600-£1,200. You will also need a proving unit, a
          voltage indicator, and various accessories. Budget £1,000-£3,000 for a complete set of
          tools and test instruments to start your career.
        </p>
      </>
    ),
  },
  {
    id: 'day-to-day-work',
    heading: 'What the Work Involves Day to Day',
    content: (
      <>
        <p>
          Understanding what an electrician actually does on a daily basis helps you decide whether
          the trade is right for you. The work is varied, physical, and mentally challenging — no
          two days are the same.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            A Typical Day for a Domestic Electrician
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>07:30:</strong> Load van, check materials list, drive to first job
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>08:00:</strong> Arrive on site. Today: consumer unit upgrade in a 3-bed
                semi. Safe isolation, disconnect old board, install new dual-RCD or RCBO board,
                reconnect circuits
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>12:00:</strong> Lunch break. Check emails, respond to enquiries, send a
                quote for a rewire job next week
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>12:30:</strong> Complete installation, carry out initial verification
                testing (continuity, insulation resistance, polarity, Zs, PFC, RCD tests)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>15:00:</strong> Complete EIC certificate, explain work to homeowner, send
                invoice
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>15:30:</strong> Drive to second job. Quick call-back to fix a faulty socket
                in a flat. Diagnose loose connection, repair, test, done in 45 minutes
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>17:00:</strong> Head home. Order materials for tomorrow's jobs. Update job
                records.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The work is physical — you will crawl through loft spaces, work in tight cupboards, chase
          walls, lift floorboards, and spend time on ladders. It requires a good head for
          problem-solving, as fault-finding and working with existing installations often present
          puzzles that textbooks do not cover. You need attention to detail for testing and
          certification, and good communication skills for explaining work to clients. Most
          electricians work a standard 37.5-40 hour week, although self-employed electricians often
          choose to work longer hours to maximise earnings.
        </p>
      </>
    ),
  },
  {
    id: 'after-qualifying',
    heading: 'After Qualifying: What Comes Next',
    content: (
      <>
        <p>
          Once you are qualified, the electrical trade offers multiple career paths. Your
          qualification is a foundation — what you build on top of it determines your earning
          potential and career satisfaction.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Career Paths After Qualifying</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Self-employment:</strong> Set up your own domestic or commercial business.
                Highest earning potential but requires business skills. See our{' '}
                <a
                  href="/guides/going-self-employed-electrician"
                  className="text-yellow-400 underline underline-offset-2"
                >
                  self-employment guide
                </a>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Specialisation:</strong> EV chargers, solar PV, fire alarms, data cabling,
                high voltage, control panels. Each specialism commands higher rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Testing and inspection:</strong> Become an EICR specialist. C&G 2391
                qualification required. Highly profitable with the growing landlord EICR market.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Site supervisor / project manager:</strong> Move into managing teams and
                projects on larger commercial and industrial sites. Higher pay, less tool work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Contracts management:</strong> Manage multiple projects and client
                relationships. Typically £50,000-£70,000+ with a large contractor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Building your own team:</strong> Employ apprentices and other electricians,
                take on larger projects, and scale your business.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="The Complete Platform for Your Career"
          description="Elec-Mate grows with you. As an apprentice: flashcards, mock exams, AM2 simulator. As a newly qualified sparky: 8 certificate types, 70+ calculators, 5 AI agents. As a self-employed business owner: quoting, invoicing, expense tracking, cash flow planning. One app for every stage of your career."
          icon={Zap}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK',
    description:
      'Complete salary guide — average pay, day rates, regional breakdowns, specialist premiums.',
    icon: PoundSterling,
    category: 'Salary Guide',
  },
  {
    href: '/training/apprentice',
    title: 'Apprentice Training Hub',
    description: 'Flashcards, mock exams, EPA simulator, OJT tracking for apprentice electricians.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/18th-edition-course',
    title: '18th Edition Course Guide',
    description: 'Everything you need to know about the 18th Edition BS 7671 qualification.',
    icon: BookOpen,
    category: 'Qualification',
  },
  {
    href: '/guides/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description: 'Tips, practice scenarios, and marking criteria for the AM2 practical assessment.',
    icon: ClipboardCheck,
    category: 'Assessment',
  },
  {
    href: '/training/level-2-electrical',
    title: 'Level 2 Electrical',
    description: 'Study support for the Level 2 Diploma in Electrical Installations.',
    icon: Award,
    category: 'Training',
  },
  {
    href: '/guides/electrician-career-progression',
    title: 'Career Progression',
    description: 'From apprentice to contracts manager — the complete career ladder.',
    icon: TrendingUp,
    category: 'Career Guide',
  },
];

export default function HowToBecomeElectricianPage() {
  return (
    <GuideTemplate
      title="How to Become an Electrician UK 2026 | Complete Career Guide"
      description="Complete guide to becoming a qualified electrician in the UK in 2026. Apprenticeship and adult retraining routes, qualifications needed, AM2 assessment, competent person schemes, costs, timeline, and what the work involves."
      datePublished="2024-03-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          How to Become an Electrician in the UK:{' '}
          <span className="text-yellow-400">The Complete 2026 Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about becoming a qualified electrician — from choosing your route (apprenticeship or adult retraining) to passing the AM2, joining a scheme, and building a career. Written by qualified electricians, not marketing writers."
      readingTime={22}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Becoming an Electrician"
      relatedPages={relatedPages}
      ctaHeading="Start your electrical career with the right tools"
      ctaSubheading="Apprentice training hub, mock exams, AM2 simulator, flashcards, and the complete certification platform. Start your 7-day free trial."
    />
  );
}
