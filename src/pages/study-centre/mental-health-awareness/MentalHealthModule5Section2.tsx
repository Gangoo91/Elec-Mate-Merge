import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Users, Shield, MessageCircle, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh5s2-culture-characteristic",
    question: "Which of the following is the MOST important characteristic of a mentally healthy workplace culture?",
    options: [
      "Having a written mental health policy displayed in the site office",
      "People feeling safe to talk about their mental health without fear of negative consequences",
      "Providing free gym memberships and fruit bowls in the canteen",
      "Having a dedicated mental health budget of at least £10,000 per year"
    ],
    correctIndex: 1,
    explanation: "While policies, budgets, and perks all have their place, the single most important characteristic of a mentally healthy workplace is psychological safety — people feeling safe to talk about their mental health without fear of judgement, ridicule, or negative career consequences. Without this foundation, policies go unused, training is forgotten, and resources sit untouched. Creating this safety requires consistent action from leaders at every level, not just written commitments."
  },
  {
    id: "mh5s2-mhfa-role",
    question: "What is the PRIMARY role of a Mental Health First Aider on a construction site?",
    options: [
      "To diagnose mental health conditions and prescribe treatment",
      "To replace the need for professional mental health services",
      "To provide initial support in a crisis and signpost people to appropriate professional help",
      "To monitor employees and report concerns to management"
    ],
    correctIndex: 2,
    explanation: "A Mental Health First Aider is trained to provide initial support to someone who may be experiencing a mental health issue or crisis, and to signpost them to appropriate professional help. They are NOT trained to diagnose conditions, provide therapy, or replace professional services. Think of them like a physical first aider — they stabilise the situation and get the person to the right help. They also play a vital role in raising awareness and reducing stigma simply by being visible and approachable."
  },
  {
    id: "mh5s2-stigma-approach",
    question: "When challenging mental health stigma on a construction site, which approach is MOST effective?",
    options: [
      "Publicly confronting and shaming anyone who makes stigmatising comments",
      "Ignoring stigmatising behaviour because challenging it causes conflict",
      "Educating people firmly but respectfully, creating allies rather than enforcers",
      "Only addressing stigma during formal training sessions, not on the job"
    ],
    correctIndex: 2,
    explanation: "The most effective approach to challenging stigma is to be firm but respectful — calling out harmful behaviour without humiliating the person. The goal is to create allies, not enemies. Publicly shaming people creates resentment and resistance. Ignoring stigma allows it to flourish. Limiting challenges to formal training sessions misses the daily moments where culture is actually shaped. The best approach is to address it in the moment, calmly and consistently, explaining why the behaviour is harmful and offering a better alternative."
  }
];

