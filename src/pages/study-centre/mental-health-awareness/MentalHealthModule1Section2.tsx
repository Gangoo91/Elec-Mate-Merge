import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Brain, Heart, CloudRain } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-depression-site-signs",
    question: "A colleague who is normally reliable and sociable has become withdrawn, is arriving late, and seems irritable over small things. Which condition does this pattern MOST commonly suggest?",
    options: [
      "A personality change that is not related to mental health",
      "Depression — withdrawal, irritability, and loss of motivation are key warning signs on site",
      "A physical health problem that has nothing to do with mental wellbeing",
      "Normal behaviour variation that does not require any concern"
    ],
    correctIndex: 1,
    explanation: "Withdrawal from colleagues, increased irritability (especially over small things), arriving late or increased absence, and loss of motivation are all common signs of depression as they present on a construction site. Depression in men often manifests as irritability and anger rather than the stereotypical 'sadness' — which is why it frequently goes unrecognised. These changes from someone's normal behaviour pattern are important warning signs."
  },
  {
    id: "mh-stress-vs-pressure",
    question: "What is the key difference between pressure and stress?",
    options: [
      "There is no difference — pressure and stress are the same thing",
      "Pressure is what you feel at work; stress is what you feel at home",
      "Pressure is a normal part of work that can be motivating; stress occurs when pressure exceeds your ability to cope and becomes harmful",
      "Stress only affects people who are not resilient enough to handle pressure"
    ],
    correctIndex: 2,
    explanation: "The distinction between pressure and stress is crucial. Pressure (having deadlines, targets, responsibilities) is a normal and often motivating part of work — many people perform at their best under reasonable pressure. Stress occurs when the pressure EXCEEDS your perceived ability to cope. The same level of pressure can be motivating for one person and stressful for another, depending on their resources, support, and circumstances at the time."
  },
  {
    id: "mh-substance-misuse-approach",
    question: "A worker on your site is clearly using alcohol to cope with stress and it is affecting their work. What is the MOST appropriate way to view this situation?",
    options: [
      "It is purely a disciplinary matter — they should be dismissed for misconduct",
      "It is none of your business — everyone has a right to drink as they please",
      "It should be understood as a mental health issue where the person is self-medicating, while also recognising the safety implications",
      "You should ignore it unless they arrive on site visibly intoxicated"
    ],
    correctIndex: 2,
    explanation: "Substance misuse in construction is frequently a symptom of underlying mental health problems — people use alcohol or drugs to cope with stress, anxiety, depression, or trauma. The most effective approach recognises it as both a mental health issue AND a safety concern. Purely disciplinary approaches drive the behaviour underground and fail to address the root cause. The person needs support and, potentially, professional help — not just punishment."
  }
];

