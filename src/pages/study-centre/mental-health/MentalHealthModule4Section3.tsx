import { ArrowLeft, CheckCircle, AlertTriangle, Shield, Heart, Brain, Users, MessageCircle, HandHeart, Ban } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pd-definition",
    question: "A colleague describes someone with a personality disorder as having a 'character flaw'. How should you understand personality disorders instead?",
    options: [
      "They are a sign of weakness and poor upbringing",
      "They are deeply ingrained patterns of behaviour that affect cognition, emotional responses, interpersonal functioning, and impulse control",
      "They are temporary mood problems that resolve on their own",
      "They only affect people who have experienced prison or homelessness"
    ],
    correctIndex: 1,
    explanation: "Personality disorders are deeply ingrained patterns of behaviour that deviate from cultural expectations and affect cognition, emotional responses, interpersonal functioning, and impulse control. They usually emerge in adolescence or early adulthood. They are NOT a character flaw, a sign of weakness, or a choice. They are recognised mental health conditions that often have roots in adverse childhood experiences and trauma."
  },
  {
    id: "trauma-informed-approach",
    question: "What is the key shift in thinking that a trauma-informed approach represents?",
    options: [
      "From 'what's your diagnosis?' to 'what medication do you need?'",
      "From 'what's wrong with you?' to 'what happened to you?'",
      "From 'you need to try harder' to 'you need more willpower'",
      "From 'this is your fault' to 'this is your parents' fault'"
    ],
    correctIndex: 1,
    explanation: "The trauma-informed approach represents a fundamental shift from asking 'what's wrong with you?' to 'what happened to you?' This recognises that many behaviours associated with personality disorders are survival responses developed in the context of adverse childhood experiences. Rather than blaming the individual, it seeks to understand their experiences and how those experiences have shaped their responses to the world."
  },
  {
    id: "validation-importance",
    question: "When supporting someone with BPD/EUPD who is in emotional distress, what is the SINGLE most important skill you can use?",
    options: [
      "Telling them to calm down and think rationally",
      "Giving them space and leaving them alone",
      "Validation — acknowledging their feelings are real and understandable",
      "Explaining that their reaction is disproportionate to the situation"
    ],
    correctIndex: 2,
    explanation: "Validation is the single most important skill when supporting someone with BPD/EUPD. Validation means acknowledging that their feelings are real and understandable, even if you don't fully understand the intensity of the reaction. It does NOT mean agreeing with everything they do or say. Telling someone to 'calm down' invalidates their experience and typically escalates distress. Leaving them alone can trigger abandonment fears. Explaining that their reaction is disproportionate is invalidating and unhelpful."
  }
];

