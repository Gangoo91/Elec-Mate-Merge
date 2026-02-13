import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Heart, Shield, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh4s1-ongoing-support",
    question: "Why is it important to continue checking in with a colleague after their initial disclosure about mental health difficulties?",
    options: [
      "So you can report their progress to management on a weekly basis",
      "Because recovery is not linear and ongoing support shows genuine care, reducing the risk of relapse or deterioration",
      "To make sure they are not taking advantage of any workplace adjustments",
      "Because one conversation is usually enough to resolve most mental health problems"
    ],
    correctIndex: 1,
    explanation: "Recovery from mental health difficulties is rarely a straight line. There will be good days and bad days, steps forward and steps back. Continuing to check in shows that your concern was genuine, not performative. It also helps identify early signs of deterioration before a full relapse occurs. The key is to check in without being intrusive — a simple 'How are things going?' can be enough."
  },
  {
    id: "mh4s1-reasonable-adjustments",
    question: "Under the Equality Act 2010, which of the following would be considered a 'reasonable adjustment' for a construction worker experiencing depression?",
    options: [
      "Telling the entire team about their condition so everyone can help",
      "Removing them from site permanently until they are fully recovered",
      "Allowing temporary flexible start times to accommodate medication side-effects or therapy appointments",
      "Reducing their pay to reflect reduced productivity during their recovery"
    ],
    correctIndex: 2,
    explanation: "Under the Equality Act 2010, employers have a duty to make reasonable adjustments for workers with disabilities, which can include mental health conditions that have a substantial and long-term effect on day-to-day activities. Temporary flexible start times, modified duties, or adjusted hours are all examples of reasonable adjustments. Disclosing someone's condition without consent, removing them from work entirely, or reducing pay would all be inappropriate or potentially unlawful."
  },
  {
    id: "mh4s1-return-to-work",
    question: "When supporting a colleague's return to work after a period of mental health-related absence, what is the MOST important principle?",
    options: [
      "Get them back to full duties as quickly as possible so they feel normal again",
      "Plan the return carefully, use a phased approach, and hold regular check-ins during the first weeks",
      "Avoid mentioning their absence so they do not feel uncomfortable",
      "Assign them only the simplest tasks to avoid putting any pressure on them"
    ],
    correctIndex: 1,
    explanation: "The return to work after mental health-related absence should be carefully planned before the person comes back. A phased return — starting with reduced hours or modified duties and building up gradually — is recommended by the HSE and NICE. Regular check-ins during the first weeks help identify any difficulties early. Rushing someone back to full duties risks relapse, while being overly protective can undermine their confidence and sense of belonging in the team."
  }
];

