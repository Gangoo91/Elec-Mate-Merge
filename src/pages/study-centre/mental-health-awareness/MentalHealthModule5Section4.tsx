import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Phone, Heart, Users, Lightbulb, ExternalLink, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh5s4-lighthouse-helpline",
    question: "What is the telephone number for the Lighthouse Club's Construction Industry Helpline?",
    options: [
      "0800 587 5678",
      "0345 605 1956",
      "116 123",
      "0300 123 3393"
    ],
    correctIndex: 1,
    explanation: "The Lighthouse Club's Construction Industry Helpline number is 0345 605 1956. This helpline is available 24/7 and provides emotional, financial, and legal support specifically for construction workers and their families. It is one of the most important numbers anyone in the construction industry can know. The Samaritans number is 116 123, and Mind's Infoline is 0300 123 3393 — both are also valuable resources, but the Lighthouse Club helpline is specifically designed for the construction industry."
  },
  {
    id: "mh5s4-mates-in-mind",
    question: "Mates in Mind was founded specifically for which industry?",
    options: [
      "The NHS and healthcare sector",
      "The financial services sector",
      "The construction and related industries",
      "All UK industries equally"
    ],
    correctIndex: 2,
    explanation: "Mates in Mind was founded in 2017 specifically for the construction and related industries. It was created in response to the disproportionately high rates of mental ill-health and suicide in construction. Mates in Mind provides workplace training, consultancy, and resources tailored to the unique culture and challenges of construction. It works with companies of all sizes, from sole traders to major Tier 1 contractors, to improve mental health awareness and create supportive workplace cultures."
  },
  {
    id: "mh5s4-action-today",
    question: "Which of the following is something ANY construction worker can do TODAY to support mental health in their workplace?",
    options: [
      "Write a comprehensive mental health policy for their company",
      "Commission a Deloitte-style research project into mental health costs",
      "Have one genuine conversation with a colleague about how they are doing",
      "Become a qualified mental health professional"
    ],
    correctIndex: 2,
    explanation: "While policies, research, and qualifications are all valuable, the most powerful thing any construction worker can do TODAY is have one genuine conversation with a colleague. Not the quick 'you alright, mate?' as you walk past, but actually stopping, making eye contact, and genuinely listening to the answer. One conversation can be the difference between someone getting help and someone suffering in silence. It costs nothing, takes five minutes, and could save a life. Culture change starts with individual actions, and every single person in construction can contribute."
  }
];

