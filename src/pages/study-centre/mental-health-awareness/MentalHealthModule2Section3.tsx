import { ArrowLeft, Heart, CheckCircle, CloudRain, Wind, Activity, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "depression-understanding-1",
    question: "Why is it important to understand that depression is a clinical condition, not just 'feeling sad'?",
    options: [
      "Because it makes people feel special to have a diagnosis",
      "Because understanding it as a medical condition reduces stigma, encourages treatment-seeking, and recognises it's not about 'just cheering up'",
      "Because only clinical conditions deserve sympathy",
      "Because it means you can't do anything about it — it's purely biological"
    ],
    correctIndex: 1,
    explanation: "Understanding depression as a clinical condition (not just normal sadness) is crucial because: (1) It reduces stigma and blame — it's not about being weak or dramatic, (2) It recognises that clinical depression doesn't respond to 'just think positive' — it requires proper treatment, (3) It encourages people to seek help rather than trying to 'tough it out', (4) It helps others understand why someone can't just 'snap out of it'. However, recognising it as clinical doesn't mean it's untreatable — depression is highly treatable with talking therapies, medication, or both."
  },
  {
    id: "depression-men-1",
    question: "How does depression often manifest differently in men compared to 'classic' symptoms?",
    options: [
      "Men never get depressed — it only affects women",
      "Men experience exactly the same symptoms as women in all cases",
      "Men are more likely to express depression as anger, irritability, risk-taking, and substance use rather than sadness or tearfulness",
      "Depression in men is always less severe than in women"
    ],
    correctIndex: 2,
    explanation: "Research shows that men often experience and express depression differently. While 'classic' symptoms include low mood, sadness, and tearfulness, men are more likely to show: anger and irritability (rather than sadness), aggression (verbal or physical), increased risk-taking (reckless behaviour), working excessively to avoid feelings, increased alcohol or drug use, and physical complaints (aches and pains). This doesn't mean men don't feel sad — they do — but male socialisation often makes men more comfortable expressing distress as anger rather than vulnerability. Understanding this helps us recognise depression in men who might not fit the 'textbook' picture."
  },
  {
    id: "anxiety-vs-normal-1",
    question: "What's the difference between normal anxiety (which everyone experiences) and an anxiety disorder?",
    options: [
      "There is no difference — any anxiety at all is a disorder",
      "Anxiety disorders involve excessive, persistent worry that's disproportionate to the situation and significantly impairs daily functioning",
      "Normal anxiety doesn't cause any physical symptoms, but anxiety disorders do",
      "Only people with diagnosed anxiety disorders ever feel anxious"
    ],
    correctIndex: 1,
    explanation: "Normal anxiety is a healthy response to genuine threats or challenges — it helps us stay alert and perform well. An anxiety disorder occurs when: (1) The anxiety is excessive or disproportionate to the actual threat, (2) It's persistent — lasting for weeks or months, (3) It significantly impairs functioning — affecting work, relationships, and quality of life, (4) It occurs even when there's no clear threat. Both normal and disorder-level anxiety involve physical symptoms (racing heart, sweating, etc.) — the difference is in the severity, duration, and impact on life."
  }
];