const faqs = [
  {
    question: "What is the difference between feeling sad and having depression?",
    answer: "Everyone feels sad sometimes — it is a normal human emotion, especially in response to loss, disappointment, or difficulty. Sadness is typically temporary and linked to a specific event or situation. Depression is different in several key ways: it persists for at least two weeks (and often much longer), it may not have an obvious trigger, it affects multiple areas of life (sleep, appetite, energy, concentration, interest in activities), it feels overwhelming and inescapable, and it significantly impairs your ability to function day-to-day. The key distinction is severity, duration, and functional impact. If feelings of sadness persist for more than two weeks, are getting worse rather than better, or are affecting your ability to work and maintain relationships, it is worth seeking professional support."
  },
  {
    question: "Can you have more than one mental health condition at the same time?",
    answer: "Yes — this is actually very common and is called comorbidity. Research shows that anxiety and depression frequently occur together, with estimates suggesting that up to 60% of people with one condition also experience the other. Similarly, substance misuse often co-occurs with depression, anxiety, or PTSD. In construction, it is not unusual to see a worker experiencing chronic stress that has led to depression, which they are coping with through increased alcohol use — three interconnected conditions at once. This is why a holistic approach to mental health support is so important: treating one condition in isolation while ignoring the others is rarely effective."
  },
  {
    question: "Is burnout an actual medical condition or just a buzzword?",
    answer: "Burnout is now recognised by the World Health Organisation in the International Classification of Diseases (ICD-11) as an occupational phenomenon — specifically defined as a syndrome resulting from chronic workplace stress that has not been successfully managed. It has three defined dimensions: emotional exhaustion (feeling drained and unable to cope), depersonalisation (feeling detached or cynical about your work and the people you work with), and reduced personal accomplishment (feeling ineffective and questioning the value of what you do). While it is not classified as a standalone medical condition in the same way as depression, it is a recognised and serious occupational health issue that can lead to depression, anxiety, and physical health problems if not addressed."
  },
  {
    question: "If someone has PTSD from a site accident, should they leave the construction industry?",
    answer: "Not necessarily. With appropriate treatment — typically trauma-focused cognitive behavioural therapy (CBT) or eye movement desensitisation and reprocessing (EMDR) — many people with PTSD recover well and return to work successfully, including in construction. The decision about whether to continue in the industry should be made by the individual with support from mental health professionals, not imposed by employers or colleagues. For some, returning to the same type of work is an important part of recovery. For others, the triggers may make it too difficult. The key is that treatment is effective for most people with PTSD, and the condition does not automatically mean someone cannot continue working in construction."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT a core symptom of depression?",
    options: [
      "Persistent low mood lasting at least two weeks",
      "Loss of interest or pleasure in activities previously enjoyed",
      "Occasional nervousness before an important meeting",
      "Feelings of worthlessness or excessive guilt"
    ],
    correctAnswer: 2,
    explanation: "Occasional nervousness before an important event is a normal emotional response, not a symptom of depression. The core symptoms of depression include persistent low mood, loss of interest or pleasure (anhedonia), changes in appetite or weight, sleep disturbance, fatigue, difficulty concentrating, feelings of worthlessness or guilt, psychomotor agitation or retardation, and in severe cases, thoughts of death or suicide. These symptoms must persist for at least two weeks and cause significant impairment."
  },
  {
    id: 2,
    question: "Generalised Anxiety Disorder (GAD) is BEST described as:",
    options: [
      "Feeling nervous before a job interview or exam",
      "Persistent, excessive worry about multiple areas of life that the person finds difficult to control, lasting at least six months",
      "Having a specific fear of one particular thing, such as heights or spiders",
      "Experiencing panic attacks in crowded places"
    ],
    correctAnswer: 1,
    explanation: "GAD is characterised by persistent, excessive, and difficult-to-control worry about multiple areas of life (work, health, family, finances, everyday matters) for at least six months. It is not the same as normal worry — people with GAD often know their worry is disproportionate but cannot stop it. Physical symptoms include restlessness, muscle tension, difficulty sleeping, irritability, and difficulty concentrating. It differs from specific phobias (which focus on one thing) and panic disorder (which involves discrete panic attacks)."
  },
  {
    id: 3,
    question: "On a construction site, anxiety often presents as:",
    options: [
      "A worker talking openly about feeling anxious to everyone on site",
      "Avoidance of certain tasks, over-checking work, difficulty concentrating, and reluctance to take on responsibilities",
      "A worker taking excessive sick leave with no explanation",
      "Aggressive behaviour towards management and supervisors"
    ],
    correctAnswer: 1,
    explanation: "On site, anxiety commonly manifests as avoidance behaviours (not wanting to do certain tasks, especially at height or in confined spaces), over-checking work (checking installations repeatedly, seeking excessive reassurance), difficulty concentrating (making uncharacteristic errors), and reluctance to take on new responsibilities or make decisions. It may also show as physical symptoms — sweating, shaking, nausea, needing frequent toilet breaks. Workers rarely announce that they feel anxious; instead, these behavioural changes are the visible signs."
  },
  {
    id: 4,
    question: "According to the Maslach model, burnout has three key dimensions. Which of the following is one of them?",
    options: [
      "Physical injury from overwork",
      "Emotional exhaustion",
      "Financial difficulties",
      "Relationship breakdown"
    ],
    correctAnswer: 1,
    explanation: "The Maslach Burnout Inventory identifies three key dimensions of burnout: emotional exhaustion (feeling emotionally drained, overwhelmed, and unable to give any more), depersonalisation (developing a cynical, detached attitude towards work and colleagues), and reduced personal accomplishment (feeling ineffective, doubting the value of your work). While financial difficulties and relationship breakdown can contribute to burnout, they are not part of the Maslach model's definition of burnout itself."
  },
  {
    id: 5,
    question: "Which of the following is a common trigger for PTSD in the construction industry?",
    options: [
      "Having a disagreement with a colleague about the best method of installation",
      "Working overtime during a busy period on site",
      "Witnessing a serious accident, near-miss, or fatality on site",
      "Receiving negative feedback during a performance review"
    ],
    correctAnswer: 2,
    explanation: "PTSD develops after exposure to a traumatic event — one that involves actual or threatened death, serious injury, or violence. In construction, common triggers include witnessing a serious accident (a fall from height, a collapse, electrocution), experiencing a near-miss (almost being struck by falling materials), discovering or dealing with a fatality on site, or being involved in a rescue. Everyday workplace stressors like disagreements, overtime, or negative feedback are not sufficient to cause PTSD, though they can cause other stress-related conditions."
  },
  {
    id: 6,
    question: "Substance misuse in construction is best understood as:",
    options: [
      "A purely disciplinary issue that should be dealt with through sanctions and dismissal",
      "A lifestyle choice that has no connection to mental health",
      "Often a form of self-medication where people use substances to cope with underlying mental health problems",
      "Something that only affects a very small number of workers and is not a widespread issue"
    ],
    correctAnswer: 2,
    explanation: "Research consistently shows that substance misuse in construction frequently co-occurs with mental health problems. Many workers use alcohol or drugs as a way of coping with stress, anxiety, depression, trauma, chronic pain, or loneliness — particularly when working away from home. This is self-medication. While there are always safety implications that must be managed, a purely punitive approach fails to address the root cause and typically drives the behaviour underground rather than resolving it."
  },
  {
    id: 7,
    question: "A worker who witnessed a serious accident on site three months ago is now experiencing flashbacks, avoiding the area where it happened, and startling easily at loud noises. This pattern is MOST consistent with:",
    options: [
      "Normal stress that will pass on its own with time",
      "Generalised Anxiety Disorder",
      "Post-Traumatic Stress Disorder (PTSD)",
      "Depression"
    ],
    correctAnswer: 2,
    explanation: "This pattern — flashbacks to the traumatic event, avoidance of reminders (the area where it happened), and hypervigilance/exaggerated startle response (startling at loud noises) — is characteristic of PTSD. The symptoms have persisted for three months following a clearly traumatic event (witnessing a serious accident). While some stress responses after a traumatic event are normal and resolve within a few weeks, symptoms that persist beyond one month and cause significant distress or impairment indicate PTSD and warrant professional assessment."
  },
  {
    id: 8,
    question: "Which statement about the relationship between mental health conditions is MOST accurate?",
    options: [
      "Mental health conditions always occur in isolation — you can only have one at a time",
      "If you have anxiety, you are immune to depression because they are opposite conditions",
      "Comorbidity is common — anxiety and depression frequently occur together, and substance misuse often co-exists with other conditions",
      "Having one mental health condition means you will inevitably develop every other condition"
    ],
    correctAnswer: 2,
    explanation: "Comorbidity (having more than one condition at the same time) is very common in mental health. Research shows that up to 60% of people with depression also experience anxiety, and vice versa. Substance misuse frequently co-occurs with depression, anxiety, and PTSD. In construction, it is common to see workers experiencing multiple interconnected conditions — for example, chronic work stress leading to depression, leading to increased alcohol use. This is why holistic, person-centred support is so important."
  }
];

