import {
  ArrowLeft,
  Cloud,
  CheckCircle,
  AlertTriangle,
  Brain,
  Zap,
  Heart,
  Shield,
  Activity,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quick-check questions (inline throughout the article)              */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "anxiety-normal-vs-disorder",
    question:
      "What is the key difference between normal anxiety and an anxiety disorder?",
    options: [
      "Normal anxiety only lasts a few seconds",
      "An anxiety disorder is persistent, excessive, and interferes with daily life",
      "Only people with anxiety disorders experience physical symptoms",
      "Normal anxiety never includes worry about the future",
    ],
    correctIndex: 1,
    explanation:
      "Everyone experiences anxiety from time to time — it is a normal human response to perceived threat. Anxiety becomes a disorder when it is persistent, disproportionate to the situation, and significantly interferes with everyday life, work, and relationships. Physical symptoms can occur in both normal anxiety and anxiety disorders.",
  },
  {
    id: "fight-flight-freeze",
    question:
      "Which hormone is primarily responsible for the immediate 'fight-or-flight' response in the body?",
    options: [
      "Serotonin",
      "Insulin",
      "Adrenaline (epinephrine)",
      "Melatonin",
    ],
    correctIndex: 2,
    explanation:
      "Adrenaline (also called epinephrine) is released by the adrenal glands and is the primary hormone driving the immediate fight-or-flight response. It causes increased heart rate, rapid breathing, dilated pupils, and redirected blood flow to the muscles. Cortisol is the secondary stress hormone that sustains the response over a longer period.",
  },
  {
    id: "panic-attack-duration",
    question:
      "What is the typical duration of a panic attack?",
    options: [
      "Less than 1 minute",
      "5 to 20 minutes",
      "1 to 2 hours",
      "24 hours or more",
    ],
    correctIndex: 1,
    explanation:
      "Most panic attacks peak within 5 to 10 minutes and typically last between 5 and 20 minutes, although some symptoms may linger for longer. They are self-limiting — even without intervention, a panic attack will pass. Knowing this can be very reassuring for both the person experiencing the attack and anyone providing support.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs                                                               */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "What is the difference between feeling anxious and having an anxiety disorder?",
    answer:
      "Feeling anxious is a normal, healthy human emotion — it helps us stay alert to danger and can motivate us to solve problems. An anxiety disorder is diagnosed when the anxiety is persistent (lasting weeks or months), disproportionate to the actual threat, difficult to control, and significantly interferes with daily life including work, relationships, and social activities. Around 8 million people in the UK live with an anxiety disorder at any given time.",
  },
  {
    question:
      "Can anxiety cause physical symptoms that feel like a heart attack?",
    answer:
      "Yes. Panic attacks in particular can produce intense physical symptoms including chest tightness or pain, rapid heartbeat, breathlessness, dizziness, tingling in the hands and feet, and a feeling of impending doom. These symptoms can closely mimic a heart attack. The key differences are that panic attack symptoms typically peak within 10 minutes and then subside, whereas heart attack pain tends to be more constant and may radiate to the arm or jaw. However, if there is any doubt, always call 999 and treat the situation as a cardiac emergency until confirmed otherwise.",
  },
  {
    question:
      "Is Generalised Anxiety Disorder (GAD) the same as just being a worrier?",
    answer:
      "No. While everyone worries from time to time, GAD is a clinical condition characterised by persistent, excessive worry about a wide range of everyday situations on most days for at least six months. The worry is difficult to control, is disproportionate to the actual likelihood of the feared event, and causes significant distress and physical symptoms such as restlessness, fatigue, difficulty concentrating, irritability, muscle tension, and sleep disturbance. GAD is the most common anxiety disorder in the UK and is treated with talking therapies (particularly CBT) and/or medication.",
  },
  {
    question:
      "How should I help someone who is having a panic attack?",
    answer:
      "Stay calm and reassure them that they are safe and that the panic attack will pass. Encourage slow, controlled breathing — breathe in for 4 counts, hold for 4, breathe out for 4. Use grounding techniques such as the 5-4-3-2-1 method (name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste). Do not tell them to 'calm down' or that they are overreacting. Stay with them until the attack passes, which is usually within 5 to 20 minutes. If they are experiencing their first panic attack or are in severe distress, seek medical help.",
  },
  {
    question:
      "Can someone have more than one anxiety disorder at the same time?",
    answer:
      "Yes, it is very common for anxiety disorders to co-occur. For example, someone with Generalised Anxiety Disorder may also experience panic attacks, or someone with social anxiety may also have a specific phobia. Anxiety disorders also frequently co-occur with depression — it is estimated that around 60% of people with an anxiety disorder also experience depression. Treatment plans should address all co-occurring conditions.",
  },
  {
    question:
      "Is OCD really an anxiety disorder?",
    answer:
      "OCD (Obsessive-Compulsive Disorder) was historically classified as an anxiety disorder because anxiety is a core feature — the obsessive thoughts cause significant anxiety, and the compulsive behaviours are performed to reduce that anxiety. However, in modern diagnostic manuals (ICD-11 and DSM-5), OCD is now classified in its own category because its features and treatment differ in important ways from other anxiety disorders. Nevertheless, understanding OCD in the context of anxiety remains valuable for mental health first aiders.",
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-section quiz                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Approximately how many people in the UK are living with an anxiety disorder at any given time?",
    options: [
      "2 million",
      "5 million",
      "8 million",
      "12 million",
    ],
    correctAnswer: 2,
    explanation:
      "Approximately 8 million people in the UK have a diagnosable anxiety disorder at any given time, making it one of the most prevalent mental health conditions in the country. Anxiety disorders are more common than depression, though the two frequently co-occur.",
  },
  {
    id: 2,
    question:
      "Which of the following best describes Generalised Anxiety Disorder (GAD)?",
    options: [
      "Sudden, intense episodes of fear lasting less than a minute",
      "Persistent, excessive worry about a wide range of everyday situations on most days for at least six months",
      "Intense fear of a specific object or situation, such as spiders or heights",
      "Recurring, unwanted thoughts that the person tries to neutralise with repetitive behaviours",
    ],
    correctAnswer: 1,
    explanation:
      "GAD is characterised by persistent, excessive, and uncontrollable worry about a broad range of everyday topics — health, work, finances, family — on most days for at least six months. It differs from panic disorder (sudden episodes), specific phobias (one trigger), and OCD (obsessions and compulsions).",
  },
  {
    id: 3,
    question:
      "What is the primary evolutionary purpose of the fight-flight-freeze response?",
    options: [
      "To help us sleep more deeply",
      "To prepare the body to confront, escape, or hide from a perceived threat",
      "To improve long-term memory storage",
      "To regulate body temperature in extreme weather",
    ],
    correctAnswer: 1,
    explanation:
      "The fight-flight-freeze response is an automatic survival mechanism that evolved to protect humans from physical danger. The body rapidly prepares to fight the threat, flee from it, or freeze (become motionless to avoid detection). In modern life, the same response can be triggered by psychological threats such as work stress or social situations.",
  },
  {
    id: 4,
    question:
      "Which physical symptom of anxiety is most commonly mistaken for a heart attack?",
    options: [
      "Headache",
      "Muscle tension in the shoulders",
      "Chest tightness and heart palpitations",
      "Nausea",
    ],
    correctAnswer: 2,
    explanation:
      "Chest tightness, heart palpitations, and breathlessness during a panic attack are the symptoms most commonly mistaken for a heart attack. Many people present to A&E believing they are having a heart attack when they are experiencing a panic attack. The key difference is that panic attack symptoms typically peak within 10 minutes and then subside.",
  },
  {
    id: 5,
    question:
      "What is the recommended first aid technique for someone having a panic attack?",
    options: [
      "Tell them to stop overreacting and get on with their day",
      "Leave them alone to let the attack pass without interference",
      "Encourage slow, controlled breathing and use grounding techniques such as 5-4-3-2-1",
      "Give them a glass of cold water and tell them to lie flat",
    ],
    correctAnswer: 2,
    explanation:
      "Panic attack first aid involves staying calm, offering reassurance that the attack will pass, encouraging slow controlled breathing (in for 4, hold for 4, out for 4), and using grounding techniques such as the 5-4-3-2-1 method to refocus the senses. Never dismiss or minimise their experience, and stay with them until the attack passes.",
  },
  {
    id: 6,
    question:
      "Which TWO hormones are most associated with the body's stress and anxiety response?",
    options: [
      "Insulin and glucagon",
      "Adrenaline (epinephrine) and cortisol",
      "Serotonin and dopamine",
      "Melatonin and oxytocin",
    ],
    correctAnswer: 1,
    explanation:
      "Adrenaline (epinephrine) is released for the immediate fight-or-flight response — increased heart rate, rapid breathing, dilated pupils. Cortisol is the secondary stress hormone that sustains the response over a longer period, raising blood sugar, suppressing the immune system, and keeping the body on high alert. Chronic cortisol elevation is linked to long-term health problems.",
  },
  {
    id: 7,
    question:
      "In OCD (Obsessive-Compulsive Disorder), what is the relationship between obsessions and compulsions?",
    options: [
      "Obsessions and compulsions are the same thing",
      "Obsessions are unwanted intrusive thoughts that cause anxiety; compulsions are repetitive behaviours performed to reduce that anxiety",
      "Compulsions cause the obsessions",
      "Obsessions are physical habits and compulsions are mental images",
    ],
    correctAnswer: 1,
    explanation:
      "In OCD, obsessions are persistent, unwanted intrusive thoughts, images, or urges that cause significant anxiety and distress. Compulsions are repetitive behaviours or mental acts that the person feels compelled to perform in response to the obsession, in an attempt to reduce the anxiety or prevent a feared event. The cycle of obsession → anxiety → compulsion → temporary relief → obsession is the hallmark of OCD.",
  },
  {
    id: 8,
    question:
      "What is the key distinguishing feature of social anxiety disorder compared to normal shyness?",
    options: [
      "Social anxiety only affects teenagers",
      "People with social anxiety have an intense, persistent fear of being judged, humiliated, or embarrassed in social situations that significantly impairs their daily life",
      "Social anxiety is caused by a single traumatic social event",
      "People with social anxiety never attend social events of any kind",
    ],
    correctAnswer: 1,
    explanation:
      "Social anxiety disorder goes far beyond normal shyness. It involves an intense, persistent fear of social situations where the person may be scrutinised, judged, or embarrassed. This fear is disproportionate to the actual threat and causes significant avoidance behaviour, distress, and impairment in work, education, and relationships. Many people with social anxiety do attend social events but experience extreme distress before, during, and after.",
  },
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function MentalHealthModule2Section2() {
  useSEO({
    title:
      "Anxiety Disorders | Mental Health First Aid Module 2 Section 2",
    description:
      "Normal anxiety vs anxiety disorders, GAD, panic disorder, social anxiety, phobias, fight-flight-freeze response, physical symptoms, panic attack first aid, OCD and PTSD overview.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ─────────────────────────────────────── */}
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
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Article ───────────────────────────────────────────── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Centred Header ─────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-400/20 border border-purple-500/30 mb-4">
            <Cloud className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 2 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Anxiety Disorders
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the different types of anxiety disorder, the
            body&rsquo;s fight-flight-freeze response, physical symptoms,
            panic attacks, and how OCD and PTSD relate to anxiety
          </p>
        </header>

        {/* ── Quick Summary Boxes ────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Prevalence:</strong> 8 million people in the UK have
                an anxiety disorder
              </li>
              <li>
                <strong>Core feature:</strong> Persistent, excessive worry
                that interferes with daily life
              </li>
              <li>
                <strong>Key response:</strong> Fight-flight-freeze &mdash;
                adrenaline &amp; cortisol
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Most common:</strong> GAD is the most prevalent
                anxiety disorder in the UK
              </li>
              <li>
                <strong>Panic attacks:</strong> Typically last 5&ndash;20
                minutes, always self-limiting
              </li>
              <li>
                <strong>Co-occurrence:</strong> ~60% of people with anxiety
                also have depression
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ──────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the difference between normal anxiety and an anxiety disorder",
              "Identify the main types of anxiety disorder and their distinguishing features",
              "Describe the fight-flight-freeze response and its role in anxiety",
              "Recognise the physical symptoms of anxiety and understand why they are often mistaken for physical illness",
              "Provide first aid for someone experiencing a panic attack",
              "Outline the key features of OCD and PTSD and how they relate to anxiety",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ================================================================ */}
        {/* 01 — Normal Anxiety vs Anxiety Disorders                         */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            Normal Anxiety vs Anxiety Disorders
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Anxiety is a <strong>normal, healthy human emotion</strong>. It
                is the feeling of unease, worry, or fear that we all experience
                when facing something uncertain, challenging, or potentially
                threatening &mdash; an exam, a job interview, a visit to the
                dentist, or walking down a dark street at night. In these
                situations, anxiety serves a useful purpose: it sharpens our
                attention, motivates us to prepare, and helps us stay alert to
                danger.
              </p>

              <p>
                Anxiety becomes a <strong>disorder</strong> when it is:
              </p>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong>Persistent</strong> &mdash; lasting weeks, months,
                    or years rather than resolving once the situation has passed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong>Excessive and disproportionate</strong> &mdash; the
                    level of fear or worry is far greater than the actual threat
                    warrants
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong>Difficult to control</strong> &mdash; the person
                    cannot simply &ldquo;switch off&rdquo; the worry, even when
                    they recognise it is irrational
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong>Interferes with daily life</strong> &mdash; causing
                    significant problems at work, in relationships, and in
                    social situations
                  </span>
                </li>
              </ul>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">UK Prevalence:</strong>{" "}
                  Approximately <strong>8 million people</strong> in the United
                  Kingdom are living with a diagnosable anxiety disorder at any
                  given time. Anxiety disorders are the most common group of
                  mental health conditions, affecting around{" "}
                  <strong>1 in 6 adults</strong> every week (NHS Digital, Adult
                  Psychiatric Morbidity Survey). Women are roughly twice as
                  likely as men to be diagnosed with an anxiety disorder,
                  though this may partly reflect differences in help-seeking
                  behaviour.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Risk Factors for Developing an Anxiety Disorder
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Genetics</strong> &mdash;
                      anxiety disorders tend to run in families
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Childhood experiences
                      </strong>{" "}
                      &mdash; trauma, abuse, neglect, or prolonged adversity in
                      early life
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Life events</strong>{" "}
                      &mdash; bereavement, redundancy, divorce, financial
                      problems, or major illness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Personality traits
                      </strong>{" "}
                      &mdash; perfectionism, a tendency to catastrophise, or
                      low self-esteem
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Chronic stress
                      </strong>{" "}
                      &mdash; ongoing workplace pressure, caring
                      responsibilities, or relationship difficulties
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Substance use
                      </strong>{" "}
                      &mdash; alcohol, caffeine, cannabis, and stimulants can
                      trigger or worsen anxiety
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 02 — Types of Anxiety Disorders                                  */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            Types of Anxiety Disorders
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There are several distinct types of anxiety disorder, each with
                its own pattern of symptoms and triggers. Understanding the
                differences is important for mental health first aiders so that
                you can recognise what someone may be experiencing and offer
                appropriate support.
              </p>

              {/* ── Anxiety Types Comparison Diagram ──────────── */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                <h4 className="text-purple-400 font-semibold text-sm mb-5 text-center">
                  Anxiety Disorders &mdash; Comparison Overview
                </h4>

                <div className="space-y-4">
                  {/* GAD */}
                  <div className="relative bg-purple-500/10 border-2 border-purple-500/40 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-purple-400" />
                      <h5 className="font-bold text-purple-300 text-sm">
                        Generalised Anxiety Disorder (GAD)
                      </h5>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-purple-400/80 text-xs font-medium mb-1">
                          TRIGGER
                        </p>
                        <p className="text-white/80">
                          Wide range of everyday situations &mdash; health, work,
                          finances, family
                        </p>
                      </div>
                      <div>
                        <p className="text-purple-400/80 text-xs font-medium mb-1">
                          PATTERN
                        </p>
                        <p className="text-white/80">
                          Persistent, excessive worry on most days for &ge;6
                          months
                        </p>
                      </div>
                      <div>
                        <p className="text-purple-400/80 text-xs font-medium mb-1">
                          KEY FEATURE
                        </p>
                        <p className="text-white/80">
                          &ldquo;Free-floating&rdquo; anxiety &mdash; not
                          attached to one specific trigger
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Panic Disorder */}
                  <div className="relative bg-red-500/10 border-2 border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-red-400" />
                      <h5 className="font-bold text-red-300 text-sm">
                        Panic Disorder
                      </h5>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-red-400/80 text-xs font-medium mb-1">
                          TRIGGER
                        </p>
                        <p className="text-white/80">
                          Often no clear trigger &mdash; attacks can come
                          &ldquo;out of the blue&rdquo;
                        </p>
                      </div>
                      <div>
                        <p className="text-red-400/80 text-xs font-medium mb-1">
                          PATTERN
                        </p>
                        <p className="text-white/80">
                          Recurrent, unexpected panic attacks with fear of
                          future attacks
                        </p>
                      </div>
                      <div>
                        <p className="text-red-400/80 text-xs font-medium mb-1">
                          KEY FEATURE
                        </p>
                        <p className="text-white/80">
                          Intense terror peaking in minutes; avoidance of
                          situations where attacks occurred
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Anxiety */}
                  <div className="relative bg-violet-500/10 border-2 border-violet-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-violet-400" />
                      <h5 className="font-bold text-violet-300 text-sm">
                        Social Anxiety Disorder
                      </h5>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-violet-400/80 text-xs font-medium mb-1">
                          TRIGGER
                        </p>
                        <p className="text-white/80">
                          Social situations where the person may be observed or
                          judged by others
                        </p>
                      </div>
                      <div>
                        <p className="text-violet-400/80 text-xs font-medium mb-1">
                          PATTERN
                        </p>
                        <p className="text-white/80">
                          Intense fear of embarrassment, humiliation, or
                          negative evaluation
                        </p>
                      </div>
                      <div>
                        <p className="text-violet-400/80 text-xs font-medium mb-1">
                          KEY FEATURE
                        </p>
                        <p className="text-white/80">
                          Fear is far beyond normal shyness; significant
                          avoidance of social situations
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Specific Phobias */}
                  <div className="relative bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                      <h5 className="font-bold text-amber-300 text-sm">
                        Specific Phobias
                      </h5>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-amber-400/80 text-xs font-medium mb-1">
                          TRIGGER
                        </p>
                        <p className="text-white/80">
                          A particular object or situation &mdash; heights,
                          needles, spiders, flying, blood
                        </p>
                      </div>
                      <div>
                        <p className="text-amber-400/80 text-xs font-medium mb-1">
                          PATTERN
                        </p>
                        <p className="text-white/80">
                          Immediate, intense fear response upon encountering or
                          anticipating the trigger
                        </p>
                      </div>
                      <div>
                        <p className="text-amber-400/80 text-xs font-medium mb-1">
                          KEY FEATURE
                        </p>
                        <p className="text-white/80">
                          Extreme avoidance; fear is disproportionate; the
                          person usually recognises it is irrational
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Agoraphobia */}
                  <div className="relative bg-teal-500/10 border-2 border-teal-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-teal-400" />
                      <h5 className="font-bold text-teal-300 text-sm">
                        Agoraphobia
                      </h5>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-teal-400/80 text-xs font-medium mb-1">
                          TRIGGER
                        </p>
                        <p className="text-white/80">
                          Situations where escape might be difficult &mdash;
                          crowds, public transport, open spaces
                        </p>
                      </div>
                      <div>
                        <p className="text-teal-400/80 text-xs font-medium mb-1">
                          PATTERN
                        </p>
                        <p className="text-white/80">
                          Fear and avoidance of multiple situations; often
                          develops after panic attacks
                        </p>
                      </div>
                      <div>
                        <p className="text-teal-400/80 text-xs font-medium mb-1">
                          KEY FEATURE
                        </p>
                        <p className="text-white/80">
                          Can become housebound in severe cases; not simply
                          &ldquo;fear of open spaces&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                  <p className="text-purple-300 text-xs sm:text-sm font-semibold">
                    Anxiety disorders frequently co-occur &mdash; a person may
                    have more than one type at the same time
                  </p>
                </div>
              </div>

              <p>
                The most commonly diagnosed anxiety disorder in the UK is{" "}
                <strong>Generalised Anxiety Disorder (GAD)</strong>. It is
                characterised by persistent, excessive worry about a broad range
                of topics &mdash; health, work, finances, relationships &mdash;
                that the person finds very difficult to control. Physical
                symptoms include restlessness, fatigue, difficulty concentrating,
                irritability, muscle tension, and sleep disturbance. NICE
                guidelines recommend stepped care, beginning with guided
                self-help and Cognitive Behavioural Therapy (CBT), progressing
                to medication (usually SSRIs) for moderate-to-severe cases.
              </p>

              <p>
                <strong>Social Anxiety Disorder</strong> (sometimes called
                social phobia) is the third most common mental health condition
                in the world. People with social anxiety experience an intense
                fear of social situations where they might be observed, judged,
                or embarrassed &mdash; meetings, presentations, eating in
                public, using the telephone, or even walking into a room. This
                goes far beyond normal shyness and can severely limit a
                person&rsquo;s education, career, and personal relationships.
              </p>

              <p>
                <strong>Agoraphobia</strong> is widely misunderstood. It is
                not simply a &ldquo;fear of open spaces&rdquo; but a fear of
                being in situations where escape might be difficult or help
                might not be available &mdash; particularly if a panic attack
                occurs. Crowded shopping centres, public transport, queues, and
                bridges are common triggers. In severe cases, the person may
                become unable to leave their home.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ================================================================ */}
        {/* 03 — The Fight-Flight-Freeze Response                            */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            The Fight-Flight-Freeze Response
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>fight-flight-freeze response</strong> is an
                automatic, involuntary survival mechanism that has evolved over
                millions of years to protect humans from physical danger. When
                the brain perceives a threat &mdash; whether a predator, a fire,
                or (in modern life) a confrontation with a manager or a packed
                train carriage &mdash; the{" "}
                <strong>amygdala</strong> (the brain&rsquo;s threat-detection
                centre) triggers an instant cascade of physiological changes
                designed to prepare the body to <strong>fight</strong> the
                threat, <strong>flee</strong> from it, or{" "}
                <strong>freeze</strong> (become motionless to avoid detection).
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-300 mb-3">
                  What Happens in the Body
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Within <strong>milliseconds</strong> of perceiving a threat,
                  the adrenal glands release{" "}
                  <strong>adrenaline (epinephrine)</strong> and, shortly after,{" "}
                  <strong>cortisol</strong>. These hormones trigger a series of
                  rapid changes:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "Heart rate increases",
                      detail:
                        "Pumps blood faster to muscles, preparing for physical action",
                    },
                    {
                      label: "Breathing becomes rapid and shallow",
                      detail:
                        "Increases oxygen intake to fuel muscles and brain",
                    },
                    {
                      label: "Muscles tense",
                      detail:
                        "Prepares for explosive movement — running or striking",
                    },
                    {
                      label: "Pupils dilate",
                      detail:
                        "Allows more light in to improve visual awareness of surroundings",
                    },
                    {
                      label: "Blood diverts to major muscles",
                      detail:
                        "Diverted away from digestive system (causing nausea or 'butterflies')",
                    },
                    {
                      label: "Sweating increases",
                      detail:
                        "Cools the body in preparation for physical exertion",
                    },
                    {
                      label: "Blood sugar rises",
                      detail:
                        "Cortisol releases stored glucose for immediate energy",
                    },
                    {
                      label: "Non-essential functions suppress",
                      detail:
                        "Digestion, immune function, and reproductive processes slow down",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-lg p-3"
                    >
                      <p className="text-sm font-medium text-purple-300 mb-1">
                        {item.label}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The Three Responses
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                      <span className="text-xs font-bold text-red-400">F</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-300">Fight</p>
                      <p className="text-sm text-white/80">
                        The body prepares to confront the threat &mdash;
                        increased aggression, clenched fists, jaw tightening.
                        In modern life, this can manifest as irritability,
                        snapping at colleagues, or feeling &ldquo;wound up&rdquo;.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                      <span className="text-xs font-bold text-amber-400">
                        F
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-300">
                        Flight
                      </p>
                      <p className="text-sm text-white/80">
                        The body prepares to escape &mdash; restless legs,
                        urge to leave, inability to sit still. In modern life,
                        this manifests as avoidance behaviour, leaving
                        situations early, or the overwhelming urge to &ldquo;get
                        out&rdquo;.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-400">F</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-300">
                        Freeze
                      </p>
                      <p className="text-sm text-white/80">
                        The body becomes still and immobile &mdash; like a
                        &ldquo;rabbit in headlights&rdquo;. Heart rate may
                        actually slow, muscles lock, and the person may feel
                        unable to speak or move. This is an involuntary
                        response, not a choice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-300 mb-1">
                      Why This Becomes Problematic in Anxiety Disorders
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      The fight-flight-freeze response evolved to deal with
                      <strong> short-term physical threats</strong> &mdash; a
                      predator, a wildfire, a fall. It was designed to activate
                      briefly and then switch off once the danger passed.
                      In anxiety disorders, the brain&rsquo;s threat-detection
                      system becomes <strong>oversensitive</strong>, triggering
                      the same intense physiological response in response to
                      non-life-threatening situations &mdash; a meeting, a phone
                      call, a crowded supermarket. The body is flooded with
                      adrenaline and cortisol repeatedly, leading to
                      chronic physical symptoms, exhaustion, and a constant
                      state of &ldquo;high alert&rdquo; that the person cannot
                      switch off.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ================================================================ */}
        {/* 04 — Physical Symptoms of Anxiety                                */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Physical Symptoms of Anxiety
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important things for a mental health first aider
                to understand is that anxiety is <strong>not just a mental
                experience</strong> &mdash; it produces very real, often
                frightening, physical symptoms. These symptoms are a direct
                result of the fight-flight-freeze response described above. Many
                people with anxiety disorders present to their GP or A&amp;E
                department believing they have a physical illness, because the
                symptoms can be so intense and alarming.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Physical Symptoms of Anxiety
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: Heart,
                      symptom: "Racing heart / palpitations",
                      why: "Adrenaline increases heart rate to pump blood to muscles",
                    },
                    {
                      icon: Activity,
                      symptom: "Chest tightness or pain",
                      why: "Muscle tension in the chest wall and rapid breathing",
                    },
                    {
                      icon: Cloud,
                      symptom: "Breathlessness / hyperventilation",
                      why: "Rapid, shallow breathing to increase oxygen intake",
                    },
                    {
                      icon: Brain,
                      symptom: "Dizziness and light-headedness",
                      why: "Hyperventilation lowers carbon dioxide, causing dizziness",
                    },
                    {
                      icon: Zap,
                      symptom: "Sweating",
                      why: "Body cools itself in preparation for physical exertion",
                    },
                    {
                      icon: Activity,
                      symptom: "Trembling and shaking",
                      why: "Adrenaline causes muscles to tremble as they tense",
                    },
                    {
                      icon: AlertTriangle,
                      symptom: "Nausea and stomach churning",
                      why: "Blood diverts from digestive system to major muscles",
                    },
                    {
                      icon: Shield,
                      symptom: "Muscle tension and headaches",
                      why: "Sustained tension in neck, jaw, and shoulders",
                    },
                    {
                      icon: Eye,
                      symptom: "Insomnia and restless sleep",
                      why: "Cortisol keeps the body on 'high alert', preventing relaxation",
                    },
                    {
                      icon: Brain,
                      symptom: "Tingling or numbness (hands, feet, face)",
                      why: "Hyperventilation reduces blood flow to extremities",
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-purple-400 flex-shrink-0" />
                          <p className="text-sm font-medium text-white">
                            {item.symptom}
                          </p>
                        </div>
                        <p className="text-xs text-white/60 pl-6">
                          {item.why}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-300 mb-1">
                      Commonly Mistaken for Physical Illness
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Chest pain and palpitations are frequently mistaken for
                      heart problems. Breathlessness can be attributed to asthma
                      or lung disease. Nausea and stomach cramps lead many
                      people to suspect gastrointestinal conditions. Headaches
                      and dizziness may prompt investigations for neurological
                      conditions. As a mental health first aider, being aware
                      that these symptoms <strong>can be caused by anxiety</strong>{" "}
                      is valuable &mdash; but <strong>always</strong> encourage
                      the person to see their GP to rule out physical causes
                      first. Never diagnose &mdash; that is the GP&rsquo;s role.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                It is also worth noting that chronic anxiety can lead to
                genuine, long-term physical health problems. Sustained elevated
                cortisol levels are associated with high blood pressure,
                weakened immune function, digestive disorders (such as irritable
                bowel syndrome), chronic pain, and an increased risk of
                cardiovascular disease. This is why treating anxiety is not
                just about mental wellbeing &mdash; it is about physical health
                too.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 05 — Panic Attacks                                               */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Panic Attacks
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>panic attack</strong> is a sudden, intense episode of
                overwhelming fear and anxiety that reaches its peak within
                minutes. Panic attacks are among the most frightening
                experiences a person can have &mdash; many people genuinely
                believe they are dying, having a heart attack, or losing their
                mind during an attack.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Symptoms of a Panic Attack
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Intense, overwhelming fear or sense of doom",
                    "Heart pounding, racing, or fluttering (palpitations)",
                    "Feeling unable to breathe or choking sensation",
                    "Chest pain or tightness",
                    "Dizziness, light-headedness, or feeling faint",
                    "Trembling or shaking all over",
                    "Sweating profusely",
                    "Nausea or stomach cramps",
                    "Tingling or numbness in hands, feet, or face",
                    "Feeling detached from reality (derealisation) or from oneself (depersonalisation)",
                    "Fear of dying",
                    "Fear of losing control or 'going mad'",
                  ].map((symptom, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm text-white/80"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">Duration:</strong> Panic
                  attacks typically peak within <strong>5 to 10 minutes</strong>{" "}
                  and usually last between{" "}
                  <strong>5 and 20 minutes</strong> in total, although some
                  residual symptoms (shakiness, fatigue, emotional exhaustion)
                  may persist for an hour or more. Crucially, panic attacks are{" "}
                  <strong>self-limiting</strong> &mdash; they will always pass,
                  even without intervention.
                </p>
              </div>

              <div className="bg-green-500/10 border-2 border-green-500/40 p-4 sm:p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-green-300 text-base">
                    Panic Attack First Aid
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      title: "Stay calm and reassure",
                      detail:
                        "Stay with the person. Speak in a calm, steady voice. Reassure them that they are safe, that this is a panic attack, and that it will pass. Do NOT say 'calm down' or 'it's nothing' — validate their experience.",
                    },
                    {
                      step: 2,
                      title: "Encourage controlled breathing",
                      detail:
                        "Guide them through slow, deep breathing: breathe in slowly through the nose for 4 counts, hold for 4 counts, breathe out slowly through the mouth for 4 counts. This helps counteract hyperventilation and reduces the physical symptoms.",
                    },
                    {
                      step: 3,
                      title: "Use grounding techniques (5-4-3-2-1)",
                      detail:
                        "Ask the person to name 5 things they can see, 4 things they can touch, 3 things they can hear, 2 things they can smell, and 1 thing they can taste. This refocuses the brain away from the panic and into the present moment.",
                    },
                    {
                      step: 4,
                      title: "Remove from overwhelming stimuli",
                      detail:
                        "If possible, guide them to a quieter, calmer space away from crowds, noise, or bright lights. Reduce sensory input to help the nervous system settle.",
                    },
                    {
                      step: 5,
                      title: "Stay until the attack passes",
                      detail:
                        "Do not leave the person alone. Panic attacks typically pass within 5 to 20 minutes. Once it subsides, offer them water and let them rest. If this is their first panic attack, encourage them to see their GP.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                        <span className="text-sm font-bold text-green-400">
                          {item.step}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm sm:text-base mb-1">
                          {item.title}
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Panic Attack vs Heart Attack &mdash; How to Tell the
                  Difference
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <h4 className="text-purple-300 font-semibold text-sm mb-2">
                      Panic Attack
                    </h4>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Symptoms peak within <strong>5-10 minutes</strong>{" "}
                          then gradually ease
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Chest pain is usually a{" "}
                          <strong>sharp, stabbing</strong> sensation localised
                          to one area
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Tingling and numbness often in{" "}
                          <strong>hands, feet, and face</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Usually resolves within{" "}
                          <strong>20 minutes</strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <h4 className="text-red-300 font-semibold text-sm mb-2">
                      Heart Attack
                    </h4>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          Pain is <strong>constant and worsening</strong>,
                          does not ease with time
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          Chest pain is a{" "}
                          <strong>crushing, squeezing</strong> pressure that
                          may radiate to the left arm, jaw, neck, or back
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          May cause <strong>cold, clammy skin</strong> with a
                          grey complexion
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          <strong>Life-threatening emergency</strong> &mdash;
                          call 999 immediately
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                  <p className="text-sm text-white leading-relaxed">
                    <strong className="text-red-300">
                      Important:
                    </strong>{" "}
                    If there is <strong>any doubt</strong> whether someone is
                    having a panic attack or a heart attack,{" "}
                    <strong>always call 999</strong> and treat the situation
                    as a cardiac emergency until confirmed otherwise. It is
                    always better to be cautious.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ================================================================ */}
        {/* 06 — OCD and PTSD                                                */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            OCD and PTSD
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Although modern diagnostic systems now classify
                Obsessive-Compulsive Disorder (OCD) and Post-Traumatic Stress
                Disorder (PTSD) separately from anxiety disorders, anxiety is
                a core feature of both conditions. As a mental health first
                aider, it is helpful to understand the basics of these
                conditions and recognise their link to anxiety.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* OCD */}
                <div className="bg-violet-500/10 border-2 border-violet-500/40 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="h-5 w-5 text-violet-400" />
                    <h3 className="font-bold text-violet-300 text-sm">
                      Obsessive-Compulsive Disorder (OCD)
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm text-white/80">
                    <div>
                      <p className="text-violet-400/80 text-xs font-medium mb-1">
                        OBSESSIONS
                      </p>
                      <p>
                        Persistent, unwanted, intrusive thoughts, images, or
                        urges that cause significant anxiety. Common obsessions
                        include fear of contamination, fear of harming others,
                        need for symmetry or exactness, and intrusive
                        violent or sexual thoughts. The person recognises these
                        thoughts are irrational but cannot stop them.
                      </p>
                    </div>
                    <div>
                      <p className="text-violet-400/80 text-xs font-medium mb-1">
                        COMPULSIONS
                      </p>
                      <p>
                        Repetitive behaviours or mental acts performed to reduce
                        the anxiety caused by the obsession. Common compulsions
                        include excessive hand washing, checking (doors, locks,
                        appliances), counting, ordering, seeking reassurance,
                        and mental rituals. The relief is temporary &mdash;
                        the cycle repeats.
                      </p>
                    </div>
                    <div>
                      <p className="text-violet-400/80 text-xs font-medium mb-1">
                        THE CYCLE
                      </p>
                      <p>
                        Obsession &rarr; Anxiety &rarr; Compulsion &rarr;
                        Temporary relief &rarr; Obsession returns. This cycle
                        can consume hours of a person&rsquo;s day and severely
                        impair their ability to work, socialise, and maintain
                        relationships.
                      </p>
                    </div>
                    <div className="bg-violet-500/10 border border-violet-500/30 p-3 rounded-lg">
                      <p className="text-xs text-white leading-relaxed">
                        <strong className="text-violet-300">
                          Myth vs Reality:
                        </strong>{" "}
                        OCD is often trivialised in popular culture (&ldquo;I&rsquo;m
                        so OCD about my desk&rdquo;). In reality, OCD is a
                        serious, distressing condition. It is treated with
                        specialised CBT (Exposure and Response Prevention) and
                        sometimes SSRI medication. Approximately 750,000
                        people in the UK live with OCD.
                      </p>
                    </div>
                  </div>
                </div>

                {/* PTSD */}
                <div className="bg-purple-500/10 border-2 border-purple-500/40 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-purple-400" />
                    <h3 className="font-bold text-purple-300 text-sm">
                      Post-Traumatic Stress Disorder (PTSD)
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm text-white/80">
                    <div>
                      <p className="text-purple-400/80 text-xs font-medium mb-1">
                        WHAT IT IS
                      </p>
                      <p>
                        PTSD develops after experiencing or witnessing a
                        traumatic event &mdash; serious accidents, physical or
                        sexual assault, war, natural disasters, or sudden
                        bereavement. Not everyone who experiences trauma
                        develops PTSD; it depends on the nature of the event,
                        personal vulnerability, and available support.
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-400/80 text-xs font-medium mb-1">
                        KEY SYMPTOMS
                      </p>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                          <span>
                            <strong className="text-white">
                              Re-experiencing
                            </strong>{" "}
                            &mdash; flashbacks, nightmares, intrusive memories
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                          <span>
                            <strong className="text-white">
                              Avoidance
                            </strong>{" "}
                            &mdash; avoiding reminders of the trauma (places,
                            people, activities)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                          <span>
                            <strong className="text-white">
                              Hyperarousal
                            </strong>{" "}
                            &mdash; being constantly on edge, startling easily,
                            difficulty sleeping, irritability
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                          <span>
                            <strong className="text-white">
                              Emotional numbing
                            </strong>{" "}
                            &mdash; feeling detached, inability to experience
                            positive emotions
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-purple-400/80 text-xs font-medium mb-1">
                        RELEVANCE TO ELECTRICIANS
                      </p>
                      <p>
                        Construction workers, including electricians, are at
                        higher risk of PTSD due to workplace incidents,
                        witnessing accidents, or discovering deceased persons.
                        PTSD is covered in more detail in{" "}
                        <strong>Module 4</strong> of this course.
                      </p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                      <p className="text-xs text-white leading-relaxed">
                        <strong className="text-purple-300">Treatment:</strong>{" "}
                        NICE-recommended treatments for PTSD include
                        trauma-focused CBT and Eye Movement Desensitisation and
                        Reprocessing (EMDR). Symptoms must persist for more
                        than one month after the traumatic event for a PTSD
                        diagnosis. Early support and psychological first aid
                        after a traumatic event can reduce the risk of
                        developing PTSD.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-purple-300">
                    The Common Thread &mdash; Anxiety:
                  </strong>{" "}
                  Both OCD and PTSD share anxiety as a central feature. In OCD,
                  the obsessive thoughts create intense anxiety that drives the
                  compulsive behaviours. In PTSD, the hyperarousal symptoms are
                  essentially a chronic activation of the fight-flight-freeze
                  response, triggered by reminders of the trauma. Understanding
                  this shared mechanism helps mental health first aiders
                  recognise when someone may need specialist support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ────────────────────────────────────── */}
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

        {/* ── End-of-Section Quiz ────────────────────────────── */}
        <Quiz
          title="Anxiety Disorders &mdash; Knowledge Check"
          questions={quizQuestions}
        />

        {/* ── Bottom Navigation ──────────────────────────────── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-2-section-3">
              Next: Stress &amp; Burnout
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
