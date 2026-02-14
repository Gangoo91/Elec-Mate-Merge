import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  PoundSterling,
  Users,
  Wrench,
  Shield,
  Brain,
  Award,
  FolderOpen,
  Target,
  CheckCircle,
  Sunrise,
  TrendingUp,
  Heart,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'What to Expect', href: '/guides/what-to-expect-electrical-apprentice' },
];

const tocItems = [
  { id: 'honest-overview', label: 'The Honest Overview' },
  { id: 'daily-reality', label: 'Day-to-Day Reality' },
  { id: 'early-starts', label: 'Early Starts and Physical Demands' },
  { id: 'site-culture', label: 'Site Culture' },
  { id: 'the-hard-parts', label: 'The Hard Parts' },
  { id: 'the-rewards', label: 'The Rewards' },
  { id: 'progression', label: 'Progression and Career Path' },
  { id: 'elecmate-support', label: 'How Elec-Mate Helps' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An electrical apprenticeship is a 4-year commitment that combines on-site practical work with college-based theory study. You will work 4 days per week on site and attend college 1 day per week (or equivalent block-release).',
  'Expect early starts (6:30am to 7:30am), physical work (lifting, bending, climbing, drilling), and a steep learning curve in the first few months. The first year is the hardest because everything is new.',
  'Site culture can be challenging — the banter is part of the job, but genuine bullying is not acceptable. Build thick skin for the friendly stuff and speak up if anyone crosses the line.',
  'The rewards are real: a skilled trade for life, good earning potential (£35,000 to £50,000+ once qualified), job security, the option to be self-employed, and the satisfaction of seeing your work in every building you pass.',
  'Elec-Mate supports apprentices through the entire journey with 46+ training courses, the flashcards tool, mock exams, the AM2 Simulator, EPA Simulator, site diary, OJT tracker, portfolio builder, study planner, and AI tutor.',
];

const faqs = [
  {
    question: 'Is an electrical apprenticeship worth it?',
    answer:
      'Yes, for most people it is one of the best career decisions they can make. You earn while you learn (no student debt), you gain a skilled trade that is in high demand, and your earning potential once qualified is strong. A qualified electrician in the UK earns £35,000 to £50,000 or more, depending on specialisation, location, and whether they are employed or self-employed. The construction industry has a persistent skills shortage in electrical trades, which means job security is excellent. You also have the option to start your own business, specialise in areas like EV charging or solar PV, or progress into management, estimation, or design roles. The trade provides genuine career flexibility that many university degrees do not.',
  },
  {
    question: 'What are the working hours like?',
    answer:
      'Typical working hours for an electrical apprentice are 7:00am or 7:30am start, finishing at 4:00pm or 4:30pm, Monday to Friday. Some employers work slightly different patterns — 8am to 5pm, for example. On large commercial or industrial sites, you may occasionally be asked to work overtime or Saturday mornings, particularly when a project is nearing a deadline. Overtime is usually paid at a higher rate (time and a half or double time). College days follow the college timetable, which is usually 9am to 4pm or similar. The early starts are one of the biggest adjustments for people coming from school or other jobs. Most apprentices adapt within a few weeks.',
  },
  {
    question: 'Will I enjoy it if I am not very academic?',
    answer:
      'Probably yes. An electrical apprenticeship is primarily a practical trade — the majority of your time is spent doing physical work on site. The theory component at college is important (you need to understand electrical science, regulations, and safety), but it is directly relevant to the work you do every day. Many apprentices who struggled in school find they engage much better with the college work because they can see how it applies to real situations on site. If you find the academic side challenging, tools like Elec-Mate help — the 46+ training courses break down complex topics into manageable sections, the flashcards tool uses spaced repetition to make memorisation easier, and the AI tutor explains concepts in plain language.',
  },
  {
    question: 'What is the hardest part of being an apprentice?',
    answer:
      'The most commonly cited challenges are: the low pay in the first year (the apprentice minimum wage is significantly below the normal NMW), the early starts (especially in winter when it is dark and cold), the physical demands (construction sites are physically demanding environments), the feeling of being at the bottom of the hierarchy (you are the newest person and know the least), and balancing work and study (particularly keeping up with college assignments and revision). Most of these challenges ease over time — your pay increases, you get used to early starts, your fitness improves, and your confidence grows as your knowledge and skills develop. The apprentices who succeed are the ones who push through the difficult first year.',
  },
  {
    question: 'How fit do I need to be?',
    answer:
      'You do not need to be an athlete, but you do need a reasonable level of physical fitness. The job involves standing for long periods, climbing ladders and scaffolding, working in confined spaces (loft spaces, under floors), lifting and carrying materials (cable drums, conduit bundles, containment), drilling, chasing, and pulling cables. It is physically demanding work, and you will be tired at the end of each day — particularly in the first few weeks. Most people find their fitness improves naturally once they start the job. If you have any medical conditions that affect your physical ability, discuss them with your employer before starting — reasonable adjustments can often be made.',
  },
  {
    question: 'Can I specialise during my apprenticeship?',
    answer:
      'The apprenticeship itself (ST0215) covers general installation and maintenance work. Specialisation typically happens after qualification, not during the apprenticeship. However, the type of employer you work for will shape your experience. Working for a domestic contractor gives you experience in house rewires, consumer unit changes, and kitchen installations. Working for a commercial contractor gives you experience in office fit-outs, retail installations, and larger-scale projects. Working for an industrial contractor gives you experience in three-phase systems, motor control, and heavy industrial equipment. After completing your apprenticeship and gaining the AM2, you can specialise in areas like EV charging, solar PV, fire alarm systems, data cabling, building management systems, or inspection and testing.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/year-1-electrical-apprentice',
    title: 'Year 1 Apprentice Guide',
    description: 'Detailed guide to your first year — on-site tasks, college, and assessments.',
    icon: Calendar,
    category: 'Guide',
  },
  {
    href: '/guides/year-2-electrical-apprentice',
    title: 'Year 2 Apprentice Guide',
    description: 'Year 2 skills, testing introduction, and AM2 preparation.',
    icon: Calendar,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-rights-pay-uk',
    title: 'Apprentice Rights and Pay',
    description: 'NMW rates, holiday entitlement, working hours, and legal protections.',
    icon: PoundSterling,
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
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete guide to starting and completing an electrical apprenticeship.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'honest-overview',
    heading: 'The Honest Overview',
    content: (
      <>
        <p>
          An electrical apprenticeship is one of the best career paths available in the UK — but it
          is not easy, and anyone who tells you it is has forgotten what it was like. This guide
          gives you the honest reality: the good, the hard, and everything in between.
        </p>
        <p>
          You will spend four years learning a skilled trade. During that time, you will work on
          construction sites, attend college, study for qualifications, build a portfolio of
          evidence, complete practical assessments, and eventually sit the{' '}
          <SEOInternalLink href="/guides/am2-exam-preparation">AM2</SEOInternalLink> and{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">End Point Assessment</SEOInternalLink>{' '}
          to become a qualified electrician. You will earn money from day one (unlike university),
          and you will finish with a qualification that is in demand across the country.
        </p>
        <p>
          But you will also deal with early mornings, physical fatigue, cold and wet conditions,
          challenging personalities, low pay in the early years, and moments where you wonder if it
          is worth it. The apprentices who succeed are the ones who push through those moments and
          keep going.
        </p>
      </>
    ),
  },
  {
    id: 'daily-reality',
    heading: 'A Typical Day as an Electrical Apprentice',
    content: (
      <>
        <p>
          Every day is different — that is one of the best things about the trade. But here is what
          a fairly typical day looks like:
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Sunrise className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                6:30am — Wake Up and Get Ready
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Alarm goes off. Grab your lunch, fill your flask, check your tool bag. If you are
                driving to site, allow time for traffic. If you are getting a lift, do not be late —
                being the one who holds everyone up is a fast way to lose respect.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Wrench className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">7:30am — Start on Site</h3>
              <p className="text-white text-sm leading-relaxed">
                Sign in, put on PPE, check the task list for the day. You might be running cables,
                fitting containment, chasing out for back boxes, or assisting with a consumer unit
                installation. In{' '}
                <SEOInternalLink href="/guides/year-1-electrical-apprentice">
                  Year 1
                </SEOInternalLink>
                , you will mainly be assisting; by{' '}
                <SEOInternalLink href="/guides/year-2-electrical-apprentice">
                  Year 2
                </SEOInternalLink>
                , you will be carrying out tasks more independently.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Clock className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">10:00am — Tea Break</h3>
              <p className="text-white text-sm leading-relaxed">
                15 to 20 minutes. Sit with the other tradespeople, have a brew, and absorb the
                conversations. You will learn a lot from listening to experienced electricians
                discuss their work, share stories, and debate approaches to problems.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Wrench className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">12:30pm — Lunch</h3>
              <p className="text-white text-sm leading-relaxed">
                30 minutes to an hour, depending on the site. Eat well — you need the energy. Some
                apprentices use part of their lunch break for a quick Elec-Mate study session or to
                update their{' '}
                <SEOInternalLink href="/guides/site-diary-apprentice">site diary</SEOInternalLink>.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Target className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">4:00pm to 4:30pm — Pack Up</h3>
              <p className="text-white text-sm leading-relaxed">
                Tidy your work area, put tools away, secure materials. Before you leave, spend 5
                minutes writing your site diary entry while the day is fresh. Head home, recover,
                and do it again tomorrow.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'early-starts',
    heading: 'Early Starts and Physical Demands',
    content: (
      <>
        <p>
          The two things that catch most new apprentices off guard are the early starts and the
          physical demands. Both are manageable, but they take adjustment.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Early Starts</h3>
            <p className="text-white text-sm leading-relaxed">
              Most construction sites start between 7:00am and 7:30am. That means waking up at
              6:00am or earlier, depending on your commute. In winter, you will be leaving the house
              and arriving on site in the dark. The adjustment period is about two to three weeks.
              Go to bed earlier (seriously — 10pm is not embarrassing), set multiple alarms, and
              prepare your kit the night before. Within a month, the early starts will feel normal.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Physical Demands</h3>
            <p className="text-white text-sm leading-relaxed">
              The work is physically demanding. You will be on your feet all day, climbing ladders,
              crawling through loft spaces, lifting cable drums, drilling into concrete, and pulling
              cables through tight spaces. Your hands will get calloused, your muscles will ache
              (especially in the first few weeks), and you will be tired at the end of each day.
              Most people find their fitness improves naturally — you are essentially doing a
              full-body workout every day. Eat well, stay hydrated, and get enough sleep.
            </p>
          </div>
        </div>
        <p>
          Neither of these are reasons not to do an apprenticeship. Every qualified electrician went
          through the same adjustment. Your body and your routine adapt faster than you expect.
        </p>
      </>
    ),
  },
  {
    id: 'site-culture',
    heading: 'Site Culture: What to Expect',
    content: (
      <>
        <p>
          Construction sites have their own culture, and it can be a shock if you are not prepared
          for it. Here is what to expect:
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Users className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">The Banter</h3>
              <p className="text-white text-sm leading-relaxed">
                Construction sites run on banter. As the apprentice, you will be on the receiving
                end of jokes, wind-ups, and teasing. This is normal and is (usually) a sign that
                people like you and have accepted you into the team. The traditional "go and get a
                long weight" or "fetch a left-handed screwdriver" pranks are rites of passage. Take
                it in good spirit, laugh at yourself, and give as good as you get when you feel
                confident enough.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Shield className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                The Line Between Banter and Bullying
              </h3>
              <p className="text-white text-sm leading-relaxed">
                There is a clear line between friendly banter and bullying or harassment. If the
                behaviour is persistent, targeted, makes you feel unsafe or distressed, or relates
                to a protected characteristic (your race, gender, sexuality, disability, or
                religion), it has crossed the line. You have the right to a respectful workplace.
                Report bullying to your supervisor, employer, or training provider. See our{' '}
                <SEOInternalLink href="/guides/apprentice-rights-pay-uk">
                  apprentice rights guide
                </SEOInternalLink>{' '}
                for details on your legal protections.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">How to Earn Respect</h3>
              <p className="text-white text-sm leading-relaxed">
                Show up on time, every day. Work hard without being asked. Keep your area tidy. Ask
                questions when you do not understand. Do not pretend to know things you do not. Be
                polite to everyone — other trades, clients, site managers. Make the tea without
                being asked. These seem small, but they are how you build a reputation as a
                reliable, professional apprentice.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'the-hard-parts',
    heading: 'The Hard Parts (Nobody Talks About)',
    content: (
      <>
        <p>
          Every apprentice goes through difficult periods. Knowing what they are in advance helps
          you push through them:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low pay in the early years.</strong> The{' '}
                <SEOInternalLink href="/guides/apprentice-rights-pay-uk">
                  apprentice minimum wage
                </SEOInternalLink>{' '}
                is significantly below the normal NMW. Your mates working in retail or hospitality
                may earn more in the short term. Remind yourself that your earning potential once
                qualified is far higher than theirs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Feeling out of your depth.</strong> The first few months are overwhelming.
                New terminology, new tools, new environment, new expectations. This is completely
                normal. Every qualified electrician felt the same way in their first year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Balancing work and study.</strong> After a physically demanding day on site,
                the last thing you want to do is study. But the theory is important, and falling
                behind at college creates stress. Little and often is the key — 30 minutes of study
                on Elec-Mate is better than zero.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sunrise className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Winter mornings.</strong> Dark, cold, wet. Getting up at 6am in January to
                work outside is genuinely hard. Invest in good quality workwear — thermal layers, a
                decent waterproof jacket, and lined work trousers make a real difference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Difficult personalities.</strong> Not every electrician you work with will
                be patient or supportive. Some are grumpy, some are poor communicators, and some
                have forgotten what it was like to be an apprentice. Learn what you can from
                everyone, even if they are not the easiest people to work with.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These challenges are temporary. The pay increases, the confidence builds, the studying
          gets easier as you understand more, and the winters become routine. The apprentices who
          make it through are the ones who see these as short-term discomforts on the way to a
          long-term career.
        </p>
      </>
    ),
  },
  {
    id: 'the-rewards',
    heading: 'The Rewards (Why It Is Worth It)',
    content: (
      <>
        <p>
          For all the challenges, the rewards of completing an electrical apprenticeship are
          substantial and lasting:
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <PoundSterling className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Earning Potential</h3>
              <p className="text-white text-sm leading-relaxed">
                A qualified electrician in the UK earns £35,000 to £50,000 or more. Self-employed
                electricians with strong client bases can earn significantly more. The earning
                potential grows with experience, specialisation, and reputation. Unlike many
                careers, there is no glass ceiling — your income is directly related to your skill,
                effort, and business acumen.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Shield className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Job Security</h3>
              <p className="text-white text-sm leading-relaxed">
                The UK has a persistent skills shortage in electrical trades. Demand for qualified
                electricians consistently outstrips supply. Every new building needs electrical
                installation, every existing building needs maintenance and periodic inspection, and
                the transition to electric vehicles and renewable energy is creating entirely new
                markets. A qualified electrician will always have work.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <TrendingUp className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Career Flexibility</h3>
              <p className="text-white text-sm leading-relaxed">
                An electrical qualification opens doors. You can work as an employed electrician, go
                self-employed, start your own business, specialise in EV charging or solar PV, move
                into inspection and testing, progress to project management, become a college
                lecturer, or transition into electrical design and estimation. The trade is a
                platform, not a ceiling.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Heart className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Pride in the Work</h3>
              <p className="text-white text-sm leading-relaxed">
                There is a deep satisfaction in doing skilled work with your hands. Every building
                you pass, every light that switches on, every socket that powers a device — someone
                wired that. You will drive past houses you have rewired, offices you have fitted
                out, and schools where your work keeps the lights on. That feeling does not get old.
              </p>
            </div>
          </div>
        </div>
        <p>
          No student debt. No abstract theory with no practical application. No sitting at a desk
          wondering what the point is. An electrical apprenticeship gives you a tangible, valuable
          skill that the country needs and that you can use for the rest of your working life.
        </p>
        <SEOAppBridge
          title="Set Yourself Up for Success from Day One"
          description="Elec-Mate gives you the tools to make the most of every day of your apprenticeship. 46+ training courses, flashcards, mock exams, AI tutor, site diary, and OJT tracker. Start your 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'progression',
    heading: 'Progression and Career Path',
    content: (
      <>
        <p>
          Your electrical apprenticeship is the beginning, not the end. Here is the typical
          progression path and the options that open up once you qualify:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Years 1-2:</strong> Learning the foundations. Basic hand skills,
                containment, first-fix work, Level 2 theory, building confidence. See our{' '}
                <SEOInternalLink href="/guides/year-1-electrical-apprentice">
                  Year 1
                </SEOInternalLink>{' '}
                and{' '}
                <SEOInternalLink href="/guides/year-2-electrical-apprentice">
                  Year 2
                </SEOInternalLink>{' '}
                guides.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Years 3-4:</strong> Increasing independence. Complex installations, testing,
                fault finding, Level 3 theory. Preparing for and sitting the AM2 and EPA.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Newly qualified:</strong> Working as a qualified electrician, building
                experience and confidence. Many electricians continue with their employer for the
                first few years after qualifying.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialisation:</strong> EV charger installation, solar PV, fire alarm
                systems, data cabling, building management systems, inspection and testing (C&G
                2391), or 18th Edition updates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employment or business:</strong> Many electricians go self-employed or
                start their own contracting business. Elec-Mate supports this transition with
                digital certificates, quoting tools, invoicing, and client management.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The trade evolves constantly. EV charging, battery storage, smart home technology, and
          renewable energy are creating new specialisation areas that did not exist ten years ago.
          Qualified electricians who stay current with these developments are in the strongest
          position.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-support',
    heading: 'How Elec-Mate Supports Your Apprenticeship',
    content: (
      <>
        <p>
          Elec-Mate's apprentice hub was designed by people who understand the apprenticeship
          journey. Every feature supports a specific part of your development:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">46+ Training Courses</h4>
                <p className="text-white text-sm leading-relaxed">
                  Structured courses covering every topic from Level 2 to Level 3. Study at your own
                  pace, revisit topics as needed, and track your progress through each module.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Flashcards, Mock Exams, and AI Tutor</h4>
                <p className="text-white text-sm leading-relaxed">
                  Flashcards for memorisation, mock exams for assessment practice, and the AI tutor
                  for explaining any concept in plain language. Perfect for the commute, break
                  times, or a quick study session in the evening.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AM2 and EPA Simulators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Realistic practice for both the AM2 practical assessment and the End Point
                  Assessment. Build confidence and familiarity with the assessment format before the
                  real thing.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <FolderOpen className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Site Diary, OJT Tracker, Portfolio Builder
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Record your daily learning, track your{' '}
                  <SEOInternalLink href="/guides/off-job-training-hours">
                    off-the-job training hours
                  </SEOInternalLink>
                  , and build your{' '}
                  <SEOInternalLink href="/guides/apprentice-portfolio">portfolio</SEOInternalLink>{' '}
                  evidence as you go. Everything connects so your evidence accumulates naturally
                  over four years.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Start Your Apprenticeship Journey"
          description="Elec-Mate gives every apprentice the tools to succeed — 46+ courses, flashcards, mock exams, AM2 Simulator, EPA Simulator, AI tutor, site diary, OJT tracker, portfolio builder, and study planner. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WhatToExpectAsApprenticePage() {
  return (
    <GuideTemplate
      title="What to Expect as an Electrical Apprentice | Honest Guide"
      description="The honest guide to life as an electrical apprentice in the UK. Day-to-day reality, early starts, physical demands, site culture, the hard parts, the rewards, career progression, and how Elec-Mate supports your journey."
      datePublished="2025-12-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={Target}
      heroTitle={
        <>
          What to Expect as an Electrical Apprentice:{' '}
          <span className="text-yellow-400">The Honest Guide</span>
        </>
      }
      heroSubtitle="An electrical apprenticeship is one of the best career paths available in the UK — but it is not easy. This guide gives you the honest reality: what your days look like, the challenges you will face, the rewards that make it worthwhile, and how to make the most of every year."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Apprenticeships"
      relatedPages={relatedPages}
      ctaHeading="Make the Most of Your Apprenticeship"
      ctaSubheading="Join 430+ UK apprentices using Elec-Mate. 46+ courses, flashcards, mock exams, AM2 Simulator, EPA Simulator, AI tutor, site diary, OJT tracker, and portfolio builder. 7-day free trial, cancel anytime."
    />
  );
}