const faqs = [
  {
    question: "Can someone have both depression and anxiety at the same time?",
    answer: "Yes — in fact, this is extremely common. Research shows that around 50-60% of people with depression also experience anxiety disorders, and vice versa. The two conditions often co-occur because they share similar brain chemistry, risk factors, and triggers. Someone might be depressed about their situation (low mood, hopelessness, loss of interest) while also being anxious about the future (worry, fear, panic). Both conditions are treatable, often with the same approaches (CBT, antidepressants, lifestyle changes). If you're experiencing symptoms of both, it's important to mention this to your GP."
  },
  {
    question: "If I notice signs of depression in a colleague, should I tell them I think they're depressed?",
    answer: "No — don't diagnose. Only qualified professionals can diagnose mental health conditions. What you should do is: (1) Share what you've noticed: 'I've noticed you seem different lately — quieter than usual, not yourself', (2) Express concern: 'I'm worried about you. Is everything okay?', (3) Listen without judgement, (4) Suggest they speak to their GP if they're struggling: 'Have you thought about chatting to your doctor? They can really help with this kind of thing.' You're not saying 'you have depression' — you're saying 'I've noticed changes and I care about you'. That's exactly the right approach."
  },
  {
    question: "What are PHQ-9 and GAD-7 and why should I know about them?",
    answer: "PHQ-9 (Patient Health Questionnaire-9) and GAD-7 (Generalised Anxiety Disorder-7) are short questionnaires that GPs use to assess the severity of depression and anxiety. You don't need to use them yourself (that's the GP's job), but knowing they exist is helpful because: (1) You can reassure someone that their GP has proper tools to assess what they're experiencing, (2) You understand that mental health can be measured and assessed, not just guessed at, (3) You can say: 'The GP will probably ask you some questions about how you've been feeling — it's just to understand how best to help you.' It demystifies the process and makes seeking help less scary."
  },
  {
    question: "How long do symptoms need to last before it's considered clinical depression or an anxiety disorder?",
    answer: "For a diagnosis of depression, symptoms typically need to be present most of the day, nearly every day, for at least two weeks, and be causing significant distress or impairment. For generalised anxiety disorder, excessive worry needs to be present more days than not for at least six months. However, you don't need to wait these timeframes before seeking help. If someone is experiencing severe symptoms (suicidal thoughts, panic attacks, complete inability to function), they should see a GP immediately. If symptoms are moderate but persistent (lasting a couple of weeks and not improving), that's also a good time to seek help. Don't wait until you've met some arbitrary timeframe — early intervention is better."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Clinical depression is:",
    options: [
      "Just feeling sad or having a bad day",
      "A medical condition affecting brain chemistry, mood, thinking, and physical health — distinct from normal sadness",
      "Something that only affects people with traumatic childhoods",
      "A sign of personal weakness or failure"
    ],
    correctAnswer: 1,
    explanation: "Clinical depression is a recognised medical condition that affects neurotransmitters in the brain (particularly serotonin, norepinephrine, and dopamine), mood regulation, thinking patterns, and physical health. It's distinct from normal sadness in its severity, duration, and impact. It's not a character flaw, weakness, or something people can just 'snap out of'. It's a treatable medical condition, just like diabetes or asthma."
  },
  {
    id: 2,
    question: "According to diagnostic criteria, to meet the threshold for major depressive disorder, symptoms must be present:",
    options: [
      "For at least one day",
      "For at least two weeks, most of the day, nearly every day",
      "For at least six months",
      "Only during the winter months"
    ],
    correctAnswer: 1,
    explanation: "For a diagnosis of major depressive disorder, symptoms must be present for at least two weeks, occurring most of the day, nearly every day. This duration criterion helps distinguish clinical depression from normal sadness or grief, which typically improve over days rather than persisting for weeks. However, you don't need to wait two weeks to seek help — if symptoms are severe, help should be sought immediately."
  },
  {
    id: 3,
    question: "Depression in men often manifests as:",
    options: [
      "Only sadness and crying, exactly like in women",
      "Men never experience depression",
      "Anger, irritability, aggression, risk-taking, and increased substance use rather than 'classic' sadness",
      "Physical symptoms only, with no emotional component"
    ],
    correctAnswer: 2,
    explanation: "Research shows that men often experience and express depression differently from the 'textbook' presentation. Men with depression are more likely to show: irritability and anger (rather than sadness), aggression (verbal or physical), increased risk-taking behaviour, working excessively, increased alcohol/drug use, and physical complaints. This doesn't mean men don't feel sad — they do — but male socialisation often makes men express distress as anger rather than vulnerability. Recognising this 'male-pattern depression' is crucial in construction."
  },
  {
    id: 4,
    question: "On a construction site, signs that someone might be experiencing depression include:",
    options: [
      "One day of feeling tired after working late",
      "Persistent withdrawal from the team, loss of interest in work, increased absence, irritability, fatigue despite rest, and comments about hopelessness or worthlessness",
      "Being serious and professional rather than joining in with banter",
      "Working efficiently and keeping to themselves"
    ],
    correctAnswer: 1,
    explanation: "Depression on site might look like: persistent withdrawal from team social activities, loss of interest in work they used to care about, increased absence (especially vague illness), visible fatigue despite rest, irritability and short temper, slowed movement or speech, difficulty concentrating, decline in work quality, changes in appearance, and comments about feeling worthless, hopeless, or like a burden. The key is change from their normal behaviour, and persistence over time."
  },
  {
    id: 5,
    question: "The fight-flight-freeze response is:",
    options: [
      "A sign of mental illness that needs treatment",
      "The body's normal, healthy response to perceived threat — preparing to fight, run, or freeze",
      "Something that only happens to people with anxiety disorders",
      "A weakness that strong people don't experience"
    ],
    correctAnswer: 1,
    explanation: "The fight-flight-freeze response is the body's automatic, protective response to perceived danger. When you perceive a threat, your amygdala triggers the sympathetic nervous system, releasing adrenaline and cortisol. This causes: increased heart rate, rapid breathing, muscle tension, heightened senses, and blood flow redirected to major muscles. This is completely normal and adaptive — it's what kept our ancestors alive. The problem in anxiety disorders is that this response is triggered by situations that aren't genuinely dangerous, or stays activated long after the threat has passed."
  },
  {
    id: 6,
    question: "Generalised Anxiety Disorder (GAD) is characterised by:",
    options: [
      "Occasional worry about genuine problems",
      "Fear of one specific thing, like heights or spiders",
      "Excessive, uncontrollable worry about many different things, lasting at least six months, causing significant distress and impairment",
      "Anxiety that only occurs in social situations"
    ],
    correctAnswer: 2,
    explanation: "Generalised Anxiety Disorder involves excessive, difficult-to-control worry about multiple areas of life (work, health, family, finances, etc.) that lasts at least six months and significantly impairs functioning. It's different from normal worry (which is proportionate and time-limited), specific phobias (fear of one thing), social anxiety (only in social situations), or panic disorder (sudden panic attacks). GAD is characterised by constant, free-floating anxiety about everything."
  },
  {
    id: 7,
    question: "Signs of anxiety on a construction site might include:",
    options: [
      "Careful, methodical work and attention to safety procedures",
      "Excessive worry about tasks, avoidance of certain work, constant reassurance-seeking, physical symptoms like shaking or sweating, difficulty relaxing, and inability to concentrate",
      "Following method statements and risk assessments",
      "One instance of nervousness before a difficult task"
    ],
    correctAnswer: 1,
    explanation: "Anxiety on site might manifest as: excessive worry about routine tasks ('What if I get this wrong?'), avoidance of work that triggers anxiety, constantly seeking reassurance from supervisors, visible physical symptoms (shaking, sweating, nausea, pale, rapid breathing), difficulty concentrating, irritability, being unable to relax during breaks, sleep difficulties affecting work, and in severe cases, panic attacks. This is distinct from healthy caution or normal pre-task nervousness — it's disproportionate, persistent, and impairing."
  },
  {
    id: 8,
    question: "The PHQ-9 and GAD-7 are:",
    options: [
      "Medications used to treat depression and anxiety",
      "Validated questionnaires that GPs use to assess the severity of depression (PHQ-9) and anxiety (GAD-7)",
      "Blood tests that diagnose mental health conditions",
      "Types of therapy for treating mental illness"
    ],
    correctAnswer: 1,
    explanation: "PHQ-9 (Patient Health Questionnaire-9) and GAD-7 (Generalised Anxiety Disorder-7) are short, validated questionnaires that GPs use to assess symptom severity. PHQ-9 asks 9 questions about depression symptoms over the past two weeks, scored 0-27. GAD-7 asks 7 questions about anxiety symptoms, also scored. These scores help GPs assess severity (mild, moderate, severe) and decide on treatment. They're screening tools, not diagnostic tests — but they're very useful for measuring symptoms and monitoring response to treatment. You don't diagnose yourself with these, but knowing they exist demystifies the GP visit."
  }
];