const faqs = [
  {
    question: "What if senior leaders are resistant to talking about mental health?",
    answer: "Start with the business case — the financial data from Deloitte (£51bn cost, £5.30 ROI per £1 invested) and the legal obligations are often more persuasive with senior leaders than emotional arguments alone. Find one senior leader who is willing to be a champion and work with them to demonstrate the impact. Share examples from competitor companies and major clients who already prioritise mental health. Sometimes external pressure works too — many Tier 1 contractors now require evidence of mental health provision from subcontractors. Most importantly, be patient but persistent. Culture change starts from the top, but sometimes it needs a push from below."
  },
  {
    question: "How many Mental Health First Aiders should we have per site?",
    answer: "There is no legal minimum, but MHFA England recommends at least one Mental Health First Aider for every 50 employees as a good baseline. For construction sites, where workers are spread across different areas and shifts, you may need more to ensure there is always someone available and accessible. It is also important to have representation across different trades and levels — a mental health first aider who is a fellow electrician may be more approachable than one from management. Remember that Mental Health First Aiders need support too — regular supervision, refresher training, and recognition of the emotional toll the role can take."
  },
  {
    question: "How do we get buy-in from older workers who see mental health talk as 'soft'?",
    answer: "This is one of the biggest challenges in construction, and it requires a thoughtful approach. Do not lecture or patronise — instead, use language and examples that resonate. Frame mental health in terms older workers understand: 'looking out for your mates,' 'having each other's backs,' 'staying sharp and safe.' Use real stories, ideally from people in the industry they can relate to. Acknowledge that the culture they grew up in was different, and that asking them to change is not saying they were wrong — it is saying the world has moved on and we know better now. Many older workers, once they understand the issue, become some of the strongest advocates because they have personally seen colleagues suffer in silence."
  },
  {
    question: "What is the difference between awareness and culture change?",
    answer: "Awareness is knowing that mental health matters. Culture change is doing something about it, every day. Awareness is a poster on the wall. Culture change is a supervisor noticing someone is quiet and genuinely asking if they are okay. Awareness is a one-off training session. Culture change is mental health being discussed in every toolbox talk, every site induction, every performance review. Awareness is the starting point — it is essential, but it is not enough on its own. Culture change requires sustained, visible, consistent action from leaders at every level. It takes years, not weeks, but the results are transformative."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following BEST describes a mentally healthy workplace culture?",
    options: [
      "A workplace where nobody ever experiences stress or mental health difficulties",
      "A workplace where mental health is treated with the same importance as physical health and people feel safe to seek support",
      "A workplace that has a written mental health policy and displays helpline posters",
      "A workplace where managers are trained to identify and diagnose mental health conditions"
    ],
    correctAnswer: 1,
    explanation: "A mentally healthy workplace is NOT one where nobody ever struggles — that is unrealistic. It is a workplace where mental health is treated with the same importance as physical health, where people feel safe to talk about their struggles without fear of judgement or negative consequences, where support is visible and accessible, and where leaders actively model openness. Policies and posters are good starting points, but culture is about what actually happens day to day."
  },
  {
    id: 2,
    question: "Why is leadership role modelling so important for mental health culture change?",
    options: [
      "Because leaders set budgets and can allocate money to mental health programmes",
      "Because employees look to leaders for cues about what is acceptable — if leaders are open about mental health, it gives others permission to be open too",
      "Because leaders are legally responsible for their employees' mental health",
      "Because leaders are more likely to have mental health difficulties than other workers"
    ],
    correctAnswer: 1,
    explanation: "Leadership role modelling is crucial because employees take their cues from the people above them. If a senior manager shares their own experience of stress or anxiety, it sends a powerful message: 'If someone at that level can talk about it, so can I.' Conversely, if leaders dismiss mental health or never mention it, the message is that it is not taken seriously here. Leaders set the tone for the entire organisation through their words and actions."
  },
  {
    id: 3,
    question: "A Mental Health First Aider on a construction site is trained to:",
    options: [
      "Diagnose mental health conditions and recommend appropriate medication",
      "Provide ongoing counselling and therapy to colleagues who are struggling",
      "Recognise the signs of mental health difficulties, provide initial support, and signpost to professional help",
      "Monitor the workforce and compile reports on mental health for management"
    ],
    correctAnswer: 2,
    explanation: "Mental Health First Aiders are trained to recognise the signs that someone may be experiencing a mental health issue, to provide initial support and reassurance, and to guide the person towards appropriate professional help. They are NOT qualified to diagnose conditions, prescribe treatment, provide therapy, or act as surveillance for management. Their role is analogous to a physical first aider — they provide immediate, initial support and ensure the person gets to the right professional help."
  },
  {
    id: 4,
    question: "Which of the following is an example of 'normalising the conversation' about mental health on a construction site?",
    options: [
      "Putting up a poster about the Samaritans helpline in the site office",
      "Including mental health as a regular topic in toolbox talks, not just during awareness weeks",
      "Sending an email about mental health during World Mental Health Day",
      "Adding a question about mental health to the annual staff survey"
    ],
    correctAnswer: 1,
    explanation: "Normalising the conversation means making mental health a regular, everyday topic — not something that only gets mentioned during awareness weeks or in response to incidents. Including it in toolbox talks is a powerful way to do this because it puts mental health alongside safety, quality, and other topics that are discussed routinely. Posters, emails, and surveys are all useful tools, but they are one-off or periodic actions. Normalising means consistent, ongoing integration into daily site life."
  },
  {
    id: 5,
    question: "When someone makes a stigmatising comment about mental health on site (for example, calling someone 'weak' for being stressed), the BEST response is to:",
    options: [
      "Report them immediately to HR for disciplinary action",
      "Ignore it — confronting it will only cause an argument",
      "Address it calmly and firmly in the moment, explaining why the comment is harmful and offering a different perspective",
      "Wait until the next toolbox talk and discuss stigma as a general topic without mentioning the specific incident"
    ],
    correctAnswer: 2,
    explanation: "The most effective response is to address it in the moment — calmly, firmly, and without aggression. Something like: 'I hear what you're saying, but actually, stress can affect anyone — it's not about being weak. If one of us was struggling, I'd want them to feel they could ask for help.' This approach challenges the behaviour without humiliating the person, opens the door to a conversation, and sends a message to everyone who heard the original comment. Reporting to HR for a first offence is disproportionate. Ignoring it signals acceptance. Waiting for a toolbox talk loses the teachable moment."
  },
  {
    id: 6,
    question: "What is the PRIMARY difference between a Mental Health Champion and a Mental Health First Aider?",
    options: [
      "Champions receive more extensive training than First Aiders",
      "Champions focus on awareness raising and signposting, while First Aiders are trained to provide initial support in a mental health crisis",
      "Champions are always managers, while First Aiders can be anyone",
      "Champions work at company level, while First Aiders work at site level"
    ],
    correctAnswer: 1,
    explanation: "The key difference is in the depth of training and the role itself. Mental Health Champions typically receive a half-day or one-day awareness course and focus on raising awareness, reducing stigma, and signposting people to support resources. Mental Health First Aiders receive a more intensive two-day training course from MHFA England and are trained to recognise signs of mental health issues, provide initial support in a crisis, and guide people towards professional help. Both roles are valuable, and many organisations have both."
  },
  {
    id: 7,
    question: "Peer support programmes in construction are effective because:",
    options: [
      "Peers can provide professional therapy and clinical interventions",
      "Workers are more likely to open up to someone who understands their world — same industry, same pressures, same language",
      "Peer supporters are cheaper than professional counsellors",
      "Peer support is a legal requirement under the Health and Safety at Work Act 1974"
    ],
    correctAnswer: 1,
    explanation: "Peer support works because of relatability and trust. Construction workers are more likely to open up to someone who understands the realities of their work — the early starts, the time away from home, the physical demands, the job insecurity, the culture. A peer supporter who has been through similar experiences can connect on a level that a professional from outside the industry may not. Peer support does not replace professional help — it complements it by creating a bridge that makes people more willing to seek help in the first place."
  },
  {
    id: 8,
    question: "Which statement about challenging mental health stigma is MOST accurate?",
    options: [
      "Stigma will disappear naturally as younger workers enter the industry",
      "Stigma can only be addressed through formal training programmes",
      "Challenging stigma requires sustained, consistent action at every level — from individual conversations to organisational culture change",
      "Stigma is too deeply embedded in construction culture to change"
    ],
    correctAnswer: 2,
    explanation: "Challenging stigma is not a one-off action or something that will happen on its own. It requires sustained, consistent effort at every level: individuals calling out harmful language, supervisors modelling openness, organisations embedding mental health into their culture, and the industry as a whole shifting its norms. Younger workers may be more comfortable talking about mental health, but stigma will not disappear without active effort. Formal training is important but insufficient on its own — culture is changed in the daily moments between training sessions."
  }
];

