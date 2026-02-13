import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, TrendingUp, PoundSterling, Scale, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh5s1-cost-presenteeism",
    question: "According to Deloitte research, which costs UK employers MORE — absenteeism or presenteeism?",
    options: [
      "Absenteeism — because people are completely absent from work",
      "Presenteeism — because people are at work but functioning at reduced capacity",
      "They cost roughly the same amount each year",
      "Neither — the main cost is staff turnover and recruitment"
    ],
    correctIndex: 1,
    explanation: "Deloitte's 2024 research found that presenteeism costs UK employers approximately twice as much as absenteeism. When people come to work while struggling with their mental health, they are physically present but their concentration, decision-making, productivity, and safety awareness are all significantly reduced. On construction sites, this is particularly dangerous because reduced concentration directly increases the risk of accidents and errors."
  },
  {
    id: "mh5s1-roi-deloitte",
    question: "According to Deloitte's research, for every £1 spent on mental health support in the workplace, employers get back approximately:",
    options: [
      "£1.50 — a modest but positive return",
      "£3.00 — triple the investment",
      "£5.30 — a strong return on investment",
      "£10.00 — ten times the investment"
    ],
    correctIndex: 2,
    explanation: "Deloitte's comprehensive research found that for every £1 invested in mental health support, employers receive an average return of £5.30. This makes mental health investment one of the highest-returning investments a construction company can make. The return comes from reduced absenteeism, lower presenteeism, decreased staff turnover, fewer accidents, less rework, and lower recruitment costs. Preventive and early intervention measures deliver the highest returns."
  },
  {
    id: "mh5s1-legal-duty",
    question: "Under which piece of UK legislation do employers have a legal duty of care that includes mental health?",
    options: [
      "The Construction (Design and Management) Regulations 2015 only",
      "The Equality Act 2010 only",
      "The Health and Safety at Work Act 1974",
      "The Mental Health Act 1983"
    ],
    correctIndex: 2,
    explanation: "The Health and Safety at Work Act 1974 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare of their employees. This duty of care explicitly includes mental health as well as physical health. The Equality Act 2010 also provides protection for people with mental health conditions that constitute disabilities, and the Management of Health and Safety at Work Regulations 1999 require risk assessments that include psychosocial hazards. Together, these create a robust legal framework for workplace mental health."
  }
];