const faqs = [
  {
    question: "How often should I check in with someone I'm supporting?",
    answer: "There is no fixed rule — it depends on the individual and the severity of their situation. In the early days after someone discloses a mental health difficulty, more frequent check-ins (perhaps daily or every couple of days) may be appropriate. As they stabilise, you might move to weekly. The key is to be led by the person themselves — ask them what level of support they would find helpful. Some people appreciate regular contact; others find it overwhelming. A good approach is to establish a routine (perhaps a brief chat at the start or end of the day) and let them know your door is always open. The worst thing you can do is check in intensively for the first week and then disappear."
  },
  {
    question: "What if my employer does not have a formal return-to-work process?",
    answer: "Many smaller construction firms and subcontractors do not have formal HR processes for managing returns to work after mental health absence. In this case, the practical steps remain the same — they just need to be managed informally by the supervisor or site manager. Have a private conversation before the person returns to discuss what support they need. Agree on a gradual return if possible. Check in regularly during the first weeks. The HSE website has free guidance and templates for return-to-work conversations that any employer can use, regardless of company size. If you are a supervisor or site manager, taking the initiative to create even a simple, informal process demonstrates genuine leadership and care."
  },
  {
    question: "What reasonable adjustments can realistically be made on a construction site?",
    answer: "Construction sites are often seen as inflexible environments, but there are more adjustments available than people realise. Flexible start and finish times can accommodate therapy appointments or medication side-effects (many antidepressants cause drowsiness in the morning). Temporary reassignment to less physically demanding or less isolated tasks can help. Reducing or eliminating overtime requirements for a period takes pressure off. Providing a quiet space for breaks away from the noise and bustle of site gives someone somewhere to decompress. Pairing someone with a supportive colleague rather than having them work alone can prevent isolation. Even small things like allowing someone to take a few minutes when they are struggling can make a significant difference. The Equality Act requires adjustments to be 'reasonable' — they do not need to be costly or disruptive, but they do need to be genuinely considered."
  },
  {
    question: "How do I support someone without making them feel singled out?",
    answer: "This is one of the most common concerns people have, and it is a valid one. Nobody wants to feel like they are being treated differently or that they have a spotlight on them. The best approach is to normalise support — make checking in a routine part of how you interact with your whole team, not just the person who is struggling. If you already have regular one-to-one catch-ups with your team members, then checking in with this person does not feel unusual. Keep conversations natural and private. Avoid asking 'How is your mental health today?' in front of others. Instead, a quiet 'Everything alright?' during a natural moment (tea break, walking between areas) feels much more organic. Treat them as a valued team member first, not as a patient or a problem to be managed."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "After a colleague discloses a mental health difficulty, which approach to follow-up support is MOST effective?",
    options: [
      "Having one conversation and then assuming they will come to you if they need more help",
      "Checking in daily for the first week and then stopping completely",
      "Providing consistent, ongoing support with regular but non-intrusive check-ins over weeks and months",
      "Telling their line manager immediately so the responsibility is transferred to someone more qualified"
    ],
    correctAnswer: 2,
    explanation: "Effective support is consistent and ongoing, not a one-off event. Recovery from mental health difficulties is not linear — there will be good and bad days. Regular but non-intrusive check-ins over an extended period show that your concern is genuine and help identify early signs of deterioration. A single conversation, or intensive support that suddenly stops, can actually make things worse."
  },
  {
    id: 2,
    question: "Under the Equality Act 2010, when does a mental health condition become a 'disability' requiring reasonable adjustments?",
    options: [
      "Only when a formal psychiatric diagnosis has been made by a consultant",
      "When the condition has a substantial and long-term adverse effect on the person's ability to carry out normal day-to-day activities",
      "Only when the person has been off work for more than four consecutive weeks",
      "Mental health conditions are never classified as disabilities under the Equality Act"
    ],
    correctAnswer: 1,
    explanation: "The Equality Act 2010 defines disability as a physical or mental impairment that has a substantial and long-term (lasting or likely to last 12 months or more) adverse effect on the person's ability to carry out normal day-to-day activities. A formal diagnosis is not required — what matters is the effect on the person. Depression, anxiety, PTSD, OCD, bipolar disorder, and schizophrenia can all qualify."
  },
  {
    id: 3,
    question: "Which of the following is NOT a recommended reasonable adjustment for a construction worker experiencing mental health difficulties?",
    options: [
      "Temporary flexible start times to accommodate medication effects",
      "A phased return to work with gradually increasing hours",
      "Informing all team members about the person's diagnosis so they can be supportive",
      "Providing access to a quiet space for breaks"
    ],
    correctAnswer: 2,
    explanation: "Disclosing someone's mental health diagnosis to the wider team without their explicit consent is a serious breach of confidentiality and could be unlawful under data protection legislation. The person should always be in control of who knows about their condition. Flexible start times, phased returns, and quiet break spaces are all appropriate and commonly recommended reasonable adjustments."
  },
  {
    id: 4,
    question: "When planning a colleague's return to work after mental health-related absence, what should happen BEFORE their first day back?",
    options: [
      "Nothing — just let them come back and see how it goes",
      "A return-to-work conversation to discuss adjustments, a phased plan, and what support will be in place",
      "A meeting with the full team to discuss how to treat the returning colleague",
      "A formal assessment by an occupational health specialist (this is legally required before any return)"
    ],
    correctAnswer: 1,
    explanation: "Best practice (recommended by the HSE and NICE) is to have a private return-to-work conversation before the person's first day back. This should cover what adjustments they need, whether a phased return is appropriate, what duties they will start with, who their point of contact is for support, and any concerns they have. Planning before the return reduces anxiety and prevents the common mistake of expecting someone to return to full duties immediately."
  },
  {
    id: 5,
    question: "A colleague returned to work two weeks ago after depression-related absence. They seem to be coping well but have become withdrawn in the last few days. What should you do?",
    options: [
      "Nothing — they probably just need time and space to readjust",
      "Report it to HR immediately as a potential relapse",
      "Have a quiet, private word to check in and see if they are OK, without making assumptions",
      "Tell other team members to keep an eye on them and report any concerns"
    ],
    correctAnswer: 2,
    explanation: "A change in behaviour (becoming withdrawn after initially coping well) can be an early sign that someone is struggling. The most appropriate response is to have a quiet, private conversation to check in — not to make assumptions about what is happening, but to give them the opportunity to talk if they want to. This is exactly the kind of day-to-day support that makes the difference between catching a setback early and allowing it to develop into a full relapse."
  },
  {
    id: 6,
    question: "Which of the following is something you should NOT do when supporting a colleague with mental health difficulties?",
    options: [
      "Check in regularly to see how they are doing",
      "Make assumptions about what tasks they can and cannot handle without asking them",
      "Include them in team activities and social events as normal",
      "Be patient when their recovery is slower than expected"
    ],
    correctAnswer: 1,
    explanation: "Making assumptions about what someone can or cannot do based on their mental health condition is both unhelpful and potentially discriminatory. Always ask the person directly what support they need and what they feel able to manage. Some people recovering from depression may want to take on challenging tasks as part of their recovery; others may need a lighter workload temporarily. The person themselves is always the best judge of their own capabilities."
  },
  {
    id: 7,
    question: "The HSE recommends phased returns to work after mental health-related absence. What does a phased return typically involve?",
    options: [
      "Returning to full hours immediately but with no overtime for the first month",
      "Starting with reduced hours or modified duties and gradually building back to the full role over an agreed period",
      "Working from home for the first month before returning to site",
      "Having a colleague supervise all their work for the first six weeks"
    ],
    correctAnswer: 1,
    explanation: "A phased return typically starts with reduced hours (perhaps half-days or three days per week) and/or modified duties (perhaps less physically demanding or less isolated tasks), gradually building back to the person's full role over an agreed period — usually two to six weeks, depending on the individual and the nature of their absence. The pace should be guided by how the person is coping, with regular check-ins to adjust the plan as needed."
  },
  {
    id: 8,
    question: "Why is it important to maintain normality when supporting a colleague with mental health difficulties?",
    options: [
      "Because pretending nothing has happened is the best way to help someone recover",
      "Because treating someone normally — including them in the team, having a laugh, giving them meaningful work — helps maintain their sense of identity and belonging",
      "Because if you treat them differently, other team members might start claiming mental health problems too",
      "Because the Equality Act requires you to treat everyone identically regardless of circumstances"
    ],
    correctAnswer: 1,
    explanation: "When someone is struggling with mental health difficulties, one of the greatest fears is losing their sense of identity and belonging. Being treated as 'the person with depression' rather than a valued team member can be deeply isolating. Maintaining normality — including them in team banter, inviting them to social events, giving them meaningful work, treating them as a colleague first — helps preserve their self-worth and sense of connection. This does not mean ignoring their needs, but it means ensuring that support does not come at the cost of their dignity."
  }
];

