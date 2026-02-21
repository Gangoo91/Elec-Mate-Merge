import {
  ArrowLeft,
  Heart,
  CheckCircle,
  AlertTriangle,
  Shield,
  Phone,
  Users,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'stress-signs',
    question:
      'A previously punctual and engaged apprentice starts arriving late, withdrawing from conversations, and producing lower quality work. What should the mentor do first?',
    options: [
      'Issue a formal warning for lateness and poor performance',
      'Ignore it — everyone has bad weeks and it will probably sort itself out',
      'Find a private moment to check in, express concern without judgement, and listen',
      'Report the apprentice to the college tutor immediately',
    ],
    correctIndex: 2,
    explanation:
      'The first step is always a private, non-judgemental check-in. Changes in behaviour, punctuality, and work quality are often signs of underlying stress, mental health difficulties, or personal problems. The mentor should find a quiet moment, express genuine concern ("I\'ve noticed you don\'t seem yourself lately — is everything OK?"), and listen without jumping to conclusions. This builds trust and opens the door to further support if needed. Formal discipline or ignoring the issue are both inappropriate responses at this stage.',
  },
  {
    id: 'pastoral-boundary',
    question:
      'An apprentice discloses that they are experiencing severe anxiety and cannot sleep. What is the appropriate response from a mentor?',
    options: [
      'Diagnose the apprentice with an anxiety disorder and recommend medication',
      'Tell the apprentice to toughen up — construction is a hard industry',
      "Listen supportively, acknowledge their difficulty, and signpost them to professional support such as their GP, Mates in Mind, or the company's EAP",
      'Take no action because mental health is a private matter',
    ],
    correctIndex: 2,
    explanation:
      'The mentor should listen supportively, acknowledge the apprentice\'s difficulty without minimising it, and signpost them to appropriate professional support. Mentors are not mental health professionals — they should not attempt to diagnose or treat conditions. However, they play a crucial role in noticing signs, creating a safe space for disclosure, and connecting the apprentice with the right resources. Ignoring the issue or telling someone to "toughen up" can cause serious harm.',
  },
  {
    id: 'bullying-response',
    question:
      "An apprentice tells you that an older worker has been making derogatory comments about their background. What is the mentor's duty?",
    options: [
      'Tell the apprentice it is just banter and part of site culture',
      "Take the matter seriously, document it, and escalate through the company's bullying and harassment procedure",
      'Confront the older worker aggressively in front of the team',
      'Advise the apprentice to avoid the older worker and say nothing',
    ],
    correctIndex: 1,
    explanation:
      "The mentor has a duty to take all reports of bullying and harassment seriously. Derogatory comments about someone's background may constitute harassment under the Equality Act 2010 if they relate to a protected characteristic (race, religion, sexual orientation, etc.). The mentor should document the apprentice's disclosure, follow the company's bullying and harassment procedure, and escalate to management or HR. The apprentice should be assured that the matter will be dealt with and that they will not face retaliation for reporting it.",
  },
];

