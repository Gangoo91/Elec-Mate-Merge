import {
  ArrowLeft,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  Brain,
  Shield,
  Pill,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-psychosis-prevalence",
    question:
      "Approximately how many people in the general population will experience a psychotic episode at some point in their lives?",
    options: [
      "1 in 1,000",
      "3 in 100",
      "1 in 10",
      "1 in 2",
    ],
    correctIndex: 1,
    explanation:
      "About 3 in 100 people will experience a psychotic episode at some point in their lives. Psychosis is more common than most people realise, and it is a treatable condition with good outcomes when identified early.",
  },
  {
    id: "mh-positive-vs-negative",
    question:
      "Which of the following is an example of a 'negative' symptom of psychosis?",
    options: [
      "Hearing voices that other people cannot hear",
      "Believing you are being followed by MI5",
      "Flat affect and social withdrawal",
      "Speaking in jumbled, disconnected sentences",
    ],
    correctIndex: 2,
    explanation:
      "Flat affect (reduced emotional expression) and social withdrawal are negative symptoms of psychosis. They are called 'negative' because they represent a loss or reduction in normal functioning, unlike positive symptoms (hallucinations, delusions) which are additions to normal experience.",
  },
  {
    id: "mh-first-episode-referral",
    question:
      "What is the NHS target timeframe for referral to an Early Intervention in Psychosis (EIP) service after a first episode of psychosis is identified?",
    options: [
      "24 hours",
      "72 hours",
      "2 weeks",
      "6 weeks",
    ],
    correctIndex: 2,
    explanation:
      "The NHS standard is a 2-week referral target for Early Intervention in Psychosis (EIP) services. Early intervention during the first episode is critical because research consistently shows that outcomes are significantly better when treatment begins promptly within the critical period of the first 3 to 5 years.",
  },
];