const faqs = [
  {
    question: "What is the difference between Mates in Mind and the Lighthouse Club?",
    answer: "Mates in Mind focuses primarily on prevention and workplace culture change — they provide training, consultancy, and resources to help construction companies build mentally healthy workplaces. Think of them as helping you create the conditions that prevent mental health problems from developing. The Lighthouse Club focuses primarily on crisis support and immediate help — their 24/7 helpline provides emotional support, financial emergency grants, and legal advice to construction workers and their families who are already struggling. Both are essential and complementary: Mates in Mind helps prevent problems; the Lighthouse Club helps when problems arise."
  },
  {
    question: "I am just an apprentice — can I really make a difference to mental health on site?",
    answer: "Absolutely — and your generation is critical to changing the culture. You can make a difference by: learning the key helpline numbers and sharing them with colleagues, having genuine conversations about mental health, refusing to participate in stigmatising banter (even if it means being the odd one out), suggesting mental health as a toolbox talk topic, training as a Mental Health First Aider, and most importantly, being willing to talk about your own experiences. You bring a perspective that many older workers do not have — you grew up in a world where mental health is discussed more openly. Use that to help shift the culture, one conversation at a time."
  },
  {
    question: "Are these helplines really free and confidential?",
    answer: "Yes, all the major helplines mentioned in this module are free and confidential. The Lighthouse Club Construction Industry Helpline (0345 605 1956) is free from UK landlines and most mobiles and is completely confidential — your employer will never know you called. The Samaritans (116 123) is completely free from any phone, and they do not share your information with anyone without your consent. Mind's Infoline (0300 123 3393) charges at local call rates. Andy's Man Club is free to attend and there is no registration required — you just turn up. These services exist to help you, with no strings attached."
  },
  {
    question: "How do I find out if my company is already a Mates in Mind supporter?",
    answer: "The easiest way is to ask your HR department, health and safety manager, or site manager. Mates in Mind supporter companies often display the Mates in Mind logo on their website, in tender documents, and on site signage. You can also visit the Mates in Mind website (matesinmind.org) where they list some of their partner organisations. If your company is not a supporter, you could suggest they look into it — Mates in Mind offers different levels of engagement to suit companies of all sizes, from individual supporter memberships to full organisational partnerships. Raising this with your management demonstrates initiative and leadership."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Mates in Mind was founded in which year?",
    options: [
      "2010",
      "2014",
      "2017",
      "2020"
    ],
    correctAnswer: 2,
    explanation: "Mates in Mind was founded in 2017, established by the Health in Construction Leadership Group in response to the disproportionately high rates of mental ill-health and suicide in the construction industry. Since its founding, Mates in Mind has trained thousands of construction workers and partnered with hundreds of companies to improve mental health awareness and support across the industry."
  },
  {
    id: 2,
    question: "The Lighthouse Club Construction Industry Helpline provides which of the following?",
    options: [
      "Emotional support only",
      "Financial emergency grants only",
      "Emotional support, financial emergency grants, legal advice, and family support",
      "Referrals to private psychiatric services only"
    ],
    correctAnswer: 2,
    explanation: "The Lighthouse Club Construction Industry Helpline (0345 605 1956) provides comprehensive support including: emotional support (confidential counselling and someone to talk to), financial emergency grants (for construction workers facing financial crisis), legal advice, and family support. It is available 24 hours a day, 7 days a week, 365 days a year. This breadth of support recognises that mental health difficulties in construction are often linked to financial pressures, legal worries, and family concerns."
  },
  {
    id: 3,
    question: "Andy's Man Club meets on which night of the week?",
    options: [
      "Wednesday nights",
      "Friday nights",
      "Sunday nights",
      "Monday nights"
    ],
    correctAnswer: 3,
    explanation: "Andy's Man Club meets every Monday night at 7pm across locations throughout the UK. The groups provide a safe, judgement-free space for men to talk about their struggles. They follow a simple format: everyone sits in a circle and talks about what is on their mind. There is no registration, no referral needed, and it is completely free. The clubs were founded after Andy Roberts took his own life in 2016, by his family and friends who wanted to create spaces where men could talk openly."
  },
  {
    id: 4,
    question: "The Building Mental Health framework helps construction companies by providing:",
    options: [
      "Free mental health treatment for all construction workers",
      "A charter, self-assessment tool, action planning, and recognition programme",
      "Mandatory mental health inspections of construction sites",
      "Insurance against mental health-related claims"
    ],
    correctAnswer: 1,
    explanation: "The Building Mental Health framework provides a structured approach for construction companies to improve their mental health practices. It includes a charter (a public commitment), a self-assessment tool (to understand where you currently are), action planning (to identify and implement improvements), and a recognition programme (to acknowledge companies that meet certain standards). It is designed to be practical and accessible, giving companies a clear pathway from basic awareness to embedded good practice."
  },
  {
    id: 5,
    question: "Which organisation provides the 24/7 helpline number 116 123?",
    options: [
      "Mind",
      "CALM (Campaign Against Living Miserably)",
      "Samaritans",
      "Lighthouse Club"
    ],
    correctAnswer: 2,
    explanation: "116 123 is the Samaritans helpline number. It is available 24 hours a day, 365 days a year, is free to call from any phone, and is completely confidential. The Samaritans are not just for people who are suicidal — they support anyone who is struggling with any emotional difficulty. They are trained listeners who provide a safe space to talk without judgement. The Samaritans also accept emails (jo@samaritans.org) for people who find it easier to write than to speak."
  },
  {
    id: 6,
    question: "CALM (Campaign Against Living Miserably) focuses specifically on:",
    options: [
      "Women's mental health in the workplace",
      "Preventing suicide, particularly among men",
      "Providing medication for mental health conditions",
      "Training mental health professionals"
    ],
    correctAnswer: 1,
    explanation: "CALM (Campaign Against Living Miserably) is a charity specifically focused on preventing suicide, particularly among men. Men account for approximately 75% of all suicides in the UK, and CALM works to change the culture that prevents men from seeking help. They provide a helpline (0800 58 58 58, 5pm–midnight daily), a webchat service, and campaign actively to challenge the stigma around male mental health. Given that construction is a male-dominated industry with high suicide rates, CALM is an especially relevant resource."
  },
  {
    id: 7,
    question: "Which of the following is the MOST effective first step an individual construction worker can take to support mental health in their workplace?",
    options: [
      "Drafting a formal proposal for a company-wide mental health programme",
      "Learning one helpline number and having one genuine conversation with a colleague",
      "Conducting an independent audit of the company's mental health provision",
      "Researching the latest academic literature on workplace mental health"
    ],
    correctAnswer: 1,
    explanation: "The most effective first step is the simplest: learn one helpline number (such as the Lighthouse Club on 0345 605 1956 or Samaritans on 116 123) and have one genuine conversation with a colleague about how they are doing. Grand plans and formal proposals have their place, but culture change happens through individual daily actions. If every construction worker learned one number and had one conversation, the impact would be enormous. Small actions, done consistently, create the culture change that saves lives."
  },
  {
    id: 8,
    question: "Which statement about mental health resources for the construction industry is MOST accurate?",
    options: [
      "There are very few resources available specifically for construction workers",
      "Resources exist but they are expensive and only available to large companies",
      "There is a wide range of free, accessible resources specifically designed for the construction industry, including helplines, charities, training, and peer support",
      "Mental health resources are only useful for people with diagnosed clinical conditions"
    ],
    correctAnswer: 2,
    explanation: "The construction industry now has access to a wide range of free and accessible mental health resources. The Lighthouse Club helpline is available 24/7 for any construction worker. Mates in Mind provides training and resources for companies of all sizes. Andy's Man Club offers free weekly peer support groups across the UK. Mind, Samaritans, and CALM provide free support for anyone. The Building Mental Health framework is freely available. Many of these resources are specifically designed for the construction industry and understand its unique culture and challenges. The resources exist — the challenge is making sure every worker knows about them."
  }
];