const faqs = [
  {
    question: 'What is the difference between pastoral care and counselling?',
    answer:
      "Pastoral care is the general support, guidance, and welfare concern that a mentor provides to an apprentice as part of their duty of care. It includes noticing changes in behaviour, checking in regularly, providing a listening ear, and signposting to appropriate support services. Counselling, by contrast, is a formal therapeutic intervention provided by a trained and qualified professional. Mentors should never attempt to provide counselling — they do not have the training, and doing so could cause harm. The mentor's role is to recognise when an apprentice may need professional support and to facilitate access to that support, not to provide it themselves.",
  },
  {
    question: 'How do I create a safe space for an apprentice to talk about personal issues?',
    answer:
      'Creating a safe space starts with building trust over time through consistent, reliable behaviour. Practical steps include: having regular one-to-one check-ins (even 5 minutes at the start of the day), choosing a private location away from other workers, using open and non-judgemental language ("How are you getting on?" rather than "What\'s wrong with you?"), respecting confidentiality (what is shared stays between you unless there is a safeguarding concern), and demonstrating through your actions that you take their welfare seriously. Do not force conversations — some apprentices will open up quickly, others will take months to build enough trust. Consistency and patience are key.',
  },
  {
    question: 'What should I do if an apprentice discloses abuse or self-harm?',
    answer:
      "If an apprentice discloses abuse or self-harm, this is a safeguarding concern and must be escalated immediately. Do not attempt to handle it alone. Listen calmly and supportively without showing shock or judgement. Do not promise absolute confidentiality — explain that you have a duty to ensure their safety, which may mean sharing the information with a designated safeguarding lead. Document what was disclosed (using the apprentice's own words where possible) and report it to the company's designated safeguarding lead, the training provider's safeguarding team, or in an emergency, contact the police or emergency services. If the apprentice is under 18, additional safeguarding duties apply. Know your company's safeguarding policy before you need it.",
  },
  {
    question: 'How do I report bullying without the apprentice facing retaliation?',
    answer:
      "This is a legitimate concern that must be addressed head-on. First, reassure the apprentice that retaliation is not acceptable and that the company has a duty to protect them. Document the bullying allegations with dates, times, locations, and specific details. Report through the company's formal bullying and harassment procedure — this creates a documented trail and triggers a formal investigation. Request that the apprentice's identity is protected where possible during the investigation. Monitor the situation closely after reporting — if there are any signs of retaliation, escalate immediately. The mentor may need to arrange for the apprentice to work in a different team or location temporarily while the investigation is underway. If the company fails to act, the apprentice (and mentor) can contact ACAS, the relevant trade union, or the Health and Safety Executive.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following behavioural changes could indicate an apprentice is experiencing stress or mental health difficulties?',
    options: [
      'Consistently arriving on time and producing high quality work',
      'Asking lots of questions about electrical theory and regulations',
      'Changes in punctuality, withdrawal from the team, declining work quality, and mood changes',
      'Requesting to take on more complex tasks and responsibilities',
    ],
    correctAnswer: 2,
    explanation:
      'Changes in behaviour are the key indicators. A previously punctual apprentice arriving late, someone who was sociable becoming withdrawn, declining work quality from someone who was producing good work, and noticeable mood changes (irritability, flat affect, tearfulness) can all indicate underlying stress or mental health difficulties. The mentor should be alert to patterns of change rather than isolated incidents.',
  },
  {
    id: 2,
    question:
      'What is the most appropriate first step when a mentor notices signs of stress in an apprentice?',
    options: [
      "Arrange a formal meeting with HR and the apprentice's parents",
      'Find a private moment to check in with genuine concern and listen without judgement',
      'Send the apprentice home and tell them to come back when they feel better',
      'Prescribe exercise and healthy eating as a treatment for stress',
    ],
    correctAnswer: 1,
    explanation:
      'The first step is always a private, non-judgemental check-in. The mentor should find a quiet moment away from others, express genuine concern ("I\'ve noticed you seem a bit down recently — is everything OK?"), and listen. The goal is not to solve the problem but to open the door to communication and show the apprentice that someone has noticed and cares. This initial conversation may lead to further support if needed.',
  },
  {
    id: 3,
    question:
      'Which of the following is a particular financial pressure commonly faced by electrical apprentices?',
    options: [
      'Excessive overtime payments that create tax complications',
      'Low apprentice wages combined with the cost of tools, travel, and college materials',
      'Having to pay for their own AM2 assessment at a cost of over five thousand pounds',
      'Being required to purchase their own company vehicle in the first year',
    ],
    correctAnswer: 1,
    explanation:
      'Apprentices are typically on the lowest wages in the team but face significant costs: hand tools and PPE (which can cost several hundred pounds), travel to site (which may change weekly), college materials and textbooks, and general living costs. This financial pressure is compounded by being a young person in an adult working environment where more experienced colleagues may not realise how tight money is. Mentors should be aware of this pressure and connect apprentices with any available support (JIB grants, employer tool allowances, etc.).',
  },
  {
    id: 4,
    question: "What is the mentor's role regarding mental health support?",
    options: [
      'To diagnose mental health conditions and recommend appropriate medication',
      'To provide weekly counselling sessions as part of the mentoring relationship',
      'To notice signs, create a safe space for conversation, and signpost to professional support services',
      "To ignore mental health entirely as it is not part of the mentor's job description",
    ],
    correctAnswer: 2,
    explanation:
      "The mentor's role is to notice, listen, and signpost — not to diagnose or treat. Mentors are uniquely placed to notice behavioural changes because they work alongside the apprentice daily. They can create a safe space for the apprentice to talk and then connect them with appropriate professional support: GP, company EAP, Mates in Mind, Samaritans, college welfare services, or union support. Attempting to provide counselling without training can cause harm.",
  },
  {
    id: 5,
    question:
      'Which organisation specifically focuses on mental health in the construction industry?',
    options: [
      'The Health and Safety Executive (HSE)',
      'Mates in Mind',
      'The Joint Industry Board (JIB)',
      'The Institution of Engineering and Technology (IET)',
    ],
    correctAnswer: 1,
    explanation:
      'Mates in Mind is a charity specifically focused on improving mental health and wellbeing in the construction industry. They provide resources, training, and support for both employers and individuals. Other organisations such as the HSE, JIB, and CITB address mental health as part of their broader remit, but Mates in Mind is the specialist construction mental health organisation.',
  },
  {
    id: 6,
    question: 'Under the Equality Act 2010, which of the following is a protected characteristic?',
    options: [
      'Football team supported',
      'Trade qualification level',
      'Race, religion, sexual orientation, age, disability, and gender reassignment',
      'Length of time in the industry',
    ],
    correctAnswer: 2,
    explanation:
      "The Equality Act 2010 protects nine characteristics: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation. Harassment or discrimination based on any of these characteristics is unlawful. Derogatory comments about an apprentice's race, religion, sexual orientation, or any other protected characteristic constitute harassment and must be dealt with through the company's formal procedures.",
  },
  {
    id: 7,
    question:
      'An older worker regularly makes comments like "back in my day, apprentices didn\'t complain." This is best described as:',
    options: [
      'Harmless nostalgia that the apprentice should not take personally',
      'Potentially dismissive and undermining behaviour that could contribute to a hostile work environment',
      'Constructive feedback that will help the apprentice develop resilience',
      'A protected form of free speech that cannot be challenged',
    ],
    correctAnswer: 1,
    explanation:
      "While individual comments may seem minor, a pattern of dismissive remarks creates a hostile environment that can undermine the apprentice's confidence, discourage them from raising concerns, and normalise a culture where apprentice wellbeing is not valued. The mentor should address this behaviour directly with the individual, explaining the impact it has on the apprentice and the team, and escalate if it continues.",
  },
  {
    id: 8,
    question:
      'What is the most important element of creating a safe reporting pathway for apprentices who experience bullying?',
    options: [
      'Having a suggestion box in the site office',
      'Ensuring the apprentice trusts that reports will be taken seriously, acted upon, and that they will be protected from retaliation',
      'Telling the apprentice to deal with it themselves first before escalating',
      'Making the reporting process as complicated as possible to filter out minor complaints',
    ],
    correctAnswer: 1,
    explanation:
      'Trust is the foundation of any reporting pathway. The apprentice must believe that their report will be taken seriously, that meaningful action will follow, and that they will not face retaliation for speaking up. If apprentices do not trust the process, they will not use it — and bullying will continue unchecked. The mentor plays a critical role in building this trust through their own consistent behaviour and by following through on every report they receive.',
  },
];