const faqs = [
  {
    question:
      "Is psychosis the same as 'split personality'?",
    answer:
      "No. This is one of the most common and harmful misconceptions about psychosis. 'Split personality' (properly called dissociative identity disorder) is an entirely separate condition. Psychosis involves a loss of contact with reality, which may include hallucinations (perceiving things that are not there), delusions (fixed false beliefs), and disordered thinking. The confusion likely stems from the word 'schizophrenia', which comes from Greek roots meaning 'split mind' &mdash; but this refers to a split between thought and emotion, not multiple personalities.",
  },
  {
    question:
      "Can cannabis really cause psychosis?",
    answer:
      "Yes. Cannabis, particularly high-potency strains (such as 'skunk'), significantly increases the risk of psychosis. Research published in The Lancet Psychiatry found that daily use of high-potency cannabis was associated with a five-fold increase in the risk of developing a psychotic disorder. The risk is especially high for those who start using cannabis in their teens, when the brain is still developing. While many people use cannabis without developing psychosis, those with a genetic vulnerability or family history of psychotic disorders are at considerably higher risk. Drug-induced psychosis usually resolves once the substance is cleared from the body, but in vulnerable individuals it can trigger a longer-term psychotic illness.",
  },
  {
    question:
      "Should I argue with someone who is experiencing delusions?",
    answer:
      "No, you should never argue with, challenge, or try to reason someone out of a delusion. Delusions are fixed false beliefs that feel absolutely real to the person experiencing them. Arguing will not change their mind and is likely to increase distress, agitation, and mistrust. Instead, acknowledge their emotional experience without agreeing with or denying the content of the delusion. For example, you might say 'That sounds really frightening' rather than 'That's not real' or 'You're imagining things'. Focus on how they are feeling, stay calm, and gently encourage them to seek professional support.",
  },
  {
    question:
      "What should I do if a colleague on site appears to be hearing voices or acting unusually?",
    answer:
      "First, ensure immediate safety &mdash; if they are operating machinery, working at height, or near electrical hazards, calmly guide them to a safe area. Speak calmly and simply. Do not dismiss their experience or tell them to 'snap out of it'. Ask if they are OK and if there is anyone you can contact for them. Do not leave them alone if they appear distressed or confused. If there is any risk to their safety or the safety of others, call 999. Otherwise, encourage them to contact their GP or the crisis team. Report the incident to your supervisor and record it appropriately. Remember that psychosis is a medical condition, not a choice or a character flaw.",
  },
  {
    question:
      "What is the difference between a hallucination and a delusion?",
    answer:
      "A hallucination is a sensory experience that feels completely real but occurs without any external stimulus. The most common type is auditory (hearing voices), but hallucinations can also be visual (seeing things), tactile (feeling things on or under the skin), olfactory (smelling things), or gustatory (tasting things). A delusion, by contrast, is a fixed false belief that is held with absolute conviction despite clear evidence to the contrary. Common types include paranoid delusions (believing you are being watched, followed, or persecuted), grandiose delusions (believing you have special powers or importance), and referential delusions (believing that random events or messages are directed specifically at you). Both hallucinations and delusions are classified as 'positive' symptoms of psychosis.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following best describes psychosis?",
    options: [
      "A personality disorder characterised by mood swings and impulsivity",
      "A loss of contact with reality that may include hallucinations and delusions",
      "A condition where someone has multiple distinct personalities",
      "A form of severe depression that does not respond to treatment",
    ],
    correctAnswer: 1,
    explanation:
      "Psychosis is characterised by a loss of contact with reality. This may include hallucinations (perceiving things that are not there), delusions (fixed false beliefs), and disordered thinking. It is not the same as a personality disorder, multiple personalities, or treatment-resistant depression.",
  },
  {
    id: 2,
    question:
      "What is the most common type of hallucination experienced in psychosis?",
    options: [
      "Visual hallucinations (seeing things)",
      "Tactile hallucinations (feeling things on the skin)",
      "Auditory hallucinations (hearing voices)",
      "Olfactory hallucinations (smelling things)",
    ],
    correctAnswer: 2,
    explanation:
      "Auditory hallucinations, particularly hearing voices, are the most common type of hallucination in psychosis. The voices may comment on the person's actions, talk to each other, or give commands. Visual, tactile, and olfactory hallucinations can also occur but are less common.",
  },
  {
    id: 3,
    question:
      "At what age does schizophrenia most typically first present?",
    options: [
      "Early childhood (under 10 years)",
      "Late teens to early 30s",
      "Middle age (40 to 55 years)",
      "Over 65 years",
    ],
    correctAnswer: 1,
    explanation:
      "Schizophrenia most typically has its onset in the late teens to early 30s. It can occur outside this age range but is most commonly first diagnosed during this period. The onset in men tends to be slightly earlier (late teens to early 20s) than in women (late 20s to early 30s).",
  },
  {
    id: 4,
    question:
      "Which substance is most strongly associated with an increased risk of drug-induced psychosis, particularly in its high-potency form?",
    options: [
      "Alcohol",
      "Caffeine",
      "Cannabis (especially high-potency strains)",
      "Nicotine",
    ],
    correctAnswer: 2,
    explanation:
      "High-potency cannabis (often referred to as 'skunk') is most strongly associated with drug-induced psychosis. Research has shown that daily use of high-potency cannabis is associated with a five-fold increase in the risk of developing a psychotic disorder. Amphetamines and cocaine also carry significant risk.",
  },
  {
    id: 5,
    question:
      "In the context of psychosis, what does the term 'negative symptoms' refer to?",
    options: [
      "Symptoms that make the person feel negative or pessimistic",
      "Symptoms that are harmful or dangerous to others",
      "A loss or reduction in normal functioning, such as flat affect, social withdrawal, and reduced motivation",
      "Symptoms that occur only during the night",
    ],
    correctAnswer: 2,
    explanation:
      "Negative symptoms represent a loss or reduction in normal functioning. They include flat affect (reduced emotional expression), social withdrawal, reduced motivation (avolition), poverty of speech (alogia), and loss of pleasure in activities (anhedonia). They are called 'negative' because something is taken away from the person's normal experience, as opposed to 'positive' symptoms which add experiences such as hallucinations and delusions.",
  },
  {
    id: 6,
    question:
      "What is the NHS referral target for Early Intervention in Psychosis (EIP) services?",
    options: [
      "24 hours",
      "72 hours",
      "2 weeks",
      "3 months",
    ],
    correctAnswer: 2,
    explanation:
      "The NHS standard for referral to Early Intervention in Psychosis (EIP) services is 2 weeks. Early intervention is critical because research shows significantly better long-term outcomes when treatment begins promptly. The first 3 to 5 years after onset are considered the 'critical period' where intervention has the greatest impact.",
  },
  {
    id: 7,
    question:
      "When supporting someone who is experiencing psychosis, which of the following approaches is most appropriate?",
    options: [
      "Firmly tell them that their hallucinations are not real so they can understand the truth",
      "Stay calm, speak simply and clearly, do not argue with delusions or deny hallucinations, and ensure safety",
      "Leave them alone to calm down and process their experience privately",
      "Restrain them physically to prevent harm until emergency services arrive",
    ],
    correctAnswer: 1,
    explanation:
      "The most appropriate approach is to stay calm, speak simply and clearly, avoid arguing with delusions or denying hallucinations, and ensure the person's safety. Arguing with delusions increases distress. Leaving someone alone may be dangerous. Physical restraint should never be attempted unless there is an immediate threat to life and you are trained to do so safely.",
  },
  {
    id: 8,
    question:
      "Which of the following scenarios would be an appropriate reason to call 999 for someone experiencing psychosis?",
    options: [
      "They are sitting quietly and appear to be listening to voices",
      "They have a fixed belief that they are a famous person",
      "They are experiencing command hallucinations telling them to harm themselves or others",
      "They are refusing to take their prescribed medication",
    ],
    correctAnswer: 2,
    explanation:
      "Command hallucinations &mdash; voices that instruct the person to harm themselves or others &mdash; represent a significant risk and warrant calling 999. Sitting quietly hearing voices, holding a grandiose belief, or refusing medication are not in themselves emergencies (though they may require support). The key threshold for calling 999 is when there is a clear risk to the person's safety or the safety of others.",
  },
];