const faqs = [
  {
    question: "Is a personality disorder the same as being a 'difficult person'?",
    answer: "Absolutely not. Personality disorders are recognised mental health conditions, not personality traits or choices. The behaviours associated with personality disorders — such as intense emotional reactions, fear of abandonment, or difficulty maintaining relationships — are often survival responses developed in the context of childhood trauma or adverse experiences. Labelling someone as 'difficult' dismisses their suffering and reinforces stigma. A person with a personality disorder is experiencing genuine distress, not choosing to be 'difficult'. The shift from 'difficult person' to 'person experiencing distress' is fundamental to compassionate, effective support."
  },
  {
    question: "Can people with personality disorders recover?",
    answer: "Yes. Recovery and significant improvement are absolutely possible. Research shows that many people with personality disorders, including BPD/EUPD, show substantial improvement over time, particularly with appropriate therapeutic support such as Dialectical Behaviour Therapy (DBT) or Schema Therapy. Many people no longer meet the diagnostic criteria after sustained treatment. Recovery is not always linear — there may be setbacks — but progress is achievable. The outdated belief that personality disorders are 'untreatable' is both inaccurate and harmful. Hope is essential, and every person with a personality disorder deserves access to evidence-based treatment."
  },
  {
    question: "What is the difference between BPD and EUPD?",
    answer: "BPD (Borderline Personality Disorder) and EUPD (Emotionally Unstable Personality Disorder) refer to the same condition. BPD is the term used in the American Diagnostic and Statistical Manual (DSM-5), whilst EUPD is the term used in the World Health Organisation's International Classification of Diseases (ICD-11). In UK mental health services, both terms are used, though there is a growing preference for EUPD or for moving away from diagnostic labels altogether in favour of formulation-based approaches. The term 'borderline' is considered outdated and unhelpful by many — it originally referred to being on the 'border' between neurosis and psychosis, a concept that is no longer clinically meaningful."
  },
  {
    question: "Why do people with BPD/EUPD sometimes engage in self-harm?",
    answer: "Self-harm in BPD/EUPD is typically a coping mechanism for managing overwhelming emotional pain, not a manipulation tactic or attention-seeking behaviour. People with BPD/EUPD experience emotions at a much higher intensity than most, and the emotional pain can feel genuinely unbearable. Self-harm may serve different functions: it may provide temporary relief from emotional agony, help the person feel 'real' during episodes of dissociation or emotional numbness, or be a way of communicating distress when words are not sufficient. Understanding self-harm as a coping strategy (rather than a character flaw) is essential for providing compassionate, non-judgemental support. Always take self-harm seriously and encourage the person to access professional support."
  },
  {
    question: "What is Dialectical Behaviour Therapy (DBT) and why is it recommended for BPD/EUPD?",
    answer: "DBT is a specialist talking therapy developed by Dr Marsha Linehan specifically for BPD/EUPD. It combines cognitive behavioural techniques with mindfulness and acceptance strategies. DBT teaches four key skill sets: mindfulness (being present in the moment), distress tolerance (surviving emotional crises without making things worse), emotional regulation (understanding and managing intense emotions), and interpersonal effectiveness (communicating needs and maintaining relationships). DBT is delivered through individual therapy, group skills training, telephone coaching, and therapist consultation teams. It is the most researched and evidence-based treatment for BPD/EUPD and has been shown to reduce self-harm, suicidal behaviour, and hospital admissions."
  },
  {
    question: "How should I respond if someone discloses a personality disorder diagnosis to me?",
    answer: "Respond with the same compassion and respect you would show to anyone disclosing any health condition. Thank them for trusting you with that information. Do not change your behaviour towards them, avoid them, or treat them differently in a negative way. Do not make assumptions about what their diagnosis means for their abilities or character. Ask them what support, if any, they would find helpful. Do not share their diagnosis with others without their explicit consent. Educate yourself about their condition so you can be an informed, supportive presence. Remember that they are a person first — their diagnosis is one part of their experience, not their entire identity."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Personality disorders typically first emerge during which life stage?",
    options: [
      "Early childhood (ages 2-5)",
      "Adolescence or early adulthood",
      "Middle age (ages 40-50)",
      "Old age (ages 65+)"
    ],
    correctAnswer: 1,
    explanation: "Personality disorders usually emerge during adolescence or early adulthood. This is the developmental period when personality consolidates and patterns of relating to others, managing emotions, and responding to stress become established. Whilst the roots often lie in childhood experiences (particularly adverse childhood experiences), the recognisable patterns of a personality disorder typically become apparent in adolescence and early adulthood."
  },
  {
    id: 2,
    question: "Which of the following is NOT a key feature of Borderline Personality Disorder / Emotionally Unstable Personality Disorder?",
    options: [
      "Intense and unstable relationships",
      "Fear of abandonment",
      "Persistent auditory hallucinations",
      "Emotional instability and impulsivity"
    ],
    correctAnswer: 2,
    explanation: "Persistent auditory hallucinations are NOT a key feature of BPD/EUPD — they are more commonly associated with psychotic disorders such as schizophrenia. The key features of BPD/EUPD include intense and unstable relationships, fear of abandonment, emotional instability, impulsivity, self-harm, identity disturbance, and dissociation. Whilst some people with BPD/EUPD may experience brief, stress-related paranoid thoughts or dissociative symptoms, persistent hallucinations are not characteristic of the condition."
  },
  {
    id: 3,
    question: "What does ACE stand for in the context of mental health and personality disorders?",
    options: [
      "Acute Clinical Episode",
      "Adverse Childhood Experiences",
      "Anxiety and Cognitive Exhaustion",
      "Assessment of Clinical Effectiveness"
    ],
    correctAnswer: 1,
    explanation: "ACE stands for Adverse Childhood Experiences. These are potentially traumatic events that occur during childhood (ages 0-17), including abuse (physical, emotional, sexual), neglect (physical, emotional), and household dysfunction (domestic violence, parental substance misuse, parental mental illness, parental separation, incarceration of a household member). Research has shown a strong link between the number of ACEs a person has experienced and their risk of developing mental health conditions, including personality disorders, in adulthood."
  },
  {
    id: 4,
    question: "Why does telling someone with emotional dysregulation to 'just calm down' typically NOT work?",
    options: [
      "Because they are choosing to be upset and refuse to cooperate",
      "Because they have difficulty managing emotional responses — the intensity and duration of their reactions are beyond simple voluntary control",
      "Because they have not been taught what the word 'calm' means",
      "Because they enjoy the attention they receive from being distressed"
    ],
    correctAnswer: 1,
    explanation: "Telling someone with emotional dysregulation to 'calm down' does not work because their difficulty managing emotional responses is beyond simple voluntary control. Emotional dysregulation means that emotional reactions are more intense, last longer, and are harder to recover from than for most people. The person is not choosing to be upset — their emotional regulation system is different. Telling them to calm down is like telling someone with a broken leg to 'just walk normally'. It invalidates their experience and typically increases distress because they already wish they could calm down but cannot."
  },
  {
    id: 5,
    question: "What is the most important skill when supporting someone with BPD/EUPD?",
    options: [
      "Giving firm, direct instructions about what they should do",
      "Setting strict boundaries and maintaining emotional distance",
      "Validation — acknowledging that their feelings are real and understandable",
      "Offering practical solutions to their problems"
    ],
    correctAnswer: 2,
    explanation: "Validation is the single most important skill. Validation means acknowledging that the person's feelings are real and understandable, even if you cannot fully understand the intensity of their reaction. It does not mean agreeing with everything or approving of every behaviour. A validating response might be: 'I can see that you are in a lot of pain right now, and that must be really difficult.' Validation helps de-escalate emotional crises, builds trust, and communicates that you take the person seriously. Without validation, other support strategies are far less effective."
  },
  {
    id: 6,
    question: "Which specialist therapy was developed specifically for BPD/EUPD?",
    options: [
      "Cognitive Behavioural Therapy (CBT)",
      "Eye Movement Desensitisation and Reprocessing (EMDR)",
      "Dialectical Behaviour Therapy (DBT)",
      "Person-Centred Counselling"
    ],
    correctAnswer: 2,
    explanation: "Dialectical Behaviour Therapy (DBT) was developed specifically for BPD/EUPD by Dr Marsha Linehan. It combines cognitive behavioural techniques with mindfulness and acceptance strategies. DBT teaches four key skill sets: mindfulness, distress tolerance, emotional regulation, and interpersonal effectiveness. It is the most researched and evidence-based treatment for BPD/EUPD. Whilst CBT, EMDR, and person-centred counselling can all be helpful for various mental health conditions, DBT was designed specifically to address the core difficulties of BPD/EUPD."
  },
  {
    id: 7,
    question: "Which of the following is an example of person-first language?",
    options: [
      "'She's a borderline'",
      "'He's a personality disorder case'",
      "'A person with BPD'",
      "'That difficult patient in bed 3'"
    ],
    correctAnswer: 2,
    explanation: "Person-first language puts the person before the diagnosis: 'a person with BPD' rather than 'a borderline'. This is important because it recognises the person's full identity and dignity rather than reducing them to a diagnostic label. 'She's a borderline', 'he's a personality disorder case', and 'that difficult patient' are all examples of dehumanising, stigmatising language that should never be used. The person is always more than their diagnosis."
  },
  {
    id: 8,
    question: "A colleague with BPD/EUPD becomes very distressed when a team member leaves for a new job. What is the most likely underlying fear driving this reaction?",
    options: [
      "Fear of having more work to do",
      "Fear of the unknown replacement",
      "Fear of abandonment",
      "Fear of change to office layout"
    ],
    correctAnswer: 2,
    explanation: "Fear of abandonment is one of the core features of BPD/EUPD. When someone they have formed a connection with leaves — even in a normal, expected workplace transition — it can trigger a deeply intense fear of abandonment that feels overwhelming. This is not an overreaction or attention-seeking; it is a genuine, painful emotional response rooted in past experiences. The most supportive response is to validate their feelings, provide reassurance, and give as much notice and consistency as possible during transitions."
  }
];