export default function MDModule3Section4() {
  useSEO({
    title: 'Managing Apprentice Wellbeing & Pastoral Care | Mentoring Module 3.4',
    description:
      'Recognising stress and mental health difficulties, pastoral care boundaries, signposting support services, and dealing with bullying and harassment on site.',
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
            <Heart className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Managing Apprentice Wellbeing &amp; Pastoral Care
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Recognising when an apprentice is struggling, understanding your pastoral care
            boundaries, signposting support, and dealing with bullying on site
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Watch for:</strong> Changes in behaviour, punctuality, quality, mood
              </li>
              <li>
                <strong>Respond:</strong> Private check-in, listen, do not judge or diagnose
              </li>
              <li>
                <strong>Signpost:</strong> GP, Mates in Mind, EAP, Samaritans, college welfare
              </li>
              <li>
                <strong>Act on bullying:</strong> Take seriously, document, escalate through
                procedure
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Mentors</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Your role:</strong> Notice, listen, signpost &mdash; not diagnose or treat
              </li>
              <li>
                <strong>Boundaries:</strong> Know when to refer to professionals
              </li>
              <li>
                <strong>Legal duty:</strong> Equality Act 2010 protects against harassment
              </li>
              <li>
                <strong>Self-care:</strong> Supporting others can be emotionally demanding
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Recognise behavioural signs that may indicate an apprentice is experiencing stress or mental health difficulties',
              'Identify the particular financial, social, and environmental pressures that affect apprentices in the electrical trade',
              'Distinguish between pastoral care that a mentor can appropriately provide and issues that require professional referral',
              'Signpost apprentices to relevant support services including Mates in Mind, EAPs, Samaritans, and college welfare',
              "Respond appropriately to reports of bullying and harassment using the company's formal procedures",
              "Understand the protected characteristics under the Equality Act 2010 and the mentor's duty to act on discrimination",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Recognising Signs of Stress and Mental Health Difficulties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Recognising Signs of Stress and Mental Health Difficulties
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction has the <strong>highest rate of suicide</strong> of any industry in the
                UK. Male construction workers are three times more likely to take their own lives
                than the national average. Apprentices &mdash; often young, under financial
                pressure, and navigating an unfamiliar working environment &mdash; are particularly
                vulnerable. The mentor who works alongside an apprentice every day is often the
                first person to notice when something is wrong.
              </p>

              <p>
                The key is to <strong>watch for changes</strong>. A single bad day is normal. A
                pattern of changed behaviour over days or weeks is a warning sign that should not be
                ignored. The mentor does not need to be a mental health expert &mdash; they need to
                be observant and willing to have a conversation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-3">Behavioural Warning Signs</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Changes in Punctuality</p>
                    <p className="text-sm text-white">
                      A previously reliable apprentice starting to arrive late, leave early, or take
                      more sick days. Oversleeping can be a sign of depression or anxiety keeping
                      someone awake at night.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Social Withdrawal</p>
                    <p className="text-sm text-white">
                      Avoiding breaks with the team, eating alone, not engaging in conversation,
                      wearing headphones constantly. Someone who was previously sociable becoming
                      isolated is a significant change.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Declining Work Quality</p>
                    <p className="text-sm text-white">
                      Making mistakes they would not normally make, lack of concentration,
                      carelessness with safety procedures. When someone&rsquo;s mind is elsewhere,
                      their work quality drops.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Mood Changes</p>
                    <p className="text-sm text-white">
                      Increased irritability, anger over small things, tearfulness, flat or
                      emotionless responses, or swinging between extremes. Mood changes that persist
                      over weeks are a concern.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Construction Example</p>
                </div>
                <p className="text-sm text-white">
                  Your Stage 2 apprentice, Jordan, has been punctual and enthusiastic for the past
                  18 months. Over the last three weeks, Jordan has arrived late four times, been
                  quiet in the van, and made two basic wiring errors that they would not normally
                  make. When you ask if everything is OK, Jordan says &ldquo;Yeah, fine&rdquo; and
                  changes the subject. This pattern of behavioural change is a warning sign. The
                  mentor should find a private moment &mdash; perhaps at the end of the day, away
                  from the rest of the team &mdash; and express genuine concern: &ldquo;Jordan,
                  I&rsquo;ve noticed you&rsquo;ve not seemed yourself recently. I&rsquo;m not trying
                  to pry, but I want you to know I&rsquo;m here if you want to talk about anything.
                  No pressure.&rdquo;
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Point</p>
                <p className="text-sm text-white">
                  You do not need a mental health qualification to notice that someone is
                  struggling. You need <strong>eyes, empathy, and the courage to ask</strong>. Most
                  people who are struggling will not volunteer the information &mdash; they need
                  someone to notice and open the door. That someone is often the mentor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Particular Pressures on Apprentices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Particular Pressures on Apprentices
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While all construction workers face pressures, apprentices are subject to
                <strong> additional stressors</strong> that more experienced colleagues may not
                recognise or remember. Understanding these pressures helps the mentor provide
                appropriate support and intervene early when an apprentice is struggling.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Common Apprentice Pressures</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Financial Pressure</p>
                    <p className="text-sm text-white">
                      Apprentice wages are significantly lower than qualified rates, yet apprentices
                      face real costs: hand tools (which can run to several hundred pounds), PPE,
                      travel to site (which may change weekly), college materials, and basic living
                      expenses. Many apprentices are teenagers or young adults trying to manage
                      money independently for the first time.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Travel and Site Changes</p>
                    <p className="text-sm text-white">
                      Unlike an office job with a fixed location, construction apprentices may
                      travel to different sites weekly or even daily. For a young person without a
                      driving licence or car, this can mean expensive and unreliable public
                      transport, early starts, and long days. Sites in remote locations may be
                      practically inaccessible without a vehicle.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Being Young in an Adult Environment
                    </p>
                    <p className="text-sm text-white">
                      A 16 or 17-year-old apprentice is entering an adult working environment with
                      its own culture, language, and expectations. Site banter, swearing, physical
                      demands, and the pace of work can be overwhelming for someone who was in
                      school six months ago. The transition is significant and often underestimated.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Site Culture and Belonging</p>
                    <p className="text-sm text-white">
                      The desire to fit in and be accepted by the team is powerful. Apprentices may
                      tolerate inappropriate behaviour, take risks to impress, or hide mistakes
                      because they fear being seen as weak or incompetent. The pressure to conform
                      to negative aspects of site culture can be intense.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Construction Example</p>
                </div>
                <p className="text-sm text-white">
                  Your 18-year-old apprentice, Alex, is on minimum apprentice wage and living at
                  home. Alex has just bought a basic set of hand tools costing &pound;350, needs new
                  safety boots (&pound;80), and is spending &pound;15 per day on public transport to
                  site because the current project is 20 miles from home. That is over &pound;75 per
                  week on travel alone &mdash; a significant chunk of an apprentice wage. Alex has
                  started skipping lunch to save money. The mentor notices and quietly asks about
                  it. This conversation opens the door to practical support: checking if the
                  employer offers a tool allowance, exploring lift-sharing with other team members,
                  and signposting to any financial support available through the JIB or training
                  provider.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Remember</p>
                <p className="text-sm text-white">
                  What seems like a small amount of money to a qualified electrician can be a crisis
                  for an apprentice on minimum wage. Never assume that financial pressures are
                  trivial. If an apprentice is struggling financially, it affects their
                  concentration, their mood, their attendance, and ultimately their safety on site.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Pastoral Care Boundaries & Signposting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Pastoral Care Boundaries &amp; Signposting
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The mentor occupies a <strong>unique pastoral position</strong>. They are not the
                apprentice&rsquo;s parent, teacher, counsellor, or GP &mdash; but they are the adult
                the apprentice spends the most time with during working hours. This proximity
                creates both opportunity and responsibility. The mentor must understand where their
                pastoral role begins and ends.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-3">
                  What Mentors Can Appropriately Do
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Notice changes in behaviour and check in with genuine concern</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Listen actively and without judgement when an apprentice wants to talk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Provide practical support and advice on work-related issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Signpost to professional support services when needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Create a safe, supportive working environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Escalate safeguarding concerns through the appropriate channels</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">What Mentors Should NOT Do</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Diagnose</strong> mental health conditions (&ldquo;You have
                      depression&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Prescribe</strong> treatments or remedies (&ldquo;You should take
                      medication&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Provide counselling</strong> &mdash; mentors are not trained
                      therapists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Promise absolute confidentiality</strong> &mdash; safeguarding
                      concerns must be reported
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Minimise</strong> concerns (&ldquo;Toughen up&rdquo; or &ldquo;It
                      could be worse&rdquo;)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Key Support Services to Signpost
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Mates in Mind</p>
                    <p className="text-sm text-white">
                      Construction-specific mental health charity. Resources, training, and support
                      for individuals and employers. matesinmind.org
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Samaritans</p>
                    <p className="text-sm text-white">
                      24/7 confidential listening service. Call 116 123 (free from any phone).
                      Available day and night, every day of the year.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Employee Assistance Programme (EAP)
                    </p>
                    <p className="text-sm text-white">
                      Many employers offer confidential counselling and support through an EAP.
                      Check if your company has one and ensure the apprentice knows how to access
                      it.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">College Welfare Services</p>
                    <p className="text-sm text-white">
                      The apprentice&rsquo;s college will have a welfare team, student support
                      services, and often a counselling service. These are free and confidential.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">CITB &amp; JIB Support</p>
                    <p className="text-sm text-white">
                      Both organisations offer wellbeing resources and, in some cases, financial
                      support grants for apprentices facing hardship.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Trade Union Support</p>
                    <p className="text-sm text-white">
                      If the apprentice or employer is a union member, the union can provide advice,
                      representation, and support on workplace issues including bullying and
                      discrimination.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Remember</p>
                <p className="text-sm text-white">
                  Signposting is not passing the buck &mdash; it is connecting the apprentice with
                  the right expertise. A mentor who says &ldquo;I&rsquo;m not a counsellor, but I
                  know people who can help, and I&rsquo;ll support you through the process&rdquo; is
                  doing exactly the right thing. You do not need to have all the answers. You need
                  to know where to find them.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Dealing With Bullying and Harassment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Dealing With Bullying and Harassment
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Bullying and harassment have <strong>no place on a construction site</strong>. Yet
                they remain a persistent problem in the industry, particularly towards apprentices
                who are often the youngest and most vulnerable members of the team. The mentor has a
                clear duty to act when they witness or are told about bullying behaviour &mdash;
                ignoring it is not a neutral act, it is enabling it.
              </p>

              <p>
                It is important to distinguish between <strong>banter and bullying</strong>.
                Good-natured humour that everyone enjoys and participates in equally is part of a
                healthy team culture. Behaviour that targets, humiliates, or intimidates an
                individual &mdash; particularly one who is in a position of less power &mdash; is
                bullying. The test is not the intention of the person doing it, but the{' '}
                <strong>impact on the person receiving it</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Equality Act 2010 &mdash; Protected Characteristics
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Harassment related to any of the following protected characteristics is unlawful
                  under the Equality Act 2010:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-white">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span>Age</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span>Disability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span>Gender reassignment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span>Marriage &amp; civil partnership</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span>Pregnancy &amp; maternity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span>Race</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span>Religion or belief</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span>Sex</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span>Sexual orientation</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Construction Example</p>
                </div>
                <p className="text-sm text-white">
                  An older electrician on the team regularly makes derogatory comments about the
                  apprentice&rsquo;s background, using racially insensitive language disguised as
                  &ldquo;banter.&rdquo; The apprentice laughs along to fit in but tells you
                  privately that it makes them uncomfortable and they dread coming to work. This is
                  racial harassment under the Equality Act 2010. The mentor must take this
                  seriously: document what the apprentice has disclosed (dates, specific comments,
                  witnesses), reassure the apprentice that reporting is the right thing to do, and
                  escalate through the company&rsquo;s formal bullying and harassment procedure. The
                  perpetrator&rsquo;s intention (&ldquo;It was just a joke&rdquo;) is irrelevant
                  &mdash; the impact on the recipient is what matters.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Mentor&rsquo;s Response Framework
                  </p>
                </div>
                <div className="text-sm text-white space-y-2">
                  <p>
                    <strong>1. Take it seriously:</strong> Never dismiss a bullying report as
                    &ldquo;just banter&rdquo; or &ldquo;site culture.&rdquo; The apprentice has
                    trusted you with something difficult &mdash; honour that trust.
                  </p>
                  <p>
                    <strong>2. Document:</strong> Record what was disclosed, including dates,
                    specific language used, locations, and any witnesses. Use the apprentice&rsquo;s
                    own words where possible.
                  </p>
                  <p>
                    <strong>3. Reassure:</strong> Tell the apprentice that they have done the right
                    thing by speaking up, that the behaviour is not acceptable, and that they will
                    be supported.
                  </p>
                  <p>
                    <strong>4. Escalate:</strong> Follow the company&rsquo;s formal bullying and
                    harassment procedure. If no procedure exists, escalate to the site manager,
                    employer, or training provider.
                  </p>
                  <p>
                    <strong>5. Monitor:</strong> After escalation, watch for retaliation. Check in
                    with the apprentice regularly. If the company fails to act, advise the
                    apprentice of external options (ACAS, trade union, HSE).
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">
                  Creating Safe Reporting Pathways
                </p>
                <p className="text-sm text-white">
                  An apprentice will only report bullying if they trust the process. Build this
                  trust by being consistent: always take concerns seriously, always follow up, never
                  gossip about what an apprentice has told you in confidence, and demonstrate
                  through your own behaviour that discrimination and harassment are unacceptable. If
                  an apprentice sees you challenge inappropriate behaviour in real time, they learn
                  that the site has standards and that someone will act. If they see you laugh
                  along, they learn the opposite.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Point</p>
                <p className="text-sm text-white">
                  The mentor&rsquo;s duty to act on bullying is not optional. If you witness or are
                  told about harassment and do nothing, you are complicit. This is not just a moral
                  position &mdash; employers have a legal duty to protect workers from harassment
                  under the Equality Act 2010, and mentors acting on behalf of the employer share in
                  that responsibility.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../md-module-4">
              Next: Assessment &amp; Evaluation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