export default function MentalHealthModule4Section1() {
  useSEO({
    title: "Providing Ongoing Support | Mental Health Awareness Module 4.1",
    description: "Learn how to provide ongoing, consistent support for colleagues experiencing mental health difficulties, including reasonable adjustments, return-to-work planning, and day-to-day strategies for the construction industry.",
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
            <Link to="../mental-health-module-4">
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Providing Ongoing Support
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why support does not end with the first conversation, and how to walk alongside a colleague through recovery on site
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Follow-up matters:</strong> One conversation is never enough</li>
              <li><strong>Recovery is not linear:</strong> Expect good days and bad days</li>
              <li><strong>Reasonable adjustments:</strong> A legal duty under the Equality Act 2010</li>
              <li><strong>Your goal:</strong> Consistent, non-intrusive, long-term support</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">On a Construction Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Check in:</strong> A brief, genuine word goes a long way</li>
              <li><strong>Adjust:</strong> Flexible hours, modified duties, quiet breaks</li>
              <li><strong>Plan returns:</strong> Phased approach, not full duties from day one</li>
              <li><strong>Be patient:</strong> Recovery takes time and setbacks happen</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why ongoing support is more effective than a single conversation",
              "Describe the employer's duty to make reasonable adjustments under the Equality Act 2010",
              "Plan a phased return to work using HSE and NICE guidance",
              "Apply day-to-day support strategies that balance care with normality",
              "Identify common mistakes that undermine support and how to avoid them",
              "Recognise the difference between supporting someone and taking responsibility for their recovery"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Beyond the First Conversation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Beyond the First Conversation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a colleague opens up about their mental health, that conversation is not the end of
                the process &mdash; it is the <strong>beginning</strong>. One of the most common and damaging
                mistakes people make is having an initial supportive conversation and then assuming the job
                is done. Support is not a one-off event. It is an ongoing commitment.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Why Follow-Up Matters</p>
                <p className="text-base text-white leading-relaxed">
                  Research by Mind consistently shows that people who receive <strong>ongoing, consistent
                  support</strong> after disclosing mental health difficulties have significantly better outcomes
                  than those who receive a single supportive interaction. The initial conversation opens the
                  door &mdash; follow-up keeps it open.
                </p>
              </div>

              <p>
                The recovery journey is <strong>not linear</strong>. Mental health does not follow a neat
                upward trajectory from unwell to recovered. There will be good weeks and terrible weeks.
                Days when your colleague seems back to their old self, and days when they are visibly
                struggling. This is entirely normal. Depression, anxiety, PTSD, and other conditions
                fluctuate. Medication can take weeks to work and may cause side-effects. Therapy stirs
                up difficult emotions before it resolves them. Understanding this non-linear nature of
                recovery is essential for providing effective support.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How to Check In Without Being Intrusive</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Choose natural moments</strong> &mdash; tea breaks, walking between work areas, end of the day. Do not create formal, scheduled check-ins unless the person wants them.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Keep it casual</strong> &mdash; &ldquo;Alright, mate? How are things going?&rdquo; is often more effective than &ldquo;How is your mental health today?&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Respect their response</strong> &mdash; if they say &ldquo;Fine, thanks&rdquo; and clearly do not want to talk, accept it. Do not push. The fact that you asked matters.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Be consistent</strong> &mdash; checking in once and then disappearing for three weeks sends the message that you have lost interest. Regular, even brief, contact matters.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Balance care with autonomy</strong> &mdash; your role is to be available, not to take control. The person needs to feel that they are driving their own recovery, with you alongside them.</span>
                  </li>
                </ul>
              </div>

              <p>
                On a construction site, this looks like the foreman who, three weeks after a conversation
                about a colleague&rsquo;s anxiety, still takes a moment during the morning brew to ask
                how the weekend was. It looks like the supervisor who, a month after someone returned from
                depression-related absence, quietly checks that the workload is still manageable. It is
                small, consistent actions sustained over time &mdash; not grand gestures followed by silence.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Common Pitfall</p>
                </div>
                <p className="text-sm text-white">
                  Many people provide intensive support in the first few days after someone discloses and
                  then gradually withdraw as other priorities take over. From the person&rsquo;s perspective,
                  this can feel like abandonment &mdash; as though you only cared when it was new and
                  interesting. <strong>Consistent, sustained support &mdash; even when it is brief &mdash;
                  is far more valuable than intensive support that fades.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Reasonable Adjustments */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Reasonable Adjustments
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Equality Act 2010</strong> places a legal duty on employers to make reasonable
                adjustments for employees with disabilities. Mental health conditions &mdash; including
                depression, anxiety, PTSD, bipolar disorder, OCD, and schizophrenia &mdash; can qualify
                as disabilities under the Act when they have a <strong>substantial and long-term adverse
                effect</strong> on a person&rsquo;s ability to carry out normal day-to-day activities.
                &ldquo;Long-term&rdquo; means lasting, or likely to last, 12 months or more.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">What &ldquo;Reasonable&rdquo; Means</p>
                </div>
                <p className="text-sm text-white">
                  The word &ldquo;reasonable&rdquo; is deliberately flexible. It takes into account the
                  size and resources of the employer, the nature of the work, the cost and practicality
                  of the adjustment, and the benefit to the employee. What is reasonable for a large main
                  contractor with an HR department may differ from what is reasonable for a small subcontractor
                  with six employees &mdash; but <strong>all employers have this duty</strong>, regardless
                  of size.
                </p>
              </div>

              <p>
                Construction is often perceived as an industry where adjustments are difficult because of
                the physical and time-pressured nature of the work. However, there are many practical
                adjustments that can be made without significant cost or disruption. The key is to have
                a genuine conversation with the person about what would help, rather than assuming that
                nothing can be done.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Reasonable Adjustments for Construction Workers</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Flexible Start Times</p>
                    <p>Many antidepressants cause morning drowsiness. Allowing a 9am start instead of 7am can make a significant difference. Therapy appointments are also often during working hours.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Temporary Role Changes</p>
                    <p>Moving someone from isolated work (lone working in a ceiling void) to a task where they are alongside colleagues can reduce the impact of depression and anxiety.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Reduced Overtime</p>
                    <p>Removing the expectation or pressure to work overtime gives someone the time and energy to attend appointments, rest, and maintain their recovery.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Quiet Break Space</p>
                    <p>Access to a quiet space away from the noise and bustle of site allows someone to decompress during breaks. Even a corner of the site office can work.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Phased Return to Work</p>
                    <p>Starting with reduced hours (half-days, three days per week) and building up gradually over two to six weeks, rather than expecting full duties from day one.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Modified Duties</p>
                    <p>Temporarily assigning less physically demanding, less safety-critical, or less pressured tasks while someone stabilises. This is not demotion &mdash; it is support.</p>
                  </div>
                </div>
              </div>

              <p>
                It is worth noting that many adjustments cost nothing. A change in shift pattern, a
                temporary reassignment, an agreement not to roster someone for overtime, or access to
                a quiet break space are all free. Even adjustments with a small cost (such as providing
                additional cover to allow reduced hours) are almost always less expensive than the cost
                of sickness absence, recruitment, and retraining if the person leaves or has a prolonged
                breakdown.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Important Legal Points</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>A formal diagnosis is <strong>not required</strong> for the duty to apply &mdash; what matters is the effect on the person, not the label.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>The duty applies to all employers, including subcontractors and small firms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Failing to make reasonable adjustments is a form of <strong>discrimination</strong> under the Equality Act.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Adjustments should be reviewed regularly &mdash; what someone needs initially may change as they recover.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Supporting a Return to Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Supporting a Return to Work
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Returning to work after a period of mental health-related absence is one of the most
                anxious and vulnerable moments in a person&rsquo;s recovery. They may fear judgement from
                colleagues, worry about being seen as weak, or be anxious about whether they can still
                do the job. The way the return is managed can make the difference between a successful
                reintegration and a rapid relapse.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Before They Come Back &mdash; Planning the Return</p>
                </div>
                <p className="text-sm text-white mb-3">
                  The most important work happens <strong>before the person walks back onto site</strong>.
                  A well-planned return reduces anxiety and sets the person up for success:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>Have a private return-to-work conversation</strong> before their first day back. Ask what support they need, what they are anxious about, and how they would like things handled.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>Agree on a phased return plan</strong> &mdash; starting hours, duties, and the timeline for building back up. Put it in writing so both sides are clear.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>Identify a point of contact</strong> &mdash; a specific person (supervisor, colleague, mental health first aider) who they can go to if they are struggling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>Discuss confidentiality</strong> &mdash; who on the team knows about their absence and diagnosis? What (if anything) would they like colleagues to be told? This is their choice.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>Prepare the team</strong> sensitively &mdash; without disclosing diagnosis, let the team know their colleague is returning and that they should be welcomed normally.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Phased Return &mdash; HSE Guidance</p>
                <p className="text-sm text-white">
                  The Health and Safety Executive recommends phased returns for mental health-related absence.
                  A typical phased return might look like this: <strong>Week 1:</strong> Half-days (4 hours),
                  light duties, regular check-ins. <strong>Week 2:</strong> Increasing to 6 hours, some
                  normal duties added. <strong>Weeks 3&ndash;4:</strong> Building to full hours, most
                  normal duties resumed. <strong>Week 5+:</strong> Full role, with regular check-ins
                  continuing. The pace should always be guided by how the person is coping, not by a rigid
                  timetable.
                </p>
              </div>

              <p>
                <strong>The first week is critical.</strong> The returning person is watching for signals
                from their colleagues and environment. Are people treating them normally? Has someone saved
                them a seat in the cabin? Does anyone mention the elephant in the room, or is everyone
                avoiding them? The first few days set the tone for whether this return will succeed or
                whether the person will feel isolated and consider leaving.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Managing Team Reactions</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>Some colleagues will be supportive</strong> &mdash; they may have experienced similar issues themselves or understand mental health.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>Others may be resentful</strong> &mdash; particularly if they have been covering extra work. Address this privately and honestly: &ldquo;They have been unwell. We would do the same for you.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>Some may be awkward or avoidant</strong> &mdash; unsure what to say or afraid of saying the wrong thing. A quiet word beforehand (&ldquo;Just treat them normally&rdquo;) can help.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>A few may make unhelpful comments</strong> &mdash; challenge this promptly and privately. Stigma in the team will undermine the return.</span>
                  </li>
                </ul>
              </div>

              <p>
                Regular check-ins during the first weeks and months are essential. These do not need to
                be formal meetings &mdash; a five-minute catch-up over a cuppa is often ideal. The aim
                is to monitor how the person is coping, adjust the plan if needed, and provide a safe
                space for them to raise any concerns. As the return progresses and they settle back in,
                check-ins can become less frequent, but should not stop entirely for at least three months.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Day-to-Day Support Strategies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Day-to-Day Support Strategies
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond formal adjustments and return-to-work plans, the most impactful support often
                comes through small, everyday actions. It is the consistency of day-to-day support that
                makes the real difference &mdash; not one grand gesture, but dozens of small ones over
                weeks and months.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Practical Day-to-Day Support Actions</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Be Consistently Available</p>
                    <p>Let them know you are there &mdash; not just in the first week, but in weeks five, ten, and twenty. Availability means being approachable, not constantly hovering.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Maintain Normality</p>
                    <p>Include them in team banter, invite them to the Friday takeaway order, have a normal conversation about football or the weather. Normality preserves dignity.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Watch for Setbacks</p>
                    <p>Without hovering, keep an eye out for signs of deterioration: withdrawal, changes in work quality, increased absence, changes in behaviour. Early intervention prevents crises.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Offer Practical Help</p>
                    <p>Lifts to and from site, covering a task when they need a breather, picking up materials so they do not have to climb four flights of scaffolding. Small practical actions show care.</p>
                  </div>
                </div>
              </div>

              <p>
                One of the most powerful things you can do is simply <strong>include them in the team</strong>.
                When someone is struggling with their mental health, isolation is the enemy. Being included
                in decisions, conversations, and the social life of the team maintains their sense of
                belonging and identity. They are a valued team member who happens to be going through a
                difficult time &mdash; not a patient or a problem to be managed.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Patience Factor</p>
                </div>
                <p className="text-sm text-white">
                  Recovery from mental health difficulties takes time. Weeks. Months. Sometimes longer.
                  There will be periods when progress seems painfully slow or when setbacks undo what
                  seemed like good progress. <strong>Your patience during these times is one of the most
                  valuable things you can offer.</strong> If you become frustrated or withdraw because
                  recovery is not happening fast enough, the person will notice &mdash; and it will
                  compound their sense of failure and hopelessness. Be patient. Be steady. Be there.
                </p>
              </div>

              <p>
                On a construction site, day-to-day support might look like the electrician who walks
                with a colleague to the canteen instead of letting them eat alone. The supervisor who,
                noticing someone looks flat, quietly asks if they want a five-minute breather. The
                labourer who covers a heavy-lifting task without being asked because they know their
                mate is having a rough week. None of these require training, policies, or procedures
                &mdash; they require <strong>awareness, compassion, and consistency</strong>.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: What NOT to Do When Supporting Someone */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            What NOT to Do When Supporting Someone
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Well-intentioned support can sometimes cause harm if it is delivered in the wrong way.
                Understanding what <strong>not</strong> to do is just as important as knowing what to do.
                The following are common mistakes that can undermine your efforts and make things worse
                for the person you are trying to help.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Mistakes to Avoid</p>
                <ul className="text-sm text-white space-y-3">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Do not tell everyone about their condition.</strong> Confidentiality is paramount. If someone discloses their mental health difficulties to you, that information is private. Sharing it with the wider team without their consent is a serious breach of trust and could be unlawful under data protection legislation. Always ask the person who they are comfortable with knowing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Do not treat them differently in front of others.</strong> Being visibly careful, overly gentle, or obviously avoiding giving them tasks in front of the team singles them out and can be deeply embarrassing. Treat them normally in group settings; save supportive conversations for private moments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Do not constantly ask &ldquo;How are you feeling?&rdquo;</strong> Being asked this five times a day makes someone feel like they are under surveillance, not being supported. Once a day, in a natural moment, is enough. Let them bring up their mental health if and when they want to.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Do not make assumptions about their capabilities.</strong> Do not decide on their behalf that they cannot handle a particular task, project, or responsibility. Always ask. Many people recovering from mental health difficulties find that being given meaningful, challenging work is an important part of their recovery.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Do not withdraw support after a few weeks.</strong> This is perhaps the most common mistake. The initial burst of concern fades, other priorities take over, and the person is left without the support they were relying on. Recovery takes months, not weeks. Commit to the long haul.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Do not take it personally if they push you away.</strong> Some people, especially in the construction industry, are uncomfortable receiving help. They may push you away, say they are fine when they are clearly not, or become irritable when you check in. This is not about you &mdash; it is about their difficulty in accepting support. Stay available without forcing contact.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Biggest Mistake of All</p>
                <p className="text-sm text-white">
                  The single biggest mistake is <strong>doing nothing</strong>. Fear of saying or doing the
                  wrong thing stops many people from offering any support at all. While the mistakes listed
                  above are worth avoiding, every single one of them is less harmful than complete inaction.
                  A person who tries to help and gets it slightly wrong is infinitely more valuable than a
                  person who does nothing because they are afraid of making a mistake. <strong>Imperfect
                  support is always better than no support.</strong>
                </p>
              </div>

              <p>
                Remember: you do not need to be perfect. You do not need to have all the answers. You
                do not need to fix their mental health. You just need to be <strong>present, genuine,
                consistent, and willing to learn</strong>. The fact that you are reading this section
                means you already care enough to get it right &mdash; and that is the most important
                quality of all.
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
                This section has covered the principles and practices of providing ongoing, sustained
                support for colleagues experiencing mental health difficulties. The key points to
                carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Support is not a one-off</strong> &mdash; the first conversation is the beginning, not the end. Consistent follow-up over weeks and months is essential.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Recovery is not linear</strong> &mdash; expect setbacks and be patient. Your steadiness during difficult periods is invaluable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Reasonable adjustments are a legal duty</strong> &mdash; under the Equality Act 2010, employers must make adjustments for mental health conditions that qualify as disabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Plan returns to work carefully</strong> &mdash; a phased return with regular check-ins is far more effective than expecting full duties from day one.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Day-to-day support matters most</strong> &mdash; inclusion, normality, practical help, and patience are the cornerstones of effective support.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Imperfect support beats no support</strong> &mdash; do not let fear of getting it wrong stop you from being there.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will cover
                  <strong> signposting to professional help</strong> &mdash; knowing when someone needs
                  more than peer support, understanding the services available (NHS, EAPs, construction-specific
                  resources, crisis services), and how to guide someone towards the right help at the right time.
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
            <Link to="../mental-health-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-4-section-2">
              Next: Signposting to Professional Help
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