export default function MentalHealthModule4Section1() {
  useSEO({
    title:
      "Psychosis & Schizophrenia | Mental Health Module 4.1",
    description:
      "Understanding psychosis, hallucinations, delusions, schizophrenia, drug-induced psychosis, first episode psychosis, Early Intervention in Psychosis services, and how to support someone experiencing psychosis safely.",
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-400/20 border border-purple-500/30 mb-4">
            <Eye className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Psychosis &amp; Schizophrenia
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding psychosis, recognising hallucinations and delusions,
            schizophrenia, drug-induced psychosis, first episode psychosis, and
            how to support someone experiencing a psychotic episode safely
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Psychosis:</strong> Loss of contact with reality
                &mdash; NOT &ldquo;split personality&rdquo;
              </li>
              <li>
                <strong>Key features:</strong> Hallucinations, delusions,
                disordered thinking, negative symptoms
              </li>
              <li>
                <strong>Prevalence:</strong> About 3 in 100 people will
                experience an episode
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Stay calm:</strong> Do not argue with delusions
                or deny hallucinations
              </li>
              <li>
                <strong>Ensure safety:</strong> Move away from hazards,
                reduce stimulation
              </li>
              <li>
                <strong>Call 999:</strong> If risk to self or others, or
                command hallucinations
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define psychosis and distinguish it from common misconceptions such as 'split personality'",
              "Identify the key features of psychosis including positive and negative symptoms",
              "Describe schizophrenia, its prevalence, typical onset, and contributing factors",
              "Explain the link between substance use and drug-induced psychosis, with relevance to construction sites",
              "Understand the importance of early intervention in first episode psychosis and the role of EIP services",
              "Demonstrate how to safely support someone experiencing a psychotic episode, including when to call 999",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================= */}
        {/* Section 01: What Is Psychosis? */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            What Is Psychosis?
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Psychosis</strong> is a mental health condition in which
                a person loses contact with reality. During a psychotic episode,
                a person may experience hallucinations (perceiving things that
                are not there), delusions (fixed false beliefs), disordered
                thinking, and significant changes in behaviour. Psychosis is not
                a diagnosis in itself but rather a symptom that can occur across
                several mental health conditions, including schizophrenia,
                schizoaffective disorder, bipolar disorder, and severe
                depression.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">Key Definition:</strong>{" "}
                  Psychosis describes a state in which a person&rsquo;s thoughts
                  and perceptions are significantly disturbed, causing them to
                  lose touch with what is real and what is not. It is a{" "}
                  <strong>treatable medical condition</strong>, not a character
                  flaw, a choice, or a sign of weakness.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Common Misconception
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Psychosis is <strong>NOT</strong> &ldquo;split
                  personality&rdquo;. This is one of the most widespread and
                  damaging myths about psychosis and schizophrenia. The
                  confusion likely stems from the Greek roots of
                  &ldquo;schizophrenia&rdquo; (&ldquo;split mind&rdquo;), but
                  this refers to a split between thought and emotion, not
                  multiple personalities. Dissociative identity disorder
                  (formerly called multiple personality disorder) is an entirely
                  separate condition. People with psychosis do not have multiple
                  personalities.
                </p>
              </div>

              <p>
                Psychosis is more common than most people realise. About{" "}
                <strong>3 in 100 people</strong> will experience a psychotic
                episode at some point in their lives. It can affect anyone
                regardless of background, intelligence, or occupation. Psychotic
                episodes can be <strong>temporary</strong> (lasting days or
                weeks, particularly when triggered by substance use, extreme
                stress, or sleep deprivation) or{" "}
                <strong>ongoing</strong> (as part of a chronic condition such as
                schizophrenia). Crucially, psychosis is a{" "}
                <strong>treatable condition</strong> &mdash; with appropriate
                medication and psychological support, many people recover fully
                or learn to manage their symptoms effectively.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Conditions That Can Include Psychosis
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Schizophrenia</strong>{" "}
                      &mdash; the most well-known psychotic disorder, with
                      hallucinations, delusions, and disordered thinking
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Schizoaffective disorder
                      </strong>{" "}
                      &mdash; combines symptoms of schizophrenia with mood
                      disorder symptoms (depression or mania)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Bipolar disorder
                      </strong>{" "}
                      &mdash; psychotic symptoms can occur during severe manic
                      or depressive episodes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Severe depression
                      </strong>{" "}
                      &mdash; psychotic depression involves hallucinations or
                      delusions alongside severe depressive symptoms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Drug-induced psychosis
                      </strong>{" "}
                      &mdash; triggered by substances such as cannabis,
                      amphetamines, or cocaine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Postpartum psychosis
                      </strong>{" "}
                      &mdash; a rare but serious condition that can occur after
                      childbirth
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* Section 02: Key Features of Psychosis */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            Key Features of Psychosis
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The symptoms of psychosis are broadly divided into two
                categories: <strong>positive symptoms</strong> and{" "}
                <strong>negative symptoms</strong>. This terminology can be
                confusing &mdash; &ldquo;positive&rdquo; does not mean good,
                and &ldquo;negative&rdquo; does not mean bad. Instead,
                &ldquo;positive&rdquo; refers to experiences or behaviours that
                are <strong>added</strong> to a person&rsquo;s normal
                experience (such as hallucinations or delusions), while
                &ldquo;negative&rdquo; refers to things that are{" "}
                <strong>taken away</strong> from their normal functioning
                (such as motivation, emotional expression, or social
                engagement).
              </p>

              {/* Positive vs Negative Symptoms Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-4 text-center">
                  Positive vs Negative Symptoms of Psychosis
                </p>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Positive Symptoms */}
                  <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 border-2 border-violet-400">
                        <span className="text-violet-400 text-sm font-bold">+</span>
                      </div>
                      <p className="text-sm font-semibold text-violet-400">
                        Positive Symptoms
                      </p>
                    </div>
                    <p className="text-xs text-white/50 mb-3 italic">
                      Experiences added to normal perception
                    </p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Hallucinations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Delusions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Disordered thinking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Agitation / unusual behaviour</span>
                      </li>
                    </ul>
                  </div>
                  {/* Negative Symptoms */}
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 border-2 border-purple-400">
                        <span className="text-purple-400 text-sm font-bold">&minus;</span>
                      </div>
                      <p className="text-sm font-semibold text-purple-400">
                        Negative Symptoms
                      </p>
                    </div>
                    <p className="text-xs text-white/50 mb-3 italic">
                      Normal functions reduced or lost
                    </p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Flat affect (reduced emotion)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Social withdrawal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Reduced motivation (avolition)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Poverty of speech (alogia)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium text-white pt-2">
                Hallucinations
              </h3>
              <p>
                A hallucination is a sensory experience that feels completely
                real but occurs without any external stimulus. The person is
                not imagining it or making it up &mdash; to them, it is
                indistinguishable from reality.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Types of Hallucination
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Auditory (hearing voices):
                      </strong>{" "}
                      The most common type. Voices may comment on the
                      person&rsquo;s behaviour, talk to each other, or give
                      commands. They may be friendly, neutral, or hostile.{" "}
                      <strong>Command hallucinations</strong> (voices
                      instructing the person to do something, especially to
                      harm themselves or others) are particularly concerning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Visual (seeing things):
                      </strong>{" "}
                      Seeing people, objects, patterns, or lights that are not
                      there. May include shadows, figures, or fully formed
                      scenes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Tactile (feeling things):
                      </strong>{" "}
                      Feeling sensations on or under the skin, such as
                      crawling insects, burning, or being touched when nobody
                      is there
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Olfactory (smelling things):
                      </strong>{" "}
                      Smelling odours that are not present, which may be
                      pleasant or unpleasant. Sometimes associated with
                      delusions about poisoning or contamination
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white pt-2">
                Delusions
              </h3>
              <p>
                A delusion is a fixed false belief held with absolute
                conviction, despite clear and obvious evidence to the
                contrary. The person is not lying or pretending &mdash; they
                genuinely believe the delusion to be true and it feels
                completely real to them. Delusions cannot be changed through
                logical argument or evidence, which is why attempting to argue
                with someone experiencing a delusion is both futile and
                counterproductive.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Types of Delusion
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Paranoid delusions:
                      </strong>{" "}
                      Belief that one is being watched, followed, persecuted,
                      or conspired against. For example, believing that
                      colleagues are plotting to harm you or that the
                      government is monitoring your thoughts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Grandiose delusions:
                      </strong>{" "}
                      Belief that one has special powers, extraordinary
                      abilities, or exceptional importance. For example,
                      believing you are a world leader, a deity, or that you
                      have discovered a cure for a disease
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Referential delusions:
                      </strong>{" "}
                      Belief that random events, messages, or actions by
                      others are directed specifically at you. For example,
                      believing that a news broadcast is sending you personal
                      messages, or that people on a bus are talking about you
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white pt-2">
                Disordered Thinking
              </h3>
              <p>
                Disordered thinking (also called <strong>thought
                disorder</strong>) refers to disruptions in the way a
                person&rsquo;s thoughts are organised, connected, and
                expressed. This often becomes apparent through the
                person&rsquo;s speech.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Tangential speech:
                      </strong>{" "}
                      The person starts on one topic but drifts off onto
                      unrelated subjects, never returning to the original
                      point
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Word salad:
                      </strong>{" "}
                      Severely disorganised speech where words and phrases are
                      strung together in a way that appears random and
                      incomprehensible, with no logical connection between them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Loose associations:
                      </strong>{" "}
                      Jumping between topics that have little or no obvious
                      connection, making conversation very difficult to follow
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Thought blocking:
                      </strong>{" "}
                      Sudden, mid-sentence pauses where the person&rsquo;s
                      train of thought appears to stop abruptly, and they
                      cannot recall what they were saying
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white pt-2">
                Negative Symptoms
              </h3>
              <p>
                Negative symptoms are often overlooked or mistaken for
                laziness, rudeness, or depression, but they are core features
                of psychotic disorders and can be profoundly disabling. They
                tend to be more persistent and harder to treat than positive
                symptoms.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Flat affect:
                      </strong>{" "}
                      Reduced emotional expression &mdash; the person&rsquo;s
                      face may appear blank or expressionless, their voice
                      monotone, and their body language reduced
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Social withdrawal:
                      </strong>{" "}
                      Pulling away from friends, family, and colleagues;
                      avoiding social situations; becoming increasingly
                      isolated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduced motivation (avolition):
                      </strong>{" "}
                      Difficulty initiating or sustaining activities,
                      including work, self-care, and hobbies. May appear
                      apathetic or indifferent
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Poverty of speech (alogia):
                      </strong>{" "}
                      Speaking very little, giving brief or empty replies,
                      appearing to have little to say
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Anhedonia:
                      </strong>{" "}
                      Loss of pleasure or interest in activities that were
                      previously enjoyed
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================= */}
        {/* Section 03: Schizophrenia */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Schizophrenia
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Schizophrenia</strong> is the most well-known psychotic
                disorder. It is a serious, long-term mental health condition
                that affects how a person thinks, feels, and behaves. Despite
                being one of the most recognised mental health conditions,
                schizophrenia is also one of the most misunderstood and heavily
                stigmatised.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">Key Fact:</strong>{" "}
                  Schizophrenia affects approximately{" "}
                  <strong>1 in 100 people</strong> worldwide. It occurs across
                  all cultures, ethnicities, and social backgrounds. It is not
                  caused by bad parenting, personal weakness, or lack of
                  willpower. It is a medical condition with a neurobiological
                  basis.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Key Facts About Schizophrenia
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Prevalence:</strong>{" "}
                      Approximately 1 in 100 people are affected, making it
                      more common than many people realise
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Typical onset:</strong>{" "}
                      Late teens to early 30s. Men tend to develop symptoms
                      slightly earlier (late teens to early 20s) than women
                      (late 20s to early 30s)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Causes:</strong>{" "}
                      A combination of genetic and environmental factors.
                      Having a close family member with schizophrenia increases
                      risk, but most people with a family history do not develop
                      it. Stressful life events, childhood trauma, urban
                      upbringing, and substance use (particularly cannabis) can
                      increase vulnerability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Symptoms:</strong>{" "}
                      Both positive symptoms (hallucinations, delusions,
                      disordered thinking) and negative symptoms (flat affect,
                      withdrawal, reduced motivation). Cognitive symptoms
                      (difficulty concentrating, poor memory, impaired
                      decision-making) are also common
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Treatment:</strong>{" "}
                      Antipsychotic medication (to manage positive symptoms),
                      psychological therapies (CBT for psychosis, family
                      therapy), social support, and rehabilitation. Many people
                      with schizophrenia live independently and hold jobs with
                      appropriate treatment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Stigma and Misconceptions
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Schizophrenia is one of the most stigmatised conditions in
                  mental health. Common misconceptions include that people with
                  schizophrenia are violent, dangerous, or unpredictable. In
                  reality, people with schizophrenia are{" "}
                  <strong>far more likely to be victims of violence</strong>{" "}
                  than perpetrators. They are also more likely to harm
                  themselves than others. Media portrayals often reinforce
                  harmful stereotypes. As a mental health first aider, it is
                  vital to approach schizophrenia with understanding, empathy,
                  and an awareness of the facts rather than the myths.
                </p>
              </div>

              <p>
                It is important to understand that schizophrenia is{" "}
                <strong>not caused by bad parenting or personal
                weakness</strong>. Historically, families were often blamed for
                a loved one&rsquo;s schizophrenia, which caused immense guilt
                and suffering. Modern research has clearly established that
                schizophrenia is a neurobiological condition involving complex
                interactions between genetic predisposition and environmental
                factors. The most helpful thing a family, friend, or colleague
                can do is offer non-judgmental support and encourage engagement
                with treatment services.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* Section 04: Drug-Induced Psychosis */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Drug-Induced Psychosis
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Drug-induced psychosis</strong> (also called
                substance-induced psychotic disorder) occurs when the use of
                certain substances triggers psychotic symptoms such as
                hallucinations, delusions, or severe confusion. The psychosis
                typically develops during or shortly after substance use and
                usually resolves once the substance has been cleared from the
                body. However, in individuals who are already vulnerable
                (due to genetic predisposition or pre-existing mental health
                conditions), drug-induced psychosis can{" "}
                <strong>trigger a longer-term psychotic illness</strong> that
                persists well beyond the effects of the substance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Pill className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Substances Linked to Psychosis
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cannabis (especially high-potency):
                      </strong>{" "}
                      High-potency cannabis (&ldquo;skunk&rdquo;) has
                      significantly elevated THC levels and very low CBD. Daily
                      use of high-potency cannabis is associated with a{" "}
                      <strong>five-fold increase</strong> in the risk of
                      psychosis. Cannabis is the substance most commonly
                      linked to psychosis in the UK
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Amphetamines:</strong>{" "}
                      Including methamphetamine. Stimulant psychosis can
                      involve severe paranoia, visual and auditory
                      hallucinations, and aggressive behaviour
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cocaine:</strong>{" "}
                      Particularly with heavy or prolonged use. Cocaine
                      psychosis often involves intense paranoia and tactile
                      hallucinations (such as the sensation of insects crawling
                      under the skin, known as &ldquo;cocaine bugs&rdquo; or
                      formication)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Novel psychoactive substances (&ldquo;legal
                        highs&rdquo;):
                      </strong>{" "}
                      Synthetic cannabinoids (such as Spice) and other novel
                      substances can cause unpredictable and severe psychotic
                      symptoms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Alcohol withdrawal (delirium tremens):
                      </strong>{" "}
                      Severe alcohol withdrawal can cause delirium tremens
                      (&ldquo;the DTs&rdquo;), which includes vivid
                      hallucinations, severe confusion, tremors, and
                      agitation. This is a medical emergency
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    Construction Site Relevance
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The construction industry has higher-than-average rates of
                  substance use, including cannabis and cocaine. Workers may
                  use substances to cope with stress, physical pain, long
                  hours, or mental health difficulties. Drug-induced psychosis
                  on a construction site is particularly dangerous because of
                  the high-risk environment &mdash; working at height, around
                  heavy machinery, near electrical hazards, and in confined
                  spaces. A colleague experiencing psychotic symptoms may not
                  be aware of the dangers around them. If you suspect a
                  colleague is experiencing drug-induced psychosis, your
                  immediate priority is{" "}
                  <strong>safety</strong>: remove them from hazards, do not
                  leave them alone, and seek medical assistance.
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">Important:</strong>{" "}
                  Drug-induced psychosis usually resolves when the substance
                  has been cleared from the body, typically within hours to
                  days. However, in{" "}
                  <strong>vulnerable individuals</strong> &mdash; particularly
                  those with a genetic predisposition to psychotic disorders
                  &mdash; a drug-induced episode can trigger a longer-term
                  psychotic illness such as schizophrenia. This is why
                  substance use is considered both a trigger and a risk factor
                  for enduring psychotic conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================= */}
        {/* Section 05: First Episode Psychosis */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            First Episode Psychosis
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>first episode of psychosis (FEP)</strong> refers to
                the first time a person experiences psychotic symptoms such as
                hallucinations, delusions, or disordered thinking at a
                clinically significant level. This is a critical moment in a
                person&rsquo;s mental health journey, because{" "}
                <strong>
                  early intervention dramatically improves long-term outcomes
                </strong>
                . Research consistently shows that the sooner treatment begins
                after a first episode, the better the prognosis for recovery,
                reduced hospital admissions, and improved quality of life.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    The Critical Period: First 3 to 5 Years
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The first <strong>3 to 5 years</strong> after the onset of
                  psychosis are known as the{" "}
                  <strong>&ldquo;critical period&rdquo;</strong>. This is the
                  window during which intervention has the greatest impact on
                  long-term outcomes. During this period, the brain is most
                  responsive to treatment, and patterns of illness, coping, and
                  recovery are being established. Delaying treatment during
                  this period &mdash; a situation known as{" "}
                  <strong>
                    duration of untreated psychosis (DUP)
                  </strong>{" "}
                  &mdash; is associated with poorer outcomes, more severe
                  symptoms, greater functional impairment, and increased risk
                  of relapse.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Early Intervention in Psychosis (EIP) Services
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">What they are:</strong>{" "}
                      Specialist NHS teams dedicated to supporting people
                      experiencing their first episode of psychosis, typically
                      aged 14 to 65
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Referral target:</strong>{" "}
                      The NHS standard is a <strong>2-week</strong> referral
                      target &mdash; anyone referred to an EIP service should
                      be seen within 2 weeks of referral
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">What they offer:</strong>{" "}
                      A comprehensive package of care including psychiatric
                      assessment, antipsychotic medication, cognitive
                      behavioural therapy for psychosis (CBTp), family
                      intervention, supported employment and education
                      programmes, and physical health monitoring
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Duration:</strong>{" "}
                      EIP services typically support the person for up to 3
                      years, covering the critical period
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Evidence base:</strong>{" "}
                      Research shows that early intervention leads to better
                      symptom control, fewer hospitalisations, improved social
                      functioning, higher rates of employment and education,
                      and reduced suicide risk
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Warning Signs Before a First Episode:
                  </strong>{" "}
                  Before a full psychotic episode develops, there is often a{" "}
                  <strong>prodromal phase</strong> that can last weeks or
                  months. Signs may include: becoming unusually suspicious or
                  fearful; withdrawing from friends and family; a noticeable
                  decline in self-care, work performance, or academic results;
                  unusual or bizarre ideas; sleep disturbance; difficulty
                  concentrating; and feeling that things around them have
                  changed or seem unreal. Recognising these early signs and
                  encouraging the person to seek help can lead to earlier
                  intervention and better outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================= */}
        {/* Section 06: How to Support Someone Experiencing Psychosis */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            How to Support Someone Experiencing Psychosis
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Supporting someone who is experiencing psychosis can feel
                daunting, but your calm, compassionate presence can make a
                significant difference. The most important thing to remember
                is that the person is experiencing something that feels
                completely real to them. Your role is not to diagnose or treat
                the condition, but to <strong>ensure their safety</strong>,{" "}
                <strong>reduce distress</strong>, and{" "}
                <strong>help connect them with professional support</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Step-by-Step Support Guide
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white">
                      1. Stay Calm
                    </p>
                    <p className="text-sm text-white/80">
                      Your calmness is contagious. If you appear anxious,
                      frightened, or agitated, it will increase the
                      person&rsquo;s distress. Speak in a calm, steady tone.
                      Maintain a relaxed, open posture. Move slowly and
                      avoid sudden movements.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      2. Do Not Argue with Delusions or Deny Hallucinations
                    </p>
                    <p className="text-sm text-white/80">
                      Never say &ldquo;That&rsquo;s not real&rdquo;,
                      &ldquo;You&rsquo;re imagining things&rdquo;, or
                      &ldquo;That&rsquo;s ridiculous&rdquo;. These responses
                      will increase agitation and destroy trust. Instead,
                      acknowledge their emotional experience: &ldquo;That
                      sounds really frightening&rdquo; or &ldquo;I can see
                      this is very distressing for you.&rdquo; You do not need
                      to agree with or confirm the delusion &mdash; simply
                      validate how they are feeling.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      3. Speak Simply and Clearly
                    </p>
                    <p className="text-sm text-white/80">
                      Use short, simple sentences. Avoid complex questions,
                      metaphors, or ambiguous language. The person may have
                      difficulty processing information, so speak slowly and
                      give them time to respond. Ask one question at a time
                      and wait patiently for the answer.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      4. Ensure Safety
                    </p>
                    <p className="text-sm text-white/80">
                      Assess the environment for immediate hazards. On a
                      construction site, gently guide the person away from
                      heights, machinery, electrical equipment, and roadways.
                      Ensure that the area is as safe as possible. If
                      necessary, clear other people from the immediate area
                      to reduce stimulation and potential conflict.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      5. Reduce Stimulation
                    </p>
                    <p className="text-sm text-white/80">
                      Move the person to a quiet, calm space if possible.
                      Turn off loud radios or machinery. Reduce the number of
                      people present &mdash; having many people crowding
                      around is likely to increase paranoia and distress. Keep
                      the environment as calm and predictable as possible.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      6. Do Not Touch Without Permission
                    </p>
                    <p className="text-sm text-white/80">
                      Someone experiencing psychosis may interpret physical
                      contact as threatening, especially if they are
                      experiencing paranoid delusions or tactile
                      hallucinations. Always ask before making any physical
                      contact: &ldquo;Is it OK if I sit next to you?&rdquo;
                      Maintain a comfortable distance and respect their
                      personal space. Position yourself so that neither you
                      nor the person is blocking the exit.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      7. Stay with Them and Monitor
                    </p>
                    <p className="text-sm text-white/80">
                      Do not leave the person alone if they are distressed or
                      confused. Stay with them until professional help arrives
                      or they are safely connected with someone who can
                      support them. Monitor their behaviour for any signs of
                      escalation or risk.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    When to Call 999
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Call 999 immediately if any of the following apply:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      The person is at <strong>risk of harming
                      themselves</strong> &mdash; expressing intent to
                      self-harm or attempting to do so
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      The person is at <strong>risk of harming
                      others</strong> &mdash; acting aggressively, making
                      threats, or behaving in a way that could endanger
                      others
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      The person is experiencing{" "}
                      <strong>command hallucinations</strong> &mdash; voices
                      telling them to harm themselves or others
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      The person is in a <strong>dangerous
                      environment</strong> and cannot be safely moved (for
                      example, at height or near live electrical equipment)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      You suspect <strong>drug-induced psychosis</strong> and
                      the person is physically unwell (e.g. extremely high
                      heart rate, seizures, extreme agitation, or loss of
                      consciousness)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Referral Pathways
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">GP:</strong>{" "}
                      For non-emergency referral, encourage the person to see
                      their GP as soon as possible. The GP can make a referral
                      to the local Early Intervention in Psychosis (EIP) team
                      or community mental health team (CMHT)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Crisis Team:</strong>{" "}
                      If the situation is urgent but not an immediate
                      emergency, contact the local mental health crisis team
                      (also called the crisis resolution and home treatment
                      team). They can assess the person at home and provide
                      intensive support to prevent hospital admission
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">A&amp;E:</strong>{" "}
                      If the person is in immediate danger, highly distressed,
                      or physically unwell, take them to A&amp;E or call 999
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Samaritans:</strong>{" "}
                      Call 116 123 (free, 24/7) for emotional support if the
                      person is feeling overwhelmed or suicidal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Hearing Voices Network:
                      </strong>{" "}
                      A peer support network for people who hear voices, see
                      visions, or have other unusual perceptions &mdash;
                      <em> www.hearing-voices.org</em>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rethink Mental Illness:</strong>{" "}
                      National charity providing information, support groups,
                      and advocacy for people affected by psychosis and
                      schizophrenia &mdash; <em>www.rethink.org</em>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    After the Incident:
                  </strong>{" "}
                  Supporting someone through a psychotic episode can be
                  emotionally intense. Make sure you debrief with a colleague,
                  supervisor, or mental health professional afterwards. It is
                  normal to feel shaken, worried, or unsure about whether you
                  did the right thing. Looking after your own mental health is
                  not selfish &mdash; it is essential. You cannot support others
                  effectively if you are running on empty yourself.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-4-section-2">
              Next: Eating Disorders
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