export default function MentalHealthModule5Section4() {
  useSEO({
    title: "Industry Initiatives and Resources | Mental Health Module 5.4",
    description: "Discover the key organisations, helplines, and resources supporting mental health in the construction industry — Mates in Mind, Lighthouse Club, Building Mental Health, and more.",
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
            <Link to="../mental-health-module-5">
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
            <BookOpen className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Industry Initiatives and Resources
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The organisations, helplines, and frameworks that are transforming mental health in construction &mdash; and what YOU can do, starting today
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Mates in Mind:</strong> Prevention + workplace culture change</li>
              <li><strong>Lighthouse Club:</strong> 24/7 helpline + crisis support</li>
              <li><strong>Building MH:</strong> Charter + self-assessment + action planning</li>
              <li><strong>You:</strong> One conversation can save a life</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Numbers to Know</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Lighthouse Club:</strong> 0345 605 1956 (24/7)</li>
              <li><strong>Samaritans:</strong> 116 123 (24/7, free)</li>
              <li><strong>CALM:</strong> 0800 58 58 58 (5pm&ndash;midnight)</li>
              <li><strong>Mind:</strong> 0300 123 3393 (Mon&ndash;Fri, 9am&ndash;6pm)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Describe the role and services of Mates in Mind in the construction industry",
              "Explain how the Lighthouse Club supports construction workers and their families",
              "Outline the Building Mental Health framework and its key components",
              "Identify at least five organisations that provide mental health support relevant to construction",
              "Recall the key helpline numbers for construction industry mental health support",
              "Commit to at least one personal action to support mental health in your workplace"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Mates in Mind */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Mates in Mind
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Mates in Mind</strong> was founded in 2017 by the Health in Construction
                Leadership Group, in direct response to the devastating mental health statistics
                in the construction industry. It is the UK&rsquo;s leading charity focused on
                improving and promoting positive mental health in the construction and related
                industries.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">What Mates in Mind Offers</p>
                </div>
                <p className="text-sm text-white">
                  Mates in Mind takes a <strong>prevention-first approach</strong>. Rather than waiting
                  for people to reach crisis point, they focus on creating the workplace conditions that
                  support good mental health and prevent problems from developing. Their work covers three
                  pillars: <strong>raise awareness, build understanding, and create change</strong>.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Mates in Mind Services</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Workplace training</strong> &mdash; Tailored training programmes for the construction industry, including general awareness sessions, manager training, and specialist workshops. The training is designed by people who understand construction culture and is delivered in a way that resonates with the workforce.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Consultancy</strong> &mdash; Expert advice on developing mental health strategies, policies, and programmes. Mates in Mind can help companies at any stage of their mental health journey, from those just starting out to those looking to enhance existing provision.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Resources</strong> &mdash; A library of construction-specific resources including toolbox talk guides, posters, videos, and guidance documents. These are designed to be practical and immediately usable on site.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Research and impact data</strong> &mdash; Mates in Mind conducts and publishes research on mental health in construction, providing the evidence base that helps companies make the case for investment and measure their progress.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Supporter and Champion companies</strong> &mdash; Companies can become Mates in Mind supporters (contributing financially and demonstrating public commitment) or champions (meeting more advanced criteria for mental health practice). Being a supporter or champion is increasingly seen as a mark of good practice in the industry.</span>
                  </li>
                </ul>
              </div>

              <p>
                Mates in Mind has had a transformative impact on the construction industry. Since its
                founding, it has reached hundreds of thousands of construction workers through training
                and awareness campaigns. Major contractors, trade bodies, and industry organisations
                have signed up as supporters. The conversation around mental health in construction
                has shifted dramatically &mdash; and Mates in Mind has been at the heart of that shift.
              </p>

              <p>
                Getting your company involved is straightforward. Visit the Mates in Mind website
                (matesinmind.org) to explore the different levels of engagement, from individual
                supporter memberships to full organisational partnerships. Even if your company is
                small, there are affordable options that can make a real difference.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Lighthouse Club */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Lighthouse Club
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Lighthouse Club</strong> is the construction industry&rsquo;s own charity,
                providing emotional, physical, and financial wellbeing support to construction workers
                and their families. While Mates in Mind focuses on prevention and culture change, the
                Lighthouse Club focuses on <strong>immediate, practical support</strong> for people who
                are already struggling.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Construction Industry Helpline</p>
                </div>
                <p className="text-base text-white leading-relaxed">
                  <strong>0345 605 1956</strong> &mdash; Available 24 hours a day, 7 days a week, 365 days a year.
                </p>
                <p className="text-sm text-white mt-2">
                  This is one of the most important phone numbers in the construction industry. If you
                  only remember one number from this entire course, make it this one. The helpline
                  provides free, confidential support for any construction worker (employed or
                  self-employed) and their families. Your employer will never know you called.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What the Lighthouse Club Provides</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Emotional support</strong> &mdash; Confidential counselling and someone to talk to. The helpline is staffed by trained professionals who understand the unique pressures of the construction industry. Sometimes, just having someone listen without judgement is enough to make a difference.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Financial emergency grants</strong> &mdash; One-off grants for construction workers facing financial crisis. This might be help with rent, utility bills, essential travel, or other urgent needs. Financial worries are one of the biggest drivers of poor mental health in construction, and practical financial help can be life-changing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Legal advice</strong> &mdash; Free legal advice for construction workers on issues that may be contributing to their stress, such as employment disputes, debt, housing, or family law matters.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Family support</strong> &mdash; Support is not just for the worker &mdash; it extends to their families. Partners, children, and other family members affected by a construction worker&rsquo;s mental health difficulties can also access support through the helpline.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Wellbeing app</strong> &mdash; The Lighthouse Club provides a free wellbeing app with self-help resources, mood tracking, and access to support services, designed specifically for construction workers.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Real Impact</p>
                <p className="text-sm text-white">
                  The Lighthouse Club helps thousands of construction workers and their families every
                  year. Their helpline receives tens of thousands of calls annually, and the charity has
                  distributed millions of pounds in emergency grants. Behind every statistic is a real
                  person who was in crisis and received the help they needed &mdash; a plumber who was
                  about to lose their home, an electrician whose marriage was breaking down, a labourer
                  who did not know where to turn for help with their debt. The Lighthouse Club provides
                  the safety net that catches people when they fall.
                </p>
              </div>

              <p>
                You can support the Lighthouse Club by displaying their helpline number on your site,
                including it in your inductions, and making sure every worker knows it exists. If you
                or your company can donate or fundraise, every penny goes towards supporting
                construction workers in need. But the simplest and most powerful thing you can do is
                <strong> make sure everyone on your site knows the number: 0345 605 1956</strong>.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Building Mental Health Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Building Mental Health Framework
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Building Mental Health</strong> framework provides a structured, practical
                pathway for construction companies to improve their mental health practices. It
                complements Mates in Mind and the Lighthouse Club by providing a <strong>self-assessment
                and continuous improvement tool</strong> that helps companies understand where they are
                and plan where they need to go.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Components</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>The Charter</strong> &mdash; A public commitment to prioritising mental health. By signing the charter, companies make a visible declaration that mental health matters and that they are committed to taking action. This sends a powerful message to employees, clients, and the wider industry.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Commitment levels</strong> &mdash; The framework defines different levels of commitment, from basic awareness to fully embedded practice. This allows companies to start where they are and progress at a pace that is realistic and sustainable.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Self-assessment tool</strong> &mdash; A structured assessment that helps companies evaluate their current mental health provision against a set of clear criteria. This honest appraisal is the starting point for meaningful improvement &mdash; you cannot improve what you have not measured.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Action planning</strong> &mdash; Based on the self-assessment, companies create a tailored action plan with clear priorities, responsibilities, and timelines. This turns awareness into structured, measurable action.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Recognition programme</strong> &mdash; Companies that meet certain standards receive formal recognition, which can be used in tender submissions, marketing, and recruitment. This creates a positive incentive for improvement and allows clients and potential employees to identify companies that take mental health seriously.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">How It Differs from Mates in Mind</p>
                <p className="text-sm text-white">
                  Mates in Mind and Building Mental Health are complementary, not competing. Mates in
                  Mind provides <strong>training, awareness, and culture change</strong> &mdash; the
                  human side. Building Mental Health provides a <strong>structured framework for
                  self-assessment and continuous improvement</strong> &mdash; the systems side. Many
                  companies use both: Mates in Mind for training and awareness, and Building Mental
                  Health for measuring progress and demonstrating commitment. Using both together
                  creates a comprehensive approach that addresses both culture and systems.
                </p>
              </div>

              <p>
                The Building Mental Health framework is particularly valuable for companies that want
                to demonstrate their commitment to clients. As more Tier 1 contractors require evidence
                of mental health provision from their supply chain, having a recognised framework and
                assessment provides tangible evidence that can be included in pre-qualification
                questionnaires and tender submissions.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Other Key Organisations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Other Key Organisations
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond the construction-specific organisations, there is a wealth of mental health
                support available from national charities and organisations. Every construction worker
                should know about these resources &mdash; for themselves, their colleagues, and their
                families.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Essential Organisations and Helplines</p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">CALM &mdash; Campaign Against Living Miserably</p>
                    <p className="text-sm text-white mb-1"><strong>Helpline:</strong> 0800 58 58 58 (5pm&ndash;midnight, daily) | <strong>Webchat:</strong> thecalmzone.net</p>
                    <p className="text-sm text-white">Focused on preventing suicide, particularly among men. CALM challenges the culture that prevents men from seeking help. Given that men account for approximately 75% of UK suicides, and that construction is male-dominated with high suicide rates, CALM is an especially relevant resource. Their helpline is anonymous and confidential.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">Mind</p>
                    <p className="text-sm text-white mb-1"><strong>Infoline:</strong> 0300 123 3393 (Mon&ndash;Fri, 9am&ndash;6pm) | <strong>Email:</strong> info@mind.org.uk</p>
                    <p className="text-sm text-white">The UK&rsquo;s leading mental health charity. Mind provides information and advice on all aspects of mental health, campaigns to improve services and raise awareness, and supports local Mind centres across the country. Their website (mind.org.uk) is an exceptional resource with comprehensive information on every mental health condition, treatment, and support option.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">Samaritans</p>
                    <p className="text-sm text-white mb-1"><strong>Helpline:</strong> 116 123 (24/7, free from any phone) | <strong>Email:</strong> jo@samaritans.org</p>
                    <p className="text-sm text-white">Available 24 hours a day, 365 days a year. Crucially, the Samaritans are <strong>not just for suicidal people</strong> &mdash; they support anyone who is struggling with any emotional difficulty. They are trained listeners who provide a safe, confidential, non-judgemental space to talk. The 116 123 number is free from any phone, including mobiles.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">Andy&rsquo;s Man Club</p>
                    <p className="text-sm text-white mb-1"><strong>When:</strong> Every Monday at 7pm | <strong>Website:</strong> andysmanclub.co.uk</p>
                    <p className="text-sm text-white">Free peer support groups for men, meeting every Monday night across locations throughout the UK. Founded after Andy Roberts took his own life in 2016. No registration needed &mdash; just turn up. The format is simple: sit in a circle and talk about what is on your mind. Many construction workers attend and find the peer support transformative. It is not therapy &mdash; it is just men talking honestly with other men.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">Movember</p>
                    <p className="text-sm text-white">Best known for the annual moustache-growing campaign, Movember funds and supports programmes focused on men&rsquo;s mental health, suicide prevention, prostate cancer, and testicular cancer. Their mental health programmes include initiatives to improve men&rsquo;s social connections and help-seeking behaviour. Many construction companies participate in Movember as a way to raise awareness and start conversations about men&rsquo;s health.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">MHFA England</p>
                    <p className="text-sm text-white">The organisation that provides Mental Health First Aid training in England. MHFA England offers courses ranging from half-day awareness sessions to the full two-day Mental Health First Aider qualification. They also provide instructor training, enabling organisations to deliver MHFA courses in-house. Their courses are evidence-based and quality-assured.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">Rethink Mental Illness</p>
                    <p className="text-sm text-white">A charity that supports people severely affected by mental illness through local groups and services, expert information, and campaigning. Particularly relevant for colleagues who are dealing with more severe conditions such as schizophrenia, bipolar disorder, or personality disorders. Their advice line is 0808 801 0525.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">Construction Sport</p>
                    <p className="text-sm text-white">Promotes sport and physical activity in the construction industry as a way to improve both physical and mental health. They organise events, leagues, and activities that bring construction workers together outside of work, building social connections that are protective for mental health. Physical activity is one of the most effective interventions for mild to moderate depression and anxiety.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: What YOU Can Do */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            What YOU Can Do
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You have now learned the business case, the cultural requirements, the policies and
                frameworks, and the resources available. The question is: <strong>what are you going
                to do about it?</strong> Culture change does not happen because of policies or
                programmes &mdash; it happens because individual people decide to act differently.
                And it starts today.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Things You Can Do Starting TODAY</p>
                </div>
                <p className="text-sm text-white mb-3">
                  You do not need to be a manager, a director, or a mental health professional to make
                  a difference. Every single person in the construction industry can contribute to
                  better mental health. Here are practical actions you can take right now:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Learn one helpline number</strong> &mdash; Commit the Lighthouse Club number (0345 605 1956) or the Samaritans number (116 123) to memory. Write it on a piece of tape and stick it inside your hard hat. You never know when you or someone else might need it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Have one genuine conversation</strong> &mdash; Tomorrow morning, pick one colleague and genuinely ask them how they are doing. Not the quick &ldquo;alright, mate?&rdquo; as you walk past, but actually stop, make eye contact, and listen to the answer. If they say &ldquo;yeah, fine&rdquo; but they do not look fine, gently say &ldquo;are you sure? You can talk to me if you need to.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Challenge one instance of stigma</strong> &mdash; The next time someone says &ldquo;man up&rdquo; or dismisses mental health, calmly say something like: &ldquo;Actually, mental health can affect anyone &mdash; even the toughest people I know. I would rather someone asked for help than suffered in silence.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Suggest mental health as a toolbox talk topic</strong> &mdash; Speak to your supervisor or safety coordinator and suggest covering mental health in a future toolbox talk. Offer to help organise it or even lead it. This shows initiative and leadership.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Become a Mental Health First Aider</strong> &mdash; Ask your employer to sponsor you for the two-day MHFA England course. If they will not fund it, many construction charities and training providers offer subsidised places. The skills you learn will benefit you for life.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Sign up to Mates in Mind</strong> &mdash; Encourage your company to become a Mates in Mind supporter. If they are already a supporter, find out what resources are available and help promote them on site.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Put the Lighthouse Club number on site</strong> &mdash; Print the helpline number (0345 605 1956) on a poster and put it in the welfare unit, the drying room, and the canteen. Make sure it is visible in places where people actually go.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Role model openness</strong> &mdash; If you are comfortable doing so, share your own experiences. You do not have to bare your soul &mdash; even saying &ldquo;I had a tough week last week and talking to someone really helped&rdquo; normalises the conversation and gives others permission to be open.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Small Actions Create Big Change</p>
                <p className="text-sm text-white">
                  You might read this list and think: &ldquo;That seems too simple to make a
                  difference.&rdquo; But culture change is not about grand gestures or revolutionary
                  programmes. It is about <strong>thousands of small actions, repeated consistently,
                  by ordinary people</strong>. One conversation might be the difference between someone
                  getting help and someone suffering in silence. One challenged comment might make someone
                  think twice before dismissing a colleague&rsquo;s struggles. One helpline number on a
                  poster might save a life. You will probably never know the full impact of your actions
                  &mdash; but that does not mean the impact is not real.
                </p>
              </div>

              <p>
                The construction industry has come a long way in the last decade. Ten years ago, mental
                health was barely mentioned on construction sites. Today, it is on the agenda of every
                major contractor, every trade body, and every industry event. That change happened because
                individual people decided to act. You can be the next person who makes that decision.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary + Comprehensive Resource Box */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has introduced the key organisations, resources, and initiatives that
                are transforming mental health in the construction industry, and has challenged you
                to take personal action. The resources exist &mdash; the challenge is making sure
                every worker knows about them and feels empowered to use them.
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Mates in Mind:</strong> Prevention-focused. Training, consultancy, resources, and a supporter/champion programme for the construction industry. Founded 2017.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Lighthouse Club:</strong> Crisis support. 24/7 helpline (0345 605 1956), financial grants, legal advice, family support. The construction industry&rsquo;s safety net.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Building Mental Health:</strong> Framework for self-assessment, action planning, and recognition. Complements Mates in Mind.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>National resources:</strong> CALM, Mind, Samaritans, Andy&rsquo;s Man Club, Movember, MHFA England, Rethink, Construction Sport &mdash; free, accessible, and available to all.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Individual action matters:</strong> Learn one number, have one conversation, challenge one instance of stigma. Small actions, repeated consistently, create culture change.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>You can make a difference:</strong> Regardless of your role or level, you have the power to contribute to a mentally healthier construction industry. Start today.</span>
                </li>
              </ul>

              {/* Comprehensive Helpline/Resource Box */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="h-5 w-5 text-rose-400" />
                  <p className="text-base font-semibold text-rose-400">Key Helplines and Resources</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">Lighthouse Club (Construction)</p>
                    <p className="text-sm text-white"><strong>0345 605 1956</strong> &mdash; 24/7</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">Samaritans</p>
                    <p className="text-sm text-white"><strong>116 123</strong> &mdash; 24/7, free</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">CALM</p>
                    <p className="text-sm text-white"><strong>0800 58 58 58</strong> &mdash; 5pm&ndash;midnight</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">Mind Infoline</p>
                    <p className="text-sm text-white"><strong>0300 123 3393</strong> &mdash; Mon&ndash;Fri 9&ndash;6</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">Rethink Advice Line</p>
                    <p className="text-sm text-white"><strong>0808 801 0525</strong></p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">Andy&rsquo;s Man Club</p>
                    <p className="text-sm text-white"><strong>Mondays 7pm</strong> &mdash; andysmanclub.co.uk</p>
                  </div>
                </div>
                <p className="text-sm text-white">
                  <strong>In an emergency, always call 999.</strong> If someone is in immediate danger
                  of harming themselves or others, call emergency services first. You will not get
                  anyone in trouble &mdash; you could save their life.
                </p>
              </div>

              {/* Module Completion Message */}
              <div className="bg-green-500/10 border border-green-500/30 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-green-400" />
                  <p className="text-base font-semibold text-green-400">Module 5 Complete</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Congratulations on completing Module 5: Building a Mentally Healthy Workplace. You now
                  understand the business case, the cultural requirements, the policy frameworks, and the
                  resources available to support mental health in construction. Most importantly, you know
                  that <strong>you</strong> can make a difference &mdash; not just through your role, but
                  through your daily actions, your conversations, and your willingness to challenge the
                  status quo.
                </p>
                <p className="text-sm text-white mb-3">
                  The construction industry has lost too many good people to mental health difficulties
                  and suicide. Every person who completes this module and takes action helps change that.
                  Every conversation you have, every helpline number you share, every instance of stigma
                  you challenge contributes to a culture where people feel safe to ask for help.
                </p>
                <p className="text-sm text-white">
                  <strong>Remember: you do not need to be an expert. You just need to care enough to act.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Policies and Risk Assessment
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-6">
              Next: Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}