export default function MentalHealthModule4Section3() {
  useSEO({
    title: "Personality Disorders & Complex Needs | Mental Health Module 4.3",
    description: "Learn about personality disorders, BPD/EUPD, trauma-informed understanding, emotional dysregulation, validation skills, and avoiding stigma in mental health first aid.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../mental-health-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-400/20 border border-purple-500/30 mb-4">
            <Brain className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Personality Disorders &amp; Complex Needs
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding personality disorders, the role of trauma, emotional dysregulation, validation skills, and how to provide compassionate, stigma-free support
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-purple-400/80 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-purple-500/10 border-l-2 border-l-purple-500/50 border border-purple-500/30">
              <p className="font-semibold text-base text-purple-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Personality disorders</strong> are deeply ingrained patterns of behaviour &mdash; NOT a character flaw or a choice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>BPD/EUPD</strong> is the most commonly encountered personality disorder, affecting 1&ndash;2% of the population.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Trauma-informed care</strong> asks &ldquo;what happened to you?&rdquo; rather than &ldquo;what&rsquo;s wrong with you?&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Validation</strong> is the single most important skill when supporting someone with a personality disorder.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Recovery is possible:</strong> with the right support, people can and do make significant progress.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-purple-500/10 border-l-2 border-l-purple-500/50 border border-purple-500/30">
              <p className="font-semibold text-base text-purple-400 mb-2">For the Workplace</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Consistency and reliability</strong> are essential &mdash; be someone the person can depend on.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Clear boundaries</strong> protect both you and the person you are supporting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Don&rsquo;t take behaviours personally</strong> &mdash; they are often driven by fear, not malice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Use person-first language:</strong> &ldquo;person with BPD&rdquo; not &ldquo;borderline&rdquo;.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-purple-400/80 text-sm font-normal">&nbsp;</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Define personality disorders and explain why they are not a character flaw</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Describe the key features and prevalence of BPD/EUPD</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Explain the link between adverse childhood experiences (ACEs) and personality disorders</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Describe what emotional dysregulation means and why standard advice to &ldquo;calm down&rdquo; is ineffective</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Use validation as a key support skill, alongside appropriate boundaries</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Apply person-first language and challenge stigma around personality disorders</span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: What Are Personality Disorders? */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">01</span>
              What Are Personality Disorders?
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A personality disorder is a mental health condition characterised by <strong>deeply ingrained patterns
                of behaviour</strong> that deviate markedly from cultural expectations and are pervasive across a broad
                range of personal and social situations. These patterns are inflexible, long-standing, and lead to
                significant distress or impairment.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Brain className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-purple-300">Four Key Areas Affected</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-purple-300 font-medium text-sm mb-1">Cognition</p>
                    <p className="text-white/70 text-xs">The way a person perceives and interprets themselves, other people, and events around them</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-purple-300 font-medium text-sm mb-1">Emotional Responses</p>
                    <p className="text-white/70 text-xs">The range, intensity, instability, and appropriateness of emotional reactions</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-purple-300 font-medium text-sm mb-1">Interpersonal Functioning</p>
                    <p className="text-white/70 text-xs">The ability to form and maintain relationships with other people</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-purple-300 font-medium text-sm mb-1">Impulse Control</p>
                    <p className="text-white/70 text-xs">The ability to manage urges, reactions, and behaviours in the moment</p>
                  </div>
                </div>
              </div>

              <p>
                Personality disorders typically emerge during <strong>adolescence or early adulthood</strong>, the
                developmental period when personality consolidates and patterns of relating to the world become
                established. Whilst the roots often lie in childhood experiences, the recognisable patterns usually
                become apparent during the teenage years and early twenties.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Critical Understanding: NOT a Character Flaw</h3>
                </div>
                <p className="text-white/80 text-sm">
                  A personality disorder is <strong className="text-white">not a character flaw, a moral failing, a sign of
                  weakness, or a choice</strong>. It is a recognised mental health condition. The behaviours associated with
                  personality disorders are often survival responses that developed in the context of early adversity. The
                  person is not &ldquo;being difficult&rdquo; &mdash; they are experiencing genuine psychological distress.
                  Understanding this distinction is fundamental to providing effective, compassionate support.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-2">
                  <Shield className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Types of Personality Disorder
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  The diagnostic manuals describe several types of personality disorder, grouped into three clusters.
                  In practice, many people present with features from more than one type:
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <h4 className="text-purple-300 font-medium mb-1 text-sm">Cluster A &mdash; &lsquo;Suspicious&rsquo;</h4>
                    <p className="text-white/70 text-xs">Paranoid, schizoid, schizotypal personality disorders. Patterns of odd or eccentric thinking and behaviour.</p>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <h4 className="text-purple-300 font-medium mb-1 text-sm">Cluster B &mdash; &lsquo;Emotional and Impulsive&rsquo;</h4>
                    <p className="text-white/70 text-xs">Borderline (BPD/EUPD), antisocial, histrionic, narcissistic personality disorders. Patterns of dramatic, erratic behaviour and difficulty regulating emotions. BPD/EUPD is the most commonly encountered.</p>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <h4 className="text-purple-300 font-medium mb-1 text-sm">Cluster C &mdash; &lsquo;Anxious&rsquo;</h4>
                    <p className="text-white/70 text-xs">Avoidant, dependent, obsessive-compulsive personality disorders. Patterns of anxious, fearful thinking and behaviour.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: BPD/EUPD */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Borderline Personality Disorder / Emotionally Unstable Personality Disorder (BPD/EUPD)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                BPD/EUPD is the <strong>most commonly encountered personality disorder</strong> and the one you are most
                likely to come across in a mental health first aid context. It affects approximately <strong>1&ndash;2%
                of the population</strong> &mdash; roughly 1 in 50 to 1 in 100 people. It is heavily stigmatised, even
                within mental health services, making it essential that mental health first aiders understand the condition
                and challenge misinformation.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-400">
                  <Heart className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Key Features of BPD/EUPD
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Intense and Unstable Relationships</h4>
                        <p className="text-white/80 text-sm">
                          Relationships are often characterised by alternating between idealisation (&ldquo;you are the best
                          person in my life&rdquo;) and devaluation (&ldquo;you don&rsquo;t care about me at all&rdquo;). This
                          pattern &mdash; sometimes called &ldquo;splitting&rdquo; &mdash; reflects the person&rsquo;s intense
                          emotional responses, not a deliberate manipulation.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Fear of Abandonment</h4>
                        <p className="text-white/80 text-sm">
                          A pervasive, often overwhelming fear of being abandoned, rejected, or left alone. This fear can be
                          triggered by seemingly minor events &mdash; a late reply to a message, a cancelled plan, or a
                          colleague leaving the team. The emotional response is intense and genuine.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Emotional Instability</h4>
                        <p className="text-white/80 text-sm">
                          Rapid, intense mood changes that can happen within hours or even minutes. The person may shift from
                          calm to severely distressed, from joy to despair, in response to events that others might consider
                          minor. The emotions are <strong className="text-white">genuinely felt at full intensity</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Impulsivity</h4>
                        <p className="text-white/80 text-sm">
                          Acting without thinking, often driven by intense emotional states. This can include reckless spending,
                          substance use, binge eating, dangerous driving, or other behaviours that the person may later regret.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">5</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Self-Harm</h4>
                        <p className="text-white/80 text-sm">
                          Self-harm is common among people with BPD/EUPD. It is typically a <strong className="text-white">coping
                          mechanism</strong> for managing overwhelming emotional pain &mdash; NOT attention-seeking or
                          manipulation. Always take self-harm seriously.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">6</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Identity Disturbance</h4>
                        <p className="text-white/80 text-sm">
                          An unstable sense of self &mdash; the person may feel uncertain about who they are, what they value,
                          what they want from life, or where they fit in. They may dramatically change their goals, career plans,
                          values, or self-image.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">7</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Dissociation</h4>
                        <p className="text-white/80 text-sm">
                          Feeling disconnected from reality, from one&rsquo;s own body, or from one&rsquo;s emotions. This is
                          often a protective response to overwhelming stress or emotional pain. The person may describe feeling
                          &ldquo;numb&rdquo;, &ldquo;zoned out&rdquo;, or &ldquo;not real&rdquo;.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-violet-400">Stigma Within Mental Health Services</h3>
                <p className="text-white/80 text-sm">
                  BPD/EUPD is one of the most stigmatised diagnoses in mental health. Shockingly, this stigma exists
                  <strong className="text-white"> even within mental health services themselves</strong>. People with
                  BPD/EUPD report being treated as &ldquo;attention-seeking&rdquo;, being refused treatment, being labelled
                  as &ldquo;manipulative&rdquo;, and being told that their condition is &ldquo;untreatable&rdquo;. None of
                  this is acceptable. As a mental health first aider, you can challenge this stigma by treating every person
                  with compassion, dignity, and respect &mdash; regardless of their diagnosis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Trauma-Informed Understanding */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">03</span>
              Trauma-Informed Understanding
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Research has established a <strong>strong link between adverse childhood experiences (ACEs) and
                personality disorders</strong>. Many people who develop personality disorders have histories of
                childhood trauma, including physical abuse, emotional abuse, sexual abuse, neglect, domestic violence
                in the household, parental substance misuse, and parental mental illness. Understanding this link
                is essential for providing compassionate, effective support.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">The Fundamental Shift</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg text-center">
                    <Ban className="h-6 w-6 text-red-400 mx-auto mb-2" />
                    <p className="text-red-300 font-semibold text-sm mb-1">Old Approach</p>
                    <p className="text-white/80 text-lg font-bold">&ldquo;What&rsquo;s wrong with you?&rdquo;</p>
                    <p className="text-white/60 text-xs mt-2">Blames the individual, focuses on deficit, implies the person is flawed</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg text-center">
                    <Heart className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <p className="text-green-300 font-semibold text-sm mb-1">Trauma-Informed Approach</p>
                    <p className="text-white/80 text-lg font-bold">&ldquo;What happened to you?&rdquo;</p>
                    <p className="text-white/60 text-xs mt-2">Seeks to understand experiences, recognises survival responses, focuses on compassion</p>
                  </div>
                </div>
              </div>

              <p>
                A trauma-informed approach recognises that many behaviours associated with personality disorders are
                <strong> survival responses</strong> developed in the context of adversity. A child who grows up in an
                environment that is unpredictable, unsafe, or lacking in emotional attunement learns to adapt. Those
                adaptations &mdash; hypervigilance, emotional reactivity, difficulty trusting others, fear of
                abandonment &mdash; were once necessary for survival. In adulthood, these same adaptations cause
                distress and difficulty, but they were originally protective.
              </p>

              {/* ACEs Diagram */}
              <div className="bg-white/5 border border-purple-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Adverse Childhood Experiences (ACEs) &amp; Adult Mental Health Outcomes
                </h3>

                {/* ACEs categories */}
                <div className="flex flex-col items-center">
                  <div className="bg-purple-500/20 border-2 border-purple-400/60 rounded-lg px-6 py-3 text-center mb-3 w-full max-w-md">
                    <p className="text-purple-300 font-bold text-sm">ADVERSE CHILDHOOD EXPERIENCES (ACEs)</p>
                    <p className="text-white/60 text-xs mt-1">Events occurring during childhood (ages 0&ndash;17)</p>
                  </div>

                  {/* Three ACE categories */}
                  <div className="flex items-start justify-center gap-3 sm:gap-6 w-full max-w-3xl mb-3">
                    <div className="flex flex-col items-center w-1/3">
                      <div className="h-4 w-0.5 bg-purple-400/60" />
                      <div className="bg-red-500/15 border border-red-500/30 rounded-lg p-2 sm:p-3 w-full text-center">
                        <p className="text-red-300 font-bold text-[10px] sm:text-xs">ABUSE</p>
                        <ul className="text-white/60 text-[9px] sm:text-[10px] mt-1.5 space-y-0.5">
                          <li>Physical</li>
                          <li>Emotional</li>
                          <li>Sexual</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                      <div className="h-4 w-0.5 bg-purple-400/60" />
                      <div className="bg-amber-500/15 border border-amber-500/30 rounded-lg p-2 sm:p-3 w-full text-center">
                        <p className="text-amber-300 font-bold text-[10px] sm:text-xs">NEGLECT</p>
                        <ul className="text-white/60 text-[9px] sm:text-[10px] mt-1.5 space-y-0.5">
                          <li>Physical</li>
                          <li>Emotional</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                      <div className="h-4 w-0.5 bg-purple-400/60" />
                      <div className="bg-violet-500/15 border border-violet-500/30 rounded-lg p-2 sm:p-3 w-full text-center">
                        <p className="text-violet-300 font-bold text-[10px] sm:text-xs">HOUSEHOLD DYSFUNCTION</p>
                        <ul className="text-white/60 text-[9px] sm:text-[10px] mt-1.5 space-y-0.5">
                          <li>Domestic violence</li>
                          <li>Substance misuse</li>
                          <li>Mental illness</li>
                          <li>Parental separation</li>
                          <li>Incarceration</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  <div className="flex flex-col items-center mb-3">
                    <div className="h-5 w-0.5 bg-purple-400/40" />
                    <div className="bg-purple-500/20 border border-purple-400/40 rounded-full px-4 py-1.5">
                      <p className="text-purple-300 text-[10px] sm:text-xs font-semibold text-center">DISRUPTS HEALTHY DEVELOPMENT</p>
                    </div>
                    <div className="h-5 w-0.5 bg-purple-400/40" />
                  </div>

                  {/* Intermediate effects */}
                  <div className="bg-white/5 border border-purple-400/20 rounded-lg p-3 w-full max-w-lg text-center mb-3">
                    <p className="text-purple-300 font-medium text-xs mb-2">Developmental Impact</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-2.5 py-1 text-white/70 text-[10px] sm:text-xs">Difficulty regulating emotions</span>
                      <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-2.5 py-1 text-white/70 text-[10px] sm:text-xs">Insecure attachment</span>
                      <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-2.5 py-1 text-white/70 text-[10px] sm:text-xs">Hypervigilance</span>
                      <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-2.5 py-1 text-white/70 text-[10px] sm:text-xs">Low self-worth</span>
                      <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-2.5 py-1 text-white/70 text-[10px] sm:text-xs">Difficulty trusting others</span>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  <div className="flex flex-col items-center mb-3">
                    <div className="h-5 w-0.5 bg-purple-400/40" />
                    <div className="bg-purple-500/20 border border-purple-400/40 rounded-full px-4 py-1.5">
                      <p className="text-purple-300 text-[10px] sm:text-xs font-semibold text-center">INCREASED RISK IN ADULTHOOD</p>
                    </div>
                    <div className="h-5 w-0.5 bg-purple-400/40" />
                  </div>

                  {/* Adult outcomes */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-lg">
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2 text-center">
                      <p className="text-purple-300 font-medium text-[10px] sm:text-xs">Personality Disorders</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2 text-center">
                      <p className="text-purple-300 font-medium text-[10px] sm:text-xs">Depression</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2 text-center">
                      <p className="text-purple-300 font-medium text-[10px] sm:text-xs">Anxiety Disorders</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2 text-center">
                      <p className="text-purple-300 font-medium text-[10px] sm:text-xs">PTSD / C-PTSD</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2 text-center">
                      <p className="text-purple-300 font-medium text-[10px] sm:text-xs">Substance Misuse</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2 text-center">
                      <p className="text-purple-300 font-medium text-[10px] sm:text-xs">Self-Harm / Suicidality</p>
                    </div>
                  </div>
                </div>

                <p className="text-white/50 text-xs text-center mt-4 italic">
                  Research shows that the more ACEs a person has experienced, the greater the risk of mental health difficulties in adulthood. This is a dose-response relationship &mdash; more ACEs means more risk.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-2">
                  <Shield className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Why Trauma-Informed Care Is Essential
                </h3>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">It avoids retraumatisation.</strong> Without a trauma-informed approach,
                      well-meaning interventions can inadvertently mirror the original trauma &mdash; for example, feeling
                      powerless, being judged, or being abandoned.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">It builds trust.</strong> People who have experienced trauma often have
                      profound difficulty trusting others. A trauma-informed approach prioritises safety, consistency, and
                      transparency.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">It shifts blame away from the individual.</strong> Instead of asking
                      &ldquo;why can&rsquo;t they just behave normally?&rdquo;, a trauma-informed approach understands that
                      their behaviour makes sense in the context of their experiences.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">It promotes recovery.</strong> When people feel understood rather than
                      judged, they are more likely to engage with support and make progress.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Emotional Dysregulation */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">04</span>
              Emotional Dysregulation
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Emotional dysregulation is the <strong>difficulty managing emotional responses</strong>. For people
                with personality disorders, particularly BPD/EUPD, emotions are experienced at a much higher
                intensity, for a longer duration, and with a slower return to baseline than for most people.
                This is not a choice or a lack of effort &mdash; it is a fundamental difference in how the
                emotional system functions.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-400">What Emotional Dysregulation Looks Like</h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-purple-300 font-bold text-2xl mb-1">Intensity</p>
                    <p className="text-white/70 text-xs">Emotions are felt at a much higher level than most people experience. Where someone might feel mildly annoyed, a person with dysregulation feels furious.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-purple-300 font-bold text-2xl mb-1">Duration</p>
                    <p className="text-white/70 text-xs">Emotional reactions last much longer. Recovery from an emotional event that might take minutes for most people can take hours or even days.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-purple-300 font-bold text-2xl mb-1">Sensitivity</p>
                    <p className="text-white/70 text-xs">Emotional reactions are triggered more easily. Events that others might not notice at all can trigger an intense emotional response.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">
                  <Brain className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  The &ldquo;Emotional Bus&rdquo; Analogy
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Imagine you are a bus driver. Most people&rsquo;s emotional passengers sit quietly in the back. When
                  something happens, a few passengers might stand up and shout, but they settle down fairly quickly and
                  the driver can maintain control.
                </p>
                <p className="text-white/80 text-sm mb-3">
                  For someone with emotional dysregulation, the bus is packed with passengers who are <strong className="text-white">all
                  standing, all shouting at once, and grabbing the steering wheel</strong>. The emotions are louder,
                  more insistent, more overwhelming, and much harder to manage. The driver (the person) is doing their
                  absolute best to keep the bus on the road, but sometimes the passengers overwhelm them.
                </p>
                <p className="text-white/80 text-sm">
                  This analogy helps illustrate why telling someone to &ldquo;just calm down&rdquo; is unhelpful &mdash;
                  they are already fighting with everything they have to manage the overwhelming noise inside.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-2">Common Triggers</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-3 py-1.5 text-white/80 text-xs">Perceived rejection</span>
                  <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-3 py-1.5 text-white/80 text-xs">Feeling ignored</span>
                  <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-3 py-1.5 text-white/80 text-xs">Change in plans</span>
                  <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-3 py-1.5 text-white/80 text-xs">Criticism</span>
                  <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-3 py-1.5 text-white/80 text-xs">Conflict</span>
                  <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-3 py-1.5 text-white/80 text-xs">Being left out</span>
                  <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-3 py-1.5 text-white/80 text-xs">Uncertainty</span>
                  <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-3 py-1.5 text-white/80 text-xs">Feeling misunderstood</span>
                  <span className="bg-purple-500/20 border border-purple-400/30 rounded-full px-3 py-1.5 text-white/80 text-xs">Reminders of past trauma</span>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Why &ldquo;Calm Down&rdquo; Does Not Work</h3>
                </div>
                <p className="text-white/80 text-sm mb-3">
                  Traditional advice to &ldquo;calm down&rdquo;, &ldquo;take a deep breath&rdquo;, or &ldquo;just relax&rdquo;
                  is <strong className="text-white">counterproductive</strong> for someone experiencing emotional dysregulation.
                  Here is why:
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">It invalidates their experience.</strong> It implies their reaction is wrong, excessive, or unreasonable.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">They already want to calm down.</strong> They are already fighting to manage their emotions &mdash; telling them to do what they are already desperately trying to do adds frustration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">It typically escalates the situation.</strong> The person feels unheard and dismissed, which intensifies their distress.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">It assumes voluntary control.</strong> Emotional dysregulation means the person&rsquo;s emotional responses are beyond simple voluntary control &mdash; like telling someone with a broken leg to &ldquo;just walk normally&rdquo;.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">Distress Tolerance Skills</h3>
                <p className="text-white/80 text-sm mb-3">
                  Rather than trying to eliminate the emotion (which is not possible in the moment), <strong className="text-white">distress
                  tolerance</strong> skills help a person survive an emotional crisis without making things worse. These are
                  skills taught in DBT and include:
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">TIPP:</strong> Temperature (cold water on face), Intense exercise, Paced breathing, Progressive muscle relaxation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">Distraction:</strong> Activities that occupy the mind until the emotional wave passes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">Self-soothing:</strong> Using the five senses to ground and comfort oneself</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">Radical acceptance:</strong> Accepting the present moment without judgement &mdash; &ldquo;this is happening, and I can survive it&rdquo;</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: How to Support */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">05</span>
              How to Support
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Supporting someone with a personality disorder requires a specific set of skills. The good news is
                that these skills are learnable, and even small acts of compassion and consistency can make a
                significant difference to someone who is struggling.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <HandHeart className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-purple-300">Validation &mdash; The Single Most Important Skill</h3>
                </div>
                <p className="text-white/80 text-sm mb-3">
                  Validation means <strong className="text-white">acknowledging that the person&rsquo;s feelings are
                  real and understandable</strong>, even if you cannot fully understand the intensity of their reaction.
                  Validation does NOT mean:
                </p>
                <ul className="text-white/80 text-sm space-y-2 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Agreeing with everything they say or do</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Approving of harmful behaviour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Telling them they are right when they are not</span>
                  </li>
                </ul>
                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-300 font-semibold text-sm mb-2">Invalidating Responses</p>
                    <ul className="text-white/60 text-xs space-y-1.5">
                      <li>&ldquo;You&rsquo;re overreacting.&rdquo;</li>
                      <li>&ldquo;It&rsquo;s not that big a deal.&rdquo;</li>
                      <li>&ldquo;Just calm down.&rdquo;</li>
                      <li>&ldquo;Other people have it worse.&rdquo;</li>
                      <li>&ldquo;You shouldn&rsquo;t feel that way.&rdquo;</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-300 font-semibold text-sm mb-2">Validating Responses</p>
                    <ul className="text-white/60 text-xs space-y-1.5">
                      <li>&ldquo;I can see you are in a lot of pain right now.&rdquo;</li>
                      <li>&ldquo;That sounds really difficult.&rdquo;</li>
                      <li>&ldquo;It makes sense that you feel that way.&rdquo;</li>
                      <li>&ldquo;I&rsquo;m here and I&rsquo;m not going anywhere.&rdquo;</li>
                      <li>&ldquo;Your feelings are valid.&rdquo;</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">
                  <Users className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Other Key Support Strategies
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Consistency and Reliability</h4>
                        <p className="text-white/80 text-sm">
                          Be someone the person can depend on. If you say you will do something, do it. If you say you
                          will be there, be there. Inconsistency can trigger fear of abandonment and erode trust. A
                          reliable presence is profoundly therapeutic for someone who has experienced unpredictability.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Clear Boundaries</h4>
                        <p className="text-white/80 text-sm">
                          Boundaries are not punishment &mdash; they are a framework that provides safety and predictability
                          for both you and the person you are supporting. State boundaries clearly and kindly:
                          &ldquo;I care about you, and I need to leave at 5pm today. I will be back tomorrow.&rdquo; Boundaries
                          should be <strong className="text-white">consistent, communicated clearly, and maintained with
                          compassion</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Avoid Rejection and Abandonment Triggers</h4>
                        <p className="text-white/80 text-sm">
                          Be mindful that seemingly small actions can trigger intense abandonment fear. Give notice before
                          changes. Explain absences. Avoid sudden withdrawals of support. If you need to end a conversation
                          or leave, explain when you will be available again.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Don&rsquo;t Take Behaviours Personally</h4>
                        <p className="text-white/80 text-sm">
                          When someone with BPD/EUPD lashes out, withdraws, or says hurtful things, it is almost always
                          driven by <strong className="text-white">fear, pain, or an emotional crisis</strong> &mdash; not
                          by a desire to hurt you. Try to see past the behaviour to the distress beneath it. This is not
                          easy, but it is essential.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-purple-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">5</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Patience</h4>
                        <p className="text-white/80 text-sm">
                          Progress is often slow and non-linear. There will be setbacks. The person may test your
                          reliability (often unconsciously) because their past experience has taught them that people
                          leave. Your continued, patient presence communicates safety and builds trust over time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-violet-400">
                  <MessageCircle className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Specialist Support
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Whilst your support as a mental health first aider is valuable, personality disorders benefit
                  from specialist therapeutic input. The two most effective evidence-based therapies are:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-violet-300 font-medium text-sm mb-1">Dialectical Behaviour Therapy (DBT)</p>
                    <p className="text-white/70 text-xs">
                      Developed specifically for BPD/EUPD. Combines cognitive behavioural techniques with mindfulness.
                      Teaches four key skill sets: mindfulness, distress tolerance, emotional regulation, and interpersonal
                      effectiveness. The most researched treatment for BPD/EUPD.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-violet-300 font-medium text-sm mb-1">Schema Therapy</p>
                    <p className="text-white/70 text-xs">
                      Integrates elements from CBT, attachment theory, and experiential therapy. Focuses on identifying
                      and changing deeply held patterns (&ldquo;schemas&rdquo;) that developed in childhood and now cause
                      distress. Particularly effective for complex personality difficulties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Avoiding Labels and Stigma */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">06</span>
              Avoiding Labels &amp; Stigma
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The language we use matters enormously. Diagnostic labels can be helpful for accessing treatment and
                understanding patterns, but they can also be weaponised &mdash; used to dismiss, dehumanise, and
                exclude. As a mental health first aider, you have a responsibility to use language that upholds
                the dignity and humanity of every person.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-400">Person-First Language</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-300 font-semibold text-sm mb-2">Never Say</p>
                    <ul className="text-white/60 text-xs space-y-1.5">
                      <li className="flex items-start gap-2">
                        <Ban className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>&ldquo;She&rsquo;s a borderline.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ban className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>&ldquo;He&rsquo;s a PD case.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ban className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>&ldquo;That difficult patient.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ban className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>&ldquo;Personality disordered.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ban className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>&ldquo;Manipulative.&rdquo;</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-300 font-semibold text-sm mb-2">Instead Say</p>
                    <ul className="text-white/60 text-xs space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>&ldquo;A person with BPD.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>&ldquo;A person living with a personality disorder.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>&ldquo;A person who is in distress.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>&ldquo;A person with complex emotional needs.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>&ldquo;A person who is communicating distress.&rdquo;</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-2">
                  <AlertTriangle className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  The Danger of &ldquo;Difficult Patient&rdquo; Narratives
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  When a person is labelled as &ldquo;difficult&rdquo;, &ldquo;manipulative&rdquo;, or
                  &ldquo;attention-seeking&rdquo;, it fundamentally changes how others interact with them. Staff may
                  become dismissive, avoidant, or hostile. The person picks up on this change in attitude, which
                  confirms their deepest fear &mdash; that they are fundamentally unlovable and will be abandoned.
                  This creates a devastating cycle:
                </p>
                <div className="bg-white/5 border border-purple-400/20 p-4 rounded-lg">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="bg-purple-500/20 border border-purple-400/40 rounded-lg px-4 py-2 text-center">
                      <p className="text-purple-300 text-xs font-medium">Person expresses distress</p>
                    </div>
                    <div className="h-3 w-0.5 bg-purple-400/40" />
                    <div className="bg-purple-500/20 border border-purple-400/40 rounded-lg px-4 py-2 text-center">
                      <p className="text-purple-300 text-xs font-medium">Labelled as &ldquo;difficult&rdquo; or &ldquo;manipulative&rdquo;</p>
                    </div>
                    <div className="h-3 w-0.5 bg-purple-400/40" />
                    <div className="bg-purple-500/20 border border-purple-400/40 rounded-lg px-4 py-2 text-center">
                      <p className="text-purple-300 text-xs font-medium">Others become dismissive or avoidant</p>
                    </div>
                    <div className="h-3 w-0.5 bg-purple-400/40" />
                    <div className="bg-purple-500/20 border border-purple-400/40 rounded-lg px-4 py-2 text-center">
                      <p className="text-purple-300 text-xs font-medium">Person feels rejected &amp; abandoned</p>
                    </div>
                    <div className="h-3 w-0.5 bg-purple-400/40" />
                    <div className="bg-purple-500/20 border border-purple-400/40 rounded-lg px-4 py-2 text-center">
                      <p className="text-purple-300 text-xs font-medium">Distress intensifies &amp; behaviours escalate</p>
                    </div>
                    <div className="h-3 w-0.5 bg-purple-400/40" />
                    <div className="bg-red-500/20 border border-red-400/40 rounded-lg px-4 py-2 text-center">
                      <p className="text-red-300 text-xs font-medium">Cycle repeats &mdash; confirming the label</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  <Heart className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Recovery and Hope
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  It is essential to know and communicate that <strong className="text-white">recovery and progress
                  are possible</strong>. The outdated belief that personality disorders are &ldquo;untreatable&rdquo;
                  is both inaccurate and harmful. Research shows:
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>Many people with BPD/EUPD show <strong className="text-white">significant improvement</strong> with appropriate treatment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>A substantial proportion <strong className="text-white">no longer meet the diagnostic criteria</strong> after sustained therapeutic input</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>Recovery is not always linear &mdash; there may be setbacks &mdash; but the trajectory can be <strong className="text-white">overwhelmingly positive</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>Evidence-based therapies such as <strong className="text-white">DBT and Schema Therapy</strong> have strong outcomes data</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <HandHeart className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-purple-300">Every Person Deserves Compassion</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Regardless of diagnosis, behaviour, or history, <strong className="text-white">every person deserves
                  to be treated with compassion and dignity</strong>. A personality disorder does not diminish someone&rsquo;s
                  humanity or their right to respectful care. As a mental health first aider, you may be the first
                  person who truly listens, validates, and treats someone with a personality disorder as a
                  <strong className="text-white"> whole person</strong> rather than a label. That can be transformative.
                  Never underestimate the impact of simply being kind, consistent, and present.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-purple-400/80 text-sm font-normal">&nbsp;</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="Section 3 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../mental-health-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../mental-health-module-4-section-4">
              Next: Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