export default function MentalHealthModule1Section2() {
  useSEO({
    title: "Common Mental Health Conditions | Mental Health Awareness Module 1.2",
    description: "Learn about depression, anxiety disorders, stress and burnout, PTSD, and substance misuse — how they present and their specific impact on construction workers.",
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
            <Link to="../mental-health-module-1">
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Mental Health Conditions
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding depression, anxiety, stress, PTSD, and substance misuse &mdash; what they are, how they present, and how they show up on site
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Depression:</strong> More than sadness &mdash; affects thinking, feeling, and functioning</li>
              <li><strong>Anxiety:</strong> Persistent worry that interferes with daily life</li>
              <li><strong>Burnout:</strong> Exhaustion from chronic unmanaged workplace stress</li>
              <li><strong>PTSD:</strong> Lasting impact from traumatic events witnessed on site</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Recognition:</strong> You cannot help if you cannot recognise the signs</li>
              <li><strong>On site:</strong> These conditions affect safety, productivity, and relationships</li>
              <li><strong>Comorbidity:</strong> Conditions often overlap and compound each other</li>
              <li><strong>Treatment works:</strong> All of these conditions are treatable with the right support</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Describe the key symptoms of depression and how it commonly presents on a construction site",
              "Identify the main types of anxiety disorder and their physical symptoms",
              "Distinguish between healthy pressure and harmful stress using the stress response model",
              "Explain what PTSD is and identify common triggers in the construction industry",
              "Understand the relationship between substance misuse and mental health",
              "Recognise that comorbidity is common and conditions rarely occur in isolation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Depression */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Depression
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Depression is one of the most common mental health conditions in the UK, yet it remains one
                of the most misunderstood &mdash; particularly in the construction industry. It is far more
                than just feeling sad or having a bad day. Depression is a clinical condition that affects
                how you think, how you feel, how you behave, and how your body functions. It can affect
                anyone, at any age, regardless of how &ldquo;tough&rdquo; they are.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Types of Depression</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Major Depressive Disorder (MDD):</strong> The most commonly diagnosed form. Characterised by persistent low mood and/or loss of interest lasting at least two weeks, with multiple additional symptoms. Can range from mild to severe. Often occurs in episodes that may recur.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Persistent Depressive Disorder (Dysthymia):</strong> A chronic, lower-grade form of depression lasting at least two years. Symptoms are less severe than MDD but more persistent. People with dysthymia often describe themselves as &ldquo;just the way I am&rdquo; because it has been going on so long they have forgotten what &ldquo;normal&rdquo; feels like.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Seasonal Affective Disorder (SAD):</strong> Depression that follows a seasonal pattern, typically worsening during autumn and winter months when daylight hours reduce. Particularly relevant for construction workers who may be working in dark, cold conditions during winter months.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Symptoms of Depression</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Emotional Symptoms</p>
                    <ul className="text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Persistent sadness, emptiness, or numbness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Loss of interest or pleasure in activities previously enjoyed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Feelings of worthlessness, hopelessness, or excessive guilt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Irritability, frustration, or anger over small matters</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Physical Symptoms</p>
                    <ul className="text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Changes in appetite (eating much more or much less)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Sleep disturbance (insomnia or sleeping excessively)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Fatigue and loss of energy &mdash; even small tasks feel exhausting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Unexplained aches, pains, headaches, or digestive problems</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Cognitive Symptoms</p>
                    <ul className="text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Difficulty concentrating, making decisions, or remembering things</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Negative thinking patterns &mdash; everything feels hopeless</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Thoughts of death or suicide (in severe cases)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">How It Presents on Site</p>
                    <ul className="text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Withdrawal from colleagues &mdash; eating lunch alone, not joining in banter</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Increased irritability &mdash; snapping over small things, short fuse</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Increased absenteeism or persistent lateness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Drop in work quality or productivity, loss of motivation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                An important point: <strong>depression in men often looks different from the stereotypical
                image.</strong> While the classic picture of depression involves sadness and crying, men
                with depression are more likely to display irritability, anger, aggression, risk-taking
                behaviour, and substance misuse. In a male-dominated industry like construction, depression
                frequently hides behind a short temper, excessive drinking, or reckless behaviour. This is
                one of the main reasons it goes unrecognised and untreated.
              </p>

              <p>
                Depression affects approximately 1 in 10 people in the UK at any given time. In construction,
                the rates are believed to be higher due to the industry&rsquo;s unique risk factors.
                Crucially, depression is <strong>treatable</strong> &mdash; talking therapies (particularly
                cognitive behavioural therapy), medication, lifestyle changes, and social support all have
                strong evidence bases. The earlier someone seeks help, the better the outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Anxiety Disorders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Anxiety Disorders
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Anxiety is one of the most common mental health experiences &mdash; and in small doses, it
                is completely normal. Feeling anxious before a skills test, a job interview, or when starting
                on a new site is a natural human response. The problem arises when anxiety becomes
                <strong> persistent, excessive, and disproportionate</strong> to the situation, and when it
                starts to interfere with your ability to function day-to-day. That is when it becomes an
                anxiety disorder.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Anxiety Disorder</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Generalised Anxiety Disorder (GAD)</p>
                    <p className="text-white">Persistent, excessive worry about multiple areas of life &mdash;
                    work, health, family, finances, everyday situations. The worry feels uncontrollable and
                    is disproportionate to the actual likelihood of the feared event. To be diagnosed, symptoms
                    must persist for at least six months.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Panic Disorder</p>
                    <p className="text-white">Recurrent, unexpected panic attacks &mdash; sudden surges of
                    intense fear that peak within minutes. Symptoms include racing heart, sweating, trembling,
                    chest pain, nausea, dizziness, and a feeling of losing control or dying. Many people first
                    experience a panic attack and believe they are having a heart attack.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Social Anxiety Disorder</p>
                    <p className="text-white">Intense fear and avoidance of social situations due to fear of
                    being judged, embarrassed, or humiliated. In construction, this can present as reluctance
                    to speak up in toolbox talks, avoidance of social events, or difficulty asking questions
                    or raising concerns with supervisors.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Specific Phobias</p>
                    <p className="text-white">Intense, irrational fear of a specific object or situation &mdash;
                    such as heights (acrophobia), enclosed spaces (claustrophobia), or needles. In construction,
                    working at height or in confined spaces can trigger debilitating phobic responses that go
                    beyond normal caution.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg col-span-1 sm:col-span-2">
                    <p className="text-white font-medium mb-1">Obsessive-Compulsive Disorder (OCD)</p>
                    <p className="text-white">Characterised by unwanted, intrusive thoughts (obsessions) and
                    repetitive behaviours or mental acts (compulsions) performed to reduce anxiety. In
                    construction, OCD might present as excessive checking of work (far beyond normal quality
                    assurance), rigid rituals before starting tasks, or intense distress when routines are
                    disrupted. OCD is not about being &ldquo;tidy&rdquo; &mdash; it is a distressing
                    condition that can be debilitating.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Physical Symptoms of Anxiety</p>
                </div>
                <p className="text-sm text-white mb-2">
                  Anxiety is not just &ldquo;in your head&rdquo; &mdash; it produces real, physical symptoms
                  because it activates the body&rsquo;s fight-or-flight response:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <ul className="text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Racing or pounding heart</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Sweating, trembling, shaking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Shortness of breath, chest tightness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Nausea, stomach churning, diarrhoea</span>
                    </li>
                  </ul>
                  <ul className="text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Dizziness, lightheadedness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Muscle tension, headaches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Difficulty sleeping, restlessness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Dry mouth, frequent urination</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                <strong>How anxiety shows up on site:</strong> Workers with anxiety disorders may avoid certain
                tasks (especially those involving heights, confined spaces, or new challenges), over-check
                their work repeatedly, seek excessive reassurance from supervisors, struggle to concentrate
                (leading to uncharacteristic errors), appear restless or on edge, take frequent breaks
                (especially to the toilet), and be reluctant to take on new responsibilities. They may also
                call in sick frequently due to the physical symptoms of anxiety being misattributed to
                physical illness.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Stress-Related Conditions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Stress-Related Conditions
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Stress is perhaps the most commonly discussed mental health topic in construction &mdash; yet
                it is also one of the most misunderstood. The first and most important distinction to make is
                between <strong>pressure</strong> and <strong>stress</strong>. They are not the same thing,
                and conflating them leads to dangerous misconceptions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                    <p className="text-green-400 font-semibold text-sm mb-2">Pressure (Can Be Positive)</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Having deadlines, targets, and responsibilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Can be motivating &mdash; helps focus and drive performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Manageable when you have the right resources and support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Creates a sense of achievement when challenges are met</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-2">Stress (Always Harmful)</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Occurs when pressure exceeds your ability to cope</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Feels overwhelming, threatening, and unmanageable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Impairs performance, judgement, and decision-making</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>If chronic, leads to burnout, anxiety, depression, and physical illness</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                <strong>Acute stress</strong> is a short-term response to an immediate threat or challenge.
                Your body&rsquo;s fight-or-flight system activates, adrenaline surges, and you respond. Once
                the threat passes, your body returns to normal. This is healthy and adaptive. <strong>Chronic
                stress</strong> is what happens when the pressure is relentless and your body never gets a
                chance to recover. The stress hormones (cortisol, adrenaline) remain elevated, and over time
                this causes real damage to both your mental and physical health.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CloudRain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Burnout: The Maslach Model</p>
                </div>
                <p className="text-sm text-white mb-3">
                  When chronic workplace stress is not successfully managed, it can lead to <strong>burnout</strong>.
                  Psychologist Christina Maslach identified three key dimensions:
                </p>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">1. Emotional Exhaustion</p>
                    <p className="text-white">Feeling completely drained, overwhelmed, and unable to face another
                    day. You feel like you have nothing left to give. On site, this looks like a supervisor who
                    used to be energetic and engaged but now just goes through the motions, looks permanently
                    tired, and has lost all enthusiasm for the job.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">2. Depersonalisation (Cynicism)</p>
                    <p className="text-white">Developing a negative, cynical, or detached attitude towards your
                    work and the people you work with. You stop caring about the job, the team, or the outcome.
                    On site, this shows as someone who used to take pride in their work but now says things like
                    &ldquo;what&rsquo;s the point?&rdquo; or &ldquo;I couldn&rsquo;t care less.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">3. Reduced Personal Accomplishment</p>
                    <p className="text-white">Feeling ineffective and questioning the value of what you do. A
                    sense that nothing you do makes any difference. On site, this manifests as reduced
                    productivity, lack of initiative, and a worker who feels like they are failing even when
                    their output is adequate.</p>
                  </div>
                </div>
              </div>

              <p>
                <strong>Adjustment disorder</strong> is another stress-related condition worth knowing about.
                It occurs when someone has an unusually strong emotional or behavioural response to a
                stressful life event &mdash; such as job loss, bereavement, divorce, or a major change at
                work. The response is more intense than would normally be expected and causes significant
                impairment. In construction, common triggers include redundancy, being moved to a new site
                away from home, or a major change in working conditions.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Post-Traumatic Stress Disorder */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Post-Traumatic Stress Disorder
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Post-Traumatic Stress Disorder (PTSD) develops after exposure to a traumatic event &mdash;
                one that involves actual or threatened death, serious injury, or violence. It is not a sign
                of weakness. It is a recognised psychological response to an extraordinary experience that
                overwhelms a person&rsquo;s ability to cope. In the construction industry, where workers are
                exposed to physical danger daily, PTSD is a very real risk.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Common Triggers in Construction</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Witnessing a serious accident:</strong> Seeing a colleague fall from height, be struck by plant, suffer electrocution, or be caught in a collapse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Experiencing a near-miss:</strong> Being involved in an incident where you could have been seriously injured or killed &mdash; even if you were not physically harmed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Fatalities on site:</strong> Being present when a colleague or subcontractor dies, or being involved in the response to a fatality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Rescue and first aid:</strong> Being the person who provides first aid to a seriously injured colleague or who attempts to rescue someone from danger</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Repeated exposure:</strong> Being exposed to multiple incidents over a career, even if no single one seems &ldquo;traumatic enough&rdquo; on its own</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Symptoms of PTSD</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Re-Experiencing</p>
                    <p className="text-white">Flashbacks (reliving the event as if it is happening again),
                    nightmares, intrusive memories that come unbidden, and intense distress when exposed to
                    reminders of the event (sounds, sights, smells). A loud crash on site might trigger a
                    vivid flashback to an accident witnessed months ago.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Avoidance</p>
                    <p className="text-white">Deliberately avoiding places, people, activities, or situations
                    that trigger memories of the trauma. A worker might refuse to go near the area where an
                    accident happened, avoid working at height, or leave the industry altogether. They may
                    also avoid talking or thinking about the event.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Hyperarousal (Being &ldquo;On Edge&rdquo;)</p>
                    <p className="text-white">Exaggerated startle response (jumping at sudden noises),
                    hypervigilance (constantly scanning for danger), difficulty sleeping, irritability,
                    anger outbursts, difficulty concentrating, and reckless or self-destructive behaviour.
                    On site, this can manifest as someone who is jumpy, on edge, and easily angered.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Emotional Numbing</p>
                    <p className="text-white">Feeling detached from others, unable to experience positive
                    emotions, loss of interest in activities, feeling emotionally &ldquo;flat&rdquo; or
                    disconnected. This can be mistaken for not caring, when in reality the person is
                    overwhelmed and has shut down emotionally as a coping mechanism.</p>
                  </div>
                </div>
              </div>

              <p>
                <strong>Complex PTSD</strong> is a related condition that can develop after repeated or
                prolonged traumatic experiences, particularly in situations where escape felt impossible.
                In addition to the standard PTSD symptoms, Complex PTSD includes difficulties with emotional
                regulation (intense emotions that are hard to control), a negative self-concept (feeling
                permanently damaged or worthless), and relationship difficulties (difficulty trusting others
                or feeling connected).
              </p>

              <p>
                It is important to note that not everyone who experiences a traumatic event will develop PTSD.
                Many people experience acute stress reactions that resolve within a few weeks. PTSD is
                typically diagnosed when symptoms persist for more than one month after the event and cause
                significant distress or functional impairment. However, <strong>delayed-onset PTSD</strong>
                can occur months or even years after the traumatic event, making it harder to connect
                symptoms to their cause.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Treatment Works</p>
                <p className="text-sm text-white">
                  PTSD is treatable. NICE-recommended treatments include trauma-focused cognitive behavioural
                  therapy (TF-CBT) and eye movement desensitisation and reprocessing (EMDR). Both have strong
                  evidence bases. With appropriate treatment, many people with PTSD recover well and return to
                  their previous level of functioning. The key is accessing help &mdash; which requires
                  recognising the symptoms and overcoming the stigma that prevents so many construction
                  workers from seeking support.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Substance Misuse and Mental Health */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Substance Misuse and Mental Health
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Substance misuse and mental health are deeply intertwined, and nowhere is this relationship
                more visible than in the construction industry. Understanding this connection is essential
                because <strong>substance misuse is often a symptom of an underlying mental health
                problem</strong> &mdash; not the cause of it. Treating it purely as a disciplinary matter
                without addressing the root cause is ineffective and potentially dangerous.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Dual Diagnosis Connection</p>
                <p className="text-sm text-white mb-3">
                  <strong>Dual diagnosis</strong> (also called co-occurring disorders) refers to the presence
                  of both a mental health condition and a substance misuse problem at the same time. Research
                  shows this is extremely common:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Approximately <strong>50% of people with a severe mental health condition</strong> also have a substance misuse problem</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>People with depression are <strong>twice as likely</strong> to develop alcohol problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>People with anxiety disorders are <strong>2-3 times more likely</strong> to misuse alcohol or drugs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>PTSD and substance misuse co-occur at very high rates &mdash; many trauma survivors use substances to numb painful memories</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Self-Medication: Why People Use Substances to Cope</p>
                </div>
                <p className="text-sm text-white mb-2">
                  When people lack access to professional support &mdash; or when stigma prevents them from
                  seeking it &mdash; they often turn to substances as a way of managing their symptoms:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Alcohol to numb emotional pain:</strong> &ldquo;A few pints takes the edge off&rdquo; &mdash; alcohol temporarily reduces anxiety and numbs painful emotions, creating a powerful but destructive cycle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Cannabis to manage anxiety:</strong> Some people use cannabis to calm racing thoughts or reduce anxiety, not realising it can worsen these symptoms long-term</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Cocaine to combat depression:</strong> The temporary energy and confidence boost masks feelings of worthlessness and fatigue, but the crash afterwards makes depression worse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Painkillers for physical and emotional pain:</strong> Opioids numb both physical pain from manual labour and emotional suffering, creating high risk of dependence</span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>Prevalence in construction:</strong> Construction has some of the highest rates of
                substance misuse of any UK industry. Research suggests that construction workers are
                significantly more likely to engage in hazardous drinking than the general working population.
                The culture of &ldquo;going for a pint after work,&rdquo; working away from home with few
                social outlets, using substances to manage chronic pain from physical labour, and the pressure
                of the industry all contribute.
              </p>

              <p>
                <strong>The safety dimension:</strong> Substance misuse on a construction site is not just a
                health issue &mdash; it is a critical safety issue. Impaired workers make more errors, have
                slower reaction times, take greater risks, and are more likely to be involved in accidents.
                This is why it must be taken seriously. But the approach must be <strong>compassionate alongside
                being firm</strong> &mdash; recognising that the person likely needs help, not just
                punishment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Key Message</p>
                <p className="text-sm text-white">
                  Substance misuse in construction is a <strong>mental health issue</strong>, not just a
                  disciplinary one. When you see a colleague whose drinking has escalated, or who is using
                  drugs to get through the day, the question to ask is not &ldquo;why are they doing
                  this?&rdquo; but <strong>&ldquo;what pain are they trying to manage?&rdquo;</strong> This
                  shift in perspective &mdash; from judgement to compassion &mdash; is essential for
                  creating a culture where people feel safe to seek help.
                </p>
              </div>
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
                This section has given you a practical understanding of the most common mental health
                conditions you are likely to encounter in the construction industry. Let us recap the
                essential points:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Depression</strong> is more than sadness &mdash; it affects thinking, feeling, behaviour, and physical function. In men, it often presents as irritability and anger rather than visible sadness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Anxiety disorders</strong> involve persistent, excessive worry that interferes with daily life. Physical symptoms are real and can be mistaken for physical illness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Pressure and stress are different.</strong> Pressure can be motivating; stress occurs when pressure exceeds your ability to cope. Chronic stress leads to burnout.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>PTSD</strong> can develop after witnessing or experiencing traumatic events on site. Flashbacks, avoidance, hyperarousal, and emotional numbing are key symptoms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Substance misuse</strong> is often self-medication for underlying mental health problems. It needs compassion alongside firmness, not just discipline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Comorbidity is common</strong> &mdash; conditions frequently co-occur and compound each other. All of these conditions are treatable with the right support.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will focus specifically on
                  mental health in the construction industry &mdash; why our industry is particularly high-risk,
                  the cultural factors that make things worse, and the work-related and life factors that
                  compound the problem. This is where general mental health knowledge meets the specific
                  reality of life on site.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">If You Are Struggling Right Now</p>
                <p className="text-sm text-white">
                  If you have recognised yourself in any of the conditions described in this section, please
                  reach out for support. You do not need to manage this alone.
                </p>
                <ul className="text-sm text-white space-y-1.5 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Samaritans:</strong> 116 123 (free, 24/7, confidential)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Construction Industry Helpline:</strong> 0345 605 1956</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Mind Infoline:</strong> 0300 123 3393</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>FRANK (drugs):</strong> 0300 123 6600</span>
                  </li>
                </ul>
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
            <Link to="../mental-health-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-1-section-3">
              Next: Mental Health in Construction
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