const faqs = [
  {
    question: "Is mental health really that big a problem in construction specifically?",
    answer: "Yes. Construction consistently has one of the highest suicide rates of any industry in the UK. ONS data shows that male construction workers are approximately three times more likely to die by suicide than the male national average. The industry also has higher-than-average rates of stress, anxiety, and depression. Factors unique to construction — job insecurity, time away from home, physically demanding work, tight deadlines, a culture that discourages talking about feelings, and the boom-and-bust nature of the industry — all contribute to this. The business case and the human case are both overwhelming."
  },
  {
    question: "Our company is small — can we really afford to invest in mental health?",
    answer: "You cannot afford NOT to. The Deloitte research shows a return of £5.30 for every £1 invested, but many of the most effective interventions cost very little or nothing. Having genuine conversations with your team costs nothing. Creating a culture where people feel safe to speak up costs nothing. Signposting people to free resources like the Lighthouse Club helpline (0345 605 1956) costs nothing. Training a mental health first aider costs a few hundred pounds and can transform an entire site. Small companies often have an advantage because relationships are closer and it is easier to spot when someone is struggling. Start small, start now, and build from there."
  },
  {
    question: "How do I convince senior management that mental health investment is worthwhile?",
    answer: "Use the language they understand: money, risk, and legal compliance. Present the Deloitte figures (£51 billion annual cost, £5.30 return per £1 invested). Highlight the legal obligations under the Health and Safety at Work Act 1974, the Equality Act 2010, and HSE stress management standards. Point to the construction skills shortage and explain that companies with strong mental health support attract and retain better talent. Show them competitor companies that are already investing (many Tier 1 contractors now require mental health provision from subcontractors). Frame it as risk management: the cost of a tribunal claim, an accident caused by a distracted worker, or losing your best operative to a competitor who offers better support far outweighs the cost of proactive investment."
  },
  {
    question: "What is the difference between presenteeism and leaveism?",
    answer: "Presenteeism is when someone comes to work despite being unwell (physically or mentally) and functions at reduced capacity. They are physically present but not fully productive, and on construction sites, they may be a safety risk. Leaveism is a newer concept — it refers to people using annual leave, rest days, or TOIL (time off in lieu) to deal with mental health difficulties rather than reporting them as sickness absence. Leaveism is particularly hidden because it does not show up in absence statistics. Both are signs that people do not feel safe enough to be honest about their mental health, and both cost employers significantly through reduced productivity and increased risk."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to Deloitte's 2024 research, poor mental health costs UK employers approximately how much per year?",
    options: [
      "£12 billion per year",
      "£28 billion per year",
      "£51 billion per year",
      "£75 billion per year"
    ],
    correctAnswer: 2,
    explanation: "Deloitte's 2024 report found that poor mental health costs UK employers approximately £51 billion per year. This figure includes the costs of absenteeism, presenteeism, and staff turnover. The average cost per employee is approximately £1,652 per year, making mental health one of the most significant hidden costs in any business."
  },
  {
    id: 2,
    question: "Which of the following is the MOST costly consequence of poor mental health in the workplace?",
    options: [
      "Absenteeism — people being off work entirely",
      "Presenteeism — people at work but functioning at reduced capacity",
      "Staff turnover — people leaving the company",
      "Recruitment costs — replacing people who have left"
    ],
    correctAnswer: 1,
    explanation: "Presenteeism is the single most costly consequence of poor mental health in the workplace, costing approximately twice as much as absenteeism. When someone is at work but struggling with their mental health, their productivity drops significantly, they make more errors, their decision-making is impaired, and on construction sites, they are at increased risk of accidents. Because presenteeism is invisible in absence statistics, many employers massively underestimate its impact."
  },
  {
    id: 3,
    question: "The HSE reported that approximately how many working days were lost to work-related stress, depression, and anxiety in a recent year?",
    options: [
      "5.2 million days",
      "10.8 million days",
      "17.1 million days",
      "25.3 million days"
    ],
    correctAnswer: 2,
    explanation: "The Health and Safety Executive (HSE) reported that approximately 17.1 million working days were lost to work-related stress, depression, and anxiety. This makes mental health the single largest cause of work-related absence in the UK, accounting for over half of all working days lost to ill health. In construction, the actual figure may be higher because of underreporting and the prevalence of self-employment."
  },
  {
    id: 4,
    question: "According to Deloitte, for every £1 spent on mental health support, employers get back:",
    options: [
      "£2.10",
      "£3.80",
      "£5.30",
      "£8.50"
    ],
    correctAnswer: 2,
    explanation: "Deloitte's research found an average return of £5.30 for every £1 invested in mental health support. This is one of the strongest returns on investment available to any business. The return comes from multiple sources: reduced absenteeism, lower presenteeism, decreased staff turnover, fewer accidents, less rework, lower recruitment costs, and improved productivity. Preventive measures and early interventions deliver the highest returns."
  },
  {
    id: 5,
    question: "Which UK legislation places a general duty of care on employers that includes mental health?",
    options: [
      "The Mental Health Act 1983",
      "The Health and Safety at Work Act 1974",
      "The Construction (Design and Management) Regulations 2015",
      "The Working Time Regulations 1998"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety at Work Act 1974 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare of all employees at work. 'Health' in this context includes mental health. This means that employers who fail to address known psychosocial hazards in the workplace are potentially in breach of this fundamental piece of health and safety legislation."
  },
  {
    id: 6,
    question: "Under the Equality Act 2010, a mental health condition can be classified as a disability if it:",
    options: [
      "Has been formally diagnosed by a psychiatrist only",
      "Has a substantial and long-term adverse effect on the person's ability to carry out normal day-to-day activities",
      "Requires medication to manage",
      "Has caused the person to take more than four weeks off work"
    ],
    correctAnswer: 1,
    explanation: "Under the Equality Act 2010, a mental health condition is considered a disability if it has a substantial and long-term adverse effect on the person's ability to carry out normal day-to-day activities. 'Long-term' means lasting or likely to last at least 12 months. Conditions such as depression, anxiety disorders, bipolar disorder, and PTSD can all meet this threshold. Importantly, a formal psychiatric diagnosis is not always required — the test is the impact on daily functioning."
  },
  {
    id: 7,
    question: "What is 'leaveism' in the context of workplace mental health?",
    options: [
      "When an employer forces someone to take leave for mental health reasons",
      "When people use annual leave or rest days to manage mental health difficulties instead of reporting sickness absence",
      "When someone takes extended unpaid leave to recover from burnout",
      "When a company offers mental health leave as a formal benefit"
    ],
    correctAnswer: 1,
    explanation: "Leaveism occurs when employees use annual leave, rest days, or TOIL to manage mental health difficulties rather than declaring sickness absence. This is particularly problematic because it is hidden — it does not appear in absence statistics, so employers may believe their workforce is healthy when in reality people are using their holiday entitlement to cope. Leaveism is a sign that people do not feel safe disclosing their mental health difficulties, often due to stigma or fear of consequences."
  },
  {
    id: 8,
    question: "Which of the following is the STRONGEST argument for investing in workplace mental health?",
    options: [
      "It is only necessary to comply with legal requirements",
      "It is purely a moral obligation with no business benefit",
      "It combines a strong business case (ROI), legal compliance, and a moral imperative to support people",
      "It is mainly important for large companies with HR departments"
    ],
    correctAnswer: 2,
    explanation: "The case for investing in workplace mental health is compelling because it combines three powerful arguments: the business case (£5.30 return for every £1 invested, reduced absence, lower turnover, fewer accidents), the legal case (Health and Safety at Work Act 1974, Equality Act 2010, HSE stress management standards), and the human case (improved morale, stronger teams, people staying in the industry, lives saved). No other investment offers this combination of financial return, legal compliance, and human benefit."
  }
];

export default function MentalHealthModule5Section1() {
  useSEO({
    title: "The Business Case for Mental Health | Mental Health Module 5.1",
    description: "Understand the financial, legal, and human case for investing in workplace mental health in the construction industry. Deloitte research, HSE data, and UK legislation explained.",
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Business Case for Mental Health
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why investing in mental health is not just the right thing to do &mdash; it is the smart thing to do, and the law requires it
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Cost:</strong> Poor MH costs UK employers £51bn/year (Deloitte 2024)</li>
              <li><strong>ROI:</strong> Every £1 spent returns £5.30 on average</li>
              <li><strong>Legal:</strong> Duty of care includes mental health under HSWA 1974</li>
              <li><strong>Human:</strong> Lives saved, people staying in the industry</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In Construction</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Average cost:</strong> £1,652 per employee per year</li>
              <li><strong>Presenteeism:</strong> Costs 2x more than absenteeism</li>
              <li><strong>Safety:</strong> Distracted workers have more accidents</li>
              <li><strong>Skills shortage:</strong> Good MH support retains and attracts talent</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain the financial cost of poor mental health to UK employers and the construction industry",
              "Distinguish between absenteeism, presenteeism, and leaveism and their relative costs",
              "Articulate the return on investment for mental health programmes using Deloitte data",
              "Identify the key UK legislation that requires employers to address workplace mental health",
              "Describe the human benefits of investing in mental health beyond the financial case",
              "Build a compelling case for mental health investment to present to senior management"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Cost of Poor Mental Health */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Cost of Poor Mental Health
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mental health is not a soft issue. It is not a nice-to-have. It is a
                <strong> hard-edged business issue</strong> that affects every company in the UK, and the
                construction industry is hit harder than most. The numbers are stark, and they demand
                attention.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <PoundSterling className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Deloitte 2024 &mdash; The Headline Figures</p>
                </div>
                <p className="text-base text-white leading-relaxed">
                  Poor mental health costs UK employers approximately <strong>£51 billion per year</strong>.
                  That is not a misprint. Fifty-one billion pounds. Every single year.
                </p>
                <p className="text-sm text-white mt-2">
                  This breaks down to an average cost of <strong>£1,652 per employee per year</strong> across
                  the UK workforce. In construction, where the workforce is predominantly male, where the
                  culture has historically discouraged openness, and where the work itself carries unique
                  stressors, the per-employee cost is likely even higher.
                </p>
              </div>

              <p>
                The £51 billion figure comprises three main components. <strong>Absenteeism</strong> &mdash;
                people being off work due to mental health conditions &mdash; accounts for a significant
                portion. But it is not the biggest cost. <strong>Presenteeism</strong> &mdash; people coming
                to work while struggling with their mental health &mdash; costs employers approximately
                <strong> twice as much as absenteeism</strong>. The third component is <strong>staff
                turnover</strong> &mdash; people leaving their jobs because of mental health difficulties
                or because of a workplace culture that fails to support them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction-Specific Costs</p>
                <p className="text-sm text-white mb-3">
                  In construction, poor mental health creates additional costs that many other industries
                  do not face:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Accidents and injuries</strong> &mdash; A worker whose concentration is impaired by depression, anxiety, or sleep deprivation is significantly more likely to have an accident. On a construction site, accidents can be fatal. The cost of a serious accident — in human terms, legal terms, and financial terms — is enormous.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Rework and defects</strong> &mdash; When someone is not functioning at their best, the quality of their work suffers. Electrical installations done by a distracted worker may fail inspection, requiring costly rework. Mistakes in construction can be extremely expensive to rectify.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Staff turnover and recruitment</strong> &mdash; Replacing a skilled electrician costs an estimated £10,000–£30,000 when you factor in recruitment, training, lost productivity during the vacancy, and the time it takes a new person to reach full effectiveness. In a skills shortage, losing good people is devastating.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Programme delays</strong> &mdash; When key people are absent or underperforming, programmes slip. Delays have a cascade effect on the whole project and can trigger liquidated damages.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Insurance and litigation</strong> &mdash; Higher accident rates lead to higher insurance premiums. Failure to address mental health can also lead to employment tribunal claims, personal injury claims, and HSE enforcement action.</span>
                  </li>
                </ul>
              </div>

              <p>
                These are not abstract numbers. They represent real money leaving real companies, every
                single day. They represent projects running over budget, skilled workers leaving the
                industry, and &mdash; in the worst cases &mdash; people being seriously injured or killed
                because their mental state was not right and nobody noticed or nobody acted.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Absenteeism vs Presenteeism */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Absenteeism vs Presenteeism
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the difference between absenteeism, presenteeism, and leaveism is critical
                for any construction company that wants to address mental health effectively. Each has
                different characteristics, different costs, and different solutions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-2">Absenteeism</p>
                    <p className="text-sm text-white mb-2">
                      People being completely absent from work due to mental health conditions.
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span><strong>HSE data:</strong> 17.1 million working days lost per year to stress, depression, and anxiety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Largest single cause of work-related absence in the UK</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Average 23.3 days off per case</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span><strong>Visible</strong> — shows up in absence records and is therefore measurable</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                    <p className="text-amber-400 font-semibold text-sm mb-2">Presenteeism</p>
                    <p className="text-sm text-white mb-2">
                      People coming to work while struggling with their mental health.
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong>Costs 2x more</strong> than absenteeism (Deloitte)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Reduced productivity, impaired concentration, poor decision-making</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Increased errors and safety risk on construction sites</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong>Invisible</strong> — does not show up in absence statistics, so massively underestimated</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <p className="text-purple-400 font-semibold text-sm mb-2">Leaveism</p>
                    <p className="text-sm text-white mb-2">
                      People using annual leave or rest days to manage mental health difficulties.
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Using holiday entitlement to cope rather than recover</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Working on rest days to catch up after struggling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Sign that people do not feel safe disclosing MH difficulties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span><strong>Completely hidden</strong> — masked in holiday records, impossible to track without trust</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Construction Site Reality</p>
                </div>
                <p className="text-sm text-white">
                  On a construction site, presenteeism is not just a productivity issue &mdash; it is a
                  <strong> safety issue</strong>. An electrician working at height while their concentration
                  is impaired by anxiety is a danger to themselves and everyone around them. A worker
                  operating machinery while exhausted from insomnia caused by depression could cause a
                  fatal accident. A supervisor making decisions while overwhelmed by stress may miss
                  critical safety checks. The construction industry cannot afford to ignore presenteeism
                  because the consequences are measured not just in pounds but in lives.
                </p>
              </div>

              <p>
                The HSE figures are striking: <strong>17.1 million working days</strong> lost to
                work-related stress, depression, and anxiety in a recent year. That makes mental health
                the single largest cause of work-related absence in the UK, accounting for over half of
                all working days lost to ill health. And that is just absenteeism &mdash; the visible
                part. When you add presenteeism and leaveism, the true scale of the problem is far
                greater than any official statistics suggest.
              </p>

              <p>
                In construction specifically, there is an additional complication: the high proportion
                of self-employed workers. Self-employed people do not have access to occupational health
                services, Employee Assistance Programmes, or company sick pay. When they are struggling,
                they either work through it (presenteeism) or lose income. This means the true cost of
                poor mental health in construction is almost certainly higher than the cross-industry
                averages suggest.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Return on Investment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Return on Investment
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The cost of poor mental health is enormous. But here is the good news: <strong>investing
                in mental health delivers one of the strongest returns on investment available to any
                business</strong>. This is not wishful thinking &mdash; it is backed by rigorous research
                from Deloitte, the London School of Economics, and multiple other respected institutions.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Deloitte ROI Figure</p>
                </div>
                <p className="text-base text-white leading-relaxed">
                  For every <strong>£1 invested</strong> in mental health support, employers receive an
                  average return of <strong>£5.30</strong>.
                </p>
                <p className="text-sm text-white mt-2">
                  This 5.3:1 return makes mental health investment one of the most financially
                  compelling investments a construction company can make. It outperforms many traditional
                  business investments and delivers returns through multiple channels simultaneously.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Where the Return Comes From</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Reduced absenteeism</strong> &mdash; People with access to early support have shorter and less frequent absences. Catching problems early prevents them becoming crises that require months off work.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Lower presenteeism</strong> &mdash; When people feel supported, they are more likely to seek help early and more likely to be genuinely productive when at work. Creating a culture where it is acceptable to say &ldquo;I am struggling&rdquo; means problems get addressed rather than hidden.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Decreased staff turnover</strong> &mdash; Companies that invest in mental health retain more of their skilled workforce. In an industry facing chronic skills shortages, this is enormously valuable. The cost of replacing a skilled electrician can exceed £20,000.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Fewer accidents</strong> &mdash; A mentally healthy workforce is a safer workforce. Better concentration, better decision-making, and better communication all contribute to fewer accidents and near misses.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Less rework</strong> &mdash; Better mental health leads to better quality work. Fewer defects mean less costly rework and fewer programme delays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Lower insurance premiums</strong> &mdash; Fewer accidents and claims lead to lower employer&rsquo;s liability and public liability premiums over time.</span>
                  </li>
                </ul>
              </div>

              <p>
                Deloitte&rsquo;s research also found that <strong>preventive measures deliver the highest
                ROI</strong>. Reactive interventions (helping someone who is already in crisis) are
                important and necessary, but they are more expensive and less effective than prevention.
                Building a mentally healthy workplace &mdash; through culture change, training, and early
                intervention &mdash; prevents problems from developing in the first place and delivers the
                best financial returns.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction Companies Leading the Way</p>
                <p className="text-sm text-white mb-3">
                  Many forward-thinking construction companies have already invested in mental health and
                  are seeing real results:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Major contractors are now training mental health first aiders on every site, seeing reductions in absence and improvements in retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Companies that have implemented Employee Assistance Programmes report that for every £1 spent, they save between £3 and £9 in reduced absence and turnover</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Firms that include mental health in site inductions report that workers feel more valued and are more likely to stay with the company</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Tier 1 contractors are increasingly requiring subcontractors to demonstrate mental health provision as part of pre-qualification — making it a competitive advantage</span>
                  </li>
                </ul>
              </div>

              <p>
                The message is clear: investing in mental health is not a cost &mdash; it is an
                investment that pays for itself many times over. Companies that treat it as an expense
                to be minimised are leaving money on the table and putting their people at risk.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Legal Obligations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Legal Obligations
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond the business case, employers have <strong>clear legal obligations</strong> to
                address mental health in the workplace. Ignorance of these obligations is not a defence,
                and the potential costs of non-compliance &mdash; through tribunal claims, HSE enforcement
                action, and personal injury litigation &mdash; can be enormous.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Key UK Legislation</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">Health and Safety at Work Act 1974</p>
                    <p className="text-sm text-white">
                      Section 2 places a general duty on employers to ensure, so far as is reasonably
                      practicable, the health, safety, and welfare at work of all their employees.
                      <strong> &ldquo;Health&rdquo; in this context explicitly includes mental health.</strong> This
                      means that employers must take reasonable steps to prevent work from damaging their
                      employees&rsquo; mental health and to provide a working environment that supports
                      psychological wellbeing.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">Management of Health and Safety at Work Regulations 1999</p>
                    <p className="text-sm text-white">
                      Regulation 3 requires employers to carry out suitable and sufficient risk assessments
                      of all significant workplace hazards. <strong>Stress is a recognised workplace
                      hazard</strong>, and the HSE has been clear that risk assessments must include
                      psychosocial hazards such as excessive workload, lack of control, poor relationships,
                      role ambiguity, and poorly managed change. Failure to include mental health in your
                      risk assessment process is a breach of these regulations.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">Equality Act 2010</p>
                    <p className="text-sm text-white">
                      Mental health conditions can constitute a disability under the Equality Act 2010 if
                      they have a <strong>substantial and long-term adverse effect</strong> on a person&rsquo;s
                      ability to carry out normal day-to-day activities. &ldquo;Long-term&rdquo; means lasting
                      or likely to last at least 12 months. Conditions such as clinical depression, anxiety
                      disorders, bipolar disorder, PTSD, and OCD can all meet this threshold. Employers have
                      a duty to make reasonable adjustments for disabled employees and must not discriminate
                      against them.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">HSE Stress Management Standards</p>
                    <p className="text-sm text-white">
                      The HSE has published Management Standards that cover six key areas of work design that,
                      if not properly managed, are associated with poor health, lower productivity, and
                      increased sickness absence. These six areas are: <strong>demands, control, support,
                      relationships, role, and change</strong>. While the Management Standards are not
                      themselves legally binding, they represent good practice that the HSE uses as a
                      benchmark when investigating complaints and enforcing the law.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Cost of Non-Compliance</p>
                </div>
                <p className="text-sm text-white">
                  The financial consequences of failing to meet legal obligations can be severe.
                  Employment tribunal claims for disability discrimination can result in
                  <strong> unlimited compensation</strong> awards. Personal injury claims for
                  work-related stress can result in six-figure settlements. HSE enforcement action
                  can lead to improvement notices, prohibition notices, and criminal prosecution.
                  Beyond the direct costs, there is the reputational damage &mdash; which in an
                  industry that relies heavily on reputation and relationships can be devastating.
                  One high-profile case can cost a company contracts worth millions.
                </p>
              </div>

              <p>
                The legal framework is clear: employers must take reasonable steps to protect the
                mental health of their employees. This is not optional. It is not a nice-to-have.
                It is the law. And the consequences of ignoring it are becoming increasingly severe
                as courts and tribunals become more sophisticated in their understanding of mental
                health in the workplace.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: The Human Case */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Human Case
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The financial case is compelling. The legal case is clear. But the most powerful case
                for investing in mental health is the <strong>human case</strong>. Behind every statistic
                is a real person &mdash; someone&rsquo;s colleague, someone&rsquo;s partner, someone&rsquo;s
                parent, someone&rsquo;s child. And the construction industry is losing too many of them.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Human Impact</p>
                </div>
                <p className="text-sm text-white">
                  Male construction workers are approximately <strong>three times more likely to die by
                  suicide</strong> than the male national average (ONS data). The construction industry
                  loses more people to suicide than to falls from height, the industry&rsquo;s most
                  common fatal accident category. These are not just statistics &mdash; they are
                  fathers, brothers, sons, partners, and friends. Every single one of these deaths
                  is a tragedy, and many of them are preventable.
                </p>
              </div>

              <p>
                When a company genuinely invests in mental health &mdash; not just ticking boxes, but
                truly creating a culture where people are supported &mdash; the human benefits are
                transformative:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Beyond the Numbers</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Improved morale</strong> &mdash; When people feel that their employer genuinely cares about their wellbeing, morale improves. People work harder, care more about quality, and are more willing to go the extra mile. This is not about pizza Fridays or motivational posters &mdash; it is about genuine, sustained investment in people.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Better team cohesion</strong> &mdash; Teams that can talk openly about how they are feeling are stronger teams. Trust increases, communication improves, and people look out for each other. On a construction site, this directly improves safety and productivity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Stronger safety culture</strong> &mdash; Mental health and safety are inseparable. A workforce that feels psychologically safe is more likely to report near misses, challenge unsafe practices, and speak up when something is not right. This prevents accidents.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Reduced conflict</strong> &mdash; Many workplace conflicts have mental health at their root. When people are stressed, anxious, or depressed, they are more irritable, less patient, and more likely to clash with colleagues. Supporting mental health reduces conflict and creates a more harmonious workplace.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>People staying in the industry</strong> &mdash; Construction is facing a chronic skills shortage. The industry needs to attract and retain talent. Younger workers, in particular, expect employers to take mental health seriously. Companies that do not offer mental health support will increasingly struggle to recruit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Attracting new talent</strong> &mdash; The construction industry needs to attract people from diverse backgrounds to address the skills shortage. A reputation for caring about mental health makes the industry more attractive to potential recruits, including those who might otherwise choose a different career path.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Lives saved</strong> &mdash; This is the most important point. When people are supported, when they know where to turn, when the culture allows them to ask for help &mdash; lives are saved. Every person who gets help instead of suffering in silence is a victory. Every suicide prevented is a family that stays whole.</span>
                  </li>
                </ul>
              </div>

              <p>
                The construction skills shortage is one of the industry&rsquo;s most pressing challenges.
                The CITB estimates that the industry needs to attract over 225,000 new workers by 2027
                to meet demand. Mental health is directly linked to this challenge: people leave the
                industry because of poor mental health, and potential recruits are deterred by the
                industry&rsquo;s reputation for a tough, unforgiving culture. Investing in mental health
                is not just about supporting your current workforce &mdash; it is about securing the
                future of the industry itself.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established why mental health matters to the construction industry
                &mdash; from a financial, legal, and human perspective. The case for action is
                overwhelming, and the cost of inaction is unacceptable.
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The financial case:</strong> Poor mental health costs UK employers £51 billion per year. The average cost per employee is £1,652/year. Presenteeism costs twice as much as absenteeism.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The ROI:</strong> Every £1 invested in mental health returns £5.30 on average. Preventive measures deliver the highest returns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Absenteeism, presenteeism, leaveism:</strong> All three cost employers, but presenteeism and leaveism are hidden and therefore often underestimated.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Legal obligations:</strong> The HSWA 1974, the Management Regs 1999, and the Equality Act 2010 all require employers to address mental health. Non-compliance can lead to unlimited compensation awards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The human case:</strong> Improved morale, stronger teams, better safety, reduced conflict, people staying in the industry, and lives saved.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Construction-specific:</strong> The industry faces unique challenges (high suicide rates, skills shortage, safety-critical work) that make mental health investment especially urgent.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will explore how to create
                  a culture of openness around mental health &mdash; from leadership role modelling and mental
                  health champions to normalising the conversation and actively challenging stigma. Knowing
                  the business case is essential, but it is culture change that turns knowledge into action.
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
          title="Section 1 Knowledge Check"
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
            <Link to="../mental-health-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-5-section-2">
              Next: Creating a Culture of Openness
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}