export default function MentalHealthModule2Section3() {
  useSEO({
    title: "Depression and Anxiety — What to Look For | Mental Health Module 2.3",
    description: "Understand depression and anxiety as clinical conditions, how they manifest in construction workers and men, and the PHQ-9 and GAD-7 screening tools.",
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
            <Link to="../mental-health-module-2">
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Depression and Anxiety &mdash; What to Look For
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding these common mental health conditions and how they manifest in construction workers
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Depression and anxiety are medical conditions</strong> — not weakness</li>
              <li><strong>Men express depression differently</strong> — often as anger, not sadness</li>
              <li><strong>Anxiety is excessive, persistent worry</strong> — beyond normal concern</li>
              <li><strong>Both are treatable</strong> — recovery is possible with proper support</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Insight</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>50% of men with depression show anger</strong> — not 'classic' low mood</li>
              <li><strong>Anxiety causes real physical symptoms</strong> — racing heart, shaking, nausea</li>
              <li><strong>Duration matters</strong> — 2+ weeks of persistent symptoms is the threshold</li>
              <li><strong>GPs have assessment tools</strong> — PHQ-9 and GAD-7 measure severity</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Define depression as a clinical condition distinct from normal sadness",
              "Explain how depression manifests differently in men",
              "Recognise signs of depression in construction colleagues",
              "Understand anxiety disorders and the fight-flight-freeze response",
              "Identify signs of anxiety on a construction site",
              "Describe the PHQ-9 and GAD-7 screening tools and their purpose"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Understanding Depression */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Understanding Depression
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Depression is one of the most common mental health problems in the UK — and one of the most misunderstood.
                It's not about being sad. It's not about having a bad day, week, or even month. <strong>Depression is
                a clinical condition</strong> that affects brain chemistry, thinking, mood, behaviour, and physical health.
                Understanding what depression actually is — and what it isn't — is the first step to recognising it in yourself or others.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CloudRain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">What Depression Is</p>
                </div>
                <p className="text-sm text-white mb-2">
                  Clinical depression (also called major depressive disorder) is a medical condition characterised by:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Persistent low mood or sadness</strong> — lasting most of the day, nearly every day, for at least two weeks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Loss of interest or pleasure</strong> (anhedonia) — things you used to enjoy don't bring pleasure anymore</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Significant impact on functioning</strong> — affecting work, relationships, self-care, daily activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Changes in brain chemistry</strong> — particularly affecting neurotransmitters like serotonin, norepinephrine, and dopamine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>A cluster of other symptoms</strong> — fatigue, sleep problems, appetite changes, difficulty concentrating, feelings of worthlessness or guilt, thoughts of death</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Depression is NOT:</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Normal sadness:</strong> Everyone feels sad sometimes — after loss, disappointment, or setbacks. Normal sadness improves over days or weeks. Depression persists for weeks or months and doesn't respond to positive events.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>A sign of weakness:</strong> Depression is not about being 'soft', 'weak', or 'not tough enough'. It's a medical condition that can affect anyone, regardless of strength, resilience, or character.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Something you can just 'snap out of':</strong> Telling someone with depression to 'cheer up' or 'think positive' is like telling someone with a broken leg to 'just walk it off'. The condition affects the brain's ability to regulate mood.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Attention-seeking or being dramatic:</strong> Depression is profoundly unpleasant. Nobody would choose to feel this way. It's a genuine health problem, not performance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Untreatable:</strong> Depression is highly treatable. Talking therapies (especially CBT), antidepressant medication, lifestyle changes, and social support are all effective. Most people who receive appropriate treatment recover or significantly improve.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Depression</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Major Depressive Disorder (MDD)</p>
                    <p className="text-sm text-white">
                      The most common form. Characterised by persistent low mood and loss of interest lasting at least
                      two weeks, causing significant impairment. Can be mild, moderate, or severe. Episodes can be
                      recurrent (coming back multiple times over life) or single episode.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Persistent Depressive Disorder (Dysthymia)</p>
                    <p className="text-sm text-white">
                      Chronic, lower-level depression lasting at least two years. It's less severe than MDD but lasts much
                      longer. People often describe it as 'I've felt like this for so long, I don't remember what normal feels like.'
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Seasonal Affective Disorder (SAD)</p>
                    <p className="text-sm text-white">
                      Depression that follows a seasonal pattern, typically occurring in autumn/winter and improving in
                      spring/summer. Related to reduced sunlight affecting brain chemistry. More common in northern latitudes.
                      Treated with light therapy, antidepressants, and talking therapy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Duration Matters — When Sadness Becomes Depression</p>
                <p className="text-sm text-white mb-2">
                  The key distinction is persistence and severity:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Normal sadness or grief:</strong> Improves gradually over days to weeks. You have good moments. Positive events still bring some pleasure. You can still function (even if it's hard). You can still see hope for the future.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Clinical depression:</strong> Persists for weeks or months with no improvement. Low mood is constant — there are no good moments. Nothing brings pleasure — even things you used to love. Functioning becomes very difficult or impossible. The future looks hopeless.</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>The two-week threshold:</strong> Diagnostic criteria require symptoms to be present for at least two
                  weeks. This helps distinguish depression from normal sadness. However, you don't need to wait two weeks
                  to seek help — if symptoms are severe (especially suicidal thoughts), get help immediately.
                </p>
              </div>

              <p>
                Understanding depression as a medical condition — not a character flaw or a choice — is fundamental to
                reducing stigma, encouraging help-seeking, and supporting recovery. In construction, where there's still
                significant stigma around mental health, this understanding is particularly important.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Recognising Depression on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Recognising Depression on Site
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Depression doesn't announce itself with a sign. On a construction site, where the culture values toughness
                and stoicism, people are often very good at hiding how they're really feeling. But there are observable
                signs — changes in behaviour, appearance, work quality, and mood — that can alert you that someone is struggling.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Signs of Depression on a Construction Site</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Persistent Withdrawal from Team and Social Activities</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>No longer joining the team for breaks — eating alone, staying in their van</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Not engaging in conversation — withdrawn, quiet, giving one-word answers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Declining social invitations they would previously have accepted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Isolating themselves physically on site where possible</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm mb-1">Loss of Interest in Work</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Someone who used to take pride in their work now seems apathetic — 'good enough' becomes the standard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Not volunteering for tasks they used to enjoy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Going through the motions with no enthusiasm or engagement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Comments like 'What's the point?' or 'Does it even matter?'</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm mb-1">Increased Absence</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>More frequent sick days, often for vague complaints (not feeling well, stomach problems, headaches)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Pattern of Monday absences or single days off</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Increasingly late arrival to site</span>
                      </li>
                    </ul>
                    <p className="text-sm text-white mt-2">
                      Depression makes getting out of bed extremely difficult. What looks like 'skiving' or lack of commitment
                      might actually be profound exhaustion and loss of motivation caused by depression.
                    </p>
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm mb-1">Visible Fatigue and Low Energy</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Looking exhausted despite adequate sleep (or claiming they slept but still being exhausted)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Moving slowly, slowed speech and reactions (psychomotor retardation)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Needing more breaks than usual, struggling to maintain pace</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Frequent comments about being tired, exhausted, having no energy</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm mb-1">Irritability and Short Temper (Especially in Men)</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Snapping at colleagues over minor issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Reacting disproportionately to small frustrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Having a very short fuse when they're usually calm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Increased conflict with others</span>
                      </li>
                    </ul>
                    <p className="text-sm text-white mt-2">
                      This is particularly important: for many men, depression manifests as anger rather than sadness. Persistent
                      irritability — especially when it represents a change — can be a sign of underlying depression.
                    </p>
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm mb-1">Changes in Appearance</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Looking unkempt or dishevelled when they're usually well-presented</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Decline in personal hygiene</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Weight loss or gain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Looking drawn, pale, or unwell consistently</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm mb-1">Comments Indicating Hopelessness or Worthlessness</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>'I'm useless' or 'I'm rubbish at this'</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>'What's the point?' or 'Nothing matters anyway'</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>'Everyone would be better off without me' (CRITICAL — this is a suicide warning sign)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>'I can't see things getting better'</span>
                      </li>
                    </ul>
                    <p className="text-sm text-white mt-2">
                      These comments reveal how depression distorts thinking. Take them seriously. They're not just 'having
                      a moan' — they're expressions of genuine despair.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Key is Change</p>
                <p className="text-sm text-white">
                  You're not looking for someone who's naturally quiet, or who's having one bad day. You're looking for
                  <strong> persistent changes from their normal behaviour</strong> over a period of weeks. Someone who's
                  usually chatty becoming withdrawn. Someone who takes pride in their work becoming apathetic. Someone
                  who's usually patient becoming irritable. It's the change — and its persistence — that matters.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Understanding Anxiety */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Understanding Anxiety
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Everyone experiences anxiety. It's a normal, healthy response to threat or challenge — the feeling of
                nervousness before an important task, the worry when something could go wrong, the alertness in a
                dangerous situation. <strong>Anxiety becomes a problem</strong> when it's excessive, persistent,
                disproportionate to the actual threat, and significantly impairs your ability to function.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wind className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Normal Anxiety vs Anxiety Disorders</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold text-sm mb-2">Normal, Adaptive Anxiety</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Proportionate to the threat or challenge</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Time-limited — passes once the situation resolves</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Improves performance (eustress)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Manageable — you can still function</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Example: Nervousness before a test that helps you focus and prepare</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-2">Anxiety Disorder</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Excessive and disproportionate to actual risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Persistent — lasting weeks or months</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Impairs performance and functioning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Overwhelming — significantly affects daily life</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Example: Constant, uncontrollable worry about everything, with physical symptoms, preventing normal functioning</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Fight-Flight-Freeze Response</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Understanding the body's stress response helps explain why anxiety causes such intense physical symptoms.
                  When you perceive a threat (real or imagined), your amygdala (the brain's alarm system) triggers the
                  sympathetic nervous system, causing:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Adrenaline and cortisol release</strong> — stress hormones flood your system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Increased heart rate</strong> — pumping blood to major muscles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Rapid breathing</strong> — getting more oxygen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Muscle tension</strong> — preparing to fight or run</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Heightened senses</strong> — better able to detect threats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Digestive system slows</strong> — blood diverted from non-essential functions (causing nausea, butterflies)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Sweating</strong> — cooling the body for action</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>This is completely normal and adaptive.</strong> If you're facing a real threat (fire, electrical
                  hazard, falling object), this response could save your life. The problem in anxiety disorders is that
                  this response is triggered by situations that aren't genuinely dangerous, or stays activated long after
                  the threat has passed. The body is constantly in 'threat mode', which is exhausting and debilitating.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Anxiety Disorders</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Generalised Anxiety Disorder (GAD)</p>
                    <p className="text-sm text-white">
                      Excessive, uncontrollable worry about many different things (work, health, family, finances, etc.)
                      lasting at least six months. The worry is difficult to control, causes significant distress, and
                      affects daily functioning. Physical symptoms include restlessness, fatigue, difficulty concentrating,
                      irritability, muscle tension, and sleep disturbance. GAD is the 'constant, free-floating anxiety
                      about everything' disorder.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Panic Disorder and Panic Attacks</p>
                    <p className="text-sm text-white">
                      Panic attacks are sudden episodes of intense fear with severe physical symptoms: racing heart,
                      chest pain, sweating, shaking, shortness of breath, dizziness, nausea, feelings of unreality or
                      detachment, and fear of dying or losing control. They peak within minutes and are terrifying.
                      Panic disorder is when panic attacks become recurrent and you develop persistent fear of having
                      another attack (anticipatory anxiety). This can lead to avoidance of situations where attacks have
                      occurred. Important: panic attacks feel like heart attacks — if someone is experiencing these
                      symptoms for the first time, seek medical assessment to rule out physical causes.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Social Anxiety Disorder</p>
                    <p className="text-sm text-white">
                      Intense fear of social situations where you might be judged, embarrassed, or humiliated. This goes
                      beyond normal shyness — it's fear so severe that it causes avoidance of social situations (meetings,
                      toolbox talks, eating with colleagues) and significantly affects work and relationships. Physical
                      symptoms include blushing, sweating, trembling, nausea, and difficulty speaking.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Health Anxiety (Hypochondriasis)</p>
                    <p className="text-sm text-white">
                      Excessive worry about having a serious illness, despite medical reassurance. Constantly checking
                      for symptoms, repeatedly visiting doctors, or conversely avoiding medical appointments for fear of
                      finding something wrong. The anxiety about illness becomes a problem in itself.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Specific Phobias</p>
                    <p className="text-sm text-white">
                      Intense, irrational fear of a specific object or situation. In construction, relevant phobias include:
                      heights (acrophobia), confined spaces (claustrophobia), electricity, blood/injury. The fear is
                      disproportionate to actual danger and causes significant avoidance or extreme distress. Treatment
                      (gradual exposure therapy) is highly effective for specific phobias.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Anxiety disorders are the most common mental health problems in the UK — affecting around 1 in 10 people
                at any time. They're highly treatable with Cognitive Behavioural Therapy (CBT), medication, or both.
                The problem is that many people don't seek help because they think anxiety is 'just part of life' or
                they're embarrassed. Understanding what anxiety disorders are helps people recognise when their anxiety
                has crossed the line from normal to clinical — and when treatment could help.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Recognising Anxiety on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Recognising Anxiety on Site
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Anxiety on a construction site can look different from textbook descriptions. People might not say 'I'm
                feeling anxious' — but their behaviour, physical symptoms, and work patterns reveal what's happening.
                Here's what to look for:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Behavioural Signs of Anxiety</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Excessive Worry About Tasks and Safety</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Worrying excessively about routine tasks they've done hundreds of times</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Catastrophising: 'What if I get this wrong? What if something terrible happens?'</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Persistent worry about things that might go wrong, even when precautions are in place</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Unable to reassure themselves even when safety measures are explained</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm mb-1">Avoidance of Certain Work or Situations</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Avoiding tasks that trigger anxiety (heights, confined spaces, working alone, public speaking at toolbox talks)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Making excuses to not do certain types of work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Procrastination — putting off tasks because thinking about them causes anxiety</span>
                      </li>
                    </ul>
                    <p className="text-sm text-white mt-2">
                      Avoidance provides short-term relief but makes anxiety worse long-term. It also limits what work
                      someone can do, affecting their career.
                    </p>
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm mb-1">Constant Reassurance-Seeking</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Repeatedly asking supervisors or colleagues if they're doing something right</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Checking and rechecking work excessively</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Unable to trust their own judgement — always needing external validation</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm mb-1">Difficulty Relaxing</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Unable to switch off during breaks — still worrying</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Restlessness — fidgeting, pacing, unable to sit still</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Always 'on edge' or tense</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Physical Signs of Anxiety</p>
                <p className="text-sm text-white mb-3">
                  Anxiety causes very real, observable physical symptoms. On site, you might notice:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Shaking or trembling</strong> — particularly in hands, making fine motor tasks difficult</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Sweating</strong> — disproportionate to temperature or exertion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Looking pale or flushed</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Rapid breathing or hyperventilation</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Nausea or stomach problems</strong> — frequent trips to toilet, feeling sick</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Dizziness or light-headedness</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Tense muscles, particularly neck, shoulders, jaw</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Rapid heartbeat</strong> — might mention chest tightness or heart racing</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  These physical symptoms are genuinely distressing. Someone experiencing them isn't being 'dramatic' —
                  their body is in fight-flight mode even though there's no immediate physical danger. If someone mentions
                  chest pain or difficulty breathing, always take it seriously — it could be anxiety, but it could also
                  be a medical emergency. When in doubt, seek medical assessment.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Impact on Work Performance</p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Difficulty concentrating</strong> — mind is consumed by worry, can't focus on tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Perfectionism and slowness</strong> — taking much longer because of excessive checking and fear of mistakes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Increased errors</strong> — paradoxically, anxiety about making mistakes leads to more mistakes due to impaired concentration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Procrastination</strong> — avoiding starting tasks because thinking about them causes anxiety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Absenteeism</strong> — calling in sick when anxiety becomes overwhelming, especially for tasks that trigger anxiety</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Panic Attacks on Site</p>
                <p className="text-sm text-white mb-2">
                  If someone has a panic attack on site, it's terrifying for them and alarming to witness. Signs include:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Sudden onset of intense fear and physical symptoms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Racing heart, chest pain, difficulty breathing, dizziness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Feeling like they're dying, losing control, or going crazy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Need to escape, sit down, or get fresh air</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>What to do:</strong> (1) Stay calm and reassuring, (2) Move them somewhere safe and quiet if
                  possible, (3) Encourage slow, deep breathing, (4) Reassure them it will pass (panic attacks peak in
                  10 minutes), (5) Don't leave them alone, (6) If it's their first time or symptoms are severe, seek
                  medical assessment — chest pain and breathing difficulty need to be checked. Once the attack passes,
                  suggest they see their GP — panic attacks are treatable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: PHQ-9 and GAD-7 Screening Tools */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            PHQ-9 and GAD-7 Screening Tools
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You're not expected to diagnose depression or anxiety — that's the job of doctors and mental health
                professionals. However, it's useful to know about the tools that GPs use to assess symptoms. This helps
                demystify the process and can make it easier to encourage someone to seek help.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">PHQ-9 (Patient Health Questionnaire-9)</p>
                </div>
                <p className="text-sm text-white mb-3">
                  The PHQ-9 is a validated questionnaire used to screen for and assess the severity of depression. It
                  asks 9 questions about symptoms experienced over the past two weeks:
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mb-3">
                  <p className="text-sm font-medium text-white mb-2">The 9 Questions Ask About:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Little interest or pleasure in doing things</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Feeling down, depressed, or hopeless</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Trouble falling asleep, staying asleep, or sleeping too much</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Feeling tired or having little energy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Poor appetite or overeating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Feeling bad about yourself — or that you're a failure or have let yourself or your family down</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Trouble concentrating on things</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Moving or speaking so slowly that others have noticed, or being so fidgety or restless that you've been moving around more than usual</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Thoughts that you would be better off dead or of hurting yourself</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-white mb-2">
                  Each question is scored 0-3 based on how often you've experienced that symptom:
                </p>
                <ul className="text-sm text-white space-y-1 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>0 = Not at all</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>1 = Several days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>2 = More than half the days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>3 = Nearly every day</span>
                  </li>
                </ul>
                <p className="text-sm text-white mb-2">
                  <strong>Total scores range from 0-27 and indicate severity:</strong>
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>0-4: Minimal or none</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>5-9: Mild depression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>10-14: Moderate depression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>15-19: Moderately severe depression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>20-27: Severe depression</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">GAD-7 (Generalised Anxiety Disorder-7)</p>
                </div>
                <p className="text-sm text-white mb-3">
                  The GAD-7 is a validated questionnaire used to screen for and assess the severity of generalised anxiety
                  disorder. It asks 7 questions about symptoms over the past two weeks:
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mb-3">
                  <p className="text-sm font-medium text-white mb-2">The 7 Questions Ask About:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Feeling nervous, anxious, or on edge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Not being able to stop or control worrying</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Worrying too much about different things</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Trouble relaxing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Being so restless that it's hard to sit still</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Becoming easily annoyed or irritable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Feeling afraid as if something awful might happen</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-white mb-2">
                  Same scoring system as PHQ-9 (0-3 per question), total scores 0-21:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>0-4: Minimal anxiety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>5-9: Mild anxiety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>10-14: Moderate anxiety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>15-21: Severe anxiety</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Why This Matters for You</p>
                <p className="text-sm text-white mb-2">
                  You're not using these tools to diagnose colleagues. But knowing they exist is valuable because:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>It demystifies the GP visit:</strong> You can reassure someone that 'the doctor will ask you some questions to understand how you've been feeling — it's just to work out how best to help you'. This makes seeking help less scary.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>It shows that mental health can be measured:</strong> Depression and anxiety aren't just vague feelings — they're measurable conditions with validated assessment tools. This helps counter stigma.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>It helps you understand severity:</strong> Recognising that depression and anxiety exist on a spectrum (mild to severe) helps you understand that not all cases look the same.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>It reinforces that you're not diagnosing:</strong> These are professional tools. Your role is to notice, check in, listen, and signpost — not to assess or diagnose.</span>
                  </li>
                </ul>
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
                You now understand depression and anxiety as clinical conditions, how they manifest in construction
                workers (particularly men), and the tools used to assess them. Key points:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Depression is a medical condition</strong> affecting brain chemistry, not just sadness. It's characterised by persistent low mood, loss of interest, and significant impairment lasting at least two weeks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Men often express depression differently</strong> — as anger, irritability, aggression, and risk-taking rather than 'classic' sadness. Recognising this is crucial in construction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Signs of depression on site</strong> include withdrawal, loss of interest in work, increased absence, fatigue, irritability, changes in appearance, and comments about hopelessness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Anxiety disorders involve excessive, persistent worry</strong> that's disproportionate to actual threat and significantly impairs functioning. Normal anxiety is proportionate and time-limited.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The fight-flight-freeze response</strong> explains why anxiety causes intense physical symptoms. This is the body's normal threat response — in anxiety disorders, it's triggered inappropriately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Signs of anxiety on site</strong> include excessive worry, avoidance, constant reassurance-seeking, physical symptoms (shaking, sweating, nausea), difficulty concentrating, and inability to relax.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>PHQ-9 and GAD-7</strong> are validated questionnaires that GPs use to assess severity of depression and anxiety. Knowing these exist helps demystify the process of seeking help.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4 (the final section of Module 2), we'll
                  address the most difficult topic: crisis situations, suicidal thoughts, and self-harm. This section
                  will teach you how to recognise warning signs of suicidal intent, what to do if you're concerned, and
                  how to respond with compassion and confidence. This could genuinely save a life.
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
          title="Section 3 Knowledge Check"
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
            <Link to="../mental-health-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Understanding Stress
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-2-section-4">
              Next: Crisis and Suicidal Thoughts
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
