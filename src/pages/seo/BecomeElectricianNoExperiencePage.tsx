import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  GraduationCap,
  Briefcase,
  PoundSterling,
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  Zap,
  FileText,
  Users,
  Calculator,
  Wrench,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Become Electrician No Experience', href: '/guides/become-electrician-no-experience' },
];

const tocItems = [
  { id: 'can-you-become-electrician', label: 'Can You Do It?' },
  { id: 'career-change-routes', label: 'Career Change Routes' },
  { id: 'adult-apprenticeships', label: 'Adult Apprenticeships' },
  { id: 'domestic-installer-courses', label: 'Domestic Installer Courses' },
  { id: 'fast-track-options', label: 'Fast-Track Options' },
  { id: 'funding-and-costs', label: 'Funding & Costs' },
  { id: 'first-steps', label: 'Your First Steps' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'You do not need any prior experience or qualifications to start training as an electrician in the UK. Adult apprenticeships and domestic installer courses accept career changers of all ages.',
  'An adult apprenticeship is the most thorough route, taking 3-4 years but providing a full Level 3 NVQ, AM2 assessment, and JIB registration. Employers pay you a wage throughout.',
  'Domestic installer courses (sometimes called "fast-track" courses) can qualify you for Part P domestic work in 12-25 weeks, but you will still need practical experience and a competent person scheme membership to work independently.',
  'Funding options include adult education budgets, advanced learner loans, employer-funded apprenticeships, and the apprenticeship levy. Many training providers offer payment plans.',
  "The fastest way to build confidence alongside formal training is using Elec-Mate's study centre for 18th Edition revision, mock exams, and flashcards — available from day one of your journey.",
];

const faqs = [
  {
    question: 'Can I become an electrician at 30, 40, or 50 with no experience?',
    answer:
      'Yes, absolutely. There is no upper age limit for entering the electrical trade in the UK. Adult apprenticeships are open to anyone aged 16 and above, and many domestic installer courses specifically cater to career changers in their 30s, 40s, and beyond. While younger apprentices may have the advantage of time, older career changers often bring valuable transferable skills — project management, customer service, time management, and a strong work ethic — that employers value highly. Many of the most successful electricians entered the trade later in life. The key requirement is not age but commitment: you need to be prepared to study, learn practical skills, and put in the hours to build competence. Physically, electrical work is less demanding than many other trades, making it accessible to a wider age range.',
  },
  {
    question: 'How long does it take to become a qualified electrician from scratch?',
    answer:
      'The timeline depends on the route you choose. A full apprenticeship takes 3-4 years, after which you hold a Level 3 NVQ, have passed the AM2 assessment, and can register with a competent person scheme as a fully qualified electrician. Domestic installer courses typically take 12-25 weeks of classroom and practical training, followed by a period of supervised work experience before you can work independently. Some intensive courses claim shorter timescales, but be cautious — the 18th Edition qualification alone requires significant study, and practical competence takes time to develop regardless of the classroom hours completed. A realistic timeline for a career changer going the domestic installer route, from zero experience to independently working on domestic installations, is 12-18 months including the training course and the initial period of building practical experience.',
  },
  {
    question: 'Do I need GCSEs or A-levels to become an electrician?',
    answer:
      'Formal entry requirements vary by training provider and route. Most apprenticeships ask for GCSEs in English and Maths at grade C/4 or above, though some employers are flexible and may accept functional skills qualifications instead. If you do not hold these qualifications, many training providers offer functional skills courses alongside the electrical training. Domestic installer courses generally have no formal academic entry requirements — they assess suitability through interview and aptitude rather than prior qualifications. The most important qualities for success in electrical training are practical aptitude, a willingness to learn, attention to detail, and basic numeracy (you need to be comfortable with fractions, percentages, and basic algebra for BS 7671 calculations).',
  },
  {
    question: 'What is the difference between an apprenticeship and a domestic installer course?',
    answer:
      'An apprenticeship is a 3-4 year programme where you work for an employer and attend college on day-release or block-release. You earn a wage throughout (starting around GBP 14,000-18,000 in Year 1 and rising each year), gain extensive on-the-job experience, and qualify with a Level 3 NVQ, 18th Edition, AM2 assessment, and JIB registration. This is the most comprehensive route and gives you the broadest career options. A domestic installer course is a shorter programme (typically 12-25 weeks) that trains you specifically for domestic electrical work. You pay for the course (GBP 3,000-GBP 8,000 depending on provider), attend full-time or part-time, and qualify to do Part P notifiable domestic work once you gain a competent person scheme membership. This route is faster but narrower — it qualifies you for domestic work but not for commercial or industrial installations without further training.',
  },
  {
    question: 'How much does it cost to retrain as an electrician?',
    answer:
      'Costs vary significantly by route. An apprenticeship costs you nothing directly — your employer pays your wages and the training is funded through the apprenticeship levy or government co-investment. Domestic installer courses range from GBP 3,000 to GBP 8,000 depending on the provider, duration, and what is included (some bundle the 18th Edition exam, C&G 2382 qualifications, and AM2 preparation). On top of course fees, budget for tools (GBP 500-GBP 1,500 for a basic kit), textbooks (GBP 50-GBP 150), exam fees if not included (GBP 100-GBP 300 per exam), and living costs during training if you are not earning. Funding options include advanced learner loans (available for Level 3+ qualifications for those aged 19+), adult education budgets, career development loans, and payment plans offered by many training providers. Some local authorities and charities also offer grants for career changers entering skilled trades.',
  },
  {
    question: 'Can I learn electrical work online?',
    answer:
      'The theory component of electrical training can be studied online or through apps like Elec-Mate, which provides comprehensive 18th Edition study materials, flashcards, mock exams, and an AI tutor. This is excellent for revision, exam preparation, and reinforcing classroom learning. However, electrical work is a practical trade that requires hands-on training under supervision. You cannot learn to wire a consumer unit, test an installation, or fault-find a circuit from a screen alone. Any credible qualification requires practical assessment, and competent person schemes require evidence of practical competence. The best approach is to combine formal classroom and workshop training with digital study tools for theory and revision. Many career changers find that studying theory through an app before starting their course gives them a significant head start.',
  },
  {
    question: 'Will employers hire me with no electrical experience?',
    answer:
      'Yes, if you are entering through an apprenticeship, the entire point is that you have no prior experience — employers expect to train you from scratch. For career changers who have completed a domestic installer course, finding your first position can be more challenging as employers may prefer candidates with on-site experience. Strategies to improve your chances include volunteering or working alongside a qualified electrician (even unpaid for a short period to gain references), registering with electrical recruitment agencies, networking through trade forums and social media, joining a "mate" or labourer role with an electrical contractor to learn the trade from the ground up, and highlighting transferable skills from your previous career. Many career changers find their first work by approaching small local electrical firms who value reliability and a strong work ethic over years of experience.',
  },
];

const sections = [
  {
    id: 'can-you-become-electrician',
    heading: 'Can You Become an Electrician with No Experience?',
    content: (
      <>
        <p>
          Yes. Every qualified electrician in the UK started with no experience. The electrical
          trade has well-established training routes designed specifically for people with zero
          prior knowledge, whether you are a school leaver, a university graduate looking for a
          career change, or someone in their 40s or 50s wanting a new direction.
        </p>
        <p>
          The UK has a significant shortage of qualified electricians. Industry bodies estimate that
          the UK needs tens of thousands of additional electricians over the next decade to meet
          demand from housing construction, the EV charging rollout, solar PV installations, and
          ageing infrastructure upgrades. This shortage means there has never been a better time to
          enter the trade — employers are actively looking for new entrants, and the earning
          potential is strong. For a full breakdown of what you can expect to earn, see our{' '}
          <SEOInternalLink href="/guides/electrician-salary-uk">
            electrician salary guide
          </SEOInternalLink>
          .
        </p>
        <p>
          The key question is not whether you can become an electrician with no experience — you
          absolutely can — but which route is right for your circumstances. Your age, financial
          situation, family commitments, and career goals all influence which path makes the most
          sense.
        </p>
      </>
    ),
  },
  {
    id: 'career-change-routes',
    heading: 'Career Change Routes into Electrical Work',
    content: (
      <>
        <p>
          There are several established routes into the electrical trade for people with no prior
          experience. Each has different time commitments, costs, and outcomes. Here is an overview
          of the main options.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Main Routes into Electrical Work</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Adult apprenticeship (3-4 years):</strong> The most comprehensive route. You
                work for an employer, attend college, earn a wage, and qualify with a full Level 3
                NVQ. No upper age limit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Domestic installer course (12-25 weeks):</strong> Focused on Part P domestic
                work. You pay for the course and train full-time or part-time. Qualifies you for
                domestic installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Electrical mate/labourer route:</strong> Start working on site as an
                electrical labourer, learn the trade informally, then formalise your skills through
                an NVQ assessment. Takes longer but earns money from day one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Military transition:</strong> Ex-forces personnel can access funded
                retraining through the Career Transition Partnership (CTP) and Enhanced Learning
                Credits (ELC).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The right route depends on your circumstances. If you can afford to train full-time and
          want to work independently as soon as possible, a domestic installer course is the fastest
          path. If you want the most thorough training and the widest career options, an
          apprenticeship is the gold standard. If you need to earn money immediately, starting as an
          electrical mate and training alongside the work is a viable alternative. For a complete
          overview of all qualification routes, see our{' '}
          <SEOInternalLink href="/guides/electrical-qualifications-pathway">
            qualifications pathway guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'adult-apprenticeships',
    heading: 'Adult Apprenticeships for Career Changers',
    content: (
      <>
        <p>
          Adult apprenticeships are one of the best-kept secrets in the electrical trade. Many
          people assume apprenticeships are only for school leavers, but there is no upper age limit
          — you can start an electrical apprenticeship at any age, and the government funds the
          training for all ages (though funding rules differ depending on whether you are under 19,
          19-24, or 25+).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">What You Get from an Apprenticeship</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Level 3 NVQ in Electrotechnical Services:</strong> The industry-standard
                qualification recognised by all employers and competent person schemes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>18th Edition (BS 7671:2018+A3:2024):</strong> The current Wiring Regulations
                qualification required for all electrical work in the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>AM2 assessment:</strong> The practical assessment that demonstrates
                competence and allows JIB registration as an Approved Electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-4 years of practical experience:</strong> Working on real installations
                under supervision, building genuine competence that no short course can replicate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The main challenge for adult career changers is the pay. Apprentice wages start at around
          GBP 14,000-18,000 per year, which is a significant pay cut for most career changers.
          However, this increases each year, and upon qualification you immediately earn GBP
          28,000-35,000 with rapid progression beyond that. For a full breakdown, see our{' '}
          <SEOInternalLink href="/guides/electrician-apprentice-salary">
            apprentice salary guide
          </SEOInternalLink>
          .
        </p>
        <p>
          To find adult apprenticeship vacancies, check the government's Find an Apprenticeship
          service, the JIB apprenticeship scheme, and approach electrical contractors directly. Many
          smaller firms are open to adult apprentices but do not always advertise — a speculative CV
          and a phone call can be surprisingly effective. See our{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            apprenticeship guide
          </SEOInternalLink>{' '}
          for detailed advice on applications.
        </p>
        <SEOAppBridge
          title="Apprentice Training Hub"
          description="From day one of your apprenticeship, Elec-Mate supports your learning with 18th Edition flashcards, mock exams, EPA simulator, AM2 preparation, OJT tracking, portfolio builder, and site diary. Everything your college and employer expect, in your pocket."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'domestic-installer-courses',
    heading: 'Domestic Installer Courses',
    content: (
      <>
        <p>
          Domestic installer courses (sometimes marketed as "fast-track electrician courses" or
          "Part P courses") are designed specifically for career changers who want to qualify for
          domestic electrical work in a shorter timeframe than an apprenticeship. These courses
          typically cover the qualifications needed to join a{' '}
          <SEOInternalLink href="/guides/competent-person-scheme">
            competent person scheme
          </SEOInternalLink>{' '}
          and work on domestic installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Domestic Installer Course Content
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>C&G 2382 (18th Edition):</strong> Understanding of BS 7671:2018+A3:2024
                Wiring Regulations — the foundation of all electrical work in the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>C&G 2330 or equivalent:</strong> Domestic electrical installer theory
                covering circuit design, cable selection, and installation methods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>C&G 2391 (Inspection & Testing):</strong> How to inspect and test electrical
                installations and complete certificates. See our{' '}
                <SEOInternalLink href="/guides/city-guilds-2391">2391 guide</SEOInternalLink> for
                exam tips.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Practical workshops:</strong> Hands-on wiring, testing, and fault-finding
                exercises in a workshop environment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Domestic installer courses range from GBP 3,000 to GBP 8,000. Be cautious of courses at
          the cheaper end — check that they include the full suite of qualifications (not just the
          18th Edition), that practical workshop time is substantial (not just theory), and that the
          training provider is well-established with good reviews from past students.
        </p>
        <p>
          After completing a domestic installer course, you will need to apply to a competent person
          scheme such as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink> or NAPIT to
          work independently on notifiable domestic installations. Most schemes require evidence of
          practical competence, so you may need to work alongside a qualified electrician for a
          period before being accepted.
        </p>
      </>
    ),
  },
  {
    id: 'fast-track-options',
    heading: 'Fast-Track Options: What Is Realistic?',
    content: (
      <>
        <p>
          The internet is full of adverts promising you can become a "fully qualified electrician"
          in weeks. It is important to understand what is realistic and what is marketing hype.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Realistic Timelines</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>12-16 weeks:</strong> Intensive full-time domestic installer course. You
                will hold the qualifications but still need supervised practical experience before
                working independently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>6-12 months:</strong> Realistic timeline from starting a course to being
                accepted onto a competent person scheme and working independently on domestic
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-4 years:</strong> Full apprenticeship to fully qualified electrician with
                the broadest career options (domestic, commercial, industrial).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be wary of any course that promises full qualification in under 8 weeks. Electrical work
          involves potential danger to life, and competence takes time to build. A course can teach
          you theory and give you workshop practice, but it cannot compress years of real-world
          experience into a few weeks. The most successful career changers are those who invest time
          in building genuine competence rather than rushing to a certificate.
        </p>
        <p>
          That said, there is plenty you can do to accelerate your learning. Studying the 18th
          Edition before your course starts gives you a significant advantage. Elec-Mate's study
          centre includes flashcards, structured revision, and mock exams that many career changers
          use to prepare before their formal training begins.
        </p>
        <SEOAppBridge
          title="Start Studying Before Your Course"
          description="Get ahead of your classmates by studying the 18th Edition, electrical science fundamentals, and wiring regulations before your course starts. Elec-Mate's flashcards, mock exams, and AI tutor are available from day one — no prior knowledge required."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'funding-and-costs',
    heading: 'Funding Your Electrical Training',
    content: (
      <>
        <p>
          The cost of electrical training need not be a barrier to entry. Several funding options
          exist for career changers, and many are underused simply because people do not know about
          them.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Funding Options for Career Changers</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Apprenticeship levy / co-investment:</strong> Apprenticeship training costs
                are fully funded for employers who pay the levy, and 95% funded (government
                co-investment) for smaller employers. You pay nothing as the apprentice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Advanced learner loans:</strong> Available for Level 3+ qualifications if
                you are 19 or over. Covers course fees with repayment only starting when you earn
                above the threshold (similar to student loans).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Adult education budget:</strong> Some Level 2 qualifications are fully
                funded for adults aged 19+ who do not already hold a Level 2 qualification. Check
                with your local training provider.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Enhanced Learning Credits (ELC):</strong> Available to ex-military personnel
                for approved courses. Can cover a significant portion of training costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Payment plans:</strong> Most training providers offer interest-free payment
                plans, spreading the cost over 6-12 months. Always check the terms carefully.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Beyond course fees, budget for additional costs: tools (GBP 500-1,500 for a starter kit —
          see our{' '}
          <SEOInternalLink href="/guides/electrician-tool-list-uk">tool list guide</SEOInternalLink>
          ), textbooks and reference materials, exam fees if not included in the course, and living
          costs during training. A realistic total budget for a career changer going through a
          domestic installer course is GBP 5,000-GBP 12,000 including all ancillary costs.
        </p>
      </>
    ),
  },
  {
    id: 'first-steps',
    heading: 'Your First Steps: What to Do This Week',
    content: (
      <>
        <p>
          If you are serious about becoming an electrician, here are concrete actions you can take
          right now to start your journey.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Action Plan for Career Changers</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                1
              </span>
              <span className="flex-1 text-left">
                <strong>Research your route:</strong> Decide between an apprenticeship and a
                domestic installer course based on your age, finances, and career goals. Read our{' '}
                <SEOInternalLink href="/guides/how-to-become-an-electrician">
                  how to become an electrician
                </SEOInternalLink>{' '}
                guide for a detailed comparison.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                2
              </span>
              <span className="flex-1 text-left">
                <strong>Start studying the basics:</strong> Download Elec-Mate and begin with the
                electrical science fundamentals. Understanding voltage, current, resistance, and
                Ohm's law before your course starts gives you a significant advantage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                3
              </span>
              <span className="flex-1 text-left">
                <strong>Contact training providers:</strong> Request prospectuses from at least 3
                providers. Compare course content, duration, included qualifications, practical
                workshop hours, and support after the course.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                4
              </span>
              <span className="flex-1 text-left">
                <strong>Talk to working electricians:</strong> Join online forums and local trade
                groups. Ask about their experience, the reality of the work, and what they wish they
                had known before starting. This gives you a realistic picture beyond the marketing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                5
              </span>
              <span className="flex-1 text-left">
                <strong>Sort your funding:</strong> Explore the funding options above and speak to
                your chosen training provider about what is available. Many providers have funding
                advisors who can help you navigate the options.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes Career Changers Make',
    content: (
      <>
        <p>
          Having seen thousands of career changers enter the electrical trade, here are the most
          common mistakes — and how to avoid them.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Mistakes to Avoid</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Choosing the cheapest course:</strong> The cheapest course is rarely the
                best value. Check what qualifications are included, how much practical workshop time
                you get, and what support is available after the course. A GBP 2,000 course that
                leaves you unprepared for the AM2 or scheme assessment costs you far more in the
                long run than a GBP 5,000 course that gets you working independently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Expecting to earn immediately after the course:</strong> Completing a
                domestic installer course gives you qualifications, not experience. Most career
                changers need 3-6 months of supervised work before they can work confidently on
                their own. Plan your finances accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Ignoring the business side:</strong> If your plan is to{' '}
                <SEOInternalLink href="/guides/going-self-employed-electrician">
                  go self-employed
                </SEOInternalLink>
                , you need business skills as well as electrical skills — quoting, invoicing,
                marketing, tax, insurance, and customer service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Not networking:</strong> The electrical trade runs on relationships.
                Building a network of contacts — other electricians, suppliers, estate agents,
                letting agents, builders — is essential for finding work, especially in the early
                days.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Plan Your Career with Elec-Mate"
          description="Whether you are researching your first course or preparing for your AM2 assessment, Elec-Mate supports every stage of your journey. Study centre, flashcards, mock exams, AI tutor, and career guidance — all from GBP 4.99/month."
          icon={TrendingUp}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/how-to-become-an-electrician',
    title: 'How to Become an Electrician',
    description:
      'Complete guide to all routes into the electrical trade — apprenticeships, retraining, qualifications.',
    icon: GraduationCap,
    category: 'Career Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Everything you need to know about electrical apprenticeships — from application to qualification.',
    icon: BookOpen,
    category: 'Career Guide',
  },
  {
    href: '/guides/domestic-installer-course',
    title: 'Domestic Installer Course Guide',
    description:
      'What to expect from a domestic installer course, what it costs, and how to choose the right provider.',
    icon: Award,
    category: 'Training Guide',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Electrical Qualifications Pathway',
    description: 'The complete map of electrical qualifications — from Level 2 to HNC and beyond.',
    icon: TrendingUp,
    category: 'Career Guide',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description:
      'What electricians earn by region, specialism, and experience level — including self-employed earnings.',
    icon: PoundSterling,
    category: 'Salary Guide',
  },
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description:
      'Everything you need to set up as a self-employed electrician — insurance, schemes, tax, pricing.',
    icon: Briefcase,
    category: 'Business Guide',
  },
];

export default function BecomeElectricianNoExperiencePage() {
  return (
    <GuideTemplate
      title="How to Become an Electrician with No Experience | UK Career Change Guide 2026"
      description="Complete guide to becoming an electrician in the UK with no prior experience. Adult apprenticeships, domestic installer courses, fast-track options, funding, and realistic timelines for career changers."
      datePublished="2024-08-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          How to Become an Electrician <span className="text-yellow-400">with No Experience</span>
        </>
      }
      heroSubtitle="A practical, honest guide for career changers. Whether you are 25 or 55, there is a proven route into the electrical trade — and the UK needs you. Here is exactly how to get started, what it costs, and how long it takes."
      readingTime={20}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Becoming an Electrician"
      relatedPages={relatedPages}
      ctaHeading="Start your electrical career today"
      ctaSubheading="18th Edition study materials, flashcards, mock exams, and AI tutor. Begin learning before your course starts — or support your apprenticeship from day one."
    />
  );
}