export default function MentalHealthModule5Section2() {
  useSEO({
    title: "Creating a Culture of Openness | Mental Health Module 5.2",
    description: "Learn how to build a workplace culture where mental health is discussed openly, leaders model vulnerability, and stigma is actively challenged in construction.",
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Creating a Culture of Openness
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How to build a workplace where mental health is discussed openly, leaders model vulnerability, and stigma has nowhere to hide
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Culture:</strong> People feel safe to talk about mental health</li>
              <li><strong>Leaders:</strong> Model vulnerability and prioritise wellbeing</li>
              <li><strong>Champions:</strong> Trained people who signpost and support</li>
              <li><strong>Action:</strong> Challenge stigma actively, not passively</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">On a Construction Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Toolbox talks:</strong> Include mental health regularly</li>
              <li><strong>Inductions:</strong> Introduce MH support from day one</li>
              <li><strong>First Aiders:</strong> Visible, approachable, trained</li>
              <li><strong>Culture shift:</strong> &ldquo;Looking out for your mates&rdquo; includes their mind</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Describe the characteristics of a mentally healthy workplace culture in construction",
              "Explain why leadership role modelling is essential for mental health culture change",
              "Distinguish between the roles of Mental Health Champions and Mental Health First Aiders",
              "Identify practical ways to normalise mental health conversations on construction sites",
              "Apply effective strategies for challenging stigma without creating conflict",
              "Recognise the difference between awareness (knowing) and culture change (doing)"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Does a Mentally Healthy Culture Look Like? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            What Does a Mentally Healthy Culture Look Like?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A mentally healthy workplace culture is not one where nobody ever struggles. That is
                impossible and unrealistic. It is a culture where <strong>people feel safe to be honest
                about how they are feeling</strong>, where support is visible and accessible, and where
                mental health is treated with the same seriousness as physical health and safety.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Psychological Safety</p>
                </div>
                <p className="text-sm text-white">
                  The foundation of a mentally healthy culture is <strong>psychological safety</strong> &mdash;
                  a term coined by Harvard professor Amy Edmondson. It means that people believe they will
                  not be punished, humiliated, or sidelined for speaking up about their mental health. On
                  a construction site, this means an electrician can tell their supervisor they are struggling
                  without fear that they will be seen as weak, moved off the job, or treated differently by
                  their mates. Without psychological safety, every other intervention is undermined.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Characteristics of a Mentally Healthy Culture</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>People feel safe to talk</strong> &mdash; Not everyone will choose to share personal details, and that is fine. But they know that IF they need to, they can. There are no negative consequences for being honest.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Mental health is treated like physical health</strong> &mdash; Just as nobody is judged for having a broken leg, nobody is judged for having depression. If someone needs time off for their mental health, it is treated with the same respect as time off for a physical injury.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Leaders model vulnerability</strong> &mdash; Senior people are visibly open about their own mental health. They talk about the pressures they face, the times they have struggled, and the support that helped them. This gives everyone else permission to do the same.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Support is visible and accessible</strong> &mdash; People know where to go for help. Helpline numbers are displayed prominently. Mental health first aiders are identifiable. The process for accessing support is simple and well-known.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Stigma is actively challenged</strong> &mdash; When someone makes a dismissive or stigmatising comment, it is addressed. Not aggressively, but firmly and consistently. The culture does not tolerate attitudes that prevent people from seeking help.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>It is embedded in daily operations</strong> &mdash; Mental health is not a box-ticking exercise or an annual awareness event. It is woven into site inductions, toolbox talks, one-to-ones, risk assessments, and the everyday way people interact. It is how business is done, not an add-on.</span>
                  </li>
                </ul>
              </div>

              <p>
                Creating this culture in construction is arguably harder than in any other industry.
                The traditional site culture values toughness, stoicism, and &ldquo;getting on with
                it.&rdquo; Many workers have spent decades in an environment where admitting to
                struggle was seen as weakness. Changing this does not happen overnight &mdash; it
                takes consistent, visible, genuine effort from everyone, especially leaders. But it
                is possible, and many construction companies are proving it can be done.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Leadership Role Modelling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Leadership Role Modelling
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Culture change in any organisation starts at the top. If senior leaders do not
                visibly champion mental health, no amount of posters, training courses, or helpline
                numbers will make a meaningful difference. Workers take their cues from the people
                above them. If those people never mention mental health, the message is clear:
                <strong> it is not important here.</strong>
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Leadership Role Modelling Looks Like</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Sharing personal experiences</strong> &mdash; A managing director who stands up at a company event and says &ldquo;I have struggled with anxiety, and here is what helped me&rdquo; does more for culture change than any policy document. It gives permission. It says: &ldquo;If someone at my level can be open about this, so can you.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Visible participation in training</strong> &mdash; When senior leaders attend mental health training themselves &mdash; not just sign off on it for others &mdash; it demonstrates that this is a priority, not just a compliance exercise. If the site manager sits in the toolbox talk on mental health, it sends a message.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Genuine check-ins</strong> &mdash; Not the cursory &ldquo;you alright, mate?&rdquo; as you walk past, but actually stopping, making eye contact, and listening to the answer. Learning the difference between someone who says &ldquo;yeah, fine&rdquo; and means it, and someone who says it because they do not feel safe being honest.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Admitting when they are struggling</strong> &mdash; Leaders who say &ldquo;this has been a tough week for me&rdquo; or &ldquo;I did not sleep well because I was worried about the project&rdquo; normalise the experience. It shows that stress and difficulty are part of being human, not signs of inadequacy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Allocating budget and time</strong> &mdash; Talk is cheap. Real commitment means allocating budget for training, allowing time in the programme for toolbox talks on mental health, paying for MHFA training, and investing in Employee Assistance Programmes. Resources follow priorities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Walking the talk</strong> &mdash; The difference between lip service and genuine culture change is consistency. A leader who talks about mental health in a company presentation but never mentions it on site is not role modelling &mdash; they are performing. Workers spot the difference instantly.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Walking the Talk vs Lip Service</p>
                </div>
                <p className="text-sm text-white">
                  Construction workers are exceptionally good at spotting hypocrisy. If a company
                  puts up mental health posters but then pressures people to work excessive overtime,
                  the posters are meaningless. If a supervisor talks about openness but then mocks
                  someone for being stressed, the words are worse than worthless &mdash; they actively
                  damage trust. <strong>Authenticity is everything.</strong> It is better to do a few
                  things genuinely than to do many things superficially.
                </p>
              </div>

              <p>
                Leadership role modelling does not require leaders to share their deepest personal
                struggles (though some choose to, with powerful effect). It simply requires them to
                <strong> treat mental health as a normal, important part of working life</strong>
                &mdash; to talk about it, to ask about it, to act on it, and to make it clear through
                their behaviour that people who seek help will be supported, not penalised.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Mental Health Champions and First Aiders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Mental Health Champions and First Aiders
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Two of the most effective roles for embedding mental health support on construction
                sites are <strong>Mental Health Champions</strong> and <strong>Mental Health First
                Aiders</strong>. While the names are sometimes used interchangeably, they are
                distinct roles with different levels of training and responsibility.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-rose-400" />
                      <p className="text-rose-400 font-semibold text-sm">Mental Health Champions</p>
                    </div>
                    <p className="text-sm text-white mb-2">
                      Typically receive a half-day or one-day awareness course.
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Raise awareness of mental health across the workforce</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Signpost people to appropriate resources and support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Help reduce stigma through everyday conversations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Organise awareness activities and events</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Act as a visible point of contact for MH information</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <HandHeart className="h-5 w-5 text-blue-400" />
                      <p className="text-blue-400 font-semibold text-sm">Mental Health First Aiders</p>
                    </div>
                    <p className="text-sm text-white mb-2">
                      Trained through the MHFA England 2-day course.
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Recognise the signs and symptoms of common MH conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Provide initial support in a mental health crisis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Use the ALGEE action plan (Approach, Listen, Give support, Encourage, Encourage professional help)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Guide people towards appropriate professional help</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>All of the Champion role, plus crisis intervention skills</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Making Champions and First Aiders Effective</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Visibility</strong> &mdash; People need to know who their champions and first aiders are. Use lanyards, hard hat stickers, posters with photos and names, and introduce them during inductions. If nobody knows they exist, they cannot help.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Representation</strong> &mdash; Ideally, champions and first aiders should come from different trades, levels, and backgrounds so that everyone has someone they feel comfortable approaching. A fellow electrician may be more approachable than someone from a different trade or from management.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Ongoing support</strong> &mdash; Champions and first aiders need support too. The role can be emotionally demanding, especially when they are supporting someone in crisis. Regular supervision, refresher training (at least annually), and peer support for the supporters themselves are essential.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Numbers</strong> &mdash; MHFA England recommends at least one first aider per 50 employees. On construction sites, consider the layout, shift patterns, and subcontractor arrangements when deciding how many you need. Having too few means people cannot access support when they need it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Boundaries</strong> &mdash; Champions and first aiders must understand their boundaries. They are NOT counsellors, therapists, or diagnosticians. Their role is initial support and signposting. Trying to do more than they are trained for can be harmful to both the supporter and the person being supported.</span>
                  </li>
                </ul>
              </div>

              <p>
                Having Mental Health First Aiders on site is one of the single most impactful
                interventions a construction company can make. They provide a bridge between someone
                who is struggling and the professional help they need. They reduce the barrier to
                seeking help. And their visible presence on site sends a powerful message about the
                company&rsquo;s commitment to mental health.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Normalising the Conversation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Normalising the Conversation
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                For mental health to be genuinely supported in construction, it must become a
                <strong> normal, everyday topic</strong> &mdash; as routine as talking about safety,
                quality, or the weather. This means weaving mental health into the fabric of daily
                site life, not treating it as a special event or a box to be ticked.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Practical Ways to Normalise the Conversation</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Toolbox talks on mental health</strong> &mdash; Include mental health as a regular toolbox talk topic, not just during awareness weeks. Topics might include recognising stress, how to support a colleague, where to find help, coping with change, managing work-life balance, or dealing with financial worries. Treat it with the same seriousness as a safety toolbox talk.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Site inductions</strong> &mdash; Include mental health in every site induction. From their very first moment on site, every worker should know what mental health support is available, who the mental health first aiders are, and that this company takes mental health seriously. First impressions set expectations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Talk about it regularly</strong> &mdash; Do not save mental health for one week a year (World Mental Health Day in October or Mental Health Awareness Week in May). Mention it in team meetings, site briefings, and informal conversations. The more it is discussed, the more normal it becomes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Celebrate people who speak up</strong> &mdash; When someone has the courage to talk about their mental health (with their permission), acknowledge it. Recognise it as strength, not weakness. This encourages others to do the same.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Use stories and testimonials</strong> &mdash; Real stories from real construction workers are incredibly powerful. Videos, written testimonials, or even just someone willing to share their experience during a toolbox talk can have more impact than any amount of data or policy documents.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Peer support programmes</strong> &mdash; Formal peer support programmes, where trained volunteers support colleagues through shared experience, are growing in construction. They work because workers often find it easier to talk to someone who truly understands their world &mdash; the early starts, the travel, the physical demands, the job insecurity.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Language Matters</p>
                <p className="text-sm text-white">
                  In construction, how you frame mental health can make the difference between
                  engagement and resistance. Phrases like <strong>&ldquo;looking out for your
                  mates,&rdquo;</strong> <strong>&ldquo;having each other&rsquo;s backs,&rdquo;</strong>
                  and <strong>&ldquo;staying sharp and safe&rdquo;</strong> resonate more than
                  clinical language. You do not need to turn a toolbox talk into a therapy session.
                  You need to make it clear that being aware of your own mental state and the mental
                  state of the people around you is part of being a good tradesperson and a good
                  colleague &mdash; just like being aware of physical hazards.
                </p>
              </div>

              <p>
                The goal is to reach a point where asking a colleague &ldquo;how are you really
                doing?&rdquo; is as natural as asking &ldquo;have you done your risk assessment?&rdquo;
                That takes time and persistence, but every conversation, every toolbox talk, and every
                moment of genuine connection moves the culture in the right direction.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Challenging Stigma Actively */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Challenging Stigma Actively
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Stigma is the single biggest barrier to people seeking help for their mental health.
                In construction, stigma runs deep. The culture has historically valued toughness and
                stoicism, and admitting to mental health difficulties has been seen as a sign of
                weakness. Changing this requires <strong>active, sustained effort</strong> &mdash; it
                will not happen on its own.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How Stigma Shows Up on Construction Sites</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Dismissive language</strong> &mdash; &ldquo;Man up,&rdquo; &ldquo;toughen up,&rdquo; &ldquo;what have you got to be depressed about?&rdquo; &ldquo;It&rsquo;s just stress, get on with it.&rdquo; These phrases, often said casually and without malicious intent, are deeply damaging because they shut down conversation and reinforce the idea that mental health difficulties are not real or valid.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;Banter&rdquo; that crosses the line</strong> &mdash; Construction sites are known for banter, and much of it is harmless and helps build camaraderie. But when banter targets someone&rsquo;s mental health, mocks vulnerability, or creates an environment where people are afraid to show any weakness, it has crossed the line from bonding to bullying.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Assumptions about medication</strong> &mdash; Comments like &ldquo;he&rsquo;s on happy pills&rdquo; or &ldquo;she&rsquo;s a bit mental&rdquo; reduce complex health conditions to jokes. They make people less likely to seek treatment or to be open about the treatment they are already receiving.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Career fear</strong> &mdash; The belief that disclosing a mental health difficulty will damage career prospects, lead to being passed over for promotion, or result in being moved off a project. This fear is often well-founded, which makes challenging it even more important.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Effective Approaches to Challenging Stigma</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Be firm but respectful</strong> &mdash; The goal is to change behaviour, not to humiliate people. When someone makes a stigmatising comment, address it calmly: &ldquo;I get what you mean, but actually, depression is a real illness &mdash; it can hit anyone, even the strongest people I know.&rdquo; This challenges the behaviour without attacking the person.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Create allies, not enforcers</strong> &mdash; The aim is to bring people along, not to police them. When you educate someone about why their language matters, you are creating an ally who will spread the message further. When you shame or punish them, you create resentment and resistance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Educate older workers without alienating them</strong> &mdash; Many experienced construction workers grew up in a culture where mental health was never discussed. Telling them they have been &ldquo;doing it wrong&rdquo; for 30 years is counterproductive. Instead, frame it as: &ldquo;Things have changed, and we understand more now. You have probably seen colleagues suffer &mdash; let&rsquo;s make sure the next generation does not have to.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Address it in the moment</strong> &mdash; Saving the challenge for a formal setting loses the teachable moment. When you hear stigmatising language, address it there and then &mdash; briefly, calmly, and without making it a bigger deal than it needs to be.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Use relatable examples</strong> &mdash; Connecting mental health to experiences everyone can relate to is powerful. &ldquo;You know that feeling when the whole project is going wrong and you cannot sleep? That is stress affecting your mental health. Now imagine feeling like that every day for six months. That is what depression can feel like.&rdquo;</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Awareness vs Culture Change</p>
                <p className="text-sm text-white">
                  There is a crucial distinction between awareness and culture change. <strong>Awareness
                  is knowing that mental health matters. Culture change is doing something about it, every
                  day.</strong> Awareness is a poster on the welfare unit wall. Culture change is a
                  supervisor who genuinely checks in with their team every morning. Awareness is a one-off
                  training course. Culture change is mental health being part of every toolbox talk, every
                  induction, every conversation. Awareness is the starting point. Culture change is the
                  destination. And the distance between the two is measured in consistent, daily action.
                </p>
              </div>

              <p>
                Challenging stigma is uncomfortable work. It means having difficult conversations,
                risking social friction, and standing up when it would be easier to stay quiet. But
                every time someone challenges stigma &mdash; every time someone says &ldquo;actually,
                that is not okay&rdquo; or &ldquo;there is no shame in asking for help&rdquo; &mdash;
                the culture shifts a little. And those small shifts, accumulated over time, create
                the transformation that saves lives.
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
                This section has explored how to create a workplace culture where mental health
                is openly discussed, visibly supported, and actively protected. Culture change is
                the hardest part of the mental health journey, but it is also the most important.
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Psychological safety</strong> is the foundation &mdash; people must feel safe to talk without fear of negative consequences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Leadership role modelling</strong> is essential &mdash; culture change starts at the top. When leaders are open, it gives everyone permission.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Champions and First Aiders</strong> provide trained, visible support on site &mdash; at least 1 per 50 workers (MHFA England recommendation).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Normalising the conversation</strong> means weaving mental health into daily site life &mdash; toolbox talks, inductions, team meetings, not just awareness weeks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Challenging stigma</strong> requires firm but respectful action &mdash; creating allies, not enforcers. Every challenge shifts the culture.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Awareness is knowing; culture change is doing.</strong> The gap is bridged by consistent, daily, visible action at every level.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will look at the
                  practical policies and risk assessment frameworks that underpin a mentally healthy
                  workplace &mdash; from mental health policies and stress risk assessments to the
                  Thriving at Work standards and individual wellbeing action plans.
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
          title="Section 2 Knowledge Check"
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
            <Link to="../mental-health-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: The Business Case
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-5-section-3">
              Next: Policies and Risk Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}